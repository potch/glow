function initMap() {
    "use strict";
    var scale = $mc.width() / 3600,
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
            var ping = pings[j],
                latitude = ~~((parseFloat(ping[0]) + 180) * 10 * scale),
                longitude = ~~((-parseFloat(ping[1]) + 90) * 10 * scale),
                count = ping[2];
            for (var k = 0; k < count; k++) {
                currentData.push([0, latitude, longitude]);
            }
        }
        shuffle(currentData);

        glow.fetchMap(response.interval);
        setTimeout(glow.map.playNext, response.interval * 1000);

        var start = 0,
            total = currentData.length,
            duration = response.interval * 1000,
            reg = vast.GlobalClock.register(iteratePings, this);

        function iteratePings(t) {
            if (start == total) {
                reg.die();
            }
            // How far along the current interval we are [0...1].
            var tt = Math.min(1, (t - reg.start) / duration),
                i, ping, age, end;

            // Clear out the canvas.
            for (i = start, end = tt * total; i < end; i++) {
                ping = currentData[i];
                ctx.clearRect(ping[1] - 5, ping[2] - 5, 10, 10);
            }

            var currentAge = -1;
            for (i = start, end = tt * total; i < end; i++) {
                ping = currentData[i];
                if (ping[0] == 0) {
                    ping[0] = t;
                } else {
                    age = (t - ping[0]) / 1000;
                    if (age > 1) {
                        // This ping has played out, don't come back to it.
                        start++;
                    } else {
                        /* Setting fillStyle is expensive according to Chrome's
                         * profiler, so only set it if the fillStyle has
                         * changed. */
                        if (age != currentAge) {
                            ctx.fillStyle = "rgba(255, 255, 255, " + (1 - age) + ")";
                            currentAge = age;
                        }
                        ctx.beginPath();
                        ctx.arc(ping[1], ping[2], 5 * age, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }
        }
    };

    $(window).resize(vast.debounce(function() {
        $("#pings").css({
            width: $mc.width() + "px",
            height: $mc.height() + "px"
        });
        $("#pings")[0].width=$mc.width();
        $("#pings")[0].height=$mc.height();
    }, 500, this));
}
