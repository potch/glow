(function(){
"use strict";

glow.data = {
    count: {},
    map: {},
    sector: {}
}

var ROOT = "data/json/";

glow.init = function() {
    glow.fetchCount = function() {
        $.getJSON(ROOT + glow.data.count.next.next, function(r) {
            glow.data.count.next = r;
            glow.data.sector.next = r.next.replace('count', 'daisy');
        });
    };

    glow.fetchMap = function() {
        $.getJSON(ROOT + glow.data.map.next.next, function(r) {
            glow.data.map.next = r;
        });
    };

    $.getJSON(ROOT + glow.time + "/count.json", function(r) {
        glow.data.count.next = r;
        glow.count.playNext();
        glow.bar.playNext();

        loadMap(function() {
            $.getJSON(ROOT + glow.time + "/map.json", function(r) {
                glow.data.map.next = r;
                glow.map.playNext();
            });
        });
    });

    initCounter();
    initBars();
    initMap();
};

})();
