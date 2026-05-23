(function () {
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
    return '<div class="calc-w" data-auto="1" data-deg="' + (modeDeg ? "1" : "0") + '" data-inv="' + (modeInv ? "1" : "0") + '">'
      + '<div class="calc-disp"><div class="calc-expr">' + esc(expr) + '</div><div class="calc-res">' + esc(result) + '</div></div>'
      + '<div class="calc-btns">' + buildButtonHTML(modeDeg, modeInv) + '</div></div>';
  }

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function toDisplay(s) { return String(s).replace(/\u212F/g, "e").replace(/\u1D07/g, "e"); }

  function toDisplay(s) { return String(s).replace(/\u212F/g, "e").replace(/\u1D07/g, "e"); }

  function toEvalExpr(s, degMode) {
    s = s.replace(/\u00D7/g, "*").replace(/\u00F7/g, "/");
    s = s.replace(/(\d+)!/g, "fact($1)");
    s = s.replace(/\u03C0/g, "(Math.PI)");
    s = s.replace(/\u212F/g, "(Math.E)"); // Euler marker
    s = s.replace(/\u1D07/g, "e"); // EXP marker
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
    var s = n.toPrecision(12);
    s = s.replace(/\.?0+e/, "e").replace(/\.0+$/, "");
    if (s.length > 16) s = n.toExponential(6).replace(/\.?0+e/, "e");
    return s;
  }

  function isMathQuery(text) {
    var s = text.trim();
    if (!s || s.length > 60) return false;
    if (/^[\d\+\-\*\/\(\)\%\^\.\s\u00D7\u00F7\u03C0\u212F]+$/.test(s)) return true;
    if (/\b(sin|cos|tan|sqrt|log|ln|pi|factorial|euler)\b/i.test(s)) return true;
    if (/[\u03C0]/.test(s)) return true;
    return false;
  }

  function getQuery() {
    var inp = document.getElementById("results-search-input");
    if (inp && inp.value) return inp.value;
    try { var q = new URLSearchParams(window.location.search).get("q"); if (q) return decodeURIComponent(q.replace(/\+/g, " ")); } catch (e) {}
    return "";
  }

  function handleBtn(w, key) {
    var exprEl = w.querySelector(".calc-expr");
    var resEl = w.querySelector(".calc-res");
    var deg = w.dataset.deg === "1";
    var inv = w.dataset.inv === "1";
    var expr = w.dataset.expr || "";
    var lastIsDigit = expr.length > 0 && /[\d\.]$/.test(expr);
    var lastIsOp = expr.length > 0 && /[\+\-\*\/\%]$/.test(expr);

    var ops = ["+", "-", "*", "/", "%"];

    function setExpr(s) { w.dataset.expr = s; exprEl.textContent = toDisplay(s); }
    function setRes(s) { resEl.textContent = s; }
    function evalAndShow(e) {
      var r = evaluate(e, deg);
      setRes(fmt(r));
      if (isFinite(r)) w.dataset.ans = String(r);
    }
    function toggleAttr(name, on) { w.dataset[name] = on ? "1" : "0"; }

    if (key === "clear") { setExpr(""); setRes("0"); return; }

    if (key === "=") { if (expr) evalAndShow(expr); return; }

    if (key === "deg") { if (!deg) { toggleAttr("deg", true); toggleAttr("inv", false); rebuild(w); } return; }
    if (key === "rad") { if (deg) { toggleAttr("deg", false); toggleAttr("inv", false); rebuild(w); } return; }
    if (key === "inv") { toggleAttr("inv", !inv); rebuild(w); return; }

    if (key === "ans") {
      var a = w.dataset.ans;
      if (a) { setExpr(expr + a); evalAndShow(expr + a); }
      return;
    }

    if (ops.indexOf(key) >= 0) {
      var ne = lastIsOp ? expr.slice(0, -1) + key : expr + key;
      setExpr(ne);
      return;
    }

    if (key === ".") {
      if (lastIsDigit || lastIsOp || !expr) { setExpr(expr + "."); }
      return;
    }

    if (key === "(") { setExpr(expr + "("); return; }
    if (key === ")") { setExpr(expr + ")"); return; }

    if (key === "0") { setExpr(expr + "0"); evalAndShow(expr + "0"); return; }
    if (key >= "1" && key <= "9") { setExpr(expr + key); evalAndShow(expr + key); return; }

    if (key === "pi") { setExpr(expr + "\u03C0"); evalAndShow(expr + "\u03C0"); return; }
    if (key === "euler") { setExpr(expr + EULER_MARKER); evalAndShow(expr + EULER_MARKER); return; }
    if (key === "exp") { setExpr(expr + EXP_MARKER); evalAndShow(expr + EXP_MARKER); return; }

    if (key === "sq") { setExpr(expr + "^2"); evalAndShow(expr + "^2"); return; }
    if (key === "fact") { setExpr(expr + "!"); evalAndShow(expr + "!"); return; }

    if (key === "sin" || key === "cos" || key === "tan" || key === "ln" || key === "log" || key === "sqrt") {
      var fn = key === "sin" && inv ? "asin" : key === "cos" && inv ? "acos" : key === "tan" && inv ? "atan" : key;
      setExpr(expr + fn + "(");
      return;
    }
  }

  function rebuild(w) {
    var exprEl = w.querySelector(".calc-expr");
    var resEl = w.querySelector(".calc-res");
    var expr = w.dataset.expr || "";
    var res = resEl.textContent;
    var deg = w.dataset.deg === "1";
    var inv = w.dataset.inv === "1";
    var btns = w.querySelector(".calc-btns");
    btns.innerHTML = buildButtonHTML(deg, inv);
    initBtns(w);
  }

  function initBtns(w) {
    w.querySelectorAll(".calc-btn").forEach(function (btn) {
      btn.addEventListener("click", function () { handleBtn(w, this.dataset.k); });
    });
  }

  function initWidget(w) {
    if (w.dataset.calcInited) return;
    w.dataset.calcInited = "1";
    if (!w.dataset.ans) w.dataset.ans = "";
    if (!w.dataset.expr) {
      var exprEl = w.querySelector(".calc-expr");
      w.dataset.expr = exprEl.textContent;
    }
    initBtns(w);
  }

  function doAutoDetect() {
    var old = document.querySelector('.calc-w[data-auto="1"]');
    if (old && old.parentNode) old.parentNode.removeChild(old);

    var q = getQuery();
    if (!q || q.startsWith("!")) return;
    var clean = q.replace(/^convert\s+/i, "").trim();
    if (!isMathQuery(clean)) return;

    var target = document.getElementById("results-main");
    if (!target) return;
    var ref = document.getElementById("at-a-glance") || target.firstChild;

    var expr = clean;
    var r = evaluate(clean, true);
    var html = buildWidget(expr, fmt(r), true, false);
    var temp = document.createElement("div");
    temp.innerHTML = html;
    var el = temp.firstElementChild;
    target.insertBefore(el, ref);
    initWidget(el);
  }

  function initRemaining() {
    document.querySelectorAll('.calc-w:not([data-calc-inited])').forEach(initWidget);
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
