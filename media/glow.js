(function(){
"use strict";

glow.data = {
    count: {},
    map: {},
    sector: {}
};

var ROOT = "data/json/";
var adjustOffset = 248;
var targetHeight = 1650;

// Load the next file of json data before timeout seconds have elapsed.
glow.fetchCount = function(timeout) {
    // We don't request data.sector until the page flips, but
    // but we want to be ready with the right url.
    var sector = glow.data.count.next.next.replace('count', 'arc');
    getData(glow.data.count.next.next, timeout, function(r) {
        glow.data.count.next = r;
        glow.data.sector.next = sector;
    });
};

// Load the next file of json data before timeout seconds have elapsed.
glow.fetchMap = function(timeout) {
    getData(glow.data.map.next.next, timeout, function(r) {
        glow.data.map.next = r;
    });
};

// $.getJSON with an error parameter.
var getJSON = function(url, success, error) {
    $.ajax({url: ROOT + url, dataType: 'json',
            success: success, error: error});
};

// Reload the page if we couldn't fetch any data after a few retries. This
// drops us back into the loading screen with error messaging.
var fetchFailure = function() {
    window.location.reload();
};

// We have timeout seconds to pull the next chunk of data.
// Start by waiting timeout/2 seconds before the first attempt.
// If that fails, retry every 5 seconds until we run out of time.
var getData = function(url, timeout, success) {
    var error = setTimeout(fetchFailure, timeout * 1000),
        remaining = timeout / 2;

    var success_ = function(data, textStatus, xhr) {
        dbg('Success', url);
        clearTimeout(error);
        success(data, textStatus, xhr);
    };

    var fetch = function(timeout) {
        setTimeout(function() {
            getJSON(url, success_, function() {
                dbg('Error, retrying', url);
                if (!glow.stop) {
                    remaining -= 5;
                    fetch(5);
                }
            });
        }, timeout * 1000);
    };
    fetch(remaining);
};

glow.toggleView = function() {
    if (glow.view == "map") {
        if (window.location.hash.slice(1,4) != "arc") {
            window.location.hash = "arc";
        }
        glow.view = "chart";
        $("#sunburst").show();
        if (!glow.sector) initSunburst();
    } else {
        window.location.hash = "";
        glow.view = "map";
        $("#sunburst").hide();
    }
    sizePageElements();
    $("body").toggleClass("view-sector", glow.view == "chart");
}

function sizePageElements() {
    var $geo = $("#geo");
    $("#sunburst, #geo").css("height", $("body").height() - adjustOffset);
    $("#chart")[0].width = $("#sunburst").width() - 300;
    $("#chart")[0].height = $("#sunburst").height();
    if (glow.sector) glow.sector.redraw();
    if ($geo.width() / $geo.height() > 2) {
        glow.map.scale = $geo.height() / targetHeight;
    } else {
        glow.map.scale = $geo.width() / 3600;
    }
    $("#mapdata, #pings").css({
        "top": $geo.height() - targetHeight * glow.map.scale,
        "left": ($geo.width() - 3600 * glow.map.scale) / 2
    });
    $("#mapdata").css({
        "-moz-transform": "scale(" + glow.map.scale + ")",
        "-webkit-transform": "scale(" + glow.map.scale + ")",
        "-ms-transform": "scale(" + glow.map.scale + ")",
        "-o-transform": "scale(" + glow.map.scale + ")"
    });
    if ($("#geo").height)
    $("#pings").css({
        width: $mc.width() + "px",
        height: $mc.height() + "px"
    });
    $("#pings")[0].width=$mc.width();
    $("#pings")[0].height=$mc.height();
}
$(window).resize(vast.debounce(sizePageElements, 500, this));

function initSunburst() {
  var loader = loading();
  $.getJSON(ROOT + glow.data.sector.next, function(r) {
      dbg('sector data loaded');
      processGeo(r.data, function(decodedData) {
          dbg('processing done');
          clearInterval(loader);
          glow.sector = $("#chart").arcChart({data: decodedData});
          $("#crumb").click(glow.sector.zoomOut);
          if (window.location.hash.slice(1, 4) == "arc") {
              glow.sector.zoomTo(window.location.hash.split("/").slice(1));
          }
      });
  });
}

function loading() {
    var c = $('#chart'),
        ctx = c[0].getContext('2d'),
        wedges = 8,
        cnt = 0;
    return setInterval(function(){
        ctx.save();
        ctx.fillStyle = 'rgba(227, 159, 28, .1)';
        ctx.translate(c[0].width / 2, c[0].height / 2);
        ctx.rotate(-Math.PI/16);
        ctx.clearRect(-70, -70, 140, 140);
        for (var i = 0; i < 8; i++) {
            ctx.rotate(Math.PI / 4);
            if (i == cnt) {
                ctx.save();
                ctx.shadowColor = 'rgba(227, 159, 28, .8)';
                ctx.shadowBlur = 5;
                ctx.fillStyle = 'rgb(227, 159, 28)';
                wedge();
                ctx.restore();
            } else {
                wedge();
            }
        }
        function wedge() {
            ctx.beginPath();
            ctx.arc(0, 0, 60, 0, Math.PI / 8, 0);
            ctx.arc(0, 0, 20, Math.PI / 8, 0, 1);
            ctx.lineTo(60, 0);
            ctx.stroke();
            ctx.fill();
        }
        cnt = ++cnt % 8;
        ctx.restore();
    }, 90);
}

function processGeo(_data, cb) {
    $.getScript("locale/" + glow.locale + "/countries.js", function() {
        dbg('loaded countries');
        $.getScript("media/regions.js", function() {
            dbg('loaded regions');
            cb.call(null, [null, _data[1], decodeGeo(_data[2], 1)]);
        });
    });
}

var _continents = {
    "EU": "Europe",
    "NA": "North America",
    "AS": "Asia",
    "SA": "South America",
    "AF": "Africa",
    "OC": "Oceania"
};
function decodeGeo(data, depth, parent) {
    if (!data) return;
    var i, name, row,
        ret = [], o;
    for (i=0; i < data.length; i++) {
        row = data[i];
        name = row[0] || "Other";
        switch (depth) {
            case 1:
                name = gettext(_continents[row[0]]) || name;
                break;
            case 2:
                name = _countries[row[0]] || name;
                break;
            case 3:
                if (_regions[parent]) {
                    name = _regions[parent][row[0]] || name
                }
                name = _countries[name] || name;
                break;
            case 4:
                name = _countries[name] || name;
        }
        ret.push([name, row[1], decodeGeo(row[2], depth+1, row[0]), row[0]]);
    }
    return ret;
}


$("#chart").bind("update", function(e, list, current) {
    var $ul = $("#rankedlist").empty(),
        $crumb = $("#crumb").empty(),
        i;

    if (current) {
        $crumb.append(current[2][0]);
    }

    $ul.undelegate().delegate("li a", "click", function(e) {
        e.preventDefault();
        var $li = $(this).closest("li");
        glow.sector.zoomIn($li.index());
    })
    for (i=0; i<list.length; i++) {
        $ul.append("<li><a href='#'>" + list[i][2][0] + " <span>" + numberfmt(list[i][2][1]) + "</span></a></li>");
    }

});

glow.toggleFullscreen = function() {
    var $body = $("body");
    $body.toggleClass("fullscreen");
    if ($body.hasClass("fullscreen")) {
        adjustOffset = 0;
        targetHeight = 1800;
    } else {
        adjustOffset = 248;
        targetHeight = 1650;
    }
    setTimeout(sizePageElements, 0);
}

glow.init = function() {
    if (location.hash.slice(1, 10) == "timeshift") {
        $(document.body).addClass("timeshift");
        initTimeshift();
        initCounter();
        initBars();
        initMap();
        sizePageElements();
        loadMap(function(){});
        return;
    }

    glow.data.sector.next = glow.time + "/arc.json";
    $.getJSON(ROOT + glow.time + "/count.json", function(r) {
        glow.data.count.next = r;
        glow.count.playNext();
        glow.bar.playNext();

        loadMap(function() {
            $.getJSON(ROOT + glow.time + "/map.json", function(r) {
                glow.data.map.next = r;
                glow.map.playNext();
            });
        });
    });

    initCounter();
    initBars();
    initMap();
    sizePageElements();

    $(".menu").click(glow.toggleView);
    $("#logo").click(glow.toggleFullscreen);

    if (location.hash.slice(1, 4) == "arc") {
        glow.toggleView();
    } else if (location.hash.slice(1, 5) == "full") {
        glow.toggleFullscreen();
    }
};

var lastKey = null;
var toggled = false;
$(window).bind('keydown', function(e) {
    if (location.hash.slice(1, 10) == "timeshift") {
        return;
    }
    var num = null;
    if (e.keyCode >= 48 && e.keyCode <= 57) {
        num = e.keyCode - 48;
    } else if (e.keyCode >= 96 && e.keyCode <= 105) {
        num = e.keyCode - 96;
    } else {
        return;
    }

    if (lastKey === 0 && num === 0) {
        window.location.reload();
    } else if (lastKey == 1 && num == 1) {
        glow.toggleFullscreen();
    } else if (lastKey == 9 && num == 9) {
        if (toggled) {
            $("#logo")[0].src = "media/logo-large.png";
        } else {
            $("#logo")[0].src = "media/theeye.png";
        }
        toggled = !toggled;
    }

    lastKey = num;
});

$(".show-about").click(function(e) {
    e.preventDefault();
    $("body").addClass("about");
    setTimeout(function() {
        $("body").one('click', function() {
            $("body").removeClass("about");
        });
    },100);
});

var pad = function(x){
    return ("" + x).length == 1 ? "0" + x : x;
};

var path = function(date) {
    var d = [date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate(),
             date.getUTCHours(), date.getUTCMinutes()];
    return ROOT + $.map(d, pad).join("/");
};

var initTimeshift = function() {
    $(window).bind("popstate", function(e) {
        dbg('popstate');
        dbg(e.originalEvent.state);
    });

    if (location.hash.split("/").length == 2) {
        var date = new Date(location.hash.split("/")[1]),
            d = $.map([date.getMonth() + 1, date.getDate(), date.getFullYear(),
                       date.getHours(), date.getMinutes()], pad);
        $("#timeshift input").val(d[0] + "-" + d[1] + "-" + d[2]
                                  + " " + d[3] + ":" + d[4]);
        travel(date);
    }

    function travel(date) {
        history.pushState({date: date}, null, "#timeshift/" + date);
        $.getJSON(path(date) + "/count.json", function(r) {
            var num = numberfmt(r.data[r.data.length - 1][1])
            $('#bigcounter')[0].firstChild.textContent = num;
        });
        $.getJSON(path(date) + "/map.json", function(r) {
            glow.map.showAll(glow.map.preparePings(r.data[2]));
        });
    }


    $("#timeshift form").submit(function(e) {
        e.preventDefault();
        var val = /(\d\d)-(\d\d)-(\d{4}) (\d\d?):(\d\d)/.exec(
                        $("#timeshift input").val()),
            date = new Date(val[3], val[1] - 1, val[2], val[4], val[5]);
        travel(date);
    });
};


})();
