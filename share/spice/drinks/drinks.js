function ddg_spice_drinks(api_result) {
    "use strict";

    if(!api_result || api_result.length === 0 || !api_result[0].name) {
        return;
    }

    api_result[0].isArray = $.isArray(api_result[0].ingredients);

    Spice.add({
        data             : api_result[0],
        // header1          : api_result[0].name + " (The Drink Project)",
		name: "Drinks",
        sourceUrl       : api_result[0].url,
        sourceName      : 'The Drink Project',
        id       : 'drinks',
        templates: {
			detail: Spice.drinks.detail
        }
        
    });
}
