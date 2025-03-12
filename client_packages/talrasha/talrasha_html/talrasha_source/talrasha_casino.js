$(document).ready(() => {
	window.lastbets = new Vue({
	    el: '#last-bets',
	    data: {
	        isshow: false,
			data: false,
			
			red: [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36],
			black: [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35],
			green: [0,"00"]
	    },
	    methods: {
	        show: function(show, data) {
			   if (data) this.data = JSON.parse(data);
	           this.isshow = show;
	        },
			update: function(data) {
	           this.data = JSON.parse(data);
	        },
			
	    }
	});
});