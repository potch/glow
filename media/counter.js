function initCounter() {
    "use strict";
    glow.count = {};

    var el = document.getElementById('bigcounter').firstChild;

    glow.count.playNext = function() {
        var response = glow.data.count.next,
            data = response.data,
            target = data[data.length - 1][1],
            current = data[data.length - 2][1],
            delta = 60 * (target - current);
        dbg('counter');
        dbg(current, target, delta);

        function drawCounter(i) {
            el.textContent = numberfmt(parseInt(current + i * delta));
        }

        vast.animate.over(response.interval * 1000, drawCounter, this,
                          {after: glow.count.playNext});
        glow.fetchCount(response.interval);
    };
}
