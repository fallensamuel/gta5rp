module.exports.Init = function() {
    mp.truckerData = {};

    initTruckerUtils();
    initLoadPoints();
    initLoadReceivers();
}

function initTruckerUtils() {
	mp.blips.new(477, new mp.Vector3(-848.36, -2688.42, 13.81), { name: 'Дальнобойщик', scale: 1, color: 18, shortRange: true});
	mp.blips.new(477, new mp.Vector3(891.17, -3145.72, 5.90), { name: 'Дальнобойщик', scale: 1, color: 18, shortRange: true});
    mp.trucker = {
        getSkill: (exp) => {
            if (exp < 8) return {
                level: 1,
                rest: exp
            };
            if (exp >= 5096) return {
                level: 50,
                rest: exp - 5096
            };
            var i = 2;
            var add = 16;
            var temp = 20;
            while (i < 100000) {
                if (exp < temp) return {
                    level: i,
                    rest: exp - (temp - add + 4)
                };
                i++;
                temp += add;
                add += 4;
            }
            return -1;
        },
        getMaxLoad: (vehModel) => {
            var models = ["pounder", "pounder", "pounder"];
            var index = models.indexOf(vehModel);
            if (index == -1) return 0;
            var maxLoads = [15, 30, 60];
            return maxLoads[index];
        },
        getMinLevel: (vehModel) => {
            var models = ["pounder", "pounder", "pounder"];
            var index = models.indexOf(vehModel);
            if (index == -1) return 1;
            var levels = [1, 15, 25];
            return levels[index];
        },
    };
}

mp.labels.new('Даниил', new mp.Vector3(-848.262, -2687.83, 13.8121 + 1.0), { los: false, font: 0, drawDistance: 7, color: [255, 255, 255, 255] });
mp.labels.new('Даниил', new mp.Vector3(891.296, -3146.25, 5.9008 + 1.0), { los: false, font: 0, drawDistance: 7, color: [255, 255, 255, 255] });

function initLoadPoints() {
    mp.truckerData.loadPoints = [];

    var positions = [
        new mp.Vector3(-264.25, 6064.69, 30.46), new mp.Vector3(72.16, 6353.03, 31.38),
        new mp.Vector3(2672.31, 3516.61, 51.71)
    ];
    var loadTypes = [1, 1, 2];
    var loadTypeNames = ["Газ", "Запчасти", "Продукты"];
    var prices = [40, 60, 40];

    var blipColors = [1, 1, 1];
    var blipNames = [`Газ`, `Запчасти`, `Супермаркет`];
    for (var i = 0; i < positions.length; i++) {
        var pos = positions[i];

        var marker = mp.markers.new(1, pos, 6, {
            color: [0, 187, 255, 100],
            visible: false
        });

        marker.loadType = loadTypes[i];
        marker.loadTypeName = loadTypeNames[i];
        marker.price = prices[i];

        var blip = mp.blips.new(1, pos, {
            color: blipColors[i],
            name: blipNames[i],
            scale: 1,
            shortRange: true
        });

        marker.label = mp.labels.new(`${loadTypeNames[i]}\n ~b~Тонна: ~w~${prices[i]}$`, new mp.Vector3(pos.x, pos.y, pos.z + 2), {
            los: true,
            font: 4,
            drawDistance: 30,
            color: [0, 187, 255, 255],
        });

        var colshape = mp.colshapes.newCircle(pos["x"], pos["y"], 60);
        colshape.marker = marker;

        //дл¤ отловки событи¤ входа в маркер
        var colshape = mp.colshapes.newSphere(pos["x"], pos["y"], pos["z"] + 1, 3); //+1 to fix bug
        colshape.truckerLoad = marker;
        colshape.menuName = "trucker_load";

        mp.truckerData.loadPoints.push(marker);
    }

}

function initLoadReceivers() {
    mp.truckerData.loadReceivers = [];

    var positions = [new mp.Vector3(1188.40, -3098.71, 4.85), new mp.Vector3(-771.16, -2632.26, 12.81)];

    var prices = [
        [60, 40, 60],
        [40, 60, 40]
    ];
    var blips = [1, 1];
    var blipNames = [`Сдача груза`, `Сдача груза`];

    for (var i = 0; i < positions.length; i++) {
        var pos = positions[i];
        var marker = mp.markers.new(1, pos, 6, {
            color: [0, 187, 255, 100],
            visible: false
        });
        marker.prices = prices[i];

        var blip = mp.blips.new(blips[i], pos, {
            color: 1,
            scale: 1,
            name: blipNames[i],
            shortRange: true
        });

        marker.label = mp.labels.new(`~g~Газ: ~w~${prices[i][0]}$\n ~y~Запчасти: ~w~${prices[i][1]}$\n ~b~Продукты: ~w~${prices[i][2]}$`, new mp.Vector3(pos.x, pos.y, pos.z + 2), {
            los: true,
            font: 4,
            drawDistance: 30,
            color: [0, 187, 255, 255],
        });

        var colshape = mp.colshapes.newCircle(pos["x"], pos["y"], 60);
        colshape.marker = marker;

        //дл¤ отловки событи¤ входа в маркер
        colshape = mp.colshapes.newSphere(pos["x"], pos["y"], pos["z"] + 1, 3); //+1 to fix bug
        colshape.truckerReceiver = marker;

        mp.truckerData.loadReceivers.push(marker);
    }
}

mp.events.add("playerEnterVehicle", function playerEnterVehicleHandler(player, vehicle, seat) {
    if (vehicle.trucker) {
        if (!mp.players.exists(vehicle.trucker)) delete vehicle.trucker;
        else if (vehicle.trucker.trucker != vehicle) delete vehicle.trucker;
        else if (vehicle.trucker != player) {
          player.utils.error("Данный транспорт уже занят другим рабочим!");
          player.removeFromVehicle();
        } else {
          player.call("time.remove.back.trucker");
        }
        return;
    }
    if (vehicle.owner === -5 && player.job === 5 && seat === 0) {
        if (!vehicle.trucker) {
          if (player.trucker) {
            player.removeFromVehicle();
            return player.utils.error("У вас уже есть арендованный транспорт!");
          }
          var skill = mp.trucker.getSkill(player.jobSkills[5 - 1]);
          let vehSkill = mp.trucker.getMinLevel(vehicle.name);
          if (skill.level < vehSkill) {
              player.removeFromVehicle();
              return player.utils.error(`Ваш навык для этого транспорта не подходит: ${skill.level}/${vehSkill}`);
          }
          /*if (!player.licenses[3]) {
             player.outputChatBox(`!{red}[Ошибка] !{white}Требуется ${mp.getLicName(3).toLowerCase()}!`);
             player.removeFromVehicle();
             return;
          }*/
          vehicle.trucker = player;
          player.trucker = vehicle;
          player.utils.success(`Вы начали рабочий день`);
      }
    }
});

mp.events.add("leave.trucker.job", (player) => {
    try
    {
      leaveJob(player);
    }
    catch (err) {
        console.log(err);
        return;
    }
});

mp.events.add("playerExitVehicle", function playerExitVehicleHandler(player, vehicle) {
    if (vehicle.owner === -5 && player.job === 5) {
      if (vehicle === player.trucker) {
        player.call("time.add.back.trucker", [300000]);
		player.utils.error(`У вас есть 5 минут, чтобы вернуться в транспорт.`);
      }
    }
});

mp.events.add("job.trucker.agree", (player) => {
  if (player.job !== 0 && player.job !== 5) return player.utils.error(`Вы уже где-то работаете!`);
  if (player.job === 5) {
      leaveJob(player);
  } else {
	  player.utils.success(`Вы устроились Дальнобойщиком!`);
      player.utils.changeJob(5);
  }
});

mp.events.add("playerQuit", function playerQuitHandler(player, exitType, reason) {
    if (player.job === 5) {
      leaveVehicle(player);
    }
});

mp.events.add("playerDeath", function playerDeathHandler(player, reason, killer) {
	if (!player.getVariable("knockDown")) return;
    if (player.job === 5) {
        leaveJob(player);
    }
});

function leaveJob(player) {
	player.utils.success(`Вы уволились из Дальнобойщиков!`);
    leaveVehicle(player);
    player.utils.putObject();
    player.utils.changeJob(0);
}

function leaveVehicle(player) {
    let vehicle = player.trucker;
    let trailer = player.trailer;
    delete player.trucker;
    delete player.trailer;
    if (vehicle) {
      // forks_attach
      if (vehicle === vehicle) player.removeFromVehicle();
      player.call("time.remove.back.trucker");
      setTimeout(() => {
        try {
          vehicle.repair();
          vehicle.dimension = 0;
          vehicle.position = vehicle.spawnPos;
          vehicle.rotation = new mp.Vector3(0, 0, vehicle.spawnPos.h);
          vehicle.utils.setFuel(vehicle.vehPropData.maxFuel);
          vehicle.engine = false;
          if (trailer) trailer.destroy();
          delete vehicle.trucker;
        } catch (err) {
            console.log(err);
            return;
        }
      }, 200);
    }
};
