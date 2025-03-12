const {checkLoadSettings} = require("../talrasha_module/talrasha_ipad/talrasha_ipad");
module.exports = {
    "policeStorage.takeClothes": (player, index) => {
		let sett = checkLoadSettings(player, player.faction, player.rank)
        if (!player.colshape || !player.colshape.policeStorage) return player.utils.error(`Вы не у склада Police!`);
        var policeStorageMarker = player.colshape.policeStorage;
        if (!mp.factions.isPoliceFaction(player.faction)) return player.utils.error(`Вы не являетесь сотрудником порядка!`);
		if(sett === null || sett.storage === 0) return player.utils.error(`У вас нет прав!`)

        var faction = mp.factions.getBySqlId(player.faction);
        if (!faction) return player.utils.error(`Организация с ID: ${player.faction} не найдена!`);
        var police = faction.name;

        if (faction.products < mp.economy["police_mainclothes_products"].value) return player.utils.error(`Недостаточно боеприпасов!`);
        var hats = player.inventory.getArrayByItemId(6);
        var tops = player.inventory.getArrayByItemId(7);
        var legs = player.inventory.getArrayByItemId(8);
        var feets = player.inventory.getArrayByItemId(9);
        var ties = player.inventory.getArrayByItemId(2);
        var masks = player.inventory.getArrayByItemId(14);
        var glasses = player.inventory.getArrayByItemId(1);

        for (var key in hats)
            if (mp.factions.isPoliceFaction(hats[key].params.faction)) return player.utils.error(`У Вас уже есть головной убор ${police}!`);
        for (var key in tops)
            if (mp.factions.isPoliceFaction(tops[key].params.faction)) return player.utils.error(`У Вас уже есть рубашка ${police}!`);
        for (var key in legs)
            if (mp.factions.isPoliceFaction(legs[key].params.faction)) return player.utils.error(`У Вас уже есть брюки ${police}!`);
        for (var key in feets)
            if (mp.factions.isPoliceFaction(feets[key].params.faction)) return player.utils.error(`У Вас уже есть ботинки ${police}!`);
        for (var key in ties)
            if (mp.factions.isPoliceFaction(ties[key].params.faction)) return player.utils.error(`У Вас уже есть аксессуар ${police}!`);
        for (var key in masks)
            if (mp.factions.isPoliceFaction(masks[key].params.faction)) return player.utils.error(`У Вас уже есть шлем ${police}!`);
        for (var key in glasses)
            if (mp.factions.isPoliceFaction(glasses[key].params.faction)) return player.utils.error(`У Вас уже есть очки ${police}!`);

        mp.fullDeleteItemsByParams(6, ["faction", "owner"], [player.faction, player.sqlId]);
        mp.fullDeleteItemsByParams(7, ["faction", "owner"], [player.faction, player.sqlId]);
        mp.fullDeleteItemsByParams(8, ["faction", "owner"], [player.faction, player.sqlId]);
        mp.fullDeleteItemsByParams(9, ["faction", "owner"], [player.faction, player.sqlId]);
        mp.fullDeleteItemsByParams(10, ["faction", "owner"], [player.faction, player.sqlId]);
        mp.fullDeleteItemsByParams(2, ["faction", "owner"], [player.faction, player.sqlId]);
        mp.fullDeleteItemsByParams(14, ["faction", "owner"], [player.faction, player.sqlId]);
        mp.fullDeleteItemsByParams(1, ["faction", "owner"], [player.faction, player.sqlId]);

        var hatParams, topParams, legsParams, feetsParams, tiesParams, masksParams, glassesParams;
        var f = player.faction - 2;
        if (player.sex == 1) {
            hatParams = {
                sex: 1,
                variation: [
                    [46, 142, -1, 123],
                    [117, -1, -1, 58, -1, -1, 13]
                ][f][index],
                texture: [
                    [0, 0, 0, 0],
                    [0, 0, 0, 1, 0, 0, 0]
                ][f][index]
            };
            topParams = {
                sex: 1,
                torso: [
                    [0, 31, 31, 31],
                    [17, 0, 11, 11, 11, 11, 6]
                ][f][index],
                tTexture: [
                    [-1, 0, 0, 0],
                    [-1, -1, -1, -1, -1, -1, -1]
                ][f][index],
                variation: [
                    [55, 316, 317, 53],
                    [53, 242, 13, 13, 13, 13, 156]
                ][f][index],
                texture: [
                    [0, 0, 0, 0],
                    [3, 2, 1, 1, 1, 2, 0]
                ][f][index],
                undershirt: [
                    [58, -1, -1],
                    [122, 129, 58, 58, 122, 130, 115]
                ][f][index]
            };
            legsParams = {
                sex: 1,
                variation: [
                    [10, 10, 10, 33],
                    [47, 22, 22, 22, 37, 37, 25]
                ][f][index],
                texture: [
                    [0, 0, 0, 0],
                    [1, 1, 1, 1, 1, 1, 6]
                ][f][index]
            };
            feetsParams = {
                sex: 1,
                variation: [
                    [10, 10, 10, 24],
                    [25, 25, 25, 25, 25, 10, 10, 10]
                ][f][index],
                texture: [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0, 12, 0, 12]
                ][f][index]
            };
            tiesParams = {
                sex: 1,
                variation: [
                    [-1, -1, 21, -1],
                    [-1, -1, 38, -1, 38, 38, -1]
                ][f][index],
                texture: [
                    [0, 0, 1, 0],
                    [0, 0, 0, 0, 0, 1, 0]
                ][f][index]
            };
            masksParams = {
                sex: 1,
                variation: [
                    [-1, -1, -1, 126],
                    [52, -1, -1, -1, -1, -1, -1]
                ][f][index],
                texture: [
                    [-1, -1, -1, 0],
                    [0, 0, 0, 0, 0, 0, 0]
                ][f][index]
            };
            glassesParams = {
                sex: 1,
                variation: [
                    [-1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1]
                ][f][index],
                texture: [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0]
                ][f][index]
            };
        } else {
            hatParams = {
                sex: 0,
                variation: [
                    [-1, -1, -1, 122],
                    [116, -1, -1, 58, -1, -1, 20]
                ][f][index],
                texture: [
                    [0, 0, 0, 0],
                    [0, 0, 0, 1, 0, 0, 1]
                ][f][index]
            };
            topParams = {
                sex: 0,
                torso: [
                    [0, 36, 36, 36],
                    [18, 0, 0, 20, 20, 20, 20]
                ][f][index],
                variation: [
                    [48, 327, 328, 46],
                    [46, 165, 27, 27, 27, 27, 183]
                ][f][index],
                texture: [
                    [0, 0, 0, 0],
                    [3, 0, 2, 2, 2, 2, 2]
                ][f][index],
                undershirt: [
                    [-1, -1, 35],
                    [160, 78, 35, 35, 152, 152, 37]
                ][f][index]
            };
            legsParams = {
                sex: 0,
                variation: [
                    [138, 138, 138, 32],
                    [49, 41, 64, 64, 41, 37, 37]
                ][f][index],
                texture: [
                    [0, 0, 0, 0],
                    [1, 1, 2, 2, 1, 6, 6]
                ][f][index]
            };
            feetsParams = {
                sex: 0,
                variation: [
                    [64, 64, 64, 24],
                    [25, 13, 55, 55, 29, 29, 29]
                ][f][index],
                texture: [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 2, 2]
                ][f][index]
            };
            tiesParams = {
                sex: 1,
                variation: [
                    [-1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, 95]
                ][f][index],
                texture: [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0]
                ][f][index]
            };
            masksParams = {
                sex: 0,
                variation: [
                    [-1, -1, -1, 126],
                    [57, -1, -1, -1, -1, -1, -1]
                ][f][index],
                texture: [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0]
                ][f][index]
            };
            glassesParams = {
                sex: 0,
                variation: [
                    [-1, -1, -1, -1, 27, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1]
                ][f][index],
                texture: [
                    [0, 0, 0, 0, 4, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0]
                ][f][index]
            };
        }
        if (topParams.undershirt == -1) delete topParams.undershirt;
        if (topParams.uTexture == -1) delete topParams.uTexture;
        if (topParams.tTexture == -1) delete topParams.tTexture;

        hatParams.faction = player.faction;
        topParams.faction = player.faction;
        legsParams.faction = player.faction;
        feetsParams.faction = player.faction;
        tiesParams.faction = player.faction;
        masksParams.faction = player.faction;
        glassesParams.faction = player.faction;

        topParams.rows = 3;
        topParams.cols = 10;
        legsParams.rows = 2;
        legsParams.cols = 10;
        topParams.name = police;
        legsParams.name = police;

        hatParams.owner = player.sqlId;
        topParams.owner = player.sqlId;
        legsParams.owner = player.sqlId;
        feetsParams.owner = player.sqlId;
        tiesParams.owner = player.sqlId;
        masksParams.owner = player.sqlId;
        glassesParams.owner = player.sqlId;

        var response = (e) => {
            if (e) player.utils.error(e);
        };
        if (hatParams.variation != -1) player.inventory.add(6, hatParams, {});
        if (topParams.variation != -1) player.inventory.add(7, topParams, {});
        if (legsParams.variation != -1) player.inventory.add(8, legsParams, {});
        if (feetsParams.variation != -1) player.inventory.add(9, feetsParams, {});
        if (tiesParams.variation != -1) player.inventory.add(2, tiesParams, {});
        if (masksParams.variation != -1) player.inventory.add(14, masksParams, {});
        if (glassesParams.variation != -1) player.inventory.add(1, glassesParams, {});

        player.utils.success(`Вам выдана форма ${police}!`);


        faction.setProducts(faction.products - mp.economy["police_mainclothes_products"].value);
		mp.logs.storage(player.name, player.sqlId, player.faction, mp.factionRanks[player.faction][player.rank].name, 'Взял', 1, 'Форма Police')
        mp.logs.addLog(`${player.name} взял со склада Форма Police`, 'faction', player.account.id, player.sqlId, {
            faction: player.faction,
            count: 1
        });
    },

    "policeStorage.takeArmour": (player) => {
		let sett = checkLoadSettings(player, player.faction, player.rank)
        if (!player.colshape || !player.colshape.policeStorage) return player.utils.error(`Вы не у склада PD!`);
        var policeStorageMarker = player.colshape.policeStorage;
        if (!mp.factions.isPoliceFaction(player.faction)) return player.utils.error(`Вы не являетесь сотрудником порядка!`);
		if(sett === null || sett.storage === 0) return player.utils.error(`У вас нет прав!`)

        var faction = mp.factions.getBySqlId(player.faction);
        if (!faction) return player.utils.error(`Организация с ID: ${player.faction} не найдена!`);
        var pd = faction.name;

        if (faction.products < mp.economy["police_armour_products"].value) return player.utils.error(`Недостаточно боеприпасов!`);
        var items = player.inventory.getArrayByItemId(3);

        for (var sqlId in items)
            if (mp.factions.isPoliceFaction(items[sqlId].params.faction)) return player.utils.error(`У Вас уже есть бронежилет ${pd}!`);

        mp.fullDeleteItemsByParams(3, ["faction", "owner"], [player.faction, player.sqlId]);
        var params;
        if (player.sex == 1) {
            params = {
                variation: 16,
                texture: 2
            };
        } else {
            params = {
                variation: 18,
                texture: 2
            };
        }

        params.faction = player.faction;
        params.owner = player.sqlId;
        params.armour = 100;
        params.sex = player.sex;


        player.inventory.add(3, params, {}, (e) => {
            if (e) return player.utils.error(e);
            player.utils.success(`Вам выдан бронежилет ${pd}!`);
            faction.setProducts(faction.products - mp.economy["police_armour_products"].value);
			mp.logs.storage(player.name, player.sqlId, player.faction, mp.factionRanks[player.faction][player.rank].name, 'Взял', 1, 'Бронежилет LSPD')
            mp.logs.addLog(`${player.name} взял со склада Форма Бронежилет LSPD`, 'faction', player.account.id, player.sqlId, {
                faction: player.faction,
                count: 1
            });
        });

    },

    "policeStorage.takeGun": (player, index) => {
		let sett = checkLoadSettings(player, player.faction, player.rank)
        if (!player.colshape || !player.colshape.policeStorage) return player.utils.error(`Вы не у склада PD!`);
        var policeStorageMarker = player.colshape.policeStorage;
        if (!mp.factions.isPoliceFaction(player.faction)) return player.utils.error(`Вы не являетесь сотрудником порядка!`);
		if(sett === null || sett.storage === 0) return player.utils.error(`У вас нет прав!`)

        var faction = mp.factions.getBySqlId(player.faction);
        if (!faction) return player.utils.error(`Организация с ID: ${player.faction} не найдена!`);

        if (faction.products < mp.economy["police_armour_products"].value) return player.utils.error(`Недостаточно боеприпасов!`);


        var itemIds = [17, 18, 19, 20, 21, 22, 23];
        var weaponIds = ["weapon_nightstick", "weapon_flashlight", "weapon_stungun", "weapon_combatpistol", "weapon_pumpshotgun", "weapon_carbinerifle", "weapon_sniperrifle"];
        index = Math.clamp(index, 0, itemIds.length - 1);
        var itemId = itemIds[index];

        var guns = player.inventory.getArrayByItemId(itemId);
        if (Object.keys(guns).length > 0) return player.utils.error(`У Вас уже есть ${mp.inventory.getItem(itemId).name}!`);

        mp.fullDeleteItemsByParams(itemId, ["faction", "owner"], [player.faction, player.sqlId]);
        var params = {
            weaponHash: mp.joaat(weaponIds[index]),
            ammo: 0,
            faction: player.faction,
            owner: player.sqlId
        };

        player.inventory.add(itemId, params, {}, (e) => {
            if (e) return player.utils.error(e);
            player.utils.success(`Вам выдано оружие ${mp.inventory.getItem(itemId).name}!`);
            faction.setProducts(faction.products - mp.economy["police_armour_products"].value);
			mp.logs.storage(player.name, player.sqlId, player.faction, mp.factionRanks[player.faction][player.rank].name, 'Взял', 1, mp.inventory.getItem(itemId).name)
            mp.logs.addLog(`${player.name} взял со склада оружие ${mp.inventory.getItem(itemId).name}`, 'faction', player.account.id, player.sqlId, {
                faction: player.faction,
                item: mp.inventory.getItem(itemId).name,
                count: 1
            });

        });
    },

    "policeStorage.takeAmmo": (player, index, ammo) => {
		let sett = checkLoadSettings(player, player.faction, player.rank)
        //debug(`policeStorage.takeAmmo: ${index} ${ammo}`);
        if (!player.colshape || !player.colshape.policeStorage) return player.utils.error(`Вы не у склада PD!`);
        var policeStorageMarker = player.colshape.policeStorage;
        if (!mp.factions.isPoliceFaction(player.faction)) return player.utils.error(`Вы не являетесь сотрудником порядка!`);
		if(sett === null || sett.storage === 0) return player.utils.error(`У вас нет прав!`)

        var faction = mp.factions.getBySqlId(player.faction);
        if (!faction) return player.utils.error(`Организация с ID: ${player.faction} не найдена!`);

        var itemIds = [37, 38, 40, 39];
        index = Math.clamp(index, 0, itemIds.length - 1);
        var products = [0, 1, 3, 2];
        products = mp.economy[`ammo_${products[index]}_products_price`].value * ammo;
        if (faction.products < products) return player.utils.error(`Недостаточно боеприпасов!`);

        // mp.fullDeleteItemsByParams(itemIds[index], ["faction", "owner"], [player.faction, player.sqlId]);
        var params = {
            ammo: ammo,
            faction: player.faction,
            owner: player.sqlId
        };
        player.inventory.add(itemIds[index], params, {}, (e) => {
            if (e) return player.utils.error(e);
            player.utils.success(`Вам выданы ${mp.inventory.getItem(itemIds[index]).name}!`);
            faction.setProducts(faction.products - products);
			mp.logs.storage(player.name, player.sqlId, player.faction, mp.factionRanks[player.faction][player.rank].name, 'Взял', ammo, mp.inventory.getItem(itemId).name)
            mp.logs.addLog(`${player.name} взял со склада ${mp.inventory.getItem(itemIds[index]).name}. Количество: ${ammo}`, 'faction', player.account.id, player.sqlId, {
                faction: player.faction,
                item: mp.inventory.getItem(itemIds[index]).name,
                count: ammo
            });
        });
    },

    "policeStorage.takeItem": (player, index) => {
		let sett = checkLoadSettings(player, player.faction, player.rank)
        if (!player.colshape || !player.colshape.policeStorage) return player.utils.error(`Вы не у склада PD!`);
        var policeStorageMarker = player.colshape.policeStorage;
        if (!mp.factions.isPoliceFaction(player.faction)) return player.utils.error(`Вы не являетесь сотрудником порядка!`);
		if(sett === null || sett.storage === 0) return player.utils.error(`У вас нет прав!`)

        var faction = mp.factions.getBySqlId(player.faction);
        if (!faction) return player.utils.error(`Организация с ID: ${player.faction} не найдена!`);

        if (faction.products < mp.economy["police_armour_products"].value) return player.utils.error(`Недостаточно боеприпасов!`);

        var itemIds = [29, 27, 28];
        index = Math.clamp(index, 0, itemIds.length - 1);
        var itemId = itemIds[index];

        var items = player.inventory.getArrayByItemId(itemId);
        if (Object.keys(items).length > 0) return player.utils.error(`У Вас уже есть ${mp.inventory.getItem(itemId).name}!`);

        mp.fullDeleteItemsByParams(itemId, ["faction", "owner"], [player.faction, player.sqlId]);
        var params = {
            faction: player.faction,
            owner: player.sqlId
        };

        player.inventory.add(itemId, params, {}, (e) => {
            if (e) return player.utils.error(e);
            player.utils.success(`Вам выдано ${mp.inventory.getItem(itemId).name}!`);
            faction.setProducts(faction.products - mp.economy["police_armour_products"].value);
			mp.logs.storage(player.name, player.sqlId, player.faction, mp.factionRanks[player.faction][player.rank].name, 'Взял', ammo, mp.inventory.getItem(itemId).name)
            mp.logs.addLog(`${player.name} взял со склада ${mp.inventory.getItem(itemId).name}. Количество: ${ammo}`, 'faction', player.account.id, player.sqlId, {
                faction: player.faction,
                item: mp.inventory.getItem(itemId).name,
                count: 1
            });

        });
    },

    "policeService.recovery.documents": (player) => {
        if (!player.colshape || !player.colshape.factionService) return player.utils.error(`Вы не возле услуг PD!`);

        var docs = player.inventory.getArrayByItemId(16);
        for (var sqlId in docs) {
            if (docs[sqlId].params.owner == player.sqlId) return player.utils.error(`Вы уже имеете документы!`);
        }
        var price = mp.economy["police_recovery_price"].value;
        if (player.money < price) return player.utils.error(`Необходимо: ${price}$`);

        mp.fullDeleteItemsByParams(16, ["owner"], [player.sqlId]);
        var params = {
            owner: player.sqlId,
            licenses: [],
            weapon: [0, 0, 0, 0, 0, 0, 0],
            work: []
        };
        player.inventory.add(16, params, null, (e) => {
            if (e) return player.utils.error(e);

            player.utils.setMoney(player.money - price);
            player.utils.success(`Документы восстановлены!`);
        });
    },

    "policeService.recovery.carKeys": (player) => {
        if (!player.colshape || !player.colshape.factionService) return player.utils.error(`Вы не возле услуг PD!`);

        var keys = player.inventory.getArrayByItemId(54);
        var tempCarIds = player.cars;

        // debug(`tempCarIds: ${tempCarIds}`);
        if (!tempCarIds.length) return player.utils.error(`Нет доступных авто для восстановления ключей!`);

        for (var i = 0; i < tempCarIds.length; i++) {
            var veh = tempCarIds[i]
			
			var isFind = false
			
			for (var z in keys) {
				if (keys[z].params.car == veh.sqlId) {
					isFind = true 
					break
				}
			}
			
			
			if (isFind) continue;
		
            var price = mp.economy["police_recovery_price"].value;
            if (player.money < price) {
				player.utils.error(`Не хватает наличных на восстановление ${veh.name}!`);
				continue;
			}

            mp.fullDeleteItemsByParams(54, ["car"], [veh.sqlId]);
            var params = {
                owner: player.sqlId,
                car: veh.sqlId,
                model: veh.name,
				plate: veh.plate
            };
            player.inventory.add(54, params, null, (e) => {
                if (e) return player.utils.error(e);

                player.utils.setMoney(player.money - price);
                player.utils.success(`Ключи от авто восстановлены!`);
            });

        }


    },

    "policeService.recovery.houseKeys": (player, houseSqlId) => {
        // debug(`recovery.houseKeys: ${player.name} ${houseSqlId}`)
        if (!player.colshape || !player.colshape.factionService) return player.utils.error(`Вы не возле услуг PD!`);

        var house = mp.houses.getBySqlId(houseSqlId);
        if (!house) return player.utils.error(`Дом с ID: ${houseSqlId} не найден!`);
        if (house.owner != player.sqlId) return player.utils.error(`Вы не владелец дома!`);

        var keys = player.inventory.getArrayByItemId(59);
        for (var index in keys)
            if (keys[index].params.house == house.sqlId) return player.utils.error(`Вы уже имеете ключи от Дома №${houseSqlId}!`);

        mp.fullDeleteItemsByParams(59, ["house"], [house.sqlId]);
        var params = {
            owner: player.sqlId,
            house: house.sqlId
        };
        player.inventory.add(59, params, null, (e) => {
            if (e) return player.utils.error(e);

            player.utils.setMoney(player.money - mp.economy["police_recovery_price"].value);
            player.utils.success(`Ключи от дома восстановлены!`);
        });
    },

    "policeService.showClearFine": (player) => {
        // debug(`showClearFine: ${player.name}`)
        if (!player.colshape || !player.colshape.factionService) return player.utils.error(`Вы не возле услуг PD!`);
        if (player.fines < 1) return player.utils.error(`Вы не имеете штрафов!`);
        DB.Handle.query("SELECT * FROM talrasha_fine WHERE recipient=? LIMIT 1", player.sqlId, (e, result) => {
            if (!result.length) {
                player.fines = 0;
                return player.utils.error(`Штрафы не найдены!`);
            }
            player.clearFine = result[0];
            player.call(`modal.show`, [`clear_fine`, result[0]]);
        });
    },

    "policeService.clearFine": (player) => {
        if (!player.colshape || !player.colshape.factionService) return player.utils.error(`Вы не возле услуг PD!`);
        if (!player.clearFine) return player.utils.error(`Штраф не найден!`);
        if (player.money < player.clearFine.price) return player.utils.eror(`Необходимо: $${player.clearFine.price}`);

        player.utils.setMoney(player.money - player.clearFine.price);
        DB.Handle.query(`DELETE FROM talrasha_fine WHERE id=?`, [player.clearFine.id]);
        player.fines = Math.clamp(player.fines - 1, 0, Number.MAX_VALUE);
        player.utils.success(`Вы оплатили штраф №${player.clearFine.id}`);
        delete player.clearFine;
    },
	"police.searchPlayerFine": (player, event, params) => {
		  debug(`params: ${params}`)
		  if(event === 'name') {
			mp.players.forEach(res => {
			  if(res.name === `${params}`) {
				player.call('ipad.load.searchPlayerFine', [res.id])
			  } else return player.utils.error('Гражданин не найден!')
			})
		  } else if(event === 'playerId') {
			  mp.players.forEach(res => {
				  if(res.id === parseInt(params)) {
					  player.call('ipad.load.searchPlayerFine', [res.id])
				  } else return player.utils.error('Гражданин не найден!')
			  })
		  }
		},
    "police.searchPlayer": (player, event, param) => {
        //debug(`police.searchPlayer: ${player.name} ${event} ${param}`);
        //if (mp.factions.isPoliceFaction(player.faction)) {
			if(player.faction === 1 || player.faction === 2 || player.faction === 3 || player.faction === 4) {
            if (event == 'name') {
                DB.Characters.getSqlIdByName(param.toString(), (sqlId) => {
                    if (sqlId) {
                        var rec = mp.players.getBySqlId(sqlId);
                        if (rec.faction !== 0) {
                            var faction = mp.factions.getBySqlId(rec.faction);
                        } else {
                            var faction = "Безработный";
                        }
                        if (rec) {
                            DB.Handle.query("SELECT id,x,y,z FROM talrasha_house WHERE owner=?", [rec.sqlId], (e, result) => {
                                var houses = [];
                                for (var i = 0; i < result.length; i++) {
                                    var h = result[i];
                                    var pos = new mp.Vector3(h.x, h.y, h.z);
                                    houses.push({
                                        sqlId: h.id,
                                        adress: '',
                                        pos: pos
                                    });
                                }
                                var data = JSON.stringify({
                                    playerId: rec.id,
                                    name: rec.name,
                                    crimes: rec.crimes,
                                    bank: rec.bank,
                                    rank: rec.rank,
                                    faction: faction.name,
                                    factionId: rec.faction,
                                    houses: houses
                                })
								
                                //if(rec.faction == 2) {
                                    if(player.faction === 3 || player.faction  === 2 || player.faction  === 1 || player.faction === 4) {
                                        player.call(`ipad.police.addSearchPlayer`, [data])
                                    //player.call(`tablet.police.addSearchPlayer`, [data]);
                                } //else {
                                    //player.call(`tablet.sheriff.addSearchPlayer`, [data]);
                                //}
                            });

                        } else {
                            return player.utils.error(`Гражданин не найден!`);
                        }
                    } else {
                        return player.utils.error(`Гражданин не найден!`);
                    }
                });
            } else {
                var rec = mp.players.at(param);
                if (rec) {
                    if (rec.faction !== 0) {
                        var faction = mp.factions.getBySqlId(rec.faction);
                    } else {
                        var faction = "Безработный";
                    }
                    DB.Handle.query("SELECT id,x,y,z FROM talrasha_house WHERE owner=?", [rec.sqlId], (e, result) => {
                        var houses = [];
                        for (var i = 0; i < result.length; i++) {
                            var h = result[i];
                            var pos = new mp.Vector3(h.x, h.y, h.z);
                            houses.push({
                                sqlId: h.id,
                                adress: '',
                                pos: pos
                            });
                        }
                        var data = JSON.stringify({
                            playerId: rec.id,
                            name: rec.name,
                            crimes: rec.crimes,
                            bank: rec.bank,
                            faction: faction.name,
                            factionId: rec.faction,
                            rank: rec.rank,
                            // rankName: mp.factionRanks[rec.faction][rec.rank + 1].name,
                            houses: houses
                        })

                        if(player.faction === 3 || player.faction  === 2 || player.faction  === 1 || player.faction === 4) {
                            player.call(`ipad.police.addSearchPlayer`, [data])
                            //player.call(`tablet.police.addSearchPlayer`, [data]);
                        } //else {
                            //player.call(`tablet.sheriff.addSearchPlayer`, [data]);
                        //}
                    });
                } else {
                    return player.utils.error(`Гражданин не найден!`);
                }
            }
        }
    },

    "police.giveFine": (player, data) => {
        //debug(`giveWanted: ${data}`);
        data = JSON.parse(data);
        var recId = data.playerId,
            sum = data.summ,
            reason = data.reason;
        sum = Math.clamp(sum, 1, mp.economy["max_fine_sum"].value);
        var rec = mp.players.at(recId);
        if (!rec) return player.utils.error(`Гражданин не найден!`);
        //var dist = player.dist(rec.position);
        //if (dist > Config.maxInteractionDist) return player.utils.error(`Гражданин далеко!`);
        if (!player.faction === 1 || !player.faction === 2 || !player.faction === 3 || !player.faction === 4) return player.utils.error(`Вы не сотрудник порядка!`);
        if (rec.id === player.id) return player.utils.error(`Вы не можете выдать сами себе штраф!`);

        rec.fines++;
        DB.Handle.query("INSERT INTO talrasha_fine (cop,recipient,reason,price,date) VALUES (?,?,?,?,?)",
            [player.sqlId, rec.sqlId, reason, sum, new Date().getTime() / 1000], (e) => {
                if (e) terminal.error(e);
            });

        player.utils.success(`${rec.name} получил штраф на ${sum}$`);
        rec.utils.warning(`${player.name} выписал Вам штраф на ${sum}$`);
		player.call('ipad.closed.addFine')
        mp.logs.addLog(`${player.name} выписал штраф игроку ${rec.name}. Причина: ${reason}, сумма: ${sum}`, 'faction', player.account.id, player.sqlId, {
            faction: player.faction,
            reason: reason,
            sum: sum
        });
        mp.logs.addLog(`${rec.name} был выписан штраф игроком ${player.name}. Причина: ${reason}, сумма: ${sum}`, 'faction', rec.account.id, rec.sqlId, {
            faction: rec.faction,
            reason: reason,
            sum: sum
        });
    },

    "police.giveWanted": (player, data) => {
        //debug(`giveWanted: ${data}`);
        data = JSON.parse(data);
        console.log(JSON.stringify(data));
        var recId = data.playerId,
            wanted = data.stars;
        var rec = mp.players.at(recId);
        if (!rec) return player.utils.error(`Гражданин не найден!`);
        //var dist = player.dist(rec.position);
        //if (dist > Config.maxInteractionDist) return player.utils.error(`Гражданин далеко!`);
        if (!mp.factions.isPoliceFaction(player.faction)) return player.utils.error(`Вы не сотрудник порядка!`);
        if (wanted > Config.maxWantedLevel) return player.utils.error(`Выберите от 1 до ${Config.maxWantedLevel} уровня розыска!`);
        if (rec.wanted >= Config.maxWantedLevel) return player.utils.error(`${rec.name} имеет максимальный уровень розыска!`);
        if (rec.id === player.id) return player.utils.error(`Вы не можете выдать сами себе розыск!`);

        rec.utils.setWanted(rec.wanted + wanted);
        player.utils.success(`${rec.name} объявлен в розыск`);
        rec.utils.warning(`${player.name} объявил Вас в розыск`);
        mp.logs.addLog(`${player.name} объявил игрока ${rec.name} в розыск. Звезд: ${wanted}`, 'faction', player.account.id, player.sqlId, {
            faction: player.faction,
            wanted: wanted
        });
        mp.logs.addLog(`${rec.name} был объявлен игроком ${player.name} в розыск. Звезд: ${wanted}`, 'faction', rec.account.id, rec.sqlId, {
            faction: rec.faction,
            wanted: wanted
        });
        //todo broadcast for radio
    },

    "police.callFibHelp": (player) => {
        //debug(`police.callFibHelp: ${player.name}`)
    },

    "police.callTeamHelp": (player) => {
        //debug(`police.callTeamHelp: ${player.name}`)
    },

    "police.callHospitalHelp": (player) => {
        //debug(`police.callHospitalHelp: ${player.name}`)
    },

    "police.addCall": (player, text) => {
        // TODO: Проверка на наличие мобилы.
        mp.players.forEach((rec) => {
			if (rec.faction === 2 || rec.faction === 3) {
                rec.call(`ipad.police.addCall`, [JSON.stringify({
                    id: player.id,
                    name: player.name,
                    pos: player.position,
                    message: text
                })]);
                rec.utils.info(`Поступил новый вызов!`)
            }
        });
        player.policeCallTime = new Date().getTime();
        player.utils.success(`Вызов отправлен!`);
    },

    "police.acceptCall": (player, data) => {
        let res = JSON.parse(data)
        // debug(`pos: ${JSON.stringify(res.pos)}`)
        if (!player.faction === 2 || !player.faction === 3) return player.utils.error(`Вы не сотрудник порядка!`);
        var rec = mp.players.at(parseInt(res.target));
        if (!rec) return player.utils.error(`Гражданин не найден!`);
        if (!rec.policeCallTime) return player.utils.error(`Вызов принят/отклонен другим полицейским!`);

        mp.players.forEach((rec) => {
            if (rec.faction === 2 || rec.faction === 3) {
                rec.call('ipad.police.removeCall', [res.i])
                player.call("setNewWaypoint", [parseInt(res.pos.x), parseInt(res.pos.y)])
            }
        });

        delete rec.policeCallTime;
        player.utils.success(`Вызов принят!`);
        rec.utils.success(`${player.name} принял Ваш вызов!`);
    },

}
