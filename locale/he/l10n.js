var catalog = {"City":"\u05e2\u05d9\u05e8","Loading":"\u05d1\u05d8\u05e2\u05d9\u05e0\u05d4"," \"PM":" \"\u05d0\u05d7\u05e8 \u05d4\u05e6\u05d4\u05e8\u05d9\u05d9\u05dd","About":"\u05d0\u05d5\u05d3\u05d5\u05ea","Asia":"\u05d0\u05e1\u05d9\u05d4","Oceania":"\u05d0\u05d5\u05e7\u05d9\u05d0\u05e0\u05d9\u05d4"," \"AM":" \"\u05d1\u05d1\u05d5\u05e7\u05e8","Europe":"\u05d0\u05d9\u05e8\u05d5\u05e4\u05d4","South America":"\u05d3\u05e8\u05d5\u05dd \u05d0\u05de\u05e8\u05d9\u05e7\u05d4","World Map":"\u05de\u05e4\u05ea \u05d4\u05e2\u05d5\u05dc\u05dd","Firefox 4 Download Stats":"\u05e1\u05d8\u05d8\u05d9\u05e1\u05d8\u05d9\u05e7\u05ea \u05d4\u05d4\u05d5\u05e8\u05d3\u05d5\u05ea \u05e9\u05dc Firefox 4","show my current location":"\u05d4\u05e6\u05d2 \u05d0\u05ea \u05d4\u05de\u05d9\u05e7\u05d5\u05dd \u05d4\u05e0\u05d5\u05db\u05d7\u05d9 \u05e9\u05dc\u05d9","Region":"\u05d0\u05d6\u05d5\u05e8","zoom in":"\u05d4\u05ea\u05e7\u05e8\u05d1\u05d5\u05ea","Sector Chart":"\u05ea\u05e8\u05e9\u05d9\u05dd \u05de\u05d2\u05d6\u05e8","Country":"\u05de\u05d3\u05d9\u05e0\u05d4","Total Downloads":"\u05e1\u05d4\"\u05db \u05d4\u05d5\u05e8\u05d3\u05d5\u05ea","North America":"\u05e6\u05e4\u05d5\u05df \u05d0\u05de\u05e8\u05d9\u05e7\u05d4","zoom out":"\u05d4\u05ea\u05e8\u05d7\u05e7\u05d5\u05ea","Africa":"\u05d0\u05e4\u05e8\u05d9\u05e7\u05d4","Antarctica":"\u05d0\u05e0\u05d8\u05e8\u05d8\u05d9\u05e7\u05d4","Get Firefox":"\u05d4\u05d5\u05e8\u05d3\u05ea Firefox","Continent":"\u05d9\u05d1\u05e9\u05ea"},
    _timefmt = "HH:mm",
    _group = ",",
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
    if (fmt == "a") {
        rv.push(gettext(hour < 12 ? "AM" : "PM"));
    } else if (fmt == "h" || fmt == "H" || fmt == "m") {
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
    } else {
      rv.push(fmt);
    }
  }
  return rv.join('');
}
