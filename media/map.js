function initMap() {
    "use strict";
    var currentData = [],
        total = 0,
        count = 0,
        scale = $mc.width()/(3600*1),
        pings = [],
        pool = [],
        ctx = $("#pings")[0].getContext("2d"),
        row, n;

    glow.map = {};

    ctx.fillStyle = "#fff";

    function addPing(x,y) {
        x = ~~((-x+90)*10*scale);
        y = ~~((y+180)*10*scale);
        if (pool.length) {
            n = pool.shift();
            pings[n] = [0, x, y];
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
            while (count < goal && pings.length < 500) {
                if (currentData.length < 1) return;
                count++;
                n = ~~(Math.random()*currentData.length);
                row = currentData[n];
                row[2]--;
                if (row[2] < 1) {
                    currentData.remove(n);
                }
                addPing(row[1],row[0]);
            }
            $("#out").text(pings.length);
        }
        vast.animate.over(response.interval*1000,drawPings,this,{after: glow.map.playNext});
        console.log("waiting " + response.interval * 500 + " to fetch " + response.next);
        setTimeout(function() {
            $.getJSON("data/" + response.next, function(r) {
                console.log(response.next + " fetched successfully");
                glow.data.map.next = r;
            });
        }, response.interval * 500);
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
            ctx.beginPath();
            ctx.fillStyle = "rgba(255,255,255," + (1-l) + ")";
            ctx.arc(p[2],p[1],5*l,0,Math.PI*2,true);
            ctx.fill();
            if (l > 1) {
                p[0] = -1;
                pool.push(i);
            }
        }
    }
    vast.GlobalClock.register(iteratePings, this);
}