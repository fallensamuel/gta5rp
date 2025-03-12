module.exports = {
    Init: () => {
        mp.autosaloons = {
            saloons: [],
            vehicles: {},
            colorsCFG: []
        };

        DB.Handle.query("SELECT * FROM talrasha_auto_saloon", (e, result) => {
            for (var i = 0; i < result.length; i++) {
                var h = result[i];
                mp.autosaloons.saloons.push({
                    sqlId: h.id,
                    newCarCoord: JSON.parse(h.newCarCoord)
                });
            }
			
			console.log(`\x1b[32m[DONE]\x1b[0m "Dealer ships" package has been loaded: \x1b[33m${i}\x1b[0m.`);
        });

        DB.Handle.query("SELECT * FROM talrasha_vehicle_conf ORDER BY price ASC", (e, result) => {
            for (var i = 0; i < result.length; i++) {
                var h = result[i];
				if (!mp.autosaloons.vehicles[h.salon]) mp.autosaloons.vehicles[h.salon] = [];
                mp.autosaloons.vehicles[h.salon].push({
                    sqlId: mp.autosaloons.vehicles[h.salon].length,
                    model: h.model,
                    modelHash: h.modelHash,
                    brend: h.brend,
                    title: h.title,
                    fuelTank: h.fuelTank,
                    fuelRate: h.fuelRate,
                    price: h.price,
                    max: h.max,
                    buyed: h.buyed
                });
            }
			console.log(`\x1b[32m[DONE]\x1b[0m "Dealer ship vehicles" package has been loaded: \x1b[33m${i}\x1b[0m.`);
        });

        DB.Handle.query("SELECT * FROM talrasha_vehicle_conf_color", (e, result) => {
            for (var i = 0; i < result.length; i++) {
                var h = result[i];
                mp.autosaloons.colorsCFG.push({
                    sqlId: h.id,
                    gameColor: h.color
                });
            }
			
			console.log(`\x1b[32m[DONE]\x1b[0m "Dealer ship colors" package has been loaded: \x1b[33m${i}\x1b[0m.`);
        });
    }
}
