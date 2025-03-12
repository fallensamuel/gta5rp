$(document).ready(() => {
	window.shop = new Vue({
	    el: '#shop',
	    data: {
	        products: [30, 31, 32, 33, 34, 35, 73, 36, 25, 75, 76, 77],
	        categories: [0, 0, 0, 0, 0, 0, 1, 3, 3, 2, 2, 2 ],


	        items: [],
	        currentCategory: 0,
	    },
	    methods: {
	        show: function(show) {
	            if (show) {
					//if (window.bindlocker()) return;
	            	$("#shop").fadeIn(250);
					setTimeout(function () {
						setCursor(true);
					}, 100);
	            }
	            else {
	            	$("#shop").fadeOut(250);
	                setCursor(false);
	            }
	        },
			active: () => {
			  return $('#shop').css('display') != 'none'
			},
	        setPrices: function(prices) {
	        	if (this.items.length == 0) {
	        		for (var i = 0; i < this.products.length; i++) {
	            		var item = clientStorage.inventoryItems[this.products[i] - 1]
	            		this.items.push({
	            			name: item.name,
	            			img: `talrasha_image/talrasha_item/${this.products[i]}.png`,
	            			price: prices[i] ? prices[i] : 1000,
	            			id: this.products[i],
	            			category: this.categories[i],
	            		})
	            	}
	        	}
	        	else {
	        		for (var i = 0; i < this.items.length; i++) {
	        			if (prices[i]) this.items[i].price = prices[i];
	        		}
	        	}
	        },
	        buy: function(item) {
	            mp.trigger("events.callRemote", "biz_6.buyItem", item);
	        },
	    }
	});
});