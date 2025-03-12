exports = (menu) => {
	
	mp.events.add("roulette.setPrize", (fast, type, car) => {
        menu.execute(`playerMenu.scrollTo(${fast}, '${type}', '${car}')`);
    });
	
	mp.events.add("roulette.setPrizeGold", (fast, type, car) => {
        menu.execute(`playerMenu.scrollToGold(${fast}, '${type}', '${car}')`);
    });
	
	mp.events.add("roulette.noMoney", () => {
       menu.execute(`playerMenu.noMoney()`);
    });
	
	mp.events.add("roulette.setPrizes", (prizes) => {
       menu.execute(`playerMenu.setRoulettePrizes('${prizes}')`);
    });
	
	mp.events.add("roulette.deletePrize", (id) => {
       menu.execute(`playerMenu.deletePrize(${id})`);
    });

	
}