module.exports.Init = function() {
    mp.black_list_words = [];
    DB.Handle.query("SELECT * FROM talrasha_black_word", (e, result) => {
        for (var i = 0; i < result.length; i++) {
			mp.black_list_words.push(result[i].word)
        } 
		console.log(`\x1b[32m[DONE]\x1b[0m "Bad words" package has been loaded: \x1b[33m${i}\x1b[0m.`);
    });
}



mp.events.add("server::sendAdMessage", (player, info, price) => {
	info = JSON.parse(info);
	price = parseInt(info[1])
	text = info[0]
	
	var isfind = false
	
	for (var i = 0; i < mp.black_list_words.length; i++) {
		if (text.match(new RegExp(mp.black_list_words[i],"g","i"))) {
			isfind = true
		}
    } 
	
	if (isfind) return player.utils.error(`Объявление содержит запретное слово!`);
	
	if (player.bank < price) {
        player.utils.warning("На балансе недостаточно денег!");
        return;
    }
	 
	 
	player.utils.setBankMoney(player.bank - price);
	
	mp.players.forEach((rec) => {
		if (rec.sqlId != undefined) rec.call("client::setndAdMessage", [text, player.name, player.phone, new Date().getTime()]); 
	});
})