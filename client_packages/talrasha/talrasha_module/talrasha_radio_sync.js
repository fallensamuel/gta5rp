var radioTimerId = undefined;

mp.events.add("disableVehicleRadio", () => {
    if (mp.players.local.vehicle) {
        mp.players.local.vehicle.radio = 255;
        mp.game.audio.setRadioToStationName("OFF");
    }
});

mp.events.add("setVehRadioStation", (vehicle, station) => {
	if (!vehicle.handle) return;
    mp.game.invoke("0x1B9C0099CB942AC6", vehicle.handle, station);
})

mp.events.add('playerEnterVehicle', (vehicle, seat) => {
    mp.game.invoke("0x1B9C0099CB942AC6", vehicle.handle, "OFF");
    if (vehicle !== undefined) {
        vehicle.setInvincible(false);
    }
    
    if (radioTimerId !== undefined) {
        clearInterval(radioTimerId);
        radioTimerId = undefined;
    }
    
    radioTimerId = setInterval(() => {
        radio_sync();
    }, 1000);
});

mp.events.add('playerLeaveVehicle', () => {
    clearInterval(radioTimerId);
    radioTimerId = undefined;
});

function radio_sync() {
    let player = mp.players.local;
    let radio_index;

    if (player.vehicle) {
        if (!player.vehicle.radio) {
            radio_index = 255;
        } else {
            radio_index = player.vehicle.radio;
        }

        if (player.vehicle && player.vehicle.getPedInSeat(-1) === player.handle) {
            if (radio_index != mp.game.invoke("0xE8AF77C4C06ADC93")) {
                radio_index = mp.game.invoke("0xE8AF77C4C06ADC93");
                mp.events.callRemote('radio.set', radio_index);
            }
        } else {
            if (radio_index == 255) {
                mp.game.audio.setRadioToStationName("OFF");
            } else {
                mp.game.invoke("0xF7F26C6E9CC9EBB8", true);
                mp.game.invoke("0xA619B168B8A8570F", radio_index);
            }
        }
    }
}
