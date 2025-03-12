module.exports = {
    "create_house": {
        description: "Создать новый дом. Позиция выхода из дома берётся по положению игрока (не забывайте про поворот туловища, чтобы игрок смотрел в противоп. сторону от двери).",
        minLevel: 10,
        syntax: "[interior]:n [garage]:n [price]:n [class]:n",
        handler: (player, args) => {
            var pos = player.position;

            DB.Handle.query("SELECT id FROM talrasha_house WHERE closed=?", [-1], (e, result) => {
                if (result.length == 0) {
                    DB.Handle.query("INSERT INTO talrasha_house (interior,garage,x,y,z,h,price,class) VALUES (?,?,?,?,?,?,?,?)",
                        [args[0], args[1], pos["x"], pos["y"], pos["z"], player.heading, args[2], args[3]], (e, result) => {
                            DB.Handle.query("SELECT * FROM talrasha_house WHERE id=?", result.insertId, (e, result) => {
                                if (result.length == 0) return terminal.error(`Ошибка создания дома!`, player);
                                mp.houses.push(mp.createHouseMarker(result[0]));
                                terminal.info(`${player.name} создал дом с ID: ${result[0].id}`);
                            });
                        });
                } else {
                    var sqlId = result[0].id;
                    DB.Handle.query("UPDATE talrasha_house SET interior=?,balance=?,garage=?,cars=?,x=?,y=?,z=?,h=?,vehX=?,vehY=?,vehZ=?,vehH=?,garageX=?,garageY=?,garageZ=?,garageH=?,owner=?,ownerName=?,closed=?,garageClosed=?,price=?,class=? WHERE id=?",
                        [args[0], 1000, args[1], '[]', pos.x, pos.y, pos.z, player.heading, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, 0, args[2], args[3], sqlId], () => {
                            DB.Handle.query("SELECT * FROM talrasha_house WHERE id=?", sqlId, (e, result) => {
                                if (result.length == 0) return terminal.error(`Ошибка создания дома!`, player);
                                mp.houses.push(mp.createHouseMarker(result[0]));
                                terminal.info(`${player.name} создал дом с ID: ${result[0].id}`);
                            });
                        });
                }
            });
        }
    },
	"add_house_streets": {
        description: "Заполнить колонку в бд названиями улиц.",
        minLevel: 10,
        syntax: "",
        handler: (player, args) => {			
			var array = {};
            mp.houses.forEach((house) => {
				array[house.sqlId] = {x: house.x, y: house.y, z: house.z}
            });
			player.call("house.streets.add", [JSON.stringify(array)]) 
        }
    },
    "delete_house": {
        description: "Удалить дом.",
        minLevel: 10,
        syntax: "[houseId]:n",
        handler: (player, args) => {
            var house = mp.houses.getBySqlId(args[0]);
            if (!house) return terminal.error(`Дом с ID: ${args[0]} не найден!`, player);

            mp.houses.delete(house, (e) => {
                if (e) return terminal.error(e);
                terminal.info(`${player.name} удалил дом с ID: ${args[0]}`);
            });
        }
    },
    "set_house_interior": {
        description: "Изменить интерьер дома.",
        minLevel: 10,
        syntax: "[houseId]:n [interior]:n",
        handler: (player, args) => {
            var house = mp.houses.getBySqlId(args[0]);
            if (!house) return terminal.error(`Дом с ID: ${args[0]} не найден!`, player);
            terminal.info(`${player.name} изменил интерьер ${house.interior}=>${args[1]} у дома с ID: ${house.sqlId}`);
            house.setInterior(args[1]);
        },
    },
    "set_house_position": {
        description: "Изменить позицию дома.",
        minLevel: 10,
        syntax: "[houseId]:n",
        handler: (player, args) => {
            var pos = player.position;
            var house = mp.houses.getBySqlId(args[0]);
            if (!house) return terminal.error(`Дом с ID: ${args[0]} не найден!`, player);
            terminal.info(`${player.name} изменил позицию у дома с ID: ${house.sqlId}`);
            house.changeCoord(pos);
        },
    },
    "set_house_price": {
        description: "Изменить цену дома.",
        minLevel: 10,
        syntax: "[houseId]:n [price]:n",
        handler: (player, args) => {
            var house = mp.houses.getBySqlId(args[0]);
            if (!house) return terminal.error(`Дом с ID: ${args[0]} не найден!`, player);
            terminal.info(`${player.name} изменил цену ${house.price}$=>${args[1]}$ у дома с ID: ${house.sqlId}`);
            house.setPrice(args[1]);
        },
    },
    "set_house_class": {
        description: "Изменить класс дома. Классы: A,B,C,D,E,F.",
        minLevel: 10,
        syntax: "[houseId]:n [class]:s",
        handler: (player, args) => {
            var house = mp.houses.getBySqlId(args[0]);
            if (!house) return terminal.error(`Дом с ID: ${args[0]} не найден!`, player);
            var classes = ["A", "B", "C", "D", "E", "F"];
            if (classes.indexOf(args[1]) == -1) return terminal.error(`Класс ${args[1]} неверный!`, player);


            terminal.info(`${player.name} изменил класс ${classes[house.class - 1]}=>${args[1]} у дома с ID: ${house.sqlId}`);
            house.setClass(classes.indexOf(args[1]) + 1);
        }
    },
    "set_house_owner": {
        description: "Изменить владельца дома.",
        minLevel: 10,
        syntax: "[houseId]:n [playerName]:s [playerSecondName]:s",
        handler: (player, args) => {
            var house = mp.houses.getBySqlId(args[0]);
            if (!house) return terminal.error(`Дом с ID: ${args[0]} не найден!`, player);
            var fullName = args[1] + " " + args[2];
            DB.Handle.query(`SELECT id FROM talrasha_character WHERE name=?`, [fullName], (e, result) => {
                if (result.length == 0) return terminal.error(`Персонаж <b>${fullName}</b> не найден!`, player);
                var str = (house.owner == 0) ? fullName : `${house.ownerName}=>${fullName}`;
                terminal.info(`${player.name} изменил владельца ${str} у дома с ID: ${house.sqlId}`);
                house.setOwner(result[0].id, fullName);
            });
        }
    },
    "set_house_garage": {
        description: "Изменить гараж дома.",
        minLevel: 10,
        syntax: "[houseId]:n [garage]:n",
        handler: (player, args) => {
            var house = mp.houses.getBySqlId(args[0]);
            if (!house) return terminal.error(`Дом с ID: ${args[0]} не найден!`, player);

            terminal.info(`${player.name} изменил гараж ${house.garage}=>${args[1]} у дома с ID: ${house.sqlId}`);
            house.setGarage(args[1]);
        }
    },
    "set_house_vehspawn": {
        description: "Установить позицию спавна авто при выезде из гаража. Установка происходит по позиции авто, в котором находится игрок.",
        minLevel: 10,
        syntax: "[houseId]:n",
        handler: (player, args) => {
            if (!player.vehicle) return terminal.error(`Вы не в машине!`, player);
            var house = mp.houses.getBySqlId(args[0]);
            if (!house) return terminal.error(`Дом с ID: ${args[0]} не найден!`, player);
            var pos = player.vehicle.position;
            pos.h = player.vehicle.rotation.z;

            terminal.info(`${player.name} установил позицию спавна авто у дома с ID: ${house.sqlId}`);
            house.setVehSpawn(pos);
        }
    },
    "set_house_garageenter": {
        description: "Установить позицию входа в гараж с улицы. Установка происходит по позиции игрока.",
        minLevel: 10,
        syntax: "[houseId]:n",
        handler: (player, args) => {
            var house = mp.houses.getBySqlId(args[0]);
            if (!house) return terminal.error(`Дом с ID: ${args[0]} не найден!`, player);
            var pos = player.position;
            pos.h = player.heading;

            terminal.info(`${player.name} изменил позицию входа в гараж с улицы для дома с ID: ${house.sqlId}`);
            house.setGarageEnter(pos);
        }
    },
    "set_interior_spawn": {
        description: "Установить позицию спавна в интерьере. Установка происходит по позиции игрока.",
        minLevel: 10,
        syntax: "[interiorId]:n",
        handler: (player, args) => {
            var interior = mp.interiors.getBySqlId(args[0]);
            if (!interior) return terminal.error(`Интерьер с ID: ${args[0]} не найден!`, player);
            var pos = player.position;
            pos.h = player.heading;

            terminal.info(`${player.name} изменил позицию спавна в интерьере с ID: ${interior.id}`);
            interior.setSpawn(pos);
        }
    },
    "set_interior_enter": {
        description: "Установить позицию входа из интерьера в гараж. Установка происходит по айди интерьера.",
        minLevel: 10,
        syntax: "[interiorId]:n",
        handler: (player, args) => {
            var interior = mp.interiors.getBySqlId(args[0]);
            if (!interior) return terminal.error(`Интерьер с ID: ${args[0]} не найден!`, player);
            var pos = player.position;
            pos.h = player.heading;

            terminal.info(`${player.name} изменил позицию входа в интерьер с ID: ${interior.id}`);
            interior.setEnter(pos);
        }
    },
    "set_interior_garage": {
        description: "Установить интерьер в гараже. Установка происходит по айди интерьера.",
        minLevel: 10,
        syntax: "[interiorId]:n",
        handler: (player, args) => {
            var interior = mp.interiors.getBySqlId(args[0]);
            if (!interior) return terminal.error(`Интерьер с ID: ${args[0]} не найден!`, player);
            var pos = player.position;
            pos.h = player.heading;

            terminal.info(`${player.name} изменил позицию входа в гараж в интерьере с ID: ${interior.id}`);
            interior.setGarage(pos);
        }
    },
    "set_interior_rooms": {
        description: "Установить количество комнат у интерьера.",
        minLevel: 10,
        syntax: "[interiorId]:n [rooms]:n",
        handler: (player, args) => {
            var interior = mp.interiors.getBySqlId(args[0]);
            if (!interior) return terminal.error(`Интерьер с ID: ${args[0]} не найден!`, player);

            terminal.info(`${player.name} изменил количество комнат в интерьере с ID: ${interior.id}`);
            interior.setRooms(args[1]);
        }
    },
    "set_interior_square": {
        description: "Установить площадь у интерьера.",
        minLevel: 10,
        syntax: "[interiorId]:n [square]:n",
        handler: (player, args) => {
            var interior = mp.interiors.getBySqlId(args[0]);
            if (!interior) return terminal.error(`Интерьер с ID: ${args[0]} не найден!`, player);

            terminal.info(`${player.name} изменил пощадь в интерьере с ID: ${interior.id}`);
            interior.setSquare(args[1]);
        }
    },
    "set_garage_enter": {
        description: "Установить позицию входа в гараж. Установка происходит по позиции игрока.",
        minLevel: 10,
        syntax: "[garageId]:n",
        handler: (player, args) => {
            var garage = mp.garages.getBySqlId(args[0]);
            if (!garage) return terminal.error(`Гараж с ID: ${args[0]} не найден!`, player);
            var pos = player.position;
            pos.h = player.heading;

            terminal.info(`${player.name} изменил позицию входа в гараж с ID: ${garage.id}`);
            garage.setEnter(pos);
        }
    },
    "tp_house": {
        description: "Телепортироваться в дому.",
        minLevel: 10,
        syntax: "[houseId]:n",
        handler: (player, args) => {
            var house = mp.houses.getBySqlId(args[0]);
            if (!house) return terminal.error(`Дом с ID: ${args[0]} не найден!`, player);
            var pos = house.position;
            pos.z++;
            player.position = pos;
            terminal.info(`Вы телепортировались в дому с ID: ${args[0]}`, player);
        }
    },
	"set_pl": {
        description: "Изменить статус залога у дома. 1 - в залоге, 0 - не в залоге",
        minLevel: 5,
        syntax: "[houseId]:n [status]:n",
        handler: (player, args) => {
            var house = mp.houses.getBySqlId(args[0]);
            if (!house) return terminal.error(`Дом с ID: ${args[0]} не найден!`, player);
			if (args[1] === 1 || args[1] === 0) {
				house.setPledged(args[1])
				terminal.info(`Вы изменили статус залога у дома с ID: ${args[0]}`, player);
			}
			else {
				terminal.error(`Неправильный статус!`, player);
			}
        }
    },
	"set_house_slots": {
        description: "Изменить кол-во гаражных слотов в доме",
        minLevel: 5,
        syntax: "[houseId]:n [quantity]:n",
        handler: (player, args) => {
            var house = mp.houses.getBySqlId(args[0]);
            if (!house) return terminal.error(`Дом с ID: ${args[0]} не найден!`, player);
			house.setGarageSlots(args[1]);
			terminal.info(`Вы изменили кол-во гаражных мест у дома с ID: ${args[0]}`, player);
        }
    },
}
