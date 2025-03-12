//const Discord = require('discord.js');
const moment = require('moment')

module.exports.Init = function() {
    mp.logs = [];
    initLogsUtils();
    console.log(`\x1b[32m[DONE]\x1b[0m "System log" package has been loaded.`);
}

function initLogsUtils() {
    let date = moment().format('DD.MM.YYYY HH:mm')
    mp.logs.addLog = (message, type, accountId, characterId, data = date) => {
        DB.Handle.query("INSERT INTO talrasha_log (type,accountId,characterId,message,data) VALUES (?,?,?,?,?)", [type, accountId, characterId, message, JSON.stringify(data)]);
    };
    mp.logs.factions = (recID, playerName, msg) => {
        debug(`mp.logs.factions: ${recID} ${playerName} ${msg}`)
        DB.Handle.query("INSERT INTO talrasha_logs_faction (targetID, playerName, msg, dateID) VALUES (?,?,?,?)", [recID, playerName, msg, date]);
    }
    mp.logs.storage = (playerName, uid, faction, rank, act, count, itemName) => {
        DB.Handle.query("INSERT INTO talrasha_logs_storage (playerName, uid, faction, rankName, act, count, itemName, dateId) VALUES (?,?,?,?,?,?,?,?)", [playerName, uid, faction, rank, act, count, itemName, date]);
    }
}
