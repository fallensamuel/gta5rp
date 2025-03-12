const spawn_rent_coords = [
    { x: -192.46, y: -810.25, z: 30.45, h: 31.60 },
    { x: 155.52, y: -344.65, z: 44.24, h: 75.76 },
    { x: -522.44, y: -263.14, z: 35.48, h: 196.42 }
];

for (let i = 0; i < spawn_rent_coords.length; i++) {
    mp.peds.new(mp.game.joaat('a_m_y_bevhills_02'), new mp.Vector3(spawn_rent_coords[i].x, spawn_rent_coords[i].y, spawn_rent_coords[i].z), spawn_rent_coords[i].h, (streamPed) => { streamPed.setAlpha(50); }, 0);
    mp.labels.new('Местный арендодатель', new mp.Vector3(spawn_rent_coords[i].x, spawn_rent_coords[i].y, spawn_rent_coords[i].z + 1.0), { los: false, font: 0, drawDistance: 7, color: [255, 255, 255, 255] });
    mp.blips.new(559, new mp.Vector3(spawn_rent_coords[i].x, spawn_rent_coords[i].y, spawn_rent_coords[i].z), { alpha: 255, scale: 0.9, color: 81, name: "Аренда скутеров", shortRange: true }),
    spawn_rent_coords[i].colshape = mp.colshapes.newSphere(spawn_rent_coords[i].x, spawn_rent_coords[i].y, spawn_rent_coords[i].z, 1.5);
}

const RentInfo = {
   timer: undefined
}

let spawn_rent_inShape = -1;

mp.events.add('playerEnterColshape', (shape) => {
    for (i = 0; i < spawn_rent_coords.length; i++) {
        if (shape === spawn_rent_coords[i].colshape) {
            if (mp.players.local.vehicle) return;
            mp.events.call("prompt.show", `<span>Е</span> Нажми для взаимодействия`);
            spawn_rent_inShape = i;
        }
    }
});

mp.events.add('playerExitColshape', (shape) => {
    for (i = 0; i < spawn_rent_coords.length; i++) {
        if (shape === spawn_rent_coords[i].colshape) {
            spawn_rent_inShape = -1;
            mp.events.call("prompt.hide");
            mp.events.call("modal.hide");
        }
    }
});

mp.keys.bind(0x45, false, function () { // E
    if (spawn_rent_inShape >= 0) {
        if (mp.players.local.vehicle) return;
		mp.events.call("modal.show", "spawn_rent_accept");
    }
});

mp.events.add('TalRashaSpawnRent', () => {
	if (spawn_rent_inShape === -1) return mp.events.call('TalRashaNotify', 1, 9, `Вы слишком далеко ушли!`, 3000);
	mp.events.callRemote("rent.vehicle.faggio");
});

mp.events.add('start.rent.vehicle', (price) => {
 let vehicle = mp.players.local.vehicle;
 if (vehicle) {
   vehicle.freezePosition(true);
   let items = [{ text: "Арендовать транспорт - $" + price }, { text: "Закрыть" } ];
   mp.events.call("selectMenu.setSpecialItems", "rent_faggio", items);
   mp.events.call("selectMenu.show", "rent_faggio");
 }
});

mp.events.add('stop.rent.vehicle', (type) => { stopRent(type); });

function stopRent(status) {
  let vehicle = mp.players.local.vehicle;
  mp.events.call("selectMenu.hide", "rent_faggio");
  if (vehicle) {
    vehicle.freezePosition(false);
    if (status) mp.players.local.taskLeaveVehicle(vehicle.handle, 16);
  }
}

mp.events.add("selectMenu.itemSelected", (menuName, item, itemValue, itemIndex) => {
	item = JSON.parse(item);
	const itemName = item.text;
	if (menuName === "rent_faggio") {
    if (itemName === "Закрыть") {
      stopRent(true);
      mp.events.call("selectMenu.hide", "rent_faggio");
    } else {
      mp.events.call("selectMenu.hide", "rent_faggio");
      mp.events.callRemote("rent.vehicle.faggio");
    }
	}
});
mp.events.add('control.rent.vehicle.time', (time) => {
  if (time === 0) {
    if (RentInfo.timer !== undefined) {
      clearTimeout(RentInfo.timer);
      delete RentInfo.timer;
    }
    return;
  }

  if (RentInfo.timer === undefined) {
    RentInfo.timer = setTimeout(() => {
      mp.events.callRemote("delete.vehicle.faggio.rent");
    }, time);
  }
});
