function initCounter() {
    "use strict";
    glow.counter = {};

    var el = document.getElementById('bigcounter');

    glow.counter.playNext = function() {
        var response = glow.data.counter.next,
            data = response.data,
            target = data[data.length - 1][1],
            current = data[data.length - 2][1],
            delta = target - current;

        function drawCounter(i) {
            el.textContent = numberfmt(parseInt(current + i * delta));
        }

        vast.animate.over(response.interval * 1000, drawCounter, this,
                          {after: glow.counter.playNext});

        setTimeout(function() {
            $.getJSON("data/json/" + response.next, function(r) {
                glow.data.counter.next = r;
            });
        }, response.interval * 500);
    };
}
