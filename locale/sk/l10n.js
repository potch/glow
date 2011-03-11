var catalog = {"City":"Mesto","Loading":"Na\u010d\u00edtava sa"," \"PM":" \"popoludn\u00ed","About":"\u010co je","Asia":"\u00c1zia","Oceania":"Oce\u00e1nia"," \"AM":" \"dopoludnia","Europe":"Eur\u00f3pa","South America":"Ju\u017en\u00e1 Amerika","World Map":"Mapa sveta","Firefox 4 Download Stats":"\u0160tatistiky prevzat\u00ed Firefoxu 4","show my current location":"zobrazi\u0165 moje aktu\u00e1lne umiestnenie","Region":"Regi\u00f3n","zoom in":"pribl\u00ed\u017ei\u0165","Sector Chart":"Graf pod\u013ea oblast\u00ed","Country":"Krajina","Total Downloads":"Prevzat\u00ed celkom","North America":"Severn\u00e1 Amerika","zoom out":"vzdiali\u0165","Africa":"Afrika","Antarctica":"Antarkt\u00edda","Get Firefox":"Z\u00edska\u0165 Firefox","Continent":"Kontinent"},
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
