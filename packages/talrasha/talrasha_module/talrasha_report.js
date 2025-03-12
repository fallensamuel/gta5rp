module.exports = {
    Init: () => {
        loadOpenReportsFromDB();
    }
}

function loadOpenReportsFromDB() {
    mp.v2_reports = {};
	mp.report_logs = {};
    initReportsUtils();
    DB.Handle.query("SELECT * FROM talrasha_report WHERE status=?", 1, (e, result) => {
        for (var i = 0; i < result.length; i++) {
            initReportUtils(result[i]);
            mp.v2_reports[result[i].id] = result[i];
            mp.v2_reports[result[i].id].messages = [];
        }

		console.log(`\x1b[32m[DONE]\x1b[0m "Open reports" package has been loaded: \x1b[33m${i}\x1b[0m.`);

        var keys = Object.keys(mp.v2_reports);
        var array = [];
        keys.forEach((k) => {
            array.push("?");
        });
        DB.Handle.query(`SELECT * FROM talrasha_report_message WHERE reportId IN (${array})`, keys, (e, result) => {
            for (var i = 0; i < result.length; i++) {
                var report = mp.v2_reports[result[i].reportId];
                if (report.messages.length > 30) continue;
                report.messages.push(result[i]);
            }
            console.log(`Сообщения репорта загружены: ${i} шт.`);
        });
    });
}

function initReportUtils(report) {
    report.pushMessage = (player, text) => {
        // debug(`report.pushMessage: ${player.name} ${text}`)
        var message = {
            playerId: player.sqlId,
			serverId: player.id,
            name: player.name,
            text: text.substr(0, 100).escape().trim(),
            date: parseInt(new Date().getTime())
        };
       /* if (player.admin) {
            if (!report.adminId) {
                report.setAdminId(player.sqlId);
            } else if (report.adminId != player.sqlId) {
                return player.utils.error(`Репорт занят другим администратором!`);
            }
        }*/
        if (report.messages.length > 30) report.messages.splice(0, 1);
        report.messages.push(message);
        DB.Handle.query("INSERT INTO talrasha_report_message (reportId,playerId,name,text,date) VALUES (?,?,?,?,?)",
            [report.id, message.playerId, message.name, message.text, message.date], (e, result) => {
                message.id = result.insertId;
            });

        mp.players.forEach((rec) => {
            if (rec.sqlId && rec.admin) rec.call(`console.addReportMessage`, [report.id, message]);
            /*else */
            if (rec.sqlId == report.playerId) {
                // Send to report's owner.
                rec.utils.setReport('setNewMessage', {
                    reportId: report.id,
                    name: player.name,
                    serverId: player.id,
                    playerId: player.sqlId,
                    message: message.text,
                    date: Math.floor(Date.now())
                });
            }
        });
    };
    report.setAdminId = (id) => {
        report.adminId = id;
        DB.Handle.query("UPDATE talrasha_report SET adminId=? WHERE id=?", [id, report.id]);
        mp.players.forEach((rec) => {
            if (rec.sqlId && rec.admin) rec.call(`console.setReportAdminId`, [report.id, report.adminId]);
        });
    };
    report.setStatus = (status) => {
        report.status = status;
        DB.Handle.query("UPDATE talrasha_report SET status=? WHERE id=?", [status, report.id]);
        mp.players.forEach((rec) => {
            if (rec.sqlId && rec.admin) rec.call(`console.removeReport`, [report.id]);
			if (rec.sqlId == report.playerId) rec.call(`reportSystem.removeReport`, [report.id]);
        });
		if (report.adminId) {
			if (!mp.report_logs[report.adminId]) mp.report_logs[report.adminId] = []
			mp.report_logs[report.adminId].push(report)
		}
        if (!report.status) delete mp.v2_reports[report.id];
    };
}

function initReportsUtils() {
    mp.v2_reportsUtils = {
        createClaim: (player, text) => {
            createReport("claim", player, text);
        },
        createHelp: (player, text) => {
            createReport("help", player, text);
        },
        unattachReports: (playerSqlId) => {
            for (var id in mp.v2_reports) {
                var report = mp.v2_reports[id];
                if (report.adminId == playerSqlId) report.setAdminId(0);
            }
        },
    };
}

function createReport(type, player, text) {
    var time = parseInt(new Date().getTime() / 1000);
    DB.Handle.query("INSERT INTO talrasha_report (playerId,type,date) VALUES (?,?,?)", [player.sqlId, type, time], (e, result) => {
        if (e) return console.log(e);

        var report = {
            id: result.insertId,
            playerId: player.sqlId,
			playerSId: player.id,
            adminId: 0,
            type: type,
            status: 1,
            date: time,
            messages: [],
        };
        mp.players.forEach((rec) => {
            if (rec.sqlId && rec.admin) rec.call(`console.pushReport`, [report]);
        });
        initReportUtils(report);
        mp.v2_reports[report.id] = report;

        report.pushMessage(player, text);

        // Send to report's owner.
        player.utils.setReport('setNewReport', {
            sqlId: report.id,
            reason: (report.type == "claim") ? "Жалоба" : "Помощь",
            playerId: player.sqlId,
            adminId: null,
            updated_at: Math.floor(Date.now()),
            created_at: Math.floor(Date.now()),
            status: 0
        });
    });
}
