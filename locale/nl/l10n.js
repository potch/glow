var catalog = {"Europe":"Europa","zoom in":"inzoomen","Sector Chart":"Sectordiagram","Loading":"Laden","City":"Stad","Antarctica":"Antarctica","Country":"Land","Total Downloads":"Downloads totaal","Africa":"Afrika","About":"Over","Asia":"Azi\u00eb","World Map":"Wereldkaart","Firefox 4 Download Stats":"Firefox 4-downloadstatistieken","zoom out":"uitzoomen","South America":"Zuid-Amerika","Oceania":"Oceani\u00eb","Region":"Regio","show my current location":"mijn huidige locatie tonen","Get Firefox":"Download Firefox","Continent":"Continent","North America":"Noord-Amerika"},
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
