const {zoneLoadInfo, updateZoneFaction, zoneFaction} = require("./talrasha_database")

let zoneListBiz = ''
let shapeIndexBiz
let shapeZoneBiz
let shapeZoneBiz2
let blipBiz

let blipListBiz = []
let shapeListBiz = []

let isWarZoneBiz = false
let now = new Date()
let countPBiz = 0
let countFBiz = 0

const TIMER_WAIT = 60*10, TIMER_WAR = 60*7
const MONEY_STORAGE = 300

const forwardTeamBiz = {
  faction: null,
  color: null,
  name: null,
  players: [],
}

const protectedTeamBiz = {
  faction: null,
  color: null,
  name: null,
  players: [],
}

const factionConfigBiz = {
  COLOR14: '#000000',
  COLOR15: '#00008b',
  COLOR16: '#fff',
  COLOR17: '#f4a460',
  COLOR20: '#ff0000',
  COLOR22: '#560319',

  TITLE14: 'R',
  TITLE15: 'L',
  TITLE16: 'Y',
  TITLE17: 'M',
  TITLE20: 'A',
  TITLE22: 'C',
  
  NAME14: 'Russian Mafia',
  NAME15: 'La Cosa Nostra',
  NAME16: 'Yakuza Mafia',
  NAME17: 'Mexican Cartel',
  NAME20: 'Armenian Mafia',
  NAME22: 'Chechen Mafia',
}

mp.events.add('playerEnterColshape', shapeEnterZone)
mp.events.add('playerExitColshape', shapeExitZone)
mp.events.add('startBizWarZone', callWarZoneBiz)
mp.events.add('playerDeath', killList)
mp.events.add('playerQuit', quitPlayer)

// Export в ServerInit
async function initBizWar() {
  zoneListBiz = await zoneLoadInfo()
  zoneListBiz.forEach(zone => {
    let blip = mp.blips.new(431, new mp.Vector3(parseInt(zone.x), parseInt(zone.y), parseInt(zone.z)), {name: `Предприятие`, color: 0, scale: 1, shortRange: true})
    let shape = mp.colshapes.newSphere(parseInt(zone.x), parseInt(zone.y), parseInt(zone.z), 1.5, 0)
    shapeListBiz.push(shape)
    blipListBiz.push(blip)
  })
}

//Export в CharacterEvent
function initMarkers(player) {
  if(player.faction === 14 || player.faction === 15 || player.faction === 16 || player.faction === 17 || player.faction === 20 || player.faction === 22 || player.admin > 5) {
    player.call('initMarkersBiz', [zoneListBiz])
  }
}

function shapeEnterZone(player, shape) {
  for (i = 0; i < shapeListBiz.length; i++) {
    if(shape === shapeListBiz[i]) {
      if(player.faction === 14 || player.faction === 15 || player.faction === 16 || player.faction === 17 || player.faction === 20 || player.faction === 22 || player.admin > 5) {
        if(player.vehicle) return player.utils.info('Выйдите с авто')
        // player.isKey = true
        // callBinder(player)
        player.shapeIndexBiz = shapeListBiz.indexOf(shapeListBiz[i])
        player.isShapeZoneBiz = true       
        let infoBizTitle = infoBizWar(player.shapeIndexBiz)
        player.call('infoModalWindow', [JSON.stringify({id: player.shapeIndexBiz, title: infoBizTitle, zone: true})])
      }
    }
  }
  if(shape === shapeZoneBiz) {
    if(player.vehicle) return player.utils.info('Выйдите с авто')
    if(player.faction === 14 || player.faction === 15 || player.faction === 16 || player.faction === 17 || player.faction === 20 || player.faction === 22 || player.admin > 5) {
      if(player.isDeathBiz) return
      player.isZoneBiz = true
      player.dimension = 102
    }  
  }
  if(shape === shapeZoneBiz2) {
    if(player.faction === 14 || player.faction === 15 || player.faction === 16 || player.faction === 17 || player.faction === 20 || player.faction === 22 || player.admin > 5) {
      if(player.vehicle) return player.utils.info('Выйдите с авто')
      if(player.isDeathBiz) return
      player.isZoneBiz2 = true
      countForward(player)
      countProtected(player)
      player.call('callHudBrowser')
    }
  }
}

function shapeExitZone(player, shape) {
  for (i = 0; i < shapeListBiz.length; i++) {
    if(shape === shapeListBiz[i]) {
      if(player.vehicle) return player.utils.info('Выйдите с авто')
      player.isShapeZoneBiz = false
      player.call('hideModalWindow')
      // player.isKey = false
      // callBinder(player)

    }
  }
  if(shape === shapeZoneBiz) {
    if(player.vehicle) return player.utils.info('Выйдите с авто')
    if(player.isDeathBiz) return
    player.isZoneBiz = false
    player.call('hideHudBrowser')
  }
  if(shape === shapeZoneBiz2) {
    if(player.vehicle) return player.utils.info('Выйдите с авто')
    if(player.isDeathBiz) return
    player.isZoneBiz2 = false
    countForward(player)
    countProtected(player)
    player.call('hideHudBrowser')
  }
}


function callWarZoneBiz(player) {
  player.call('hideModalWindow')  
  if(player.isShapeZoneBiz) {
    shapeIndexBiz = player.shapeIndexBiz
    let zoneFaction = findTerritoryFactions(shapeIndexBiz)
    if(hourCheck() < 11 || hourCheck() > 23) return player.utils.info('Вы не можете начать захвать после 23:00 до' +
    ' 11:00')
    if(player.faction === zoneFaction) return player.utils.warning('Вы уже захватили это предприятие')
    if(player.rank < 7) return player.utils.warning('Ваш ранг слишком низкий')
    if(isWarZoneBiz) return player.utils.warning('Уже идет захват предприятия')
    const zone = zoneListBiz[shapeIndexBiz]
    updateForwardTeam(player.faction)
    forwardTeamBiz.faction = player.faction
    protectedTeamBiz.faction = zoneFaction
    colorNameFactionHud(forwardTeamBiz.faction, protectedTeamBiz.faction)
    updateProtectedTeam(zoneFaction)
    if(protectedTeam.players.length === 0) return player.utils.warning('Фракция не найдена')
    isWarZoneBiz = true
    warWait(player, zone)
  
  } else {
    player.utils.info('Вы должны находиться в зоне вызова')
    return
  }
}

function warWait(player, zone) {
  // player.isKey = false
  // callBinder(player)
  messageWarZone()
  destroyParams()
  createBlips(zone)
  timerWait(TIMER_WAIT, zone)
}

function warContent(zone) {
  mp.players.forEach(res => {
   if(res.isForwardBiz || res.isProtectedBiz || res.admin > 5) {
     shapeZoneBiz = mp.colshapes.newSphere(parseInt(zone.x), parseInt(zone.y), parseInt(zone.z), 75, 0)
     shapeZoneBiz2 = mp.colshapes.newSphere(parseInt(zone.x), parseInt(zone.y), parseInt(zone.z), 75, 102)
     res.call('createZoneBiz', [zone])
   }
  })
  timerWarZone(TIMER_WAR)
}

function warEnd() {
  isWarZoneBiz = false

  shapeZoneBiz.destroy()
  shapeZoneBiz2.destroy()
  blipBiz.destroy()

  winTeam()

  mp.players.forEach(res => {
    if(res.dimension === 102) res.dimension = 0

    res.call('hideHudBrowser')
    res.call('destroyZoneBiz')
    res.call('hideKillList')
  })
}

function winTeam() {
  let winFactionBiz = 0
  let color = 0

  if(countFBiz > countPBiz) {
    winFactionBiz = forwardTeamBiz.faction
    color = forwardTeamBiz.colorZone
    mp.players.forEach(res => {
      if(res.isForwardBiz) {
        res.utils.info('Вам удалось захватить контроль над бизнесом')
      }
      if(res.isProtectedBiz) {
        res.utils.info('Вам не удалось отстоять свой бизнес')
      }
    })
    updateZoneBizWar(shapeIndexBiz + 1, winFactionBiz)
  }
  else if(countFBiz <= countPBiz) {
    winFactionBiz =  protectedTeamBiz.faction
    color = protectedTeamBiz.colorZone

    mp.players.forEach(res => {
      if(res.isForwardBiz) {
        res.utils.info('Вам не удалось захватить контроль над бизнесом')
      }
      if(res.isProtectedBiz) {
        res.utils.info('Вы отстояли свой бизнес')
      }
    })
    updateZoneBizWar(shapeIndexBiz + 1, winFactionBiz)
  }
}

function updateZoneBizWar(zone, idFaction) {
  updateZoneFaction(zone, idFaction, now)

  destroyParams()

  mp.players.forEach(res => {
    res.call('hideKillList')
    if(res.isDeathBiz) res.isDeathBiz = false
  })
  setTimeout(updateLast, 700)
}

async function updateLast() {
  nullParamsArray()
  await initBizWar()
  await mp.players.forEach(res => {
    initMarkers(res)
  })
}

function killList(player, reason, killer) {
  if(player.isDeathBiz) return
  if (player.admin > 5) return
  if (player.isForwardBiz || player.isProtectedBiz ) {
    player.isDeathBiz = true
    player.isZoneBiz = false
    player.isZoneBiz2 = false
    player.call('hideHudBrowser')

    countForward(player)
    countProtected(player)

    if (killer) {
      let color = checkColorFaction(killer)
      let colorTwo = checkColorFaction(player)

      if (killer.name === player.name) {
        mp.players.forEach(res => {
          if(res.isProtectedBiz || res.isForwardBiz || res.admin > 5) {
            res.call('showKillList', [JSON.stringify({player: player.name, color:color, killer: killer.name, colorTwo: colorTwo})])
          }
        })
      } else {
        mp.players.forEach(res => {
          if(res.isProtectedBiz || res.isForwardBiz || res.admin > 5) {
            res.call('showKillList', [JSON.stringify({player: player.name, color:color, killer: killer.name, colorTwo: colorTwo})])
          }
        })
      }

    }
  }
}

function quitPlayer(player) {
  if(player.isForwardBiz || player.isProtectedBiz || player.admin > 5) {
    if(player.isZoneBiz) player.isZoneBiz = false
    if(player.isZoneBiz2) player.isZoneBiz2 = false

    countForward(player)
    countProtected(player)

    if(player.isKey) player.isKey = false
    if(player.isDeathBiz) player.isDeathBiz = true
    if(player.isProtectedBiz) player.isProtectedBiz = false
    if(player.isForwardBiz) player.isForwardBiz = false
    player.dimension = 0
  }
}

// Выдаем каждый час 300$ на склад фракций *Export в timers
async function paydayStorageBiz() {
  const faction14 = await zoneFaction(14)
  const faction15 = await zoneFaction(15)
  const faction16 = await zoneFaction(16)
  const faction17 = await zoneFaction(17)
  const faction20 = await zoneFaction(20)
  const faction22 = await zoneFaction(22)

  /* Прописать путь к выдаче на склад фракции Это всего лишь пример*/
  mp.players.forEach(res => {
    var faction = mp.factions.getBySqlId(res.faction)
      if(res.faction === 14) return faction.setBalance(faction.balance + (parseInt(faction14) * MONEY_STORAGE))
      if(res.faction === 15) return faction.setBalance(faction.balance + (parseInt(faction15) * MONEY_STORAGE))
      if(res.faction === 16) return faction.setBalance(faction.balance + (parseInt(faction16) * MONEY_STORAGE))
      if(res.faction === 17) return faction.setBalance(faction.balance + (parseInt(faction17) * MONEY_STORAGE))
      if(res.faction === 20) return faction.setBalance(faction.balance + (parseInt(faction20) * MONEY_STORAGE))
      if(res.faction === 22) return faction.setBalance(faction.balance + (parseInt(faction22) * MONEY_STORAGE))
    })
      console.log('[PAYDAY] Фракции получили деньги на свои склады')
  // setTimeout(paydayStorageBiz, 60*60*1000) //закоменить или удалить если в таймерс export
}

function timerWait(duration, zone) {
  let timer = duration, minutes, seconds
  const timers = setInterval(() => {
    minutes = parseInt(timer / 60, 10)
    seconds = parseInt(timer % 60, 10)

    minutes = minutes < 10 ? "0" + minutes : minutes
    seconds = seconds < 10 ? "0" + seconds : seconds

    mp.players.forEach(res => {
      if(res.isForwardBiz || res.isProtectedBiz) {
        res.call('showNotifyBiz', [JSON.stringify({minutes, seconds, shapeIndexBiz})])
      }
    })

    if (--timer < 0) {
      clearInterval(timers)
      mp.players.forEach(res => {
        if(res.isForwardBiz || res.isProtectedBiz) {
          res.call('hideNotify')
        }
      })

      warContent(zone)
    }
  }, 1000)
}

function timerWarZone(duration) {
  let timer = duration, minutes, seconds
  const timers = setInterval(() => {
    minutes = parseInt(timer / 60, 10)
    seconds = parseInt(timer % 60, 10)

    minutes = minutes < 10 ? "0" + minutes : minutes
    seconds = seconds < 10 ? "0" + seconds : seconds

    const colorF = forwardTeamBiz.color
    const colorP = protectedTeamBiz.color
    const nameF = forwardTeamBiz.name
    const nameP = protectedTeamBiz.name

    mp.players.forEach(res => {
      if(res.isForwardBiz || res.isProtectedBiz || res.admin > 5) {
        if(res.isZoneBiz2) {
          res.call('callParamsHudBiz', [JSON.stringify({minutes, seconds, countFBiz, countPBiz, colorF, colorP, nameF, nameP})])
        }
      }
    })

    //* раскоментить после теста
    if(countPBiz === 0 || countFBiz === 0) {
      clearInterval(timers)
      warEnd()
    }

    if (--timer < 0) {
      clearInterval(timers)
      warEnd()
    }
  }, 1000)
}

function nullParamsArray() {
  countPBiz = 0
  countFBiz = 0

  forwardTeamBiz.players = []
  protectedTeamBiz.players = []

  forwardTeamBiz.count = null
  protectedTeamBiz.count = null

  forwardTeamBiz.faction = null
  protectedTeamBiz.faction = null

  forwardTeamBiz.name = null
  protectedTeamBiz.name = null

  forwardTeamBiz.color = null
  protectedTeamBiz.color = null

  mp.players.forEach(res => {
    if(res.isForwardBiz || res.isProtectedBiz || res.admin > 5) {
      if(res.isForwardBiz) res.isForwardBiz = false
      if(res.isProtectedBiz)res.isProtectedBiz = false
      if(res.isZoneBiz) res.isZoneBiz = false
      if(res.isZoneBiz2) res.isZoneBiz2 = false
      if(res.isKey) res.isKey = false
      if(res.isDeathBiz) res.isDeathBiz = false
      if(res.indexZone) res.indexZone = 0
    }
  })
}

function destroyParams() {
  blipListBiz.forEach(res => res.destroy())
  shapeListBiz.forEach(res => res.destroy())
  blipListBiz = []
  shapeListBiz = []

  mp.players.forEach(res => {
    res.call('destroyMarkerBiz')
  })
}

function createBlips(zone) {
  blipBiz = mp.blips.new(431, new mp.Vector3(parseInt(zone.x), parseInt(zone.y), parseInt(zone.z)), {name: `Предприятие`, color: 1, scale: 1, shortRange: true})
}

function countForward(player) {
  if(player.admin > 5) return
  if(player.isForwardBiz) {
    player.isZoneBiz2
      ? countFBiz++
      : countFBiz--
  }
}

function countProtected(player) {
  if(player.admin > 5) return
  if(player.isProtectedBiz) {
    player.isZoneBiz2
      ? countPBiz++
      : countPBiz--
  }
}

function messageWarZone() {
  mp.players.forEach(res => {
    if(res.isForwardBiz) {
      res.utils.info('До захвата предприятия 10 мин, ожидайте противника')
    }
    else if(res.isProtectedBiz) {
      res.utils.warning('У вас есть 10 мин, что бы приготовиться к защите предприятия')
    }
  })
}

function updateForwardTeam(id) {
  mp.players.forEach(res => {
    if(res.faction === id) {
      res.isForwardBiz = true
      forwardTeamBiz.players.push(res)
    }
  })
}

function updateProtectedTeam(id) {
  mp.players.forEach(res => {
    if(res.faction === id) {
      res.isProtectedBiz = true
      protectedTeamBiz.players.push(res)
    }
  })
}

function findTerritoryFactions(id) {
  let findFaction = zoneListBiz[id]
  return findFaction.faction
}

// function callBinder(player) {
//   player.isKey
//     ? player.call('bindkeyBizWar')
//     : player.call('unbindkeyBizWar')
// }

function colorNameFactionHud(forward, protected) {
  if(forward === 14) {
    forwardTeamBiz.color = factionConfigBiz.COLOR14
    forwardTeamBiz.name = factionConfigBiz.TITLE14
  }
  if(forward === 15) {
    forwardTeamBiz.color = factionConfigBiz.COLOR15
    forwardTeamBiz.name = factionConfigBiz.TITLE15
  }
  if(forward === 16) {
    forwardTeamBiz.color = factionConfigBiz.COLOR16
    forwardTeamBiz.name = factionConfigBiz.TITLE16
  }
  if(forward === 17) {
    forwardTeamBiz.color = factionConfigBiz.COLOR17
    forwardTeamBiz.name = factionConfigBiz.TITLE17
  }
  if(forward === 20) {
    forwardTeamBiz.color = factionConfigBiz.COLOR20
    forwardTeamBiz.name = factionConfigBiz.TITLE20
  }
  if(forward === 22) {
    forwardTeamBiz.color = factionConfigBiz.COLOR22
    forwardTeamBiz.name = factionConfigBiz.TITLE22
  }
  if(protected === 14) {
    protectedTeamBiz.color = factionConfigBiz.COLOR14
    protectedTeamBiz.name = factionConfigBiz.TITLE14
  }
  if(protected === 15) {
    protectedTeamBiz.color = factionConfigBiz.COLOR15
    protectedTeamBiz.name = factionConfigBiz.TITLE15
  }
  if(protected === 16) {
    protectedTeamBiz.color = factionConfigBiz.COLOR16
    protectedTeamBiz.name = factionConfigBiz.TITLE16
  }
  if(protected === 17) {
    protectedTeamBiz.color = factionConfigBiz.COLOR17
    protectedTeamBiz.name = factionConfigBiz.TITLE17
  }
  if(protected === 20) {
    protectedTeamBiz.color = factionConfigBiz.COLOR20
    protectedTeamBiz.name = factionConfigBiz.TITLE20
  }
  if(protected === 22) {
    protectedTeamBiz.color = factionConfigBiz.COLOR22
    protectedTeamBiz.name = factionConfigBiz.TITLE22
  }
}

function hourCheck() {
  return now.getHours()
}

function checkColorFaction(entity) {
  let color = ''
  if(entity.isForwardBiz) {
    color = forwardTeamBiz.color
  }
  else if(entity.isProtectedBiz) {
    color = protectedTeamBiz.color
  }
  return color
}


function infoBizWar(id) {
  let title = 'Упс'
  let info = zoneListBiz[id]
  if(info.faction === 14) {
    title = factionConfigBiz.NAME14
  }
  if(info.faction === 15) {
    title = factionConfigBiz.NAME15
  }
  if(info.faction === 16) {
    title = factionConfigBiz.NAME16
  }
  if(info.faction === 17) {
    title = factionConfigBiz.NAME17
  }
  if(info.faction === 20) {
    title = factionConfigBiz.NAME20
  }
  if(info.faction === 22) {
    title = factionConfigBiz.NAME22
  }
  return title
}

module.exports = {
  initBizWar,
  initMarkers,
  paydayStorageBiz,
  updateZoneBizWar
}