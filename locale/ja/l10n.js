var catalog = {"Europe":"\u6b27\u5dde","zoom in":"\u5927","Sector Chart":"\u5186\u30b0\u30e9\u30d5","Loading":"\u8aad\u307f\u8fbc\u307f\u4e2d","City":"\u90fd\u5e02","Antarctica":"\u5357\u6975","Country":"\u56fd","Total Downloads":"\u5168\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u6570","Africa":"\u30a2\u30d5\u30ea\u30ab","About":"\u3053\u306e\u30b5\u30a4\u30c8\u306b\u3064\u3044\u3066","Asia":"\u30a2\u30b8\u30a2","World Map":"\u4e16\u754c\u5730\u56f3","Firefox 4 Download Stats":"Firefox 4 \u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u6570","zoom out":"\u7e2e\u5c0f","South America":"\u5357\u30a2\u30e1\u30ea\u30ab","Oceania":"\u30aa\u30bb\u30a2\u30cb\u30a2","Region":"\u5730\u57df","show my current location":"\u73fe\u5728\u5730\u3092\u8868\u793a\u3059\u308b","Get Firefox":"Firefox \u3092\u5165\u624b","Continent":"\u5927\u9678","North America":"\u5317\u30a2\u30e1\u30ea\u30ab"},
    _timefmt = "H:mm",
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
