var spawn = 0;

module.exports = {
	"house.streets.add": (player, allpos) => {
		allpos = JSON.parse(allpos)
		for (var key in allpos) {
			DB.Handle.query("UPDATE talrasha_house SET street=? WHERE id=?",
                [allpos[key], parseInt(key)]);
		}
    },
    "goInspectHouse": (player) => {
        console.log(`goInspectHouse: ${player.name}`);
    },
	"houseInteraction.wardrobeBuyed": (player) => {
		var house = mp.houses.getBySqlId(player.inHouse);
		if (!house) return player.utils.error(`Вы должны быть в доме!`);
		if (!house || house.owner != player.sqlId) return;
		const price = mp.wardrobePrices[house.class]
		if (player.money < price) return player.utils.error(`Необходимо: ${price}$`);
		player.utils.setMoney(player.money - price);
		house.buyWardrobe();
		var interior = mp.interiors.getBySqlId(house.interior);
		if (!interior) return player.utils.error(`Интерьер не найден!`);
		house.initWardrobe(true, player, interior)
	},
	"houseInteraction.buyWardrobe": (player) => {
		var house = mp.houses.getBySqlId(player.inHouse);
		if (!house) return player.utils.error(`Вы должны быть в доме!`);
		if (!house || house.owner != player.sqlId) return;
		if (house.wardrobeBuyed) {
			return player.utils.error(`Шкаф уже куплен!`);
		}
		else {	
			player.call("choiceMenu.show", ["buy_wardrobe_confirm", {
				price: mp.wardrobePrices[house.class]
			}]);
		}
    },
    "goLockUnlockHouse": (player) => {
        var house;
        if (player.colshape) house = player.colshape.house;
        if (!house) house = mp.houses.getBySqlId(player.inHouse);
        if (!house) return player.utils.error(`Вы далеко от дома!`);

        var keys = player.inventory.getArrayByItemId(59);
        for (var sqlId in keys) {
            if (keys[sqlId].params.house == house.sqlId) {
                if (house.closed) house.setClosed(0);
                else house.setClosed(1);
                player.call("houseOwnerMenu.update", [true, house.closed]);
                return;
            }
        }
        player.utils.error(`Ключ от дома не найдены!`);
    },
	"payHouseDays": (player, days) => {
        var house;
        if (player.colshape) house = player.colshape.house;
        if (!house) house = mp.houses.getBySqlId(player.inHouse);
        if (!house) return player.utils.error(`Вы далеко от дома!`);
		var currentDate = new Date().getTime()
		days = parseInt(days)
		var diff = house.payDate - currentDate + (days * 1000 * 60 * 60 * 24)
		if (diff > 0) {
			diff = diff / 1000 / 60 / 60 / 24 //Кол-во дней 
			if (diff > 14) return player.utils.error(`Дом нельзя оплатить больше чем на 14 дней`);
		}
        
		if (!days) return;
		var price = days * house.tax
		if (house.balance < price) return player.utils.error(`Недостаточно денег на счету дома!`);
		house.setBalance(house.balance - price);
		
		house.addDays(days);
		player.call("houseOwnerMenu.update", [true, house.closed, house.pledged, house.balance, house.tax, house.getNextPayDate()]);
		player.utils.success(`Успешно оплачено!`);
    },
    "goBuyHouse": (player) => {
        const houses = mp.houses.getArrayByOwner(player.sqlId);
        if (!player.colshape || !player.colshape.house) return player.utils.error(`Вы не у дома!`);
        let house = player.colshape.house;
        if (house.owner) return player.utils.error(`Дом уже куплен!`);

        if (player.money < house.price) return player.utils.error(`Необходимо: ${house.price}$`);
        if (houses.length >= player.donateHouse) return player.utils.error(`Вы имеете максимальное количество жилья`);
        var freeSlot = player.inventory.findFreeSlot(59);
        if (!freeSlot) return player.utils.error(`Освободите место для ключей!`);

        mp.fullDeleteItemsByParams(59, ["house"], [house.sqlId]);
        player.inventory.add(59, {
            owner: player.sqlId,
            house: house.sqlId
        }, null, (e) => {
            if (e) return player.utils.error(e);

            player.utils.setMoney(player.money - house.price);
            house.setOwner(player.sqlId, player.name);
            player.utils.addHouse(house);
			
			//let playerowner = mp.players.getBySqlId(ownerSqlId)

			var posgarage = new mp.Vector3(house.garageX, house.garageY, house.garageZ);
			player.call("client::addGarageMarker", [true, posgarage])
			var poshouse = new mp.Vector3(house.x, house.y, house.z);
			player.call("client::addHouseBlip", [true, poshouse])
			
			
			house.garageMarker = mp.createHouseGarageMarker(house);

            player.utils.setSpawn(1);
            player.utils.setHouseId(house.sqlId);

            player.utils.success(`Дом ${house.sqlId} куплен`);
            mp.logs.addLog(`${player.name} купил дом ${house.sqlId}. Цена: ${house.price}`, 'house', player.account.id, player.sqlId, { houseId: house.sqlId, price: house.price });
            player.call("exitHouseMenu", [true]);
        });
    },
    "goEnterHouse": (player) => {
        if (!player.colshape || !player.colshape.house) return player.utils.error(`Вы не у дома!`);
        let house = player.colshape.house;

        if (house.closed) return player.utils.warning(`Дом закрыт!`);
		player.utils.saveEnteredHouse(true, house.sqlId)

        var interior = mp.interiors.getBySqlId(house.interior);
        if (!interior) return player.utils.error(`Интерьер не найден!`);

        if (house.closed) return player.utils.error(`Дом закрыт!`);

        var pos = new mp.Vector3(interior.x, interior.y, interior.z);
        player.dimension = house.sqlId;
        player.position = pos;
        player.heading = interior.h;
        player.call("exitHouseMenu", [true]);
		house.initWardrobe(true, player, interior)
    },
    "goEnterStreet": (player) => {
        if (!player.inHouse) return;
        var house = mp.houses.getBySqlId(player.inHouse);
        if (house.closed) return player.utils.warning(`Дом закрыт!`);

        player.position = house.position;
        player.heading = house.h;
        player.dimension = 0;

        var interior = mp.interiors.getBySqlId(house.interior);
        if (!interior) return player.utils.error(`Интерьер не найден!`);
		 house.initWardrobe(false)
		
		player.utils.saveEnteredHouse(false)
		player.call("exitHouseMenu", [true]);
    },
    "goEnterGarage": (player) => {
		var enterHouse = mp.houses.getBySqlId(player.inHouse);
        //var enterHouse = mp.houses.getBySqlId(player.houseId);
        if (!enterHouse) return player.utils.error(`Вы должны быть в доме!`);
		
		player.utils.saveEnteredHouse(true, enterHouse.sqlId)
		
        if (!enterHouse.garage) return player.utils.error(`Дом не имеет гараж!`);
        if (enterHouse.garageClosed) return player.utils.warning(`Гараж закрыт!`);

        var garage = mp.garages.getBySqlId(enterHouse.garage);
        if (!garage) return player.utils.error(`Дом не имеет гараж!`);
		
        player.inGarage = enterHouse.sqlId;
        var pos = new mp.Vector3(garage.x, garage.y, garage.z);

        player.dimension = enterHouse.sqlId;
        player.position = pos;
        player.heading = garage.h;

        var interior = mp.interiors.getBySqlId(enterHouse.interior);
        if (!interior) return player.utils.error(`Интерьер не найден!`);
		enterHouse.initWardrobe(false)

        player.call("exitHouseMenu", [true]);
    },
	
	"goEnterGarageFromStreet": (player) => {
		let vehicle = player.vehicle
		if(vehicle){
			var enterHouse = mp.houses.getBySqlId(player.houseId);
			if (!enterHouse) return player.utils.error(`Вы должны быть в доме!`);

			if (!enterHouse.garage) return player.utils.error(`Дом не имеет гараж!`);
			if (enterHouse.garageClosed) return player.utils.warning(`Гараж закрыт!`);

			var garage = mp.garages.getBySqlId(enterHouse.garage);
			if (!garage) return player.utils.error(`Дом не имеет гараж!`);;

			player.utils.saveEnteredHouse(true, enterHouse.sqlId)
			player.inGarage = enterHouse.sqlId;
			var pos = new mp.Vector3(garage.x, garage.y, garage.z);
			var garage = mp.garages.getBySqlId(enterHouse.garage);
			
			var posgarage;

			for (var i = 0; i < garage.slots.length; i++) {
				posgarage = garage.slots[spawn]
				
				spawn += 1
				
				if(garage.slots.length - 1 == spawn) {
					spawn = 0;
				}
			}
		
			if(vehicle.owner > 1001){
				vehicle.position = new mp.Vector3(posgarage.x, posgarage.y, posgarage.z);
				//vehicle.heading = posgarage.h;
				player.position = pos;
				player.heading = garage.h;
				vehicle.dimension = enterHouse.sqlId;
				player.dimension = enterHouse.sqlId;
				vehicle.locked = true;
				vehicle.engine = false;
				
				//console.log(JSON.stringify(posgarage));
				//console.log(`${spawn}`);
				
				if (vehicle.getVariable("engine"))
					vehicle.utils.engineOn();
			}
			else
			{
				player.utils.error(`Вы не можете заехать в гараж на этой машине!`);
			}
		}
    },
	
	 "goEnterStreetFromGarageVehicle": (player) => {
        if (!player.inGarage) return;
		let vehicle = player.vehicle

        var exitHouse = mp.houses.getBySqlId(player.inGarage);
        if (exitHouse.garageClosed) return player.utils.warning(`Гараж закрыт!`);
        if (!exitHouse.garageH && !exitHouse.garageZ) return player.utils.error(`Нет выхода на улицу!`);
		
		player.utils.saveEnteredHouse(false)
		
        var pos = new mp.Vector3(exitHouse.garageX, exitHouse.garageY, exitHouse.garageZ);
		if(vehicle){
			if(vehicle.owner){
			vehicle.dimension = 0;
			vehicle.position = new mp.Vector3(pos);
			player.heading = exitHouse.garageH;
			
			delete player.inGarage;
			}
				else
				{
					player.utils.error(`Вы не можете выехать из гаража на этой машине!`);
				}
		}

        //delete player.inGarage;
    },

    "goExitGarage": (player) => {
        if (!player.inGarage) return;

        var house = mp.houses.getBySqlId(player.inGarage);
        if (!house) return player.utils.error(`Дом не найден!`);

        var interior = mp.interiors.getBySqlId(house.interior);
        if (!interior) return player.utils.error(`Интерьер от дома не найден!`);
		
        var pos = new mp.Vector3(interior.x, interior.y, interior.z);
        player.dimension = house.sqlId;
        player.position = pos;
        player.heading = interior.garageH;
        player.inHouse = player.inGarage;
        delete player.inGarage;
		
		player.call("exitHouseMenu", [true]);
    },
	
    "goEnterStreetFromGarage": (player) => {
        if (!player.inGarage) return player.utils.error(`Вы не в гараже!`);

        var exitHouse = mp.houses.getBySqlId(player.inGarage);
		//var house = mp.houses.getBySqlId(player.inHouse);
        if (exitHouse.garageClosed) return player.utils.warning(`Гараж закрыт!`);
        //if (!exitHouse.garageH && !exitHouse.garageZ) return player.utils.error(`Нет выхода на улицу!`);
		
		player.utils.saveEnteredHouse(false)
        //var pos = new mp.Vector3(exitHouse.garageX, exitHouse.garageY, exitHouse.garageZ);
        player.dimension = 0;
        player.position = exitHouse.position;
        player.heading = exitHouse.h;

        delete player.inGarage;
		
		player.call("exitHouseMenu", [true]);
    },
	
    "getHouseInfo": (player) => {
        if (!player.colshape || !player.colshape.house) return player.utils.error(`Вы не у дома!`);
        let house = player.colshape.house;

        var values = [house.sqlId, house.class, house.interior, house.ownerName, house.garage, house.closed, house.price];
        player.call("infoTable.show", ["house_info", values]);
    },

    "getGarageInfo": (player) => {
        var house;
        if (!player.inHouse) house = mp.houses.getBySqlId(player.colshape.garage.houseSqlId); // с улицы смотрим инфо
        else house = mp.houses.getBySqlId(player.inHouse); // из дома смотрим инфо

        if (!house) return player.utils.error(`Дом от гаража не найден!`);

        player.call("infoTable.show", ["garage_info", [house.sqlId, house.garage, house.garageClosed]]);
    },

    "invitePlayerInHouse": (player, params) => {
        params = JSON.parse(params);
        if (!player.colshape || !player.colshape.house) return player.utils.error(`Вы не у дома!`);
        var house = player.colshape.house;
        if (house.owner != player.sqlId) return player.utils.error(`Вы не владелец дома!`);

        var invitePlayer = null;
        if (parseInt(params[0]) >= 0) invitePlayer = mp.players.at(parseInt(params[0]));
        else invitePlayer = mp.players.getByName(params[0]);
        if (!invitePlayer) return player.utils.error("Гражданин не найден!");
        else if (player.id === invitePlayer.id) return player.utils.error("Нельзя пригласить самого себя!");
        var dist = player.dist(invitePlayer.position);
        if (dist > Config.maxInteractionDist) return player.utils.error(`Гражданин слишком далеко!`);

        invitePlayer.call("choiceMenu.show", ["invite_inhouse_confirm", {
            name: player.name
        }]);
        // invitePlayer.call("exitHouseMenu", [true]);
        invitePlayer.inviteInHouse = house;
    },

    "house.invite.agree": (player) => {
        if (!player.inviteInHouse) return player.utils.error(`Вы не были приглашены в дом!`);

        // player.call("exitHouseMenu", [true]);
        var house = player.inviteInHouse;
        var interior = mp.interiors.getBySqlId(house.interior);
        if (!interior) return player.utils.error(`Интерьер не найден!`);

        var pos = new mp.Vector3(interior.x, interior.y, interior.z);
		player.utils.saveEnteredHouse(true, house.sqlId)
        player.dimension = house.sqlId;
        player.position = pos;
        player.heading = interior.h;

        delete player.inviteInHouse;
    },

    "house.invite.cancel": (player) => {
        delete player.inviteInHouse;
    },

    "sellHouseToGov": (player) => {
        if (!player.inHouse) return player.utils.error(`Продажа осуществляется в доме!`);
        var house = mp.houses.getBySqlId(player.inHouse);
        if (!house) return player.utils.error(`Дом не найден!`);
        if (house.owner != player.sqlId) return player.utils.error(`Вы не владелец дома!`);

        var balance = house.balance;
        if (balance <= 1000) balance = 0;
        var price = parseInt(house.price * mp.economy["house_sell"].value) + balance;
        player.call("choiceMenu.show", ["sellhousegov_confirm", {
            price: price
        }]);
    },

    "house.sellgov.agree": (player) => {
        if (!player.inHouse) return player.utils.error(`Продажа осуществляется в доме!`);
        var house = mp.houses.getBySqlId(player.inHouse);
        if (!house) return player.utils.error(`Дом не найден!`);
        if (house.owner != player.sqlId) return player.utils.error(`Вы не владелец дома!`);

        var balance = house.balance;
        if (balance <= 1000) balance = 0;
        var price = parseInt(house.price * mp.economy["house_sell"].value) + balance;
        player.utils.setBankMoney(player.bank + price);
        house.setOwner(0);
		spawn = 0;
        player.utils.removeHouse(house);
        if(player.houseId == house.sqlId) {
            player.utils.setSpawn(3);
            player.utils.setHouseId(0);
        }
        player.utils.info(`Начислено: ${price}$`);
        player.utils.success(`Дом ${house.sqlId} продан государству!`);
        mp.logs.addLog(`${player.name} продал дом ${house.sqlId} государству. Цена: ${house.price}`, 'house', player.account.id, player.sqlId, { houseId: house.sqlId, price: house.price });
		
		if (house.garageMarker) {
			mp.players.forEachInRange(house.garageMarker.position, 2, (rec) => {
				if (house.garageMarker.colshape.isPointWithin(rec.position)) rec.call("selectMenu.hide");
			});

			//house.garageMarker.showColshape.destroy();
			house.garageMarker.colshape.destroy();
			house.garageMarker.destroy();
			delete house.garageMarker;
		}
    },

    "sellHousePlayer": (player, params) => {
        params = JSON.parse(params);
        if (!player.inHouse) return player.utils.error(`Продажа осуществляется в доме!`);
        var house = mp.houses.getBySqlId(player.inHouse);
        if (!house) return player.utils.error(`Дом не найден!`);
        if (house.owner != player.sqlId) return player.utils.error(`Вы не владелец дома!`);

        var invitePlayer = null;
        if (parseInt(params[0]) >= 0) invitePlayer = mp.players.at(parseInt(params[0]));
        else invitePlayer = mp.players.getByName(params[0]);
        if (!invitePlayer) return player.utils.error("Гражданин не найден!");
        const houses = mp.houses.getArrayByOwner(invitePlayer.sqlId);
        if(houses.length >= invitePlayer.donateHouse) return player.utils.error("Игрок имеет максимальное количество жилья");
        if(player.id === invitePlayer.id) return player.utils.error("Нельзя продать дом самому себе!");

        var price = parseInt(params[1]);
        if (price <= 0) return player.utils.error(`Неверная цена!`);

        player.call("choiceMenu.show", ["sellhouseplayer_confirm", {
            name: invitePlayer.name,
            price: price
        }]);

        player.sellHouseOffer = {
            invitePlayerId: invitePlayer.id,
            price: price
        };
    },

    "house.sellplayer.agree": (player) => {
        if (!player.inHouse) return player.utils.error(`Продажа осуществляется в доме!`);
        var house = mp.houses.getBySqlId(player.inHouse);
        if (!house) return player.utils.error(`Дом не найден!`);
        if (house.owner != player.sqlId) return player.utils.error(`Вы не владелец дома!`);
        if (!player.sellHouseOffer) return player.utils.error(`Предложение не найдено!`);

        var invitePlayer = mp.players.at(player.sellHouseOffer.invitePlayerId);
        if (!invitePlayer) return player.utils.error(`Покупатель не найден!`);

        var dist = player.dist(invitePlayer.position);
        if (dist > Config.maxInteractionDist) return player.utils.error(`Покупатель далеко!`);
        if (player.id == invitePlayer.id) return player.utils.error(`Нельзя продать дом самому себе!`);

        invitePlayer.call("choiceMenu.show", ["buyhouseplayer_confirm", {
            name: player.name,
            houseid: house.id,
            price: player.sellHouseOffer.price,
        }]);

        invitePlayer.sellHouseOffer = {
            ownerId: player.id,
            price: player.sellHouseOffer.price
        };
    },

    "house.sellplayer.cancel": (player) => {
        delete player.sellHouseOffer;
    },

    "house.buyhouseplayer.agree": (player) => {
        if (!player.sellHouseOffer) return player.utils.error(`Предложение не найдено!`);
        var owner = mp.players.at(player.sellHouseOffer.ownerId);
        if (!owner) return player.utils.error(`Продавец не найден!`);

        var dist = player.dist(owner.position);
        if (dist > Config.maxInteractionDist) return player.utils.error(`Продавец далеко!`);
        if (player.id == owner.id) return player.utils.error(`Нельзя продать дом самому себе!`);

        if (!owner.inHouse) return player.utils.error(`Продажа осуществляется в доме!`);
        var house = mp.houses.getBySqlId(owner.inHouse);
        if (!house) return player.utils.error(`Дом не найден!`);
        if (house.owner != owner.sqlId) return player.utils.error(`Продавец не владелец дома!`);
        var price = player.sellHouseOffer.price;
        if (player.money < price) {
            owner.utils.info(`${player.name} не имеет ${price}$`);
            return player.utils.error(`Необходимо: ${price}$`);
        }
        // TODO: Проверка на наличие домов.
        owner.utils.setMoney(owner.money + price);
        player.utils.setMoney(player.money - price);
        house.setOwner(player.sqlId, player.name);
		spawn = 0;

        owner.utils.success(`Дом ${house.sqlId} продан`);
        player.utils.success(`Дом ${house.sqlId} куплен`);
        
        mp.logs.addLog(`${owner.name} продал дом ${house.sqlId} игроку ${player.name}. Цена: ${price}`, 'house', owner.account.id, owner.sqlId, { houseId: house.sqlId, price: price });
        mp.logs.addLog(`${player.name} купил дом ${house.sqlId} у игрока ${owner.name}. Цена: ${price}`, 'house', player.account.id, player.sqlId, { houseId: house.sqlId, price: price });

        player.utils.setSpawn(1);
        player.utils.setHouseId(house.sqlId);

        owner.utils.setHouseId(0);
        owner.utils.setSpawn(3);

        owner.utils.removeHouse(house);
        player.utils.addHouse(house);
    },

    "house.buyhouseplayer.cancel": (player) => {
        if (!player.sellHouseOffer) return;
        var owner = mp.players.at(player.sellHouseOffer.ownerId);
        if (owner) {
            owner.utils.info(`${player.name} отменил предложение`);
            delete owner.sellHouseOffer;
        }
        delete player.sellHouseOffer;
    }
};

function getRandom(min, max) {
   try
	{
		return Math.floor(Math.random() * (max - min)) + min;
	} catch (err){
		console.log(err);
		return -1;
	}
}