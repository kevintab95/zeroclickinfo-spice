(function (env) {
    "use strict";
    
    var Games;

    env.ddg_spice_sports_mlb_games = function(apiResult) {

        if (!apiResult || !apiResult.data || !apiResult.data.games || !apiResult.data.games.length) {
            return Spice.failed('mlb_games');
        }
        
        DDG.require('sports', function(){
            Games = env.ddg_spice_sports_games;
                
            Games.init(MLBInit);
        });
        
        var MLBInit = function () {
                Spice.add({
                    id: 'mlb_games',
                    name: 'MLB Games',

                    data: Games.transformGameData(apiResult.data),

                    from: apiResult.from,
                    signal: apiResult.signal,

                    meta: $.extend(Games.META, {
                        sourceUrl:  apiResult.url || "http://www.bleacherreport.com/mlb",
                        selectedItem: apiResult.data.most_relevant_game_id,
                    }),

                    templates: $.extend(Games.TEMPLATES, {
                        options: {
                            content: Spice.sports_mlb_games.mlb_score
                        }
                    }),
                    
                    normalize: MLBGameData
                });
            },
        
            MLBGameData = function(attrs) {
                attrs.canExpand = false;
                attrs.relativeDay = Games.getRelativeDay(attrs.start_time);
                
                // Game Finished/In-Progress
                if (attrs.has_started) {
                    attrs.canExpand = true;
                    
                    var inning = attrs.score.away.innings.length-1 || -1,
                        placeholderStr = '&nbsp;';
                        
                    if (attrs.has_ended) {
                        placeholderStr = '<span class="tx-clr--grey-light">&bull;</span>';
                        attrs.textTotal = l("Final");
                        attrs.textGameOver = l("Game ended");
                    } else {
                        attrs.textTotal = l("Score");
                        attrs.textLastUpdate = l("Last updated %s", Handlebars.helpers.momentTime(attrs.updated));
                    }
                    
                    // pitch_count contains the current game status
                    if (attrs.score.pitch_count) {
                        inning = attrs.score.pitch_count.inning-1;
                        
                        // always display placeholders up to 9 innings
                        for(var i=inning+1; i < 9; i++) {
                            attrs.score.home.innings[i] = 
                            attrs.score.away.innings[i] = { 
                                runs: "", 
                                number: i+1, 
                                sequence: i+1, 
                                type: "inning" 
                            };
                        }
                        
                        // mark current inning
                        if (attrs.score.pitch_count.inning_half === "B") {
                            attrs.score.home.innings[inning].current = true;
                            attrs.score.pitch_count.half_over = true;
                        } else {
                            attrs.score.away.innings[inning].current = true;
                        }
                    }
                    
                    if (inning > -1 && attrs.score.home.innings[inning].runs === 'X') {
                        // replace un-played inning 'X' with something more stylish
                        attrs.score.home.innings[inning].runs = placeholderStr;
                    }
                }
                
                return attrs;
            }
    }

}(this));
