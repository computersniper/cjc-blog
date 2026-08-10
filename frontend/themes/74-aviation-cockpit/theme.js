(() => {
  "use strict";

  const P = CJCData.profile;
  const t = CJCData.t.bind(CJCData);
  const e = CJCData.escapeHtml;
  const safe = (value) => e(value == null ? "" : String(value));

  let projects = [];
  let articles = [];
  let filter = "all";
  let boardMode = "projects";
  let loadingProjects = true;
  let loadingArticles = true;
  let projectsFailed = false;
  let articlesFailed = false;
  let panelDim = false;
  let revealObserver;
  let toastTimer;

  const copy = {
    en: {
      nav: [
        ["profile", "Crew"],
        ["training", "Training"],
        ["experience", "Logbook"],
        ["departures", "Departures"],
        ["projects", "Projects"],
        ["journal", "Journal"],
        ["contact", "Contact"],
      ],
      online: "Portfolio systems online",
      approach: "CJC Flight Deck · Portfolio route established · All presentation systems normal",
      captainLog: "Captain's log",
      flightRecord: "Flight record 2026 / CJC-074",
      pilot: "Pilot",
      position: "Position",
      base: "Base",
      mission: "Mission",
      missionValue: "Build useful systems",
      logStamp: "Verified portfolio record · Data supplied by CJCData",
      checklist: "Presentation checklist",
      checklistId: "CHKLST / PUBLIC SITE",
      data: "Shared data source",
      bilingual: "Bilingual interface",
      projectFeed: "Live project feed",
      contactChannel: "Contact channel",
      checked: "Checked",
      live: "Live",
      ready: "Ready",
      callsign: "Callsign CJC · Guangzhou Control",
      heroLead: "A software portfolio seen from the flight deck: precise systems, clear routes, and a long view beyond the runway.",
      cv: "Open flight record / CV",
      github: "GitHub channel",
      viewBoard: "View departures",
      dim: "Dim instrument panel",
      brighten: "Restore instrument panel",
      dimmed: "Instrument panel dimmed.",
      brightened: "Instrument panel restored.",
      instrument: ["UTC", "SYSTEM", "STACK", "ROUTE", "STATUS"],
      sector: "Sector",
      profile: "Flight crew profile",
      profileLead: "The person, working discipline, and systems thinking behind the console.",
      based: "Based",
      crewStatement: "Building practical products with an engineer's precision and a pilot's situational awareness.",
      training: "Training record",
      trainingLead: "Formal education and the current technical curriculum, filed as a working flight record.",
      academicLog: "Academic flight log",
      record: "Official training record",
      coursework: "Systems coursework",
      module: "Module",
      experience: "Captain's logbook",
      experienceLead: "A real operating record: constraints, responsibilities, and outcomes from applied engineering work.",
      route: ["Architecture", "Data pipeline", "LLM integration", "Metrics"],
      missionChecklist: "Completed mission sectors",
      departures: "Departure board",
      departuresLead: "A mechanical airport board that routes directly into projects, writing, and credentials.",
      projectsTab: "Projects",
      articlesTab: "Journal",
      certificatesTab: "Credentials",
      boardCaption: "Select a row to open its full record",
      flight: "Flight",
      destination: "Destination / record",
      schedule: "Schedule",
      gate: "Gate",
      status: "Status",
      open: "Open",
      filed: "Filed",
      loading: "Loading dispatch data…",
      failed: "Dispatch feed unavailable. The rest of the flight deck remains online.",
      boardUpdated: "Departure board updated",
      projects: "Selected aircraft",
      projectsLead: "Projects built to survive beyond the presentation layer — with routes into the full case studies.",
      viewProject: "Open project record",
      boardingPass: "Project boarding pass",
      gateLabel: "Gate",
      seatLabel: "Seat",
      dateLabel: "Date",
      statusLabel: "Status",
      flightLabel: "Flight",
      admit: "Admit one project",
      journal: "Flight journal",
      journalLead: "Field notes from software engineering, AI systems, algorithms, and the craft of building.",
      read: "Read log entry",
      certificates: "Licences & credentials",
      certificatesLead: "Verified learning and professional milestones filed in the crew archive.",
      contact: "Open a channel",
      contactLead: "For a project, a technical question, or a considered hello — the communication channel is open.",
      email: "Email",
      phone: "Phone",
      wechat: "WeChat",
      name: "Your name",
      emailAddress: "Email address",
      message: "Message",
      send: "Transmit message",
      sending: "Transmitting…",
      sent: "Message received by dispatch.",
      contactFailed: "Transmission failed. Please use the direct email channel.",
      footerAsset: "Flight deck photograph: ‘panel; Citation Excel’ by Global Jet, CC BY 2.0.",
      source: "Source",
      license: "License",
      admin: "Admin panel",
      allRecords: "All portfolio records remain sourced from the shared CJCData layer.",
    },
    zh: {
      nav: [
        ["profile", "乘员档案"],
        ["training", "训练记录"],
        ["experience", "机长日志"],
        ["departures", "航班大屏"],
        ["projects", "项目"],
        ["journal", "文章"],
        ["contact", "联系"],
      ],
      online: "作品集系统在线",
      approach: "CJC 飞行甲板 · 作品集航路已建立 · 展示系统全部正常",
      captainLog: "机长日志",
      flightRecord: "飞行记录 2026 / CJC-074",
      pilot: "机长",
      position: "岗位",
      base: "基地",
      mission: "任务",
      missionValue: "构建真正有用的系统",
      logStamp: "作品集记录已核验 · 数据由 CJCData 提供",
      checklist: "展示前检查单",
      checklistId: "检查单 / 公开站点",
      data: "共享数据源",
      bilingual: "中英双语界面",
      projectFeed: "实时项目数据",
      contactChannel: "联系通道",
      checked: "已检查",
      live: "在线",
      ready: "就绪",
      callsign: "呼号 CJC · 广州管制",
      heroLead: "从飞行甲板观看一份软件作品集：精确的系统、清晰的航路，以及越过跑道的长远视野。",
      cv: "打开飞行履历 / 简历",
      github: "GitHub 通道",
      viewBoard: "查看航班大屏",
      dim: "调暗仪表亮度",
      brighten: "恢复仪表亮度",
      dimmed: "仪表亮度已调暗。",
      brightened: "仪表亮度已恢复。",
      instrument: ["世界时", "系统", "技术栈", "航路", "状态"],
      sector: "航段",
      profile: "飞行乘员档案",
      profileLead: "控制台背后的个人、工作纪律与系统思维。",
      based: "常驻",
      crewStatement: "以工程师的精确和飞行员的态势意识，构建真正实用的产品。",
      training: "训练记录",
      trainingLead: "正式教育与当前技术课程，以持续更新的飞行履历方式归档。",
      academicLog: "学术飞行日志",
      record: "正式训练记录",
      coursework: "系统课程",
      module: "模块",
      experience: "机长工作日志",
      experienceLead: "真实运行记录：应用型工程工作中的约束、职责与成果。",
      route: ["系统架构", "数据管道", "大模型集成", "指标监控"],
      missionChecklist: "已完成任务航段",
      departures: "机场翻牌大屏",
      departuresLead: "黑白机械翻牌航班大屏，直接通往项目、文章与专业凭证。",
      projectsTab: "项目",
      articlesTab: "文章",
      certificatesTab: "证书",
      boardCaption: "选择一行以打开完整记录",
      flight: "航班",
      destination: "目的地 / 记录",
      schedule: "时间",
      gate: "登机口",
      status: "状态",
      open: "打开",
      filed: "归档",
      loading: "正在接收调度数据……",
      failed: "调度数据暂不可用，飞行甲板其他系统仍保持在线。",
      boardUpdated: "航班大屏已更新",
      projects: "精选飞行器",
      projectsLead: "不仅停留在展示层，而是能够真正运行，并可进入完整案例的项目。",
      viewProject: "打开项目记录",
      boardingPass: "项目登机牌",
      gateLabel: "登机口",
      seatLabel: "座位",
      dateLabel: "日期",
      statusLabel: "状态",
      flightLabel: "航班",
      admit: "项目通行票",
      journal: "飞行日志",
      journalLead: "来自软件工程、AI 系统、算法与构建手艺一线的记录。",
      read: "阅读日志",
      certificates: "执照与凭证",
      certificatesLead: "乘员档案中经过核验的学习与专业里程碑。",
      contact: "建立通信",
      contactLead: "无论是项目、技术问题，还是认真地打个招呼——通信频道始终开放。",
      email: "邮箱",
      phone: "电话",
      wechat: "微信",
      name: "你的姓名",
      emailAddress: "邮箱地址",
      message: "留言内容",
      send: "发送消息",
      sending: "正在发送……",
      sent: "调度台已收到消息。",
      contactFailed: "发送失败，请使用邮箱直接联系。",
      footerAsset: "驾驶舱照片：Global Jet 的《panel; Citation Excel》，CC BY 2.0。",
      source: "来源",
      license: "许可协议",
      admin: "后台管理",
      allRecords: "全部个人作品集记录均来自共享 CJCData 数据层。",
    },
  };

  const l = () => copy[CJCData.lang()];

  function sectionHead(number, title, lead) {
    const x = l();
    return `<div class="section-head reveal">
      <div class="section-kicker">${safe(x.sector)} ${String(number).padStart(2, "0")} / 08</div>
      <h2>${safe(title)}</h2>
      <p>${safe(lead)}</p>
    </div>`;
  }

  function hero() {
    const x = l();
    const instrumentValues = ["--:--", "100%", "18", "CJC-74", x.ready];
    return `<section class="flight-hero" id="top" aria-labelledby="hero-title">
      <div class="hero-backdrop">
        <img class="cockpit-photo" src="/themes/74-aviation-cockpit/assets/cockpit-night.jpg" alt="Illuminated civilian aircraft cockpit during a night flight, seen from behind the flight controls" fetchpriority="high" decoding="async">
      </div>
      <div class="approach-strip"><span class="pulse-dot" aria-hidden="true"></span><span>${safe(x.approach)}</span></div>
      <div class="hero-stage shell">
        <aside class="hero-console captain-log" aria-label="${safe(x.captainLog)}">
          <div class="console-head"><span>${safe(x.captainLog)}</span><span>CJC-074</span></div>
          <div class="console-body">
            <div class="log-line"><span>${safe(x.pilot)}</span><strong>${safe(t(P.name))}</strong></div>
            <div class="log-line"><span>${safe(x.position)}</span><strong>${safe(t(P.role))}</strong></div>
            <div class="log-line"><span>${safe(x.base)}</span><strong>${safe(t(P.location))}</strong></div>
            <div class="log-line"><span>${safe(x.mission)}</span><strong>${safe(x.missionValue)}</strong></div>
            <div class="captain-stamp">${safe(x.logStamp)}</div>
            <button class="btn panel-toggle" type="button" id="panel-toggle" aria-pressed="${String(panelDim)}">${safe(panelDim ? x.brighten : x.dim)}</button>
          </div>
        </aside>

        <div class="hero-copy">
          <div class="eyebrow">${safe(x.callsign)} · <time id="hero-clock" datetime=""></time></div>
          <h1 id="hero-title">${safe(t(P.name))}<span>${safe(t(P.role))}</span></h1>
          <p class="hero-title">${safe(x.heroLead)} ${safe(t(P.headline))}</p>
          <p class="hero-role">${safe(t(P.title))}</p>
          <div class="hero-actions">
            <a class="btn primary" href="${safe(t(P.cv))}" download>${safe(x.cv)}</a>
            <a class="btn" href="${safe(P.contact.github)}" target="_blank" rel="noopener">${safe(x.github)}</a>
            <a class="btn" href="#departures">${safe(x.viewBoard)}</a>
          </div>
        </div>

        <aside class="hero-console checklist" aria-label="${safe(x.checklist)}">
          <div class="console-head"><span>${safe(x.checklist)}</span><span>${safe(x.checklistId)}</span></div>
          <div class="console-body">
            <div class="check-line"><span>${safe(x.data)}</span><b>${safe(x.checked)}</b></div>
            <div class="check-line"><span>${safe(x.bilingual)}</span><b>${safe(x.ready)}</b></div>
            <div class="check-line"><span>${safe(x.projectFeed)}</span><b>${safe(x.live)}</b></div>
            <div class="check-line"><span>${safe(x.contactChannel)}</span><b>${safe(x.ready)}</b></div>
          </div>
        </aside>
      </div>
      <div class="instrument-cluster" aria-label="Portfolio system indicators">
        ${x.instrument.map((label, index) => `<div class="instrument" style="--needle:${[-42, -12, 26, 51, 8][index]}deg"><small>${safe(label)}</small><strong${index === 0 ? ' id="instrument-clock"' : ""}>${safe(instrumentValues[index])}</strong></div>`).join("")}
      </div>
    </section>`;
  }

  function profile() {
    const x = l();
    const photo = P.photos && P.photos.city ? P.photos.city : P.avatar;
    return `<section class="section steel" id="profile"><div class="shell">
      ${sectionHead(1, x.profile, x.profileLead)}
      <div class="profile-grid">
        <figure class="portrait-frame reveal">
          <img src="${safe(photo)}" onerror="this.onerror=null;this.src='${safe(P.avatar)}'" alt="${safe(t(P.name))}">
          <figcaption><span>${safe(x.based)}</span><span>${safe(t(P.location))}</span></figcaption>
        </figure>
        <div class="profile-copy reveal">
          <p class="lead">${safe(x.crewStatement)} <em>${safe(t(P.role))}</em></p>
          ${P.bio.map((paragraph) => `<p>${safe(t(paragraph))}</p>`).join("")}
          <div class="tech-rack" aria-label="${safe(t(P.ui.core_tech))}">${P.skillTags.map((skill) => `<span>${safe(skill)}</span>`).join("")}</div>
        </div>
      </div>
    </div></section>`;
  }

  function training() {
    const x = l();
    return `<section class="section dark" id="training"><div class="shell">
      ${sectionHead(2, x.training, x.trainingLead)}
      <div class="education-layout">
        <div class="logbook reveal">
          <div class="logbook-head"><span>${safe(x.academicLog)}</span><span>${safe(x.record)}</span></div>
          ${P.education.map((entry) => `<article class="education-entry">
            <time>${safe(entry.period)}</time>
            <div><h3>${safe(t(entry.school))}</h3><p>${safe(t(entry.degree))}<br>${safe(t(entry.note))}</p></div>
          </article>`).join("")}
        </div>
        <div class="course-console" aria-label="${safe(x.coursework)}">
          ${P.courses.map((course, index) => `<article class="course-card reveal" data-index="${String(index + 1).padStart(2, "0")}">
            <div class="course-code">${safe(x.module)} / ${String(index + 1).padStart(2, "0")}</div>
            <h3>${safe(t(course.title))}</h3>
            <p>${safe(t(course.desc))}</p>
          </article>`).join("")}
        </div>
      </div>
    </div></section>`;
  }

  function experience() {
    const x = l();
    const exp = P.experience[0];
    if (!exp) return "";
    return `<section class="section steel" id="experience"><div class="shell">
      ${sectionHead(3, x.experience, x.experienceLead)}
      <div class="experience-grid">
        <article class="flight-plan reveal">
          <div class="flight-plan-meta"><span>CJC / XNEW / OPS</span><time>${safe(exp.period)}</time></div>
          <h3>${safe(t(exp.role))}</h3>
          <div class="company">${safe(t(exp.company))}</div>
          <p>${safe(t(exp.summary))}</p>
          <div class="route-line" aria-label="${safe(x.missionChecklist)}">
            ${x.route.map((label) => `<span class="route-node">${safe(label)}</span>`).join("")}
          </div>
        </article>
        <ul class="mission-checklist reveal">
          <li class="list-head">${safe(x.missionChecklist)}</li>
          ${exp.bullets.map((bullet) => `<li>${safe(t(bullet))}</li>`).join("")}
        </ul>
      </div>
    </div></section>`;
  }

  function flap(value, offset = 0) {
    const text = String(value || "—").toUpperCase();
    const chars = Array.from(text.slice(0, 34));
    return `<span class="flap-text" aria-hidden="true">${chars.map((char, index) => `<span class="flap-cell${char === " " ? " space" : ""}" style="--flap-index:${index + offset}">${safe(char === " " ? " " : char)}</span>`).join("")}</span><span class="sr-only">${safe(text)}</span>`;
  }

  function boardRows() {
    const x = l();
    if (boardMode === "projects") {
      return projects.slice(0, 7).map((project, index) => ({
        code: `CJC ${String(index + 1).padStart(3, "0")}`,
        title: project.localTitle(),
        schedule: project.dateText ? project.dateText({ month: "short", year: "numeric" }) : "2026",
        gate: (project.tech_stack || "WEB").split(",")[0].slice(0, 12),
        status: x.open,
        href: project.href,
      }));
    }
    if (boardMode === "articles") {
      return articles.slice(0, 7).map((article, index) => ({
        code: `LOG ${String(index + 1).padStart(3, "0")}`,
        title: article.localTitle(),
        schedule: article.dateText ? article.dateText({ month: "short", day: "numeric" }) : "FILED",
        gate: (article.category || "NOTE").slice(0, 12),
        status: x.open,
        href: article.href,
      }));
    }
    return P.certificates.map((certificate, index) => ({
      code: `LIC ${String(index + 1).padStart(3, "0")}`,
      title: t(certificate.title),
      schedule: t(certificate.date),
      gate: t(certificate.tag).slice(0, 12),
      status: x.filed,
      href: "#certificates",
    }));
  }

  function boardIsLoading() {
    return (boardMode === "projects" && loadingProjects) || (boardMode === "articles" && loadingArticles);
  }

  function boardHasFailed() {
    return (boardMode === "projects" && projectsFailed) || (boardMode === "articles" && articlesFailed);
  }

  function board() {
    const x = l();
    return `<section class="section dark" id="departures"><div class="shell">
      ${sectionHead(4, x.departures, x.departuresLead)}
      <div class="board-shell reveal">
        <div class="board-toolbar">
          <div class="board-tabs" role="tablist" aria-label="${safe(x.departures)}">
            <button class="board-tab" type="button" role="tab" data-board="projects" aria-selected="${String(boardMode === "projects")}" aria-controls="departures-table">${safe(x.projectsTab)}</button>
            <button class="board-tab" type="button" role="tab" data-board="articles" aria-selected="${String(boardMode === "articles")}" aria-controls="departures-table">${safe(x.articlesTab)}</button>
            <button class="board-tab" type="button" role="tab" data-board="certificates" aria-selected="${String(boardMode === "certificates")}" aria-controls="departures-table">${safe(x.certificatesTab)}</button>
          </div>
          <time class="board-clock" id="board-clock" datetime=""></time>
        </div>
        <div id="board-content"></div>
        <p class="board-live" id="board-live" aria-live="polite"></p>
      </div>
    </div></section>`;
  }

  function renderBoard(announce = false) {
    const host = document.getElementById("board-content");
    if (!host) return;
    const x = l();
    document.querySelectorAll("[data-board]").forEach((button) => {
      const selected = button.dataset.board === boardMode;
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    if (boardIsLoading()) {
      host.innerHTML = `<p class="board-empty">${safe(x.loading)}</p>`;
      return;
    }
    const rows = boardRows();
    if (boardHasFailed() || !rows.length) {
      host.innerHTML = `<p class="board-empty">${safe(boardHasFailed() ? x.failed : x.loading)}</p>`;
      return;
    }
    host.innerHTML = `<div class="board-scroll" tabindex="0" aria-label="${safe(x.departures)}">
      <table class="departures-board" id="departures-table">
        <caption>${safe(x.boardCaption)}</caption>
        <thead><tr><th>${safe(x.flight)}</th><th>${safe(x.destination)}</th><th>${safe(x.schedule)}</th><th>${safe(x.gate)}</th><th>${safe(x.status)}</th></tr></thead>
        <tbody>${rows.map((row, rowIndex) => `<tr data-href="${safe(row.href)}">
          <td>${flap(row.code, rowIndex)}</td>
          <td><a href="${safe(row.href)}">${flap(row.title, rowIndex + 2)}</a></td>
          <td>${flap(row.schedule, rowIndex + 4)}</td>
          <td>${flap(row.gate, rowIndex + 6)}</td>
          <td>${flap(row.status, rowIndex + 8)}</td>
        </tr>`).join("")}</tbody>
      </table>
    </div>`;
    host.querySelectorAll("tr[data-href]").forEach((row) => row.addEventListener("click", (event) => {
      if (event.target.closest("a")) return;
      const href = row.dataset.href;
      if (href.startsWith("#")) document.querySelector(href)?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
      else window.location.href = href;
    }));
    if (announce) {
      const live = document.getElementById("board-live");
      if (live) live.textContent = `${x.boardUpdated}: ${boardMode === "projects" ? x.projectsTab : boardMode === "articles" ? x.articlesTab : x.certificatesTab}`;
    }
  }

  function projectSection() {
    const x = l();
    let body;
    if (loadingProjects) body = `<p class="loading-note">${safe(t(P.ui.loading_projects))}</p>`;
    else if (projectsFailed) body = `<p class="loading-note">${safe(x.failed)}</p>`;
    else body = `<div class="project-grid">${projects.map((project, index) => {
      const flightNumber = `CJC ${String(index + 1).padStart(3, "0")}`;
      const gate = `A${String((index % 9) + 1).padStart(2, "0")}`;
      const seat = `${String(index + 1).padStart(2, "0")}A`;
      const date = project.dateText ? project.dateText({ month: "short", year: "numeric" }) : "2026";
      return `<a class="project-card boarding-pass reveal" href="${safe(project.href)}" aria-label="${safe(`${x.viewProject}: ${project.localTitle()}`)}">
        <div class="boarding-main">
          <div class="pass-header"><span>${safe(x.boardingPass)}</span><strong>${safe(flightNumber)}</strong></div>
          <figure class="project-image"><img src="${safe(project.cover_image || "/index_page/img/blogs/1.jpg")}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='/index_page/img/blogs/1.jpg'" alt="${safe(project.localTitle())}"><figcaption class="project-flight">${safe(flightNumber)}</figcaption></figure>
          <div class="project-copy">
            <div class="meta">${safe(project.tech_stack || t(P.ui.tech_stack))}</div>
            <h3>${safe(project.localTitle())}</h3><p>${safe(project.localSummary() || "")}</p>
            <dl class="boarding-meta">
              <div><dt>${safe(x.flightLabel)}</dt><dd>${safe(flightNumber)}</dd></div>
              <div><dt>${safe(x.gateLabel)}</dt><dd>${safe(gate)}</dd></div>
              <div><dt>${safe(x.seatLabel)}</dt><dd>${safe(seat)}</dd></div>
              <div><dt>${safe(x.dateLabel)}</dt><dd>${safe(date)}</dd></div>
            </dl>
            <span class="card-action">${safe(x.viewProject)} →</span>
          </div>
        </div>
        <aside class="boarding-stub" aria-label="${safe(`${x.statusLabel}: ${x.ready}`)}">
          <span class="stub-label">${safe(x.admit)}</span>
          <strong>${safe(flightNumber)}</strong>
          <span>${safe(x.gateLabel)} ${safe(gate)}</span>
          <span>${safe(x.seatLabel)} ${safe(seat)}</span>
          <span class="stub-status">${safe(x.ready)}</span>
          <span class="barcode" aria-hidden="true"></span>
        </aside>
      </a>`;
    }).join("")}</div>`;
    return `<section class="section steel" id="projects"><div class="shell">${sectionHead(5, x.projects, x.projectsLead)}${body}</div></section>`;
  }

  function journalSection() {
    const x = l();
    const list = CJCData.filterArticles(articles, filter);
    let body;
    if (loadingArticles) body = `<p class="loading-note">${safe(t(P.ui.loading_articles))}</p>`;
    else if (articlesFailed) body = `<p class="loading-note">${safe(x.failed)}</p>`;
    else if (!list.length) body = `<p class="loading-note">${safe(t(P.ui.no_articles))}</p>`;
    else body = `<div class="article-grid">${list.map((article) => `<article class="article-card reveal">
      <div class="article-meta">${safe(article.category || "LOG")} / ${safe(article.dateText())}</div>
      <img src="${safe(article.cover_image || "/index_page/img/blogs/1.jpg")}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='/index_page/img/blogs/1.jpg'" alt="${safe(article.localTitle())}">
      <h3>${safe(article.localTitle())}</h3><p>${safe(article.localSummary() || "")}</p><a href="${safe(article.href)}">${safe(x.read)} →</a>
    </article>`).join("")}</div>`;
    return `<section class="section dark" id="journal"><div class="shell">${sectionHead(6, x.journal, x.journalLead)}
      <div class="filters" aria-label="Article categories">${P.articleFilters.map((item) => `<button type="button" class="filter-button${filter === item.key ? " active" : ""}" data-filter="${safe(item.key)}" aria-pressed="${String(filter === item.key)}">${safe(t(item.label))}</button>`).join("")}</div>${body}
    </div></section>`;
  }

  function certificates() {
    const x = l();
    return `<section class="section steel" id="certificates"><div class="shell">${sectionHead(7, x.certificates, x.certificatesLead)}
      <div class="certificate-grid">${P.certificates.map((certificate) => `<article class="certificate-card reveal">
        <img src="${safe(certificate.image)}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='/index_page/img/blogs/1.jpg'" alt="${safe(t(certificate.title))}">
        <div class="certificate-copy"><div class="meta">${safe(t(certificate.tag))} / ${safe(t(certificate.date))}</div><h3>${safe(t(certificate.title))}</h3><p>${safe(t(certificate.desc))}</p></div>
      </article>`).join("")}</div>
    </div></section>`;
  }

  function contact() {
    const x = l();
    return `<section class="section dark" id="contact"><div class="shell">${sectionHead(8, x.contact, x.contactLead)}
      <div class="contact-grid">
        <div class="contact-intro reveal"><h3>${safe(t(P.ui.inbox_open))}</h3><p>${safe(x.allRecords)}</p>
          <div class="contact-links">
            <a href="mailto:${safe(P.contact.email)}"><span>${safe(x.email)}</span><span>${safe(P.contact.email)}</span></a>
            <a href="${safe(P.contact.phoneHref)}"><span>${safe(x.phone)}</span><span>${safe(P.contact.phone)}</span></a>
            <a href="${safe(P.contact.github)}" target="_blank" rel="noopener"><span>GitHub</span><span>@${safe(P.contact.githubUser)}</span></a>
            <a href="${safe(P.contact.wechatQrPage)}"><span>${safe(x.wechat)}</span><span>QR CHANNEL</span></a>
          </div>
        </div>
        <form class="contact-form reveal" id="contact-form">
          <input class="honeypot" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
          <div class="field"><label for="contact-name">${safe(x.name)}</label><input id="contact-name" name="name" autocomplete="name" required></div>
          <div class="field"><label for="contact-email">${safe(x.emailAddress)}</label><input id="contact-email" name="email" type="email" autocomplete="email" required></div>
          <div class="field"><label for="contact-message">${safe(x.message)}</label><textarea id="contact-message" name="message" required></textarea></div>
          <button class="btn primary" type="submit">${safe(x.send)}</button>
          <p class="form-status" id="form-status" role="status" aria-live="polite"></p>
        </form>
      </div>
    </div></section>`;
  }

  function render() {
    const x = l();
    document.documentElement.lang = CJCData.lang() === "zh" ? "zh-CN" : "en";
    document.title = `${t(P.name)} — ${x.departures}`;
    document.body.classList.toggle("panel-dim", panelDim);
    document.getElementById("brand-status").textContent = x.online;
    document.getElementById("top-nav").innerHTML = x.nav.map(([id, label]) => `<a href="#${safe(id)}">${safe(label)}</a>`).join("");
    document.getElementById("main-content").innerHTML = hero() + profile() + training() + experience() + board() + projectSection() + journalSection() + certificates() + contact();
    document.getElementById("footer-note").textContent = t(P.ui.footer_desc);
    document.getElementById("footer-links").innerHTML = `<a href="${safe(P.contact.github)}" target="_blank" rel="noopener">GitHub</a><a href="mailto:${safe(P.contact.email)}">${safe(x.email)}</a><a href="${safe(P.contact.wechatQrPage)}">${safe(x.wechat)}</a><a href="/admin.html">${safe(x.admin)}</a><a href="${safe(P.icpUrl)}" target="_blank" rel="noopener">${safe(P.icp)}</a>`;
    document.getElementById("asset-credit").innerHTML = `${safe(x.footerAsset)} <a href="https://www.flickr.com/photos/28143282@N00/436695326" target="_blank" rel="noopener">${safe(x.source)}</a> · <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank" rel="noopener">${safe(x.license)}</a>`;
    wire();
    renderBoard(false);
    updateClocks();
    observeReveals();
  }

  function wire() {
    document.getElementById("panel-toggle")?.addEventListener("click", () => {
      panelDim = !panelDim;
      document.body.classList.toggle("panel-dim", panelDim);
      const button = document.getElementById("panel-toggle");
      button.setAttribute("aria-pressed", String(panelDim));
      button.textContent = panelDim ? l().brighten : l().dim;
      notify(panelDim ? l().dimmed : l().brightened);
    });

    document.querySelectorAll("[data-board]").forEach((button) => button.addEventListener("click", () => {
      boardMode = button.dataset.board;
      renderBoard(true);
    }));

    document.querySelectorAll("[data-filter]").forEach((button) => button.addEventListener("click", () => {
      filter = button.dataset.filter;
      const journal = document.getElementById("journal");
      const top = journal ? journal.getBoundingClientRect().top + window.scrollY : 0;
      render();
      if (top) window.scrollTo({ top, behavior: "auto" });
    }));

    const form = document.getElementById("contact-form");
    if (form) form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const x = l();
      const status = document.getElementById("form-status");
      const button = form.querySelector("button[type='submit']");
      button.disabled = true;
      button.setAttribute("aria-busy", "true");
      status.textContent = x.sending;
      try {
        const response = await CJCData.sendContact({
          name: form.elements.name.value,
          email: form.elements.email.value,
          message: form.elements.message.value,
          website: form.elements.website.value,
        });
        status.textContent = response.message || x.sent;
        form.reset();
      } catch (error) {
        status.textContent = error.message || x.contactFailed;
      } finally {
        button.disabled = false;
        button.removeAttribute("aria-busy");
      }
    });
  }

  function notify(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("show");
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  function updateClocks() {
    const now = new Date();
    const iso = now.toISOString();
    const utc = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: "UTC" });
    const label = `${utc} UTC`;
    ["hero-clock", "board-clock"].forEach((id) => {
      const node = document.getElementById(id);
      if (node) { node.textContent = label; node.dateTime = iso; }
    });
    const instrument = document.getElementById("instrument-clock");
    if (instrument) instrument.textContent = utc.slice(0, 5);
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function observeReveals() {
    if (revealObserver) revealObserver.disconnect();
    const nodes = document.querySelectorAll(".reveal");
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("in"));
      return;
    }
    revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      }
    }), { threshold: .08, rootMargin: "0px 0px -4%" });
    nodes.forEach((node) => revealObserver.observe(node));
  }

  document.addEventListener("DOMContentLoaded", async () => {
    CJCData.setTheme(window.THEME_ID);
    render();
    CJCData.mountSwitcher({ accent: "#f4ac45" });
    CJCData.onLang(render);
    window.setInterval(updateClocks, 1000);

    const [projectResult, articleResult] = await Promise.allSettled([
      CJCData.fetchProjects(),
      CJCData.fetchArticles(),
    ]);
    loadingProjects = false;
    loadingArticles = false;
    if (projectResult.status === "fulfilled") projects = projectResult.value;
    else projectsFailed = true;
    if (articleResult.status === "fulfilled") articles = articleResult.value;
    else articlesFailed = true;
    render();
  });
})();
