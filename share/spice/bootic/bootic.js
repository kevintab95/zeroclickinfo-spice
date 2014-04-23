(function(env) {
    "use strict";

    env.ddg_spice_bootic = function(api_result) {
	if($.isEmptyObject(api_result.products)) {
	    return;
	}

	var query = api_result.input_query ? 
	    '?initial=1&q=' + encodeURIComponent(api_result.input_query) : '';

	var result = [];
	for(var i = 0; i < api_result.sorted.length; i++) {
	    result.push(api_result.products[api_result.sorted[i]]);
	}

	Spice.add({
	    id: 'bootic',
	    name: 'Bootic',
	    data: result,
	    meta: {
		sourceName: 'Bootic',
		sourceUrl: 'http://www.bootic.com/?q=' + query,
		sourceIcon: true,
		itemType: api_result.input_query
	    },
	    normalize: function(o) {
		var picture = o.pictures[0];
		picture.replace(/_pictures\/\d+x\d+/, "_pictures/200x300");
		picture = "http://static.bootic.com/_pictures/" + picture;

		return {
		    rating: "Unrated",
		    parentId: o.id,
		    url: "http://bootic.com" + o.url,
		    img: picture,
		    title: o.name,
		    heading: o.name,
		    brand: o.shop_name,
		    price: "$" + o.price
		};
	    },
	    templates: {
		item: 'products_item'
	    }
	});
    };
}(this));

