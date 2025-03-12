// CEF browser.
let menu;
//global.menu = null;

var timerBarLib;

//let ipadBrowser;

mp.events.add("entityStreamIn", (entity) => {
	if (entity.type == "player") {
		var variation = entity.getVariable("clothes_top_variation");
		var texture = entity.getVariable("clothes_top_texture");
		if ((variation || variation === 0) && (texture || texture === 0)) {
			entity.setComponentVariation(11, variation, texture, 0);
		}
	}	
});

mp.events.addDataHandler("clothes_top_texture", (entity, value) => {
	if (entity.type == "player") {
		if (mp.players.local.remoteId == entity.remoteId) {
			var variation = entity.getVariable("clothes_top_variation");
			var texture = entity.getVariable("clothes_top_texture");
			mp.players.local.setComponentVariation(11, variation, texture, 0);
		}
		else {
			var variation = entity.getVariable("clothes_top_variation");
			var texture = entity.getVariable("clothes_top_texture");
			entity.setComponentVariation(11, variation, texture, 0);
		}
	}	
});

/*
mp.events.add('outgoingDamage', (sourceEntity, targetEntity, sourcePlayer, weapon, boneIndex, damage) => {
	 mp.game.graphics.notify(`${weapon} ${boneIndex} ${damage}`);
    if (targetEntity.type === 'player' && boneIndex === 20) {
        //return true; // disable outgoing headshot damage
    }
});
*/


mp.bindlocker = (data = {}) => {
	if (mp.tabletActive || (data.casino ? false : mp.casino) || mp.chatActive || mp.autoSaloonActive || mp.consoleActive || mp.inventoryActive || mp.tradeActive || mp.playerMenuActive || mp.documentsActive || mp.houseMenuActive || mp.selectMenuActive || (data.phone ? false : mp.isPhoneActive) || (data.ipad ? false : mp.ipadActive)) {return true} else {return false};
}

// Creating browser.
mp.events.add('guiReady', () => {
	mp.game.gameplay.setFadeOutAfterDeath(false);
    if (!menu) {
        // Creating CEF browser.
				menu = mp.browsers.new('package://talrasha/talrasha_html/index.html');
        mp.events.add('browserDomReady', (browser) => {
            if (browser == menu) {
                mp.gui.execute("window.location = 'package://talrasha/talrasha_chat/index.html'");
				//ipadBrowser = mp.browsers.new('package://talrasha/talrasha_ipad/index.html')
                mp.discord.update('da', 'da');
                // Init events.
                require('talrasha/talrasha_event/talrasha_event.js')(menu);
                require('talrasha/talrasha_module/talrasha_notifs.js');
                require('talrasha/talrasha_module/talrasha_html.js')(menu);
                require('talrasha/talrasha_event/talrasha_acc_event.js')(menu);
                require('talrasha/talrasha_event/talrasha_character_event.js')(menu);
                require('talrasha/talrasha_event/talrasha_select_menu_event.js')(menu);
                require('talrasha/talrasha_event/talrasha_interaction_menu_event.js')(menu);
                require('talrasha/talrasha_event/talrasha_info_table_event.js')(menu);
                require('talrasha/talrasha_event/talrasha_modal_event.js')(menu);
                require('talrasha/talrasha_event/talrasha_prompt_event.js')(menu);
                require('talrasha/talrasha_event/talrasha_choice_menu_event.js')(menu);
                require('talrasha/talrasha_module/talrasha_movecam.js')(menu);
                require('talrasha/talrasha_event/talrasha_console_event.js')(menu);
                require('talrasha/talrasha_event/talrasha_chat_event.js')(menu);
                require('talrasha/talrasha_module/talrasha_player_tag.js');
                require('talrasha/talrasha_module/talrasha_big_map.js')(menu);
                require('talrasha/talrasha_module/talrasha_house_menu.js')(menu);
                require('talrasha/talrasha_module/talrasha_veh_prop.js')(menu);
                require('talrasha/talrasha_module/talrasha_indicator.js')(menu);
                require('talrasha/talrasha_event/talrasha_player_online_event.js')(menu);
                require('talrasha/talrasha_event/talrasha_business_log_event.js')(menu);
                require('talrasha/talrasha_module/talrasha_animator.js');
                require('talrasha/talrasha_module/talrasha_fore_finger.js');
                require('talrasha/talrasha_module/talrasha_radio_sync.js');
                require('talrasha/talrasha_event/talrasha_inventory_event.js')(menu);
				require('talrasha/talrasha_event/talrasha_roulette_event.js')(menu);
                require('talrasha/talrasha_module/talrasha_user_interface.js')(menu);
                require('talrasha/talrasha_event/talrasha_trade_event.js')(menu);
                require('talrasha/talrasha_event/talrasha_document_event.js')(menu);
                require('talrasha/talrasha_module/talrasha_closed_door.js');
                require('talrasha/talrasha_module/talrasha_player_weapon.js')(menu);
                //require('talrasha/talrasha_module/talrasha_job/talrasha_pizza/talrasha_pizza.js');
                require('talrasha/talrasha_module/talrasha_job/talrasha_waterfront/talrasha_waterfront.js');
                require('talrasha/talrasha_module/talrasha_job/talrasha_builder/talrasha_builder.js');
                //require('talrasha/talrasha_module/talrasha_job/talrasha_autoroober/index.js');
                require('talrasha/talrasha_module/talrasha_job/talrasha_bus/talrasha_bus_control.js');
				require('talrasha/talrasha_module/talrasha_job/talrasha_bus/talrasha_bus.js');
                require('talrasha/talrasha_module/talrasha_job/talrasha_taxi/index.js');
                require('talrasha/talrasha_module/talrasha_job/talrasha_smuggling/index.js');
				require('talrasha/talrasha_module/talrasha_job/talrasha_trucker/talrasha_trucker.js');
                require('talrasha/talrasha_event/talrasha_autosaloon_event.js')(menu);
                require('talrasha/talrasha_event/talrasha_police_passport_event.js')(menu);
                require('talrasha/talrasha_event/talrasha_player_menu_event.js')(menu);
                require('talrasha/talrasha_event/talrasha_report_system_event.js')(menu);
                require('talrasha/talrasha_event/talrasha_admin_panel_event.js')(menu);
                require('talrasha/talrasha_event/talrasha_donate_menu_event.js')(menu);
                require('talrasha/talrasha_event/talrasha_fbi_passport_event.js')(menu);
                require('talrasha/talrasha_event/talrasha_telephone_event.js')(menu);
                require('talrasha/talrasha_event/talrasha_hud_control_event.js')(menu);
                require('talrasha/talrasha_module/talrasha_ls_custom/index.js')(menu);
                require('talrasha/talrasha_module/talrasha_rent_veh.js');
                require('talrasha/talrasha_module/talrasha_helper.js')(menu);
                require('talrasha/talrasha_module/talrasha_client_bank.js');
                require('talrasha/talrasha_module/talrasha_fly.js');
                require('talrasha/talrasha_module/talrasha_hud_control.js')(menu);
                timerBarLib = require('talrasha/talrasha_module/talrasha_time_bar.js');
                require('talrasha/talrasha_module/talrasha_player_death.js');
                require('talrasha/talrasha_module/talrasha_barbershop/index.js');
				require('talrasha/talrasha_module/talrasha_tatooshop/index.js')(menu);
                require('talrasha/talrasha_event/talrasha_achievement_event.js')(menu);
                require('talrasha/talrasha_event/talrasha_walking_event.js');
                require('talrasha/talrasha_event/talrasha_emotion_event.js');
                require('talrasha/talrasha_event/talrasha_ped_event.js');
                require('talrasha/talrasha_module/talrasha_door_control.js');
                require('talrasha/talrasha_event/talrasha_custom_event/index.js');
				require('talrasha/talrasha_module/talrasha_green_zone.js');
                require('talrasha/talrasha_module/talrasha_admin.js');
				require('talrasha/talrasha_module/talrasha_character_creation/index.js')(menu);
                require('talrasha/talrasha_module/talrasha_plane_smoke.js');
                require('talrasha/talrasha_module/talrasha_farm.js');
                require('talrasha/talrasha_module/talrasha_atm_trigger.js');
                require('talrasha/talrasha_module/talrasha_null_auto_pilot.js');
                require('talrasha/talrasha_module/talrasha_sky_camera.js');
                require('talrasha/talrasha_event/talrasha_gov_passport_event.js');
                //require('talrasha/talrasha_module/talrasha_crouch.js');
                require('talrasha/talrasha_module/talrasha_tp_map.js');
                require('talrasha/talrasha_module/talrasha_admins.js');
				require('talrasha/talrasha_module/talrasha_casino.js')(menu);
				require('talrasha/talrasha_module/talrasha_notifs_html.js')(menu);
				require('talrasha/talrasha_module/talrasha_ghetto/talrasha_ghetto.js')
                require('talrasha/talrasha_module/talrasha_bizwar/talrasha_bizwar.js')
                require('talrasha/talrasha_module/talrasha_wzp/talrasha_wzp.js')
				require('talrasha/talrasha_module/talrasha_html_capture/talrasha_html_capture.js')
				require('talrasha/talrasha_module/talrasha_ipad/talrasha_ipad.js')(menu);
			    const wheel = require('talrasha/talrasha_module/talrasha_wheel.js')
                //mp.game.graphics.startScreenEffect('MP_job_load', 9999999, true);
                mp.events.callRemote("playerBrowserReady");
                var player = mp.players.local;
                // mp.events.call('moveSkyCamera', player, 'up', 1, false);
                mp.events.call("setFreeze", true);
                setCursor(true);
				wheel.loadAll();
                mp.game.ui.setMinimapVisible(false);
                mp.game.ui.displayRadar(false);
                //mp.events.call(`effect`, 'MP_OrbitalCannon', 100000);
                mp.players.local.freezePosition(true);

								//startFlyingCamera();
								mp.players.local.setVisible(true, false);
                mp.players.local.setAlpha(0);
                //отключение штатных функций
				const blackGroups = [416676503, 3337201093, 860033945, 970310034, 1159398588, 3082541095, 2725924767]
                mp.events.add('render', () => {
					 mp.game.controls.disableControlAction(0, 140, true);
					 let weaponHash = mp.game.invoke(`0x0A6DB4965674D243`, mp.players.local.handle); 
					 let groupHash = mp.game.weapon.getWeapontypeGroup(weaponHash);
					 if (blackGroups.indexOf(groupHash) !== -1) mp.game.controls.disableControlAction(0, 142, true);
					 mp.game.player.setMeleeWeaponDamageModifier(0.1);
					mp.game.player.setWeaponDamageModifier(0.4); 
					mp.game.ped.setAiWeaponDamageModifier(0.4); 
					mp.players.local.setSuffersCriticalHits(false); // 
                    mp.game.controls.disableControlAction(2, 243, true);
					// Колесо оружия
					/*mp.game.ui.hideHudComponentThisFrame(19);
					mp.game.ui.hideHudComponentThisFrame(20);
					mp.game.ui.hideHudComponentThisFrame(22);
					mp.game.controls.disableControlAction(0, 12, true);
					mp.game.controls.disableControlAction(0, 14, true);
					mp.game.controls.disableControlAction(0, 15, true);
					mp.game.controls.disableControlAction(0, 16, true);
					mp.game.controls.disableControlAction(0, 17, true);
					mp.game.controls.disableControlAction(0, 37, true);
					mp.game.controls.disableControlAction(0, 53, true);
					mp.game.controls.disableControlAction(0, 54, true);
					mp.game.controls.disableControlAction(0, 56, true);
					mp.game.controls.disableControlAction(0, 99, true);
					mp.game.controls.disableControlAction(0, 115, true);
					mp.game.controls.disableControlAction(0, 116, true);
					mp.game.controls.disableControlAction(0, 157, true);
					mp.game.controls.disableControlAction(0, 158, true);
					mp.game.controls.disableControlAction(0, 159, true);
					mp.game.controls.disableControlAction(0, 160, true);
					mp.game.controls.disableControlAction(0, 161, true);
					mp.game.controls.disableControlAction(0, 162, true);
					mp.game.controls.disableControlAction(0, 163, true);
					mp.game.controls.disableControlAction(0, 164, true);
					mp.game.controls.disableControlAction(0, 165, true);
					mp.game.controls.disableControlAction(0, 261, true);
					mp.game.controls.disableControlAction(0, 262, true);
					mp.game.controls.disableControlAction(0, 100, true);*/
                   });
            }
        });
    }
});

let authCamera;

mp.events.add('playerJoin.client', () => {
    mp.players.local.setDefaultComponentVariation();
    mp.gui.cursor.show(true, true);
    mp.game.ui.displayRadar(false);
    mp.game.ui.displayHud(false);
    mp.players.local.freezePosition(true);

    mp.game.controls.disableControlAction(1, 199, true);    //ESC
    mp.game.controls.disableControlAction(1, 200, true);    //Pause Menu

    mp.players.local.position = new mp.Vector3(-1685.21, -1653.46, 203.55);
    authCamera = mp.cameras.new('menu', new mp.Vector3(-1685.21, -1653.46, 193.55), new mp.Vector3(0,0,0), 60);
    authCamera.pointAtCoord(-1639.35, -1575.13, 187.48);
    authCamera.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);
});

mp.events.add('charChoosed.client', () => {
    mp.game.ui.displayRadar(true);
    mp.game.ui.displayHud(true);
    mp.players.local.freezePosition(false);
    authCamera.setActive(false);
    mp.game.cam.renderScriptCams(false, false, 0, true, false);

    mp.game.controls.disableControlAction(1, 199, false);    //ESC
    mp.game.controls.disableControlAction(1, 200, false);    //Pause Menu
});

getHash = function(str) {
    var sum = 0;
    for (var i = 0; i < str.length; i++) {
        sum += str.charCodeAt(i);
    }
    return sum;
}

test = function() {
    setTimeout(() => {
        var player = mp.players.local;
        let Ped = mp.peds.new(mp.game.joaat('MP_M_Freemode_01'), player.position, 270.0, (streamPed) => {
            streamPed.setAlpha(80);
            player.cloneToTarget(streamPed.handle);
        }, player.dimension);

        setTimeout(() => {
            Ped.clearTasks();
            mp.game.streaming.requestAnimDict("switch@michael@sitting");
            Ped.taskPlayAnim("switch@michael@sitting", "idle_chair", 8.0, 0.0, -1, 1, 0.0, false, false, false);

            //mp.game.streaming.requestAnimDict("switch@michael@sitting");
            //Ped.playAnim("idle_chair", "switch@michael@sitting", 1.0, true, true, true, 1.0, 1.0);

        }, 1000);
    }, 2000);
}

test_kemperrr = function() {
    const requestAnimDict = (string) => {
        mp.game.streaming.requestAnimDict(string);
        return new Promise((r) => {
            const timer = setInterval(() => {
                if (mp.game.streaming.hasAnimDictLoaded(string)) {
                    clearInterval(timer);
                    r(true);
                }
            }, 50);
        });
    };

    const pedStreamIn = async (ped) => {
        await requestAnimDict("switch@michael@sitting");
        ped.taskPlayAnim("idle_chair", "switch@michael@sitting", 8, 16, -1, 1, 1, false, false, false);
    };

    mp.events.add('cPlayer', async (player) => {
        const ped = mp.peds.new(mp.game.joaat('MP_m_Freemode_01'), player.position, 270.0, pedStreamIn, player.dimension);
    });

    mp.events.call('cPlayer', mp.players.local);
}

var timerId;

startFlyingCamera = function() {
    var startPos = new mp.Vector3(randomInteger(-500, 500), randomInteger(-500, 500), 200);
    var startRot = new mp.Vector3(0, 30, randomInteger(0, 360));

    var endPos = new mp.Vector3(randomInteger(-500, 500), randomInteger(-500, 500), 200);
    var endRot = new mp.Vector3(-30, 0, randomInteger(0, 360));
    mp.CameraMoveTo(startPos, endPos, startRot, endRot, 20, 90);
    timerId = setInterval(() => {
        //mp.events.call("startCutscene", "path1");
        var startPos = new mp.Vector3(randomInteger(-500, 500), randomInteger(-500, 500), 200);
        var startRot = new mp.Vector3(0, 30, randomInteger(0, 360));

        var endPos = new mp.Vector3(randomInteger(-500, 500), randomInteger(-500, 500), 200);
        var endRot = new mp.Vector3(0, 30, randomInteger(0, 360));
        mp.CameraMoveTo(startPos, endPos, startRot, endRot, 20, 90);
    }, 15000);
}

stopFlyingCamera = function() {
    clearInterval(timerId);
    mp.events.call("finishMoveCam");
}

var floodTimerId;
var FLOOD_TIME = 1000;
var MAX_FLOOD_TIME = 2000;
var lastFloodTime;

isFlood = function() {
    return false;
    if (mp.antiFlood) {
        mp.events.call(`nError`, `Anti-FLOOD! ${lastFloodTime/1000} сек.`);
        clearTimeout(floodTimerId);
        lastFloodTime = Math.clamp(lastFloodTime + 1000, 0, MAX_FLOOD_TIME);
        floodTimerId = setTimeout(() => {
            mp.antiFlood = false;
        }, lastFloodTime);
        return true;
    }
    mp.antiFlood = true;
    floodTimerId = setTimeout(() => {
        mp.antiFlood = false;
    }, FLOOD_TIME);
    lastFloodTime = FLOOD_TIME;

    return false;
}

setCursor = function(enable) {
    menu.execute(`inventoryAPI.mouseupHandler()`);
    mp.gui.cursor.show(enable, enable);
}

/*user.getLastFlag = function() {
    return lastFlag;
};*/

setFreeze = function(enable) {
    mp.events.call("setFreeze", enable);
}

alert = function(text) {
    menu.execute(`alert('${text}')`);
}

/*function debug(text) {
    mp.events.call("console.push", "debug", text);
}*/

debug = function(text) {
    mp.events.call("console.push", "debug", text);
}

hideWindow = function(el) {
    menu.execute(`hideWindow('${el}')`);
}

randomInteger = function(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

Math.clamp = function(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

vdist = function(posA, posB) {
    if (!posA || !posB) return Number.MAX_VALUE;
    return mp.game.system.vdist(posA.x, posA.y, posA.z, posB.x, posB.y, posB.z);
}

scalable = function(dist, maxDist) {
    return Math.max(0.1, 1 - (dist / maxDist));
}

drawSprite = function(dist, name, scale, heading, colour, x, y, layer) {
    const graphics = mp.game.graphics,
        resolution = graphics.getScreenActiveResolution(0, 0),
        textureResolution = graphics.getTextureResolution(dist, name),
        SCALE = [(scale[0] * textureResolution.x) / resolution.x, (scale[1] * textureResolution.y) / resolution.y]

    if (graphics.hasStreamedTextureDictLoaded(dist) === 1) {
        if (typeof layer === 'number') {
            graphics.set2dLayer(layer);
        }

        graphics.drawSprite(dist, name, x, y, SCALE[0], SCALE[1], heading, colour[0], colour[1], colour[2], colour[3]);
    } else {
        graphics.requestStreamedTextureDict(dist, true);
    }
}

drawText3d = function(text, pos, scale = 0.3, color = [0, 187, 255, 255]) {
    mp.game.graphics.drawText(text, [pos.x, pos.y, pos.z], {
        font: 4,
        color: color,
        scale: [scale, scale],
        outline: true
    });
}

getNearPlayer = function(pos) {
    var nearPlayer;
    var minDist = 99999;
    mp.players.forEachInStreamRange((rec) => {
        if (rec == mp.players.local) return;
        var distance = vdist(pos, rec.position);
        if (distance < minDist) {
            nearPlayer = rec;
            minDist = distance;
        }
    });
    return nearPlayer;
}

getNearVehicle = function(pos, range = 10) {
    var nearVehicle;
    var minDist = 99999;
    mp.vehicles.forEachInStreamRange((veh) => {
        var distToVeh = vdist(pos, veh.position);
        if (distToVeh < range) {
            var distToHood = vdist(pos, getHoodPosition(veh));
            var distToBoot = vdist(pos, getBootPosition(veh));
            var dist = Math.min(distToVeh, distToHood, distToBoot);
            if (dist < minDist) {
                nearVehicle = veh;
                minDist = dist;
            }
        }
    });
    if (nearVehicle) nearVehicle.minDist = minDist;
    return nearVehicle;
}

getNearObject = function(pos, range = 10) {
    var nearObj;
    var minDist = 99999;
    mp.objects.forEach((obj) => {
        var distance = vdist(pos, obj.position);
        if (distance < minDist && distance < range) {
            nearObj = obj;
            minDist = distance;
        }
    });
    return nearObj;
}

getNearPlayerOrVehicle = function(pos, range = 10) {
    var nearPlayer = getNearPlayer(pos);
    var nearVehicle = getNearVehicle(pos);
    if (!nearPlayer) return nearVehicle;
    if (!nearVehicle) return nearPlayer;
    var distToPlayer = vdist(pos, nearPlayer.position);
    if (distToPlayer <= nearVehicle.minDist) return nearPlayer;
    else return nearVehicle;
}

getOccupants = function(vehId) {
    var veh = mp.vehicles.atRemoteId(vehId);
    if (!veh) return [];
    var occupants = [];
    mp.players.forEach((rec) => {
        if (rec.vehicle && rec.vehicle.remoteId == vehId) occupants.push(rec);
    });
    return occupants;
}

drawText2d = function(text, pos = [0.8, 0.5], color = [255, 255, 255, 255], scale = [0.3, 0.3]) {
    mp.game.graphics.drawText(text, pos, {
        font: 0,
        color: color,
        scale: scale,
        outline: true
    });
}

let timeStart = Date.now(),
    frame = 0;

/*function drawFPS() {
    frame++;
    let timeNow = Date.now() - timeStart;

    fps = Math.round(frame / (timeNow / 1000.0));
    drawText2d(`FPS: ${fps}`, [0.6, 0.008], [0, 255, 0, 120]);
}*/

requestAnimDicts = function() {
    var anims = ["anim@heists@box_carry@", "amb@world_human_bum_slumped@male@laying_on_left_side@base",
        "amb@world_human_gardener_plant@female@base"];
    for (var i = 0; i < anims.length; i++) {
        mp.game.streaming.requestAnimDict(anims[i]);
        while (!mp.game.streaming.hasAnimDictLoaded(anims[i])) {
            mp.game.wait(0);
        }
    }
}

/* Подсчет количества суммарной цены и количества текстур для каждого типа одежды. */
getArrayClothesCounts = function() {
    var names = ["bracelets", "ears", "feets", "glasses", "hats", "legs", "masks", "ties", "top", "watches", "undershirts", "bags"];
    if (!mp.storage.data.clothes || Object.keys(mp.storage.data.clothes).length != names.length) {
        mp.storage.data.clothes = {};
        return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }


    var counts = [];
    for (var com in mp.storage.data.clothes) {
        var count = 0;
        for (var i = 0; i < mp.storage.data.clothes[com].length; i++) {
            for (var j = 0; j < mp.storage.data.clothes[com][i].length; j++) {
                count += mp.storage.data.clothes[com][i][j].price;
                count += mp.storage.data.clothes[com][i][j].textures.length;
                count += mp.storage.data.clothes[com][i][j].variation;
                if (mp.storage.data.clothes[com][i][j].rows) count += mp.storage.data.clothes[com][i][j].rows;
                if (mp.storage.data.clothes[com][i][j].cols) count += mp.storage.data.clothes[com][i][j].cols;
            }
        }
        count += i;
        counts.push(count);
    }
    return counts;


}

getHoodPosition = function(veh) {
    if (!veh) return null
    var vehPos = veh.position;
    var hoodPos = veh.getWorldPositionOfBone(veh.getBoneIndexByName("bonnet"));
    var hoodDist = vdist(vehPos, hoodPos);
    if (hoodDist > 10) return null;
    return veh.getOffsetFromInWorldCoords(0, hoodDist + 2, 0);
}

getBootPosition = function(veh) {
    if (!veh) return null;
    var vehPos = veh.position;
    var bootPos = veh.getWorldPositionOfBone(veh.getBoneIndexByName("boot"));
    var bootDist = vdist(vehPos, bootPos);
    if (bootDist > 10) return null;
    return veh.getOffsetFromInWorldCoords(0, -bootDist - 1, 0);
}

getPlayerByName = function(name) {
    if (!name) return null;
    var result;
    mp.players.forEach((recipient) => {
        if (recipient.name == name) {
            result = recipient;
            return;
        }
    });
    return result;
}

getPedBySqlId = function(sqlId) {
    if (!sqlId) return null;
    var result;
    mp.peds.forEach((ped) => {
        if (ped.sqlId == sqlId) {
            result = ped;
            return;
        }
    });
    return result;
}

getStreetName = function(pos) {
    var getStreet = mp.game.pathfind.getStreetNameAtCoord(pos.x, pos.y, pos.z, 0, 0);
    var streetName = mp.game.ui.getStreetNameFromHashKey(getStreet["streetName"]);
    return streetName;
}

String.prototype.escape = function() {
    return this.replace(/[&"'\\]/g, "");
};

// Двойной курсор
var last_pausemenustatus = false;
var last_cursorstate = false;
setInterval(function() {

    
    if (last_pausemenustatus == false && mp.game.ui.isPauseMenuActive())
    {
        last_pausemenustatus = true;
        last_cursorstate = mp.gui.cursor.visible;
        mp.gui.cursor.visible = false;
    }
    else if(last_pausemenustatus == true && !mp.game.ui.isPauseMenuActive())
    {
        last_pausemenustatus = false;
        mp.gui.cursor.visible = last_cursorstate;
    }
})

mp.events.add('render', () => {
    mp.game.player.restoreStamina(100);
});

mp.Vector3.getDistanceBetweenPoints3D = function (v1, v2){
	return Math.abs(Math.sqrt(Math.pow((v2.x - v1.x),2) + Math.pow((v2.y - v1.y),2)+ Math.pow((v2.z - v1.z),2)));
}
// snow force by nullrouted
// mp.events.add('render', (value) => {
//     mp.game.streaming.requestNamedPtfxAsset('core_snow');
//     mp.game.graphics.setForcePedFootstepsTracks(true);
//     mp.game.graphics.setForceVehicleTrails(true);
//     // mp.game.graphics.notify('Режим Debug включен.');
// });