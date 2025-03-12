// nullrouted autopilot v2
const localPlayer = mp.players.local;
let autoPilotActivated = false;
let autoPilotColshape = null;
const vehiclesHaveAutopilot = ['g63'];
function errornoap(){
	mp.events.call("prompt.show", `У данного транспорта нет системы автопилота!`);
}
function errorengine(){
	mp.events.call("prompt.show", `Запустите двигатель!`);
}
function activeap(){
	mp.events.call("prompt.show", `Автопилот активирован!`);
}
function deactiveap(){
	mp.events.call("prompt.show", `Автопилот деактивирован!`);
}
function notifysetmarker(){
	mp.events.call("prompt.show", `Сначала поставьте метку на карте!`);
}
function markerisdest(){
	mp.events.call("prompt.show", `Вы прибыли на место назначения!`);
}
mp.keys.bind(0x4B, true, function() { // K
	if(localPlayer.vehicle)
	{
        for (let k = 0; k < vehiclesHaveAutopilot.length; k++)
        {
            let model = mp.game.joaat(vehiclesHaveAutopilot[k]);
            if (!localPlayer.vehicle.isModel(model))
                return errornoap();
        }
		if(localPlayer.vehicle.getPedInSeat(-1) == localPlayer.handle && autoPilotActivated == false)
		{
            if(localPlayer.vehicle.getIsEngineRunning() == false)
            {
                errorengine();
                return;
            }
			if(mp.game.invoke('0x1DD1F58F493F1DA5')) // IS_WAYPOINT_ACTIVE
			{
				let blipID 		= mp.game.invoke('0x186E5D252FA50E7D'); 		// _GET_BLIP_INFO_ID_ITERATOR
				let firstBlip 	= mp.game.invoke('0x1BEDE233E6CD2A1F', blipID); // GET_FIRST_BLIP_INFO_ID
				let nextBlip 	= mp.game.invoke('0x14F96AA50D6FBEA7', blipID); // GET_NEXT_BLIP_INFO_ID
				for(let i = firstBlip; mp.game.invoke('0xA6DB27D19ECBB7DA', i) != 0; i = nextBlip) // DOES_BLIP_EXIST
				{
					if(mp.game.invoke('0xBE9B0959FFD0779B', i) == 4) // GET_BLIP_INFO_ID_TYPE
					{
						let coord = mp.game.ui.getBlipInfoIdCoord(i);
						if(coord) 
						{
							localPlayer.taskVehicleDriveToCoordLongrange(localPlayer.vehicle.handle, coord.x, coord.y, 150.0, 22.0, 2883621, 30.0);
                            activeap();
							autoPilotActivated = true;
							if(autoPilotColshape != null) autoPilotColshape.destroy();
							autoPilotColshape = mp.colshapes.newCircle(coord.x, coord.y, 15.0, localPlayer.dimension);
						}
						return ;
					}
				}
			}
            notifysetmarker();
        }
        else if (autoPilotActivated)
        {
            stopAutopilot(false);
            deactiveap();
        }
	}
});
mp.events.add('playerEnterVehicle', () => {
	if(localPlayer.vehicle) 
		stopAutopilot(false);
});
mp.events.add('vehicleEngineHandler', () => {
	if(localPlayer.vehicle) 
		stopAutopilot();
});
mp.events.add("playerEnterColshape", (shape) => {
	if(shape == autoPilotColshape) 
	{
        stopAutopilot();
        markerisdest();
	}
});
function stopAutopilot(stopVehicle = true)
{
	if(autoPilotActivated)
	{
		if(localPlayer.vehicle)
		{
			if(stopVehicle) localPlayer.vehicle.setVelocity(0.5, 0.5, 0.5);
			localPlayer.clearTasks();
		}
		if(autoPilotColshape != null)
		{
			autoPilotColshape.destroy();
			autoPilotColshape = null;
		}
		autoPilotActivated = false;
	}
}