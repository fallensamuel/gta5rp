$(document).ready(() => {
	window.ipad = new Vue({
		el: '#ipad',
		data: {
		 date: moment.locale('ru'),
		 showMain: false,
		 anim: true,
		 teamList: [],
		 info: {},
		 infoFull: {},
		 settingsList: {
		  rankName: 0,
		  rank: [],
		  settings: [],
		 },
		 input: {
			 name: '',
			 surname: '',
			 id: '',
			 reason: '',
			 summ: '',
			 setFaction: 0,

			 setInvite: false,
			 setUnInvite: false,
			 setRank: false,
			 setStorage: false,
			 setCraft: false,
			 setSafy: false,
		 },
		 infoList: {},
		 page: {
		  govMain: false,
		  govList: false,
		  govStorage: false,
		  govBalance: false,
		  govSearch: false,
		  pricePlayer: false,
		  searchName: false,
		  searchId: false,
		  addFine: false,
		  govSearchPlayer: false,
		  govWithdrawal: false,
		  govListInfo: false,
		  govSettings: false,
		  isActiveMenu: false,
		  settFull: false,
		  callsList: false,
		 },
		 isSearch: false,
		 isGovSettings: false,
		 isGovCalls: false,
		 callsList: [],
		 currentTime: moment().format('HH:mm'),
		 currentDate: moment().format('ddd DD MMM'),
		 infoTitle: [
		  'Government',
		  'Lspd',
		  'Sheriff',
		  'FIB',
		  'EMS',
		  'Army',
		  'Navy'
		 ],
		 infoRankGov: [
			 'Стажёр',
			 'Юрист',
			 'Секретарь',
			 'Офицер USSS',
			 'Мл. Адвокат',
			 'Секретарь Референт',
			 'Агент USSS',
			 'Адвокат',
			 'Менеджер Мероприятий',
			 'Спец. Агент USSS',
			 'Прокурор',
			 'HR Менеджер',
			 'Нач. Отдела USSS',
			 'Судья',
			 'Глава Аппарата',
			 'Директор USSS',
			 'Советник',
			 'Мэр LS',
			 'Мэр BC',
			 'Министр Обороны',
			 'Министр Культуры',
			 'Министр Юстиции',
			 'Министр Здравоохранения',
			 'Министр Безопасности',
			 'Губернатор'
		 ],
		 infoRankLspd: [
		  'Кадет LSPD',
		  'Офицер 1 ранга',
		  'Офицер 2 ранга',
		  'Офицер 3 ранга',
		  'Офицер 4 ранга',
		  'Детектив 1 ранга',
		  'Детектив 2 ранга',
		  'Сержант 1 ранга',
		  'Сержант 2 ранга',
		  'Лейтенант',
		  'Капитан',
		  'Командор',
		  'Заместитель Шефа',
		  'Помощник Шефа',
		  'Шеф'
		 ],
		 infoRankSheriff: [
		   'Кадет',
		   'Младший Помощник Шерифа',
		   'Помощник Шерифа',
		   'Помощник Шерифа I',
		   'Помощник Шерифа II',
		   'Детектив',
		   'Сержант',
		   'Лейтенант',
		   'Капитан',
		   'Командер',
		   'Руководитель отдела',
		   'Шериф'
		 ],
		 infoRankFib: [
		  'Стажёр',
		  'Мл. Агент',
		  'Агент',
		  'Старший агент',
		  'Спец агент II',
		  'Спец агент I',
		  'Зам. начальника отдела',
		  'Начальни отдела',
		  'Младший зам. нач. FIB',
		  'Старший зам. нач FIB',
		  'Начальник  FIB',
		  'Ранг 12'
		 ],
		 infoRankEms: [
		   'Студент',
		   'Интерн',
		   'Парамедик',
		   'Фельдшер',
		   'Терапевт',
		   'Хирург',
		   'Специалист',
		   'Зам. зав.отд',
		   'Заведующий отдел',
		   'Зам.глав.врач',
		   'Главный врач'
		 ],
		 infoRankArmy: [
		  'Рекрут',
		  'Рядовой',
		  'Специалист',
		  'Капрал',
		  'Сержант',
		  'Штаб-сержант',
		  'Мастер-сержант',
		  'Сержант-майор',
		  'Уорент-офицер',
		  'Лейтенант',
		  'Капитан',
		  'Майор',
		  'Подполковник',
		  'Полковник',
		  'Генерал'
		 ],
		 infoRankNavy: [
		  'Матрос-Рекрут',
		  'Матрос',
		  'Петти-офицер 2 класса',
		  'Петти-офицер 1 класса',
		  'Чиф-петти-офицер',
		  'Мастер чиф-петти-офицер',
		  'Уорент-офицер',
		  'Старший Уорент-Офицер 2',
		  'Лейтенант',
		  'Лейтенант-Коммандер',
		  'Адмирал'
		 ],
		},
		methods: {
		 callParamsIpad(data) {
		  const res = JSON.parse(data)
		  this.info.name = res.name
		  this.info.faction = res.faction
		  // this.info.rank = this.checkRank(res.faction, res.rank)
		  this.initTitle(res.faction)

		  if(this.info.faction === 2) this.isGovCalls = true
		  if(this.info.faction === 3) this.isGovCalls = true
		  if(this.info.faction === 5) this.isGovCalls = true

		  res.owner
			  ? this.isGovSettings = true
			  : this.isGovSettings = false
		 },
		 policeAddCall(data) {
		  let res = JSON.parse(data)

		  this.callsList.push({
			id: res.id,
			name: res.name,
			pos: res.pos,
			msg: res.message
		  })
		 },
		 medicalAddCall(data) {
		   let res = JSON.parse(data)

		   this.callsList.push({
			   id: res.id,
			   name: res.name,
			   pos: res.pos,
			   msg: res.message
		   })
		 },
		 initTitle(item) {
		   if(item === 1) {
			 // this.info.title = this.infoTitle[0]
			 this.info.img = 'gov'
			 this.isSearch = true
		   }
		   if(item === 2) {
			// this.info.title = this.infoTitle[1]
			this.info.img = 'lspd'
			this.isSearch = true
		   }
		   if(item === 3) {
			// this.info.title = this.infoTitle[2]
			this.info.img = 'Sheriff'
			this.isSearch = true
		   }
		   if(item === 4) {
			// this.info.title = this.infoTitle[3]
			this.info.img = 'fib'
			this.isSearch = true
		   }
		   if(item === 5) {
			// this.info.title = this.infoTitle[4]
			this.info.img = 'ems'
			this.isSearch = false
		   }
		   if(item === 6) {
			// this.info.title = this.infoTitle[5]
			this.info.img = 'army'
			this.isSearch = false
		   }
		   if(item === 7) {
			// this.info.title = this.infoTitle[6]
			this.info.img = 'army'
			this.isSearch = false
		   }
		 },
		 showMainIpad() {
		   this.showMain = true

		   mp.trigger('ipad.call.addPlayer')

		   /*setTimeout(() => {
			 this.anim = false
		   }, 1500)*/
		 },
		 hideMainIpad() {
		  if(this.showMain) this.showMain = false
		  if(this.page.govMain) this.page.govMain = false
		  if(this.page.govList) this.page.govList = false
		  if(this.page.govStorage) this.page.govStorage = false
		  if(this.page.govBalance) this.page.govBalance = false
		  if(this.page.govSearch) this.page.govSearch = false
		  if(this.page.pricePlayer) this.page.pricePlayer = false
		  if(this.page.searchName) this.page.searchName = false
		  if(this.page.searchId) this.page.searchId = false
		  if(this.page.addFine) this.page.addFine = false
		  if(this.page.govSearchPlayer) this.page.govSearchPlayer = false
		  if(this.page.govWithdrawal) this.page.govWithdrawal = false
		  if(this.page.govListInfo) this.page.govListInfo = false
		  if(this.page.govSettings) this.page.govSettings = false
		  if(this.page.settFull) this.page.settFull = false
		  if(this.page.callsList) this.page.callsList = false

		  if(!this.anim) this.anim = true

		  this.info = {}
		  this.infoList = {}
		  this.input.name = ''
		  this.input.surname = ''
		  this.input.id = ''
		  this.input.reason = ''
		  this.input.summ = ''
		  this.isSearch = false
		 },
		talrashahideipad() {
			$("#ipad").css("display", "none");
		 },
		 checkFaction() {
			if (window.bindlocker()) return;
		   //mp.trigger('ipad.click.sound')
		   setTimeout(() => {
			  $("#ipad").css("display", "block");
			 mp.trigger('ipad.faction.check')
		   }, 900)
		 },
		active() {
		  if(this.page.govMain || this.page.govList || this.page.govStorage || this.page.govBalance || this.page.govSearch 
		  || this.page.pricePlayer || this.page.searchName || this.page.searchId || this.page.addFine || this.page.govSearchPlayer 
		  || this.page.govWithdrawal || this.page.govListInfo || this.page.govSettings || this.page.settFull || this.page.callsList){
			  return $("#ipad").css("display") != "none";
		  }
        },
		 handlerFaction(data) {
		  this.getSettings(data)
		  this.showMain = false
		  this.page.govMain = true
		 },
		 getSettings(data) {
			 if(this.page.settFull) this.page.settFull = false
			 let res = JSON.parse(data)

			 this.settingsList.settings = []

			 if(!this.settingsList.settings.length || this.settingsList.settings.length > 0) {
					 res.forEach(item => {
						 this.settingsList.settings.push({
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
					 })
			 }
		 },
			prevPage(item) {
		   mp.trigger('ipad.click.sound')
		   if(item === 0) {
			this.page.govMain = false
			this.showMain = true
		   }
		   if(item === 1) {
			this.page.govList = false
			this.page.govMain = true
		   }
		   if(item === 2) {
			this.page.govStorage = false
			this.page.govMain = true
		   }
		   if(item === 3) {
			this.page.govBalance = false
			this.page.govMain = true
		   }
		   if(item === 4) {
			this.page.govSearch = false
			this.page.govMain = true
		   }
		   if(item === 5) {
			this.page.pricePlayer = false
			this.page.govMain = true
		   }
		   if(item === 6) {
			this.page.searchName = false
			this.page.govMain = true
		   }
		   if(item === 7) {
			this.page.searchId = false
			this.page.govMain = true
		   }
		   if(item === 8) {
			this.page.addFine = false
			this.page.govMain = true
		   }
		   if(item === 9) {
			this.page.govSearchPlayer = false
			this.page.govMain = true
		   }
		   if(item === 10) {
			this.page.govWithdrawal = false
			this.page.govBalance = true
		   }
		   if(item === 11) {
			this.page.govListInfo = false
			this.page.govList = true
		   }
		   if(item === 12) {
			this.page.govSettings = false
			this.page.govMain = true
		   }
		   if(item === 13) {
			this.page.callsList = false
			this.page.govMain = true
		   }
		 },
		 policeCalls() {
			 mp.trigger('ipad.click.sound')
			 this.page.govMain = false
			 this.page.callsList = true
		 },
		 deleteCall(index) {
		  this.callsList.splice(index, 1)
		  // for (let i = 0; i < this.callsList.length; i++) {
		  //   if(this.callsList[i].id === id)
		  // }
		 },
		 removeCall(id, index) {
		   mp.trigger('ipad.click.sound')
		   mp.trigger('ipad.remove.call', this.info.faction, JSON.stringify({i:index, target: id, pos:this.callsList[index].pos}))
		 },
		 checkRank(faction, item) {
		   if(faction === 1) return this.infoRankGov[item - 1]
		   if(faction === 2) return this.infoRankLspd[item - 1]
		   if(faction === 3) return this.infoRankSheriff[item - 1]
		   if(faction === 4) return this.infoRankFib[item - 1]
		   if(faction === 5) return this.infoRankEms[item - 1]
		   if(faction === 6) return this.infoRankArmy[item - 1]
		   if(faction === 7) return this.infoRankNavy[item - 1]
		 },
		 checkFactionList(faction) {
		   if(faction === 1) return this.infoRankGov
		   if(faction === 2) return this.infoRankLspd
		   if(faction === 3) return this.infoRankSheriff
		   if(faction === 4) return this.infoRankFib
		   if(faction === 5) return this.infoRankEms
		   if(faction === 6) return this.infoRankArmy
		   if(faction === 7) return this.infoRankNavy
		 },
		 listPlayers() {
		  mp.trigger('ipad.click.sound')
		  this.page.govMain = false
		  this.page.govList = true
		 },
		 listStorage() {
		  mp.trigger('ipad.click.sound')
		  this.page.govMain = false
		  this.page.govStorage = true
		 },
		 listBalance() {
		  mp.trigger('ipad.click.sound')
		  this.page.govMain = false
		  this.page.govBalance = true
		 },
		 searchPlayer() {
		  mp.trigger('ipad.click.sound')
		  this.page.govMain = false
		  this.page.govSearch = true
		 },
		 pricePlayer() {
		  mp.trigger('ipad.click.sound')
		  this.page.govMain = false
		  this.page.pricePlayer = true
		 },
		 searchName() {
		  mp.trigger('ipad.click.sound')
		  this.page.govMain = false
		  this.page.searchName = true
		 },
		 searchId() {
		  mp.trigger('ipad.click.sound')
		  this.page.govMain = false
		  this.page.searchId = true
		 },
		 settingsPage() {
		   mp.trigger('ipad.click.sound')
		   this.page.govMain = false
		   this.page.govSettings = true
		   this.page.isActiveMenu = true
		   this.page.settFull = false

		   this.settingsList.rank = []
		   let hash = 1

		   this.listRanksTeam.forEach(item => {
			 this.settingsList.rank.push({
				 id: item.rank,
				 rankName: item.name,
				 faction: item.factionId,
			 })
		   })

		 },
		 useSettings() {

		 },
		 listFullInfo(index) {
			 mp.trigger('ipad.click.sound')
			 mp.trigger('ipad.call.logsList', JSON.stringify({i: index, uid: this.teamList[index].uid,}))
		 },
		 showFullListInfo(data) {
			 let res = JSON.parse(data)

			 this.infoFull.listLog = []

			 this.infoFull.name = this.teamList[res.index].name
			 this.infoFull.uid = this.teamList[res.index].uid
			 this.infoFull.rank = this.teamList[res.index].rank
			 this.infoFull.rankName = this.teamList[res.index].rankName
			 this.infoFull.latDate = this.teamList[res.index].latDate

			 res.logsList.forEach(item => {
				 this.infoFull.listLog.push({
				   id: item.id,
				   target: item.targetID,
				   playerName: item.playerName,
				   msg: item.msg,
				   date: item.date
				 })
			 })
			 this.page.govList = false
			 this.page.govListInfo = true
		 },
		 giveRank() {
			 mp.trigger('ipad.click.sound')
			 mp.trigger('ipad.give.rankChar', this.infoFull.uid)
		 },
		 leaveRank() {
			 mp.trigger('ipad.click.sound')
			 mp.trigger('ipad.leave.rankChar', this.infoFull.uid)
		 },
		 kickFaction() {
			 mp.trigger('ipad.click.sound')
		   mp.trigger('ipad.kick.faction', this.infoFull.uid)
		 },
		 callSearchPlayer(item) {
			 mp.trigger('ipad.click.sound')
		   if(item === 1) {
			let param = `${this.input.name} ${this.input.surname}`
			mp.trigger('ipad.call.searchPlayer', 'name', param, 1)
		   }
		   if(item === 2) {
			 let param = parseInt(this.input.id)
			 mp.trigger('ipad.call.searchPlayer', 'playerId', param, 1)
		   }
		   if(item === 3) {
			let param = `${this.input.name} ${this.input.surname}`
			mp.trigger('ipad.call.searchPlayer', 'name', param, 2)
		   }
		 },
		 showFinePlayer(data) {

		  let res = JSON.parse(data)
		  this.infoList.id = res.playerId

		  if(this.page.searchName) this.page.searchName = false
		  if(this.page.searchId) this.page.searchId = false

		  this.page.addFine = true
		 },
		 sendAddFine() {
		  mp.trigger('ipad.click.sound')
		  mp.trigger('ipad.send.addFine', JSON.stringify({
			  playerId: this.infoList.id,
			  summ: this.input.summ,
			  reason: this.input.reason
		  }))
		 },

		 showInfoPlayer(data) {
		  let res = JSON.parse(data)
		  let arrayHouse = []
		  res.houses.forEach(item => {
			arrayHouse.push({
				id: item.id,
				adress: item.adress,
			})
		  })

		  if(!arrayHouse.length) {
			  this.infoList.housess = false
			  this.infoList.addres = 'Без места жительства'
		  } else {
			  this.infoList.housess = true
			  this.infoList.house = arrayHouse[0].id
			  this.infoList.addres = arrayHouse[0].adress
		  }
		  this.infoList.name = res.name
		  this.infoList.id = res.playerId
		  this.infoList.jobs = res.faction
		  this.infoList.bank = res.bank
		  this.infoList.warning = this.checkWarning(res.crimes)
		  this.infoList.crimes = res.crimes
		  this.infoList.rankNames = this.checkRank(res.factionName, res.rank)

		  this.page.govSearch = false
		  this.page.govSearchPlayer = true
		 },
		 checkWarning(item) {
		  let text = 'Нет'
		  if(item > 0) {
			  text = 'В розыске'
		  }
		  return text
		 },
		 addTeamPlayer(data) {
		  let hash = 1
		  let hashList = 1
		  this.teamList = []
		  this.storageList = []
		  this.listRanksTeam = []

		  let res = JSON.parse(data)
		  this.listRanksTeam = res.rankList
		  this.info.storage = res.storage
		  this.info.maxStorage = res.maxStorage
		  this.info.title = res.faction
		  this.info.rank = res.rankName

		  res.team.forEach(item => {
			this.teamList.push({
			  id: hash++,
			  name: item.name,
			  uid: item.id,
			  rankName: item.rankName,
			  rank: item.rank,
			  online: this.checkOnline(item.online),
			  latDate: item.lastDate
			})
		  })
		  if(!res.logStorage.length) return this.isStorage = false
			  res.logStorage.forEach(item => {
				  this.storageList.push({
					  id: hashList++,
					  name: item.playerName,
					  uid: item.uid,
					  rank: item.rankName,
					  act: item.act,
					  count: item.count,
					  itemName: item.itemName,
					  date: item.dateId
				  })
			  })
			 this.isStorage = true
		 },
		 checkOnline(item) {
		   if(item === 1) return true
		   if(item === 0) return false
		 },
		 closedAddFine() {
		  this.input.name = ''
		  this.input.surname = ''
		  this.input.reason = ''
		  this.input.summ = ''

		  this.page.addFine = false
		  this.page.pricePlayer = true
		 },
		 callBalance(data) {
		   let res = JSON.parse(data)
		   this.info.balanceLog = []

		   if(!this.info.balanceLog.length || this.info.balanceLog.length > 0) this.info.balanceLog = []

		   this.info.balanceFaction = res.infoBalance
		   res.objList.forEach(item => {
			 this.info.balanceLog.push({
				 id: item.id,
				 faction: item.faction,
				 name: item.name,
				 uid: item.uid,
				 rankName: item.rank,
				 use: item.use,
				 summ: item.summ,
				 date: item.date
			 })
		   })
		 },
		 balanceWithdrawal(item) {
		  mp.trigger('ipad.click.sound')
		  this.info.other = item

		  this.page.govBalance = false
		  this.page.govWithdrawal = true
		 },
		 sendWithdrawal() {
		   if(this.info.other === 1) return mp.trigger('ipad.send.withdrawal', this.input.summ)
		   if(this.info.other === 2) return mp.trigger('ipad.send.accession', this.input.summ)
		 },
		 closedWithdrawal() {
		  mp.trigger('ipad.click.sound')
		  this.page.govWithdrawal = false
		  this.page.govBalance = true
		 },
		 showSettings(index, id) {
		   if(this.page.settFull) this.page.settFull = false
		   mp.trigger('ipad.click.sound')
			 this.settingsList.rankName = id

			 let item = this.settingsList.settings[index]
			 this.settingsList.name = this.settingsList.rank[index].rankName
			 this.input.setId = this.settingsList.settings[index].id
			 this.input.setFaction = this.settingsList.rank[index].faction
			 this.input.setInvite = this.checkBool(item.invite)
			 this.input.setUnInvite = this.checkBool(item.unInvite)
			 this.input.setRank = this.checkBool(item.setRank)
			 this.input.setStorage = this.checkBool(item.storage)
			 this.input.setCraft = this.checkBool(item.craft)
			 this.input.setSafy = this.checkBool(item.safy)

			 this.page.settFull = true
		 },
		 checkBool(bool) {
		  if(bool === 0) return false
		  if(bool === 1) return true
		 },
		 saveSettings() {
		   mp.trigger('ipad.save.settings', JSON.stringify({
			  id: this.input.setId,
			  faction: this.input.setFaction,
			  set: {
				  invite: this.input.setInvite,
				  unInvite: this.input.setUnInvite,
				  rank: this.input.setRank,
				  storage: this.input.setStorage,
				  craft: this.input.setCraft,
				  safy: this.input.setSafy
			  },
		   }))
		   // this.page.settFull = false
		 }
		},
		mounted() {
		  setInterval(() => {
			moment.locale('ru')
			this.currentTime = moment().format('HH:mm')
			this.currentDate = moment().format('ddd DD MMM')
		  }, 1000)
		},
	})
});