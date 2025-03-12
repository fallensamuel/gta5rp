const JobWaterFront = {
  job_colshape: undefined,
  job_gmarker: undefined,
  job_blip: undefined,
  clothes_marker: undefined,
  keyDownE: undefined,
  job_status: -1,
  timeout: undefined,
  item: undefined
};

mp.events.add("time.add.back.watefront", (player) => {
    try
    {
      if (JobWaterFront.timeout === undefined) {
         JobWaterFront.timeout = setTimeout(() => {
            mp.events.callRemote("leave.watefront.job");
         }, 60000);
      }
    }
    catch (err) {
        mp.game.graphics.notify(err);
        return;
    }
});
mp.events.add("time.remove.back.waterfront", (player) => {
    try
    {
      if (JobWaterFront.timeout !== undefined) {
           clearTimeout(JobWaterFront.timeout);
           delete JobWaterFront.timeout;
      }
    }
    catch (err) {
        mp.game.graphics.notify(err);
        return;
    }
});

mp.events.add('setWaterFrontJobStatus', (status) => { JobWaterFront.keyDownE = status; });
mp.events.add('getWaterFrontJobStatus', (status) => {
  if (status !== "cancel") {
    mp.events.call(`prompt.showByName`, ["talrasha_jobs"]);
    JobWaterFront.keyDownE = status;
  } else {
    JobWaterFront.keyDownE = null;
  }
});
mp.keys.bind(0x45, false, function () { // E key
	if (JobWaterFront.keyDownE !== undefined) {
		if (mp.game.gameplay.getDistanceBetweenCoords(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, -456.71, -2750.073, 6.00, true) < 1.75){
      mp.gui.cursor.show(true, true);
      if (JobWaterFront.keyDownE === true) {
          mp.events.call("choiceMenu.show", "accept_job_waterfront", {name: "уволиться с Порта?"});
      } else {
					mp.events.call("choiceMenu.show", "accept_job_waterfront", {name: "устроиться в Порт?"});
      }
		}
	}
});
mp.events.add('playerEnterColshape', (shape) => {
    if (shape === JobWaterFront.job_colshape) if (JobWaterFront.job_status !== -1) mp.events.callRemote("use.watefrontfunctions.job",  JobWaterFront.job_status);
});

mp.events.add('create.watefront.loader', (posx, posy, posz, contin, status) => {
  try
	{
    JobWaterFront.job_status = status;
		if (JobWaterFront.job_gmarker !== undefined) {
			JobWaterFront.job_gmarker.destroy();
			JobWaterFront.job_blip.destroy();
      JobWaterFront.job_colshape.destroy();
      delete JobWaterFront.job_gmarker, delete JobWaterFront.job_blip, delete JobWaterFront.job_colshape;
		}
    if (JobWaterFront.item !== undefined) {
      JobWaterFront.item.destroy();
      delete JobWaterFront.item;
    }
		if (contin === true) {
			JobWaterFront.job_gmarker = mp.checkpoints.new(1, new mp.Vector3(posx, posy, posz - 1.35), 2, { visible: true, dimension: 0, color: [255, 0, 0, 190] });
			JobWaterFront.job_blip = mp.blips.new(1, new mp.Vector3(posx, posy), { alpha: 255, color: 1 });
      JobWaterFront.job_colshape = mp.colshapes.newSphere(posx, posy, posz, 2);
		}
	} catch (err) {
		mp.game.graphics.notify("~r~" + err);
		return;
	}
});

mp.events.add('create.watefront.item', (contin, create, status, posx, posy, posz) => {
  try
	{
    JobWaterFront.job_status = status;
		if (JobWaterFront.job_gmarker !== undefined) {
			JobWaterFront.job_gmarker.destroy();
			JobWaterFront.job_blip.destroy();
      JobWaterFront.job_colshape.destroy();
      delete JobWaterFront.job_gmarker, delete JobWaterFront.job_blip, delete JobWaterFront.job_colshape;
		}
    if (JobWaterFront.item !== undefined) {
      JobWaterFront.item.destroy();
      delete JobWaterFront.item;
    }
		if (contin === true) {
			JobWaterFront.job_gmarker = mp.checkpoints.new(1, new mp.Vector3(posx, posy, posz - 1.2), 2, { visible: true, dimension: 0, color: [255, 0, 0, 180] });
			JobWaterFront.job_blip = mp.blips.new(1, new mp.Vector3(posx, posy), { alpha: 255, color: 1 });
      JobWaterFront.job_colshape = mp.colshapes.newSphere(posx, posy, posz, 1);
		}
	} catch (err) {
		mp.game.graphics.notify("~r~" + err);
		return;
	}
});
