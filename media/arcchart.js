
var PI = Math.PI;
var PI_2 = PI/2;
var RAD = PI / 180;
var GAP = 2 * RAD;
$.fn.arcChart = function(opts) {
    opts = $.extend({
        data: [],
        maxDrawDepth: 4,
        draw: true
    }, opts);
    var $canvas = this,
        ctx = $canvas[0].getContext('2d'),
        contextStack = [],
        currentContext = false,
        oldParent = false,
        clickMap = [],
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
        drawChildren(currentContext || opts.data[2], 1, sz||2*PI, o);
        ctx.restore();
    }
    
    this.dbg = function() {
        console.log(clickMap);
    };
    
    (function() {
        var currentlabel, pos,
            x, y, a, r,
            p, label, tgt;
        $canvas.mousemove(function(e) {
            pos = $canvas.offset();
            x = -(e.clientX - pos.left - cx);
            y = e.clientY - pos.top - cy;
            a = Math.atan2(x,y)+Math.PI;
            r = Math.sqrt(x*x + y*y);
            label = "";
            if (a < 0) a += Math.PI * 2;
            for (var i=0; i<clickMap.length; i++) {
                p = clickMap[i];
                if (a > p[0] && a < p[1]) {
                    label = p[2][0];
                }
            }
            if (currentlabel != label) {
                $tiptext.text(label);
            }
            if (r < 80 || r > 200) {
                $tip.hide();
            } else {
                $tip.show();
            }
            $tip.css({
                left: e.clientX + "px",
                top: (e.clientY - 20) + "px"
            });
        });
        $canvas.mouseout(function(e) {
            $tip.hide();
        });
        $canvas.click(function(e) {
            pos = $canvas.offset();
            x = -(e.clientX - pos.left - cx);
            y = e.clientY - pos.top - cy;
            a = Math.atan2(x,y)+Math.PI;
            r = Math.sqrt(x*x + y*y);
            tgt = false;
            if (a < 0) a += Math.PI * 2;
            if (r < 80) {
                currentContext = contextStack.pop();
                $canvas.redraw();
            } else {
                for (var i=0; i<clickMap.length; i++) {
                    p = clickMap[i];
                    if (a > p[0] && a < p[1]) {
                        tgt = p[2][2];
                    }
                }
                if (tgt) {
                    contextStack.push(currentContext);
                    currentContext = tgt;
                    $canvas.redraw();
                }
            }
        });
    })();
    
    function drawChildren(pts, depth, arcSize, o) {
        if (depth > opts.maxDrawDepth) return;
        var len = pts.length,
            segmentArc,
            total = o.total,
            other = 0,
            arcOffset = o.sa;
        if (!o.total) {
            total=0;
            for (var i=0; i<len; i++) {
                total += pts[i][1] || 0;
            }
        }
        if (depth == 1) {
            clickMap = [];
        }
        var innerRad = depth * o.radStep + o.innerRad,
            outerRad = innerRad + o.radStep,
            p, hue;
        ctx.save();
        for (var i=0; i<len; i++) {
            p = pts[i];            
            if (depth == 1) {
                hue = ~~(i/len * 360);
            } else {
                hue = o.hue;
            }
            ctx.fillStyle = "hsl(" + hue + ", 100%, " + (40 + depth*10) + "%)";
            if (!p._pct) p._pct = p[1] / total;
            segmentArc = p._pct * arcSize;
            if (p._pct >= .01 || depth == 1) {
                ctx.beginPath();
                ctx.arc(0,0,outerRad, 0, segmentArc, false);
                ctx.arc(0,0,innerRad, segmentArc, 0, true);
                ctx.lineTo(outerRad, 0);
                ctx.fill();
                if (depth == 1) {
                    clickMap.push([arcOffset, arcOffset + segmentArc, p]);
                }
                if (p._pct > .05) {
                    if (p[2]) drawChildren(p[2], depth+1, segmentArc, $.extend(o, {total: p[1], hue: hue}));
                }
            }
            // ctx.stroke();
            ctx.rotate(segmentArc);
            if (depth == 1) arcOffset += segmentArc;
        }
        ctx.restore();
    }

    var $tip = $("<div id='arcchart-tip'><span></span></div>");
    $("body").append($tip);
    $tip.css({
        "position": "absolute",
        "display": "none",
        "width": "200px",
        "height": "20px",
        "left": "0",
        "top": "0",
        "text-shadow": "0 0 2px #000",
        "pointer-events": "none"
    });
    $tiptext = $tip.find("span");
    $tiptext.css({
        "background": "rgba(0,0,0,.7)",
        "padding": "4px 8px 2px",
        "border-radius": "2px"
    });

    if (opts.draw) this.redraw();
    return this;
};
