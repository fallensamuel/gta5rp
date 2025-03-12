const {
    selectBalanceFaction,
    selectOnlinePlayer,
    updateOnline,
    initStorageBalance,
    initTeamPlayer,
    windrawBalance,
    showBalanceFactionLog,
    updateLastDate,
} = require("./talrasha_database")

const moment = require('moment')
const {selectStorageLogs} = require("./talrasha_database");

let settings = []

mp.events.add('ipad.faction.handler', handlerFactions)
mp.events.add('ipad.check.params', paramsCheck)

mp.events.add('ipad.init.teamPlayers', initTeamPlayers)
mp.events.add('ipad.check.balance', checkBalanceFaction)
mp.events.add('ipad.withdrawal', withdrawalSend)
mp.events.add('ipad.accession', sendAccession)

mp.events.add('ipad.give.rank', giveRank)
mp.events.add('ipad.leave.rank', leaveRank)
mp.events.add('ipad.kick.faction', unInviteFaction)
mp.events.add('ipad.call.settings', updateSettings)
mp.events.add('ipad.load.logsChar', loadLogsCharacters)

function handlerFactions(player) {
    if(player.faction !== 0) {
     let arraySettings = []

     settings.forEach(item=> {
       if(item.faction === player.faction) {
         arraySettings.push({
           id: item.id,
           faction: item.faction,
           rank: item.rank,
           invite: item.invite,
           unInvite: item.unInvite,
           setRank: item.setRank,
           storage: item.storage,
           craft: item.craft,
           safy: item.safy,
         })
       }
     })
     player.call('ipad.faction.show', [JSON.stringify(arraySettings)])
    } else return player.utils.warning('Вы не состоите во фракции')
}

function loadLogsCharacters(player, data) {
    let res = JSON.parse(data)
    // debug(`data: ${data}`)
    DB.Handle.query('SELECT * FROM talrasha_logs_faction WHERE targetID=?', [res.uid], (err, result) => {
        if(err) return console.log(err)
        // debug(`result: ${JSON.stringify(result)}`)
        let logs = result
        // debug(`logs: ${JSON.stringify(logs)}`)
        const logsList = []

        logs.forEach(item => {
            logsList.push({
                id: item.id,
                targetID: item.targetID,
                playerName: item.playerName,
                msg: item.msg,
                date: item.dateID
            })
        })

        // debug(`logsList: ${logsList}`)
        setTimeout(() => {
          player.call('ipad.call.logs', [JSON.stringify({logsList: logsList, index: res.i})])
        }, 700)
    })
}

function getSettings(player) {
    let arraySettings = []

    settings.forEach(item => {
        if(item.faction === player.faction) {
            arraySettings.push({
                id: item.id,
                faction: item.faction,
                rank: item.rank,
                invite: item.invite,
                unInvite: item.unInvite,
                setRank: item.setRank,
                storage: item.storage,
                craft: item.craft,
                safy: item.safy,
            })
        }
    })
    // debug(`arraySettings: ${JSON.stringify(arraySettings)}`)
    player.call('ipad.get.settings', [JSON.stringify(arraySettings)])
}

function paramsCheck(player) {
    DB.Handle.query('SELECT * FROM talrasha_faction WHERE id=?', [player.faction], (err, result) => {
      if(err) return console.log(err)
      if(result.length > 0) {
        let res = result
        // debug(`result.leader: ${JSON.stringify(res)}`)
        if(res[0].leader === player.sqlId) {
            player.call('ipad.check.client', [JSON.stringify({
                name: player.name,
                faction: player.faction,
                rank: player.rank,
                owner: true,
            })
            ])
        } else {
           player.call('ipad.check.client', [JSON.stringify({
                name: player.name,
                faction: player.faction,
                rank: player.rank,
                owner: false
            })
            ])
          }
      }
    })
}


async function initTeamPlayers(player) {
    if(player.faction !== 0) {

    const listPlayer = await initTeamPlayer(player, player.faction)
    const storageList = await initStorageBalance(player, player.faction)
    const storageLogs = await selectStorageLogs(player, player.faction)
    const factionName = await checkFactionsName(player, player.faction)
    const rankList = await checkRanksList(player, player.faction)
    const rankName = mp.factionRanks[player.faction][player.rank].name

    const listTeam = []
    const logsArray = []
    // debug(`rankList: ${JSON.stringify(rankList)}`)
    listPlayer.forEach(item => {
        listTeam.push({
            id: item.id,
            name: item.name,
            faction: item.faction,
            rank: item.rank,
            rankName: mp.factionRanks[item.faction][item.rank].name,
            online: item.online,
            lastDate: item.lastDate,
        })
    })
    if(!storageLogs.length) {
        player.call('ipad.gov.addTeamPlayer', [JSON.stringify({
            faction: factionName[0].name,
            rankName: rankName,
            rankList: rankList,
            team: listTeam,
            storage: storageList[0].products,
            maxStorage: storageList[0].maxProducts,
            logStorage: logsArray,
        })
        ])
    } else return player.call('ipad.gov.addTeamPlayer', [JSON.stringify({
        faction: factionName[0].name,
        team: listTeam,
        rankName: rankName,
        rankList: rankList,
        storage: storageList[0].products,
        maxStorage: storageList[0].maxProducts,
        logStorage: storageLogs,
    })
    ])
    }
}

async function checkFactionsName(player, faction) {
    return new Promise((res) => {
        DB.Handle.query('SELECT * FROM talrasha_faction WHERE id=?', [faction], (err, result) => {
            if (err) return console.log(err)
            if (result.length > 0) {
                 res(result)
            } else player.utils.error('Фракция не найдена')
        })
    })
}

async function checkRanksList(player, faction) {
    return new Promise((res) => {
        DB.Handle.query('SELECT * FROM talrasha_faction_rank WHERE factionId=?', [faction], (err, result) => {
            if (err) return console.log(err)
            if (result.length > 0) {
                 res(result)
            } else player.utils.error('Ранги фракции не найдены')
        })
    })
}

async function checkBalanceFaction(player) {
    const infoBalance = await selectBalanceFaction(player, player.faction)
    const listBalance =  await showBalanceFactionLog(player)

    const objList = []
    const balanceList = []

    listBalance.forEach(item => {
        if(item.faction === player.faction) {
            objList.push({
                id: item.id,
                faction: item.faction,
                name: item.name,
                uid: item.uid,
                rank: item.rankName,
                use: item.actChar,
                summ: item.summ,
                date: item.dateId
            })
        }
    })

    setTimeout(() => {
      player.call('ipad.call.showFactionBalance', [JSON.stringify({infoBalance: infoBalance, objList: objList})])
    }, 500)
}

async function characterInitOnline(player, online) {
    player.checkClickIpadSettings = null
    updateOnline(player, online, player.sqlId)
    player.online = await selectOnlinePlayer(player, player.sqlId)
}

async function withdrawalSend(player, summ){
    let sett = checkLoadSettings(player, player.faction, player.rank)
    if(sett === null || sett.safy === 0) return player.utils.error('У вас нет прав!')
    if(!summ.length) return player.utils.error('Вы не указали сумму для снятия!')

    const infoBalance = await selectBalanceFaction(player, player.faction)
    let summary = parseInt(summ)

    if(infoBalance < summary) return player.utils.error('На счету фракции не достаточно средств для снятия!')

    windrawBalance(player, infoBalance - summary, player.faction)

    player.utils.setBankMoney(player.bank + summary)
    player.utils.success(`Вы сняли с баланса фракции $ ${summary}.`)
    balanceFactionLog(player, player.faction, player.name, player.sqlId, mp.factionRanks[player.faction][player.rank].name, 'Снятие', summary)
}

async function sendAccession(player, summ){
    const infoBalance = await selectBalanceFaction(player, player.faction)
    let summary = parseInt(summ)
    if(!summ.length) return player.utils.error('Вы не указали сумму для пополнения!')
    if(player.bank < summary) return player.utils.error('На счету банка не достаточно средств для пополнения')

    windrawBalance(player, infoBalance + summary, player.faction)

    player.utils.setBankMoney(player.bank - summary)
    player.utils.success(`Вы пополнили баланс фракции на $ ${summary}.`)
    balanceFactionLog(player, player.faction, player.name, player.sqlId, mp.factionRanks[player.faction][player.rank].name, 'Пополнение', summary)
}

function balanceFactionLog(player, faction, name, uid, rank, actChar, summ) {
    let date = moment().format('DD.MM.YYYY HH:mm')
    DB.Handle.query("INSERT INTO talrasha_balance_factions_logs SET faction=?, name=?, uid=?, actChar=?, summ=?, dateId=?, rankName=?", [faction, name, uid, actChar, summ, date, rank], (err, result) => {
        if(err) console.log(err)
        checkBalanceFaction(player)
        setTimeout(() => {
         player.call('ipad.closed.windraw')
        }, 700)
    })
}

function lastDateLog(player) {
    let date = moment().format('DD.MM.YYYY HH:mm')
    updateLastDate(player, player.sqlId, date)
}

function giveRank(player, recId) {
    let sett = checkLoadSettings(player, player.faction, player.rank)
    let sqlId = parseInt(recId)

    DB.Handle.query('SELECT * FROM talrasha_character WHERE id=?', [sqlId], (err, result) => {
        if(err) return console.log(err)
        if(!result.length) return player.utils.error('Фракция не найдена!')

        let confirmCharecter = result

        const currentCharacter = []

        if(confirmCharecter[0].online === 1) {

            mp.players.forEach(res => {
                if(res.name === confirmCharecter[0].name) {
                    currentCharacter.push({
                        id: res.id,
                        name: res.id,
                        faction: res.faction,
                        rank: res.rank
                    })
                }
            })
            if(sett === null || sett.setRank === 0) return player.utils.error(`У вас нет прав!`)
            let rec = mp.players.at(parseInt(currentCharacter[0].id))
            if (!rec) return player.utils.error(`Гражданин не найден!`)
            if (!player.faction || player.rank < mp.factionRanks[player.faction].length - 2) return player.utils.error(`У вас нет прав!`)
            if (rec.faction !== player.faction) return player.utils.error(`Гражданин не в Вашей организации!`)
            if(rec.name === player.name) return player.utils.error(`Невозможно повысить себя`)
            if (rec.rank >= player.rank - 1) return player.utils.error(`Невозможно повысить выше!`)
            let rankName = mp.factionRanks[rec.faction][rec.rank + 1].name

            rec.utils.setFactionRank(rec.rank + 1)

            player.utils.success(`${rec.name} повышен до ${rankName}`)
            rec.utils.success(`${player.name} повысил Вас до ${rankName}`)

            // debug(`Logsick: ${rec.sqlId}`)
            mp.logs.factions(rec.sqlId, player.name, `Повысил игрока ${rec.name} до ${rankName}`)
            mp.logs.addLog(`${player.name} повысил игрока ${rec.name} в должности. Ранг: ${rec.rank + 1}`, 'faction', player.account.id, player.sqlId, { rank: rec.rank + 1, faction: rec.faction })
            mp.logs.addLog(`${rec.name} был повышен игроком ${player.name} в должности. Ранг: ${rec.rank + 1}`, 'faction', rec.account.id, rec.sqlId, { rank: player.rank, faction: player.faction })
        } else {
            player.utils.error('Ошибка - не возможно повысить, игрок офлайн')
            // DB.Handle.query('SELECT * FROM talrasha_character WHERE id=?', [sqlId], (err, result) => {
            //   if(err) return console.log(err)
            //     let targetPlayer = result
            //     // debug(`targetPlayer: ${JSON.stringify(targetPlayer)}`)
            //     if(sett === null || sett.setRank === 0) return player.utils.error(`У вас нет прав!`)
            //     if (targetPlayer[0].faction !== player.faction)
            //         return player.utils.error(`Гражданин не в Вашей организации!`)
            //     if(targetPlayer[0].name === player.name)
            //         return player.utils.error(`Невозможно повысить себя`)
            //     if (targetPlayer[0].rank >= player.rank - 1)
            //         return player.utils.error(`Невозможно повысить выше!`)
            //
            //     let rankName = mp.factionRanks[targetPlayer[0].faction][targetPlayer[0].rank + 1].name
            //
            //     DB.Handle.query('UPDATE talrasha_character SET `rank=?` WHERE id=?', [targetPlayer[0].rank + 1, sqlId], (err, result) => {
            //         if(err) return console.log(err)
            //
            //         player.utils.success(`${targetPlayer[0].name} повышен до ${rankName}`)
            //         mp.logs.factions(targetPlayer[0].id, player.name, `Повысил игрока ${targetPlayer[0].name} до ${rankName}`)
            //         mp.logs.addLog(`${player.name} повысил игрока ${targetPlayer[0].name} в должности. Ранг: ${targetPlayer[0].rank + 1}`, 'faction', player.account.id, player.sqlId, { rank: targetPlayer[0].rank + 1, faction: targetPlayer[0].faction })
            //         mp.logs.addLog(`${targetPlayer[0].name} был повышен игроком ${player.name} в должности. Ранг: ${targetPlayer[0].rank + 1}`, 'faction', targetPlayer[0].account.id, targetPlayer[0].sqlId, { rank: player.rank, faction: player.faction })
            //     })
            //     // giveRankUpdate(player, currentCharacter[0].rank + 1, currentCharacter[0].sqlId)
            // })
        }
    })
}

function leaveRank(player, recId) {
    let sett = checkLoadSettings(player, player.faction, player.rank)
    let sqlId = parseInt(recId)

    DB.Handle.query('SELECT * FROM talrasha_character WHERE id=?', [sqlId], (err, result) => {
        if(err) return console.log(err)
        if(!result.length) return player.utils.error('Фракция не найдена!')
        let confirmCharecter = result

        const currentCharacter = []

        if(confirmCharecter[0].online === 1) {
            mp.players.forEach(res => {
                if(res.name === confirmCharecter[0].name) {
                    currentCharacter.push({
                        id: res.id,
                        name: res.id,
                        sqlId: res.sqlId,
                        faction: res.faction,
                        rank: res.rank
                    })
                }
            })

            let rec = mp.players.at(parseInt(currentCharacter[0].id))
            if(sett === null || sett.setRank === 0) return player.utils.error(`У вас нет прав!`)
            if (!rec) return player.utils.error(`Гражданин не найден!`)
            if (!player.faction || player.rank < mp.factionRanks[player.faction].length - 2)
                return player.utils.error(`У вас нет прав!`)
            if (rec.faction !== player.faction)
                return player.utils.error(`Гражданин не в Вашей организации!`)
            if(rec.name === player.name)
                return player.utils.error(`Невозможно понизить себя`)
            if (rec.rank === mp.factionRanks[rec.faction].length - 1)
                return player.utils.error(`Невозможно понизить лидера!`)
            if (rec.rank <= 1)
                return player.utils.error(`Невозможно понизить ниже!`)

            let rankName = mp.factionRanks[rec.faction][rec.rank - 1].name

            rec.utils.setFactionRank(rec.rank - 1)

            player.utils.success(`${rec.name} понижен до ${rankName}`)
            rec.utils.success(`${player.name} понизил Вас до ${rankName}`)

            mp.logs.factions(rec.sqlId, player.name, `Понизил игрока ${rec.name} до ${rankName}`)
            mp.logs.addLog(`${player.name} понизил игрока ${rec.name} в должности. Ранг: ${rec.rank - 1}`, 'faction', player.account.id, player.sqlId, { rank: rec.rank - 1, faction: rec.faction })
            mp.logs.addLog(`${rec.name} был понижен игроком ${player.name} в должности. Ранг: ${rec.rank - 1}`, 'faction', rec.account.id, rec.sqlId, { rank: player.rank, faction: player.faction })
        } else {
            player.utils.error('Ошибка - не возможно понизить, игрок офлайн')
            // DB.Handle.query('SELECT * FROM talrasha_character WHERE id=?', [sqlId], (err, result) => {
            //     if (err) return console.log(err)
            //     let targetPlayer = result
            //     if(sett === null || sett.setRank === 0)
            //         return player.utils.error(`У вас нет прав!`)
            //     if (targetPlayer[0].faction !== player.faction)
            //         return player.utils.error(`Гражданин не в Вашей организации!`)
            //     if(targetPlayer[0].name === player.name)
            //         return player.utils.error(`Невозможно понизить себя`)
            //     if (targetPlayer[0].rank === mp.factionRanks[targetPlayer[0].faction].length - 1)
            //         return player.utils.error(`Невозможно понизить лидера!`)
            //     if (targetPlayer[0].rank <= 1)
            //         return player.utils.error(`Невозможно понизить ниже!`)
            //
            //     let rankName = mp.factionRanks[targetPlayer[0].faction][targetPlayer[0].rank + 1].name
            //
            //     DB.Handle.query('UPDATE talrasha_character SET `rank=?` WHERE id=?', [targetPlayer[0].rank - 1, sqlId], (err, result) => {
            //         if(err) return console.log(err)
            //         player.utils.success(`${targetPlayer[0].name} понижен до ${rankName}`)
            //         mp.logs.factions(targetPlayer[0].id, player.name, `Понизил игрока ${targetPlayer[0].name} до ${rankName}`)
            //         mp.logs.addLog(`${player.name} понизил игрока ${targetPlayer[0].name} в должности. Ранг: ${targetPlayer[0].rank - 1}`, 'faction', player.account.id, player.sqlId, { rank: targetPlayer[0].rank - 1, faction: targetPlayer[0].faction })
            //         mp.logs.addLog(`${targetPlayer[0].name} был понижен игроком ${player.name} в должности. Ранг: ${targetPlayer[0].rank - 1}`, 'faction', targetPlayer[0].account.id, targetPlayer[0].sqlId, { rank: player.rank, faction: player.faction })
            //     })
            //     // giveRankUpdate(player, currentCharacter[0].rank - 1, currentCharacter[0].sqlId)
            // })
        }
    })
}

function unInviteFaction(player, recId) {
    let sett = checkLoadSettings(player, player.faction, player.rank)
    let sqlId = parseInt(recId)
    DB.Handle.query('SELECT * FROM talrasha_character WHERE id=?', [sqlId], (err, result) => {
        if(err) return console.log(err)
        if(!result.length) return player.utils.error('Фракция не найдена!')
        let confirmCharecter = result

        const currentCharacter = []

        if(confirmCharecter[0].online === 1) {

            mp.players.forEach(res => {
                if(res.name === confirmCharecter[0].name) {
                    currentCharacter.push({
                        id: res.id,
                        name: res.id,
                        faction: res.faction,
                        rank: res.rank
                    })
                }
            })

            let rec = mp.players.at(parseInt(currentCharacter[0].id))
            if(sett === null || sett.unInvite === 0) return player.utils.error(`У вас нет прав!`)
            if (!rec)
                return player.utils.error(`Гражданин не найден!`)
            if (rec.faction !== player.faction)
                return player.utils.error(`Гражданин не в Вашей организации!`)
            if(rec.name === player.name)
                return player.utils.error('Невозможно уволить самого себя!')
            if (rec.rank === mp.factionRanks[rec.faction].length - 1)
                return player.utils.error(`Невозможно уволить лидера!`)

            rec.utils.setFaction(0)

            player.utils.info(`Вы уволили ${rec.name} из организации`)
            rec.utils.info(`${player.name} уволил Вас из организации`)

            mp.logs.factions(rec.sqlId, player.name, `Уволил игрока ${rec.name} до ${rankName}`)
            mp.logs.addLog(`${player.name} уволил игрока ${rec.name} из организации. Ранг: ${rec.rank}`, 'faction', player.account.id, player.sqlId, { rank: rec.rank, faction: rec.faction })
            mp.logs.addLog(`${rec.name} был уволен игроком ${player.name} из организации. Ранг: ${rec.rank}`, 'faction', rec.account.id, rec.sqlId, { rank: player.rank, faction: player.faction })
        } else {
            player.utils.error('Ошибка - не возможно уволить, игрок офлайн')
            // DB.Handle.query('SELECT * FROM talrasha_character WHERE id=?', [sqlId], (err, result) => {
            //     if (err) return console.log(err)
            //     let targetPlayer = result
            //     if(sett === null || sett.unInvite === 0) return player.utils.error(`У вас нет прав!`)
            //     if (targetPlayer[0].faction !== player.faction)
            //         return player.utils.error(`Гражданин не в Вашей организации!`)
            //     if(targetPlayer[0].name === player.name)
            //         return player.utils.error(`Невозможно уволить себя`)
            //     if (targetPlayer[0].rank === mp.factionRanks[targetPlayer[0].faction].length - 1)
            //         return player.utils.error(`Невозможно уволить лидера!`)
            //     // if (player.faction < targetPlayer[0].rank)
            //     //     return player.utils.error('Невозможно уволить старших по званию!')
            //
            //     DB.Handle.query('UPDATE talrasha_character SET `faction=?`,`rank=?` WHERE id=?', [0, 0, sqlId], (err, result) => {
            //         if(err) return console.log(err)
            //         player.utils.info(`Вы уволили ${targetPlayer[0].name} из организации`)
            //         mp.logs.factions(targetPlayer[0].id, player.name, `Уволил игрока ${targetPlayer[0].name} до ${rankName}`)
            //         mp.logs.addLog(`${player.name} уволил игрока ${targetPlayer[0].name} из организации. Ранг: ${targetPlayer[0].rank}`, 'faction', player.account.id, player.sqlId, { rank: targetPlayer[0].rank, faction: targetPlayer[0].faction })
            //         mp.logs.addLog(`${targetPlayer[0].name} был уволен игроком ${player.name} из организации. Ранг: ${targetPlayer[0].rank}`, 'faction', targetPlayer[0].account.id, targetPlayer[0].sqlId, { rank: player.rank, faction: player.faction })
            //     })
            //     // characterLeaveFaction(player, currentCharacter[0].sqlId)
            // })
        }
    })
}

function loadSettings() {
    DB.Handle.query('SELECT * FROM talrasha_faction_settings', (err, result) => {
        if(err) return console.log(err)
        if(!result.length) return console.log('[SETTINGS FACTIONS] не удалось загрузить настройки для фракций')
        let settingsFull = result

        settings = []

        settingsFull.forEach(item => {
            settings.push({
                id: item.id,
                faction: item.faction,
                rank: item.rank,
                invite: item.invite,
                unInvite: item.uninvite,
                setRank: item.setrank,
                storage: item.storage,
                craft: item.craft,
                safy: item.safy,
            })
        })
        console.log(`\x1b[32m[DONE]\x1b[0m "Settings factions" package has been loaded: \x1b[33m${settingsFull.length}\x1b[0m.`)
    })
}

function updateSettings(player, data) {
    let res = JSON.parse(data)

    let invite = checkBool(player, res.set.invite)
    let unInvite = checkBool(player, res.set.unInvite)
    let setRank = checkBool(player, res.set.rank)
    let storage = checkBool(player, res.set.storage)
    let craft = checkBool(player, res.set.craft)
    let safy = checkBool(player, res.set.safy)

    // debug(`res: ${JSON.stringify(res)}`)
    DB.Handle.query('UPDATE talrasha_faction_settings SET invite=?, uninvite=?, setrank=?, storage=?, craft=?, safy=? WHERE id=?', [invite, unInvite, setRank, storage, craft, safy, res.id], (err, result) => {
        if (err) console.log(err)
        //console.log('Настройки сохранены')
        player.utils.success('Настройки сохранены')
        player.call('ipad.click.sound')
        loadSettings()
        setTimeout(() => {
            getSettings(player)
            getSettings(player)
        }, 500)
    })
}

function checkLoadSettings(player, faction, rank) {
 let sett = null
 settings.find(item => {
   if(item.faction === faction) {
     if(item.rank === rank) {
       sett = item
     }
   }
 })
 // debug(`sett: ${JSON.stringify(sett)}`)
 return sett
}

function checkBool(player, item) {
    if(item === false) return 0
    if(item === true) return 1
    if(item === null) return 0
}

module.exports = {
    characterInitOnline,
    lastDateLog,
    loadSettings,
    checkLoadSettings
}

