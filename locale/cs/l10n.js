var catalog = {"Europe":"Evropa","zoom in":"zv\u011bt\u0161it","Sector Chart":"Sektor grafu","Loading":"Prob\u00edh\u00e1 na\u010d\u00edt\u00e1n\u00ed","City":"M\u011bsto","Antarctica":"Antarktida","Country":"Zem\u011b","Total Downloads":"Sta\u017eeno celkem","Africa":"Afrika","About":"O projektu","Asia":"Asie","World Map":"Mapa sv\u011bta","Firefox 4 Download Stats":"Statistiky sta\u017een\u00ed Firefoxu 4","zoom out":"zmen\u0161it","South America":"Ji\u017en\u00ed Amerika","Oceania":"Oce\u00e1nie","Region":"Region","show my current location":"zobrazit mou aktu\u00e1ln\u00ed polohu","Get Firefox":"Z\u00edskat Firefox","Continent":"Kontinent","North America":"Severn\u00ed Amerika"},
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
