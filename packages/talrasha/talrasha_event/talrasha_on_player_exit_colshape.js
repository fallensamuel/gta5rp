module.exports = {
    "playerExitColshape": (player, colshape) => {
		if (player.isClothesshop) return;
        if (!colshape) return;
        if (colshape.marker) colshape.marker.hideFor(player);
        else delete player.colshape;

        if (colshape.menuName && !player.proccesedBussiness) {
            if (colshape.biz && (colshape.biz.bizType == 3 || colshape.biz.bizType == 13 || colshape.biz.bizType == 18|| colshape.biz.bizType == 20)) player.body.loadItems(); // для магазина одежды
            else if (colshape.factionService) delete player.clearFine;
			if (colshape.biz && colshape.biz.bizType == 6) player.call("food.shop.hide");
			if (colshape.biz && colshape.biz.bizType == 8) player.call("gun.shop.hide");
            return player.call("selectMenu.hide");
        }

        if (colshape.factionProducts) {
            player.utils.setLocalVar("insideProducts", false);
            delete player.factionProducts;
        } else if (colshape.warehouse) {
            player.utils.setLocalVar("insideWarehouseProducts", false);
        } else if (colshape.house) {
            player.call("exitHouseMenu", [true]);
        } else if (colshape.tpMarker && player.lastTpMarkerId != colshape.tpMarker.id) {
            delete player.lastTpMarkerId;
        }
    }
}
