var catalog = {"City":"\u03a0\u03cc\u03bb\u03b7","Loading":"\u0393\u03af\u03bd\u03b5\u03c4\u03b1\u03b9 \u03c6\u03cc\u03c1\u03c4\u03c9\u03c3\u03b7"," \"PM":" \"\u039c\u039c","About":"\u03a0\u03b5\u03c1\u03af","Asia":"\u0391\u03c3\u03af\u03b1","Oceania":"\u03a9\u03ba\u03b5\u03b1\u03bd\u03af\u03b1"," \"AM":" \"\u03a0\u039c","Europe":"\u0395\u03c5\u03c1\u03ce\u03c0\u03b7","South America":"\u039d\u03cc\u03c4\u03b9\u03b1 \u0391\u03bc\u03b5\u03c1\u03b9\u03ba\u03ae","World Map":"\u03a0\u03b1\u03b3\u03ba\u03cc\u03c3\u03bc\u03b9\u03bf\u03c2 \u03c7\u03ac\u03c1\u03c4\u03b7\u03c2","Firefox 4 Download Stats":"\u03a3\u03c4\u03b1\u03c4\u03b9\u03c3\u03c4\u03b9\u03ba\u03ac \u03bb\u03ae\u03c8\u03b5\u03c9\u03bd Firefox 4","show my current location":"\u03a0\u03c1\u03bf\u03b2\u03bf\u03bb\u03ae \u03c4\u03c1\u03ad\u03c7\u03bf\u03c5\u03c3\u03b1\u03c2 \u03c4\u03bf\u03c0\u03bf\u03b8\u03b5\u03c3\u03af\u03b1\u03c2","Region":"\u03a0\u03b5\u03c1\u03b9\u03bf\u03c7\u03ae","zoom in":"\u039c\u03b5\u03b3\u03ad\u03b8\u03c5\u03bd\u03c3\u03b7","Sector Chart":"\u0393\u03c1\u03ac\u03c6\u03b7\u03bc\u03b1 \u03c4\u03bf\u03bc\u03ad\u03b1","Country":"\u03a7\u03ce\u03c1\u03b1","Total Downloads":"\u03a3\u03c5\u03bd\u03bf\u03bb\u03b9\u03ba\u03ad\u03c2 \u03bb\u03ae\u03c8\u03b5\u03b9\u03c2","North America":"\u0392\u03cc\u03c1\u03b5\u03b9\u03b1 \u0391\u03bc\u03b5\u03c1\u03b9\u03ba\u03ae","zoom out":"\u03a3\u03bc\u03af\u03ba\u03c1\u03c5\u03bd\u03c3\u03b7","Africa":"\u0391\u03c6\u03c1\u03b9\u03ba\u03ae","Antarctica":"\u0391\u03bd\u03c4\u03b1\u03c1\u03ba\u03c4\u03b9\u03ba\u03ae","Get Firefox":"\u039a\u03ac\u03bd\u03c4\u03b5 \u03bb\u03ae\u03c8\u03b7 \u03c4\u03bf\u03c5 Firefox","Continent":"\u0389\u03c0\u03b5\u03b9\u03c1\u03bf\u03c2"},
    _timefmt = "h:mm a",
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
