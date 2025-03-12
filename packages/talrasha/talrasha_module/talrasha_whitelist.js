let whitelist = [];

function checkPlayer(player) {
	const socialClub = player.socialClub.toLowerCase();

	if (whitelist.indexOf(socialClub) >= 0) {
		return;
	}

	//player.kick("Вы отсутствуете в Whitelist.");
}

function initwhitelist(isRefresh = false) {
	if (whitelist.length > 0) {
		whitelist = [];
	}

	DB.Handle.query("SELECT * FROM talrasha_white_list WHERE enabled=1", (e, result) => {
		if (e) {
			console.log(`Whitelist не загружен, ${e}`);
			return;
		}

		for (const row of result) {
			whitelist.push(row.socialClub.toLowerCase());
		}

		if (!isRefresh) {
			mp.events.add("playerJoin", checkPlayer);
		}

		mp.players.forEach(checkPlayer);
		
		console.log(`\x1b[32m[DONE]\x1b[0m "White list" package has been loaded: \x1b[33m${whitelist.length}\x1b[0m.`);
	});
}

module.exports = {
	Init: () => {
		initwhitelist();
	},
	Refresh() {
		initwhitelist(true);
	}
}
