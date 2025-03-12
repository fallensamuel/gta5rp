const {checkLoadSettings} = require("../talrasha_module/talrasha_ipad/talrasha_ipad");
module.exports = {
    "bandDealer.buyGun": (player, itemId) => {
        // debug(`bandDealer.buyGun: ${player.name} ${itemId}`)
        // TODO: Проверка, стоит ли игрок в колшейпе. Васина контрабанда.

        var gunsInfo = {
            41: {
                price: 200,
                params: {
                    weaponHash: mp.joaat("weapon_bat"),
                },
            },
            42: {
                price: 75,
                params: {
                    weaponHash: mp.joaat("weapon_knuckle"),
                },
            },
            43: {
                price: 300,
                params: {
                    weaponHash: mp.joaat("weapon_knife"),
                },
            },
            44: {
                price: 800,
                params: {
                    weaponHash: mp.joaat("weapon_pistol"),
                },
            },
            45: {
                price: 1200,
                params: {
                    weaponHash: mp.joaat("weapon_appistol"),
                },
            },
            46: {
                price: 1400,
                params: {
                    weaponHash: mp.joaat("weapon_revolver"),
                },
            },
            47: {
                price: 1800,
                params: {
                    weaponHash: mp.joaat("weapon_microsmg"),
                },
            },
            48: {
                price: 1950,
                params: {
                    weaponHash: mp.joaat("weapon_smg"),
                },
            },
            21: {
                price: 2400,
                params: {
                    weaponHash: mp.joaat("weapon_pumpshotgun"),
                },
            },
            49: {
                price: 2700,
                params: {
                    weaponHash: mp.joaat("weapon_sawnoffshotgun"),
                },
            },
            50: {
                price: 2800,
                params: {
                    weaponHash: mp.joaat("weapon_assaultrifle"),
                },
            },
            51: {
                price: 3000,
                params: {
                    weaponHash: mp.joaat("weapon_bullpuprifle"),
                },
            },
            52: {
                price: 3000,
                params: {
                    weaponHash: mp.joaat("weapon_compactrifle"),
                },
            }
        };
        if (!gunsInfo[itemId]) return player.utils.error(`Оружие не найдено!`);
        var info = gunsInfo[itemId];
        if (player.money < info.price) return player.utils.error(`Необходимо ${info.price}$`);
        info.params.ammo = 0;

        player.inventory.add(itemId, info.params, {}, (e) => {
            if (e) return player.utils.error(e);

            // TODO: Начислять % суммы в общак банды, которой принадлежит терра.

            player.utils.setMoney(player.money - info.price);
            player.utils.success(`Вы купили ${mp.inventory.getItem(itemId).name}`);
        });
    },
    "bandDealer.buyAmmo": (player, index, ammo) => {
        // debug(`bandDealer.buyAmmo: ${player.name} ${index} ${ammo}`)
        // TODO: Проверка, стоит ли игрок в колшейпе. Васина контрабанда.

        var itemIds = [37, 38, 40, 39];
        var prices = [6, 7, 7, 6];
        var index = Math.clamp(index, 0, itemIds.length - 1);
        var price = ammo * prices[index];
        if (player.money < price) return player.utils.error(`Необходимо ${price}$`);

        var params = {
            ammo: ammo,
        };
        player.inventory.add(itemIds[index], params, {}, (e) => {
            if (e) return player.utils.error(e);

            // TODO: Начислять % суммы в общак банды, которой принадлежит терра.

            player.utils.setMoney(player.money - price);
            player.utils.success(`Вы купили ${mp.inventory.getItem(itemIds[index]).name}!`);
        });
    },
    "bandDealer.buyDrgus": (player, index, count) => {
        // debug(`bandDealer.buyDrgus: ${player.name} ${index} ${count}`)
        // TODO: Проверка, стоит ли игрок в колшейпе. Васина контрабанда.

        var itemIds = [55, 56, 57, 58];
        var index = Math.clamp(index, 0, itemIds.length - 1);
        var prices = [6, 10, 8, 9];
        var price = count * prices[index];
        if (player.money < price) return player.utils.error(`Необходимо ${price}$`);

        var params = {
            count: count,
        };
        player.inventory.add(itemIds[index], params, {}, (e) => {
            if (e) return player.utils.error(e);

            // TODO: Начислять % суммы в общак банды, которой принадлежит терра.

            player.utils.setMoney(player.money - price);
            player.utils.success(`Вы купили ${mp.inventory.getItem(itemIds[index]).name}!`);
        });
    },
	"bandStorage.takeGun": (player, index) => {
        if (!player.colshape || !player.colshape.bandStorage) return player.utils.error(`Вы не у склада банды!`);
        var policeStorageMarker = player.colshape.bandStorage;
        //if (!mp.factions.isBandFaction(player.faction)) return player.utils.error(`Вы не являетесь бандитом!`);

        var faction = mp.factions.getBySqlId(player.faction);
        if (!faction) return player.utils.error(`Организация с ID: ${player.faction} не найдена!`);

        if (faction.products < mp.economy["band_products"].value) return player.utils.error(`Недостаточно боеприпасов!`);
		var pd = faction.name;
		
		
		if (index == 0) {
			var items = player.inventory.getArrayByItemId(3);
			for (var sqlId in items)
            if (mp.factions.isBandFaction(items[sqlId].params.faction)) return player.utils.error(`У Вас уже есть бронежилет ${pd}!`);

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
			params.armour = 50;
			params.sex = player.sex;


			player.inventory.add(3, params, {}, (e) => {
				if (e) return player.utils.error(e);
				player.utils.success(`Вам выдан бронежилет ${pd}!`);
				faction.setProducts(faction.products - mp.economy["band_products"].value);
				mp.logs.addLog(`${player.name} взял со склада Форма Бронежилет ${pd}`, 'faction', player.account.id, player.sqlId, {
					faction: player.faction,
					count: 1
				});
			});
			
		}
		else if (index == 1 || index == 2) {
			
			var itemIds = [0, 52, 46];
			var weaponIds = ["", "weapon_compactrifle", "weapon_revolver"];
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
				faction.setProducts(faction.products - mp.economy["band_products"].value);
				mp.logs.addLog(`${player.name} взял со склада оружие ${mp.inventory.getItem(itemId).name}`, 'faction', player.account.id, player.sqlId, {
					faction: player.faction,
					item: mp.inventory.getItem(itemId).name,
					count: 1
				});

			});
			
		}
		else if (index == 3) {
			var itemIds = [0, 0, 0, 39];
			index = Math.clamp(index, 0, itemIds.length - 1);
			var products = [0, 0, 0, 2];
			var ammo = 100
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
				mp.logs.addLog(`${player.name} взял со склада ${mp.inventory.getItem(itemIds[index]).name}. Количество: ${ammo}`, 'faction', player.account.id, player.sqlId, {
					faction: player.faction,
					item: mp.inventory.getItem(itemIds[index]).name,
					count: ammo
				});
			});
			
			
		}
		else if (index == 4) {
			let sett = checkLoadSettings(player, player.faction, player.rank)
			if (!player.colshape || !player.colshape.bandStorage) return player.utils.error(`Вы не у склада семьи!`);
			var hospitalStorageMarker = player.colshape.bandStorage;
			if (!mp.factions.isBandFaction(player.faction)) return player.utils.error(`Вы не состоите в семье!`);
			if(sett === null || sett.storage === 0) return player.utils.error(`У вас нет прав!`)

			var faction = mp.factions.getBySqlId(player.faction);
			if (!faction) return player.utils.error(`Организация с ID: ${player.faction} не найдена!`);

			if (faction.products < mp.economy["band_products"].value) return player.utils.error(`Недостаточно боеприпасов!`);

			var itemIds = [27];
			index = Math.clamp(index, 0, itemIds.length - 1);
			var itemId = itemIds[index];
			if (itemId == 27) {
				var docs = player.inventory.getArrayByItemId(27);
				if (Object.keys(docs).length > 0) return player.utils.error(`У Вас уже есть ${mp.inventory.getItem(itemId).name}!`);
			}

			mp.fullDeleteItemsByParams(itemId, ["faction", "owner"], [player.faction, player.sqlId]);
			var params = {
				faction: player.faction,
				owner: player.sqlId
			};
			player.inventory.add(itemId, params, {}, (e) => {
				if (e) return player.utils.error(e);
				player.utils.success(`Вам выдано ${mp.inventory.getItem(itemId).name}!`);
				faction.setProducts(faction.products - mp.economy["band_products"].value);
				mp.logs.storage(player.name, player.sqlId, player.faction, mp.factionRanks[player.faction][player.rank].name, 'Взял', 1, mp.inventory.getItem(itemId).name)
				mp.logs.addLog(`${player.name} взял со склада ${mp.inventory.getItem(itemId).name}`, 'faction', player.account.id, player.sqlId, {
					faction: player.faction,
					item: mp.inventory.getItem(itemId).name,
					count: 1
				});
			});
		}
			
    },
	"mafiaStorage.takeGun": (player, index) => {
        if (!player.colshape || !player.colshape.mafiaStorage) return player.utils.error(`Вы не у склада банды!`);
        var policeStorageMarker = player.colshape.mafiaStorage;
        //if (!mp.factions.isBandFaction(player.faction)) return player.utils.error(`Вы не являетесь бандитом!`);

        var faction = mp.factions.getBySqlId(player.faction);
        if (!faction) return player.utils.error(`Организация с ID: ${player.faction} не найдена!`);

        if (faction.products < mp.economy["mafia_products"].value) return player.utils.error(`Недостаточно боеприпасов!`);
		var pd = faction.name;
		
		
		if (index == 4) {
			var items = player.inventory.getArrayByItemId(3);
			for (var sqlId in items)
            if (mp.factions.isBandFaction(items[sqlId].params.faction)) return player.utils.error(`У Вас уже есть бронежилет ${pd}!`);

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
			params.armour = 50;
			params.sex = player.sex;


			player.inventory.add(3, params, {}, (e) => {
				if (e) return player.utils.error(e);
				player.utils.success(`Вам выдан бронежилет ${pd}!`);
				faction.setProducts(faction.products - mp.economy["mafia_products"].value);
				mp.logs.addLog(`${player.name} взял со склада Форма Бронежилет ${pd}`, 'faction', player.account.id, player.sqlId, {
					faction: player.faction,
					count: 1
				});
			});
			
		}
		else {
			
			var itemIds = [43, 64, 65, 50, 27];
			var weaponIds = ["weapon_knife", "weapon_heavyshotgun", "weapon_gusenberg", "weapon_assaultrifle"];
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
				faction.setProducts(faction.products - mp.economy["mafia_products"].value);
				mp.logs.addLog(`${player.name} взял со склада оружие ${mp.inventory.getItem(itemId).name}`, 'faction', player.account.id, player.sqlId, {
					faction: player.faction,
					item: mp.inventory.getItem(itemId).name,
					count: 1
				});

			});
			
		}
			
    },
}
