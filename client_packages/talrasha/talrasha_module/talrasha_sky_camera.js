
const Natives = {
    SWITCH_OUT_PLAYER: '0xAAB3200ED59016BC',
    SWITCH_IN_PLAYER: '0xD8295AF639FD9CB8',
    IS_PLAYER_SWITCH_IN_PROGRESS: '0xD9D2CFFF49FAB35F'
};
let gui;

mp.events.add('moveSkyCamera', moveFromToAir);

function moveFromToAir(player, moveTo, switchType, showGui) {   

   switch (moveTo) {
       case 'up':
            if (showGui == false) {
                mp.gui.chat.show(showGui);
                gui = 'false';
            };
            mp.game.invoke(Natives.SWITCH_OUT_PLAYER, player.handle, 0, parseInt(switchType));
           break;
       case 'down':
            if (gui == 'false') {
                checkCamInAir();
            };
            mp.game.invoke(Natives.SWITCH_IN_PLAYER, player.handle);
           break;
   
       default:
           break;
   }
}
function checkCamInAir() {
    if (mp.game.invoke(Natives.IS_PLAYER_SWITCH_IN_PROGRESS)) {
        setTimeout(() => {
            checkCamInAir();
        }, 400);
    } else {
        mp.gui.chat.show(true);
        gui = 'true';
    }
}