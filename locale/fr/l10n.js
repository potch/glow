var catalog = {"City":"Ville","Loading":"Chargement"," \"PM":" \"Apr\u00e8s-midi","About":"\u00c0 propos de","Asia":"Asie","Oceania":"Oc\u00e9anie"," \"AM":" \"Matin","Europe":"Europe","South America":"Am\u00e9rique du Sud","World Map":"Carte du monde","Firefox 4 Download Stats":"Statistiques de t\u00e9l\u00e9chargements de Firefox 4","show my current location":"afficher ma localisation","Region":"R\u00e9gion","zoom in":"agrandir","Sector Chart":"Graphique en secteurs","Country":"Pays","Total Downloads":"T\u00e9l\u00e9chargements totaux","North America":"Am\u00e9rique du Nord","zoom out":"r\u00e9duire","Africa":"Afrique","Antarctica":"Antarctique","Get Firefox":"Obtenir Firefox","Continent":"Continent"},
    _timefmt = "HH:mm",
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
    if (fmt == "a") {
        rv.push(gettext(hour < 12 ? "AM" : "PM"));
    } else if (fmt == "h" || fmt == "H" || fmt == "m") {
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
    } else {
      rv.push(fmt);
    }
  }
  return rv.join('');
}
