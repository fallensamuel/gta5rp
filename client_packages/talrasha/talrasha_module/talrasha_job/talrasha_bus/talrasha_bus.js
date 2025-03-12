const JobBus = {
	timeout: undefined,
	keyDownE: undefined,
	mush: [],
	current: 0,
	max: 999,
	blip: undefined,
	marker: undefined,
	colshape: undefined,
	vehicle: undefined,
	joinColshape: mp.colshapes.newSphere(-784.70, -2350.80, 14.57, 1.25),
	joinColshapeTwo: mp.colshapes.newSphere(-2187.01, -388.09, 13.36, 1.25),
	info: [
		{
			type: 1,
			radius: 5,
			blipcolor: 1,
			markercolor: [255, 0, 0, 200],
			blipname: "Маршрут"
		},
		{
			type: 4,
			radius: 10,
			blipcolor: 1,
			markercolor: [255, 0, 0, 200],
			blipname: "Остановка"
		}
	]
};
mp.events.add(
{
	"playerEnterColshape": (shape) => {
		if (shape === JobBus.joinColshapeTwo) {
	      mp.events.call(`prompt.showByName`, ["talrasha_jobs"]);
	      JobBus.keyDownE = true;
		}
		if (shape === JobBus.joinColshape) {
	      mp.events.call(`prompt.showByName`, ["talrasha_jobs"]);
	      JobBus.keyDownE = true;
    } else if (shape === JobBus.colshape && mp.players.local.vehicle) {
			if (JobBus.vehicle == mp.players.local.vehicle) {
				let mash = JobBus.mush[JobBus.current];
				if (JobBus.current == JobBus.max - 1) {
					//mp.players.local.vehicle.freezePosition(true);
					clearMash();
					mp.events.call("selectMenu.show", "bus_mash");
					mp.events.callRemote("pay.bus.salary");
					return;
				}
				if (mash.type == 0) {
					JobBus.current++;
					sendMash();
				} else if (mash.type == 1) {
					setTimeout(() => {
						//mp.players.local.vehicle.freezePosition(true);
					}, 150);
					mp.events.call("nInfo", "Подождите 10 секунд");
					setTimeout(() => {
						try {
							JobBus.current++;
							sendMash();
							//mp.players.local.vehicle.freezePosition(false);
						} catch (err) {
							return;
						}
					}, 10000);
				}
			}
		}
	},
	"playerExitColshape": (shape) => {
		if (shape === JobBus.joinColshape) {
		 	  delete JobBus.keyDownE;
        mp.events.call("prompt.hide");
		}
		if (shape === JobBus.joinColshapeTwo) {
		 	  delete JobBus.keyDownE;
        mp.events.call("prompt.hide");
		}
	},
	"time.add.back.bus": (time) => {
		if (JobBus.timeout === undefined) {
			 JobBus.timeout = setTimeout(() => {
					mp.events.callRemote("leave.bus.job");
			 }, time);
		}
	},
	"time.remove.back.bus": () => {
		if (JobBus.timeout !== undefined) {
				 clearTimeout(JobBus.timeout);
				 delete JobBus.timeout;
		}
	},
	"start.bus.mash": (veh, mush) => {
		JobBus.current = 0;
		JobBus.max = mush.length;
		JobBus.mush = mush;
		JobBus.vehicle = veh;
		sendMash();
	},
	"clear.bus.data": () => {
		clearMash();
	}
});

mp.keys.bind(0x45, false, function () {
	if (JobBus.keyDownE) {
    if (mp.clientStorage["job"] != 0 && mp.clientStorage["job"] != 2) return mp.events.call(`nError`, `Вы уже где-то работаете!`);
    mp.gui.cursor.show(true, true);
    if (mp.clientStorage["job"] == 2) mp.events.call("choiceMenu.show", "accept_job_bus", {name: "уволиться из Автобусного Парка?"});
    else mp.events.call("choiceMenu.show", "accept_job_bus", {name: "устроиться в Автобусный Парк?"});
	}
});

function sendMash() {
	let mash = JobBus.mush[JobBus.current];
	let info = JobBus.info[mash.type];
	clearMash();
	JobBus.blip = mp.blips.new(1, new mp.Vector3(mash.x, mash.y), { alpha: 255, color: info.blipcolor, name: info.blipname });
	//JobBus.blip.setRoute(true);
	JobBus.blip.setRouteColour(info.blipcolor);
	JobBus.marker = mp.checkpoints.new(info.type, new mp.Vector3(mash.x, mash.y, mash.z - 2.0), info.radius, { visible: true, dimension: 0, color: info.markercolor });
	JobBus.colshape = mp.colshapes.newSphere(mash.x, mash.y, mash.z, 4.0);
}
 function clearMash() {
	 if (JobBus.blip) {
		 JobBus.blip.setRoute(false);
		 JobBus.blip.destroy();
	 }
	 if (JobBus.marker) JobBus.marker.destroy();
	 if (JobBus.colshape) JobBus.colshape.destroy();
	 delete JobBus.blip, delete JobBus.marker, delete JobBus.colshape;
 }
