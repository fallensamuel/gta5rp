module.exports = {
    Init: () => {
      DB.Handle.query("SELECT * FROM talrasha_spawn_pos", (e, result) => {
		let spawnOpen = require("../talrasha_event/talrasha_character_event.js");
        if (result.length < 1) return spawnOpen.SpawnInfo.user_spawn.push({ x: 0, y: 0, z: 0, h: 0 });
        for (let i = 0; i < result.length; i++) spawnOpen.SpawnInfo.user_spawn.push({ x: result[i].x, y: result[i].y, z: result[i].z, h: result[i].rot });
		
		console.log(`\x1b[32m[DONE]\x1b[0m "Spawns" package has been loaded: \x1b[33m` + spawnOpen.SpawnInfo.user_spawn.length + `\x1b[0m.`);
		
      });
    }
}
