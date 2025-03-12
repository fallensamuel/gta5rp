const {checkLoadSettings} = require("../talrasha_module/talrasha_ipad/talrasha_ipad");
module.exports = {
    "armyStorage.takeClothes": (player, index) => {
		let sett = checkLoadSettings(player, player.faction, player.rank)
        if (!player.colshape || !player.colshape.armyStorage) return player.utils.error(`Вы не у склада Army!`);
        var armyStorageMarker = player.colshape.armyStorage;
        if (!mp.factions.isArmyFaction(player.faction)) return player.utils.error(`Вы не являетесь военным!`);
		if(sett === null || sett.storage === 0) return player.utils.error(`У вас нет прав!`)

        var faction = mp.factions.getBySqlId(player.faction);
        if (!faction) return player.utils.error(`Организация с ID: ${player.faction} не найдена!`);
        var army = faction.name;

        if (faction.products < mp.economy["army_mainclothes_products"].value) return player.utils.error(`Недостаточно боеприпасов!`);
        var hats = player.inventory.getArrayByItemId(6);
        var tops = player.inventory.getArrayByItemId(7);
        var legs = player.inventory.getArrayByItemId(8);
        var feets = player.inventory.getArrayByItemId(9);
        var masks = player.inventory.getArrayByItemId(14);
        var glasses = player.inventory.getArrayByItemId(1);

        for (var key in hats)
            if (mp.factions.isArmyFaction(hats[key].params.faction)) return player.utils.error(`У Вас уже есть головной убор ${army}!`);
        for (var key in tops)
            if (mp.factions.isArmyFaction(tops[key].params.faction)) return player.utils.error(`У Вас уже есть рубашка ${army}!`);
        for (var key in legs)
            if (mp.factions.isArmyFaction(legs[key].params.faction)) return player.utils.error(`У Вас уже есть брюки ${army}!`);
        for (var key in feets)
            if (mp.factions.isArmyFaction(feets[key].params.faction)) return player.utils.error(`У Вас уже есть ботинки ${army}!`);
        for (var key in masks)
            if (mp.factions.isArmyFaction(masks[key].params.faction)) return player.utils.error(`У Вас уже есть шлем ${army}!`);
        for (var key in glasses)
            if (mp.factions.isArmyFaction(glasses[key].params.faction)) return player.utils.error(`У Вас уже есть очки ${army}!`);

        mp.fullDeleteItemsByParams(6, ["faction", "owner"], [player.faction, player.sqlId]);
        mp.fullDeleteItemsByParams(7, ["faction", "owner"], [player.faction, player.sqlId]);
        mp.fullDeleteItemsByParams(8, ["faction", "owner"], [player.faction, player.sqlId]);
        mp.fullDeleteItemsByParams(9, ["faction", "owner"], [player.faction, player.sqlId]);
        mp.fullDeleteItemsByParams(10, ["faction", "owner"], [player.faction, player.sqlId]);
        mp.fullDeleteItemsByParams(2, ["faction", "owner"], [player.faction, player.sqlId]);
        mp.fullDeleteItemsByParams(14, ["faction", "owner"], [player.faction, player.sqlId]);
        mp.fullDeleteItemsByParams(1, ["faction", "owner"], [player.faction, player.sqlId]);

        var hatParams, topParams, legsParams, feetsParams, masksParams, glassesParams;
        var f = player.faction - 6;
        if (player.sex == 1) {
            hatParams = {
                sex: 1,
                variation: [
                    [115, 115, 115, 115, 115, 115, 115],
                    [105, -1, 115]
                ][f][index],
                texture: [
                    [18, 9, 15, 12, 13, 19, 0],
                    [22, -1, 3]
                ][f][index]
            };
            topParams = {
                sex: 1,
                torso: [
                    [49, 49, 49, 49, 49, 49, 49],
                    [82, 82, 82]
                ][f][index],
                tTexture: [
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0],
                ][f][index],
                variation: [
                    [221, 221, 221, 221, 221, 221, 221, 221],
                    [221, 221, 221]
                ][f][index],
                texture: [
                    [0, 1, 3, 4, 5, 11, 20],
                    [22, 22, 22]
                ][f][index],
                undershirt: [
                    [-1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1]
                ][f][index],
                uTexture: [
                    [-1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1]
                ][f][index],
            };
            legsParams = {
                sex: 1,
                variation: [
                    [87, 87, 87, 87, 87, 87, 33],
                    [97, 97, 97]
                ][f][index],
                texture: [
                    [0, 1, 3, 4, 5, 11, 0],
                    [2, 2, 2]
                ][f][index]
            };
            feetsParams = {
                sex: 1,
                variation: [
                    [24, 24, 24, 24, 24, 24, 24],
                    [35, 35, 35]
                ][f][index],
                texture: [
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0]
                ][f][index]
            };
            masksParams = {
                sex: 1,
                variation: [
                    [52, 52, 52, 52, 52, 52, 52],
                    [52, -1, 52]
                ][f][index],
                texture: [
                    [0, 0, 0, 0, 0, 0, 0],
                    [2, -1, 2]
                ][f][index]
            };
            glassesParams = {
                sex: 1,
                variation: [
                    [-1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1]
                ][f][index],
                texture: [
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0]
                ][f][index]
            };
        } else {
            hatParams = {
                sex: 0,
                variation: [
                    [114, 114, 114, 114, 114, 114, 115],
                    [106, -1, 88]
                ][f][index],
                texture: [
                    [18, 9, 15, 12, 13, 19, 0],
                    [22, -1, 0]
                ][f][index]
            };
            topParams = {
                sex: 0,
                torso: [
                    [49, 49, 49, 49, 49, 49, 49],
                    [88, 88, 88]
                ][f][index],
                variation: [
                    [231, 231, 231, 231, 231, 231, 231],
                    [231, 231, 231]
                ][f][index],
                texture: [
                    [0, 1, 3, 4, 5, 11, 20],
                    [19, 19, 19]
                ][f][index],
                undershirt: [
                    [-1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1]
                ][f][index],
                uTexture: [
                    [-1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1]
                ][f][index],
            };
            legsParams = {
                sex: 0,
                variation: [
                    [90, 90, 90, 90, 90, 90, 32],
                    [100, 100, 100]
                ][f][index],
                texture: [
                    [0, 1, 3, 4, 5, 11, 0],
                    [2, 2, 2]
                ][f][index]
            };
            feetsParams = {
                sex: 0,
                variation: [
                    [24, 24, 24, 24, 24, 24, 24],
                    [36, 36, 36]
                ][f][index],
                texture: [
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0]
                ][f][index]
            };
            masksParams = {
                sex: 0,
                variation: [
                    [52, 52, 52, 52, 52, 52, 52],
                    [52, -1, 52]
                ][f][index],
                texture: [
                    [0, 0, 0, 0, 0, 0, 0],
                    [2, -1, 2]
                ][f][index]
            };
            glassesParams = {
                sex: 0,
                variation: [
                    [-1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1]
                ][f][index],
                texture: [
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [-1, -1, -1]
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
        masksParams.faction = player.faction;
        glassesParams.faction = player.faction;

        topParams.rows = 3;
        topParams.cols = 10;
        legsParams.rows = 2;
        legsParams.cols = 10;
        topParams.name = army;
        legsParams.name = army;

        hatParams.owner = player.sqlId;
        topParams.owner = player.sqlId;
        legsParams.owner = player.sqlId;
        feetsParams.owner = player.sqlId;
        masksParams.owner = player.sqlId;
        glassesParams.owner = player.sqlId;

        var response = (e) => {
            if (e) player.utils.error(e);
        };
        if (hatParams.variation != -1) player.inventory.add(6, hatParams, {});
        if (topParams.variation != -1) player.inventory.add(7, topParams, {});
        if (legsParams.variation != -1) player.inventory.add(8, legsParams, {});
        if (feetsParams.variation != -1) player.inventory.add(9, feetsParams, {});
        if (masksParams.variation != -1) player.inventory.add(14, masksParams, {});
        if (glassesParams.variation != -1) player.inventory.add(1, glassesParams, {});

        player.utils.success(`Вам выдана форма ${army}!`);

        faction.setProducts(faction.products - mp.economy["army_mainclothes_products"].value);
        mp.logs.storage(player.name, player.sqlId, player.faction, mp.factionRanks[player.faction][player.rank].name, 'Взял', 1, 'Форма Army')
        mp.logs.addLog(`${player.name} взял со склада Форма Army`, 'faction', player.account.id, player.sqlId, {
            faction: player.faction,
            count: 1
        });
    },

    "armyStorage.takeArmour": (player) => {
		let sett = checkLoadSettings(player, player.faction, player.rank)
        if (!player.colshape || !player.colshape.armyStorage) return player.utils.error(`Вы не у склада Army!`);
        var armyStorageMarker = player.colshape.armyStorage;
        if (!mp.factions.isArmyFaction(player.faction)) return player.utils.error(`Вы не являетесь военным!`);
		if(sett === null || sett.storage === 0) return player.utils.error(`У вас нет прав!`)

        var faction = mp.factions.getBySqlId(player.faction);
        if (!faction) return player.utils.error(`Организация с ID: ${player.faction} не найдена!`);
        var army = faction.name;

        if (faction.products < mp.economy["army_armour_products"].value) return player.utils.error(`Недостаточно боеприпасов!`);
        var items = player.inventory.getArrayByItemId(3);

        for (var sqlId in items)
            if (mp.factions.isArmyFaction(items[sqlId].params.faction)) return player.utils.error(`У Вас уже есть бронежилет ${army}!`);

        mp.fullDeleteItemsByParams(3, ["faction", "owner"], [player.faction, player.sqlId]);

        var params;
        if (player.sex == 1) {
            params = {
                variation: 15,
                texture: 1
            };
        } else {
            params = {
                variation: 17,
                texture: 1
            };
        }

        params.faction = player.faction;
        params.owner = player.sqlId;
        params.armour = 100;
        params.sex = player.sex;

        player.inventory.add(3, params, {}, (e) => {
            if (e) return player.utils.error(e);
            player.utils.success(`Вам выдан бронежилет ${army}!`);
            faction.setProducts(faction.products - mp.economy["army_armour_products"].value);
			mp.logs.storage(player.name, player.sqlId, player.faction, mp.factionRanks[player.faction][player.rank].name, 'Взял', 1, 'Бронежилет Army')
            mp.logs.addLog(`${player.name} взял со склада Бронежилет Army`, 'faction', player.account.id, player.sqlId, {
                faction: player.faction,
                count: 1
            });
        });

    },

    "armyStorage.takeGun": (player, index) => {
		let sett = checkLoadSettings(player, player.faction, player.rank)
        if (!player.colshape || !player.colshape.armyStorage) return player.utils.error(`Вы не у склада Army!`);
        var armyStorageMarker = player.colshape.armyStorage;
        if (!mp.factions.isArmyFaction(player.faction)) return player.utils.error(`Вы не являетесь военным!`);
		if(sett === null || sett.storage === 0) return player.utils.error(`У вас нет прав!`)

        var faction = mp.factions.getBySqlId(player.faction);
        if (!faction) return player.utils.error(`Организация с ID: ${player.faction} не найдена!`);

        if (faction.products < mp.economy["army_armour_products"].value) return player.utils.error(`Недостаточно боеприпасов!`);

        var itemIds = [20, 21, 22, 23];
        var weaponIds = ["weapon_combatpistol", "weapon_pumpshotgun", "weapon_carbinerifle", "weapon_sniperrifle"];
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
            faction.setProducts(faction.products - mp.economy["army_armour_products"].value);
            mp.events.call('army.getInfoWareHouse');
			mp.logs.storage(player.name, player.sqlId, player.faction, mp.factionRanks[player.faction][player.rank].name, 'Взял', 1, mp.inventory.getItem(itemId).name)
            mp.logs.addLog(`${player.name} взял со склада оружие ${mp.inventory.getItem(itemId).name}`, 'faction', player.account.id, player.sqlId, {
                faction: player.faction,
                item: mp.inventory.getItem(itemId).name,
                count: 1
            });
        });
    },

    "armyStorage.takeAmmo": (player, index, ammo) => {
		let sett = checkLoadSettings(player, player.faction, player.rank)
        //debug(`policeStorage.takeAmmo: ${index} ${ammo}`);
        if (!player.colshape || !player.colshape.armyStorage) return player.utils.error(`Вы не у склада Army!`);
        var armyStorageMarker = player.colshape.armyStorage;
        if (!mp.factions.isArmyFaction(player.faction)) return player.utils.error(`Вы не являетесь военным!`);
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
            mp.events.call('army.getInfoWareHouse');
			mp.logs.storage(player.name, player.sqlId, player.faction, mp.factionRanks[player.faction][player.rank].name, 'Взял', ammo, mp.inventory.getItem(itemIds[index]).name)
            mp.logs.addLog(`${player.name} взял со склада ${mp.inventory.getItem(itemIds[index]).name}. Количество: ${ammo}`, 'faction', player.account.id, player.sqlId, {
                faction: player.faction,
                item: mp.inventory.getItem(itemIds[index]).name,
                count: ammo
            });
        });
    },

    "armyStorage.takeItem": (player, index) => {
		let sett = checkLoadSettings(player, player.faction, player.rank)
        if (!player.colshape || !player.colshape.armyStorage) return player.utils.error(`Вы не у склада Army!`);
        var armyStorageMarker = player.colshape.armyStorage;
        if (!mp.factions.isArmyFaction(player.faction)) return player.utils.error(`Вы не являетесь военным!`);
		if(sett === null || sett.storage === 0) return player.utils.error(`У вас нет прав!`)
        var faction = mp.factions.getBySqlId(player.faction);
        if (!faction) return player.utils.error(`Организация с ID: ${player.faction} не найдена!`);

        if (faction.products < mp.economy["army_armour_products"].value) return player.utils.error(`Недостаточно боеприпасов!`);

        var itemIds = [60, 27];
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
            faction.setProducts(faction.products - mp.economy["army_armour_products"].value);
            mp.events.call('army.getInfoWareHouse');
			mp.logs.storage(player.name, player.sqlId, player.faction, mp.factionRanks[player.faction][player.rank].name, 'Взял', 1, mp.inventory.getItem(itemId).name)
            mp.logs.addLog(`${player.name} взял со склада ${mp.inventory.getItem(itemId).name}`, 'faction', player.account.id, player.sqlId, {
                faction: player.faction,
                item: mp.inventory.getItem(itemId).name,
                count: 1
            });
        });
    },

    "army.transferProducts": (player, recId) => {
        var rec = mp.players.at(recId);
        if (!rec) return player.utils.error(`Гражданин не найден!`);
        var dist = player.dist(rec.position);
        if (dist > Config.maxInteractionDist) return player.utils.error(`Гражданин далеко!`);
        if (rec.faction != player.faction) return player.utils.error(`Гражданин не в Вашей организации!`);
        var model = player.getVariable("attachedObject");
        var haveProducts = (model == "prop_box_ammo04a" || model == "ex_office_swag_pills4");
        if (!haveProducts) return player.utils.error(`Вы не имеете товар!`);

        var recModel = rec.getVariable("attachedObject");
        var haveProducts = (recModel == "prop_box_ammo04a" || recModel == "ex_office_swag_pills4");
        if (haveProducts) return player.utils.error(`${rec.name} уже имеет товар!`);

        player.utils.putObject();
        rec.utils.takeObject(model);
    },

    "army.getInfoWareHouse": (player) => {
        if (!mp.factions.isArmyFaction(player.faction)) return player.utils.error(`Вы не являетесь военным!`);
        var army = mp.factions.getBySqlId(6);
        var navy = mp.factions.getBySqlId(7);
        player.call(`tablet.army.setInfoWareHouse`, [{
            warehouse_1: army.products + '/' + army.maxProducts,
            warehouse_2: navy.products + '/' + navy.maxProducts
        }]);
    },

    "army.advert": (player, text) => {
        if (!mp.factions.isArmyFaction(player.faction)) return player.utils.error(`Вы не являетесь военным!`);
        // TODO: Уведомление всем игрокам, у которых есть телефон.
        text = text.substr(0, 100);
        mp.players.forEach((rec) => {
            if (rec.sqlId) {
                rec.call("BN_ShowWithPicture", ["ARMY", player.name, text, "CHAR_ARTHUR", 2]);
            }
        });
    }
}
