function initCounter() {
    "use strict";
    glow.count = {};

    var el = document.getElementById('bigcounter');

    glow.count.playNext = function() {
        var response = glow.data.count.next,
            data = response.data,
            target = data[data.length - 1][1],
            current = data[data.length - 2][1],
            delta = target - current;
        dbg('counter');
        dbg(current, target, delta);

        function drawCounter(i) {
            el.textContent = numberfmt(parseInt(current + i * delta));
        }

        var duration = response.interval * 1000;
        vast.animate.over(duration, drawCounter, this);
        setTimeout(glow.count.playNext, duration);
    };
}
