module.exports.Init = function(callback) {

    DB.Handle.query("SELECT * FROM talrasha_economy", (e, result) => {
        mp.economy = {};
        for (var i = 0; i < result.length; i++) {
            mp.economy[result[i].key] = {
                key: result[i].key,
                value: result[i].value,
                description: result[i].description
            };
            initEconomyUtils(mp.economy[result[i].key]);
        }

        console.log(`\x1b[32m[DONE]\x1b[0m "Variables economy" package has been loaded: \x1b[33m${i}\x1b[0m.`);
        callback();
    });
}

function initEconomyUtils(item) {
    item.setValue = (value) => {
        value = parseFloat(value);
        if (isNaN(value)) return;
        item.value = value;
        DB.Handle.query("UPDATE talrasha_economy SET value=? WHERE `key`=?", [item.value, item.key]);
    };
}
