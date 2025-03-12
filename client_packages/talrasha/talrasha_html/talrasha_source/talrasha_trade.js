var tradeItemsData = {}; // sqlId => index предметов добавленных в обмен
$(document).ready(() => {

    window.tradeAPI = {
        show: (enable, traderName = "Продавец") => {
            enable = JSON.parse(enable);
			traderName = traderName.replace(" ","_");
            //debug(`tradeAPI.show: ${enable}`)
            if (enable) {
                var el = $(`#inventory`).clone();
                $(`#trade #inventory`).remove();
				
				$(`#trade`).fadeIn(1, () => {
					setTimeout(() => {
						$('#inventory .human').hide();
						$('#inventory .body_items').hide();
						$(`.indicators`).hide();
						$(`#inventory .inv_containers`).css("position", "absolute");
						$(`#inventory .inv_containers`).css("left", "15%");
					}, 1);
				});
                $(`#trade`).prepend(el);
                $(`#trade .playerName`).text(clientStorage.name);
                $(`#trade .traderName`).text(traderName);
                tradeItemsData = {};
                initHandlers();
                el.show();
                //показ контейнеров только тех, которые имеются
                var containers = el.find(".container");
                var ids = [7, 8, 13];
                var openCount = 0;
                for (var sqlId in window.playerInventory) {
                    var item = window.playerInventory[sqlId];
                    var index = ids.indexOf(item.itemId);
                    if (index != -1) {
                        containers.eq(index).slideDown("fast");
                        openCount++;
                    }
                }
                if (openCount == 0) {
                    $("#trade .right-block").append(`<center style='margin-top: 15vh'>Инвентарь пуст!</center>`);
                }

                tradeAPI.cancel();
                tradeAPI.cancelTrader();

            } else {
                $(`#trade`).slideUp(1, () => {
                    $(`#trade`).fadeOut(1);
					setTimeout(() => {
					$('#inventory .human').show();
					$('#inventory .body_items').show();
					$(`#inventory .inv_containers`).css("position", "");
					$(`#inventory .inv_containers`).css("left", "");
					}, 1);
                });
            }

            var columnsEl = $("#trade .recipientItems .column, #trade .myItems .column");
            columnsEl.removeClass("filled");
            columnsEl.removeAttr("style");
            columnsEl.empty();

            if (mp && mp.trigger) {
                setCursor(enable);
                mp.trigger('setBlockControl', enable);
                mp.trigger("setTradeActive", enable);

            }
        },
        active: () => {
            return $("#trade").css("display") != "none";
        },
        accept: () => {
            $("#trade .accept").removeClass("btn-agree");
            $("#trade .accept").removeClass("btn-cancel");
            $("#trade .accept").removeClass("btn-black");
            $("#trade .accept").addClass("btn-black");
            $("#trade .accept").text("Готов");
        },
        cancel: () => {
            $("#trade .accept").removeClass("btn-agree");
            $("#trade .accept").removeClass("btn-cancel");
            $("#trade .accept").removeClass("btn-black");
            $("#trade .accept").addClass("btn-agree");
            $("#trade .accept").text("Готов к обмену");
        },
        acceptTrader: () => {
            //debug(`tradeAPI.acceptTrader`);

            $("#trade .acceptTrader").removeClass("btn-agree");
            $("#trade .acceptTrader").removeClass("btn-cancel");
            $("#trade .acceptTrader").removeClass("btn-black");
            $("#trade .acceptTrader").addClass("btn-black");
            $("#trade .acceptTrader").text("Готов");

        },
        cancelTrader: () => {
            $("#trade .acceptTrader").removeClass("btn-agree");
            $("#trade .acceptTrader").removeClass("btn-cancel");
            $("#trade .acceptTrader").removeClass("btn-black");
            $("#trade .acceptTrader").addClass("btn-cancel");
            $("#trade .acceptTrader").text("Не готов");
        },
        addTraderItem: (sqlId, item, itemIndex) => {
            sqlId = parseInt(sqlId);
            itemIndex = parseInt(itemIndex);
            item = JSON.parse(item);
            var itemsEl = $("#trade .recipientItems");
            var columnsEl = $("#trade .recipientItems .column");


            var rows = itemsEl.data("rows");
            var cols = itemsEl.data("cols");

            var h = clientStorage.inventoryItems[item.itemId - 1].height;
            var w = clientStorage.inventoryItems[item.itemId - 1].width;

            var itemColumnsEl = [];
            for (var i = 0; i < h; i++) {
                for (var j = 0; j < w; j++) {
                    itemColumnsEl.push(columnsEl.eq(itemIndex + j + i * cols));
                }
            }

            var freeColumnEl = columnsEl.eq(itemIndex);
            var size = Math.min(h, w) * 5;
            var itemEl = $(`<div class="item" data-sqlid='${sqlId}' style="background-image: url('talrasha_image/talrasha_item/${item.itemId}.png'); height: ${size}vh; width: ${size}vh"></div>`);

            if ($(`#trade .recipientItems .item[data-sqlid='${sqlId}']`).length > 0) {
                itemEl = $(`#trade .recipientItems .item[data-sqlid='${sqlId}']`);
                itemEl.parent(".column").removeClass("filled");
                resetColumnSize(itemEl.parent(".column"));
            }

            freeColumnEl.css("background", "");
            freeColumnEl.addClass("filled");
            freeColumnEl.append(itemEl);

            var coord = indexToXY(rows, cols, itemIndex);
            freeColumnEl.css("grid-column-start", coord.x + 1);
            freeColumnEl.css("grid-column-end", `span ${w}`);
            freeColumnEl.css("grid-row-start", coord.y + 1);
            freeColumnEl.css("grid-row-end", `span ${h}`);
            for (var i = 1; i < itemColumnsEl.length; i++) {
                itemColumnsEl[i].hide();
            }
        },
        deleteTraderItem: (sqlId) => {
            if ($(`#trade .recipientItems .item[data-sqlid='${sqlId}']`).length > 0) {
                itemEl = $(`#trade .recipientItems .item[data-sqlid='${sqlId}']`);
                itemEl.parent(".column").removeClass("filled");
                resetColumnSize(itemEl.parent(".column"));
                itemEl.parent(".column").empty();
            }
        }
    };

    var draggingItemEl, freeColumnEl;

    function initHandlers() {
        var items = $(`#trade  .items`);
        items.mousedown((e) => {
            if (e.which == 1) {
                draggingItemEl = $(e.target);
                var width = draggingItemEl.width()
                var height = draggingItemEl.height()
                freeColumnEl = draggingItemEl.parent(".column");

                freeColumnEl.removeClass("filled");
                resetColumnSize(freeColumnEl);
                hoverColumn(draggingItemEl, freeColumnEl);

                //draggingItemEl.parents().parents().css("position", "");
                draggingItemEl.css("pointer-events", "none");
                //draggingItemEl.css("position", "fixed");
                draggingItemEl.width(width);
                draggingItemEl.height(height);
                draggingItemEl.css("left", e.pageX - 10);
                draggingItemEl.css("top", e.pageY - 250);
                $(document).mousemove((e) => {
                    draggingItemEl.css("left", e.pageX - 10);
                    draggingItemEl.css("top", e.pageY - 250);
                });
            }
        });
        $(document).mouseup((e) => {
            if (draggingItemEl) {
                var itemsEl = $(freeColumnEl).parents(".items");
                var rows = itemsEl.data("rows");
                var cols = itemsEl.data("cols");

                var h = draggingItemEl.data("height");
                var w = draggingItemEl.data("width");

                var columnsEl = freeColumnEl.parent().children(".column");
                var itemColumnsEl = [];
                for (var i = 0; i < h; i++) {
                    for (var j = 0; j < w; j++) {
                        itemColumnsEl.push(columnsEl.eq(freeColumnEl.index() + j + i * cols));
                    }
                }

                freeColumnEl.css("background", "");
                freeColumnEl.addClass("filled");
                freeColumnEl.append(draggingItemEl);

                var coord = indexToXY(rows, cols, freeColumnEl.index());
                freeColumnEl.css("grid-column-start", coord.x + 1);
                freeColumnEl.css("grid-column-end", `span ${w}`);
                freeColumnEl.css("grid-row-start", coord.y + 1);
                freeColumnEl.css("grid-row-end", `span ${h}`);
                for (var i = 1; i < itemColumnsEl.length; i++) {
                    itemColumnsEl[i].hide();
                }

                var item = inventoryAPI.getItem(draggingItemEl.data("sqlid"));
                var info = clientStorage.inventoryItems[item.itemId - 1];
                var isExist = tradeItemsData[draggingItemEl.data("sqlid")] != null;
                if (itemsEl.hasClass("myItems")) {
                    var size = Math.min(info.height, info.width) * 6;
                    draggingItemEl.css("height", size + "vh");
                    draggingItemEl.css("width", size + "vh");

                    tradeItemsData[draggingItemEl.data("sqlid")] = freeColumnEl.index();
                    mp.trigger(`trade.queryAddItem`, draggingItemEl.data("sqlid"), freeColumnEl.index());
                } else {
                    var size = Math.min(info.height, info.width) * 3;
                    draggingItemEl.css("height", size + "vh");
                    draggingItemEl.css("width", size + "vh");
                    if (isExist) {
                        delete tradeItemsData[draggingItemEl.data("sqlid")];
                        mp.trigger(`trade.queryDeleteItem`, draggingItemEl.data("sqlid"));
                    }
                }

                draggingItemEl.css("pointer-events", "");
                draggingItemEl.css("position", "static");
                //draggingItemEl.css("height", "-webkit-fill-available");
                //draggingItemEl.css("width", "-webkit-fill-available");
                $(document).off("mousemove");


                draggingItemEl = null;
                freeColumnEl = null;
            }
        });
        $(`#trade .column`).mouseenter((e) => {
            if (draggingItemEl) {
                var itemsEl = $(e.target).parents(".items");
                if (itemsEl.hasClass("recipientItems")) return;
                var rows = itemsEl.data("rows");
                var cols = itemsEl.data("cols");
                var h = draggingItemEl.data("height");
                var w = draggingItemEl.data("width");

                var row = Math.clamp(indexToXY(rows, cols, $(e.target).index()).y, 0, rows - h);
                var col = Math.clamp(indexToXY(rows, cols, $(e.target).index()).x, 0, cols - w);

                var columnEl = $(e.target).parent().children(`.column`).eq(col + row * cols);
                for (var i = 0; i < draggingItemEl.data("height"); i++) {
                    for (var j = 0; j < draggingItemEl.data("width"); j++) {
                        var column = $(e.target).parent().children(`.column`).eq(col + j + (row + i) * cols);
                        if (column.find(".item").data("sqlid") == draggingItemEl.data("sqlid")) continue;
                        if (!isFreeColumn(column)) return;
                    }
                }

                hoverColumn(draggingItemEl, freeColumnEl, "radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.45) 0%, rgba(151, 151, 151, 0.45) 100%)");
                freeColumnEl = columnEl;
                hoverColumn(draggingItemEl, freeColumnEl, "radial-gradient(50% 50% at 50% 50%, rgba(225, 225, 225, 0.45) 0%, rgba(200, 200, 200, 0.45) 100%)");
            }
        });
        $(`#trade .close`).off("click");
        $(`#trade .close`).click(() => {
            tradeAPI.show(false);
            mp.trigger(`events.callRemote`, "trade.queryTradeCancel");
        });
    }

    function resetColumnSize(columnEl) {
        if (isFreeColumn(columnEl)) return console.error(`Невозможно сбросить размер пустой ячейки!`);
        var itemsEl = columnEl.parent(".items");
        var rows = itemsEl.data("rows");
        var cols = itemsEl.data("cols");
        var coord = indexToXY(rows, cols, columnEl.index());

        var h = parseInt(columnEl.css("grid-row-end").split(" ")[1]);
        var w = parseInt(columnEl.css("grid-column-end").split(" ")[1]);

        columnEl.css("grid-column-end", `span 1`);
        columnEl.css("grid-row-end", `span 1`);

        var columnsEl = itemsEl.find(".column");
        for (var i = 0; i < h; i++) {
            for (var j = 0; j < w; j++) {
                columnsEl.eq(columnEl.index() + j + i * cols).show();
            }
        }


        columnEl.css("grid-column-start", );
    }

    function isFreeColumn(columnEl) {
        return isVisible(columnEl) && columnEl.is(":empty");
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

    /* Подсвет ячеек вовремя переноса предмета. */
    function hoverColumn(itemEl, columnEl, color = "radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.45) 0%, rgba(151, 151, 151, 0.45) 100%)") {
        var itemsEl = columnEl.parents(".items");
        var cols = itemsEl.data("cols");
        var columnsEl = itemsEl.find(".column");
        if (!cols) columnEl.css("background", "");

        for (var i = 0; i < itemEl.data("height"); i++) {
            for (var j = 0; j < itemEl.data("width"); j++) {
                columnsEl.eq(columnEl.index() + j + i * cols).css("background", color);
            }
        }
    }
});

/* Вызывается, когда игрок принял/отменил торговлю. */
function acceptTrade() {
    if ($("#trade .accept").text() == "Готов к обмену") {
        mp.trigger(`trade.queryAccept`);
    } else {
        mp.trigger(`trade.queryCancel`);
    }
}
