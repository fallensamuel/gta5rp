const {loadSettings} = require("../talrasha_module/talrasha_ipad/talrasha_ipad");

module.exports = {
    "ServerInit": () => {
        initMpUtils();
        initPoliceCells();
		loadSettings();
		
        require('../talrasha_module/talrasha_economy.js').Init(async () => {
            mp.updateWorldTime();
			mp.Phone = require('../talrasha_module/talrasha_phone.js');  
            require('../talrasha_module/talrasha_mail.js').Init();
            require('../talrasha_module/talrasha_house.js').Init();
            require('../talrasha_module/talrasha_interior.js').Init();
            require('../talrasha_module/talrasha_garage.js').Init();
            require('../talrasha_module/talrasha_timer.js').InitPayDay();
            require('../talrasha_module/talrasha_business.js').Init();
            require('../talrasha_module/talrasha_inventory.js').Init();
            require(`../talrasha_module/talrasha_achievement.js`).Init();
			require(`../talrasha_module/talrasha_announce.js`).Init();
            require('../talrasha_module/talrasha_faction.js').Init();
            require('../talrasha_module/talrasha_vehicle.js').Init();
            //require('../talrasha_module/talrasha_object.js').Init(); //wait sync fix
            // require('../talrasha_module/routep.js').Init();
            //require('../talrasha_module/talrasha_job/talrasha_pizza/talrasha_pizza.js');
            require('../talrasha_module/talrasha_job/talrasha_waterfront/talrasha_waterfront.js');
            require('../talrasha_module/talrasha_job/talrasha_builder/talrasha_builder.js');
            //require('../talrasha_module/talrasha_job/talrasha_autoroober/talrasha_autoroober.js');
            require('../talrasha_module/talrasha_job/talrasha_taxi/index.js');
            require('../talrasha_module/talrasha_job/talrasha_smuggling/talrasha_smuggling.js');
			require('../talrasha_module/talrasha_job/talrasha_bus/talrasha_bus.js').Init();
            require('../talrasha_module/talrasha_clothes.js').Init();
            require('../talrasha_module/talrasha_ls_custom/talrasha_ls_custom.js').Init();
            require('../talrasha_module/talrasha_veh_rent.js');
			require('../talrasha_module/talrasha_sell_veh.js').Init();
            require('../talrasha_module/talrasha_log.js').Init();
            require('../talrasha_module/talrasha_report.js').Init();
            require('../talrasha_module/talrasha_parking.js').Init();
            require('../talrasha_module/talrasha_donate.js').Init();
            require('../talrasha_module/talrasha_autosaloon.js').Init();
            require('../talrasha_module/talrasha_bank.js');
            require(`../talrasha_module/talrasha_job.js`).Init();
            require(`../talrasha_module/talrasha_driving_school.js`).Init();
            require(`../talrasha_module/talrasha_job/talrasha_trucker/talrasha_trucker.js`).Init();
            require('../talrasha_module/talrasha_barbershop/talrasha_barbershop.js');
			require('../talrasha_module/talrasha_tatooshop/talrasha_tatooshop.js');
			require('../talrasha_module/talrasha_casino.js').Init();
            require(`../talrasha_module/talrasha_marker.js`).Init();
            require(`../talrasha_module/talrasha_ped.js`).Init();
            require(`../talrasha_module/talrasha_farm.js`).Init();
            require('../talrasha_module/talrasha_door_control.js');
            require('../talrasha_module/talrasha_cutscenes.js').Init();
            require('../talrasha_module/talrasha_spawn.js').Init();
            require('../talrasha_module/talrasha_ipl.js').Init();
            require('../talrasha_module/talrasha_whitelist.js').Init();
			//require('../talrasha_module/talrasha_crouch.js');
			require('../talrasha_module/talrasha_ghetto/talrasha_ghetto.js').initZoneCapture()
            require('../talrasha_module/talrasha_ghetto/talrasha_database.js')
            require('../talrasha_module/talrasha_wzp/talrasha_wzp.js').initWzp()
            require('../talrasha_module/talrasha_wzp/talrasha_database.js')
			require('../talrasha_module/talrasha_bizwar/talrasha_bizwar.js').initBizWar()
            require('../talrasha_module/talrasha_bizwar/talrasha_database.js')
			require('../talrasha_module/talrasha_wheel.js')
			require('../talrasha_module/data.js')
			require('../talrasha_module/talrasha_ipad/talrasha_ipad.js');
			require('../talrasha_module/talrasha_gps.js');
            await require('../talrasha_module/talrasha_green_zone.js').Init();
        });

        require('../talrasha_module/talrasha_finger.js');
		
		console.log("\x1b[33m[INFO]\x1b[0m Starting server...");
		console.log("\x1b[32m[DONE]\x1b[0m Server have been started.");
    }
}

function initMpUtils() {
    mp.randomInteger = (min, max) => {
        var rand = min - 0.5 + Math.random() * (max - min + 1)
        rand = Math.round(rand);
        return rand;
    }

    mp.players.getBySqlId = (sqlId) => {
        if (!sqlId) return null;
        var result;
        mp.players.forEach((recipient) => {
            if (recipient.sqlId == sqlId) {
                result = recipient;
                return;
            }
        });
        return result;
    }

    mp.players.getByLogin = (login) => {
        if (!login) return null;
        var result;
        mp.players.forEach((recipient) => {
            if (recipient.account.login == login) {
                result = recipient;
                return;
            }
        });
        return result;
    }

    mp.players.getBySocialClub = (socialClub) => {
        if (!socialClub) return null;
        var result;
        mp.players.forEach((recipient) => {
            if (recipient.socialClub == socialClub) {
                result = recipient;
                return;
            }
        });
        return result;
    }

    mp.players.getByName = (name) => {
        if (!name) return null;
        var result;
        mp.players.forEach((recipient) => {
            if (recipient.name == name) {
                result = recipient;
                return;
            }
        });
        return result;
    }

    mp.vehicles.getBySqlId = (sqlId) => {
        if (!sqlId) return null;
        var result;
        mp.vehicles.forEach((veh) => {
            if (veh.sqlId == sqlId) {
                result = veh;
                return;
            }
        });
        return result;
    }

    /* Полное удаление предметов инвентаря с сервера. */
    mp.fullDeleteItemsByParams = (itemId, keys, values) => {
        //debug(`fullDeleteItemsByParams: ${itemId} ${keys} ${values}`);
        /* Для всех игроков. */
        mp.players.forEach((rec) => {
            if (rec.sqlId) rec.inventory.deleteByParams(itemId, keys, values);
        });
        /* Для всех объектов на полу. */
        mp.objects.forEach((obj) => {
            if (obj.getVariable("inventoryItemSqlId") > 0) {
                var item = obj.item;
                var doDelete = true;
                for (var i = 0; i < keys.length; i++) {
                    var param = item.params[keys[i]];
                    if (!param) {
                        doDelete = false;
                        break;
                    }
                    if (param && param != values[i]) {
                        doDelete = false;
                        break;
                    }
                }
                if (doDelete) {
                    DB.Handle.query(`DELETE FROM talrasha_player_inventory WHERE id=?`, obj.getVariable("inventoryItemSqlId"));
                    obj.destroy();
                }
            }
        });
        /* Для всех игроков из БД. */
        // TODO: ^^
    }

    mp.fullDeleteItemsByFaction = (playerSqlId, factionId) => {
        // debug(`fullDeleteItemsByFaction: ${playerSqlId} ${factionId}`);
        var items = {
			"1": [1, 2, 3, 6, 7, 8, 9, 10, 14, 20, 21, 22, 23, 27, 60], // Gover
            "2": [1, 2, 3, 6, 7, 8, 9, 10, 14, 17, 18, 19, 20, 21, 22, 23, 27, 29], // LSPD
            "3": [1, 2, 3, 6, 7, 8, 9, 10, 14, 17, 18, 19, 20, 21, 22, 23, 27, 29], // BCSO
            "4": [1, 2, 3, 6, 7, 8, 9, 10, 14, 17, 18, 19, 20, 21, 22, 23, 29, 61], // FIB
            "5": [1, 2, 3, 6, 7, 8, 9, 10, 14, 24, 25, 27, 63], // EMC
            "6": [1, 2, 3, 6, 7, 8, 9, 10, 14, 20, 21, 22, 23, 27, 60], // Fort Zancudo
            "7": [1, 2, 3, 6, 7, 8, 9, 10, 14, 20, 21, 22, 23, 27, 60], // Air Army
			"8": [1, 2, 3, 6, 7, 8, 9, 10, 14, 20, 21, 22, 23, 27, 60], // Air Army
			"9": [1, 2, 3, 6, 7, 8, 9, 10, 14, 20, 21, 22, 23, 27, 60], // Air Army
			"10": [1, 2, 3, 6, 7, 8, 9, 10, 14, 20, 21, 22, 23, 27, 60], // Air Army
			"11": [1, 2, 3, 6, 7, 8, 9, 10, 14, 20, 21, 22, 23, 27, 60], // Air Army
			"12": [1, 2, 3, 6, 7, 8, 9, 10, 14, 20, 21, 22, 23, 27, 60], // Air Army
			"13": [1, 2, 3, 6, 7, 8, 9, 10, 14, 20, 21, 22, 23, 27, 60], // Air Army
			"14": [1, 2, 3, 6, 7, 8, 9, 10, 14, 20, 21, 22, 23, 27, 60], // Air Army
			"15": [1, 2, 3, 6, 7, 8, 9, 10, 14, 20, 21, 22, 23, 27, 60], // Air Army
			"16": [1, 2, 3, 6, 7, 8, 9, 10, 14, 20, 21, 22, 23, 27, 60], // Air Army
			"17": [1, 2, 3, 6, 7, 8, 9, 10, 14, 20, 21, 22, 23, 27, 60], // Air Army
			"18": [1, 2, 3, 6, 7, 8, 9, 10, 14, 20, 21, 22, 23, 27, 60], // Air Army
			"19": [1, 2, 3, 6, 7, 8, 9, 10, 14, 20, 21, 22, 23, 27, 60], // Air Army
			"20": [1, 2, 3, 6, 7, 8, 9, 10, 14, 20, 21, 22, 23, 27, 60], // Air Army
			"21": [1, 2, 3, 6, 7, 8, 9, 10, 14, 20, 21, 22, 23, 27, 60], // Air Army
        };
        if (items[factionId]) {
            items[factionId].forEach((itemId) => {
                mp.fullDeleteItemsByParams(itemId, ["owner", "faction"], [playerSqlId, factionId]);
            });
        }
    }

    mp.getNearVehicle = (pos, range) => {
        var nearVehicle;
        var minDist = 99999;
        mp.vehicles.forEachInRange(pos, range, (veh) => {
            var distance = veh.dist(pos);
            if (distance < minDist) {
                nearVehicle = veh;
                minDist = distance;
            }
        });
        return nearVehicle;
    }

    mp.setVehSpawnTimer = (vehicle) => {
        var havePlayers = vehicle.getOccupants().length > 0;
        if (!havePlayers) vehicle.utils.setSpawnTimer(mp.economy["car_spawn_time"].value);
    }

    mp.updateWorldTime = () => {
        var speed = mp.economy["world_time_speed"].value;
        var worldHour = new Date().getHours() * speed % 24;
        worldHour += parseInt(new Date().getMinutes() / (60 / speed));
        if (worldHour != mp.world.time.hour) {
            mp.world.time.hour = worldHour;
            //debug(`Игровое время обновлено: ${mp.world.time.hour} ч. `);
        }
    }


    /* Оповещаем членов организации о том, что вошел коллега. */
    mp.broadcastEnterFactionPlayers = (player) => {
        if (!player.faction) return;
        var rankName = mp.factions.getRankName(player.faction, player.rank);
        if (mp.factions.isHospitalFaction(player.faction)) {
            mp.players.forEach((rec) => {
                if (rec.faction == player.faction) {
                    if (rec.sqlId != player.sqlId) rec.call(`tablet.medic.addTeamPlayer`, [{
                        id: player.id,
                        name: player.name,
                        rank: rankName
                    }]);
                    player.call(`tablet.medic.addTeamPlayer`, [{
                        id: rec.id,
                        name: rec.name,
                        rank: mp.factions.getRankName(rec.faction, rec.rank)
                    }]);
                }
            });
        } else if (player.faction == 2) {
            mp.players.forEach((rec) => {
                if (rec.faction == player.faction) {
                    if (rec.sqlId != player.sqlId) rec.call(`tablet.police.addTeamPlayer`, [{
                        id: player.id,
                        name: player.name,
                        rank: rankName
                    }]);
                    player.call(`tablet.police.addTeamPlayer`, [{
                        id: rec.id,
                        name: rec.name,
                        rank: mp.factions.getRankName(rec.faction, rec.rank)
                    }]);
                }
            });
        } else if (player.faction == 3) {
            mp.players.forEach((rec) => {
                if (rec.faction == player.faction) {
                    if (rec.sqlId != player.sqlId) rec.call(`tablet.sheriff.addTeamPlayer`, [{
                        id: player.id,
                        name: player.name,
                        rank: rankName
                    }]);
                    player.call(`tablet.sheriff.addTeamPlayer`, [{
                        id: rec.id,
                        name: rec.name,
                        rank: mp.factions.getRankName(rec.faction, rec.rank)
                    }]);
                }
            });
        } else if (player.faction == 4) {
            mp.players.forEach((rec) => {
                if (rec.faction == player.faction) {
                    if (rec.sqlId != player.sqlId) rec.call(`tablet.fib.addTeamPlayer`, [{
                        id: player.id,
                        name: player.name,
                        rank: rankName
                    }]);
                    player.call(`tablet.fib.addTeamPlayer`, [{
                        id: rec.id,
                        name: rec.name,
                        rank: mp.factions.getRankName(rec.faction, rec.rank)
                    }]);
                }
            });
        } else if (mp.factions.isArmyFaction(player.faction)) {
            mp.players.forEach((rec) => {
                if (rec.faction == player.faction) {
                    if (rec.sqlId != player.sqlId) rec.call(`tablet.army.addTeamPlayer`, [{
                        id: player.id,
                        name: player.name,
                        rank: rankName
                    }]);
                    player.call(`tablet.army.addTeamPlayer`, [{
                        id: rec.id,
                        name: rec.name,
                        rank: mp.factions.getRankName(rec.faction, rec.rank)
                    }]);
                }
            });
        }
    }

    /* Оповещаем членов организации о том, что вышел коллега. */
    mp.broadcastExitFactionPlayers = (player) => {
        if (!player.faction) return;
        if (mp.factions.isHospitalFaction(player.faction)) {
            mp.players.forEach((rec) => {
                if (rec.faction == player.faction) rec.call(`tablet.medic.removeTeamPlayer`, [player.id]);
            });
        } else if (player.faction == 2) {
            mp.players.forEach((rec) => {
                if (rec.faction == player.faction) rec.call(`tablet.police.removeTeamPlayer`, [player.id]);
            });
        } else if (player.faction == 3) {
            mp.players.forEach((rec) => {
                if (rec.faction == player.faction) rec.call(`tablet.sheriff.removeTeamPlayer`, [player.id]);
            });
        } else if (player.faction == 4) {
            mp.players.forEach((rec) => {
                if (rec.faction == player.faction) rec.call(`tablet.fib.removeTeamPlayer`, [player.id]);
            });
        } else if (mp.factions.isArmyFaction(player.faction)) {
            mp.players.forEach((rec) => {
                if (rec.faction == player.faction) rec.call(`tablet.army.removeTeamPlayer`, [player.id]);
            });
        }
    }

    mp.updateFactionPlayers = (player) => {
        if (!player.faction) return;
        if (mp.factions.isHospitalFaction(player.faction)) {
            mp.players.forEach((rec) => {
                if (rec.faction == player.faction) {
                    rec.call(`tablet.medic.removeTeamPlayer`, [player.id]);
                    rec.call(`tablet.medic.addTeamPlayer`, [{
                        id: player.id,
                        name: player.name,
                        rank: mp.factions.getRankName(player.faction, player.rank)
                    }]);
                }
            });
        } else if (player.faction == 2) {
            mp.players.forEach((rec) => {
                if (rec.faction == player.faction) {
                    rec.call(`tablet.police.removeTeamPlayer`, [player.id]);
                    rec.call(`tablet.police.addTeamPlayer`, [{
                        id: player.id,
                        name: player.name,
                        rank: mp.factions.getRankName(player.faction, player.rank)
                    }]);
                }
            });
        } else if (player.faction == 3) {
            mp.players.forEach((rec) => {
                if (rec.faction == player.faction) {
                    rec.call(`tablet.sheriff.removeTeamPlayer`, [player.id]);
                    rec.call(`tablet.sheriff.addTeamPlayer`, [{
                        id: player.id,
                        name: player.name,
                        rank: mp.factions.getRankName(player.faction, player.rank)
                    }]);
                }
            });
        } else if (player.faction == 4) {
            mp.players.forEach((rec) => {
                if (rec.faction == player.faction) {
                    rec.call(`tablet.fib.removeTeamPlayer`, [player.id]);
                    rec.call(`tablet.fib.addTeamPlayer`, [{
                        id: player.id,
                        name: player.name,
                        rank: mp.factions.getRankName(player.faction, player.rank)
                    }]);
                }
            });
        } else if (mp.factions.isArmyFaction(player.faction)) {
            mp.players.forEach((rec) => {
                if (rec.faction == player.faction) {
                    rec.call(`tablet.army.removeTeamPlayer`, [player.id]);
                    rec.call(`tablet.army.addTeamPlayer`, [{
                        id: player.id,
                        name: player.name,
                        rank: mp.factions.getRankName(player.faction, player.rank)
                    }]);
                }
            });
        }
    }

    mp.clearFactionPlayers = (player) => {
        if (!player.faction) return;
        if (mp.factions.isHospitalFaction(player.faction)) {
            mp.players.forEach((rec) => {
                if (rec.faction == player.faction) player.call(`tablet.medic.removeTeamPlayer`, [rec.id]);
            });
        } else if (player.faction == 2) {
            mp.players.forEach((rec) => {
                if (rec.faction == player.faction) player.call(`tablet.police.removeTeamPlayer`, [rec.id]);
            });
        } else if (player.faction == 3) {
            mp.players.forEach((rec) => {
                if (rec.faction == player.faction) player.call(`tablet.sheriff.removeTeamPlayer`, [rec.id]);
            });
        } else if (player.faction == 4) {
            mp.players.forEach((rec) => {
                if (rec.faction == player.faction) player.call(`tablet.fib.removeTeamPlayer`, [rec.id]);
            });
        } else if (mp.factions.isArmyFaction(player.faction)) {
            mp.players.forEach((rec) => {
                if (rec.faction == player.faction) player.call(`tablet.army.removeTeamPlayer`, [rec.id]);
            });
        }
    }

    mp.getLicName = (license) => {
        var names = {
            1: "Лицензия на автомобиль",
            2: "Лицензия на мототехнику",
            3: "Лицензия на лодку",
            4: "Лицензия на яхту",
            11: "Лицензия на вертолёт",
            12: "Лицензия на самолёт",
        };
        if (!names[license]) return "Лицензия";
        return names[license];
    }

    mp.convertMinutesToLevelRest = (minutes) => {
        var exp = parseInt(minutes / 60);
        if (exp < 8) return {
            level: 1,
            nextLevel: 8,
            rest: exp
        };
        var i = 2;
        var add = 16;
        var temp = 24;
        while (i < 200) {
            if (exp < temp) {
                return {
                    level: i,
                    nextLevel: temp - add,
                    rest: exp - (temp - add)
                };
            }
            i++;
            add += 8;
            temp += add;
        }
        return -1;
    }

    mp.getPointsOnInterval = (point1, point2, step) => {
        var vectorX = point2.x - point1.x;
        var vectorY = point2.y - point1.y;

        var vectorLenght = Math.sqrt(Math.pow(vectorX, 2) + Math.pow(vectorY, 2));
        var countOfPoint = parseInt(vectorLenght / step);

        var stepX = vectorX / countOfPoint;
        var stepY = vectorY / countOfPoint;

        var pointsOnInterval = [];

        for (var i = 1; i < countOfPoint; i++) {
            var point = {
                x: point1.x + stepX * i,
                y: point1.y + stepY * i
            }
            pointsOnInterval.push(point);
        }

        return pointsOnInterval;
    }

    mp.broadcastAdmins = (text) => {
        mp.players.forEach((rec) => {
            if (rec.sqlId && rec.admin) rec.call("chat.custom.push", [text]);
            // chatAPI.custom_push(`<a style="color: #FF0000">[A] Tomat Petruchkin:</a> всем доброго времени суток!`);
        });
    }
	
	mp.findPlayerByIdOrNickname = (playerName) => {
	  var foundPlayer = null;

	  // Проверяем, число ли это
	  if (playerName == parseInt(playerName)) {
		// Если число - ищем среди ID'ов пользователей
		foundPlayer = mp.players.at(playerName);
	  }

	  // Если пользователь не найден по ID - ищем по никам
	  if (!foundPlayer) {
		mp.players.forEach((_player) => {
		  if (_player.name === playerName) {
			foundPlayer = _player;
		  }
		});
	  }

	  return foundPlayer;
	};

}

function initPoliceCells() {
    var cellOne = new mp.Vector3(460.03, -994.1, 24.91);
    cellOne.h = 268.34;

    var cellTwo = new mp.Vector3(460.09, -998.03, 24.91);
    cellTwo.h = 268.34;

    var cellThree = new mp.Vector3(460.02, -1001.57, 24.91);
    cellThree.h = 268.34;
	
	var cellthebest = new mp.Vector3(-440.95, 5986.68, 31.72);
    cellthebest.h = 321.69;

    var cellsExit = new mp.Vector3(432.98, -974.24, 30.71);
    cellsExit.h = 81.26;

    mp.policeCells = [cellOne, cellTwo, cellThree, cellthebest];
    mp.policeCellsExit = cellsExit;
}
