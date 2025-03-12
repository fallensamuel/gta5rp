'use strict';
import React from 'react';
import { connect } from 'react-redux';

import '../../assets/css/inventory.css';

class PlayerInventory extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            draggingItemEl: null,
            freeColumnEl: null,
            mergeItemSqlId: null
        };
    }

    
    componentDidMount() {
        var { draggingItemEl, freeColumnEl, mergeItemSqlId } = this.state;

        var mainContainer = document.querySelector('#inventory .main'); // контейнер с дефолтными ячейками

        window.clientStorage.inventoryWeight = 0;
        window.clientStorage.inventoryMaxWeight = 30;
    
        window.playerInventory = {};

        var mainItemIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

        var blackList = {
            0: [3, 7, 8, 9, 13],
            1: [3, 7, 8, 9, 13],
            2: [13]
        };

        var itemMenus = {
            1: [],
            2: [],
            3: [],
            4: [{
                text: "Разделить",
                handler: (sqlId) => {
                    inventoryAPI.show(false);
                    modalAPI.show("item_split", JSON.stringify({
                        itemSqlId: sqlId
                    }));
                }
            }],
            5: [],
            6: [],
            7: [],
            8: [],
            9: [],
            10: [],
            11: [],
            12: [],
            13: [],
            14: [],
            15: [],
            16: [{
                text: "Посмотреть",
                handler: (sqlId) => {
                    mp.trigger("events.callRemote", "showDocuments", sqlId);
                }
            }],
            17: [],
            18: [],
            19: [],
            20: [],
            21: [],
            22: [],
            23: [],
            24: [],
            25: [{
                text: "Использовать",
                handler: (sqlId) => {
                    mp.trigger("events.callRemote", "item.useHealth", sqlId);
                }
            }],
            26: [],
            27: [],
            28: [],
            29: [{
                text: "Посмотреть",
                handler: (sqlId) => {
                    mp.trigger("events.callRemote", "documents.showFaction", -1);
                }
            }],
            30: [{
                text: "Выпить",
                handler: (sqlId) => {
                    mp.trigger("events.callRemote", "item.eat", sqlId);
                }
            }],
            31: [{
                text: "Съесть",
                handler: (sqlId) => {
                    mp.trigger("events.callRemote", "item.eat", sqlId);
                }
            }],
            32: [{
                text: "Съесть",
                handler: (sqlId) => {
                    mp.trigger("events.callRemote", "item.eat", sqlId);
                }
            }],
            33: [{
                text: "Пососать",
                handler: (sqlId) => {
                    mp.trigger("events.callRemote", "item.eat", sqlId);
                }
            }],
            34: [{
                text: "Достать",
                handler: (sqlId) => {
                    mp.trigger("events.callRemote", "item.takeSmoke", sqlId);
                }
            }],
            35: [{
                text: "Выпить",
                handler: (sqlId) => {
                    mp.trigger("events.callRemote", "item.eat", sqlId);
                }
            }],
            36: [],
            37: [{
                text: "Разделить",
                handler: (sqlId) => {
                    inventoryAPI.show(false);
                    modalAPI.show("item_split", JSON.stringify({
                        itemSqlId: sqlId
                    }));
                }
            }],
            38: [{
                text: "Разделить",
                handler: (sqlId) => {
                    inventoryAPI.show(false);
                    modalAPI.show("item_split", JSON.stringify({
                        itemSqlId: sqlId
                    }));
                }
            }],
            39: [{
                text: "Разделить",
                handler: (sqlId) => {
                    inventoryAPI.show(false);
                    modalAPI.show("item_split", JSON.stringify({
                        itemSqlId: sqlId
                    }));
                }
            }],
            40: [{
                text: "Разделить",
                handler: (sqlId) => {
                    inventoryAPI.show(false);
                    modalAPI.show("item_split", JSON.stringify({
                        itemSqlId: sqlId
                    }));
                }
            }],
            41: [],
            42: [],
            43: [],
            44: [],
            45: [],
            46: [],
            47: [],
            48: [],
            49: [],
            50: [],
            51: [],
            52: [],
            53: [],
            54: [{
                    text: "Парковка",
                    handler: (sqlId) => {
                        mp.trigger("events.callRemote", "item.parkCarByKeys", sqlId);
                    }
                },
                {
                    text: "Двери",
                    handler: (sqlId) => {
                        mp.trigger("events.callRemote", "item.lockCarByKeys", sqlId);
                    }
                },
                {
                    text: "Поиск",
                    handler: (sqlId) => {
                        mp.trigger("events.callRemote", "item.searchCarByKeys", sqlId);
                    }
                },
                {
                    text: "Доставить",
                    handler: (sqlId) => {
                        var item = inventoryAPI.getItem(sqlId);
                        if (!item) return nError(`Ключи не найдены!`);
                        var model = item.params.model;
                        if (window.clientStorage.sqlId != item.params.owner) return nError(`Вы не владелец ${model}!`);
                        inventoryAPI.show(false);
                        mp.trigger("choiceMenu.show", "accept_fix_car", sqlId);
                    }
                },
                {
                    text: "Продать",
                    handler: (sqlId) => {
                        var item = inventoryAPI.getItem(sqlId);
                        if (!item) return nError(`Ключи не найдены!`);
                        var model = item.params.model;
                        if (window.clientStorage.sqlId != item.params.owner) return nError(`Вы не владелец ${model}!`);
                        inventoryAPI.show(false);
                        modalAPI.show("sell_player_car", JSON.stringify({sqlId: sqlId}));
                    }
                }
            ],
            55: [{
                    text: "Употребить",
                    handler: (sqlId) => {
                        mp.trigger("events.callRemote", "item.useDrugs", sqlId);
                    }
                },
                {
                    text: "Разделить",
                    handler: (sqlId) => {
                        inventoryAPI.show(false);
                        modalAPI.show("item_split", JSON.stringify({
                            itemSqlId: sqlId
                        }));
                    }
                }
            ],
            56: [{
                    text: "Употребить",
                    handler: (sqlId) => {
                        mp.trigger("events.callRemote", "item.useDrugs", sqlId);
                    }
                },
                {
                    text: "Разделить",
                    handler: (sqlId) => {
                        inventoryAPI.show(false);
                        modalAPI.show("item_split", JSON.stringify({
                            itemSqlId: sqlId
                        }));
                    }
                }
            ],
            57: [{
                    text: "Употребить",
                    handler: (sqlId) => {
                        mp.trigger("events.callRemote", "item.useDrugs", sqlId);
                    }
                },
                {
                    text: "Разделить",
                    handler: (sqlId) => {
                        inventoryAPI.show(false);
                        modalAPI.show("item_split", JSON.stringify({
                            itemSqlId: sqlId
                        }));
                    }
                }
            ],
            58: [{
                    text: "Употребить",
                    handler: (sqlId) => {
                        mp.trigger("events.callRemote", "item.useDrugs", sqlId);
                    }
                },
                {
                    text: "Разделить",
                    handler: (sqlId) => {
                        inventoryAPI.show(false);
                        modalAPI.show("item_split", JSON.stringify({
                            itemSqlId: sqlId
                        }));
                    }
                }
            ],
            59: [{
                text: "Поиск",
                handler: (sqlId) => {
                    mp.trigger("events.callRemote", "item.searchHouseByKeys", sqlId);
                }
            }],
            60: [{
                text: "Посмотреть",
                handler: (sqlId) => {
                    mp.trigger("events.callRemote", "documents.showFaction", -1);
                }
            }],
            61: [{
                text: "Посмотреть",
                handler: (sqlId) => {
                    mp.trigger("events.callRemote", "documents.showFaction", -1);
                }
            }],
            62: [{
                text: "Курить",
                handler: (sqlId) => {
                    mp.trigger("events.callRemote", "item.useSmoke", sqlId);
                }
            }],
            63: [{
                text: "Посмотреть",
                handler: (sqlId) => {
                    mp.trigger("events.callRemote", "documents.showFaction", -1);
                }
            }],
            64: [{
                text: "Посмотреть",
                handler: (sqlId) => {
                    mp.trigger("events.callRemote", "documents.showFaction", -1);
                }
            }],
            65: [],
            66: [],
            67: [],
            68: [],
            69: [],
            70: [],
            71: [],
            72: [],
            73: [],
            74: [],
            75: [],
            76: [],
            77: [],
            78: [],
            79: [],
            80: [],
            81: [],
            82: [],
            83: [],
            84: [],
            85: [],
            86: [],
            87: [],
            88: [],
            89: [],
            90: [],
            91: [],
            92: [],
            93: [],
            94: [],
            95: [],
            96: [],
            97: [],
            98: [],
            99: [],
            100: [],
            101: [],
            102: [],
            103: [],
            104: [],
            105: [],
            106: [],
            107: [],
            108: [],
            109: [],
            110: [],
            111: [],
            112: [],
            113: [],
            114: [],
            115: [],
            116: [],
            117: [],
            118: [],
            119: [],
            120: [],
            121: [],
            122: [],
            123: [],
            124: [],
            125: [],
            126: [],
        };

        window.inventoryAPI = {
            initHandlers: () => {
                document.onmouseup = function(e) {
                    inventoryAPI.mouseupHandler(e);
                };
                document.querySelector('#inventory .main .column').onmouseenter = function(e) {
                    if (draggingItemEl) {
                        var item = inventoryAPI.getItem(draggingItemEl.dataset.sqlId);
                        if (!item) item = inventoryAPI.getVehItem(draggingItemEl.dataset.sqlId);
                        if (mainItemIds[document.querySelector(e.target).dataset.index] != item.itemId) return; // ячейка для другого типа предмета
                        if (!document.querySelector(e.target).matches(":empty") && document.querySelector(e.target).find(".item").dataset.sqlId != draggingItemEl.dataset.sqlId) return; // уже имеется другой предмет
                        if (item.params.sex != null && item.params.sex != window.clientStorage.sex) return nError(`Пол персонажа не совпадает с типом одежды!`);
                        hoverColumn(draggingItemEl, freeColumnEl, "#222");
                        freeColumnEl = document.querySelector(e.target);
                    }
                };
                document.querySelector('#inventory .main .column').onmouseleave = function(e) {
                    if (draggingItemEl) {
                        if (!document.querySelector(e.target).matches(":empty")) return;
                    }
                };
                document.onkeydown = function(e) {
                    if (draggingItemEl) inventoryAPI.mouseupHandler();
                };
            },
            /* Добавление предмета в основной инвентарь. */
            add: (sqlId, item) => {
                // debug(`inv.add: ${sqlId} ${item}`);
                sqlId = parseInt(sqlId);
                item = JSON.parse(item);
                var itemEl = createItemEl(sqlId, item);
                if (isDefaultColumn(item)) {
                    var column = mainContainer.find(`.column[data-index='${item.index}']`);
                    column.removeChild();
                    column.append(itemEl);
                    column.style.setProperty("border-color", "#9fa0a1");
    
                    if (isContainerItem(item)) {
                        var containerEl = initContainerEl(sqlId, item);
                        var itemsEl = containerEl.find(".items");
                        for (var key in item.items) {
                            fillColumn(key, item.items[key], itemsEl);
                        }
                        slideDown(containerEl, () => {
                            containerEl.find(".items").style.setProperty("display", "none");
                            containerEl.find(".items").style.setProperty("display", "block");
                        });
                    }
                    playerInventory[sqlId] = item;
                } else {
                    var ids = [7, 8, 13];
                    var parentItem = inventoryAPI.getItem(item.parentId);
                    parentItem.items[sqlId] = item;
                    var index = ids.indexOf(parentItem.itemId);
                    var itemsEl = document.querySelector(`#inventory .right-block .container:eq(${index}) .items`);
                    fillColumn(sqlId, item, itemsEl);
                }
                window.clientStorage.inventoryWeight = inventoryAPI.getCommonWeight();
                document.querySelector("#inventory .weight").textContent = window.clientStorage.inventoryWeight.toFixed(1);
            },
            /* Поиск предмета по его sqlId. */
            getItem: (sqlId) => {
                return findItemBySqlId(sqlId, playerInventory);
            },
            getArrayByItemId: (itemIds) => {
                if (typeof itemIds == 'string') itemIds = JSON.parse(itemIds);
                if (!Array.isArray(itemIds)) itemIds = [itemIds]; //если одно число
                return findArrayItemByItemId(itemIds, playerInventory);
            },
            /* Обновление параметра предмета. */
            updateParams: (sqlId, params) => {
                params = JSON.parse(params);
                var item = inventoryAPI.getItem(sqlId);
                item.params = params;
            },
            updateSqlId: (sqlId, newSqlId) => {
                // debug(`inventoryAPI.updateSqlId: ${sqlId} ${newSqlId}`)
                var itemEl = document.querySelector(`#inventory .item[data-sqlId='${sqlId}']`);
                itemEl.style.setProperty("data-sqlId", newSqlId);
                itemEl.dataset.sqlId = newSqlId;
                columnsEl.style.setProperty("background", "");
                // debug(`len: ${itemEl.length}`)
            },
            /* Получить вес предмета. */
            getWeight: (sqlId) => {
                return getWeightItemBySqlId(sqlId, playerInventory);
            },
            /* Получить общий вес предметов. */
            getCommonWeight: () => {
                var weight = 0;
                for (var sqlId in playerInventory) {
                    weight += inventoryAPI.getWeight(sqlId);
                }
                return weight;
            },
            /* Удаление предмета. */
            delete: (sqlId) => {
                var item = inventoryAPI.getItem(sqlId);
    
                //debug(`item: ${item}`);
    
                if (item.parentId == -1 || !item.parentId) {
                    delete playerInventory[sqlId];
                } else {
                    var parentItem = inventoryAPI.getItem(item.parentId);
                    delete parentItem.items[sqlId];
                }
                var itemEl = document.querySelector(`#inventory .item[data-sqlId='${sqlId}']`);
                var columnsEl = itemEl.closest(".items").find(".column");
                resetColumnSize(itemEl.find(".column"));
                //itemEl.parentElement.find(".column").style.setProperty("border-color", "");
                itemEl.find(".column").classList.remove("filled");
                document.querySelector(`#inventory .item[data-sqlId="${sqlId}"]`).remove();
    
                if (!item.parentId || item.parentId == -1) {
                    var ids = [7, 8, 13];
                    var index = ids.indexOf(item.itemId);
                    if (index != -1) {
                        this.slideUp(document.querySelector("#inventory .right-block .container")[index], () => {
                            document.querySelector("#inventory .right-block .container .items").style.setProperty("display", "none");
                            document.querySelector("#inventory .right-block .container .items").style.setProperty("display", "block");
                        });
                    }
                } else {
                    columnsEl.style.setProperty("background", "");
                }
    
                window.clientStorage.inventoryWeight = inventoryAPI.getCommonWeight();
                document.querySelector("#inventory .weight").textContent = window.clientStorage.inventoryWeight.toFixed(1);
            },
            setMoney: (value) => {
                value = parseInt(value);
                document.querySelector('#inventory #feet-items .money').textContent = value + "$";
            },
            setBankMoney: (value) => {
                value = parseInt(value);
                document.querySelector('#inventory #feet-items .bank').textContent = value + "$";
            },
            setHealth: (value) => {
                value = parseInt(value);
                document.querySelector('#inventory #feet-items .health').style.setProperty("background", `linear-gradient(to right, #0fa04b ${value}%, #1a5932 ${value}%)`);
            },
            setSatiety: (value) => {
                value = parseInt(value);
                document.querySelector('#inventory #feet-items .satiety').style.setProperty("background", `linear-gradient(to right, #a67d10 ${value}%, #493d20 ${value}%)`);
            },
            setThirst: (value) => {
                value = parseInt(value);
                document.querySelector('#inventory #feet-items .thirst').style.setProperty("background", `linear-gradient(to right, #1070a0 ${value}%, #1b475c ${value}%)`);
            },
            setArmour: (value) => {
                for (var sqlId in playerInventory) {
                    var item = playerInventory[sqlId];
                    if (item.itemId == 3) item.params.armour = value;
                }
            },
            /* Показать/скрыть инвентарь. */
            show: (enable) => {
                if (enable) {
                    if (window.bindlocker()) return;
                    if (mp) mp.trigger(`toBlur`, 200);
                    document.querySelector(`#inventory .playerName`).textContent = window.clientStorage.name || "Гражданин";
                    fadeIn(document.querySelector(`#inventory`), () => {
                        var indexes = [6, 7, 12];
                        indexes.forEach((index) => {
                            var columnEl = document.querySelector(`#inventory .main .column[data-index='${index}']`);
                            if (!columnEl.matches(":empty")) {
                                var containerEl = document.querySelector("#inventory .right-block .container");
                                slideDown(containerEl[indexes.indexOf(index)], () => {
                                    containerEl.find(".items").style.setProperty("display", "none");
                                    containerEl.find(".items").style.setProperty("display", "block");
                                });
                            }
                        });
                        if (window.clientStorage.bootVehicleId != -1) {
                            var containerEl = document.querySelector("#inventory .left-block .container");
                            slideDown(containerEl[0], () => {
                                containerEl.find(".items").style.setProperty("display", "none");
                                containerEl.find(".items").style.setProperty("display", "block");
                            });
                        }
                    });
                } else {
                    if (consoleAPI.active()) return;
                    mp.trigger(`fromBlur`, 200);
                    slideUp(document.querySelector(`#inventory .container`), () => {
                        fadeOut(document.querySelector(`#inventory`));
                    });
                }

                fixColumnClassFilled();

                document.querySelector("#inventory .inventory_menu").style.setProperty("display", "none");
                document.querySelector("#inventory .item_name").style.setProperty("display", "block");
    
                if (mp) {
                    setCursor(enable);
                    mp.trigger('setBlockControl', enable);
                    mp.trigger("setInventoryActive", enable);
                }
            },
            active: () => {
                return document.querySelector("#inventory").style.display != "none";
            },
            enable: (enable) => {
                if (enable) {
                    document.removeEventListener('keydown', inventoryAPI.showHandler, false);
                    document.addEventListener('keydown', inventoryAPI.showHandler, true);
                } else {
                    inventoryAPI.show(false);
                    document.removeEventListener('keydown', inventoryAPI.showHandler, false);
                }
            },
            showHandler: (e) => {
                if (e.keyCode == 73) { // I
                    inventoryAPI.show(!inventoryAPI.active());
                }
            },
            showItemMenu: (sqlId, left, top) => {
                var item = inventoryAPI.getItem(sqlId);
                if (!item) return;
                var menu = itemMenus[item.itemId];
                var itemMenuEl = document.querySelector(`#inventory .inventory_menu`);
                removeOptions(document.querySelector(`#inventory .inventory_menu`));
                if (!menu) return; //itemMenuEl.append(`<div className="menu-item">Todo</div>`);
                else {
                    menu.forEach((menuItem) => {
                        if (document.querySelector(`#inventory .inventory_menu .menu-item`).textContent == `${menuItem.text}`) var menuItemEl = document;
                        menuItemEl.click((e) => {
                            menuItem.handler(sqlId);
                        });
                        itemMenuEl.append(menuItemEl);
                    });
                }
    
                itemMenuEl.style.setProperty("left", left);
                itemMenuEl.style.setProperty("top", top);
                slideDown(itemMenuEl);
            },
            mouseupHandler: (e) => {
                //debug(`mouseupHandler`);
                document.querySelector(`#inventory .inventory_menu`).style.setProperty("display", "none");
                document.querySelector(`#console .report_menu`).style.setProperty("display", "none");
                if (draggingItemEl) {
                    var itemsEl = freeColumnEl.closest(".items");
                    var rows = itemsEl.dataset.rows;
                    var cols = itemsEl.dataset.cols;
    
                    var item = inventoryAPI.getItem(itemsEl.dataset.sqlId);
                    /* Перетащили на основной инвентарь. */
                    if (!itemsEl.dataset.sqlId && !itemsEl.dataset.type) {
                        // alert("move to main items!")
                        if (e && mainItemIds[document.querySelector(e.target).dataset.index] == item.itemId) freeColumnEl = document.querySelector(e.target);
                        freeColumnEl.style.setProperty("border-color", "#9fa0a1");
                        //freeColumnEl.style.setProperty("background", "");
                        if (!item.inVehicle) freeColumnEl.append(draggingItemEl);
                        var size = 4;
                        if (freeColumnEl.body.classList.contains('center')) size = 7;
                        draggingItemEl.style.setProperty("height", size + "vh");
                        draggingItemEl.style.setProperty("width", size + "vh");
    
                        draggingItemEl.style.setProperty("pointer-events", "");
                        draggingItemEl.style.setProperty("position", "static");
                        document.removeEventListener("mousemove", inventoryAPI.mouseupHandler);
    
                        var parentItem = inventoryAPI.getItem(item.parentId);
                        if (parentItem) delete parentItem.items[draggingItemEl.dataset.sqlId];
                        delete item.parentId;
                        item.index = freeColumnEl.dataset.index;
                        playerInventory[draggingItemEl.dataset.sqlId] = item;
    
                        if (isContainerItem(item)) {
                            var containerEl = initContainerEl(draggingItemEl.dataset.sqlId, item);
                            var itemsEl = containerEl.find(".items");
                            for (var key in item.items) {
                                fillColumn(key, item.items[key], itemsEl);
                            }
                            slideDown(containerEl, () => {
                                containerEl.find(".items").style.setProperty("display", "none");
                                containerEl.find(".items").style.setProperty("display", "block");
                            });
                        }
    
                        var sqlId = draggingItemEl.dataset.sqlId;

                        this.setState({ draggingItemEl: null });
                        this.setState({ freeColumnEl: null });
    
                        if (mp) {
                            mp.trigger("events.callRemote", "item.updatePos", JSON.stringify([sqlId, -1, item.index, item.inVehicle]));
                        }
                        return;
                    }
                    var oldItemsEl = draggingItemEl.closest(".items");
                    /* Перетащили из основного инвентаря. */
                    if (!oldItemsEl.dataset.sqlId && !itemsEl.dataset.type) {
                        //alert("move from main items!")
                        //draggingItemEl.parentElement.find(".column").style.setProperty("border-color", "#5c5c5d");
                        var item = inventoryAPI.getItem(draggingItemEl.dataset.sqlId);
                        var info = clientStorage.inventoryItems[item.itemId - 1];
                        var size = Math.min(info.height, info.width) * 3;
                        draggingItemEl.style.setProperty("height", size + "vh");
                        draggingItemEl.style.setProperty("width", size + "vh");
    
                        /* Перенесли в багажник атво. */
                        item.parentId = parseInt(itemsEl.dataset.sqlId);
                        var parentItem = inventoryAPI.getItem(item.parentId);
                        if (parentItem) parentItem.items[draggingItemEl.dataset.sqlId] = item;
                        delete playerInventory[draggingItemEl.dataset.sqlId];
    
                        var ids = [7, 8, 13];
                        var index = ids.indexOf(item.itemId);
                        if (index != -1) {
                            slideUp(document.querySelector("#inventory .right-block .container")[index], () => {
                                document.querySelector("#inventory .right-block .container .items").style.setProperty("display", "none");
                                document.querySelector("#inventory .right-block .container .items").style.setProperty("display", "block");
                            });
                        }
                    }
    
    
                    var h = draggingItemEl.dataset.height;
                    var w = draggingItemEl.dataset.width;
    
                    var columnsEl = freeColumnEl.hasAttribute(".column");
                    var itemColumnsEl = [];
                    for (var i = 0; i < h; i++) {
                        for (var j = 0; j < w; j++) {
                            itemColumnsEl.push(columnsEl[freeColumnEl[freeColumnEl.indexOf() + j + i * cols]]);
                        }
                    }
    
                    freeColumnEl.style.setProperty("background", "");
                    freeColumnEl.classList.add("filled");
                    freeColumnEl.append(draggingItemEl);
    
                    var coord = indexToXY(rows, cols, freeColumnEl.index());
                    freeColumnEl.style.setProperty("grid-column-start", coord.x + 1);
                    freeColumnEl.style.setProperty("grid-column-end", `span ${w}`);
                    freeColumnEl.style.setProperty("grid-row-start", coord.y + 1);
                    freeColumnEl.style.setProperty("grid-row-end", `span ${h}`);
                    for (var i = 1; i < itemColumnsEl.length; i++) {
                        itemColumnsEl[i].style.setProperty("display", "none");
                    }
    
                    draggingItemEl.style.setProperty("pointer-events", "");
                    draggingItemEl.style.setProperty("position", "static");
                    document.removeEventListener("mousemove", inventoryAPI.mouseupHandler);
    
                    // alert(JSON.stringify(item))
                    item.index = freeColumnEl.index();
                    if (item.parentId > 0 && item.parentId != itemsEl.dataset.sqlId) {
                        var oldParentItem = inventoryAPI.getItem(item.parentId);
                        if (oldParentItem) delete oldParentItem.items[draggingItemEl.dataset.sqlId];
                        if (itemsEl.dataset.type == "boot") {
                            // alert("move from one to boot container");
                        } else {
                            // alert("move from one to two container")
                            var newParentItem = inventoryAPI.getItem(itemsEl.dataset.sqlId);
                            newParentItem.items[draggingItemEl.dataset.sqlId] = item;
                            item.parentId = parseInt(itemsEl.dataset.sqlId);
                        }
                    }
                    var index = mainItemIds.indexOf(item.itemId);
                    if (index != -1) {
                        var columnEl = document.querySelector(`#inventory .main .column[data-index="${index}"]`);
                        if (columnEl.matches(":empty")) columnEl.style.setProperty("border-color", "#5c5c5d");
                        else columnEl.style.setProperty("border-color", "#9fa0a1");
                    }
    
                    // alert(`qq`)
    
                    var sqlId = draggingItemEl.dataset.sqlId;
                    if (mergeItemSqlId && draggingItemEl.dataset.sqlId == mergeItemSqlId) {
                        if (canMergeItems(draggingItemEl.dataset.sqlId, mergeItemSqlId)) {
                            mp.trigger(`events.callRemote`, `items.merge`, JSON.stringify([draggingItemEl.dataset.sqlId, mergeItemSqlId]));
                            doItemsMerge(draggingItemEl.dataset.sqlId, mergeItemSqlId);
                        }
                    } else {
                        //debug(`ITEM2: ${JSON.stringify(item)}`);
                        mp.trigger("events.callRemote", "item.updatePos", JSON.stringify([sqlId, item.parentId, item.index, item.inVehicle]));
                    }

                    this.setState({ draggingItemEl: null });
                    this.setState({ freeColumnEl: null });
                }
            },
        };

        inventoryAPI.initHandlers(); //for test
        //inventoryAPI.enable(true); //for test
    
        var weaponAmmo = {
            "20": 37, //9mm
            "21": 38, //12mm
            "22": 40, //5.56mm
            "23": 39, //7.62mm
            "44": 37,
            "45": 37,
            "46": 37,
            "47": 37,
            "48": 37,
            "49": 38,
            "50": 39,
            "51": 40,
            "52": 39,
            "53": 39,
        };
        var drugsIds = [55, 56, 57, 58];
    
        function canMergeItems(itemSqlId, targetItemSqlId) {
            var item = inventoryAPI.getItem(itemSqlId);
            var targetItem = inventoryAPI.getItem(targetItemSqlId);
            if (!item || !targetItem) {
                var item = inventoryAPI.getVehItem(itemSqlId);
                var targetItem = inventoryAPI.getVehItem(targetItemSqlId);
                if (item || targetItem) return false;
                nError(`Client: Один из предметов для слияния не найден!`);
                return false;
            }
            var can = (item.itemId == 4 && targetItem.itemId == 4) //деньги
                ||
                (item.params.ammo && !item.params.weaponHash && targetItem.params.ammo && !targetItem.params.weaponHash && item.itemId == targetItem.itemId) //патроны
                ||
                (item.params.ammo != null && !item.params.weaponHash && targetItem.params.weaponHash &&
                    item.itemId == weaponAmmo[targetItem.itemId]) //патроны на пушку
                ||
                (item.itemId == targetItem.itemId && drugsIds.indexOf(item.itemId) != -1) // нарко на нарко
                ||
                (item.itemId == 62 && targetItem.itemId == 34 && targetItem.params.count < 20); // сигарета на пачку
            return can;
        }
    
        function doItemsMerge(itemSqlId, targetItemSqlId) {
            var item = inventoryAPI.getItem(itemSqlId);
            var targetItem = inventoryAPI.getItem(targetItemSqlId);
            if (!item || !targetItem) {
                nError(`Client: Один из предметов для слияния не найден!`);
                return false;
            }
            if (item.itemId == 4 && targetItem.itemId == 4) {
                inventoryAPI.delete(itemSqlId);
                return true;
            }
            if (item.params.ammo && targetItem.params.ammo && item.itemId == targetItem.itemId) {
                inventoryAPI.delete(itemSqlId);
                return true;
            } else if (item.params.ammo != null && !item.params.weaponHash && targetItem.params.weaponHash &&
                item.itemId == weaponAmmo[targetItem.itemId]) {
                inventoryAPI.delete(itemSqlId);
                return true;
            } else if (item.itemId == targetItem.itemId && drugsIds.indexOf(item.itemId) != -1) {
                inventoryAPI.delete(itemSqlId);
                return true;
            } else if (item.itemId == 62 && targetItem.itemId == 34) {
                if (targetItem.params.count >= 20) {
                    nError(`Пачка полная!`);
                    return false;
                }
                inventoryAPI.delete(itemSqlId);
                return true;
            }
    
            return false;
        }
    
        function getWeightItemBySqlId(sqlId, items, weight = 0) {
            if (items[sqlId]) {
                weight += window.clientStorage.inventoryItems[items[sqlId].itemId - 1].weight;
                if (items[sqlId].items) {
                    for (var key in items[sqlId].items) {
                        weight += getWeightItemBySqlId(key, items[sqlId].items, 0);
                    }
                }
            } else {
                for (var key in items) {
                    if (items[key].items) {
                        weight = getWeightItemBySqlId(sqlId, items[key].items, weight);
                    }
                }
            }
            return weight;
        }
    
        function findItemBySqlId(sqlId, items) {
            if (items[sqlId]) return items[sqlId];
            for (var key in items) {
                if (items[key].items) {
                    var item = findItemsBySqlId(sqlId, items[key].items);
                    if (item) return item;
                }
            }
            return null;
        }
    
        function findItemsBySqlId(sqlId, items) {
            if (items[sqlId]) return items[sqlId];
        }
    
        function findArrayItemByItemId(itemIds, items) {
            var array = {};
            for (var key in items) {
                if (itemIds.includes(items[key].itemId)) {
                    array[key] = items[key];
                }
                if (items[key].items) {
                    Object.extend(array, findArrayItemByItemId(itemIds, items[key].items));
                }
            }
            return array;
        }
    
        var invItemNames = {
            3: (item) => { //armour
                var info = window.clientStorage.inventoryItems[item.itemId - 1];
                var name = info.name;
                if (item.params.faction) name += " " + getNameByFactionId(item.params.faction);
                return `${name} [${item.params.armour}%]`;
            },
            4: (item) => { //money
                var info = window.clientStorage.inventoryItems[item.itemId - 1];
                return `${info.name} ${item.params.count}$`;
            },
            5: (item) => { //VISA
                var info = window.clientStorage.inventoryItems[item.itemId - 1];
                return `${info.name} ${item.params.count}$`;
            },
            6: (item) => { //hat
                var info = window.clientStorage.inventoryItems[item.itemId - 1];
                if (item.params.faction) return `${info.name} ${getNameByFactionId(item.params.faction)}`;
                return info.name;
            },
            7: (item) => { //top
                var info = window.clientStorage.inventoryItems[item.itemId - 1];
                if (item.params.faction) return `${info.name} ${getNameByFactionId(item.params.faction)}`;
                return info.name;
            },
            8: (item) => { //legs
                var info = window.clientStorage.inventoryItems[item.itemId - 1];
                if (item.params.faction) return `${info.name} ${getNameByFactionId(item.params.faction)}`;
                return info.name;
            },
            9: (item) => { //feets
                var info = window.clientStorage.inventoryItems[item.itemId - 1];
                if (item.params.faction) return `${info.name} ${getNameByFactionId(item.params.faction)}`;
                return info.name;
            },
            24: (item) => { //аптечка
                var info = window.clientStorage.inventoryItems[item.itemId - 1];
                return `${info.name} [${item.params.count} ед.]`;
            },
            25: (item) => { //бинт
                var info = window.clientStorage.inventoryItems[item.itemId - 1];
                return `${info.name} [${item.params.count} ед.]`;
            },
            29: (item) => { //удостоверение PD
                var info = window.clientStorage.inventoryItems[item.itemId - 1];
                return `${info.name} №${item.params.owner}`;
            },
            34: (item) => { //пачка сигарет
                var info = window.clientStorage.inventoryItems[item.itemId - 1];
                return `${info.name} [${item.params.count} шт.]`;
            },
            36: (item) => { //канистра
                var info = window.clientStorage.inventoryItems[item.itemId - 1];
                return `${info.name} [${item.params.count}/${item.params.maxCount} л.]`;
            },
            37: (item) => { //патроны
                var info = window.clientStorage.inventoryItems[item.itemId - 1];
                return `${info.name} [${item.params.ammo} шт.]`;
            },
            38: (item) => { //патроны
                var info = window.clientStorage.inventoryItems[item.itemId - 1];
                return `${info.name} [${item.params.ammo} шт.]`;
            },
            39: (item) => { //патроны
                var info = window.clientStorage.inventoryItems[item.itemId - 1];
                return `${info.name} [${item.params.ammo} шт.]`;
            },
            40: (item) => { //патроны
                var info = window.clientStorage.inventoryItems[item.itemId - 1];
                return `${info.name} [${item.params.ammo} шт.]`;
            },
            54: (item) => { //ключи авто
                var info = window.clientStorage.inventoryItems[item.itemId - 1];
                return `${info.name} ${item.params.model}`;
            },
            55: (item) => { //нарко
                var info = window.clientStorage.inventoryItems[item.itemId - 1];
                return `${info.name} [${item.params.count} г.]`;
            },
            56: (item) => { //нарко
                var info = window.clientStorage.inventoryItems[item.itemId - 1];
                return `${info.name} [${item.params.count} г.]`;
            },
            57: (item) => { //нарко
                var info = window.clientStorage.inventoryItems[item.itemId - 1];
                return `${info.name} [${item.params.count} г.]`;
            },
            58: (item) => { //нарко
                var info = window.clientStorage.inventoryItems[item.itemId - 1];
                return `${info.name} [${item.params.count} г.]`;
            },
            59: (item) => { //ключи дома
                var info = window.clientStorage.inventoryItems[item.itemId - 1];
                return `${info.name} №${item.params.house}`;
            },
        };
    
        function getItemNameBySqlId(sqlId) {
            var item = inventoryAPI.getItem(sqlId);
            if (!item) item = inventoryAPI.getVehItem(sqlId);
            if (!item) return "Неизвестный";
    
            if (!invItemNames[item.itemId]) return window.clientStorage.inventoryItems[item.itemId - 1].name;
            return invItemNames[item.itemId](item);
        }
    
        function initHandlersItem(itemEl) {
            var moveHandler = (e) => {
                document.querySelector(`#inventory .item_name`).style.setProperty("left", e.pageX + itemEl.width() / 2);
                document.querySelector(`#inventory .item_name`).style.setProperty("top", e.pageY + itemEl.height() / 2);
            };
    
            itemEl.mousedown((e) => {
                if (e.which == 1) {
                    draggingItemEl = document.querySelector(document.querySelector(e.target));
                    freeColumnEl = draggingItemEl.closest(".column");
    
                    freeColumnEl.classList.remove("filled");
                    resetColumnSize(freeColumnEl);
    
                    hoverColumn(draggingItemEl, freeColumnEl);
    
                    draggingItemEl.style.setProperty("position", "");
                    draggingItemEl.style.setProperty("pointer-events", "none");
                    draggingItemEl.style.setProperty("position", "absolute");
                    draggingItemEl.style.setProperty("left", e.pageX - (draggingItemEl.width() / 2));
                    draggingItemEl.style.setProperty("top", e.pageY - (draggingItemEl.height() / 2));
                    document.mousemove = function(e) {
                        draggingItemEl.style.setProperty("left", e.pageX - (draggingItemEl.width() / 2));
                        draggingItemEl.style.setProperty("top", e.pageY - (draggingItemEl.height() / 2));
                    };
                    document.add("mousemove", inventoryAPI.mouseupHandler);
    
                    var item = inventoryAPI.getItem(draggingItemEl.dataset.sqlId);
                    if (!item) item = inventoryAPI.getVehItem(draggingItemEl.dataset.sqlId);
                    var index = mainItemIds.indexOf(item.itemId);
                    if (index != -1) {
                        document.querySelector(`#inventory .main .column[data-index="${index}"]`).style.setProperty("border-color", "#196");
                    }
                }
    
            });
            itemEl.contextmenu((e) => {
                inventoryAPI.showItemMenu(itemEl.dataset.sqlId, e.pageX, e.pageY);
            });
            itemEl.mouseenter((e) => {
                if (isVisible(`#inventory .item_name`)) return;
                document.querySelector(`#inventory .item_name`).innerHTML = getItemNameBySqlId(itemEl.dataset.sqlId);
                document.querySelector(`#inventory .item_name`).style.setProperty("left", e.pageX + itemEl.width() / 2);
                document.querySelector(`#inventory .item_name`).style.setProperty("top", e.pageY + itemEl.height() / 2);
                fadeIn(document.querySelector(`#inventory .item_name`), () => {
                    itemEl.mousemove(moveHandler);
                });
            });
            itemEl.mouseleave((e) => {
                clearTimeout(itemEl.timerId);
                document.querySelector(`#inventory .item_name`).style.setProperty("display", "none");
                itemEl.removeEventListener("mousemove", moveHandler);
            });
        }
    
        /* Подсвет ячеек вовремя переноса предмета. */
        function hoverColumn(itemEl, columnEl, color = "#111") {
            //console.log(`hover`)
            var oldColumnIsMain = freeColumnEl.closest(".main").length > 0; //ячейка, из которой перетащили - главная
            if (oldColumnIsMain) return;
            var itemsEl = columnEl.closest(".items");
            var cols = itemsEl.dataset.cols;
            var columnsEl = itemsEl.find(".column");
            if (!cols) columnEl.style.setProperty("background", "");
    
            for (var i = 0; i < itemEl.dataset.height; i++) {
                for (var j = 0; j < itemEl.dataset.width; j++) {
                    columnsEl[columnEl.index() + j + i * cols].style.setProperty("background", color);
                }
            }
    
        }
    
        function resetColumnSize(columnEl) {
            if (isFreeColumn(columnEl)) return console.error(`Невозможно сбросить размер пустой ячейки!`);
            if (columnEl.closest(".main").length > 0) return;
            var itemsEl = columnEl.parent(".items");
            var rows = itemsEl.dataset.rows;
            var cols = itemsEl.dataset.cols;
            var coord = indexToXY(rows, cols, columnEl.index());
    
            var h = parseInt(columnEl.style.setProperty("grid-row-end").split(" ")[1]);
            var w = parseInt(columnEl.style.setProperty("grid-column-end").split(" ")[1]);
    
            columnEl.style.setProperty("grid-column-end", `span 1`);
            columnEl.style.setProperty("grid-row-end", `span 1`);
    
            var columnsEl = itemsEl.find(".column");
            for (var i = 0; i < h; i++) {
                for (var j = 0; j < w; j++) {
                    columnsEl[columnEl.index() + j + i * cols].style.setProperty("display", "block");
                }
            }
    
    
            columnEl.style.setProperty("grid-column-start", );
        }
    
        function fillColumn(sqlId, item, itemsEl) {
            var columnsEl = itemsEl.find(".column");
            var h = window.clientStorage.inventoryItems[item.itemId - 1].height;
            var w = window.clientStorage.inventoryItems[item.itemId - 1].width;
            var rows = itemsEl.dataset.rows;
            var cols = itemsEl.dataset.cols;
    
            var itemColumnsEl = [];
            for (var i = 0; i < h; i++) {
                for (var j = 0; j < w; j++) {
                    itemColumnsEl.push(columnsEl[item.index + j + i * cols]);
                }
            }
            if (!isFreeColumn(itemColumnsEl[0])) return console.error(`Ячейка уже занята!`);
            var itemEl = createItemEl(sqlId, item);
            var coord = indexToXY(rows, cols, item.index);
            itemColumnsEl[0].classList.add("filled");
            itemColumnsEl[0].append(itemEl);
            itemColumnsEl[0].style.setProperty("grid-column-start", coord.x + 1);
            itemColumnsEl[0].style.setProperty("grid-column-end", `span ${w}`);
            itemColumnsEl[0].style.setProperty("grid-row-start", coord.y + 1);
            itemColumnsEl[0].style.setProperty("grid-row-end", `span ${h}`);
            for (var i = 1; i < itemColumnsEl.length; i++) {
                itemColumnsEl[i].style.setProperty("display", "none");
            }
        }
    
        function isFreeColumn(columnEl) {
            mergeItemSqlId = columnEl.find(".item").dataset.sqlId;
            return isVisible(columnEl) && columnEl.matches(":empty");
        }

        function removeOptions(selectbox) {
            var i;
            for(i = selectbox.options.length - 1 ; i >= 0; i--) {
                selectbox.remove(i);
            }
        }
    
        function slideUp(element, duration = 500) {
            return new Promise(function (resolve, reject) {
                element.style.height = element.offsetHeight + 'px'
                element.style.transitionProperty = `height, margin, padding`
                element.style.transitionDuration = duration + 'ms'
                element.offsetHeight // eslint-disable-line no-unused-expressions
                element.style.overflow = 'hidden'
                element.style.height = 0
                element.style.paddingTop = 0
                element.style.paddingBottom = 0
                element.style.marginTop = 0
                element.style.marginBottom = 0
                window.setTimeout(function () {
                    element.style.display = 'none'
                    element.style.removeProperty('height')
                    element.style.removeProperty('padding-top')
                    element.style.removeProperty('padding-bottom')
                    element.style.removeProperty('margin-top')
                    element.style.removeProperty('margin-bottom')
                    element.style.removeProperty('overflow')
                    element.style.removeProperty('transition-duration')
                    element.style.removeProperty('transition-property')
                resolve(false)
                }, duration)
            })
        }
    
        function slideDown(element, duration = 500) {
            return new Promise(function (resolve, reject) {
                element.style.removeProperty('display')
                let display = window.getComputedStyle(element).display
                if (display === 'none') display = 'block'
                element.style.display = display
                let height = element.offsetHeight
                element.style.overflow = 'hidden'
                element.style.height = 0
                element.style.paddingTop = 0
                element.style.paddingBottom = 0
                element.style.marginTop = 0
                element.style.marginBottom = 0
                element.offsetHeight // eslint-disable-line no-unused-expressions
                element.style.transitionProperty = `height, margin, padding`
                element.style.transitionDuration = duration + 'ms'
                element.style.height = height + 'px'
                element.style.removeProperty('padding-top')
                element.style.removeProperty('padding-bottom')
                element.style.removeProperty('margin-top')
                element.style.removeProperty('margin-bottom')
                window.setTimeout(function () {
                    element.style.removeProperty('height')
                    element.style.removeProperty('overflow')
                    element.style.removeProperty('transition-duration')
                    element.style.removeProperty('transition-property')
                }, duration)
            })
        }
    
        function slideToggle(element, duration = 500) {
            if (window.getComputedStyle(element).display === 'none') {
                return this.slideDown(element, duration)
            } else {
                return this.slideUp(element, duration)
            }
        }
    
        function fadeIn(el, time = 100) {
            el.style.opacity = 0;
          
            var last = +new Date();
            var tick = function() {
              el.style.opacity = +el.style.opacity + (new Date() - last) / time;
              last = +new Date();
          
              if (+el.style.opacity < 1) {
                (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
              }
            };
          
            tick();
        }

        function fadeOut(el, time = 100) {
            el.style.opacity = 0;
          
            var last = +new Date();
            var tick = function() {
              el.style.opacity = -el.style.opacity + (new Date() - last) / time;
              last = +new Date();
          
              if (-el.style.opacity > 1) {
                (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
              }
            };
          
            tick();
        }
    
        function initContainerEl(sqlId, item) {
            var ids = [7, 8, 13];
            if (!isContainerItem(item)) return null;
            var el = document.querySelector(`#inventory .right-block .container`)[ids.indexOf(item.itemId)];
            var items = el.find(".items");
            items.style.setProperty("grid-template-columns", `repeat(${item.params.cols}, 1fr)`);
            items.style.setProperty("grid-template-rows", `repeat(${item.params.rows}, 1fr)`);
            items.style.setProperty("height", item.params.rows * 4 + "vh");
            items.style.setProperty("width", item.params.cols * 4 + "vh");
            items.dataset.sqlId = sqlId;
            items.dataset.rows = item.params.rows;
            items.dataset.cols = item.params.cols;
            this.removeOptions(items);
            var count = item.params.rows * item.params.cols;
            for (var i = 0; i < count; i++) {
                var columnEl = document.querySelector(`#inventory .column`);
                columnEl.mouseenter((e) => {
                    if (draggingItemEl) {
                        var containerEl = document.querySelector(e.target).closest(".container");
                        /* Перетащили из основного инвентаря. */
                        var itemsEl = document.querySelector(e.target).closest(".items");
                        var item = inventoryAPI.getItem(draggingItemEl.dataset.sqlId);
                        if (itemsEl.dataset.type != "boot") {
                            if (!draggingItemEl.closest(".items").dataset.sqlId) {
                                var itemId = draggingItemEl.parent(".column").dataset.index;
                                var indexes = [6, 7, 12];
                                var index = indexes.indexOf(itemId);
                                if (index != -1 && containerEl.index() == index) return;
                            }
                            if (!item) item = inventoryAPI.getVehItem(draggingItemEl.dataset.sqlId);
                            if (blackList[containerEl.index()].indexOf(item.itemId) != -1) return;
                        }
    
                        var rows = itemsEl.dataset.rows;
                        var cols = itemsEl.dataset.cols;
                        var h = draggingItemEl.dataset.height;
                        var w = draggingItemEl.dataset.width;
    
                        var row = Math.clamp(indexToXY(rows, cols, document.querySelector(e.target).indexOf()).y, 0, rows - h);
                        var col = Math.clamp(indexToXY(rows, cols, document.querySelector(e.target).indexOf()).x, 0, cols - w);
    
                        var columnEl = document.querySelector(e.target).children(`.column`)[col + row * cols];
    
                        for (var i = 0; i < draggingItemEl.dataset.height; i++) {
                            for (var j = 0; j < draggingItemEl.dataset.width; j++) {
                                //console.log("index: "+ (col + j + (row + i)*cols));
                                var column = document.querySelector(e.target).children(`.column`)[col + j + (row + i) * cols];
                                if (column.find(".item").dataset.sqlId == draggingItemEl.dataset.sqlId) continue;
                                if (!isFreeColumn(column)) return;
                            }
                        }
    
                        hoverColumn(draggingItemEl, freeColumnEl, "#222");
                        freeColumnEl = columnEl;
                        hoverColumn(draggingItemEl, freeColumnEl, "#111");
                    }
                });
                items.append(columnEl);
            }

            var info = window.clientStorage.inventoryItems[item.itemId - 1];
            el.find(".header .type").textContent = `"${info.name}"`;
            el.find(".header .name").textContent = item.params.name || "Standart";
    
            return el;
        }
    
        function createItemEl(sqlId, item) {
            var info = window.clientStorage.inventoryItems[item.itemId - 1];
            if (!info) return null;
            var el = document.querySelector(`#inventory .item[data-sqlId='${sqlId}']`);
            el.style.setProperty("data-height", info.height);
            el.style.setProperty("data-width", info.width);
            el.style.setProperty("backgroundImage", `url('img/items/${item.itemId}.png')`);
            if (!isDefaultColumn(item) || vehicleInventory[sqlId]) {
                var size = Math.min(info.height, info.width) * 3;
                el.style.setProperty("height", size + "vh");
                el.style.setProperty("width", size + "vh");
            } else if (item.index == 6 || item.index == 7) {
                el.style.setProperty("height", "7vh");
                el.style.setProperty("width", "7vh");
            }
            initHandlersItem(el);
    
            return el;
        }
    
        /* Предмет-контейнер - куртка, брюки, рюкзак. */
        function isContainerItem(item) {
            var ids = [7, 8, 13];
            return ids.indexOf(item.itemId) != -1;
        }
    
        /* Дефолтная ячейка - та, что по центру инвентаря. */
        function isDefaultColumn(item) {
            return item.index >= 0 && item.index <= 13 && (item.parentId == -1 || !item.parentId);
        }
    
        function indexToXY(rows, cols, index) {
            if (!rows || !cols) return null;
            var x = index % cols;
            var y = (index - x) / cols;
            if (x >= cols || y >= rows) return null;
            return {
                x: x,
                y: y
            };
        }
    
        function xyToIndex(rows, cols, coord) {
            //debug(`xyToIndex: ${rows} ${cols} ${JSON.stringify(coord)}`)
            if (!rows || !cols) return -1;
            return coord.y * cols + coord.x;
        }
    
        /* Иногда класс .filled ячейке почему-то не добавляется. Это фикс. */
        function fixColumnClassFilled() {
            document.querySelectorAll(`#inventory .column`).forEach((index, el) => {
                if (document.querySelector(el).find(".item").length > 0) {
                    document.querySelector(el).classList.add("filled");
                }
            });
        }
    }

    render() {
        return (
            <div id="inventory" style={{display: 'none'}}>
                <div className="block left-block scroll">
                    <div className="container" style={{display: 'none'}}>
                        <p className="header">
                            <span className="type">"Багажник"</span> <span className="name">Infernus</span>
                        </p>
                        <div className="items" data-type="boot">
                            <div className="column">
                                <div className="item" style={{backgroundImage: `url(${require('../../assets/img/items/7.png')})`, height: '6vh', width: '6vh'}}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{float: 'left'}}>
                    <div className="block main">
                        <p className="header">Инвентарь <span className="playerName">Carter Slade</span></p>
                        <div id="head-items" className="items">
                            <div className="column" data-index="0" style={{backgroundImage: `url(${require('../../assets/img/inventory/1-off.png')})`}}></div>
                            <div className="column" data-index="5" style={{width: '9vh', backgroundImage: `url(${require('../../assets/img/inventory/6-off.png')})`, backgroundSize: '5vh'}}></div>
                            <div className="column" data-index="9" style={{backgroundImage: `url(${require('../../assets/img/inventory/10-off.png')})`}}></div>
                        </div>
                        <div id="top-items" className="items">
                            <div className="column" data-index="1" style={{backgroundImage: `url(${require('../../assets/img/inventory/2-off.png')})`}}></div>
                            <div className="column center" data-index="6" style={{backgroundImage: `url(${require('../../assets/img/inventory/7-off.png')})`, backgroundSize: '6vh'}}></div>
                            <div className="column" data-index="10" style={{backgroundImage: `url(${require('../../assets/img/inventory/11-off.png')})`, backgroundSize: '2vh'}}></div>
                            <div className="column" data-index="2" style={{backgroundImage: `url(${require('../../assets/img/inventory/3-off.png')})`}}></div>
                            <div className="column" data-index="11" style={{backgroundImage: `url(${require('../../assets/img/inventory/12-off.png')})`}}></div>
                        </div>
                        <div id="legs-items" className="items">
                            <div className="column" data-index="3" style={{backgroundImage: `url(${require('../../assets/img/inventory/4-off.png')})`}}></div>
                            <div className="column center" data-index="7" style={{backgroundImage: `url(${require('../../assets/img/inventory/8-off.png')})`, backgroundSize: '4vh'}}></div>
                            <div className="column" data-index="12" style={{backgroundImage: `url(${require('../../assets/img/inventory/13-off.png')})`}}></div>
                            <div className="column" data-index="4" style={{backgroundImage: `url(${require('../../assets/img/inventory/5-off.png')})`}}></div>
                            <div className="column" data-index="13" style={{backgroundImage: `url(${require('../../assets/img/inventory/14-off.png')})`, backgroundSize: '3.5vh'}}></div>
                        </div>
                        <div id="feet-items" className="items">
                            <div className="info">
                                <p>Наличные</p>
                                <p className="money">0$</p>
                                <p>VISA/Bank</p>
                                <p className="bank">0$</p>
                            </div>
                            <div className="column" style={{width: '9vh', backgroundImage: `url(${require('../../assets/img/inventory/9-off.png')})`, backgroundSize: '6vh'}} data-index="8"></div>
                            <div className="info">
                                <div className="health progress"><img src={require('../../assets/img/inventory/health.png')}/></div>
                                <div className="satiety progress"><img src={require('../../assets/img/inventory/eat.png')} /></div>
                                <div className="thirst progress"><img src={require('../../assets/img/inventory/water.png')} style={{marginRight: '0.2vh'}} /></div>
                            </div>
                        </div>
                        <div className="bottom_info">
                            Общий вес: <span className="weight">0</span> из <span className="maxWeight">30</span> кг
                        </div>
                    </div>
                    <div className="hands">
                        <p className="header">В руках: <span className="hands_name">Ничего</span></p>
                        <img className="left-hand" src={require('../../assets/img/hand.png')} />
                        <img className="right-hand" src={require('../../assets/img/hand.png')} />
                    </div>
                </div>
                <div className="block right-block scroll">
                    <div className="container" style={{display: 'none'}}>
                        <p className="header">
                            <span className="type">"Куртка"</span> <span className="name">Rockstar Games</span>
                        </p>
                        <div className="items">
                            <div className="column">
                                <div className="item" style={{backgroundImage: `url(${require('../../assets/img/items/7.png')})`, height: '6vh', width: '6vh'}}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="inventory_menu" style={{display: 'none'}}>
                    <div className="menu-item">Пункт 1</div>
                    <div className="menu-item">Пункт 2</div>
                    <div className="menu-item">Пункт 3</div>
                    <div className="menu-item">Пункт 4</div>
                </div>
                <div className="item_name" style={{display: 'none'}}>Название</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {

    };
};

const connected = connect(mapStateToProps)(PlayerInventory);
export { connected as PlayerInventory }; 