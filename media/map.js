function initMap() {
    "use strict";
    var currentData = [],
        total = 0,
        count = 0,
        scale = $mc.width()/(3600*1),
        pings = [],
        pool = [],
        ctx = $("#pings")[0].getContext("2d"),
        row, n,
        newThisIteration,
        maxThisIteration;

    glow.map = {};

    ctx.fillStyle = "#fff";

    function addPing(x,y) {
        x = ~~((-parseFloat(x)+90)*10*scale);
        y = ~~((parseFloat(y)+180)*10*scale);
        if (pool.length) {
            n = pool.shift();
            pings[n][0] = 0;
            pings[n][1] = x;
            pings[n][2] = y;
        } else {
            row = [0, x, y];
            pings.push(row);
        }
    }

    glow.map.playNext = function() {
        var response = glow.data.map.next,
            data = response.data;
        total = data[1];
        currentData = data[2].slice();
        count = 0;
        var goal=0, n, row;
        function drawPings(i) {
            goal = i*total;
            newThisIteration = 0;
            maxThisIteration = 400/(1000/vast.frameInterval());
            while (count < goal && newThisIteration < maxThisIteration) {
                if (currentData.length < 1) return;
                count++;
                newThisIteration++;
                n = ~~(Math.random()*currentData.length);
                row = currentData[n];
                row[2]--;
                if (row[2] < 1) {
                    currentData.remove(n);
                }
                addPing(row[1],row[0]);
            }
        }
        vast.animate.over(response.interval * 1000, drawPings, this,
                          {after: glow.map.playNext});
        glow.fetchMap(response.interval);
    };

    $(window).resize(vast.debounce(function() {
        $("#pings").css({
            width: $mc.width() + "px",
            height: $mc.height() + "px"
        });
        $("#pings")[0].width=$mc.width();
        $("#pings")[0].height=$mc.height();
    }, 500, this));

    var i,p,l,el;
    function iteratePings(t) {
        if (pool.length == pings.length) return;
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
                pool.push(i);
            } else {
                ctx.beginPath();
                ctx.fillStyle = "rgba(255,255,255," + (1-l) + ")";
                ctx.arc(p[2],p[1],5*l,0,Math.PI*2,true);
                ctx.fill();
            }
        }
    }
    vast.GlobalClock.register(iteratePings, this);
}
