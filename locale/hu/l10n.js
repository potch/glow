var catalog = {"Europe":"Eur\u00f3pa","zoom in":"nagy\u00edt\u00e1s","Sector Chart":"Gy\u0171r\u0171diagramm","Loading":"Bet\u00f6lt\u00e9s","City":"V\u00e1ros","Antarctica":"Antarktisz","Country":"Orsz\u00e1g","Total Downloads":"\u00d6sszes let\u00f6lt\u00e9s","Africa":"Afrika","About":"N\u00e9vjegy","Asia":"\u00c1zsia","World Map":"Vil\u00e1gt\u00e9rk\u00e9p","Firefox 4 Download Stats":"Firefox 4 let\u00f6lt\u00e9si statisztika","zoom out":"kicsiny\u00edt\u00e9s","South America":"D\u00e9l-Amerika","Oceania":"\u00d3ce\u00e1nia","Region":"R\u00e9gi\u00f3","show my current location":"jelenlegi hely megjelen\u00edt\u00e9se","Get Firefox":"Firefox let\u00f6lt\u00e9se","Continent":"Kontinens","North America":"\u00c9szak-Amerika"},
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
