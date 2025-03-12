const {checkLoadSettings} = require("../talrasha_module/talrasha_ipad/talrasha_ipad");
module.exports = {
    "goverStorage.takeClothes": (player, index) => {
		let sett = checkLoadSettings(player, player.faction, player.rank)
        if (!player.colshape || !player.colshape.goverStorage) return player.utils.error(`Вы не у склада правительства!`);
        var fibStorageMarker = player.colshape.goverStorage;
        if (!mp.factions.isGoverFaction(player.faction)) return player.utils.error(`Вы не являетесь работником правительства!`);
		if(sett === null || sett.storage === 0) return player.utils.error(`У вас нет прав!`)

        var faction = mp.factions.getBySqlId(player.faction);
        if (!faction) return player.utils.error(`Организация с ID: ${player.faction} не найдена!`);
        var fib = faction.name;

        if (faction.products < mp.economy["police_mainclothes_products"].value) return player.utils.error(`Недостаточно боеприпасов!`);
        var hats = player.inventory.getArrayByItemId(6);
        var tops = player.inventory.getArrayByItemId(7);
        var legs = player.inventory.getArrayByItemId(8);
        var feets = player.inventory.getArrayByItemId(9);
        var ears = player.inventory.getArrayByItemId(10);
        var ties = player.inventory.getArrayByItemId(2);
        var masks = player.inventory.getArrayByItemId(14);
        var glasses = player.inventory.getArrayByItemId(1);

        for (var key in hats)
            if (mp.factions.isGoverFaction(hats[key].params.faction)) return player.utils.error(`У Вас уже есть головной убор ${fib}!`);
        for (var key in tops)
            if (mp.factions.isGoverFaction(tops[key].params.faction)) return player.utils.error(`У Вас уже есть рубашка ${fib}!`);
        for (var key in legs)
            if (mp.factions.isGoverFaction(legs[key].params.faction)) return player.utils.error(`У Вас уже есть брюки ${fib}!`);
        for (var key in feets)
            if (mp.factions.isGoverFaction(feets[key].params.faction)) return player.utils.error(`У Вас уже есть ботинки ${fib}!`);
        for (var key in ears)
            if (mp.factions.isGoverFaction(ears[key].params.faction)) return player.utils.error(`У Вас уже есть наушники ${fib}!`);
        for (var key in ties)
            if (mp.factions.isGoverFaction(ties[key].params.faction)) return player.utils.error(`У Вас уже есть аксессуар ${fib}!`);
        for (var key in masks)
            if (mp.factions.isGoverFaction(masks[key].params.faction)) return player.utils.error(`У Вас уже есть шлем ${fib}!`);
        for (var key in glasses)
            if (mp.factions.isGoverFaction(glasses[key].params.faction)) return player.utils.error(`У Вас уже есть очки ${fib}!`);

        mp.fullDeleteItemsByParams(6, ["faction", "owner"], [player.faction, player.sqlId]);
        mp.fullDeleteItemsByParams(7, ["faction", "owner"], [player.faction, player.sqlId]);
        mp.fullDeleteItemsByParams(8, ["faction", "owner"], [player.faction, player.sqlId]);
        mp.fullDeleteItemsByParams(9, ["faction", "owner"], [player.faction, player.sqlId]);
        mp.fullDeleteItemsByParams(10, ["faction", "owner"], [player.faction, player.sqlId]);
        mp.fullDeleteItemsByParams(2, ["faction", "owner"], [player.faction, player.sqlId]);
        mp.fullDeleteItemsByParams(14, ["faction", "owner"], [player.faction, player.sqlId]);
        mp.fullDeleteItemsByParams(1, ["faction", "owner"], [player.faction, player.sqlId]);

        var hatParams, topParams, legsParams, feetsParams, earsParams, tiesParams, masksParams, glassesParams;
        if (player.sex == 1) {
            hatParams = {
                sex: 1,
                variation: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1][index],
                texture: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0][index]
            };
            topParams = {
                sex: 1,
                torso: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4][index],
                variation: [349, 4, 28, 72, 348, 31, 348, 4, 348, 31][index],
                texture: [0, 0, 0, 1, 3, 5, 11, 3, 6, 3][index],
                undershirt: [-1, 10, 27, 27,-1, 32, -1, 10, -1, 31][index],
                uTexture: [-1, 0, 0, 0, -1, 2, -1, 2, -1, 8][index]
            };
            legsParams = {
                sex: 1,
                variation: [10, 10, 10, 10, 29, 29, 35, 24, 24, 24][index],
                texture: [0, 0, 0, 0, 8, 8, 0, 1, 3, 3][index]
            };
            feetsParams = {
                sex: 1,
                variation: [21, 21, 21, 21, 21, 21, 21, 3, 3, 3][index],
                texture: [0, 0, 0, 0, 1, 1, 0, 0, 1, 1][index]
            };
            earsParams = {
                sex: 1,
                variation: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1][index],
                texture: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0][index]
            };
            tiesParams = {
                sex: 1,
                variation: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1][index],
                texture: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0][index]
            };
            masksParams = {
                sex: 1,
                variation: [-1, -1, 191, 191, -1, -1, -1, -1, -1, -1][index],
                texture: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0][index]
            };
            glassesParams = {
                sex: 1,
                variation: [-1, -1, 8, 8, -1, -1, -1, -1, -1, -1][index],
                texture: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0][index]
            };
        } else {
            hatParams = {
                sex: 0,
                variation: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1][index],
                texture: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0][index]
            };
            topParams = {
                sex: 0,
                torso: [3, 3, 3, 3, 0, 3, 0, 0, 0, 3][index],
                variation: [333, 7, 57, 194, 27, 57, 27, 6, 9, 57][index],
                texture: [0, 0, 0, 5, 1, 1, 0, 0, 3, 3][index],
                undershirt: [-1, 38, 101, 41, -1, 41, -1, 40, -1, 41][index],
                uTexture: [-1, 0, 0, 0, -1, 4, -1, 2, -1, 6][index]
            };
            legsParams = {
                sex: 0,
                variation: [6, 6, 6, 6, 51, 51, 7, 7, 36, 6][index],
                texture: [0, 0, 0, 0, 0, 0, 0, 0, 2, 0][index]
            };
            feetsParams = {
                sex: 0,
                variation: [13, 13, 13, 13, 0, 0, 0, 0, 0, 0][index],
                texture: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0][index]
            };
            earsParams = {
                sex: 0,
                variation: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1][index],
                texture: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0][index]
            };
            tiesParams = {
                sex: 0,
                variation: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1][index],
                texture: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0][index]
            };
            masksParams = {
                sex: 0,
                variation: [-1, -1, 121, 121, -1, -1, -1, -1, -1, -1][index],
                texture: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0][index]
            };
            glassesParams = {
                sex: 0,
                variation: [-1, -1, 20, 20, -1, -1, -1, -1, -1, -1][index],
                texture: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0][index]
            };
        }
        if (topParams.undershirt == -1) delete topParams.undershirt;
        if (topParams.uTexture == -1) delete topParams.uTexture;
        
        hatParams.faction = player.faction;
        topParams.faction = player.faction;
        legsParams.faction = player.faction;
        feetsParams.faction = player.faction;
        earsParams.faction = player.faction;
        tiesParams.faction = player.faction;
        masksParams.faction = player.faction;
        glassesParams.faction = player.faction;

        topParams.rows = 3;
        topParams.cols = 10;
        legsParams.rows = 2;
        legsParams.cols = 10;
        topParams.name = fib;
        legsParams.name = fib;

        hatParams.owner = player.sqlId;
        topParams.owner = player.sqlId;
        legsParams.owner = player.sqlId;
        feetsParams.owner = player.sqlId;
        earsParams.owner = player.sqlId;
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
        if (earsParams.variation != -1) player.inventory.add(10, earsParams, {});
        if (tiesParams.variation != -1) player.inventory.add(2, tiesParams, {});
        if (masksParams.variation != -1) player.inventory.add(14, masksParams, {});
        if (glassesParams.variation != -1) player.inventory.add(1, glassesParams, {});

        player.utils.success(`Вам выдана форма ${fib}!`);


        faction.setProducts(faction.products - mp.economy["police_mainclothes_products"].value);
		mp.logs.storage(player.name, player.sqlId, player.faction, mp.factionRanks[player.faction][player.rank].name, 'Взял', 1, 'Форма правительства')
        mp.logs.addLog(`${player.name} взял со склада Форма правительства`, 'faction', player.account.id, player.sqlId, {
            faction: player.faction,
            count: 1
        });
    },

    "goverStorage.takeArmour": (player) => {
		let sett = checkLoadSettings(player, player.faction, player.rank)
        if (!player.colshape || !player.colshape.goverStorage) return player.utils.error(`Вы не у склада правительства!`);
        var fibStorageMarker = player.colshape.goverStorage;
        if (!mp.factions.isGoverFaction(player.faction)) return player.utils.error(`Вы не являетесь работником правительства!`);
		if(sett === null || sett.storage === 0) return player.utils.error(`У вас нет прав!`)
		
        var faction = mp.factions.getBySqlId(player.faction);
        if (!faction) return player.utils.error(`Организация с ID: ${player.faction} не найдена!`);
        var fib = faction.name;

        if (faction.products < mp.economy["police_armour_products"].value) return player.utils.error(`Недостаточно боеприпасов!`);
        var items = player.inventory.getArrayByItemId(3);

        for (var sqlId in items)
            if (mp.factions.isGoverFaction(items[sqlId].params.faction)) return player.utils.error(`У Вас уже есть бронежилет ${fib}!`);

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
            player.utils.success(`Вам выдан бронежилет ${fib}!`);
            faction.setProducts(faction.products - mp.economy["police_armour_products"].value);
			mp.logs.storage(player.name, player.sqlId, player.faction, mp.factionRanks[player.faction][player.rank].name, 'Взял', 1, 'Бронежилет правительства')
            mp.logs.addLog(`${player.name} взял со склада Бронежилет правительства`, 'faction', player.account.id, player.sqlId, {
                faction: player.faction,
                count: 1
            });
        });

    },

    "goverStorage.takeGun": (player, index) => {
		let sett = checkLoadSettings(player, player.faction, player.rank)
        if (!player.colshape || !player.colshape.goverStorage) return player.utils.error(`Вы не у склада правительства!`);
        var fibStorageMarker = player.colshape.goverStorage;
        if (!mp.factions.isGoverFaction(player.faction)) return player.utils.error(`Вы не являетесь работником правительства!`);
		if(sett === null || sett.storage === 0) return player.utils.error(`У вас нет прав!`)

        var faction = mp.factions.getBySqlId(player.faction);
        if (!faction) return player.utils.error(`Организация с ID: ${player.faction} не найдена!`);

        if (faction.products < mp.economy["police_armour_products"].value) return player.utils.error(`Недостаточно боеприпасов!`);


        var itemIds = [17, 18, 19, 20, 70];
        var weaponIds = ["weapon_nightstick", "weapon_flashlight", "weapon_stungun", "weapon_combatpistol", "weapon_bullpuprifle_mk2"];
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

    "goverStorage.takeAmmo": (player, index, ammo) => {
		let sett = checkLoadSettings(player, player.faction, player.rank)
        //debug(`goverStorage.takeAmmo: ${index} ${ammo}`);
        if (!player.colshape || !player.colshape.goverStorage) return player.utils.error(`Вы не у склада правительства!`);
        var fibStorageMarker = player.colshape.goverStorage;
        if (!mp.factions.isGoverFaction(player.faction)) return player.utils.error(`Вы не являетесь работником правительства!`);
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
			mp.logs.storage(player.name, player.sqlId, player.faction, mp.factionRanks[player.faction][player.rank].name, 'Взял', ammo, mp.inventory.getItem(itemIds[index]).name)
            mp.logs.addLog(`${player.name} взял со склада ${mp.inventory.getItem(itemIds[index]).name}. Количество: ${ammo}`, 'faction', player.account.id, player.sqlId, {
                faction: player.faction,
                item: mp.inventory.getItem(itemIds[index]).name,
                count: ammo
            });
        });
    },

    "goverStorage.takeItem": (player, index) => {
		let sett = checkLoadSettings(player, player.faction, player.rank)
        if (!player.colshape || !player.colshape.goverStorage) return player.utils.error(`Вы не у склада правительства!`);
        var fibStorageMarker = player.colshape.goverStorage;
        if (!mp.factions.isGoverFaction(player.faction)) return player.utils.error(`Вы не являетесь работником правительства!`);
		if(sett === null || sett.storage === 0) return player.utils.error(`У вас нет прав!`)
        var faction = mp.factions.getBySqlId(player.faction);
        if (!faction) return player.utils.error(`Организация с ID: ${player.faction} не найдена!`);

        if (faction.products < mp.economy["police_armour_products"].value) return player.utils.error(`Недостаточно боеприпасов!`);

        var itemIds = [67, 27, 28, 24, 43];
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
			mp.logs.storage(player.name, player.sqlId, player.faction, mp.factionRanks[player.faction][player.rank].name, 'Взял', 1, mp.inventory.getItem(itemId).name)
            mp.logs.addLog(`${player.name} взял со склада ${mp.inventory.getItem(itemId).name}`, 'faction', player.account.id, player.sqlId, {
                faction: player.faction,
                item: mp.inventory.getItem(itemId).name,
                count: 1
            });
        });
    }
}
