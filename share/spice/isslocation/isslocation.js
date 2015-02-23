(function(env) {
    "use strict";
    env.ddg_spice_isslocation = function(api_result) {
        
       if(!api_result || api_result !== "success") {
            return Spice.failed('isslocation');
        }
        var issLatitude = (Math.round(api_result.iss_position.latitude * 100) / 100).toFixed(2);
        var issLongitude = (Math.round(api_result.iss_position.longitude * 100) / 100).toFixed(2);
    
    DDG.require('maps', function() {
        Spice.add({
            id: "isslocation",
            name: "ISSLocation",
            model: 'Place',

            view: 'Map',
            data: [{
                display_name: "International Space Station",
                name: "International Space Station",
                lat: issLatitude,
                lon: issLongitude
            }],
            meta: {
                zoomlevel: 1;
                sourceName: "open-notify.org",
                sourceUrl: 'http://open-notify.org'
            },
            normalize: function(item) {
                
                return {
                    lat: issLatitude,
                    lon: issLongitude
                };
            }
        });
    };
}(this));
