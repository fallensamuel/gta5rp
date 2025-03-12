module.exports = {
    "playerStartEnterVehicle": (player) => {
        //debug(player.vehicle.mileage);
        //player.call(`setVehicleVar`, [player.vehicle, "mileage", player.vehicle.mileage]);
        if (player.getVariable("attachedObject")) {
          if (player.job === 7 && player.builder) {
            let jobOpen = require("../talrasha_module/talrasha_job/talrasha_builder/talrasha_builder.js");
            jobOpen.stopBringingLoad(player);
          }
          player.setVariable("attachedObject", null);
        }
    }
}
