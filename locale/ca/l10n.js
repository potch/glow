var catalog = {"Europe":"Europa","zoom in":"augmenta","Sector Chart":"Gr\u00e0fic en sectors","Loading":"S'est\u00e0 carregant","City":"Ciutat","Antarctica":"Ant\u00e0rtida","Country":"Estat","Total Downloads":"Baixades totals","Africa":"\u00c0frica","About":"Quant a","Asia":"\u00c0sia","World Map":"Mapa mundial","Firefox 4 Download Stats":"Estad\u00edstiques de baixades del Firefox 4","zoom out":"redueix","South America":"Am\u00e8rica del Sud","Oceania":"Oceania","Region":"Regi\u00f3","show my current location":"mostra la meva ubicaci\u00f3 actual","Get Firefox":"Baixa el Firefox","Continent":"Continent","North America":"Am\u00e8rica del Nord"},
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
