$(document).ready(() => {
	window.gun_shop = new Vue({
	    el: '#gun_shop',
	    data: {
	        products: [41, 42, 43, 44, 45, 47, 48, 49, 37, 38, 39, 40],
	        categories: [0, 0, 0, 1, 1, 2, 2, 3, 4, 4, 4, 4 ],


	        items: [],
	        currentCategory: 0,
	    },
	    methods: {
	        show: function(show) {
	            if (show) {
	            	$("#gun_shop").fadeIn(250);
					setTimeout(function () {
						setCursor(true);
					}, 100);
	            }
	            else {
	            	$("#gun_shop").fadeOut(250);
	                setCursor(false);
	            }
	        },
			active: () => {
			  return $('#gun_shop').css('display') != 'none'
			},
	        setPrices: function(prices) {
	        	console.log(prices)
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
	            mp.trigger("events.callRemote", "biz_8.buyItem", item);
	        },
	    }
	});
});