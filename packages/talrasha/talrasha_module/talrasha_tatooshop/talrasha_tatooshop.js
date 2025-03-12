class Tatooshop {
  tatoo_list = require("./talrasha_info.json");

  constructor() {
    this.loadEvents();
  }

  loadEvents()  {
    mp.events.add("server:tatooShop:onStart", (player) => {
      if (!player.colshape || !player.colshape.biz) return player.utils.error(`Вы не у бизнеса!`);
      player.position = player.colshape.biz.extraPoint.pos;
      player.heading = player.colshape.biz.extraPoint.rotate;
      player.dimension = player.id + player.colshape.biz.id;
      player.proccesedBussiness = player.colshape.biz;
      player.call("client:tatooShop:startChoose", [player.appearance.tatoos]);
    });

    mp.events.add("server:tatooShop:onStop", (player) => {
      if (!player.proccesedBussiness) return player.utils.error(`Вы не у бизнеса!`);
      player.dimension = player.proccesedBussiness.dimension;
      player.proccesedBussiness = null;
    });

    mp.events.add("server:tatooShop:buyTatoo", (player, id) => {
      if (!player.proccesedBussiness) return player.utils.error(`Вы не у бизнеса!`);
      const tatoo = this.tatoo_list.find((item) => item.id == id);
      if (tatoo && !player.appearance.tatoos.includes(tatoo.id)) {
        const hash = player.sex == 1 ? tatoo.HashNameMale : tatoo.HashNameFemale;
        if (hash) {
          const newPlayerMoney = player.money - tatoo.Price;

          if (newPlayerMoney >= 0) {
            player.utils.setMoney(newPlayerMoney);
            //console.log(`Col: ${tatoo.Collection} Hash: ${hash}`)
            player.setDecoration(mp.joaat(tatoo.Collection), mp.joaat(hash));
            player.appearance.tatoos.push(tatoo.id);
            this.saveTatoos(player);
            player.call("client:tatooShop:completedBuyed", [tatoo.id]);
          } else {
            player.utils.warning("У вас недостаточно средств!");
          }
        }
      }
    });

    mp.events.add("server:tatooShop:deleteTatoo", (player, id) => {
      if (!player.proccesedBussiness) return player.utils.error(`Вы не у бизнеса!`);
      const tatoo = this.tatoo_list.find((item) => item.id == id);
      if (tatoo && player.appearance.tatoos.includes(tatoo.id)) {
        const newPlayerMoney = Math.floor(player.money - (tatoo.Price / 100 * 60));

        if (newPlayerMoney >= 0) {
          player.utils.setMoney(newPlayerMoney);
          player.appearance.tatoos = player.appearance.tatoos.filter((item) => item != tatoo.id);
          this.deleteTatoo(player);
          this.saveTatoos(player);
          player.call("client:tatooShop:completedDeleted", [tatoo.id]);
        } else {
          player.utils.warning("У вас недостаточно средств!");
        }
      }
    });
  }

  deleteTatoo(player) {
    player.clearDecorations();
    for(let item of player.appearance.tatoos) {
      const tatoo = this.tatoo_list.find((el) => el.id == item);
      player.setDecoration(mp.joaat(tatoo.Collection), mp.joaat(player.sex == 1 ? tatoo.HashNameMale : tatoo.HashNameFemale));
    }
  }

  saveTatoos(player) {
    DB.Handle.query("UPDATE talrasha_character SET tatoos=? WHERE id=?", [JSON.stringify(player.appearance.tatoos), player.sqlId], (e, result) => {
      if (e) {
        callback("Ошибка выполнения запроса в БД!");
        return terminal.error(e);
      }
    });
  }
}
new Tatooshop();
