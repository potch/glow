var catalog = {"Europe":"\uc720\ub7fd","zoom in":"\ud655\ub300","Sector Chart":"\uc601\uc5ed \ub3c4\ud45c","Loading":"\uc77d\ub294 \uc911","City":"\ub3c4\uc2dc\ubcc4","Antarctica":"\ub0a8\uadf9","Country":"\ub098\ub77c\ubcc4","Total Downloads":"\ucd1d \ub2e4\uc6b4\ub85c\ub4dc","Africa":"\uc544\ud504\ub9ac\uce74","About":"\uc18c\uac1c","Asia":"\uc544\uc2dc\uc544","World Map":"\uc138\uacc4 \uc9c0\ub3c4","Firefox 4 Download Stats":"Firefox 4 \ub2e4\uc6b4\ub85c\ub4dc \ud1b5\uacc4","zoom out":"\ucd95\uc18c","South America":"\ub0a8\ubbf8","Oceania":"\uc624\uc138\uc544\ub2c8\uc544","Region":"\uc9c0\uc5ed\ubcc4","show my current location":"\ud604\uc7ac \uc704\uce58 \ubcf4\uae30","Get Firefox":"Firefox \ubc1b\uae30","Continent":"\ub300\ub959\ubcc4","North America":"\ubd81\ubbf8"},
    _timefmt = "a h:mm",
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
