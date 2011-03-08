test_data = [
    {
        label: "US",
        value: 20,
        children: [
            {
                label: "Pennsylvania",
                value: 10,
                children: [
                    {value: 3},
                    {value: 2},
                    {value: 1}
                ]
            },
            {
                label: "California",
                value: 8
            }
        ]
    },
    {
        label: "Canada",
        value: 10,
        children: [
            {
                label: "Ontario",
                value: 6
            },
            {
                label: "BC",
                value: 3
            }
        ]
    },
    {
        label: "France",
        value: 15,
        children: [
            {
                label: "Paris",
                value: 7,
                children : [
                    {value: 2},
                    {value: 1},
                    {value: 1},
                    {value: 1},
                    {value: 1}
                ]
            },
            {
                label: "Nice",
                value: 5
            }
        ]
    }
];


var PI = Math.PI;
var PI_2 = PI/2;
var RAD = PI / 180;
var GAP = 2 * RAD;
$.fn.arcChart = function(opts) {
    opts = $.extend({
        data: [],
        colors: ["#38d", "#e66", "#4f6"],
        maxDrawDepth: 3,
        draw: true
    }, opts);
    var $canvas = this,
        ctx = $canvas[0].getContext('2d'),
        currentContext = false,
        clickMap = false,
        cx, cy;
    
    this.redraw = function(sz, o) {
        o = $.extend({
            sa: 0,
            innerRad: 50,
            radStep: 30
        }, o);
        ctx.clearRect(0,0,$canvas.width(),$canvas.height());
        cx = $canvas.width()/2;
        cy = $canvas.height()/2;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(-PI_2);
        ctx.fillRect(0,0,1,1);
        ctx.rotate(o.sa);
        drawChildren(currentContext || opts.data, 1, sz||2*PI, o);
        ctx.restore();
    }
    
    function drawChildren(pts, depth, arcSize, o) {
        if (depth > opts.maxDrawDepth) return;
        var len = pts.length,
            segmentArc,
            total = o.total,
            other = 0;
        if (!o.total) {
            total=0;
            for (var i=0; i<len; i++) {
                total += pts[i].value || 0;
            }
        }
        var innerRad = depth * o.radStep + o.innerRad,
            outerRad = innerRad + o.radStep,
            p;
        ctx.save();
        for (var i=0; i<len; i++) {
            p = pts[i];
            if (depth == 1) ctx.fillStyle = opts.colors[i%3];
            if (!p._pct) p._pct = p.value / total;
            segmentArc = p._pct * arcSize;
            ctx.beginPath();
            ctx.arc(0,0,outerRad, 0, segmentArc, false);
            ctx.arc(0,0,innerRad, segmentArc, 0, true);
            ctx.lineTo(outerRad, 0);
            ctx.fill();
            ctx.stroke();
            if (p.children) drawChildren(p.children, depth+1, segmentArc, $.extend(o, {total: p.value}));
            ctx.rotate(segmentArc);
        }
        ctx.restore();
    }
    if (opts.draw) this.redraw();
    return this;    
};
