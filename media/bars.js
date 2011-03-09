$(function () {
    "use strict";
    function renderBars(d) {
        var i, b, m, v,
            max = 0,
            len = d.length,
            $bars = $(".bars"),
            $c;
        for (i=len-1; i>1; i--) {
            b = d[i];
            m = "00" + b[0][4];
            v = (b[1] - d[i-1][1]);
            $c = $("<div class='col'><div data-time='" + (b[0][3] + ":" + m.substr(-2)) + "' data-val=" + v + " class='bar'></div></div>");
            $bars.append($c);
            max = Math.max(v, max);
        }
        var $bar = $(".bar");
        // setTimeout(function() {
            for (i=0; i<len; i++) {
                $c = $bar.eq(i);
                $c.css({
                    "height": $c.attr("data-val")/max*100 + "px"
                });
            }
        // }, 0);
    }
    setTimeout(function() {
        $.getJSON("counts.json?" + vast.clock.now(), renderBars);
    },500);
});