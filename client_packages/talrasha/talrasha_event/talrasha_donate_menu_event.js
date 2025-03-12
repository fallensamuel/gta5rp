exports = (menu) => {
    mp.events.add("donateSystem.convertMoney", (donate) => {
        mp.events.callRemote("donateSystem.convertMoney", donate);
    });

    mp.events.add("donateSystem.paymentsAccount", (data) => {
        if(data === undefined) return;
        menu.execute(`window.events.call('playerMenu', { paymentsAccount: ${JSON.stringify(data)}, event: 'paymentsAccount' })`);
    });
}
