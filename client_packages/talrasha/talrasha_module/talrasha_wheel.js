let wheel = {};

/*let wheelPos = new mp.Vector3(948.58, 62.57, 76.99);
let baseWheelPos = new mp.Vector3(948.58, 62.57, 76.99);*/

//let wheelPos = new mp.Vector3(948.62, 63.41, 74.99 + 2);
//let baseWheelPos = new mp.Vector3(1111.05, 229.81, -50.38);

let _wheel = null;
let _baseWheel = null;

let sleep = function(ms) {
    return new Promise(res => setTimeout(res, ms));
};

global.user = {};
global.methods = {};

user.lastAnim = {
    a: '',
    d: '',
    f: 0,
};
let 
lastFlag = 0;

methods.parseInt = function (str) {
    return parseInt(str) || 0;
};

user.playAnimation = function(dict, anim, flag = 49, sendEventToServer = true) {
    //if (mp.players.local.getVariable("isBlockAnimation") || mp.players.local.isInAnyVehicle(false) || user.isDead()) return;
    lastFlag = flag;

    mp.events.callRemote('server:playAnimation', dict, anim, methods.parseInt(flag));
    user.lastAnim.d = dict;
    user.lastAnim.a = anim;
    user.lastAnim.f = flag;
};

user.getLastFlag = function() {
    return lastFlag;
};

mp.events.add('client:syncAnimation', async (playerId, dict, anim, flag) => {
    //if (mp.players.local.remoteId == playerId || mp.players.local.id == playerId)
    try {
        let remotePlayer = mp.players.atRemoteId(playerId);
        if (remotePlayer && mp.players.exists(remotePlayer)) {

            if (remotePlayer.vehicle && dict != 'cellphone@female')
                return;
            if (remotePlayer === mp.players.local && dict == 'dead')
                return;

            let isScenario = false;
            if (flag >= 50) {
                isScenario = true;
                flag = flag - 100;
            }

            if (remotePlayer === mp.players.local)
                remotePlayer = mp.players.local;
            else {
                remotePlayer.setAsMission(false, true);
                if (flag == 8)
                    flag = 32;
                if (flag == 9)
                    flag = 1;
            }

            remotePlayer.clearTasks();

            remotePlayer.lastFlag = flag;

            if (dict == 'amb@prop_human_seat_chair@male@generic@base' ||
                dict == 'amb@prop_human_seat_chair@male@right_foot_out@base' ||
                dict == 'amb@prop_human_seat_chair@male@left_elbow_on_knee@base' ||
                dict == 'amb@prop_human_seat_chair@male@elbows_on_knees@base' ||
                dict == 'anim@amb@yacht@jacuzzi@seated@male@variation_01@' ||
                dict == 'anim@amb@office@seating@male@var_e@base@' ||
                dict == 'anim@amb@office@seating@male@var_d@base@' ||
                dict == 'anim@amb@office@seating@female@var_d@base@' ||
                dict == 'anim@amb@office@seating@female@var_c@base@' ||
                dict == 'anim@amb@facility@briefing_room@seating@male@var_e@' ||
                dict == 'anim@amb@office@boardroom@crew@male@var_c@base_r@' ||
                dict == 'amb@world_human_seat_steps@male@hands_in_lap@base' ||
                dict == 'amb@prop_human_seat_sunlounger@male@base' ||
                dict == 'amb@world_human_seat_steps@male@elbows_on_knees@base' ||
                dict == 'anim@amb@clubhouse@seating@male@var_c@base@'
            )
            {
                remotePlayer.freezePosition(true);
                remotePlayer.setCollision(false, false);

                if (!Container.Data.HasLocally(remotePlayer.remoteId, 'hasSeat'))
                    remotePlayer.position = new mp.Vector3(remotePlayer.position.x, remotePlayer.position.y, remotePlayer.position.z - 0.95);
                Container.Data.SetLocally(remotePlayer.remoteId, 'hasSeat', true);
            }

            mp.game.streaming.requestAnimDict(dict);

            if (!mp.game.streaming.hasAnimDictLoaded(dict)) {
                mp.game.streaming.requestAnimDict(dict);
                while (!mp.game.streaming.hasAnimDictLoaded(dict))
                    await sleep(10);
            }

            if (flag != 1 && flag != 9) {

                remotePlayer.taskPlayAnim(dict, anim, 8, -8, -1, flag, 0.0, false, false, false);
            }
            else {
                remotePlayer.taskPlayAnim(dict, anim, 8, 0, -1, flag, 0.0, false, false, false);
            }
        }
    }
    catch (e) {
		debug('Exception: client:syncAnimation');
		debug(e);
    }
});

wheel.loadAll = function() {
    try {
        /*_baseWheel = mp.objects.new(mp.game.joaat('vw_prop_vw_luckywheel_01a'), baseWheelPos,
            {
                alpha: 255,
                dimension: -1
            });*/
        _wheel = mp.objects.new(mp.game.joaat('vw_prop_vw_luckywheel_02a'), new mp.Vector3(948.62, 63.41, 74.99 + 1.5),
            {
                alpha: 255,
                dimension: 0,
				rotation: new mp.Vector3(0, 0, 57)
            });
			
		mp.objects.new(mp.game.joaat("vw_prop_vw_luckywheel_01a"), new mp.Vector3(948.62, 63.41, 74.99), {
			  dimension: 0,
			  rotation: new mp.Vector3(0, 0, 57)
			}); 
		mp.objects.new(mp.game.joaat("vw_prop_vw_jackpot_on"), new mp.Vector3(948.62, 63.41, 74.99), {
			  dimension: 0,
			  rotation: new mp.Vector3(0, 0, 57)
			});

    } catch (e) {
		debug('Exception: wheel.loadAll');
    }
};

wheel.userRoll = async function() {
    try {
        let lib = 'anim_casino_a@amb@casino@games@lucky7wheel@female';
        if (mp.players.local.isMale())
            lib = 'anim_casino_a@amb@casino@games@lucky7wheel@male';

        let anim = 'enter_right_to_baseidle';

        let _movePos = new mp.Vector3(948.22, 61.47, 75.99);
        mp.players.local.taskGoStraightToCoord(_movePos.x,  _movePos.y,  _movePos.z,  1.0,  -1,  340.2,  1);

        let _isMoved = false;
        while (!_isMoved) {
            let coords = mp.players.local.position;
            if (coords.x >= (_movePos.x - 0.01) && coords.x <= (_movePos.x + 0.01) && coords.y >= (_movePos.y - 0.01) && coords.y <= (_movePos.y + 0.01))
                _isMoved = true;
            await sleep(1000);
        }

        user.playAnimation(lib, anim, 8);
        await sleep(200);

        await sleep(mp.players.local.getAnimTotalTime(lib, anim) - 210);
        user.playAnimation(lib, 'enter_to_armraisedidle', 8);
        await sleep(200);

        await sleep(mp.players.local.getAnimTotalTime(lib, 'enter_to_armraisedidle') - 210);
        user.playAnimation(lib, 'armraisedidle_to_spinningidle_high', 8);

        mp.events.callRemote("server:casino:wheel:doRoll");
    } catch (e) {
		debug('Exception: wheel.userRoll');
		debug(e);
    }
};

mp.events.add("client:casino:wheel:start", async () => {
    wheel.userRoll();
});

//E
mp.keys.bind(0x45, true, function() {
    try {
        if (isFlood()) return;
		if (mp.bindlocker()) return;
        mp.events.callRemote('onKeyPress:E');
        
    }
    catch (e) {
        debug(e);
    }
});

mp.events.add("client:casino:wheel:doRoll", async (priceIndex, playerId) => {
    try {
		mp.events.call("enableSound", "talrasha_luckywheel.mp3", 0.5)
		if (0 === _wheel.handle) return;
        _wheel.setRotation(0, 0, 0, 1, true);

        let speedIntCnt = 1800;
        let rollspeed = 18.0;
        let _winAngle = (priceIndex - 1) * 18;
        let _rollAngle = _winAngle + (360 * 1);
        let _midLength = (_rollAngle / 2);
        let intCnt = 0;

        while (speedIntCnt > 0) {
            const retval = _wheel.getRotation(2);
            if (_rollAngle > _midLength)
                speedIntCnt++;
            else {
                speedIntCnt--;
                if (speedIntCnt < 0)
                    speedIntCnt  = 0;
            }

            intCnt = intCnt + 1;
            rollspeed = speedIntCnt / 1800;

            try {
                let _y = retval.y - rollspeed;
                _rollAngle = _rollAngle - rollspeed;
                _wheel.setRotation(0, _y, 57, 2, true);
            }
            catch (e) {}
            await sleep(1);
        }
        if (mp.players.local.remoteId === playerId)
            mp.events.callRemote('server:casino:wheel:finalRoll');
    }
    catch (e) {
		debug(e);
    }
});

exports = wheel;