var EULER_MARKER = "\u212F";
var EXP_MARKER = "\u1D07";

var BUTTONS = [
  [
    { label: "Deg", key: "deg", cls: "calc-tog" },
    { label: "Rad", key: "rad", cls: "calc-tog" },
    { label: "x!", key: "fact" },
    { label: "(", key: "(" },
    { label: ")", key: ")" },
    { label: "%", key: "%" },
    { label: "AC", key: "clear", cls: "calc-clr" },
  ],
  [
    { label: "Inv", key: "inv", cls: "calc-tog" },
    { label: "sin", key: "sin" },
    { label: "ln", key: "ln" },
    { label: "7", key: "7" },
    { label: "8", key: "8" },
    { label: "9", key: "9" },
    { label: "\u00F7", key: "/" },
  ],
  [
    { label: "\u03C0", key: "pi" },
    { label: "cos", key: "cos" },
    { label: "log", key: "log" },
    { label: "4", key: "4" },
    { label: "5", key: "5" },
    { label: "6", key: "6" },
    { label: "\u00D7", key: "*" },
  ],
  [
    { label: "e", key: "euler" },
    { label: "tan", key: "tan" },
    { label: "\u221A", key: "sqrt" },
    { label: "1", key: "1" },
    { label: "2", key: "2" },
    { label: "3", key: "3" },
    { label: "-", key: "-" },
  ],
  [
    { label: "Ans", key: "ans" },
    { label: "EXP", key: "exp" },
    { label: "x\u00B2", key: "sq" },
    { label: "0", key: "0" },
    { label: ".", key: "." },
    { label: "=", key: "=", cls: "calc-eq" },
    { label: "+", key: "+" },
  ],
];

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function buildButtonHTML(modeDeg, modeInv) {
  var html = "";
  for (var r = 0; r < BUTTONS.length; r++) {
    html += '<div class="calc-row">';
    for (var c = 0; c < BUTTONS[r].length; c++) {
      var b = BUTTONS[r][c];
      var cls = "calc-btn";
      if (b.cls) cls += " " + b.cls;
      if (b.key === "deg" && modeDeg) cls += " calc-act";
      if (b.key === "rad" && !modeDeg) cls += " calc-act";
      if (b.key === "inv" && modeInv) cls += " calc-act";
      html += '<button class="' + cls + '" data-k="' + b.key + '">' + b.label + "</button>";
    }
    html += "</div>";
  }
  return html;
}

function buildWidget(expr, result, modeDeg, modeInv) {
  return '<div class="calc-w" data-deg="' + (modeDeg ? "1" : "0") + '" data-inv="' + (modeInv ? "1" : "0") + '">'
    + '<div class="calc-disp"><div class="calc-expr">' + esc(expr) + '</div><div class="calc-res">' + esc(result) + '</div></div>'
    + '<div class="calc-btns">' + buildButtonHTML(modeDeg, modeInv) + '</div></div>';
}

function toEvalExpr(s, degMode) {
  s = s.replace(/\u00D7/g, "*").replace(/\u00F7/g, "/");
  s = s.replace(/(\d+)!/g, "fact($1)");
  s = s.replace(/\u03C0/g, "(Math.PI)");
  s = s.replace(/\u212F/g, "(Math.E)");
  s = s.replace(/\u1D07/g, "e");
  s = s.replace(/\^/g, "**");

  var trig = degMode
    ? { asin: "asinDeg(", acos: "acosDeg(", atan: "atanDeg(", sin: "sinDeg(", cos: "cosDeg(", tan: "tanDeg(" }
    : { asin: "Math.asin(", acos: "Math.acos(", atan: "Math.atan(", sin: "Math.sin(", cos: "Math.cos(", tan: "Math.tan(" };
  s = s.replace(/asin\(/g, trig.asin);
  s = s.replace(/acos\(/g, trig.acos);
  s = s.replace(/atan\(/g, trig.atan);
  s = s.replace(/sin\(/g, trig.sin);
  s = s.replace(/cos\(/g, trig.cos);
  s = s.replace(/tan\(/g, trig.tan);
  s = s.replace(/log\(/g, "Math.log10(");
  s = s.replace(/ln\(/g, "Math.log(");
  s = s.replace(/sqrt\(/g, "Math.sqrt(");
  return s;
}

function evaluate(expr, degMode) {
  if (!expr) return NaN;
  var s = toEvalExpr(expr, degMode);
  try {
    var fact = function f(n) { return n <= 1 ? 1 : n * f(n - 1); };
    var sinDeg = function (x) { return Math.sin(x * Math.PI / 180); };
    var cosDeg = function (x) { return Math.cos(x * Math.PI / 180); };
    var tanDeg = function (x) { return Math.tan(x * Math.PI / 180); };
    var asinDeg = function (x) { return Math.asin(x) * 180 / Math.PI; };
    var acosDeg = function (x) { return Math.acos(x) * 180 / Math.PI; };
    var atanDeg = function (x) { return Math.atan(x) * 180 / Math.PI; };
    return new Function("fact", "sinDeg", "cosDeg", "tanDeg", "asinDeg", "acosDeg", "atanDeg", "return (" + s + ")")(
      fact, sinDeg, cosDeg, tanDeg, asinDeg, acosDeg, atanDeg
    );
  } catch (e) { return NaN; }
}

function fmt(n) {
  if (typeof n !== "number" || isNaN(n)) return "Error";
  if (!isFinite(n)) return n > 0 ? "Infinity" : "-Infinity";
  if (Number.isInteger(n) && Math.abs(n) < 1e15) return String(n);
  var s = String(n);
  if (s.length > 20) s = n.toExponential(6).replace(/\.?0+e/, "e");
  return s;
}

export default {
  trigger: "calc",
  aliases: ["calculator"],
  isClientExposed: false,
  name: "Calculator",
  description: "Scientific calculator. Auto-detects math like '2+2' or 'sin(30)'. Try: !calc 2+2, !calc sin(45)",
  settingsSchema: [],
  execute: function (args, ctx) {
    var query = (args || "").trim();
    if (query) {
      try {
        var r = evaluate(query, true);
        return { title: "Calculator", html: buildWidget(query, fmt(r), true, false) };
      } catch (e) {
        return { title: "Calculator", html: buildWidget(query, "Error", true, false) };
      }
    }
    return { title: "Calculator", html: buildWidget("", "0", true, false) };
  },
};
