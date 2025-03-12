exports = (menu) => {
  const HelperInfo = {
    blips: [
      mp.blips.new(280, new mp.Vector3(-196.84, -794.47, 30.45), { alpha: 255, scale: 1, color: 3, name: "Майкл", shortRange: true }),
	  mp.labels.new('Майкл', new mp.Vector3(-196.84, -794.47, 30.45 + 1.0), { los: false, font: 0, drawDistance: 7, color: [255, 255, 255, 255] }),
    ],
    peds: [
      mp.peds.new(mp.game.joaat('player_zero'), new mp.Vector3(-196.84, -794.47, 30.45), 60.11, (streamPed) => { streamPed.setAlpha(50); }, 0),
    ],
    colshape: [
      mp.colshapes.newSphere(-196.84, -794.47, 30.45, 1.5),
    ],
    open: false,
    keydown_E: false
  };

  mp.events.add('playerEnterColshape', (shape) => {
    if (HelperInfo.colshape.includes(shape) && !mp.players.local.vehicle) {
      mp.events.call("prompt.show", `Нажмите <span>Е</span> для взаимодействия`);
      HelperInfo.keydown_E = true;
    }
  });

  mp.events.add('playerExitColshape', (shape) => {
    if (HelperInfo.colshape.includes(shape)) {
      HelperInfo.keydown_E = false;
      if (HelperInfo.open) {
        menu.execute(`start_help.forceHide()`);
        mp.events.call("prompt.hide");
        HelperInfo.open = false;
      }
    }
  });

  mp.keys.bind(0x45, false, function () { // E key
    if (!mp.players.local.vehicle && HelperInfo.keydown_E && !HelperInfo.open) {
      HelperInfo.open = true;
      menu.execute(`start_help.show()`);
      mp.events.call("prompt.hide");
    }
  });

  mp.events.add('update.help.main.open', (status) => {
      HelperInfo.open = status;
  });
}