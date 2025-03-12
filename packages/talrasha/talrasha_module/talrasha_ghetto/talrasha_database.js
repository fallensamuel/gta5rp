module.exports = {
  loadCaptureZone() {
    return new Promise((res) => {
      DB.Handle.query("SELECT * FROM talrasha_capture_info", (err, result) => {
        if(err) return console.log(err)
        if(result.length < 1) return
        console.log(`\x1b[32m[DONE]\x1b[0m "Capture zone" package has been loaded \x1b[33m${result.length}\x1b[0m.`)
        res(result)
      })
    })
  },
  updateCaptureZoneFaction(zone, faction, color, date) {
      DB.Handle.query('UPDATE talrasha_capture_info SET factionID=?, date=?, color=? WHERE id=?', [faction, date, color, zone], (err, result) => {
        if (err) return console.log(err)
      })
  },
  zoneFaction(faction) {
    return new Promise((res) => {
      DB.Handle.query('SELECT * FROM talrasha_capture_info WHERE factionID=?', [faction], (err, result) => {
        if(err) return console.log(err)
        if(result.length < 1) return
        res(result.length)
      })
    })
  }
}