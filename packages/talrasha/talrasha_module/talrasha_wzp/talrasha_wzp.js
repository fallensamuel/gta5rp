const {zoneLoadInfo, updateZoneFaction, zoneFaction} = require("./talrasha_database")

let zoneListWzp = ''
let shapeIndexWzp
let shapeZoneWzp
let shapeZoneWzp2
let blipWzp

let blipListWzp = []
let shapeListWzp = []

let isWarZoneWzp = false
let now = new Date()
let countPWzp = 0
let countFWzp = 0

const TIMER_WAIT = 60*10, TIMER_WAR = 60*7
const MONEY_STORAGE = 300

const forwardTeamWzp = {
 faction: null,
 color: null,
 name: null,
 players: [],
}

const protectedTeamWzp = {
 faction: null,
 color: null,
 name: null,
 players: [],
}

const factionConfigWzp = {
  COLOR18: '#fff',
  COLOR19: '#ff0000',
  NAME18: 'Biker Brotherhood',
  TITLE18: 'B',
  NAME19: 'Biker The Lost MC',
  TITLE19: 'L'
}

mp.events.add('playerEnterColshape', shapeEnterZone)
mp.events.add('playerExitColshape', shapeExitZone)
mp.events.add('startWarZone', callWarZone)
mp.events.add('playerDeath', killList)
mp.events.add('playerQuit', quitPlayer)

// Export в ServerInit
async function initWzp() {
 zoneListWzp = await zoneLoadInfo()
 zoneListWzp.forEach(zone => {
  let blip = mp.blips.new(642, new mp.Vector3(parseInt(zone.x), parseInt(zone.y), parseInt(zone.z)), {name: `Предприятие`, color: 0, scale: 1, shortRange: true})
  let shape = mp.colshapes.newSphere(parseInt(zone.x), parseInt(zone.y), parseInt(zone.z), 1.5, 0)
  shapeListWzp.push(shape)
  blipListWzp.push(blip)
 })
}

//Export в CharacterEvent
function initMarker(player) {
 if(player.faction === 18 || player.faction === 19 || player.admin > 5) {
  player.call('initMarkers', [zoneListWzp])
 }
}

function shapeEnterZone(player, shape) {
    for (i = 0; i < shapeListWzp.length; i++) {
    if(shape === shapeListWzp[i]) {
      if(player.faction === 18 || player.faction === 19 || player.admin > 5) {
      	if(player.vehicle) return player.utils.info('Выйдите с авто')
      	// player.isKey = true
      	// callBinder(player)
      	player.shapeIndexWzp = shapeListWzp.indexOf(shapeListWzp[i])
        player.isShapeZoneWzp = true
        let infoWzpTitle = infoWzp(player.shapeIndexWzp)
        player.call('infoModalWindow', [JSON.stringify({id: player.shapeIndexWzp, title: infoWzpTitle, zone: false})])
      }  
    }
  }
  if(shape === shapeZoneWzp) {
  	if(player.faction === 18 || player.faction === 19 || player.admin > 5) {
	  	if(player.vehicle) return player.utils.info('Выйдите с авто')
      if(player.isDeathWzp) return
	    player.isZoneWzp = true
	    player.dimension = 103	
  	}    
  }
  if(shape === shapeZoneWzp2) {
  	if(player.faction === 18 || player.faction === 19 || player.admin > 5) {
	    if(player.vehicle) return player.utils.info('Выйдите с авто')
      if(player.isDeathWzp) return
	    player.isZoneWzp2 = true
      player.dimension = 103
	    countForward(player)
	    countProtected(player)
	    player.call('callHudBrowser')
  	}
  }
}

function shapeExitZone(player, shape) {
  for (i = 0; i < shapeListWzp.length; i++) {
    if(shape === shapeListWzp[i]) {
      if(player.vehicle) return player.utils.info('Выйдите с авто')
      // player.isKey = false
      // callBinder(player)
      player.isShapeZoneWzp = false
      player.call('hideModalWindow')
    }
  }

  if(shape === shapeZoneWzp) {
    if(player.vehicle) return player.utils.info('Выйдите с авто')
    if(player.isDeathWzp) return
    player.isZoneWzp = false
  }

  if(shape === shapeZoneWzp2) {
    if(player.vehicle) return player.utils.info('Выйдите с авто')
    if(player.isDeathWzp) return
    player.isZoneWzp2 = false
    countForward(player)
    countProtected(player)
    player.call('hideHudBrowser')
  }
}



function callWarZone(player) {
  player.call('hideModalWindow')
  if(player.isShapeZoneWzp) {
    shapeIndexWzp = player.shapeIndexWzp
     const zoneFaction = findTerritoryFactions(shapeIndexWzp)
     if(hourCheck() < 11 || hourCheck() > 23) return player.utils.info('Вы не можете начать захвать после 23:00 до' +
      ' 11:00')
     if(player.faction === zoneFaction) return player.utils.warning('Вы уже захватили это предприятие')
     if(player.rank < 7) return player.utils.warning('Ваш ранг слишком низкий')
     if(isWarZoneWzp) return player.utils.warning('Уже идет захват предприятия')
     const zone = zoneListWzp[shapeIndexWzp]
     updateForwardTeam(player.faction)
     forwardTeamWzp.faction = player.faction
     protectedTeamWzp.faction = zoneFaction
     colorNameFactionHud(forwardTeamWzp.faction, protectedTeamWzp.faction)
     updateProtectedTeam(zoneFaction)
     if(protectedTeamWzp.players.length === 0) return player.utils.warning('Фракция не найдена') //* раскоментить
    // после теста
     isWarZoneWzp = true
     warWait(player, zone)
  
  } else {
    player.utils.info('Вы находитесь не в зоне вызова')
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
    if(res.isForwardWzp || res.isProtectedWzp || res.admin > 5) {
     res.call('createZone', [zone])
     shapeZoneWzp = mp.colshapes.newSphere(parseInt(zone.x), parseInt(zone.y), parseInt(zone.z), 75, 0)
     shapeZoneWzp2 = mp.colshapes.newSphere(parseInt(zone.x), parseInt(zone.y), parseInt(zone.z), 75, 103)
    }
  })
  timerWarZone(TIMER_WAR)
}

function warEnd() {
  isWarZoneWzp = false

  shapeZoneWzp.destroy()
  shapeZoneWzp2.destroy()
  blipWzp.destroy()

  winTeam()

  mp.players.forEach(res => {
    if(res.dimension === 103) res.dimension = 0

    res.call('hideHudBrowser')
    res.call('destroyZone')
    res.call('hideKillList')
  })
}

function winTeam() {
  let winFactionWzp = 0
  let color = 0

  if(countFWzp > countPWzp) {
    winFactionWzp = forwardTeamWzp.faction
    color = forwardTeamWzp.colorZone
    mp.players.forEach(res => {
      if(res.isForwardWzp) {
        res.utils.info('Вам удалось захватить контроль над предприятием')
      }
      if(res.isProtectedWzp) {
        res.utils.info('Вам не удалось отстоять свое предприятие')
      }
    })
    updateZoneWzp(shapeIndexWzp + 1, winFactionWzp)
  }
  else if(countFWzp <= countPWzp) {
    winFactionWzp =  protectedTeamWzp.faction
    color = protectedTeamWzp.colorZone

    mp.players.forEach(res => {
      if(res.isForwardWzp) {
        res.utils.info('Вам не удалось захватить контроль над предприятием')
      }
      if(res.isProtectedWzp) {
        res.utils.info('Вы отстояли свое предприятие')
      }
    })
    updateZoneWzp(shapeIndexWzp + 1, winFactionWzp)
  }
}

function updateZoneWzp(zone, idFaction) {
  updateZoneFaction(zone, idFaction, now)

  destroyParams()

  mp.players.forEach(res => {
    res.call('hideKillList')
    if(res.isDeathWzp) res.isDeathWzp = false
  })
  setTimeout(updateLast, 700)
}

async function updateLast() {
  nullParamsArray()
  await initWzp()
  await mp.players.forEach(res => {
    initMarker(res)
  })
}

function killList(player, reason, killer) {
  if(player.isDeathWzp) return
  if (player.admin > 5) return
  if (player.isForwardWzp || player.isProtectedWzp) {
    player.isDeathWzp = true
    player.isZoneWzp = false
    player.isZoneWzp2 = false
    player.call('hideHudBrowser')

    countForward(player)
    countProtected(player)

    if (killer) {
      let color = checkColorFaction(killer)
      let colorTwo = checkColorFaction(player)
      if (killer.name === player.name) {
        mp.players.forEach(res => {
          if(res.isProtectedWzp || res.isForwardWzp || res.admin > 5) {
            res.call('showKillList', [JSON.stringify({player: player.name, color:color, killer: killer.name, colorTwo: colorTwo})])
          }
        })
      } else {
        mp.players.forEach(res => {
          if(res.isProtectedWzp || res.isForwardWzp || res.admin > 5) {
            res.call('showKillList', [JSON.stringify({player: player.name, color:color, killer: killer.name, colorTwo: colorTwo})])
          }
        })
      }
    }
  }
}

function quitPlayer(player) {
  if(player.isForwardWzp || player.isProtectedWzp || player.admin > 5) {
    if(player.isZoneWzp) player.isZoneWzp = false
    if(player.isZoneWzp2) player.isZoneWzp2 = false

    countForward(player)
    countProtected(player)

    // if(player.isKey) player.isKey = false
    if(player.isDeathWzp) player.isDeathWzp = true
    if(player.isProtectedWzp) player.isProtectedWzp = false
    if(player.isForwardWzp) player.isForwardWzp = false
    player.dimension = 0
  }
}

// Выдаем каждый час 300$ на склад фракций *Export в timers
async function paydayStorage() {
  const faction18 = await zoneFaction(18)
  const faction19 = await zoneFaction(19)

  /* Прописать путь к выдаче на склад фракции Это всего лишь пример*/
  mp.players.forEach(res => {
    var faction = mp.factions.getBySqlId(res.faction)
      if(res.faction === 18) return faction.setBalance(faction.balance + (parseInt(faction18) * MONEY_STORAGE))
      if(res.faction === 19) return faction.setBalance(faction.balance + (parseInt(faction19) * MONEY_STORAGE))
    })

  console.log('[PAYDAY] Фракции получили деньги на свои склады')
}

function timerWait(duration, zone) {
  let timer = duration, minutes, seconds
  const timers = setInterval(() => {
    minutes = parseInt(timer / 60, 10)
    seconds = parseInt(timer % 60, 10)

    minutes = minutes < 10 ? "0" + minutes : minutes
    seconds = seconds < 10 ? "0" + seconds : seconds

    mp.players.forEach(res => {
      if(res.isForwardWzp || res.isProtectedWzp) {
          res.call('showNotify', [JSON.stringify({minutes, seconds, shapeIndexWzp}), true])
      }
    })

    if (--timer < 0) {
      clearInterval(timers)
      mp.players.forEach(res => {
        if(res.isForwardWzp || res.isProtectedWzp) {
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

    const colorF = forwardTeamWzp.color
    const colorP = protectedTeamWzp.color
    const nameF = forwardTeamWzp.name
    const nameP = protectedTeamWzp.name
    const countP = countPWzp
    const countF = countFWzp

    mp.players.forEach(res => {
      if(res.isForwardWzp || res.isProtectedWzp || res.admin > 5) {
        if(res.isZoneWzp2) {
          res.call('callParamsHud', [JSON.stringify({minutes, seconds, countF, countP, colorF, colorP, nameF, nameP})])
        }
      }
    })

    // * раскоментить после теста
    if(countPWzp === 0 || countFWzp === 0) {
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
    countPWzp = 0
    countFWzp = 0

    forwardTeamWzp.players = []
    protectedTeamWzp.players = []

    forwardTeamWzp.count = 0
    protectedTeamWzp.count = 0

    forwardTeamWzp.faction = null
    protectedTeamWzp.faction = null

    forwardTeamWzp.name = null
    protectedTeamWzp.name = null

    forwardTeamWzp.color = null
    protectedTeamWzp.color = null

   mp.players.forEach(res => {
    if(res.isForwardWzp || res.isProtectedWzp || res.admin > 5) {
     if(res.isForwardWzp) res.isForwardWzp = false
     if(res.isProtectedWzp)res.isProtectedWzp = false
     if(res.isZoneWzp) res.isZoneWzp = false
     if(res.isZoneWzp2) res.isZoneWzp2 = false
     if(res.isKey) res.isKey = false
     if(res.isDeathWzp) res.isDeathWzp = false
     if(res.indexZoneWzp) res.indexZoneWzp = 0
    }
   })
}

function destroyParams() {
  blipListWzp.forEach(res => res.destroy())
  shapeListWzp.forEach(res => res.destroy())
  blipListWzp = []
  shapeListWzp = []
  mp.players.forEach(res => res.call('destroyMarker'))
}

function createBlips(zone) {
  blipWzp = mp.blips.new(642, new mp.Vector3(parseInt(zone.x), parseInt(zone.y), parseInt(zone.z)), {name: `Предприятие`, color: 1, scale: 1, shortRange: true})
}

function countForward(player) {
  if (player.admin > 5 ) return
  if(player.isForwardWzp) {
    player.isZoneWzp2
      ? countFWzp++
      : countFWzp--
  }
}

function countProtected(player) {
  if (player.admin > 5 ) return
  if(player.isProtectedWzp) {
    player.isZoneWzp2
     ? countPWzp++
     : countPWzp--
  }
}

function messageWarZone() {
  mp.players.forEach(res => {
    if(res.isForwardWzp) {
      res.utils.info('До захвата предприятия 10 мин, ожидайте противника')
    }
    else if(res.isProtectedWzp) {
      res.utils.warning('У вас есть 10 мин, что бы приготовиться к защите предприятия')
    }
  })
}

function updateForwardTeam(id) {
 mp.players.forEach(res => {
  if (res.admin >5 ) return
   if(res.faction === id) {
     res.isForwardWzp = true
     forwardTeamWzp.players.push(res)
   }
 })
}

function updateProtectedTeam(id) {
  mp.players.forEach(res => {
    if (res.admin >5 ) return
    if(res.faction === id) {
      res.isProtectedWzp = true
      protectedTeamWzp.players.push(res)
    }
  })
}

function findTerritoryFactions(id) {
  let findFaction = zoneListWzp[id]
  return findFaction.faction
}

// function callBinder(player) {
//  player.isKey
//    ? player.call('bindKey')
//    : player.call('unbindKey')
// }

function colorNameFactionHud(forward, protected) {
  if(forward === 18) {
    forwardTeamWzp.color = factionConfigWzp.COLOR18
    forwardTeamWzp.name = factionConfigWzp.TITLE18
  }
  if(forward === 19) {
    forwardTeamWzp.color = factionConfigWzp.COLOR19
    forwardTeamWzp.name = factionConfigWzp.TITLE19
  }
  if(protected === 18) {
    protectedTeamWzp.color = factionConfigWzp.COLOR18
    protectedTeamWzp.name = factionConfigWzp.TITLE18
  }
  if(protected === 19) {
    protectedTeamWzp.color = factionConfigWzp.COLOR19
    protectedTeamWzp.name = factionConfigWzp.TITLE19
  }
}

function hourCheck() {
  return now.getHours()
}

function checkColorFaction(entity) {
  let color = ''
  if(entity.isForwardWzp) {
    color = forwardTeamWzp.color
  }
  else if(entity.isProtectedWzp) {
    color = protectedTeamWzp.color
  }
  return color
}

function infoWzp(id) {
  let title = 'Упс'
  let info = zoneListWzp[id]
  if(info.faction === 19) {
    title = factionConfigWzp.NAME19
  }
  if(info.faction === 18) {
    title = factionConfigWzp.NAME18
  }
  return title
}

module.exports  = {
  initWzp,
  initMarker,
  paydayStorage,
  updateZoneWzp
}




