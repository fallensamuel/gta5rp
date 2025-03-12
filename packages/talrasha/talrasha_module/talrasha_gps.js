mp.events.add("gpshouse", (player) => {
	var house = mp.houses.getBySqlId(player.houseId);
	if (!house) return player.utils.error(`Дом не найден!`);

	player.call("setNewWaypoint", [house.position.x, house.position.y]);
	player.utils.success(`Дом №${house.sqlId} отмечен на карте`);
})

mp.events.add("gpsbizmagazin", (player) => {
	mp.bizes.forEach((biz) => {
		mp.players.forEachInRange(biz.position, 500, (rec) => {
			if(biz.bizType == 6){
				rec.call("setNewWaypoint", [biz.position.x, biz.position.y]);
			}
		});
	});
});

mp.events.add("gpsbizclothes", (player) => {
	mp.bizes.forEach((biz) => {
		mp.players.forEachInRange(biz.position, 500, (rec) => {
			if(biz.bizType == 3){
				rec.call("setNewWaypoint", [biz.position.x, biz.position.y]);
			}
		});
	});
});

mp.events.add("gpsbizbarbershop", (player) => {
	mp.bizes.forEach((biz) => {
		mp.players.forEachInRange(biz.position, 500, (rec) => {
			if(biz.bizType == 4){
				rec.call("setNewWaypoint", [biz.position.x, biz.position.y]);
			}
		});
	});
});

mp.events.add("gpsbiztatto", (player) => {
	mp.bizes.forEach((biz) => {
		mp.players.forEachInRange(biz.position, 500, (rec) => {
			if(biz.bizType == 7){
				rec.call("setNewWaypoint", [biz.position.x, biz.position.y]);
			}
		});
	});
});

mp.events.add("gpsbizgunshop", (player) => {
	mp.bizes.forEach((biz) => {
		mp.players.forEachInRange(biz.position, 500, (rec) => {
			if(biz.bizType == 8){
				rec.call("setNewWaypoint", [biz.position.x, biz.position.y]);
			}
		});
	});
});

mp.events.add("gpsbizazs", (player) => {
	mp.bizes.forEach((biz) => {
		mp.players.forEachInRange(biz.position, 500, (rec) => {
			if(biz.bizType == 5){
				rec.call("setNewWaypoint", [biz.position.x, biz.position.y]);
			}
		});
	});
});