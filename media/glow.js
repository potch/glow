(function(){
"use strict";

glow.data = {
    count: {},
    map: {},
    sector: {}
}

var ROOT = "data/json/";

glow.init = function() {
    var fetchCount = function() {
        $.getJSON(ROOT + glow.data.count.next.next, function(r) {
            glow.data.count.next = r;
            glow.data.sector.next = r.next.replace('count', 'daisy');
            setTimeout(fetchCount, r.interval * 1000);
        });
    };

    var fetchMap = function(cb) {
        $.getJSON(ROOT + glow.data.map.next.next, function(r) {
            glow.data.map.next = r;
            setTimeout(fetchMap, r.interval * 1000);
        });
    };

    $.getJSON(ROOT + glow.time + "/count.json", function(r) {
        glow.data.count.next = r;
        glow.count.playNext();
        glow.bar.playNext();
        setTimeout(fetchCount, r.interval * 500);

        loadMap(function() {
            $.getJSON(ROOT + glow.time + "/map.json", function(r) {
                glow.data.map.next = r;
                glow.map.playNext();
                setTimeout(fetchMap, r.interval * 500);
            });
        });
    });

    initCounter();
    initBars();
    initMap();
};

})();
