var catalog = {"City":"Ciudad","Loading":"Cargando"," \"PM":" \"PM","About":"Acerca de","Asia":"Asia","Oceania":"Ocean\u00eda"," \"AM":" \"AM","Europe":"Europa","South America":"Am\u00e9rica del sur","World Map":"Mapa mundial","Firefox 4 Download Stats":"Estad\u00edsticas de descarga de Firefox 4","show my current location":"ver mi posici\u00f3n actual","Region":"Regi\u00f3n","zoom in":"ampliar","Sector Chart":"Gr\u00e1fico de sectores","Country":"Pa\u00eds","Total Downloads":"Descargas totales","North America":"Am\u00e9rica del norte","zoom out":"reducir","Africa":"\u00c1frica","Antarctica":"Ant\u00e1rtida","Get Firefox":"Obt\u00e9n Firefox","Continent":"Continente"},
    _timefmt = "HH:mm",
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
