module.exports = {
    "reportSystem.sendMessage": (player, reportId, message) => {
        // debug(`reportSystem.sendMessage: ${player.name} ${reportId} ${message}`);
        var report = mp.v2_reports[reportId];
        if (!report) return player.utils.error(`Тикет с ID: ${reportId} не найден!`);
        report.pushMessage(player, message);
    },

    "reportSystem.createTicket": (player, message, reason) => {
         debug(`reportSystem.createTicket: ${player.name} ${message} ${reason}`)
        //if(player.admin) return player.utils.error(`Тебе нельзя задать вопрос/репорт!`);
        if (reason == "Вопрос") mp.v2_reportsUtils.createHelp(player, message);
        else mp.v2_reportsUtils.createClaim(player, message);
        return player.utils.success(`Ожидайте ответ от Администрации!`);
    },

    // Carter's console reports
    "report.addMessage": (player, data) => {
        // debug(`report.addMessage: ${player.name} ${data}`)
        data = JSON.parse(data);
        var reportId = data[0];
        var text = data[1].substr(0, 540).trim();
        var report = mp.v2_reports[reportId];
        if (!report) return player.utils.error(`Тикет с ID: ${reportId} не найден!`);
        report.pushMessage(player, text);
    },

    "report.attach": (player, reportId) => {
        // debug(`report.attach: ${player.name} ${reportId}`);
        if (!player.admin) return player.utils.error(`Вы не админ!`);
        var report = mp.v2_reports[reportId];
        if (!report) return player.utils.error(`Тикет с ID: ${reportId} не найден!`);
        if (report.adminId && report.adminId != player.sqlId) {
            var name = mp.players.getBySqlId(report.adminId).name;
            return player.utils.error(`Тикет занят администратором ${name}!`);
        }
        if (!report.adminId) {
            report.setAdminId(player.sqlId);
            player.utils.success(`Тикет закреплен!`);
        } else {
            report.setAdminId(0);
            player.utils.success(`Тикет откреплен!`);
        }
    },

    "report.close": (player, reportId) => {
        // debug(`report.close: ${player.name} ${reportId}`);
        if (!player.admin) return player.utils.error(`Вы не админ!`);
        var report = mp.v2_reports[reportId];
        if (!report) return player.utils.error(`Тикет с ID: ${reportId} не найден!`);
        if (!report.adminId) return player.utils.error(`Тикет должен быть закреплен за администратором!`);
        if (report.adminId != player.sqlId) {
            var name = mp.players.getBySqlId(report.adminId).name;
            return player.utils.error(`Тикет занят администратором ${name}!`);
        }
        if (!report.status) return player.utils.error(`Тикет уже закрыт!`);

        report.setStatus(0);
        player.utils.success(`Тикет закрыт!`);
    },

    "report.goto": (player, reportId) => {
        if (!player.admin) return player.utils.error(`Вы не админ!`);
        if (player.admin < 2) return player.utils.error(`Ваш уровень мал!`);
        var report = mp.v2_reports[reportId];
        if (!report) return player.utils.error(`Тикет с ID: ${reportId} не найден!`);

        var rec = mp.players.getBySqlId(report.playerId);
        if (!rec) return player.utils.error(`Игрок оффлайн!`);

        var pos = rec.position;
        pos.x += 2;
        player.position = pos;
        player.dimension = rec.dimension;
    },

    "report.gethere": (player, reportId) => {
        if (!player.admin) return player.utils.error(`Вы не админ!`);
        if (player.admin < 3) return player.utils.error(`Ваш уровень мал!`);
        var report = mp.v2_reports[reportId];
        if (!report) return player.utils.error(`Тикет с ID: ${reportId} не найден!`);

        var rec = mp.players.getBySqlId(report.playerId);
        if (!rec) return player.utils.error(`Игрок оффлайн!`);

        var pos = player.position;
        pos.x += 2;
        rec.position = pos;
        rec.dimension = player.dimension;
        rec.utils.info(`Вы были телепортированы Администрацией`);
    },
}
