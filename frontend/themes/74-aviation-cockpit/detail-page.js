(() => {
  "use strict";

  const P = CJCData.profile;
  const safe = CJCData.escapeHtml;
  const mount = document.getElementById("detail");
  let titleFocused = false;

  const copy = {
    en: {
      systems: "Systems online", home: "Home", profile: "Crew", training: "Training", experience: "Logbook",
      departures: "Departures", projects: "Projects", journal: "Journal", certificates: "Credentials", contact: "Contact",
      openChannel: "Open communication channel", skipProject: "Skip to project record", skipArticle: "Skip to journal record",
      route: "Route", status: "Status", projectRoute: "CJC / Project archive", articleRoute: "CJC / Journal archive",
      cleared: "Cleared", filed: "Filed", flightRecord: "Flight record", recordNumber: "Record number",
      projectRecord: "Project operations record", articleRecord: "Flight journal record",
      projectLead: "A complete engineering case file, cleared for review from the CJC flight deck.",
      articleLead: "A complete field note from software engineering, AI systems, and the craft of building.",
      system: "System", online: "Online", recordType: "Record type", project: "Project", article: "Journal", language: "Language",
      routePlan: "Route plan", origin: "Origin", destination: "Destination", clearance: "Clearance",
      projectArchive: "Project archive", journalArchive: "Journal archive", backProjects: "Back to projects", backJournal: "Back to journal",
      channels: "Communication channels", email: "Email", phone: "Phone", wechat: "WeChat",
      retry: "Retry data link", backHome: "← Home", loadingTitle: "Establishing data link",
      loadingBody: "Requesting the selected flight record from dispatch.", missingTitle: "Record number required",
      missingBody: "No record id was supplied. Return to the archive and select a filed record.", failedTitle: "Dispatch link unavailable",
      failedBody: "The record could not be loaded. Check the connection or retry the data link.", emptyTitle: "Record filed without details",
      emptyBody: "This record exists, but no detailed briefing has been filed yet.",
      primaryNav: "Primary navigation", recordIdentifier: "Flight record identifier", sidebarLabel: "Record route and contact channels",
      technicalBriefing: "Technical briefing",
    },
    zh: {
      systems: "系统在线", home: "首页", profile: "乘员", training: "训练", experience: "日志",
      departures: "航班", projects: "项目", journal: "文章", certificates: "证书", contact: "联系",
      openChannel: "打开通信频道", skipProject: "跳到项目记录", skipArticle: "跳到文章记录",
      route: "航路", status: "状态", projectRoute: "CJC / 项目档案", articleRoute: "CJC / 文章档案",
      cleared: "已放行", filed: "已归档", flightRecord: "飞行记录", recordNumber: "记录编号",
      projectRecord: "项目运行记录", articleRecord: "飞行日志记录",
      projectLead: "来自 CJC 飞行甲板、已获准审阅的完整工程案例档案。",
      articleLead: "来自软件工程、AI 系统与产品构建实践的一份完整现场记录。",
      system: "系统", online: "在线", recordType: "记录类型", project: "项目", article: "文章", language: "语言",
      routePlan: "航路计划", origin: "出发地", destination: "目的地", clearance: "放行状态",
      projectArchive: "项目档案", journalArchive: "文章档案", backProjects: "返回项目", backJournal: "返回文章",
      channels: "通信频道", email: "邮箱", phone: "电话", wechat: "微信",
      retry: "重试数据链路", backHome: "← 返回主页", loadingTitle: "正在建立数据链路",
      loadingBody: "正在向调度系统请求所选飞行记录。", missingTitle: "需要记录编号",
      missingBody: "当前链接没有记录 id，请返回档案区并选择一条已归档记录。", failedTitle: "调度链路不可用",
      failedBody: "无法加载该记录，请检查网络连接或重试数据链路。", emptyTitle: "记录尚无详细内容",
      emptyBody: "该记录已经存在，但尚未提交详细简报。",
      primaryNav: "主导航", recordIdentifier: "飞行记录编号", sidebarLabel: "记录航路与通信频道",
      technicalBriefing: "技术简报",
    },
  };

  function strings() {
    return copy[CJCData.lang()] || copy.en;
  }

  function renderChannels() {
    const host = document.getElementById("detail-channels");
    if (!host) return;
    const x = strings();
    const channels = [
      [x.email, P.contact.email, `mailto:${P.contact.email}`, false],
      [x.phone, P.contact.phone, P.contact.phoneHref, false],
      ["GitHub", `@${P.contact.githubUser}`, P.contact.github, true],
      [x.wechat, "QR CHANNEL", P.contact.wechatQrPage, false],
    ];
    host.innerHTML = channels.map(([label, value, href, external]) =>
      `<a href="${safe(href)}"${external ? ' target="_blank" rel="noopener"' : ""}><span>${safe(label)}</span><strong>${safe(value)}</strong></a>`
    ).join("");
  }

  function localize() {
    const x = strings();
    document.querySelectorAll("[data-copy]").forEach((node) => {
      const next = x[node.dataset.copy];
      if (next && node.textContent !== next) node.textContent = next;
    });
    document.querySelectorAll("[data-state-copy]").forEach((node) => {
      const next = x[node.dataset.stateCopy];
      if (next && node.textContent !== next) node.textContent = next;
    });
    document.querySelectorAll("[data-aria-copy]").forEach((node) => {
      const next = x[node.dataset.ariaCopy];
      if (next && node.getAttribute("aria-label") !== next) node.setAttribute("aria-label", next);
    });
    const briefing = mount && mount.querySelector(".cjc-d-body");
    if (briefing) briefing.dataset.briefing = x.technicalBriefing;
    const lang = document.getElementById("detail-language");
    if (lang) lang.textContent = CJCData.lang() === "zh" ? "ZH-CN" : "EN-US";
    const retry = mount && mount.querySelector(".cjc-d-retry");
    if (retry && retry.textContent !== x.retry) retry.textContent = x.retry;
    renderChannels();
  }

  function renderLoadingState(loading) {
    if (loading.dataset.enhanced === "true") return;
    loading.dataset.enhanced = "true";
    loading.setAttribute("role", "status");
    loading.innerHTML = '<span class="state-beacon" aria-hidden="true"></span>' +
      '<strong data-state-copy="loadingTitle"></strong><span data-state-copy="loadingBody"></span>';
  }

  function renderErrorState(error) {
    if (error.dataset.enhanced === "true") return;
    const hasId = Boolean(CJCData.queryId());
    const back = error.querySelector(".cjc-d-back");
    error.dataset.enhanced = "true";
    error.dataset.state = hasId ? "failed" : "missing";
    error.setAttribute("role", "alert");
    error.textContent = "";
    const beacon = document.createElement("span");
    beacon.className = "state-beacon warning";
    beacon.setAttribute("aria-hidden", "true");
    const title = document.createElement("strong");
    title.dataset.stateCopy = hasId ? "failedTitle" : "missingTitle";
    const body = document.createElement("span");
    body.dataset.stateCopy = hasId ? "failedBody" : "missingBody";
    error.append(beacon, title, body);
    if (back) {
      back.dataset.stateCopy = "backHome";
      error.appendChild(back);
    }
    if (hasId) {
      const retry = document.createElement("button");
      retry.type = "button";
      retry.className = "cjc-d-retry";
      retry.addEventListener("click", () => window.location.reload());
      error.appendChild(retry);
    }
  }

  function renderEmptyState(body) {
    if (body.dataset.emptyChecked === "true") return;
    body.dataset.emptyChecked = "true";
    const hasMeaningfulContent = body.textContent.trim() || body.querySelector("img, video, iframe, pre, table");
    if (hasMeaningfulContent) return;
    body.classList.add("cjc-d-empty");
    body.innerHTML = '<span class="state-beacon warning" aria-hidden="true"></span>' +
      '<strong data-state-copy="emptyTitle"></strong><span data-state-copy="emptyBody"></span>';
  }

  function enhanceDetail() {
    if (!mount) return;
    const loading = mount.querySelector(".cjc-d-loading");
    const error = mount.querySelector(".cjc-d-error");
    mount.setAttribute("aria-busy", String(Boolean(loading)));
    if (loading) renderLoadingState(loading);
    if (error) renderErrorState(error);
    const body = mount.querySelector(".cjc-d-body");
    if (body) renderEmptyState(body);
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

  function updateClock() {
    const clock = document.getElementById("detail-utc");
    if (clock) clock.textContent = new Date().toISOString().slice(11, 19);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const kind = document.body.dataset.kind === "project" ? "project" : "article";
    const requestedLang = new URLSearchParams(window.location.search).get("lang");
    if (requestedLang === "en" || requestedLang === "zh") CJCData.setLang(requestedLang);
    CJCData.setTheme(window.THEME_ID);
    const record = document.getElementById("record-number");
    const rawId = CJCData.queryId();
    const id = rawId ? String(rawId).replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 12) : "---";
    if (record) record.textContent = `CJC-074-${kind === "project" ? "P" : "L"}${id.padStart(3, "0")}`;
    localize();
    updateClock();
    window.setInterval(updateClock, 1000);
    CJCData.onLang(localize);
    new MutationObserver(enhanceDetail).observe(mount, { childList: true, subtree: true });
    CJCData.mountDetail({
      kind,
      mount: "#detail",
      accent: "#f4ac45",
      backHref: kind === "project" ? "./#projects" : "./#journal",
    });
    enhanceDetail();
  });
})();
