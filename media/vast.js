function Vast() {
    window.dbg = function () {
        if ("console" in window) {
            console.log(arguments);
        }
    };

    var exports = {};

    //This is the global precision of compounding calculations in vast.
    var SAFETY = exports.SAFETY = 10000,
        PI = exports.SAFETY = Math.PI,
        PI_2 = exports.PI_2 = PI/2,
        RAD = exports.RAD = PI / 180,
        GLOBAL_CLOCK_INTERVAL = exports.GLOBAL_CLOCK_INTERVAL = 30;

    var capabilities = exports.capabilities = {
        inlineSVG: (function() {
          var e = document.createElement('div');
          e.innerHTML = '<svg></svg>';
          return !!(window.SVGSVGElement && e.firstChild instanceof window.SVGSVGElement);
        })(),
        canvas: !!document.createElement('canvas').getContext,
        cssTransitions: (function() {
            var shim = document.createElement('div');
            shim.innerHTML = '<div style="-webkit-transition:color 1s linear;-moz-transition:color 1s linear;"></div>';
            var test = document.body.style.webkitTransition !== undefined ||
                       document.body.style.MozTransition !== undefined;
            return test;
        })(),
        history: !!(window.history && history.pushState),
        requestAnimationFrame: false //("mozRequestAnimationFrame" in window) ? "moz" : ("webkitRequestAnimationFrame" in window ? "webkit" : false)
    };

    // Array Remove - By John Resig (MIT Licensed)
    Array.prototype.remove = function(from, to) {
      var rest = this.slice((to || from) + 1 || this.length);
      this.length = from < 0 ? this.length + from : from;
      return this.push.apply(this, rest);
    };

    /* Simple JavaScript Inheritance
     * By John Resig http://ejohn.org/
     * MIT Licensed.
     */
    // Inspired by base2 and Prototype
    (function(){
      var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

      // The base Class implementation (does nothing)
      this.Class = function(){};

      // Create a new Class that inherits from this class
      Class.extend = function(prop) {
        var _super = this.prototype;

        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        initializing = true;
        var prototype = new this();
        initializing = false;

        // Copy the properties over onto the new prototype
        for (var name in prop) {
          // Check if we're overwriting an existing function
          prototype[name] = typeof prop[name] == "function" &&
            typeof _super[name] == "function" && fnTest.test(prop[name]) ?
            (function(name, fn){
              return function() {
                var tmp = this._super;

                // Add a new ._super() method that is the same method
                // but on the super-class
                this._super = _super[name];

                // The method only need to be bound temporarily, so we
                // remove it when we're done executing
                var ret = fn.apply(this, arguments);
                this._super = tmp;

                return ret;
              };
            })(name, prop[name]) :
            prop[name];
        }

        // The dummy class constructor
        function Class() {
          // All construction is actually done in the init method
          if ( !initializing && this.init )
            this.init.apply(this, arguments);
        }

        // Populate our constructed prototype object
        Class.prototype = prototype;

        // Enforce the constructor to be what we expect
        Class.constructor = Class;

        // And make this class extendable
        Class.extend = arguments.callee;

        return Class;
      };
    })();


    function ParticleEffect(o) {

    }

    function Particle() {

    }


    /** clock functions */
    var clock = exports.clock = {
        now: function() {
            return (new Date).getTime();
        },
        since: function(t) {
            return clock.now()-t;
        }
    };


    GlobalClock = exports.GlobalClock = (function() {
        var paused = {'_': false},
            groups = {},
            queue = [],
            stime,
            api;

        var requestNewFrame = (function() {
            switch (capabilities.requestAnimationFrame) {
                case "moz":
                    window.addEventListener("MozBeforePaint", tick, false);
                    return function() {
                        window.mozRequestAnimationFrame();
                    };
                    break;
                case "webkit":
                    return function() {
                        window.webkitRequestAnimationFrame(tick);
                    };
                    break;
                default:
                    return function() {
                        setTimeout(tick, GLOBAL_CLOCK_INTERVAL);
                    };
            }
        })();

        function tick() {
            var prog = clock.since(stime),
                len = queue.length,
                i, e;
            for (i = 0; i < len; i++) {
                e = queue[i];
                if (!paused[e.ns]) {
                    e.fn.call(e.ctx, prog - groups[e.ns], e.ret);
                }
            }
            for (i = len - 1; i >= 0; i--) {
                if (queue[i].died) {
                    queue.remove(i);
                }
            }
            if (!paused && queue.length) {
                requestNewFrame();
            }
        }

        function start() {
            stime = clock.now();
            paused = false;
            requestNewFrame();
        }
        function now() {
            return clock.since(stime);
        }
        function pause(group) {
            if (group) {
                paused[group] = clock.since(stime);
            } else {
                paused = clock.now();
            }
        }
        function resume(group) {
            if (group) {
                groups[group] += clock.since(paused[group]);
                paused[group] = false;
            } else {
                stime += clock.since(paused);
                interval = setInterval(tick, GLOBAL_CLOCK_INTERVAL);
            }
        }

        var ClockReceipt = Class.extend({
            init: function(o) {
                this.o = o;
                this.group = o.ns;
                this.start = clock.since(stime) - groups[o.ns];
            },
            pause: function() {
                if (this.group != "_") pause(this.group);
            },
            die: function() {
                this.o.died = true;
            }
        });

        function register(fn, ctx, ns) {
            var i = queue.length,
                ns = ns || '_',
                o = {fn: fn,
                     ctx: ctx,
                     ns: ns || '_',
                     i: clock.now()};
            queue[i] = o;
            if (!(ns in groups)) {
                groups[ns] = clock.since(stime);
            }
            o.ret = new ClockReceipt(o);
            if (i == 0) {
                requestNewFrame();
            }
            return o.ret;
        }

        return {
            'start': start,
            'now': now,
            'pause': pause,
            'resume': resume,
            'register': register,
            dbg: function() {
                console.log(queue, groups);
            }
        };
    })();
    GlobalClock.start();
    $(window).blur(function() {
        GLOBAL_CLOCK_INTERVAL = 250;
    });

    $(window).focus(function() {
        GLOBAL_CLOCK_INTERVAL = 30;
    });
    exports.frameInterval = function () {
        return GLOBAL_CLOCK_INTERVAL;
    };


    function CanvasGroup() {
        var layers = [];
        var named = {};

        function _(i) {
            return (typeof i == 'string') ? named[i] : layers[i];
        }

        _.add = function(m,n) {
            if (!m) return;
            var l;
            if (m.getContext)
                l = m;
            else {
                if (!n || !n.getContext) return;
                l = n;
            }
            l.vast_ref = layers.length;
            if (n && n.getContext) {
                l.vast_name = m;
                layers[m]=l;
            }
            layers[l.vast_ref]=l;
        };
        _.remove = function(l) {
            if (l.vast_name) delete named[l.vast_name];
            layers.remove(l.vast_ref);
        };
        _.using = function(i,fn,ctx) {
            var layer = (typeof i == 'string') ? named[i] : layers[i];
            fn.call(ctx,layer.getContext('2d'));
        };
        _.usingAll = function(fn,ctx) {
            for (var i=0; i<layers.length; i++) {
                fn.call(ctx,layers[i].getContext('2d'));
            }
        };
        _.dbg = function() {
            console.log(layers, named);
        };
        return _;
    }

    var animate = exports.animate = {
        over: function(duration, tick, ctx, opts) {
            var prog;
            var anim = GlobalClock.register(function(current, self) {
                prog = Math.min((current-self.start)/duration,1);
                tick.call(ctx, prog);
                if (prog >= 1) {
                    self.die();
                    if (opts && opts.after) {
                        opts.after.call(opts.afterCtx || ctx);
                    }
                }
            }, this);
            var api = {
                die: function() {
                    anim.die();
                    if (opts && opts.after) {
                        opts.after.call(opts.afterCtx || ctx);
                    }
                    return api;
                },
                pause: function() {

                }
            };
            return api;
        }
    };


    /** easing methods */
    var ease = exports.ease = {
        linear: function(n) {
            return safe(n);
        },
        easeout: function(n) {
            return safe(Math.sin(n*PI_2));
        },
        easein: function(n) {
            return safe(1-Math.cos(n*PI_2));
        },
        both: function(n) {
            return safe(.5-Math.cos(n*PI)/2);
        }
    };


    var debounce = exports.debounce = function(fn, ms, ctxt) {
        var ctx = ctxt || window;
        var to, del = ms, fun = fn;
        return function () {
            var args = arguments;
            clearTimeout(to);
            to = setTimeout(function() {
                fun.apply(ctx, args);
            }, del);
        };
    };

    /** 2d vector methods */
    function safe(n) {
        return Math.round(n * SAFETY) / SAFETY;
    }
    function vmin(a,b) {
        return [a[0]<b[0]?a[0]:b[0],a[1]<b[1]?a[1]:b[1]];
    }
    function vmax(a,b) {
        return [a[0]>b[0]?a[0]:b[0],a[1]>b[1]?a[1]:b[1]];
    }
    function vdot(a,b) {
        return a[0]*b[0] + a[1]*b[1];
    }
    function vcross(a, b) {
        return a[0]*b[1] - b[0]*a[1];
    }
    function vplus(a, b) {
        return [a[0]+b[0], a[1]+b[1]];
    }
    function vminus(a, b) {
        return [a[0]-b[0], a[1]-b[1]];
    }
    function vtimes(a, s) {
        return [a[0]*s, a[1]*s];
    }
    function vnorm(a) {
        return vunit([a[1], -a[0]]);
    }
    function vdiv(a, s) {
        return [a[0]/s, a[1]/s];
    }
    function vsize(a) {
        return Math.sqrt(a[0]*a[0]+a[1]*a[1]);
    }
    function vunit(a) {
        return vdiv(a, vsize(a));
    }
    function vreflect(a, b) {
        var normal = vnorm(b);
        return vsafe(vtimes(vtimes(normal,2), vdot(normal,a)));
    }
    function vsafe(a) {
        return [safe(a[0]), safe(a[1])];
    }
    function vang(a) {
        return Math.atan2(a[1],a[0]);
    }
    function vprojmag(a,b,c) {
        var B = vminus(b,a);
        var A = vminus(c,a);
        var lB = vsize(B);
        return safe(vdot(A,B)/(lB*lB));
    }
    function line_distance(a,b,c) {
        var B = vminus(b,a);
        var A = vminus(c,a);
        var lB = vsize(B);
        var k = vtimes(B, vdot(A,B)/(lB*lB));
        k = vplus(k,a);
        return safe(vsize(vminus(c,k)));
    }
    function in_rect(tl, br, pos) {
        return (tl[0] <= pos[0] && tl[1] <= pos[1]) && (br[0] > pos[0] && br[1] > pos[1]);
    }
    function rand(bounds) {
        var range = bounds[1] - bounds[0] + (1 / SAFETY);
        return Math.floor(Math.random() * range * SAFETY) / SAFETY + bounds[0];
    }

    return exports;
}

var vast = Vast();
