$(function () {
    "use strict";
    function renderBars(d) {
        var i, b, m,
            max = 0,
            len = d.length,
            $bars = $(".bars"),
            $c;
        for (i=len-1; i>0; i--) {
            b = d[i];
            m = "00" + b[0][4];
            $c = $("<div class='col'><span>" + b[0][3] + ":" + m.substr(-2) + "</span><div data-val=" + b[1] + " class='bar'></div></div>");
            $bars.append($c);
            max = Math.max(b[1], max);
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