module.exports.Init = function() {
    DB.Handle.query("SELECT * FROM talrasha_garage", function(e, result) {
        mp.garages = [];
        initGaragesUtils();

        for (var i = 0; i < result.length; i++) {
            mp.garages[i] = result[i];
            mp.garages[i]["slots"] = JSON.parse(mp.garages[i]["slots"]);
			
            var pos = new mp.Vector3(result[i]["x"], result[i]["y"], result[i]["z"] - 1);
            mp.garages[i].exitMarker = createExitMarker(pos);
			
			var talrashapos = mp.garages[i]["slots"]
			var positions = [
				new mp.Vector3(171.65, -1003.75, -99.60),
				new mp.Vector3(174.85, -1003.54, -99.61),
				
				new mp.Vector3(193.27, -997.45, -99.61),
				new mp.Vector3(196.48, -997.58, -99.61),
				new mp.Vector3(199.84, -997.95, -99.61),
				new mp.Vector3(192.97, -1004.03, -99.61),
				new mp.Vector3(196.19, -1004.33, -99.61),
				new mp.Vector3(199.7, -1004.59, -99.61),
				
				new mp.Vector3(223, -981.02, -99),
				new mp.Vector3(223.35, -986.76, -99),
				new mp.Vector3(223.22, -992.25, -99.15),
				new mp.Vector3(223.24, -996.89, -99.15),
				new mp.Vector3(223.19, -1002.07, -99.15),
				new mp.Vector3(233.79684448242188, -982.1552734375, -99.55685424804688),
				new mp.Vector3(232.66539001464844, -986.880615234375, -99.37773895263672),
				new mp.Vector3(233.08, -990.79, -99.15),
				new mp.Vector3(232.97, -995.61, -99.15),
				new mp.Vector3(232.93, -1001.02, -99.15)
			];
			
            initGarageUtils(mp.garages[i]);
        }
		for (var i = 0; i < positions.length; i++) {
			var pos = positions[i];
			talrashapos.exitMarkerVehicle = createExitMarkerVehicle(pos);
		}
		
		console.log(`\x1b[32m[DONE]\x1b[0m "Garages" package has been loaded: \x1b[33m${i}\x1b[0m.`);
    });
}

function initGaragesUtils() {
    mp.garages.getBySqlId = (sqlId) => {
        if (!sqlId) return null;
        var result;
        mp.garages.forEach((garage) => {
            if (garage.id === sqlId) {
                result = garage;
                return;
            }
        });
        return result;
    }
}

function initGarageUtils(garage) {
    garage.setEnter = (pos) => {
        garage.x = pos.x;
        garage.y = pos.y;
        garage.z = pos.z;
        garage.h = pos.h;
        DB.Handle.query(`UPDATE talrasha_garage SET x=?,y=?,z=?,h=? WHERE id=?`,
            [pos.x, pos.y, pos.z, pos.h, garage.id]);
    }
}

function createExitMarker(pos) {
	var exitMarker = mp.labels.new(`Вернуться`, new mp.Vector3(pos.x, pos.y, pos.z+1), {
		los: true,
		color: [255, 255, 255],
		drawDistance: 5,
		font: 4,
		dimension: -1
	});
	
    //для отловки события входа
    var colshape = mp.colshapes.newSphere(pos["x"], pos["y"], pos["z"], 2);
    colshape.dimension = -1;
    colshape.menuName = "exit_garage";

    return exitMarker;
}

function createExitMarkerVehicle(pos) {
    var exitMarkerVehicle = mp.markers.new(1, pos, 1,
	{
		color: [0,187,0,70],
		visible: true,
		dimension: -1
	});
	
    //для отловки события входа
    var colshape = mp.colshapes.newSphere(pos["x"], pos["y"], pos["z"], 3);
    colshape.dimension = -1;
    colshape.menuName = "exit_garagevehicle";

    return exitMarkerVehicle;
}