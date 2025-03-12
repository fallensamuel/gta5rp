const interiorChanged = require("talrasha/talrasha_event/talrasha_custom_event/talrasha_interior_changed.js");;

mp.events.add("render", () => {
	interiorChanged.tick();
});
