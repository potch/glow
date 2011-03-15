(function(){
"use strict";

glow.data = {
    count: {},
    map: {},
    sector: {}
};

var ROOT = "data/json/";

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
        glow.view = "chart";
        $("#sunburst").show();
        if (!glow.sector) initSunburst();
    } else {
        glow.view = "map";
        $("#sunburst").hide();
    }
    sizePageElements();
    $("body").toggleClass("view-sector", glow.view == "chart");
}

function sizePageElements() {
    var $geo = $("#geo");
    $("#sunburst, #geo").css("height", $("body").height() - 248);
    $("#chart")[0].width = $("#sunburst").width() - 300;
    $("#chart")[0].height = $("#sunburst").height();
    if (glow.sector) glow.sector.redraw();
    if ($geo.width() / $geo.height() > 2) {
        glow.map.scale = $geo.height() / 1650;
    } else {
        glow.map.scale = $geo.width() / 3600;
    }
    $("#mapdata, #pings").css({
        "top": $geo.height() - 1650 * glow.map.scale,
        "left": ($geo.width() - 3600 * glow.map.scale) / 2
    });
    $("#mapdata").css({
        "-moz-transform": "scale(" + glow.map.scale + ")",
        "-webkit-transform": "scale(" + glow.map.scale + ")",
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
        switch (depth) {
            case 1:
                name = gettext(_continents[row[0]]) || row[0];
                break;
            case 2:
                name = _countries[row[0]] || row[0];
                break;
            case 3:
                name = _regions[parent][row[0]] || row[0];
                break;
            default:
                name = row[0];
        }
        ret.push([name, row[1], decodeGeo(row[2], depth+1, row[0])]);
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

glow.init = function() {
    $.getJSON(ROOT + glow.time + "/count.json", function(r) {
        glow.data.count.next = r;
        glow.data.sector.next = glow.time + "/arc.json";
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
};

})();
