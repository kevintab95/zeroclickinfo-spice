function ddg_spice_aur(response) {
    "use strict";

    if (response.type === 'error' || !response.results || response.results.length === 0) {
        return;
    }

    var query = DDG.get_query().replace(/(aur|archlinux package|arch package|arch linux package)/, "");

    Spice.add({
        data             : response.results,
        header1          : response.results[0].Name + " (AUR)",
        sourceUrl       : 'https://aur.archlinux.org/packages/?O=0&K=' + query,
        sourceName      : 'ArchLinux User Repository',
        id       : 'aur',
        template_frame   : "list",
        templates : {
            items: response.results,
            item: Spice.aur.aur // will use this also for a single item
        },
        
    });
}
