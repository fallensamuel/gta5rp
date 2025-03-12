const BankInfo = {
  blip: [ 
	  mp.blips.new(605, new mp.Vector3(150.16, -1040.39, 29.37), { alpha: 255, scale: 1, name: "Банк", shortRange: true }), // Банк 1
	  mp.blips.new(605, new mp.Vector3(-1213.20, -329.68, 37.78), { alpha: 255, scale: 1, name: "Банк", shortRange: true }), // Банк 2
	  mp.blips.new(605, new mp.Vector3(1175.21, 2706.42, 38.09), { alpha: 255, scale: 1, name: "Банк", shortRange: true }), // Банк 3
	  mp.blips.new(605, new mp.Vector3(314.55, -278.44, 54.17), { alpha: 255, scale: 1, name: "Банк", shortRange: true }), // Банк 4
	  mp.blips.new(605, new mp.Vector3(-350.75, -49.00, 49.04), { alpha: 255, scale: 1, name: "Банк", shortRange: true }), // Банк 5
	  mp.blips.new(605, new mp.Vector3(-2963.13, 483.04, 15.70), { alpha: 255, scale: 1, name: "Банк", shortRange: true }), // Банк 6
	  mp.blips.new(605, new mp.Vector3(235.43, 216.95, 106.29), { alpha: 255, scale: 1, name: "Банк", shortRange: true }), // Банк 7
	  mp.blips.new(605, new mp.Vector3(-109.78, 6464.66, 31.63), { alpha: 255, scale: 1, name: "Банк", shortRange: true }) // Банк 8
  ],
  colshapes: [
	mp.colshapes.newSphere(150.02, -1040.36, 29.37, 1.0), // Банк 1
	mp.colshapes.newSphere(148.40, -1039.93, 29.38, 1.0), // Банк 1
	mp.colshapes.newSphere(-1212.65, -330.61, 37.79, 1.0), // Банк 2
	mp.colshapes.newSphere(-1214.10, -331.29, 37.79, 1.0), // Банк 2
	mp.colshapes.newSphere(1175.14, 2706.61, 38.09, 1.0), // Банк 3
	mp.colshapes.newSphere(1176.56, 2706.56, 38.10, 1.0), // Банк 3
	mp.colshapes.newSphere(314.31, -278.81, 54.17, 1.0), // Банк 4
	mp.colshapes.newSphere(312.84, -278.36, 54.17, 1.0), // Банк 4
	mp.colshapes.newSphere(-350.93, -49.77, 49.04, 1.0), // Банк 5
	mp.colshapes.newSphere(-352.34, -49.24, 49.05, 1.0), // Банк 5
	mp.colshapes.newSphere(-2962.73, 482.82, 15.70, 1.0), // Банк 6
	mp.colshapes.newSphere(-2962.76, 481.43, 15.71, 1.0), // Банк 6
	mp.colshapes.newSphere(241.36, 225.22, 106.29, 1.0), // Банк 7
    mp.colshapes.newSphere(243.20, 224.54, 106.29, 1.0), // Банк 7
    mp.colshapes.newSphere(246.55, 223.38, 106.29, 1.0), // Банк 7
    mp.colshapes.newSphere(248.39, 222.71, 106.29, 1.0), // Банк 7
    mp.colshapes.newSphere(251.75, 221.49, 106.29, 1.0), // Банк 7
    mp.colshapes.newSphere(253.57, 220.83, 106.29, 1.0), // Банк 7
	mp.colshapes.newSphere(-111.13, 6467.87, 31.63, 1.0), // Банк 8
	mp.colshapes.newSphere(-112.23, 6468.86, 31.63, 1.0), // Банк 8
	mp.colshapes.newSphere(-113.26, 6470.03, 31.63, 1.0) // Банк 8
  ],
  keydown_E: false,
  enter: 0,
  main_show: false,
  balance: 0,
  hbalance: [],
  houses: [],
  buttons: [
  { text: "Пополнить" },
  { text: "Снять" },
  { text: "На другой счет" },
  { text: "Счет дома" },
  { text: "Снять с дома" },
  { text: "Закрыть"}]
}

mp.events.add('playerEnterColshape', (shape) => {
 if (BankInfo.colshapes.includes(shape) && !mp.players.local.vehicle) {
   mp.events.call(`prompt.showByName`, ["talrasha_bank"]);
   BankInfo.keydown_E = true;
   BankInfo.enter++;
 }
});
mp.events.add('playerExitColshape', (shape) => {
  if (BankInfo.colshapes.includes(shape)) {
    if (BankInfo.enter === 1) {
      BankInfo.keydown_E = false;
      BankInfo.main_show = false;
      BankInfo.enter = 0;
      mp.events.call("selectMenu.hide", "bank_menu");
    }
    else BankInfo.enter--;
  }
});

mp.keys.bind(0x45, false, function () { // E key
  if (BankInfo.keydown_E && !BankInfo.main_show && !mp.players.local.vehicle) {
       mp.events.callRemote("show.bank.menu");
       BankInfo.main_show = true;
  }
});

mp.events.add('show.bank.menu', (money, bmoney, houses, isAtm = false) => {
  BankInfo.balance = money;
  BankInfo.hbalance = bmoney;
  if (houses.length > 0) {
    BankInfo.buttons[3] = { text: "Счет дома", values: houses };
    BankInfo.buttons[4] = { text: "Снять с дома", values: houses };
    BankInfo.houses = houses;
  }
  else {
    BankInfo.buttons[3] = { text: "Счет дома" };
    BankInfo.buttons[4] = { text: "Снять с дома" };
    BankInfo.houses = -1;
  }
	mp.events.call("selectMenu.setHeader", "bank_menu", "Здравствуйте, ваш баланс $" + money);

	if (isAtm) {
		const items = [ BankInfo.buttons[0], BankInfo.buttons[1], BankInfo.buttons[BankInfo.buttons.length - 1] ];

		mp.events.call("selectMenu.setSpecialItems", "bank_menu", items);
	} else {
		mp.events.call("selectMenu.setSpecialItems", "bank_menu", BankInfo.buttons);
	}

  mp.events.call("selectMenu.show", "bank_menu");
});

mp.events.add("selectMenu.itemSelected", (menuName, item, itemValues, itemIndex) => {
	item = JSON.parse(item);
	const itemName = item.text;
	if (menuName === "bank_menu") {
    mp.events.call("selectMenu.hide", "bank_menu");
    switch (itemName) {
      case "Закрыть":
        BankInfo.main_show = false;
        break;
      case "Пополнить":
        mp.events.call("modal.show", "bank_money_put", { money: BankInfo.balance });
        break;
      case "Снять":
        mp.events.call("modal.show", "bank_money_take", { money: BankInfo.balance });
        break;
      case "На другой счет":
        mp.events.call("modal.show", "bank_money_transfer", { money: BankInfo.balance });
        break;
      case "Счет дома":
        if (checkHouse()) mp.events.call("modal.show", "bank_money_house_give", { money: BankInfo.balance, house: itemValues, bhouse: BankInfo.hbalance[BankInfo.houses.indexOf(itemValues)] });
        break;
      case "Снять с дома":
        if (checkHouse()) mp.events.call("modal.show", "bank_money_house_take", { money: BankInfo.balance, house: itemValues, bhouse: BankInfo.hbalance[BankInfo.houses.indexOf(itemValues)] });
        break;
      default:
    }
  }
});

mp.events.add('update.bank.main.open', (status) => { BankInfo.main_show = status; });
mp.events.add('put.bank.money', (money) => {
  let newMoney = simpleCheck(money);
  if (newMoney !== false) mp.events.callRemote("put.bank.money", newMoney);
});
mp.events.add('take.bank.money', (money) => {
  let newMoney = simpleCheck(money);
  if (newMoney !== false) mp.events.callRemote("take.bank.money", newMoney);
});
mp.events.add('give.bank.money.house', (money, id) => {
  let newMoney = simpleCheck(money);
  var house = id.split("№");
  if (newMoney !== false) mp.events.callRemote("give.bank.money.house", money, parseInt(house[1], 10));
});
mp.events.add('give.bank.money.house.phone', (money, id) => {
  let newMoney = simpleCheck(money);
  if (newMoney !== false) mp.events.callRemote("give.bank.money.house", money, id);
});
mp.events.add('give.bank.money.biz.phone', (money, id) => {
  let newMoney = simpleCheck(money);
  if (newMoney !== false) mp.events.callRemote("give.bank.money.biz.phone", money, id);
});
mp.events.add('take.bank.money.house', (money, id) => {
  let newMoney = simpleCheck(money);
  var house = id.split("№");
  if (newMoney !== false) mp.events.callRemote("take.bank.money.house", money, parseInt(house[1], 10));
});
mp.events.add('transfer.bank.money', (name, money) => {
  if (name.toLowerCase() === mp.players.local.name.toLowerCase()) {
    mp.events.call("nWarning", "Вы не можете перечислить деньги на свой счёт!");
    return;
  }
  let newMoney = simpleCheck(money);
  if (newMoney !== false) mp.events.callRemote("transfer.bank.money", name, newMoney);
});
function checkHouse() {
  if (BankInfo.houses === -1) {
    mp.events.call("nWarning", "У вас нет дома!");
    BankInfo.main_show = false;
    return false;
  }
  return true;
}
function simpleCheck(value) {
  let num = parseInt(value, 10);
  if (isNaN(num)) {
    mp.events.call("nWarning", "Заполните поле корректно!");
    return false;
  }
  return num;
}
