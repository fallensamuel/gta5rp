class Phone {
    constructor(){ 
        mp.phone_calls = []
        mp.phone_contacts = []
		mp.phone_messages = []
        DB.Handle.query("SELECT * FROM talrasha_phone_contact", (err, result) => {
            if (err) console.log(err) 
            for(let key in result){
                mp.phone_contacts.push({ character_id: result[key].phoneOwner, name: result[key].phoneContactName, phone: result[key].phoneContactNumber}) 
            }
        })
		
		DB.Handle.query("SELECT * FROM talrasha_phone_message", (err, result) => {
            if (err) console.log(err) 
            for(let key in result){
                mp.phone_messages.push({ id: result[key].id, sender_num: result[key].sender_num, creator_num: result[key].creator_num, text: result[key].text, time: result[key].time, reading_sender: result[key].reading_sender, reading_creator: result[key].reading_creator}) 
            }
        })
    
        DB.Handle.query("SELECT * FROM talrasha_phone_call ORDER BY id DESC", (err, result) => {
            if (err) console.log(err)
            for(let key in result){
                mp.phone_calls.push({ character_id: result[key].phoneOwner, phone: result[key].phoneSubscriber, isMissed: result[key].isMissed, time: result[key].time}) 
            } 
        }) 
		
		mp.phone_messages.getByPhoneNumber = (phone) => {
            let result = []
            for (let key in mp.phone_messages) {
                if (mp.phone_messages[key].creator_num == phone || mp.phone_messages[key].sender_num == phone) {
                    result.push(mp.phone_messages[key])
                    if (result.length > 20) break
                }
            } 
            return result 
        } 

        mp.phone_calls.getByCharacterSqlId = (sqlId) => {
            let result = []
            for (let key in mp.phone_calls) {
                if (mp.phone_calls[key].character_id == sqlId) {
                    result.push(mp.phone_calls[key])
                    if (result.length > 20) break
                }
            } 
            return result 
        } 

        mp.phone_contacts.getByCharacterSqlId = (sqlId) => {
            let result = []
            for (let key in mp.phone_contacts) {
                if (mp.phone_contacts[key].character_id == sqlId) {
                    result.push(mp.phone_contacts[key])
                }
            } 
            return result 
        }

        mp.phone_contacts.deleteContact = (sqlId, phone) => {
            for (let key in mp.phone_contacts) {
                if (mp.phone_contacts[key].character_id == sqlId && mp.phone_contacts[key].phone == phone) {
                    mp.phone_contacts.splice(key, 1)
                    let player = mp.players.getBySqlId(sqlId)
                    if (player) {
                        player.setVariable("phoneContacts", JSON.stringify(mp.phone_contacts.getByCharacterSqlId(sqlId)))  
                    }
                }
            }
        }
 
    }

    _findSubscriberByPhonenumber (number) {  
        let result = null
        mp.players.forEach((pl) => {
            if(pl.phone == number) {
                result = pl
            }
        })
        return result
    }

    _generatePhonenumber () {
        return new Promise((resolve, reject) => {
            const characters = '0123456789';
            let result = '';
            for (let i = 0; i < 6; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            } 
            result = parseInt(result)
            this._getPlayerByPhonenumber(result).then((data) => { 
                if(data){
                    this._generatePhonenumber()
                }
                else {
                    resolve(result)
                }
            }) 
        })
    }
    
    _getPlayerByPhonenumber (phone) {
        return new Promise((resolve, reject) => {
            DB.Handle.query('SELECT * FROM talrasha_character WHERE phone = ?', [phone], (e, res) => { 
                if(e) reject(e) 
                if(res.length > 0){
                    resolve(res) 
                } 
                else {
                    resolve(false)
                }
                 
            })
        })
    }

    _initNewCalls(entity, subscriber, isMissed) {  
        DB.Handle.query("INSERT INTO talrasha_phone_call (phoneOwner, phoneSubscriber, isMissed) VALUES (?, ?, ?)", [entity.sqlId, subscriber, isMissed], (err, result) => {
            if(err) {
                player.utils.error(`Произошла ошибка при добавлении звонка`)
                console.log(err)
                return
            }  
			var info = { character_id: entity.sqlId, phone: subscriber, isMissed: isMissed, time: new Date().getTime()}
			mp.phone_calls.push(info) 	
			entity.call("client::phoneAddCall", [JSON.stringify(info)])
        })
    }
    
} 

const phone = new Phone
module.exports = phone 

mp.events.add('server::phoneSendMessage', (player, data) => {
	if(!player.phone || isNaN(parseInt(player.phone))) return player.utils.warning("Необходима сим-карта!") 
    data = JSON.parse(data)
	DB.Handle.query("INSERT INTO talrasha_phone_message (text, sender_num, creator_num) VALUES (?,?,?)",
	[data.message, data.num, player.phone], (e, result) => {
		var info = { id: result.insertId, sender_num: data.num, creator_num: player.phone, text: data.message,  time: new Date().getTime(), reading_sender: 0, reading_creator: 0 }
		mp.phone_messages.push(info) 
		player.call("client::phoneAddMessage", [JSON.stringify(info)])
	
		let subscriber = phone._findSubscriberByPhonenumber(data.num)  
		if (subscriber) {
			subscriber.call("client::phoneAddMessage", [JSON.stringify(info)])
			subscriber.utils.success("Вам пришло сообщение на телефон!");
		}
		
	});

});

mp.events.add("server::setMessageReading", (player, id) => {
	for (let key in mp.phone_messages) {
		if (mp.phone_messages[key].id == id) {
			if (mp.phone_messages[key].creator_num == player.phone) {
				mp.phone_messages[key].reading_creator = true
				DB.Handle.query("UPDATE talrasha_phone_message SET reading_creator=1 WHERE id=?", [id]);
			}
			else {
				mp.phone_messages[key].reading_sender = true
				DB.Handle.query("UPDATE talrasha_phone_message SET reading_sender=1 WHERE id=?", [id]);
			}
			break
		}
	} 
})

mp.events.add("server::acceptCalling", (player, number) => {
    let subscriber = phone._findSubscriberByPhonenumber(number)    
    if(!player.phone || isNaN(parseInt(player.phone))) return player.utils.warning("Необходима сим-карта!") 
    if(!subscriber) return player.utils.warning("Абонент недоступен!") 
    mp.events.call("voice.add", player, subscriber)
	mp.events.call("voice.add", subscriber, player)
	player.call("client::startCall")
	subscriber.call("client::startCall")
	player.callStarted = true
	subscriber.callStarted = true
})

mp.events.add("server::cancelCalling", (player, number) => {
    let subscriber = phone._findSubscriberByPhonenumber(number)    
	
	if (player.callStarted) { //Если звонок начался
		mp.events.call("voice.remove", player, subscriber)
		player.call("client::phoneCallStop", [true])
		player.utils.error(`Вызов окончен!`) 
		delete player.callStarted
	}
	else if (!player.callStarted) { //Если звонок ещё не принят
		player.call("client::phoneCallStop", [true])
	}
	
	delete player.caller
	
	if(!subscriber) return;
	
	if (subscriber && subscriber.callStarted) { //Если звонок начался
		mp.events.call("voice.remove", subscriber, player)
		subscriber.call("client::phoneCallStop", [true])
		subscriber.utils.error(`Вызов окончен!`) 
		delete subscriber.callStarted
	}
	else if (subscriber && !subscriber.callStarted) { //Если звонок ещё не принят
		if (!subscriber.caller) {
			subscriber.call("client::phoneCallStop", [true])
		}
		else {
			subscriber.call("client::phoneCallStop", [false])
			subscriber.utils.error(`Занято!`) 
		}
	}
	
	delete subscriber.caller
	
})

mp.events.add("server::callPhone", (player, number) => {
	if (parseInt(number) === 540083) {
		mp.events.call("startCaptZone", player)
		return
	}
	else if (parseInt(number) === 540084) {
		mp.events.call("startBizWarZone", player)
		return
	}
	else if (parseInt(number) === 540085) {
		mp.events.call("startWarZone", player)
		return
	}
    let subscriber = phone._findSubscriberByPhonenumber(number)    
    if(!player.phone || isNaN(parseInt(player.phone))) return player.utils.warning("Необходима сим-карта!") 
    if(!subscriber) return player.utils.warning("Абонент недоступен!") 
	if(subscriber.caller !== undefined) return player.utils.warning("Абонент разговаривает, перезвоните позже.") 	
    if(player.phone == number) return player.utils.warning("Невозможно позвонить самому себе!") 
	player.caller = true
	subscriber.caller = false
    subscriber.call("client::phoneSendCall", [player.phone])
	player.call("client::phoneGetCall", [subscriber.phone])
    phone._initNewCalls(subscriber, player.phone, 1)
    phone._initNewCalls(player, subscriber.phone, 1)
})


mp.events.add("server::dropPhoneContact", (player, phone) => {
    if(!player.phone || isNaN(parseInt(player.phone))) return player.utils.warning("Необходима сим-карта!")   
    DB.Handle.query("DELETE FROM talrasha_phone_contact WHERE phoneOwner = ? AND phoneContactNumber = ?", [player.sqlId, phone], (err, result) => {
        if(err) {
            player.utils.error(`Произошла ошибка при удалении контакта`)
            console.log(err)
            return
        }
        mp.phone_contacts.deleteContact(player.sqlId, phone)
        player.utils.success(`Контакт с номером ${phone} удалён`)
    })
})


mp.events.add("server::addPhoneContact", (player, data) => { 
    if(!player.phone || isNaN(parseInt(player.phone))) return player.utils.warning("Необходима сим-карта!") 
    data = JSON.parse(data)
    phone._getPlayerByPhonenumber(data.phone).then((result) => {
        if(!result) return player.utils.warning("Телефон не найден!")
        let phoneContacts = JSON.parse(player.getVariable("phoneContacts"))  
        for(let key in phoneContacts){
            if(phoneContacts[key].phone == data.phone) {
                return player.utils.error(`Контакт с таким номером уже существует`)
            }
        }  
        DB.Handle.query("INSERT INTO talrasha_phone_contact (phoneOwner, phoneContactName, phoneContactNumber) VALUES (?, ?, ?)", [player.sqlId, data.name, data.phone], (err, result) => {
            if(err) {
                player.utils.error(`Произошла ошибка при добавлении контакта`)
                console.log(err)
                return
            }
            player.utils.success(`Контакт ${data.name} добавлен`)
            player.call("client::phoneSurfingTo", ["contacts"])
            mp.phone_contacts.push({ character_id: player.sqlId, name: data.name, phone: data.phone})  
            player.setVariable("phoneContacts", JSON.stringify(mp.phone_contacts.getByCharacterSqlId(player.sqlId))) 
        })
    }) 
})