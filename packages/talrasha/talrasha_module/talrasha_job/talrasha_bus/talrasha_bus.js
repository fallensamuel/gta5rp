const JobBus = {
  bus_route: [],
  functions: {
    leaveJob(player) {
      player.utils.success(`Вы уволились из Автобусного Парка!`);
      player.utils.changeJob(0);
      player.call("clear.bus.data");
    },
    paySalary(player) {
      if (!player.busist || player.job != 2) return player.utils.error(`Вы не можете получить зарплату!`);
      if (player.busist != player.vehicle) return player.utils.error(`Вы не в автобусе!`);
      let money = JobBus.bus_route[player.vehicle.bussalary].salary;
      player.utils.success(`Вы заработали ${money}$`);
      player.utils.setMoney(player.money + money);
      delete player.vehicle.bussalary;
    },
    leaveVehicle(player) {
      let vehicle = player.busist;
      delete player.busist;
      if (vehicle) {
        if (vehicle === vehicle) player.removeFromVehicle();
        removeAllHumansFromVehicle(vehicle);
        player.call("time.remove.back.bus");
        setTimeout(() => {
          try {
            vehicle.repair();
            vehicle.dimension = 0;
            vehicle.position = vehicle.spawnPos;
            vehicle.rotation = new mp.Vector3(0, 0, vehicle.spawnPos.h);
            vehicle.utils.setFuel(vehicle.vehPropData.maxFuel);
            vehicle.engine = false;
            delete vehicle.busist;
          } catch (err) {
              console.log(err);
              return;
          }
        }, 200);
      }
    }
  }
};
module.exports = {
    Init: () => {
        DB.Handle.query("SELECT * FROM talrasha_bus_route", (e, result) => {
           for (let i = 0; i < result.length; i++) JobBus.bus_route[result[i].id] = { name: result[i].name, salary: result[i].money, places: [] };
		   
		   console.log(`\x1b[32m[DONE]\x1b[0m "Bus routes" package has been loaded: \x1b[33m` + result.length + `\x1b[0m.`);
           DB.Handle.query("SELECT * FROM talrasha_bus_place", (e, bus) => {
              for (let i = 0; i < bus.length; i++) {
                JobBus.bus_route[bus[i].bus].places.push({ id: bus[i].id, x: bus[i].x, y: bus[i].y, z: bus[i].z, type: bus[i].type });
              }
			  
			  console.log(`\x1b[32m[DONE]\x1b[0m "Bus place" package has been loaded: \x1b[33m` + bus.length + `\x1b[0m.`);
           });
        });
    }
}

mp.blips.new(513, new mp.Vector3(-784.70, -2350.80, 14.57), {
    alpha: 255,
    color: 25,
    scale: 1,
    name: "Автобусный Парк",
    shortRange: true
});

mp.blips.new(513, new mp.Vector3(-2187.01, -388.09, 13.36), {
    alpha: 255,
    color: 25,
    scale: 1,
    name: "Автобусный Парк",
    shortRange: true
});

mp.labels.new('Даниил', new mp.Vector3(-784.70, -2350.80, 14.57 + 1.0), { los: false, font: 0, drawDistance: 7, color: [255, 255, 255, 255] });
mp.labels.new('Даниил', new mp.Vector3(-2187.01, -388.09, 13.36 + 1.0), { los: false, font: 0, drawDistance: 7, color: [255, 255, 255, 255] });

mp.events.add("job.bus.agree", (player) => {
    try {
        if (player.job !== 0 && player.job !== 2) return player.utils.error(`Вы уже где-то работаете!`);
        if (player.job === 2) {
          JobBus.functions.leaveJob(player);
          JobBus.functions.leaveVehicle(player);
        }
        else {
			player.utils.success(`Вы устроились в Автобусный Парк!`);
			
            player.utils.changeJob(2);
        }
    } catch (err) {
        console.log(err);
        return;
    }
});

mp.events.add("rent.bus.vehicle", (player, id) => {
    try {
        let vehicle = player.vehicle;
        if (player.job !== 2) return player.utils.error(`Вы не работаете в Автобусном Парке!`);
        else if (!vehicle || !vehicle.owner === -2) return player.utils.error(`Вы не можете арендовать транспорт`);
        else if (vehicle.busist && vehicle.busist != player) {
          player.removeFromVehicle();
          return player.utils.error(`Данный автобус уже занят`);
        }
        else {
          if (!haveLicense(player, vehicle)) {
               player.outputChatBox(`!{red}[Ошибка] !{white}Требуется ${mp.getLicName(3).toLowerCase()}!`);
               player.removeFromVehicle();
               return;
           }
           player.call("selectMenu.hide");
           player.utils.success(`Следуйте по маршруту!`);
           player.call("freezeEntity", [vehicle, false]);
           vehicle.bussalary = id;
           player.busist = vehicle, vehicle.busist = player;
           player.call("start.bus.mash", [vehicle, JobBus.bus_route[id].places]);
        }
    } catch (err) {
        console.log(err);
        return;
    }
});
mp.events.add("playerQuit", function playerQuitHandler(player, exitType, reason) {
  if (player.job === 2) JobBus.functions.leaveVehicle(player);
});
mp.events.add("leave.bus.job", (player) => {
  JobBus.functions.leaveJob(player);
  JobBus.functions.leaveVehicle(player);
});
mp.events.add("pay.bus.salary", (player) => {
  JobBus.functions.paySalary(player);
});

mp.events.add("playerEnterVehicle", function playerEnterVehicleHandler(player, vehicle, seat) {
	if (vehicle.owner === -2 && seat === 0) {
		if (player.job !== 2 && seat === 0) {
			player.removeFromVehicle();
			player.utils.error(`Вы не работаете автобусником!`);
		}
	}
	if (vehicle.owner === -2 && player.job === 2 && seat === 0) {
    if (vehicle.busist && vehicle.busist != player) {
      player.removeFromVehicle();
      player.utils.error(`Данный автобус уже занят`);
    }
    else if (player.busist && player.busist != vehicle) {
      player.removeFromVehicle();
      player.utils.error(`Данный автобус уже занят`);
    }
    else if (player.busist == vehicle) {
      player.call("time.remove.back.bus");
      if (!vehicle.bussalary) {
        player.call("freezeEntity", [vehicle, true]);
        player.call("selectMenu.show", ["bus_mash"]);
      }
    }
    else {
      player.call("freezeEntity", [vehicle, true]);
      player.call("selectMenu.show", ["bus_mash"]);
	  player.call("show.bus.menu", [player.name]);
    }
  } else if (vehicle.owner === -2) {
    let driver = seat === 0
    if (!vehicle.busist) {
      player.removeFromVehicle();
      return player.utils.error(`Данный автобус не работает из-за отсутствия водителя!`);
    } else if (!driver || !driver.busist) {
      player.removeFromVehicle();
      return player.utils.error(`Водитель покинул своё рабочее место, дождитесь его прихода!`);
    }

    let salary = 15;
    player.utils.setMoney(player.money - salary);
    player.utils.warning("Вы заплатили $" + salary + " за проезд!");
    driver.utils.setMoney(driver.money + salary);
    driver.utils.success("Вам зачислено $" + salary + " за пассажира!");
  }
});
mp.events.add("playerExitVehicle", function playerExitVehicleHandler(player, vehicle) {
  if (vehicle.owner === -2 && player.job === 2 && vehicle.busist == player) {
    if (!vehicle.bussalary) {
      player.call("time.add.back.bus", [15000]);
      player.utils.error(`У вас есть 15 секунд, чтобы вернуться в транспорт.`);
      return;
    }
    player.call("time.add.back.bus", [180000]);
    player.utils.error(`У вас есть 3 минуты, чтобы вернуться в транспорт.`);
  }
});
mp.events.add("playerStartExitVehicle", function playerStartExitVehicleHandler(player) {
  let vehicle = player.vehicle;
  if (vehicle.owner === -2 && player.job === 2) if (!vehicle.busist) player.call("selectMenu.hide");  // player.veh доп проверка убрана
});

function removeAllHumansFromVehicle(vehicle) {
    try {
        let array = vehicle.getOccupants();
        for (let i = 0; i < array.length; i++) array[i].removeFromVehicle();
    } catch (err) {
        console.log(err);
        return;
    }
};


function haveLicense(player, vehicle) {
    if (!vehicle.license) return true;
    var docs = player.inventory.getArrayByItemId(16);
    for (var sqlId in docs) {
        if (docs[sqlId].params.licenses.indexOf(vehicle.license) != -1) return true;
    }
    return false;
}