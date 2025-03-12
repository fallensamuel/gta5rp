exports = (menu) => {
	 mp.events.add("pNotify.sendNotify", (text, type) => {
		 if (type) {
		 menu.execute(`pNotify.show({
				options : {
				text : '${text}',
				type : '${type}',
				theme: 'gta',
				timeout : 5000,
				layout : "centerLeft",
				queue : "left"
			}
			})
		 `);
		 }
		 else {
			 menu.execute(`pNotify.show({
				options : {
				text : '${text}',
				type : "info",
				theme: 'gta',
				timeout : 5000,
				layout : "centerLeft",
				queue : "left"
			}
			})
		 `);
		 } 
      
    });
	
	mp.events.add("pNotify.sendCaptureNotify", (killed, killer, gun) => {
		
	menu.execute(`
		pNotify.show({
				options : {
            killed : '${killed}',
			killer:  '${killer}', 
			gun: '${gun}',
			theme: 'capts',
            timeout : 5000,
			progressBar: false,
            layout : "centerRight",
            queue : "left"
			}})
	`);
	
	});
	
}	