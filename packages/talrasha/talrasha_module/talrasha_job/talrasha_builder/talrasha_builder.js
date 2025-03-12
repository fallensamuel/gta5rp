// Создание BLIP
mp.blips.new(566, new mp.Vector3(143.078, -368.207, 43.4861), {
    name: 'Стройка',
    scale: 1,
    shortRange: true
}); // Блип на карте
mp.labels.new('Прораб', new mp.Vector3(143.078, -368.207, 43.4861 + 1.0), { los: false, font: 0, drawDistance: 7, color: [255, 255, 255, 255] })
let jobBuilderColShape = mp.colshapes.newSphere(143.078, -368.207, 43.4861, 1.5);
let jobBuilderColShapeClothes = mp.colshapes.newSphere(143.078, -368.207, 43.4861, 1);
let radiusColShape = mp.colshapes.newSphere(143.078, -368.207, 43.4861, 190);
const JobBuilder = {
    markers: [{
            pos: new mp.Vector3(22.59, -407.67, 45.56),
            money_x: 1
        },
        {
            pos: new mp.Vector3(34.45, -376.64, 45.50),
            money_x: 1
        },
        {
            pos: new mp.Vector3(57.65, -378.12, 45.56),
            money_x: 1
        },
		{
            pos: new mp.Vector3(32.88, -444.17, 45.56),
            money_x: 1
        },
		{
            pos: new mp.Vector3(47.46, -409.05, 45.56),
            money_x: 1
        },
    ],
    storage: new mp.Vector3(43.02, -412.11, 45.56)
};

function putBox(player) {
  try {
    if (player.builderfloor === undefined) return;
    player.utils.putObject();
    let money = Math.round(mp.economy["build_salary"].value * JobBuilder.markers[player.builderfloor].money_x);
    player.utils.success(`Заработано: ${money}$`);
    player.utils.setMoney(player.money + money);
    delete player.builderfloor;
    delete player.boxbuilder;
    sendBox(player);
  } catch (err) {
      console.log(err);
      return;
  }
}

function takeBox(player) {
    if (player.builderfloor === undefined) return;
    player.utils.takeObject("hei_prop_heist_wooden_box");
    player.call("create.watefront.item", [true, true, 2, JobBuilder.storage.x, JobBuilder.storage.y, JobBuilder.storage.z]);
    player.utils.warning("Вы взяли груз, отнесите его на склад");
    player.boxbuilder = true;
}

function sendBox(player) {
    if (player.builderfloor !== undefined) return;
    let place = getRandomNumber(0, JobBuilder.markers.length);
    player.call("create.watefront.item", [true, false, 1, JobBuilder.markers[place].pos.x, JobBuilder.markers[place].pos.y, JobBuilder.markers[place].pos.z]);
    player.builderfloor = place;
    player.utils.warning("Отлично! Отправляйтесь за новым грузом.");
}

function stopBringingBox(player) {
  try {
    let place = getRandomNumber(0, JobBuilder.markers.length);
    player.call("create.watefront.item", [true, false, 1, JobBuilder.markers[place].pos.x, JobBuilder.markers[place].pos.y, JobBuilder.markers[place].pos.z]);
    player.builderfloor = place;
    delete player.boxbuilder;
  } catch (err) {
      console.log(err);
      return;
  }
}
module.exports.stopBringingBox = stopBringingBox;

mp.events.add("use.builderfunctions.job", (player, num) => {
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
            if (shape === jobBuilderColShape) player.call("getBuilderJobStatus", [player.job !== 8 ? false : true]);
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
        delete player.emoney, delete player.jobcloth, delete player.builderfloor, delete player.boxbuilder, delete player.st_porter;
      }
    }*/
    leavePort(player);
});
mp.events.add("playerExitColshape", function onPlayerExitColShape(player, shape) {
    try {
        if (shape === jobBuilderColShape) player.call("getBuilderJobStatus", ["cancel"]);
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
        delete player.jobcloth, delete player.builderfloor, delete player.boxbuilder, delete player.st_porter;
    }
}
mp.events.add("leave.builder.job", (player) => {
    try {
        leavePort(player);
    } catch (err) {
        console.log(err);
        return;
    }
});

mp.events.add("job.builder.agree", (player) => {
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
			if (player.boxbuilder === true) {
				player.utils.error("Сначала отнесите ящик на склад!");
				return;
			}

			delete player.body.denyUpdateView;
			player.body.loadItems();
			 player.utils.success("Вы уволились со стройки!");
			//player.utils.warning("Не забудьте забрать прибыль!");
			delete player.jobcloth;
			delete player.builderfloor;
			delete player.boxbuilder;
			delete player.st_porter;
			player.call("create.watefront.item", [false, false, -1, 0, 0, 0]);
            player.call("setBuilderJobStatus", [false]);
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
            player.utils.success("Вы устроились на стройку!");
            player.utils.changeJob(8);
            //player.utils.info("Переоденьтесь для начала рабочего дня!");
            player.call("setBuilderJobStatus", [true]);
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
