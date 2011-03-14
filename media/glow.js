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
    getData(glow.data.count.next.next, timeout, function(r) {
        glow.data.count.next = r;
        // We don't request data.sector until the page flips, but
        // but we want to be ready with the right url.
        glow.data.sector.next = r.next.replace('count', 'daisy');
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
  $("#chart")[0].width = $("#sunburst").width() - 300;
  $("#chart")[0].height = $("#sunburst").height();
  if (glow.sector) glow.sector.redraw();
}
$(window).resize(vast.debounce(sizePageElements, 500, this));

function initSunburst() {
  $.getJSON(glow.data.sector.next, function(r) {
      processGeo(r.data, function(decodedData) {
          glow.sector = $("#chart").arcChart({data: decodedData});
          $("#crumb").click(glow.sector.zoomOut);
      });
  });
}

function processGeo(_data, cb) {
    $.getScript("locale/" + glow.locale + "/countries.js", function() {
        $.getScript("media/regions.js", function() {
            cb.call(null, [null, _data[1], decodeGeo(_data[2], 1)]);
        });
    });
}

function decodeGeo(data, depth, parent) {
    if (!data) return;
    var i, name, row,
        ret = [], o;
    for (i=0; i < data.length; i++) {
        row = data[i];
        switch (depth) {
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
        glow.data.sector.next = ROOT + glow.time + "/daisy.json";
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
