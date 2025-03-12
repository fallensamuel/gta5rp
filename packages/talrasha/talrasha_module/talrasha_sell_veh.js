module.exports = {
    Init: () => {
        createSellMarker();
    }
}

function createSellMarker() {
    var pos = new mp.Vector3(-457.07, -1712.54, 17.64);
    var marker = mp.markers.new(1, pos, 10, {
        color: [187, 255, 0, 70],
        visible: false
    });
	

    //для стриминга
    var colshape = mp.colshapes.newCircle(pos.x, pos.y, 60);
    colshape.marker = marker;
    marker.showColshape = colshape;

    //для отловки события входа
    var colshape = mp.colshapes.newSphere(pos.x, pos.y, pos.z, 7);
    colshape.sellMarker = marker;
    marker.colshape = colshape;
}


mp.events.add("sell.veh.playerMenu", (player, sqlId) => {
	for (var i = 0; i < player.cars.length; i++) {
        var veh = player.cars[i]
		if (veh.sqlId == sqlId) {
			var price = parseInt(veh.price / 100 * Config.sellCarPrecentMenu)
			player.utils.setMoney(player.money + price);
			DB.Handle.query(`DELETE FROM talrasha_vehicle WHERE id=?`, [veh.sqlId]);
			var worldveh = mp.vehicles.getBySqlId(veh.sqlId);
			if (worldveh) worldveh.destroy();
			player.cars.splice(i, 1);
			player.call(`playerMenu.cars`, [player.cars])
			player.utils.success(`Авто успешно продано!`);
			
			var keys = player.inventory.getArrayByItemId(54);
			for (var key in keys) {
				var keyItem = keys[key]
				if (keyItem.params.owner == player.sqlId && keyItem.params.car == veh.sqlId ) {
					player.inventory.delete(keyItem.id, (e) => {
						if (e) return player.utils.error(e);
					});
				}
			}
			
			break
		}
	}
});
mp.events.add("sell.veh.sell", (player, sqlId) => {
	if (!player.vehicle || (player.vehicle && player.vehicle.sqlId !== sqlId)) return player.utils.error(`Вы не в авто!`);
	
	
	var keys = player.inventory.getArrayByItemId(54);
	if (!Object.keys(keys).length) return player.utils.error(`Ключи от авто не найдены!`);

	for (var key in keys) {
		var keyItem = keys[key]
		if (keyItem.params.owner == player.sqlId && keyItem.params.car == player.vehicle.sqlId ) {
			player.inventory.delete(keyItem.id, (e) => {
				if (e) return player.utils.error(e);
	
				var price = player.vehicle.price / 100 * Config.sellCarPrecent
				player.utils.setMoney(player.money + price);
				
				DB.Handle.query(`DELETE FROM talrasha_vehicle WHERE id=?`, [player.vehicle.sqlId]);
				player.vehicle.destroy();
				
				for (var i = 0; i < player.cars.length; i++) {
					if (player.cars[i].sqlId == keyItem.params.car) {
						player.cars.splice(i, 1);
						break
					}
				}
				player.call(`playerMenu.cars`, [player.cars])
				
				player.utils.success(`Авто успешно продано!`);
			});
			break
		}
	}

	
});
