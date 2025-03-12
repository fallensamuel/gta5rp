let blipsZone = []
let gangzone = []

let marker

let player = mp.players.local
let isZone = false

mp.events.add('destroyCaptureBlips', destroyCaptBlip)
// Создание зон
mp.events.add('loadCaptureBlips', (posZone) => {
  posZone.forEach(zone => {
    let blip = mp.game.ui.addBlipForRadius(parseInt(zone.position.x), parseInt(zone.position.y), parseInt(zone.position.z), 50)
    mp.game.invoke("0xDF735600A4696DAF", blip, 5) //sprite
    mp.game.invoke("0x45FF974EEE1C8734", blip, 100) //alpha
    mp.game.invoke("0x03D7FB09E75D6B7E", blip, zone.color) //color
    blipsZone.push(blip)
  })
  isZone = true
})

mp.events.add('bindStartCapture', () =>{
  mp.keys.bind(69, false, keyApp)
})
mp.events.add('unbindStartCapture', () =>{
  mp.keys.unbind(69, false, keyApp)
})

mp.events.add('zoneFlashStart', zoneIndex => {
  mp.game.invoke("0xD3CD6FD297AE87CC", blipsZone[zoneIndex], 5000)
  mp.game.invoke("0xB14552383D39CE3E", blipsZone[zoneIndex], true)
})

mp.events.add('zoneFlashEnd', zoneIndex => {
  mp.game.invoke("0xB14552383D39CE3E", blipsZone[zoneIndex], false)
})

function keyApp() {
 mp.events.callRemote('startCaptZone')
}

function destroyCaptBlip() {
  blipsZone.forEach(blip => {
   mp.game.invoke("0x45FF974EEE1C8734", blip, 0)
   mp.game.ui.removeBlip(blip)
  })
  blipsZone = []
  gangzone = []
  isZone = false
}

mp.events.add('render', () => {
  if(isZone) {
    if (blipsZone.length !== 0) {
      blipsZone.forEach(blip => {
        mp.game.invoke("0xF87683CDF73C3F6E", blip, 0) //rotation
      })
    }
  }
})
