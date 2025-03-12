module.exports.Init = function() {
    mp.achievements = {
        items: []
    };
    DB.Handle.query("SELECT * FROM talrasha_item_achiev", (e, result) => {
        for (var i = 0; i < result.length; i++) {
            mp.achievements.items[result[i].id - 1] = result[i];
            result[i].sqlId = result[i].id;
            delete result[i].id;
            initItemUtils(result[i]);
        } 
        console.log(`\x1b[32m[DONE]\x1b[0m "Achievements" package has been loaded: \x1b[33m${i}\x1b[0m.`);
    });

    initAchievementsUtils();
}

function initItemUtils(item) {

}

function initAchievementsUtils() {
    mp.achievements.getItem = (itemId) => {
        return mp.achievements.items[itemId];
    };
}

global.initPlayerAchievements = function(player) {
    //debug(`initPlayerAchievements: ${player.name}`);
    player.achievements = {
        items: [],
        /* Обновить прогресс достижения. */
        updateExp: (itemId, addExp) => {
            var info = mp.achievements.items[itemId];
            var item = player.achievements.items[itemId];
            if (item) {
                item.exp += addExp;
                if (item.exp > info.maxExp) item.exp = info.maxExp;
                DB.Handle.query(`UPDATE talrasha_player_achiev SET exp=? WHERE id=?`, [item.exp, item.sqlId]);
                player.utils.setAchievement();
            } else {
                var newItem = {
                    exp: addExp,
                    data: {},
                    date: parseInt(new Date().getTime() / 1000)
                };
                if (newItem.exp > info.maxExp) newItem.exp = info.maxExp;
                player.achievements.items[itemId] = newItem;
                DB.Handle.query(`INSERT INTO talrasha_player_achiev (playerId,itemId,exp,date) VALUES (?,?,?,?)`,
                [player.sqlId, itemId, newItem.exp, newItem.date], (e, result) => {
                    if (e) console.log(e);
                    newItem.sqlId = result.insertId;
                });
                player.utils.setAchievement();
            }
        },
        /* Кол-во выполненных достижений. */
        getFinishedCount: () => {
            var count = 0;
            for (var itemId in player.achievements.items) {
                var item = player.achievements.items[itemId];
                var info = mp.achievements.getItem(itemId);
                if (item.exp >= info.maxExp) count++;
            }
            return count;
        },
    };

    DB.Handle.query("SELECT * FROM talrasha_player_achiev WHERE accountId=?", [player.account.id], (e, result) => {
        for (var i = 0; i < result.length; i++) {
            player.achievements.items[result[i].itemId] = result[i];
            result[i].sqlId = result[i].id;
            result[i].data = JSON.parse(result[i].data);
            delete result[i].id;
            delete result[i].itemId;
            delete result[i].accountId;
        }

        // player.achievements.updateExp(1, 1); //for test
        // TODO: Send data to client.
    });
}
