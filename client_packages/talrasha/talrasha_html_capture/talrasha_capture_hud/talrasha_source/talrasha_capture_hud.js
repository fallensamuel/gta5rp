const hudNotify = document.querySelector('#hudNotify')
const notify = document.querySelector('.notify')
const hudCapture = document.querySelector('#hudCapt')
const time = document.querySelector('#time')
const protectCount = document.querySelector('#deff-count')
const forwardCount = document.querySelector('#battle-count')
const protectName = document.querySelector('#prot-name')
const forwardName= document.querySelector('#forw-name')
const killList = document.querySelector('#kill-list')

function showNotify(msg) {
  hudNotify.style.display = 'block'
  notify.textContent = msg
}

function hideNotify() {
  hudNotify.style.display = 'none'
  notify.textContent = ''
}
function hideNotifyF() {
  hudNotifyF.style.display = 'none'
  notifyF.textContent = ''
}

function showHud() {
  hudCapture.style.display = 'block'
}

function hideHud() {
  hudCapture.style.display = 'none'
}

function callParams(data) {
  data = JSON.parse(data)
  time.textContent = `${data.minutes}:${data.seconds}`

  protectName.textContent = `${data.nameP}`
  protectCount.textContent = `${data.countP}`
  protectCount.style.color = `${data.colorP}`
  protectName.style.color = `${data.colorP}`

  forwardName.textContent = `${data.nameF}`
  forwardCount.textContent = `${data.countF}`
  forwardCount.style.color = `${data.colorF}`
  forwardName.style.color = `${data.colorF}`
}

function callParamsBiz(data) {
  data = JSON.parse(data)
  time.textContent = `${data.minutes}:${data.seconds}`

  protectName.textContent = `${data.nameP}`
  protectCount.textContent = `${data.countPBiz}`
  protectCount.style.color = `${data.colorP}`
  protectName.style.color = `${data.colorP}`

  forwardName.textContent = `${data.nameF}`
  forwardCount.textContent = `${data.countFBiz}`
  forwardCount.style.color = `${data.colorF}`
  forwardName.style.color = `${data.colorF}`
}
