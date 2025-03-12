var mysql = require('mysql');

module.exports = {
    Handle: null,
    Connect: function(callback) {
        this.Handle = mysql.createPool({
            connectionLimit: 100,
            host: 'https://t.me/talrasha1',
            user: 'https://t.me/talrasha1',
            password: 'https://t.me/talrasha1',
            database: 'https://t.me/talrasha1',
            debug: false,
        });
        callback();
    },
    Characters: {
        getSqlIdByName: (name, callback) => {
            DB.Handle.query("SELECT id FROM talrasha_character WHERE name=?", [name], (e, result) => {
                if (result.length > 0) callback(result[0].id);
                else callback(0);
            });
        }
    }
};
