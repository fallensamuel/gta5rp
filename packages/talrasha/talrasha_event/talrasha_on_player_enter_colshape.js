var menuHandlers = {
    "enter_garage": (player, colshape) => {
        var house = mp.houses.getBySqlId(player.inHouse);
        if (!player.inHouse) {
            if(player.colshape.garage.houseSqlId) {
                house = mp.houses.getBySqlId(player.colshape.garage.houseSqlId); // с улицы в гараж
            }
        } else {
            house = mp.houses.getBySqlId(player.inHouse); // из дома в гараж
        }

        if (!house) return player.utils.error(`Дом не найден!`);

        if (house.garage) player.call("selectMenu.show", ["enter_garage"]);
		
		if(player.vehicle) return player.call("prompt.show", ["<span>Е</span> Нажми чтобы заехать в гараж"]);
    },
	"band_storage": (player, colshape) => {
		if (player.faction !== colshape.bandStorage.faction) return player.utils.error(`Нет доступа!`);
		player.call("selectMenu.show", ["band_storage"]);
    },
	"mafia_storage": (player, colshape) => {
		if (player.faction !== colshape.mafiaStorage.faction) return player.utils.error(`Нет доступа!`);
		player.call("selectMenu.show", ["mafia_storage"]);
    },
	"biker_storage": (player, colshape) => {
		if (player.faction !== colshape.bikerStorage.faction) return player.utils.error(`Нет доступа!`);
		player.call("selectMenu.show", ["band_storage"]);
    },
    "police_storage": (player, colshape) => {
        if (player.faction !== colshape.policeStorage.faction) return player.utils.error(`Нет доступа!`);
        player.call("selectMenu.show", ["police_storage"]);
    },
    "police_storage_2": (player, colshape) => {
        if (player.faction !== colshape.policeStorage.faction) return player.utils.error(`Нет доступа!`);
        player.call("selectMenu.show", ["police_storage_2"]);
    },
    "army_storage": (player, colshape) => {
        if (player.faction != colshape.armyStorage.faction) return player.utils.error(`Нет доступа!`);
        player.call("selectMenu.show", ["army_storage"]);
    },
    "army_storage_2": (player, colshape) => {
        if (player.faction != colshape.armyStorage.faction) return player.utils.error(`Нет доступа!`);
        player.call("selectMenu.show", ["army_storage_2"]);
    },
    "hospital_storage": (player, colshape) => {
        if (player.faction != colshape.hospitalStorage.faction) return player.utils.error(`Нет доступа!`);
        player.call("selectMenu.show", ["hospital_storage"]);
    },
    "police_service": (player, colshape) => {
        var list = mp.houses.getArrayByOwner(player.sqlId);
        var ids = [];
        list.forEach((h) => {
            ids.push(h.sqlId)
        });
        if (!ids.length) ids = null;
        player.call("selectMenu.show", ["police_service", 0, ids]);
    },
    "police_service_2": (player, colshape) => {
        var list = mp.houses.getArrayByOwner(player.sqlId);
        var ids = [];
        list.forEach((h) => {
            ids.push(h.sqlId)
        });
        if (!ids.length) ids = null;
        player.call("selectMenu.show", ["police_service_2", 0, ids]);
    },
    "fib_storage": (player, colshape) => {
        if (player.faction !== colshape.fibStorage.faction) return player.utils.error(`Нет доступа!`);
        player.call("selectMenu.show", ["fib_storage"]);
    },
	"gover_storage": (player, colshape) => {
        if (player.faction !== colshape.goverStorage.faction) return player.utils.error(`Нет доступа!`);
        player.call("selectMenu.show", ["gover_storage"]);
    },
	"enter_house": (player, colshape) => {
		player.call("prompt.show", ["<span>Е</span> Нажми для входа в дом"]);
    },
	"exit_house": (player, colshape) => {
		player.call("prompt.show", ["<span>Е</span> Нажми для выхода из дома"]);
    },
	"exit_garage": (player, colshape) => {
		player.call("prompt.show", ["<span>Е</span> Нажми для входа в дом"]);
    },
	"exit_garagevehicle": (player, colshape) => {
		if(player.vehicle) return player.call("prompt.show", ["<span>2</span> Нажми чтобы выехать из гаража"]);
    },
};
for (var i = 1; i <= 20; i++)
    menuHandlers[`enter_biz_${i}`] = (player, colshape) => {
		if (player.isClothesshop) return;
        var biz = colshape.biz;
        var isOwner = biz.owner === player.sqlId;
        player.call("selectMenu.show", [`enter_biz_${biz.bizType}`, 0, {
            isOwner: isOwner,
            owner: biz.owner,
			price: biz.price,
			ownerName: biz.ownerName
        }]);

		//player.call(`prompt.showByName`, ["talrasha_business"]);
		
        if (biz.bizType == 6) {
          let biz6INfo = [10, 8, 12, 5, 73, 20, 40, 20, 30, 20];
          let prices = [];
          for (let i = 0; i < biz6INfo.length; i++) {
            let price = biz6INfo[i] * biz.productPrice;
            prices.push(price);
          }
          player.call("food.shop.setFoodShopPrices", [JSON.stringify(prices)]);
        } else if (biz.bizType == 8) {
          let biz8INfo = [60, 50, 70, 180, 240, 280, 300, 350, 500, 500, 500, 500];
          let prices = [];
          for (let i = 0; i < biz8INfo.length; i++) {
            let price = biz8INfo[i] * biz.productPrice;
            prices.push(price);
          }
		  player.call("gun.shop.setGunShopPrices", [JSON.stringify(prices)]);
        }
    };

module.exports = {
	"menuspresse": (player) => {
		if (player.colshape) {
			if (player.colshape.menuName) {
				//player.call("selectMenu.show", [player.colshape.menuName]);
				/*if (menuHandlers[player.colshape.menuName]){
					player.call("selectMenu.show", [player.colshape.menuName]);
				}*/
				if (player.colshape.menuName === "enter_garage" || player.colshape.menuName === "exit_garagevehicle" || player.colshape.menuName === "exit_garage" || player.colshape.menuName === "trucker_load"){
				}else{
					if (player.vehicle) return player.utils.error(`Выйдите из авто!`);
				}
				
				if (menuHandlers[player.colshape.menuName]) {
					menuHandlers[player.colshape.menuName](player, player.colshape);
				}else{
					player.call("selectMenu.show", [player.colshape.menuName]);
				}
			}
		}
	},
    "playerEnterColshape": (player, colshape) => {
        if (colshape.marker) colshape.marker.showFor(player);
        else player.colshape = colshape;
        if (colshape.menuName) {
			player.call(`prompt.showByName`, ["talrasha_business"]);
			/*if (player.colshape.menuName === "enter_garage" || player.colshape.menuName === "exit_garagevehicle" || player.colshape.menuName === "exit_garage"){
			}else{
				if (player.vehicle) return player.utils.error(`Выйдите из авто!`);
			}*/
			//else if (player.colshape.menuName === "exit_house") {
           // if (menuHandlers[colshape.menuName]) menuHandlers[colshape.menuName](player, colshape);
           // else player.call("selectMenu.show", [colshape.menuName]);
        }

        if (colshape.routep) {
            if (colshape.routep === player.route[player.currentRoutepIndex]) { //currentRoutepIndex - index в массиве маршрута

                if (player.currentRoutepIndex < player.route.length - 1) {
                    var index = ++player.currentRoutepIndex;
                    var direction = (index + 1 < player.route.length) ? new mp.Vector3(player.route[index + 1].x, player.route[index + 1].y, player.route[index + 1].z, ) : null;

                    player.call("checkpoint.create", [player.route[index], direction]);

                } else {
                    player.call("checkpoint.create", []);
                }
            }
        } else if (colshape.factionProducts) {
            var index = colshape.factionProducts.factionIds.indexOf(player.faction);
            if (index == -1 || player.getVariable("attachedObject")) return;
            player.utils.setLocalVar("insideProducts", true);
            player.factionProducts = colshape.factionProducts;
        } else if (colshape.warehouse) {
            if (!player.getVariable("attachedObject")) return;
            player.utils.setLocalVar("insideWarehouseProducts", true);
        } else if (colshape.tpMarker) {
            if (player.lastTpMarkerId != null) return;
            var pos = colshape.targetMarker.position;
            pos.z++;
            player.position = pos;
            player.heading = colshape.targetMarker.h;
            player.lastTpMarkerId = colshape.tpMarker.id;
        } else if (colshape.isForTractor) {
            var veh = player.vehicle;
            if (!veh || !mp.isFarmVehicle(veh)) return;
            colshape.destroy();

            if (player.farmJob.routeIndex == player.farmJob.route.length - 1) {
                var farmField = player.farmJob.tractorField;
                farmField.fill(veh.products.type);

                player.utils.success(`Вы успешно засеяли поле!`);
                player.utils.info(`Урожай созревает...`);
                player.call("checkpoint.clearForTractor");
                player.call("removeWaypoint");
                veh.products.type = 0;
                veh.products.count = 0;
                delete player.farmJob.routeIndex;
                delete player.farmJob.route;
                var farm = player.farmJob.farm;
                var pay = farm.pay * mp.economy["farm_tractor_pay"].value;
                if (farm.balance < pay) player.utils.warning(`На ферме недостаточно средств для оплаты труда! Обратитесь к владельцу фермы!`);
                else {
                    farm.setBalance(farm.balance - pay);
                    player.utils.setMoney(player.money + pay);
                }
            } else {
                player.farmJob.routeIndex++;

                var pos = player.farmJob.route[player.farmJob.routeIndex];
                var data = {
                    position: pos,
                    type: 1,
                    scale: 4,
                    params: {
                        isForTractor: true
                    },
                    color: [255, 255, 255, 255]
                }
                if (player.farmJob.routeIndex < player.farmJob.route.length - 1) data.direction = player.farmJob.route[player.farmJob.routeIndex + 1];
                //дл¤ отловки событи¤ входа в маркер
                var colshape = mp.colshapes.newSphere(pos["x"], pos["y"], pos["z"] + 1, 3); //+1 to fix bug
                colshape.isForTractor = true;
                player.farmJob.tractorColshape = colshape;
                player.call("checkpoint.create", [JSON.stringify(data)]);
                player.call("setNewWaypoint", [pos.x, pos.y]);
            }
        }
		else if (colshape.truckerReceiver) {
		  if (player.job != 5) return player.utils.error(`Вы не работаете Дальнобойщиком!`);
		  if (!player.vehicle) return player.utils.error(`Вы не в транспорте!`);
		  var trailer = mp.vehicles.at(player.vehicle.trailerId);
		  if (!trailer) return player.utils.error(`Вы не взяли заказ!`);
		  var now = parseInt(new Date().getTime() / 1000);
		  if (player.nextBuyTrailer) {
			  if (now < player.nextBuyTrailer) return player.utils.error(`На складе нет места, ожидайте ${player.nextBuyTrailer - now} секунд!`);
		  }
		  player.nextBuyTrailer = now + 7 * 40; // было 7 * 60
		  var marker = colshape.truckerReceiver;
		  var price = marker.prices[trailer.loadType - 1] * trailer.loadCount;
		  player.utils.setMoney(player.money + price);
		  if (!trailer) return player.utils.error(`Вы не взяли заказ!`);
		  player.utils.success(`Товар продан за ${price}$`);

		  var exp = player.jobSkills[5 - 1];
		  var oldLevel = mp.trucker.getSkill(exp).level;
		  player.utils.setJobSkills(5, exp + trailer.loadCount);
		  var newLevel = mp.trucker.getSkill(exp + trailer.loadCount).level;
		  if (oldLevel != newLevel) player.utils.success(`Ваш навык дальнобойщика повысился!`);

		  var skill = mp.trucker.getSkill(0);
		  var maxPlayerLoad = 4 + skill.level;
		  // TODO: Игнорить мелкие лвлы для смены цены груза.
		  if (true /*trailer.loadCount / maxPlayerLoad > 0.8 && skill.level >= 15*/ ) {
			  //изменяем цены
			  marker.prices[trailer.loadType - 1] -= 10;
			  if (marker.prices[trailer.loadType - 1] < 10) marker.prices[trailer.loadType - 1] = 10;
			  marker.label.text = `~g~Дерево: ~w~${marker.prices[0]}$\n ~y~Уголь: ~w~${marker.prices[1]}$\n ~b~Нефть: ~w~${marker.prices[2]}$`;
			  for (var i = 0; i < mp.truckerData.loadReceivers.length; i++) {
				  var point = mp.truckerData.loadReceivers[i];
				  if (point.id != marker.id) {
					  point.prices[trailer.loadType - 1] += 10;
					  if (point.prices[trailer.loadType - 1] > 90) point.prices[trailer.loadType - 1] = 90;
					  point.label.text = `~g~Дерево: ~w~${point.prices[0]}$\n ~y~Уголь: ~w~${point.prices[1]}$\n ~b~Нефть: ~w~${point.prices[2]}$`;
				  }
			  }
		  }
		  delete player.vehicle.trailerId;
		}
		else if (colshape.sellMarker) {
			if (!player.vehicle) return player.utils.error(`Вы не в авто!`);
			var keys = player.inventory.getArrayByItemId(54);
			if (!Object.keys(keys).length) return player.utils.error(`Ключи от авто не найдены!`);
			var owner = false
			for (var key in keys) {
				if (keys[key].params.owner == player.sqlId && keys[key].params.car == player.vehicle.sqlId ) {
					owner = true
					break
				}
			}
			if (!owner) return player.utils.error(`Вы не владелец авто!`);
			
			if (player.vehicle.price) {
				player.call("choiceMenu.show", ["sellcar_confirm", {
					name: player.vehicle.name,
					price: player.vehicle.price / 100 * Config.sellCarPrecent,
					sqlId: player.vehicle.sqlId
				}]);
			}
		
			
			
		}

    },
    "houseHandler": (player) => {
        if (player.colshape) {
            if (player.colshape.house) {
                let house = player.colshape.house;
                if (house) {
                    var interior = mp.interiors.getBySqlId(house.interior);
                    if (!interior) return player.utils.error(`Интерьер не найден!`);
                    var values = [house.sqlId, house.class, house.interior, house.ownerName, house.garageSlots, house.closed, house.price, house.position, interior.rooms, interior.square, house.pledged, house.balance, house.tax, house.getNextPayDate()];
                    //player.call("infoTable.show", ["house_info", house.sqlId]);
                    player.call("houseMenu.show", [values]);
                }
            } else if (player.colshape.menuName === "exit_house") {
				let house = mp.houses.getBySqlId(player.inHouse);
				if (house) {
					var interior = mp.interiors.getBySqlId(house.interior);
					var values = [house.sqlId, house.class, house.interior, house.ownerName, house.garageSlots, house.closed, house.price, house.position, interior.rooms, interior.square, house.pledged, house.balance, house.tax, house.getNextPayDate()];
					player.call("houseMenuexit.show", [values]);
				}
            } else if (player.colshape.menuName === "exit_garage") {
				let house = mp.houses.getBySqlId(player.inGarage);
				if (house) {
					var interior = mp.interiors.getBySqlId(house.interior);
					var values = [house.sqlId, house.class, house.interior, house.ownerName, house.garageSlots, house.closed, house.price, house.position, interior.rooms, interior.square, house.pledged, house.balance, house.tax, house.getNextPayDate()];
					player.call("houseMenuexitgarage.show", [values]);
				}
            } else if (player.colshape.menuName === "enter_garage") {
				mp.events.call("goEnterGarageFromStreet", player);
            }
			else if (player.colshape.menuName === "wardrobe") {
                var house = mp.houses.getBySqlId(player.inHouse);
				if (!house) return player.utils.error(`Вы должны быть в доме!`);
				if (!house || house.owner != player.sqlId) return;
				const size = mp.wardrobeSizes[house.class]
				player.bootHouseId = player.inHouse;
				player.call(`inventory.addVehicleItems`, [house.inventory.items, {
					house: true,
					sqlId: house.sqlId,
				}, size[0], size[1]]);
            }
        }
    },
	"GarageHandler": (player) => {
		if (player.colshape) {
			if (player.colshape.menuName === "exit_garagevehicle") {
				mp.events.call("goEnterStreetFromGarageVehicle", player);
			}
		}
	},
    "houseMenuHandler": (player) => {
        var house = mp.houses.getBySqlId(player.inHouse);
        if (house && house.owner === player.sqlId) {
            player.call("houseOwnerMenu.update", [false, house.closed, house.pledged, house.balance, house.tax, house.getNextPayDate()]);
        } else if (player.colshape && player.colshape.house && player.colshape.house.owner === player.sqlId) {
            player.call("houseOwnerMenu.update", [false, player.colshape.house.closed, player.colshape.house.pledged, player.colshape.house.balance, player.colshape.house.tax, player.colshape.house.getNextPayDate()]);
        }
    },
};
