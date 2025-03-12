module.exports.Init = function() {
    DB.Handle.query("SELECT * FROM talrasha_house WHERE closed != ?", [-1], function(e, result) {
        mp.houses = [];
		mp.wardrobePrices = {
			1: 30000,
			2: 25000, 
			3: 20000,
			4: 15000,
			5: 12000,
			6: 10000
		};
		mp.wardrobeSizes = {
			1: [5, 5],
			2: [5, 5], 
			3: [5, 5],
			4: [5, 5],
			5: [5, 5],
			6: [5, 5]
		};
        initHousesUtils();
        for (var i = 0; i < result.length; i++) {
			delete result[i].street
            var marker = mp.createHouseMarker(result[i]);
            result[i].sqlId = result[i].id;
            delete result[i].id;
            //if (marker.garage && result[i]["garageX"] && result[i]["garageY"] && result[i]["garageZ"]) marker.garageMarker = mp.createHouseGarageMarker(result[i]);
            mp.houses.push(marker);
        }
		console.log(`\x1b[32m[DONE]\x1b[0m "House" package has been loaded: \x1b[33m${i}\x1b[0m.`);
    });

    function initHouseUtils(house) {
        house.setInterior = (newInterior) => {
            if (newInterior < 1) newInterior = 1;
            house.interior = newInterior;
            DB.Handle.query("UPDATE talrasha_house SET interior=? WHERE id=?",
                [house.interior, house.sqlId]);
        };
        house.setPrice = (price) => {
            house.price = Math.clamp(price, 1000, Number.MAX_VALUE);
            DB.Handle.query("UPDATE talrasha_house SET price=? WHERE id=?",
                [house.price, house.sqlId]);
        };
        house.setClass = (newClass) => {
            if (newClass < 1) newClass = 1;
            house.class = newClass;
            DB.Handle.query("UPDATE talrasha_house SET class=? WHERE id=?",
                [house.class, house.sqlId]);
        };
        house.setClosed = (closed) => {
            house.closed = Math.clamp(closed, 0, 1);
            DB.Handle.query("UPDATE talrasha_house SET closed=? WHERE id=?",
                [house.closed, house.sqlId]);
        };
        house.setOwner = (ownerSqlId, ownerName) => {
            if (ownerSqlId < 1) {
                ownerSqlId = 0;
                ownerName = "";

                house.setColor(0, 187, 255, 70);
				if (!house.blip) {
	
					/*var blip = mp.blips.new(374, new mp.Vector3(house.x, house.y, house.z), {
						color: 2,
						name: "",
						shortRange: true,
						scale: 1
					});*/

					//house.blip = blip;
					
					let player = mp.players.getBySqlId(house.owner)
					if(player){
						player.call("client::addHouseBlip", [false]) 
						player.call("client::addGarageMarker", [false]) 
						
					}
					
					
					
				}
				

                mp.fullDeleteItemsByParams(59, ["house"], [house.sqlId]);
            } else {
				house.setDaysForNewHouse();
				if (house.blip) {
					let player = mp.players.getBySqlId(ownerSqlId)
					if(player){
						player.call("client::addHouseBlip", [true, house.blip.position]) 
						var posgarage = new mp.Vector3(house.garageX, house.garageY, house.garageZ);
						player.call("client::addGarageMarker", [true, posgarage])
						house.garageMarker = mp.createHouseGarageMarker(house);
					}
					house.blip.destroy();
					house.blip = false;
				}
            }

            house.owner = ownerSqlId;
            house.ownerName = ownerName;
            DB.Handle.query("UPDATE talrasha_house SET owner=?,ownerName=? WHERE id=?",
                [house.owner, house.ownerName, house.sqlId]);
            house.setClosed(0);
            // house.setBalance(house.getTax() * 24);
            house.setBalance(0);
        };
        house.setGarage = (newGarage) => {
            //console.log(`house.setGarage: ${newGarage}`)
            newGarage = Math.clamp(newGarage, 0, 3);
            house.garage = newGarage;
            DB.Handle.query("UPDATE talrasha_house SET garage=? WHERE id=?",
                [house.garage, house.sqlId]);

            if (newGarage === 0) {
                if (house.garageMarker) {
                    mp.players.forEachInRange(house.garageMarker.position, 2, (rec) => {
                        if (house.garageMarker.colshape.isPointWithin(rec.position)) rec.call("selectMenu.hide");
                    });

                    house.garageMarker.showColshape.destroy();
                    house.garageMarker.colshape.destroy();
                    house.garageMarker.destroy();
                    delete house.garageMarker;
                }
                mp.players.forEachInDimension(house.sqlId, (rec) => {
                    var interior = mp.interiors.getBySqlId(house.interior);
                    if (interior.garageMarker) {
                        interior.garageMarker.hideFor(rec);
                        if (interior.garageMarker.colshape.isPointWithin(rec.position)) rec.call("selectMenu.hide");
                    }
                });
            } else {
                if (!house.garageMarker) house.garageMarker = mp.createHouseGarageMarker(house);

                mp.players.forEachInDimension(house.sqlId, (rec) => {
                    var interior = mp.interiors.getBySqlId(house.interior);
                    if (interior.garageMarker) interior.garageMarker.showFor(rec);
                });
            }
        };
        house.setVehSpawn = (newSpawn) => {
            house.vehX = newSpawn.x;
            house.vehY = newSpawn.y;
            house.vehZ = newSpawn.z;
            house.vehH = newSpawn.h;
            DB.Handle.query("UPDATE talrasha_house SET vehX=?,vehY=?,vehZ=?,vehH=? WHERE id=?",
                [house.vehX, house.vehY, house.vehZ, house.vehH, house.sqlId]);
        };
        house.setGarageEnter = (pos) => {
            house.garageX = pos.x;
            house.garageY = pos.y;
            house.garageZ = pos.z;
            house.garageH = pos.h;
            DB.Handle.query("UPDATE talrasha_house SET garageX=?,garageY=?,garageZ=?,garageH=? WHERE id=?",
                [house.garageX, house.garageY, house.garageZ, house.garageH, house.sqlId]);

            if (house.garageMarker) {
                mp.players.forEachInRange(house.garageMarker.position, 2, (rec) => {
                    if (house.garageMarker.colshape.isPointWithin(rec.position)) rec.call("selectMenu.hide");
                });

                house.garageMarker.showColshape.destroy();
                house.garageMarker.colshape.destroy();
                house.garageMarker.destroy();
                delete house.garageMarker;
            }
            house.garageMarker = mp.createHouseGarageMarker(house);
        };
        house.changeCoord = (pos) => {
            house.x = pos.x;
            house.y = pos.y;
            house.z = pos.z;
            house.h = pos.h;
            DB.Handle.query("UPDATE talrasha_house SET x=?,y=?,z=?,h=? WHERE id=?",
                [house.x, house.y, house.z, house.h, house.sqlId]);

            house.colshape.destroy();
            house.showColshape.destroy();

            house.colshape = mp.createHouseMarker(house);
        };
        house.setBalance = (balance) => {
            if (balance < 0) balance = 0;
            house.balance = balance;
            DB.Handle.query("UPDATE talrasha_house SET balance=? WHERE id=?", [balance, house.sqlId]);
        };
		house.getNextPayDate = () => {
			var month = house.payDate.getMonth() + 1
			if (month < 10) month = `0${month}`
			var date = house.payDate.getDate()
			if (date < 10) date =  `0${date}`
           return `${date}.${month}.${house.payDate.getFullYear()}`
        };
		house.addDays = (days) => {
			house.payDate.setDate(house.payDate.getDate() + days);
			var db = house.payDate.getTime()
			DB.Handle.query("UPDATE talrasha_house SET payDate=? WHERE id=?", [db, house.sqlId]);
		};
		house.setDaysForNewHouse = () => {
			house.payDate = new Date();
			house.payDate.setDate(house.payDate.getDate() + 2);
			var db = house.payDate.getTime()
			DB.Handle.query("UPDATE talrasha_house SET payDate=? WHERE id=?", [db, house.sqlId]);
		};
		house.setPledged = (pledged) => {
            house.pledged = pledged;
            DB.Handle.query("UPDATE talrasha_house SET pledged=? WHERE id=?", [house.pledged, house.sqlId]);
        };
		house.setGarageSlots = (slots) => {
            house.garageSlots = slots;
            DB.Handle.query("UPDATE talrasha_house SET garageSlots=? WHERE id=?", [house.garageSlots, house.sqlId]);
        };
        house.sellToPlayer = (buyer) => {
            if (!buyer) return;
            house.owner = buyer.sqlId;
            house.ownerName = buyer.name;
            house.balance = 1000;
            house.closed = 0;
            house.garageClosed = 0;

            DB.Handle.query("UPDATE talrasha_house SET owner=?,ownerName=?,balance=?,closed=0,garageClosed=? WHERE id=?",
                [house.owner, house.ownerName, house.balance, 0, 0, house.sqlId]);

            player.utils.removeHouse(house);
            buyer.utils.addHouse(house);
            //buyer.markerEnterHouseId = house.id;
        };
        house.getTax = () => {
            return house.tax;
        };
		house.buyWardrobe = () => {
			house.wardrobeBuyed = 1;
			DB.Handle.query("UPDATE talrasha_house SET wardrobeBuyed=1 WHERE id=?", [house.sqlId], () => {
				if (!house.inventory) initHouseInventory(house);
			});
		};
		house.initWardrobe = (init, player, interior) => {
			if (init) {
				if (!interior || !interior.wardrobe) return
				if (house.wardrobeBuyed) {
					var alpha = mp.economy["markers_alpha"].value;
					var color = [255, 165, 0, 100];
					house.wardrobeMarker = mp.markers.new(1, new mp.Vector3(interior.wardrobe.x, interior.wardrobe.y, interior.wardrobe.z - 0.5), 0.8, {
						color: color,
						visible: true,
						dimension: player.dimension
					});
					house.wardrobeColshape = mp.colshapes.newSphere(interior.wardrobe.x, interior.wardrobe.y, interior.wardrobe.z, 2);
					house.wardrobeColshape.dimension = player.dimension;
					house.wardrobeColshape.menuName = "wardrobe";
				}
			}
			else {
				if (house.wardrobeMarker) house.wardrobeMarker.destroy(), delete house.wardrobeMarker;
				if (house.wardrobeColshape) house.wardrobeColshape.destroy(), delete house.wardrobeColshape;
			}
		};
    }

    function initHousesUtils() {
        mp.houses.getBySqlId = (sqlId) => {
            if (!sqlId) return null;
            var result;
            mp.houses.forEach((house) => {
                if (house.sqlId == sqlId) {
                    result = house;
                    return;
                }
            });
            return result;
        };
        mp.houses.getArrayByOwner = (owner) => {
            if (!owner) return [];
            var array = [];
            mp.houses.forEach((house) => {
                if (house.owner == owner) {
                    array.push(house);
                }
            });
            return array;
        };
        mp.houses.getHouseArrayByOwner = (owner) => {
            if (!owner) return [];
            var array = [];
            mp.houses.forEach((house) => {
                if (house.owner == owner) {
                    array.push({
                        sqlId: house.sqlId,
                        balance: house.balance,
                        owner: house.owner,
                        ownerName: house.ownerName,
                        price: house.price,
                        closed: house.closed,
                        garageClosed: house.garageClosed,
                        interior: house.interior,
                        garage: house.garage,
                        class: house.class,
                        x: house.x,
                        y: house.y,
                        z: house.z,
                        h: house.h,
                        garageX: house.garageX,
                        garageY: house.garageY,
                        garageZ: house.garageZ,
                        garageH: house.garageH
                    });
                }
            });
            return array;
        };
        mp.houses.delete = (house, callback) => {
            var i = mp.houses.indexOf(house);
            if (i == -1) return callback("Дом не найден!");
            mp.houses.splice(i, 1);
            house.blip.destroy();
			house.blip = false;
            house.colshape.destroy();
            house.showColshape.destroy();
            house.destroy();
            if (house.garageMarker) {
                mp.players.forEachInRange(house.garageMarker.position, 2, (rec) => {
                    if (house.garageMarker.colshape.isPointWithin(rec.position)) rec.call("selectMenu.hide");
                });

                house.garageMarker.showColshape.destroy();
                house.garageMarker.colshape.destroy();
                house.garageMarker.destroy();
                delete house.garageMarker;
            }
            //DB.Handle.query("DELETE FROM talrasha_house WHERE id=?", house.sqlId);
            DB.Handle.query("UPDATE talrasha_house SET closed=? WHERE id=?", [-1, house.sqlId]);
            if (house.owner) {
                DB.Handle.query("UPDATE talrasha_character SET house=? WHERE id=?", [0, house.owner]);
                var owner = mp.players.getBySqlId(house.owner);
                if (owner) {
					owner.house = 0;
					owner.call("client::addHouseBlip", [false]) 
					owner.call("client::addGarageMarker", [false]) 
				}
				
                //todo удаление предметов
                //mp.fullDeleteHouseKeys(house.sqlId);
            }
            callback();
            delete house;
        };
    }

    mp.createHouseMarker = (data) => {
        var pos = new mp.Vector3(data["x"], data["y"], data["z"] - 1);
        pos.z += mp.economy["markers_deltaz"].value;

        var alpha = mp.economy["markers_alpha"].value;
        var color = [0, 255, 0, alpha];
        if (data["owner"] != 0)
            color = [255, 0, 0, alpha];

        //var marker = mp.markers.new(0, pos, new mp.Vector3(0,0,0), new mp.Vector3(0,0,0), 1, r, g, b, 255, false);
        //var marker = mp.markers.new(0, pos, 1);
        var marker = mp.markers.new(1, pos, mp.economy["markers_scale"].value, {
            color: color,
            visible: false
        });
		
        marker.sqlId = data["id"];
        marker.balance = data["balance"];
        marker.owner = data["owner"];
        if (marker.owner != 0)
            marker.ownerName = data["ownerName"];

        marker.price = data["price"];
        marker.closed = data["closed"];
        marker.garageClosed = data["garageClosed"];
        marker.interior = data["interior"];
        marker.garage = data["garage"];
		marker.wardrobeBuyed = data["wardrobeBuyed"];
		marker.garageSlots = data["garageSlots"];
        marker.cars = JSON.parse(data["cars"]);
        marker.class = data["class"];
        marker.x = data["x"];
        marker.y = data["y"];
        marker.z = data["z"];
        marker.h = data["h"];
		marker.tax = data["tax"];
		marker.pledged = data["pledged"];
		marker.payDate = new Date(data["payDate"]);
        marker.garageX = data.garageX;
        marker.garageY = data.garageY;
        marker.garageZ = data.garageZ;
        marker.garageH = data.garageH;
		
		mp.labels.new(`Дом #${marker.sqlId}`, new mp.Vector3(pos.x, pos.y, pos.z+1), {
			los: true,
			color: [255, 255, 255],
			drawDistance: 5,
			font: 0
		});

        initHouseUtils(marker);

        var color = 0;

        if (data["owner"] == 0) color = 2;
        else color = 1;

        var type = 374;
        //if (data["vehX"] == 0 && data["vehY"] == 0) color = 67;

        var houseClasses = ["-", "A", "B", "C", "D", "N"];


		/*if (!data.owner) {
			
			var blip = mp.blips.new(type, pos, {
				color: color,
				name: "",
				shortRange: true,
				scale: 0.7
			});

			marker.blip = blip;
		
		}*/

        //для стриминга домов для игроков, которые в радиусе
        /*var colshape = mp.colshapes.newCircle(pos["x"], pos["y"], mp.economy["markers_stream_dist"].value);
        colshape.marker = marker;
        marker.showColshape = colshape;*/

        //для отловки события входа в дом
        var colshape = mp.colshapes.newSphere(pos["x"], pos["y"], pos["z"], 2);
        colshape.house = marker;
        marker.colshape = colshape;
        colshape.menuName = "enter_house";
		
		if (marker.wardrobeBuyed) initHouseInventory(marker);

        return marker;
    }

    mp.createHouseGarageMarker = (data) => {
		var pos = new mp.Vector3(data["garageX"], data["garageY"], data["garageZ"] + 0.60);

		var color = [255, 255, 0, 100];
		var marker = mp.markers.new(36, pos, 2, {
			color: color,
			visible: false
		});
		marker.houseSqlId = data.sqlId;

		//для стриминга домов для игроков, которые в радиусе
		/*var colshape = mp.colshapes.newCircle(pos["x"], pos["y"], 60);
		colshape.marker = marker;
		marker.showColshape = colshape;*/
		//для отловки события входа в дом
		var colshape = mp.colshapes.newSphere(pos["x"], pos["y"], pos["z"], 2);
		colshape.garage = marker;
		marker.colshape = colshape;
		colshape.menuName = "enter_garage";

		return marker;
    }
}
