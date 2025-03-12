module.exports = {
    "roulette.open": (player, fast) => {
		if(player.account.donate < 200) {
			player.utils.error(`У вас недостаточно LRP-коинов!`);
			player.call("roulette.noMoney");
			return
		}
		player.utils.setDonate(player.account.donate - 200);
		
		
		const prizes = {
			moneygreen: 40,
			moneyyellow: 54,
			vip: 79,
			lrp: 94,
			car: 99,
			cardarkblue: 100,
			carblue: 101,
			carorange: 102,
			cargreen: 103,
			donatecarsilver: 104
		}
		
		var prize = mp.randomInteger(1, 104);
		//var prize = 104
		
		//console.log(`${JSON.stringify(prizes)}`);
		//console.log(`${prize}`);
		
		if (prize <= prizes.moneygreen) {
			var blueMoney = mp.randomInteger(7000, 10000);
			player.utils.addRoulettePrize("moneygreen", blueMoney)
			player.call("roulette.setPrize", [fast, "moneygreen", blueMoney]);
		}
		else if (prize > prizes.moneygreen && prize <= prizes.moneyyellow) {
			var yellowMoney = mp.randomInteger(30000, 50000);
			player.utils.addRoulettePrize("moneyyellow", yellowMoney)
			player.call("roulette.setPrize", [fast, "moneyyellow", yellowMoney]);
		}
		else if (prize > prizes.moneyyellow && prize <= prizes.vip) {
			player.utils.addRoulettePrize("vip")
			player.call("roulette.setPrize", [fast, "vip"]);
		}
		else if (prize > prizes.vip && prize <= prizes.lrp) {
			var LrpMoney = mp.randomInteger(50, 150);
			player.utils.addRoulettePrize("lrp", LrpMoney)
			player.call("roulette.setPrize", [fast, "lrp", LrpMoney]);
		}
		else if (prize > prizes.lrp && prize <= prizes.car) {
			const cars = ['manchez', 'radi', 'blista', 'rancherxl', 'dukes', 'asea', 'emperor', 'ingot', 'sovereign', 'enduro', 'minivan', 'picador', 'stanier', 'primo', 'surge']
			var car = cars[mp.randomInteger(0, cars.length - 1)];
			player.utils.addRoulettePrize("car", car)
			player.call("roulette.setPrize", [fast, "car", car]);
		}
		else if (prize > prizes.car && prize <= prizes.cardarkblue) {
			const cars = ['oracle', 'stalion', 'seminole', 'blade', 'savestra', 'rebel2', 'bodhi2']
			var car = cars[mp.randomInteger(0, cars.length - 1)];
			player.utils.addRoulettePrize("cardarkblue", car)
			player.call("roulette.setPrize", [fast, "cardarkblue", car]);
		}
		else if (prize > prizes.cardarkblue && prize <= prizes.carblue) {
			const cars = ['bmwe34', 'bmwe38', 'golf1', 'f620', 'buffalo3', 'sultan']
			var car = cars[mp.randomInteger(0, cars.length - 1)];
			player.utils.addRoulettePrize("carblue", car)
			player.call("roulette.setPrize", [fast, "carblue", car]);
		}
		else if (prize > prizes.carblue && prize <= prizes.carorange) {
			const cars = ['s13', 'bobcatxl', 'revolter', 'cam08', 'impreza98']
			var car = cars[mp.randomInteger(0, cars.length - 1)];
			player.utils.addRoulettePrize("carorange", car)
			player.call("roulette.setPrize", [fast, "carorange", car]);
		}
		else if (prize > prizes.carorange && prize <= prizes.cargreen) {
			const cars = ['mustang65', 'camry70', 'gtr34', 'gtr33', 'e55', 'evo9', 'cls08', 'w140', 'm5e60']
			var car = cars[mp.randomInteger(0, cars.length - 1)];
			player.utils.addRoulettePrize("cargreen", car)
			player.call("roulette.setPrize", [fast, "cargreen", car]);
		}
		else if (prize > prizes.car && prize <= prizes.donatecarsilver) {
			const cars = ['escalade19', 'maseratigt', 'fireblade', 'giulia', 'tahoe1', 'lc200', 'x5e53', 'rrover17', 'cayen19', '2019M5', 'fordraptor', 'g63', 'wald2018', 'veneno', 'lambsc18', 'senna', 'vulcan', 'astondb11'] 
			var car = cars[mp.randomInteger(0, cars.length - 1)];
			player.utils.addRoulettePrize("donatecarsilver", car)
			player.call("roulette.setPrize", [fast, "donatecarsilver", car]);
		}
		
		
    },
	"roulettegold.open": (player, fast) => {
		if(player.account.donate < 400) {
			player.utils.error(`У вас недостаточно LRP-коинов!`);
			player.call("roulette.noMoney");
			return
		}
		player.utils.setDonate(player.account.donate - 400);
		
		
		const prizes = {
			moneygreengold: 40,
			moneyyellowgold: 54,
			vipgold: 79,
			lrpgold: 94,
			cargold: 99,
			cardarkbluegold: 100,
			cardarkorangegold: 101,
			carbluebluegold: 102,
			cardarkorangetwogold: 103,
			caryellow: 104,
			donatecargold: 105
		}
		
		var prize = mp.randomInteger(1, 105);
		
		if (prize <= prizes.moneygreengold) {
			var blueMoney = mp.randomInteger(10000, 20000);
			player.utils.addRoulettePrize("moneygreengold", blueMoney)
			player.call("roulette.setPrizeGold", [fast, "moneygreengold", blueMoney]);
		}
		else if (prize > prizes.moneygreengold && prize <= prizes.moneyyellowgold) {
			var yellowMoney = mp.randomInteger(30000, 65000);
			player.utils.addRoulettePrize("moneyyellowgold", yellowMoney)
			player.call("roulette.setPrizeGold", [fast, "moneyyellowgold", yellowMoney]);
		}
		else if (prize > prizes.moneyyellowgold && prize <= prizes.vipgold) {
			player.utils.addRoulettePrize("vipgold")
			player.call("roulette.setPrizeGold", [fast, "vipgold"]);
		}
		else if (prize > prizes.vipgold && prize <= prizes.lrpgold) {
			var lrpMoney = mp.randomInteger(170, 250);
			player.utils.addRoulettePrize("lrpgold", lrpMoney)
			player.call("roulette.setPrizeGold", [fast, "lrpgold", lrpMoney]);
		}
		else if (prize > prizes.lrpgold && prize <= prizes.cargold) {
			const cars = ['seminole', 'defiler', 'avarus', 'zombieb', 'carbonrs', 'asterope', 'stalion', 'baller', 'ruffian']
			var car = cars[mp.randomInteger(0, cars.length - 1)];
			player.utils.addRoulettePrize("cargold", car)
			player.call("roulette.setPrizeGold", [fast, "cargold", car]);
		}
		else if (prize > prizes.cargold && prize <= prizes.cardarkbluegold) {
			const cars = ['ae86', 'evo6', '350z']
			var car = cars[mp.randomInteger(0, cars.length - 1)];
			player.utils.addRoulettePrize("cardarkbluegold", car)
			player.call("roulette.setPrizeGold", [fast, "cardarkbluegold", car]);
		}
		else if (prize > prizes.cardarkbluegold && prize <= prizes.cardarkorangegold) {
			const cars = ['cls08', 'bmwe70']
			var car = cars[mp.randomInteger(0, cars.length - 1)];
			player.utils.addRoulettePrize("cardarkorangegold", car)
			player.call("roulette.setPrizeGold", [fast, "cardarkorangegold", car]);
		}
		else if (prize > prizes.cardarkorangegold && prize <= prizes.carbluebluegold) {
			const cars = ['bmwz4', 'jeep15', 'c63s', 'gtr17', 'mustang19', 'mc720s', 'mclaren20', 'panamera', 'bmwg05']
			var car = cars[mp.randomInteger(0, cars.length - 1)];
			player.utils.addRoulettePrize("carbluebluegold", car)
			player.call("roulette.setPrizeGold", [fast, "carbluebluegold", car]);
		}
		else if (prize > prizes.carbluebluegold && prize <= prizes.cardarkorangetwogold) {
			const cars = ['huracan', 'rrghost', 'rrwraith']
			var car = cars[mp.randomInteger(0, cars.length - 1)];
			player.utils.addRoulettePrize("cardarkorangetwogold", car)
			player.call("roulette.setPrizeGold", [fast, "cardarkorangetwogold", car]);
		}
		else if (prize > prizes.cardarkorangetwogold && prize <= prizes.caryellow) {
			const cars = ['agerars', 'regera', 'jesko']
			var car = cars[mp.randomInteger(0, cars.length - 1)];
			player.utils.addRoulettePrize("caryellow", car)
			player.call("roulette.setPrizeGold", [fast, "caryellow", car]);
		}
		else if (prize > prizes.cargold && prize <= prizes.donatecargold) {
			const cars = ['exp100', 'veyron', 'phuayra'] 
			var car = cars[mp.randomInteger(0, cars.length - 1)];
			player.utils.addRoulettePrize("donatecargold", car)
			player.call("roulette.setPrizeGold", [fast, "donatecargold", car]);
		}
		
		
    },
	"roulette.sellDonateCarSilver": (player, prizeId) => {
		var prizeinfo = player.roulette[prizeId]
	
		if (prizeinfo.prize == "donatecarsilver") {
			player.utils.deleteRoulettePrize(prizeId)
			player.call("roulette.deletePrize", [prizeId]);
			player.utils.setDonate(player.account.donate + 20000);
		}
	},
	"roulette.sellCarSilver": (player, prizeId) => {
		var prizeinfo = player.roulette[prizeId]
	
		if (prizeinfo.prize == "car") {
			player.utils.deleteRoulettePrize(prizeId)
			player.call("roulette.deletePrize", [prizeId]);
			player.utils.setDonate(player.account.donate + 150);
		}
	},
	"roulette.sellCarDarkBlue": (player, prizeId) => {
		var prizeinfo = player.roulette[prizeId]
	
		if (prizeinfo.prize == "cardarkblue") {
			player.utils.deleteRoulettePrize(prizeId)
			player.call("roulette.deletePrize", [prizeId]);
			player.utils.setDonate(player.account.donate + 400);
		}
	},
	"roulette.sellCarBlue": (player, prizeId) => {
		var prizeinfo = player.roulette[prizeId]
	
		if (prizeinfo.prize == "carblue") {
			player.utils.deleteRoulettePrize(prizeId)
			player.call("roulette.deletePrize", [prizeId]);
			player.utils.setDonate(player.account.donate + 750);
		}
	},
	"roulette.CarOrange": (player, prizeId) => {
		var prizeinfo = player.roulette[prizeId]
	
		if (prizeinfo.prize == "carorange") {
			player.utils.deleteRoulettePrize(prizeId)
			player.call("roulette.deletePrize", [prizeId]);
			player.utils.setDonate(player.account.donate + 3000);
		}
	},
	"roulette.sellCarGreen": (player, prizeId) => {
		var prizeinfo = player.roulette[prizeId]
	
		if (prizeinfo.prize == "cargreen") {
			player.utils.deleteRoulettePrize(prizeId)
			player.call("roulette.deletePrize", [prizeId]);
			player.utils.setDonate(player.account.donate + 5000);
		}
	},
	"roulette.sellDonateCarGold": (player, prizeId) => {
		var prizeinfo = player.roulette[prizeId]
	
		if (prizeinfo.prize == "donatecargold") {
			player.utils.deleteRoulettePrize(prizeId)
			player.call("roulette.deletePrize", [prizeId]);
			player.utils.setDonate(player.account.donate + 55000);
		}
	},
	"roulette.sellCarGold": (player, prizeId) => {
		var prizeinfo = player.roulette[prizeId]
	
		if (prizeinfo.prize == "cargold") {
			player.utils.deleteRoulettePrize(prizeId)
			player.call("roulette.deletePrize", [prizeId]);
			player.utils.setDonate(player.account.donate + 400);
		}
	},	
	"roulette.sellCarDarkBlueGold": (player, prizeId) => {
		var prizeinfo = player.roulette[prizeId]
	
		if (prizeinfo.prize == "cardarkbluegold") {
			player.utils.deleteRoulettePrize(prizeId)
			player.call("roulette.deletePrize", [prizeId]);
			player.utils.setDonate(player.account.donate + 750);
		}
	},	
	"roulette.sellCarDarkOrangeGold": (player, prizeId) => {
		var prizeinfo = player.roulette[prizeId]
	
		if (prizeinfo.prize == "cardarkorangegold") {
			player.utils.deleteRoulettePrize(prizeId)
			player.call("roulette.deletePrize", [prizeId]);
			player.utils.setDonate(player.account.donate + 5000);
		}
	},	
	"roulette.sellCarBlueBlueGold": (player, prizeId) => {
		var prizeinfo = player.roulette[prizeId]
	
		if (prizeinfo.prize == "carbluebluegold") {
			player.utils.deleteRoulettePrize(prizeId)
			player.call("roulette.deletePrize", [prizeId]);
			player.utils.setDonate(player.account.donate + 10000);
		}
	},	
	"roulette.sellCarDarkOrangeTwoGold": (player, prizeId) => {
		var prizeinfo = player.roulette[prizeId]
	
		if (prizeinfo.prize == "cardarkorangetwogold") {
			player.utils.deleteRoulettePrize(prizeId)
			player.call("roulette.deletePrize", [prizeId]);
			player.utils.setDonate(player.account.donate + 15000);
		}
	},	
	"roulette.sellCarYellowGold": (player, prizeId) => {
		var prizeinfo = player.roulette[prizeId]
	
		if (prizeinfo.prize == "caryellow") {
			player.utils.deleteRoulettePrize(prizeId)
			player.call("roulette.deletePrize", [prizeId]);
			player.utils.setDonate(player.account.donate + 50000);
		}
	},
	"roulette.sellVipSilver": (player, prizeId) => {
		var prizeinfo = player.roulette[prizeId]
	
		if (prizeinfo.prize == "vip") {
			player.utils.deleteRoulettePrize(prizeId)
			player.call("roulette.deletePrize", [prizeId]);
			player.utils.setDonate(player.account.donate + 200);
		}
	},
	"roulette.sellVipGold": (player, prizeId) => {
		var prizeinfo = player.roulette[prizeId]
	
		if (prizeinfo.prize == "vipgold") {
			player.utils.deleteRoulettePrize(prizeId)
			player.call("roulette.deletePrize", [prizeId]);
			player.utils.setDonate(player.account.donate + 400);
		}
	},
	"roulette.takePrizeMoneyGreenSilver": (player, prizeId) => {
		var prizeinfo = player.roulette[prizeId]
	
		if (prizeinfo.prize == "moneygreen") {
			player.utils.deleteRoulettePrize(prizeId)
			player.call("roulette.deletePrize", [prizeId]);
			player.utils.setMoney(player.money + prizeinfo.count);
		}
	},
	"roulette.takePrizeMoneyYellowSilver": (player, prizeId) => {
		var prizeinfo = player.roulette[prizeId]
	
		if (prizeinfo.prize == "moneyyellow") {
			player.utils.deleteRoulettePrize(prizeId)
			player.call("roulette.deletePrize", [prizeId]);
			player.utils.setMoney(player.money + prizeinfo.count);
		}
	},
	"roulette.takePrizeVipSilver": (player, prizeId) => {
		var prizeinfo = player.roulette[prizeId]
	
		if (prizeinfo.prize == "vip") {
			player.utils.deleteRoulettePrize(prizeId)
			player.call("roulette.deletePrize", [prizeId]);
			
		}
	},
	"roulette.takePrizeLrpSilver": (player, prizeId) => {
		var prizeinfo = player.roulette[prizeId]
	
		if (prizeinfo.prize == "lrp") {
			player.utils.deleteRoulettePrize(prizeId)
			player.call("roulette.deletePrize", [prizeId]);
			player.utils.setDonate(player.account.donate + prizeinfo.count);
		}
	},
	"roulette.takePrizeMoneyGreenGold": (player, prizeId) => {
		var prizeinfo = player.roulette[prizeId]
	
		if (prizeinfo.prize == "moneygreengold") {
			player.utils.deleteRoulettePrize(prizeId)
			player.call("roulette.deletePrize", [prizeId]);
			player.utils.setMoney(player.money + prizeinfo.count);
		}
	},
	"roulette.takePrizeMoneyYellowGold": (player, prizeId) => {
		var prizeinfo = player.roulette[prizeId]
	
		if (prizeinfo.prize == "moneyyellowgold") {
			player.utils.deleteRoulettePrize(prizeId)
			player.call("roulette.deletePrize", [prizeId]);
			player.utils.setMoney(player.money + prizeinfo.count);
		}
	},
	"roulette.takePrizeVipGold": (player, prizeId) => {
		var prizeinfo = player.roulette[prizeId]
	
		if (prizeinfo.prize == "vipgold") {
			player.utils.deleteRoulettePrize(prizeId)
			player.call("roulette.deletePrize", [prizeId]);
			
		}
	},
	"roulette.takePrizeLrpGold": (player, prizeId) => {
		var prizeinfo = player.roulette[prizeId]
	
		if (prizeinfo.prize == "lrpgold") {
			player.utils.deleteRoulettePrize(prizeId)
			player.call("roulette.deletePrize", [prizeId]);
			player.utils.setDonate(player.account.donate + prizeinfo.count);
		}
	},
	"roulette.takePrizeDonateCarSilver": (player, prizeId) => {
		var prizeinfo = player.roulette[prizeId]
	
		if (prizeinfo.prize == "donatecarsilver") {
			var freeSlot = player.inventory.findFreeSlot(54);
			if (!freeSlot)  {
				setTimeout(() => player.utils.error(`Освободите место для ключей!`), 200);
				return
			}
			
			numberPlate = generateRandomNumberPlate()
			
			DB.Handle.query("INSERT INTO talrasha_vehicle (owner,model,color1,color2,x,y,z,h,numberPlate,price) VALUES (?,?,?,?,?,?,?,?,?,?)",
				[player.sqlId + 2000, prizeinfo.count, 134, 134,
				0, 0, 0,
				0, numberPlate, 0
			], (e, result) => {
				if(e) console.log(e);
				var params = {
					owner: player.sqlId,
					car: result.insertId,
					model: prizeinfo.count,
					plate: ''
				};

				player.inventory.add(54, params, null, (e) => {
					if (e) {
						mp.events.call("autoSaloon.cancel", player);
						return player.utils.error(e);
					}
					player.utils.deleteRoulettePrize(prizeId)
					player.call("roulette.deletePrize", [prizeId]);
					player.cars.push({ name: prizeinfo.count, sqlId: result.insertId, price: 0, plate: '' });
					player.call(`playerMenu.cars`, [player.cars]);
					
				});

			});
		}
	},
	"roulette.takePrizeCarSilver": (player, prizeId) => {
		var prizeinfo = player.roulette[prizeId]
	
		if (prizeinfo.prize == "car") {
			var freeSlot = player.inventory.findFreeSlot(54);
			if (!freeSlot)  {
				setTimeout(() => player.utils.error(`Освободите место для ключей!`), 200);
				return
			}
			
			numberPlate = generateRandomNumberPlate()
			
			DB.Handle.query("INSERT INTO talrasha_vehicle (owner,model,color1,color2,x,y,z,h,numberPlate,price) VALUES (?,?,?,?,?,?,?,?,?,?)",
				[player.sqlId + 2000, prizeinfo.count, 134, 134,
				0, 0, 0,
				0, numberPlate, 0
			], (e, result) => {
				if(e) console.log(e);
				var params = {
					owner: player.sqlId,
					car: result.insertId,
					model: prizeinfo.count,
					plate: ''
				};

				player.inventory.add(54, params, null, (e) => {
					if (e) {
						mp.events.call("autoSaloon.cancel", player);
						return player.utils.error(e);
					}
					player.utils.deleteRoulettePrize(prizeId)
					player.call("roulette.deletePrize", [prizeId]);
					player.cars.push({ name: prizeinfo.count, sqlId: result.insertId, price: 0, plate: '' });
					player.call(`playerMenu.cars`, [player.cars]);
					
				});

			});
		}
	},
	"roulette.takePrizeCarDarkBlue": (player, prizeId) => {
		var prizeinfo = player.roulette[prizeId]
	
		if (prizeinfo.prize == "cardarkblue") {
			var freeSlot = player.inventory.findFreeSlot(54);
			if (!freeSlot)  {
				setTimeout(() => player.utils.error(`Освободите место для ключей!`), 200);
				return
			}

			numberPlate = generateRandomNumberPlate()
			
			DB.Handle.query("INSERT INTO talrasha_vehicle (owner,model,color1,color2,x,y,z,h,numberPlate,price) VALUES (?,?,?,?,?,?,?,?,?,?)",
				[player.sqlId + 2000, prizeinfo.count, 134, 134,
				0, 0, 0,
				0, numberPlate, 0
			], (e, result) => {
				if(e) console.log(e);
				var params = {
					owner: player.sqlId,
					car: result.insertId,
					model: prizeinfo.count,
					plate: ''
				};

				player.inventory.add(54, params, null, (e) => {
					if (e) {
						mp.events.call("autoSaloon.cancel", player);
						return player.utils.error(e);
					}
					player.utils.deleteRoulettePrize(prizeId)
					player.call("roulette.deletePrize", [prizeId]);
					player.cars.push({ name: prizeinfo.count, sqlId: result.insertId, price: 0, plate: '' });
					player.call(`playerMenu.cars`, [player.cars]);
					
				});

			});
		}
	},
	"roulette.takePrizeCarBlue": (player, prizeId) => {
		var prizeinfo = player.roulette[prizeId]
	
		if (prizeinfo.prize == "carblue") {
			var freeSlot = player.inventory.findFreeSlot(54);
			if (!freeSlot)  {
				setTimeout(() => player.utils.error(`Освободите место для ключей!`), 200);
				return
			}

			numberPlate = generateRandomNumberPlate()
			
			DB.Handle.query("INSERT INTO talrasha_vehicle (owner,model,color1,color2,x,y,z,h,numberPlate,price) VALUES (?,?,?,?,?,?,?,?,?,?)",
				[player.sqlId + 2000, prizeinfo.count, 134, 134,
				0, 0, 0,
				0, numberPlate, 0
			], (e, result) => {
				if(e) console.log(e);
				var params = {
					owner: player.sqlId,
					car: result.insertId,
					model: prizeinfo.count,
					plate: ''
				};

				player.inventory.add(54, params, null, (e) => {
					if (e) {
						mp.events.call("autoSaloon.cancel", player);
						return player.utils.error(e);
					}
					player.utils.deleteRoulettePrize(prizeId)
					player.call("roulette.deletePrize", [prizeId]);
					player.cars.push({ name: prizeinfo.count, sqlId: result.insertId, price: 0, plate: '' });
					player.call(`playerMenu.cars`, [player.cars]);
					
				});

			});
		}
	},
	"roulette.takePrizeCarOrange": (player, prizeId) => {
		var prizeinfo = player.roulette[prizeId]
	
		if (prizeinfo.prize == "carorange") {
			var freeSlot = player.inventory.findFreeSlot(54);
			if (!freeSlot)  {
				setTimeout(() => player.utils.error(`Освободите место для ключей!`), 200);
				return
			}

			numberPlate = generateRandomNumberPlate()
			
			DB.Handle.query("INSERT INTO talrasha_vehicle (owner,model,color1,color2,x,y,z,h,numberPlate,price) VALUES (?,?,?,?,?,?,?,?,?,?)",
				[player.sqlId + 2000, prizeinfo.count, 134, 134,
				0, 0, 0,
				0, numberPlate, 0
			], (e, result) => {
				if(e) console.log(e);
				var params = {
					owner: player.sqlId,
					car: result.insertId,
					model: prizeinfo.count,
					plate: ''
				};

				player.inventory.add(54, params, null, (e) => {
					if (e) {
						mp.events.call("autoSaloon.cancel", player);
						return player.utils.error(e);
					}
					player.utils.deleteRoulettePrize(prizeId)
					player.call("roulette.deletePrize", [prizeId]);
					player.cars.push({ name: prizeinfo.count, sqlId: result.insertId, price: 0, plate: '' });
					player.call(`playerMenu.cars`, [player.cars]);
					
				});

			});
		}
	},
	"roulette.takePrizeCarGreen": (player, prizeId) => {
		var prizeinfo = player.roulette[prizeId]
	
		if (prizeinfo.prize == "cargreen") {
			var freeSlot = player.inventory.findFreeSlot(54);
			if (!freeSlot)  {
				setTimeout(() => player.utils.error(`Освободите место для ключей!`), 200);
				return
			}

			numberPlate = generateRandomNumberPlate()
			
			DB.Handle.query("INSERT INTO talrasha_vehicle (owner,model,color1,color2,x,y,z,h,numberPlate,price) VALUES (?,?,?,?,?,?,?,?,?,?)",
				[player.sqlId + 2000, prizeinfo.count, 134, 134,
				0, 0, 0,
				0, numberPlate, 0
			], (e, result) => {
				if(e) console.log(e);
				var params = {
					owner: player.sqlId,
					car: result.insertId,
					model: prizeinfo.count,
					plate: ''
				};

				player.inventory.add(54, params, null, (e) => {
					if (e) {
						mp.events.call("autoSaloon.cancel", player);
						return player.utils.error(e);
					}
					player.utils.deleteRoulettePrize(prizeId)
					player.call("roulette.deletePrize", [prizeId]);
					player.cars.push({ name: prizeinfo.count, sqlId: result.insertId, price: 0, plate: '' });
					player.call(`playerMenu.cars`, [player.cars]);
					
				});

			});
		}
	},
	"roulette.takePrizeDonateCarGold": (player, prizeId) => {
		var prizeinfo = player.roulette[prizeId]
	
		if (prizeinfo.prize == "donatecargold") {
			var freeSlot = player.inventory.findFreeSlot(54);
			if (!freeSlot)  {
				setTimeout(() => player.utils.error(`Освободите место для ключей!`), 200);
				return
			}

			numberPlate = generateRandomNumberPlate()
			
			DB.Handle.query("INSERT INTO talrasha_vehicle (owner,model,color1,color2,x,y,z,h,numberPlate,price) VALUES (?,?,?,?,?,?,?,?,?,?)",
				[player.sqlId + 2000, prizeinfo.count, 134, 134,
				0, 0, 0,
				0, numberPlate, 0
			], (e, result) => {
				if(e) console.log(e);
				var params = {
					owner: player.sqlId,
					car: result.insertId,
					model: prizeinfo.count,
					plate: ''
				};

				player.inventory.add(54, params, null, (e) => {
					if (e) {
						mp.events.call("autoSaloon.cancel", player);
						return player.utils.error(e);
					}
					player.utils.deleteRoulettePrize(prizeId)
					player.call("roulette.deletePrize", [prizeId]);
					player.cars.push({ name: prizeinfo.count, sqlId: result.insertId, price: 0, plate: '' });
					player.call(`playerMenu.cars`, [player.cars]);
					
				});

			});
		}
	},
	"roulette.takePrizeCarGold": (player, prizeId) => {
		var prizeinfo = player.roulette[prizeId]
	
		if (prizeinfo.prize == "cargold") {
			var freeSlot = player.inventory.findFreeSlot(54);
			if (!freeSlot)  {
				setTimeout(() => player.utils.error(`Освободите место для ключей!`), 200);
				return
			}

			numberPlate = generateRandomNumberPlate()
			
			DB.Handle.query("INSERT INTO talrasha_vehicle (owner,model,color1,color2,x,y,z,h,numberPlate,price) VALUES (?,?,?,?,?,?,?,?,?,?)",
				[player.sqlId + 2000, prizeinfo.count, 134, 134,
				0, 0, 0,
				0, numberPlate, 0
			], (e, result) => {
				if(e) console.log(e);
				var params = {
					owner: player.sqlId,
					car: result.insertId,
					model: prizeinfo.count,
					plate: ''
				};

				player.inventory.add(54, params, null, (e) => {
					if (e) {
						mp.events.call("autoSaloon.cancel", player);
						return player.utils.error(e);
					}
					player.utils.deleteRoulettePrize(prizeId)
					player.call("roulette.deletePrize", [prizeId]);
					player.cars.push({ name: prizeinfo.count, sqlId: result.insertId, price: 0, plate: '' });
					player.call(`playerMenu.cars`, [player.cars]);
					
				});

			});
		}
	},
	"roulette.takePrizeCarDarkBlueGold": (player, prizeId) => {
		var prizeinfo = player.roulette[prizeId]
	
		if (prizeinfo.prize == "cardarkbluegold") {
			var freeSlot = player.inventory.findFreeSlot(54);
			if (!freeSlot)  {
				setTimeout(() => player.utils.error(`Освободите место для ключей!`), 200);
				return
			}

			numberPlate = generateRandomNumberPlate()
			
			DB.Handle.query("INSERT INTO talrasha_vehicle (owner,model,color1,color2,x,y,z,h,numberPlate,price) VALUES (?,?,?,?,?,?,?,?,?,?)",
				[player.sqlId + 2000, prizeinfo.count, 134, 134,
				0, 0, 0,
				0, numberPlate, 0
			], (e, result) => {
				if(e) console.log(e);
				var params = {
					owner: player.sqlId,
					car: result.insertId,
					model: prizeinfo.count,
					plate: ''
				};

				player.inventory.add(54, params, null, (e) => {
					if (e) {
						mp.events.call("autoSaloon.cancel", player);
						return player.utils.error(e);
					}
					player.utils.deleteRoulettePrize(prizeId)
					player.call("roulette.deletePrize", [prizeId]);
					player.cars.push({ name: prizeinfo.count, sqlId: result.insertId, price: 0, plate: '' });
					player.call(`playerMenu.cars`, [player.cars]);
					
				});

			});
		}
	},
	"roulette.takePrizeCarDarkOrangeGold": (player, prizeId) => {
		var prizeinfo = player.roulette[prizeId]
	
		if (prizeinfo.prize == "cardarkorangegold") {
			var freeSlot = player.inventory.findFreeSlot(54);
			if (!freeSlot)  {
				setTimeout(() => player.utils.error(`Освободите место для ключей!`), 200);
				return
			}

			numberPlate = generateRandomNumberPlate()
			
			DB.Handle.query("INSERT INTO talrasha_vehicle (owner,model,color1,color2,x,y,z,h,numberPlate,price) VALUES (?,?,?,?,?,?,?,?,?,?)",
				[player.sqlId + 2000, prizeinfo.count, 134, 134,
				0, 0, 0,
				0, numberPlate, 0
			], (e, result) => {
				if(e) console.log(e);
				var params = {
					owner: player.sqlId,
					car: result.insertId,
					model: prizeinfo.count,
					plate: ''
				};

				player.inventory.add(54, params, null, (e) => {
					if (e) {
						mp.events.call("autoSaloon.cancel", player);
						return player.utils.error(e);
					}
					player.utils.deleteRoulettePrize(prizeId)
					player.call("roulette.deletePrize", [prizeId]);
					player.cars.push({ name: prizeinfo.count, sqlId: result.insertId, price: 0, plate: '' });
					player.call(`playerMenu.cars`, [player.cars]);
					
				});

			});
		}
	},
	"roulette.takePrizeCarBlueBlueGold": (player, prizeId) => {
		var prizeinfo = player.roulette[prizeId]
	
		if (prizeinfo.prize == "carbluebluegold") {
			var freeSlot = player.inventory.findFreeSlot(54);
			if (!freeSlot)  {
				setTimeout(() => player.utils.error(`Освободите место для ключей!`), 200);
				return
			}

			numberPlate = generateRandomNumberPlate()
			
			DB.Handle.query("INSERT INTO talrasha_vehicle (owner,model,color1,color2,x,y,z,h,numberPlate,price) VALUES (?,?,?,?,?,?,?,?,?,?)",
				[player.sqlId + 2000, prizeinfo.count, 134, 134,
				0, 0, 0,
				0, numberPlate, 0
			], (e, result) => {
				if(e) console.log(e);
				var params = {
					owner: player.sqlId,
					car: result.insertId,
					model: prizeinfo.count,
					plate: ''
				};

				player.inventory.add(54, params, null, (e) => {
					if (e) {
						mp.events.call("autoSaloon.cancel", player);
						return player.utils.error(e);
					}
					player.utils.deleteRoulettePrize(prizeId)
					player.call("roulette.deletePrize", [prizeId]);
					player.cars.push({ name: prizeinfo.count, sqlId: result.insertId, price: 0, plate: '' });
					player.call(`playerMenu.cars`, [player.cars]);
					
				});

			});
		}
	},
	"roulette.takePrizeCarDarkOrangeTwoGold": (player, prizeId) => {
		var prizeinfo = player.roulette[prizeId]
	
		if (prizeinfo.prize == "cardarkorangetwogold") {
			var freeSlot = player.inventory.findFreeSlot(54);
			if (!freeSlot)  {
				setTimeout(() => player.utils.error(`Освободите место для ключей!`), 200);
				return
			}

			numberPlate = generateRandomNumberPlate()
			
			DB.Handle.query("INSERT INTO talrasha_vehicle (owner,model,color1,color2,x,y,z,h,numberPlate,price) VALUES (?,?,?,?,?,?,?,?,?,?)",
				[player.sqlId + 2000, prizeinfo.count, 134, 134,
				0, 0, 0,
				0, numberPlate, 0
			], (e, result) => {
				if(e) console.log(e);
				var params = {
					owner: player.sqlId,
					car: result.insertId,
					model: prizeinfo.count,
					plate: ''
				};

				player.inventory.add(54, params, null, (e) => {
					if (e) {
						mp.events.call("autoSaloon.cancel", player);
						return player.utils.error(e);
					}
					player.utils.deleteRoulettePrize(prizeId)
					player.call("roulette.deletePrize", [prizeId]);
					player.cars.push({ name: prizeinfo.count, sqlId: result.insertId, price: 0, plate: '' });
					player.call(`playerMenu.cars`, [player.cars]);
					
				});

			});
		}
	},
	"roulette.takePrizeCarYellowGold": (player, prizeId) => {
		var prizeinfo = player.roulette[prizeId]
	
		if (prizeinfo.prize == "caryellow") {
			var freeSlot = player.inventory.findFreeSlot(54);
			if (!freeSlot)  {
				setTimeout(() => player.utils.error(`Освободите место для ключей!`), 200);
				return
			}

			numberPlate = generateRandomNumberPlate()
			
			DB.Handle.query("INSERT INTO talrasha_vehicle (owner,model,color1,color2,x,y,z,h,numberPlate,price) VALUES (?,?,?,?,?,?,?,?,?,?)",
				[player.sqlId + 2000, prizeinfo.count, 134, 134,
				0, 0, 0,
				0, numberPlate, 0
			], (e, result) => {
				if(e) console.log(e);
				var params = {
					owner: player.sqlId,
					car: result.insertId,
					model: prizeinfo.count,
					plate: ''
				};

				player.inventory.add(54, params, null, (e) => {
					if (e) {
						mp.events.call("autoSaloon.cancel", player);
						return player.utils.error(e);
					}
					player.utils.deleteRoulettePrize(prizeId)
					player.call("roulette.deletePrize", [prizeId]);
					player.cars.push({ name: prizeinfo.count, sqlId: result.insertId, price: 0, plate: '' });
					player.call(`playerMenu.cars`, [player.cars]);
					
				});

			});
		}
	},
	"roulette.takePrize": (player, prizeId) => {
		var prizeinfo = player.roulette[prizeId]
	
		if (prizeinfo.prize == "moneygreen") {
			player.utils.deleteRoulettePrize(prizeId)
			player.call("roulette.deletePrize", [prizeId]);
			player.utils.setMoney(player.money + prizeinfo.count);
		}
		else if (prizeinfo.prize == "moneyyellow") {
			player.utils.deleteRoulettePrize(prizeId)
			player.call("roulette.deletePrize", [prizeId]);
			player.utils.setMoney(player.money + prizeinfo.count);
		}
		else if (prizeinfo.prize == "moneygreengold") {
			player.utils.deleteRoulettePrize(prizeId)
			player.call("roulette.deletePrize", [prizeId]);
			player.utils.setMoney(player.money + prizeinfo.count);
		}
		else if (prizeinfo.prize == "moneyyellowgold") {
			player.utils.deleteRoulettePrize(prizeId)
			player.call("roulette.deletePrize", [prizeId]);
			player.utils.setMoney(player.money + prizeinfo.count);
		}
		else if (prizeinfo.prize == "vip") {
			player.utils.deleteRoulettePrize(prizeId)
			player.call("roulette.deletePrize", [prizeId]);
			
		}
		else if (prizeinfo.prize == "lrp") {
			player.utils.deleteRoulettePrize(prizeId)
			player.call("roulette.deletePrize", [prizeId]);
			player.utils.setDonate(player.account.donate + prizeinfo.count);
		}
		else if (prizeinfo.prize == "vipgold") {
			player.utils.deleteRoulettePrize(prizeId)
			player.call("roulette.deletePrize", [prizeId]);
			
		}
		else if (prizeinfo.prize == "lrpgold") {
			player.utils.deleteRoulettePrize(prizeId)
			player.call("roulette.deletePrize", [prizeId]);
			player.utils.setDonate(player.account.donate + prizeinfo.count);
		}
		else if (prizeinfo.prize == "car") {
			var freeSlot = player.inventory.findFreeSlot(54);
			if (!freeSlot)  {
				setTimeout(() => player.utils.error(`Освободите место для ключей!`), 200);
				return
			}

			numberPlate = generateRandomNumberPlate()
			
			DB.Handle.query("INSERT INTO talrasha_vehicle (owner,model,color1,color2,x,y,z,h,numberPlate,price) VALUES (?,?,?,?,?,?,?,?,?,?)",
				[player.sqlId + 2000, prizeinfo.count, 134, 134,
				0, 0, 0,
				0, numberPlate, 0
			], (e, result) => {
				if(e) console.log(e);
				var params = {
					owner: player.sqlId,
					car: result.insertId,
					model: prizeinfo.count,
					plate: ''
				};

				player.inventory.add(54, params, null, (e) => {
					if (e) {
						mp.events.call("autoSaloon.cancel", player);
						return player.utils.error(e);
					}
					player.utils.deleteRoulettePrize(prizeId)
					player.call("roulette.deletePrize", [prizeId]);
					player.cars.push({ name: prizeinfo.count, sqlId: result.insertId, price: 0, plate: '' });
					player.call(`playerMenu.cars`, [player.cars]);
					
				});

			});
		}
		else if (prizeinfo.prize == "cardarkblue") {
			var freeSlot = player.inventory.findFreeSlot(54);
			if (!freeSlot)  {
				setTimeout(() => player.utils.error(`Освободите место для ключей!`), 200);
				return
			}

			numberPlate = generateRandomNumberPlate()
			
			DB.Handle.query("INSERT INTO talrasha_vehicle (owner,model,color1,color2,x,y,z,h,numberPlate,price) VALUES (?,?,?,?,?,?,?,?,?,?)",
				[player.sqlId + 2000, prizeinfo.count, 134, 134,
				0, 0, 0,
				0, numberPlate, 0
			], (e, result) => {
				if(e) console.log(e);
				var params = {
					owner: player.sqlId,
					car: result.insertId,
					model: prizeinfo.count,
					plate: ''
				};

				player.inventory.add(54, params, null, (e) => {
					if (e) {
						mp.events.call("autoSaloon.cancel", player);
						return player.utils.error(e);
					}
					player.utils.deleteRoulettePrize(prizeId)
					player.call("roulette.deletePrize", [prizeId]);
					player.cars.push({ name: prizeinfo.count, sqlId: result.insertId, price: 0, plate: '' });
					player.call(`playerMenu.cars`, [player.cars]);
					
				});

			});
		}
		else if (prizeinfo.prize == "carblue") {
			var freeSlot = player.inventory.findFreeSlot(54);
			if (!freeSlot)  {
				setTimeout(() => player.utils.error(`Освободите место для ключей!`), 200);
				return
			}

			numberPlate = generateRandomNumberPlate()
			
			DB.Handle.query("INSERT INTO talrasha_vehicle (owner,model,color1,color2,x,y,z,h,numberPlate,price) VALUES (?,?,?,?,?,?,?,?,?,?)",
				[player.sqlId + 2000, prizeinfo.count, 134, 134,
				0, 0, 0,
				0, numberPlate, 0
			], (e, result) => {
				if(e) console.log(e);
				var params = {
					owner: player.sqlId,
					car: result.insertId,
					model: prizeinfo.count,
					plate: ''
				};

				player.inventory.add(54, params, null, (e) => {
					if (e) {
						mp.events.call("autoSaloon.cancel", player);
						return player.utils.error(e);
					}
					player.utils.deleteRoulettePrize(prizeId)
					player.call("roulette.deletePrize", [prizeId]);
					player.cars.push({ name: prizeinfo.count, sqlId: result.insertId, price: 0, plate: '' });
					player.call(`playerMenu.cars`, [player.cars]);
					
				});

			});
		}
		else if (prizeinfo.prize == "carorange") {
			var freeSlot = player.inventory.findFreeSlot(54);
			if (!freeSlot)  {
				setTimeout(() => player.utils.error(`Освободите место для ключей!`), 200);
				return
			}

			numberPlate = generateRandomNumberPlate()
			
			DB.Handle.query("INSERT INTO talrasha_vehicle (owner,model,color1,color2,x,y,z,h,numberPlate,price) VALUES (?,?,?,?,?,?,?,?,?,?)",
				[player.sqlId + 2000, prizeinfo.count, 134, 134,
				0, 0, 0,
				0, numberPlate, 0
			], (e, result) => {
				if(e) console.log(e);
				var params = {
					owner: player.sqlId,
					car: result.insertId,
					model: prizeinfo.count,
					plate: ''
				};

				player.inventory.add(54, params, null, (e) => {
					if (e) {
						mp.events.call("autoSaloon.cancel", player);
						return player.utils.error(e);
					}
					player.utils.deleteRoulettePrize(prizeId)
					player.call("roulette.deletePrize", [prizeId]);
					player.cars.push({ name: prizeinfo.count, sqlId: result.insertId, price: 0, plate: '' });
					player.call(`playerMenu.cars`, [player.cars]);
					
				});

			});
		}
		else if (prizeinfo.prize == "cargreen") {
			var freeSlot = player.inventory.findFreeSlot(54);
			if (!freeSlot)  {
				setTimeout(() => player.utils.error(`Освободите место для ключей!`), 200);
				return
			}

			numberPlate = generateRandomNumberPlate()
			
			DB.Handle.query("INSERT INTO talrasha_vehicle (owner,model,color1,color2,x,y,z,h,numberPlate,price) VALUES (?,?,?,?,?,?,?,?,?,?)",
				[player.sqlId + 2000, prizeinfo.count, 134, 134,
				0, 0, 0,
				0, numberPlate, 0
			], (e, result) => {
				if(e) console.log(e);
				var params = {
					owner: player.sqlId,
					car: result.insertId,
					model: prizeinfo.count,
					plate: ''
				};

				player.inventory.add(54, params, null, (e) => {
					if (e) {
						mp.events.call("autoSaloon.cancel", player);
						return player.utils.error(e);
					}
					player.utils.deleteRoulettePrize(prizeId)
					player.call("roulette.deletePrize", [prizeId]);
					player.cars.push({ name: prizeinfo.count, sqlId: result.insertId, price: 0, plate: '' });
					player.call(`playerMenu.cars`, [player.cars]);
					
				});

			});
		}
		else if (prizeinfo.prize == "donatecarsilver") {
			var freeSlot = player.inventory.findFreeSlot(54);
			if (!freeSlot)  {
				setTimeout(() => player.utils.error(`Освободите место для ключей!`), 200);
				return
			}

			numberPlate = generateRandomNumberPlate()
			
			DB.Handle.query("INSERT INTO talrasha_vehicle (owner,model,color1,color2,x,y,z,h,numberPlate,price) VALUES (?,?,?,?,?,?,?,?,?,?)",
				[player.sqlId + 2000, prizeinfo.count, 134, 134,
				0, 0, 0,
				0, numberPlate, 0
			], (e, result) => {
				if(e) console.log(e);
				var params = {
					owner: player.sqlId,
					car: result.insertId,
					model: prizeinfo.count,
					plate: ''
				};

				player.inventory.add(54, params, null, (e) => {
					if (e) {
						mp.events.call("autoSaloon.cancel", player);
						return player.utils.error(e);
					}
					player.utils.deleteRoulettePrize(prizeId)
					player.call("roulette.deletePrize", [prizeId]);
					player.cars.push({ name: prizeinfo.count, sqlId: result.insertId, price: 0, plate: '' });
					player.call(`playerMenu.cars`, [player.cars]);
					
				});

			});
		}
		else if (prizeinfo.prize == "cargold") {
			var freeSlot = player.inventory.findFreeSlot(54);
			if (!freeSlot)  {
				setTimeout(() => player.utils.error(`Освободите место для ключей!`), 200);
				return
			}

			numberPlate = generateRandomNumberPlate()
			
			DB.Handle.query("INSERT INTO talrasha_vehicle (owner,model,color1,color2,x,y,z,h,numberPlate,price) VALUES (?,?,?,?,?,?,?,?,?,?)",
				[player.sqlId + 2000, prizeinfo.count, 134, 134,
				0, 0, 0,
				0, numberPlate, 0
			], (e, result) => {
				if(e) console.log(e);
				var params = {
					owner: player.sqlId,
					car: result.insertId,
					model: prizeinfo.count,
					plate: ''
				};

				player.inventory.add(54, params, null, (e) => {
					if (e) {
						mp.events.call("autoSaloon.cancel", player);
						return player.utils.error(e);
					}
					player.utils.deleteRoulettePrize(prizeId)
					player.call("roulette.deletePrize", [prizeId]);
					player.cars.push({ name: prizeinfo.count, sqlId: result.insertId, price: 0, plate: '' });
					player.call(`playerMenu.cars`, [player.cars]);
					
				});

			});
		}
		else if (prizeinfo.prize == "cardarkbluegold") {
			var freeSlot = player.inventory.findFreeSlot(54);
			if (!freeSlot)  {
				setTimeout(() => player.utils.error(`Освободите место для ключей!`), 200);
				return
			}

			numberPlate = generateRandomNumberPlate()
			
			DB.Handle.query("INSERT INTO talrasha_vehicle (owner,model,color1,color2,x,y,z,h,numberPlate,price) VALUES (?,?,?,?,?,?,?,?,?,?)",
				[player.sqlId + 2000, prizeinfo.count, 134, 134,
				0, 0, 0,
				0, numberPlate, 0
			], (e, result) => {
				if(e) console.log(e);
				var params = {
					owner: player.sqlId,
					car: result.insertId,
					model: prizeinfo.count,
					plate: ''
				};

				player.inventory.add(54, params, null, (e) => {
					if (e) {
						mp.events.call("autoSaloon.cancel", player);
						return player.utils.error(e);
					}
					player.utils.deleteRoulettePrize(prizeId)
					player.call("roulette.deletePrize", [prizeId]);
					player.cars.push({ name: prizeinfo.count, sqlId: result.insertId, price: 0, plate: '' });
					player.call(`playerMenu.cars`, [player.cars]);
					
				});

			});
		}
		else if (prizeinfo.prize == "cardarkorangegold") {
			var freeSlot = player.inventory.findFreeSlot(54);
			if (!freeSlot)  {
				setTimeout(() => player.utils.error(`Освободите место для ключей!`), 200);
				return
			}

			numberPlate = generateRandomNumberPlate()
			
			DB.Handle.query("INSERT INTO talrasha_vehicle (owner,model,color1,color2,x,y,z,h,numberPlate,price) VALUES (?,?,?,?,?,?,?,?,?,?)",
				[player.sqlId + 2000, prizeinfo.count, 134, 134,
				0, 0, 0,
				0, numberPlate, 0
			], (e, result) => {
				if(e) console.log(e);
				var params = {
					owner: player.sqlId,
					car: result.insertId,
					model: prizeinfo.count,
					plate: ''
				};

				player.inventory.add(54, params, null, (e) => {
					if (e) {
						mp.events.call("autoSaloon.cancel", player);
						return player.utils.error(e);
					}
					player.utils.deleteRoulettePrize(prizeId)
					player.call("roulette.deletePrize", [prizeId]);
					player.cars.push({ name: prizeinfo.count, sqlId: result.insertId, price: 0, plate: '' });
					player.call(`playerMenu.cars`, [player.cars]);
					
				});

			});
		}
		else if (prizeinfo.prize == "carbluebluegold") {
			var freeSlot = player.inventory.findFreeSlot(54);
			if (!freeSlot)  {
				setTimeout(() => player.utils.error(`Освободите место для ключей!`), 200);
				return
			}

			numberPlate = generateRandomNumberPlate()
			
			DB.Handle.query("INSERT INTO talrasha_vehicle (owner,model,color1,color2,x,y,z,h,numberPlate,price) VALUES (?,?,?,?,?,?,?,?,?,?)",
				[player.sqlId + 2000, prizeinfo.count, 134, 134,
				0, 0, 0,
				0, numberPlate, 0
			], (e, result) => {
				if(e) console.log(e);
				var params = {
					owner: player.sqlId,
					car: result.insertId,
					model: prizeinfo.count,
					plate: ''
				};

				player.inventory.add(54, params, null, (e) => {
					if (e) {
						mp.events.call("autoSaloon.cancel", player);
						return player.utils.error(e);
					}
					player.utils.deleteRoulettePrize(prizeId)
					player.call("roulette.deletePrize", [prizeId]);
					player.cars.push({ name: prizeinfo.count, sqlId: result.insertId, price: 0, plate: '' });
					player.call(`playerMenu.cars`, [player.cars]);
					
				});

			});
		}
		else if (prizeinfo.prize == "cardarkorangetwogold") {
			var freeSlot = player.inventory.findFreeSlot(54);
			if (!freeSlot)  {
				setTimeout(() => player.utils.error(`Освободите место для ключей!`), 200);
				return
			}

			numberPlate = generateRandomNumberPlate()
			
			DB.Handle.query("INSERT INTO talrasha_vehicle (owner,model,color1,color2,x,y,z,h,numberPlate,price) VALUES (?,?,?,?,?,?,?,?,?,?)",
				[player.sqlId + 2000, prizeinfo.count, 134, 134,
				0, 0, 0,
				0, numberPlate, 0
			], (e, result) => {
				if(e) console.log(e);
				var params = {
					owner: player.sqlId,
					car: result.insertId,
					model: prizeinfo.count,
					plate: ''
				};

				player.inventory.add(54, params, null, (e) => {
					if (e) {
						mp.events.call("autoSaloon.cancel", player);
						return player.utils.error(e);
					}
					player.utils.deleteRoulettePrize(prizeId)
					player.call("roulette.deletePrize", [prizeId]);
					player.cars.push({ name: prizeinfo.count, sqlId: result.insertId, price: 0, plate: '' });
					player.call(`playerMenu.cars`, [player.cars]);
					
				});

			});
		}
		else if (prizeinfo.prize == "caryellow") {
			var freeSlot = player.inventory.findFreeSlot(54);
			if (!freeSlot)  {
				setTimeout(() => player.utils.error(`Освободите место для ключей!`), 200);
				return
			}

			numberPlate = generateRandomNumberPlate()
			
			DB.Handle.query("INSERT INTO talrasha_vehicle (owner,model,color1,color2,x,y,z,h,numberPlate,price) VALUES (?,?,?,?,?,?,?,?,?,?)",
				[player.sqlId + 2000, prizeinfo.count, 134, 134,
				0, 0, 0,
				0, numberPlate, 0
			], (e, result) => {
				if(e) console.log(e);
				var params = {
					owner: player.sqlId,
					car: result.insertId,
					model: prizeinfo.count,
					plate: ''
				};

				player.inventory.add(54, params, null, (e) => {
					if (e) {
						mp.events.call("autoSaloon.cancel", player);
						return player.utils.error(e);
					}
					player.utils.deleteRoulettePrize(prizeId)
					player.call("roulette.deletePrize", [prizeId]);
					player.cars.push({ name: prizeinfo.count, sqlId: result.insertId, price: 0, plate: '' });
					player.call(`playerMenu.cars`, [player.cars]);
					
				});

			});
		}
		else if (prizeinfo.prize == "donatecargold") {
			var freeSlot = player.inventory.findFreeSlot(54);
			if (!freeSlot)  {
				setTimeout(() => player.utils.error(`Освободите место для ключей!`), 200);
				return
			}

			numberPlate = generateRandomNumberPlate()
			
			DB.Handle.query("INSERT INTO talrasha_vehicle (owner,model,color1,color2,x,y,z,h,numberPlate,price) VALUES (?,?,?,?,?,?,?,?,?,?)",
				[player.sqlId + 2000, prizeinfo.count, 134, 134,
				0, 0, 0,
				0, numberPlate, 0
			], (e, result) => {
				if(e) console.log(e);
				var params = {
					owner: player.sqlId,
					car: result.insertId,
					model: prizeinfo.count,
					plate: ''
				};

				player.inventory.add(54, params, null, (e) => {
					if (e) {
						mp.events.call("autoSaloon.cancel", player);
						return player.utils.error(e);
					}
					player.utils.deleteRoulettePrize(prizeId)
					player.call("roulette.deletePrize", [prizeId]);
					player.cars.push({ name: prizeinfo.count, sqlId: result.insertId, price: 0, plate: '' });
					player.call(`playerMenu.cars`, [player.cars]);
					
				});

			});
		}
			
	},
	
	"roulette.buySim": (player, num) => {
		const nprices = [0, 35000, 30000, 25000, 20000, 15000, 10000, 5000];
		num = num.toString();
		if (!num || !nprices[num.length])  return player.utils.error("Некорректный номер!");
		var price = nprices[num.length];
		if(player.account.donate < price) {
			player.utils.error(`У вас недостаточно LRP-коинов!`);
			return
		}
		num = parseInt(num);
		
		DB.Handle.query("SELECT * FROM talrasha_character WHERE phone=?", [num], (e, result) => {
          if (e) {
            callback("Ошибка выполнения запроса в БД!");
            return terminal.error(e);
          }
          if (result.length < 1) {
           player.utils.setDonate(player.account.donate - price);
		   player.utils.setSimcard(num)
		   player.utils.success(`Номер телефона установлен!`);
          }
		  else {
			 player.utils.error("Номер уже занят!");
		  }
      });
		
	},
	
	"roulette.buyNewName": (player, name) => {
		const price = 150
		var name = JSON.parse(name)
		var fullName = `${name[0]} ${name[1]}`
		var reg = /^([A-Z][a-z]{1,15}) ([A-Z][a-z]{1,15})$/;
        if (!reg.test(fullName)) return player.utils.error(`Имя ${fullName} некорректно!`);
		
		
		if(player.account.donate < price) {
			player.utils.error(`У вас недостаточно LRP-коинов!`);
			return
		}
		
		
		DB.Handle.query(`SELECT null FROM talrasha_character WHERE name=?`, [fullName], (e, result) => {
			if (e) {
				player.utils.error("Произошла непредвиденная ошибка, попробуйте еще раз");
				console.log(e);
				return;
			}

			if (result.length > 0) {
				return player.utils.error(`Персонаж ${fullName} уже зарегистрирован!`);
			}
			
			player.utils.setDonate(player.account.donate - price);
			player.utils.changeName(fullName)
			player.call("familiar.clear");
			player.utils.success(`Имя изменено!`);
			
				
		});
		
	},
	
	"roulette.buyPlate": (player, num) => {
		if (!player.vehicle) return player.utils.error("Ты не в машине")
		let veh = player.vehicle
		if (veh.owner != player.sqlId + 2000) return player.utils.error("Это не ваше авто!");
		if (num.length > 8 || !num)  return player.utils.error("Некорректный номер!");
		var re = new RegExp('^[a-zA-Z0-9]+$');
		if (!re.test(num)) return player.utils.error("Некорректный номер!");
		if(player.account.donate < 3000) {
			player.utils.error(`У вас недостаточно LRP-коинов!`);
			return
		}
		player.utils.setDonate(player.account.donate - 3000);
		DB.Handle.query("UPDATE talrasha_vehicle SET numberplate = ? WHERE id = ?", [num, veh.sqlId], (err, result) => {
			if (err) console.log(err) 
			var keys = player.inventory.getArrayByItemId(54);
			if (!keys) return;
			for (var key in keys) {
				if (keys[key].params.car == veh.sqlId) {
					keys[key].params.plate = num
					player.inventory.updateParams(keys[key].id, keys[key]);
				}
			}
			for (var i = 0; i < player.cars.length; i++) {
				if (player.cars[i].sqlId == veh.sqlId) {
					player.cars[i].plate = num
				}
			}
			
			player.utils.success(`Номер установлен!`);
			veh.numberPlate = num
		})
	},
	
	"roulette.buyMoney": (player, summ) => {
		summ = parseInt(summ)
		const vipprices = {
			10000: 100,
			50000: 500,
			200000: 2000,
			500000: 5000,
			2000000: 20000,
			10000000: 100000,
		}
		
		if (!vipprices[summ]) return;
		
		if(player.account.donate < vipprices[summ]) {
			player.utils.error(`У вас недостаточно LRP-коинов!`);
			return
		}
		
		player.utils.setDonate(player.account.donate - vipprices[summ]);
		player.utils.setMoney(player.money + summ);
		 
		player.utils.success(`Успешная покупка!`);
		
	},
	
}

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