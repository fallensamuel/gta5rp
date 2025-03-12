module.exports.Init = function() {
    DB.Handle.query("SELECT * FROM talrasha_interior", function(e, result) {
        mp.interiors = [];
        initInteriorsUtils();
        for (var i = 0; i < result.length; i++) {
            mp.interiors[i] = result[i];
            var pos = new mp.Vector3(mp.interiors[i]["x"], mp.interiors[i]["y"], mp.interiors[i]["z"] - 1);

            var colshape = mp.colshapes.newSphere(pos["x"], pos["y"], pos["z"], 2);
            colshape.dimension = -1;
            colshape.menuName = "exit_house";

            mp.interiors[i].exitMarker = mp.createInteriorExitMarker(pos);

            var pos = new mp.Vector3(mp.interiors[i]["garageX"], mp.interiors[i]["garageY"], mp.interiors[i]["garageZ"] - 1);

            if (pos.x != 0 && pos.y != 0) mp.interiors[i].garageMarker = mp.createInteriorGarageMarker(pos);
			
			mp.interiors[i].wardrobe = new mp.Vector3(mp.interiors[i]["wardrobeX"], mp.interiors[i]["wardrobeY"], mp.interiors[i]["wardrobeZ"] - 0.5);
			

            initInteriorUtils(mp.interiors[i]);
        }

		console.log(`\x1b[32m[DONE]\x1b[0m "Interior" package has been loaded: \x1b[33m${i}\x1b[0m.`);
    });
}

function initInteriorsUtils() {
    mp.interiors.getBySqlId = (sqlId) => {
        if (!sqlId) return null;
        var result;
        mp.interiors.forEach((interior) => {
            if (interior.id == sqlId) {
                result = interior;
                return;
            }
        });
        return result;
    }
}

function initInteriorUtils(interior) {
    interior.setSpawn = (newSpawn) => {
        interior.spawnX = newSpawn.x;
        interior.spawnY = newSpawn.y;
        interior.spawnZ = newSpawn.z;
        interior.spawnH = newSpawn.h;
        DB.Handle.query(`UPDATE talrasha_interior SET spawnX=?,spawnY=?,spawnZ=?,spawnH=? WHERE id=?`,
            [newSpawn.x, newSpawn.y, newSpawn.z, newSpawn.h, interior.id]);
    }
    interior.setEnter = (newSpawn) => {
        interior.x = newSpawn.x;
        interior.y = newSpawn.y;
        interior.z = newSpawn.z;
        interior.h = newSpawn.h;
        DB.Handle.query(`UPDATE talrasha_interior SET x=?,y=?,z=?,h=? WHERE id=?`,
            [newSpawn.x, newSpawn.y, newSpawn.z, newSpawn.h, interior.id]);
    }
    interior.setGarage = (newSpawn) => {
        interior.garageX = newSpawn.x;
        interior.garageY = newSpawn.y;
        interior.garageZ = newSpawn.z;
        interior.garageH = newSpawn.h;
        DB.Handle.query(`UPDATE talrasha_interior SET garageX=?,garageY=?,garageZ=?,garageH=? WHERE id=?`,
            [newSpawn.x, newSpawn.y, newSpawn.z, newSpawn.h, interior.id]);

        if (interior.garageMarker) {
            interior.garageMarker.colshape.destroy();
            interior.garageMarker.destroy();
            delete interior.garageMarker;
        }
        interior.garageMarker = mp.createInteriorGarageMarker(pos);
    }
    interior.setRooms = (rooms) => {
        interior.rooms = Math.clamp(rooms, 0, 50);
        DB.Handle.query(`UPDATE talrasha_interior SET rooms=? WHERE id=?`,
            [interior.rooms, interior.id]);
    }
    interior.setSquare = (square) => {
        interior.square = Math.clamp(square, 0, 1000);
        DB.Handle.query(`UPDATE talrasha_interior SET square=? WHERE id=?`,
            [interior.square, interior.id]);
    }
}

mp.createInteriorExitMarker = (pos) => {
	var exitMarker = mp.labels.new(`Выход`, new mp.Vector3(pos.x, pos.y, pos.z+1), {
		los: true,
		color: [255, 255, 255],
		drawDistance: 5,
		font: 4,
		dimension: -1
	});
	
    var colshape = mp.colshapes.newSphere(pos["x"], pos["y"], pos["z"], 2);
    colshape.dimension = -1;
    colshape.menuName = "exit_house";

    return exitMarker;
}

mp.createInteriorGarageMarker = (pos) => {
    var garageMarker = mp.markers.new(1, pos, 1, {
        color: [0, 187, 255, 70],
        visible: false,
        dimension: -1
    });
	
    //для отловки события входа
    var colshape = mp.colshapes.newSphere(pos["x"], pos["y"], pos["z"], 2);
    colshape.dimension = -1;
    colshape.menuName = "enter_garage";
    garageMarker.colshape = colshape;

    return garageMarker;
}
