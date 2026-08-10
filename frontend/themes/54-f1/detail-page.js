(() => {
  "use strict";

  const copy = {
    en: { home: "Home", projects: "Projects", articles: "Articles", contact: "Contact", themes: "Themes", openChannel: "Open radio channel", retry: "Retry connection" },
    zh: { home: "首页", projects: "项目", articles: "文章", contact: "联系", themes: "主题", openChannel: "打开无线电频道", retry: "重新连接" },
  };

  const mount = document.getElementById("detail");
  let titleFocused = false;

  function localize() {
    const strings = copy[CJCData.lang()] || copy.en;
    document.querySelectorAll("[data-copy]").forEach((node) => {
      node.textContent = strings[node.dataset.copy] || node.textContent;
    });
    const retry = mount && mount.querySelector(".cjc-d-retry");
    if (retry && retry.textContent !== strings.retry) retry.textContent = strings.retry;
  }

  function enhanceDetail() {
    if (!mount) return;
    const loading = mount.querySelector(".cjc-d-loading");
    const error = mount.querySelector(".cjc-d-error");
    mount.setAttribute("aria-busy", String(Boolean(loading)));
    if (loading) loading.setAttribute("role", "status");
    if (error) {
      error.setAttribute("role", "alert");
      if (CJCData.queryId() && !error.querySelector(".cjc-d-retry")) {
        const retry = document.createElement("button");
        retry.type = "button";
        retry.className = "cjc-d-retry";
        retry.textContent = copy[CJCData.lang()].retry;
        retry.addEventListener("click", () => window.location.reload());
        error.appendChild(retry);
      }
    }
    const title = mount.querySelector(".cjc-d-title");
    if (title && !titleFocused) {
      title.tabIndex = -1;
      title.focus({ preventScroll: true });
      titleFocused = true;
    }
    const image = mount.querySelector(".cjc-d-cover img");
    if (image) image.decoding = "async";
    localize();
  }

  document.addEventListener("DOMContentLoaded", () => {
    const kind = document.body.dataset.kind === "project" ? "project" : "article";
    const requestedLang = new URLSearchParams(window.location.search).get("lang");
    if (requestedLang === "en" || requestedLang === "zh") CJCData.setLang(requestedLang);
    CJCData.setTheme(window.THEME_ID);
    localize();
    CJCData.onLang(localize);
    new MutationObserver(enhanceDetail).observe(mount, { childList: true, subtree: true });
    CJCData.mountDetail({
      kind,
      mount: "#detail",
      accent: "#e10600",
      backHref: kind === "project" ? "./#projects" : "./#articles",
    });
    enhanceDetail();
  });
})();
