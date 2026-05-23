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

  function findCategory(unit) {
    for (var id in CATEGORIES) {
      if (CATEGORIES[id].units[unit]) return id;
    }
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
    if (widget.dataset.dcwInited) return;

    var leftInput = widget.querySelector('[data-side="left"].dcw-inp');
    var rightInput = widget.querySelector('[data-side="right"].dcw-inp');
    var leftSelect = widget.querySelector('[data-side="left"].dcw-sel');
    var rightSelect = widget.querySelector('[data-side="right"].dcw-sel');
    var swapBtn = widget.querySelector(".dcw-swap");

    if (!leftInput || !rightInput || !leftSelect || !rightSelect || !swapBtn) return;

    widget.dataset.dcwInited = "1";
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

  function initAll() {
    var widgets = document.querySelectorAll(".dcw");
    for (var i = 0; i < widgets.length; i++) initWidget(widgets[i]);
  }

  document.addEventListener("degoog-results-ready", function () {
    setTimeout(initAll, 50);
  });

  var mo = new MutationObserver(function () {
    if (document.querySelector(".dcw:not([data-dcw-inited])")) initAll();
  });
  mo.observe(document.body || document.documentElement, { childList: true, subtree: true });

  if (document.querySelector(".dcw")) initAll();
})();
