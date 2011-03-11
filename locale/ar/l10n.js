var catalog = {"City":"\u0627\u0644\u0645\u062f\u064a\u0646\u0629","Loading":"\u064a\u062d\u0645\u0651\u0644"," \"PM":" \"\u0645","About":"\u0639\u0646 \u0647\u0630\u0627 \u0627\u0644\u0645\u0634\u0631\u0648\u0639","Asia":"\u0622\u0633\u064a\u0627","Oceania":"\u0623\u0648\u0642\u064a\u0627\u0646\u064a\u0627"," \"AM":" \"\u0635","Europe":"\u0623\u0648\u0631\u0648\u0628\u0627","South America":"\u062c\u0646\u0648\u0628 \u0623\u0645\u0631\u064a\u0643\u0627","World Map":"\u062e\u0627\u0631\u0637\u0629 \u0627\u0644\u0639\u0627\u0644\u0645","Firefox 4 Download Stats":"\u0625\u062d\u0635\u0627\u0626\u064a\u0627\u062a \u062a\u0646\u0632\u064a\u0644 \u0641\u064e\u064a\u064e\u0631\u0641\u064f\u0643\u0633 4","show my current location":"\u0623\u0638\u0647\u0631 \u0645\u0643\u0627\u0646\u064a \u0627\u0644\u062d\u0627\u0644\u064a","Region":"\u0627\u0644\u0645\u0646\u0637\u0642\u0629","zoom in":"\u0642\u0631\u0651\u0628","Sector Chart":"\u0645\u062e\u0637\u0637 \u062f\u0627\u0626\u0631\u064a","Country":"\u0627\u0644\u062f\u0648\u0644\u0629","Total Downloads":"\u0639\u062f\u062f \u0627\u0644\u062a\u0646\u0632\u064a\u0644\u0627\u062a","North America":"\u0634\u0645\u0627\u0644 \u0623\u0645\u0631\u064a\u0643\u0627","zoom out":"\u0628\u0639\u0651\u062f","Africa":"\u0623\u0641\u0631\u064a\u0642\u064a\u0627","Antarctica":"\u0627\u0644\u0642\u0637\u0628 \u0627\u0644\u062c\u0646\u0648\u0628\u064a","Get Firefox":"\u0627\u062d\u0635\u0644 \u0639\u0644\u0649 \u0641\u064e\u064a\u064e\u0631\u0641\u064f\u0643\u0633","Continent":"\u0627\u0644\u0642\u0627\u0631\u0629"},
    _timefmt = "h:mm a",
    _group = "٬",
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
