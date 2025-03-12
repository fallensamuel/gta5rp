$(document).ready(() => {
    window.playerMenu = new Vue({
    	el: "#main-menu",
        data: {
            currentPage: false,
            currentShopPage: 1,

            cars: [],
            houses: [],
            bizes: [],

            cash: 0,
            bank: 0,
            donate: 0,
            factionName: '',
            factionRankName: '',
            factionRankPay: '',
            name: '',
            level: 0,
            sqlId: '',
            registration: '',
            hours: '',
            regDate: '',
            lastDate: '',
            licenses: [],
            reportType: "Вопрос",


            done: 0,
            reports: [],
            messages: [],

            currentReport: false,
            reportText: '',
			focused: false,
			
			activeSlotsPrizes: [
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/astondb11.png', color: 'purple'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/vulcan.png', color: 'purple'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/senna.png', color: 'purple'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/lambsc18.png', color: 'purple'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/veneno.png', color: 'purple'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/wald2018.png', color: 'purple'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/g63.png', color: 'purple'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/fordraptor.png', color: 'purple'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/2019M5.png', color: 'purple'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/cayen19.png', color: 'purple'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/rrover17.png', color: 'purple'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/x5e53.png', color: 'purple'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/lc200.png', color: 'purple'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/tahoe1.png', color: 'purple'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/giulia.png', color: 'purple'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/fireblade.png', color: 'purple'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/maseratigt.png', color: 'purple'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/escalade19.png', color: 'purple'},
			
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/m5e60.png', color: 'cargreen'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/w140.png', color: 'cargreen'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/cls08.png', color: 'cargreen'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/evo9.png', color: 'cargreen'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/e55.png', color: 'cargreen'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/gtr33.png', color: 'cargreen'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/gtr34.png', color: 'cargreen'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/camry70.png', color: 'cargreen'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/mustang65.png', color: 'cargreen'},
			
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/impreza98.png', color: 'darkorange'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/cam08.png', color: 'darkorange'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/revolter.png', color: 'darkorange'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/bobcatxl.png', color: 'darkorange'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/s13.png', color: 'darkorange'},
			
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/sultan.png', color: 'blueblue'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/buffalo3.png', color: 'blueblue'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/f620.png', color: 'blueblue'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/golf1.png', color: 'blueblue'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/bmwe38.png', color: 'blueblue'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/bmwe34.png', color: 'blueblue'},
			
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/talrasha_money.png', color: 'green'},
			
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/bodhi2.png', color: 'darkblue'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/rebel2.png', color: 'darkblue'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/savestra.png', color: 'darkblue'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/blade.png', color: 'darkblue'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/seminole.png', color: 'darkblue'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/stalion.png', color: 'darkblue'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/oracle.png', color: 'darkblue'},
			
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/talrasha_vip.png', color: 'orange'},
			
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/surge.png', color: 'teal'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/primo.png', color: 'teal'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/stanier.png', color: 'teal'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/picador.png', color: 'teal'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/minivan.png', color: 'teal'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/enduro.png', color: 'teal'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/sovereign.png', color: 'teal'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/ingot.png', color: 'teal'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/emperor.png', color: 'teal'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/asea.png', color: 'teal'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/dukes.png', color: 'teal'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/rancherxl.png', color: 'teal'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/blista.png', color: 'teal'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/radi.png', color: 'teal'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/manchez.png', color: 'teal'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/talrasha_donate.png', color: 'talrashadonate'}
			],
			
			activeSlotsPrizesGold: [
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/phuayra.png', color: 'purple'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/veyron.png', color: 'purple'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/exp100.png', color: 'purple'},
			
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/jesko.png', color: 'yellow'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/regera.png', color: 'yellow'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/agerars.png', color: 'yellow'},
			
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/rrwraith.png', color: 'darkorange'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/rrghost.png', color: 'darkorange'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/huracan.png', color: 'darkorange'},
			
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/bmwg05.png', color: 'blueblue'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/panamera.png', color: 'blueblue'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/mclaren20.png', color: 'blueblue'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/mc720s.png', color: 'blueblue'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/mustang19.png', color: 'blueblue'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/gtr17.png', color: 'blueblue'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/c63s.png', color: 'blueblue'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/jeep15.png', color: 'blueblue'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/bmwz4.png', color: 'blueblue'},
			
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/bmwe70.png', color: 'darkorange'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/cls08.png', color: 'darkorange'},
			
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/350z.png', color: 'darkblue'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/evo6.png', color: 'darkblue'},
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/ae86.png', color: 'darkblue'},
			
			this.activeSlotsPrizes = {img: 'talrasha_image/talrasha_main_menu/roulette/talrasha_vip.png', color: 'orange'},
			
			this.activeSlotsPrizesGold = {img: 'talrasha_image/talrasha_main_menu/roulette/ruffian.png', color: 'darkblue'},
			this.activeSlotsPrizesGold = {img: 'talrasha_image/talrasha_main_menu/roulette/baller.png', color: 'darkblue'},
			this.activeSlotsPrizesGold = {img: 'talrasha_image/talrasha_main_menu/roulette/stalion.png', color: 'darkblue'},
			this.activeSlotsPrizesGold = {img: 'talrasha_image/talrasha_main_menu/roulette/asterope.png', color: 'darkblue'},
			this.activeSlotsPrizesGold = {img: 'talrasha_image/talrasha_main_menu/roulette/carbonrs.png', color: 'darkblue'},
			this.activeSlotsPrizesGold = {img: 'talrasha_image/talrasha_main_menu/roulette/zombieb.png', color: 'darkblue'},
			this.activeSlotsPrizesGold = {img: 'talrasha_image/talrasha_main_menu/roulette/avarus.png', color: 'darkblue'},
			this.activeSlotsPrizesGold = {img: 'talrasha_image/talrasha_main_menu/roulette/defiler.png', color: 'darkblue'},
			this.activeSlotsPrizesGold = {img: 'talrasha_image/talrasha_main_menu/roulette/seminole.png', color: 'darkblue'},
			
			this.activeSlotsPrizesGold = {img: 'talrasha_image/talrasha_main_menu/roulette/talrasha_donate.png', color: 'talrashadonate'},
			
			this.activeSlotsPrizesGold = {img: 'talrasha_image/talrasha_main_menu/roulette/talrasha_money.png', color: 'green'}
			],
			
            rouletteCars: ['manchez', 'radi', 'blista', 'rancherxl', 'dukes', 'asea', 'emperor', 'ingot', 'sovereign', 'enduro', 'minivan', 'picador', 'stanier', 'primo', 'surge'],
			rouletteCarsDarkBlue: ['oracle', 'stalion', 'seminole', 'blade', 'savestra', 'rebel2', 'bodhi2'],
			rouletteCarsBlue: ['bmwe34', 'bmwe38', 'golf1', 'f620', 'buffalo3', 'sultan'],
			rouletteCarsOrange: ['s13', 'bobcatxl', 'revolter', 'cam08', 'impreza98'],
			rouletteCarsGreen: ['mustang65', 'camry70', 'gtr34', 'gtr33', 'e55', 'evo9', 'cls08', 'w140', 'm5e60'],
            rouletteDonateCars: ['escalade19', 'maseratigt', 'fireblade', 'giulia', 'tahoe1', 'lc200', 'x5e53', 'rrover17', 'cayen19', '2019M5', 'fordraptor', 'g63', 'wald2018', 'veneno', 'lambsc18', 'senna', 'vulcan', 'astondb11'],
			
			rouletteCarsGold: ['seminole', 'defiler', 'avarus', 'zombieb', 'carbonrs', 'asterope', 'stalion', 'baller', 'ruffian'],
			rouletteCarsDarkBlueGold: ['ae86', 'evo6', '350z'],
			rouletteCarsDarkOrangeGold: ['cls08', 'bmwe70'],
			rouletteCarsBlueGold: ['bmwz4', 'jeep15', 'c63s', 'gtr17', 'mustang19', 'mc720s', 'mclaren20', 'panamera', 'bmwg05'],
			rouletteCarsDarkOrangeTwoGold: ['huracan', 'rrghost', 'rrwraith'],
			rouletteCarsYellowGold: ['agerars', 'regera', 'jesko'],
			rouletteDonateCarsGold: ['exp100', 'veyron', 'phuayra'],
			
			rouletteRandom: ['11.7', '11.3', '11.0', '10.7', '10.4', '10.1'],

            stage: 1,
            open: false,
            activeSlots: [],
            phoneNumber: '',
            plateNumber: '',

            firstName: '',
            secondName: '',
            showErrorNames: false,

            prizes: [],

            dcacrs: {
                'fc15': 30000,
                'gt17': 30000,
                'agerars': 90000,
                '675lt': 30000,
                'models': 30000,
                'exige12': 90000,
                'g63': 10000,
                'merc6x6': 30000,
                'gt63s': 30000,
                'panamera': 60000,
                'bentayga': 50000,
                'bentley20': 50000,
                'carrera19': 40000,
                'cayen19': 20000,
                '718caymans': 30000,
                'chiron': 40000,
                'veyron': 30000,
                'rrwraith': 30000,
                'urus': 30000,
            }, 
            nprices: [0, 35000, 30000, 25000, 20000, 15000, 10000, 5000],

            vipprices: {
                10000: 100,
                50000: 500,
                200000: 2000,
                500000: 5000,
                2000000: 20000,
                10000000: 100000,
            },
        },
        methods: {
            validateName: function(first, name) {
                const cyrillicPattern = /[а-яё]/i;

                if (cyrillicPattern.test(name)) this.showErrorNames = true;
                else this.showErrorNames = false;

                if (first) {
                    this.firstName = name
                }
                else {
                    this.secondName = name
                }
            },
            generatePrice: function() {
                var words = this.phoneNumber.length;
                return this.nprices[words] || 0
            },
            deletePrize: function(id) {
                this.prizes.splice(id, 1);
            },
            convertNameToLabel: function(name, count) {
                if (name == 'moneygreen') {
                   return `Игровые деньги: ${count}$`
                }
                else if (name == 'moneyyellow') {
                    return `Игровые деньги: ${count}$`
                }
                else if (name == 'vip') {
                    return `Вип`
                }
                else if (name == 'lrp') {
                    return `LRP: ${count}`
                }
                else if (name == 'car') {
                    return `Машина: ${count}`
                }
				else if (name == 'cardarkblue') {
                    return `Машина: ${count}`
                }
				else if (name == 'carblue') {
                    return `Машина: ${count}`
                }
				else if (name == 'carorange') {
                    return `Машина: ${count}`
                }
				else if (name == 'cargreen') {
                    return `Машина: ${count}`
                }
                else if (name == 'donatecarsilver') {
                    return `Машина: ${count}`
                }
				else if (name == 'moneygreengold') {
                   return `Игровые деньги: ${count}$`
                }
                else if (name == 'moneyyellowgold') {
                    return `Игровые деньги: ${count}$`
                }
                else if (name == 'vipgold') {
                    return `Вип`
                }
                else if (name == 'lrpgold') {
                    return `LRP: ${count}`
                }
				else if (name == 'cargold') {
                    return `Машина: ${count}`
                }
				else if (name == 'cardarkbluegold') {
                    return `Машина: ${count}`
                }
				else if (name == 'cardarkorangegold') {
                    return `Машина: ${count}`
                }
				else if (name == 'carbluebluegold') {
                    return `Машина: ${count}`
                }
				else if (name == 'cardarkorangetwogold') {
                    return `Машина: ${count}`
                }
				else if (name == 'caryellow') {
                    return `Машина: ${count}`
                }
				else if (name == 'donatecargold') {
                    return `Машина: ${count}`
                }
            },
            scrollTo: function(fast, type, car) {
                if (type == 'moneygreen') {
                   this.activeSlots[this.activeSlots.length - 3] = {img: 'talrasha_image/talrasha_main_menu/roulette/talrasha_money.png', color: 'green'}
                }
                else if (type == 'moneyyellow') {
                    this.activeSlots[this.activeSlots.length - 3] = {img: 'talrasha_image/talrasha_main_menu/roulette/talrasha_money.png', color: 'yellow'}
                }
                /*else if (type == 'license') {
                    this.activeSlots[this.activeSlots.length - 3] = {img: 'talrasha_image/talrasha_main_menu/roulette/license.png', color: 'purple'}
                }*/
                else if (type == 'vip') {
                    this.activeSlots[this.activeSlots.length - 3] = {img: 'talrasha_image/talrasha_main_menu/roulette/talrasha_vip.png', color: 'orange'}
                }
                else if (type == 'lrp') {
                    this.activeSlots[this.activeSlots.length - 3] = {img: 'talrasha_image/talrasha_main_menu/roulette/talrasha_donate.png', color: 'talrashadonate'}
                }
                else if (type == 'car') {
                    this.activeSlots[this.activeSlots.length - 3] = {img: `talrasha_image/talrasha_main_menu/roulette/${car}.png`, color: 'teal'}
                }
				else if (type == 'cardarkblue') {
                    this.activeSlots[this.activeSlots.length - 3] = {img: `talrasha_image/talrasha_main_menu/roulette/${car}.png`, color: 'darkblue'}
                }
				else if (type == 'carblue') {
                    this.activeSlots[this.activeSlots.length - 3] = {img: `talrasha_image/talrasha_main_menu/roulette/${car}.png`, color: 'blueblue'}
                }
				else if (type == 'carorange') {
                    this.activeSlots[this.activeSlots.length - 3] = {img: `talrasha_image/talrasha_main_menu/roulette/${car}.png`, color: 'darkorange'}
                }
				else if (type == 'cargreen') {
                    this.activeSlots[this.activeSlots.length - 3] = {img: `talrasha_image/talrasha_main_menu/roulette/${car}.png`, color: 'cargreen'}
                }
                else if (type == 'donatecarsilver') {
                    this.activeSlots[this.activeSlots.length - 3] = {img: `talrasha_image/talrasha_main_menu/roulette/${car}.png`, color: 'purple'}
                }

                this.prizes.push({prize: type, count: car ? car : 0})
				
                playerMenu.$forceUpdate();
                var parent = $('#main-menu .shop-menu .shop-content-roulette .roulette .items')[0].scrollWidth
				var random = this.getRandom()
				var del = 100 * random
                if (!fast) enableSoundStart('talrasha_roulette.mp3', 0.15);
                $('#main-menu .shop-menu .shop-content-roulette .roulette .items').animate({
                    right: parent - del
                }, fast ? 0 : 14735.67123, "easeOutCirc",
                function() {
                    //enableSoundStart('talrasha_win.mp3', 0.1);
                    if (type == 'donatecarsilver') {
                        playerMenu.prizes[playerMenu.prizes.length - 1].showDonateCarSilver = true
                    }
					else if (type == 'moneygreen') {
                        playerMenu.prizes[playerMenu.prizes.length - 1].showMoneyGreenSilver = true
                    }
					else if (type == 'moneyyellow') {
                        playerMenu.prizes[playerMenu.prizes.length - 1].showMoneyYellowSilver = true
                    }
					else if (type == 'vip') {
                        playerMenu.prizes[playerMenu.prizes.length - 1].showVipSilver = true
                    }
					else if (type == 'lrp') {
                        playerMenu.prizes[playerMenu.prizes.length - 1].showLrpSilver = true
                    }
					else if (type == 'car') {
                        playerMenu.prizes[playerMenu.prizes.length - 1].showCarSilver = true
                    }
					else if (type == 'cardarkblue') {
                        playerMenu.prizes[playerMenu.prizes.length - 1].showCarDarkBlue = true
                    }
					else if (type == 'carblue') {
                        playerMenu.prizes[playerMenu.prizes.length - 1].showCarBlue = true
                    }
					else if (type == 'carorange') {
                        playerMenu.prizes[playerMenu.prizes.length - 1].showCarOrange = true
                    }
					else if (type == 'cargreen') {
                        playerMenu.prizes[playerMenu.prizes.length - 1].showCarGreen = true
                    }
                    playerMenu.addSlotsInRoulette()
                });
            },
			scrollToGold: function(fast, type, car) {
                if (type == 'moneygreengold') {
                   this.activeSlots[this.activeSlots.length - 3] = {img: 'talrasha_image/talrasha_main_menu/roulette/talrasha_money.png', color: 'green'}
                }
                else if (type == 'moneyyellowgold') {
                    this.activeSlots[this.activeSlots.length - 3] = {img: 'talrasha_image/talrasha_main_menu/roulette/talrasha_money.png', color: 'yellow'}
                }
                /*else if (type == 'license') {
                    this.activeSlots[this.activeSlots.length - 3] = {img: 'talrasha_image/talrasha_main_menu/roulette/license.png', color: 'purple'}
                }*/
                else if (type == 'vipgold') {
                    this.activeSlots[this.activeSlots.length - 3] = {img: 'talrasha_image/talrasha_main_menu/roulette/talrasha_vip.png', color: 'orange'}
                }
                else if (type == 'lrpgold') {
                    this.activeSlots[this.activeSlots.length - 3] = {img: 'talrasha_image/talrasha_main_menu/roulette/talrasha_donate.png', color: 'talrashadonate'}
                }
                else if (type == 'cargold') {
                    this.activeSlots[this.activeSlots.length - 3] = {img: `talrasha_image/talrasha_main_menu/roulette/${car}.png`, color: 'darkblue'}
                }
				else if (type == 'cardarkbluegold') {
                    this.activeSlots[this.activeSlots.length - 3] = {img: `talrasha_image/talrasha_main_menu/roulette/${car}.png`, color: 'darkblue'}
                }
				else if (type == 'cardarkorangegold') {
                    this.activeSlots[this.activeSlots.length - 3] = {img: `talrasha_image/talrasha_main_menu/roulette/${car}.png`, color: 'darkorange'}
                }
				else if (type == 'carbluebluegold') {
                    this.activeSlots[this.activeSlots.length - 3] = {img: `talrasha_image/talrasha_main_menu/roulette/${car}.png`, color: 'blueblue'}
                }
				else if (type == 'cardarkorangetwogold') {
                    this.activeSlots[this.activeSlots.length - 3] = {img: `talrasha_image/talrasha_main_menu/roulette/${car}.png`, color: 'darkorange'}
                }
				else if (type == 'caryellow') {
                    this.activeSlots[this.activeSlots.length - 3] = {img: `talrasha_image/talrasha_main_menu/roulette/${car}.png`, color: 'yellowcar'}
                }
                else if (type == 'donatecargold') {
                    this.activeSlots[this.activeSlots.length - 3] = {img: `talrasha_image/talrasha_main_menu/roulette/${car}.png`, color: 'purple'}
                }

                this.prizes.push({prize: type, count: car ? car : 0})
				
                playerMenu.$forceUpdate();
                var parent = $('#main-menu .shop-menu .shop-content-roulette .roulette .items')[0].scrollWidth
				var random = this.getRandom()
				var del = 100 * random
                if (!fast) enableSoundStart('talrasha_roulette.mp3', 0.15);
                $('#main-menu .shop-menu .shop-content-roulette .roulette .items').animate({
                    right: parent - del
                }, fast ? 0 : 14735.67123, "easeOutCirc",
                function() {
                    //enableSoundStart('talrasha_win.mp3', 0.1);
                    if (type == 'donatecargold') {
                        playerMenu.prizes[playerMenu.prizes.length - 1].showDonateCarGold = true
                    }
					else if (type == 'moneygreengold') {
                        playerMenu.prizes[playerMenu.prizes.length - 1].showMoneyGreenGold = true
                    }
					else if (type == 'moneyyellowgold') {
                        playerMenu.prizes[playerMenu.prizes.length - 1].showMoneyYellowGold = true
                    }
					else if (type == 'vipgold') {
                        playerMenu.prizes[playerMenu.prizes.length - 1].showVipGold = true
                    }
					else if (type == 'lrpgold') {
                        playerMenu.prizes[playerMenu.prizes.length - 1].showLrpGold = true
                    }
					else if (type == 'cargold') {
                        playerMenu.prizes[playerMenu.prizes.length - 1].showCarGold = true
                    }
					else if (type == 'cardarkbluegold') {
                        playerMenu.prizes[playerMenu.prizes.length - 1].showCarDarkBlueGold = true
                    }
					else if (type == 'cardarkorangegold') {
                        playerMenu.prizes[playerMenu.prizes.length - 1].showCarDarkOrangeGold = true
                    }
					else if (type == 'carbluebluegold') {
                        playerMenu.prizes[playerMenu.prizes.length - 1].showCarBlueBlueGold = true
                    }
					else if (type == 'cardarkorangetwogold') {
                        playerMenu.prizes[playerMenu.prizes.length - 1].showCarDarkOrangeTwoGold = true
                    }
					else if (type == 'caryellow') {
                        playerMenu.prizes[playerMenu.prizes.length - 1].showCarYellowGold = true
                    }
                    playerMenu.addSlotsInRouletteGold()
                });
            },
			getRandom: function() {
				return this.rouletteRandom[Math.floor(Math.random()*this.rouletteRandom.length)];
			},
            noMoney: function() {
                this.open = false
                enableSoundStart('talrasha_no_lrp.mp3', 0.1);
            },
            setRoulettePrizes: function(prizes) {
                this.prizes = JSON.parse(prizes)
            },
            addSlotsInRoulette: function() {
                this.generateRandomRoulette()
                this.open = false
            },
			addSlotsInRouletteGold: function() {
                this.generateRandomRouletteGold()
                this.open = false
            },
            spinRoulette: function(fast) {
                if (this.open) return;
                this.open = true
                mp.trigger("events.callRemote", "roulette.open", fast);
            },
			spinRouletteGold: function(fast) {
                if (this.open) return;
                this.open = true
                mp.trigger("events.callRemote", "roulettegold.open", fast);
            },
            getRandomCar: function(donate) {
                if (donate) return this.rouletteDonateCars[Math.floor(Math.random()*this.rouletteDonateCars.length)];
                else return this.rouletteCars[Math.floor(Math.random()*this.rouletteCars.length)];
            },
			getRandomCarDarkBlue: function(donate) {
                return this.rouletteCarsDarkBlue[Math.floor(Math.random()*this.rouletteCarsDarkBlue.length)];
            },
			getRandomCarBlue: function(donate) {
                return this.rouletteCarsBlue[Math.floor(Math.random()*this.rouletteCarsBlue.length)];
            },
			getRandomCarOrange: function(donate) {
                return this.rouletteCarsOrange[Math.floor(Math.random()*this.rouletteCarsOrange.length)];
            },
			getRandomCarGreen: function(donate) {
                return this.rouletteCarsGreen[Math.floor(Math.random()*this.rouletteCarsGreen.length)];
            },
			getRandomCarGold: function(donate) {
                if (donate) return this.rouletteDonateCarsGold[Math.floor(Math.random()*this.rouletteDonateCarsGold.length)];
                else return this.rouletteCarsGold[Math.floor(Math.random()*this.rouletteCarsGold.length)];
            },
			getRandomCarDarkBlueGold: function(donate) {
                return this.rouletteCarsDarkBlueGold[Math.floor(Math.random()*this.rouletteCarsDarkBlueGold.length)];
            },
			getRandomCarDarkOrangeGold: function(donate) {
                return this.rouletteCarsDarkOrangeGold[Math.floor(Math.random()*this.rouletteCarsDarkOrangeGold.length)];
            },
			getRandomCarBlueGold: function(donate) {
                return this.rouletteCarsBlueGold[Math.floor(Math.random()*this.rouletteCarsBlueGold.length)];
            },
			getRandomCarDarkOrangeTwoGold: function(donate) {
                return this.rouletteCarsDarkOrangeTwoGold[Math.floor(Math.random()*this.rouletteCarsDarkOrangeTwoGold.length)];
            },
			getRandomCarYellowGold: function(donate) {
                return this.rouletteCarsYellowGold[Math.floor(Math.random()*this.rouletteCarsYellowGold.length)];
            },
            shuffle: function(array) {
              var currentIndex = array.length, temporaryValue, randomIndex;

              while (0 !== currentIndex) {

                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
              }

            },
            openRoulette: function() {
                this.activeSlots = []
                this.open = false
                this.generateRandomRoulette()
                this.currentShopPage = 2
            },
			openRouletteGold: function() {
                this.activeSlots = []
                this.open = false
                this.generateRandomRouletteGold()
                this.currentShopPage = 11
            },
            generateRandomRoulette: function() {
                var slots = []

                for (var i = 0; i < this.stage; i++) {

                    for (var moneygreen = 0; moneygreen < 14; moneygreen++) {
                        slots.push({img: 'talrasha_image/talrasha_main_menu/roulette/talrasha_money.png', color: 'green'})
                    }

                    for (var moneyyellow = 0; moneyyellow < 4; moneyyellow++) {
                        slots.push({img: 'talrasha_image/talrasha_main_menu/roulette/talrasha_money.png', color: 'yellow'})
                    }

                    for (var vip = 0; vip < 2; vip++) {
                        slots.push({img: 'talrasha_image/talrasha_main_menu/roulette/talrasha_vip.png', color: 'orange'})
                    }

                    for (var lrp = 0; lrp < 16; lrp++) {
                        slots.push({img: 'talrasha_image/talrasha_main_menu/roulette/talrasha_donate.png', color: 'talrashadonate'})
                    }

                    for (var car = 0; car < 18; car++) {
                        var random = this.getRandomCar(false)
                        slots.push({img: `talrasha_image/talrasha_main_menu/roulette/${random}.png`, color: 'teal'})
                    }
					
					for (var cardarkblue = 0; cardarkblue < 6; cardarkblue++) {
                        var random = this.getRandomCarDarkBlue(false)
                        slots.push({img: `talrasha_image/talrasha_main_menu/roulette/${random}.png`, color: 'darkblue'})
                    }
					
					for (var carblue = 0; carblue < 6; carblue++) {
                        var random = this.getRandomCarBlue(false)
                        slots.push({img: `talrasha_image/talrasha_main_menu/roulette/${random}.png`, color: 'blueblue'})
                    }
					
					for (var carorange = 0; carorange < 1; carorange++) {
                        var random = this.getRandomCarOrange(false)
                        slots.push({img: `talrasha_image/talrasha_main_menu/roulette/${random}.png`, color: 'darkorange'})
                    }
					
					for (var cargreen = 0; cargreen < 6; cargreen++) {
                        var random = this.getRandomCarGreen(false)
                        slots.push({img: `talrasha_image/talrasha_main_menu/roulette/${random}.png`, color: 'cargreen'})
                    }

                    for (var donatecarsilver = 0; donatecarsilver < 8; donatecarsilver++) {
                        var random = this.getRandomCar(true)
                        slots.push({img: `talrasha_image/talrasha_main_menu/roulette/${random}.png`, color: 'purple'})
                    }

                }

                this.shuffle(slots)
                this.activeSlots = this.activeSlots.concat(slots)
            },
			generateRandomRouletteGold: function() {
                var slots = []

                for (var i = 0; i < this.stage; i++) {

                    for (var moneygreengold = 0; moneygreengold < 14; moneygreengold++) {
                        slots.push({img: 'talrasha_image/talrasha_main_menu/roulette/talrasha_money.png', color: 'green'})
                    }

                    for (var moneyyellowgold = 0; moneyyellowgold < 4; moneyyellowgold++) {
                        slots.push({img: 'talrasha_image/talrasha_main_menu/roulette/talrasha_money.png', color: 'yellow'})
                    }

                    for (var vipgold = 0; vipgold < 2; vipgold++) {
                        slots.push({img: 'talrasha_image/talrasha_main_menu/roulette/talrasha_vip.png', color: 'orange'})
                    }

                    for (var lrpgold = 0; lrpgold < 16; lrpgold++) {
                        slots.push({img: 'talrasha_image/talrasha_main_menu/roulette/talrasha_donate.png', color: 'talrashadonate'})
                    }

                    for (var cargold = 0; cargold < 12; cargold++) {
                        var random = this.getRandomCarGold(false)
                        slots.push({img: `talrasha_image/talrasha_main_menu/roulette/${random}.png`, color: 'darkblue'})
                    }
					
					for (var cardarkbluegold = 0; cardarkbluegold < 6; cardarkbluegold++) {
                        var random = this.getRandomCarDarkBlueGold(false)
                        slots.push({img: `talrasha_image/talrasha_main_menu/roulette/${random}.png`, color: 'darkblue'})
                    }
					
					for (var cardarkorangegold = 0; cardarkorangegold < 6; cardarkorangegold++) {
                        var random = this.getRandomCarDarkOrangeGold(false)
                        slots.push({img: `talrasha_image/talrasha_main_menu/roulette/${random}.png`, color: 'darkorange'})
                    }
					
					for (var carbluebluegold = 0; carbluebluegold < 6; carbluebluegold++) {
                        var random = this.getRandomCarBlueGold(false)
                        slots.push({img: `talrasha_image/talrasha_main_menu/roulette/${random}.png`, color: 'blueblue'})
                    }
					
					for (var cardarkorangetwogold = 0; cardarkorangetwogold < 1; cardarkorangetwogold++) {
                        var random = this.getRandomCarDarkOrangeTwoGold(false)
                        slots.push({img: `talrasha_image/talrasha_main_menu/roulette/${random}.png`, color: 'darkorange'})
                    }
					
					for (var caryellow = 0; caryellow < 6; caryellow++) {
                        var random = this.getRandomCarYellowGold(false)
                        slots.push({img: `talrasha_image/talrasha_main_menu/roulette/${random}.png`, color: 'yellowcar'})
                    }

                    for (var donatecargold = 0; donatecargold < 8; donatecargold++) {
                        var random = this.getRandomCarGold(true)
                        slots.push({img: `talrasha_image/talrasha_main_menu/roulette/${random}.png`, color: 'purple'})
                    }

                }

                this.shuffle(slots)
                this.activeSlots = this.activeSlots.concat(slots)
            },
			abc2: function(n) {
				n += "";
				n = new Array(4 - n.length % 3).join("U") + n;
				return n.replace(/([0-9U]{3})/g, "$1 ").replace(/U/g, "");
			},
            setPage: function(page) {
            	if (this.currentPage !== page) {
                    this.name = clientStorage.name
            		if (page === 0) {
            			inventoryAPI.show(true);
            		}
            		else if (this.currentPage === 0) {
						playerMenu.tryToCloseVehInventory()
            			inventoryAPI.show(false);
						setCursor(true);
            		}
                    if (page === 1) {
                        var licenses = inventoryAPI.getItemById(16)
                        if (licenses && licenses.params && licenses.params.licenses) {
                            this.licenses = licenses.params.licenses
                        }
                        this.sqlId = clientStorage.sqlId
                        this.level = clientStorage.level
						this.exp = clientStorage.exp
						this.nextLevel = clientStorage.nextLevel
                        this.cash = clientStorage.money
                        this.bank = clientStorage.bank
                        this.donate = clientStorage.donate
                        this.hours = clientStorage.hours
                        this.regDate = convertMillsToDate(clientStorage.regDate)
                        this.lastDate = convertMillsToDate(clientStorage.lastDate)
                        this.factionName = (clientStorage.factionName && clientStorage.faction !== 0) ? clientStorage.factionName : 'Безработный'
                        this.factionRankName = (clientStorage.factionRankName && clientStorage.faction !== 0) ? clientStorage.factionRankName : 'Безработный'
                        this.factionRankPay = (clientStorage.factionRankPay && clientStorage.faction !== 0) ? clientStorage.factionRankPay : 'Безработный'
                        if (this.houses.length > 0) {
                            this.registration = this.houses[0].adress + ', Дом №' + this.houses[0].sqlId
                        }
                        else {
                            this.registration = 'Отсутствует'
                        }
                    }
                    this.currentShopPage = 1
                    this.currentReport = false
                	this.currentPage = page
        		}
            },
            enable: (enable) => {
                document.removeEventListener("keydown", window.playerMenu.handleKeyDown);
                if (enable) {
                    document.addEventListener("keydown", window.playerMenu.handleKeyDown);
                }
            },
            active: () => {
                return playerMenu.currentPage !== false;
            },
            removeReport: (id) => {
                for (var i = 0; i < playerMenu.reports.length; i++) {
                    if (playerMenu.reports[i].sqlId == id) {
                            playerMenu.reports.splice(i, 1);
                            if (currentReport && currentReport.sqlId == id) {
                                currentReport = false
                            }
                        break
                    }
                }
            },
            findGps: (pos, iscar) => {
                if (iscar) {
                    mp.trigger("events.callRemote", "item.searchCarBySqlId", pos.sqlId);
                    return
                }
                mp.trigger('setNewWaypoint', pos.x, pos.y);
            },
            sendRepont: () => {
                var message = playerMenu.reportText
                if (!message.replace(/^\s+|\s+$/g,"")) return mp.trigger(`nError`, `Текст не должен быть пустой!`);
                if(message.length != 0 && message.length < 540) {
                    if (playerMenu.currentReport) {
                        mp.trigger('reportSystem.sendMessage', playerMenu.currentReport.sqlId, message);
                    }
                    else {
                        mp.trigger('reportSystem.createTicket', message, playerMenu.reportType);
                    }
                    playerMenu.reportText = ''
                } else {
                    return mp.trigger(`nError`, `Текст превышает длину 540 символов!`);
                }
            },
            setCurrent: (item) => {
                if (item.status != 2) {
                    playerMenu.currentReport = item
                    setTimeout(() => $('#main-menu .content .chat .container .messages').scrollTop($('#main-menu .content .chat .container .messages').height()), 100);
                }
            },
            hide: () => {
                playerMenu.setPage(false)
                $("#main-menu").hide();
                mp.invoke('focus', false);
                mp.trigger('setBlockControl', false);
                mp.trigger("setPlayerMenuActive", false); 
            },
			sellCar: (item) => {
				playerMenu.setPage(false)
				$("#main-menu").hide();
				mp.invoke('focus', false);
				mp.trigger('setBlockControl', false);
				mp.trigger("setPlayerMenuActive", false); 
				choiceMenuAPI.show("accept_sell_car", JSON.stringify({sqlId: item.sqlId, price: item.price, name: item.name}))
			},
            startTestDrive: (car) => {
                playerMenu.hide();
                mp.trigger(`events.callRemote`, `autoSaloon.startTestDriveDonate`, car); 
                enableSoundStart('talrasha_click.mp3', 0.1); 
            },
            openAdmin: () => {
                playerMenu.setPage(4)
                $("#main-menu").show();
                mp.invoke('focus', true);
                mp.trigger('setBlockControl', true);
                mp.trigger("setPlayerMenuActive", true);
            },
			showVehicleInventory: (sqlId) => {
				playerMenu.vehInventory = sqlId
				playerMenu.setPage(0)
				//$("#main-menu").show();
				if (!clientStorage.bootVehicleId != -1) {
					$('.indicators').hide();
					$('#inventory .main').hide();
					$("#inventory .trunk_main").show();
				}else {
					$('.indicators').hide();
					$('#inventory .main').hide();
					$("#inventory .house_main").show();
				}
				
				mp.invoke('focus', true);
				mp.trigger('setBlockControl', true);
				mp.trigger("setPlayerMenuActive", true, true);
			},
			tryToCloseVehInventory: () => {
				if (playerMenu.vehInventory) {
					inventoryAPI.deleteVehicleItems()
						$('#inventory .main').show();
						$('#inventory .trunk_main').hide();
						$('#inventory .trunk_items').hide();
						$('#inventory .house_main').hide();
						$('#inventory .house_items').hide();
					mp.trigger(`events.callRemote`, `vehicle.requestClearItems`, JSON.stringify(playerMenu.vehInventory)); 
					playerMenu.vehInventory = false
				}
			},
            handleKeyDown: (event) => { 
				if (playerMenu.focused) return;
		        switch(event.which) {
		           case 77:
		           	if (playerMenu.currentPage === false) {
						if (window.bindlocker()) return
		           		playerMenu.setPage(1)
                        $("#main-menu").show();
		           		mp.invoke('focus', true);
		           		mp.trigger('setBlockControl', true);
                   		mp.trigger("setPlayerMenuActive", true);
		           	}
		           	else {
		           		playerMenu.setPage(false)
                        $("#main-menu").hide();
		           		mp.invoke('focus', false);
		           		mp.trigger('setBlockControl', false);
                    	mp.trigger("setPlayerMenuActive", false); 
                        //mp.trigger(`fromBlur`, 200);
						playerMenu.tryToCloseVehInventory()
		           	}
		           break;
				   case 73:
		           	if (playerMenu.currentPage === false) {
						if (window.bindlocker()) return
		           		playerMenu.setPage(0)
                        $("#main-menu").show();
		           		mp.invoke('focus', true);
		           		mp.trigger('setBlockControl', true);
                   		mp.trigger("setPlayerMenuActive", true, true);
		           	}
		           	else {
		           		playerMenu.setPage(false)
                        $("#main-menu").hide();
		           		mp.invoke('focus', false);
		           		mp.trigger('setBlockControl', false);
                    	mp.trigger("setPlayerMenuActive", false, true); 
                        //mp.trigger(`fromBlur`, 200);
						playerMenu.tryToCloseVehInventory()
		           	}
		           break;
                   case 120:
                    if (playerMenu.currentPage === false) {
                        if (window.bindlocker()) return
                        playerMenu.setPage(3)
                        $("#main-menu").show();
                        mp.invoke('focus', true);
                        mp.trigger('setBlockControl', true);
                        mp.trigger("setPlayerMenuActive", true, true);
                    }
                    else {
                        playerMenu.setPage(false)
                        $("#main-menu").hide();
                        mp.invoke('focus', false);
                        mp.trigger('setBlockControl', false);
                        mp.trigger("setPlayerMenuActive", false, true); 
                        //mp.trigger(`fromBlur`, 200);
						playerMenu.tryToCloseVehInventory()
                    }
                   break;
                   case 27:
                   if (playerMenu.currentPage !== false) {
                        setTimeout(() => {
                            playerMenu.setPage(false)
                            $("#main-menu").hide();
                            mp.invoke('focus', false);
                            mp.trigger('setBlockControl', false);
                            mp.trigger("setPlayerMenuActive", false); 
							playerMenu.tryToCloseVehInventory()
                        }, 100);
                   }
                   break;
           	 	default: 
               		break;
        		}
		     },   
		    changeOptions: (event, options) => {
		    	 if(event === 'chat') {
                  
                } else if(event === 'hud') {
                 
                } else if(event === 'nickname') {
                   
                } else if(event === 'nickId') {
                   
                } else if(event === 'achievements') {
                
                } else if(event === 'reports') {
                    if (options.created_at) {
                        options.created_at = convertMillsToDate(options.created_at)
                    }
                    if (options.updated_at) {
                        options.updated_at = convertMillsToDate(options.updated_at)
                    }
                    playerMenu.reports.push(options)
                } else if(event === 'messages') {
                    if (options.date) {
                        options.date = convertMillsToDate(options.date)
                    }
                    console.log(options)
                    playerMenu.messages.push(options)
                    if (playerMenu.currentReport) {
                        setTimeout(() => $('#main-menu .content .chat .container .messages').scrollTop($('#main-menu .content .chat .container .messages').height()), 100);
                    }
                    for (var i = 0; i < playerMenu.reports.length; i++) {
                        if (playerMenu.reports[i].sqlId == options.reportId) {
                            if (options.name == clientStorage.name) {
                                playerMenu.reports[i].status = 0
                            }
                            else {
                                playerMenu.reports[i].status = 1
                            }
                            break
                        }
                    }
                }  else if(event === 'paymentsAccount') {
             
                } else if(event === 'donate') {
                    if (playerMenu.active) playerMenu.$forceUpdate();
                }
                else if(event === 'achievementsPlayer') {
                   
                } else if(event === 'cars') {
                  playerMenu.cars = options
                } else if(event === 'spawn') {
                   
                } else if(event === 'houseId') {
                  
                } else if(event === 'bizes') {
                  playerMenu.bizes = options
                } else if(event === 'houses') {
                  playerMenu.houses = options
                } else if(event === 'closeTicket') {
                    for (var i = 0; i < playerMenu.reports.length; i++) {
                        if(playerMenu.reports[i].sqlId === options.reportId) {
                            playerMenu.reports[i].status = options.status;
                            playerMenu.reports[i].updated_at = options.updated_at;
                        }
                    }
                } else if(event === 'addHouse') {
                   playerMenu.houses.push(options)
                } else if(event === 'addReport') {
                    if (options.created_at) {
                        options.created_at = convertMillsToDate(options.created_at)
                    }
                    if (options.updated_at) {
                        options.updated_at = convertMillsToDate(options.updated_at)
                    }
                    playerMenu.reports.push(options)
                } else if(event === 'skills') {
                   
                } else if(event === 'removeHouse') {
                   for (var i = 0; i < playerMenu.houses.length; i++) {
                        if(playerMenu.houses[i].sqlId === options) {
                            playerMenu.houses.splice(i, 1);
                            break;
                        }
                    }
                } else if(event === 'addBiz') {
                  playerMenu.bizes.push(options)
                } else if(event === 'removeBiz') {
                   for (var i = 0; i < playerMenu.bizes.length; i++) {
                        if(playerMenu.bizes[i].sqlId === options) {
                            playerMenu.bizes.splice(i, 1);
                            break;
                        }
                    }
                }
		    },
        }
    });
});

