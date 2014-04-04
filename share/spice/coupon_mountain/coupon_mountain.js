function ddg_spice_coupon_mountain (api_result) {

	if (api_result.count < 1) return;

	var header = api_result.keyword
			? api_result.keyword + " (CouponMountain)"
			: "Coupon Search (CouponMountain)",
		keyword = encodeURIComponent(api_result.keyword);

	Spice.add({
		data                     : api_result,
		id               : "coupon_mountain",
		sourceName              : 'CouponMountain',
		sourceUrl               : 'http://www.couponmountain.com/search.php?searchtext='+ keyword,
		header1                  : header,
		view: "Tiles",
		
		templates         : {
			items                : api_result.coupon,
			item: Spice.coupon_mountain.coupon_mountain,
			detail: Spice.coupon_mountain.coupon_mountain_detail,
			li_width             : 150
		},
		item_callback            : highlight_code
	});

	// highlight coupon code on detail area opening
	function highlight_code () {
		var coupon_code = $("#coupon_code");
		coupon_code.click(function() {
			coupon_code.focus().select();
		}).click();
	}

	// Manually trigger our callback function,
	// item_callback doesn't fire for single result
	if (api_result.count === 1) highlight_code();
}

Handlebars.registerHelper("check_expiry", function(string, options) {
	if (string && string != "3333-03-03"){
		return options.fn(this);
	} else {
		return;
	}
});

Handlebars.registerHelper("dateString", function(string) {
	var date = DDG.getDateFromString(string),
		months = [ 'Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.','Sep.','Oct.','Nov.','Dec.'];
	return "Expires " + months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
});

Handlebars.registerHelper("stripExpiry", function(string) {
	return string.replace(/(offer|good through|expires|ends|valid \w+) .+$/i, "");
});