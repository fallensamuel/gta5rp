class Casino {
    constructor(){ 
	   mp.casinoInfo = {}
	   mp.casinoTables = {}
	   mp.casinoAnimInfo = {
		   tableLib: 'anim_casino_b@amb@casino@games@roulette@table',
		   tableStart: 'intro_wheel',
		   tableMain: 'loop_wheel',
		   speed: 136704,
		   ballRot: 90.6,
		   ballStart: 'intro_ball',
		   ballMain: 'loop_ball',
		   dealerLib: 'anim_casino_b@amb@casino@games@roulette@dealer'
	   }
	   
		this.defaultKeyToChip = [ //Процент на каждое число
		   {key: 1, chip: '00', precent: 2.63},
		   {key: 2, chip: 27, precent: 2.63},
		   {key: 3, chip: 10, precent: 2.63},
		   {key: 4, chip: 25, precent: 2.63},
		   {key: 5, chip: 29, precent: 2.63},
		   {key: 6, chip: 12, precent: 2.63},
		   {key: 7, chip: 8, precent: 2.63},
		   {key: 8, chip: 19, precent: 2.63},
		   {key: 9, chip: 31, precent: 2.63},
		   {key: 10, chip: 18, precent: 2.63},
		   {key: 11, chip: 6, precent: 2.63},
		   {key: 12, chip: 21, precent: 2.63},
		   {key: 13, chip: 33, precent: 2.63},
		   {key: 14, chip: 16, precent: 2.63},
		   {key: 15, chip: 4, precent: 2.63},
		   {key: 16, chip: 23, precent: 2.63},
		   {key: 17, chip: 35, precent: 2.63},
		   {key: 18, chip: 14, precent: 2.63},
		   {key: 19, chip: 2, precent: 2.63},
		   {key: 20, chip: 0, precent: 2.63},
		   {key: 21, chip: 28, precent: 2.63},
		   {key: 22, chip: 9, precent: 2.63},
		   {key: 23, chip: 26, precent: 2.63},
		   {key: 24, chip: 30, precent: 2.63},
		   {key: 25, chip: 11, precent: 2.63},
		   {key: 26, chip: 7, precent: 2.63},
		   {key: 27, chip: 20, precent: 2.63},
		   {key: 28, chip: 32, precent: 2.63},
		   {key: 29, chip: 17, precent: 2.63},
		   {key: 30, chip: 5, precent: 2.63},
		   {key: 31, chip: 22, precent: 2.63},
		   {key: 32, chip: 34, precent: 2.63},
		   {key: 33, chip: 15, precent: 2.63},
		   {key: 34, chip: 3, precent: 2.63},
		   {key: 35, chip: 24, precent: 2.63},
		   {key: 36, chip: 36, precent: 2.63},
		   {key: 37, chip: 13, precent: 2.63},
		   {key: 38, chip: 1, precent: 2.63}
		]
		
		this.defaultFullPrecent = 99.94 //Общий процент
	   
	    this.keyToChip = {}
		this.fullPrecent = {}
	   
	   
		this.tableChipsOffsets = [
			{mult: 35, keys: ["0"]},
			{mult: 35, keys: ["00"]},
			{mult: 35, keys: ["1"]},
			{mult: 35, keys: ["2"]},
			{mult: 35, keys: ["3"]},
			{mult: 35, keys: ["4"]},
			{mult: 35, keys: ["5"]},
			{mult: 35, keys: ["6"]},
			{mult: 35, keys: ["7"]},
			{mult: 35, keys: ["8"]},
			{mult: 35, keys: ["9"]},
			{mult: 35, keys: ["10"]},
			{mult: 35, keys: ["11"]},
			{mult: 35, keys: ["12"]},
			{mult: 35, keys: ["13"]},
			{mult: 35, keys: ["14"]},
			{mult: 35, keys: ["15"]},
			{mult: 35, keys: ["16"]},
			{mult: 35, keys: ["17"]},
			{mult: 35, keys: ["18"]},
			{mult: 35, keys: ["19"]},
			{mult: 35, keys: ["20"]},
			{mult: 35, keys: ["21"]},
			{mult: 35, keys: ["22"]},
			{mult: 35, keys: ["23"]},
			{mult: 35, keys: ["24"]},
			{mult: 35, keys: ["25"]},
			{mult: 35, keys: ["26"]},
			{mult: 35, keys: ["27"]},
			{mult: 35, keys: ["28"]},
			{mult: 35, keys: ["29"]},
			{mult: 35, keys: ["30"]},
			{mult: 35, keys: ["31"]},
			{mult: 35, keys: ["32"]},
			{mult: 35, keys: ["33"]},
			{mult: 35, keys: ["34"]},
			{mult: 35, keys: ["35"]},
			{mult: 35, keys: ["36"]},
			/*{mult: 17, keys: ["0","00"]},
			{mult: 17, keys: ["1","2"]},
			{mult: 17, keys: ["2","3"]},
			{mult: 17, keys: ["4","5"]},
			{mult: 17, keys: ["5","6"]},
			{mult: 17, keys: ["7","8"]},
			{mult: 17, keys: ["8","9"]},
			{mult: 17, keys: ["10","11"]},
			{mult: 17, keys: ["11","12"]},
			{mult: 17, keys: ["13","14"]},
			{mult: 17, keys: ["14","15"]},
			{mult: 17, keys: ["16","17"]},
			{mult: 17, keys: ["17","18"]},
			{mult: 17, keys: ["19","20"]},
			{mult: 17, keys: ["20","21"]},
			{mult: 17, keys: ["22","23"]},
			{mult: 17, keys: ["23","24"]},
			{mult: 17, keys: ["25","26"]},
			{mult: 17, keys: ["26","27"]},
			{mult: 17, keys: ["28","29"]},
			{mult: 17, keys: ["29","30"]},
			{mult: 17, keys: ["31","32"]},
			{mult: 17, keys: ["32","33"]},
			{mult: 17, keys: ["34","35"]},
			{mult: 17, keys: ["35","36"]},
			{mult: 17, keys: ["1","4"]},
			{mult: 17, keys: ["2","5"]},
			{mult: 17, keys: ["3","6"]},
			{mult: 17, keys: ["4","7"]},
			{mult: 17, keys: ["5","8"]},
			{mult: 17, keys: ["6","9"]},
			{mult: 17, keys: ["7","10"]},
			{mult: 17, keys: ["8","11"]},
			{mult: 17, keys: ["9","12"]},
			{mult: 17, keys: ["10","13"]},
			{mult: 17, keys: ["11","14"]},
			{mult: 17, keys: ["12","15"]},
			{mult: 17, keys: ["13","16"]},
			{mult: 17, keys: ["14","17"]},
			{mult: 17, keys: ["15","18"]},
			{mult: 17, keys: ["16","19"]},
			{mult: 17, keys: ["17","20"]},
			{mult: 17, keys: ["18","21"]},
			{mult: 17, keys: ["19","22"]},
			{mult: 17, keys: ["20","23"]},
			{mult: 17, keys: ["21","24"]},
			{mult: 17, keys: ["22","25"]},
			{mult: 17, keys: ["23","26"]},
			{mult: 17, keys: ["24","27"]},
			{mult: 17, keys: ["25","28"]},
			{mult: 17, keys: ["26","29"]},
			{mult: 17, keys: ["27","30"]},
			{mult: 17, keys: ["28","31"]},
			{mult: 17, keys: ["29","32"]},
			{mult: 17, keys: ["30","33"]},
			{mult: 17, keys: ["31","34"]},
			{mult: 17, keys: ["32","35"]},
			{mult: 17, keys: ["33","36"]},
			{mult: 11, keys: ["1","2","3"]},
			{mult: 11, keys: ["4","5","6"]},
			{mult: 11, keys: ["7","8","9"]},
			{mult: 11, keys: ["10","11","12"]},
			{mult: 11, keys: ["13","14","15"]},
			{mult: 11, keys: ["16","17","18"]},
			{mult: 11, keys: ["19","20","21"]},
			{mult: 11, keys: ["22","23","24"]},
			{mult: 11, keys: ["25","26","27"]},
			{mult: 11, keys: ["28","29","30"]},
			{mult: 11, keys: ["31","32","33"]},
			{mult: 11, keys: ["34","35","36"]},
			{mult: 8, keys: ["1","2","4","5"]},
			{mult: 8, keys: ["2","3","5","6"]},
			{mult: 8, keys: ["4","5","7","8"]},
			{mult: 8, keys: ["5","6","8","9"]},
			{mult: 8, keys: ["7","8","10","11"]},
			{mult: 8, keys: ["8","9","11","12"]},
			{mult: 8, keys: ["10","11","13","14"]},
			{mult: 8, keys: ["11","12","14","15"]},
			{mult: 8, keys: ["13","14","16","17"]},
			{mult: 8, keys: ["14","15","17","18"]},
			{mult: 8, keys: ["16","17","19","20"]},
			{mult: 8, keys: ["17","18","20","21"]},
			{mult: 8, keys: ["19","20","22","23"]},
			{mult: 8, keys: ["20","21","23","24"]},
			{mult: 8, keys: ["22","23","25","26"]},
			{mult: 8, keys: ["23","24","26","27"]},
			{mult: 8, keys: ["25","26","28","29"]},
			{mult: 8, keys: ["26","27","29","30"]},
			{mult: 8, keys: ["28","29","31","32"]},
			{mult: 8, keys: ["29","30","32","33"]},
			{mult: 8, keys: ["31","32","34","35"]},
			{mult: 8, keys: ["32","33","35","36"]},
			{mult: 6, keys: ["0","00","1","2","3"]},
			{mult: 5, keys: ["1","2","3","4","5","6"]},
			{mult: 5, keys: ["4","5","6","7","8","9"]},
			{mult: 5, keys: ["7","8","9","10","11","12"]},
			{mult: 5, keys: ["10","11","12","13","14","15"]},
			{mult: 5, keys: ["13","14","15","16","17","18"]},
			{mult: 5, keys: ["16","17","18","19","20","21"]},
			{mult: 5, keys: ["19","20","21","22","23","24"]},
			{mult: 5, keys: ["22","23","24","25","26","27"]},
			{mult: 5, keys: ["25","26","27","28","29","30"]},
			{mult: 5, keys: ["28","29","30","31","32","33"]},
			{mult: 5, keys: ["31","32","33","34","35","36"]},*/
			{mult: 2, keys: ["1","2","3","4","5","6","7","8","9","10","11","12"]}, //1st12
			{mult: 2, keys: ["13","14","15","16","17","18","19","20","21","22","23","24"]}, //2nd12
			{mult: 2, keys: ["25","26","27","28","29","30","31","32","33","34","35","36"]}, //3rd12
			{mult: 2, keys: ["1","4","7","10","13","16","19","22","25","28","31","34"]}, //2to1
			{mult: 2, keys: ["2","5","8","11","14","17","20","23","26","29","32","35"]}, //2to1
			{mult: 2, keys: ["3","6","9","12","15","18","21","24","27","30","33","36"]}, //2to1
			{mult: 1, keys: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18"]}, //1-18
			{mult: 1, keys: ["2","4","6","8","10","12","14","16","18","20","22","24","26","28","30","32","34","36"]}, //even
			{mult: 1, keys: ["1","3","5","7","9","12","14","16","18","19","21","23","25","27","30","32","34","36"]},// red
			{mult: 1, keys: ["2","4","6","8","10","11","13","15","17","20","22","24","26","28","29","31","33","35"]}, //black
			{mult: 1, keys: ["1","3","5","7","9","11","13","15","17","19","21","23","25","27","29","31","33","35"]}, //odd
			{mult: 1, keys: ["19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36"]} //19-36
		]
		
		this.chips = ['vw_prop_chip_100dollar_x1', 'vw_prop_chip_10dollar_x1', 'vw_prop_chip_10kdollar_x1', 'vw_prop_chip_1kdollar_x1', 'vw_prop_chip_500dollar_x1', 'vw_prop_chip_50dollar_x1', 'vw_prop_chip_5kdollar_x1'] // Замена мышки
		
		
		
		this.tables = ['vw_prop_casino_roulette_01', 'vw_prop_casino_roulette_01b']
		this.peds = ["S_M_Y_Casino_01", "S_F_Y_Casino_01", "U_F_M_CasinoCash_01", "U_F_M_CasinoShop_01"]
		
	}
	
	getRandomFloat(minimum, maximum, decimal) {
        if (maximum === undefined) {
			maximum = minimum;
			minimum = 0;
		}

		if (typeof minimum !== 'number' || typeof maximum !== 'number') {
			throw new TypeError('Expected all arguments to be numbers');
		}
		
		var num = (Math.random() * (maximum - minimum)) + minimum;
		
		return parseFloat(num.toFixed(decimal));
    }
	
	deleteTable(player, id) {
		if (!mp.casinoTables[id]) return terminal.error(`Стол с таким id не найден!`, player); 
		if (mp.casinoTables[id].players.length) return terminal.error(`За столом есть игроки!`, player); 
		
		DB.Handle.query(`DELETE FROM talrasha_casino_tables WHERE id=?`, mp.casinoInfo[id].id, (e, result) => {
		  if (e) {
			  callback("Ошибка выполнения запроса в БД!");
			  return terminal.error(e);
			}
			
			mp.players.call("casino::delete_table", [ id ]);
			delete mp.casinoInfo[id];
			delete mp.casinoTables[id]
			delete this.keyToChip[id]
			delete this.fullPrecent[id]
		});
	}
	
	createTable(player, table, ped, lrp) {
       if (this.tables.indexOf(table) === -1) return terminal.error(`Неправильный хеш стола, доступные хеши ${this.tables}`, player);
	   if (this.peds.indexOf(ped) === -1) return terminal.error(`Неправильный хеш педа, доступные хеши ${this.peds}`, player);
	   if (!(lrp === 1 ||  lrp === 0)) return terminal.error(`1 - lrp стол, 0 - не лрп стол`, player);
	   
	   var x = player.position.x
	   var y = player.position.y
	   var z = player.position.z - 1
	   var h = player.heading
	   
	   DB.Handle.query("INSERT INTO talrasha_casino_tables (x,y,z,h,hash,ped,lrp) VALUES (?,?,?,?,?,?,?)", [x, y, z, h, table, ped, lrp], (e, result) => {
            if(e) console.log(e);
          
			var info = {
				id: result.insertId,
				x: x, 
				y: y,
				z: z,
				h: h,
				hash: table,
				ped: ped,
				lrp: lrp
			}
		  
			mp.casinoInfo[result.insertId] = info;
			mp.casinoTables[result.insertId] = {
				players: [],
				time: 60,
				lastBets: []
			};
			
			this.keyToChip[result.insertId] = JSON.parse(JSON.stringify(this.defaultKeyToChip))
			this.fullPrecent[result.insertId] = this.defaultFullPrecent 
			
			mp.players.call("casino::add_tables", [ JSON.stringify(mp.casinoInfo) ]);
		
        });
	   
	   
    }
	
	random(key) {
		var random = this.getRandomFloat(0, this.fullPrecent[key], 2)
		
		var curPrecent = 0.0
		for (var i = 0; i < this.keyToChip[key].length; i++) {
			if (random <= curPrecent) {
				return i - 1
			}	
			curPrecent += this.keyToChip[key][i].precent
		}
	}
	
	Init() {
        DB.Handle.query("SELECT * FROM talrasha_casino_tables", (e, result) => {
            for (var i = 0; i < result.length; i++) {
				mp.casinoInfo[result[i].id] = result[i]
				mp.casinoTables[result[i].id] = {
					players: [],
					time: 60,
					lastBets: []
				};
				
				this.keyToChip[result[i].id] = JSON.parse(JSON.stringify(this.defaultKeyToChip))
				this.fullPrecent[result[i].id] = this.defaultFullPrecent 
            }
			
			setInterval(() => { 
				try {
					for (let key in mp.casinoTables) {
						if (!mp.casinoTables[key].players.length && !mp.casinoTables[key].spin) {
							if (mp.casinoTables[key].time !== 45) mp.casinoTables[key].time = 45;
							continue;
						}
						
						mp.casinoTables[key].time -= 1;
						
						if (mp.casinoTables[key].time === 44) {
							mp.casinoTables[key].winNumber = this.random(key)
							console.log('Число которое выпадет:', this.keyToChip[key][mp.casinoTables[key].winNumber].chip);
						}
						
						if (mp.casinoTables[key].time === 30) {
							mp.casinoTables[key].spin = true
							//mp.casinoTables[key].winNumber = this.random(key)
							//console.log(this.keyToChip[key][mp.casinoTables[key].winNumber].chip);
							mp.players.forEachInRange(new mp.Vector3(mp.casinoInfo[key].x, mp.casinoInfo[key].y, mp.casinoInfo[key].z), 30, (rec) => {
								rec.call("spinRouletteWheel", [key, 1, this.keyToChip[key][mp.casinoTables[key].winNumber].key])
							});
						}
						else if (mp.casinoTables[key].time === 17) { // Время когда шарик докатится
							delete mp.casinoTables[key].spin;
							mp.casinoTables[key].time = 45
							
							if (mp.casinoTables[key].lastBets.length > 9) mp.casinoTables[key].lastBets.splice(0, 1);
							var winNumber = this.keyToChip[key][mp.casinoTables[key].winNumber].chip
							mp.casinoTables[key].lastBets.push(winNumber)
							
							mp.players.forEachInRange(new mp.Vector3(mp.casinoInfo[key].x, mp.casinoInfo[key].y, mp.casinoInfo[key].z), 15, (rec) => {
								rec.call("clearRouletteTable", [key, 15, JSON.stringify(mp.casinoTables[key].lastBets)])
							});
							
							for (var i = 0; i < mp.casinoTables[key].players.length; i++) {
								var rec = mp.players.at(mp.casinoTables[key].players[i].id);
								if (rec) this.addWinningMoney(rec, key)
							}
							
							this.clearTable(key)
						}
						
					}
				} catch (err) {
					terminal.error(err);
				}
			}, 1000)
			
			console.log(`\x1b[32m[DONE]\x1b[0m "Casino tables" package has been loaded: \x1b[33m${i}\x1b[0m.`);
        });
    }

	addWinningMoney(player, key) {
		var index = this.findPlayerIndexInTable(key, player.id);
		var winMoney = 0
		var loseMoney = 0
		var winNumber = this.keyToChip[key][mp.casinoTables[player.casinoTable].winNumber].chip
		if (typeof winNumber === 'number') winNumber = winNumber.toString();
		for (var i = 0; i <  mp.casinoTables[player.casinoTable].players[index].bets.length; i++) {
			var spot = mp.casinoTables[player.casinoTable].players[index].bets[i].spot
			var chip = this.tableChipsOffsets[spot]
			var betWinning = chip.keys.indexOf(winNumber)
			
			if (betWinning !== -1) {
				var bet = mp.casinoTables[player.casinoTable].players[index].bets[i].money
				var mult = chip.mult
				var money =  mult * bet + bet
				winMoney += money
			}
			else {
				var bet = mp.casinoTables[player.casinoTable].players[index].bets[i].money
				loseMoney += bet
			}
		}
		
		
		if (winMoney > 0) {
			if (mp.casinoInfo[player.casinoTable].lrp) player.utils.setDonate(player.account.donate + winMoney);
			else player.utils.setMoney(player.money + winMoney);
			player.utils.success(`Вы выиграли ${winMoney}$!`);
			player.playAnimation('mp_action', 'thanks_male_06', 8, 1)
			//player.call(`playSound`, ['FIRST_PLACE', 'HUD_MINI_GAME_SOUNDSET']);
			player.animationTimeout = setTimeout(() => {
				try {
					player.stopAnimation()   
				}
				catch (e) { console.log(e) }
			}, 2000) 
		}
		else if (loseMoney > 0) {
			player.utils.error(`Вы проиграли ${loseMoney}$`);
			player.playAnimation('gestures@f@standing@casual', 'gesture_damn', 8, 1)
			//player.call(`playSound`, ['LOSER', 'HUD_AWARDS']);
			player.animationTimeout = setTimeout(() => {
				try {
					player.stopAnimation()   
				}
				catch (e) { console.log(e) }
			}, 2000) 
		}
	}
	
	clearTable(table) {
		for (var i = 0; i <  mp.casinoTables[table].players.length; i++) {
			var playerBets = mp.casinoTables[table].players[i].bets
			for (var z = 0; z <  playerBets.length; z++) {
				if (mp.objects.exists(playerBets[z].object.id)) playerBets[z].object.destroy();
			}
			mp.casinoTables[table].players[i].bets = []
		}
	}
	
	findPlayerIndexInTable(table, id) {
		for (var i = 0; i <  mp.casinoTables[table].players.length; i++) {
			if (mp.casinoTables[table].players[i].id === id) return i;
		}
	}
	
	getRandomNumber(min, max) {
		try
		{
			return Math.floor(Math.random() * (max - min)) + min;
		} catch (err){
			console.log(err);
			return -1;
		}
	}
	
	generateChipObject(table) {		
		for (var i = 0; i <  this.chips.length; i++) {
			var chip = this.chips[i]
			var isBusy = false
			
			for (var z = 0; z <  mp.casinoTables[table].players.length; z++) {
				var player = mp.casinoTables[table].players[z]
				if (player.color === chip) {
					isBusy = true
					break
				}
			}
			
			if (!isBusy) return this.chips[i]
		}
		
		var radnomChip = this.getRandomNumber(0, this.chips.length)
		
		return this.chips[radnomChip]
		
	}
	
	updatePlayerFullBet(player, index) {
		var fullBet = 0;
		for (var i = 0; i <  mp.casinoTables[player.casinoTable].players[index].bets.length; i++) {
			fullBet += mp.casinoTables[player.casinoTable].players[index].bets[i].money
		}
		player.call("updateFullBet", [fullBet])
	}
	
} 

const casino = new Casino
module.exports = casino 

mp.events.add('makeRouletteBet', (player, money, spot, x, y, z) => {
	if (player.casinoTable === undefined) return;
	if (mp.casinoInfo[player.casinoTable].lrp) {
		if(player.account.donate < money) return player.utils.error(`Необходимо ${money} lrp`);
	}
	else {
		if(player.money < money) return player.utils.error(`Необходимо ${money}$`);
	}
	var index = casino.findPlayerIndexInTable(player.casinoTable, player.id);
	var color = mp.casinoTables[player.casinoTable].players[index].color;
	var object = mp.objects.new(mp.joaat(color), new mp.Vector3(x, y, z));
	if (mp.casinoInfo[player.casinoTable].lrp) player.utils.setDonate(player.account.donate - money);
	else player.utils.setMoney(player.money - money);
	mp.casinoTables[player.casinoTable].players[index].bets.push({spot: spot, object: object, money: money})
	casino.updatePlayerFullBet(player, index)
});

/*mp.events.add('removeRouletteBet', (player, spot) => {
	if (player.casinoTable  === undefined) return;
	var index = casino.findPlayerIndexInTable(player.casinoTable, player.id);
	
	for (var i = 0; i <  mp.casinoTables[player.casinoTable].players[index].bets.length; i++) {
		if (mp.casinoTables[player.casinoTable].players[index].bets[i].spot === spot) {
			var money = mp.casinoTables[player.casinoTable].players[index].bets[i].money
			if (mp.casinoInfo[player.casinoTable].lrp) player.utils.setDonate(player.account.donate + money);
			else player.utils.setMoney(player.money + money);
			mp.casinoTables[player.casinoTable].players[index].bets[i].object.destroy();
			mp.casinoTables[player.casinoTable].players[index].bets.splice(i, 1);
			break
		}
	}
});*/


mp.events.add("playerBrowserReady", (player) => {
	player.call("initRoulette", [JSON.stringify(mp.casinoAnimInfo)]);
});

mp.events.add('addMoneyBet', (player) => {
	if (!player.casinoTable) return;
	var index = casino.findPlayerIndexInTable(player.casinoTable, player.id);
	
	
});

mp.events.add('removeMoneyBet', (player) => {
	if (!player.casinoTable) return;
	var index = casino.findPlayerIndexInTable(player.casinoTable, player.id);
	
	
});

mp.events.add('occupyCasinoSeat', (player, casinoTableToJoin) => {
	var color = casino.generateChipObject(casinoTableToJoin) // Замена мышки
	mp.casinoTables[casinoTableToJoin].players.push({id: player.id, color: color, bets: []}) 
	player.casinoTable = casinoTableToJoin;
	if (mp.casinoTables[casinoTableToJoin].time > 30) {
		var allowBets = true
	}
	else if (mp.casinoTables[casinoTableToJoin].time <= 30) {
		var allowBets = false
	}
	else {
		var allowBets = true
	}	
	player.call("playerSitAtCasinoTable", [casinoTableToJoin, allowBets, mp.casinoTables[casinoTableToJoin].time - 30 < 0 ? 0 : mp.casinoTables[casinoTableToJoin].time - 30, color, JSON.stringify(mp.casinoTables[casinoTableToJoin].lastBets)])
});

mp.events.add('leaveCasinoSeat', (player) => {
	var index = casino.findPlayerIndexInTable(player.casinoTable, player.id)
	for (var i = 0; i <  mp.casinoTables[player.casinoTable].players[index].bets.length; i++) {
		mp.casinoTables[player.casinoTable].players[index].bets[i].object.destroy();
	}
	mp.casinoTables[player.casinoTable].players.splice(index, 1);
	delete player.casinoTable;
	player.call("cancelInteractingWithTable")
});

mp.events.add("playerQuit", function playerQuitHandler(player, exitType, reason) {
    if (player.casinoTable !== undefined) {
		var index = casino.findPlayerIndexInTable(player.casinoTable, player.id)
		for (var i = 0; i <  mp.casinoTables[player.casinoTable].players[index].bets.length; i++) {
			mp.casinoTables[player.casinoTable].players[index].bets[i].object.destroy();
		}
		mp.casinoTables[player.casinoTable].players.splice(index, 1);
		delete player.casinoTable;
	}
});