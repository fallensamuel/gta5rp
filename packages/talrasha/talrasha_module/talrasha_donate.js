module.exports = {
    Init: () => {
        mp.donateList = [];
        DB.Handle.query("SELECT * FROM talrasha_donate_price", (e, result) => {
            for (var i = 0; i < result.length; i++) {
                mp.donateList.push({
                    sqlId: result[i].id,
                    name: result[i].name,
                    data: JSON.parse(result[i].data),
                    type: result[i].type,
                    days: result[i].days,
                    price: result[i].price  
                });
            }
			
			console.log(`\x1b[32m[DONE]\x1b[0m "Donate list" package has been loaded: \x1b[33m` + mp.donateList.length + `\x1b[0m.`);
        });
    }
}
