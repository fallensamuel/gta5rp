$(document).ready(() => {
    const menus_info = {
        "enter_biz_3": {
			npc_name: "Стефания",
			npc_desc: "Продавец-консультант",
			npc_text: "Приветствую Вас! Чем могу помочь? Обязательно обратите внимание на нашу новую коллекцию!",
			items: [{
				text: "Примерочная"
			},
            {
                text: "Выход"
			}],
			on: (values) => {
				onEnterBizHandler("enter_biz_3", values);
			},
		},
		"enter_biz_4": {
			npc_name: "Андре",
			npc_desc: "Парикмахер-стилист",
			npc_text: "Хотите подстричься? Подойдите к свободному креслу!",
			items: [{
                text: "Понятно"
			},
            {
                text: "Выход"
			}],
			on: (values) => {
				onEnterBizHandler("enter_biz_4", values);
			},
		},
		"enter_biz_5": {
			npc_name: "Джефри",
			npc_desc: "Заправщик",
			npc_text: "Полный бак для Вашей ласточки, сэр?",
			items: [{
				text: "Топливо",
			},
            {
                text: "Выход"
			}],
			on: (values) => {
				onEnterBizHandler("enter_biz_5", values);
			},
		},
		"enter_biz_6": {
			npc_name: "Том",
			npc_desc: "Продавец",
			npc_text: "Доброго времени суток! У нас Вы найдете все, что Вам необходимо!",
			items: [{
                text: "Магазин"
            },
            {
                text: "Выход"
			}],
			on: (values) => {
				onEnterBizHandler("enter_biz_6", values);
			},
		},
		"enter_biz_7": {
			npc_name: "Джерри",
			npc_desc: "Тату-мастер",
			npc_text: "Хэй, сразу к делу, что будем бить?",
            items: [{
                text: "Выбрать татуировку"
            },
            {
                text: "Выход"
			}],
			on: (values) => {
				onEnterBizHandler("enter_biz_7", values);
			},
		},
		"enter_biz_8": {
			npc_name: "Вилли",
			npc_desc: "Продавец оружия",
			npc_text: "Здравствуйте, у нас огромный выбор пушек, что Вас интересует?",
			items: [{
				text: "Магазин оружия"
			},
            {
                text: "Выход"
			}],
			on: (values) => {
				onEnterBizHandler("enter_biz_8", values);
			},
		},
		"enter_biz_9": {
			npc_name: "Дмитрий",
			npc_desc: "Менеджер",
			npc_text: "Доброго времени суток, какой автомобиль интересует?",
			items: [{
				text: "Купить авто"
			},
            {
                text: "Выход"
			}],
			on: (values) => {
				onEnterBizHandler("enter_biz_9", values);
			},
		},
        "enter_biz_10": {
			npc_name: "Гектор",
			npc_desc: "Механик",
			npc_text: "Здравствуйте. Добро пожаловать в Los Santos Customs!",
			items: [{
				text: "Выход"
			}],
			on: (values) => {
				onEnterBizHandler("enter_biz_10", values);
			},
		},
		"enter_biz_12": {
			npc_name: "Марк",
			npc_desc: "Менеджер",
			npc_text: "Здравствуйте, в нашем салоне собраны лучшие автомобили! Мы подберём Вам самый идеальный транспорт!",
            items: [{
                text: "Купить авто"
            },
            {
                text: "Выход"
			}],
            on: (values) => {
                onEnterBizHandler("enter_biz_12", values);
            },
        },
        "enter_biz_13": {
			npc_name: "Барт",
			npc_desc: "Продавец",
			npc_text: "Привет, у нас лучший ассортимент карнавальных масок.",
            items: [{
            text: "Примерочная"
            },
            {
                text: "Выход"
			}],
            on: (values) => {
                onEnterBizHandler("enter_biz_13", values);
            },
        },
        "enter_biz_14": {
			npc_name: "Леон",
			npc_desc: "Менеджер",
			npc_text: "Здравствуйте, мы  поможем Вам подобрать самого качественного двухколёсного друга.",
            items: [{
                text: "Купить мотоцикл"
            },
            {
                text: "Выход"
			}],
            on: (values) => {
                onEnterBizHandler("enter_biz_14", values);
            },
        },
        "enter_biz_15": {
			npc_name: "Даниил",
			npc_desc: "Менеджер",
			npc_text: "Здравствуйте! В нашем салоне лучшие Mersedes автомобили!",
			items: [{
				text: "Купить авто"
			},
            {
                text: "Выход"
			}],
			on: (values) => {
				onEnterBizHandler("enter_biz_15", values);
			},
        },
        "enter_biz_16": {
			npc_name: "Даниил",
			npc_desc: "Менеджер",
			npc_text: "Здравствуйте, купите любой грузовик на свой вкус!.",
			items: [{
				text: "Купить авто"
			},
            {
                text: "Выход"
			}],
			on: (values) => {
				onEnterBizHandler("enter_biz_16", values);
			},
		},
		"enter_biz_17": {
			npc_name: "Дин",
			npc_desc: "Менеджер",
			npc_text: "Доброго времени суток, у нас собраны самые эксклюзивные модели авто!",
			items: [{
				text: "Купить транспорт"
			},
            {
                text: "Выход"
			}],
			on: (values) => {
				onEnterBizHandler("enter_biz_17", values);
			},
		},
        "enter_biz_18": {
			npc_name: "Даниил",
			npc_desc: "Продавец",
			npc_text: "Привет, у нас лучший ассортимент ювелирных вещей!",
            items: [{
				text: "Примерочная"
            },
            {
                text: "Выход"
			}],
            on: (values) => {
                onEnterBizHandler("enter_biz_18", values);
            },
        },
		"enter_biz_19": {
			npc_name: "Даниил",
			npc_desc: "Менеджер",
			npc_text: "Здравствуйте! В нашем салоне лучшие BMW автомобили!",
			items: [{
				text: "Купить авто"
			},
            {
                text: "Выход"
			}],
			on: (values) => {
				onEnterBizHandler("enter_biz_19", values);
			},
        },
		"enter_biz_20": {
			npc_name: "Никита",
			npc_desc: "Продавец",
			npc_text: "Привет, у нас лучшие сумки в штате!",
			items: [{
				text: "Примерочная"
			},
            {
                text: "Выход"
			}],
			on: (values) => {
				onEnterBizHandler("enter_biz_20", values);
			},
        },
		"faction_clothes_menu": {
			npc_name: "Кэлвин Мао",
			npc_desc: "Капитолий",
			npc_text: "Ну что, готов к работе?",
			items: [{
                text: "Раздевалка"
            },
            {
                text: "Дежурство"
			}],
		},
		"enter_parkings_menu": {
			npc_name: "Олег",
			npc_desc: "Администратор",
			npc_text: "Подождите пару минут, сейчас найдём вам свободное место парковки!",
			items: [{
                text: "Раздевалка"
            }],
        }
    };

    let special_menu_state = 0;
    let quest_speech_number = 0;

    window.action_npc = {
        show: (menuName, values, spec_value) => {
			if (window.bindlocker()) return;
            if ($('#action_npc').hasClass('active')) {
                $('#action_npc').fadeOut(50, function() {
                    action_npc.activeMenu = false;
                    $('#action_npc').removeClass('active');
                    $(document).unbind('keydown', action_npc.buttons);
                    mp.trigger('setSelectMenuActive', false);
                    action_npc.show(menuName, values, spec_value);
                });
                return;
            }

            let menu = menus_info[menuName];
            
            if (!menu) {
                let quest_dialog = menuName.split("_");
                
                if ((quest_dialog[0] + quest_dialog[1]) == 'questdialog' && quest_npc_dialogs[quest_dialog[2]] || (quest_dialog[0] + quest_dialog[1]) == 'specdialog' && quest_npc_dialogs[quest_dialog[2]] || (quest_dialog[0] + quest_dialog[1]) == 'spec2dialog' && quest_npc_dialogs[quest_dialog[2]] || (quest_dialog[0] + quest_dialog[1]) == 'spec3dialog' && quest_npc_dialogs[quest_dialog[2]] || (quest_dialog[0] + quest_dialog[1]) == 'negativequest' && quest_npc_dialogs[quest_dialog[2]] || (quest_dialog[0] + quest_dialog[1]) == 'specnegative' && quest_npc_dialogs[quest_dialog[2]]) {
                    $("#action_npc .btns").remove();

                    special_menu_state = 0;
                    quest_speech_number = 0;

                    menu = quest_npc_dialogs[quest_dialog[2]];

                    if ((quest_dialog[0] + quest_dialog[1]) == 'questdialog') {
                        let checker = 0;

                        for (let sqlId in window.playerInventory) {
                            if (window.playerInventory[sqlId].index >= 15 && window.playerInventory[sqlId].index <= 56) {
                                checker += 1;
                            }
                        }

                        if (checker > 41) {
                            nError('Для взаимодействия необходимо иметь хотя бы один свободный слот в Вашем инвентаре.')
                            return;
                        }

                        let el = `
                            <div class="btns" onclick="action_npc.continueQuestDialog(${quest_dialog[2]})">
                                <div class="text">
                                    ${menu.items[0].ans}
                                </div>
                            </div>`
                        ;
                            
                        $("#action_npc_buttons").append(el);

                        $('#action_npc_text').text(menu.items[0].speech);
                    }
                    else if ((quest_dialog[0] + quest_dialog[1]) == 'specdialog') {
                        let el = `
                            <div class="btns" onclick="action_npc.continueSpecialQuestDialog(1, ${quest_dialog[2]})">
                                <div class="text">
                                    ${menu.spec_items[0].ans}
                                </div>
                            </div>`
                        ;
                        
                        $("#action_npc_buttons").append(el);

                        $('#action_npc_text').text(menu.spec_items[0].speech);
                    }
                    else if ((quest_dialog[0] + quest_dialog[1]) == 'spec2dialog') {
                        let el = `
                            <div class="btns" onclick="action_npc.continueSpecialQuestDialog(2, ${quest_dialog[2]})">
                                <div class="text">
                                    ${menu.spec2_items[0].ans}
                                </div>
                            </div>`
                        ;
                        
                        $("#action_npc_buttons").append(el);

                        $('#action_npc_text').text(menu.spec2_items[0].speech);
                    }
                    else if ((quest_dialog[0] + quest_dialog[1]) == 'spec3dialog') {
                        let el = `
                            <div class="btns" onclick="action_npc.continueSpecialQuestDialog(3, ${quest_dialog[2]})">
                                <div class="text">
                                    ${menu.spec3_items[0].ans}
                                </div>
                            </div>`
                        ;
                        
                        $("#action_npc_buttons").append(el);

                        $('#action_npc_text').text(menu.spec3_items[0].speech);
                    }
                    else if ((quest_dialog[0] + quest_dialog[1]) == 'negativequest') {
                        let el = `
                            <div class="btns" onclick="action_npc.forceHide();setCursor(false);">
                                <div class="text">
                                    ${menu.negative_items[0].ans}
                                </div>
                            </div>`
                        ;
                        
                        $("#action_npc_buttons").append(el);

                        $('#action_npc_text').text(menu.negative_items[0].speech);
                    }
                    else if ((quest_dialog[0] + quest_dialog[1]) == 'specnegative') {
                        let el = `
                            <div class="btns" onclick="action_npc.forceHide();setCursor(false);">
                                <div class="text">
                                    ${menu.spec_negative_items[0].ans}
                                </div>
                            </div>`
                        ;
                        
                        $("#action_npc_buttons").append(el);

                        $('#action_npc_text').text(menu.spec_negative_items[0].speech);
                    }

                    $('#action_npc_name').text(menu.npc_name);
                    $('#action_npc_desc').text(menu.npc_desc);

                    $('#action_npc').addClass('active');
                    $('#action_npc').fadeIn(150);

                    mp.trigger('setSelectMenuActive', true);
                        
                    setTimeout(() => {
                        setCursor(true);
                    }, 150);

                    $(document).unbind('keydown', action_npc.buttons);
                    $(document).keydown(action_npc.buttons);
                        
                    action_npc.activeMenu = true;
                }

                return;
            }

            $("#action_npc .btns").remove();
            special_menu_state = 0;

            if (values != null && values != 'null') menu.on(JSON.parse(values));
            else if (menu.on) menu.on();
            
            if (menuName == 'faction_clothes_menu') {
                if (spec_value == 1) {
                    menu.npc_name = "Кэлвин Мао";
                    menu.npc_desc = "Капитолий";
                }
                else if (spec_value == 2) {
                    menu.npc_name = "Челси Холт";
                    menu.npc_desc = "ЛСПД";
                }
                else if (spec_value == 3) {
                    menu.npc_name = "Мелисса Крюс";
                    menu.npc_desc = "Дорожная полиция";
                }
                else if (spec_value == 4) {
                    menu.npc_name = "Нил Мёрфи";
                    menu.npc_desc = "FIB";
                }
                else if (spec_value == 5) {
                    menu.npc_name = "Ричард Хилл";
                    menu.npc_desc = "Больница";
                }
                else if (spec_value == 6) {
                    menu.npc_name = "Юджин Деккер";
                    menu.npc_desc = "Больница №2";
                }
                else if (spec_value == 7) {
                    menu.npc_name = "Джон Мёрфи";
                    menu.npc_desc = "Army";
                }

                for (let i = 0; i < menu.items.length; i++) {
                    let el = `
                        <div class="btns" onclick="mp.trigger('faction_clothes_menu_client', '${menu.items[i].text}')">
                            <div class="text">
                                ${menu.items[i].text}
                            </div>
                        </div>`
                    ;
                    
                    $("#action_npc_buttons").append(el);
                }
            }
            else if (menuName == 'enter_parkings_menu') {
                special_menu_state = 1;

                let el = `
                    <div class="btns" onclick="mp.trigger('events.callRemote', 'parkings::rent_parking');">
                        <div class="text">
                            Арендовать место
                        </div>
                    </div>`
                ;
                    
                $("#action_npc_buttons").append(el);
            }
            else {
                for (let i = 0; i < menu.items.length; i++) {
                    let el = `
                        <div class="btns" onclick="mp.trigger('selectMenu.itemSelectedTalRasha', '${menuName}', '${menu.items[i].text}')">
                            <div class="text">
                                ${menu.items[i].text}
                            </div>
                        </div>`
                    ;
                    $("#action_npc_buttons").append(el);
                }
            }
            
            $('#action_npc_name').text(menu.npc_name);
            $('#action_npc_desc').text(menu.npc_desc);
            $('#action_npc_text').text(menu.npc_text);
            
            $('#action_npc').addClass('active');
            $('#action_npc').fadeIn(150);

			mp.trigger('setSelectMenuActive', true);
            
            setTimeout(() => {
                setCursor(true);
            }, 150);

            $(document).unbind('keydown', action_npc.buttons);
            $(document).keydown(action_npc.buttons);
            
            action_npc.activeMenu = true;
        },
        forceHide: () => {
            if ($('#action_npc').hasClass('active')) {
                $('#action_npc').fadeOut(100, function() {
                    action_npc.activeMenu = false;
                    $('#action_npc').removeClass('active');
                    $(document).unbind('keydown', action_npc.buttons);
                    mp.trigger('setSelectMenuActive', false);

                    if (special_menu_state == 1) {
                        mp.trigger('parkings::hideMenu');
                    }
                });
            }
        },
		active: () => {
            return $("#action_npc").css("display") != "none";
        },
        buttons: (e) => {
            if (window.action_npc.activeMenu == true) {
                if (e.keyCode == 27) { // Esc
                    setCursor(true);
                    $('#action_npc').fadeOut(250, function() {
                        action_npc.activeMenu = false;
                        $('#action_npc').removeClass('active');
                        $(document).unbind('keydown', action_npc.buttons);
                        mp.trigger('setSelectMenuActive', false);
                        setCursor(false);
                    });
                }
            }
        },
        continueQuestDialog: (npc) => {
            let menu = quest_npc_dialogs[npc];

            if (menu) {
                quest_speech_number += 1;

                if (quest_speech_number < menu.items.length) {
                    $("#action_npc .btns").remove();

                    $('#action_npc_text').text(menu.items[quest_speech_number].speech);

                    let el = `
                        <div class="btns" onclick="action_npc.continueQuestDialog(${npc})">
                            <div class="text">
                                ${menu.items[quest_speech_number].ans}
                            </div>
                        </div>`
                    ;

                    $("#action_npc_buttons").append(el);
                } else {
                    mp.trigger('events.callRemote', 'specialQuestsTakeItemFromNPC', npc);
                    action_npc.forceHide();
                    setCursor(false);
                }
            }
        },
        continueSpecialQuestDialog: (state, npc) => {
            let menu = quest_npc_dialogs[npc];

            if (menu) {
                quest_speech_number += 1;

                if (state == 1) {
                    if (quest_speech_number < menu.spec_items.length) {
                        $("#action_npc .btns").remove();

                        $('#action_npc_text').text(menu.spec_items[quest_speech_number].speech);

                        let el = `
                            <div class="btns" onclick="action_npc.continueSpecialQuestDialog(1, ${npc})">
                                <div class="text">
                                    ${menu.spec_items[quest_speech_number].ans}
                                </div>
                            </div>`
                        ;

                        $("#action_npc_buttons").append(el);
                    } else {
                        action_npc.forceHide();
                        setCursor(false);

                        if (npc == 2) {
                            quests_window.showSpecialContent(2);
                        } else {
                            mp.trigger('events.callRemote', 'specialQuestsTakeItemFromNPC', npc);
                        }
                    }
                }
                else if (state == 2) {
                    if (quest_speech_number < menu.spec2_items.length) {
                        $("#action_npc .btns").remove();

                        $('#action_npc_text').text(menu.spec2_items[quest_speech_number].speech);

                        let el = `
                            <div class="btns" onclick="action_npc.continueSpecialQuestDialog(2, ${npc})">
                                <div class="text">
                                    ${menu.spec2_items[quest_speech_number].ans}
                                </div>
                            </div>`
                        ;

                        $("#action_npc_buttons").append(el);
                    } else {
                        action_npc.forceHide();
                        setCursor(false);

                        mp.trigger('events.callRemote', 'specialQuestsTakeItemFromNPC', npc);
                    }
                }
                else if (state == 3) {
                    if (quest_speech_number < menu.spec3_items.length) {
                        $("#action_npc .btns").remove();

                        $('#action_npc_text').text(menu.spec3_items[quest_speech_number].speech);

                        let el = `
                            <div class="btns" onclick="action_npc.continueSpecialQuestDialog(3, ${npc})">
                                <div class="text">
                                    ${menu.spec3_items[quest_speech_number].ans}
                                </div>
                            </div>`
                        ;

                        $("#action_npc_buttons").append(el);
                    } else {
                        action_npc.forceHide();
                        setCursor(false);

                        mp.trigger('events.callRemote', 'specialQuestsTakeItemFromNPC', 6);
                    }
                }
            }
        }
    }

    function onEnterBizHandler(menuName, values) {
        if (!values) {
            return;
        }

        let isOwner = values.isOwner || false;
        let owner = values.owner || 0;
        let items = menus_info[menuName].items;

        if (items[items.length - 1] && items[items.length - 1].text == "Панель управления") items.splice(items.length - 1, 1);
        if (items[items.length - 1] && items[items.length - 1].text == "Купить бизнес") items.splice(items.length - 1, 1);

        if (isOwner) {
            items.push({
                text: "Панель управления"
            });
        } else {
            if (!owner) {
                items.push({
                    text: "Купить бизнес"
                });
            }
        }
    }

    const quest_npc_dialogs = {
        0: {
            npc_name: "Маджента",
			npc_desc: "Культистка из культа тьмы",
            items: [
                {
                    speech: 'Привет, друг мой! Пришел ли ты по зову сердца, или был призван Владыкой Тьмы? Это не важно, потому что мы знали, что ты придешь.',
                    ans: 'Кто Вы?'
                },
                {
                    speech: 'Я верная слуга Владыки Тьмы, можешь звать меня Маджентой. Впрочем, мое имя ничего не значит для тебя, ты ведь пришел не для того, чтобы со мной знакомиться.',
                    ans: 'Владыки Тьмы?'
                },
                {
                    speech: 'Владыка Тьмы - это самый могущественный из духов. Он живет в каждом из нас, и питается энергией тысячелетий. Он любит всех его слуг, и раз в году мы собираемся воедино, чтобы отплатить ему за эту любовь.',
                    ans: 'Кто эти… мы?'
                },
                {
                    speech: 'Мы верноподданные Владыки Тьмы, разумеется. Его любимые, и безмерно благодарные ему дети. И совсем скоро, после Великого Ритуала ты станешь одним из нас.',
                    ans: 'Ритуал?'
                },
                {
                    speech: 'У тебя так много вопросов, но Культ Тьмы ответит на все, нужно лишь дождаться нужного часа. У меня для тебя есть задание. Помоги нам подготовиться к Великому Ритуалу, и Владыка Тьмы дарует тебе свою любовь.',
                    ans: 'Получить'
                }
            ],
            spec2_items: [
                {
                    speech: 'Все слуги Культа носят специальные маски, которые символизируют твою связь с Культом. Великий Ритуал вот-вот начнется, а ты все еще не стал одним из нас.',
                    ans: 'Где ее взять?'
                },
                {
                    speech: 'Ты можешь получить маску, если Жрец Владыки Тьмы посчитает тебя достойным. Учти, что отвергнутые им не остаются в живых.',
                    ans: 'Где мне его найти?'
                },
                {
                    speech: 'Он ведет жизнь отшельника и обитает далеко в горах, живет в заброшенной шахте. Я помогу тебе найти его. Будь осторожен - быть может, это наша последняя встреча...',
                    ans: 'Спасибо'
                }
            ],
            spec3_items: [
                {
                    speech: 'Знала, что ты сможешь вернуться живым. Поздравляю тебя, брат мой. Отныне я могу заслуженно тебя так называть...',
                    ans: 'Спасибо'
                },
                {
                    speech: 'Пора нам отправляться, ведь все уже готово. Я прибуду чуть позже - у меня еще есть неоконченные дела. А ты уже можешь отправляться на место Ритуала. Слава Владыке Тьмы!',
                    ans: 'Слава Владыке Тьмы!'
                }
            ],
            negative_items: [
                {
                    speech: 'Владыка тьмы не любит незваных гостей. Да здравствует владыка тьмы!',
                    ans: 'Понятно'
                }
            ],
            spec_negative_items: [
                {
                    speech: 'Ты уже получил все что требуется, друг мой. Да здравствует владыка тьмы!',
                    ans: 'Понятно'
                }
            ]
        },
        1: {
            npc_name: "Френк",
			npc_desc: "Призрак",
            items: [
                {
                    speech: 'Что стоишь, никогда не видел призраков? Ошибаешься - они повсюду, просто живым не до этого. Вы всегда спешите, и заняты своими пустыми проблемами...',
                    ans: 'Понятно'
                },
                {
                    speech: 'Время проходит мимо нас. Оно мимолетно уходит с каждым твоим вздохом. Даже сейчас ты тратишь его впустую. Зачем ты пришел ко мне?',
                    ans: 'Я от Мадженты'
                },
                {
                    speech: 'Тогда ты должен знать, что любая помощь имеет свою цену. И мое бесценное время… Кстати, где мои часы? Ах да, раз ты пришел ко мне, сделай для меня кое-что...',
                    ans: 'Что сделать?'
                },
                {
                    speech: 'Здесь неподалеку должны быть мои часы. По правде сказать, они находятся под землей, но судя по твоему желанию потрепать языком, времени у тебя предостаточно...',
                    ans: 'Понятно'
                }
            ],
            spec_items: [
                {
                    speech: 'Как давно я их не видел. Ты даже не представляешь, сколько всего меня связывало с ними в земной жизни! Что же, я ценю твою помощь...',
                    ans: 'Это было не сложно'
                },
                {
                    speech: 'Взамен я помогу тебе. В штате ты можешь найти пророка, который предскажет тебе твою судьбу, и поможет с подготовкой к ритуалу. Держи, здесь все что тебе нужно знать. А теперь убирайся...',
                    ans: 'Взять записку'
                }
            ],
            negative_items: [
                {
                    speech: 'Тебя сюда не приглашали. Убирайся!',
                    ans: 'Понятно'
                }
            ],
            spec_negative_items: [
                {
                    speech: 'У меня времени много, не волнуйся...',
                    ans: 'Понятно'
                }
            ]
        },
        2: {
            npc_name: "Стефани",
			npc_desc: "Пророк",
            items: [
                {
                    speech: 'О, Владыка Тьмы! Ты избрал новую душу в свои ряды. Добрый вечер, путник. Мои карты меня не подводят. Я знала, что ты придешь ко мне задолго до твоего появления в этом штате.',
                    ans: 'Приветствую'
                },
                {
                    speech: 'Я могу рассказать, что ждет тебя в будущем. Вот только мои карты… Они потерялись. Мне очень нужны новые. Не беспокойся, я знаю где их достать...',
                    ans: 'Хорошо'
                }
            ],
            spec_items: [
                {
                    speech: 'Это именно те карты, что мне нужны. Интересно, как тебе удалось достать их так быстро?',
                    ans: 'Стараюсь'
                },
                {
                    speech: 'Ладно. Тогда я дам тебе обещанное предсказание. Вытащи любую понравившуюся тебе карту...',
                    ans: 'Хорошо'
                }
            ],
            spec2_items: [
                {
                    speech: 'Тебя ждет большое будущее. Ты добьешься всего, чего пожелаешь. Нужно только приложить немного усилий и запастись терпением.',
                    ans: 'Интересно'
                },
                {
                    speech: 'Великий ритуал начнется совсем скоро, Владыке Тьмы нужна твоя помощь. Для проведения ритуала кое-чего не хватает.',
                    ans: 'Как я помогу?'
                },
                {
                    speech: 'Нам нужно достать один сундук. Правда мы еще не знаем, где он спрятан. Он был закопан где-то возле Сэнди Шорс, но точное местоположение засекречено.',
                    ans: 'Интересно'
                },
                {
                    speech: 'О том, где находится сундук, знает только человек, спрятавший его 30 лет назад. Его уже нет в живых, но у него наверняка должна была остаться карта...',
                    ans: 'Понятно'
                }
            ],
            negative_items: [
                {
                    speech: 'Судьбу не обманешь...',
                    ans: 'Понятно'
                }
            ]
        },
        3: {
            npc_name: "Дрэйфус",
			npc_desc: "Жрец",
            items: [
                {
                    speech: 'Здравствуй, брат мой. Очень давно у меня не было новых душ. Что привело тебя сюда?',
                    ans: 'Хочу служить Культу'
                },
                {
                    speech: 'Твое стремление похвально. Ты уже знаком с нашими братьями и сестрами. Они достаточно много о тебе рассказывали. Я верю им и нахожу тебя достойным.',
                    ans: 'Большая честь'
                },
                {
                    speech: 'Докажи же и мне свою преданность. Чтобы даровать тебе маску, символизирующую служение Владыке Тьмы, тебе необходимо достать нужный компонент.',
                    ans: 'Что это?'
                },
                {
                    speech: 'Это специальные тыквы с нашей фермы. Они пропитаны темной энергией, придающей нам сил и защищающей нас от врагов. Иди же и принеси мне их. Не забудь перед этим достать вместительную сумку.',
                    ans: 'Хорошо'
                }
            ],
            spec_items: [
                {
                    speech: 'Я и не ожидал, что ты справишься так быстро. Видимо, ты и правда заслуживаешь моего доверия. Я принимаю тебя, брат мой. Отныне ты - член нашего Культа.',
                    ans: 'Отлично'
                },
                {
                    speech: 'Пока я буду делать тебе маску, у меня для тебя есть небольшое задание. Видишь этот мешок справа от меня? Ох и надоел он мне. Помоги мне от него избавиться.',
                    ans: 'Как избавиться?'
                },
                {
                    speech: 'Как прекрасно, что ты не задаешь вопросов о его содержимом. Иначе пришлось бы тебя убить, а мне бы этого не хотелось.',
                    ans: 'Куда деть мешок?'
                },
                {
                    speech: 'Ах да. На выходе из шахты увидишь костер. Недавно здесь были туристы, и забыли его потушить. Помести мешок туда, пусть он послужит Владыке Тьмы.',
                    ans: 'Понятно'
                }
            ],
            spec2_items: [
                {
                    speech: 'Ты, как раз, вовремя. Твоя маска уже готова. Теперь ты можешь с гордостью считать себя полноправным членом Культа. Слава Владыке Тьмы!',
                    ans: 'Взять маску'
                },
                {
                    speech: 'До Великого Ритуала осталось совсем немного времени. Тебе нужно как следует подготовиться. Отправляйся к Мадженте, у нее есть для тебя задание.',
                    ans: 'Понятно'
                }
            ],
            negative_items: [
                {
                    speech: 'Мне не о чем с тобой разговаривать.',
                    ans: 'Понятно'
                }
            ]
        },
        4: {
            npc_name: "Дрэйфус",
			npc_desc: "Жрец",
            items: [
                {
                    speech: 'Рад приветствовать тебя снова. Все уже в сборе, и готовы к началу. Готов ли ты?',
                    ans: 'Да!'
                },
                {
                    speech: 'Скорее занимай свое место. Да начнется Великий Ритуал! Да здравствует Владыка Тьмы!',
                    ans: 'Понятно'
                }
            ],
            negative_items: [
                {
                    speech: 'Мне не о чем с тобой разговаривать.',
                    ans: 'Понятно'
                }
            ]
        }
    };
});