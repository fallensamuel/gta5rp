// Создание BLIP
mp.blips.new(356, new mp.Vector3(-456.71, -2750.073, 6.000), {
    name: 'Портовый рабочий',
    scale: 1,
    shortRange: true
}); // Блип на карте
mp.labels.new('Прораб', new mp.Vector3(-457.063, -2750.79, 6.00021 + 1.0), { los: false, font: 0, drawDistance: 7, color: [255, 255, 255, 255] })
let jobWaterFrontColShape = mp.colshapes.newSphere(-456.71, -2750.073, 6.000, 1.5);
let jobWaterFrontColShapeClothes = mp.colshapes.newSphere(-456.50, -2753.29, 6.00, 1);
let radiusColShape = mp.colshapes.newSphere(-456.71, -2750.073, 6.00, 190);
const JobWaterFront = {
    markers: [{
            pos: new mp.Vector3(-430.41, -2741.93, 6.00),
            money_x: 1
        },
        {
            pos: new mp.Vector3(-428.18, -2739.60, 6.00),
            money_x: 1
        },
        {
            pos: new mp.Vector3(-426.11, -2741.59, 6.00),
            money_x: 1
        },
    ],
    storage: new mp.Vector3(-459.48, -2717.68, 6.00),
    load_num: [11, 12, 13, 15, 17, 18, 20]
};

function putBox(player) {
  try {
    if (player.waterfrontfloor === undefined) return;
    player.utils.putObject();
    let money = Math.round(mp.economy["waterfront_salary"].value * JobWaterFront.markers[player.waterfrontfloor].money_x);
    player.utils.success(`Заработано: ${money}$`);
    player.utils.setMoney(player.money + money);
    delete player.waterfrontfloor;
    delete player.boxwaterfront;
    sendBox(player);
  } catch (err) {
      console.log(err);
      return;
  }
}

function takeBox(player) {
    if (player.waterfrontfloor === undefined) return;
    player.utils.takeObject("hei_prop_heist_wooden_box");
    player.call("create.watefront.item", [true, true, 2, JobWaterFront.storage.x, JobWaterFront.storage.y, JobWaterFront.storage.z]);
    player.utils.warning("Вы взяли груз, отнесите его на склад");
    player.boxwaterfront = true;
}

function sendBox(player) {
    if (player.waterfrontfloor !== undefined) return;
    let place = getRandomNumber(0, JobWaterFront.markers.length);
    player.call("create.watefront.item", [true, false, 1, JobWaterFront.markers[place].pos.x, JobWaterFront.markers[place].pos.y, JobWaterFront.markers[place].pos.z]);
    player.waterfrontfloor = place;
    player.utils.warning("Отлично! Отправляйтесь за новым грузом.");
}

function stopBringingBox(player) {
  try {
    let place = getRandomNumber(0, JobWaterFront.markers.length);
    player.call("create.watefront.item", [true, false, 1, JobWaterFront.markers[place].pos.x, JobWaterFront.markers[place].pos.y, JobWaterFront.markers[place].pos.z]);
    player.waterfrontfloor = place;
    delete player.boxwaterfront;
  } catch (err) {
      console.log(err);
      return;
  }
}
module.exports.stopBringingBox = stopBringingBox;

mp.events.add("use.watefrontfunctions.job", (player, num) => {
    try {
        switch (num) {
            case 1:
                if (player.vehicle) {
                    if (player.vehicle === player.porter && player.st_porter);
                } else {
                    if (!player.st_porter) takeBox(player);
                }
                break;
            case 2:
                if (player.vehicle && player.st_porter) {
                    if (player.vehicle === player.porter);
                } else {
                    if (!player.st_porter) putBox(player);
                }
                break;
        }
    } catch (err) {
        console.log(err);
        return;
    }
});
mp.events.add("playerEnterColshape", function onPlayerEnterColShape(player, shape) {
    try {
        if (!player.vehicle) {
            if (shape === jobWaterFrontColShape) player.call("getWaterFrontJobStatus", [player.job !== 8 ? false : true]);
        }
    } catch (err) {
        console.log(err);
        return;
    }
});
mp.events.add("playerDeath", function playerDeathHandler(player, reason, killer) {
	if (!player.getVariable("knockDown")) return;
    /*
    if (player.job === 8) {
      if (player.jobcloth !== undefined) {
        player.utils.success("Вы уволились с порта!");
        if (player.emoney > 0) {
          player.utils.setMoney(player.money + player.emoney);
          player.utils.info(`Заработано: ${player.emoney}$`);
        }
        delete player.body.denyUpdateView;
        player.body.loadItems();
        player.call("create.watefront.item", [ false, false, -1, 0, 0, 0]);
        player.utils.changeJob(0);
        delete player.emoney, delete player.jobcloth, delete player.waterfrontfloor, delete player.boxwaterfront, delete player.st_porter;
      }
    }*/
    leavePort(player);
});
mp.events.add("playerExitColshape", function onPlayerExitColShape(player, shape) {
    try {
        if (shape === jobWaterFrontColShape) player.call("getWaterFrontJobStatus", ["cancel"]);
        else if (shape === radiusColShape) leavePort(player);
    } catch (err) {
        console.log(err);
        return;
    }
});

function leavePort(player) {
    if (player.job === 8) {
        player.utils.success("Вы уволились с порта!");
        delete player.body.denyUpdateView;
        player.body.loadItems();
        player.utils.putObject();
        player.call("create.watefront.item", [false, false, -1, 0, 0, 0]);
        player.utils.changeJob(0);
        delete player.jobcloth, delete player.waterfrontfloor, delete player.boxwaterfront, delete player.st_porter;
    }
}
mp.events.add("leave.watefront.job", (player) => {
    try {
        leavePort(player);
    } catch (err) {
        console.log(err);
        return;
    }
});

mp.events.add("job.waterfront.agree", (player) => {
    try {
        if (player.job !== 0 && player.job !== 8) {
            player.utils.warning("Вы уже где-то работаете!");
            return;
        }

        if (player.job === 8) {
            /*if (player.jobcloth !== undefined) {
                player.utils.error("Вы не закончили рабочий день!");
                return;
            }*/
			if (player.boxwaterfront === true) {
				player.utils.error("Сначала отнесите ящик на склад!");
				return;
			}

			delete player.body.denyUpdateView;
			player.body.loadItems();
			 player.utils.success("Вы уволились с порта!");
			//player.utils.warning("Не забудьте забрать прибыль!");
			delete player.jobcloth;
			delete player.waterfrontfloor;
			delete player.boxwaterfront;
			delete player.st_porter;
			player.call("create.watefront.item", [false, false, -1, 0, 0, 0]);
            player.call("setWaterFrontJobStatus", [false]);
            player.utils.changeJob(0);
        } else {
			if (player.vehicle) return;
			//player.utils.success("Вы начали рабочий день!");
			player.jobcloth = true;
			sendBox(player);
			player.body.clearItems();
			player.body.denyUpdateView = true;
			if (player.sex === 1) {
				// Одежда мужская
				player.setClothes(3, 52, 0, 2);
				player.setClothes(4, 36, 0, 2);
				player.setClothes(6, 12, 0, 2);
				player.setClothes(8, 59, 1, 2);
				player.setClothes(11, 56, 0, 2);
				player.setProp(0, 2, 0);
			} else {
				// Одежда женская
				player.setClothes(3, 70, 0, 2);
				player.setClothes(4, 35, 0, 2);
				player.setClothes(6, 26, 0, 2);
				player.setClothes(8, 36, 0, 2);
				player.setClothes(11, 49, 0, 2);
				player.setProp(0, 12, 0);
			}
            player.utils.success("Вы устроились в порт!");
            player.utils.changeJob(8);
            //player.utils.info("Переоденьтесь для начала рабочего дня!");
            player.call("setWaterFrontJobStatus", [true]);
        }
    } catch (err) {
        console.log(err);
        return;
    }
});

function getRandomNumber(min, max) {
    try {
        return Math.floor(Math.random() * (max - min)) + min;
    } catch (err) {
        console.log(err);
        return -1;
    }
}
