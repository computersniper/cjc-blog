/*
 * CJC React Bits adapter — framework-free algorithms for the static theme set.
 * Adapted from React Bits commit c7109dccb42e06592d1d9bc50bc87204697240e2.
 * See /THIRD_PARTY_NOTICES.txt for the upstream license notice.
 */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  var spotlightBound = new WeakSet();
  var magnetBound = new WeakSet();
  var observed = new WeakSet();
  var revealObserver = null;
  var themePresets = {
    "54-f1": {
      accent: "#e10600",
      rules: [[".hero h1", "gradient-text"], [".hero .btn", "magnet star-border"], [".section-head", "reveal"], [".card", "spotlight reveal"]]
    },
    "57-cardrive": {
      accent: "#d53b32",
      rules: [[".hero h1", "blur-text"], [".hero .btn", "magnet"], [".section-head", "reveal"], [".project,.article", "spotlight reveal"]]
    },
    "73-cardrive-motion": {
      accent: "#d9793f",
      rules: [[".hero h1", "blur-text gradient-text"], [".hero .btn,.video-toggle", "magnet star-border"], [".section-head", "reveal"], [".project,.article", "spotlight reveal"]]
    },
    "74-aviation-cockpit": {
      accent: "#f2a640",
      rules: [[".hero-title", "blur-text gradient-text"], [".btn", "magnet"], [".section-head", "reveal"], [".project-card,.article-card,.course-card", "spotlight reveal"], [".instrument", "reveal"], [".board-live", "shiny-text"]]
    },
    "75-ming-palace": {
      accent: "#c9a44a",
      rules: [[".hero h1", "blur-text gradient-text"], [".nav-toggle", "magnet"], [".section-heading", "reveal"], [".project-card,.article-card,.certificate-card", "spotlight reveal"]]
    },
    "76-jinyiwei": {
      accent: "#a91f24",
      rules: [[".hero h1", "blur-text"], [".nav-toggle", "magnet star-border"], [".section-head", "reveal"], [".file-grid > *", "spotlight reveal"], [".token", "shiny-text"]]
    }
  };

  function effects(node) {
    return (node.getAttribute("data-rb") || "").split(/\s+/).filter(Boolean);
  }

  function paintSpotlight(node, event) {
    var rect = node.getBoundingClientRect();
    node.style.setProperty("--rb-x", (event.clientX - rect.left) + "px");
    node.style.setProperty("--rb-y", (event.clientY - rect.top) + "px");
  }

  function bindSpotlight(node) {
    if (spotlightBound.has(node) || reduceMotion.matches || !finePointer.matches) return;
    spotlightBound.add(node);
    var frame = 0;
    var latest = null;
    node.addEventListener("pointermove", function (event) {
      latest = event;
      if (frame) return;
      frame = requestAnimationFrame(function () {
        if (latest) paintSpotlight(node, latest);
        latest = null;
        frame = 0;
      });
    }, { passive: true });
  }

  function bindMagnet(node) {
    if (magnetBound.has(node) || reduceMotion.matches || !finePointer.matches) return;
    magnetBound.add(node);
    var frame = 0;
    var nextX = 0;
    var nextY = 0;
    function paint() {
      node.style.setProperty("--rb-magnet-x", nextX + "px");
      node.style.setProperty("--rb-magnet-y", nextY + "px");
      frame = 0;
    }
    function queue() {
      if (!frame) frame = requestAnimationFrame(paint);
    }
    node.addEventListener("pointermove", function (event) {
      var rect = node.getBoundingClientRect();
      nextX = Math.max(-14, Math.min(14, (event.clientX - rect.left - rect.width / 2) * .16));
      nextY = Math.max(-10, Math.min(10, (event.clientY - rect.top - rect.height / 2) * .16));
      node.classList.add("rb-interacting");
      queue();
    }, { passive: true });
    function reset() {
      nextX = 0;
      nextY = 0;
      node.classList.remove("rb-interacting");
      queue();
    }
    node.addEventListener("pointerleave", reset);
    node.addEventListener("blur", reset, true);
  }

  function ensureObserver() {
    if (revealObserver || reduceMotion.matches) return revealObserver;
    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("rb-visible", "rb-in-view");
        } else {
          entry.target.classList.remove("rb-in-view");
        }
      });
    }, { threshold: .08, rootMargin: "0px 0px -5% 0px" });
    return revealObserver;
  }

  function observe(node) {
    if (observed.has(node)) return;
    observed.add(node);
    if (reduceMotion.matches) {
      node.classList.add("rb-visible");
      return;
    }
    ensureObserver().observe(node);
  }

  function enhance(node) {
    var list = effects(node);
    if (list.indexOf("spotlight") !== -1) bindSpotlight(node);
    if (list.indexOf("magnet") !== -1) bindMagnet(node);
    if (list.some(function (name) {
      return name === "reveal" || name === "blur-text" || name === "gradient-text" || name === "shiny-text" || name === "star-border";
    })) observe(node);
  }

  function refresh(root) {
    var scope = root && root.querySelectorAll ? root : document;
    if (scope.matches && scope.matches("[data-rb]")) enhance(scope);
    scope.querySelectorAll("[data-rb]").forEach(enhance);
  }

  function applyThemePreset(themeId, root) {
    var preset = themePresets[themeId];
    var scope = root && root.querySelectorAll ? root : document;
    if (!preset) {
      refresh(scope);
      return;
    }
    preset.rules.forEach(function (rule) {
      scope.querySelectorAll(rule[0]).forEach(function (node) {
        var current = effects(node);
        rule[1].split(/\s+/).forEach(function (name) {
          if (current.indexOf(name) === -1) current.push(name);
        });
        node.setAttribute("data-rb", current.join(" "));
        node.style.setProperty("--rb-accent", preset.accent);
      });
    });
    refresh(scope);
  }

  function destroy(root) {
    var scope = root && root.querySelectorAll ? root : document;
    scope.querySelectorAll("[data-rb]").forEach(function (node) {
      if (revealObserver) revealObserver.unobserve(node);
      node.classList.remove("rb-visible", "rb-in-view", "rb-interacting");
      node.style.removeProperty("--rb-x");
      node.style.removeProperty("--rb-y");
      node.style.removeProperty("--rb-magnet-x");
      node.style.removeProperty("--rb-magnet-y");
    });
  }

  window.CJCReactBits = { mount: refresh, refresh: refresh, destroy: destroy, applyThemePreset: applyThemePreset };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { refresh(document); }, { once: true });
  } else {
    refresh(document);
  }
})();
