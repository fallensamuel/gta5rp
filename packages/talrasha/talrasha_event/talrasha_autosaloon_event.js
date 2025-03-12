function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

var spawn = 0;

const dcacrs = {
	'fc15': 30000,
	'gt17': 30000,
	'agerars': 90000,
	'675lt': 30000,
	'models': 30000,
	'exige12': 90000,
	'g63': 10000,
	'merc6x6': 30000,
	'gt63s': 30000,
	'panamera': 60000,
	'bentayga': 50000,
	'bentley20': 50000,
	'carrera19': 40000,
	'cayen19': 20000,
	'718caymans': 30000,
	'chiron': 40000,
	'veyron': 30000,
	'rrwraith': 30000,
	'urus': 30000,
}

module.exports = {
    'autoSaloon.openBuyerMenu': (player) => {
        if (!player.colshape || !player.colshape.biz) return player.utils.error(`Вы не у автосалона!`);
        var biz = player.colshape.biz;
        if (biz.bizType != 9 && biz.bizType != 12 && biz.bizType != 14 && biz.bizType != 15 && biz.bizType != 16 && biz.bizType != 17 && biz.bizType != 19) return player.utils.error(`Неверный тип бизнеса!`);
        //if (!biz.status) return player.utils.error(`Бизнес закрыт!`);
		if (player.vehicle) return;
        
        const dim = player.sqlId + 10;

        player.cancelPos = player.position;
		if (biz.bizType !== 14 && biz.bizType !== 17) {
			player.alpha = 0;
			player.position = new mp.Vector3(-41.80, -1097.94, 26.42)
		}
        player.dimension = dim;
        player.autoSaloon = biz.bizType;

        var data = { bizId: biz.sqlId, vehicles: mp.autosaloons.vehicles[biz.bizType], colorsCFG: mp.autosaloons.colorsCFG, dim: dim };
		if (biz.bizType == 9) {
			data.cam = [-48.1, -1099.7, 26.5, 0, 0, 308, 60, -43.9, -1096.6, 26.1]
		}
		else if (biz.bizType == 14) {
			data.cam = [264.72, -1160.11, 29.22, 0, 0, 100, 60, 264.72, -1160.11, 29.22]
		}
		else if (biz.bizType == 17) {
			data.cam = [-146.79, -1164.43, 25.36, 0, 0, 100, 80, -146.79, -1161.42, 25.32]
		}
		player.call("autoSaloon.openBuyerMenu", [data]);
    },
	
	'autoSaloon.buyDonateCar': (player, name) => {
		var price = dcacrs[name]
		
        if(player.account.donate < price) {
			setTimeout(() => player.utils.error(`Необходимо ${price} LRP`), 200);
            return
        }

        var houses = mp.houses.getArrayByOwner(player.sqlId);

        if(houses.length == 0) {
			setTimeout(() => player.utils.error(`Чтобы приобрести транспорт, требуется приобрести жилье`), 200);
            return
        }

		var carSlots = 0
		
		for (let i = 0; i < houses.length; i++) {
			carSlots += houses[i].garageSlots;
		}
		
		if (player.cars.length + 1 > carSlots) {
			setTimeout(() => player.utils.error(`Вы имеете максимальное количество машин в гараже`), 200);
			return
		}
        

        var pos;

        var freeSlot = player.inventory.findFreeSlot(54);
        if (!freeSlot)  {
			setTimeout(() => player.utils.error(`Освободите место для ключей!`), 200);
            return
        }

		numberPlate = generateRandomNumberPlate()
		
        DB.Handle.query("INSERT INTO talrasha_vehicle (owner,model,color1,color2,x,y,z,h,numberPlate,price) VALUES (?,?,?,?,?,?,?,?,?,?)",
            [player.sqlId + 2000, name, 134, 134,
            0, 0, 0,
            0, numberPlate, price
        ], (e, result) => {
            if(e) console.log(e);
            var params = {
                owner: player.sqlId,
                car: result.insertId,
                model: name,
				plate: ''
            };

            player.inventory.add(54, params, null, (e) => {
                if (e) {
                    return player.utils.error(e);
                }
                player.cars.push({ name: name, sqlId: result.insertId, price: price, plate: '' });
                mp.logs.addLog(`${player.name} купил автомобиль ${name} за ${price} в автосалоне`, 'main', player.account.id, player.sqlId, { model: name, price: price });
                player.utils.success(`Вы успешно приобрели "${name}" за ${price} LRP`);
				player.utils.setDonate(player.account.donate - price);
                player.call(`playerMenu.cars`, [player.cars]);
            });

        });
    },
    
    'autoSaloon.buyNewCar': (player, str) => {
        const d = JSON.parse(str);
        var biz = mp.bizes.getBySqlId(d.bizId);
        
        if(player.money < d.price) {
            mp.events.call("autoSaloon.cancel", player);
			setTimeout(() => player.utils.error(`Необходимо ${d.price}$`), 200);
            return
        }

        var houses = mp.houses.getArrayByOwner(player.sqlId);

        if(d.price >= 30000 && houses.length == 0) {
            mp.events.call("autoSaloon.cancel", player);
			setTimeout(() => player.utils.error(`Чтобы приобрести транспорт стоимостью больше 30.000$, требуется приобрести жилье`), 200);
            return
        }
		
		if(houses.length == 0) {
			setTimeout(() => player.utils.error(`Чтобы приобрести транспорт, требуется приобрести жилье`), 200);
            return
        }

		var carSlots = 0
		
		for (let i = 0; i < houses.length; i++) {
			carSlots += houses[i].garageSlots;
		}
		
		if (player.cars.length + 1 > carSlots) {
			setTimeout(() => player.utils.error(`Вы имеете максимальное количество машин в гараже`), 200);
			return
		}
        
        if(player.cars.length >= player.donateCars) {
           // mp.events.call("autoSaloon.cancel", player);
          //  return player.utils.error(`Вы имеете максимальное количество машин`);
        }

        //if (biz.products < 10) {
            //mp.events.call("autoSaloon.cancel");
            //return player.utils.error(`У бизнеса недостаточно товара!`);
        //}

        var pos;

        for (var i = 0; i < mp.autosaloons.saloons.length; i++) {
            var a = mp.autosaloons.saloons[i];
            if(a.sqlId == d.bizId) {
                pos = a.newCarCoord[spawn];
                
                spawn += 1;

                if(a.newCarCoord.length - 1 == spawn) {
                    spawn = 0;
                }

                mp.autosaloons.vehicles[biz.bizType][d.id].buyed += 1;
                DB.Handle.query("UPDATE talrasha_vehicle_conf SET buyed = buyed + 1 WHERE model = ?", [d.model]);
            }
        }

        var freeSlot = player.inventory.findFreeSlot(54);
        if (!freeSlot)  {
            mp.events.call("autoSaloon.cancel", player);
			setTimeout(() => player.utils.error(`Освободите место для ключей!`), 200);
            return
        }

		  var newVehicle = mp.vehicles.new(
		  mp.joaat(d.model),
		  new mp.Vector3(pos.x, pos.y, pos.z),
		  {
			engine: false,
			heading: pos.rot,
			dimension: pos.dim,
			locked: true,
		  }
		)
		newVehicle.numberPlate = generateRandomNumberPlate()
	
        DB.Handle.query("INSERT INTO talrasha_vehicle (owner,model,color1,color2,x,y,z,h,numberPlate,price) VALUES (?,?,?,?,?,?,?,?,?,?)",
            [player.sqlId + 2000, d.model, d.color.sqlId,
        d.color.sqlId,
        newVehicle.position.x,
        newVehicle.position.y,
        newVehicle.position.z,
        newVehicle.rotation.z,
        newVehicle.numberPlate, d.price
        ], (e, result) => {
            if(e) console.log(e);
			newVehicle.setColor(d.color.sqlId, d.color.sqlId)
			newVehicle.sqlId = result.insertId
			newVehicle.utils.setFuel(30)
			newVehicle.maxFuel = 70
			newVehicle.owner = player.sqlId + 2000
			newVehicle.name = d.model.toLowerCase()
			newVehicle.spawnPos = newVehicle.position
            var params = {
                owner: player.sqlId,
                car: result.insertId,
                model: d.model,
            };

            player.inventory.add(54, params, null, (e) => {
                if (e) {
                    mp.events.call("autoSaloon.cancel", player);
                    return player.utils.error(e);
                }
                player.cars.push({ name: d.model, sqlId: result.insertId, price: d.price, plate: '' });
                mp.logs.addLog(`${player.name} купил автомобиль ${d.model} за ${d.price} в автосалоне`, 'main', player.account.id, player.sqlId, { model: d.model, price: d.price });
                player.utils.success(`Вы успешно приобрели "${d.model}" за ${d.price}$`);
                player.utils.setMoney(player.money - d.price);
                player.call(`playerMenu.cars`, [player.cars]);
                //biz.setProducts(biz.products - 10);
                //biz.setBalance(biz.balance + price / 1000);
            });
			
			initVehicleInventory(newVehicle)
        });
    },

    'autoSaloon.startTestDrive': (player, str) => {
        const d = JSON.parse(str);

        if (!d.color) d.color.sqlId = 0;

        const dim = player.sqlId + 33;

        if(player.testDrive > Math.floor(Date.now() / 1)) {
            mp.events.call("autoSaloon.cancel", player);
            return player.utils.error(`Подождите некоторое время чтобы снова протестировать машину!`);
        }

        let car;

        for (var i = 0; i < mp.autosaloons.saloons.length; i++) {
            var a = mp.autosaloons.saloons[i];
            if(a.sqlId == d.bizId) {
                car = a.newCarCoord[getRandom(0, a.newCarCoord.length)];
            }
        }

        var vehicle = mp.vehicles.new(mp.joaat(d.model), new mp.Vector3(car.x, car.y, car.z), {
            locked: true,
            engine: false,
            heading: car.rot
        });

        vehicle.name = d.model;
        vehicle.owner = 0;
        vehicle.setColor(d.color.sqlId, 0);
        vehicle.utils.setFuel(30);
        vehicle.maxFuel = 70;
        vehicle.license = 0;
        vehicle.dimension = dim;
		
		player.alpha = 255;
        player.dimension = dim;
		
		vehicle.position = new mp.Vector3(car.x, car.y, car.z);
		player.isGodmode = !player.isGodmode;
		player.utils.setLocalVar("godmode", player.isGodmode);
		player.testDriveVeh = vehicle;
		
		var playerId = player.id;
		var vehId = vehicle.id;
		player.enterTestVehicleInterval = setInterval(() => { 
			try {
				var player = mp.players.at(playerId);
				var vehicle = mp.vehicles.at(vehId);
				if (!player || !vehicle) return;
				player.putIntoVehicle(vehicle, 0);
				if (player.vehicle == vehicle) {
					player.testDrive = Math.floor(Date.now() / 1000) + 3600;
					player.call(`autoSaloon.deleteVehicle`);
					player.call(`autoSaloon.testDriveStart`);
					player.call("setVehRadioStation", [vehicle, "OFF"])
					DB.Handle.query("UPDATE talrasha_character SET testDrive = ? WHERE id = ?", [Math.floor(Date.now() / 1000) + 3600, player.sqlId]);
					clearInterval(player.enterTestVehicleInterval)
				}
			} catch (err) {
				terminal.error(err);
			}
		}, 100)
		
		
		
		

		
    },
	
	'autoSaloon.startTestDriveDonate': (player, model) => {
		if (player.lastPosTestDrive) return;
		const bizId = 90
        const dim = player.sqlId + 33;


        let car;

        for (var i = 0; i < mp.autosaloons.saloons.length; i++) {
            var a = mp.autosaloons.saloons[i];
            if(a.sqlId == bizId) {
                car = a.newCarCoord[getRandom(0, a.newCarCoord.length)];
            }
        }
		
		player.lastPosTestDrive = player.position

		player.dimension = dim;
		player.position = new mp.Vector3(car.x, car.y, car.z);
		player.alpha = 255;
		player.isGodmode = !player.isGodmode;
        player.utils.setLocalVar("godmode", player.isGodmode);

        var vehicle = mp.vehicles.new(mp.joaat(model), new mp.Vector3(car.x, car.y, car.z), {
            locked: true,
            engine: false,
            heading: car.rot, 
			dimension: dim
        });

        vehicle.name = model;
        vehicle.owner = 0;
        vehicle.setColor(134, 134);
        vehicle.utils.setFuel(30);
        vehicle.maxFuel = 70;
        vehicle.license = 0;
        player.testDriveVeh = vehicle;
       
	   var playerId = player.id;
	   player.enterTestVehicleInterval = setInterval(() => { 
			try {
				var player = mp.players.at(playerId);
				if (!player) return;
				player.putIntoVehicle(vehicle, 0);
				if (player.vehicle == vehicle) {
					player.call("setVehRadioStation", [vehicle, "OFF"])
					player.call(`autoSaloon.testDriveStartDonate`);
					clearInterval(player.enterTestVehicleInterval)
				}
			} catch (err) {
				terminal.error(err);
			}
		}, 100)
		
		/*setTimeout(() => {
			player.putIntoVehicle(vehicle, 0);
			player.call("setVehRadioStation", [vehicle, "OFF"])
			var player.enterTestVehicleInterval = setInterval(() => { 
				
			}, 20000)
			setTimeout(() => {
				player.call(`autoSaloon.testDriveStartDonate`);
			}, 1000);
		}, 1000);
		*/
        
       

    },
	
	'autoSaloon.endTestDriveDonate': (player) => {
        player.dimension = 0;
		player.position = player.lastPosTestDrive
		delete player.lastPosTestDrive;
        player.isGodmode = !player.isGodmode;
        player.utils.setLocalVar("godmode", player.isGodmode);
        if(player.testDriveVeh) player.testDriveVeh.destroy();
    },

    'autoSaloon.endTestDrive': (player) => {
		const dim = player.sqlId + 10;
        player.dimension = dim;
        player.alpha = 0;
		if (player.autoSaloon !== 12 && player.autoSaloon !== 16 && player.autoSaloon !== 14) {
			player.position = new mp.Vector3(-41.80, -1097.94, 26.42)
		}
		else if (player.autoSaloon === 16) {
			player.position = new mp.Vector3(-971.03, -2058.43, 9.51)
		}
		else if (player.autoSaloon === 14) {
			player.position = new mp.Vector3(265.98, -1158.59, 29.25)
		}
        player.isGodmode = !player.isGodmode;
        player.utils.setLocalVar("godmode", player.isGodmode);
        if(player.testDriveVeh) player.testDriveVeh.destroy();
    },

    "autoSaloon.exit": (player) => {
        player.autoSaloon = false;
		player.position = player.cancelPos;
        player.dimension = 0;
		player.alpha = 255;
    },
    
    "autoSaloon.cancel": (player) => {
        player.dimension = 0;
        player.autoSaloon = false;
        player.position = player.cancelPos;
		player.alpha = 255;
        player.call('autoSaloon.deleteVehicle');
        player.call("autoSaloon.setStatusMenu", false);
    }
};

function generateRandomNumberPlate() {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let number = '';
  for (let i = 0; i < 8; i++) {
    number += possible.charAt(getRandomInt(0, possible.length));
  }
  return number;
}

function getRandomInt(min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}