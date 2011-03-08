$(function () {
    "use strict";
    var currentData = [],
        currentTime,
        total = 0,
        count = 0,
        nextData,
        nextTime,
        scale = $mc.width()/3600,
        pings = [],
        pool = [],
        ctx = $("#pings")[0].getContext("2d"),
        row, n, $p;

    ctx.fillStyle = "#fff";

    function addPing(x,y) {
        x = ~~((-x+90)*10*scale);
        y = ~~((y+180)*10*scale);
        if (pool.length) {
            n = pool.shift();
            // $p = pings[n][3];
            pings[n] = [0, x, y];
        } else {
            // if (Math.random() < pings.length / 500-.1) return;
            // $p = $("<div class='ping'></div>");
            // $p.appendTo("#pings");
            row = [0,x,y];
            pings.push(row);
        }
        // $p.addClass("born").css({
        //     "top": x+"px",
        //     "left": y+"px",
        //     "opacity": 1
        // });
    }
    function playback(data) {
        data = data.d[0];
        currentTime = data[0].join("");
        total = data[1];
        currentData = data[2];
        count = 0;
        var goal=0, n, row;
        function drawPings(i) {
            goal = i*total;
            while (count < goal) {
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
        }
        vast.animate.over(30000,drawPings,this,{after: function() {
            getData();
        }});
    }
    function getData() {
        $.getJSON("map.json?" + Math.random(), playback);
    }
    var i,p,l,el;
    function iteratePings(t) {
        if (pool.length == pings.length) return;
        ctx.clearRect(0,0,3600,1800);
        for (i=0; i<pings.length; i++) {
            p = pings[i];
            if (p[0] < 0) continue;
            if (p[0]==0) {
                p[0] = t;
            }
            l = (t-p[0])/1000;
            ctx.beginPath();
            ctx.fillStyle = "rgba(255,255,255," + (1-l) + ")";
            ctx.arc(p[2],p[1],10*l,0,Math.PI*2,true);
            ctx.fill();
            // ctx.fillRect(p[2],p[1],20,20);
            if (l > 1) {
                p[0] = -1;
                pool.push(i);
            }
        }
    }
    vast.GlobalClock.register(iteratePings, this);
    getData();
    window.gonow = getData;
});