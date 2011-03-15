var hueTable = [193, 192, 192, 193, 193, 192, 192, 197, 201, 211, 216, 219, 222, 54, 58, 58, 57, 55, 54, 51, 47, 42, 39, 36, 47, 45, 43, 41, 39, 47, 45, 47, 32, 40, 38, 36, 34, 35, 30, 33, 35, 33, 31, 30, 30, 29, 29, 29, 29, 29, 29, 28, 29, 28, 28, 28, 28, 27, 27, 27, 26, 26, 25, 24, 24, 23, 22, 22, 21, 21, 21, 21, 20, 23, 24, 25, 26, 29, 31, 223, 222, 219, 209, 202, 198, 191, 193, 193, 192, 192];

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
        scaleFactor = 1,
        currentContext = false,
        oldParent = false,
        clickMap = [],
        cx, cy,
        animation = false;

    this.redraw = function(o) {
        o = $.extend({
            sz: 2 * PI,
            sa: 0,
            innerRad: 50,
            radStep: 30,
            hue: currentContext[3]
        }, o);
        ctx.clearRect(0,0,$canvas.width(),$canvas.height());
        $canvas[0].width = $canvas.width();
        $canvas[0].height = $canvas.height();
        cx = $canvas.width()/2;
        cy = $canvas.height()/2;
        scaleFactor = Math.min(cx,cy) / 240;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(scaleFactor, scaleFactor);
        ctx.rotate(-PI_2);
        ctx.rotate(o.sa);
        var data = currentContext.length ? currentContext[2][2] : opts.data[2];
        drawChildren(data, 1, o.sz, o);
        ctx.restore();
        if (!animation) $canvas.trigger("update", [clickMap, currentContext, contextStack]);
    }

    this.dbg = function() {
        console.log(clickMap);
    };

    (function() {
        var currentlabel, pos,
            x, y, a, r,
            p, label, tgt;
        $canvas.mousemove(function(e) {
            if (animation) return;
            pos = $canvas.offset();
            x = -(e.clientX - pos.left - cx);
            y = e.clientY - pos.top - cy;
            a = Math.atan2(x,y)+Math.PI;
            r = Math.sqrt(x*x + y*y);
            tgt = false, label = false;
            if (a < 0) a += Math.PI * 2;
            for (var i=0; i<clickMap.length; i++) {
                p = clickMap[i];
                if (a > p[0] && a < p[1]) {
                    tgt = p[2];
                }
            }
            if (r < 80 * scaleFactor || r > 200 * scaleFactor) {
                $tip.hide();
            } else {
                if (tgt) {
                    label = tgt[0];
                    if (label && currentlabel != label) {
                        $tiptext.text(label + ": " + numberfmt(tgt[1]));
                        currentLabel = label;
                    }
                    $tip.show();
                } else {
                    $tip.hide();
                }
            }
            $tip.css({
                left: e.clientX + "px",
                top: (e.clientY - 20) + "px"
            });
        });
        $canvas.mouseout(function(e) {
            if (animation) return;
            $tip.hide();
        });
        $canvas.click(function(e) {
            if (animation) return;
            pos = $canvas.offset();
            x = -(e.clientX - pos.left - cx);
            y = e.clientY - pos.top - cy;
            a = Math.atan2(x,y)+Math.PI;
            r = Math.sqrt(x*x + y*y);
            tgt = false;
            if (a < 0) a += Math.PI * 2;
            if (r < 80 * scaleFactor) {
                $canvas.zoomOut();
            } else if (r < 200 * scaleFactor && r > 80 * scaleFactor) {
                for (var i=0; i<clickMap.length; i++) {
                    p = clickMap[i];
                    if (a > p[0] && a < p[1]) {
                        $canvas.zoomIn(i);
                        break;
                    }
                }
            }
        });
    })();

    this.zoomOut = function() {
        if (contextStack.length < 1) return;
        span = (currentContext[1]-currentContext[0]);
        animation = vast.animate.over(
            500,
            function(i) {
                var j = vast.ease.easeout(i);
                $canvas.redraw({
                    sa: currentContext[0] * j,
                    sz: (2 * Math.PI - span) * (1-j) + span,
                    innerRad: 50 + 30 * j
                });
            },
            this,
            {after: function() {
                animation = false;
                currentContext = contextStack.pop() || false;
                $canvas.redraw();
            }}
        );
    };

    this.zoomIn = function(which) {
        var tgt = clickMap[which];
        if (!tgt || !tgt[2][2]) return;
        contextStack.push(currentContext);
        currentContext = tgt;
        span = (tgt[1]-tgt[0]);
        animation = vast.animate.over(
            500,
            function(i) {
                var j = vast.ease.easeout(i);
                $canvas.redraw({
                    sa: tgt[0] * (1-j),
                    sz: (2 * Math.PI - span) * j + span,
                    innerRad: 80 - 30 * j
                });
            },
            this,
            {after: function() {
                animation = false;
                $canvas.redraw();
            }}
        );
    };

    function drawChildren(pts, depth, arcSize, o) {
        if (depth > opts.maxDrawDepth) return;
        var len = pts.length,
            segmentArc,
            total = o.total,
            other = 0,
            baseHue = o.hue || 0,
            arcOffset = o.sa,
            cutoff = animation ? .1 : .01;
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
            if (!p._pct) p._pct = p[1] / total;
            segmentArc = p._pct * arcSize;
            if ((p._pct >= cutoff || depth == 1) && segmentArc > .005) {
                if (depth == 1 && !baseHue) {
                    hue = hueTable[~~((arcOffset+segmentArc/2)/arcSize * 90)];
                } else {
                    hue = o.hue;
                }
                ctx.fillStyle = "hsl(" + hue + ", " + (100 - depth*20) + "%, 50%)";
                ctx.beginPath();
                ctx.arc(0,0,outerRad-1, 0, segmentArc - .005, false);
                ctx.arc(0,0,innerRad, segmentArc - .005, 0, true);
                ctx.lineTo(outerRad, 0);
                ctx.fill();
                if (depth == 1) {
                    clickMap.push([arcOffset, arcOffset + segmentArc, p, hue]);
                }
                if (p._pct > .05) {
                    if (p[2]) drawChildren(p[2], depth+1, segmentArc, $.extend(o, {total: p[1], hue: hue}));
                }
            }
            // ctx.stroke();
            ctx.rotate(segmentArc);
            arcOffset += segmentArc;
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
    if ($("html").hasClass("rtl")) {
        $tip.css("text-align", "left");
    }

    if (opts.draw) this.redraw();
    return this;
};
