class CharacterRotator {
	startForPeds(peds){
		this.peds = peds;
        this.activate(true); 
    }
    start(){
        this.activate(true); 
    }
    stop(){
		if (this.peds) delete this.peds;
        this.activate(false)
    }
    rotate(){   
        let position = parseInt(mp.gui.cursor.position.toString().substr(0,4))  
        if(this.position == undefined) this.position = position 
        if(this.position == position) return
        if(this.lastPosition == position){
            this.reset()
            return;
        }
        if(this.position < position) {
			if (this.peds) {
				for (const ped of this.peds) {
					this.setHeading(ped, ped.getHeading() + 5);
				}
			}
			else this.setHeading(mp.players.local, mp.players.local.getHeading() + 5);
        }
        else {
			if (this.peds) {
				for (const ped of this.peds) {
					this.setHeading(ped, ped.getHeading() - 5);
				}
			}
            else this.setHeading(mp.players.local, mp.players.local.getHeading() - 5);
        }
        this.lastPosition = position
        
    }
    activate(state){
        this.isActive = state
    }  
    reset(){
        this.position = undefined
        this.lastPosition = undefined
    }
    setHeading(ped, heading){
        ped.setHeading(heading);
    }
}
 
const characterRotator = new CharacterRotator();
mp.events.add("characterRotator::handle", (bool) => {
    if(bool) characterRotator.start()
    else characterRotator.stop()
})
mp.events.add("render", () => {
    if(!characterRotator.isActive || mp.banCameraRotate) return
    if (mp.gui.cursor.visible){
        if (mp.game.controls.isDisabledControlPressed(2, 237)) {
            characterRotator.rotate()
        } 
        if (mp.game.controls.isDisabledControlJustReleased(2, 237)) {
            characterRotator.reset()
        } 
    }
    if(mp.keys.isDown(33)){
		if (characterRotator.peds) {
			for (const ped of characterRotator.peds) {
				characterRotator.setHeading(ped, ped.getHeading() - 5);
			}
		}
        else characterRotator.setHeading(mp.players.local, mp.players.local.getHeading() - 5);
    }
    else if(mp.keys.isDown(34)){
		if (characterRotator.peds) {
			for (const ped of characterRotator.peds) {
				characterRotator.setHeading(ped, ped.getHeading() + 5);
			}
		}
        else characterRotator.setHeading(mp.players.local, mp.players.local.getHeading() + 5);
    }
})
// mp.events.add("render", () => {
	

// 	const x = mp.game.controls.getDisabledControlNormal(2, 239);
// 	const y = mp.game.controls.getDisabledControlNormal(2, 240);

// 	if (cameraRotator.isPointEmpty()) {
// 		cameraRotator.setPoint(x, y);
// 	}

// 	const currentPoint = cameraRotator.getPoint();
// 	const dX = currentPoint.x - x;
// 	const dY = currentPoint.y - y;
	
// 	cameraRotator.setPoint(x, y);

// 	// Comment before commit
// 	drawDebugText();

	
// });

exports = characterRotator