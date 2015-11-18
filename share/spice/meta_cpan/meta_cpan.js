(function(env) {
    env.ddg_spice_meta_cpan = function(api_result) {
        "use strict";

        if (!(api_result && api_result.author && api_result.version)) {
            return Spice.failed('meta_cpan');
        }
        var script = $('[src*="/js/spice/meta_cpan/"]')[0];
        var source = $(script).attr("src");
        var query = decodeURIComponent(source.match(/meta_cpan\/([^\/]+)/)[1]);

        var link = "search?q=" + encodeURIComponent(query);
        if (api_result.module && api_result.module.length > 0 && api_result.module[0].associated_pod) {
            link = "module/" + api_result.module[0].associated_pod;
        }

        Spice.add({
            id: "meta_cpan",
            name: "Software",
            data: {
                title: api_result.name,
                subtitle: api_result.abstract,
                record_data: api_result,
                record_keys: ['author','version','description']
            },
            meta: {
                sourceName: "MetaCPAN",
                sourceUrl: 'https://metacpan.org/' + link
            },
            templates: {
                group: 'list',
                options: {
                    content: 'record',
                    moreAt: true
                }
            }
        });
    };
}(this));
