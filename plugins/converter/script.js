(function () {
  var CATEGORIES = {
    length: {
      units: {
        "mm": { toBase: 0.001, fromBase: 1000 },
        "cm": { toBase: 0.01, fromBase: 100 },
        "m": { toBase: 1, fromBase: 1 },
        "km": { toBase: 1000, fromBase: 0.001 },
        "in": { toBase: 0.0254, fromBase: 1 / 0.0254 },
        "ft": { toBase: 0.3048, fromBase: 1 / 0.3048 },
        "yd": { toBase: 0.9144, fromBase: 1 / 0.9144 },
        "mi": { toBase: 1609.344, fromBase: 1 / 1609.344 },
      },
    },
    mass: {
      units: {
        "mg": { toBase: 0.001, fromBase: 1000 },
        "g": { toBase: 1, fromBase: 1 },
        "kg": { toBase: 1000, fromBase: 0.001 },
        "oz": { toBase: 28.349523125, fromBase: 1 / 28.349523125 },
        "lb": { toBase: 453.59237, fromBase: 1 / 453.59237 },
      },
    },
    volume: {
      units: {
        "mL": { toBase: 0.001, fromBase: 1000 },
        "L": { toBase: 1, fromBase: 1 },
        "fl-oz": { toBase: 0.0295735295625, fromBase: 1 / 0.0295735295625 },
        "cup": { toBase: 0.2365882365, fromBase: 1 / 0.2365882365 },
        "pt": { toBase: 0.473176473, fromBase: 1 / 0.473176473 },
        "qt": { toBase: 0.946352946, fromBase: 1 / 0.946352946 },
        "gal": { toBase: 3.785411784, fromBase: 1 / 3.785411784 },
      },
    },
    temperature: {
      units: {
        "C": { toBase: function (v) { return v; }, fromBase: function (v) { return v; } },
        "F": { toBase: function (v) { return (v - 32) * 5 / 9; }, fromBase: function (v) { return v * 9 / 5 + 32; } },
        "K": { toBase: function (v) { return v - 273.15; }, fromBase: function (v) { return v + 273.15; } },
      },
    },
    digital: {
      units: {
        "B": { toBase: 1, fromBase: 1 },
        "KB": { toBase: 1000, fromBase: 0.001 },
        "KiB": { toBase: 1024, fromBase: 1 / 1024 },
        "MB": { toBase: 1000000, fromBase: 1 / 1000000 },
        "MiB": { toBase: 1048576, fromBase: 1 / 1048576 },
        "GB": { toBase: 1000000000, fromBase: 1 / 1000000000 },
        "GiB": { toBase: 1073741824, fromBase: 1 / 1073741824 },
        "TB": { toBase: 1000000000000, fromBase: 1 / 1000000000000 },
        "TiB": { toBase: 1099511627776, fromBase: 1 / 1099511627776 },
      },
    },
    speed: {
      units: {
        "m/s": { toBase: 1, fromBase: 1 },
        "km/h": { toBase: 5 / 18, fromBase: 3.6 },
        "mph": { toBase: 0.44704, fromBase: 1 / 0.44704 },
        "knot": { toBase: 463 / 900, fromBase: 900 / 463 },
      },
    },
    area: {
      units: {
        "mm\u00B2": { toBase: 1e-6, fromBase: 1e6 },
        "cm\u00B2": { toBase: 1e-4, fromBase: 1e4 },
        "m\u00B2": { toBase: 1, fromBase: 1 },
        "km\u00B2": { toBase: 1e6, fromBase: 1e-6 },
        "ft\u00B2": { toBase: 0.09290304, fromBase: 1 / 0.09290304 },
        "acre": { toBase: 4046.8564224, fromBase: 1 / 4046.8564224 },
        "ha": { toBase: 10000, fromBase: 0.0001 },
      },
    },
    currency: {
      units: {
        "USD": { toBase: 1, fromBase: 1 },
        "EUR": { toBase: 0.92, fromBase: 1 / 0.92 },
        "GBP": { toBase: 0.79, fromBase: 1 / 0.79 },
        "JPY": { toBase: 151, fromBase: 1 / 151 },
        "CAD": { toBase: 1.37, fromBase: 1 / 1.37 },
        "AUD": { toBase: 1.53, fromBase: 1 / 1.53 },
        "CHF": { toBase: 0.88, fromBase: 1 / 0.88 },
        "CNY": { toBase: 7.24, fromBase: 1 / 7.24 },
        "INR": { toBase: 83.5, fromBase: 1 / 83.5 },
        "MXN": { toBase: 17.2, fromBase: 1 / 17.2 },
        "BRL": { toBase: 5.05, fromBase: 1 / 5.05 },
      },
    },
  };

  var UNIT_ALIASES = {
    "millimeter": "mm", "millimeters": "mm",
    "centimeter": "cm", "centimeters": "cm",
    "meter": "m", "meters": "m", "metre": "m", "metres": "m", "m": "m",
    "kilometer": "km", "kilometers": "km", "km": "km",
    "inch": "in", "inches": "in", "in": "in",
    "foot": "ft", "feet": "ft", "ft": "ft",
    "yard": "yd", "yards": "yd", "yd": "yd",
    "mile": "mi", "miles": "mi", "mi": "mi",
    "milligram": "mg", "milligrams": "mg", "mg": "mg",
    "gram": "g", "grams": "g", "g": "g",
    "kilogram": "kg", "kilograms": "kg", "kg": "kg",
    "ounce": "oz", "ounces": "oz", "oz": "oz",
    "pound": "lb", "pounds": "lb", "lbs": "lb", "lb": "lb",
    "milliliter": "mL", "milliliters": "mL", "ml": "mL",
    "liter": "L", "liters": "L", "l": "L", "L": "L",
    "fluid ounce": "fl-oz", "fluid ounces": "fl-oz", "fl oz": "fl-oz",
    "cup": "cup", "cups": "cup",
    "pint": "pt", "pints": "pt", "pt": "pt",
    "quart": "qt", "quarts": "qt", "qt": "qt",
    "gallon": "gal", "gallons": "gal", "gal": "gal",
    "celsius": "C", "C": "C",
    "fahrenheit": "F", "f": "F", "F": "F",
    "kelvin": "K", "k": "K", "K": "K",
    "byte": "B", "bytes": "B", "b": "B", "B": "B",
    "kilobyte": "KB", "kilobytes": "KB", "kb": "KB", "KB": "KB",
    "kibibyte": "KiB", "kibibytes": "KiB", "kib": "KiB", "KiB": "KiB",
    "megabyte": "MB", "megabytes": "MB", "mb": "MB", "MB": "MB",
    "mebibyte": "MiB", "mebibytes": "MiB", "mib": "MiB", "MiB": "MiB",
    "gigabyte": "GB", "gigabytes": "GB", "gb": "GB", "GB": "GB",
    "gibibyte": "GiB", "gibibytes": "GiB", "gib": "GiB", "GiB": "GiB",
    "terabyte": "TB", "terabytes": "TB", "tb": "TB", "TB": "TB",
    "tebibyte": "TiB", "tebibytes": "TiB", "tib": "TiB", "TiB": "TiB",
    "km/h": "km/h", "kph": "km/h", "mph": "mph", "knot": "knot", "knots": "knot",
    "square meter": "m\u00B2", "square meters": "m\u00B2", "m2": "m\u00B2",
    "square foot": "ft\u00B2", "square feet": "ft\u00B2", "ft2": "ft\u00B2", "sqft": "ft\u00B2",
    "acre": "acre", "acres": "acre", "hectare": "ha", "hectares": "ha", "ha": "ha",
    "usd": "USD", "dollar": "USD", "dollars": "USD",
    "eur": "EUR", "euro": "EUR", "euros": "EUR",
    "gbp": "GBP", "jpy": "JPY", "yen": "JPY", "cad": "CAD",
    "aud": "AUD", "chf": "CHF", "cny": "CNY", "yuan": "CNY",
    "inr": "INR", "rupee": "INR", "mxn": "MXN", "peso": "MXN", "brl": "BRL", "real": "BRL",
  };

  function findCategory(unit) {
    for (var id in CATEGORIES) {
      if (CATEGORIES[id].units[unit]) return id;
    }
    return null;
  }

  function resolveUnit(text) {
    text = text.trim().toLowerCase();
    if (UNIT_ALIASES[text]) return UNIT_ALIASES[text];
    return null;
  }

  function parseQuery(text) {
    text = text.replace(/^(?:convert|conversion)\s+/i, "").trim();
    function tryMatch(pattern, valueIdx, fromIdx, toIdx) {
      var m = text.match(pattern);
      if (!m) return null;
      var v = valueIdx !== null ? parseFloat(m[valueIdx]) : 1;
      var f = resolveUnit(m[fromIdx]);
      var t = toIdx !== null ? resolveUnit(m[toIdx]) : null;
      if (!f) return null;
      var c = findCategory(f);
      if (!c) return null;
      if (t) {
        var tc = findCategory(t);
        if (tc !== c) return null;
      }
      return { category: c, value: v, from: f, to: t || defaults(f) };
    }
    var result;
    result = tryMatch(/^(\d+(?:\.\d+)?)\s+(.+?)\s+(?:to|in|as)\s+(.+)$/i, 1, 2, 3);
    if (result) return result;
    result = tryMatch(/^(\d+(?:\.\d+)?)\s*([a-zA-Z\xB0\xB2\xB3]+)\s+(?:to|in|as)\s+(.+)$/i, 1, 2, 3);
    if (result) return result;
    result = tryMatch(/^(\d+(?:\.\d+)?)\s+(.+)$/i, 1, 2, null);
    if (result) return result;
    result = tryMatch(/^(\d+(?:\.\d+)?)\s*([a-zA-Z\xB0\xB2\xB3]+)$/i, 1, 2, null);
    if (result) return result;
    result = tryMatch(/^(.+?)\s+(?:to|in|as)\s+(.+)$/i, null, 1, 2);
    if (result) return result;
    return null;
  }

  function defaults(unit) {
    var c = findCategory(unit);
    if (!c) return null;
    if (c === "length") return "ft";
    if (c === "mass") return "lb";
    if (c === "volume") return "gal";
    if (c === "temperature") return "F";
    if (c === "digital") return "GiB";
    if (c === "speed") return "mph";
    if (c === "area") return "ft\u00B2";
    if (c === "currency") return "EUR";
    return null;
  }

  function doConvert(value, from, to) {
    var cat = findCategory(from);
    if (!cat) return null;
    var units = CATEGORIES[cat].units;
    if (from === to) return value;
    var fromDef = units[from];
    var toDef = units[to];
    var base = typeof fromDef.toBase === "function" ? fromDef.toBase(value) : value * fromDef.toBase;
    return typeof toDef.fromBase === "function" ? toDef.fromBase(base) : base / toDef.toBase;
  }

  function formatNum(n) {
    if (!isFinite(n)) return "0";
    return parseFloat(n.toPrecision(10)).toString();
  }

  function initWidget(widget) {
    if (widget._dcwInited) return;

    var leftInput = widget.querySelector('[data-side="left"].dcw-inp');
    var rightInput = widget.querySelector('[data-side="right"].dcw-inp');
    var leftSelect = widget.querySelector('[data-side="left"].dcw-sel');
    var rightSelect = widget.querySelector('[data-side="right"].dcw-sel');
    var swapBtn = widget.querySelector(".dcw-swap");

    if (!leftInput || !rightInput || !leftSelect || !rightSelect || !swapBtn) return;

    widget._dcwInited = true;
    var activeSide = "left";

    function compute() {
      if (activeSide === "left") {
        var val = parseFloat(leftInput.value);
        if (isNaN(val)) { rightInput.value = ""; return; }
        rightInput.value = formatNum(doConvert(val, leftSelect.value, rightSelect.value));
      } else {
        var val = parseFloat(rightInput.value);
        if (isNaN(val)) { leftInput.value = ""; return; }
        leftInput.value = formatNum(doConvert(val, rightSelect.value, leftSelect.value));
      }
    }

    leftInput.addEventListener("input", function () { activeSide = "left"; compute(); });
    rightInput.addEventListener("input", function () { activeSide = "right"; compute(); });
    leftSelect.addEventListener("change", function () { activeSide = "left"; compute(); });
    rightSelect.addEventListener("change", function () { activeSide = "right"; compute(); });

    swapBtn.addEventListener("click", function () {
      var tmpU = leftSelect.value;
      leftSelect.value = rightSelect.value;
      rightSelect.value = tmpU;
      var tmpV = leftInput.value;
      leftInput.value = rightInput.value;
      rightInput.value = tmpV;
      compute();
    });
  }

  function buildOptions(catId, selected) {
    var cat = CATEGORIES[catId];
    if (!cat) return "";
    var html = "";
    for (var key in cat.units) {
      var sel = key === selected ? " selected" : "";
      html += "<option value=\"" + key + "\"" + sel + ">" + key + "</option>";
    }
    return html;
  }

  function injectWidget(parsed) {
    if (document.querySelector(".dcw")) return;
    var cat = parsed.category;
    if (!CATEGORIES[cat]) return;
    var fromVal = parsed.value;
    var toVal = formatNum(doConvert(fromVal, parsed.from, parsed.to));
    var html = "<div class=\"dcw\" data-cat=\"" + cat + "\">"
      + "<div class=\"dcw-bd\">"
      + "<div class=\"dcw-col\">"
      + "<input class=\"dcw-inp\" data-side=\"left\" value=\"" + formatNum(fromVal) + "\" inputmode=\"decimal\">"
      + "<select class=\"dcw-sel\" data-side=\"left\">" + buildOptions(cat, parsed.from) + "</select>"
      + "</div>"
      + "<button class=\"dcw-swap\" title=\"Swap units\">\u21C4</button>"
      + "<div class=\"dcw-col\">"
      + "<input class=\"dcw-inp\" data-side=\"right\" value=\"" + toVal + "\" inputmode=\"decimal\">"
      + "<select class=\"dcw-sel\" data-side=\"right\">" + buildOptions(cat, parsed.to) + "</select>"
      + "</div>"
      + "</div>"
      + "</div>";

    var target = document.getElementById("results-list");
    if (!target) return;
    var temp = document.createElement("div");
    temp.innerHTML = html;
    var el = temp.firstElementChild;
    target.insertBefore(el, target.firstChild);
    initWidget(el);
  }

  function getQuery() {
    var input = document.querySelector(".degoog-search-bar--results .search-input, #results-search-bar .search-input");
    if (input && input.value) return input.value;
    var params = new URLSearchParams(window.location.search);
    var q = params.get("q");
    if (q) return q;
    return "";
  }

  function tryAutoDetect() {
    var query = getQuery();
    if (!query || query.startsWith("!")) return;
    var parsed = parseQuery(query);
    if (parsed) injectWidget(parsed);
  }

  function initAll() {
    var widgets = document.querySelectorAll(".dcw");
    for (var i = 0; i < widgets.length; i++) initWidget(widgets[i]);
  }

  document.addEventListener("degoog-results-ready", function () {
    setTimeout(function () {
      initAll();
      tryAutoDetect();
    }, 100);
  });

  setTimeout(function () { initAll(); tryAutoDetect(); }, 500);
})();
