module.exports = {
    Init: () => {
        loadPedsFromDB();
        initPedsUtils();
    }
}

function loadPedsFromDB() {
    mp.dbPeds = [];
    DB.Handle.query("SELECT * FROM talrasha_ped", (e, result) => {
        for (var i = 0; i < result.length; i++) {
            var p = result[i];
            p.sqlId = p.id;
            p.position = new mp.Vector3(p.x, p.y, p.z);
            p.heading = p.h;
            p.hash = mp.joaat(p.model);
            delete p.x;
            delete p.y;
            delete p.z;
            delete p.h;
            delete p.model;
            delete p.id;

            mp.dbPeds.push(p);
        }

		console.log(`\x1b[32m[DONE]\x1b[0m "Peds" package has been loaded: \x1b[33m${i}\x1b[0m.`);
    });
}

function initPedsUtils() {
    mp.dbPeds.getNear = (player) => {
        var nearPed;
        var minDist = 99999;
        for (var i = 0; i < mp.dbPeds.length; i++) {
            var ped = mp.dbPeds[i];
            var distance = player.dist(ped.position);
            if (distance < minDist) {
                nearPed = ped;
                minDist = distance;
            }
        }

        return nearPed;
    };
    mp.dbPeds.deletePed = (ped) => {
        var index = mp.dbPeds.indexOf(ped);
        if (index == -1) return;

        DB.Handle.query("DELETE FROM talrasha_ped WHERE id=?", ped.sqlId);
        mp.dbPeds.splice(index, 1);

        mp.players.forEach((rec) => {
            if (rec.sqlId) rec.call(`peds.delete`, [ped.sqlId]);
        });
    };
}
