function initMap() {
    "use strict";
    var scale = $mc.width() / 3600,
        pings = [],
        ctx = $("#pings")[0].getContext("2d");

    glow.map = {};

    ctx.fillStyle = "#fff";

    /* Shuffle the array in place. (Fisher-Yates) */
    var shuffle = function(xs) {
        var i = xs.length, j, tmp;
        if (i == 0) { return; }
        while (--i) {
            j = Math.floor(Math.random() * (i + 1));
            tmp = xs[j];
            xs[j] = xs[i];
            xs[i] = tmp;
        }
    };

    function addPing(latitude, longitude) {
        longitude = ~~((-parseFloat(longitude)+90)*10*scale);
        latitude = ~~((parseFloat(latitude)+180)*10*scale);
        for (var n = 0; n<pings.length; n++) {
            if (pings[n][0] < 0) {
                pings[n][0] = 0;
                pings[n][1] = longitude;
                pings[n][2] = latitude;
                return;
            }
        }
        pings.push([0, longitude, latitude]);
    }
    /* Each ping looks like [latitude, longitude, count]. It represents the
     * numbers of downloads in the timeframe from this location. */
    glow.map.playNext = function() {
        var response = glow.data.map.next,
            /* [date, total, [pings]] */
            data = response.data,
            pings = data[2],
            currentData = [];

        /* Add `count` [lat, long] pairs to currentData, then shuffle the whole
         * thing. */
        for (var j = 0, jj = pings.length; j < jj; j++) {
            // My kingdom for destructuring bind.
            var ping = pings[j], loc = [ping[0], ping[1]], count = ping[2];
            for (var k = 0; k < count; k++) {
                currentData.push(loc);
            }
        }
        shuffle(currentData);

        /* How many pings we've been through so far. */
        var index = 0, total = currentData.length;
        function drawPings(i) {
            for (var goal = i * total; index < goal; index++) {
                addPing.apply(null, currentData[index]);
            }
        }

        vast.animate.over(response.interval * 1000, drawPings, this,
                          {after: glow.map.playNext});
        glow.fetchMap(response.interval);
    };

    var i,p,l,el;
    function iteratePings(t) {
        for (i=0; i<pings.length; i++) {
            p = pings[i];
            if (p[0] < 0) continue;
            ctx.clearRect(p[2]-5,p[1]-5,10,10);
        }
        for (i=0; i<pings.length; i++) {
            p = pings[i];
            if (p[0] < 0) continue;
            if (p[0]==0) {
                p[0] = t;
            }
            l = (t-p[0])/1000;
            if (l > 1) {
                p[0] = -1;
            } else {
                ctx.beginPath();
                ctx.fillStyle = "rgba(255,255,255," + (1-l) + ")";
                ctx.arc(p[2],p[1],5*l,0,Math.PI*2,true);
                ctx.fill();
            }
        }
    }
    vast.GlobalClock.register(iteratePings, this);

    $(window).resize(vast.debounce(function() {
        $("#pings").css({
            width: $mc.width() + "px",
            height: $mc.height() + "px"
        });
        $("#pings")[0].width=$mc.width();
        $("#pings")[0].height=$mc.height();
    }, 500, this));

}
