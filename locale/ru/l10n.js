var catalog = {"City":"\u0413\u043e\u0440\u043e\u0434","Loading":"\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430"," \"PM":" \"\u041f\u041f","About":"\u041e \u0441\u0430\u0439\u0442\u0435","Asia":"\u0410\u0437\u0438\u044f","Oceania":"\u041e\u043a\u0435\u0430\u043d\u0438\u044f"," \"AM":" \"\u0414\u041f","Europe":"\u0415\u0432\u0440\u043e\u043f\u0430","South America":"\u042e\u0436\u043d\u0430\u044f \u0410\u043c\u0435\u0440\u0438\u043a\u0430","World Map":"\u041a\u0430\u0440\u0442\u0430 \u043c\u0438\u0440\u0430","Firefox 4 Download Stats":"\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043a\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043e\u043a Firefox 4","show my current location":"\u043f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u043c\u043e\u0435 \u0442\u0435\u043a\u0443\u0449\u0435\u0435 \u043f\u043e\u043b\u043e\u0436\u0435\u043d\u0438\u0435","Region":"\u0420\u0435\u0433\u0438\u043e\u043d","zoom in":"\u0443\u0432\u0435\u043b\u0438\u0447\u0438\u0442\u044c","Sector Chart":"\u041a\u0440\u0443\u0433\u043e\u0432\u0430\u044f \u0434\u0438\u0430\u0433\u0440\u0430\u043c\u043c\u0430","Country":"\u0421\u0442\u0440\u0430\u043d\u0430","Total Downloads":"\u0412\u0441\u0435\u0433\u043e \u0437\u0430\u0433\u0440\u0443\u0437\u043e\u043a","North America":"\u0421\u0435\u0432\u0435\u0440\u043d\u0430\u044f \u0410\u043c\u0435\u0440\u0438\u043a\u0430","zoom out":"\u0443\u043c\u0435\u043d\u044c\u0448\u0438\u0442\u044c","Africa":"\u0410\u0444\u0440\u0438\u043a\u0430","Antarctica":"\u0410\u043d\u0442\u0430\u0440\u043a\u0442\u0438\u043a\u0430","Get Firefox":"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c Firefox","Continent":"\u041a\u043e\u043d\u0442\u0438\u043d\u0435\u043d\u0442"},
    _timefmt = "H:mm",
    _group = " ",
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
