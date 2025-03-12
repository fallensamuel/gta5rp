$(document).ready(() => {
    var modals = {
        "character_reg": {
            header: "Новый персонаж",
            location: "center",
            noClose: true,
            content: `<div class="input_group">
                        <input type="text" placeholder="Имя персонажа в формате 'Имя Фамилия'" class="characterName"/>
                    </div>
                    <div class="actions">
                        <div class="btn" style="margin-left: auto; margin-right: auto;" onclick="regCharacterHandler()">Создать</div>
                    </div>`,
            on: () => {
                modals["character_reg"].off();
                $(".modal .characterName").on("keydown", (e) => {
                    if (e.keyCode == 13) regCharacterHandler();
                });
            },
            off: () => {
                $(".modal .characterName").off("keydown");
            },
        },
        "closed_mode": {
            header: "Закрытый доступ.",
            location: "center",
            content: `<div class="input_group">
                        <input type="text" placeholder="Введите пароль" class="pin"/>
                    </div>
                    <div class="actions">
                        <div class="btn" style="margin-left: auto; margin-right: auto;" onclick="closedModeHandler()">Войти</div>
                    </div>`,
            on: () => {
                modals["closed_mode"].off();
                $(".modal .pin").on("keydown", (e) => {
                    if (e.keyCode == 13) closedModeHandler();
                });
            },
            off: () => {
                $(".modal .pin").off("keydown");
            }
        },
        "biz_balance_add": {
            header: "Пополнение кассы",
            location: "center",
            content: `<div class="input_group">
                        <input type="text" placeholder="Введите сумму" class="sum"/>
                    </div>
                    <div class="actions">
                        <div class="btn">Пополнить</div>
                        <div class="btn_close" onclick="modalAPI.hide()">Отменить</div>
                    </div>`,
            on: () => {
                modals["biz_balance_add"].off();
                setOnlyInt(".modal .sum");
                var handler = () => {
                    var sum = parseInt($(".modal .sum").val().trim());
                    if (isNaN(sum) || sum <= 0 || sum > 10000000) return lightTextFieldError(".modal .sum", `Неверная сумма!`);
                    if (!isFlood()) {
                        mp.eventCallRemote("biz.balance.add", sum);
                        modalAPI.hide();
                    }
                };
                $(".modal .sum").on("keydown", (e) => {
                    if (e.keyCode == 13) handler();
                });
                $(".modal .btn").on("click", () => {
                    handler();
                });
            },
            off: () => {
                clearOnlyInt(".modal .sum");
                $(".modal .sum").off("keydown");
                $(".modal .btn").off("click");
            },
        },
        "biz_balance_take": {
            header: "Снятие с кассы",
            location: "center",
            content: `<div class="input_group">
                        <input type="text" placeholder="Введите сумму" class="sum"/>
                    </div>
                    <div class="actions">
                        <div class="btn">Снять</div>
                        <div class="btn_close" onclick="modalAPI.hide()">Отменить</div>
                    </div>`,
            on: () => {
                modals["biz_balance_take"].off();
                setOnlyInt(".modal .sum");
                var handler = () => {
                    var sum = parseInt($(".modal .sum").val().trim());
                    if (isNaN(sum) || sum <= 0 || sum > 10000000) return lightTextFieldError(".modal .sum", `Неверная сумма!`);
                    if (!isFlood()) {
                        mp.eventCallRemote("biz.balance.take", sum);
                        modalAPI.hide();
                    }
                };
                $(".modal .sum").on("keydown", (e) => {
                    if (e.keyCode == 13) handler();
                });
                $(".modal .btn").on("click", () => {
                    handler();
                });
            },
            off: () => {
                clearOnlyInt(".modal .sum");
                $(".modal .sum").off("keydown");
                $(".modal .btn").off("click");
            },
        },
        "biz_products_buy": {
            header: "Закупка товара",
            location: "center",
            content: `<div class="input_group">
                        <input type="text" placeholder="Введите количество для закупки" class="products"/>
                    </div>
                    <div class="actions">
                        <div class="btn">Закупить</div>
                        <div class="btn_close" onclick="modalAPI.hide()">Отменить</div>
                    </div>`,
            on: (values) => {
                modals["biz_products_buy"].off();
                setOnlyInt(".modal .products");

                var money = parseInt(clientStorage.money);
                var bizProductPrice = parseInt(values.productPrice);
                var bizProducts = parseInt(values.products);
                var bizMaxProducts = parseInt(values.maxProducts);

                var handler = () => {
                    var products = parseInt($(".modal .products").val().trim());
                    var sum = parseInt($(".modal .products").val().trim()) * bizProductPrice;


                    if (isNaN(products) || products <= 0) return lightTextFieldError(".modal .products", `Неверный товар!`);

                    if (bizProducts + products > bizMaxProducts)
                        return lightTextFieldError(".modal .products", `Склад не может вместить более ${bizMaxProducts} ед.!`);
                    if (money < sum) return lightTextFieldError(".modal .products", `У Вас недостаточно средств!`);
                    if (!isFlood()) {
                        mp.eventCallRemote("biz.products.buy", products);
                        modalAPI.hide();
                    }
                };
                $(".modal .products").on("keydown", (e) => {
                    if (e.keyCode == 13) handler();
                });
                $(".modal .btn").on("click", () => {
                    handler();
                });
            },
            off: () => {
                clearOnlyInt(".modal .products");
                $(".modal .products").off("keydown");
                $(".modal .btn").off("click");
            },

        },
        "biz_products_sell": {
            header: "Списание товара",
            location: "center",
            content: `<div class="input_group">
                        <input type="text" placeholder="Введите количество для списания" class="products"/>
                    </div>
                    <div class="actions">
                        <div class="btn">Списать</div>
                        <div class="btn_close" onclick="modalAPI.hide()">Отменить</div>
                    </div>`,
            on: (values) => {
                modals["biz_products_sell"].off();
                setOnlyInt(".modal .products");

				var bizProducts = parseInt(values.products);

                var handler = () => {
                    var products = parseInt($(".modal .products").val().trim());

                    if (isNaN(products) || products <= 0) return lightTextFieldError(".modal .products", `Неверный товар!`);

                    if (products > bizProducts)
                        return lightTextFieldError(".modal .products", `Склад содержит ${bizProducts} ед.!`);
                    if (!isFlood()) {
                        mp.eventCallRemote("biz.products.sell", products);
                        modalAPI.hide();
                    }
                };
                $(".modal .products").on("keydown", (e) => {
                    if (e.keyCode == 13) handler();
                });
                $(".modal .btn").on("click", () => {
                    handler();
                });
            },
            off: () => {
                clearOnlyInt(".modal .products");
                $(".modal .products").off("keydown");
                $(".modal .btn").off("click");
            },

        },
        "biz_products_price": {
            header: "Цена товара",
            location: "center",
            content: `<div class="input_group">
                        <input type="text" placeholder="Введите цену" class="newProductPrice"/>
                    </div>
                    <div class="actions">
                        <div class="btn">Изменить</div>
                        <div class="btn_close" onclick="modalAPI.hide()">Отменить</div>
                    </div>`,
            on: (values) => {
                modals["biz_products_price"].off();
                setOnlyInt(".modal .newProductPrice");

                var handler = () => {
                    var productPrice = parseInt($(".modal .newProductPrice").val().trim());

                    if (isNaN(productPrice) || productPrice <= 0) return lightTextFieldError(".modal .newProductPrice", `Неверное значение!`);

                    if (!isFlood()) {
                        mp.eventCallRemote("biz.products.price", productPrice);
                        modalAPI.hide();
                    }
                };
                $(".modal .newProductPrice").on("keydown", (e) => {
                    if (e.keyCode == 13) handler();
                });
                $(".modal .btn").on("click", () => {
                    handler();
                });
            },
            off: () => {
                clearOnlyInt(".modal .newProductPrice");
                $(".modal .newProductPrice").off("keydown");
                $(".modal .btn").off("click");
            },

        },
        "biz_sell_to_player": {
            header: "Продажа бизнеса другому гражданину",
            location: "center",
            content: `<div class="input_group">
                        <input type="text" placeholder="Введите имя покупателя ('Имя Фамилия')" class="buyerName"/>
                    </div>
                    <div class="input_group">
                        <input type="text" placeholder="Введите цену" class="price"/>
                    </div>
                    <div class="actions">
                        <div class="btn">Продать</div>
                        <div class="btn_close" onclick="modalAPI.hide()">Отменить</div>
                    </div>`,
            on: (values) => {
                modals["biz_sell_to_player"].off();
                setOnlyInt(".modal .price");

                var handler = () => {
                    var price = parseInt($(".modal .price").val().trim());
                    if (isNaN(price) || price <= 0 || price > 50000000) return lightTextFieldError(".modal .price", `Неверная цена!`);

                    var buyerName = $(".modal .buyerName").val().trim();
                    var reg = /^([A-Z][a-z]{1,19}) ([A-Z][a-z]{1,19})$/;
                    if (!reg.test(buyerName)) return lightTextFieldError(".modal .buyerName", "Имя неверно!");

                    if (!isFlood()) {
                        mp.eventCallRemote("biz.sell", [buyerName, price]);
						modalAPI.hide();
                    }
                };
                $(".modal .price").on("keydown", (e) => {
                    if (e.keyCode == 13) handler();
                });
                $(".modal .btn").on("click", () => {
                    handler();
                });
            },
            off: () => {
                clearOnlyInt(".modal .price");
                $(".modal .price").off("keydown");
                $(".modal .btn").off("click");
            }
        },
        "biz_sell_to_gov": {
            header: "Продажа бизнеса государству",
            location: "center",
            content: `<div class="label">
                        <div class="name">Цена: <span class="price">0$</span></div>
                    </div>
                    <div class="actions">
                        <div class="btn">Продать</div>
                        <div class="btn_close" onclick="modalAPI.hide()">Отменить</div>
                    </div>`,
            on: (values) => {
                modals["biz_sell_to_gov"].off();

				$(".modal .price").text(`${values.price}$`);

                var handler = () => {
                    if (!isFlood()) {
                        mp.eventCallRemote("biz.sellToGov");
                        modalAPI.hide();
                    }
                };
                $(".modal .btn").on("click", () => {
                    handler();
                });
            },
            off: () => {
                $(".modal .btn").off("click");
            }
        },
        "biz_buy": {
            header: "Покупка бизнеса",
            location: "center",
            content: `<div class="label">
                        <div class="name">Тип: <span class="type">-</span></div>
                    </div>
                    <div class="label">
                        <div class="name">Цена: <span class="price">0$</span></div>
                    </div>
                    <div class="actions">
                        <div class="btn">Купить</div>
                        <div class="btn_close" onclick="modalAPI.hide()">Отменить</div>
                    </div>`,
            on: (values) => {
                modals["biz_buy"].off();

                $(".modal .type").text(`${values.type}`);
                $(".modal .price").text(`${values.price}$`);

                var handler = () => {
                    if (!isFlood()) {
                        mp.eventCallRemote("biz.buy");
                        modalAPI.hide();
                    }
                };
                $(".modal .btn").on("click", () => {
                    handler();
                });
            },
            off: () => {
                $(".modal .btn").off("click");
            }
        },
        "give_wanted": {
            header: "Розыск",
            location: "center",
            content: `<div class="label">
                        <div class="name">Преступник: <span class="playerName">-</span></div>
                    </div>
                    <div class="label">
                        <div class="name">Розыск: <span class="wantedVal">5 зв.</span></div>
                    </div>
                    <div class="input_group">
                        <input type="text" placeholder="Введите уровень розыска" class="wanted"/>
                    </div>
                    <div class="input_group">
                        <input type="text" placeholder="Введите причину" class="reason"/>
                    </div>
                    <div class="actions">
                        <div class="btn">Выдать</div>
                        <div class="btn_close" onclick="modalAPI.hide()">Отменить</div>
                    </div>`,
            on: (values) => {
                modals["give_wanted"].off();
                setOnlyInt(".modal .wanted");

                var playerId = parseInt(values.playerId);
                var playerName = values.playerName;
                var wantedVal = parseInt(values.wanted);

                $(".modal .playerName").text(`${playerName}`);
                $(".modal .wantedVal").text(`${wantedVal} зв.`);

                var handler = () => {
                    var wanted = parseInt($(".modal .wanted").val().trim());
                    var reason = $(".modal .reason").val().trim();
                    if (isNaN(wanted) || wanted <= 0 || wanted > 10) return lightTextFieldError(".modal .wanted", `Неверный уровень розыска!`);
                    if (!reason || reason.length == 0) return lightTextFieldError(".modal .reason", `Укажите причину!`);
                    if (reason.length > 30) reason = reason.substr(0, 30) + "...";
                    if (!isFlood()) {
                        mp.eventCallRemote("giveWanted", [playerId, wanted, reason]);
                        modalAPI.hide();
                    }
                };
                $(".modal .wanted").on("keydown", (e) => {
                    if (e.keyCode == 13) handler();
                });
                $(".modal .reason").on("keydown", (e) => {
                    if (e.keyCode == 13) handler();
                });
                $(".modal .btn").on("click", () => {
                    handler();
                });
            },
            off: () => {
                clearOnlyInt(".modal .wanted");
                $(".modal .wanted").off("keydown");
                $(".modal .reason").off("keydown");
                $(".modal .btn").off("click");
            },
        },
        "give_fine": {
            header: "Выписка штрафа нарушителю",
            location: "center",
            content: `<div class="label">
                        <div class="name">Преступник: <span class="playerName">-</span></div>
                    </div>
                    <div class="label">
                        <div class="name">Розыск: <span class="wantedVal">5 зв.</span></div>
                    </div>
                    <div class="input_group">
                        <input type="text" placeholder="Введите сумму штрафа" class="sum"/>
                    </div>
                    <div class="input_group">
                        <input type="text" placeholder="Введите причину" class="reason"/>
                    </div>
                    <div class="actions">
                        <div class="btn">Выписать</div>
                        <div class="btn_close" onclick="modalAPI.hide()">Отменить</div>
                    </div>`,
            on: (values) => {
                modals["give_fine"].off();
                setOnlyInt(".modal .sum");

                var playerId = parseInt(values.playerId);
                var playerName = values.playerName;
                var wantedVal = parseInt(values.wanted);

                $(".modal .playerName").text(`${playerName}`);
                $(".modal .wantedVal").text(`${wantedVal} зв.`);

                var handler = () => {
                    var sum = parseInt($(".modal .sum").val().trim());
                    var reason = $(".modal .reason").val().trim();
                    if (isNaN(sum) || sum <= 0 || sum > 5000) return lightTextFieldError(".modal .sum", `Неверная сумма!`);
                    if (!reason || reason.length == 0) return lightTextFieldError(".modal .reason", `Укажите причину!`);
                    if (reason.length > 30) reason = reason.substr(0, 30) + "...";
                    if (!isFlood()) {
                        mp.eventCallRemote("giveFine", [playerId, sum, reason]);
                        modalAPI.hide();
                    }
                };
                $(".modal .sum").on("keydown", (e) => {
                    if (e.keyCode == 13) handler();
                });
                $(".modal .reason").on("keydown", (e) => {
                    if (e.keyCode == 13) handler();
                });
                $(".modal .btn").on("click", () => {
                    handler();
                });
            },
            off: () => {
                clearOnlyInt(".modal .sum");
                $(".modal .sum").off("keydown");
                $(".modal .reason").off("keydown");
                $(".modal .btn").off("click");
            },
        },
        "clear_fine": {
            header: "Оплата штрафа",
            location: "center",
            content: `<div class="label">
                        <div class="name">Номер штрафа: <span class="id">№1</span></div>
                    </div>
                    <div class="label">
                        <div class="name">Инспектор: <span class="cop">Жетон 00002</span></div>
                    </div>
                    <div class="label">
                        <div class="name">Причина: <span class="reason">Мешает спать соседям.</span></div>
                    </div>
                    <div class="label">
                        <div class="name">Сумма: <span class="price">$10000.</span></div>
                    </div>
                    <div class="label">
                        <div class="name">Дата: <span class="date">21:17 06.03.2019</span></div>
                    </div>
                    <div class="actions">
                        <div class="btn">Оплатить</div>
                        <div class="btn_close" onclick="modalAPI.hide()">Отменить</div>
                    </div>`,
            on: (values) => {
                modals["clear_fine"].off();

                var playerId = parseInt(values.playerId);
                var playerName = values.playerName;
                var wantedVal = parseInt(values.wanted);


                $(".modal .id").text(`№${values.id}`);
                $(".modal .cop").text(`Жетон ${getPaddingNumber(values.cop)}`);
                $(".modal .reason").text(values.reason);
                $(".modal .price").text(`$${values.price}`);
                $(".modal .date").text(convertMillsToDate(values.date * 1000));

                var handler = () => {
                    var money = clientStorage.money;
                    if (money < values.price) return nError(`Необходимо: $${values.price}`);
                    if (!isFlood()) {
                        mp.eventCallRemote("policeService.clearFine");
                        modalAPI.hide();
                    }
                };
                $(".modal .btn").on("click", () => {
                    handler();
                });
            },
            off: () => {
                $(".modal .btn").off("click");
            },
        },
        "invite_player_inhouse": {
            header: "Пригласить игрока в дом",
            location: "center",
            content: `<div class="input_group">
                        <input type="text" placeholder="Введите ID или Имя игрока" class="player"/>
                    </div>
                    <div class="actions">
                        <div class="btn">Пригласить</div>
                        <div class="btn_close" onclick="modalAPI.hide()">Отменить</div>
                    </div>`,
            on: (values) => {
                modals["invite_player_inhouse"].off();
                houseMenu.__vue__.exitMenu();

                var handler = () => {
                    var player = $(".modal .player").val().trim();
                    if (!player || !player.length) return lightTextFieldError(".modal .player", `Игрок не найден!`);
                    if (!isFlood()) {
                        mp.eventCallRemote("invitePlayerInHouse", [player]);
                        modalAPI.hide();
                    }
                };
                $(".modal .player").on("keydown", (e) => {
                    if (e.keyCode == 13) handler();
                });
                $(".modal .btn").on("click", () => {
                    handler();
                });
            },
            off: () => {
                mp.eventCallRemote("houseMenuHandler");
                clearOnlyInt(".modal .wanted");
                $(".modal .player").off("keydown");
                $(".modal .btn").off("click");
            },
        },
        "sell_player_house": {
            header: "Продажа дома",
            location: "center",
            content: `<div class="input_group">
                        <input type="text" placeholder="Введите ID или Имя игрока" class="player"/>
                    </div>
                    <div class="input_group">
                        <input type="text" placeholder="Введите цену" class="price"/>
                    </div>
                    <div class="actions">
                        <div class="btn">Продать</div>
                        <div class="btn_close" onclick="modalAPI.hide()">Отменить</div>
                    </div>`,
            on: (values) => {
                modals["sell_player_house"].off();
                setOnlyInt(".modal .price");
                houseMenu.__vue__.exitMenu();

                var handler = () => {
                    var player = $(".modal .player").val().trim();
                    if (!player.length) return lightTextFieldError(".modal .player", `Игрок не найден!`);

                    var price = $(".modal .price").val().trim();
                    if (!price) return lightTextFieldError(".modal .price", `Установите корректную цену!`);

                    if (!isFlood()) {
                        mp.eventCallRemote("sellHousePlayer", [player, price]);
                        modalAPI.hide();
                    }
                };
                $(".modal .player").on("keydown", (e) => {
                    if (e.keyCode == 13) handler();
                });
                $(".modal .price").on("keydown", (e) => {
                    if (e.keyCode == 13) handler();
                });
                $(".modal .btn").on("click", () => {
                    handler();
                });
            },
            off: () => {
                clearOnlyInt(".modal .price");
                $(".modal .player").off("keydown");
                $(".modal .price").off("keydown");
				$(".modal .btn").off("click");
            },
        },
        "sell_player_car": {
            header: "Продажа авто",
            location: "center",
            content: `<div class="input_group">
                        <input type="text" placeholder="Введите ID или Имя игрока" class="player"/>
                    </div>
                    <div class="input_group">
                        <input type="text" placeholder="Введите цену" class="price"/>
                    </div>
                    <div class="actions">
                        <div class="btn">Продать</div>
                        <div class="btn_close" onclick="modalAPI.hide()">Отменить</div>
                    </div>`,
            on: (values) => {
                modals["sell_player_car"].off();
                setOnlyInt(".modal .price");

                var handler = () => {
                    var player = $(".modal .player").val().trim();
                    if (!player.length) return lightTextFieldError(".modal .player", `Игрок не найден!`);

                    var price = $(".modal .price").val().trim();
                    if (!price) return lightTextFieldError(".modal .price", `Установите корректную цену!`);

                    if (!isFlood()) {
                        mp.eventCallRemote("sellCarPlayer", [player, parseInt(price), values.sqlId]);
                        modalAPI.hide();
                    }
                };
                $(".modal .player").on("keydown", (e) => {
                    if (e.keyCode == 13) handler();
                });
                $(".modal .price").on("keydown", (e) => {
                    if (e.keyCode == 13) handler();
                });
                $(".modal .btn").on("click", () => {
                    handler();
                });
            },
            off: () => {
                clearOnlyInt(".modal .price");
                $(".modal .player").off("keydown");
                $(".modal .price").off("keydown");
                $(".modal .btn").off("click");
            },
        },
		"spawn_rent_accept": {
            header: "Аренда скутера",
            location: "center",
            content: `
                <div style="font-size: 1.2963vh;color: #FFFFFF;text-align: center;margin-bottom: 2.42593vh;">
                    Вы действительно хотите арендовать скутер за 0$?
                </div>
                <div class="actions">
                    <div class="btn">Арендовать</div>
                    <div class="btn_close" onclick="modalAPI.hide()">Отменить</div>
                </div>`,
            on: () => {
                modals["spawn_rent_accept"].off();
                $(".modal .btn").on("click", () => {
                    if (!isFlood()) {
                        mp.trigger('TalRashaSpawnRent');
                        modalAPI.hide();
                    }
                });
            },
            off: () => {
                $(".modal .btn").off("click");
            }
        },
        "help_menu": {
            header: "Помощь",
            location: "right-middle",
            content: `<span class="helpa" style="font-size: 1.2963vh; color: #acacac;"></span>`,
            on: (values) => {
                $(".modal .header").text(`${values.head}`);
                $(".modal .helpa").text(`${values.text}`);
            },
            off: () => {
                $(".modal .btn").off("click");
                mp.trigger('update.help.main.open', false);
            }
        },
        "bank_money_put": {
            header: "Пополнение баланса", // Вывод средств
            location: "center",
            content: `<div class="label">
                        <div class="name">Баланс <a style="color: #FFFFFF;" class="balance_bank"></a></div>
                    </div>
                    <div class="input_group">
                        <input type="text" placeholder="Введите сумму" class="mbank_put"/>
                    </div>
                    <div class="actions">
                        <div class="btn">Пополнить</div>
                        <div class="btn_close" onclick="modalAPI.hide()">Отменить</div>
                    </div>`,
            on: (values) => {
                setOnlyInt(".modal .mbank_put");
                var handler = () => {
                    var money = $(".modal .mbank_put").val().trim();
                    mp.trigger("put.bank.money", money);
                };
                $(".modal .balance_bank").text(`$${values.money}`);
                $(".modal .mbank_put").on("keydown", (e) => {
                    if (e.keyCode == 13) handler();
                });
                $(".modal .btn").on("click", () => {
                    handler();
                });
            },
            off: () => {
                $(".modal .btn").off("click");
                mp.trigger('update.bank.main.open', false);
            },
        },
        "item_split": {
            header: "Разделение предмета",
            location: "center",
            content: `<div class="label">
                        <div class="name">Предмет: <span class="prname">Деньги</span></div>
                    </div>
                    <div class="label">
                        <div class="name">Количество: <span class="count">1000$</span></div>
                    </div>
                    <div class="label">
                        <div class="name">Остаток: <span class="diff">900$</span></div>
                    </div>
                    <div class="input_group">
                        <input type="number" placeholder="Введите количество для разделения" class="countVal"/>
                    </div>
                    <div class="actions">
                        <div class="btn">Разделить</div>
                        <div class="btn_close" onclick="modalAPI.hide()">Отменить</div>
                    </div>`,
            on: (values) => {
                modals["item_split"].off();

                var item = inventoryAPI.getItem(values.itemSqlId);
                if (!item) {
                    modalAPI.hide();
                    return nError(`Предмет для разделения не найден!`);
                }
                $(`.modal .prname`).text(clientStorage.inventoryItems[item.itemId - 1].name);
                var itemIds = [4, 37, 38, 39, 40, 55, 56, 57, 58];
                var index = itemIds.indexOf(item.itemId);
                if (index == -1) {
                    modalAPI.hide();
                    return nError(`Неверный тип предмета для разделения!`);
                }
                var units = ["$", "ед.", "ед.", "шт.", "шт.", "шт.", "шт.", "г.", "г.", "г.", "г."];
                var u = units[index];

                if (item.params.ammo) {
                    var count = item.params.ammo;
                    var newCount = parseInt(item.params.ammo / 2);
                } else {
                    var count = item.params.count;
                    var newCount = parseInt(item.params.count / 2);
                }

                $(".modal .count").text(`${count} ${u}`);
                $(".modal .newCount").text(`- ${newCount} ${u}`);
                $(".modal .countVal").val(newCount);
                $(".modal .diff").text(count - newCount + ` ${u}`);

                var handler = () => {
                    var countVal = parseInt($(".modal .countVal").val().trim());

                    if (isNaN(countVal) || countVal <= 0) return lightTextFieldError(".modal .countVal", `Неверное количество!`);

                    if (countVal >= count)
                        return lightTextFieldError(".modal .countVal", `Не более ${count} !`);
                    if (!isFlood()) {
                        mp.eventCallRemote("item.split", [values.itemSqlId, countVal]);
                        modalAPI.hide();
                    }
                };
                $(".modal .countVal").on("keydown", (e) => {
                    if (e.keyCode == 13) handler();
                });
                $(".modal .btn").on("click", () => {
                    handler();
                });
            },
            off: () => {
                $(".modal .countVal").off("keydown");
                $(".modal .btn").off("click");
                mp.trigger('update.bank.main.open', false);
            },
        },
        "bank_money_take": {
            header: "Вывод средств", // Вывод средств
            location: "center",
            content: `<div class="label">
                        <div class="name">Баланс <a style="color: #FFFFFF;" class="balance_bank"></a></div>
                    </div>
                    <div class="input_group">
                        <input type="text" placeholder="Введите сумму" class="mbank_take"/>
                    </div>
                    <div class="actions">
                        <div class="btn">Вывести</div>
                        <div class="btn_close" onclick="modalAPI.hide()">Отменить</div>
                    </div>`,
            on: (values) => {
                setOnlyInt(".modal .mbank_take");
                var handler = () => {
                    var money = $(".modal .mbank_take").val().trim();
                    mp.trigger("take.bank.money", money);
                };
                $(".modal .balance_bank").text(`$${values.money}`);
                $(".modal .mbank_take").on("keydown", (e) => {
                    if (e.keyCode == 13) handler();
                });
                $(".modal .btn").on("click", () => {
                    handler();
                });
            },
            off: () => {
                $(".modal .btn").off("click");
                mp.trigger('update.bank.main.open', false);
            },
        },
        "bank_money_transfer": {
            header: "Перевод средств", // Вывод средств
            location: "center",
            content: `<div class="label">
                        <div class="name">Баланс <a style="color: #FFFFFF;" class="balance_bank"></a></div>
                    </div>
                    <div class="input_group">
                        <input type="text" placeholder="Введите имя игрока в формате 'Имя Фамилия'" class="mbank_transfer_name"/>
                    </div>
                    <div class="input_group">
                        <input type="text" placeholder="Введите сумму для перевода" class="mbank_transfer"/>
                    </div>
                    <div class="actions">
                        <div class="btn">Перевести</div>
                        <div class="btn_close" onclick="modalAPI.hide()">Отменить</div>
                    </div>`,
            on: (values) => {
                setOnlyInt(".modal .mbank_transfer");
                var handler = () => {
                    var money = $(".modal .mbank_transfer").val().trim();
                    var name = $(".modal .mbank_transfer_name").val().trim();
                    mp.trigger("transfer.bank.money", name, money);
                };
                $(".modal .balance_bank").text(`$${values.money}`);
                $(".modal .mbank_transfer").on("keydown", (e) => {
                    if (e.keyCode == 13) handler();
                });
                $(".modal .mbank_transfer_name").on("keydown", (e) => {
                    if (e.keyCode == 13) handler();
                });
                $(".modal .btn").on("click", () => {
                    handler();
                });
            },
            off: () => {
                $(".modal .btn").off("click");
                mp.trigger('update.bank.main.open', false);
            },
        },
        "bank_money_house_give": {
            header: "Пополнение счёта дома", // Пополнение средств
            location: "center",
            content: `<div class="label">
                        <div class="name">Дом <a class="number_bhouse"></a></div>
                    </div>
                    <div class="label">
                        <div class="name">Баланс счёта: <a style="color: #FFFFFF;" class="balance_bank"></a></div>
                    </div>
                    <div class="label">
                        <div class="name">Баланс счёта дома: <a style="color: #FFFFFF;" class="balance_bank_house"></a></div>
                    </div>
                    <div class="input_group">
                        <input type="text" placeholder="Введите сумму для пополнения" class="mbank_hbank_add"/>
                    </div>
                    <div class="actions">
                        <div class="btn">Пополнить</div>
                        <div class="btn_close" onclick="modalAPI.hide()">Отменить</div>
                    </div>`,
            on: (values) => {
              setOnlyInt(".modal .mbank_hbank_add");
              var handler = () => {
                  var money = $(".modal .mbank_hbank_add").val().trim();
                  mp.trigger("give.bank.money.house", money, values.house);
              };
              $(".modal .balance_bank").text(`$${values.money}`);
              $(".modal .number_bhouse").text(`${values.house}`);
              $(".modal .balance_bank_house").text(`${values.bhouse}`);
              // Оплата за час:<a style="color: #FFFFFF;" class="price_hour"> $40, $50, $60</a><br/><br/>
              // $(".modal .price_hour").text(`${values.hour}`);
              $(".modal .mbank_hbank_add").on("keydown", (e) => {
                  if (e.keyCode == 13) handler();
              });
              $(".modal .btn").on("click", () => {
                  handler();
              });
            },
            off: () => {
                $(".modal .btn").off("click");
                mp.trigger('update.bank.main.open', false);
            },
        },
        "throw_from_vehicle": {
            header: "Выкинуть из транспорта",
            location: "center",
            content: `<div class="label">
                        <div class="name">Количество пассажиров: <a style="color: #FFFFFF;" class="people_count"></a></div>
                    </div>
					<div class="input_group">
                        <input type="text" placeholder="Введите ID игрока" class="idthrow_input"/>
                    </div>
                    <div class="actions">
                        <div class="btn">Выкинуть</div>
                        <div class="btn_close" onclick="modalAPI.hide()">Отменить</div>
                    </div>`,
            on: (values) => {
                setOnlyInt(".modal .idthrow_input");
                var handler = () => {
                    var id = $(".modal .idthrow_input").val().trim();
                    mp.trigger("throw.fromvehicle.withkey", id);
                };
                $(".modal .people_count").text(`${values.count}`);
                $(".modal .idthrow_input").on("keydown", (e) => {
                    if (e.keyCode == 13) handler();
                });
                $(".modal .btn").on("click", () => {
                    handler();
                });
            },
            off: () => {
                $(".modal .btn").off("click");
                mp.trigger('update.bank.main.open', false);
            },
        },
        "bank_money_house_take": {
            header: "Вывод из счёта дома", // Вывод средств
            location: "center",
            content: `<div class="label">
                        <div class="name">Дом <a class="number_bhouse"></a></div>
                    </div>
                    <div class="label">
                        <div class="name">Баланс счёта: <a style="color: #FFFFFF;" class="balance_bank"></a></div>
                    </div>
                    <div class="label">
                        <div class="name">Баланс счёта дома: <a style="color: #FFFFFF;" class="balance_bank_house"></a></div>
                    </div>
                    <div class="input_group">
                        <input type="text" placeholder="Введите сумму" class="mbank_take_house"/>
                    </div>
                    <div class="actions">
                        <div class="btn">Вывести</div>
                        <div class="btn_close" onclick="modalAPI.hide()">Отменить</div>
                    </div>`,
            on: (values) => {
                setOnlyInt(".modal .mbank_take_house");
                var handler = () => {
                    var money = $(".modal .mbank_take_house").val().trim();
                    mp.trigger("take.bank.money.house", money, values.house);
                };
                $(".modal .balance_bank").text(`$${values.money}`);
                $(".modal .number_bhouse").text(`${values.house}`);
                $(".modal .balance_bank_house").text(`${values.bhouse}`);
                $(".modal .mbank_take_house").on("keydown", (e) => {
                    if (e.keyCode == 13) handler();
                });
                $(".modal .btn").on("click", () => {
                    handler();
                });
            },
            off: () => {
                $(".modal .btn").off("click");
                mp.trigger('update.bank.main.open', false);
            },
        },
    };
    window.modalAPI = {
        show: (name, values = null) => {
            var modal = modals[name];
            if (!modal) return;

            modal.name = name;
            window.currentModal = modal;
            $(".modal .header").text(modal.header);
            $(".modal .text").html(modal.content);
            modal.on(JSON.parse(values));

            if (modal.noClose) $(".modal .closemodal").hide();
            else $(".modal .closemodal").show();

            $(".modal").fadeIn("fast");

            var height = Math.abs(parseFloat($(".modal .header").height()) + parseFloat($(".modal .text").height()));
            var marginHeader = parseFloat($(".modal .header").css("margin-top")) * 2.5;
            $(".modal .body").height(height + marginHeader);

            $(".modal input[type='text']").eq(0).focus();
            setCursor(true);
            mp.trigger('setBlockControl', true);
        },
        hide: () => {
            setCursor(false);
            mp.trigger('setBlockControl', false);
            window.currentModal.off();
            window.currentModal = null;
            $(".modal").fadeOut("fast");
        },
        active: () => {
            return $(".modal").css("display") != "none";
        },
    };
});
