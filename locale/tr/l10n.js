var catalog = {"Europe":"Avrupa","zoom in":"yakla\u015f","Sector Chart":"B\u00f6lge Tablosu","Loading":"Y\u00fckleniyor","City":"\u015eehir","Antarctica":"Antarktika","Country":"\u00dclke","Total Downloads":"Toplam \u0130ndirme","Africa":"Afrika","About":"Hakk\u0131nda","Asia":"Asya","World Map":"D\u00fcnya Haritas\u0131","Firefox 4 Download Stats":"Firefox 4 \u0130ndirme \u0130statistikleri","zoom out":"uzakla\u015f","South America":"G\u00fcney Amerika","Oceania":"Avustralya","Region":"B\u00f6lge","show my current location":"\u015fu anki konumumu g\u00f6ster","Get Firefox":"Firefox'u \u0130ndirin","Continent":"K\u0131ta","North America":"Kuzey Amerika"},
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
