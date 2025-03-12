exports = (menu) => {
    var i = 0;
    mp.events.add("TalRashashowNotify", (action, info, text) => {
        i = i + 1;
        
        menu.execute(`$('<div class="alert" id="alertid_${i}"><div class="icon ${action}"><div class="image" style="background-image: url(talrasha_image/talrasha_notify/${action}.png)"></div></div><div class="alert_text"><b></b><div class="info">${info}</div> ${text}</div><div class="progress"><div class="progress-value"></div></div></div>').hide().appendTo('#notify .alert_block').fadeIn('slow')`);
        
        menu.execute(`
            setTimeout(() => {
                $("#alertid_${i}").fadeOut("slow");
                setTimeout(() => {
                    $("#alertid_${i}").remove()
                }, 4000) },
            7000);
        `);
    })
	
	mp.events.add("TalRashashowNotifyOffers", (action, info, text) => {
        i = i + 1;
        
        menu.execute(`$('<div class="alertoffers" id="alertid_${i}"><spangreen>Y</spangreen><spangreentext>Принять</spangreentext><div class="icon ${action}"><div class="image" style="background-image: url(talrasha_image/talrasha_notify/${action}.png)"></div></div><div class="alert_text"><b></b><div class="info">${info}</div> ${text}</div><div class="progress"><div class="progress-valueoffers"></div></div><spanred>N</spanred><spanredtext>Отказать</spanredtext></div>').hide().appendTo('#notify .alert_block').fadeIn('slow')`);
        
        menu.execute(`
            setTimeout(() => {
                $("#alertid_${i}").fadeOut("slow");
                setTimeout(() => {
                    $("#alertid_${i}").remove()
                }, 4000) },
            9000);
        `);
    })
	
	mp.events.add("TalRashaNotify.hide", () => {
		menu.execute(`
		$('.alertoffers').hide();
		`);
    });
}