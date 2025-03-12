const fs = require("fs");
const { paydayStorageBand } = require("./talrasha_ghetto/talrasha_ghetto.js");
const { paydayStorage } = require("./talrasha_wzp/talrasha_wzp.js");
const { paydayStorageBiz } = require("./talrasha_bizwar/talrasha_bizwar.js");

module.exports = {
    InitPayDay: (player) => {
        var lastPayDayHour = new Date().getHours();
		var lastNalogDay = new Date().getDate();
        setInterval(() => {
            try {
                var date = new Date();
                if (date.getMinutes() >= 0 && date.getMinutes() <= 3 && date.getHours() != lastPayDayHour) {
                    //чтобы не умерло соединение с БД (по предположению Carter'а)
                    DB.Handle.query("SELECT null FROM talrasha_account LIMIT 1");

                    lastPayDayHour = date.getHours();

					paydayStorageBand()
					paydayStorage()
					paydayStorageBiz()
					
					
                    allBroadcast();
                    // bizesTax();
                    factionsPay(date);
                }
				var day = new Date().getDate();
				if (day != lastNalogDay) {
					housesTax();
					lastNalogDay = day;
					brpReward();
				}
                mp.updateWorldTime();
				talrashabroadcast();
            } catch (e) {
                terminal.error(e);
            }
        }, 60000);
    },
}

function talrashabroadcast() {
    mp.players.forEach((rec) => {
        if (rec.sqlId) {
			savePlayerDBParams(rec); 
			let dateTime = new Date();
			if (dateTime.getHours() == 5 && dateTime.getMinutes() == 3) {
				user.set(rec, 'online_wheel', 0); // 15 1-ый онлайн вилл, к 30 + 2 вилла = 3
				DB.Handle.query('UPDATE talrasha_character SET online_wheel=\'0\' WHERE 1');
			}
			if (dateTime.getMinutes() == 8) {
				user.set(rec, 'online_wheel', user.get(rec, 'online_wheel') + 1);
				DB.Handle.query("UPDATE talrasha_character SET online_wheel=? WHERE id=?", [user.get(rec, 'online_wheel'), rec.sqlId]);
			}
			if (dateTime.getMinutes() == 16) {
				user.set(rec, 'online_wheel', user.get(rec, 'online_wheel') + 1);
				DB.Handle.query("UPDATE talrasha_character SET online_wheel=? WHERE id=?", [user.get(rec, 'online_wheel'), rec.sqlId]);
			}
			if (dateTime.getMinutes() == 24) {
				user.set(rec, 'online_wheel', user.get(rec, 'online_wheel') + 1);
				DB.Handle.query("UPDATE talrasha_character SET online_wheel=? WHERE id=?", [user.get(rec, 'online_wheel'), rec.sqlId]);
			}
        }
    });
}

/* оповещение всех игроков */
function allBroadcast() {
    mp.players.forEach((rec) => {
        if (rec.sqlId) {
            rec.minutes += parseInt((new Date().getTime() - rec.authTime) / 1000 / 60);
            rec.account.minutes += parseInt((new Date().getTime() - rec.authTime) / 1000 / 60);
            var characterLevel = mp.convertMinutesToLevelRest(rec.minutes);
            rec.utils.setLocalVar("accountHours", parseInt(rec.account.minutes));
            rec.utils.setLocalVar("hours", parseInt(rec.minutes));
            rec.utils.setLocalVar("nextLevel", characterLevel.nextLevel);
            rec.utils.setLocalVar("level", characterLevel.level);
            rec.utils.setLocalVar("exp", characterLevel.rest);
			user.set(rec, 'online_wheel', user.get(rec, 'online_wheel') + 1);
        }
    });
}


function format(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    return '' + y + '.' + (m<=9 ? '0' + m : m) + '.' + (d <= 9 ? '0' + d : d);
}

function getAdminReports(adminId) {
	var closedReports = 0
	var rtext = ``
	if (mp.report_logs[adminId]) {
		for (var i = 0; i < mp.report_logs[adminId].length; i++) {
			var report = mp.report_logs[adminId][i]
			var messages = mp.report_logs[adminId][i].messages
			var mCount = mp.report_logs[adminId][i].messages.length - 1
			var lastMessage = mp.report_logs[adminId][i].messages[mCount]
			var curDate = new Date().getDate()
			if (new Date(lastMessage.date).getDate() !== curDate - 1) continue;
			closedReports += 1
			rtext += `#Репорт от id: ${report.playerId}\r\n`
			//console.log(rtext)
			for (var msg = 0; msg < messages.length; msg++) {
				rtext += `#${msg} От ${messages[msg].name} Дата: ${new Date(messages[msg].date).toLocaleString()} : ${messages[msg].text}\r\n`
				//console.log(rtext)
				
			}

			
		}
		rtext += `Закрытых репортов ${closedReports}`
	}
	else {
		rtext += `\r\nЗакрытых репортов ${closedReports}`
	}
	
	
	return rtext
}


function brpReward() {
	DB.Handle.query("SELECT * FROM talrasha_character WHERE admin > 0", (e, result) => { //Селект всех админов
		var logInfo = ``
		
        for (var i = 0; i < result.length; i++) {
			var admin = result[i]
			
            var player = mp.players.getBySqlId(admin.id);
			if (player) { //Админ онлайн
				if (!player.authTime) player.authTime = new Date().getTime();
				var minutes = parseInt((new Date().getTime() - player.authTime) / 1000 / 60);
				var todayTime = 300 - player.brpTime + minutes
				var name = player.name
				var id = player.sqlId
				var reports = getAdminReports(id)
				//console.log(reports)
				logInfo += `Имя админа: ${name}, id админа: ${id}, минут отыграно: ${minutes}\r\n${reports}\r\n\r\n`
				
				
			}
			else { 
				if (admin.brpTime < 300) { //Админ был онлайн сегодня
					var minutes = 300 - admin.brpTime
					var name = admin.name
					var id = admin.id
					var reports = getAdminReports(id)
					logInfo += `Имя админа: ${name}, id админа: ${id}, минут отыграно: ${minutes}\r\n${reports}\r\n\r\n`
					
				}
			}
        } 
		
		//console.log(logInfo)
		
		var today = new Date();
		var dateString = format(today);
		const saveFile = `logs/admins/${dateString}.txt`;
		
		fs.appendFile(saveFile, logInfo, (err) => {
			if (err) {
				console.log(err)
			}
			else {
				console.log(`Админский лог записан`)
			}
		});
		
		DB.Handle.query("UPDATE talrasha_character SET brpTime = 300");
		mp.players.forEach((rec) => {
			if (rec.sqlId) {
				rec.brpTime = 300
				rec.call(`hudControl.setData`, [{
					money: rec.money,
					bank: rec.bank,
					wanted: rec.wanted,
					brpTime: rec.brpTime
				}]);
			}
		});
		
    }); 
	
	
	
}
/* Налоги на дом. */
function housesTax() {
    for (var i = 0; i < mp.houses.length; i++) {
        var house = mp.houses[i];
        if (!house.owner) continue;
        var owner = mp.players.getBySqlId(house.owner);
		var currentTime = new Date().getTime()
        if (house.payDate.getTime() < currentTime) {
            if (owner) {
                owner.utils.info(`Ваш Дом №${house.sqlId} продан за неуплату налогов!`);
                if(owner.houseId == house.sqlId) {
                    owner.utils.setSpawn(3);
                    owner.utils.setHouseId(0);
                }
                owner.utils.removeHouse(house);
            }
            house.setOwner(0);
        } 
    }
}

/* Налоги на бизнес. */
function bizesTax() {
    for (var i = 0; i < mp.bizes.length; i++) {
        var biz = mp.bizes[i];
        if (!biz.owner) continue;
        biz.setBalance(biz.balance - biz.getTax());
        var owner = mp.players.getBySqlId(biz.owner);
        if (biz.balance <= 0) {
            if (owner) {
                owner.utils.info(`Ваш Бизнес №${biz.sqlId} продан за неуплату налогов!`);
                owner.utils.removeBiz(biz);
            }
            var price = parseInt(biz.price * mp.economy["biz_sell"].value);
            if (owner) {
                owner.utils.setBankMoney(owner.bank + price);
                owner.utils.info(`Начислено: ${price}$`);
            } else {
                DB.Handle.query("UPDATE talrasha_character SET bank=bank+? WHERE id=?", [price, biz.owner]);
            }
            biz.setOwner(0);
        } else if (biz.balance <= biz.getTax() * 10 && owner) {
            owner.utils.warning(`Пополните счет Бизнеса №${biz.sqlId}!`);
        }
    }
}

/* Начисление ЗП членам организаций. */
function factionsPay(date) {
    mp.players.forEach((rec) => {
        if (rec.faction) {
            var minutes = parseInt((date.getTime() - rec.authTime) / 1000 / 60);
            if (minutes < 30) { 
				return rec.call("chat.custom.push", [`<a style="color: #00FF00">--- PAYDAY ---</a>`]);
				return rec.call("chat.custom.push", [`<a style="color: #FDD331">Вы не отыграли 30 минут чтобы получить зарплату!</a>`]);
			}
            var pay = mp.factions.getRankPay(rec.faction, rec.rank);
            pay = parseInt(pay);
            rec.utils.setBankMoney(rec.bank + pay);
			rec.utils.success(`+ ${pay}$`);
			rec.call("chat.custom.push", [`<a style="color: #00FF00">--- PAYDAY ---</a>`]);
			rec.call("chat.custom.push", [`<a style="color: #FDD331">Зарплата: ${pay}$</a>`]);
        }
    });
}
