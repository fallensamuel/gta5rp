var throwAttachedObject;
var followPlayer;
var animationInfo = [{
    dict: "amb@code_human_in_car_mp_actions@finger@std@ps@base",
    name: "idle_a",
    speed: 8,
    flag: 49
},
{
    dict: "mini@prostitutestalk",
    name: "street_argue_f_a",
    speed: 8,
    flag: 49
},
{
    dict: "amb@code_human_in_car_mp_actions@rock@low@ps@base",
    name: "enter",
    speed: 8,
    flag: 46
},
{
    dict: "amb@code_human_in_car_mp_actions@v_sign@bodhi@rps@base",
    name: "idle_a",
    speed: 8,
    flag: 49
},
{
    dict: "amb@world_human_cheering@male_e",
    name: "base",
    speed: 8,
    flag: 49
},
{
    dict: "amb@code_human_in_car_mp_actions@wank@bodhi@rps@",
    name: "idle_a",
    speed: 8,
    flag: 49
},
{
    dict: "amb@prop_human_muscle_chin_ups@male@base",
    name: "base",
    speed: 8,
    flag: 49
},
{
    dict: "amb@prop_human_seat_muscle_bench_press@idle_a",
    name: "idle_a",
    speed: 8,
    flag: 49
},
{
    dict: "amb@world_human_muscle_free_weights@male@barbell@base",
    name: "base",
    speed: 8,
    flag: 1
},
{
    dict: "amb@world_human_push_ups@male@base",
    name: "base",
    speed: 8,
    flag: 1
},
{
    dict: "amb@world_human_sit_ups@male@base",
    name: "base",
    speed: 8,
    flag: 1
}, // 10
{
    dict: "amb@lo_res_idles@",
    name: "world_human_bum_slumped_right_lo_res_base",
    speed: 8,
    flag: 1
},
{
    dict: "amb@world_human_bum_slumped@male@laying_on_left_side@base",
    name: "base",
    speed: 8,
    flag: 1
},
{
    dict: "amb@world_human_bum_slumped@male@laying_on_right_side@base",
    name: "base",
    speed: 8,
    flag: 1
},
{
    dict: "amb@code_human_cower@female@base",
    name: "base",
    speed: 8,
    flag: 1
},
{
    dict: "anim@amb@nightclub@lazlow@lo_toilet@",
    name: "lowtoilet_trans_to_rockin_laz",
    speed: 8,
    flag: 1
},
{
    dict: "amb@world_human_seat_wall@male@hands_by_sides@base",
    name: "base",
    speed: 8,
    flag: 15
},
{
    dict: "amb@code_human_in_bus_passenger_idles@male@sit@base",
    name: "base",
    speed: 8,
    flag: 15
},
{
    dict: "anim@amb@business@cfm@cfm_machine_no_work@",
    name: "inspecting_hands_operator",
    speed: 8,
    flag: 1
},
{
    dict: "amb@code_human_cower_stand@male@react_cowering",
    name: "base_right",
    speed: 8,
    flag: 1
},
{
    dict: "amb@code_human_cower_stand@male@idle_a",
    name: "idle_b",
    speed: 8,
    flag: 1
}, // 20
{
    dict: "amb@code_human_cower_stand@male@idle_a",
    name: "idle_b",
    speed: 8,
    flag: 1
},
{
    dict: "amb@code_human_cower_stand@female@idle_a",
    name: "idle_c",
    speed: 8,
    flag: 1
},
{
    dict: "amb@code_human_cower_stand@female@base",
    name: "base",
    speed: 8,
    flag: 1
},
{
    dict: "amb@code_human_cower@male@react_cowering",
    name: "base_back_left",
    speed: 8,
    flag: 1
},
{
    dict: "amb@code_human_cower@female@react_cowering",
    name: "base_back_left",
    speed: 8,
    flag: 1
},
{
    dict: "amb@code_human_cower@female@base",
    name: "base",
    speed: 8,
    flag: 1
},
{
    dict: "amb@code_human_cower@female@idle_a",
    name: "idle_c",
    speed: 8,
    flag: 1
},
{
    dict: "amb@world_human_leaning@male@wall@back@foot_up@base",
    name: "base",
    speed: 8,
    flag: 1
},
{
    dict: "amb@world_human_leaning@male@wall@back@foot_up@base",
    name: "base",
    speed: 8,
    flag: 1
},
{
    dict: "amb@world_human_partying@female@partying_beer@base",
    name: "base",
    speed: 8,
    flag: 1
}, // 30
{
    dict: "amb@code_human_police_crowd_control@idle_a",
    name: "idle_b",
    speed: 8,
    flag: 16
},
{
    dict: "amb@world_human_gardener_plant@female@base",
    name: "base_female",
    speed: 8,
    flag: 1
},
{
    dict: "busted",
    name: "idle_2_hands_up",
    speed: 8,
    flag: 2 // 33
},
{
    dict: "misscarsteal2pimpsex",
    name: "shagloop_pimp",
    speed: 2,
    flag: 1
},
{
    dict: "misscarsteal2pimpsex",
    name: "pimpsex_hooker",
    speed: 2,
    flag: 1
},
{
    dict: "amb@world_human_yoga@male@base",
    name: "base_a",
    speed: 2,
    flag: 1 // 36
},
{
    dict: "amb@world_human_yoga@male@base",
    name: "base_b",
    speed: 2,
    flag: 1
},
{
    dict: "missfam5_yoga",
    name: "f_yogapose_b",
    speed: 2,
    flag: 1
},
{
    dict: "timetable@tracy@ig_5@idle_a", // 39
    name: "idle_a",
    speed: 2,
    flag: 1
}, 
{
    dict: "timetable@tracy@ig_5@idle_a",
    name: "idle_b",
    speed: 2,
    flag: 1
},
{
    dict: "timetable@tracy@ig_5@idle_a",
    name: "idle_c",
    speed: 2,
    flag: 1
},
{
    dict :"anim@amb@nightclub@dancers@crowddance_facedj_transitions@", // 42
    name: "trans_dance_facedj_hi_to_li_09_v1_male^2",
    speed: 2,
    flag: 1
},
{
    dict :"anim@amb@nightclub@dancers@crowddance_facedj_transitions@", //43 
    name: "trans_dance_facedj_mi_to_hi_08_v1_male^2",
    speed: 2,
    flag: 1
},
{
    dict :"anim@amb@nightclub@lazlow@hi_dancefloor@",
    name: "crowddance_mi_15_raiseup_laz",
    speed: 2,
    flag: 1
},
{
    dict :"anim@amb@nightclub@lazlow@hi_podium@",
    name: "danceidle_hi_11_buttwiggle_f_laz",
    speed: 2,
    flag: 1
},
{
    dict :"anim@amb@nightclub@dancers@crowddance_facedj@hi_intensity",
    name: "hi_dance_facedj_09_v2_male^6",
    speed: 2,
    flag: 1
},
{
    dict :"anim@amb@nightclub@lazlow@hi_podium@",
    name: "danceidle_hi_06_base_v2_laz",
    speed: 2,
    flag: 1
},
{
    dict: "amb@world_human_sit_ups@male@idle_a", // 48
    name: "idle_c",
    speed: 2,
    flag: 1
},
{
    dict: "busted",
    name: "idle_a",
    speed: 8,
    flag: 1 // 49
},
{
    dict :"amb@code_human_in_car_mp_actions@dance@bodhi@ds@base", // 50
    name: "idle_a_fp",
    speed: 2,
    flag: 1
},
{
    dict :"anim@arena@celeb@podium@no_prop@", // 51
    name: "hands_air_b_1st",
    speed: 2,
    flag: 1
},
{
    dict :"anim@arena@celeb@podium@no_prop@", // 52
    name: "hands_air_c_1st",
    speed: 2,
    flag: 1
},
{
    dict :"anim@mp_player_intcelebrationmale@salute", // 53
    name: "salute",
    speed: 2,
    flag: 0
},
{
    dict :"anim@mp_player_intincarsalutestd@rds@", // 54
    name: "enter",
    speed: 2,
    flag: 48
},
{
    dict :"misscarsteal2pimpsex", // 55 misscarsteal2pimpsex shagloop_hooker 
    name: "shagloop_hooker",
    speed: 2,
    flag: 1
},
{
    dict :"misscarsteal2pimpsex", // 56 misscarsteal2pimpsex pimpsex_punter
    name: "pimpsex_punter",
    speed: 2,
    flag: 1
},
{
    dict :"misscarsteal2pimpsex", // 57 pervert_husband misscarsteal2pimpsex shagloop_pimp
    name: "shagloop_pimp",
    speed: 2,
    flag: 1
},
{
    dict :"misscarsteal2pervert", // 58
    name: "pervert_husband",
    speed: 2,
    flag: 1
},
{
    dict :"misscarsteal2peeing", // 59 
    name: "peeing_loop",
    speed: 2,
    flag: 1
},
{
    dict :"mini@strip_club@lap_dance@ld_girl_a_song_a_p1", // 60
    name: "ld_girl_a_song_a_p1_f",
    speed: 2,
    flag: 1
},
{
    dict :"mini@strip_club@lap_dance@ld_girl_a_song_a_p2", // 61 
    name: "ld_girl_a_song_a_p2_f",
    speed: 2,
    flag: 1
},
{
    dict :"misscarsteal2peeing", // 62
    name: "peeing_loop",
    speed: 2,
    flag: 1
},
{
    dict :"special_ped@mountain_dancer@base", // 63
    name: "base",
    speed: 2,
    flag: 1
},
{
    dict :"special_ped@mountain_dancer@monologue_2@monologue_2a", // 64
    name: "mnt_dnc_angel",
    speed: 2,
    flag: 1
},
{
    dict :"special_ped@mountain_dancer@monologue_3@monologue_3a", // 65
    name: "mnt_dnc_buttwag",
    speed: 2,
    flag: 1
},
];

let isEngineToggleEnabled = true;

exports = (menu) => {

    mp.events.call("setLocalVar", "bootVehicleId", -1); // взаимодействие с багажником авто

    mp.events.add("showSelectorCharacters", (data) => {
        mp.events.call(`hideEnterAccount`);
        mp.events.call(`selectMenu.hide`);
        menu.execute(`selectorCharacters.showSelectorCharacters('${JSON.stringify(data)}')`);

        //mp.events.call("focusOnPlayer", mp.players.local.position, -10);
        mp.players.local.setAlpha(0);
        mp.events.call(`effect`, 'MP_OrbitalCannon', 1);
		mp.game.ui.displayRadar(false);
		mp.game.ui.displayHud(false);
    });

    mp.events.add("authCharacter", (characterIndex) => {
        mp.game.audio.playSoundFrontend(-1, "OK", "HUD_FRONTEND_DEFAULT_SOUNDSET", true);
        mp.events.callRemote("authCharacter", characterIndex);
        //mp.events.call("finishMoveCam");
        //mp.events.call("setFreeze", false);
    });
	
	function finishSelectorCharacters(){
        menu.execute(`hideWindow('#selectorCharacters')`);
        mp.events.call("finishMoveCam");
        mp.events.call("setFreeze", false);
        mp.players.local.setAlpha(0);
    }
	mp.events.add("client::selectSpawn", (value) => {
        mp.events.callRemote("server::initPlayerSpawn", value);
    })
	
    mp.events.add("initNewCharacter", (sex, openSelectMenu = true) => {
        mp.events.call("hideEnterAccount");
        menu.execute("hideWindow('.characterInfo')");
        menu.execute("hideWindow('#createCharacter')");
        menu.execute("hideWindow('#selectorCharacters')");
        mp.events.call("focusOnPlayer", mp.players.local.position, -10);
        mp.keys.unbind(37, false);
        mp.keys.unbind(39, false);
        mp.keys.unbind(13, false);
        mp.events.call("infoTable.hide");
        //if (openSelectMenu) mp.events.call("selectMenu.show", "character_main");
		if (openSelectMenu) mp.events.call("castomMenu.show");
        setCursor(false);
        mp.events.call(`effect`, 'MP_OrbitalCannon', 1);
        var player = mp.players.local;
        var headBlendData = {
            'mother': 2,
            'father': 6,
            'skinColor': 19,
            'similarity': 0.5
        };
        var faceFeatures = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var hairColorDefault = 61;
        var eyeColorDefault = 255;
        var skinColorDefault = 19;
        player.skills = [0, 0, 0, 0, 0, 0, 0];
        player.skillIndex = 0;
        player.sex = sex;
        player.setAlpha(255);
        mp.events.call("player.setHeadBlendData", player, headBlendData);
        mp.events.call("player.setFaceFeatures", player, faceFeatures);
        // mp.events.call("player.setHairColor", player, hairColorDefault);
        mp.events.call("player.setEyeColor", player, eyeColorDefault);

        setFreeze(true);

        mp.events.call("focusOnPlayer", mp.players.local.position, -10);
    });

    mp.events.add("player.setHeadBlendData", (player, headBlendData) => {
        player.setHeadBlendData(headBlendData.mother, headBlendData.father, 0, headBlendData.skinColor, 0,
            headBlendData.similarity, headBlendData.similarity, 0, false, false);
        player.headBlendData = headBlendData;
    });

    mp.events.add("player.setFaceFeatures", (player, faceFeatures) => {
        for (var i = 0; i < faceFeatures.length; i++) {
            player.setFaceFeature(i, faceFeatures[i]);
        }
        player.faceFeatures = faceFeatures;
    });

    /* mp.events.add("player.setHairColor", (player, hairColor) => {
        player.setHairColor(hairColor, hairColor);
        player.hairColor = hairColor;
    }); */

    mp.events.add("player.setEyeColor", (player, eyeColor) => {
        player.setEyeColor(eyeColor);
        player.eyeColor = eyeColor;
    });

    mp.events.add("lightCharacterName", () => {
        menu.execute(`lightTextField('.modal .characterName', '#b44')`);
    });

    mp.events.add("throw.fromvehicle.withkey", (id) => {
      mp.events.call("modal.hide");
      if (!mp.players.local.vehicle) return mp.events.call(`nError`, `Вы не в транспорте!`);
      if (mp.players.local.remoteId == id) return mp.events.call(`nError`, `Вы не можете себя выкинуть!`);
      let players = getOccupants(mp.players.local.vehicle.remoteId);
      if (players.length < 2) return mp.events.call(`nError`, `Транспорт пустой!`);
      for (let i = 0; i < players.length; i++) {
        if (players[i].remoteId == id) return mp.events.callRemote("item.throwfromvehicle", mp.players.local.vehicle.remoteId, players[i].remoteId);
      }
      return mp.events.call(`nError`, "Пассажир не найден!");
    });

    mp.pedsData = [];
    mp.choicePeds = [];
    mp.choicePedIndex = 0;
    mp.pedSlots = [
        new mp.Vector3(-68.36249542236328, -824.1286010742188, 326.083953857421),
        new mp.Vector3(-67.13888549804688, -822.3157958984375, 326.08392333984375),
        new mp.Vector3(-66.46456909179688, -820.1666870117188, 326.08392333984375),
    ];
    mp.pedHeadings = [231.48, 249.65, 266.51];
    var selectMarkers = [];
    mp.events.add("copyPed", (isLast, characterIndex, data) => {
        var player = mp.players.local;
        if (characterIndex == 0) {
            /*mp.events.call("finishMoveCam");
            mp.events.call("hideEnterAccount");
            mp.events.call("modal.hide");
            mp.events.call("setFreeze", true);
            setCursor(false);
            player.setAlpha(0);*/
        }
        mp.pedsData[characterIndex] = data;
        mp.events.call("player.setHeadBlendData", player, data.headBlendData);
        mp.events.call("player.setFaceFeatures", player, data.faceFeatures);
        mp.events.call("player.setEyeColor", player, data.eyeColor);
        // mp.events.call("player.setHairColor", player, data.hairColor);

        var pos = Object.create(mp.pedSlots[characterIndex]);
        mp.events.call("cloneToTarget", data.sex, pos, mp.pedHeadings[characterIndex]);
        pos.z--;
        if (!isLast) setTimeout(() => {
            mp.events.callRemote("copyPed", characterIndex + 1);
        }, 500);
        else {
            if (mp.movingcam) {
                mp.movingcam.setActive(false);
                mp.game.cam.renderScriptCams(false, false, 0, false, false);
            }

            mp.events.call("hideEnterAccount");
            menu.execute(`showCreateCharacterButton()`);
            mp.events.call("modal.hide");
            mp.events.call("setFreeze", true);
            setCursor(true);
            player.setAlpha(0);

            var startPos = Object.create(mp.pedSlots[0]);
            var startH = mp.pedHeadings[0] - 30;
            mp.events.call("focusOnPlayer", startPos, startH);

            var pos = Object.create(mp.pedSlots[0]);
            mp.events.call("focusOnPlayer", pos, mp.pedHeadings[0]);
            initButtonHandlers(mp.choicePeds.length);

            var d = mp.pedsData[mp.choicePedIndex];
            menu.execute(`showCharacterInfo('${JSON.stringify([d.name,d.carsCount+" шт.",d.house,d.biz,d.faction,d.job,d.family])}')`);
            mp.events.call("infoTable.setValues", "character_skills", d.skills);

            createSelectMarkers();
            mp.events.call("setLocalVar", "charactersCount", mp.choicePeds.length);
        }
    });

    function createSelectMarkers() {
        for (var i = 0; i < mp.choicePeds.length; i++) {
            var pos = Object.create(mp.pedSlots[i]);
            pos.z--;
            var color = (i == 0) ? [17, 153, 102, 255] : [255, 255, 255, 120];
            selectMarkers.push(mp.markers.new(25, pos, 1, {
                direction: 0,
                rotation: new mp.Vector3(0, 0, 0),
                color: color,
                visible: true,
                dimension: mp.players.local.dimension
            }));
        }
    }

    function destroySelectMarkers() {
        for (var i = 0; i < selectMarkers.length; i++)
            selectMarkers[i].destroy();
    }

    function markSelectMarker(oldIndex, newIndex) {
        if (newIndex < 0) newIndex = mp.choicePeds.length - 1;
        else if (newIndex >= mp.choicePeds.length) newIndex = 0;

        selectMarkers[oldIndex].destroy();
        selectMarkers[newIndex].destroy();
        var pos = Object.create(mp.pedSlots[oldIndex]);
        pos.z--;
        selectMarkers[oldIndex] = mp.markers.new(25, pos, 1, {
            direction: 0,
            rotation: new mp.Vector3(0, 0, 0),
            color: [255, 255, 255, 120],
            visible: true,
            dimension: mp.players.local.dimension
        });
        var pos = Object.create(mp.pedSlots[newIndex]);
        pos.z--;
        selectMarkers[newIndex] = mp.markers.new(25, pos, 1, {
            direction: 0,
            rotation: new mp.Vector3(0, 0, 0),
            color: [17, 153, 102, 255],
            visible: true,
            dimension: mp.players.local.dimension
        });

    }

    mp.events.add({
        "choiceCharacter.left": () => {
            if (isFlood()) return;
            markSelectMarker(mp.choicePedIndex, mp.choicePedIndex - 1);
            mp.choicePedIndex--;
            if (mp.choicePedIndex < 0) mp.choicePedIndex = mp.choicePeds.length - 1;
            var pos = Object.create(mp.pedSlots[mp.choicePedIndex]);
            mp.events.call("focusOnPlayer", pos, mp.pedHeadings[mp.choicePedIndex]);
            mp.game.audio.playSoundFrontend(-1, "OK", "HUD_FRONTEND_DEFAULT_SOUNDSET", true);

            var d = mp.pedsData[mp.choicePedIndex];
            menu.execute(`showCharacterInfo('${JSON.stringify([d.name,d.carsCount+" шт.",d.house,d.biz,d.faction,d.job,d.family])}')`);
            mp.events.call("infoTable.setValues", "character_skills", d.skills);
        },
        "choiceCharacter.right": () => {
            if (isFlood()) return;
            markSelectMarker(mp.choicePedIndex, mp.choicePedIndex + 1);
            mp.choicePedIndex++;
            if (mp.choicePedIndex >= mp.choicePeds.length) mp.choicePedIndex = 0;
            var pos = Object.create(mp.pedSlots[mp.choicePedIndex]);
            mp.events.call("focusOnPlayer", pos, mp.pedHeadings[mp.choicePedIndex]);
            mp.game.audio.playSoundFrontend(-1, "OK", "HUD_FRONTEND_DEFAULT_SOUNDSET", true);

            var d = mp.pedsData[mp.choicePedIndex];
            menu.execute(`showCharacterInfo('${JSON.stringify([d.name,d.carsCount+" шт.",d.house,d.biz,d.faction,d.job,d.family])}')`);
            mp.events.call("infoTable.setValues", "character_skills", d.skills);
        }
    });

    function initButtonHandlers(charCount) {
        if (charCount > 1) {
            mp.keys.bind(37, false, () => { //left
                mp.events.call("choiceCharacter.left");
            });
            mp.keys.bind(39, false, () => { //right
                mp.events.call("choiceCharacter.right");
            });
        }
        mp.keys.bind(13, false, () => { //enter
            if (isFlood()) return;
            mp.game.audio.playSoundFrontend(-1, "Start", "DLC_HEIST_HACKING_SNAKE_SOUNDS", true);
            mp.keys.unbind(37, false);
            mp.keys.unbind(39, false);
            mp.keys.unbind(13, false);
            mp.events.callRemote("authCharacter", mp.choicePedIndex);

						var player = mp.players.local;

            mp.events.call("finishMoveCam");
            hideWindow(".characterInfo");
            mp.events.call("infoTable.hide");
            setCursor(false);
            mp.events.call("setFreeze", false);
            menu.execute(`hideWindow('#createCharacter')`);
        });

    }

    mp.events.add("cloneToTarget", (sex, pos, heading) => {
        var player = mp.players.local;
        var modelName = (sex == 1) ? 'MP_M_Freemode_01' : 'MP_F_Freemode_01';
        let ped = mp.peds.new(mp.game.joaat(modelName), pos, heading, (streamPed) => {
            player.cloneToTarget(streamPed.handle);
        }, player.dimension);
        mp.choicePeds.push(ped);
    });

    mp.events.add("startFollowToPlayer", (playerId) => {
        var player = mp.players.atRemoteId(playerId);
        if (!player) return;
        followPlayer = player;
    });
    mp.events.add("stopFollowToPlayer", () => {
        followPlayer = null;
    });

		var mainTimerId;

		mp.events.add("vehicle::engineToggleEnable", (state) => {
			isEngineToggleEnabled = state;
		});
		
		mp.keys.bind(0x71, false, () => {
            setCursor(!mp.gui.cursor.visible);
        });
		
    mp.events.add("authCharacter.success", () => {
		finishSelectorCharacters();
        mp.game.ui.setMinimapVisible(false);
        mp.game.ui.displayRadar(true);
        mp.game.player.setHealthRechargeMultiplier(0); //Disable regeneration
		//mp.game.player.restoreStamina(false); //Disable stamina
        mp.events.call("chat.enable", true);
        mp.events.call("inventory.enable", true);
        mp.events.call("playerMenu.enable", true);
        mp.events.call("adminPanel.enable", true);
        mp.events.call("telephone.enable", true);
        mp.events.call("hudControl.enable", true);
        mp.events.call("tablet.police.setEnable", true);
        mp.events.call("tablet.sheriff.setEnable", true);
        mp.events.call("tablet.army.setEnable", true);
        mp.events.call("tablet.fib.setEnable", true);
        mp.events.call("tablet.medic.setEnable", true);
        mp.events.call(`effect`, 'MP_OrbitalCannon', 5);
		setTimeout(() => {
			menu.execute(`hideWindow('#setspawn')`);
		}, 1500);
        var player = mp.players.local;
        mp.players.local.setAlpha(255);
        //mp.events.call('moveSkyCamera', player, 'down');
        setCursor(false);
		
		 menu.execute(`window.welcomeMusicPlayer.off()`)

        menu.execute(`userInterface.__vue__.$data.render=true;`)

        // ALT

        mp.keys.bind(50, true, () => { // кнопка '2'
			if (mp.bindlocker() || !isEngineToggleEnabled) return;
            mp.events.call("vehicleEngineHandler");
        });

        let interectionMenu = 0;
		
		function pointingAt(distance) {	
			const camera = mp.cameras.new("gameplay"); 
			let position = camera.getCoord();
			let direction = camera.getDirection(); 
			let farAway = new mp.Vector3((direction.x * distance) + (position.x), (direction.y * distance) + (position.y), (direction.z * distance) + (position.z));
			let object = mp.raycasting.testPointToPoint(position, farAway, [1, 16]); 
			/*if (raycast && raycast.entity.handle) {
				let object = mp.objects.atHandle(raycast.entity.handle); // You'll get the object if you created it via mp.objects.new
			}*/
			
			return object;
		}
		
		var factionCuffHandlers = {
			'1': (remoteId) => {
				 mp.events.callRemote(`cuffsOnPlayer`, remoteId);
			},
            '2': (remoteId) => {
				 mp.events.callRemote(`cuffsOnPlayer`, remoteId);
			},
            '3': (remoteId) => {
				 mp.events.callRemote(`cuffsOnPlayer`, remoteId);
			},
            '4': (remoteId) => {
				 mp.events.callRemote(`cuffsOnPlayer`, remoteId);
			},
            '9': (remoteId) => {
				 mp.events.callRemote(`cuffsOnPlayerCrime`, remoteId);
			},
            '10': (remoteId) => {
				 mp.events.callRemote(`cuffsOnPlayerCrime`, remoteId);
			},
            '12': (remoteId) => {
				 mp.events.callRemote(`cuffsOnPlayerCrime`, remoteId);
			},
            '13': (remoteId) => {
				 mp.events.callRemote(`cuffsOnPlayerCrime`, remoteId);
			},
            '14': (remoteId) => {
				 mp.events.callRemote(`cuffsOnPlayerCrime`, remoteId);
			},
            '15': (remoteId) => {
				 mp.events.callRemote(`cuffsOnPlayerCrime`, remoteId);
			},
            '16': (remoteId) => {
				 mp.events.callRemote(`cuffsOnPlayerCrime`, remoteId);
			},
            '17': (remoteId) => {
				 mp.events.callRemote(`cuffsOnPlayerCrime`, remoteId);
			},
			'18': (remoteId) => {
				 mp.events.callRemote(`cuffsOnPlayerCrime`, remoteId);
			},
			'19': (remoteId) => {
				 mp.events.callRemote(`cuffsOnPlayerCrime`, remoteId);
			},
			'20': (remoteId) => {
				 mp.events.callRemote(`cuffsOnPlayerCrime`, remoteId);
			},
			'21': (remoteId) => {
				 mp.events.callRemote(`cuffsOnPlayerCrime`, remoteId);
			},
			'22': (remoteId) => {
				 mp.events.callRemote(`cuffsOnPlayerCrime`, remoteId);
			},
			'23': (remoteId) => {
				 mp.events.callRemote(`cuffsOnPlayerCrime`, remoteId);
			},
			'24': (remoteId) => {
				 mp.events.callRemote(`cuffsOnPlayerCrime`, remoteId);
			},
		}
		
		mp.keys.bind(0x36, true, () => { // кнопка '6'
			if (mp.bindlocker()) return;
			var pos = mp.players.local.position;
			var entity = getNearPlayerOrVehicle(pos, 10);
            if (entity) {
                var dist = vdist(pos, entity.position);
                // debug(`dist: ${JSON.stringify(dist)}`);
                if (dist < 10) {
                    if (dist < 2 && entity.type == "player") {
                        if (mp.players.local.remoteId != entity.remoteId) {
                            factionCuffHandlers[mp.clientStorage["faction"]](entity.remoteId)
                        }
                    }
                }
            }
			
		});
		
		mp.keys.bind(71, true, () => { // кнопка 'G'
			if (mp.bindlocker() || mp.players.local.vehicle) return;
			/* Показ меню взаимодействия. */
			var pos = mp.players.local.position;
			var raycast = pointingAt(10)
			if (raycast && raycast.entity.handle) {
				let entity = mp.vehicles.atHandle(raycast.entity.handle);
				if (entity) {
					var dist = vdist(pos, entity.position);
					interectionMenu = 2;
					var bootPos = getBootPosition(entity);
					if (bootPos && vdist(pos, bootPos) < 1.5) {
						mp.events.call("interactionMenu.showVehicleMenu", entity, {
							action: 'showBoot',
							showProducts: true,
						});
					}
					else if (dist < 15) mp.events.call("interactionMenu.showVehicleMenu", entity, {
						action: 'showDoors'
					});
					return
				}
			}
		});
		
		mp.keys.bind(85, true, () => { // кнопка 'u'
			if (mp.bindlocker() || mp.players.local.vehicle) return;
            /* Поднятие предмета с земли. */
            var pos = mp.players.local.position;

            var entity = getNearPlayerOrVehicle(pos, 10);
			entity = mp.players.local;
			var animation = entity.getVariable("animation");
			if (animation) mp.events.callRemote("animation.set", animation);
				
            if (entity) {
                var dist = vdist(pos, entity.position);
                // debug(`dist: ${JSON.stringify(dist)}`);
                if (dist < 10) {
                    if (dist < 2 && entity.type == "player") {
                        interectionMenu = 2;
                        if (mp.players.local.remoteId == entity.remoteId) {
                            mp.events.call("interactionMenu.showPlayerMenu", entity, {
                                action: "showLocal"
                            });
                            return;
                        }
                    }
                }
            }
		});
		
        mp.keys.bind(69, true, () => { // кнопка 'E'
			if (mp.bindlocker() || mp.players.local.vehicle) return;
            /* Поднятие предмета с земли. */
            var pos = mp.players.local.position;
            var itemObj, minDist = 9999;
            mp.objects.forEach((obj) => {
                var objPos = obj.position;
                let dist = mp.game.system.vdist(pos.x, pos.y, pos.z, objPos.x, objPos.y, objPos.z);
                if (dist < mp.clientStorage.maxPickUpItemDist && obj.getVariable("inventoryItemSqlId")) {
                    if (dist < minDist) {
                        minDist = dist;
                        itemObj = obj;
                    }
                }
            });
            if (itemObj && !isFlood() && !mp.players.local.getVariable("attachedObject")) {
                mp.events.callRemote("item.pickUp", itemObj.remoteId);
                return;
            }

            var entity = getNearPlayerOrVehicle(pos, 10);
            /*if (mp.keys.isDown(16)) {
                entity = mp.players.local;
                var animation = entity.getVariable("animation");
                if (animation) mp.events.callRemote("animation.set", animation);
            }*/
            if (entity) {
                var dist = vdist(pos, entity.position);
                // debug(`dist: ${JSON.stringify(dist)}`);
                if (dist < 10) {
                    if (dist < 2 && entity.type == "player") {
                        interectionMenu = 2;
                        if (mp.players.local.remoteId == entity.remoteId) {
                            mp.events.call("interactionMenu.showPlayerMenu", entity, {
                                action: "showLocal"
                            });
                            return;
                        }
                        var attachedObject = mp.players.local.getVariable("attachedObject");
                        var haveProducts = (attachedObject == "prop_box_ammo04a" || attachedObject == "ex_office_swag_pills4");
                        mp.events.call("interactionMenu.showPlayerMenu", entity, {
                            showTransferProducts: haveProducts
                        });
                    }
                }
            }

            var attachedObject = mp.players.local.getVariable("attachedObject");

            /* Кладём товар. */
            if (mp.clientStorage.insideWarehouseProducts && (attachedObject == "prop_box_ammo04a" || attachedObject == "ex_office_swag_pills4") && !isFlood()) mp.events.callRemote("warehouse.push");

            /* Берем товар.*/
            if (!attachedObject && mp.clientStorage.insideProducts && !isFlood()) mp.events.callRemote("products.take");

            /* Сбор урожая. */
            if (!attachedObject && mp.clientStorage.farmJobType != null && !isFlood()) {
                if (mp.isCropping) return mp.events.call(`nError`, "Вы уже собираете урожай!");
                if (mp.players.local.getVariable("knockDown")) return;
                var object = getNearObject(pos, 3);
                if (object) mp.events.callRemote("farm.field.takeCrop", object.remoteId);
            }
        });
        mp.keys.bind(69, false, () => { // кнопка 'E'
            if (interactionEntity) interactionEntity = null;
            mp.events.call("interactionMenu.hide");
			if (mp.bindlocker()) return;
            setCursor(false);
        });
		
		mp.keys.bind(71, false, () => { // кнопка 'G'
            if (interactionEntity) interactionEntity = null;
            mp.events.call("interactionMenu.hide");
			if (mp.bindlocker()) return;
            setCursor(false);
        });

        mp.keys.bind(71, true, () => { // кнопка 'G'
			if (mp.bindlocker() || !mp.players.local.vehicle) return;
            /* Показ меню взаимодействия. */
            var entity = mp.players.local.vehicle;
            if (entity) {
              var isDriver = mp.players.local.vehicle.getPedInSeat(-1) == localPlayer.handle;
              if (!isDriver) return;
              mp.events.call("interactionMenu.showVehicleMenu", entity, {
                  action: 'showEnter'
              });
              interectionMenu = 1;
            }
        });
        mp.keys.bind(71, false, () => { // кнопка 'G'
            if (interectionMenu == 1) {
              mp.events.call("interactionMenu.hide");
              interectionMenu = 0;
			  if (mp.bindlocker()) return;
              setCursor(false);
            }
        });

		require("talrasha/talrasha_module/talrasha_voice.js")(menu);
        menu.execute(`$('.bottomHUD').show()`);
        menu.execute(`authCharacterSuccess()`);

        if (!mp.storage.data.familiar) mp.storage.data.familiar = {};
        var familiarList = mp.storage.data.familiar;
        if (!familiarList[mp.players.local.name]) familiarList[mp.players.local.name] = [];
        familiarList = familiarList[mp.players.local.name];
        for (var i = 0; i < familiarList.length; i++) {
            var rec = getPlayerByName(familiarList[i]);
            if (rec) {
                rec.isFamiliar = true;
            }
        }
		
		function requestAnimDicts() {
		var anims = ["anim@heists@box_carry@", "amb@world_human_bum_slumped@male@laying_on_left_side@base",
			"amb@world_human_gardener_plant@female@base"];
		for (var i = 0; i < anims.length; i++) {
			mp.game.streaming.requestAnimDict(anims[i]);
			while (!mp.game.streaming.hasAnimDictLoaded(anims[i])) {
				mp.game.wait(0);
			}
		}
	}
        destroySelectMarkers();

        clearInterval(mainTimerId);
        mainTimerId = setInterval(() => {
            const localPlayer = mp.players.local;
            
            mp.game.player.setHealthRechargeMultiplier(0); //Disable regeneration
		   // mp.game.player.restoreStamina(false); //

            mp.events.call("inventory.setHealth", mp.players.local.getHealth());
            mp.events.call("inventory.setArmour", mp.players.local.getArmour());

            localPlayer.getAmmoWeapon = (weaponhash) => mp.game.invoke('0x015A522136D7F951', localPlayer.handle, weaponhash);
            localPlayer.currentWeapon = () => mp.game.invoke('0x0A6DB4965674D243', localPlayer.handle);
            localPlayer.getAmmoType = () => mp.game.invoke(`0xa38dcffcea8962fa`, localPlayer.handle, localPlayer.weapon);
            localPlayer.getWeaponSlot = (weaponhash) => mp.game.invoke('0x4215460B9B8B7FA0', weaponhash);

            var weaponHash = localPlayer.currentWeapon();
            var ammo = localPlayer.getAmmoWeapon(weaponHash);
            var ammoType = localPlayer.getAmmoType(localPlayer.weapon);
            var weaponSlot = localPlayer.getWeaponSlot(weaponHash);
            //let ammoClip = mp.game.weapon.getWeaponClipSize(weaponHash);

            var data = { ammo: ammo, ammoType: ammoType, weaponHash: localPlayer.weapon };
            menu.execute(`window.events.call('hudControl', { data: ${JSON.stringify(data)}, event: 'setDataWeapon' })`);

            //var data = { ammo: ammo, ammoType: ammoType, ammoClip: ammoClip, weaponHash: weaponHash };
            //menu.execute(`window.events.call('hudControl', { weapon: ${JSON.stringify(data)}, event: 'weapon' })`);

            if (followPlayer) {
                var pos = followPlayer.position;
                var localPos = mp.players.local.position;
                var dist = mp.game.system.vdist(pos.x, pos.y, pos.z, localPos.x, localPos.y, localPos.z);
                if (dist > 30) {
                    followPlayer = null;
                    return;
                }
                var speed = 3;
                if (dist < 10) speed = 2;
                if (dist < 5) speed = 1;
                mp.players.local.taskFollowNavMeshToCoord(pos.x, pos.y, pos.z, speed, -1, 1, true, 0);
            }

            /*var entity = getNearPlayerOrVehicle(mp.players.local.position, 10);
            if (entity && entity.type == "vehicle" && entity.getVariable("boot")) {
                var bootPos = getBootPosition(entity);
                var distToBoot = vdist(mp.players.local.position, bootPos);
                if (distToBoot < 1) {
                    if (mp.clientStorage.bootVehicleId == -1) {
                        mp.events.callRemote(`vehicle.requestItems`, entity.remoteId);
                        mp.events.call("setLocalVar", "bootVehicleId", entity.remoteId);
                    }
                } else {
                    if (mp.clientStorage.bootVehicleId != -1) {
                        mp.events.callRemote(`vehicle.requestClearItems`, mp.clientStorage.bootVehicleId);
                        mp.events.call("setLocalVar", "bootVehicleId", -1);
                    }
                }
            } else if (mp.clientStorage.bootVehicleId != -1) {
                mp.events.callRemote(`vehicle.requestClearItems`, mp.clientStorage.bootVehicleId);
                mp.events.call("setLocalVar", "bootVehicleId", -1);
            }*/

        }, 100);

        requestAnimDicts();
    });

    var motherSkills = [2, 1, 6, 4, 6, 1, 2, 3, 2, 5, 0, 5, 6, 0, 4, 0, 1, 5, 3, 4, 3, 1];
		var fatherSkills = [4, 2, 4, 2, 1, 3, 6, 2, 5, 3, 1, 5, 0, 4, 6, 1, 5, 0, 3, 0, 3, 2, 6, 3];

    mp.events.add("showCharacterSkills", (fatherIndex, motherIndex) => {
        var player = mp.players.local;

        player.skills = [2, 2, 2, 2, 2, 2, 2];
        player.skills[motherSkills[motherIndex]] += 4;
        player.skills[fatherSkills[fatherIndex]] += 4;
        player.skills[player.skillIndex] += 10;

        mp.events.call("infoTable.setValues", "character_skills", player.skills);
    });

    var attachInfo = {
        "prop_box_ammo04a": {
            offset: {
                x: 0.2,
                y: -0.3,
                z: 0.1,
                rX: -45,
                rY: 20,
                rZ: 120
            },
            bone: 48,
            anim: {
                dict: "anim@heists@box_carry@",
                name: "idle",
                speed: 8,
                flag: 49
            }
        },
        "ex_office_swag_pills4": {
            offset: {
                x: 0.2,
                y: -0.3,
                z: 0.1,
                rX: -45,
                rY: 20,
                rZ: 120
            },
            bone: 48,
            anim: {
                dict: "anim@heists@box_carry@",
                name: "idle",
                speed: 8,
                flag: 49
            }
        },
        "hei_prop_heist_wooden_box": {
            offset: {
                x: 0.0,
                y: -0.3,
                z: 0.3,
                rX: -45.0,
                rY: 20.0,
                rZ: 120.0
            },
            bone: 48,
            anim: {
                dict: "anim@heists@box_carry@",
                name: "idle",
                speed: 8,
                flag: 49
            }
        },
        "prop_bucket_01a": {
            offset: {
                x: 0.2,
                y: -0.37,
                z: 0.2,
                rX: -85.0,
                rY: 0,
                rZ: 20.0
            },
            bone: 44,
            anim: {
                dict: "anim@heists@box_carry@",
                name: "idle",
                speed: 8,
                flag: 49
            }
        },
        "prop_feed_sack_01": {
            offset: {
                x: 0.0,
                y: -0.3,
                z: 0.075,
                rX: -45.0,
                rY: 20.0,
                rZ: 120.0
            },
            bone: 48,
            anim: {
                dict: "anim@heists@box_carry@",
                name: "idle",
                speed: 8,
                flag: 49
            }
        },
        "prop_pizza_box_02": {
            //   offset: {x: 0.0, y: -0.3, z: 0.1, rX: -45.0, rY: 10.0, rZ: 120.0},
            offset: {
                x: 0.0,
                y: -0.3,
                z: 0.0,
                rX: -45.0,
                rY: 0.0,
                rZ: 100.0
            },
            bone: 48,
            anim: {
                dict: "anim@heists@box_carry@",
                name: "idle",
                speed: 8,
                flag: 49
            }
        },
        // take_object 0 hei_prop_heist_binbag
        "hei_prop_heist_binbag": {
            offset: {
                x: 0,
                y: 0,
                z: -0.05,
                rX: -60.0,
                rY: -60.0,
                rZ: 0
            },
            bone: 73,
            anim: {
                dict: "anim@move_m@trash",
                name: "pickup",
                speed: 8,
                flag: 49
            }
        },
        "v_ind_cs_box02": {
            offset: {
                x: 0.0,
                y: -0.3,
                z: 0.3,
                rX: -45.0,
                rY: 10.0,
                rZ: 120.0
            },
            bone: 48,
            anim: {
                dict: "anim@heists@box_carry@",
                name: "idle",
                speed: 8,
                flag: 49
            }
        },
        "prop_veg_crop_03_pump": {
            offset: {
                x: 0.2,
                y: -0.3,
                z: 0.1,
                rX: -45,
                rY: 20,
                rZ: 120
            },
            bone: 48,
            anim: {
                dict: "anim@heists@box_carry@",
                name: "idle",
                speed: 8,
                flag: 49
            }
        },
        "prop_veg_crop_03_cab": {
            offset: {
                x: 0.2,
                y: -0.3,
                z: 0.1,
                rX: -45,
                rY: 20,
                rZ: 120
            },
            bone: 48,
            anim: {
                dict: "anim@heists@box_carry@",
                name: "idle",
                speed: 8,
                flag: 49
            }
        },
        "prop_weed_02": {
            offset: {
                x: 0.2,
                y: -0.3,
                z: 0.1,
                rX: -45,
                rY: 20,
                rZ: 120
            },
            bone: 48,
            anim: {
                dict: "anim@heists@box_carry@",
                name: "idle",
                speed: 8,
                flag: 49
            }
        },
        "prop_cs_trowel": {
            offset: {
                x: 0.01,
                y: 0.03,
                z: 0,
                rX: -119,
                rY: 10,
                rZ: 90
            },
            bone: 77,
            anim: {
                dict: "amb@world_human_gardener_plant@female@base",
                name: "base_female",
                speed: 8,
                flag: 1
            }
        },
		"prop_money_bag_01": {
            offset: {
                x: 0.2,
                y: 0.02,
                z: 0,
                rX: 0,
                rY: 270,
                rZ: 60
            },
            boner: 12844,
        },
    };
    var attachedObjects = {};
    var vehAttachedObjects = {};
    mp.takeObject = (entity, value) => {
        var info = attachInfo[value];
        if (!info) return attachInfo[value];
        var pos = entity.position;
		if (info.anim) {
			var a = info.anim;
			entity.clearTasksImmediately();
			entity.taskPlayAnim(a.dict, a.name, a.speed, 0, -1, a.flag, 0, false, false, false);
		}
        if (attachedObjects[entity.remoteId]) {
            attachedObjects[entity.remoteId].destroy();
            delete attachedObjects[entity.remoteId];
        }
        attachedObjects[entity.remoteId] = mp.objects.new(mp.game.joaat(value), pos, {
            rotation: new mp.Vector3(0, 0, 30),
            dimension: -1
        });
		var i = 10
		var attach = setInterval(() => { // Пытаемся заатачить 2 сек 
			if (i == 0) clearInterval(attach);
			if(attachedObjects[entity.remoteId].handle !== 0) {
				var o = info.offset;
				if (info.boner) attachedObjects[entity.remoteId].attachTo(entity.handle, entity.getBoneIndex(info.boner), o.x, o.y, o.z, o.rX, o.rY, o.rZ, true, true, false, true, 1, true);
				else attachedObjects[entity.remoteId].attachTo(entity.handle, info.bone, o.x, o.y, o.z, o.rX, o.rY, o.rZ, false, false, false, false, 2, true);
				
				clearInterval(attach);
			}
			i--
		}, 100);
    };
    mp.putObject = (entity, value) => {
        if (attachedObjects[entity.remoteId]) {
            attachedObjects[entity.remoteId].destroy();
            delete attachedObjects[entity.remoteId];
        }
        entity.clearTasksImmediately();
    };
    mp.events.addDataHandler("attachedObject", (entity, value) => {
        if (entity.type == "player") {
            if (!value) mp.putObject(entity, value);
            else mp.takeObject(entity, value);

            if (mp.players.local.remoteId == entity.remoteId) {
                throwAttachedObject = false;
            }
        }
    });
    mp.events.addDataHandler("animation", (entity, value) => {
        // debug(`setVariable: ${entity.name} animation ${value}`)
        if (entity.type == "player") {
            entity.clearTasksImmediately();
            if (value === null) return;
            value = Math.clamp(value, 0, animationInfo.length - 1);
            var a = animationInfo[value];
            mp.game.streaming.requestAnimDict(a.dict);
            while (!mp.game.streaming.hasAnimDictLoaded(a.dict)) {
                mp.game.wait(0);
            }
            entity.taskPlayAnim(a.dict, a.name, a.speed, 0, -1, a.flag, 0, false, false, false);
        }
    });

    mp.events.add("playAnim", (playerId, index) => {
        var player = mp.players.atRemoteId(playerId);
        if (!player) return;
        player.clearTasksImmediately();
        if (index === null) return;
        index = Math.clamp(index, 0, animationInfo.length - 1);
        var a = animationInfo[index];
        mp.game.streaming.requestAnimDict(a.dict);
        while (!mp.game.streaming.hasAnimDictLoaded(a.dict)) {
            mp.game.wait(0);
        }
        player.taskPlayAnim(a.dict, a.name, a.speed, 0, -1, a.flag, 0, false, false, false);

        if (player.remoteId == mp.players.local.remoteId) {
            if (index == 32) { // сбор урожая на ферме
                mp.isCropping = true;
                setTimeout(() => {
                    delete mp.isCropping;
                }, 7000);
            }
        }
    });

    mp.events.add("testAttach", (model, bone, x, y, z, rX, rY, rZ) => {
        if (attachedObjects[mp.players.local.remoteId]) attachedObjects[mp.players.local.remoteId].destroy();
        attachedObjects[mp.players.local.remoteId] = mp.objects.new(mp.game.joaat(model), mp.players.local.position, {
            rotation: new mp.Vector3(0, 0, 30),
            dimension: -1
        });
        attachedObjects[mp.players.local.remoteId].attachTo(mp.players.local.handle, bone, x, y, z, rX, rY, rZ,
            false, false, false, false, 2, true);
    });

    mp.events.add("testAttachOff", () => {
        if (attachedObjects[mp.players.local.remoteId]) attachedObjects[mp.players.local.remoteId].destroy();
    });

    mp.events.add("testVehAttach", (model, bone, x, y, z, rX, rY, rZ, number) => {
        if (!number) number = 0;
        var veh = mp.players.local.vehicle;
        if (!veh) return;
        if (!vehAttachedObjects[veh.remoteId]) vehAttachedObjects[veh.remoteId] = {};
        if (vehAttachedObjects[veh.remoteId][number]) vehAttachedObjects[veh.remoteId][number].destroy();
        vehAttachedObjects[veh.remoteId][number] = mp.objects.new(mp.game.joaat(model), veh.position, {
            rotation: new mp.Vector3(0, 0, 30),
            dimension: -1
        });
        vehAttachedObjects[veh.remoteId][number].attachTo(veh.handle, bone, x, y, z, rX, rY, rZ,
            false, false, false, false, 2, true);
    });

    mp.events.add("testVehAttachOff", (number) => {
        var veh = mp.players.local.vehicle;
        if (!veh) return;
        if (vehAttachedObjects[veh.remoteId] && vehAttachedObjects[veh.remoteId][number]) vehAttachedObjects[veh.remoteId][number].destroy();
    });
}
