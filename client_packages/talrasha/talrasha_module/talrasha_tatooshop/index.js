exports = (menu) => {
	
const tatoo_list = require("talrasha/talrasha_module/talrasha_tatooshop/talrasha_info.js");
const characterRotator = require("talrasha/talrasha_module/talrasha_helper/talrasha_character_rotator.js"); 

class Tatooshop {
  Camera = null;
  CurrentZoneChoosed = null;
  CurrentTatoos = [];
  ZoneOffset = {
    0: {bone: 0, offset: new mp.Vector3(0, 2, 0.7) }, // ZONE_TORSO
    1: {bone: 31086, offset: new mp.Vector3(0, 1, 0.5) }, // ZONE_HEAD
    2: {bone: 64729, offset: new mp.Vector3(-2, 0, 0.5) }, // ZONE_LEFT_ARM
    3: {bone: 10706, offset: new mp.Vector3(2, 0, 0.5) }, // ZONE_RIGHT_ARM
    4: {bone: 57717, offset: new mp.Vector3(0, -1.5, 0.5) }, // ZONE_LEFT_LEG
    5: {bone: 52301, offset: new mp.Vector3(0, -1.5, 0.5) }, // ZONE_RIGHT_LEG
	6: {bone: 0, offset: new mp.Vector3(0, -2, 0.7) }, // ZONE_BACK
  }
  ZoneNames = {
	  'Торс': 'ZONE_TORSO', 
	  'Спина': 'ZONE_BACK', 
	  'Голова': 'ZONE_HEAD', 
	  'Левая рука': 'ZONE_LEFT_ARM', 
	  'Правая рука': 'ZONE_RIGHT_ARM', 
	  'Левая нога': 'ZONE_LEFT_LEG', 
	  'Правая нога': 'ZONE_RIGHT_LEG'
  }
  savedClothes = {
    Masks: {componentID: 1, clearDrawableMale: 0, clearDrawableFemale: 0, drawableId: null, textureId: null, paletteId: null},
    Torsos: {componentID: 3, clearDrawableMale: 15, clearDrawableFemale: 15, drawableId: null, textureId: null, paletteId: null},
    Legs: {componentID: 4, clearDrawableMale: 21, clearDrawableFemale: 15, drawableId: null, textureId: null, paletteId: null},
    BagsAndParachutes: {componentID: 5, clearDrawableMale: 0, clearDrawableFemale: 0, drawableId: null, textureId: null, paletteId: null},
    Shoes: {componentID: 6, clearDrawableMale: 34, clearDrawableFemale: 35, drawableId: null, textureId: null, paletteId: null},
    Accessories: {componentID: 7, clearDrawableMale: 0, clearDrawableFemale: 0, drawableId: null, textureId: null, paletteId: null},
    Undershirts: {componentID: 8, clearDrawableMale: 15, clearDrawableFemale: 15, drawableId: null, textureId: null, paletteId: null},
    BodyArmors: {componentID: 9, clearDrawableMale: 0, clearDrawableFemale: 0, drawableId: null, textureId: null, paletteId: null},
    Tops: {componentID: 11, clearDrawableMale: 15, clearDrawableFemale: 15, drawableId: null, textureId: null, paletteId: null},
  }

  constructor() {
    this.loadEvents();
  }

  loadEvents() {
	mp.events.add('loadCharacter.success', () => {
	  let resultList = [ {text: "Уйти"}, {text: "Удалить татуировку"} ];
	   for (let item in this.ZoneNames) {
		   resultList.push({text: item})
	   }
	  menu.execute(`selectMenuAPI.setSpecialItems("biz_7_tatooList", ${JSON.stringify(resultList)})`);
    }); 
	  
    mp.events.add('client:tatooShop:startChoose', (currentTatoos) => {
      this.CurrentTatoos = currentTatoos;

      this.clearClothes();
      this.resetTatoos();

      const pos = mp.players.local.getOffsetFromInWorldCoords(0, 3, 0.1);
      this.createCam(pos, {x: 0, y: 0, z: mp.players.local.getHeading() + 180});
	  characterRotator.start()
	  //setCursor(true);
	  setCursor(false);
    });

    mp.events.add('client:tatooShop:stopChoose', () => {
      this.setSavedClothes();
      this.resetTatoos();
	  characterRotator.stop()
	  setCursor(false);

      this.CurrentTatoos = null;
      mp.game.cam.renderScriptCams(false, false, 1000, false, false);
    });

    mp.events.add('client:tatooShop:changeTatoo', (item, idx) => {
      this.resetTatoos();
      if (idx != null) {
        if (!this.CurrentTatoos.includes(item.id)) {
          const hash = mp.clientStorage.sex ? item.HashNameMale : item.HashNameFemale;
          if (hash) {
            mp.players.local.setDecoration(mp.game.joaat(item.Collection), mp.game.joaat(hash));
            if (this.CurrentZoneChoosed != item.ZoneID) {
              const zone = this.ZoneOffset[item.ZoneID];

              const lookAtPos = mp.players.local.getBoneCoords(zone.bone, 0, 0, 0);
              this.CurrentZoneChoosed = item.ZoneID;
              this.Camera = mp.CameraMoveTo(this.Camera.getCoord(), mp.players.local.getOffsetFromInWorldCoords(zone.offset.x, zone.offset.y, zone.offset.z), new mp.Vector3(), new mp.Vector3(), 8, 45);
              this.Camera.pointAtCoord(lookAtPos.x, lookAtPos.y, lookAtPos.z);
            }
          } else {
            mp.game.graphics.notify("~r~" + `Данная татуировка не совместима с вашим персонажем!`);
          }
        }
      }
    });

    mp.events.add('client:tatooShop:loadDeletableTatoos', () => {
      this.loadDeletableTatoos();
    });

    mp.events.add('client:tatooShop:buyTatoo', (item) => {
      if (!this.CurrentTatoos.includes(item.id)) {
        const hash = mp.clientStorage.sex ? item.HashNameMale : item.HashNameFemale;
        if (hash) {
          mp.events.callRemote("server:tatooShop:buyTatoo", item.id);
        } else {
          mp.game.graphics.notify("~r~" + `Данная татуировка не совместима с вашим персонажем!`);
        }
      } else {
        mp.game.graphics.notify("~r~" + `У вас уже есть татуировка ${item.text}!`);
      }
    });

    mp.events.add('client:tatooShop:completedBuyed', (id) => {
      if (id) {
        this.CurrentTatoos.push(id);
        this.resetTatoos();
        mp.game.graphics.notify("~g~" + `Вы купили татуировку!`);
      }
    });

    mp.events.add('client:tatooShop:deleteTatoo', (item) => {
      if (this.CurrentTatoos.includes(item.id)) {
        mp.events.callRemote("server:tatooShop:deleteTatoo", item.id);
      } else {
        mp.game.graphics.notify("~r~" + `У вас нет такой татуировки!`);
      }
    });

    mp.events.add('client:tatooShop:completedDeleted', (id) => {
      if (id) {
        this.CurrentTatoos = this.CurrentTatoos.filter((item) => item != id);
        this.loadDeletableTatoos();
        mp.game.graphics.notify("~g~" + `Татуировка удалена.`);
      }
    });
	
	mp.events.add('client:tatooShop:openCategory', (category) => {
      this.loadTatoos(category)
    });
  }

  createCam(pos, rot, viewangle = undefined) {
    this.Camera = mp.cameras.new("default");
    this.Camera.setCoord(pos.x + 1, pos.y, pos.z + 0.5);
    this.Camera.setRot(rot.x, rot.y, rot.z, 2);
    if (viewangle) this.Camera.setFov(viewangle);
    this.Camera.setActive(true);

    mp.game.cam.renderScriptCams(true, false, 0, true, false);
  }

  clearClothes() {
    for (let item in this.savedClothes) {
      this.savedClothes[item].drawableId = mp.players.local.getDrawableVariation(this.savedClothes[item].componentID);
      this.savedClothes[item].textureId = mp.players.local.getTextureVariation(this.savedClothes[item].componentID);
      this.savedClothes[item].paletteId = mp.players.local.getPaletteVariation(this.savedClothes[item].componentID);
      mp.players.local.setComponentVariation(this.savedClothes[item].componentID, mp.clientStorage.sex ? this.savedClothes[item].clearDrawableMale : this.savedClothes[item].clearDrawableFemale, 0, 0);
    }
  }

  resetTatoos() {
    mp.players.local.clearDecorations();
    for (let item of this.CurrentTatoos) {
      const tatoo = tatoo_list.find((el) => el.id == item);
      mp.players.local.setDecoration(mp.game.joaat(tatoo.Collection), mp.game.joaat(mp.clientStorage.sex ? tatoo.HashNameMale : tatoo.HashNameFemale));
    }
  }

  setSavedClothes() {
    for (let item in this.savedClothes) {
      mp.players.local.setComponentVariation(this.savedClothes[item].componentID, this.savedClothes[item].drawableId, this.savedClothes[item].textureId, this.savedClothes[item].paletteId);
    }
  }


  loadTatoos(category) {
	var curcategory = this.ZoneNames[category]
	let resultList = [{text: "Вернуться"}];
    for (let item of tatoo_list) {
      const hash = mp.clientStorage.sex ? item.HashNameMale : item.HashNameFemale;
      if(hash && curcategory == item.Zone) {
        resultList.push({
          "id": item.id,
          "Collection": item.Collection,
          "Name": item.Name,
          "text": item.text,
          "HashNameMale": item.HashNameMale,
          "HashNameFemale": item.HashNameFemale,
          "Zone": item.Zone,
          "ZoneID": item.ZoneID,
          "values": [`${item.Price}$`]
        })
      }
    }
	menu.execute(`selectMenuAPI.setHeader("biz_7_tatooList_category", ${category})`);
    menu.execute(`selectMenuAPI.setSpecialItems("biz_7_tatooList_category", ${JSON.stringify(resultList)})`);
	mp.events.call("selectMenuTalRasha.show", "biz_7_tatooList_category");
  }

  loadDeletableTatoos() {
    let resultList = [ {text: "Вернуться"} ];
    for (let item of this.CurrentTatoos) {
      const tatoo = tatoo_list.find((el) => el.id == item);
      resultList.push({
        "id": tatoo.id,
        "text": tatoo.text,
        "ZoneID": tatoo.ZoneID,
        "values":[`${Math.floor(tatoo.Price / 100 * 60)}$`]
      });
    }

    menu.execute(`selectMenuAPI.setSpecialItems("biz_7_deleteTatoo", ${JSON.stringify(resultList)})`);
    mp.events.call("selectMenuTalRasha.show", "biz_7_deleteTatoo");
  }
}
new Tatooshop();

};