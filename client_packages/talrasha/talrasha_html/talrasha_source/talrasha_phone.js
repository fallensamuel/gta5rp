$(document).ready(() => {
    window.telephone = new Vue({
    	el: "#phone",
        data: {
            currentPage: 7,
            currentContactsPage: 1,
            currentBankPage: 2,
			currentGpsPage: 1,
            inputNumber: '',

            phoneStatus: false,

            contacts: {},
            calls: [],
            messageDialogs: {},

            currentDialog: false,

            calling: null,
            callingPhone: null,

            activeRecentButton: false,

            onCall: false,

            currentMessageContacts: [],
            contactMessages: [],

            tickTime: false,

            time: false,
            date: false,

            logs: [],

            postprice: 0,

        },
        methods: {
            setPage: function(page) {
            	
            },
            clickBack: function() {
                this.currentPage = 2
            },
            active: function() {
                return this.phoneStatus
            },
            sendAnnounce: function() {
				if (this.postprice == 0) return;
                mp.trigger(`events.callRemote`, "server::sendAdMessage", JSON.stringify([this.$refs.announcementInput.value, this.postprice]));
            },
            dropContact: function(phone) {
                mp.trigger("events.callRemote", "server::dropPhoneContact", phone)
            },
            refreshPrice: function(phone) {
                this.postprice = this.$refs.announcementInput.value.length * 100
            },
            callPhone: function(phone) {
                if (phone == 'Такси') {
                    mp.trigger("events.callRemote", "taxi.call.client")
                    return
                }
                else if (phone == 'Полиция') {
                    mp.trigger("events.callRemote", "police.addCall", '')
                    return
                }
                else if (phone == 'Скорая помощь') {
                    mp.trigger("events.callRemote", "hospital.addCall", '')
                    return
                }
                mp.trigger("events.callRemote", "server::callPhone", phone)
            },
            openMessage: function(index) {
                this.currentDialog = index; 
                this.currentContactsPage = 9;

                if (this.messageDialogs[this.currentDialog][this.messageDialogs[this.currentDialog].length - 1].creator_num != clientStorage.phone) {
                    if (!this.messageDialogs[this.currentDialog][this.messageDialogs[this.currentDialog].length - 1].reading_sender) {
                        this.messageDialogs[this.currentDialog][this.messageDialogs[this.currentDialog].length - 1].reading_sender = true
                        mp.trigger("events.callRemote", "server::setMessageReading", this.messageDialogs[this.currentDialog][this.messageDialogs[this.currentDialog].length - 1].id)
                    }
                }
                
            },
            sendMessage: function(contacts) {
                if (contacts == 'no') {
                    var message = this.$refs.sendMessageInput.value

                    var num = this.messageDialogs[this.currentDialog][this.messageDialogs[this.currentDialog].length - 1].creator_num == clientStorage.phone ? this.messageDialogs[this.currentDialog][this.messageDialogs[this.currentDialog].length - 1].sender_num : this.messageDialogs[this.currentDialog][this.messageDialogs[this.currentDialog].length - 1].creator_num
                    mp.trigger("events.callRemote", "server::phoneSendMessage", JSON.stringify({num, message}))
                }
                else {
                    var message = this.$refs.sendMessageInput.value

                    for(let key in this.currentMessageContacts){
                        var num = this.currentMessageContacts[key].phone
                        this.contactMessages.push({message: message, time: new Date().getTime()})
                        mp.trigger("events.callRemote", "server::phoneSendMessage", JSON.stringify({num, message}))
                    }  

                }
            },
            initPhoneContacts: function(data) {
                this.contacts = {}

                for (let key in data) {
                    var contact = data[key]
                    if (this.contacts[contact.name[0]]) {
                        this.contacts[contact.name[0]].push(contact)
                    }
                    else {
                        this.contacts[contact.name[0]] = []
                        this.contacts[contact.name[0]].push(contact)
                    }
                }
            },
            phoneNumberToContact: function(phone) {
                if(!phone) return "Неизвестно"
                for(let key in this.contacts){
                    for(let contact in this.contacts[key]){
                        if(this.contacts[key][contact].phone == phone) {
                            return this.contacts[key][contact].name
                        }
                    }
                }
                return phone
            },
            initPhoneCalls: function(data) {
                this.calls = data
            },
			addCall: function(data) {
				console.log(data)
				this.calls.unshift(data)
            },
            initPhoneLogs: function(logs) {
                this.logs = logs
            },
            addLog: function(text, summ, date) {
                this.logs.unshift({text: text, sum: summ, date: date})
            },
            initPhoneMessages: function(data) {
                var messsages = {}

                for(let key in data){
                    var message = data[key]

                    if (messsages[message.creator_num + message.sender_num]) {
                        messsages[message.creator_num + message.sender_num].push(message)
                    }
                    else {
                        messsages[message.creator_num + message.sender_num] = []
                        messsages[message.creator_num + message.sender_num].push(message)
                    }
                }   

                this.messageDialogs = messsages

                setTimeout(() => $('#phone .contacts .container .messages-list').scrollTop($('#phone .contacts .container .messages-list').height()), 100);
            },
			addMessage: function(message) {
				if (this.messageDialogs[message.creator_num + message.sender_num]) {
					this.messageDialogs[message.creator_num + message.sender_num].push(message)
				}
				else {
					this.messageDialogs[message.creator_num + message.sender_num] = []
					this.messageDialogs[message.creator_num + message.sender_num].push(message)
				}
				
				setTimeout(() => $('#phone .contacts .container .messages-list').scrollTop($('#phone .contacts .container .messages-list').height()), 100);
            },
            setAcceptCalling: function() {
                mp.trigger("events.callRemote", "server::acceptCalling", this.callingPhone)
            },
            setCancelCalling: function() {
                mp.trigger("events.callRemote", "server::cancelCalling", this.callingPhone)
            },
            startCall: function() {
                this.onCall = true
                this.currentPage = 4
                setCursor(false) 
            },
            stopCall: function(closePhone) {
                this.calling = null
                this.callingPhone = null
                this.onCall = false
                if (this.phoneStatus && closePhone) {
                    mp.trigger("client::setPhoneStatus", false)
                }
                else if (this.phoneStatus && !closePhone) {
                    this.currentPage = 2
                }
            },
            phoneCall: function(data) {
                this.calling = data.call
                this.callingPhone = data.phone
                this.onCall = false

                if (this.calling) {
                    this.currentPage = 5
                }
                else {
                    this.currentPage = 4
                }
            },
            phoneSurfingTo: function(name) {
                if (name == 'contacts') {
                    this.currentPage = 3
                    this.currentContactsPage = 3
                }
            },
            inputFind: function(val, name) {
                name = String(name)
                if (!this.$refs[val]) return true

                var ref = this.$refs[val].value

                if (ref === '') return true

                if (name.match(new RegExp(ref,"g","i"))) {
                    return true
                }
                else {
                    return false
                }
            },
            addContact: function() {
                var name = this.$refs.addContactName.value + ' ' + this.$refs.addContactSurname.value
                var phone = this.$refs.addContactNumber.value
                mp.trigger("events.callRemote", "server::addPhoneContact", JSON.stringify({name, phone}))
            },
            payHouse: function() {
                var summ = this.$refs.payInput.value
                var num = this.$refs.payInputNum.value
                mp.trigger("give.bank.money.house.phone", parseInt(summ), parseInt(num));
            },
            payBiz: function() {
                var summ = this.$refs.payInput.value
                var num = this.$refs.payInputNum.value
                mp.trigger("give.bank.money.biz.phone", parseInt(summ), parseInt(num));
            },
            transfer: function() {
                var summ = this.$refs.payInput.value
                var name = this.$refs.nameInput.value
                mp.trigger("transfer.bank.money", name, parseInt(summ));
            },
            setDate: function() {
                var days = [
                  'Воскресенье',
                  'Понедельник',
                  'Вторник',
                  'Среда',
                  'Четверг',
                  'Пятница',
                  'Суббота'
                ];
                var d = new Date();
				var hours = d.getUTCHours() + 3
				if (hours > 23) {
					hours -= 24
				}
                this.time = hours + ":" + (d.getUTCMinutes() < 10 ? ('0' + d.getUTCMinutes()) : d.getUTCMinutes())
                var n = d.getDay();
                var dayM = d.getDate()
                var m = d.toLocaleString('ru', { month: 'long' });
                this.date = days[n] + ', ' + dayM + ' ' + m
            },
            show: function(show) {
				//if (window.bindlocker()) return;
                if (show && !this.phoneStatus) {
					if (window.bindlocker()) return;
                    telephone.setDate()
                    this.tickTime = setInterval(function() {
                        if (telephone.currentPage == 1) {
                            telephone.setDate()
                        }
                    }, 1000);
                    this.phoneStatus = true
                    this.currentPage = 1
                    this.currentContactsPage = 1
                    this.currentBankPage = 1
					this.currentGpsPage = 1
                    setCursor(true)
                    $("#phone").css("display", "flex");
                }
                else if (!show && this.phoneStatus) {
                    clearInterval(this.tickTime)
                    this.calling = null
                    this.callingPhone = null
                    this.onCall = false
                    this.tickTime = false
                    this.phoneStatus = false
                    setCursor(false)
					$("#phone").css("display", "none");
                }
            }
        }
    });
});

