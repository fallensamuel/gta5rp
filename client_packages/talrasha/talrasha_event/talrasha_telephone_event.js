exports = menu => {
    class Phone {
        constructor () {
            mp.isPhoneActive = false    
        } 
        setPhoneStatus (status) {
			if (mp.bindlocker({phone: true})) return;
            menu.execute(`telephone.show(${status})`)
            mp.isPhoneActive = status
        } 
    }


    const phone = new Phone
    mp.events.add('render', () => { 
        if(mp.isPhoneActive){ 
            mp.game.controls.disableControlAction(16, 200, true);
            mp.game.controls.disableControlAction(14, 200, true);
            mp.game.controls.disableControlAction(15, 200, true);
            mp.game.controls.disableControlAction(0, 200, true);
        }
    });
    mp.events.add("authCharacter.success", () => {
        mp.keys.bind(0x26, true, () => {
            phone.setPhoneStatus(true) 
        })  
		mp.keys.bind(0x08, true, () => {
            phone.setPhoneStatus(false) 
        })  
    })
	mp.events.add("phone.setLogs", (value) => {
        menu.execute(`telephone.initPhoneLogs(${value})`)
    })
	mp.events.add("atmMenu.add.log", (text, cash, date) => {
		menu.execute(`telephone.addLog('${text}', ${cash}, ${date})`);
	});
	mp.events.add("phone.setPhoneNumber", (num, cash, date) => {
		menu.execute(`hudControl.setnum(${num})`);
	});
    mp.events.add("client::setPhoneStatus", (bool) => {
        phone.setPhoneStatus(bool) 
    })
    mp.events.addDataHandler("phoneContacts", (entity, value) => {
        if(entity == mp.players.local){
            menu.execute(`telephone.initPhoneContacts(${value})`)
        }
    })
	
    mp.events.addDataHandler("phoneCalls", (entity, value) => {
        if(entity == mp.players.local){
            menu.execute(`telephone.initPhoneCalls(${value})`)
        }
    })
	
	mp.events.addDataHandler("phoneMessages", (entity, value) => {
        if(entity == mp.players.local){
            menu.execute(`telephone.initPhoneMessages(${value})`)
        }
    })
 
	mp.events.add("client::phoneAddCall", (data) => { 
		menu.execute(`telephone.addCall(${data})`)
    })
	
	mp.events.add("client::phoneAddMessage", (data) => { 
		menu.execute(`telephone.addMessage(${data})`)
    })
	
	

    mp.events.add("client::phoneSurfingTo", (path) => { 
		menu.execute(`telephone.phoneSurfingTo('${path}')`)
    })

    mp.events.add("client::phoneGetCall", (phonedata) => {
        let data = {
            call: false,
            phone: phonedata
        }
		menu.execute(`telephone.phoneCall(${JSON.stringify(data)})`)
    })

    mp.events.add("client::phoneSendCall", (phonedata) => {
		if (!mp.isPhoneActive) {
			phone.setPhoneStatus(true) 
		}
        let data = {
            call: true,
            phone: phonedata
        }
		menu.execute(`telephone.phoneCall(${JSON.stringify(data)})`)
    })
	
	
	mp.events.add("client::startCall", () => {
		menu.execute(`telephone.startCall()`)
    })
	
	mp.events.add("client::phoneCallStop", (closePhone) => {
		menu.execute(`telephone.stopCall(${closePhone})`)
    })
	
	mp.events.add("setGPSWaypoint", (x, y) => {
      mp.game.ui.setNewWaypoint(x, y);
      mp.events.call('nSuccess', 'Маршрут построен!');
    });
	
}