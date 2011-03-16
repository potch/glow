var catalog = {"Europe":"\u0415\u0432\u0440\u043e\u043f\u0430","zoom in":"\u0443\u0432\u0435\u043b\u0438\u0447\u0430\u0458","Sector Chart":"\u0421\u0435\u043a\u0442\u043e\u0440\u0441\u043a\u0438 \u0433\u0440\u0430\u0444\u0438\u043a\u043e\u043d","Loading":"\u0423\u0447\u0438\u0442\u0430\u0432\u0430\u043c","City":"\u0413\u0440\u0430\u0434","Antarctica":"\u0410\u043d\u0442\u0430\u0440\u043a\u0442\u0438\u043a","Country":"\u0414\u0440\u0436\u0430\u0432\u0430","Total Downloads":"\u0423\u043a\u0443\u043f\u043d\u043e \u043f\u0440\u0435\u0443\u0437\u0438\u043c\u0430\u045a\u0430","Africa":"\u0410\u0444\u0440\u0438\u043a\u0430","About":"\u041e \u043f\u0440\u043e\u0458\u0435\u043a\u0442\u0443","Asia":"\u0410\u0437\u0438\u0458\u0430","World Map":"\u041c\u0430\u043f\u0430 \u0441\u0432\u0435\u0442\u0430","Firefox 4 Download Stats":"\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043a\u0430 \u043f\u0440\u0435\u0443\u0437\u0438\u043c\u0430\u045a\u0430 \u0444\u0430\u0458\u0435\u0440\u0444\u043e\u043a\u0441\u0430 4","zoom out":"\u0443\u043c\u0430\u045a\u0438","South America":"\u0408\u0443\u0436\u043d\u0430 \u0410\u043c\u0435\u0440\u0438\u043a\u0430","Oceania":"\u041e\u043a\u0435\u0430\u043d\u0438\u0458\u0430","Region":"\u0420\u0435\u0433\u0438\u043e\u043d","show my current location":"\u043f\u0440\u0438\u043a\u0430\u0436\u0438 \u043c\u043e\u0458\u0443 \u0442\u0440\u0435\u043d\u0443\u0442\u043d\u0443 \u043b\u043e\u043a\u0430\u0446\u0438\u0458\u0443","Get Firefox":"\u041d\u0430\u0431\u0430\u0432\u0438 \u0444\u0430\u0458\u0435\u0440\u0444\u043e\u043a\u0441","Continent":"\u041a\u043e\u043d\u0442\u0438\u043d\u0435\u043d\u0442","North America":"\u0421\u0435\u0432\u0435\u0440\u043d\u0430 \u0410\u043c\u0435\u0440\u0438\u043a\u0430"},
    _timefmt = "HH.mm",
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
