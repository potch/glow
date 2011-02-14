$(function () {
    var currentData = [],
        currentTime,
        total = 0,
        count = 0,
        nextData,
        nextTime,
        pings = [];
    function addPing(x,y) {
        var $p = $("<div class='ping born'></div>");
        x = (-x+90)*10;
        y = (y+180)*10;
        pings.push([0,x,y,$p]);
        $p.appendTo("#pings").css({
            "top": x+"px",
            "left": y+"px"
        });
    }
    function playback(data) {
        data = data.d;
        currentTime = data[0].join("");
        total = data[1][0];
        currentData = data[1][1];
        count = 0;
        var goal=0, n, row;
        function drawPings(i) {
            var row;
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
        vast.animate.over(30000,drawPings,this,{after: getData});
    }
    function getData() {
        $.getJSON("map.json?" + Math.random(), playback);
    }
    var i,p,l,ell;
    function drawPings(t) {
        for (var i=0; i<pings.length; i++) {
            p = pings[i];
            if (p[0]==0) {
                p[0] = t;
            }
            l = (t-p[0])/1000;
            el = p[3][0];
            el.style.width = p[3][0].style.height = l*32+"px";
            el.style.left = p[2] - l*16+"px";
            el.style.top = p[1] - l*16+"px";
            el.style.opacity = Math.max(1-l,0);
            if (l > 1) {
                p[3].remove();
                pings.remove(i);
                i--;
            }
        }
    }
    vast.GlobalClock.register(drawPings, this);
    getData();
});