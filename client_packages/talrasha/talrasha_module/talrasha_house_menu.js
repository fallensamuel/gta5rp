exports = (menu) => {

	let houseBlip;
	let garageMarker;
	let LabelMarker;

	mp.events.add("client::addHouseBlip", (show, pos) => {
        if(show){
			if(mp.blips.exists(houseBlip)){
				houseBlip.destroy()
			}
			houseBlip = mp.blips.new(40, pos, {
				color: 3,
				name: "Дом",
				shortRange: true,
				scale: 1.1,
			});
		}
        else{
            if(mp.blips.exists(houseBlip)){
                houseBlip.destroy()
            }
        }
    })
	
	mp.events.add("client::addGarageMarker", (show, pos) => {
        if(show){
			if(mp.blips.exists(garageMarker)){
				garageMarker.destroy()
			}
			garageMarker = mp.markers.new(36, pos, 2, {
				color: [255, 255, 0, 100],
				visible: true
			});
		}
        else{
            if(garageMarker){
                garageMarker.visible = false;
            }
        }
    })
	
	mp.events.add("client::addLabelMarker", (show, text, pos) => {
        if(show){
			/*if(mp.blips.exists(LabelMarker)){
				LabelMarker.destroy()
			}*/
			LabelMarker = mp.labels.new(text, pos, {
				font: 0,
				drawDistance: 5,
				color: [255, 255, 255],
			});
		}
        else{
            if(LabelMarker){
                LabelMarker.destroy()
            }
        }
    })

    mp.keys.bind(0x45, true, function() { // E key
        if (isFlood()) return;
        //if (mp.chatActive || mp.consoleActive || mp.inventoryActive || mp.tradeActive || mp.playerMenuActive) return;
		if (mp.bindlocker()) return;
        mp.events.callRemote("houseHandler");
    });
	
    mp.keys.bind(50, true, function() { // E key
        if (isFlood()) return;
        //if (mp.chatActive || mp.consoleActive || mp.inventoryActive || mp.tradeActive || mp.playerMenuActive) return;
		if (mp.bindlocker()) return;
        mp.events.callRemote("GarageHandler");
    });

    mp.keys.bind(0x48, true, function() { // H key
        if (isFlood()) return;
        //if (mp.chatActive || mp.consoleActive || mp.inventoryActive || mp.tradeActive || mp.playerMenuActive) return;
		if (mp.bindlocker()) return;
        mp.events.callRemote("houseMenuHandler");
    });

    mp.events.add("setHouseMenuActive", (enable) => {
        mp.houseMenuActive = enable;
		if (!mp.houseMenuActive && houseMenuStatus) houseMenuStatus = false;
    });
	
	mp.events.add("house.streets.add", (allpos) => {
		allpos = JSON.parse(allpos)
		
		for (var key in allpos) {
			let getStreet = mp.game.pathfind.getStreetNameAtCoord(allpos[key].x, allpos[key].y, allpos[key].z, 0, 0);
			let streatName = mp.game.ui.getStreetNameFromHashKey(getStreet["streetName"]);
			allpos[key] = streatName;
		}
		
		mp.events.callRemote("house.streets.add", JSON.stringify(allpos));
		
	});

    mp.events.add("houseMenu.show", (params) => {
        //var values = [house.sqlId, house.class, house.interior, house.ownerName, house.garage, house.closed, house.price, house.position];
        JSON.stringify(params);

        var houseOwner = "";
        if (params[3]) houseOwner = params[3];

        var haveGarage = "Отсутствует";
        if (params[4]) haveGarage = "Присутствует";


        let getStreet = mp.game.pathfind.getStreetNameAtCoord(params[7].x, params[7].y, params[7].z, 0, 0);
        let streatName = mp.game.ui.getStreetNameFromHashKey(getStreet["streetName"]);

        //menu.execute(`houseMenu.__vue__.showMenu(0, "", 0, 0, 0, 0, 12);`); //
        menu.execute(`houseMenu.__vue__.showMenu(${params[0]},${params[2]},"${houseOwner}","${streatName}",${params[1]},${params[5]},1,"${haveGarage}","${params[4]}",${params[6]},${params[8]},${params[9]},${params[10]},${params[11]},${params[12]},'${params[13]}');`);
        setCursor(true);
    });
	
	mp.events.add("houseMenuexit.show", (params) => {
        JSON.stringify(params);

        var houseOwner = "";
        if (params[3]) houseOwner = params[3];

        var haveGarage = "Отсутствует";
        if (params[4]) haveGarage = "Присутствует";


        let getStreet = mp.game.pathfind.getStreetNameAtCoord(params[7].x, params[7].y, params[7].z, 0, 0);
        let streatName = mp.game.ui.getStreetNameFromHashKey(getStreet["streetName"]);
		
        menu.execute(`houseMenu.__vue__.showMenuexit(${params[0]},${params[2]},"${houseOwner}","${streatName}",${params[1]},${params[5]},1,"${haveGarage}","${params[4]}",${params[6]},${params[8]},${params[9]},${params[10]},${params[11]},${params[12]},'${params[13]}');`);
        setCursor(true);
    });
	
	mp.events.add("houseMenuexitgarage.show", (params) => {
		JSON.stringify(params);

        var houseOwner = "";
        if (params[3]) houseOwner = params[3];

        var haveGarage = "Отсутствует";
        if (params[4]) haveGarage = "Присутствует";
		
		let getStreet = mp.game.pathfind.getStreetNameAtCoord(params[7].x, params[7].y, params[7].z, 0, 0);
        let streatName = mp.game.ui.getStreetNameFromHashKey(getStreet["streetName"]);
		
        menu.execute(`houseMenu.__vue__.showMenuexitgarage(${params[0]},${params[2]},"${houseOwner}","${streatName}",${params[1]},${params[5]},1,"${haveGarage}","${params[4]}",${params[6]},${params[8]},${params[9]},${params[10]},${params[11]},${params[12]},'${params[13]}');`);
        setCursor(true);
    });

    mp.events.add("houseMenu.hide", () => {
        menu.execute(`houseMenu.__vue__.exitMenu();`);
    });

    var houseMenuStatus = false;
    mp.events.add("houseOwnerMenu.update", (update, lock, pl, balance, tax, datePay) => {

        if (!update) {
            if (!houseMenuStatus) menu.execute(`houseMenu.__vue__.showOwnerMenu(${lock}, ${pl}, ${balance}, ${tax}, '${datePay}');`);
            else menu.execute(`houseMenu.__vue__.hideOwnerMenu();`);

            houseMenuStatus = !houseMenuStatus;
            setCursor(houseMenuStatus);
        } else {
            menu.execute(`houseMenu.__vue__.showOwnerMenu(${lock}, ${pl}, ${balance}, ${tax}, '${datePay}');`);
        }
    });

    mp.events.add("inspectHouse", () => {
        if (!isFlood()) mp.events.callRemote("goEnterHouse"); //goInspectHouse");
    });

    mp.events.add("lockUnlockHouse", () => {
        if (!isFlood()) mp.events.callRemote("goLockUnlockHouse");
    });

    mp.events.add("enterHouse", () => {
        if (!isFlood()) mp.events.callRemote("goEnterHouse");
    });
	
	mp.events.add("goExitGarage", () => {
        if (!isFlood()) mp.events.callRemote("goExitGarage");
    });

    mp.events.add("enterGarage", () => {
        if (!isFlood()) mp.events.callRemote("goEnterGarage");
    });
	
	mp.events.add("goEnterStreetFromGarage", () => {
        if (!isFlood()) mp.events.callRemote("goEnterStreetFromGarage");
    });
	
	mp.events.add("goEnterGarageFromStreet", () => {
        if (!isFlood()) mp.events.callRemote("goEnterGarageFromStreet");
    });

    mp.events.add("exitHouse", () => {
        if (!isFlood()) mp.events.callRemote(`goEnterStreet`);
    });

    mp.events.add("buyHouse", () => {
        if (!isFlood()) mp.events.callRemote(`goBuyHouse`);
    });

    mp.events.add("invitePlayer", () => {
        if (!isFlood()) mp.events.call(`modal.show`, "invite_player_inhouse", {});
    });

    mp.events.add("sellHouseToGov", () => {
        if (!isFlood()) mp.events.callRemote(`sellHouseToGov`);
    });

    mp.events.add("sellHouseToPlayer", () => {

        if (!isFlood()) mp.events.call(`modal.show`, "sell_player_house", {});
    });

    mp.events.add("exitHouseMenu", (hidemenu) => {
        if (hidemenu) menu.execute(`houseMenu.__vue__.exitMenu();`);
        setCursor(false);
    });
};
