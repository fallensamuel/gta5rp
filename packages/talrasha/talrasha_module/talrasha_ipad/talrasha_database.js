module.exports = {
 initTeamPlayer(player, faction) {
  return new Promise((res) => {
    DB.Handle.query('SELECT * FROM talrasha_character WHERE faction=?', [faction], (err, result) => {
        if(err) return console.log(err)
        res(result)
    })
  })
 },
 initStorageBalance(player, id) {
  return new Promise((res) => {
    DB.Handle.query('SELECT * FROM talrasha_faction WHERE id=?', [id], (err, result) => {
        if(err) return console.log(err)
        res(result)
    })
  })
 },
 characterCheckRank(player, id) {
   return new Promise((res) => {
     DB.Handle.query('SELECT * FROM talrasha_character WHERE id=?', [id], (err, result) => {
       if(err) return console.log(err)
       res(result)
     })
   })
 },
 characterLeaveFaction(player, id) {
     DB.Handle.query("UPDATE talrasha_character SET faction=?,rank=? WHERE id=?", [0, 0, id], (err, result) => {
       if(err) return console.log(err)
     })
 },
 selectOnlinePlayer(player, id) {
  return new Promise((res) => {
    DB.Handle.query('SELECT * FROM talrasha_character WHERE id=?', [id], (err, result) => {
        if(err) return console.log(err)
        res(result[0].online)
    })
  })
 },

 selectStorageLogs(player, faction) {
     return new Promise((res) => {
         DB.Handle.query('SELECT * FROM talrasha_logs_storage WHERE faction=?', [faction], (err, result) => {
             if (err) return console.log(err)
             res(result)
         })
     })
 },
 selectBalanceFaction(player, id) {
  return new Promise((res) => {
    DB.Handle.query('SELECT * FROM talrasha_faction WHERE id=?', [id], (err, result) => {
        if(err) return console.log(err)
        res(result[0].balance)
    })
  })
 },
 updateOnline(player, online, id) {
  DB.Handle.query('UPDATE talrasha_character SET online=? WHERE id=?', [online, id], (err, result) => {
    if(err) console.log(err)
  })
 },
 windrawBalance(player, balance, id) {
  DB.Handle.query('UPDATE talrasha_faction SET balance=? WHERE id=?', [balance, id], (err, result) => {
    if(err) console.log(err)
  })
 },
 updateLastDate(player, id, date){
  DB.Handle.query('UPDATE talrasha_character SET lastDate=? WHERE id=?', [date, id], (err, result) => {
    if(err) console.log(err)
  })
 },
 updateLogBalance(player, f, n, u, r, a, s, d) {
  DB.Handle.query("INSERT INTO talrasha_balance_factions_logs SET faction=?, name=?, uid=?, actChar=?, summ=?, dateId=?, rankId=?", [f, n, u, a, s, d, r], (err, result) => {
         if(err) console.log(err)
  })
 },
 updateSettingsFactions(player, id, invite, uninvite, setrank, storage, craft, safy) {
  DB.Handle.query('UPDATE talrasha_faction_settings SET invite=?, uninvite=?, setrank=?, storage=?, craft=?, safy=? WHERE id=?', [invite, uninvite, setrank, storage, craft, safy, id], (err, result) => {
    if(err) console.log(err)
  })
 },
 giveRankUpdate(player, rank, id) {
   DB.Handle.query("UPDATE talrasha_character SET rank=? WHERE id=?", [rank, id], (err, result) => {
      if(err) return console.log(err)
   })
 },
 showBalanceFactionLog(player) {
   return new Promise((res) => {
     DB.Handle.query('SELECT * FROM talrasha_balance_factions_logs', (err, result) => {
       if(err) return console.log(err)
       res(result)
     })
   })
 },
 loadSettingsGlobal() {
   return new Promise((res) => {
     DB.Handle.query('SELECT * FROM talrasha_faction_settings', (err, result) => {
       if(err) return console.log(err)
       res(result)
     })
   })
 },
 loadLogsCharactersFactions(player, targetID) {
   return new Promise((res) => {
     DB.Handle.query('SELECT * FROM talrasha_logs_faction WHERE targetID=?', [targetID], (err, result) => {
       if(err) return console.log(err)
       res(result)
     })
   })
 },
}