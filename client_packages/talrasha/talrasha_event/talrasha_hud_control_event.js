exports = (menu) => {
    var lastServerOnline = 0;
	var lastAdress = ''
	var lastTalrasha = ''

    mp.events.add('hudControl.setData', (data) => {
        menu.execute(`window.events.call('hudControl', { data: ${JSON.stringify(data)}, event: 'setData' })`);
    });

    mp.events.add('hudControl.updateMoney', (money) => {
        var data = { money: money };
        menu.execute(`window.events.call('hudControl', { money: ${JSON.stringify(data)}, event: 'updateMoney' })`);
    });

    mp.events.add('hudControl.updateWanted', (wanted) => {
        var data = { wanted: wanted };
        menu.execute(`window.events.call('hudControl', { wanted: ${JSON.stringify(data)}, event: 'updateWanted' })`);
    });
    
    mp.events.add('hudControl.updateBank', (bank) => {
        var data = { bank: bank };
        menu.execute(`window.events.call('hudControl', { bank: ${JSON.stringify(data)}, event: 'updateBank' })`);
    });

    mp.events.add("hudControl.enable", (enable) => {
        enableAmmo = true;
        menu.execute(`window.events.call('hudControl', { status: ${enable}, event: 'enable' })`);
    });

    mp.events.add("setMoney", (money_value) => {
        mp.events.call("setLocalVar", "money", money_value);
    });
	
	 mp.events.add("enableSound", (soundName, volume) => {
        menu.execute(`enableSoundStart('${soundName}', ${volume})`);
    });

    mp.events.add('render', () => {
        
        mp.game.ui.hideHudComponentThisFrame(1);
        mp.game.ui.hideHudComponentThisFrame(2);
        mp.game.ui.hideHudComponentThisFrame(3);
        mp.game.ui.hideHudComponentThisFrame(13);
        mp.game.ui.hideHudComponentThisFrame(4);

        if (mp.players.length != lastServerOnline) {
            lastServerOnline = mp.players.length;
            menu.execute(`window.events.call('hudControl', { online: ${lastServerOnline}, event: 'setOnline' })`);
        }
		
		let pos = mp.players.local.position;
		var getMass = mp.game.pathfind.getStreetNameAtCoord(pos.x, pos.y, pos.z, 0, 0);
		var getStreet = getMass["streetName"]
        var adress = mp.game.ui.getStreetNameFromHashKey(getStreet);
		var adresstalrasha = mp.game.ui.getLabelText(mp.game.zone.getNameOfZone(pos.x, pos.y, pos.z));

		if (lastAdress !== adress || lastTalrasha !== adresstalrasha) {
			lastAdress = adress;
			lastTalrasha = adresstalrasha;
			menu.execute(`window.events.call('hudControl', {adress: '${lastAdress}', event: 'setStreet' })`);
			menu.execute(`window.events.call('hudControl', {adresstalrasha: '${lastTalrasha}', event: 'setStreetTalRasha' })`);
		}
        //menu.execute(`window.events.call('hudControl', { weapon: ${player.weapon}, event: 'weapon' })`);
    });
}