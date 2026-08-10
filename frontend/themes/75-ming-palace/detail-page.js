(function () {
  "use strict";

  var kind = document.body.dataset.kind === "project" ? "project" : "article";
  var mount = document.getElementById("detail");
  var focused = false;
  var copy = {
    en: {
      skip: "Skip to record",
      brand: "CaiJiechao · Vermilion Archive",
      works: "Hall of Works",
      memorials: "Memorial Archive",
      contact: "Correspondence",
      themes: "Themes",
      articleKicker: "MEMORIAL / FULL RECORD",
      projectKicker: "WORK / FULL RECORD",
      articlePlace: "A memorial unfolded along the palace axis.",
      projectPlace: "A work presented for inspection in the court ledger.",
      articleBack: "Return to memorials",
      projectBack: "Return to works",
      retry: "Retrieve again",
      empty: "The folio contains no body text. Return to the archive for another record.",
      footer: "A contemporary portfolio preserved in a Ming-inspired court register."
    },
    zh: {
      skip: "跳至卷宗正文",
      brand: "CaiJiechao · 朱明宫藏",
      works: "造物之殿",
      memorials: "奏议文库",
      contact: "通函之殿",
      themes: "切换主题",
      articleKicker: "奏议 / 完整册页",
      projectKicker: "造物 / 完整册页",
      articlePlace: "沿宫廷中轴展开的一份技术奏议。",
      projectPlace: "呈入造物册、等待查阅的一项当代作品。",
      articleBack: "返回奏议文库",
      projectBack: "返回造物之殿",
      retry: "重新调取",
      empty: "此册页暂无正文，请返回文库查阅其他记录。",
      footer: "以明代宫廷册页秩序珍藏的当代个人作品集。"
    }
  };

  function L() { return copy[CJCData.lang()]; }
  function sectionHref() { return kind === "project" ? "./#projects" : "./#articles"; }

  function renderChrome() {
    var c = L();
    document.querySelectorAll("[data-detail-copy]").forEach(function (node) {
      var key = node.dataset.detailCopy;
      node.textContent = c[key] || "";
    });
    var kicker = document.getElementById("detail-kicker");
    var place = document.getElementById("detail-place");
    if (kicker) kicker.textContent = kind === "project" ? c.projectKicker : c.articleKicker;
    if (place) place.textContent = kind === "project" ? c.projectPlace : c.articlePlace;
    var back = mount.querySelector(".cjc-d-back");
    if (back) {
      var backText = kind === "project" ? c.projectBack : c.articleBack;
      if (back.getAttribute("href") !== sectionHref()) back.setAttribute("href", sectionHref());
      if (back.textContent !== backText) back.textContent = backText;
    }
    var retry = mount.querySelector(".cjc-d-retry");
    if (retry && retry.textContent !== c.retry) retry.textContent = c.retry;
    var empty = mount.querySelector(".cjc-d-body p:only-child");
    if (empty && !empty.textContent.trim() && !empty.querySelector("img,video,iframe")) {
      empty.textContent = c.empty;
      empty.closest(".cjc-d-body").classList.add("is-empty");
    }
  }

  function enhanceDetail() {
    var loading = mount.querySelector(".cjc-d-loading");
    var error = mount.querySelector(".cjc-d-error");
    mount.setAttribute("aria-busy", loading ? "true" : "false");
    if (loading) { loading.setAttribute("role", "status"); loading.setAttribute("aria-live", "polite"); }
    if (error) {
      error.setAttribute("role", "alert");
      if (CJCData.queryId() && !error.querySelector(".cjc-d-retry")) {
        var retry = document.createElement("button");
        retry.type = "button";
        retry.className = "cjc-d-retry";
        retry.textContent = L().retry;
        retry.addEventListener("click", function () { window.location.reload(); });
        error.appendChild(retry);
      }
    }
    var title = mount.querySelector(".cjc-d-title");
    if (title && !focused) { title.tabIndex = -1; title.focus({ preventScroll: true }); focused = true; }
    var image = mount.querySelector(".cjc-d-cover img");
    if (image) { image.decoding = "async"; image.loading = "lazy"; }
    var readFull = mount.querySelector(".cjc-d-readfull");
    if (readFull) readFull.remove();
    renderChrome();
  }

  document.addEventListener("error", function (event) {
    if (event.target instanceof HTMLImageElement && event.target.closest(".cjc-d-cover")) {
      event.target.closest(".cjc-d-cover").hidden = true;
    }
  }, true);

  document.addEventListener("DOMContentLoaded", function () {
    var paramLang = new URLSearchParams(window.location.search).get("lang");
    if (paramLang === "en" || paramLang === "zh") CJCData.setLang(paramLang);
    CJCData.setTheme(window.THEME_ID);
    renderChrome();
    new MutationObserver(enhanceDetail).observe(mount, { childList: true, subtree: true });
    CJCData.mountDetail({ kind: kind, mount: mount, accent: "#8f1719", backHref: sectionHref() });
    CJCData.onLang(renderChrome);
    enhanceDetail();
  });
})();
