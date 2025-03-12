const {updateCaptureZoneFaction, zoneFaction, loadCaptureZone} = require("./talrasha_database");

let zoneInfo = null
let zoneList = []
let shapeList = []
let zoneIndex
let shapeZone
let shapeZone2

let countF = 0
let countP = 0

let now = new Date()
let isCaptZone = false

const MONEY_STORAGE = 300

const TIMER_WAIT = 60*10
const TIMER_ZONE = 60*7

const forwardTeam = {
  colorZone: null,
  faction: null,
  color: null,
  name: null,
  players: [],
  count: 0,
}

const protectedTeam = {
  colorZone: null,
  faction: null,
  color: null,
  name: null,
  players: [],
  count: 0,
}

const factionConfig = {
  COLOR_ZONE_FAMILIES: 25,
  COLOR_ZONE_BALLAS: 83,
  COLOR_ZONE_VAGOS: 46,
  COLOR_ZONE_BLOODS: 75,
  COLOR_ZONE_MARABUNTA: 53,

  COLOR_FAMILIES: '#00ff00',
  COLOR_BALLAS: '#800080',
  COLOR_VAGOS: '#ffba00',
  COLOR_MARABUNTA: '#30d5c8',
  COLOR_BLOODS: '#ff0000',

  NAME_FAMILIES: 'F',
  NAME_BALLAS: 'B',
  NAME_VAGOS: 'V',
  NAME_MARABUNTA: 'M',
  NAME_BLOODS: 'B',
}

mp.events.add('playerEnterColshape', enterShapeZone)
mp.events.add('playerExitColshape', exitShapeZone)
mp.events.add('playerQuit', quitPlayer)
mp.events.add('startCaptZone', startCaptureZone)
mp.events.add('playerDeath', killList)

/* Export в serverInit */
async function initZoneCapture() {
 zoneInfo = await loadCaptureZone()
 zoneInfo.forEach(res => {
   let zone = {"id": res.zoneID, "faction": res.factionID, "position":  {"x": res.posX, "y": res.posY, "z": res.posZ}, "color": res.color}
   let shape = mp.colshapes.newRectangle(parseInt(res.posX), parseInt(res.posY),  100, 100, 0)
   zoneList.push(zone)
   shapeList.push(shape)
 })
}

/* Export в characterEvents */
function initCallZone(player) {
  if(player.faction === 9 || player.faction === 10 || player.faction === 12 || player.faction === 13 || player.faction === 24 || player.admin > 5) {
    player.call('loadCaptureBlips', [zoneList])
  }
}

function enterShapeZone(player, shape) {
  for (i = 0; i < shapeList.length; i++) {
    if(shape === shapeList[i]) {
      if(player.faction === 9 || player.faction === 10 || player.faction === 12 || player.faction === 13 || player.faction === 24 || player.admin > 5){
        // player.isKey = true
        // callEnterKey(player)
        // callBinder(player)
        player.indexZone = shapeList.indexOf(shapeList[i])
      }
    }
  }
  if(shape === shapeZone) {
    if(player.vehicle) return player.utils.info('Выйдите с авто')
    if(player.faction === 9 || player.faction === 10 || player.faction === 12 || player.faction === 13 || player.faction === 24 || player.admin > 5) {
      if(player.isDeathCapture) return
      player.isZone = true
      player.dimension = 101
    }
  }
  if(shape === shapeZone2) {
    if(player.vehicle) return player.utils.info('Выйдите с авто')
    if(player.faction === 9 || player.faction === 10 || player.faction === 12 || player.faction === 13 || player.faction === 24 || player.admin > 5) {
      if(player.isDeathCapture) return
      player.isZone2 = true
      countForward(player)
      countProtected(player)
      player.call('callHudBrowser') //открытие худа
    }
  }
}

function exitShapeZone(player, shape) {
  for (i = 0; i < shapeList.length; i++) {
    if(shape === shapeList[i]) {
      if(player.faction === 9 || player.faction === 10 || player.faction === 12 || player.faction === 13 || player.faction === 24 || player.admin > 5) {
        // player.isKey = false
        // callEnterKey(player)
        // callBinder(player)

      }
    }
  }
  if(shape === shapeZone) {
    if(player.vehicle) return player.utils.info('Выйдите с авто')
    if(player.faction === 9 || player.faction === 10 || player.faction === 12 || player.faction === 13 || player.faction === 24 || player.admin > 5){
      if(player.isDeathCapture) return
      player.isZone = false
    }
  }

  if(shape === shapeZone2) {
    if(player.vehicle) return player.utils.info('Выйдите с авто')
    if(player.faction === 9 || player.faction === 10 || player.faction === 12 || player.faction === 13 || player.faction === 24 || player.admin > 5) {
      if(player.isDeathCapture) return
      player.isZone2 = false
      countForward(player)
      countProtected(player)
      player.call('hideHudBrowser') //закрытие худа
    }
  }
}

function startCaptureZone(player) {
  if(player.faction === 9 || player.faction === 10 || player.faction === 12 || player.faction === 13 || player.faction === 24 || player.admin > 5) {
    zoneIndex = player.indexZone
    let zoneFaction = findTerritoryFactions(zoneIndex)
    if(player.vehicle) return player.utils.info('Выйдите с авто')
    if(hourCheck() < 11 || hourCheck() > 23) return player.utils.info('Вы не можете начать захват после 23:00 до' +
      ' 11:00')
    if(player.faction === zoneFaction) return player.utils.warning('Вы уже захватили эту территорию')
    if(player.rank < 7) return player.utils.warning('Ваш ранг слишком низкий')
    if(isCaptZone) return player.utils.warning('Уже идет захват территории')
    let zone = zoneList[zoneIndex]
    updateForwardTeam(player.faction)
    forwardTeam.faction = player.faction
    protectedTeam.faction = zoneFaction
    colorNameFactionHud(forwardTeam.faction, protectedTeam.faction)
    updateProtectedTeam(zoneFaction)
    if(protectedTeam.players.length === 0) return player.utils.warning('Фракция не найдена') 
    isCaptZone = true
    captWait(player, zone)
  }
}

function captWait(player, zone) {
  // player.isKey = false
  // callEnterKey(player)
  // callBinder(player)
  messageWarZone()
  destroyParams()
  timerWait(TIMER_WAIT, zone)

  mp.players.forEach(res => {
    if(res.faction === 9 || res.faction === 10 || res.faction === 12 || res.faction === 13 || res.faction === 24 || res.admin > 5) {
      res.call('zoneFlashStart', [zoneIndex])
    }
  })
}

function captContent(zone) {
  shapeZone = mp.colshapes.newRectangle(parseInt(zone.position.x), parseInt(zone.position.y),  100, 100, 0)
  shapeZone2 = mp.colshapes.newRectangle(parseInt(zone.position.x), parseInt(zone.position.y), 100, 100, 101)
  timerCaptureZone(TIMER_ZONE)
}

function captureEnd() {
 shapeZone.destroy()
 shapeZone2.destroy()

 mp.players.forEach(res => {
   if(res.faction === 9 || res.faction === 10 || res.faction === 12 || res.faction === 13 || res.faction === 24 || res.admin > 5) {
     res.call('zoneFlashEnd', [zoneIndex])
     if(res.isProtected || res.isForward || res.admin > 5) {
       res.call('hideHudBrowser')
       res.call('hideKillList')
       res.dimension = 0
     }
   }
 })
 winTeam()

 isCaptZone = false
}

function winTeam() {
  let winFaction = 0
  let color = 0

  if(countF > countP) {
    winFaction = forwardTeam.faction
    color = forwardTeam.colorZone
    mp.players.forEach(res => {
      if(res.isForward) {
        res.utils.info('Вам удалось захватить территорию')
      }
      if(res.isProtected) {
        res.utils.info('Вам не удалось отстоять свою территорию')
      }
    })
    updateZoneCapture(zoneIndex + 1, winFaction, color, now)
  }
  else if(countF <= countP) {
    winFaction =  protectedTeam.faction
    color = protectedTeam.colorZone

    mp.players.forEach(res => {
      if(res.isForward) {

        res.utils.info('Вам не удалось захватить территорию')
      }
      if(res.isProtected) {
        res.utils.info('Вы отстояли свою территорию')
      }
    })
    updateZoneCapture(zoneIndex + 1, winFaction, color, now)
  }
}

function updateZoneCapture(zone, faction, color, date) {
  updateCaptureZoneFaction(zone, faction, color, date)

  zoneInfo = null
  zoneList = []
  shapeList = []

  mp.players.forEach(res => {
    res.call('destroyCaptureBlips')
    res.call('hideKillList')
    if(res.isDeathCapture) res.isDeathCapture = false
  })
  setTimeout(updateLast, 700)
}

async function updateLast() {
  nullParamsArray()
  await initZoneCapture()
  await mp.players.forEach(res => {
    initCallZone(res)
  })
}

function timerWait(duration, zone) {
  let timer = duration, minutes, seconds

  const timers = setInterval(() => {
    minutes = parseInt(timer / 60, 10)
    seconds = parseInt(timer % 60, 10)

    minutes = minutes < 10 ? "0" + minutes : minutes
    seconds = seconds < 10 ? "0" + seconds : seconds

    mp.players.forEach(res => {
      if(res.isForward || res.isProtected) {
        res.call('showNotify', [JSON.stringify({minutes, seconds, zoneIndex}), false])
      }
    })

    if (--timer < 0) {
      clearInterval(timers)
      mp.players.forEach(res => {
        if(res.isForward || res.isProtected) {
          res.call('hideNotify')
        }
      })

      captContent(zone)
    }
  }, 1000)
}


function timerCaptureZone(duration) {
  let timer = duration, minutes, seconds
  const timers = setInterval(() => {
    minutes = parseInt(timer / 60, 10)
    seconds = parseInt(timer % 60, 10)

    minutes = minutes < 10 ? "0" + minutes : minutes
    seconds = seconds < 10 ? "0" + seconds : seconds

    const colorF = forwardTeam.color
    const colorP = protectedTeam.color
    const nameF = forwardTeam.name
    const nameP = protectedTeam.name

    mp.players.forEach(res => {
      if(res.isForward || res.isProtected || res.admin > 5)  {
        if(res.isZone2) {
          res.call('callParamsHud', [JSON.stringify({minutes, seconds, countF, countP, colorF, colorP, nameF, nameP})])
        }
      }
    })

    if(countP === 0 || countF === 0) {
      clearInterval(timers)
      captureEnd()
    }

    if (--timer < 0) {
      clearInterval(timers)

      captureEnd()
    }
  }, 1000)
}

// Выдаем каждый час 300$ на склад фракций *Export в timers
async function paydayStorageBand() {
  let faction9 = await zoneFaction(9)
  let faction10 = await zoneFaction(10)
  let faction12 = await zoneFaction(12)
  let faction13 = await zoneFaction(13)
  let faction24 = await zoneFaction(24)

  /* Прописать путь к выдаче на склад фракции Это всего лишь пример*/
  mp.players.forEach(res => {
    var faction = mp.factions.getBySqlId(res.faction)
      if(res.faction === 9) return faction.setBalance(faction.balance + (parseInt(faction9) * MONEY_STORAGE))
      if(res.faction === 10) return faction.setBalance(faction.balance + (parseInt(faction10) * MONEY_STORAGE))
      if(res.faction === 12) return faction.setBalance(faction.balance + (parseInt(faction12) * MONEY_STORAGE))
      if(res.faction === 13) return faction.setBalance(faction.balance + (parseInt(faction13) * MONEY_STORAGE))
      if(res.faction === 24) return faction.setBalance(faction.balance + (parseInt(faction24) * MONEY_STORAGE))
    })

  console.log('[PAYDAY] Фракции получили деньги на свои склады')
  
}

function quitPlayer(player) {
  if(player.isForward || player.isProtected || player.admin > 5) {
    if(player.isZone) player.isZone = false
    if(player.isZone2) player.isZone2 = false

    countForward(player)
    countProtected(player)

    // if(player.isKey) player.isKey = false
    if(player.isDeathCapture) player.isDeathCapture = true
    if(player.isProtected) player.isProtected = false
    if(player.isForward) player.isForward = false
    player.dimension = 0
  }
}

function killList(player, reason, killer) {
  if(player.isZone2 || player.isZone) {
    if(player.admin > 5) return
    if(killer) {
      let color = checkColorFaction(killer)
      let colorTwo = checkColorFaction(player)
      if(killer.name === player.name) {
        mp.players.forEach(res => {
          if(res.isProtected || res.isForward || res.admin > 5)
            res.call('showKillList', [JSON.stringify({player: player.name, color:color, killer: killer.name, colorTwo: colorTwo})])
        })
      } else {
        mp.players.forEach(res => {
          if(res.isProtected || res.isForward || res.admin > 5)
            res.call('showKillList', [JSON.stringify({player: player.name, color:color, killer: killer.name, colorTwo: colorTwo})])
        })
      }

    }
    player.isDeathCapture = true
    player.isZone = false
    player.isZone2 = false
    player.call('hideHudBrowser')
    
    countForward(player)
    countProtected(player)
  }
}

function destroyParams() {
 shapeList = []
}

function countForward(player) {
  if(player.admin > 5) return
  if(player.isForward) {
    player.isZone2
      ? countF++
      : countF--
  }
}

function countProtected(player) {
  if(player.admin > 5) return
  if(player.isProtected) {
    player.isZone2
     ? countP++
     : countP--
  }
}

function messageWarZone() {
  mp.players.forEach(res => {
      if(res.isForward) {
        res.utils.info('До захвата территории 10 мин, ожидайте противника')
      }
      else if(res.isProtected) {
        res.utils.warning('У вас есть 10 мин, что бы приготовиться к защите территории')
      }
  })
}

function nullParamsArray() {
  countF = 0
  countP = 0

  forwardTeam.players = []
  protectedTeam.players = []

  forwardTeam.faction = null
  protectedTeam.faction = null

  forwardTeam.name = null
  protectedTeam.name = null

  forwardTeam.color = null
  protectedTeam.color = null

  forwardTeam.colorZone = null
  protectedTeam.colorZone = null

  mp.players.forEach(res => {
    if(res.isForward || res.isProtected || res.admin > 5) {
      res.isForward = false
      res.isProtected = false
      res.isZone = false
      res.isZone2 = false
      res.indexZone = 0
    }
  })
}

function updateForwardTeam(id) {
  mp.players.forEach(res => {
    if(res.faction === id) {
      res.isForward = true
      forwardTeam.players.push(res)
    }
  })
}

function updateProtectedTeam(id) {
  mp.players.forEach(res => {
    if(res.faction === id) {
      res.isProtected = true
      protectedTeam.players.push(res)
    }
  })
}

function findTerritoryFactions(id){
  let findFaction = zoneList[id]
  return findFaction.faction
}

// function callBinder(player) {
//   player.isKey
//     ? player.call('bindStartCapture')
//     : player.call('unbindStartCapture')
// }

// function callEnterKey(player) {
//   player.isKey
//     ? player.call('keyShow')
//     : player.call('keyHide')
// }

function colorNameFactionHud(forward, protected) {
  if(forward === 9) {
    forwardTeam.color = factionConfig.COLOR_FAMILIES
    forwardTeam.name = factionConfig.NAME_FAMILIES
    forwardTeam.colorZone = factionConfig.COLOR_ZONE_FAMILIES
  }
  if(forward === 10) {
    forwardTeam.color = factionConfig.COLOR_BALLAS
    forwardTeam.name = factionConfig.NAME_BALLAS
    forwardTeam.colorZone = factionConfig.COLOR_ZONE_BALLAS
  }
  if(forward === 12) {
    forwardTeam.color = factionConfig.COLOR_VAGOS
    forwardTeam.name = factionConfig.NAME_VAGOS
    forwardTeam.colorZone = factionConfig.COLOR_ZONE_VAGOS
  }
  if(forward === 13) {
    forwardTeam.color = factionConfig.COLOR_MARABUNTA
    forwardTeam.name = factionConfig.NAME_MARABUNTA
    forwardTeam.colorZone = factionConfig.COLOR_ZONE_MARABUNTA
  }
  if(forward === 24) {
    forwardTeam.color = factionConfig.COLOR_BLOODS
    forwardTeam.name = factionConfig.NAME_BLOODS
    forwardTeam.colorZone = factionConfig.COLOR_ZONE_BLOODS
  }
  if(protected === 9) {
    protectedTeam.color = factionConfig.COLOR_FAMILIES
    protectedTeam.name = factionConfig.NAME_FAMILIES
    protectedTeam.colorZone = factionConfig.COLOR_ZONE_FAMILIES
  }
  if(protected === 10) {
    protectedTeam.color = factionConfig.COLOR_BALLAS
    protectedTeam.name = factionConfig.NAME_BALLAS
    protectedTeam.colorZone = factionConfig.COLOR_ZONE_BALLAS
  }
  if(protected === 12) {
    protectedTeam.color = factionConfig.COLOR_VAGOS
    protectedTeam.name = factionConfig.NAME_VAGOS
    protectedTeam.colorZone = factionConfig.COLOR_ZONE_VAGOS
  }
  if(protected === 13) {
    protectedTeam.color = factionConfig.COLOR_MARABUNTA
    protectedTeam.name = factionConfig.NAME_MARABUNTA
    protectedTeam.colorZone = factionConfig.COLOR_ZONE_MARABUNTA
  }
  if(protected === 24) {
    protectedTeam.color = factionConfig.COLOR_BLOODS
    protectedTeam.name = factionConfig.NAME_BLOODS
    protectedTeam.colorZone = factionConfig.COLOR_ZONE_BLOODS
  }
}

function updateZoneCommand() {
  destroyParams()


}

function returnIndexZone(id) {
 let pos = zoneList[id]
 return pos
}

function returnInfoZone(entity) {
  let idZone = parseInt(entity.indexZone)
  return idZone
}

function hourCheck() {
  return now.getHours()
}

function checkColorFaction(entity) {
 let color = ''
 if(entity.isForward) {
   color = forwardTeam.color
 }
 else if(entity.isProtected) {
   color = protectedTeam.color
 }
 return color
}

module.exports = {
  initZoneCapture,
  initCallZone,
  paydayStorageBand,
  updateZoneCapture,
  returnIndexZone,
  returnInfoZone,
  updateZoneCommand
}
