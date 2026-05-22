(function () {
  var SELECTOR = ".result-item";
  var RESULTS_ID = "results-list";
  var SELECTED_CLASS = "hotkey-selected";

  var selectedIndex = -1;
  var results = [];

  function queryResults() {
    var el = document.getElementById(RESULTS_ID);
    results = el ? Array.from(el.querySelectorAll(SELECTOR)) : [];
    return results;
  }

  function updateVisuals() {
    var els = document.querySelectorAll("." + SELECTED_CLASS);
    for (var i = 0; i < els.length; i++) els[i].classList.remove(SELECTED_CLASS);
    if (selectedIndex >= 0 && selectedIndex < results.length) {
      results[selectedIndex].classList.add(SELECTED_CLASS);
    }
  }

  function selectNext() {
    queryResults();
    if (!results.length) return;
    if (selectedIndex < 0) selectedIndex = 0;
    else if (selectedIndex < results.length - 1) selectedIndex++;
    updateVisuals();
    scrollToSelected();
  }

  function selectPrev() {
    queryResults();
    if (!results.length) return;
    if (selectedIndex < 0) selectedIndex = 0;
    else if (selectedIndex > 0) selectedIndex--;
    updateVisuals();
    scrollToSelected();
  }

  function scrollToSelected() {
    if (selectedIndex >= 0 && selectedIndex < results.length) {
      results[selectedIndex].scrollIntoView({ block: "nearest" });
    }
  }

  function getSelectedLink() {
    if (selectedIndex < 0 || selectedIndex >= results.length) return null;
    return results[selectedIndex].querySelector(".degoog-result--title");
  }

  function openSelected() {
    var link = getSelectedLink();
    if (link) link.click();
  }

  function openSelectedNewTab() {
    var link = getSelectedLink();
    if (link) window.open(link.href, "_blank");
  }

  function copySelectedLink() {
    var link = getSelectedLink();
    if (!link) return;
    var url = link.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).catch(function () {
        fallbackCopy(url);
      });
    } else {
      fallbackCopy(url);
    }
  }

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta);
  }

  function clearSelection() {
    selectedIndex = -1;
    updateVisuals();
  }

  function isEditable(el) {
    if (!el || !el.tagName) return false;
    var tag = el.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
    if (el.isContentEditable) return true;
    return false;
  }

  function blurEditable() {
    var el = document.activeElement;
    if (el && isEditable(el)) {
      el.blur();
      return true;
    }
    return false;
  }

  document.addEventListener("degoog-results-ready", function () {
    selectedIndex = -1;
    queryResults();
    updateVisuals();
  });

  document.addEventListener("keydown", function (e) {
    var key = e.key;
    var shift = e.shiftKey;

    if (key === "Escape") {
      if (selectedIndex >= 0) {
        e.preventDefault();
        clearSelection();
      }
      blurEditable();
      return;
    }

    if (isEditable(e.target)) return;

    if (key === "j" && !shift) {
      e.preventDefault();
      selectNext();
      return;
    }

    if (key === "k" && !shift) {
      e.preventDefault();
      selectPrev();
      return;
    }

    if (key === "o" || key === "Enter") {
      if (selectedIndex >= 0) {
        e.preventDefault();
        openSelected();
      }
      return;
    }

    if (key === "t" && !shift) {
      if (selectedIndex >= 0) {
        e.preventDefault();
        openSelectedNewTab();
      }
      return;
    }

    if (key === "y" && !shift) {
      if (selectedIndex >= 0) {
        e.preventDefault();
        copySelectedLink();
      }
      return;
    }

    if (key === "q" && !shift) {
      e.preventDefault();
      window.close();
      return;
    }

    if ((key === "g" || key === "G") && !shift) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if ((key === "g" || key === "G") && shift) {
      e.preventDefault();
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
      return;
    }
  });
})();
