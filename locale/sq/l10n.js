var catalog = {"City":"Qytet","Loading":"Po ngarkohet"," \"PM":" \"PM","About":"Rreth","Asia":"Azi","Oceania":"Oqeani"," \"AM":" \"AM","Europe":"Europ\u00eb","South America":"Amerik\u00eb e Jugut","World Map":"Hart\u00eb e Bot\u00ebs","Firefox 4 Download Stats":"Statistika Shkarkimi p\u00ebr Firefox 4","show my current location":"shfaq vendin tim t\u00eb tanish\u00ebm","Region":"Rajon","zoom in":"zmadhoje","Sector Chart":"Grafik me Sektor\u00eb","Country":"Vend","Total Downloads":"Shkarkime Gjithsej","North America":"Amerik\u00eb e Veriut","zoom out":"zvog\u00ebloje","Africa":"Afrik\u00eb","Antarctica":"Antarktid\u00eb","Get Firefox":"Merreni Firefox-in","Continent":"Kontinent"},
    _timefmt = "h.mm.a",
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
