module.exports = {
    "trucker.buyTrailer": (player, count) => {
        //debug(`trucker.buyTrailer: ${player.name} ${count}`)
        count = Math.clamp(parseInt(count), 1, 50);
        if (!player.colshape || !player.colshape.truckerLoad) return player.utils.warning(`Необходимо находиться у загрузки груза!`);
        if (player.job != 5) return player.utils.error(`Вы не работаете дальнобойщиком!`);
        let veh = player.trucker;
        if (!veh) return player.utils.error(`Арендуйте транспорт!`);
        var dist = player.dist(veh.position);
        if (dist > 20) return player.utils.error(`Транспорт далеко!`);

        var skill = mp.trucker.getSkill(player.jobSkills[5 - 1]);
        var maxLoad = mp.trucker.getMaxLoad(veh.name);
        if (count > maxLoad) return player.utils.error(`Максимальная грузоподъемность транспорта ${maxLoad} тонн!`);

        var maxPlayerLoad = 4 + skill.level;
        if (count > maxPlayerLoad) return player.utils.error(`Навыки Вашей профессии позволяют загрузить не более ${maxPlayerLoad} тонн!`);

        var truckerLoad = player.colshape.truckerLoad;

        var price = truckerLoad.price * count;
        if (player.money < price) return player.utils.error(`Необходимо: ${price}$`);

        var now = parseInt(new Date().getTime() / 1000);
        if (player.nextBuyTrailer) {
            if (now < player.nextBuyTrailer) return player.utils.error(`Груз подготавливается, ожидайте ${player.nextBuyTrailer - now} секунд!`);
        }
        player.nextBuyTrailer = now + 7 * 60;

        veh.loadType = truckerLoad.loadType;
        veh.loadCount = count;

        player.utils.setMoney(player.money - price);
		
		if (player.job == 5) { //дальнобойщик
            if (veh) {
                if (!veh.loadCount) return player.utils.error(`Фура пустая!`);
                var maxLoad = mp.trucker.getMaxLoad(veh.name);
                veh.trailerId = veh.id;
				player.utils.success(`Вы заплатили за заказ ${price}$`);
				player.call("setNewWaypoint", [-771.16, -2632.26]);
                player.utils.info(`Загружено: ${veh.loadCount}/${maxLoad} тонн`);
            } else {
                if (player.colshape) if (player.colshape.truckerReceiver) return;
				player.utils.warning(`Для продажи товара необходимо иметь транспорт`);
            }
        }

        // TODO: Игнорить мелкие лвлы для смены цены груза.
        if (true /*count / maxPlayerLoad > 0.8 && skill.level >= 15*/ ) {
            //изменяем цены
            truckerLoad.price += 10;
            if (truckerLoad.price > 90) truckerLoad.price = 90;
            truckerLoad.label.text = `${truckerLoad.loadTypeName}\n ~b~Тонна: ~w~${truckerLoad.price}$`;
            for (var i = 0; i < mp.truckerData.loadPoints.length; i++) {
                var point = mp.truckerData.loadPoints[i];
                if (point.loadType == truckerLoad.loadType && point.id != truckerLoad.id) {
                    point.price -= 10;
                    if (point.price < 10) point.price = 10;
                    point.label.text = `${point.loadTypeName}\n ~b~Тонна: ~w~${point.price}$`;
                }
            }
        }

    }
}
