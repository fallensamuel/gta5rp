let wheel = exports;
global.user = exports;
let methods = exports;
let distanceCheck = 1.4;
let Container = require('./data');

WheelLuckyPos = new mp.Vector3(948.62, 63.41, 74.99);
let TalRashaColshape = mp.colshapes.newSphere(948.62, 63.41, 74.99, 1);

wheel.isBlock = false;

user.has = function(player, key) {
    if (!mp.players.exists(player))
        return false;
    return Container.Data.Has(player.id, key);
};

user.set = function(player, key, val) {
    if (!mp.players.exists(player))
        return false;
    Container.Data.Set(player.id, key, val);
};

user.get = function(player, key) {
    if (!mp.players.exists(player))
        return null;
    try {
        return Container.Data.Get(player.id, key);
    } catch (e) {
        debug(e);
    }
    return null;
};

methods.getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

methods.distanceToPos = function (v1, v2) {
    return Math.abs(Math.sqrt(Math.pow((v2.x - v1.x),2) +
        Math.pow((v2.y - v1.y),2)+
        Math.pow((v2.z - v1.z),2)));
};

mp.events.add('server:playAnimation', (player, name1, name2, flag) => {
	try {
    if (!mp.players.exists(player))
        return;
    user.playAnimation(player, name1, name2, flag);
	}
	catch (e) {
		debug(e);
	}
});

user.playAnimation = function(player, dict, anim, flag = 49) {
    if (!mp.players.exists(player))
        return false;
    let pos = player.position;
    mp.players.forEach((p) => {
        try {
            if (methods.distanceToPos(pos, p.position) < 300)
                p.call('client:syncAnimation', [player.id, dict, anim, flag])
        }
        catch (e) {
			debug(e);
        }
    });
};

wheel.start = function (player) {
    if (mp.players.exists(player)) {
        if (wheel.isBlock) {
			player.utils.warning(`Таймаут 30 секунд, подождите`);
            return;
        }
		
		/*var minutes = parseInt((new Date().getTime() - player.authTime) / 1000 / 60);
		var todayTime = 540 - player.wheelTime + minutes*/
		
        if (user.get(player, 'online_wheel') < 24) {
            player.utils.error(`Вы должны отыграть на сервере 4 часа за этот день ( еще ${((24 - user.get(player, 'online_wheel')) * 10).toFixed(1)} минут )`);
            return;
        }
        if (user.get(player, 'online_wheel') > 999) {
			player.utils.success(`Вы уже крутили колесо сегодня.`);
            return;
        }
        wheel.isBlock = true;

        try {
            player.call('client:casino:wheel:start');
        }
        catch (e) { }

        setTimeout(function () {
            wheel.isBlock = false;
        }, 30000)
    }
};

mp.events.add('server:casino:wheel:doRoll', (player) => {
    if (!mp.players.exists(player))
        return
    try {
        let userWin = 1;

        if (methods.getRandomInt(0, 1000) < 1) //x2
            userWin = 19;
        else if (methods.getRandomInt(0, 250) < 1) //x2
            userWin = 0;
        else if (methods.getRandomInt(0, 100) < 1) //x2
            userWin = 15;
        else if (methods.getRandomInt(0, 50) < 1) //x2
            userWin = 7;
        else if (methods.getRandomInt(0, 25) < 1) //x2
            userWin = 5;
        else if (methods.getRandomInt(0, 25) < 1) //x2
            userWin = 9;
        else if (methods.getRandomInt(0, 3) < 1)
            userWin = 4;
        else if (methods.getRandomInt(0, 2) < 1)
            userWin = 3;

       user.set(player, 'wheelWin', userWin);
        mp.players.callInRange(player.position, 100, 'client:casino:wheel:doRoll', [userWin, player.id]);
    }
    catch (e) {
        debug(e);
    }
});

mp.events.add('server:casino:wheel:block', (player) => {
    wheel.isBlock = true;
});

mp.events.add('server:casino:wheel:unblock', (player) => {
    wheel.isBlock = false;
});

mp.events.add('server:casino:wheel:finalRoll', (player) => {
    if (!mp.players.exists(player) || !user.has(player, 'wheelWin'))
        return;
		
    try {
        if (user.get(player, 'online_wheel') > 999) {
			player.utils.success(`Вы уже крутили колесо сегодня.`);
            return;
        }

        user.set(player, 'online_wheel', 1000);
        let win = user.get(player, 'wheelWin');
		
		//debug(win);
		
        /*if (win === 19) {
            user.giveVehicle(player, enums.vehLuckyList[methods.getRandomInt(0, enums.vehLuckyList.length)], 1, true, ' в колесе удачи');
        }*/
        /*else if (win === 1) {
            user.addCashMoney(player, 2500, 'Колесо удачи');
            player.utils.success(`Вы выиграли $2,500`);
        }*/
        if (win === 3) {
			player.utils.setMoney(player.money + 20000);
            player.utils.success(`Вы выиграли $20,000`);
        }
        else if (win === 4) {
			player.utils.setMoney(player.money + 25000);
            player.utils.success(`Вы выиграли $25,000`);
        }
        else if (win === 7) {
			player.utils.setMoney(player.money + 30000);
            player.utils.success(`Вы выиграли $30,000`);
        }
        else if (win === 15) {
			player.utils.setMoney(player.money + 40000);
            player.utils.success(`Вы выиграли $40,000`);
        }
        else if (win === 0) {
			player.utils.setMoney(player.money + 50000);
            player.utils.success(`Вы выиграли $50,000`);
        }
        /*else if (win === 5) {
            user.giveVip(player, methods.getRandomInt(1, 5), 2, true, ' с колеса удачи');
            player.utils.success(`Вы выиграли VIP HARD`);
        }*/
        /*else if (win === 9) {
            user.giveRandomMask(player, 0, true, ' в колесе удачи');
            player.utils.success(`Вы выиграли маску`);
        }*/
        else if (win === 11) {
			player.utils.setMoney(player.money + 20000);
            player.utils.success(`Вы выиграли $20,000`);
        }
        else {
			player.utils.setMoney(player.money + 2500);
            player.utils.success(`Вы выиграли $2,500`);
        }

        /*if (win < 1) {
            if (methods.getRandomInt(0, 500) < 1) {
                user.giveVehicle(player, 'elegy');
                player.utils.success(`Вы выиграли транспорт`);
            }
            else {
                user.addCashMoney(player, 30000, 'Колесо удачи');
                player.utils.success(`Вы выиграли $40,000`);
            }
        }
        else if (win < 3) {

            if (methods.getRandomInt(0, 100) < 30) {
                user.giveRandomMask(player, 50, false);
                player.utils.success(`Вы выиграли маску`);
            }
            else if (methods.getRandomInt(0, 100) < 5) {
                user.giveVip(player, methods.getRandomInt(3, 7), 2);
                player.utils.success(`Вы выиграли VIP HARD`);
            }
            else {
                user.addCashMoney(player, 15000, 'Колесо удачи');
                player.utils.success(`Вы выиграли $20,000`);
            }
        }
        else if (win < 10) {
            user.addCashMoney(player, 5000, 'Колесо удачи');
            player.utils.success(`Вы выиграли $5,000`);
        }
        else {
            user.addCashMoney(player, 2000, 'Колесо удачи');
            player.utils.success(`Вы выиграли $2,000`);
        }*/

        //user.achiveDoneDailyById(player, 10);
    }
    catch (e) {
        debug(e);
    }
});

mp.events.add("onKeyPress:E", (player) => {
	if (!mp.players.exists(player))
        return;
	
	checkPressE(player);
});

checkPressE = function(player) {
	
	let playerPos = player.position;
	
	if (player.vehicle)
        return;
		
	if (methods.distanceToPos(WheelLuckyPos, playerPos) < distanceCheck)
    {
        setTimeout(function () {
            try {
                wheel.start(player);
            }
            catch (e) {}
        }, methods.getRandomInt(0, 500));
    }
};

function playerEnterColshapeHandler(player, shape) {
    if (shape == TalRashaColshape) {
		player.call("prompt.show", ["Нажми <span>Е</span> чтобы крутить колесо"]);
    }
}  

mp.events.add("playerEnterColshape", playerEnterColshapeHandler);