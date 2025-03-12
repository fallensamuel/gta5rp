"use strict";

Math.clamp = function(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

global.md5 = require('md5');
global.DB = require('./talrasha_module/talrasha_database/talrasha_database');
global.Config = require('./talrasha_config.js');
global.terminal = require('./talrasha_module/talrasha_terminal.js');
global.debug = (text) => {
    terminal.debug(text);
};

var fs = require('fs');
var path = require('path');

var Events = [];

DB.Connect(function() {
	setTimeout(() => {
		fs.readdirSync(path.resolve(__dirname, 'talrasha_event')).forEach(function(i) {
			Events = Events.concat(require('./talrasha_event/' + i));
		});

		Events.forEach(function(i) {
			mp.events.add(i);
		});

		mp.events.call('ServerInit');
		
	}, 1000);
});

global.getHash = function(str) {
    var sum = 0;
    for (var i = 0; i < str.length; i++) {
        sum += str.charCodeAt(i);
    }
    return sum;
}

String.prototype.escape = function() {
    return this.replace(/[&"'\\]/g, "");
};
require('./talrasha_blip.js')
