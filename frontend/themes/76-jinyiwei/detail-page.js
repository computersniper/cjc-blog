(function () {
  "use strict";

  var kind = document.body.dataset.kind === "project" ? "project" : "article";
  var mount = document.getElementById("detail");
  var focused = false;
  var copy = {
    en: {
      skip: "Skip to classified record",
      brand: "CJCData · Northern Bureau",
      missions: "Mission Files",
      reports: "Reports",
      contact: "Secure Channel",
      themes: "Change theme",
      articleKicker: "INTELLIGENCE REPORT / FULL FILE",
      projectKicker: "MISSION DOSSIER / FULL FILE",
      articlePlace: "A technical report released from the restricted archive.",
      projectPlace: "An operational build opened as an evidence dossier.",
      articleBack: "Return to reports",
      projectBack: "Return to mission files",
      retry: "Reconnect archive",
      empty: "No body evidence is attached to this file. Return to the index for another record.",
      footer: "Night rain, cold iron, cinnabar, and verifiable work."
    },
    zh: {
      skip: "跳至密档正文",
      brand: "CJCData · 北镇抚司",
      missions: "行动案卷",
      reports: "缇骑密报",
      contact: "密线联络",
      themes: "切换主题",
      articleKicker: "缇骑密报 / 完整档案",
      projectKicker: "行动案卷 / 完整档案",
      articlePlace: "从限定档案中调出的技术密报。",
      projectPlace: "作为证据卷宗启封的一项真实构建。",
      articleBack: "返回缇骑密报",
      projectBack: "返回行动案卷",
      retry: "重连档案线路",
      empty: "此卷未附正文证据，请返回目录查阅其他记录。",
      footer: "夜雨、冷铁、朱砂，以及可核验的真实作品。"
    }
  };

  function L() { return copy[CJCData.lang()]; }
  function sectionHref() { return kind === "project" ? "./#missions" : "./#reports"; }

  function renderChrome() {
    var c = L();
    document.querySelectorAll("[data-detail-copy]").forEach(function (node) {
      node.textContent = c[node.dataset.detailCopy] || "";
    });
    document.getElementById("detail-kicker").textContent = kind === "project" ? c.projectKicker : c.articleKicker;
    document.getElementById("detail-place").textContent = kind === "project" ? c.projectPlace : c.articlePlace;
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
    if (image) image.decoding = "async";
    renderChrome();
  }

  document.addEventListener("error", function (event) {
    if (event.target instanceof HTMLImageElement && event.target.closest(".cjc-d-cover")) event.target.closest(".cjc-d-cover").hidden = true;
  }, true);

  document.addEventListener("DOMContentLoaded", function () {
    var paramLang = new URLSearchParams(window.location.search).get("lang");
    if (paramLang === "en" || paramLang === "zh") CJCData.setLang(paramLang);
    CJCData.setTheme(window.THEME_ID);
    renderChrome();
    new MutationObserver(enhanceDetail).observe(mount, { childList: true, subtree: true });
    CJCData.mountDetail({ kind: kind, mount: mount, accent: "#a91f24", backHref: sectionHref() });
    CJCData.onLang(renderChrome);
    enhanceDetail();
  });
})();
