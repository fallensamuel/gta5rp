let hud
let killList
let modalWindow
let url = 'package://./talrasha/talrasha_html_capture/talrasha_capture_hud/index.html'
let urlKillList = 'package://./talrasha/talrasha_html_capture/talrasha_capture_kill_list/index.html'
let urlModal = 'package://./talrasha/talrasha_html_capture/talrasha_modal_window/index.html'

mp.events.add('initHudCapture', () => {
  hud = mp.browsers.new(url)
  killList = mp.browsers.new(urlKillList)
  modalWindow = mp.browsers.new(urlModal)
})

mp.events.add('showNotify', (data, isCapture) => {
  data = JSON.parse(data)
  if(isCapture) {
    let msg = `До захвата ${data.minutes}:${data.seconds} предприятия #${data.shapeIndexWzp + 1}`
    hud.execute(`showNotify('${msg}')`)
  } else {
    let msg = `До захвата ${data.minutes}:${data.seconds} территория #${data.zoneIndex + 1}`
    hud.execute(`showNotify('${msg}')`)
  }
})

mp.events.add('showNotifyBiz', (data) => {
  data = JSON.parse(data)
  let msg = `До захвата ${data.minutes}:${data.seconds} предприятия #${data.shapeIndexBiz + 1}`
  hud.execute(`showNotify('${msg}')`)
})

mp.events.add('hideNotify', () => {
  hud.execute(`hideNotify()`)
})

mp.events.add('callHudBrowser', () => {
  hud.execute(`showHud()`)
})

mp.events.add('hideHudBrowser', () => {
  hud.execute(`hideHud()`)
})

mp.events.add('callParamsHud', (data) => {
  hud.execute(`callParams('${data}')`)
})
mp.events.add('callParamsHudBiz', (data) => {
  hud.execute(`callParamsBiz('${data}')`)
})

mp.events.add('showKillList', (data) => {
  killList.execute(`killList.push('${data}')`)
})

mp.events.add('hideKillList', () => {
  killList.execute(`killList.hide()`)
})

mp.events.add('infoModalWindow', (data) => {
  modalWindow.execute(`modal.push('${data}')`)
})

mp.events.add('hideModalWindow', () => {
  modalWindow.execute(`modal.hide()`)
})