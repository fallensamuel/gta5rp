const player = mp.players.local

let markersListBiz = []
let markerBiz
let markerBiz2

mp.events.add('initMarkersBiz', zoneListBiz => {
 zoneListBiz.forEach(zone => {
   let marker = mp.markers.new(1, new mp.Vector3(parseInt(zone.x), parseInt(zone.y), parseInt(zone.z - 1)), 1, { color: [255, 0, 0, 100]})
   markersListBiz.push(marker)
 })
})

mp.events.add('bindkeyBizWar', () => {
  mp.keys.bind(69, false, appBizWar)
})
mp.events.add('unbindkeyBizWar', () => {
  mp.keys.unbind(69, false, appBizWar)
})

function appBizWar() {
  mp.events.callRemote('startBizWarZone')
}

mp.events.add('createZoneBiz', (zone) => {
  markerBiz = mp.markers.new(1, new mp.Vector3(parseInt(zone.x), parseInt(zone.y), parseInt(zone.z - 12)), 150, { color: [255, 0, 0, 50]})
  markerBiz2 = mp.markers.new(1, new mp.Vector3(parseInt(zone.x), parseInt(zone.y), parseInt(zone.z - 12)), 150, { color: [255, 0, 0, 50], dimension: 102})
})

mp.events.add('destroyMarkerBiz', () => {
  markersListBiz.forEach(res => res.destroy())
  markersListBiz = []
})

mp.events.add('destroyZoneBiz', () => {
  markerBiz.destroy()
  markerBiz2.destroy()
})


















