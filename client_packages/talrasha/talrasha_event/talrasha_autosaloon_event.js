const cameraRotator = require("talrasha/talrasha_module/talrasha_helper/talrasha_camera_rotator.js");

exports = (menu) => {

    auto = { model: null, color: null, entity: null };
	
	vehPosition = false

    global.checkTestDrive = false;
    global.startTestDrive = 0;
	global.checkTestDriveDonate = false;
    global.startTestDriveDonate = 0;
    global.testVeh = null;
    global.bizId = null;
    const player = mp.players.local;

    setInterval(function () {
        if(checkTestDrive) {
            if(new Date().getTime() - startTestDrive > (1000*60)){
                checkTestDrive = false;
                mp.events.call("autoSaloon.setStatusMenu", true);
                mp.events.callRemote("autoSaloon.endTestDrive");
            }
            if(new Date().getTime() - startTestDrive > 2000) {
                if(!player.vehicle) {
                    checkTestDrive = false;
                    mp.events.call("autoSaloon.setStatusMenu", true);
                    mp.events.callRemote("autoSaloon.endTestDrive");
                }
            }
        }
		if(checkTestDriveDonate) {
            if(new Date().getTime() - startTestDriveDonate > (1000*60)){
                checkTestDriveDonate = false;
                mp.events.callRemote("autoSaloon.endTestDriveDonate");
            }
            if(new Date().getTime() - startTestDriveDonate > 2000) {
                if(!player.vehicle) {
                    checkTestDriveDonate = false;
                    mp.events.callRemote("autoSaloon.endTestDriveDonate");
                }
            }
        }	
    }, 1000);

    function createCam(x, y, z, rx, ry, rz, viewangle,vx, xy, vz) {
        // camera = mp.cameras.new("Cam", {x, y, z}, {x: rx, y: ry, z: rz}, viewangle);
        camera = mp.cameras.new("default");
        camera.setCoord(x, y, z);
        camera.setRot(rx, ry, rz, 2);
        camera.setFov(viewangle);
        camera.setActive(true);
        
        vehPosition = new mp.Vector3(vx, xy, vz);

        cameraRotator.start(camera, vehPosition, vehPosition, new mp.Vector3(-3.0, 3.5, 0.5), 180);
        cameraRotator.setZBound(-0.8, 1.8);
        cameraRotator.setZUpMultipler(5);
        cameraRotator.pause(true);

        mp.game.cam.renderScriptCams(true, false, 3000, true, false);
    }

	var lastData = false

    mp.events.add('autoSaloon.openBuyerMenu', (data) => {
		setTimeout(function () {
			setCursor(true);
		}, 200);
        //debug(`Test: ${JSON.stringify(data)}`);
        menu.execute(`window.events.call('autoSaloon', { enable: ${true}, event: 'enable' })`);
        menu.execute(`window.events.call('autoSaloon', { bizId: ${data.bizId}, event: 'bizId' })`);
        menu.execute(`window.events.call('autoSaloon', { catalogData: ${JSON.stringify(data.vehicles)}, event: 'catalogData' })`);
        menu.execute(`window.events.call('autoSaloon', { colorSelect: ${JSON.stringify(data.colorsCFG)}, event: 'colorSelect' })`);
        menu.execute(`window.events.call('autoSaloon', { dim: ${data.dim}, event: 'dim' })`);
        createCam(data.cam[0],data.cam[1],data.cam[2],data.cam[3],data.cam[4],data.cam[5],data.cam[6],data.cam[7],data.cam[8],data.cam[9]);
		lastData = data
        mp.game.ui.displayRadar(false);
    });

    mp.events.add('item.fixCarByKeys', (sqlId) => {
        var Data = mp.game.pathfind.getClosestVehicleNodeWithHeading(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, /*new mp.Vector3(-3.0, 3.5, 0.5),*/ 1, 5, 3.0, 0);
        var outPosition = JSON.stringify(Data.outPosition);
        var outHeading = JSON.stringify(Data.outHeading);
        mp.events.callRemote("item.fixCarByKeys", sqlId, outPosition, outHeading);
    });

    mp.events.add('autoSaloon.deleteVehicle', () => {
        cameraRotator.stop();
        if(auto.entity !== null) {
            auto.entity.destroy();
            auto = { model: null, color: null, entity: null };
        }
    });

    mp.events.add('autoSaloon.setStatusMenu', (enable) => {
        if(enable === true) {
            createCam(lastData.cam[0],lastData.cam[1],lastData.cam[2],lastData.cam[3],lastData.cam[4],lastData.cam[5],lastData.cam[6],lastData.cam[7],lastData.cam[8],lastData.cam[9]);
            mp.game.ui.displayRadar(false);
            menu.execute(`window.events.call('autoSaloon', { enable: ${true}, event: 'enable' })`);
        } else {
            mp.game.ui.displayRadar(true);
            menu.execute(`window.events.call('autoSaloon', { enable: ${false}, event: 'enable' })`);
        }
    });

    mp.events.add('autoSaloon.showCar', (car, dim) => { 
	   let carData = JSON.parse(car);
        
        if(auto.entity !== null) {
            auto.entity.model = mp.game.joaat(carData.model);
            auto.entity.position = vehPosition;
            auto.entity.setOnGroundProperly();
            auto.entity.setRotation(0, 0, 180, 2, true);
        } else {
            auto.entity = mp.vehicles.new(mp.game.joaat(carData.model), vehPosition,
            {
                heading: 180,
                numberPlate: 'TalRasha',
                locked: true,
                engine: false,
                dimension: lastData.dim
            });
			
            auto.entity.setOnGroundProperly();
            auto.entity.setRotation(0, 0, 180, 2, true);
        }

        cameraRotator.pause(false);
        
        let paramsCar = {
            maxSpeed: mp.game.vehicle.getVehicleModelMaxSpeed(mp.game.joaat(carData.model)), 
            braking: (mp.game.vehicle.getVehicleModelMaxBraking(mp.game.joaat(carData.model)) * 100).toFixed(2), 
            acceleration: (mp.game.vehicle.getVehicleModelAcceleration(mp.game.joaat(carData.model)) * 100).toFixed(2), 
            controllability: mp.game.vehicle.getVehicleModelMaxTraction(mp.game.joaat(carData.model)).toFixed(2),
            //classCar: auto.entity.getClass(),
            maxPassagersCar: mp.game.vehicle.getVehicleModelMaxNumberOfPassengers(mp.game.joaat(carData.model)),
            maxSpeedKm: ((mp.game.vehicle.getVehicleModelMaxSpeed(mp.game.joaat(carData.model)) * 3.6).toFixed(0)), 
        }

        menu.execute(`window.events.call('autoSaloon', { selectCarParam: ${JSON.stringify(paramsCar)}, event: 'selectCarParam' })`);

    });

	mp.events.add('autoSaloon.testDriveStartDonate', () => {
        startTestDriveDonate = new Date().getTime();
        checkTestDriveDonate = true;
		mp.players.local.vehicle.setOnGroundProperly();
    });

    mp.events.add('autoSaloon.testDriveStart', () => {
        cameraRotator.pause(true);
        startTestDrive = new Date().getTime();
        checkTestDrive = true;
		mp.players.local.vehicle.setOnGroundProperly();
        mp.events.call("autoSaloon.setStatusMenu", false);
    });

    mp.events.add('autoSaloon.setActive', (enable) => {
        mp.autoSaloonActive = enable;
    });

    mp.events.add('autoSaloon.updateColor', (data) => {
        let colorData = JSON.parse(data);
        auto.entity.setColours(colorData.sqlId, 0);
    });

    mp.events.add('autoSaloon.destroyCam', () => {
        cameraRotator.stop();
        if (!camera) return;
        camera.setActive(false);
        mp.game.cam.renderScriptCams(false, false, 3000, true, false);
        camera.destroy();
        camera = null;
	});
}
