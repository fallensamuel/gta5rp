var esptoggle = 0;

mp.keys.bind(119, false, function () {
	if (mp.clientStorage["admin"] >= 1) {
		if(esptoggle == 4) esptoggle = 0;
		else esptoggle++;
		if(esptoggle == 0) mp.game.graphics.notify('ESP: ~r~Disabled');
		else if(esptoggle == 1) mp.game.graphics.notify('ESP: ~g~Only Players');
		else if(esptoggle == 2) mp.game.graphics.notify('ESP: ~g~Only Vehicles');
		else if(esptoggle == 3) mp.game.graphics.notify('ESP: ~g~Players & Vehicles');
		else if(esptoggle == 4) mp.game.graphics.notify('ESP: ~g~Casino');
	}
});

mp.events.add('render', () => {
	if (mp.clientStorage["admin"] >= 1) {
		if(esptoggle >= 1) {
			try {
				let position;
				if(esptoggle == 1 || esptoggle == 3) {
					mp.players.forEachInStreamRange(player => {
						if (player.handle !== 0 && player !== mp.players.local) {
								position = player.position;
								if(player.getVariable('admin')) {
									mp.game.graphics.drawText(player.getVariable('sqlId') + ` (${player.remoteId})` + ' | ' + player.name + ' | HP:' + player.getHealth() + `/100HP | Frac: ` + player.getVariable('factionNum'), [position.x, position.y, position.z-0.3], {
										scale: [0.3, 0.3],
										outline: true,
										color: [255, 0, 0, 255],
										font: 4
									});
								} else {
									mp.game.graphics.drawText(player.getVariable('sqlId') + ` (${player.remoteId})` + ' | ' + player.name + ' | HP:' + player.getHealth() + `/100HP | Frac: ` + player.getVariable('factionNum'), [position.x, position.y, position.z-0.3], {
										scale: [0.3, 0.3],
										outline: true,
										color: [255, 255, 255, 255],
										font: 4
									});
								}
							}
					});
				}
				if(esptoggle == 2 || esptoggle == 3) {
					mp.vehicles.forEachInStreamRange(vehicle => {
						if (vehicle.handle !== 0 && vehicle !== mp.players.local) {
							position = vehicle.position;
							mp.game.graphics.drawText(vehicle.remoteId + ` (${parseInt(vehicle.getSpeed() * 3.6)} | ${mp.game.vehicle.getDisplayNameFromVehicleModel(vehicle.model)})`, [position.x, position.y, position.z-0.5], {
								scale: [0.3, 0.3],
								outline: true,
								color: [255, 255, 255, 255],
								font: 4
							});
						}
					});
				}
				if (esptoggle == 4) {
					if (mp.tablesPos) {
						for (let id in mp.tablesPos) {
							mp.game.graphics.drawText(`${mp.tablesPos[id].id}`, [mp.tablesPos[id].x, mp.tablesPos[id].y, mp.tablesPos[id].z + 1.0], {
								scale: [0.5, 0.5],
								outline: true,
								color: [255, 255, 255, 255],
								font: 4
							});
						
						}
					}
				}
			} catch(e) { }
		}
	}
});