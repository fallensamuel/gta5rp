/*
	10.11.2018 created by Carter.

	События для обработки и показа/скрытия меню.
*/

const characterRotator = require("talrasha/talrasha_module/talrasha_helper/talrasha_character_rotator.js");

function playFocusSound() {
    mp.game.audio.playSoundFrontend(-1, "NAV_UP_DOWN", "HUD_FRONTEND_DEFAULT_SOUNDSET", true);
}

function playBackSound() {
    mp.game.audio.playSoundFrontend(-1, "CANCEL", "HUD_FRONTEND_DEFAULT_SOUNDSET", true);
}

function playSelectSound() {
    mp.game.audio.playSoundFrontend(-1, "SELECT", "HUD_FRONTEND_DEFAULT_SOUNDSET", true);
}

exports = (menu) => {
	const action_npc_menus = [
        'enter_biz_3', 'enter_biz_4', 'enter_biz_5', 'enter_biz_6', 'enter_biz_7', 'enter_biz_8', 'enter_biz_9', 'enter_biz_10',
        'enter_biz_12', 'enter_biz_13', 'enter_biz_14', 'enter_biz_15', 'enter_biz_16', 'enter_biz_17', 'enter_biz_18', 'enter_biz_19', 'enter_biz_20'
    ];
    var prevMenuName = "";
	let lastPlayerInfo = false;
	
    var showHandlers = {
        "enter_biz_3": () => {
            var counts = getArrayClothesCounts();
            mp.events.callRemote(`requestClothes`, JSON.stringify(counts));
        },
		"enter_biz_18": () => {
            var counts = getArrayClothesCounts();
            mp.events.callRemote(`requestClothes`, JSON.stringify(counts));
        },
		"enter_biz_13": () => {
            var counts = getArrayClothesCounts();
            mp.events.callRemote(`requestClothes`, JSON.stringify(counts));
        },
		"enter_biz_20": () => {
            var counts = getArrayClothesCounts();
            mp.events.callRemote(`requestClothes`, JSON.stringify(counts));
        },
		"biz_13_clothes": () => {
            var clothes = mp.storage.data.clothes.masks[1];
            var items = clothesConvertToMenuItems(clothes);
            items.push({
                text: "Вернуться"
            });
            menu.execute(`selectMenuAPI.setSpecialItems('biz_13_clothes', '${JSON.stringify(items)}')`);
        },
		"biz_20_clothes": () => {
            var clothes = mp.storage.data.clothes.bags[mp.clientStorage.sex];
            var items = clothesConvertToMenuItems(clothes);
            items.push({
                text: "Вернуться"
            });
            menu.execute(`selectMenuAPI.setSpecialItems('biz_20_clothes', '${JSON.stringify(items)}')`);
			setCursor(false);
			
        },
        "biz_3_top": () => {
            var clothes = mp.storage.data.clothes.top[mp.clientStorage.sex];
            var items = clothesConvertToMenuItems(clothes);
            items.push({
                text: "Вернуться"
            });
            menu.execute(`selectMenuAPI.setSpecialItems('biz_3_top', '${JSON.stringify(items)}')`);
			focusMenu("body")
        },
        "biz_3_legs": () => {
            var clothes = mp.storage.data.clothes.legs[mp.clientStorage.sex];
            var items = clothesConvertToMenuItems(clothes);
            items.push({
                text: "Вернуться"
            });
            menu.execute(`selectMenuAPI.setSpecialItems('biz_3_legs', '${JSON.stringify(items)}')`);
			focusMenu("legs")
        },
        "biz_3_feets": () => {
            var clothes = mp.storage.data.clothes.feets[mp.clientStorage.sex];
            var items = clothesConvertToMenuItems(clothes);
            items.push({
                text: "Вернуться"
            });
            menu.execute(`selectMenuAPI.setSpecialItems('biz_3_feets', '${JSON.stringify(items)}')`);
			focusMenu("feets")
        },
        "biz_3_hats": () => {
            var clothes = mp.storage.data.clothes.hats[mp.clientStorage.sex];
            var items = clothesConvertToMenuItems(clothes);
            items.push({
                text: "Вернуться"
            });
            menu.execute(`selectMenuAPI.setSpecialItems('biz_3_hats', '${JSON.stringify(items)}')`);
			focusMenu("head")
        },
		"biz_3_undershirts": () => {
            var clothes = mp.storage.data.clothes.undershirts[mp.clientStorage.sex];
            var items = clothesConvertToMenuItems(clothes);
            items.push({
                text: "Вернуться"
            });
            menu.execute(`selectMenuAPI.setSpecialItems('biz_3_undershirts', '${JSON.stringify(items)}')`);
			focusMenu("body")
        },
        "biz_18_glasses": () => {
            var clothes = mp.storage.data.clothes.glasses[mp.clientStorage.sex];
            var items = clothesConvertToMenuItems(clothes);
            items.push({
                text: "Вернуться"
            });
            menu.execute(`selectMenuAPI.setSpecialItems('biz_18_glasses', '${JSON.stringify(items)}')`);
			focusMenu("head")
        },
        "biz_18_bracelets": () => {
            var clothes = mp.storage.data.clothes.bracelets[mp.clientStorage.sex];
            var items = clothesConvertToMenuItems(clothes);
            items.push({
                text: "Вернуться"
            });
            menu.execute(`selectMenuAPI.setSpecialItems('biz_18_bracelets', '${JSON.stringify(items)}')`);
			focusMenu("body")
        },
        "biz_18_ears": () => {
            var clothes = mp.storage.data.clothes.ears[mp.clientStorage.sex];
            var items = clothesConvertToMenuItems(clothes);
            items.push({
                text: "Вернуться"
            });
            menu.execute(`selectMenuAPI.setSpecialItems('biz_18_ears', '${JSON.stringify(items)}')`);
			focusMenu("head")
        },
        "biz_18_ties": () => {
            var clothes = mp.storage.data.clothes.ties[mp.clientStorage.sex];
            var items = clothesConvertToMenuItems(clothes);
            items.push({
                text: "Вернуться"
            });
            menu.execute(`selectMenuAPI.setSpecialItems('biz_18_ties', '${JSON.stringify(items)}')`);
			focusMenu("head")
        },
        "biz_18_watches": () => {
            var clothes = mp.storage.data.clothes.watches[mp.clientStorage.sex];
            var items = clothesConvertToMenuItems(clothes);
            items.push({
                text: "Вернуться"
            });
            menu.execute(`selectMenuAPI.setSpecialItems('biz_18_watches', '${JSON.stringify(items)}')`);
			focusMenu("body")
        },
    };
    
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

    mp.events.add("selectMenu.show", (menuName, selectedIndex = 0, values = null) => {
        // if (mp.players.local.vehicle) return;
        if (values) values = JSON.stringify(values);
        if (showHandlers[menuName]) showHandlers[menuName]();
		
		/*if (showHandlers[menuName] && menuName != 'enter_biz_3' && menuName != 'enter_biz_13' && menuName != 'enter_biz_18' && menuName != 'enter_biz_20') {
            return
        };*/
		
        //menu.execute(`selectMenuAPI.show('${menuName}', ${selectedIndex}, '${values}')`);
		if (action_npc_menus.indexOf(menuName) != -1) {
            menu.execute(`action_npc.show('${menuName}', '${values}')`);
        } else {
            menu.execute(`selectMenuAPI.show('${menuName}', ${selectedIndex}, '${values}')`);
        }
    });
	
	mp.keys.bind(0x45, false, function () { // E
        if (isFlood()) return;
		if (mp.bindlocker()) return;
		mp.events.callRemote("menuspresse");
		//setFreeze(true);
		mp.events.call("prompt.hide");
    });
	
	mp.events.add("selectMenuTalRasha.show", (menuName, selectedIndex = 0, values = null) => {
        // if (mp.players.local.vehicle) return;
        if (values) values = JSON.stringify(values);
        if (showHandlers[menuName]) showHandlers[menuName]();
		
		/*if (showHandlers[menuName] && menuName != 'enter_biz_3' && menuName != 'enter_biz_13' && menuName != 'enter_biz_18' && menuName != 'enter_biz_20') {
            return
        };*/
		
        //menu.execute(`selectMenuAPI.show('${menuName}', ${selectedIndex}, '${values}')`);
		if (action_npc_menus.indexOf(menuName) != -1) {
            menu.execute(`action_npc.show('${menuName}', '${values}')`);
        } else {
            menu.execute(`selectMenuAPITalRasha.show('${menuName}', ${selectedIndex}, '${values}')`);
        }
    });
	
	mp.events.add("clothesShop.open", (open, menuName, id) => {
		if (open) {
			if (lastPlayerInfo) return;
			
			lastPlayerInfo = {x: mp.players.local.position.x, y: mp.players.local.position.y, z: mp.players.local.position.z, currentEnteredClothesShopId: id};
			mp.players.local.position = new mp.Vector3(dressingRooms[lastPlayerInfo.currentEnteredClothesShopId].x, dressingRooms[lastPlayerInfo.currentEnteredClothesShopId].y, dressingRooms[lastPlayerInfo.currentEnteredClothesShopId].z);
			setFreeze(true);
			
			if (id == 123) focusMenu("head");
			else if (id == 127) focusMenu("body");
			else if (id == 129) focusMenu("body"), characterRotator.start(), setCursor(true);
			else focusMenu("character");
			
			var values = null
			var selectedIndex = 0
			if (showHandlers[menuName]) showHandlers[menuName]();
			
			menu.execute(`selectMenuAPITalRasha.show('${menuName}', ${selectedIndex}, '${values}')`);
		}
		else {
			focusMenu("finish")
			setFreeze(false);
			if (lastPlayerInfo.currentEnteredClothesShopId == 129) characterRotator.stop(), setCursor(false);
			mp.players.local.position = new mp.Vector3(lastPlayerInfo.x, lastPlayerInfo.y, lastPlayerInfo.z);
			//mp.players.local.position = new mp.Vector3(dressingRooms[lastPlayerInfo.currentEnteredClothesShopId].x, dressingRooms[lastPlayerInfo.currentEnteredClothesShopId].y, dressingRooms[lastPlayerInfo.currentEnteredClothesShopId].z);
			lastPlayerInfo = false;
		}
	});
    
    mp.events.add("selectMenu.hide", () => {
        menu.execute(`selectMenuAPI.hide()`);
		menu.execute(`selectMenuAPITalRasha.hide()`);
		menu.execute(`action_npc.forceHide()`);
    });
	
	mp.events.add("selectMenuTalRasha.hide", () => {
		menu.execute(`selectMenuAPITalRasha.hide()`);
    });

    mp.events.add("selectMenu.clearState", (menuName) => {
        menu.execute(`selectMenuAPI.clearState('${menuName}')`);
    });

    mp.events.add("selectMenu.setItems", (menuName, itemsName) => {
        menu.execute(`selectMenuAPI.setItems('${menuName}', '${itemsName}')`);
    });

    mp.events.add("selectMenu.setSpecialItems", (menuName, items) => {
        menu.execute(`selectMenuAPI.setSpecialItems('${menuName}', '${JSON.stringify(items)}')`);
    });

    mp.events.add("selectMenu.setHeader", (menuName, header) => {
        menu.execute(`selectMenuAPI.setHeader('${menuName}', '${header}')`);
    });

    mp.events.add("selectMenu.setPrompt", (menuName, text) => {
        menu.execute(`selectMenuAPI.setPrompt('${menuName}', '${text}')`);
    });

    mp.events.add("selectMenu.setItemValueIndex", (menuName, itemIndex, index) => {
        menu.execute(`selectMenuAPI.setItemValueIndex('${menuName}', ${itemIndex}, ${index})`);
    });

    mp.events.add("selectMenu.setItemName", (menuName, index, newName) => {
        menu.execute(`selectMenuAPI.setItemName('${menuName}', ${index}, ${newName})`);
    });

    var menuHandlers = {
        /* "character_main": {
            "Наследственность": () => {
                mp.events.call('selectMenu.show', 'character_parents');
                mp.events.call('showCharacterSkills');
                mp.events.call("focusOnHead", mp.players.local.position, -10);
            },
            "Внешность": () => {
                mp.events.call('selectMenu.show', 'character_look');
                mp.events.call("focusOnHead", mp.players.local.position, -10);
            },
            "Одежда": () => {
                mp.events.call('selectMenu.show', 'character_clothes');
                mp.events.call("focusOnBody", mp.players.local.position, -10);
            },
            "Далее": () => {
                if (!isFlood()) menu.execute(`regCharacterHandler()`);
                //mp.events.call("selectMenu.hide");
                //mp.events.call("modal.show", "character_reg");
                //setCursor(true);
            }
        },
        "character_parents": {
            "Вернуться": () => {
                mp.events.call('selectMenu.show', 'character_main', 2);
                hideWindow(".infoTable");
                mp.events.call("focusOnPlayer", mp.players.local.position, -10);
            }
        },
        "character_look": {
            "Вернуться": () => {
                mp.events.call('selectMenu.show', 'character_main', 3);
                mp.events.call("focusOnPlayer", mp.players.local.position, -10);
            }
        },
        "character_clothes": {
            "Вернуться": () => {
                mp.events.call('selectMenu.show', 'character_main', 4);
                mp.events.call("focusOnPlayer", mp.players.local.position, -10);
            }
        }, */
        /*"!enter_house": {
        	"Войти в дом": () => {
        		if (!isFlood()) mp.events.callRemote("enterHouse");
        	},
        	"Позвонить в звонок": () => {

        	},
        	"Информация о доме": () => {
        		if (!isFlood()) {
        			mp.events.callRemote("getHouseInfo");
        			mp.events.call("selectMenu.hide");
        		}
        	},
        },*/
        /*"!exit_house": {
        	"Выйти на улицу": () => {
        		if (!isFlood()) mp.events.callRemote(`goEnterStreet`);
        	},
        },*/
		/*"enter_garage": {
        	"Войти в гараж": () => {
        		if (!isFlood()) mp.events.callRemote("goEnterGarage");
        	},
        	"Информация о гараже": () => {
        		if (!isFlood()) {
        			mp.events.callRemote("getGarageInfo");
        			mp.events.call("selectMenu.hide");
        		}
        	}
        },
        "enter_garage": {
        	"Войти в гараж": () => {
        		if (!isFlood()) mp.events.callRemote("goEnterGarage");
        	},
        	"Информация о гараже": () => {
        		if (!isFlood()) {
        			mp.events.callRemote("getGarageInfo");
        			mp.events.call("selectMenu.hide");
        		}
        	}
        },*/
        /*"exit_garage": {
        	"Выйти в дом": () => {
        		if (!isFlood()) mp.events.callRemote(`goExitGarage`);
        	},
        },*/
        "enter_biz_1": {
            "Купить бизнес": () => {
                if (!isFlood()) {
                    mp.events.callRemote("biz.show", "biz_buy");
                    mp.events.call("selectMenu.hide");
                }
            },
			"Выход": () => {
				menu.execute('action_npc.forceHide()');
				setCursor(false);
            },
            "Панель управления": () => {
                prevMenuName = "enter_biz_1";
                mp.events.call("selectMenu.show", "biz_panel");
				setCursor(false);
				menu.execute('action_npc.forceHide()');
            }
        },
        "enter_biz_2": {
            "Купить бизнес": () => {
                if (!isFlood()) {
                    mp.events.callRemote("biz.show", "biz_buy");
                    mp.events.call("selectMenu.hide");
                }
            },
			"Выход": () => {
				menu.execute('action_npc.forceHide()');
				setCursor(false);
            },
            "Панель управления": () => {
                prevMenuName = "enter_biz_2";
                mp.events.call("selectMenu.show", "biz_panel");
				setCursor(false);
				menu.execute('action_npc.forceHide()');
            }
        },
		"enter_biz_13": {
            "Примерочная": () => {
				mp.events.callRemote("clothesShop.open", true, "biz_13_clothes");
				menu.execute('action_npc.forceHide()');
				setCursor(false);
            },
			"Выход": () => {
				menu.execute('action_npc.forceHide()');
				setCursor(false);
            },
            "Купить бизнес": () => {
                if (!isFlood()) {
                    mp.events.callRemote("biz.show", "biz_buy");
                    mp.events.call("selectMenu.hide");
                }
            },
            "Панель управления": () => {
                prevMenuName = "enter_biz_13";
                mp.events.call("selectMenu.show", "biz_panel");
				setCursor(false);
				menu.execute('action_npc.forceHide()');
            }
        },
		"enter_biz_18": {
            "Примерочная": () => {
                //mp.events.callRemote("biz_3.clearItems");
				mp.events.callRemote("clothesShop.open", true, "biz_18_clothes");
				menu.execute('action_npc.forceHide()');
				setCursor(false);
            },
			"Выход": () => {
				menu.execute('action_npc.forceHide()');
				setCursor(false);
            },
            "Купить бизнес": () => {
                if (!isFlood()) {
                    mp.events.callRemote("biz.show", "biz_buy");
                    mp.events.call("selectMenu.hide");
                }
            },
            "Панель управления": () => {
                prevMenuName = "enter_biz_18";
                mp.events.call("selectMenu.show", "biz_panel");
				setCursor(false);
				menu.execute('action_npc.forceHide()');
            }
        },
        "biz_18_clothes": {
            "Очки": () => {
                var comp = mp.storage.data.clothes.glasses[mp.clientStorage.sex][0];
                mp.players.local.setPropIndex(1, comp.variation, comp.textures[0], true);
                mp.events.call("selectMenuTalRasha.show", "biz_18_glasses");
            },
            "Браслеты": (itemValue, itemIndex) => {
                var comp = mp.storage.data.clothes.bracelets[mp.clientStorage.sex][0];
                mp.players.local.setPropIndex(7, comp.variation, comp.textures[0], true);
                mp.events.call("selectMenuTalRasha.show", "biz_18_bracelets");
            },
            "Серьги": (itemValue, itemIndex) => {
                var comp = mp.storage.data.clothes.ears[mp.clientStorage.sex][0];
                mp.players.local.setPropIndex(2, comp.variation, comp.textures[0], true);
                mp.events.call("selectMenuTalRasha.show", "biz_18_ears");
            },
            "Маски": (itemValue, itemIndex) => {
                var comp = mp.storage.data.clothes.masks[1][0];
                mp.players.local.setComponentVariation(1, comp.variation, comp.textures[0], 0);
                mp.events.call("selectMenuTalRasha.show", "biz_18_masks");
            },
            "Аксессуары": (itemValue, itemIndex) => {
                var comp = mp.storage.data.clothes.ties[mp.clientStorage.sex][0];
                mp.players.local.setComponentVariation(7, comp.variation, comp.textures[0], 0);
                mp.events.call("selectMenuTalRasha.show", "biz_18_ties");
            },
            "Часы": (itemValue, itemIndex) => {
                var comp = mp.storage.data.clothes.watches[mp.clientStorage.sex][0];
                mp.players.local.setPropIndex(6, comp.variation, comp.textures[0], true);
                mp.events.call("selectMenuTalRasha.show", "biz_18_watches");
            },
            "Вернуться": () => {
				mp.events.callRemote("clothesShop.open", false, "enter_biz_18");
				mp.events.call("selectMenu.hide");
            },
        },
		"enter_biz_20": {
            "Примерочная": () => {
				mp.events.callRemote("clothesShop.open", true, "biz_20_clothes");
				menu.execute('action_npc.forceHide()');
            },
			"Выход": () => {
				menu.execute('action_npc.forceHide()');
				setCursor(false);
            },
            "Купить бизнес": () => {
                if (!isFlood()) {
                    mp.events.callRemote("biz.show", "biz_buy");
                    mp.events.call("selectMenu.hide");
                }
            },
            "Панель управления": () => {
                prevMenuName = "enter_biz_20";
                mp.events.call("selectMenu.show", "biz_panel");
				setCursor(false);
				menu.execute('action_npc.forceHide()');
            }
        },
        "enter_biz_3": {
            "Примерочная": () => {
                //mp.events.callRemote("biz_3.clearItems");
				mp.events.callRemote("clothesShop.open", true, "biz_3_clothes");
				menu.execute('action_npc.forceHide()');
				setCursor(false);
				
            },
			"Выход": () => {
				menu.execute('action_npc.forceHide()');
				setCursor(false);
            },
            "Купить бизнес": () => {
                if (!isFlood()) {
                    mp.events.callRemote("biz.show", "biz_buy");
                    mp.events.call("selectMenu.hide");
                }
            },
            "Панель управления": () => {
                prevMenuName = "enter_biz_3";
                mp.events.call("selectMenu.show", "biz_panel");
				setCursor(false);
				menu.execute('action_npc.forceHide()');
            }
        },
        "biz_3_clothes": {
            "Верхняя одежда": (itemValue, itemIndex) => {
                var comp = mp.storage.data.clothes.top[mp.clientStorage.sex][0];
                mp.players.local.setComponentVariation(3, comp.torso, 0, 0);
                mp.players.local.setComponentVariation(11, comp.variation, comp.textures[0], 0);
                mp.events.call("selectMenuTalRasha.show", "biz_3_top");
            },
            "Нижняя одежда": () => {
                var comp = mp.storage.data.clothes.legs[mp.clientStorage.sex][0];
                mp.players.local.setComponentVariation(4, comp.variation, comp.textures[0], 0);
                mp.events.call("selectMenuTalRasha.show", "biz_3_legs");
            },
            "Обувь": () => {
                var comp = mp.storage.data.clothes.feets[mp.clientStorage.sex][0];
                mp.players.local.setComponentVariation(6, comp.variation, comp.textures[0], 0);
                mp.events.call("selectMenuTalRasha.show", "biz_3_feets");
            },
            "Головные уборы": () => {
                var comp = mp.storage.data.clothes.hats[mp.clientStorage.sex][0];
                mp.players.local.setPropIndex(0, comp.variation, comp.textures[0], true);
                mp.events.call("selectMenuTalRasha.show", "biz_3_hats");
            },
			"Майки": () => {
                var comp = mp.storage.data.clothes.undershirts[mp.clientStorage.sex][0];
				mp.players.local.setComponentVariation(8, comp.variation, comp.textures[0], 0);	
                mp.events.call("selectMenuTalRasha.show", "biz_3_undershirts");
            },
            "Вернуться": () => {
				mp.events.callRemote("clothesShop.open", false, "enter_biz_3");
				mp.events.call("selectMenu.hide");
               // mp.events.call("selectMenu.show", "enter_biz_3");
            },
        },
        "biz_3_top": {
            "Вернуться": () => {
                mp.events.call("selectMenuTalRasha.show", "biz_3_clothes");
            },
        },
		"biz_13_clothes": {
            "Вернуться": () => {
				mp.events.callRemote("clothesShop.open", false, "enter_biz_13");
				mp.events.call("selectMenu.hide");
                //mp.events.call("selectMenu.show", "enter_biz_13");
            },
        },
		"biz_20_clothes": {
            "Вернуться": () => {
				mp.events.callRemote("clothesShop.open", false, "enter_biz_20");
				mp.events.call("selectMenu.hide");
                //mp.events.call("selectMenu.show", "enter_biz_13");
            },
        },
        "biz_3_legs": {
            "Вернуться": () => {
                mp.events.call("selectMenuTalRasha.show", "biz_3_clothes", 1);
            },
        },
        "biz_3_feets": {
            "Вернуться": () => {
                mp.events.call("selectMenuTalRasha.show", "biz_3_clothes", 2);
            },
        },
        "biz_3_hats": {
            "Вернуться": () => {
                mp.events.call("selectMenuTalRasha.show", "biz_3_clothes", 3);
            },
        },
		"biz_3_undershirts": {
            "Вернуться": () => {
                mp.events.call("selectMenuTalRasha.show", "biz_3_clothes", 4);
            },
        },
        "biz_18_glasses": {
            "Вернуться": () => {
                mp.events.call("selectMenuTalRasha.show", "biz_18_clothes", 0);
            },
        },
        "biz_18_bracelets": {
            "Вернуться": () => {
                mp.events.call("selectMenuTalRasha.show", "biz_18_clothes", 1);
            },
        },
        "biz_18_ears": {
            "Вернуться": () => {
                mp.events.call("selectMenuTalRasha.show", "biz_18_clothes", 2);
            },
        },
        "biz_3_masks": {
            "Вернуться": () => {
                mp.events.call("selectMenuTalRasha.show", "biz_3_clothes", 0);
            },
        },
        "biz_18_ties": {
            "Вернуться": () => {
                mp.events.call("selectMenuTalRasha.show", "biz_18_clothes", 3);
            },
        },
        "biz_18_watches": {
            "Вернуться": () => {
                mp.events.call("selectMenuTalRasha.show", "biz_18_clothes", 4);
            },
        },
        "enter_biz_4": {
			"Понятно": () => {
				mp.events.call("selectMenu.hide");
				setCursor(false);
            },
			"Выход": () => {
				menu.execute('action_npc.forceHide()');
				setCursor(false);
            },
            "Купить бизнес": () => {
                if (!isFlood()) {
                    mp.events.callRemote("biz.show", "biz_buy");
                    mp.events.call("selectMenu.hide");
                }
            },
            "Панель управления": () => {
                prevMenuName = "enter_biz_4";
                mp.events.call("selectMenu.show", "biz_panel");
				setCursor(false);
				menu.execute('action_npc.forceHide()');
            }
        },
        "enter_biz_5": {
            "Топливо": () => {
                mp.events.call('selectMenuTalRasha.show', 'biz_5_items');
				menu.execute('action_npc.forceHide()');
				setCursor(false);
            },
			"Выход": () => {
				menu.execute('action_npc.forceHide()');
				setCursor(false);
            },
            "Купить бизнес": () => {
                if (!isFlood()) {
                    mp.events.callRemote("biz.show", "biz_buy");
                    mp.events.call("selectMenu.hide");
                }
            },
            "Панель управления": () => {
                prevMenuName = "enter_biz_5";
                mp.events.call("selectMenu.show", "biz_panel");
				setCursor(false);
				menu.execute('action_npc.forceHide()');
            }
        },
        "biz_5_items": {
            "Заправить": (value) => {
                mp.events.callRemote("biz_5.buyItem", 0, parseInt(value));
            },
            "Пополнить канистру": (value) => {
                mp.events.callRemote("biz_5.buyItem", 1);
            },
            "Вернуться": () => {
				mp.events.call("selectMenu.hide");
            },
        },
        "enter_biz_6": {
            "Магазин": () => {
                menu.execute(`shop.show(true)`);
				mp.events.call("selectMenu.hide");
            },
			"Выход": () => {
				menu.execute('action_npc.forceHide()');
				setCursor(false);
            },
            "Купить бизнес": () => {
                if (!isFlood()) {
                    mp.events.callRemote("biz.show", "biz_buy");
                    mp.events.call("selectMenu.hide");
                }
            },
            "Панель управления": () => {
                prevMenuName = "enter_biz_6";
                mp.events.call("selectMenu.show", "biz_panel");
				setCursor(false);
				menu.execute('action_npc.forceHide()');
            },
        },
        "enter_biz_7": {
            "Выбрать татуировку": () => {
                if (!isFlood()) {
                    mp.events.callRemote("server:tatooShop:onStart");
                    mp.events.call("selectMenuTalRasha.show", "biz_7_tatooList");
                    mp.events.call("setFreeze", true);
					menu.execute(`action_npc.forceHide()`);
                }
            },
			"Выход": () => {
				menu.execute('action_npc.forceHide()');
				setCursor(false);
            },
            "Купить бизнес": () => {
                if (!isFlood()) {
                    mp.events.callRemote("biz.show", "biz_buy");
                    mp.events.call("selectMenu.hide");
                }
            },
            "Панель управления": () => {
                prevMenuName = "enter_biz_7";
                mp.events.call("selectMenu.show", "biz_panel");
				setCursor(false);
				menu.execute('action_npc.forceHide()');
            }
        },
		"biz_7_tatooList": {
            "Уйти": () => {
                if (!isFlood()) {
                    mp.events.callRemote("server:tatooShop:onStop");
                    mp.events.call("selectMenu.hide");
                    mp.events.call("setFreeze", false);
                    mp.events.call("client:tatooShop:stopChoose");
                }
            },
            "Удалить татуировку": () => {
                if (!isFlood()) {
                    mp.events.call("client:tatooShop:loadDeletableTatoos");
                }
            },
        },
		"biz_7_tatooList_category": {
            "Вернуться": () => {
                if (!isFlood()) {
                    mp.events.call("selectMenuTalRasha.show", "biz_7_tatooList");
                }
            },
        },
        "biz_7_deleteTatoo": {
            "Вернуться": () => {
                if (!isFlood()) {
                    mp.events.call("selectMenuTalRasha.show", "biz_7_tatooList");
                }
            },
        },
        "enter_biz_8": {
            "Магазин оружия": () => {
                menu.execute(`gun_shop.show(true)`);
				mp.events.call("selectMenu.hide");
            },
			"Выход": () => {
				menu.execute('action_npc.forceHide()');
				setCursor(false);
            },
            "Купить бизнес": () => {
                if (!isFlood()) {
                    mp.events.callRemote("biz.show", "biz_buy");
                    mp.events.call("selectMenu.hide");
                }
            },
            "Панель управления": () => {
                prevMenuName = "enter_biz_8";
                mp.events.call("selectMenu.show", "biz_panel");
				setCursor(false);
				menu.execute('action_npc.forceHide()');
            }
        },
        "biz_8_guns": {
            "Ближний бой": () => {
                mp.events.call("selectMenu.show", "biz_8_melee");
            },
            "Пистолеты": () => {
                mp.events.call("selectMenu.show", "biz_8_handguns");
            },
            "Пистолеты-пулеметы": () => {
                mp.events.call("selectMenu.show", "biz_8_submachine_guns");
            },
            "Ружья": () => {
                mp.events.call("selectMenu.show", "biz_8_shotguns");
            },
            "Вернуться": () => {
                mp.events.call("selectMenu.show", "enter_biz_8");
            },
        },
        "biz_8_melee": {
            0: () => {
                mp.events.callRemote(`biz_8.buyItem`, 41);
            },
            1: () => {
                mp.events.callRemote(`biz_8.buyItem`, 42);
            },
            2: () => {
                mp.events.callRemote(`biz_8.buyItem`, 43);
            },
            3: () => {
                mp.events.call("selectMenu.show", `biz_8_guns`);
            },
        },
        "biz_8_handguns": {
            0: () => {
                mp.events.callRemote(`biz_8.buyItem`, 44);
            },
            1: () => {
                mp.events.callRemote(`biz_8.buyItem`, 45);
            },
            2: () => {
                mp.events.call("selectMenu.show", `biz_8_guns`, 1);
            },
        },
        "biz_8_submachine_guns": {
            0: () => {
                mp.events.callRemote(`biz_8.buyItem`, 47);
            },
            1: () => {
                mp.events.callRemote(`biz_8.buyItem`, 48);
            },
            2: () => {
                mp.events.call("selectMenu.show", `biz_8_guns`, 2);
            },
        },
        "biz_8_shotguns": {
            0: () => {
                mp.events.callRemote(`biz_8.buyItem`, 49);
            },
            1: () => {
                mp.events.call("selectMenu.show", `biz_8_guns`, 3);
            },
        },
        "biz_8_ammo": {
            0: (value) => {
                if (!isFlood()) mp.events.callRemote(`biz_8.buyAmmo`, 0, parseInt(value));
            },
            1: (value) => {
                if (!isFlood()) mp.events.callRemote(`biz_8.buyAmmo`, 1, parseInt(value));
            },
            2: (value) => {
                if (!isFlood()) mp.events.callRemote(`biz_8.buyAmmo`, 2, parseInt(value));
            },
            3: (value) => {
                if (!isFlood()) mp.events.callRemote(`biz_8.buyAmmo`, 3, parseInt(value));
            },
            4: () => {
                mp.events.call(`selectMenu.show`, `enter_biz_8`, 1);
            },
        },
        "enter_biz_9": {
            "Купить авто": () => {
                mp.events.callRemote(`autoSaloon.openBuyerMenu`);
            },
			"Выход": () => {
				menu.execute('action_npc.forceHide()');
				setCursor(false);
            },
            "Купить бизнес": () => {
                if (!isFlood()) {
                    mp.events.callRemote("biz.show", "biz_buy");
                    mp.events.call("selectMenu.hide");
                }
            },
            "Панель управления": () => {
                prevMenuName = "enter_biz_9";
                mp.events.call("selectMenu.show", "biz_panel");
				setCursor(false);
				menu.execute('action_npc.forceHide()');
            }
        },
        "enter_biz_10": {
            "Купить бизнес": () => {
                if (!isFlood()) {
                    mp.events.callRemote("biz.show", "biz_buy");
                    mp.events.call("selectMenu.hide");
                }
            },
			"Выход": () => {
				menu.execute('action_npc.forceHide()');
				setCursor(false);
            },
            "Панель управления": () => {
                prevMenuName = "enter_biz_10";
                mp.events.call("selectMenu.show", "biz_panel");
				setCursor(false);
				menu.execute('action_npc.forceHide()');
            }
        },
        "enter_biz_11": {
			"Выход": () => {
				menu.execute('action_npc.forceHide()');
				setCursor(false);
            },
            "Купить бизнес": () => {
                if (!isFlood()) {
                    mp.events.callRemote("biz.show", "biz_buy");
                    mp.events.call("selectMenu.hide");
                }
            },
            "Панель управления": () => {
                prevMenuName = "enter_biz_11";
                mp.events.call("selectMenu.show", "biz_panel");
				setCursor(false);
				menu.execute('action_npc.forceHide()');
            }
        },
		"enter_biz_12": {
            "Купить авто": () => {
                mp.events.callRemote(`autoSaloon.openBuyerMenu`);
            },
			"Выход": () => {
				menu.execute('action_npc.forceHide()');
				setCursor(false);
            },
            "Купить бизнес": () => {
                if (!isFlood()) {
                    mp.events.callRemote("biz.show", "biz_buy");
                    mp.events.call("selectMenu.hide");
                }
            },
            "Панель управления": () => {
                prevMenuName = "enter_biz_12";
                mp.events.call("selectMenu.show", "biz_panel");
				setCursor(false);
				menu.execute('action_npc.forceHide()');
            }
        },
		"enter_biz_14": {
            "Купить мотоцикл": () => {
                mp.events.callRemote(`autoSaloon.openBuyerMenu`);
            },
			"Выход": () => {
				menu.execute('action_npc.forceHide()');
				setCursor(false);
            },
            "Купить бизнес": () => {
                if (!isFlood()) {
                    mp.events.callRemote("biz.show", "biz_buy");
                    mp.events.call("selectMenu.hide");
                }
            },
            "Панель управления": () => {
                prevMenuName = "enter_biz_14";
                mp.events.call("selectMenu.show", "biz_panel");
				setCursor(false);
				menu.execute('action_npc.forceHide()');
            }
        },
		"enter_biz_15": {
            "Купить авто": () => {
                mp.events.callRemote(`autoSaloon.openBuyerMenu`);
            },
			"Выход": () => {
				menu.execute('action_npc.forceHide()');
				setCursor(false);
            },
            "Купить бизнес": () => {
                if (!isFlood()) {
                    mp.events.callRemote("biz.show", "biz_buy");
                    mp.events.call("selectMenu.hide");
                }
            },
            "Панель управления": () => {
                prevMenuName = "enter_biz_15";
                mp.events.call("selectMenu.show", "biz_panel");
				setCursor(false);
				menu.execute('action_npc.forceHide()');
            }
        },
		"enter_biz_16": {
            "Купить авто": () => {
                mp.events.callRemote(`autoSaloon.openBuyerMenu`);
            },
			"Выход": () => {
				menu.execute('action_npc.forceHide()');
				setCursor(false);
            },
            "Купить бизнес": () => {
                if (!isFlood()) {
                    mp.events.callRemote("biz.show", "biz_buy");
                    mp.events.call("selectMenu.hide");
                }
            },
            "Панель управления": () => {
                prevMenuName = "enter_biz_16";
                mp.events.call("selectMenu.show", "biz_panel");
				setCursor(false);
				menu.execute('action_npc.forceHide()');
            }
        },
		"enter_biz_19": {
            "Купить авто": () => {
                mp.events.callRemote(`autoSaloon.openBuyerMenu`);
            },
			"Выход": () => {
				menu.execute('action_npc.forceHide()');
				setCursor(false);
            },
            "Купить бизнес": () => {
                if (!isFlood()) {
                    mp.events.callRemote("biz.show", "biz_buy");
                    mp.events.call("selectMenu.hide");
                }
            },
            "Панель управления": () => {
                prevMenuName = "enter_biz_19";
                mp.events.call("selectMenu.show", "biz_panel");
				setCursor(false);
				menu.execute('action_npc.forceHide()');
            }
        },
		"enter_biz_17": {
            "Купить транспорт": () => {
                mp.events.callRemote(`autoSaloon.openBuyerMenu`);
            },
			"Выход": () => {
				menu.execute('action_npc.forceHide()');
				setCursor(false);
            },
            "Купить бизнес": () => {
                if (!isFlood()) {
                    mp.events.callRemote("biz.show", "biz_buy");
                    mp.events.call("selectMenu.hide");
                }
            },
            "Панель управления": () => {
                prevMenuName = "enter_biz_17";
                mp.events.call("selectMenu.show", "biz_panel");
				setCursor(false);
				menu.execute('action_npc.forceHide()');
            }
        },
        "biz_panel": {
            "Информация": () => {
                if (!isFlood()) {
                    mp.events.callRemote("getBizInfo");
                    mp.events.call("selectMenu.hide");
                }
            },
            "Касса": () => {
                mp.events.call("selectMenu.show", "biz_cashbox");
            },
            "Доходы и расходы": () => {
                mp.events.call("selectMenu.show", "biz_stats");
            },
            "Товар": () => {
                mp.events.call("selectMenu.show", "biz_products");
            },
            "Статус бизнеса": () => {
                mp.events.call("selectMenu.show", "biz_status");
            },
            "Продать бизнес": () => {
                mp.events.call("selectMenu.show", "biz_sell");
            },
            "Закрыть": () => {
                mp.events.call("selectMenu.hide");
            },
        },
        "biz_cashbox": {
            "Баланс кассы": () => {
                if (!isFlood()) {
                    mp.events.callRemote("biz.balance.get");
                    mp.events.call("selectMenu.hide");
                }
            },
            "Вывести с кассы": () => {
                mp.events.call("modal.show", "biz_balance_take");
                mp.events.call("selectMenu.hide");
            },
            "Пополнить кассу": () => {
                mp.events.call("modal.show", "biz_balance_add");
                mp.events.call("selectMenu.hide");
            },
            "Вернуться": () => {
                mp.events.call("selectMenu.show", "biz_panel", 1);
            }
        },
        "biz_stats": {
            "История кассы": () => {
                if (!isFlood()) {
                    mp.events.call("setLocalVar", "bizLogsOffset", 0);
                    mp.events.callRemote("biz.getStats", mp.clientStorage["bizLogsOffset"]);
                    mp.events.call("selectMenu.hide");
                }
            },
            "Вернуться": () => {
                mp.events.call("selectMenu.show", "biz_panel", 2);
            }
        },
        "biz_products": {
            "Закупить товар": () => {
                if (!isFlood()) {
                    mp.events.callRemote("biz.show", "biz_products_buy");
                    mp.events.call("selectMenu.hide");
                }
            },
            "Списать товар": () => {
                if (!isFlood()) {
                    mp.events.callRemote("biz.show", "biz_products_sell");
                    mp.events.call("selectMenu.hide");
                }
            },
            "Цена товара": () => {
                if (!isFlood()) {
                    mp.events.callRemote("biz.show", "biz_products_price");
                    mp.events.call("selectMenu.hide");
                }
            },
            "Вернуться": () => {
                mp.events.call("selectMenu.show", "biz_panel", 3);
            }
        },
        "biz_staff": {
            "Вернуться": () => {
                mp.events.call("selectMenu.show", "biz_panel", 4);
            }
        },
        "biz_rise": {
            "Вернуться": () => {
                mp.events.call("selectMenu.show", "biz_panel", 5);
            }
        },
        "biz_status": {
            "Открыть бизнес": () => {
                if (!isFlood()) {
                    mp.events.callRemote("biz.setStatus", 1);
                    mp.events.call("selectMenu.hide");
                }
            },
            "Закрыть бизнес": () => {
                if (!isFlood()) {
                    mp.events.callRemote("biz.setStatus", 0);
                    mp.events.call("selectMenu.hide");
                }
            },
            "Вернуться": () => {
                mp.events.call("selectMenu.show", "biz_panel", 6);
            }
        },
        "biz_sell": {
            "Гражданину": () => {
                if (!isFlood()) {
                    mp.events.callRemote("biz.show", "biz_sell_to_player");
                    mp.events.call("selectMenu.hide");
                }
            },
            "Государству": () => {
                if (!isFlood()) {
                    mp.events.callRemote("biz.show", "biz_sell_to_gov");
                    mp.events.call("selectMenu.hide");
                }
            },
            "Вернуться": () => {
                mp.events.call("selectMenu.show", "biz_panel", 7);
            }
        },
		"band_storage": {
			"Бронежилет": () => {
                if (!isFlood()) mp.events.callRemote(`bandStorage.takeGun`, 0);
            },
            "Аксу": () => {
                if (!isFlood()) mp.events.callRemote(`bandStorage.takeGun`, 1);
            },
            "Револьвер": () => {
                if (!isFlood()) mp.events.callRemote(`bandStorage.takeGun`, 2);
            },
			"Патроны 7.62": () => {
                if (!isFlood()) mp.events.callRemote(`bandStorage.takeGun`, 3);
            },
			"Рация": () => {
                if (!isFlood()) mp.events.callRemote(`bandStorage.takeGun`, 4);
            },
		},
		"mafia_storage": {
			"Нож": () => {
                if (!isFlood()) mp.events.callRemote(`mafiaStorage.takeGun`, 0);
            },
            "Heavy Shotgun": () => {
                if (!isFlood()) mp.events.callRemote(`mafiaStorage.takeGun`, 1);
            },
            "Бронежилет": () => {
                if (!isFlood()) mp.events.callRemote(`mafiaStorage.takeGun`, 4);
            },
			"Gusenberg": () => {
                if (!isFlood()) mp.events.callRemote(`mafiaStorage.takeGun`, 2);
            },
			"AssaultRifle": () => {
                if (!isFlood()) mp.events.callRemote(`mafiaStorage.takeGun`, 3);
            },
			"Рация": () => {
                if (!isFlood()) mp.events.callRemote(`mafiaStorage.takeGun`, 5);
            },
		},
        "police_storage": {
            "Вооружение": () => {
                mp.events.call("selectMenu.show", "police_guns");
            },
            "Гардероб": () => {
                mp.events.call("selectMenu.show", "police_clothes");
            },
            "Спец. предметы": () => {
                mp.events.call("selectMenu.show", "police_items");
            },
            "Патроны": () => {
                //mp.events.call("selectMenu.show", "police_ammo");
				mp.events.call("selectMenu.hide");
				mp.events.call("selectMenuTalRasha.show", "police_ammo");
            },
			"Закрыть": () => {
				mp.events.call("selectMenu.hide");
            },
        },
        "police_guns": {
            "Nightstick": () => {
                if (!isFlood()) mp.events.callRemote(`policeStorage.takeGun`, 0);
            },
            "Flashlight": () => {
                if (!isFlood()) mp.events.callRemote(`policeStorage.takeGun`, 1);
            },
            "Stun Gun": () => {
                if (!isFlood()) mp.events.callRemote(`policeStorage.takeGun`, 2);
            },
            "Combat Pistol": () => {
                if (!isFlood()) mp.events.callRemote(`policeStorage.takeGun`, 3);
            },
            "Pump Shotgun": () => {
                if (!isFlood()) mp.events.callRemote(`policeStorage.takeGun`, 4);
            },
            "Carbine Rifle": () => {
                if (!isFlood()) mp.events.callRemote(`policeStorage.takeGun`, 5);
            },
            "Sniper Rifle": () => {
                if (!isFlood()) mp.events.callRemote(`policeStorage.takeGun`, 6);
            },
            "Вернуться": () => {
                mp.events.call("selectMenu.show", "police_storage");
            }
        },
        "police_items": {
            "Удостоверение PD": () => {
                if (!isFlood()) mp.events.callRemote(`policeStorage.takeItem`, 0);
            },
            "Рация": () => {
                if (!isFlood()) mp.events.callRemote(`policeStorage.takeItem`, 1);
            },
            "Наручники": () => {
                if (!isFlood()) mp.events.callRemote(`policeStorage.takeItem`, 2);
            },
            "Вернуться": () => {
                mp.events.call("selectMenu.show", "police_storage", 2);
            }
        },
        "police_ammo": {
            "Combat Pistol - 9mm": (value) => {
                if (!isFlood()) mp.events.callRemote(`policeStorage.takeAmmo`, 0, parseInt(value));
            },
            "Pump Shotgun - 12mm": (value) => {
                if (!isFlood()) mp.events.callRemote(`policeStorage.takeAmmo`, 1, parseInt(value));
            },
            "Carbine Rifle - 5.56mm": (value) => {
                if (!isFlood()) mp.events.callRemote(`policeStorage.takeAmmo`, 2, parseInt(value));
            },
            "Sniper Rifle - 7.62mm": (value) => {
                if (!isFlood()) mp.events.callRemote(`policeStorage.takeAmmo`, 3, parseInt(value));
            },
            "Вернуться": (value) => {
				mp.events.call("selectMenuTalRasha.hide");
                mp.events.call("selectMenu.show", "police_storage", 3);
            }
        },
        "police_clothes": {
            "Форма Рекрута": () => {
                if (!isFlood()) mp.events.callRemote(`policeStorage.takeClothes`, 0);
            },
            "Форма Сержанта": () => {
                if (!isFlood()) mp.events.callRemote(`policeStorage.takeClothes`, 1);
            },
            "Форма Офицера": () => {
                if (!isFlood()) mp.events.callRemote(`policeStorage.takeClothes`, 2);
            },
            "Форма SWAT": () => {
                if (!isFlood()) mp.events.callRemote(`policeStorage.takeClothes`, 3);
            },
            "Бронежилет": () => {
                if (!isFlood()) mp.events.callRemote(`policeStorage.takeArmour`);
            },
            "Вернуться": () => {
                mp.events.call("selectMenu.show", "police_storage", 1);
            }
        },
        "police_service": {
            "Мои вещи?": () => {
                mp.events.call("selectMenu.show", "police_service_recovery");
            },
            "Оплата штрафа": () => {
                mp.events.callRemote("policeService.showClearFine");
                mp.events.call("selectMenu.hide");
            },
        },
        "police_service_recovery": {
            "Документы": () => {
                mp.events.callRemote("policeService.recovery.documents");
            },
            "Ключи от авто": () => {
                mp.events.callRemote("policeService.recovery.carKeys");
            },
            "Ключи от дома": (value) => {
                if (!value) return mp.events.call(`nError`, `У Вас нет дома!`);
                mp.events.callRemote("policeService.recovery.houseKeys", parseInt(value.substr(1)));
            },
            "Вернуться": () => {
                mp.events.call("selectMenu.show", "police_service");
            }
        },

        "police_storage_2": {
            "Вооружение": () => {
                mp.events.call("selectMenu.show", "police_guns_2");
            },
            "Гардероб": () => {
                mp.events.call("selectMenu.show", "police_clothes_2");
            },
            "Спец. предметы": () => {
                mp.events.call("selectMenu.show", "police_items_2");
            },
            "Патроны": () => {
                //mp.events.call("selectMenu.show", "police_ammo_2");
				mp.events.call("selectMenu.hide");
				mp.events.call("selectMenuTalRasha.show", "police_ammo_2");
            },
        },
        "police_guns_2": {
            "Nightstick": () => {
                if (!isFlood()) mp.events.callRemote(`policeStorage.takeGun`, 0);
            },
            "Flashlight": () => {
                if (!isFlood()) mp.events.callRemote(`policeStorage.takeGun`, 1);
            },
            "Stun Gun": () => {
                if (!isFlood()) mp.events.callRemote(`policeStorage.takeGun`, 2);
            },
            "Combat Pistol": () => {
                if (!isFlood()) mp.events.callRemote(`policeStorage.takeGun`, 3);
            },
            "Pump Shotgun": () => {
                if (!isFlood()) mp.events.callRemote(`policeStorage.takeGun`, 4);
            },
            "Carbine Rifle": () => {
                if (!isFlood()) mp.events.callRemote(`policeStorage.takeGun`, 5);
            },
            "Sniper Rifle": () => {
                if (!isFlood()) mp.events.callRemote(`policeStorage.takeGun`, 6);
            },
            "Вернуться": () => {
                mp.events.call("selectMenu.show", "police_storage_2");
            }
        },
        "police_items_2": {
            "Удостоверение PD": () => {
                if (!isFlood()) mp.events.callRemote(`policeStorage.takeItem`, 0);
            },
            "Рация": () => {
                if (!isFlood()) mp.events.callRemote(`policeStorage.takeItem`, 1);
            },
            "Наручники": () => {
                if (!isFlood()) mp.events.callRemote(`policeStorage.takeItem`, 2);
            },
            "Вернуться": () => {
                mp.events.call("selectMenu.show", "police_storage_2", 2);
            }
        },
        "police_ammo_2": {
            "Combat Pistol - 9mm": (value) => {
                if (!isFlood()) mp.events.callRemote(`policeStorage.takeAmmo`, 0, parseInt(value));
            },
            "Pump Shotgun - 12mm": (value) => {
                if (!isFlood()) mp.events.callRemote(`policeStorage.takeAmmo`, 1, parseInt(value));
            },
            "Carbine Rifle - 5.56mm": (value) => {
                if (!isFlood()) mp.events.callRemote(`policeStorage.takeAmmo`, 2, parseInt(value));
            },
            "Sniper Rifle - 7.62mm": (value) => {
                if (!isFlood()) mp.events.callRemote(`policeStorage.takeAmmo`, 3, parseInt(value));
            },
            "Вернуться": (value) => {
				mp.events.call("selectMenuTalRasha.hide");
                mp.events.call("selectMenu.show", "police_storage_2", 3);
            }
        },
        "police_clothes_2": {
            "Спец. форма №1": () => {
                if (!isFlood()) mp.events.callRemote(`policeStorage.takeClothes`, 0);
            },
            "Форма Кадета": () => {
                if (!isFlood()) mp.events.callRemote(`policeStorage.takeClothes`, 1);
            },
            "Форма Сержанта": () => {
                if (!isFlood()) mp.events.callRemote(`policeStorage.takeClothes`, 3);
            },
            "Форма Лейтенанта": () => {
                if (!isFlood()) mp.events.callRemote(`policeStorage.takeClothes`, 4);
            },
            "Форма Шерифа": () => {
                if (!isFlood()) mp.events.callRemote(`policeStorage.takeClothes`, 6);
            },
            "Бронежилет": () => {
                if (!isFlood()) mp.events.callRemote(`policeStorage.takeArmour`);
            },
            "Вернуться": () => {
                mp.events.call("selectMenu.show", "police_storage", 1);
            }
        },
        "police_service_2": {
            "Мои вещи?": () => {
                mp.events.call("selectMenu.show", "police_service_recovery_2");
            },
            "Оплата штрафа": () => {
                mp.events.callRemote("policeService.showClearFine");
                mp.events.call("selectMenu.hide");
            },
        },
        "police_service_recovery_2": {
            "Документы": () => {
                mp.events.callRemote("policeService.recovery.documents");
            },
            "Ключи от авто": () => {
                mp.events.callRemote("policeService.recovery.carKeys");
            },
            "Ключи от дома": (value) => {
                if (!value) return mp.events.call(`nError`, `У Вас нет дома!`);
                mp.events.callRemote("policeService.recovery.houseKeys", parseInt(value.substr(1)));
            },
            "Вернуться": () => {
                mp.events.call("selectMenu.show", "police_service_2");
            }
        },

        "army_storage": {
            "Вооружение": () => {
                mp.events.call("selectMenu.show", "army_guns");
            },
            "Гардероб": () => {
                mp.events.call("selectMenu.show", "army_clothes");
            },
            "Спец. предметы": () => {
                mp.events.call("selectMenu.show", "army_items");
            },
            "Патроны": () => {
				mp.events.call("selectMenu.hide");
				mp.events.call("selectMenuTalRasha.show", "army_ammo");
            },
        },
        "army_guns": {
            "Combat Pistol": () => {
                if (!isFlood()) mp.events.callRemote(`armyStorage.takeGun`, 0);
            },
            "Pump Shotgun": () => {
                if (!isFlood()) mp.events.callRemote(`armyStorage.takeGun`, 1);
            },
            "Carbine Rifle": () => {
                if (!isFlood()) mp.events.callRemote(`armyStorage.takeGun`, 2);
            },
            "Sniper Rifle": () => {
                if (!isFlood()) mp.events.callRemote(`armyStorage.takeGun`, 3);
            },
            "Вернуться": () => {
                mp.events.call("selectMenu.show", "army_storage");
            }
        },
        "army_items": {
            "Удостоверение": () => {
                if (!isFlood()) mp.events.callRemote(`armyStorage.takeItem`, 0);
            },
            "Рация": () => {
                if (!isFlood()) mp.events.callRemote(`armyStorage.takeItem`, 1);
            },
            "Вернуться": () => {
                mp.events.call("selectMenu.show", "army_storage", 2);
            }
        },
        "army_clothes": {
            "Комплект №1": () => {
                if (!isFlood()) mp.events.callRemote(`armyStorage.takeClothes`, 0);
            },
            "Комплект №2": () => {
                if (!isFlood()) mp.events.callRemote(`armyStorage.takeClothes`, 1);
            },
            "Комплект №3": () => {
                if (!isFlood()) mp.events.callRemote(`armyStorage.takeClothes`, 2);
            },
            "Комплект №4": () => {
                if (!isFlood()) mp.events.callRemote(`armyStorage.takeClothes`, 3);
            },
            "Бронежилет": () => {
                if (!isFlood()) mp.events.callRemote(`armyStorage.takeArmour`);
            },
            "Вернуться": () => {
                mp.events.call("selectMenu.show", "army_storage", 1);
            }
        },
        "army_ammo": {
            "Combat Pistol - 9mm": (value) => {
                if (!isFlood()) mp.events.callRemote(`armyStorage.takeAmmo`, 0, parseInt(value));
            },
            "Pump Shotgun - 12mm": (value) => {
                if (!isFlood()) mp.events.callRemote(`armyStorage.takeAmmo`, 1, parseInt(value));
            },
            "Carbine Rifle - 5.56mm": (value) => {
                if (!isFlood()) mp.events.callRemote(`armyStorage.takeAmmo`, 2, parseInt(value));
            },
            "Sniper Rifle - 7.62mm": (value) => {
                if (!isFlood()) mp.events.callRemote(`armyStorage.takeAmmo`, 3, parseInt(value));
            },
            "Вернуться": (value) => {	
				mp.events.call("selectMenuTalRasha.hide");
                mp.events.call("selectMenu.show", "army_storage", 2);
            }
        },

        "army_storage_2": {
            "Вооружение": () => {
                mp.events.call("selectMenu.show", "army_guns_2");
            },
            "Гардероб": () => {
                mp.events.call("selectMenu.show", "army_clothes_2");
            },
            "Спец. предметы": () => {
                mp.events.call("selectMenu.show", "army_items_2");
            },
            "Патроны": () => {
				mp.events.call("selectMenu.hide");
				mp.events.call("selectMenuTalRasha.show", "army_ammo_2");
            },
        },
        "army_guns_2": {
            "Combat Pistol": () => {
                if (!isFlood()) mp.events.callRemote(`armyStorage.takeGun`, 0);
            },
            "Pump Shotgun": () => {
                if (!isFlood()) mp.events.callRemote(`armyStorage.takeGun`, 1);
            },
            "Carbine Rifle": () => {
                if (!isFlood()) mp.events.callRemote(`armyStorage.takeGun`, 2);
            },
            "Sniper Rifle": () => {
                if (!isFlood()) mp.events.callRemote(`armyStorage.takeGun`, 3);
            },
            "Вернуться": () => {
                mp.events.call("selectMenu.show", "army_storage_2");
            }
        },
        "army_items_2": {
            "Удостоверение": () => {
                if (!isFlood()) mp.events.callRemote(`armyStorage.takeItem`, 0);
            },
            "Рация": () => {
                if (!isFlood()) mp.events.callRemote(`armyStorage.takeItem`, 1);
            },
            "Вернуться": () => {
                mp.events.call("selectMenu.show", "army_storage_2", 2);
            }
        },
        "army_clothes_2": {
            "Комплект №1": () => {
                if (!isFlood()) mp.events.callRemote(`armyStorage.takeClothes`, 0);
            },
            "Комплект №2": () => {
                if (!isFlood()) mp.events.callRemote(`armyStorage.takeClothes`, 1);
            },
            "Комплект №3": () => {
                if (!isFlood()) mp.events.callRemote(`armyStorage.takeClothes`, 2);
            },
            "Бронежилет": () => {
                if (!isFlood()) mp.events.callRemote(`armyStorage.takeArmour`);
            },
            "Вернуться": () => {
                mp.events.call("selectMenu.show", "army_storage_2", 1);
            }
        },
        "army_ammo_2": {
            "Combat Pistol - 9mm": (value) => {
                if (!isFlood()) mp.events.callRemote(`armyStorage.takeAmmo`, 0, parseInt(value));
            },
            "Pump Shotgun - 12mm": (value) => {
                if (!isFlood()) mp.events.callRemote(`armyStorage.takeAmmo`, 1, parseInt(value));
            },
            "Carbine Rifle - 5.56mm": (value) => {
                if (!isFlood()) mp.events.callRemote(`armyStorage.takeAmmo`, 2, parseInt(value));
            },
            "Sniper Rifle - 7.62mm": (value) => {
                if (!isFlood()) mp.events.callRemote(`armyStorage.takeAmmo`, 3, parseInt(value));
            },
            "Вернуться": (value) => {
				mp.events.call("selectMenuTalRasha.hide");
                mp.events.call("selectMenu.show", "army_storage_2", 2);
            }
        },
		"gover_storage": {
            "Вооружение": () => {
                mp.events.call("selectMenu.show", "gover_guns");
            },
            "Гардероб": () => {
                mp.events.call("selectMenu.show", "gover_clothes");
            },
            "Спец. предметы": () => {
                mp.events.call("selectMenu.show", "gover_items");
            },
            "Патроны": () => {
				mp.events.call("selectMenu.hide");
				mp.events.call("selectMenuTalRasha.show", "gover_ammo");
            },
        },
		"gover_guns": {
            "Nightstick": () => {
                if (!isFlood()) mp.events.callRemote(`goverStorage.takeGun`, 0);
            },
            "Flashlight": () => {
                if (!isFlood()) mp.events.callRemote(`goverStorage.takeGun`, 1);
            },
            "Stun Gun": () => {
                if (!isFlood()) mp.events.callRemote(`goverStorage.takeGun`, 2);
            },
            "Combat Pistol": () => {
                if (!isFlood()) mp.events.callRemote(`goverStorage.takeGun`, 3);
            },
            "Carbine FAMAS": () => {
                if (!isFlood()) mp.events.callRemote(`goverStorage.takeGun`, 5);
            },
            "Вернуться": () => {
                mp.events.call("selectMenu.show", "gover_storage");
            }
        },
        "gover_items": {
            "Удостоверение": () => {
                if (!isFlood()) mp.events.callRemote(`goverStorage.takeItem`, 0);
            },
            "Рация": () => {
                if (!isFlood()) mp.events.callRemote(`goverStorage.takeItem`, 1);
            },
            "Наручники": () => {
                if (!isFlood()) mp.events.callRemote(`goverStorage.takeItem`, 2);
            },
            "Аптечка": () => {
                if (!isFlood()) mp.events.callRemote(`goverStorage.takeItem`, 1);
            },
            "Нож": () => {
                if (!isFlood()) mp.events.callRemote(`goverStorage.takeItem`, 2);
            },
            "Вернуться": () => {
                mp.events.call("selectMenu.show", "gover_storage", 2);
            }
        },
        "gover_ammo": {
            "Combat Pistol - 9mm": (value) => {
                if (!isFlood()) mp.events.callRemote(`goverStorage.takeAmmo`, 0, parseInt(value));
            },
            "Pump Shotgun - 12mm": (value) => {
                if (!isFlood()) mp.events.callRemote(`goverStorage.takeAmmo`, 1, parseInt(value));
            },
            "Carbine Rifle - 5.56mm": (value) => {
                if (!isFlood()) mp.events.callRemote(`goverStorage.takeAmmo`, 2, parseInt(value));
            },
            "Sniper Rifle - 7.62mm": (value) => {
                if (!isFlood()) mp.events.callRemote(`goverStorage.takeAmmo`, 3, parseInt(value));
            },
            "Вернуться": (value) => {
				mp.events.call("selectMenuTalRasha.hide");
                mp.events.call("selectMenu.show", "gover_storage", 3);
            }
        },
        "gover_clothes": {
            "Стажер USSS": () => {
                if (!isFlood()) mp.events.callRemote(`goverStorage.takeClothes`, 0);
            },
            "Офицер USSS": () => {
                if (!isFlood()) mp.events.callRemote(`goverStorage.takeClothes`, 1);
            },
            "Агент USSS": () => {
                if (!isFlood()) mp.events.callRemote(`goverStorage.takeClothes`, 2);
            },
            "Спецагент USSS": () => {
                if (!isFlood()) mp.events.callRemote(`goverStorage.takeClothes`, 3);
            },
            "Младший адвокат": () => {
                if (!isFlood()) mp.events.callRemote(`goverStorage.takeClothes`, 4);
            },
            "Бронежилет": () => {
                if (!isFlood()) mp.events.callRemote(`goverStorage.takeArmour`);
            },
            "Вернуться": () => {
                mp.events.call("selectMenu.show", "gover_storage", 1);
            }
        },
        "fib_storage": {
            "Вооружение": () => {
                mp.events.call("selectMenu.show", "fib_guns");
            },
            "Гардероб": () => {
                mp.events.call("selectMenu.show", "fib_clothes");
            },
            "Спец. предметы": () => {
                mp.events.call("selectMenu.show", "fib_items");
            },
            "Патроны": () => {
				mp.events.call("selectMenu.hide");
				mp.events.call("selectMenuTalRasha.show", "fib_ammo");
            },
        },
        "fib_guns": {
            "Nightstick": () => {
                if (!isFlood()) mp.events.callRemote(`fibStorage.takeGun`, 0);
            },
            "Flashlight": () => {
                if (!isFlood()) mp.events.callRemote(`fibStorage.takeGun`, 1);
            },
            "Stun Gun": () => {
                if (!isFlood()) mp.events.callRemote(`fibStorage.takeGun`, 2);
            },
            "Combat Pistol": () => {
                if (!isFlood()) mp.events.callRemote(`fibStorage.takeGun`, 3);
            },
            "Pump Shotgun": () => {
                if (!isFlood()) mp.events.callRemote(`fibStorage.takeGun`, 4);
            },
            "Carbine Rifle": () => {
                if (!isFlood()) mp.events.callRemote(`fibStorage.takeGun`, 5);
            },
            "Вернуться": () => {
                mp.events.call("selectMenu.show", "fib_storage");
            }
        },
        "fib_items": {
            "Удостоверение FIB": () => {
                if (!isFlood()) mp.events.callRemote(`fibStorage.takeItem`, 0);
            },
            "Рация": () => {
                if (!isFlood()) mp.events.callRemote(`fibStorage.takeItem`, 1);
            },
            "Наручники": () => {
                if (!isFlood()) mp.events.callRemote(`fibStorage.takeItem`, 2);
            },
            "Вернуться": () => {
                mp.events.call("selectMenu.show", "fib_storage", 2);
            }
        },
        "fib_ammo": {
            "Combat Pistol - 9mm": (value) => {
                if (!isFlood()) mp.events.callRemote(`fibStorage.takeAmmo`, 0, parseInt(value));
            },
            "Pump Shotgun - 12mm": (value) => {
                if (!isFlood()) mp.events.callRemote(`fibStorage.takeAmmo`, 1, parseInt(value));
            },
            "Carbine Rifle - 5.56mm": (value) => {
                if (!isFlood()) mp.events.callRemote(`fibStorage.takeAmmo`, 2, parseInt(value));
            },
            "Sniper Rifle - 7.62mm": (value) => {
                if (!isFlood()) mp.events.callRemote(`fibStorage.takeAmmo`, 3, parseInt(value));
            },
            "Вернуться": (value) => {
				mp.events.call("selectMenuTalRasha.hide");
                mp.events.call("selectMenu.show", "fib_storage", 3);
            }
        },
        "fib_clothes": {
            "Стажер": () => {
                if (!isFlood()) mp.events.callRemote(`fibStorage.takeClothes`, 0);
            },
            "Агент": () => {
                if (!isFlood()) mp.events.callRemote(`fibStorage.takeClothes`, 1);
            },
            "Набор №1": () => {
                if (!isFlood()) mp.events.callRemote(`fibStorage.takeClothes`, 2);
            },
            "Набор №2": () => {
                if (!isFlood()) mp.events.callRemote(`fibStorage.takeClothes`, 3);
            },
            "Форма снайпера": () => {
                if (!isFlood()) mp.events.callRemote(`fibStorage.takeClothes`, 4);
            },
            "Бронежилет": () => {
                if (!isFlood()) mp.events.callRemote(`fibStorage.takeArmour`);
            },
            "Вернуться": () => {
                mp.events.call("selectMenu.show", "fib_storage", 1);
            }
        },

        "hospital_storage": {
            "Склад": () => {
				mp.events.call("selectMenu.hide");
				mp.events.call("selectMenuTalRasha.show", "hospital_items");
            },
            "Гардероб": () => {
                mp.events.call("selectMenu.show", "hospital_clothes");
            }
        },
        "hospital_items": {
            "Аптечка": (value) => {
                if (!isFlood()) mp.events.callRemote(`hospitalStorage.takeItem`, 0, parseInt(value));
            },
            "Бинт": (value) => {
                if (!isFlood()) mp.events.callRemote(`hospitalStorage.takeItem`, 1, parseInt(value));
            },
            "Удостоверение": (value) => {
                if (!isFlood()) mp.events.callRemote(`hospitalStorage.takeItem`, 2);
            },
			"Рация": () => {
                if (!isFlood()) mp.events.callRemote(`hospitalStorage.takeItem`, 3);
            },
            "Вернуться": () => {
				mp.events.call("selectMenuTalRasha.hide");
                mp.events.call("selectMenu.show", "hospital_storage");
            }
        },
        "hospital_clothes": {
            "Форма №1": () => {
                if (!isFlood()) mp.events.callRemote(`hospitalStorage.takeClothes`, 0);
            },
            "Форма №2": () => {
                if (!isFlood()) mp.events.callRemote(`hospitalStorage.takeClothes`, 1);
            },
            "Вернуться": () => {
                mp.events.call("selectMenu.show", "hospital_storage", 1);
            }
        },
		"bus_mash": {
          "Маршрут 1 [800$]": () => {
            if (!isFlood()) mp.events.callRemote("rent.bus.vehicle", 1);
          },
          "Маршрут 2 [800$]": () => {
            if (!isFlood()) mp.events.callRemote("rent.bus.vehicle", 2);
          },
		  "Маршрут 3 [800$]": () => {
            if (!isFlood()) mp.events.callRemote("rent.bus.vehicle", 3);
          },
		  "Маршрут 4 [1800$]": () => {
            if (!isFlood()) mp.events.callRemote("rent.bus.vehicle", 4);
          },
          "Отказаться": () => {
            mp.events.call(`selectMenu.hide`);
            let veh = mp.players.local.vehicle;
            if (veh) mp.players.local.taskLeaveVehicle(veh.handle, 16);
          },
        },
        "band_dealer_menu": {
            "Оружия": () => {
				mp.events.call("selectMenu.hide");
				mp.events.call("selectMenuTalRasha.show", "band_dealer_menu_guns");
            },
            "Патроны": () => {
				mp.events.call("selectMenu.hide");
				mp.events.call("selectMenuTalRasha.show", "band_dealer_menu_ammo");
            },
            "Наркотики": () => {
				mp.events.call("selectMenu.hide");
				mp.events.call("selectMenuTalRasha.show", "band_dealer_menu_drugs");
            },
        },
        "band_dealer_menu_guns": {
            "Холодное оружие": () => {
				mp.events.call("selectMenu.hide");
                mp.events.call("selectMenuTalRasha.show", "band_dealer_menu_melee");
            },
            "Пистолеты": () => {
				mp.events.call("selectMenu.hide");
                mp.events.call("selectMenuTalRasha.show", "band_dealer_menu_handguns");
            },
            "Пистолеты-пулеметы": () => {
				mp.events.call("selectMenu.hide");
                mp.events.call("selectMenuTalRasha.show", "band_dealer_menu_submachine_guns");
            },
            "Ружья": () => {
				mp.events.call("selectMenu.hide");
                mp.events.call("selectMenuTalRasha.show", "band_dealer_menu_shotguns");
            },
            "Штурмовые винтовки": () => {
				mp.events.call("selectMenu.hide");
                mp.events.call("selectMenuTalRasha.show", "band_dealer_menu_assault_rifles");
            },
            "Легкие пулеметы": () => {
				mp.events.call("selectMenu.hide");
                mp.events.call("selectMenuTalRasha.show", "band_dealer_menu_light_machine_guns");
            },
            "Снайперские винтовки": () => {
				mp.events.call("selectMenu.hide");
                mp.events.call("selectMenuTalRasha.show", "band_dealer_menu_sniper_rifles");
            },
            "Вернуться": () => {
				mp.events.call("selectMenuTalRasha.hide");
                mp.events.call("selectMenu.show", "band_dealer_menu");
            },
        },
        "band_dealer_menu_melee": {
            "Бейсбольная бита | $200": () => {
                mp.events.callRemote(`bandDealer.buyGun`, 41);
            },
            "Кастет | $75": () => {
                mp.events.callRemote(`bandDealer.buyGun`, 42);
            },
            "Нож | $300": () => {
                mp.events.callRemote(`bandDealer.buyGun`, 43);
            },
            "Вернуться": () => {
                mp.events.call("selectMenuTalRasha.show", `band_dealer_menu_guns`);
            },
        },
        "band_dealer_menu_handguns": {
            "Pistol | $800": () => {
                mp.events.callRemote(`bandDealer.buyGun`, 44);
            },
            "AP Pistol | $1200": () => {
                mp.events.callRemote(`bandDealer.buyGun`, 45);
            },
            "Heavy Revolver | $1400": () => {
                mp.events.callRemote(`bandDealer.buyGun`, 46);
            },
            "Вернуться": () => {
                mp.events.call("selectMenuTalRasha.show", `band_dealer_menu_guns`, 1);
            },
        },
        "band_dealer_menu_submachine_guns": {
            "Micro SMG | $1800": () => {
                mp.events.callRemote(`bandDealer.buyGun`, 47);
            },
            "SMG | $1950": () => {
                mp.events.callRemote(`bandDealer.buyGun`, 48);
            },
            "Вернуться": () => {
                mp.events.call("selectMenuTalRasha.show", `band_dealer_menu_guns`, 2);
            },
        },
        "band_dealer_menu_shotguns": {
            "Pump Shotgun | $2400": () => {
                mp.events.callRemote(`bandDealer.buyGun`, 21);
            },
            "Sawed-Off Shotgun | $2700": () => {
                mp.events.callRemote(`bandDealer.buyGun`, 49);
            },
            "Вернуться": () => {
                mp.events.call("selectMenuTalRasha.show", `band_dealer_menu_guns`, 3);
            },
        },
        "band_dealer_menu_assault_rifles": {
            "Assault Rifle | $2800": () => {
                mp.events.callRemote(`bandDealer.buyGun`, 50);
            },
            "Bullpup Rifle | $3000": () => {
                mp.events.callRemote(`bandDealer.buyGun`, 51);
            },
            "Compact Rifle | $3000": () => {
                mp.events.callRemote(`bandDealer.buyGun`, 52);
            },
            "Вернуться": () => {
                mp.events.call("selectMenuTalRasha.show", "band_dealer_menu_guns", 4);
            },
        },
        "band_dealer_menu_ammo": {
            "Патроны - 9mm | $6": (value) => {
                if (!isFlood()) mp.events.callRemote(`bandDealer.buyAmmo`, 0, parseInt(value));
            },
            "Патроны - 12mm | $7": (value) => {
                if (!isFlood()) mp.events.callRemote(`bandDealer.buyAmmo`, 1, parseInt(value));
            },
            "Патроны - 5.56mm | $7": (value) => {
                if (!isFlood()) mp.events.callRemote(`bandDealer.buyAmmo`, 2, parseInt(value));
            },
            "Патроны - 7.62mm | $6": (value) => {
                if (!isFlood()) mp.events.callRemote(`bandDealer.buyAmmo`, 3, parseInt(value));
            },
            "Вернуться": () => {
				mp.events.call("selectMenuTalRasha.hide");
                mp.events.call("selectMenu.show", "band_dealer_menu", 1);
            },
        },
        "band_dealer_menu_drugs": {
            "Марихуана | $6": (value) => {
                if (!isFlood()) mp.events.callRemote(`bandDealer.buyDrgus`, 0, parseInt(value));
            },
            "МДМА | $10": (value) => {
                if (!isFlood()) mp.events.callRemote(`bandDealer.buyDrgus`, 1, parseInt(value));
            },
            "Кокаин | $8": (value) => {
                if (!isFlood()) mp.events.callRemote(`bandDealer.buyDrgus`, 2, parseInt(value));
            },
            "Метамфетамин | $9": (value) => {
                if (!isFlood()) mp.events.callRemote(`bandDealer.buyDrgus`, 3, parseInt(value));
            },
            "Вернуться": () => {
				mp.events.call("selectMenuTalRasha.hide");
                mp.events.call("selectMenu.show", "band_dealer_menu", 2);
            },
        },

        "enter_driving_school": {
            "Лицензии": () => {
                mp.events.call("selectMenu.show", "driving_school_licenses");
            },
        },
        "driving_school_licenses": {
            "Водитель": () => {
                mp.events.call("selectMenu.show", "driving_school_car");
            },
            "Водный транспорт": () => {
                mp.events.call("selectMenu.show", "driving_school_water");
            },
            "Пилот": () => {
                mp.events.call("selectMenu.show", "driving_school_fly");
            },
            "Вернуться": () => {
                mp.events.call("selectMenu.show", "enter_driving_school");
            },
        },
        "driving_school_car": {
            "Автомобиль": () => {
                mp.events.callRemote("drivingSchool.buyLic", 1);
            },
            "Мототехника": () => {
                mp.events.callRemote("drivingSchool.buyLic", 2);
            },
            "Вернуться": () => {
                mp.events.call("selectMenu.show", "driving_school_licenses");
            }
        },
        "driving_school_water": {
            "Лодки": () => {
                mp.events.callRemote("drivingSchool.buyLic", 3);
            },
            "Яхты": () => {
                mp.events.callRemote("drivingSchool.buyLic", 4);
            },
            "Вернуться": () => {
                mp.events.call("selectMenu.show", "driving_school_licenses", 1);
            }
        },
        "driving_school_fly": {
            "Вертолёты": () => {
                mp.events.callRemote("drivingSchool.buyLic", 11);
            },
            "Самолёты": () => {
                mp.events.callRemote("drivingSchool.buyLic", 12);
            },
            "Вернуться": () => {
                mp.events.call("selectMenu.show", "driving_school_licenses", 2);
            }
        },

        "trucker_load": {
            "Взять заказ": () => {
                mp.events.call("selectMenu.hide");
				mp.events.call("selectMenuTalRasha.show", "trucker_load_two");
            },
        },
		
		"trucker_load_two": {
            "Загрузить": (value) => {
                if (!isFlood()) mp.events.callRemote(`trucker.buyTrailer`, parseInt(value));
            },
			"Вернуться": () => {
				mp.events.call("selectMenuTalRasha.hide");
                mp.events.call("selectMenu.show", "trucker_load");
            }
        },

        "enter_farm": {
            "Работа": () => {
                mp.events.call("selectMenu.show", "enter_farm_job");
            },
            "Информация": () => {

            },
            "Помощь": () => {

            },
        },
        "enter_farm_job": {
            "Рабочий": () => {
                mp.events.callRemote("farm.startJob", 0);
                mp.events.call("selectMenu.hide");
            },
            "Фермер": () => {
                mp.events.callRemote("farm.startJob", 1);
                mp.events.call("selectMenu.hide");
            },
            "Тракторист": () => {
                mp.events.callRemote("farm.startJob", 2);
                mp.events.call("selectMenu.hide");
            },
            "Пилот": () => {
                mp.events.callRemote("farm.startJob", 3);
                mp.events.call("selectMenu.hide");
            },
            "Уволиться": () => {
                mp.events.callRemote("farm.stopJob");
                mp.events.call("selectMenu.hide");
            },
            "Вернуться": () => {
                mp.events.call("selectMenu.show", "enter_farm");
            }
        },
        "farm_warehouse": {
            "Посев зерна": () => {
                mp.events.call("selectMenu.show", "farm_warehouse_fill_field");
            },
            "Покупка урожая": () => {
                mp.events.call("selectMenu.show", "farm_warehouse_buy_crop");
            },
            "Продажа зерна": () => {
                mp.events.call("selectMenu.show", "farm_warehouse_sell_grain");
            },
            "Выгрузка урожая": () => {
                mp.events.callRemote(`farm.warehouse.unloadCrop`);
                mp.events.call("selectMenu.hide");
            },
        },
        "farm_warehouse_fill_field": {
            "Загрузить": () => {

            },
            "Вернуться": () => {
                mp.events.call("selectMenu.show", "farm_warehouse");
            }
        },
        "farm_warehouse_buy_crop": {
            "Закупить": () => {

            },
            "Вернуться": () => {
                mp.events.call("selectMenu.show", "farm_warehouse", 1);
            }
        },
        "farm_warehouse_sell_grain": {
            "Продажа": () => {

            },
            "Вернуться": () => {
                mp.events.call("selectMenu.show", "farm_warehouse", 2);
            }
        },
    };
    for (var key in menuHandlers) {
        menuHandlers[key]["Закрыть"] = () => {
            mp.events.call(`selectMenu.hide`);
        }
    }

    let index_menu = [
      "biz_8_melee",
      "biz_8_handguns",
      "biz_8_submachine_guns",
      "biz_8_shotguns",
      "biz_8_ammo",
      "biz_6_items"
    ];
	
	mp.events.add("selectMenu.itemSelectedTalRasha", (menuName, itemName, itemValue, itemIndex) => {
		playSelectSound();
		
		if (menuHandlers[menuName] !== undefined) {
          if (menuHandlers[menuName][itemName] || menuHandlers[menuName][itemIndex]) {
            if (index_menu.includes(menuName))
                menuHandlers[menuName][itemIndex](itemValue, itemIndex);
            else
                menuHandlers[menuName][itemName](itemValue, itemIndex);
          }
        }
	});
	
	mp.events.add("selectMenu.itemSelectedclothes", (menuName, item, itemValue, itemIndex) => {
		item = JSON.parse(item);
        var itemName = item.text;
		
		if (menuHandlers[menuName] !== undefined) {
          if (menuHandlers[menuName][itemName] || menuHandlers[menuName][itemIndex]) {
            if (index_menu.includes(menuName))
                menuHandlers[menuName][itemIndex](itemValue, itemIndex);
            else
                menuHandlers[menuName][itemName](itemValue, itemIndex);
          }
        }
	});
	
    mp.events.add("selectMenu.itemSelected", (menuName, item, itemValue, itemIndex) => {
        // debug(`itemSelected: ${menuName} ${itemName} ${itemValue} ${itemIndex}`);
        playSelectSound();
		
		item = JSON.parse(item);
        var itemName = item.text;
			
        if (menuHandlers[menuName] !== undefined) {
          if (menuHandlers[menuName][itemName] || menuHandlers[menuName][itemIndex]) {
            if (index_menu.includes(menuName))
                menuHandlers[menuName][itemIndex](itemValue, itemIndex);
            else
                menuHandlers[menuName][itemName](itemValue, itemIndex);
          }
        }

        if (menuName == "biz_3_top") {
            if (itemIndex >= mp.storage.data.clothes.top[mp.clientStorage.sex].length) return;
            itemIndex = Math.clamp(itemIndex, 0, mp.storage.data.clothes.top[mp.clientStorage.sex].length - 1);
            var comp = mp.storage.data.clothes.top[mp.clientStorage.sex][itemIndex];
            var texture = comp.textures.indexOf(itemValue);
            if (texture == -1) return mp.events.call("nError", "Текстура не найдена!");
            mp.events.callRemote("biz_3.buyItem", "top", itemIndex, texture);
        } else if (menuName == "biz_3_legs") {
            if (itemIndex >= mp.storage.data.clothes.legs[mp.clientStorage.sex].length) return;
            itemIndex = Math.clamp(itemIndex, 0, mp.storage.data.clothes.legs[mp.clientStorage.sex].length - 1);
            var comp = mp.storage.data.clothes.legs[mp.clientStorage.sex][itemIndex];
            var texture = comp.textures.indexOf(itemValue);
            if (texture == -1) return mp.events.call("nError", "Текстура не найдена!");
            mp.events.callRemote("biz_3.buyItem", "legs", itemIndex, texture);
        } else if (menuName == "biz_3_feets") {
            if (itemIndex >= mp.storage.data.clothes.feets[mp.clientStorage.sex].length) return;
            itemIndex = Math.clamp(itemIndex, 0, mp.storage.data.clothes.feets[mp.clientStorage.sex].length - 1);
            var comp = mp.storage.data.clothes.feets[mp.clientStorage.sex][itemIndex];
            var texture = comp.textures.indexOf(itemValue);
            if (texture == -1) return mp.events.call("nError", "Текстура не найдена!");
            mp.events.callRemote("biz_3.buyItem", "feets", itemIndex, texture);
        } else if (menuName == "biz_3_hats") {
            if (itemIndex >= mp.storage.data.clothes.hats[mp.clientStorage.sex].length) return;
            itemIndex = Math.clamp(itemIndex, 0, mp.storage.data.clothes.hats[mp.clientStorage.sex].length - 1);
            var comp = mp.storage.data.clothes.hats[mp.clientStorage.sex][itemIndex];
            var texture = comp.textures.indexOf(itemValue);
            if (texture == -1) return mp.events.call("nError", "Текстура не найдена!");
            mp.events.callRemote("biz_3.buyItem", "hats", itemIndex, texture);
		} else if (menuName == "biz_3_undershirts") {
            if (itemIndex >= mp.storage.data.clothes.undershirts[mp.clientStorage.sex].length) return;
            itemIndex = Math.clamp(itemIndex, 0, mp.storage.data.clothes.undershirts[mp.clientStorage.sex].length - 1);
            var comp = mp.storage.data.clothes.undershirts[mp.clientStorage.sex][itemIndex];
            var texture = comp.textures.indexOf(itemValue);
            if (texture == -1) return mp.events.call("nError", "Текстура не найдена!");
            mp.events.callRemote("biz_3.buyItem", "undershirts", itemIndex, texture);
        } else if (menuName == "biz_18_glasses") {
            if (itemIndex >= mp.storage.data.clothes.glasses[mp.clientStorage.sex].length) return;
            itemIndex = Math.clamp(itemIndex, 0, mp.storage.data.clothes.glasses[mp.clientStorage.sex].length - 1);
            var comp = mp.storage.data.clothes.glasses[mp.clientStorage.sex][itemIndex];
            var texture = comp.textures.indexOf(itemValue);
            if (texture == -1) return mp.events.call("nError", "Текстура не найдена!");
            mp.events.callRemote("biz_3.buyItem", "glasses", itemIndex, texture);
        } else if (menuName == "biz_18_bracelets") {
            if (itemIndex >= mp.storage.data.clothes.bracelets[mp.clientStorage.sex].length) return;
            itemIndex = Math.clamp(itemIndex, 0, mp.storage.data.clothes.bracelets[mp.clientStorage.sex].length - 1);
            var comp = mp.storage.data.clothes.bracelets[mp.clientStorage.sex][itemIndex];
            var texture = comp.textures.indexOf(itemValue);
            if (texture == -1) return mp.events.call("nError", "Текстура не найдена!");
            mp.events.callRemote("biz_3.buyItem", "bracelets", itemIndex, texture);
        } else if (menuName == "biz_18_ears") {
            if (itemIndex >= mp.storage.data.clothes.ears[mp.clientStorage.sex].length) return;
            itemIndex = Math.clamp(itemIndex, 0, mp.storage.data.clothes.ears[mp.clientStorage.sex].length - 1);
            var comp = mp.storage.data.clothes.ears[mp.clientStorage.sex][itemIndex];
            var texture = comp.textures.indexOf(itemValue);
            if (texture == -1) return mp.events.call("nError", "Текстура не найдена!");
            mp.events.callRemote("biz_3.buyItem", "ears", itemIndex, texture);
        } else if (menuName == "biz_13_clothes") {
            if (itemIndex >= mp.storage.data.clothes.masks[1].length) return;
            itemIndex = Math.clamp(itemIndex, 0, mp.storage.data.clothes.masks[1].length - 1);
            var comp = mp.storage.data.clothes.masks[1][itemIndex];
            var texture = comp.textures.indexOf(itemValue);
            if (texture == -1) return mp.events.call("nError", "Текстура не найдена!");
            mp.events.callRemote("biz_3.buyItem", "masks", itemIndex, texture);
        } else if (menuName == "biz_20_clothes") {
			if (itemIndex >= mp.storage.data.clothes.bags[mp.clientStorage.sex].length) return;
            itemIndex = Math.clamp(itemIndex, 0, mp.storage.data.clothes.bags[mp.clientStorage.sex].length - 1);
            var comp = mp.storage.data.clothes.bags[mp.clientStorage.sex][itemIndex];
            var texture = comp.textures.indexOf(itemValue);
            if (texture == -1) return mp.events.call("nError", "Текстура не найдена!");
            mp.events.callRemote("biz_3.buyItem", "bags", itemIndex, texture);
        } else if (menuName == "biz_18_ties") {
            if (itemIndex >= mp.storage.data.clothes.ties[mp.clientStorage.sex].length) return;
            itemIndex = Math.clamp(itemIndex, 0, mp.storage.data.clothes.ties[mp.clientStorage.sex].length - 1);
            var comp = mp.storage.data.clothes.ties[mp.clientStorage.sex][itemIndex];
            var texture = comp.textures.indexOf(itemValue);
            if (texture == -1) return mp.events.call("nError", "Текстура не найдена!");
            mp.events.callRemote("biz_3.buyItem", "ties", itemIndex, texture);
        } else if (menuName == "biz_7_tatooList_category") {
            if (item.values) {
                mp.events.call("client:tatooShop:buyTatoo", item);
            }
        } else if (menuName == "biz_7_tatooList") {
			if (itemName == "Уйти" || itemName == "Удалить татуировку") return;
            mp.events.call("client:tatooShop:openCategory", itemName);
        } else if (menuName == "biz_7_deleteTatoo") {
            if (item.values) {
                mp.events.call("client:tatooShop:deleteTatoo", item);
            }
        } else if (menuName == "biz_18_watches") {
            if (itemIndex >= mp.storage.data.clothes.watches[mp.clientStorage.sex].length) return;
            itemIndex = Math.clamp(itemIndex, 0, mp.storage.data.clothes.watches[mp.clientStorage.sex].length - 1);
            var comp = mp.storage.data.clothes.watches[mp.clientStorage.sex][itemIndex];
            var texture = comp.textures.indexOf(itemValue);
            if (texture == -1) return mp.events.call("nError", "Текстура не найдена!");
            mp.events.callRemote("biz_3.buyItem", "watches", itemIndex, texture);
        }
    });

    mp.events.add("selectMenu.itemValueChanged", (menuName, itemName, itemValue, itemIndex, valueIndex) => {
        //debug(`itemValueChanged: ${menuName} ${itemName} ${itemValue}`);
        var menuHandlers = {};

        if (menuHandlers[menuName] && menuHandlers[menuName][itemName])
            menuHandlers[menuName][itemName](itemValue);
        if (menuName == "biz_3_top") {
            itemIndex = Math.clamp(itemIndex, 0, mp.storage.data.clothes.top[mp.clientStorage.sex].length - 1);
            var comp = mp.storage.data.clothes.top[mp.clientStorage.sex][itemIndex];
            mp.players.local.setComponentVariation(11, comp.variation, comp.textures[valueIndex], 0);
        } else if (menuName == "biz_3_legs") {
            itemIndex = Math.clamp(itemIndex, 0, mp.storage.data.clothes.legs[mp.clientStorage.sex].length - 1);
            var comp = mp.storage.data.clothes.legs[mp.clientStorage.sex][itemIndex];
            mp.players.local.setComponentVariation(4, comp.variation, comp.textures[valueIndex], 0);
        } else if (menuName == "biz_3_feets") {
            itemIndex = Math.clamp(itemIndex, 0, mp.storage.data.clothes.feets[mp.clientStorage.sex].length - 1);
            var comp = mp.storage.data.clothes.feets[mp.clientStorage.sex][itemIndex];
            mp.players.local.setComponentVariation(6, comp.variation, comp.textures[valueIndex], 0);
        } else if (menuName == "biz_3_hats") {
            itemIndex = Math.clamp(itemIndex, 0, mp.storage.data.clothes.hats[mp.clientStorage.sex].length - 1);
            var comp = mp.storage.data.clothes.hats[mp.clientStorage.sex][itemIndex];
            mp.players.local.setPropIndex(0, comp.variation, comp.textures[valueIndex], true);
		} else if (menuName == "biz_3_undershirts") {
            itemIndex = Math.clamp(itemIndex, 0, mp.storage.data.clothes.undershirts[mp.clientStorage.sex].length - 1);
            var comp = mp.storage.data.clothes.undershirts[mp.clientStorage.sex][itemIndex];
            mp.players.local.setComponentVariation(8, comp.variation, comp.textures[valueIndex], 0);	
        } else if (menuName == "biz_18_glasses") {
            itemIndex = Math.clamp(itemIndex, 0, mp.storage.data.clothes.glasses[mp.clientStorage.sex].length - 1);
            var comp = mp.storage.data.clothes.glasses[mp.clientStorage.sex][itemIndex];
            mp.players.local.setPropIndex(1, comp.variation, comp.textures[valueIndex], true);
        } else if (menuName == "biz_18_bracelets") {
            itemIndex = Math.clamp(itemIndex, 0, mp.storage.data.clothes.bracelets[mp.clientStorage.sex].length - 1);
            var comp = mp.storage.data.clothes.bracelets[mp.clientStorage.sex][itemIndex];
            mp.players.local.setPropIndex(7, comp.variation, comp.textures[valueIndex], true);
        } else if (menuName == "biz_20_clothes") {
			itemIndex = Math.clamp(itemIndex, 0, mp.storage.data.clothes.bags[mp.clientStorage.sex].length - 1);
            var comp = mp.storage.data.clothes.bags[mp.clientStorage.sex][itemIndex];
            mp.players.local.setComponentVariation(5, comp.variation, comp.textures[valueIndex], 0);
        } else if (menuName == "biz_18_ears") {
            itemIndex = Math.clamp(itemIndex, 0, mp.storage.data.clothes.ears[mp.clientStorage.sex].length - 1);
            var comp = mp.storage.data.clothes.ears[mp.clientStorage.sex][itemIndex];
            mp.players.local.setPropIndex(2, comp.variation, comp.textures[valueIndex], true);
        } else if (menuName == "biz_13_clothes") {
            itemIndex = Math.clamp(itemIndex, 0, mp.storage.data.clothes.masks[1].length - 1);
            var comp = mp.storage.data.clothes.masks[1][itemIndex];
            mp.players.local.setComponentVariation(1, comp.variation, comp.textures[valueIndex], 0);
        } else if (menuName == "biz_18_ties") {
            itemIndex = Math.clamp(itemIndex, 0, mp.storage.data.clothes.ties[mp.clientStorage.sex].length - 1);
            var comp = mp.storage.data.clothes.ties[mp.clientStorage.sex][itemIndex];
            mp.players.local.setComponentVariation(7, comp.variation, comp.textures[valueIndex], 0);
        } else if (menuName == "biz_18_watches") {
            itemIndex = Math.clamp(itemIndex, 0, mp.storage.data.clothes.watches[mp.clientStorage.sex].length - 1);
            var comp = mp.storage.data.clothes.watches[mp.clientStorage.sex][itemIndex];
            mp.players.local.setPropIndex(6, comp.variation, comp.textures[valueIndex], true);
        }
        //menuHandlers[menuName][itemName][itemValue]();
    });

    mp.events.add("selectMenu.itemFocusChanged", (menuName, item, itemValue, itemIndex, valueIndex) => {
        playFocusSound();
        //menu.execute(`alert('itemFocusChanged: ${menuName} ${itemName} ${itemValue}')`);
        var menuHandlers = { };
		item = JSON.parse(item);
        var itemName = item.text;
        if (menuHandlers[menuName] && menuHandlers[menuName][itemName]) menuHandlers[menuName][itemName](itemValue, itemIndex);
        if (menuName == "biz_3_top") {
            itemIndex = Math.clamp(itemIndex, 0, mp.storage.data.clothes.top[mp.clientStorage.sex].length - 1);
            var comp = mp.storage.data.clothes.top[mp.clientStorage.sex][itemIndex];
            mp.players.local.setComponentVariation(3, comp.torso, 0, 0);
            mp.players.local.setComponentVariation(11, comp.variation, comp.textures[valueIndex], 0);
        } else if (menuName == "biz_3_legs") {
            itemIndex = Math.clamp(itemIndex, 0, mp.storage.data.clothes.legs[mp.clientStorage.sex].length - 1);
            var comp = mp.storage.data.clothes.legs[mp.clientStorage.sex][itemIndex];
            mp.players.local.setComponentVariation(4, comp.variation, comp.textures[valueIndex], 0);
        } else if (menuName == "biz_3_feets") {
            itemIndex = Math.clamp(itemIndex, 0, mp.storage.data.clothes.feets[mp.clientStorage.sex].length - 1);
            var comp = mp.storage.data.clothes.feets[mp.clientStorage.sex][itemIndex];
            mp.players.local.setComponentVariation(6, comp.variation, comp.textures[valueIndex], 0);
        } else if (menuName == "biz_3_hats") {
            itemIndex = Math.clamp(itemIndex, 0, mp.storage.data.clothes.hats[mp.clientStorage.sex].length - 1);
            var comp = mp.storage.data.clothes.hats[mp.clientStorage.sex][itemIndex];
            mp.players.local.setPropIndex(0, comp.variation, comp.textures[valueIndex], true);
		} else if (menuName == "biz_3_undershirts") {
            itemIndex = Math.clamp(itemIndex, 0, mp.storage.data.clothes.undershirts[mp.clientStorage.sex].length - 1);
            var comp = mp.storage.data.clothes.undershirts[mp.clientStorage.sex][itemIndex];
			mp.players.local.setComponentVariation(8, comp.variation, comp.textures[valueIndex], 0);	
        } else if (menuName == "biz_18_glasses") {
            itemIndex = Math.clamp(itemIndex, 0, mp.storage.data.clothes.glasses[mp.clientStorage.sex].length - 1);
            var comp = mp.storage.data.clothes.glasses[mp.clientStorage.sex][itemIndex];
            mp.players.local.setPropIndex(1, comp.variation, comp.textures[valueIndex], true);
        } else if (menuName == "biz_18_bracelets") {
            itemIndex = Math.clamp(itemIndex, 0, mp.storage.data.clothes.bracelets[mp.clientStorage.sex].length - 1);
            var comp = mp.storage.data.clothes.bracelets[mp.clientStorage.sex][itemIndex];
            mp.players.local.setPropIndex(7, comp.variation, comp.textures[valueIndex], true);
        } else if (menuName == "biz_18_ears") {
            itemIndex = Math.clamp(itemIndex, 0, mp.storage.data.clothes.ears[mp.clientStorage.sex].length - 1);
            var comp = mp.storage.data.clothes.ears[mp.clientStorage.sex][itemIndex];
            mp.players.local.setPropIndex(2, comp.variation, comp.textures[valueIndex], true);
        } else if (menuName == "biz_13_clothes") {
            itemIndex = Math.clamp(itemIndex, 0, mp.storage.data.clothes.masks[1].length - 1);
            var comp = mp.storage.data.clothes.masks[1][itemIndex];
            mp.players.local.setComponentVariation(1, comp.variation, comp.textures[valueIndex], 0);
        } else if (menuName == "biz_20_clothes") {
            itemIndex = Math.clamp(itemIndex, 0, mp.storage.data.clothes.bags[mp.clientStorage.sex].length - 1);
            var comp = mp.storage.data.clothes.bags[mp.clientStorage.sex][itemIndex];
            mp.players.local.setComponentVariation(5, comp.variation, comp.textures[valueIndex], 0);
        } else if (menuName == "biz_18_ties") {
            itemIndex = Math.clamp(itemIndex, 0, mp.storage.data.clothes.ties[mp.clientStorage.sex].length - 1);
            var comp = mp.storage.data.clothes.ties[mp.clientStorage.sex][itemIndex];
            mp.players.local.setComponentVariation(7, comp.variation, comp.textures[valueIndex], 0);
        } else if (menuName == "biz_18_watches") {
            itemIndex = Math.clamp(itemIndex, 0, mp.storage.data.clothes.watches[mp.clientStorage.sex].length - 1);
            var comp = mp.storage.data.clothes.watches[mp.clientStorage.sex][itemIndex];
            mp.players.local.setPropIndex(6, comp.variation, comp.textures[valueIndex], true);
        } else if (menuName == "biz_7_tatooList_category") {
            mp.events.call("client:tatooShop:changeTatoo", item, item.values ? itemIndex - 1 : null);
        }
    });

    mp.events.add("selectMenu.backspacePressed", (menuName, itemName, itemValue, itemIndex) => {
        playBackSound();
        //menu.execute(`alert('backspacePressed: ${menuName} ${itemName} ${itemValue}')`);
        var menuHandlers = {
            "!enter_house": (itemName, itemValue) => {
                mp.events.call(`selectMenu.hide`);
            },
            "!exit_house": (itemName, itemValue) => {
                mp.events.call(`selectMenu.hide`);
            },
            /*"enter_garage": (itemName, itemValue) => {
                mp.events.call(`selectMenu.hide`);
            },*/
            /*"exit_garage": (itemName, itemValue) => {
            	mp.events.call(`selectMenu.hide`);
            },*/
            "biz_panel": (itemName, itemValue) => {
                //mp.events.call(`selectMenu.show`, prevMenuName);
				mp.events.call("selectMenu.hide");
            },
            "biz_cashbox": (itemName, itemValue) => {
                mp.events.call(`selectMenu.show`, "biz_panel", 1);
            },
            "biz_stats": (itemName, itemValue) => {
                mp.events.call(`selectMenu.show`, "biz_panel", 2);
            },
            "biz_products": (itemName, itemValue) => {
                mp.events.call(`selectMenu.show`, "biz_panel", 3);
            },
            "biz_staff": (itemName, itemValue) => {
                mp.events.call(`selectMenu.show`, "biz_panel", 4);
            },
            "biz_rise": (itemName, itemValue) => {
                mp.events.call(`selectMenu.show`, "biz_panel", 5);
            },
            "biz_status": (itemName, itemValue) => {
                mp.events.call(`selectMenu.show`, "biz_panel", 6);
            },
            "biz_sell": (itemName, itemValue) => {
                mp.events.call(`selectMenu.show`, "biz_panel", 7);
            },
			"biz_13_clothes": () => {
				mp.events.callRemote("clothesShop.open", false, "enter_biz_13");
				mp.events.call("selectMenu.hide");
                //mp.events.call("selectMenu.show", "enter_biz_13");
            },
			"biz_20_clothes": () => {
				mp.events.callRemote("clothesShop.open", false, "enter_biz_20");
				mp.events.call("selectMenu.hide");
                //mp.events.call("selectMenu.show", "enter_biz_13");
            },
			"enter_biz_13": () => {
				//mp.events.call(`selectMenu.hide`);
            },
            "biz_3_clothes": () => {
				mp.events.callRemote("clothesShop.open", false, "biz_3_clothes");
				mp.events.call("selectMenu.hide");
				setCursor(false);
               // mp.events.call("selectMenu.show", "enter_biz_3");
            },
			"biz_18_clothes": () => {
				mp.events.callRemote("clothesShop.open", false, "biz_18_clothes");
				mp.events.call("selectMenu.hide");
               // mp.events.call("selectMenu.show", "enter_biz_18");
            },
            "biz_3_top": () => {
                mp.events.call("selectMenuTalRasha.show", "biz_3_clothes");
            },
            "biz_3_legs": () => {
                mp.events.call("selectMenuTalRasha.show", "biz_3_clothes", 1);
            },
            "biz_3_feets": () => {
                mp.events.call("selectMenuTalRasha.show", "biz_3_clothes", 2);
            },
            "biz_3_hats": () => {
                mp.events.call("selectMenuTalRasha.show", "biz_3_clothes", 3);
            },
			"biz_3_undershirts": () => {
                mp.events.call("selectMenuTalRasha.show", "biz_3_clothes", 4);
            },
            "biz_18_glasses": () => {
                mp.events.call("selectMenuTalRasha.show", "biz_18_clothes", 0);
            },
            "biz_18_bracelets": () => {
                mp.events.call("selectMenuTalRasha.show", "biz_18_clothes", 1);
            },
            "biz_18_ears": () => {
                mp.events.call("selectMenuTalRasha.show", "biz_18_clothes", 2);
            },
            "biz_3_masks": () => {
                mp.events.call("selectMenuTalRasha.show", "biz_3_clothes", 0);
            },
            "biz_18_ties": () => {
                mp.events.call("selectMenuTalRasha.show", "biz_18_clothes", 3);
            },
            "biz_18_watches": () => {
                mp.events.call("selectMenuTalRasha.show", "biz_18_clothes", 4);
            },
            "biz_5_items": () => {
                //mp.events.call("selectMenu.show", "enter_biz_5", 0);
				mp.events.call("selectMenu.hide");
            },
            "biz_6_items": () => {
                mp.events.call("selectMenu.show", "enter_biz_6");
            },
            "biz_8_guns": () => {
                mp.events.call("selectMenu.show", "enter_biz_8");
            },
            "biz_8_melee": () => {
                mp.events.call("selectMenu.show", "biz_8_guns");
            },
            "biz_8_handguns": () => {
                mp.events.call("selectMenu.show", "biz_8_guns", 1);
            },
            "biz_8_submachine_guns": () => {
                mp.events.call("selectMenu.show", "biz_8_guns", 2);
            },
            "biz_8_shotguns": () => {
                mp.events.call("selectMenu.show", "biz_8_guns", 3);
            },
            "biz_8_assault_rifles": () => {
                mp.events.call("selectMenu.show", "biz_8_guns", 4);
            },
            "biz_8_light_machine_guns": () => {
                mp.events.call("selectMenu.show", "biz_8_guns", 5);
            },
            "biz_8_sniper_rifles": () => {
                mp.events.call("selectMenu.show", "biz_8_guns", 6);
            },
            "biz_8_ammo": () => {
                mp.events.call("selectMenu.show", "enter_biz_8", 1);
            },
            "police_storage": () => {
                mp.events.call(`selectMenu.hide`);
            },
            "police_guns": () => {
                mp.events.call("selectMenu.show", "police_storage");
            },
            "police_clothes": () => {
                mp.events.call("selectMenu.show", "police_storage", 1);
            },
            "police_items": () => {
                mp.events.call("selectMenu.show", "police_storage", 2);
            },
            "police_ammo": () => {
				mp.events.call("selectMenuTalRasha.hide");
                mp.events.call("selectMenu.show", "police_storage", 3);
            },
			"trucker_load": () => {
				mp.events.call(`selectMenu.hide`);
            },
			"trucker_load_two": () => {
				mp.events.call("selectMenuTalRasha.hide");
                mp.events.call("selectMenu.show", "trucker_load");
            },
            "police_service_recovery": () => {
                mp.events.call("selectMenu.show", "police_service");
            },

            "police_storage_2": () => {
                mp.events.call(`selectMenu.hide`);
            },
            "police_guns_2": () => {
                mp.events.call("selectMenu.show", "police_storage_2");
            },
            "police_clothes_2": () => {
                mp.events.call("selectMenu.show", "police_storage_2", 1);
            },
            "police_items_2": () => {
                mp.events.call("selectMenu.show", "police_storage_2", 2);
            },
            "police_ammo_2": () => {
				mp.events.call("selectMenuTalRasha.hide");
                mp.events.call("selectMenu.show", "police_storage_2", 3);
            },
            "police_service_recovery_2": () => {
                mp.events.call("selectMenu.show", "police_service_2");
            },

            "army_storage": () => {
                mp.events.call(`selectMenu.hide`);
            },
            "army_guns": () => {
                mp.events.call("selectMenu.show", "army_storage");
            },
            "army_clothes": () => {
                mp.events.call("selectMenu.show", "army_storage", 1);
            },
            "army_items": () => {
                mp.events.call("selectMenu.show", "army_storage", 2);
            },
            "army_ammo": () => {
				mp.events.call("selectMenuTalRasha.hide");
                mp.events.call("selectMenu.show", "army_storage", 2);
            },

            "army_storage_2": () => {
                mp.events.call(`selectMenu.hide`);
            },
            "army_guns_2": () => {
                mp.events.call("selectMenu.show", "army_storage_2");
            },
            "army_clothes_2": () => {
                mp.events.call("selectMenu.show", "army_storage_2", 1);
            },
            "army_items_2": () => {
                mp.events.call("selectMenu.show", "army_storage_2", 2);
            },
            "army_ammo_2": () => {
				mp.events.call("selectMenuTalRasha.hide");
                mp.events.call("selectMenu.show", "army_storage_2", 2);
            },

            "fib_storage": () => {
                mp.events.call(`selectMenu.hide`);
            },
            "fib_guns": () => {
                mp.events.call("selectMenu.show", "fib_storage");
            },
            "fib_clothes": () => {
                mp.events.call("selectMenu.show", "fib_storage", 1);
            },
            "fib_items": () => {
                mp.events.call("selectMenu.show", "fib_storage", 2);
            },
            "fib_ammo": () => {
				mp.events.call("selectMenuTalRasha.hide");
                mp.events.call("selectMenu.show", "fib_storage", 3);
            },

            "hospital_storage": () => {
                mp.events.call(`selectMenu.hide`);
            },
            "hospital_items": () => {
				mp.events.call("selectMenuTalRasha.hide");
                mp.events.call("selectMenu.show", "hospital_storage");
            },
            "hospital_clothes": () => {
                mp.events.call("selectMenu.show", "hospital_storage", 1);
            },
            "driving_school_licenses": () => {
                mp.events.call("selectMenu.show", "enter_driving_school");
            },
            "driving_school_car": () => {
                mp.events.call("selectMenu.show", "driving_school_licenses");
            },
            "driving_school_water": () => {
                mp.events.call("selectMenu.show", "driving_school_licenses", 1);
            },
            "driving_school_fly": () => {
                mp.events.call("selectMenu.show", "driving_school_licenses", 2);
            },
            "band_dealer_menu_guns": () => {
				mp.events.call("selectMenuTalRasha.hide");
                mp.events.call("selectMenu.show", "band_dealer_menu");
            },
            "band_dealer_menu_melee": () => {
                mp.events.call("selectMenuTalRasha.show", "band_dealer_menu_guns");
            },
            "band_dealer_menu_handguns": () => {
                mp.events.call("selectMenuTalRasha.show", "band_dealer_menu_guns", 1);
            },
            "band_dealer_menu_submachine_guns": () => {
                mp.events.call("selectMenuTalRasha.show", "band_dealer_menu_guns", 2);
            },
            "band_dealer_menu_shotguns": () => {
                mp.events.call("selectMenuTalRasha.show", "band_dealer_menu_guns", 3);
            },
            "band_dealer_menu_assault_rifles": () => {
                mp.events.call("selectMenuTalRasha.show", "band_dealer_menu_guns", 4);
            },
            "band_dealer_menu_ammo": () => {
				mp.events.call("selectMenuTalRasha.hide");
                mp.events.call("selectMenu.show", "band_dealer_menu", 1);
            },
            "band_dealer_menu_drugs": () => {
				mp.events.call("selectMenuTalRasha.hide");
                mp.events.call("selectMenu.show", "band_dealer_menu", 2);
            },
            "enter_farm_job": () => {
                mp.events.call("selectMenu.show", "enter_farm");
            },
            "farm_warehouse_fill_field": () => {
                mp.events.call("selectMenu.show", "farm_warehouse", 0);
            },
            "farm_warehouse_buy_crop": () => {
                mp.events.call("selectMenu.show", "farm_warehouse", 1);
            },
            "farm_warehouse_sell_grain": () => {
                mp.events.call("selectMenu.show", "farm_warehouse", 2);
            },
			"biz_7_tatooList": () => {
                mp.events.callRemote("server:tatooShop:onStop");
                mp.events.call("selectMenu.hide");
				mp.events.call("setFreeze", false);
				mp.events.call("client:tatooShop:stopChoose");
            },
			"biz_7_tatooList_category": () => {
                mp.events.call("selectMenuTalRasha.show", "biz_7_tatooList", 0);
            },
			"biz_7_deleteTatoo": () => {
                mp.events.call("selectMenuTalRasha.show", "biz_7_tatooList", 0);
            },
        };

        if (menuHandlers[menuName])
            menuHandlers[menuName](itemName, itemValue);
    });

    mp.events.add("setSelectMenuActive", (enable) => {
        mp.selectMenuActive = enable;
    });

    function clothesConvertToMenuItems(clothes) {
        var items = [];
        for (var i = 0; i < clothes.length; i++) {
            items.push({
                text: `Шмотка <i>${clothes[i].price}$</i> ID: ${clothes[i].id}`,
                values: clothes[i].textures
            });
        }
        return items;
    }

    mp.events.add("food.shop.setFoodShopPrices", (args) => {
		menu.execute(`shop.setPrices(${args})`);
    });
	mp.events.add("gun.shop.setGunShopPrices", (args) => {
		menu.execute(`gun_shop.setPrices(${args})`);
    });
	mp.events.add("food.shop.hide", (args) => {
		menu.execute(`shop.show(false)`);
    });
	
	mp.events.add("gun.shop.hide", (args) => {
		menu.execute(`gun_shop.show(false)`);
    });
	
	
	mp.events.add("client::setndAdMessage", (text, name, phone, date) => {
        menu.execute(`announceShow('${text}', '${name}', '${phone}', convertMillsToDate(${date}))`);
    });
	
	
	
	var dressingRooms = {
		1: {x: -1188.98, y: -769.426, z: 17.325}, // Магазин одежды 1 - 11
		2: {x: 72.6175, y: -1399.08, z: 29.3761},
		3: {x: 426.34, y: -801.44, z: 29.49},
		4: {x: -3174.78, y: 1043.03, z: 20.863},
		5: {x: 614.99, y: 2767.46, z: 42.09},
		6: {x: 1191.55, y: 2711.33, z: 38.22},
		7: {x: 1695.6, y: 4828.29, z: 42.063},
		8: {x: 11.352, y: 6514.65, z: 31.879},
		9: {x: -1107.96, y: 2708.49, z: 19.108},
		10: {x: 123.24, y: -227.12, z: 54.56},
		11: {x: -829.295, y: -1074.27, z: 11.328},
		77: {x: -704.23, y: -153.33, z: 37.42}, // Магазин премиальной одежды 1
		78: {x: -1447.69, y: -243.028, z: 49.822}, // Магазин премиальной одежды 2
		79: {x: -168.30, y: -299.67, z: 39.73}, // Магазин премиальной одежды 3
		88: {x: -1338.13, y: -1278.2, z: 4.872}, // Магазин масок
		89: {x: 707.07, y: -962.11, z: 30.40}, // Магазин сумок
	}
	
	function focusMenu(focusmenu, stortage) {
		mp.players.local.setHeading(-10);
		switch (focusmenu) {
			case "character":
				mp.events.call("focusOnPlayer", {x: dressingRooms[lastPlayerInfo.currentEnteredClothesShopId].x, y: dressingRooms[lastPlayerInfo.currentEnteredClothesShopId].y, z: dressingRooms[lastPlayerInfo.currentEnteredClothesShopId].z}, -10);
				break;
			case "head":
				mp.events.call("focusOnHead", {x: dressingRooms[lastPlayerInfo.currentEnteredClothesShopId].x, y: dressingRooms[lastPlayerInfo.currentEnteredClothesShopId].y, z: dressingRooms[lastPlayerInfo.currentEnteredClothesShopId].z}, -10);
				break;
			case "body":
				mp.events.call("focusOnBody", {x: dressingRooms[lastPlayerInfo.currentEnteredClothesShopId].x, y: dressingRooms[lastPlayerInfo.currentEnteredClothesShopId].y, z: dressingRooms[lastPlayerInfo.currentEnteredClothesShopId].z}, -10);
				break;
			case "legs":
				mp.events.call("focusOnLegs", {x: dressingRooms[lastPlayerInfo.currentEnteredClothesShopId].x, y: dressingRooms[lastPlayerInfo.currentEnteredClothesShopId].y, z: dressingRooms[lastPlayerInfo.currentEnteredClothesShopId].z}, -10);
				break;
			case "feets":
				mp.events.call("focusOnFeets", {x: dressingRooms[lastPlayerInfo.currentEnteredClothesShopId].x, y: dressingRooms[lastPlayerInfo.currentEnteredClothesShopId].y, z: dressingRooms[lastPlayerInfo.currentEnteredClothesShopId].z}, -10);
				break;
			case "finish":
				mp.events.call("finishMoveCam");
				break;	
		}
	}

	
}
