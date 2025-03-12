exports = (menu) => {

    let UI = true;

    if(!mp.storage.data["hud"] && !mp.storage.data["chat"] && !mp.storage.data["nickname"] && !mp.storage.data["nickId"]) {
        mp.storage.data["hud"] = true;
        mp.storage.data["nickname"] = true;
        mp.storage.data["nickId"] = true;
        mp.storage.data["chat"] = 2;
    }

    mp.events.add("playerMenu.Hud", (enable) => {
        if (enable == false) {
            UI = false;
            menu.execute(`window.events.call('hudControl', { status: ${false}, event: 'enable' })`);
            mp.storage.data["hud"] = enable;
            mp.game.ui.displayHud(false);
            mp.gui.chat.show(false);
            mp.game.ui.displayRadar(false);
            mp.events.call("control.player.hud", false);
        } else {
            UI = true;
            menu.execute(`window.events.call('hudControl', { status: ${true}, event: 'enable' })`);
            mp.storage.data["hud"] = enable;
            mp.game.ui.displayHud(true);
            mp.gui.chat.show(true);
            mp.game.ui.displayRadar(true);
            mp.events.call("control.player.hud", true);
        }
    });

    mp.events.add("playerMenu.Chat", (set) => {
        mp.storage.data["chat"] = set;
    });

    mp.events.add("playerMenu.skills", (data) => {
        menu.execute(`window.events.call('playerMenu', { skills: ${data}, event: 'skills' })`);
    });

    mp.events.add("playerMenu.houses", (data, value) => {
        var houses = [];
        if(data === undefined) {

        } else {
            for (var i = 0; i < data.length; i++) {
                var h = data[i];
                var pos = new mp.Vector3(h.x, h.y, h.z);
                var getStreet = mp.game.pathfind.getStreetNameAtCoord(pos.x, pos.y, pos.z, 0, 0);
                var adress = mp.game.ui.getStreetNameFromHashKey(getStreet["streetName"]);
                houses.push({ sqlId: h.sqlId, class: h.class, garage: h.garage, rentPrice: parseInt(h.price / 100) * value, price: h.price,  adress: adress, pos: {x: h.x, y: h.y, z: h.z} });
            }
            menu.execute(`window.events.call('playerMenu', { houses: ${JSON.stringify(houses)}, event: 'houses' })`);
        }
    });

    mp.events.add("playerMenu.bizes", (data, value) => {
        var bizes = [];
        if(data === undefined) {
            
        } else {
            for (var i = 0; i < data.length; i++) {
                var b = data[i];
                var pos = new mp.Vector3(b.x, b.y, b.z);
                var getStreet = mp.game.pathfind.getStreetNameAtCoord(pos.x, pos.y, pos.z, 0, 0);
                var adress = mp.game.ui.getStreetNameFromHashKey(getStreet["streetName"]);
                bizes.push({ sqlId: b.sqlId, name: b.name, bizType: b.bizType, rentPrice: parseInt(b.price / 100) * value, price: b.price, adress: adress, pos: {x: b.x, y: b.y, z: b.z} });
            }
            menu.execute(`window.events.call('playerMenu', { bizes: ${JSON.stringify(bizes)}, event: 'bizes' })`);
        }
    });

    mp.events.add("playerMenu.addHouse", (data) => {
        if(data === undefined) {

        } else {
            var pos = new mp.Vector3(data.x, data.y, data.z);
            var getStreet = mp.game.pathfind.getStreetNameAtCoord(pos.x, pos.y, pos.z, 0, 0);
            var adress = mp.game.ui.getStreetNameFromHashKey(getStreet["streetName"]);
            var houses = { sqlId: data.sqlId, class: data.class, garage: data.garage, rentPrice: data.rentPrice, price: data.price, adress: adress, pos: {x: data.x, y: data.y, z: data.z} };
            menu.execute(`window.events.call('playerMenu', { addHouse: ${JSON.stringify(houses)}, event: 'addHouse' })`);
        }
    });

    mp.events.add("playerMenu.removeHouse", (Id) => {
        menu.execute(`window.events.call('playerMenu', { removeHouse: ${Id}, event: 'removeHouse' })`);
    });

    mp.events.add("playerMenu.removeBiz", (Id) => {
        menu.execute(`window.events.call('playerMenu', { removeBiz: ${Id}, event: 'removeBiz' })`);
    });

    mp.events.add("playerMenu.addBiz", (data) => {
        if(data === undefined) {

        } else {
            var pos = new mp.Vector3(data.x, data.y, data.z);
            var getStreet = mp.game.pathfind.getStreetNameAtCoord(pos.x, pos.y, pos.z, 0, 0);
            var adress = mp.game.ui.getStreetNameFromHashKey(getStreet["streetName"]);
            var bizes = { sqlId: data.sqlId, name: data.name, bizType: data.bizType, rentPrice: data.rentPrice, price: data.price, adress: adress, pos: {x: data.x, y: data.y, z: data.z} };
            menu.execute(`window.events.call('playerMenu', { addBiz: ${JSON.stringify(bizes)}, event: 'addBiz' })`);
        }
    });
    
    mp.events.add("playerMenu.setSpawn", (set, event) => {
        if(event === 'client') {
            mp.events.callRemote('setSpawn', set);
        } else {
            menu.execute(`window.events.call('playerMenu', { spawn: ${set}, event: 'spawn' })`);
        }
    });

    mp.events.add("playerMenu.setHouseId", (set, event) => {
        if(event === 'client') {
            mp.events.callRemote('setHouseId', set);
        } else {
            menu.execute(`window.events.call('playerMenu', { houseId: ${set}, event: 'houseId' })`);
        }
    });

    mp.events.add("playerMenu.enable", (enable) => {
        //menu.execute(`window.events.call('playerMenu', { chat: ${mp.storage.data["chat"]}, event: 'chat' })`);
        menu.execute(`window.events.call('playerMenu', { hud: ${mp.storage.data["hud"]}, event: 'hud' })`);
        menu.execute(`window.events.call('playerMenu', { nickname: ${mp.storage.data["nickname"]}, event: 'nickname' })`);
        menu.execute(`window.events.call('playerMenu', { nickId: ${mp.storage.data["nickId"]}, event: 'nickId' })`);
        menu.execute(`window.events.call('playerMenu', { status: ${enable}, event: 'enable' })`);

        if (mp.storage.data["hud"] == false) {
            UI = false;
            menu.execute(`window.events.call('hudControl', { status: ${false}, event: 'enable' })`);
            mp.storage.data["hud"] = false;
            mp.game.ui.displayHud(false);
            mp.gui.chat.show(false);
            mp.game.ui.displayRadar(false);
            mp.events.call("control.player.hud", false);
        } else {
            UI = true;
            menu.execute(`window.events.call('hudControl', { status: ${true}, event: 'enable' })`);
            mp.storage.data["hud"] = true;
            mp.game.ui.displayHud(true);
            mp.gui.chat.show(true);
            mp.game.ui.displayRadar(true);
            mp.events.call("control.player.hud", true);
        }
    });

    mp.events.add("playerMenu.achievements", (achievements) => {
        if(achievements === undefined) {
            
        } else {
            menu.execute(`window.events.call('playerMenu', {achievements: ${JSON.stringify(achievements)}, event: 'achievements' })`);
        }
    });

    mp.events.add("playerMenu.achievementsPlayer", (achievements) => {
        if(achievements === undefined) {
            
        } else {
            menu.execute(`window.events.call('playerMenu', {achievementsPlayer: ${JSON.stringify(achievements)}, event: 'achievementsPlayer' })`);
        }
    });

    mp.events.add("playerMenu.cars", (cars) => {
        var list = [];
        if(cars === undefined) {

        } else {
            for (var i = 0; i < cars.length; i++) {
                var c = cars[i];
                list.push({
                    name: c.name,
					sqlId: c.sqlId,
					price: c.price,
                    maxSpeed: mp.game.vehicle.getVehicleModelMaxSpeed(mp.game.joaat(c.name)), 
                    braking: (mp.game.vehicle.getVehicleModelMaxBraking(mp.game.joaat(c.name)) * 100).toFixed(2), 
                    acceleration: (mp.game.vehicle.getVehicleModelAcceleration(mp.game.joaat(c.name)) * 100).toFixed(2), 
                    controllability: mp.game.vehicle.getVehicleModelMaxTraction(mp.game.joaat(c.name)).toFixed(2),
                    maxSpeedKm: ((mp.game.vehicle.getVehicleModelMaxSpeed(mp.game.joaat(c.name)) * 3.6).toFixed(0))
                });
            }
            menu.execute(`window.events.call('playerMenu', { cars: ${JSON.stringify(list)}, event: 'cars' })`);
        }
    });

    mp.events.add("render", () => {
        var player = mp.players.local;
        if (UI) {
          if (mp.clientStorage["admin"] > 0) {
              const pos = player.position;
              const heading = player.getHeading();

              mp.game.graphics.drawText(`X: ${pos.x.toFixed(2)}, Y: ${pos.y.toFixed(2)}, Z: ${pos.z.toFixed(2)}, H: ${heading.toFixed(2)}, DIM: ${mp.players.local.dimension}`, [0.50, 0.900], {
                  font: 0,
                  color: [1, 213, 64, 230],
                  scale: [0.3, 0.3],
                  outline: true
              });
          }
          /*drawFPS();*/
        }
    });
    
	/*var cam = false
	
    mp.events.add("setPlayerMenuActive", (enable, noCam) => {
        mp.playerMenuActive = enable;
		if (mp.playerMenuActive) {
			if (noCam) return;
			localPlayer.freezePosition(true);
			var endRot = new mp.Vector3(-12, 0, localPlayer.getHeading() + 180);
			var direction = new mp.Vector3(3.3 * Math.sin(103.75 - endRot.z * Math.PI / 180), 3.3 * Math.cos(103.75 - endRot.z * Math.PI / 180), 0);
			var endPos = localPlayer.position;
			endPos.x += direction.x * 1.0;
			endPos.y += direction.y * 1.0;
			endPos.z += 1;

			if (!cam) cam = mp.cameras.new('default', endPos, endRot, 45.0);
			cam.setActive(true);
			mp.game.cam.renderScriptCams(true, true, 1000, true, false);
		}
		else {
			if (!cam) return;
			cam.setActive(false);
			mp.game.cam.renderScriptCams(false, true, 1000, false, true);
			cam = false
			localPlayer.freezePosition(false);
		}
    });*/
}
