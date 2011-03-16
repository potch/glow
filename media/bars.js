function initBars() {
    "use strict";
    glow.bar = {};
    var cnt = 0;
    setInterval(function(){ cnt = ++cnt % 6; dbg(cnt * 10); }, 10 * 1000);

    var started = false, $bars = $('.bars'), max = 0;

    var date = function(a, b, c, d, e) {
        return new Date(a, b, c, d, e);
    };

    glow.bar.playNext = function() {
        dbg('writing bars');
        var response = glow.data.count.next,
            data = response.data,
            container = document.getElementsByClassName('bars')[0],
            bars = document.getElementsByClassName('bar');

        var deltas = [];
        for (var i = 1; i < data.length; i++) {
            deltas.push(data[i][1] - data[i-1][1]);
        }

        max = Math.max.apply(null, deltas);

        function drawBar(i) {
                var time = timefmt(date.apply(null, data[i][0]));
                var delta = data[i][1] - data[i - 1][1];
                return (
                  "<div class='col'>" +
                  "<div class='bar' data-time='" + time +
                  "' data-val='" + delta +
                  "'></div></div>");
        }

        setTimeout(glow.bar.playNext, response.interval * 1000);

        // Write out all the initial bars.
        if (!started) {
            started = true;
            var item, time, delta, out = [];
            for (var i = data.length - 1; i > 0; i--) {
                out.push(drawBar(i));
            }
            container.innerHTML = out.join('');
            resize();
            return;
        }

        function resize() {
            var bar, i;
            dbg('resize');
            for (var i = 0, ii = bars.length; i < ii; i++) {
                bar = bars[i];
                bar.style.height = (bar.getAttribute('data-val') / max * 100) + 'px';
            }
        }

        // Each bar is 60px wide, keep 60 at all times in case we resize.
        var numChildren = container.childNodes.length;
        if (numChildren > 60 && $(window).width() / 60 < numChildren) {
            container.removeChild(container.lastChild);
        }
        // Make room for a new bar.
        $bars.addClass('slide');

        var addBar = function(){
            dbg('slide finished');
            $bars.unbind('transitionend webkitTransitionEnd');
            $bars.removeClass('slide');

            resize();
            // Add a new bar.
            $(container).prepend(drawBar(data.length - 1));
            var el = bars[0], val = el.getAttribute('data-val');

            // Let the browser do a draw so we can see the bar grow.
            setTimeout(function(){
                dbg('growing bar');
                el.style.height = (el.getAttribute('data-val') / max * 100) + 'px';
            });
        };
        if (vast.cssTransitions) {
            $bars.bind('transitionend webkitTransitionEnd', addBar());
        } else {
            addBar();
        }
  };
}
