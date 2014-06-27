(function(env) {
    "use strict";
    env.ddg_spice_people_in_space = function(api_result){

        if (!api_result || api_result.number === undefined) {
          return Spice.failed('people_in_space');
        }

        var today = new Date();
        var codes = {
            "canada":"ca",
            "china":"cn",
            "denmark":"dk",
            "france":"fr",
            "germany":"de",
            "italy":"it",
            "japan":"jp",
            "netherlands":"nl",
            "russia":"ru",
            "spain":"sp",
            "sweden":"se",
            "uk":"uk",
            "usa":"us"};

        var people = api_result["people"];
        for (var i in people) {
            //add 2-letter country code
            people[i]["country_code"] = codes[people[i]["country"]];

            //adjust case of country name
            if (people[i]["country"].match("uk|usa")) {    //make USA and UK all uppercase
                people[i]["country"] = people[i]["country"].toUpperCase();
            } else {                                //first letter uppercase
                people[i]["country"] = people[i]["country"][0].toUpperCase() + people[i]["country"].substring(1)
            }

            //compute number of days in space
            var elapsed = today - (new Date(people[i]["launchdate"]));
            people[i]["elapsed"] = Math.floor(elapsed / 86400000);  // 1000ms * 60s * 60m * 24h

            //rename title because it conflicts with template
            people[i]["position"] = people[i]["title"];
        }

        people = people.sort(function(a, b){
            var a_lastname = a["name"].split(" ").reverse()[0]
            var b_lastname = b["name"].split(" ").reverse()[0]
            return a_lastname < b_lastname ? -1 : (a_lastname > b_lastname ? 1 : 0);
        });

        Spice.add({
            id: "people_in_space",
            name: "Answer",
            data: api_result.people,
            meta: {
                itemType: "People",
                sourceName: "www.howmanypeopleareinspacerightnow.com",
                sourceUrl: "http://www.howmanypeopleareinspacerightnow.com/"
            },
            normalize: function(item) {
                return {
                    url: item.bio,
                    title: item.name,
                    icon: item.country_code
                };
            },
            templates: {
                group: "icon",
                detail: false,
                item_detail: false,
                options:{
                    footer: Spice.people_in_space.footer,
                    moreAt: true
                }
            }
        });
    }
}(this));
