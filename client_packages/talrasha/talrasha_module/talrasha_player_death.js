var localPlayer = mp.players.local;
var healthData = {
    lastHealth: localPlayer.getHealth(),
    lastArmour: localPlayer.getArmour(),
};
var timer = 0;
var healthBarTimer;
const WAIT_RESPAWN = 3 * 60;
const WAIT_RESPAWN_NOMEDICS = 10 * 60;

mp.events.add("setDeathTimer", (sendCall) => {
	var waittime = WAIT_RESPAWN
	
	if (sendCall) {
		mp.events.callRemote("knockDown.sendCall");
		waittime = WAIT_RESPAWN_NOMEDICS
	}
	
	timer = waittime;
	
	mp.events.add("render", deathTimer);
	
	healthBarTimer = setInterval(() => {
		timer -= 1;
		if (timer <= 0 || !localPlayer.getHealth()) {
			clearInterval(healthBarTimer);
			mp.events.callRemote("hospital.respawn");
		}
	}, 1000);

});

function deathTimer() {
	var mins = parseInt(timer / 60)
	if (mins < 10) mins = `0${mins}`;
	var sec = timer % 60
	if (sec < 10) sec = `0${sec}`;
	mp.game.graphics.drawText(`До смерти: ${mins}:${sec}`, [0.9, 0.9], { 
      font: 4, 
      color: [255, 255, 255, 255], 
      scale: [0.5, 0.5]
    });
}


mp.events.addDataHandler("knockDown", (entity, value) => {
    if (entity.type != 'player') return;
    if (entity.remoteId == localPlayer.remoteId) { 
        mp.events.call("effect", "MP_Killstreak_Out", 800);
        packetSended = false
        mp.game.ui.setPauseMenuActive(false);
        if (value) {
            mp.events.call("choiceMenu.show", "accept_respawn"); 
            entity.knockDownRender = new mp.Event("render", () => {
                mp.game.controls.disableAllControlActions(0);
            })  
        } else {
            mp.events.call("choiceMenu.hide"); 
			if (healthBarTimer) {
				clearInterval(healthBarTimer);
				healthBarTimer = false;
			}
			mp.events.remove("render", deathTimer);
            if (entity.knockDownRender) {
                entity.knockDownRender.destroy()
                delete entity.knockDownRender
            }
        }
    } 
}) 


mp.events.add("render", () => { 
    if (localPlayer.getVariable("knockDown") && localPlayer.getHealth() >= 55 && !packetSended) {
        packetSended = true
        mp.events.callRemote("knockDown", false)
    }
}) 
