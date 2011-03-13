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
    glow.sector = $("#chart").arcChart({data: r.data});
  });
}

$("#chart").bind("update", function(e, list) {
    var $el = $("#rankedlist").empty();

    for (var i=0; i<list.length; i++) {
        $el.append("<li>" + list[i][2][0] + " <span>" + list[i][2][1] + "</span></li>");
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
