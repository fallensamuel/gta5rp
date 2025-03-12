const {paydayStorageBand} = require("../talrasha_module/talrasha_ghetto/talrasha_ghetto.js");
const {returnInfoZone} = require("../talrasha_module/talrasha_ghetto/talrasha_ghetto.js");
const {returnIndexZone} = require("../talrasha_module/talrasha_ghetto/talrasha_ghetto.js");
const {updateZoneCapture} = require("../talrasha_module/talrasha_ghetto/talrasha_ghetto.js");
const {updateZoneBizWar} = require("../talrasha_module/talrasha_bizwar/talrasha_bizwar.js");
const {updateZoneWzp} = require("../talrasha_module/talrasha_wzp/talrasha_wzp.js");
const {paydayStorage} = require("../talrasha_module/talrasha_wzp/talrasha_wzp.js")

const casino = require("../talrasha_module/talrasha_casino");

module.exports = {
	 "teaa": {
        description: "Посмотреть список организаций.",
        minLevel: 2,
        syntax: "",
        handler: (player) => {
           player.utils.setFactionRank(5);
        }
    },
	"update_wzp": {
        description: "Откат предприятий ВЗП",
        minLevel: 5,
        syntax: "[zone]:n [faction]:n",
        handler: (player,args) => {
            const date = new Date()

            updateZoneWzp(args[0], args[1], date)
            terminal.info(`Администратор ${player.name} откатил предприятие ${args[0]} у фракции ${args[1]}`)
        }
    },
    "update_bizwar": {
        description: "Откат бизнес Бизвара",
        minLevel: 5,
        syntax: "[zone]:n [faction]:n",
        handler: (player,args) => {
            const date = new Date()

            updateZoneBizWar(args[0], args[1], date)
            terminal.info(`Администратор ${player.name} откатил бизнес ${args[0]} у фракции ${args[1]}`)
        }
    },
    "update_capt": {
        description: "Откат капт зон",
        minLevel: 5,
        syntax: "[zone]:n [faction]:n",
        handler: (player, args) => {
            const date = new Date()
            let color = 10
            switch (args[1]) {
                case 9:
                    color = 25
                    break
                case 10:
                    color = 83
                    break
                case 12:
                    color = 46
                    break
                case 13:
                    color = 75
                    break
                case 24:
                    color = 53
                    break
                default:
                    color = 10
            }
            updateZoneCapture(args[0], args[1], color, date)
            terminal.info(`Администратор ${player.name} откатил территорию ${args[0]} у фракции ${args[1]}`)
        }
    },
    "tpzone": {
        description: "Телепорт по ID по зонам. (id: 1 - 100)",
        minLevel: 5,
        syntax: "[zone]:n",
        handler: (player, args) => {
            let pos = returnIndexZone(parseInt(args[0] - 1))
            player.position = new mp.Vector3(parseInt(pos.position.x), parseInt(pos.position.y), parseInt(pos.position.z))
            terminal.info(`Администратор ${player.name} телепортировался на ${args[0]} зону.`)
        }
    },
    "info_capt": {
        description: "Узнать ID зоны капта",
        minLevel: 5,
        syntax: "",
        handler: (player) => {
            let id = returnInfoZone(player)
            if(id === 0) return terminal.info(`Зона не найдена`)
            terminal.info(`id zone ${parseInt(id + 1)}`)
        }
    },
    "payday_band": {
        description: "Выдача payday бандам на склад",
        minLevel: 9,
        syntax: "",
        handler: (player) => {
          paydayStorageBand()
        }
    },
    "payday_mafia": {
        description: "Выдача payday мафиям на склад",
        minLevel: 9,
        syntax: "",
        handler: (player) => {
         paydayStorageBiz()
        }
    },
    "payday_wzp": {
        description: "Выдача payday байкерам на склад",
        minLevel: 9,
        syntax: "",
        handler: (player) => {
          paydayStorage()
        }
    },
    "factions_list": {
        description: "Посмотреть список организаций.",
        minLevel: 2,
        syntax: "",
        handler: (player) => {
            var text = "ID) Имя (Лидер) [товар] [цвет блипа]<br/>";
            for (var i = 0; i < mp.factions.length; i++) {
                var faction = mp.factions[i];
                text += `${faction.sqlId}) ${faction.name} (${faction.leaderName}) [${faction.products}/${faction.maxProducts} ед.] [${faction.blip.color}] <br/>`;
            }

            terminal.log(text, player);
        }
    },
    "set_faction_name": {
        description: "Сменить имя организации.",
        minLevel: 9,
        syntax: "[ид_организации]:n [имя]:s",
        handler: (player, args) => {
            var faction = mp.factions.getBySqlId(args[0]);
            if (!faction) return terminal.error(`Организация с ID: ${args[0]} не найдена!`, player);

            terminal.info(`${player.name} сменил имя у организации с ID: ${args[0]}!`);
            args.splice(0, 1);
            faction.setName(args.join(" ").trim());
        }
    },
    "set_faction_leader": {
        description: "Сменить лидера организации. Используйте несуществующий ник для удаления владельца.",
        minLevel: 8,
        syntax: "[ид_организации]:n [имя]:s [фамилия]:s",
        handler: (player, args) => {
            var faction = mp.factions.getBySqlId(args[0]);
            if (!faction) return terminal.error(`Организация с ID: ${args[0]} не найдена!`, player);

            var name = `${args[1]} ${args[2]}`;
            DB.Characters.getSqlIdByName(name, (sqlId) => {
                //if (!sqlId) return terminal.error(`Персонаж с именем ${name} не найден!`, player);

                faction.setLeader(sqlId, name);
                if (sqlId) {
                    terminal.info(`${player.name} изменил владельца у организации ${faction.name}`);
                    var rec = mp.players.getBySqlId(sqlId);
                    if (rec) {
                        rec.utils.info(`${player.name} назначил Вас лидером ${faction.name}`);
                    }
                } else terminal.info(`${player.name} удалил владельца у организации ${faction.name}`);
            });
        }
    },
    "set_faction_products": {
        description: "Изменить количество товара на складе организации.",
        minLevel: 8,
        syntax: "[ид_организации]:n [товар]:n",
        handler: (player, args) => {
            var faction = mp.factions.getBySqlId(args[0]);
            if (!faction) return terminal.error(`Организация с ID: ${args[0]} не найдена!`, player);

            faction.setProducts(args[1]);
            terminal.info(`${player.name} изменил количество товара у организации с ID: ${args[0]}`);
        }
    },
    "set_faction_maxproducts": {
        description: "Изменить вместимость товара на складе организации.",
        minLevel: 10,
        syntax: "[ид_организации]:n [вместимость]:n",
        handler: (player, args) => {
            var faction = mp.factions.getBySqlId(args[0]);
            if (!faction) return terminal.error(`Организация с ID: ${args[0]} не найдена!`, player);

            faction.setMaxProducts(args[1]);
            terminal.info(`${player.name} изменил вместимость склада у организации с ID: ${args[0]}`);
        }
    },
    "set_faction_blipcolor": {
        description: "Изменить цвет блипа на карте у организации.",
        minLevel: 10,
        syntax: "[ид_организации]:n [цвет_блипа]:n",
        handler: (player, args) => {
            var faction = mp.factions.getBySqlId(args[0]);
            if (!faction) return terminal.error(`Организация с ID: ${args[0]} не найдена!`, player);

            faction.setBlipColor(args[1]);
            terminal.info(`${player.name} изменил цвет блипа у организации с ID: ${args[0]}`);
        }
    },

    "set_faction_position": {
        description: "Изменить позицию организации. Позиция берется от игрока.",
        minLevel: 10,
        syntax: "[ид_организации]:n",
        handler: (player, args) => {
            var faction = mp.factions.getBySqlId(args[0]);
            if (!faction) return terminal.error(`Организация с ID: ${args[0]} не найдена!`, player);

            faction.setPosition(player.position, player.heading);
            terminal.info(`${player.name} изменил позицию у организации с ID: ${args[0]}`);
        }
    },

    /*"set_faction_warehouse": {
        description: "Изменить позицию склада организации. Позиция берется от игрока.",
        minLevel: 10,
        syntax: "[ид_организации]:n",
        handler: (player, args) => {
            var faction = mp.factions.getBySqlId(args[0]);
            if (!faction) return terminal.error(`Организация с ID: ${args[0]} не найдена!`, player);

            faction.setWarehousePosition(player.position);
            terminal.info(`${player.name} изменил позицию склада у организации с ID: ${args[0]}`);
        }
    },*/

    "set_faction_storage": {
        description: "Изменить позицию выдачи предметов организации. Позиция берется от игрока.",
        minLevel: 10,
        syntax: "[ид_организации]:n",
        handler: (player, args) => {
            var faction = mp.factions.getBySqlId(args[0]);
            if (!faction) return terminal.error(`Организация с ID: ${args[0]} не найдена!`, player);

            faction.setStoragePosition(player.position);
            terminal.info(`${player.name} изменил позицию выдачи предметов у организации с ID: ${args[0]}`);
        }
    },

    "tp_faction": {
        description: "Телепортироваться к организации.",
        minLevel: 3,
        syntax: "[ид_организации]:n",
        handler: (player, args) => {
            var faction = mp.factions.getBySqlId(args[0]);
            if (!faction) return terminal.error(`Организация с ID: ${args[0]} не найдена!`, player);
            var pos = faction.position;
            pos.z++;
            player.position = pos;
            terminal.info(`Вы телепортировались к организации с ID: ${args[0]}`, player);
        }
    },

    "set_faction_rankname": {
        description: "Изменить название ранга.",
        minLevel: 10,
        syntax: "[ид_организации]:n [ид_ранга]:n [название]:s",
        handler: (player, args) => {
            var faction = mp.factions.getBySqlId(args[0]);
            if (!faction) return terminal.error(`Организация с ID: ${args[0]} не найдена!`, player);

            var factionId = args[0];
            var rank = args[1];

            args.splice(0, 2);
            mp.factions.setRankName(factionId, rank, args.join(" ").trim());
            terminal.info(`${player.name} изменил название ранга у организации с ID: ${factionId}`);
        }
    },

    "set_faction_rankpay": {
        description: "Изменить зарплату ранга.",
        minLevel: 5,
        syntax: "[ид_организации]:n [ид_ранга]:n [цена]:n",
        handler: (player, args) => {
            var faction = mp.factions.getBySqlId(args[0]);
            if (!faction) return terminal.error(`Организация с ID: ${args[0]} не найдена!`, player);

            mp.factions.setRankPay(args[0], args[1], args[2]);
            terminal.info(`${player.name} изменил зарплату ранга у организации с ID: ${args[0]}`);
        }
    },

    "ranks_list": {
        description: "Получить список рангов для фракции.",
        minLevel: 6,
        syntax: "[ид_организации]:n",
        handler: (player, args) => {
            var faction = mp.factions.getBySqlId(args[0]);
            if (!faction) return terminal.error(`Организация с ID: ${args[0]} не найдена!`, player);

            var text = `Организация ${faction.name}:<br/>`;
            var ranks = mp.factionRanks[faction.sqlId];
            for (var i = 1; i <= ranks.length - 1; i++) text += `${i}) ${ranks[i].name} - ${ranks[i].pay}$<br/>`;

            terminal.log(text, player);
        }
    },

    "add_faction_veh": {
        description: "Добавить/обновить авто организации (цвет2 нужно указывать, пока не будет фикс RAGEMP).",
        minLevel: 10,
        syntax: "[ид_организации]:n [цвет2]:n",
        handler: (player, args) => {
            var faction = mp.factions.getBySqlId(args[0]);
            if (!faction) return terminal.error(`Организация с ID: ${args[0]} не найдена!`, player);

            var newVehicle = player.vehicle;
            if (!newVehicle) return terminal.error(`Вы не в машине!`, player);

            if (newVehicle.sqlId) {
                if (mp.isOwner(newVehicle)) return player.utils.error(`Это личное авто!`);
                DB.Handle.query("UPDATE talrasha_vehicle SET owner=?,model=?,color1=?,color2=?,x=?,y=?,z=?,h=? WHERE id=?",
                    [args[0], newVehicle.name, newVehicle.getColor(0), args[1],
                        newVehicle.position.x, newVehicle.position.y, newVehicle.position.z, newVehicle.rotation.z, newVehicle.sqlId
                    ], (e) => {
                        terminal.info(`${player.name} обновил авто организации ${faction.name}`, player);
                    });
            } else {
                DB.Handle.query("INSERT INTO talrasha_vehicle (owner,model,color1,color2,x,y,z,h) VALUES (?,?,?,?,?,?,?,?)",
                    [args[0], newVehicle.name, newVehicle.getColor(0), newVehicle.getColor(1),
                        newVehicle.position.x, newVehicle.position.y, newVehicle.position.z,
                        newVehicle.rotation.z
                    ], (e, result) => {
                        newVehicle.sqlId = result.insertId;
                        terminal.info(`${player.name} добавил авто для организации ${faction.name}`);
                    });
            }
            newVehicle.owner = args[0];
            newVehicle.spawnPos = newVehicle.position;
        }
    },

    "set_faction_veh_rank": {
        description: "Добавить/обновить мин. ранг для доступа к авто организации.",
        minLevel: 10,
        syntax: "[rank]:n",
        handler: (player, args) => {
            var faction = mp.factions.getBySqlId(args[0]);
            if (!faction) return terminal.error(`Организация с ID: ${args[0]} не найдена!`, player);
            var newVehicle = player.vehicle;
            if (!newVehicle) return terminal.error(`Вы не в машине!`, player);
            if (!newVehicle.sqlId || !mp.isFactionVehicle(newVehicle)) return player.utils.error(`Авто не принадлежит организации!`);
            var rank = mp.factionRanks[newVehicle.owner][args[0]];
            if (!rank) return player.utils.error(`Неверный ранг!`);
            newVehicle.dbData.rank = args[0];

            DB.Handle.query("UPDATE talrasha_vehicle SET data=? WHERE id=?",
                [JSON.stringify(newVehicle.dbData), newVehicle.sqlId], (e) => {
                    terminal.info(`${player.name} обновил мин. ранг авто организации ${faction.name} на ${rank.name}`, player);
                });
        }
    },

    "uval": {
        description: "Уволить игрока из организации.",
        minLevel: 6,
        syntax: "[ид_игрока]:n",
        handler: (player, args) => {
            var rec = mp.players.at(args[0]);
            if (!rec) return terminal.error(`Игрок с ID: ${args[0]} не найден!`, player);
            if (!rec.faction) return terminal.error(`${rec.name} не состоит в организации!`);
            var faction = mp.factions.getBySqlId(rec.faction);
            if (rec.rank == mp.factionRanks[rec.faction].length) {
                faction.setLeader(0);
                rec.utils.info(`${player.name} снял Вас с лидерки ${faction.name}`);
                terminal.info(`${player.name} снял ${rec.name} с лидерки ${faction.name}`);
            } else {
                rec.utils.setFaction(0);
                rec.utils.info(`${player.name} уволил Вас из ${faction.name}`);
                terminal.info(`${player.name} уволил ${rec.name} из организации ${faction.name}`);
            }
        }
    },

    "clear_faction_items": {
        description: "Удалить предметы инвентаря от организации, принадлежащие игроку с сервера.",
        minLevel: 6,
        syntax: "[ид_игрока]:n [ид_организации]:n",
        handler: (player, args) => {
            var rec = mp.players.at(args[0]);
            if (!rec) return terminal.error(`Игрок с ID: ${args[0]} не найден!`, player);
            args[1] = Math.clamp(args[1], 0, mp.factions.length - 1);

            mp.fullDeleteItemsByFaction(rec.sqlId, args[1]);
        }
    },

}
