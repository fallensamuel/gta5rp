const player = mp.players.local

let markersList = []
let marker
let marker2

mp.events.add('initMarkers', zoneList => {
 zoneList.forEach(zone => {
   let marker = mp.markers.new(1, new mp.Vector3(parseInt(zone.x), parseInt(zone.y), parseInt(zone.z - 1)), 1, { color: [255, 0, 0, 100]})
   markersList.push(marker)
 })
})

mp.events.add('bindkeyBizWar', () => {
  mp.keys.bind(69, false, appBizWar)
})
mp.events.add('unbindkeyBizWar', () => {
  mp.keys.unbind(69, false, appBizWar)
})

mp.events.add('bindKey', () => {
  mp.keys.bind(69, false, keyApp)
})

mp.events.add('unbindKey', () => {
  mp.keys.unbind(69, false, keyApp)
})

function keyApp() {
  mp.events.callRemote('startWarZone')
}

function appBizWar() {
  mp.events.callRemote('startBizWarZone')
}

mp.events.add('createZone', (zone) => {
    marker = mp.markers.new(1, new mp.Vector3(parseInt(zone.x), parseInt(zone.y), parseInt(zone.z - 12)), 150, { color: [255, 0, 0, 50]})
    marker2 = mp.markers.new(1, new mp.Vector3(parseInt(zone.x), parseInt(zone.y), parseInt(zone.z - 12)), 150, { color: [255, 0, 0, 50], dimension: 103})
})

mp.events.add('destroyMarker', () => {
  markersList.forEach(res => res.destroy())
  markersList = []
})

mp.events.add('destroyZone', () => {
  marker.destroy()
  marker2.destroy()
})


















