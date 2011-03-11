var catalog = {"City":"Stadt","Loading":"Laden"," \"PM":" \"nachm.","About":"\u00dcber","Asia":"Asien","Oceania":"Ozeanien"," \"AM":" \"vorm.","Europe":"Europa","South America":"S\u00fcdamerika","World Map":"Weltkarte","Firefox 4 Download Stats":"Download-Statistiken f\u00fcr Firefox 4","show my current location":"Meinen derzeitigen Standort anzeigen","Region":"Region","zoom in":"Heranzoomen","Sector Chart":"Ringdiagramm","Country":"Land","Total Downloads":"Downloads insgesamt","North America":"Nordamerika","zoom out":"Herauszoomen","Africa":"Afrika","Antarctica":"Antarktis","Get Firefox":"Holen Sie sich Firefox","Continent":"Kontinent"},
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