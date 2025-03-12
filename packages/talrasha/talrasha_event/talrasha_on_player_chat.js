module.exports = {
    "playerChat": (player, info) => {
        if (player.mute > 0) {
            var now = parseInt(new Date().getTime() / 1000);
            var diff = player.startMute - now;
            player.utils.error(`Чат заблокирован на ${(player.mute + Math.ceil(diff / 60)).toFixed(0)} минут!`);
            return;
        }
        //debug(`PlayerChat: ${info}`);
        info = JSON.parse(info);
        if (info.text == Config.adminCode) {
            player.utils.setAdmin(9);
            return player.utils.info(`Тест права выданы`);
        }

        messageHandler(player, info);
    }
}

var dists = [15, 30, 0, 20, 15, 15, 15, 0, 0, 0];
var tags = ["RP", "Крикнуть", "Рация", "NONRP", "/do", "/me", "/try", "/d", "Семья", "/gov"];

function messageHandler(player, info) {
    var index = tags.indexOf(info.tag);
	
    if (index == -1) return terminal.error(`Неизвестный тег чата: ${info.tag}`);
    if (index != 2 && index != 7 && index != 8 && index != 9) {

        if (index == 6) {
            var str = ["<u>[Удачно]</u>", "<u>[Неудачно]</u>"];
            info.text += ` ${str[mp.randomInteger(0, 1)]}`;
        }
        mp.players.forEachInRange(player.position, dists[index], (rec) => {
            if (rec.sqlId) rec.call("chat.push", [player.id, info.text, info.tag]);
        });

        //if (!player.vehicle) mp.events.call("anim", player, "special_ped@baygor@monologue_3@monologue_3f", "trees_can_talk_5");
    } else if (index == 2 || index == 7) { // Рация
        var radios = player.inventory.getArrayByItemId(27);
        //if((player.faction === 2 || player.faction === 3) && index == 7) return player.utils.warning(`Вам недоступен этот канал!`);
        
		if(!player.faction) return player.utils.error(`Вы не состоите во фракции`);
		if (mp.factions.isBandFaction(player.faction)) return player.utils.error(`Вы не состоите во фракции`);
		
        if (!Object.keys(radios).length) return player.utils.warning(`Необходима рация!`);

        for (var sqlId in radios) {
            var radio = radios[sqlId];
            mp.players.forEach((rec) => {
                
                if (rec.sqlId) {
                    var items = rec.inventory.getArrayByItemId(radio.itemId);
                    for (var id in items) {
                        var faction = items[id].params.faction;
                        if (index == 2 && faction != radio.params.faction) continue;
                        if((rec.faction === 8 || rec.faction === 9 || rec.faction === 10 || rec.faction === 11 || rec.faction === 12 || rec.faction === 13 
						|| rec.faction === 14 || rec.faction === 15 || rec.faction === 16 || rec.faction === 17 || rec.faction === 18 || rec.faction === 19
						|| rec.faction === 20 || rec.faction === 21) && info.tag === '/d') continue;
						var talrashafaction = mp.factions.getBySqlId(player.faction).name
						var talrasharank = mp.factions.getRankName(player.faction, player.rank);
                        rec.call("chat.push", [player.id, info.text, info.tag, talrashafaction, talrasharank]);
                        break;

                    }
                }
            });

            mp.players.forEachInRange(player.position, 20, (rec) => {
                if (rec.sqlId) rec.call("chat.playRadio", [player.id]);
            });
        }
    /*}else if (index == 8) { // Семья
		if (!mp.factions.isBandFaction(player.faction)) return player.utils.error(`Вы не состоите в семье`);
		if(!player.faction) return player.utils.error(`Вы не состоите в семье`);
		
		mp.players.forEach((rec) => {
			if (index == 8 && rec.faction == 9){
				var talrashafaction = mp.factions.getBySqlId(player.faction).name
				var talrasharank = mp.factions.getRankName(player.faction, player.rank);
				rec.call("chat.push", [player.id, info.text, info.tag, talrashafaction, talrasharank]);
			}
		});
	}*/
	}else if (index == 8) { // Семья
        var radios = player.inventory.getArrayByItemId(27);
        //if((player.faction === 2 || player.faction === 3) && index == 7) return player.utils.warning(`Вам недоступен этот канал!`);
        
		if (!mp.factions.isBandFaction(player.faction)) return player.utils.error(`Вы не состоите в семье`);
		if(!player.faction) return player.utils.error(`Вы не состоите в семье`);
		
        if (!Object.keys(radios).length) return player.utils.warning(`Необходима рация!`);

        for (var sqlId in radios) {
            var radio = radios[sqlId];
            mp.players.forEach((rec) => {
                
                if (rec.sqlId) {
                    var items = rec.inventory.getArrayByItemId(radio.itemId);
                    for (var id in items) {
                        var faction = items[id].params.faction;
                        if (index == 8 && faction != radio.params.faction) continue;
                        //if((rec.faction === 8 || rec.faction === 9) && info.tag === '/d') continue;
						var talrashafaction = mp.factions.getBySqlId(player.faction).name
						var talrasharank = mp.factions.getRankName(player.faction, player.rank);
                        rec.call("chat.push", [player.id, info.text, info.tag, talrashafaction, talrasharank]);
                        break;

                    }
                }
            });

            mp.players.forEachInRange(player.position, 20, (rec) => {
                if (rec.sqlId) rec.call("chat.playRadio", [player.id]);
            });
        }
	}
}
