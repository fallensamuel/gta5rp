$(document).ready(() => {
    window.houseMenuTalRasha = new Vue({
        el: "#houseMenu",
        data: {
            render: false,
            houseId: 2,
            houseOwner: "",
            houseAddress: "",
            houseLock: "",
            houseLockAction: "",
            lockIcon: "",
            housePrice: 1,
            houseRooms: 1,
            houseGarage: "",
            houseGaragePlace: "",
            houseStatus: "Свободен",
            houseClass: "A",
            houseSquare: 13,
			pledged: 0,
			balance: 0,
			tax: 0,
			datePay: false,
			
			moderncontainermenu: 0,
        },
        methods: {
            active: function() {
                return $("#houseMenu").css("display") != "none";
            },
            showMenu: function(id, interior, owner, address, type, lock, rooms, garage, garagecount, price, rooms, square, pledged, balance, tax, datePay) {
                this.$data.houseId = id;
                this.$data.houseOwner = owner;
                this.$data.houseAddress = address + ", дом №" + id;
                this.$data.houseClass = globalConstants.houseClasses[type];
				this.$data.balance = balance;
				this.$data.tax = tax;
				this.$data.datePay = datePay;

                /*if (interior === 1) {
                    this.$data.houseRooms = 2;
                    this.$data.houseSquare = 65;
                } else if (interior === 2) {
                    this.$data.houseRooms = 1;
                    this.$data.houseSquare = 35;
                } else if (interior === 3) {
                    this.$data.houseRooms = 3;
                    this.$data.houseSquare = 90;
                } else if (interior === 4) {
                    this.$data.houseRooms = 4;
                    this.$data.houseSquare = 160;
                }*/
                this.$data.houseRooms = rooms;
                this.$data.houseSquare = square;
				this.$data.pledged = pledged;

                if (lock) this.$data.houseLock = "Закрыт";
                else this.$data.houseLock = "Открыт";

                if (owner.length > 3) this.$data.houseStatus = "Занят";
                else this.$data.houseStatus = "Свободен";

                this.$data.houseGarage = garage;

                this.$data.houseGaragePlace = garagecount;

                this.$data.housePrice = price;

                //$("#houseMenu .img-class").attr("src", `talrasha_image/talrasha_house_menu/classes/${this.$data.houseClass}.jpg`);

                $(".house-menu-header").hide();
                $(".house-menu").hide();
				$(".house-infoexit").hide();
				$(".house-infoexitgarage").hide();

                $("#houseMenu").show();
                $(".house-header").show();
                $(".house-info").show();

                mp.trigger(`setHouseMenuActive`, true);
            },
			showMenuexit: function(id, interior, owner, address, type, lock, rooms, garage, garagecount, price, rooms, square, pledged, balance, tax, datePay) {
                this.$data.houseId = id;
                this.$data.houseOwner = owner;
                this.$data.houseAddress = address + ", дом №" + id;
                this.$data.houseClass = globalConstants.houseClasses[type];
				this.$data.balance = balance;
				this.$data.tax = tax;
				this.$data.datePay = datePay;

                /*if (interior === 1) {
                    this.$data.houseRooms = 2;
                    this.$data.houseSquare = 65;
                } else if (interior === 2) {
                    this.$data.houseRooms = 1;
                    this.$data.houseSquare = 35;
                } else if (interior === 3) {
                    this.$data.houseRooms = 3;
                    this.$data.houseSquare = 90;
                } else if (interior === 4) {
                    this.$data.houseRooms = 4;
                    this.$data.houseSquare = 160;
                }*/
                this.$data.houseRooms = rooms;
                this.$data.houseSquare = square;
				this.$data.pledged = pledged;

                if (lock) this.$data.houseLock = "Закрыт";
                else this.$data.houseLock = "Открыт";

                if (owner.length > 3) this.$data.houseStatus = "Занят";
                else this.$data.houseStatus = "Свободен";

                this.$data.houseGarage = garage;

                this.$data.houseGaragePlace = garagecount;

                this.$data.housePrice = price;
				
                $(".house-menu-header").hide();
                $(".house-menu").hide();
				$(".house-infoexitgarage").hide();

                $("#houseMenu").show();
                $(".house-header").show();
                $(".house-infoexit").show();

                mp.trigger(`setHouseMenuActive`, true);
            },
			showMenuexitgarage: function(id, interior, owner, address, type, lock, rooms, garage, garagecount, price, rooms, square, pledged, balance, tax, datePay) {
				this.$data.houseId = id;
                this.$data.houseOwner = owner;
                this.$data.houseAddress = address + ", дом №" + id;
                this.$data.houseClass = globalConstants.houseClasses[type];
				this.$data.balance = balance;
				this.$data.tax = tax;
				this.$data.datePay = datePay;

                /*if (interior === 1) {
                    this.$data.houseRooms = 2;
                    this.$data.houseSquare = 65;
                } else if (interior === 2) {
                    this.$data.houseRooms = 1;
                    this.$data.houseSquare = 35;
                } else if (interior === 3) {
                    this.$data.houseRooms = 3;
                    this.$data.houseSquare = 90;
                } else if (interior === 4) {
                    this.$data.houseRooms = 4;
                    this.$data.houseSquare = 160;
                }*/
                this.$data.houseRooms = rooms;
                this.$data.houseSquare = square;
				this.$data.pledged = pledged;

                if (lock) this.$data.houseLock = "Закрыт";
                else this.$data.houseLock = "Открыт";

                if (owner.length > 3) this.$data.houseStatus = "Занят";
                else this.$data.houseStatus = "Свободен";

                this.$data.houseGarage = garage;

                this.$data.houseGaragePlace = garagecount;

                this.$data.housePrice = price;
				
                $(".house-menu-header").hide();
                $(".house-menu").hide();
				$(".house-infoexit").hide();

                $("#houseMenu").show();
                $(".house-header").show();
                $(".house-infoexitgarage").show();

                mp.trigger(`setHouseMenuActive`, true);
            },
            showOwnerMenu: function(lock, pl, balance, tax, datePay) {
				this.$data.pledged = pl;
				this.$data.balance = balance;
				this.$data.tax = tax;
				this.$data.datePay = datePay;
				
                if (lock) {
                    this.$data.houseLockAction = "Открыть";
                    this.$data.lockIcon = "talrasha_image/talrasha_house_menu/lock-lock.png";
                } else {
                    this.$data.houseLockAction = "Закрыть";
                    this.$data.lockIcon = "talrasha_image/talrasha_house_menu/open-lock.png";
                }

                $(".house-header").hide();
                $(".house-info").hide();
				$(".house-infoexit").hide();
				$(".house-infoexitgarage").hide();

                $("#houseMenu").show();
                $(".house-menu-header").show();
                $(".house-menu").show();

                mp.trigger(`setHouseMenuActive`, true);
            },
            hideOwnerMenu: function() {
                $("#houseMenu").hide();
                $(".house-menu-header").hide();
                $(".house-menu").hide();
				$(".house-infoexit").hide();
				this.moderncontainermenu = 0
                mp.trigger(`setHouseMenuActive`, false);
            },
            lockUnlockHouse: function() {
                mp.trigger("lockUnlockHouse");
            },
            inspectHouse: function() {
                mp.trigger("inspectHouse");
            },
            enterHouse: function() {
                mp.trigger("enterHouse");
            },
			goExitGarage: function() {
                mp.trigger("goExitGarage");
            },
			goEnterStreetFromGarage: function() {
                mp.trigger("goEnterStreetFromGarage");
            },
			exitHouse: function() {
                mp.trigger("exitHouse");
            },
            houseMenuHandler: function() {
                mp.trigger(`events.callRemote`, `houseMenuHandler`);
            },
            enterGarage: function() {
                mp.trigger("enterGarage");
            },
			enterGarageFromStreet: function() {
                mp.trigger("enterGarageFromStreet");
            },
			payTohouse: function(days) {
                if (days > 14) return nError(`Приобретите VIP-статус`);
				mp.trigger(`events.callRemote`, `payHouseDays`, days);
            },
            sellHouseToGov: function() {
				if (this.pledged) return nError(`Дом в залоге у банка продажа невозможна!`);
                mp.trigger("sellHouseToGov");
            },
            sellHouseToPlayer: function() {
				if (this.pledged) return nError(`Дом в залоге у банка продажа невозможна!`);
                mp.trigger("sellHouseToPlayer");
            },
            showHousePlan: function() {
                $(".house-info").hide();
                $(".house-plan").show();
            },
            backToMenu: function() {
                $(".house-plan").hide();
                $(".house-info").show();
            },
            buyHouse: function() {
                mp.trigger("buyHouse");
            },
            invitePlayer: function() {
                mp.trigger("invitePlayer");
            },
			buyModernization: function(type) {
                mp.trigger(`events.callRemote`, `houseInteraction.buyWardrobe`);
            },
            exitMenu: function() {
                $("#houseMenu").hide();
                $(".house-header").hide();
                $(".house-plan").hide();
                $(".house-info").hide();
                $(".house-menu-header").hide();
                $(".house-menu").hide();
				this.moderncontainermenu = 0
                mp.trigger(`setHouseMenuActive`, false);
				setCursor(false);
            }
        }
    });
});
