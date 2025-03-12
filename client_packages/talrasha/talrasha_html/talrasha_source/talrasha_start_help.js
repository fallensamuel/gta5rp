$(document).ready(() => {
    let goBack_state = 0;

    let listMain_slickStatus = false;
    let listJob_slickStatus = false;

    $("#joblist .dataimages").each(function () {
        $(this).css({
            background: "url(" + $(this).data("src") + ")",
            "background-size": $(this).data("size"),
            "background-position": "center",
            "background-repeat": "no-repeat",
        });
    });

    $('#joblist .btn_slider.left').on('click', function () {
        $('#joblist .list_main').slick('slickPrev');
        $('#joblist .list_job').slick('slickPrev');
    });

    $('#joblist .btn_slider.right').on('click', function () {
        $('#joblist .list_main').slick('slickNext');
        $('#joblist .list_job').slick('slickNext');
    });

    window.start_help = {
        show: () => {
            if ($('#joblist').hasClass('active')) {
                $('#joblist').fadeOut(50, function() {
                    $('#joblist').removeClass('active');

                    //mp.trigger('hidePartOfHud', 4);
                    mp.trigger('update.help.main.open', false);

                    $(document).unbind('keydown', start_help.buttons);
                    start_help.activeMenu = false;
                });
                return;
            }
            else if ($('#helpjob').hasClass('active')) {
                $('#helpjob').fadeOut(50, function() {
                    $('#helpjob').removeClass('active');

                    //mp.trigger('hidePartOfHud', 4);
                    mp.trigger('update.help.main.open', false);

                    $(document).unbind('keydown', start_help.buttons);
                    start_help.activeMenu = false;
                });
                return;
            }

            if (listMain_slickStatus === true) {
                listMain_slickStatus = false;
                $('#joblist .list_main').slick('unslick');
            }

            if (listJob_slickStatus === true) {
                listJob_slickStatus = false;
                $('#joblist .list_job').slick('unslick');
            }
            
            //mp.trigger('hidePartOfHud', 3);

            $('#joblist_main').show();
            $('#joblist_jobs').hide();

            $('#joblist').addClass('active');
            $('#joblist').fadeIn(50);

            $(document).unbind('keydown', start_help.buttons);
            $(document).keydown(start_help.buttons);

            goBack_state = 0;

            start_help.activeMenu = true;
            setCursor(true);

            listMain_slickStatus = true;

            $('#joblist .list_main').slick({
                arrows: false,
                adaptiveHeight: true,
                slidesToShow: 5,
                infinite: false,
                slidesToScroll: 1,
                swipe: false
            });
        },
        buttons: (e) => {
            if (window.start_help.activeMenu == true) {
                if (e.keyCode == 27) { // Esc
                    setCursor(true);

                    if ($('#joblist').hasClass('active')) {
                        $('#joblist').fadeOut(250, function() {
                            $('#joblist').removeClass('active');
        
                            //mp.trigger('hidePartOfHud', 4);
                            mp.trigger('update.help.main.open', false);

                            $(document).unbind('keydown', start_help.buttons);
                            start_help.activeMenu = false;
                            setCursor(false);

                            if (listMain_slickStatus === true) {
                                listMain_slickStatus = false;
                                $('#joblist .list_main').slick('unslick');
                            }
        
                            if (listJob_slickStatus === true) {
                                listJob_slickStatus = false;
                                $('#joblist .list_job').slick('unslick');
                            }
                        });
                        return;
                    }
                    else if ($('#helpjob').hasClass('active')) {
                        $('#helpjob').fadeOut(250, function() {
                            $('#helpjob').removeClass('active');
        
                            //mp.trigger('hidePartOfHud', 4);
                            mp.trigger('update.help.main.open', false);

                            $(document).unbind('keydown', start_help.buttons);
                            start_help.activeMenu = false;
                            setCursor(false);
                        });
                        return;
                    }
                }
            }
        },
        forceHide: () => {
            if ($('#joblist').hasClass('active')) {
                $('#joblist').fadeOut(50, function() {
                    $('#joblist').removeClass('active');

                    //mp.trigger('hidePartOfHud', 4);
                    mp.trigger('update.help.main.open', false);

                    $(document).unbind('keydown', start_help.buttons);
                    start_help.activeMenu = false;

                    if (listMain_slickStatus === true) {
                        listMain_slickStatus = false;
                        $('#joblist .list_main').slick('unslick');
                    }

                    if (listJob_slickStatus === true) {
                        listJob_slickStatus = false;
                        $('#joblist .list_job').slick('unslick');
                    }
                });
                return;
            }
            else if ($('#helpjob').hasClass('active')) {
                $('#helpjob').fadeOut(50, function() {
                    $('#helpjob').removeClass('active');

                    //mp.trigger('hidePartOfHud', 4);
                    mp.trigger('update.help.main.open', false);

                    $(document).unbind('keydown', start_help.buttons);
                    start_help.activeMenu = false;
                });
                return;
            }
        },
        openJobsHelpList: () => {
            $('#joblist_main').hide();
            $('#joblist_jobs').show();

            goBack_state = 1;

            listJob_slickStatus = true;

            $('#joblist .list_job').slick({
                arrows: false,
                adaptiveHeight: true,
                slidesToShow: 5,
                infinite: false,
                slidesToScroll: 1,
                swipe: false
            });
        },
        goBack: () => {
            if (goBack_state == 1) {
                if ($('#helpjob').hasClass('active')) {
                    $('#helpjob').fadeOut(50, function() {
                        $('#helpjob').removeClass('active');
                    });
                }

                if (listMain_slickStatus === true) {
                    listMain_slickStatus = false;
                    $('#joblist .list_main').slick('unslick');
                }

                if (listJob_slickStatus === true) {
                    listJob_slickStatus = false;
                    $('#joblist .list_job').slick('unslick');
                }

                $('#joblist_main').hide();
                $('#joblist_jobs').show();
    
                $('#joblist').addClass('active');
                $('#joblist').fadeIn(50);

                $('#joblist .list_job').slick({
                    arrows: false,
                    adaptiveHeight: true,
                    slidesToShow: 5,
                    infinite: false,
                    slidesToScroll: 1,
                    swipe: false
                });
            } else {
                if ($('#helpjob').hasClass('active')) {
                    $('#helpjob').fadeOut(50, function() {
                        $('#helpjob').removeClass('active');
                    });
                }

                if (listMain_slickStatus === true) {
                    listMain_slickStatus = false;
                    $('#joblist .list_main').slick('unslick');
                }

                if (listJob_slickStatus === true) {
                    listJob_slickStatus = false;
                    $('#joblist .list_job').slick('unslick');
                }

                $('#joblist_main').show();
                $('#joblist_jobs').hide();
    
                $('#joblist').addClass('active');
                $('#joblist').fadeIn(50);

                $('#joblist .list_main').slick({
                    arrows: false,
                    adaptiveHeight: true,
                    slidesToShow: 5,
                    infinite: false,
                    slidesToScroll: 1,
                    swipe: false
                });
            }
        },
        openContent: (state, name, icon, bg) => {
            $("#helpjob .helpjob_content_to_remove").remove();

            if ($('#joblist').hasClass('active')) {
                $('#joblist').fadeOut(50, function() {
                    $('#joblist').removeClass('active');
                });
            }

            $("#helpjob_to_put_div").append(help_content[state]);

            $("#helpjob_info_icon").attr('src', `talrasha_image/talrasha_help_job/talrasha_${icon}.png`);

            $("#helpjob_info_text").text(name);
            $("#helpjob_title_text").text(name);

            $('#helpjob').addClass('active');
            $('#helpjob').fadeIn(50);
            
            setCursor(true);
        },
        openJobContent: (state, name, icon, bg) => {
            $("#helpjob .helpjob_content_to_remove").remove();

            if ($('#joblist').hasClass('active')) {
                $('#joblist').fadeOut(50, function() {
                    $('#joblist').removeClass('active');
                });
            }

            $("#helpjob_to_put_div").append(job_help_content[state]);

            $("#helpjob_info_icon").attr('src', `talrasha_image/talrasha_help_job/talrasha_${icon}.png`);

            $("#helpjob_info_text").text(name);
            $("#helpjob_title_text").text(name);

            $('#helpjob').addClass('active');
            $('#helpjob').fadeIn(50);

            goBack_state = 1;
            
            setCursor(true);
        }
    }

    const help_content = [
        `<p class="helpjob_content_to_remove">
        На нашем сервере присутствует система лицензий.<br>
        Существует шесть видов лицензий.<br>
        На транспортные средства лицензию можно получить в автошколе <img src="talrasha_image/talrasha_help_job/talrasha_auto_school.png" alt=""> – так автошкола выглядит на карте.<br>
        Получить лицензию на нужную вам категорию очень просто. Нужно сдать сначала теоретическую часть, потом практическую. Это не распространяется на морскую и воздушную лицензию. Их достаточно просто купить. Расценки на виды лицензий, которые существуют на сервере такие: Мото – 350$; Легковые – 500$; Грузовые – 2000$; Морской – 10000$; Воздушный – 20000$;<br>
        Пять видов лицензий мы разобрали, осталась ещё одна – лицензия на оружие. Лицензия на оружие нужна чтобы легально покупать и носить оружие. Приобрести её можно только у сотрудников правоохранительных органов в полицейском участке (<img src="talrasha_image/talrasha_help_job/talrasha_lspd.png" alt="">; <img src="talrasha_image/talrasha_help_job/talrasha_sheriff.png" alt="">). Стоимость лицензии выставляет полицейский, который ее выдает.
        </p>`,

        `<p class="helpjob_content_to_remove">
        На нашем проекте есть 6 государственных организаций:
        </p>
        <p class="helpjob_content_to_remove">
        1. Los Santos Medical Service <img src="talrasha_image/talrasha_help_job/talrasha_ems.png" alt=""> - медработники лечат людей от наркозависимости, могут свести татуировку, выдать таблетку или остановить кровотечение. Так же занимаются поставками медикаментов для других гос.структур.
        </p>
        <p class="helpjob_content_to_remove">
        2. Los Santos Police Department <img src="talrasha_image/talrasha_help_job/talrasha_lspd.png" alt=""> - сотрудники департамента отвечают за продажу лицензий на оружие, также сотрудники правоохранительных органов следят за порядком в городе и ловят правонарушителей.
        </p>
        <p class="helpjob_content_to_remove">
        3. Los Santos County Sheriff <img src="talrasha_image/talrasha_help_job/talrasha_sheriff.png" alt=""> - сотрудники правоохранительных органов которые осуществляют свою работу за городом.
        </p>
        <p class="helpjob_content_to_remove">
        4. FIB <img src="talrasha_image/talrasha_help_job/talrasha_fib.png" alt=""> - агенты федерального бюро занимаются особо опасными преступниками. Имеют право завести кейс на подозреваемого значимого сотрудника гос.структуры, например - коррумпированного.
        </p>
        <p class="helpjob_content_to_remove">
        5. Government <img src="talrasha_image/talrasha_help_job/talrasha_gov.png" alt=""> - главная задача сотрудников этой организации - управление штатом. Капитолий занимает одну из самых важных IC составляющих, а пост Губернатора - является одной из самых значимых должностей для жизни штата.
        </p>
        <p class="helpjob_content_to_remove">
        6. Army <img src="talrasha_image/talrasha_help_job/talrasha_army.png" alt=""> - военная база сотрудники которой осуществляют доставку оружейных материалов для других гос.структур, основная задача - охрана спец. объектов. В Армии Вы можете получить военный билет. Не менее важная организация требующая ответственности и полного порядка.
        </p>
        <p class="helpjob_content_to_remove">
        Для любителей острых ощущений на нашем проекте есть группировки гетто - они выполняют множество заданий но захвату/угону и воюют за территории. На досуге выращивают запрещенные средства.
        </p>
        <p class="helpjob_content_to_remove">
        Мафии или же посольства - также выполняют различные задания, воюют за бизнесы,  крышуют. Создают особо опасное оружие.
        </p>`,

        `<p class="helpjob_content_to_remove">
        На проекте присутствуют 12 видов бизнеса:
        </p>
        <p class="helpjob_content_to_remove">
        <b>Магазин 24/7</b> <img src="talrasha_image/talrasha_help_job/talrasha_24_7.png" alt=""> где вы можете приобрести бытовые приборы, продукты, различные инструменты, а также сим карту и бинты для перевязки ран.
        </p>
        <p class="helpjob_content_to_remove">
        <b>LS Customs</b> <img src="talrasha_image/talrasha_help_job/talrasha_lsc.png" alt=""> - место где вы можете улучшить характеристики своего автомобиля за определенную плату.
        </p>
        <p class="helpjob_content_to_remove">
        <b>АЗС</b> <img src="talrasha_image/talrasha_help_job/talrasha_azs.png" alt=""> - место где вы можете заправить свое транспортное средство, а также заправить канистру если она у вас есть.
        </p>
        <p class="helpjob_content_to_remove">
        <b>Барбершоп</b> <img src="talrasha_image/talrasha_help_job/talrasha_barber.png" alt=""> - место где вы можете за определенную плату выбрать новую прическу или бороду, а так же покрасить в цвет который вам по душе.
        </p>
        <p class="helpjob_content_to_remove">
        <b>Магазин масок</b> <img src="talrasha_image/talrasha_help_job/talrasha_masks_shop.png" alt=""> - место где продаются карнавальные маски.
        </p>
        <p class="helpjob_content_to_remove">
        <b>Магазин одежды</b> <img src="talrasha_image/talrasha_help_job/talrasha_clothes_shop.png" alt=""> - место где вы можете приобрести новую одежду, обувь, головной убор, очки.
        </p>
        <p class="helpjob_content_to_remove">
        <b>Оружейный магазин</b> <img src="talrasha_image/talrasha_help_job/talrasha_gun_shop.png" alt=""> - место где продается огнестрельное и холодное оружие для самозащиты.
        </p>
        <p class="helpjob_content_to_remove">
        <b>Тату салон</b> <img src="talrasha_image/talrasha_help_job/talrasha_tattoo.png" alt=""> - место где вы можете набить себе пару новых татуировок.
        </p>
        <p class="helpjob_content_to_remove">
        <b>Ювелирный магазин</b> <img src="talrasha_image/talrasha_help_job/talrasha_uvil.png" alt=""> - место где продаются самые роскошные ювелирные украшения: серьги, цепочки, браслеты и наручные часы.
        </p>
        <p class="helpjob_content_to_remove">
        <b>Unique Auto Salon</b> <img src="talrasha_image/talrasha_help_job/talrasha_unique.png" alt=""> - Автосалон с самыми современными автомобилями. Там вы можете приобрести: Mercedes, Rolls Royce, Bentley, Audi и другие марки автомобилей.   
        </p>
        <p class="helpjob_content_to_remove">
        <b>Автосалон Люкс Класса</b> <img src="talrasha_image/talrasha_help_job/talrasha_luxe.png" alt=""> - место где вы можете приобрести одни из самых быстрых автомобилей в нашем штате.
        </p>
        <p class="helpjob_content_to_remove">
        <b>Автосалон Премиум Класса</b> <img src="talrasha_image/talrasha_help_job/talrasha_premium.png" alt=""> - место где вы можете приобрести шикарные автомобили по умеренным ценам.
        </p>
        <p class="helpjob_content_to_remove">
        <b>Автосалон Эконом Класса</b> <img src="talrasha_image/talrasha_help_job/talrasha_econom.png" alt="">- место где вы можете приобрести автомобили для начала своего пути по нашему штату.
        </p>
        <p class="helpjob_content_to_remove">
        <b>Мотосалон</b> <img src="talrasha_image/talrasha_help_job/talrasha_moto.png" alt=""> - место где вы можете приобрести любой вид мотоцикла от мопеда до самого быстрого в штате.
        </p>`
    ];

    const job_help_content = [
        `<p class="helpjob_content_to_remove">
        <b>Трудоустройство:</b><br>
        Работа доступна с 1 игрового уровня.<br>
        Ферму можно найти на карте. Она обозначена так - <img src="talrasha_image/talrasha_help_job/talrasha_farm_job.png" alt="">;<br>
        По приезду на ферму подходите к NPC и берёте у него рабочую форму.<br>
        Вся основная работа заключена в том, что вы должны срывать кусты хлопка на полях и по итогу сносить их в склад фермы.<br>
        Чтобы сорвать куст, подойдите к нему и нажмите на “Е”. После того как Ваш персонаж взял куст в руки - отнесите его к складу став на красный маркер. Куст автоматически будет положен на склад.<br>
        <b>Зарплата:</b><br>
        На ферме предусмотрен небольшой карьерный рост.<br>
        На первом уровне Ваша заработная плата составит ~ $4.000;<br>
        На втором уровне Ваша заработная плата составит ~ $4.500;<br>
        На третьем уровне Ваша заработная плата составит ~ $5.000.
        </p>`,

        `<p class="helpjob_content_to_remove">
        <b>Трудоустройство:</b><br>
        Работа доступна с 1 игрового уровня.<br>
        Работу лесоруба можно найти на карте. Она обозначена так - <img src="talrasha_image/talrasha_help_job/talrasha_lumberjack_job.png" alt="">;<br>
        По приезду, подходите к NPC и берёте у него рабочую форму.<br>
        Вся основная работа заключена в том, что вы должны рубить деревья и относить брёвна на склад. Чтобы срубить дерево, подойдите к нему и нажмите на “Е”, ствол упадёт на землю, разрубите ствол на более мелкие бревна нажав на “Е”. После того как Ваш персонаж взял бревно в руки - отнесите его к складу став на красный маркер. Бревно автоматически будет положено на склад.<br>
        <b>Зарплата:</b><br>
        На работе лесоруба предусмотрен небольшой карьерный рост.<br>
        На первом уровне Ваша заработная плата составит ~ $4.000;<br>
        На втором уровне Ваша заработная плата составит ~ $4.500;<br>
        На третьем уровне Ваша заработная плата составит ~ $5.000.
        </p>`,

        `<p class="helpjob_content_to_remove">
        <b>Трудоустройство:</b><br>
        Работа доступна с 1 игрового уровня.<br>
        Карьер можно найти на карте. Он обозначен так - <img src="talrasha_image/talrasha_help_job/talrasha_career_job.png" alt="">;<br>
        По приезду на карьер, подходите к NPC и берёте у него рабочую форму.<br>
        Вся основная работа заключена в том, что вы должны добывать камни и относить их на склад. Чтобы добыть камень, подойдите к маркеру и Вы автоматически начнете ломать валун. После того как Ваш персонаж взял камни в руку - отнесите их к складу став на красный маркер. Камень автоматически будет положено на склад.<br>
        <b>Зарплата:</b><br>
        На работе лесоруба предусмотрен небольшой карьерный рост.<br>
        На первом уровне Ваша заработная плата составит ~ $4.000;<br>
        На втором уровне Ваша заработная плата составит ~ $4.500;<br>
        На третьем уровне Ваша заработная плата составит ~ $5.000.        
        </p>`,

        `<p class="helpjob_content_to_remove">
        <b>Трудоустройство:</b><br>
        Работа доступна с 1 игрового уровня.<br>
        Нефтевышку можно найти на карте. Она обозначена так - <img src="talrasha_image/talrasha_help_job/talrasha_oil_tower_job.png" alt="">;<br>
        По приезду, подходите к NPC и берёте у него рабочую форму, и получаете рабочий транспорт.<br>
        Вся основная работа заключена в том, что вы должны ездить по нефтевышкам и ремонтировать их. Чтобы отремонтировать вышку Вам нужно покинуть автомобиль и стать на красный маркер. После починки садитесь в авто и продолжайте движение по следующим точкам.<br>
        <b>Зарплата:</b><br>
        На нефтевышке предусмотрен небольшой карьерный рост.<br>
        На первом уровне Ваша заработная плата составит ~ $4.000;<br>
        На втором уровне Ваша заработная плата составит ~ $4.500;<br>
        На третьем уровне Ваша заработная плата составит ~ $5.000.
        </p>`,

        `<p class="helpjob_content_to_remove">
        <b>Трудоустройство:</b><br>
        Работа доступна с 2 игрового уровня.<br>
        Стройку можно найти на карте. Она обозначена так - <img src="talrasha_image/talrasha_help_job/talrasha_builder_job.png" alt="">;<br>
        По приезду, подходите к NPC и берёте у него рабочую форму.<br>
        Вся основная работа заключена в том, что вы должны выполнять ремонтные работы на стройке. Ваш персонаж автоматически начнет ремонт как только вы подойдете к красному маркеру.<br>
        <b>Зарплата:</b><br>
        За час ваша заработная плата составит ~ $3.500.
        </p>`,

        `<p class="helpjob_content_to_remove">
        <b>Трудоустройство:</b><br>
        Работа доступна с 2 игрового уровня.<br>
        Птицефабрику можно найти на карте. Она обозначена так - <img src="talrasha_image/talrasha_help_job/talrasha_butcher_job.png" alt="">;<br>
        По приезду, подходите к NPC и берёте у него рабочую форму.<br>
        Вся основная работа заключена в том, что вы должны подходить к разным маркерам и выполнять мини-игры в виде выбора буков.<br>
        <b>Зарплата:</b><br>
        За час ваша заработная плата составит ~ $3.500.
        </p>`,

        `<p class="helpjob_content_to_remove">
        <b>Трудоустройство:</b><br>
        Работа доступна с 2 игрового уровня.<br>
        Газонокосилку можно найти на карте. Она обозначена так - <img src="talrasha_image/talrasha_help_job/talrasha_lawnmover_job.png" alt="">;<br>
        По приезду, подходите к NPC и берёте у него рабочую форму, и рабочий транспорт.<br>
        Вся основная работа заключена в том, что вы должны ездить на газонокосилке по маркерам.<br>
        <b>Зарплата:</b><br>
        За час ваша заработная плата составит ~ $3.500.
        </p>`,

        `<p class="helpjob_content_to_remove">
        <b>Трудоустройство:</b><br>
        Работа доступна с 3 игрового уровня.<br>
        Почту можно найти на карте. Она обозначена так - <img src="talrasha_image/talrasha_help_job/talrasha_postal_job.png" alt="">;<br>
        По приезду, подходите к NPC и берёте у него рабочую форму и транспорт.<br>
        Вся основная работа заключена в том, что вы должны Развозить посылки по домам.<br>
        Для получения заказа нажмите “J” и выберите доступный для вас заказ.<br>
        <b>Зарплата:</b><br>
        За час ваша заработная плата составит ~ $4.000.
        </p>`,

        `<p class="helpjob_content_to_remove">
        <b>Трудоустройство:</b><br>
        Работа доступна с 3 игрового уровня.<br>
        Таксопарк можно найти на карте. Он обозначен так - <img src="talrasha_image/talrasha_help_job/talrasha_taxi_job.png" alt="">;<br>
        По приезду, подходите к NPC и берёте у него ключи от рабочего автомобиля.<br>
        Вся основная работа заключена в том, что вы должны принимать клиентов и отвозить их до конечной точки заказа. Сев в машину Вы можете открыть список актуальных заказов нажав на кнопку “J”.<br>
        <b>Зарплата:</b><br>
        За 1 км ваша заработная плата составит - $60.
        </p>`,

        `<p class="helpjob_content_to_remove">
        <b>Трудоустройство:</b><br>
        Работа доступна с 3 игрового уровня.<br>
        Автобусное депо можно найти на карте. Оно обозначено так - <img src="talrasha_image/talrasha_help_job/talrasha_bus_job.png" alt="">;<br>
        По приезду, подходите к NPC и берёте у него ключи от рабочего автомобиля.<br>
        Вся основная работа заключена в том, что вы должны ездить по маркерам которые находятся рядом с автобусными остановками.<br>
        <b>Зарплата:</b><br>
        За час ваша заработная плата составит ~ $6.000.
        </p>`,

        `<p class="helpjob_content_to_remove">
        <b>Трудоустройство:</b><br>
        Работа доступна с 4 игрового уровня.<br>
        Для работы нужно 2 человека.<br>
        Офис инкассатора можно найти на карте. Он обозначен так - <img src="talrasha_image/talrasha_help_job/talrasha_collector_job.png" alt="">;<br>
        По приезду, подходите к NPC и заходите оба в одно лобби, вам выдают рабочий транспорт. Один водитель, второй разносчик денежных средств по банкоматам. Вся основная работа заключена в том, что вы должны ездить по маркерам которые находятся рядом с банкоматами и разносить деньги.<br>
        <b>Зарплата:</b><br>
        За час ваша заработная плата составит ~ $10.000.
        </p>`,

        `<p class="helpjob_content_to_remove">
        <b>Трудоустройство:</b><br>
        Работа доступна с 4 игрового уровня.<br>
        Гараж механика можно найти на карте. Он обозначено так - <img src="talrasha_image/talrasha_help_job/talrasha_mech_job.png" alt="">;<br>
        По приезду, подходите к NPC и берёте у него ключи от рабочего автомобиля.<br>
        Вся основная работа заключена в том, что вы должны ездить по городу и заправлять/ремонтировать автомобили которые в этом нуждаются.<br>
        Так же механик может чинить замки в домах после взлома.<br>
        <b>Зарплата:</b><br>
        Вы сами выставляете сумму за заправку/ремонт автомобилей.<br>
        Зарплата зависит от количества заправленных/отремонтированных автомобилей.
        </p>`,

        `<p class="helpjob_content_to_remove">
        <b>Трудоустройство:</b><br>
        Работа доступна с 5 игрового уровня.<br>
        Стоянку дальнобойщиков можно найти на карте. Оно обозначено так - <img src="talrasha_image/talrasha_help_job/talrasha_trucker_job.png" alt="">;<br>
        По приезду, подходите к NPC и берёте у него ключи от рабочего автомобиля.<br>
        Вся основная работа заключена в том, что вы должны развозить заказы от компаний и завозить материалы в бизнес.<br>
        <b>Зарплата:</b><br>
        Зарплата зависит от количества выполненных заказов.
        </p>`
    ];
});