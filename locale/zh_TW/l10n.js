var catalog = {"City":"\u57ce\u5e02","Loading":"\u8f09\u5165\u4e2d"," \"PM":" \"PM","About":"\u95dc\u65bc","Asia":"\u4e9e\u6d32","Oceania":"\u5927\u6d0b\u6d32"," \"AM":" \"AM","Europe":"\u6b50\u6d32","South America":"\u5357\u7f8e\u6d32","World Map":"\u4e16\u754c\u5730\u5716","Firefox 4 Download Stats":"Firefox 4 \u4e0b\u8f09\u7d71\u8a08","show my current location":"\u986f\u793a\u6211\u76ee\u524d\u7684\u4f4d\u7f6e","Region":"\u5340\u57df","zoom in":"\u653e\u5927","Sector Chart":"\u6247\u5340\u5716","Country":"\u570b\u5bb6","Total Downloads":"\u7e3d\u4e0b\u8f09\u91cf","North America":"\u5317\u7f8e\u6d32","zoom out":"\u7e2e\u5c0f","Africa":"\u975e\u6d32","Antarctica":"\u5357\u6975\u6d32","Get Firefox":"\u4e0b\u8f09 Firefox","Continent":"\u5927\u6d32"},
    _timefmt = "ah:mm",
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
