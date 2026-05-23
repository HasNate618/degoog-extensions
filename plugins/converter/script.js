(function () {
  var CATEGORIES = {
    length: { units: { "mm": { toBase: 0.001, fromBase: 1000 }, "cm": { toBase: 0.01, fromBase: 100 }, "m": { toBase: 1, fromBase: 1 }, "km": { toBase: 1000, fromBase: 0.001 }, "in": { toBase: 0.0254, fromBase: 1 / 0.0254 }, "ft": { toBase: 0.3048, fromBase: 1 / 0.3048 }, "yd": { toBase: 0.9144, fromBase: 1 / 0.9144 }, "mi": { toBase: 1609.344, fromBase: 1 / 1609.344 } } },
    mass: { units: { "mg": { toBase: 0.001, fromBase: 1000 }, "g": { toBase: 1, fromBase: 1 }, "kg": { toBase: 1000, fromBase: 0.001 }, "oz": { toBase: 28.349523125, fromBase: 1 / 28.349523125 }, "lb": { toBase: 453.59237, fromBase: 1 / 453.59237 } } },
    volume: { units: { "mL": { toBase: 0.001, fromBase: 1000 }, "L": { toBase: 1, fromBase: 1 }, "fl-oz": { toBase: 0.0295735295625, fromBase: 1 / 0.0295735295625 }, "cup": { toBase: 0.2365882365, fromBase: 1 / 0.2365882365 }, "pt": { toBase: 0.473176473, fromBase: 1 / 0.473176473 }, "qt": { toBase: 0.946352946, fromBase: 1 / 0.946352946 }, "gal": { toBase: 3.785411784, fromBase: 1 / 3.785411784 } } },
    temperature: { units: { "C": { toBase: function (v) { return v; }, fromBase: function (v) { return v; } }, "F": { toBase: function (v) { return (v - 32) * 5 / 9; }, fromBase: function (v) { return v * 9 / 5 + 32; } }, "K": { toBase: function (v) { return v - 273.15; }, fromBase: function (v) { return v + 273.15; } } } },
    digital: { units: { "B": { toBase: 1, fromBase: 1 }, "KB": { toBase: 1000, fromBase: 0.001 }, "KiB": { toBase: 1024, fromBase: 1 / 1024 }, "MB": { toBase: 1000000, fromBase: 1 / 1000000 }, "MiB": { toBase: 1048576, fromBase: 1 / 1048576 }, "GB": { toBase: 1000000000, fromBase: 1 / 1000000000 }, "GiB": { toBase: 1073741824, fromBase: 1 / 1073741824 }, "TB": { toBase: 1000000000000, fromBase: 1 / 1000000000000 }, "TiB": { toBase: 1099511627776, fromBase: 1 / 1099511627776 } } },
    speed: { units: { "m/s": { toBase: 1, fromBase: 1 }, "km/h": { toBase: 5 / 18, fromBase: 3.6 }, "mph": { toBase: 0.44704, fromBase: 1 / 0.44704 }, "knot": { toBase: 463 / 900, fromBase: 900 / 463 } } },
    area: { units: { "mm\u00B2": { toBase: 1e-6, fromBase: 1e6 }, "cm\u00B2": { toBase: 1e-4, fromBase: 1e4 }, "m\u00B2": { toBase: 1, fromBase: 1 }, "km\u00B2": { toBase: 1e6, fromBase: 1e-6 }, "ft\u00B2": { toBase: 0.09290304, fromBase: 1 / 0.09290304 }, "acre": { toBase: 4046.8564224, fromBase: 1 / 4046.8564224 }, "ha": { toBase: 10000, fromBase: 0.0001 } } },
    currency: { units: { "USD": { toBase: 1, fromBase: 1 }, "EUR": { toBase: 0.92, fromBase: 1 / 0.92 }, "GBP": { toBase: 0.79, fromBase: 1 / 0.79 }, "JPY": { toBase: 151, fromBase: 1 / 151 }, "CAD": { toBase: 1.37, fromBase: 1 / 1.37 }, "AUD": { toBase: 1.53, fromBase: 1 / 1.53 }, "CHF": { toBase: 0.88, fromBase: 1 / 0.88 }, "CNY": { toBase: 7.24, fromBase: 1 / 7.24 }, "INR": { toBase: 83.5, fromBase: 1 / 83.5 }, "MXN": { toBase: 17.2, fromBase: 1 / 17.2 }, "BRL": { toBase: 5.05, fromBase: 1 / 5.05 } } },
  };

  var UNIT_ALIASES = {
    "m": "m", "meter": "m", "meters": "m", "metre": "m",
    "ft": "ft", "foot": "ft", "feet": "ft",
    "in": "in", "inch": "in", "inches": "in",
    "km": "km", "kilometer": "km", "kilometers": "km",
    "cm": "cm", "centimeter": "cm", "centimeters": "cm",
    "mm": "mm", "millimeter": "mm", "millimeters": "mm",
    "yd": "yd", "yard": "yd", "yards": "yd",
    "mi": "mi", "mile": "mi", "miles": "mi",
    "kg": "kg", "kilogram": "kg", "kilograms": "kg",
    "g": "g", "gram": "g", "grams": "g",
    "mg": "mg", "milligram": "mg", "milligrams": "mg",
    "lb": "lb", "pound": "lb", "pounds": "lb", "lbs": "lb",
    "oz": "oz", "ounce": "oz", "ounces": "oz",
    "L": "L", "l": "L", "liter": "L", "liters": "L", "litre": "L",
    "mL": "mL", "ml": "mL", "milliliter": "mL", "milliliters": "mL",
    "gal": "gal", "gallon": "gal", "gallons": "gal",
    "qt": "qt", "quart": "qt", "quarts": "qt",
    "pt": "pt", "pint": "pt", "pints": "pt",
    "cup": "cup", "cups": "cup",
    "fl-oz": "fl-oz", "fl oz": "fl-oz", "fluid ounce": "fl-oz",
    "C": "C", "c": "C", "celsius": "C",
    "F": "F", "f": "F", "fahrenheit": "F",
    "K": "K", "k": "K", "kelvin": "K",
    "B": "B", "b": "B", "byte": "B", "bytes": "B",
    "KB": "KB", "kb": "KB", "kilobyte": "KB",
    "KiB": "KiB", "kib": "KiB", "kibibyte": "KiB",
    "MB": "MB", "mb": "MB", "megabyte": "MB",
    "MiB": "MiB", "mib": "MiB", "mebibyte": "MiB",
    "GB": "GB", "gb": "GB", "gigabyte": "GB",
    "GiB": "GiB", "gib": "GiB", "gibibyte": "GiB",
    "TB": "TB", "tb": "TB", "terabyte": "TB",
    "TiB": "TiB", "tib": "TiB", "tebibyte": "TiB",
    "km/h": "km/h", "kph": "km/h",
    "mph": "mph", "knot": "knot", "knots": "knot",
    "m/s": "m/s",
    "m\u00B2": "m\u00B2", "m2": "m\u00B2", "square meter": "m\u00B2",
    "ft\u00B2": "ft\u00B2", "ft2": "ft\u00B2", "sqft": "ft\u00B2", "square foot": "ft\u00B2",
    "acre": "acre", "acres": "acre",
    "ha": "ha", "hectare": "ha",
    "USD": "USD", "usd": "USD", "dollar": "USD", "dollars": "USD",
    "EUR": "EUR", "eur": "EUR", "euro": "EUR",
    "GBP": "GBP", "gbp": "GBP",
    "JPY": "JPY", "jpy": "JPY", "yen": "JPY",
    "CAD": "CAD", "cad": "CAD",
    "AUD": "AUD", "aud": "AUD",
    "CHF": "CHF", "chf": "CHF",
    "CNY": "CNY", "cny": "CNY", "yuan": "CNY",
    "INR": "INR", "inr": "INR", "rupee": "INR",
  };

  var DEFAULTS = { length: "ft", mass: "lb", volume: "gal", temperature: "F", digital: "GiB", speed: "mph", area: "ft\u00B2", currency: "EUR" };

  var UNIT_NAMES = {
    "mm": "Millimeter", "cm": "Centimeter", "m": "Meter", "km": "Kilometer",
    "in": "Inch", "ft": "Foot", "yd": "Yard", "mi": "Mile",
    "mg": "Milligram", "g": "Gram", "kg": "Kilogram", "oz": "Ounce", "lb": "Pound",
    "mL": "Milliliter", "L": "Liter", "fl-oz": "Fl Ounce", "cup": "Cup", "pt": "Pint", "qt": "Quart", "gal": "Gallon",
    "C": "Celsius", "F": "Fahrenheit", "K": "Kelvin",
    "B": "Byte", "KB": "Kilobyte", "KiB": "Kibibyte", "MB": "Megabyte", "MiB": "Mebibyte", "GB": "Gigabyte", "GiB": "Gibibyte", "TB": "Terabyte", "TiB": "Tebibyte",
    "m/s": "m/s", "km/h": "km/h", "mph": "mph", "knot": "Knot",
    "mm\u00B2": "mm\u00B2", "cm\u00B2": "cm\u00B2", "m\u00B2": "m\u00B2", "km\u00B2": "km\u00B2", "ft\u00B2": "ft\u00B2", "acre": "Acre", "ha": "Hectare",
    "USD": "US Dollar", "EUR": "Euro", "GBP": "Pound", "JPY": "Yen", "CAD": "C Dollar", "AUD": "A Dollar", "CHF": "Franc", "CNY": "Yuan", "INR": "Rupee", "MXN": "Peso", "BRL": "Real",
  };

  function findCategory(unit) { for (var id in CATEGORIES) { if (CATEGORIES[id].units[unit]) return id; } return null; }

  function resolveUnit(text) { text = text.trim().toLowerCase(); return UNIT_ALIASES[text] || null; }

  function parseQuery(text) {
    text = text.replace(/^(?:convert|conversion)\s+/i, "").trim();
    function tryMatch(p, vi, fi, ti) {
      var m = text.match(p); if (!m) return null;
      var v = vi !== null ? parseFloat(m[vi]) : 1;
      var f = resolveUnit(m[fi]); if (!f) return null;
      var c = findCategory(f); if (!c) return null;
      var t = ti !== null ? resolveUnit(m[ti]) : null;
      if (t) { var tc = findCategory(t); if (tc !== c) return null; }
      return { category: c, value: v, from: f, to: t || DEFAULTS[c] };
    }
    var r;
    r = tryMatch(/^(\d+(?:\.\d+)?)\s+(.+?)\s+(?:to|in|as)\s+(.+)$/i, 1, 2, 3); if (r) return r;
    r = tryMatch(/^(\d+(?:\.\d+)?)\s*([a-zA-Z\xB0\xB2\xB3]+)\s+(?:to|in|as)\s+(.+)$/i, 1, 2, 3); if (r) return r;
    r = tryMatch(/^(\d+(?:\.\d+)?)\s+(.+)$/i, 1, 2, null); if (r) return r;
    r = tryMatch(/^(\d+(?:\.\d+)?)\s*([a-zA-Z\xB0\xB2\xB3]+)$/i, 1, 2, null); if (r) return r;
    r = tryMatch(/^(.+?)\s+(?:to|in|as)\s+(.+)$/i, null, 1, 2); if (r) return r;
    return null;
  }

  function doConvert(value, from, to) {
    var cat = findCategory(from); if (!cat) return null;
    var units = CATEGORIES[cat].units; if (from === to) return value;
    var f = units[from]; var t = units[to];
    var base = typeof f.toBase === "function" ? f.toBase(value) : value * f.toBase;
    return typeof t.fromBase === "function" ? t.fromBase(base) : base / t.toBase;
  }

  function formatNum(n) { if (!isFinite(n)) return "0"; return parseFloat(n.toPrecision(10)).toString(); }

  function buildOptions(catId, selected) {
    var cat = CATEGORIES[catId]; if (!cat) return "";
    var h = "";
    for (var k in cat.units) h += "<option value=\"" + k + "\"" + (k === selected ? " selected" : "") + ">" + (UNIT_NAMES[k] || k) + " (" + k + ")</option>";
    return h;
  }

  function buildWidget(cat, from, to, val) {
    var c = CATEGORIES[cat]; if (!c) return "";
    var r = doConvert(val, from, to);
    return "<div class=\"dcw\" data-auto=\"1\" data-cat=\"" + cat + "\">"
      + "<div class=\"dcw-bd\">"
      + "<div class=\"dcw-col\"><input class=\"dcw-inp\" data-side=\"left\" value=\"" + formatNum(val) + "\" inputmode=\"decimal\"><select class=\"dcw-sel\" data-side=\"left\">" + buildOptions(cat, from) + "</select></div>"
      + "<button class=\"dcw-swap\" title=\"Swap units\">\u21C4</button>"
      + "<div class=\"dcw-col\"><input class=\"dcw-inp\" data-side=\"right\" value=\"" + formatNum(r) + "\" inputmode=\"decimal\"><select class=\"dcw-sel\" data-side=\"right\">" + buildOptions(cat, to) + "</select></div>"
      + "</div></div>";
  }

  function initWidget(w) {
    if (w.dataset.dcwInited) return;
    var li = w.querySelector('[data-side="left"].dcw-inp');
    var ri = w.querySelector('[data-side="right"].dcw-inp');
    var ls = w.querySelector('[data-side="left"].dcw-sel');
    var rs = w.querySelector('[data-side="right"].dcw-sel');
    var sb = w.querySelector(".dcw-swap");
    if (!li || !ri || !ls || !rs || !sb) return;
    w.dataset.dcwInited = "1";
    var as = "left";
    function cmp() {
      if (as === "left") { var v = parseFloat(li.value); if (isNaN(v)) { ri.value = ""; return; } ri.value = formatNum(doConvert(v, ls.value, rs.value)); }
      else { var v = parseFloat(ri.value); if (isNaN(v)) { li.value = ""; return; } li.value = formatNum(doConvert(v, rs.value, ls.value)); }
    }
    li.addEventListener("input", function () { as = "left"; cmp(); });
    ri.addEventListener("input", function () { as = "right"; cmp(); });
    ls.addEventListener("change", function () { as = "left"; cmp(); });
    rs.addEventListener("change", function () { as = "right"; cmp(); });
    sb.addEventListener("click", function () {
      var tu = ls.value; ls.value = rs.value; rs.value = tu;
      var tv = li.value; li.value = ri.value; ri.value = tv;
      cmp();
    });
  }

  function getQuery() {
    var inp = document.getElementById("results-search-input");
    if (inp && inp.value) return inp.value;
    try { var q = new URLSearchParams(window.location.search).get("q"); if (q) return decodeURIComponent(q.replace(/\+/g, " ")); } catch (e) {}
    return "";
  }

  function doAutoDetect() {
    var old = document.querySelector('.dcw[data-auto="1"]');
    if (old && old.parentNode) old.parentNode.removeChild(old);

    var q = getQuery();
    if (!q || q.startsWith("!")) return;
    var p = parseQuery(q);
    if (!p) return;

    var target = document.getElementById("results-main");
    if (!target) return;
    var ref = document.getElementById("at-a-glance") || target.firstChild;
    var html = buildWidget(p.category, p.from, p.to, p.value);
    if (!html) return;
    var temp = document.createElement("div");
    temp.innerHTML = html;
    var el = temp.firstElementChild;
    target.insertBefore(el, ref);
    initWidget(el);
  }

  function initRemaining() {
    var dw = document.querySelectorAll(".dcw:not([data-dcw-inited])");
    for (var i = 0; i < dw.length; i++) initWidget(dw[i]);
  }

  function tryAll() {
    doAutoDetect();
    initRemaining();
  }

  document.addEventListener("degoog-results-ready", function () { setTimeout(tryAll, 100); });

  var lastQuery = "";

  function watchQuery() {
    var q = getQuery();
    if (q && q !== lastQuery && !q.startsWith("!")) {
      lastQuery = q;
      setTimeout(tryAll, 200);
    }
  }

  new MutationObserver(function () { initRemaining(); watchQuery(); }).observe(
    document.body, { childList: true, subtree: true }
  );

  setTimeout(function () { lastQuery = getQuery(); }, 200);
  setTimeout(tryAll, 300);
  setTimeout(tryAll, 1000);
  setTimeout(tryAll, 3000);
  setInterval(watchQuery, 500);
})();
