module.exports = {
  zoneLoadInfo() {
    return new Promise((res) => {
      DB.Handle.query('SELECT * FROM talrasha_wzp_info', (err, result) => {
        if(err) return console.log(err)
        if(result.length < 1) return
        console.log(`\x1b[32m[DONE]\x1b[0m "Wzp info" package has been loaded \x1b[33m${result.length}\x1b[0m.`)
        res(result)
      })
    })
  },
  updateZoneFaction(zone, faction, date) {
    DB.Handle.query('UPDATE talrasha_wzp_info SET faction=?, date=? WHERE id=?', [faction, date, zone], (err, result) => {
    if(err) return console.log(err)
    })
  },
  zoneFaction(faction) {
    return new Promise((res) => {
      DB.Handle.query('SELECT * FROM talrasha_wzp_info WHERE faction=?', [faction], (err, result) => {
        if(err) return console.log(err)
        if(result.length < 1) return
        res(result.length)
      })
    })
  }
}


