const RentInfo = {
    price: 0,
    time: 10000 // 1 минута
}

mp.events.add("playerQuit", function playerQuitHandler(player, exitType, reason) {
    if (player.rent_owner) leaveRent(player);
});
function getPlayerSelfVehicleByKeys(player){
    if(!player.inventory) return undefined
    let keys = player.inventory.getArrayByItemId(54);
    if (!keys) return player.utils.error(`Ключи авто не найдены!`) 
    let cars = []
    for (let key in keys) {
        let veh = mp.vehicles.getBySqlId(keys[key].params.car)
        if(veh && veh.sqlId){
            cars.push(veh)
        }
    }
    return cars
}
mp.events.add("server::carOpeningSwitch", (player) => {
    if(!player.sqlId) return
    let playerCars = getPlayerSelfVehicleByKeys(player)
    let closestVehicle = undefined
    let maxDist = 5000
    mp.vehicles.forEachInRange(player.position, 5, (veh) => {
        let vehicle = mp.vehicles.getBySqlId(veh.sqlId)
        if(!vehicle || !vehicle.sqlId) return
        let ownerVehicle 
        if(playerCars && playerCars.indexOf(vehicle) != -1){
            ownerVehicle = mp.vehicles.getBySqlId(playerCars[playerCars.indexOf(vehicle)].sqlId)
        }
        if(ownerVehicle && ownerVehicle == vehicle){
            let dist = player.dist(ownerVehicle.position) 
            if(dist < maxDist) {
                maxDist = dist
                closestVehicle = ownerVehicle
            } 
        } 
    })
    if(!closestVehicle || closestVehicle.sqlId == undefined) return 
    let vehicle = mp.vehicles.getBySqlId(closestVehicle.sqlId)
    if(vehicle.locked){  
        vehicle.setVariable("isLockCar", false)
        vehicle.locked = false
		player.utils.success("Вы открыли двери машины");
    }
    else{ 
        vehicle.setVariable("isLockCar", true)
        vehicle.locked = true  
		player.utils.success("Вы закрыли двери машины");
    }

})
mp.events.add("playerQuit", function playerQuitHandler(player, exitType, reason) {
    if (player.rent_owner) leaveRent(player);
});
mp.events.add("playerEnterVehicle", function playerEnterVehicleHandler(player, vehicle, seat) {
    try {
        if (vehicle.owner === -4001 && seat === 0) {
            if (vehicle.rent_owner) {
                if (!mp.players.exists(vehicle.rent_owner)) {
                  delete vehicle.rent_owner;
                  return;
                } else if (vehicle.rent_owner.rent_owner != vehicle) {
                  delete vehicle.rent_owner;
                  return;
                } else if (vehicle.rent_owner === player) {
                  player.call("control.rent.vehicle.time", [0]);
                  return;
                } else {
                    player.removeFromVehicle();
                    player.utils.error("Данный транспорт уже арендован!");
                    return;
                }
            }
            player.call("start.rent.vehicle", [RentInfo.price]);
        }
    } catch (err) {
        console.log(err);
        return;
    }
});
mp.events.add("playerExitVehicle", function playerExitVehicleHandler(player, vehicle) {
    try {
        if (vehicle.owner === -4001 && player.seat === 0) {
            if (vehicle.rent_owner === player) {
                player.call("control.rent.vehicle.time", [RentInfo.time]);
                player.utils.error("У вас есть 60 секунд, чтобы вернуться в транспорт!");
            } else {
                player.call("stop.rent.vehicle", [false]);
            }
        }
    } catch (err) {
        console.log(err);
        return;
    }
});

function leaveRent(player) {
    let vehicle = player.rent_owner;
    if (vehicle) {
        delete player.rent_owner;
        delete vehicle.rent_owner;
        removePlayersFromVehicle(vehicle);
        player.utils.error("Ваш скутер отбуксирован!");
        setTimeout(() => {
            try {
				vehicle.destroy();
            } catch (err) {
                console.log(err);
                return;
            }
        }, 200);
    }
}
mp.events.add("delete.vehicle.faggio.rent", (player) => {
    leaveRent(player);
});

function rentVehicle(player) {
  //let vehicle = player.vehicle;
  if (player) {
    if (player.money < RentInfo.price) {
      player.utils.warning("У вас недостаточно средств!");
      player.removeFromVehicle();
      return;
    }

    if (player.rent_owner !== undefined) {
      player.utils.info("Вы уже арендовали скутер!");
      player.removeFromVehicle();
      return;
    }
		var pos = player.position;
		pos.x += 2.0;
		pos.y += 2.0
		
		let veh = createVeh({
			model: mp.joaat("faggio"),
			pos: pos,
			h: 60,
		})
		
		veh.owner = -4001;

        player.utils.setMoney(player.money - RentInfo.price);
        player.utils.success(`Вы арендовали скутер за ${RentInfo.price}$`);
		
        player.rent_owner = veh, veh.rent_owner = player;
        veh.utils.setFuel(veh.vehPropData.maxFuel);
        player.call("stop.rent.vehicle", [false]);
    }
}
mp.events.add("rent.vehicle.faggio", (player) => {
    rentVehicle(player);
});

function removePlayersFromVehicle(vehicle) {
    try {
        let array = vehicle.getOccupants();
        for (let i = 0; i < array.length; i++) array[i].removeFromVehicle();
    } catch (err) {
        console.log(err);
        return;
    }
}

let createVeh = (car)=>{
	let veh = mp.vehicles.new(car.model,car.pos ,{
		heading: car.h,
	})
	
	return veh;
}