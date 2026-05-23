var CATEGORIES = {
  length: {
    name: "Length", icon: "\uD83D\uDCCF",
    units: {
      "mm": { name: "Millimeter", toBase: 0.001, fromBase: 1000 },
      "cm": { name: "Centimeter", toBase: 0.01, fromBase: 100 },
      "m": { name: "Meter", toBase: 1, fromBase: 1 },
      "km": { name: "Kilometer", toBase: 1000, fromBase: 0.001 },
      "in": { name: "Inch", toBase: 0.0254, fromBase: 1 / 0.0254 },
      "ft": { name: "Foot", toBase: 0.3048, fromBase: 1 / 0.3048 },
      "yd": { name: "Yard", toBase: 0.9144, fromBase: 1 / 0.9144 },
      "mi": { name: "Mile", toBase: 1609.344, fromBase: 1 / 1609.344 },
    }, defaultFrom: "m", defaultTo: "ft",
  },
  mass: {
    name: "Mass", icon: "\u2696\uFE0F",
    units: {
      "mg": { name: "Milligram", toBase: 0.001, fromBase: 1000 },
      "g": { name: "Gram", toBase: 1, fromBase: 1 },
      "kg": { name: "Kilogram", toBase: 1000, fromBase: 0.001 },
      "oz": { name: "Ounce", toBase: 28.349523125, fromBase: 1 / 28.349523125 },
      "lb": { name: "Pound", toBase: 453.59237, fromBase: 1 / 453.59237 },
    }, defaultFrom: "kg", defaultTo: "lb",
  },
  volume: {
    name: "Volume", icon: "\uD83E\uDDEA",
    units: {
      "mL": { name: "Milliliter", toBase: 0.001, fromBase: 1000 },
      "L": { name: "Liter", toBase: 1, fromBase: 1 },
      "fl-oz": { name: "Fluid Ounce", toBase: 0.0295735295625, fromBase: 1 / 0.0295735295625 },
      "cup": { name: "Cup", toBase: 0.2365882365, fromBase: 1 / 0.2365882365 },
      "pt": { name: "Pint", toBase: 0.473176473, fromBase: 1 / 0.473176473 },
      "qt": { name: "Quart", toBase: 0.946352946, fromBase: 1 / 0.946352946 },
      "gal": { name: "Gallon", toBase: 3.785411784, fromBase: 1 / 3.785411784 },
    }, defaultFrom: "L", defaultTo: "gal",
  },
  temperature: {
    name: "Temperature", icon: "\uD83C\uDF21\uFE0F",
    units: {
      "C": { name: "Celsius", toBase: function (v) { return v; }, fromBase: function (v) { return v; } },
      "F": { name: "Fahrenheit", toBase: function (v) { return (v - 32) * 5 / 9; }, fromBase: function (v) { return v * 9 / 5 + 32; } },
      "K": { name: "Kelvin", toBase: function (v) { return v - 273.15; }, fromBase: function (v) { return v + 273.15; } },
    }, defaultFrom: "C", defaultTo: "F",
  },
  digital: {
    name: "Digital Storage", icon: "\uD83D\uDCBE",
    units: {
      "B": { name: "Byte", toBase: 1, fromBase: 1 },
      "KB": { name: "Kilobyte", toBase: 1000, fromBase: 0.001 },
      "KiB": { name: "Kibibyte", toBase: 1024, fromBase: 1 / 1024 },
      "MB": { name: "Megabyte", toBase: 1000000, fromBase: 1 / 1000000 },
      "MiB": { name: "Mebibyte", toBase: 1048576, fromBase: 1 / 1048576 },
      "GB": { name: "Gigabyte", toBase: 1000000000, fromBase: 1 / 1000000000 },
      "GiB": { name: "Gibibyte", toBase: 1073741824, fromBase: 1 / 1073741824 },
      "TB": { name: "Terabyte", toBase: 1000000000000, fromBase: 1 / 1000000000000 },
      "TiB": { name: "Tebibyte", toBase: 1099511627776, fromBase: 1 / 1099511627776 },
    }, defaultFrom: "GB", defaultTo: "GiB",
  },
  speed: {
    name: "Speed", icon: "\uD83D\uDE80",
    units: {
      "m/s": { name: "Meter/second", toBase: 1, fromBase: 1 },
      "km/h": { name: "Kilometer/hour", toBase: 5 / 18, fromBase: 3.6 },
      "mph": { name: "Mile/hour", toBase: 0.44704, fromBase: 1 / 0.44704 },
      "knot": { name: "Knot", toBase: 463 / 900, fromBase: 900 / 463 },
    }, defaultFrom: "km/h", defaultTo: "mph",
  },
  area: {
    name: "Area", icon: "\uD83D\uDCD0",
    units: {
      "mm\u00B2": { name: "Square mm", toBase: 1e-6, fromBase: 1e6 },
      "cm\u00B2": { name: "Square cm", toBase: 1e-4, fromBase: 1e4 },
      "m\u00B2": { name: "Square m", toBase: 1, fromBase: 1 },
      "km\u00B2": { name: "Square km", toBase: 1e6, fromBase: 1e-6 },
      "ft\u00B2": { name: "Square ft", toBase: 0.09290304, fromBase: 1 / 0.09290304 },
      "acre": { name: "Acre", toBase: 4046.8564224, fromBase: 1 / 4046.8564224 },
      "ha": { name: "Hectare", toBase: 10000, fromBase: 0.0001 },
    }, defaultFrom: "m\u00B2", defaultTo: "ft\u00B2",
  },
  currency: {
    name: "Currency", icon: "\uD83D\uDCB0",
    units: {
      "USD": { name: "US Dollar", toBase: 1, fromBase: 1 },
      "EUR": { name: "Euro", toBase: 0.92, fromBase: 1 / 0.92 },
      "GBP": { name: "British Pound", toBase: 0.79, fromBase: 1 / 0.79 },
      "JPY": { name: "Japanese Yen", toBase: 151, fromBase: 1 / 151 },
      "CAD": { name: "Canadian Dollar", toBase: 1.37, fromBase: 1 / 1.37 },
      "AUD": { name: "Australian Dollar", toBase: 1.53, fromBase: 1 / 1.53 },
      "CHF": { name: "Swiss Franc", toBase: 0.88, fromBase: 1 / 0.88 },
      "CNY": { name: "Chinese Yuan", toBase: 7.24, fromBase: 1 / 7.24 },
      "INR": { name: "Indian Rupee", toBase: 83.5, fromBase: 1 / 83.5 },
      "MXN": { name: "Mexican Peso", toBase: 17.2, fromBase: 1 / 17.2 },
      "BRL": { name: "Brazilian Real", toBase: 5.05, fromBase: 1 / 5.05 },
    }, defaultFrom: "USD", defaultTo: "EUR",
  },
};

var UNIT_ALIASES = {
  "millimeter": "mm", "millimeters": "mm", "millimetre": "mm", "millimetres": "mm",
  "centimeter": "cm", "centimeters": "cm", "centimetre": "cm", "centimetres": "cm",
  "meter": "m", "meters": "m", "metre": "m", "metres": "m", "m": "m",
  "kilometer": "km", "kilometers": "km", "kilometre": "km", "kilometres": "km", "km": "km",
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
  "liter": "L", "liters": "L", "litre": "L", "litres": "L", "l": "L", "L": "L",
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
  "m/s": "m/s", "km/h": "km/h", "kph": "km/h",
  "mph": "mph", "knot": "knot", "knots": "knot",
  "square mm": "mm\u00B2", "square millimeter": "mm\u00B2", "square millimeters": "mm\u00B2", "mm2": "mm\u00B2",
  "square cm": "cm\u00B2", "square centimeter": "cm\u00B2", "square centimeters": "cm\u00B2", "cm2": "cm\u00B2",
  "square m": "m\u00B2", "square meter": "m\u00B2", "square meters": "m\u00B2", "square metre": "m\u00B2", "m2": "m\u00B2",
  "square km": "km\u00B2", "square kilometer": "km\u00B2", "square kilometers": "km\u00B2", "km2": "km\u00B2",
  "square ft": "ft\u00B2", "square foot": "ft\u00B2", "square feet": "ft\u00B2", "ft2": "ft\u00B2", "sqft": "ft\u00B2",
  "acre": "acre", "acres": "acre",
  "hectare": "ha", "hectares": "ha", "ha": "ha",
  "usd": "USD", "dollar": "USD", "dollars": "USD", "us dollar": "USD",
  "eur": "EUR", "euro": "EUR", "euros": "EUR",
  "gbp": "GBP", "pound sterling": "GBP",
  "jpy": "JPY", "yen": "JPY", "jpy": "JPY",
  "cad": "CAD", "aud": "AUD", "chf": "CHF",
  "cny": "CNY", "yuan": "CNY",
  "inr": "INR", "rupee": "INR",
  "mxn": "MXN", "peso": "MXN",
  "brl": "BRL", "real": "BRL",
};

function findCategory(unit) {
  for (var id in CATEGORIES) { if (CATEGORIES[id].units[unit]) return id; }
  return null;
}

function resolveUnit(text) {
  text = text.trim().toLowerCase();
  return UNIT_ALIASES[text] || null;
}

function parseQuery(text) {
  text = text.replace(/^(?:convert|conversion)\s+/i, "").trim();
  function tryMatch(p, vi, fi, ti) {
    var m = text.match(p); if (!m) return null;
    var v = vi !== null ? parseFloat(m[vi]) : 1;
    var f = resolveUnit(m[fi]); if (!f) return null;
    var c = findCategory(f); if (!c) return null;
    var t = ti !== null ? resolveUnit(m[ti]) : null;
    if (t) { var tc = findCategory(t); if (tc !== c) return null; }
    return { category: c, value: v, from: f, to: t || CATEGORIES[c].defaultTo };
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

function formatNum(n) {
  if (!isFinite(n)) return "0";
  return parseFloat(n.toPrecision(10)).toString();
}

function buildOptions(cat, selected) {
  var h = "";
  for (var k in cat.units) h += "<option value=\"" + k + "\"" + (k === selected ? " selected" : "") + ">" + cat.units[k].name + " (" + k + ")</option>";
  return h;
}

function buildWidget(parsed) {
  var cat = CATEGORIES[parsed.category]; if (!cat) return "";
  var r = doConvert(parsed.value, parsed.from, parsed.to);
  return "<div class=\"dcw\" data-cat=\"" + parsed.category + "\">"
    + "<div class=\"dcw-bd\">"
    + "<div class=\"dcw-col\"><input class=\"dcw-inp\" data-side=\"left\" value=\"" + formatNum(parsed.value) + "\" inputmode=\"decimal\"><select class=\"dcw-sel\" data-side=\"left\">" + buildOptions(cat, parsed.from) + "</select></div>"
    + "<button class=\"dcw-swap\" title=\"Swap units\">\u21C4</button>"
    + "<div class=\"dcw-col\"><input class=\"dcw-inp\" data-side=\"right\" value=\"" + formatNum(r) + "\" inputmode=\"decimal\"><select class=\"dcw-sel\" data-side=\"right\">" + buildOptions(cat, parsed.to) + "</select></div>"
    + "</div></div>";
}

export default {
  trigger: "convert",
  aliases: ["c", "conv"],
  isClientExposed: false,
  name: "Unit Converter",
  description: "Interactive unit converter. Try: !convert 5ft to m, !c 100 kg to lb",
  settingsSchema: [],
  execute: function (args, ctx) {
    var query = (args || "").trim();
    var parsed = parseQuery(query) || { category: "length", value: 1, from: "m", to: "ft" };
    return { title: "Unit Converter", html: buildWidget(parsed) };
  },
};
