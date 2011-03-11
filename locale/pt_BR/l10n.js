var catalog = {"City":"Cidade","Loading":"Carregando"," \"PM":" \"PM","About":"Sobre","Asia":"\u00c1sia","Oceania":"Oceania"," \"AM":" \"AM","Europe":"Europa","South America":"Am\u00e9rica do Sul","World Map":"Mapa mundial","Firefox 4 Download Stats":"Estat\u00edsticas de download do Firefox 4","show my current location":"exibir minha localiza\u00e7\u00e3o atual","Region":"Regi\u00e3o","zoom in":"aproximar","Sector Chart":"Gr\u00e1fico por setor","Country":"Pa\u00eds","Total Downloads":"Total de downloads","North America":"Am\u00e9rica do Norte","zoom out":"afastar","Africa":"\u00c1frica","Antarctica":"Ant\u00e1rtida","Get Firefox":"Baixar o Firefox","Continent":"Continente"},
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
