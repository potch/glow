var catalog = {"City":"Mesto","Loading":"Nalaganje"," \"PM":" \"PM","About":"Vizitka","Asia":"Azija","Oceania":"Oceanija"," \"AM":" \"AM","Europe":"Evropa","South America":"Ju\u017ena Amerika","World Map":"Zemljevid sveta","Firefox 4 Download Stats":"Statistika prenosov Firefoxa 4","show my current location":"poka\u017ei mojo lokacijo","Region":"Regija","zoom in":"pomanj\u0161aj","Sector Chart":"Odsekovni graf","Country":"Dr\u017eava","Total Downloads":"Skupaj prenosov","North America":"Severna Amerika","zoom out":"pove\u010daj","Africa":"Afrika","Antarctica":"Antarktika","Get Firefox":"Prenesi Firefox","Continent":"Celina"},
    _timefmt = "H:mm",
    _group = ".",
    _numfmt = "#,##0.###";
var gettext = function(s) {
  return s in catalog ? catalog[s] : s;
};
var numberfmt = function(n) {
  var s = "" + n, len = s.length, rv = new Array(len + ~~((len - 1) / 3));
  for (var i = rv.length - 1, j = s.length - 1, k = 0; j >= 0; j--, k++) {
    if (k > 0 && k % 3 == 0) {
      rv[i--] = _group;
    }
    rv[i--] = s[j];
  }
  return rv.join('');
};
var timefmt = function(d) {
  // a = AM/PM
  // h = 12 hour clock
  // H = 24 hour clock
  var rv = [], hour = d.getHours(), minute = d.getMinutes(), num, fmt;
  for (var i = 0, ii = _timefmt.length; i < ii; i++) {
    fmt = _timefmt[i];
    if (fmt == "h" || fmt == "H" || fmt == "m") {
      if (fmt == "m") {
        num = minute;
      } else {
        num = fmt == "h" ? hour % 12 : hour;
      }
      if (_timefmt[i + 1] == fmt) {
        i++;
        rv.push(num < 10 ? "0" + num : num);
      } else {
        rv.push(num);
      }
    } else if (fmt != "a") {
      rv.push(fmt);
    }
  }
  return rv.join('');
}
