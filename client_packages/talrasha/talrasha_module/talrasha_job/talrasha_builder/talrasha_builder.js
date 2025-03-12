const JobBuilder = {
  job_colshape: undefined,
  job_gmarker: undefined,
  job_blip: undefined,
  clothes_marker: undefined,
  keyDownE: undefined,
  job_status: -1,
  timeout: undefined,
  item: undefined
};

mp.events.add("time.add.back.builder", (player) => {
    try
    {
      if (JobBuilder.timeout === undefined) {
         JobBuilder.timeout = setTimeout(() => {
            mp.events.callRemote("leave.builder.job");
         }, 60000);
      }
    }
    catch (err) {
        mp.game.graphics.notify(err);
        return;
    }
});
mp.events.add("time.remove.back.builder", (player) => {
    try
    {
      if (JobBuilder.timeout !== undefined) {
           clearTimeout(JobBuilder.timeout);
           delete JobBuilder.timeout;
      }
    }
    catch (err) {
        mp.game.graphics.notify(err);
        return;
    }
});

mp.events.add('setBuilderJobStatus', (status) => { JobBuilder.keyDownE = status; });
mp.events.add('getBuilderJobStatus', (status) => {
  if (status !== "cancel") {
    mp.events.call(`prompt.showByName`, ["talrasha_jobs"]);
    JobBuilder.keyDownE = status;
  } else {
    JobBuilder.keyDownE = null;
  }
});
mp.keys.bind(0x45, false, function () { // E key
	if (JobBuilder.keyDownE !== undefined) {
		if (mp.game.gameplay.getDistanceBetweenCoords(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, 143.078, -368.207, 43.4861, true) < 1.75){
      mp.gui.cursor.show(true, true);
      if (JobBuilder.keyDownE === true) {
          mp.events.call("choiceMenu.show", "accept_job_builder", {name: "уволиться со Стройки?"});
      } else {
					mp.events.call("choiceMenu.show", "accept_job_builder", {name: "устроиться на Стройку?"});
      }
		}
	}
});
mp.events.add('playerEnterColshape', (shape) => {
    if (shape === JobBuilder.job_colshape) if (JobBuilder.job_status !== -1) mp.events.callRemote("use.builderfunctions.job",  JobBuilder.job_status);
});

mp.events.add('create.builder.loader', (posx, posy, posz, contin, status) => {
  try
	{
    JobBuilder.job_status = status;
		if (JobBuilder.job_gmarker !== undefined) {
			JobBuilder.job_gmarker.destroy();
			JobBuilder.job_blip.destroy();
      JobBuilder.job_colshape.destroy();
      delete JobBuilder.job_gmarker, delete JobBuilder.job_blip, delete JobBuilder.job_colshape;
		}
    if (JobBuilder.item !== undefined) {
      JobBuilder.item.destroy();
      delete JobBuilder.item;
    }
		if (contin === true) {
			JobBuilder.job_gmarker = mp.checkpoints.new(1, new mp.Vector3(posx, posy, posz - 1.35), 2, { visible: true, dimension: 0, color: [255, 0, 0, 190] });
			JobBuilder.job_blip = mp.blips.new(1, new mp.Vector3(posx, posy), { alpha: 255, color: 1 });
      JobBuilder.job_colshape = mp.colshapes.newSphere(posx, posy, posz, 2);
		}
	} catch (err) {
		mp.game.graphics.notify("~r~" + err);
		return;
	}
});

mp.events.add('create.watefront.item', (contin, create, status, posx, posy, posz) => {
  try
	{
    JobBuilder.job_status = status;
		if (JobBuilder.job_gmarker !== undefined) {
			JobBuilder.job_gmarker.destroy();
			JobBuilder.job_blip.destroy();
      JobBuilder.job_colshape.destroy();
      delete JobBuilder.job_gmarker, delete JobBuilder.job_blip, delete JobBuilder.job_colshape;
		}
    if (JobBuilder.item !== undefined) {
      JobBuilder.item.destroy();
      delete JobBuilder.item;
    }
		if (contin === true) {
			JobBuilder.job_gmarker = mp.checkpoints.new(1, new mp.Vector3(posx, posy, posz - 1.2), 2, { visible: true, dimension: 0, color: [255, 0, 0, 180] });
			JobBuilder.job_blip = mp.blips.new(1, new mp.Vector3(posx, posy), { alpha: 255, color: 1 });
      JobBuilder.job_colshape = mp.colshapes.newSphere(posx, posy, posz, 1);
		}
	} catch (err) {
		mp.game.graphics.notify("~r~" + err);
		return;
	}
});
