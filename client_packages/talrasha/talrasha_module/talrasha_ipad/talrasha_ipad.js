const _player = mp.players.local
const key = [0x28]

exports = (menu) => {
//Евенты с сервера
 mp.events.add('ipad.init', ipadInit)
 mp.events.add('ipad.faction.show', factionShowIpad)
 mp.events.add('ipad.check.client', paramsCallCef)

 mp.events.add('ipad.police.addSearchPlayer', addSearchPlayer)
 mp.events.add('ipad.gov.addTeamPlayer', callAddTeamPlayer)

 mp.events.add('ipad.closed.addFine', closedAddFine)
 mp.events.add('ipad.call.showFactionBalance', callFactionBalance)
 mp.events.add('ipad.closed.windraw', closedPageWithdrawal)
 mp.events.add('ipad.police.addCall', policeAddCall)
 mp.events.add('ipad.police.removeCall', removeCall)
 mp.events.add('ipad.get.settings', sendSettings)
mp.events.add('ipad.load.searchPlayerFine', loadPlayerSearch)
 mp.events.add('ipad.call.logs', callLogsListShow)

//Евенты с цефа
 mp.events.add('ipad.faction.check', factionCheck)
 mp.events.add('ipad.call.searchPlayer', searchPlayer)
 mp.events.add('ipad.call.searchFine', searchFine)
 mp.events.add('ipad.send.addFine', sendAddFine)
 mp.events.add('ipad.call.addPlayer', callAddPlayer)
 mp.events.add('ipad.check.cefBalance', checkBalance)
 mp.events.add('ipad.send.withdrawal', sendWithdrawal)
 mp.events.add('ipad.send.accession', sendAccession)
 mp.events.add('ipad.give.rankChar', giveRank)
 mp.events.add('ipad.leave.rankChar', leaveRank)
 mp.events.add('ipad.kick.faction', kickFaction)
 mp.events.add('ipad.save.settings', callSettings)
 mp.events.add('ipad.remove.call', callCalls)
 mp.events.add('ipad.call.logsList', eventsLogsList)

 function setIpadActive(enable) {
  mp.ipadActive = enable;
 }

 function ipadInit() {
	if(mp.bindlocker()) return
  _player.showIpad = false
  bindKeys()
 }

 function callCalls(faction, data) {
  if(faction === 2 || faction === 3) {
   mp.events.callRemote('police.acceptCall', data)
  } else mp.events.callRemote('hospital.acceptCall', data)
 }

 function removeCall(index) {
  menu.execute(`ipad.deleteCall('${index}')`)
 }

 function eventsLogsList(data) {
  mp.events.callRemote('ipad.load.logsChar', data)
 }

 function bindKeys() {
  mp.keys.bind(key[0], false, appShowIpad)
 }

 function sendSettings(data) {
  menu.execute(`ipad.getSettings('${data}')`)
 }

 function policeAddCall(data) {
  menu.execute(`ipad.policeAddCall('${data}')`)
 }

 function loadPlayerSearch(id) {
  menu.execute(`ipad.showFinePlayer('${id}')`)
 }

 function callLogsListShow(data) {
  menu.execute(`ipad.showFullListInfo('${data}')`)
 }
		
 function appShowIpad() {
  _player.showIpad = !_player.showIpad
  if(_player.showIpad) {
   if(mp.bindlocker()) return
   setCursor(true)
   callCheckParams()
   checkBalance()

   mp.events.callRemote('ipad.init.teamPlayers')

   _player.event = 0
   menu.execute(`ipad.checkFaction()`)
   setIpadActive(true)
  } else {
   setCursor(false)
   _player.event = 0
   menu.execute(`ipad.hideMainIpad()`)
   menu.execute(`ipad.talrashahideipad()`)
   setIpadActive(false)
  }
 }

 function factionCheck() {
  mp.events.callRemote('ipad.faction.handler')
 }

 function factionShowIpad(data) {
  menu.execute(`ipad.handlerFaction('${data}')`)
 }

 function callCheckParams() {
  mp.events.callRemote('ipad.check.params')
 }

 function paramsCallCef(data) {
  menu.execute(`ipad.callParamsIpad('${data}')`)
 }

 function searchPlayer(event, param, items) {
  _player.event = items
  mp.events.callRemote('police.searchPlayer', event, param)
 }

 function searchFine(event, param) {
  mp.events.callRemote('police.searchPlayerFine', event, param)
 }


 function addSearchPlayer(data) {
  let res = JSON.parse(data)

  let houses = []
  for (let i = 0; i < res.houses.length; i++) {
   let h = res.houses[i]
   let getStreet = mp.game.pathfind.getStreetNameAtCoord(h.pos.x, h.pos.y, h.pos.z, 0, 0)
   let adress = mp.game.ui.getStreetNameFromHashKey(getStreet["streetName"])
   houses.push({ id: h.sqlId, adress: adress })
  }

  let rec = JSON.stringify({
   playerId: res.playerId,
   name: res.name,
   bank: res.bank,
   crimes: res.crimes,
   faction: res.faction,
   rank: res.rank,
   factionName: res.factionId,
   houses: houses,
  })

  if(_player.event === 1) {
   menu.execute(`ipad.showFinePlayer('${rec}')`)
  }
  if(_player.event === 2) {
   menu.execute(`ipad.showInfoPlayer('${rec}')`)
  }
 }

 function callAddPlayer() {
  mp.events.callRemote('ipad.init.teamPlayers')
 }

 function callAddTeamPlayer(data) {
  if(menu !== undefined) {
   menu.execute(`ipad.addTeamPlayer('${data}')`)
  }
 }

 function sendAddFine(data) {
  mp.events.callRemote('police.giveFine', data)
 }

 function checkBalance() {
  mp.events.callRemote('ipad.check.balance')
 }

 function closedAddFine() {
  menu.execute(`ipad.closedAddFine()`)
 }

 function callFactionBalance(data) {
  menu.execute(`ipad.callBalance('${data}')`)
 }

 function sendWithdrawal(summ) {
  mp.events.callRemote('ipad.withdrawal', summ)
 }

 function closedPageWithdrawal() {
  menu.execute(`ipad.closedWithdrawal()`)
 }

 function sendAccession(summ) {
  mp.events.callRemote('ipad.accession', summ)
 }

 function giveRank(id) {
  mp.events.callRemote('ipad.give.rank', id)
 }

 function leaveRank(id) {
  mp.events.callRemote('ipad.leave.rank', id)
 }

 function kickFaction(id) {
  mp.events.callRemote('ipad.kick.faction', id)
 }

 function callSettings(data) {
  mp.events.callRemote('ipad.call.settings', data)
 }

mp.events.add('ipad.click.sound', () => {
  mp.game.audio.playSoundFrontend(-1, "CLICK_BACK", "WEB_NAVIGATION_SOUNDS_PHONE", true)
})

 function setCursor(enable) {
  //_player.freezePosition(enable)
  mp.gui.cursor.show(enable, enable)
 }
}
