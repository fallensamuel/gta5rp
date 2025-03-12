var customsInfo = require("./talrasha_custom_info");

const interactionInfo = new Map();
const vehiclesSyncData = new Map();


mp.events.add("entityDestroyed", (entity) => {
  if (entity.type !== "vehicle") {
		return;
	}

	deleteVehicleFromSync(entity);
});

mp.events.add("ls_customs::open_lsc_doors", (player, placeIndex) => {
	const vehicle = player.vehicle;
	if (vehicle.owner != player.sqlId + 2000 && player.admin <= 0) return player.utils.error("Данное авто принадлежит не вам!");
	player.call(`ls_customs::open_doors`, [placeIndex]);
});

mp.events.add("ls_customs::init", (player, placeId) => {
	const safePosition = customsInfo.places[placeId].exitVehInfo[0].position;
	const vehicle = player.vehicle;
	const occupants = vehicle.getOccupants();
	const dimension = player.id + 1;
	const bizId = customsInfo.places[placeId].bizId;
	
	if (vehicle.owner != player.sqlId + 2000 && player.admin <= 0) return player.utils.error("Данное авто принадлежит не вам!");
	
	occupants.forEach((occupant, index) => {
		occupant.call("ls_customs::occupant_init");
	});

	let vehiclePrice = 1;

	if (Array.isArray(mp.autosaloons.vehicles[9])) {
		const vehicleModel = vehicle.model;

		vehiclePrice = mp.autosaloons.vehicles[9].filter((v) => v.model === vehicleModel).map((v) => v.price)[0] || false;
	}
	if (!vehiclePrice) {
		if (Array.isArray(mp.autosaloons.vehicles[12])) {
			const vehicleModel = vehicle.model;

			vehiclePrice = mp.autosaloons.vehicles[12].filter((v) => v.model === vehicleModel).map((v) => v.price)[0] || 10000;
		}
	}
	
	interactionInfo.set(player.id, {
		dimension,
		vehicle,
		placeId,
		vehiclePrice,
		bizId
	});

	const seats = [];

	for (const occupant of occupants) {
		seats.push(occupant.seat)
		occupant.dimension = dimension;
		occupant.utils.setSafeQuitPosition(safePosition);
	}

	vehicle.dimension = dimension;

	occupants.forEach((occupant, index) => {
		occupant.putIntoVehicle(vehicle, seats[index]);
	});
	

	mp.players.call(occupants, "ls_customs::start", [player.id, vehicle.id, placeId, vehiclePrice]);
});

mp.events.add("ls_customs::end", (player) => {
	endOfTuning(player);
});

mp.events.add("ls_customs::vehicle_reach_point", (player, rawPosition, heading) => {
	const occupants = player.vehicle.getOccupants();

	if (occupants.length === 1) {
		return;
	}

	mp.players.call(occupants.filter(p => p.id !== player.id), "ls_customs::show_vehicle", [rawPosition, heading]);
});

mp.events.add("ls_customs::repair", (player) => {
	const vehicle = player.vehicle;

	vehicle.repair();

	if (isVehicleTuningSave(vehicle)) {
		DB.Handle.query("UPDATE talrasha_vehicle SET health=1000, engineBroken=0, oilBroken=0, accumulatorBroken=0 WHERE id = ?", [vehicle.sqlId]);
	}
});

mp.events.add("ls_customs::setMod", (player, modType, modIndex) => {
	const vehicle = player.vehicle;
	const data = getOrCreateSyncData(vehicle);

	// vehicle.setMod(modType, modIndex);
	data.mods.push([modType, modIndex]);

	mp.players.callInDimension(player.dimension, "ls_customs::sync", [ vehicle.id, JSON.stringify(data) ]);

	if (isVehicleTuningSave(vehicle)) {
		DB.Handle.query(
			"INSERT INTO talrasha_vehicle_mod (vehicle_id, `type`, `index`) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE `type`=?, `index`=?;",
			[vehicle.sqlId, modType, modIndex, modType, modIndex]);
	}
});

mp.events.add("ls_customs::toggleMod", (player, modType, state) => {
	const vehicle = player.vehicle;
	const data = getOrCreateSyncData(vehicle);

	if (modType === 22) { // Xenon
		data.isXenon = state;

		if (isVehicleTuningSave(vehicle)) {
			DB.Handle.query("UPDATE talrasha_vehicle SET hasXenon=? WHERE id = ?", [Number(state), vehicle.sqlId]);
		}
	} else if (modType === 18) { // Turbo
		data.turbo = state;

		if (isVehicleTuningSave(vehicle)) {
			DB.Handle.query("UPDATE talrasha_vehicle SET turbo=? WHERE id = ?", [Number(state), vehicle.sqlId]);
		}
	} else {
		return;
	}

	mp.players.callInDimension(player.dimension, "ls_customs::sync", [ vehicle.id, JSON.stringify(data) ]);
});

mp.events.add("ls_customs::enableNeon", (player, rawValues) => {
	const vehicle = player.vehicle;
	const values = JSON.parse(rawValues);
	const data = getOrCreateSyncData(vehicle);

	data.enabledNeons = values;

	mp.players.callInDimension(player.dimension, "ls_customs::sync", [ vehicle.id, JSON.stringify(data) ]);

	if (isVehicleTuningSave(vehicle)) {
		DB.Handle.query("UPDATE talrasha_vehicle SET enabledNeons=? WHERE id = ?", [JSON.stringify(values), vehicle.sqlId]);
	}
});

mp.events.add("ls_customs::neonColor", (player, r, g, b) => {
	const vehicle = player.vehicle;
	const data = getOrCreateSyncData(vehicle);

	data.neonColor = [ r, g, b ];

	mp.players.callInDimension(player.dimension, "ls_customs::sync", [ vehicle.id, JSON.stringify(data) ]);

	if (isVehicleTuningSave(vehicle)) {
		DB.Handle.query("UPDATE talrasha_vehicle SET neonColor=? WHERE id = ?", [JSON.stringify(data.neonColor), vehicle.sqlId]);
	}
});

mp.events.add("ls_customs::numberPlateType", (player, type) => {
	const vehicle = player.vehicle;
	const data = getOrCreateSyncData(vehicle);

	// vehicle.numberPlateType = type;
	data.numberPlateType = type;

	mp.players.callInDimension(player.dimension, "ls_customs::sync", [ vehicle.id, JSON.stringify(data) ]);

	if (isVehicleTuningSave(vehicle)) {
		DB.Handle.query("UPDATE talrasha_vehicle SET numberPlateType=? WHERE id = ?", [type, vehicle.sqlId]);
	}
});

mp.events.add("ls_customs::setColor", (player, primaryColor, secondaryColor) => {
	const vehicle = player.vehicle;
	
	vehicle.setColor(primaryColor, secondaryColor);

	if (isVehicleTuningSave(vehicle)) {
		DB.Handle.query("UPDATE talrasha_vehicle SET color1=?, color2=? WHERE id = ?", [primaryColor, secondaryColor, vehicle.sqlId]);
	}
});

mp.events.add("ls_customs::setWheel", (player, wheelType, wheelIndex, isBackWheel = false) => {
	const vehicle = player.vehicle;
	const data = getOrCreateSyncData(vehicle);

	if (wheelType !== -1) {
		vehicle.wheelType = wheelType;
		data.wheelType = wheelType;
	}

	if (isBackWheel) {
		data.backWheel = wheelIndex;
	} else {
		data.wheel = wheelIndex;
	}

	mp.players.callInDimension(player.dimension, "ls_customs::sync", [ vehicle.id, JSON.stringify(data) ]);

	if (isVehicleTuningSave(vehicle)) {
		DB.Handle.query(`UPDATE talrasha_vehicle SET wheelType=?, ${isBackWheel ? "backWheel" : "wheel"}=? WHERE id = ?`, [vehicle.wheelType, wheelIndex, vehicle.sqlId]);
	}
});

mp.events.add("ls_customs::setWheelColor", (player, color) => {
	const vehicle = player.vehicle;
	const data = getOrCreateSyncData(vehicle);

	// vehicle.wheelColor = color;
	data.wheelColor = color;

	mp.players.callInDimension(player.dimension, "ls_customs::sync", [ vehicle.id, JSON.stringify(data) ]);

	if (isVehicleTuningSave(vehicle)) {
		DB.Handle.query("UPDATE talrasha_vehicle SET wheelColor=? WHERE id = ?", [color, vehicle.sqlId]);
	}
});

mp.events.add("ls_customs::setCustomTires", (player, value) => {
	const vehicle = player.vehicle;
	const data = getOrCreateSyncData(vehicle);

	data.tiresCustomDesign = value;

	mp.players.callInDimension(player.dimension, "ls_customs::sync", [ vehicle.id, JSON.stringify(data) ]);

	if (isVehicleTuningSave(vehicle)) {
		DB.Handle.query("UPDATE talrasha_vehicle SET tiresCustomDesign=? WHERE id = ?", [Number(value), vehicle.sqlId]);
	}
});

mp.events.add("ls_customs::setTiresBurst", (player, value) => {
	const vehicle = player.vehicle;
	const data = getOrCreateSyncData(vehicle);

	data.tiresCanBurst = value;

	mp.players.callInDimension(player.dimension, "ls_customs::sync", [ vehicle.id, JSON.stringify(data) ]);

	if (isVehicleTuningSave(vehicle)) {
		DB.Handle.query("UPDATE talrasha_vehicle SET tiresCanBurst=? WHERE id = ?", [Number(value), vehicle.sqlId]);
	}
});

mp.events.add("ls_customs::setTiresSmokeColor", (player, r, g, b) => {
	const vehicle = player.vehicle;
	const data = getOrCreateSyncData(vehicle);

	data.tiresSmokeColor = [ r, g, b ];

	mp.players.callInDimension(player.dimension, "ls_customs::sync", [ vehicle.id, JSON.stringify(data) ]);

	if (isVehicleTuningSave(vehicle)) {
		DB.Handle.query("UPDATE talrasha_vehicle SET tiresSmokeColor=? WHERE id = ?", [JSON.stringify(data.tiresSmokeColor), vehicle.sqlId]);
	}
});

mp.events.add("ls_customs::setWindowTint", (player, value) => {
	const vehicle = player.vehicle;
	const data = getOrCreateSyncData(vehicle);

	// vehicle.windowTint = value;
	data.windowTint = value;

	mp.players.callInDimension(player.dimension, "ls_customs::sync", [ vehicle.id, JSON.stringify(data) ]);

	if (isVehicleTuningSave(vehicle)) {
		DB.Handle.query("UPDATE talrasha_vehicle SET windowTint=? WHERE id = ?", [value, vehicle.sqlId]);
	}
});

function playerDeathOrQuit(player, isDeath) {
	if (!interactionInfo.has(player.id)) {
		return;
	}

	if (isDeath) {
		player.call("ls_customs::end_driver")
	}

	endOfTuning(player, !isDeath);
}

function endOfTuning(player, isQuit = false) {
	const playerId = player.id;
	const info = interactionInfo.get(playerId);
	if (!interactionInfo) {
		return;
	}

	const vehicle = info.vehicle;
	const occupants = vehicle.getOccupants();
	const exitVehInfo = customsInfo.places[info.placeId].exitVehInfo;
	const exitInfo = exitVehInfo[Math.floor(Math.random()*exitVehInfo.length)];

	
	occupants.forEach((occupant, index) => {
		occupant.call("ls_customs::end_occupant");
	});

	for (const occupant of occupants) {
		occupant.dimension = 0;

		if (occupant.id !== playerId) {
			occupant.utils.setSafeQuitPosition(undefined);
		} else if (!isQuit) {
			occupant.utils.setSafeQuitPosition(undefined);
		}
	}

	vehicle.dimension = 0;

	vehicle.position = exitInfo.position;
	vehicle.heading = new mp.Vector3(0, 0, exitInfo.heading);

	mp.players.call("ls_customs::sync", [ vehicle.id, JSON.stringify(getOrCreateSyncData(vehicle)) ]);

	interactionInfo.delete(playerId);
}

function getOrCreateSyncData(vehicle) {
	if (!vehiclesSyncData.has(vehicle.id)) {
		vehiclesSyncData.set(vehicle.id, {
			enabledNeons: [],
			neonColor: [222, 222, 255],
			isXenon: false,
			wheel: undefined,
			backWheel: undefined,
			tiresCustomDesign: false,
			tiresCanBurst: true,
			tiresSmokeColor: false,
			turbo: false,
			mods: [],
			wheelType: undefined,
			numberPlateType: undefined,
			wheelColor: undefined,
			windowTint: undefined
		});
	}

	return vehiclesSyncData.get(vehicle.id);
}

function isVehicleTuningSave(vehicle) {
	return vehicle.sqlId && vehicle.owner >= 2000;
}

mp.events.add("ls_customs::checkPrice", (player, keyItem, modType = 0, index = 0, repairPrice = false, itemName) => {
	if (!interactionInfo.has(player.id)) {
		player.call("ls_customs::checkPriceResponse", [ false ]);
		return;
	}

	const vehiclePrice = interactionInfo.get(player.id).vehiclePrice;
	const bizId = interactionInfo.get(player.id).bizId;
	const prices = customsInfo.prices[keyItem];

	var biz = mp.bizes.getBySqlId(bizId);
    if (!biz || biz.bizType != 10 || !biz.status) {
		player.utils.warning(`Бизнес с ID: ${bizId} не найден, либо закрыт!`);
		player.call("ls_customs::checkPriceResponse", [ false ]);
		return
	}

	let price;

	if (keyItem === "mods") {
		if (Array.isArray(prices[modType])) {
			price = prices[modType][index];
		} else if (typeof(prices[modType]) === "object") {
			price = prices[modType].base + (index * prices[modType].add);
		}
	} else if (keyItem === "repair") {
		price = repairPrice;
		itemName = 'Починка'
	} else {
		if (Array.isArray(prices)) {
			price = prices[index];
		} else if (typeof(prices) === "object") {
			price = prices.base + (index * prices.add);
		}
	}

	if (typeof(price) !== "number") {
		player.call("ls_customs::checkPriceResponse", [ false ]);
		return;
	}
	
	if (price < 1) {
		if (Number.isInteger(repairPrice)) {
			price = repairPrice;
		} else {
			price *= vehiclePrice;
		}
	}
	

	price = Math.round(price);

	if (biz.products < price) {
		player.call("ls_customs::checkPriceResponse", [ false ]);
		return player.utils.error(`У бизнеса недостаточно товара!`);
	}
	

	const newPlayerMoney = player.money - price;

	if (newPlayerMoney >= 0) {
		player.call("ls_customs::checkPriceResponse", [ true ]);
		player.utils.setMoney(newPlayerMoney);
		
		if(player.admin <= 0) {
			biz.setProducts(biz.products - price);
			biz.setBalance(biz.balance + price);
		}
		
		if (!itemName) itemName = 'Модификация'
		
		biz.log(player.id, `${player.name} купил ${itemName}`, price, price);
		
	} else {
		player.utils.warning("У вас недостаточно средств!");
		player.call("ls_customs::checkPriceResponse", [ false ]);
	}
});

function deleteVehicleFromSync(vehicle) {
	if (!vehiclesSyncData.has(vehicle.id)) {
		return;
	}

	vehiclesSyncData.delete(vehicle.id);
	mp.players.call("ls_customs::remove_sync_vehicle", [ vehicle.id ]);
}

module.exports = { 
	Init: () => {
		DB.Handle.query("SELECT * FROM talrasha_lsc_price", (e, result) => {
			var prices = {
				mods: {}
			}
			
            for (var i = 0; i < result.length; i++) {
                var mod = result[i];
				
				switch(mod.mod_type) {
				  case 'Починка':  
					prices.repair = mod.base_price
					break
				  case 'Спойлеры': 
					prices.mods[0] = { base: mod.base_price, add: mod.add_price }
					break
				  case 'Передние бамперы': 
					prices.mods[1] = { base: mod.base_price, add: mod.add_price }
					break
				  case 'Задние бамперы': 
					prices.mods[2] = { base: mod.base_price, add: mod.add_price }
					break
				  case 'Юбки': 
					prices.mods[3] = { base: mod.base_price, add: mod.add_price }
					break
				  case 'Глушители': 
					prices.mods[4] = { base: mod.base_price, add: mod.add_price }
					break
				  case 'Каркас безопасности': 
					prices.mods[5] = { base: mod.base_price, add: mod.add_price }
					break
				  case 'Решетки радиатора': 
					prices.mods[6] = { base: mod.base_price, add: mod.add_price }
					break
				  case 'Капот': 
					prices.mods[7] = { base: mod.base_price, add: mod.add_price }
					break
				  case 'Крыша': 
					prices.mods[10] = { base: mod.base_price, add: mod.add_price }
					break
				  case 'Двигатель': 
					prices.mods[11] = JSON.parse(mod.custom_price)
					break
				  case 'Тормоза': 
					prices.mods[12] = JSON.parse(mod.custom_price)
					break
				  case 'Трансмиссия': 
					prices.mods[13] = JSON.parse(mod.custom_price)
					break
				  case 'Клаксоны': 
					prices.mods[14] = { base: mod.base_price, add: mod.add_price }
					break
				  case 'Клаксоны': 
					prices.mods[14] = { base: mod.base_price, add: mod.add_price }
					break
				  case 'Подвеска': 
					prices.mods[15] = { base: mod.base_price, add: mod.add_price }
					break
				  case 'Броня': 
					prices.mods[16] = JSON.parse(mod.custom_price)
					break
				  case 'Турбо': 
					prices.mods[18] = { base: mod.base_price, add: mod.add_price }
					break
				  case 'Ксенон': 
					prices.mods[22] = JSON.parse(mod.custom_price)
					break
				  case 'Цвет неона': 
					prices.neonColor = { base: mod.base_price, add: mod.add_price }
					break
				  case 'Позиция неона': 
					prices.neonPosition = JSON.parse(mod.custom_price)
					break
				  case 'Тип номера': 
					prices.numberPlateType = { base: mod.base_price, add: mod.add_price }
					break
				  case 'Цвет': 
					prices.color = JSON.parse(mod.custom_price)
					break
				  case 'Колёса авто': 
					prices.carWheels = JSON.parse(mod.custom_price)
					break
				  case 'Колёса мото': 
					prices.motoWheels = { base: mod.base_price, add: mod.add_price }
					break
				  case 'Цвет колёс': 
					prices.wheelColor = { base: mod.base_price, add: mod.add_price }
					break
				  case 'Дизайн шин': 
					prices.tiresDesign = { base: mod.base_price, add: mod.add_price }
					break
				  case 'Покрышки': 
					prices.tiresBurst = { base: mod.base_price, add: mod.add_price }
					break
				  case 'Цвет дыма покрышек': 
					prices.tiresSmokeColor = { base: mod.base_price, add: mod.add_price }
					break
				  case 'Затемнение окна': 
					prices.windowTint = { base: mod.base_price, add: mod.add_price }
					break
				}
				
            }
			console.log(`\x1b[32m[DONE]\x1b[0m "Tuning price" package has been loaded: \x1b[33m${i}\x1b[0m.`);
			
			customsInfo.prices = prices

			const rawCustomsInfo = JSON.stringify(customsInfo);

			mp.events.add("playerQuit", (player) => { playerDeathOrQuit(player, false); });
			mp.events.add("playerDeath",(player) => { 
				if (!player.getVariable("knockDown")) return;
				playerDeathOrQuit(player, true);
			});

			mp.events.add("playerBrowserReady", (player) => {
				player.call("ls_customs::sync_all", [ rawCustomsInfo, JSON.stringify([...vehiclesSyncData]) ]);
			});

        });
	
	},
	tuningVehicle: (vehicle, dbData) => {
		return new Promise((resolve, reject) => {
			const data = getOrCreateSyncData(vehicle);

			if (typeof(dbData.enabledNeons) === "string") {
				data.enabledNeons = JSON.parse(dbData.enabledNeons);
			}
			if (typeof(dbData.neonColor) === "string") {
				data.neonColor = JSON.parse(dbData.neonColor);
			}
			if (typeof(dbData.hasXenon) === "number") {
				data.isXenon = dbData.hasXenon === 1;
			}
			if (typeof(dbData.wheelType) === "number") {
				// vehicle.wheelType = dbData.wheelType;
				data.wheelType = dbData.wheelType;
			}
			if (typeof(dbData.wheel) === "number") {
				data.wheel = dbData.wheel;
			}
			if (typeof(dbData.backWheel) === "number") {
				data.backWheel = dbData.backWheel;
			}
			if (typeof(dbData.tiresCustomDesign) === "number") {
				data.tiresCustomDesign = dbData.tiresCustomDesign === 1;
			}
			if (typeof(dbData.tiresCanBurst) === "number") {
				data.tiresCanBurst = dbData.tiresCanBurst === 1;
			}
			if (typeof(dbData.tiresSmokeColor) === "string") {
				data.tiresSmokeColor = JSON.parse(dbData.tiresSmokeColor);
			}
			if (typeof(dbData.turbo) === "number") {
				data.turbo = dbData.turbo === 1;
			}
			if (typeof(dbData.numberPlateType) === "number") {
				// vehicle.numberPlateType = dbData.numberPlateType;
				data.numberPlateType = dbData.numberPlateType;
			}
			if (typeof(dbData.wheelColor) === "number") {
				// vehicle.wheelColor = dbData.wheelColor;
				data.wheelColor = dbData.wheelColor;
			}
			if (typeof(dbData.windowTint) === "number") {
				// vehicle.windowTint = dbData.windowTint;
				data.windowTint = dbData.windowTint;
			}

			DB.Handle.query("SELECT * FROM talrasha_vehicle_mod WHERE vehicle_id = ?", [dbData.id], (e, result) => {
				if (e) {
					console.log(e);
					reject(e);
					return;
				}

				if (result.length === 0) {
					resolve();
					return;
				}

				for (const mod of result) {
					// vehicle.setMod(mod.type, mod.index);
					data.mods.push([mod.type, mod.index]);
				}

				mp.players.call("ls_customs::sync", [ vehicle.id, JSON.stringify(data) ]);

				resolve();
			});
		});
	},
	deleteVehicle: (vehicle) => {
		deleteVehicleFromSync(vehicle);
	}
};
