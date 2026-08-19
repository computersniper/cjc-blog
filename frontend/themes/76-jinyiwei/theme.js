(function () {
  "use strict";
  var P = CJCData.profile;
  var t = CJCData.t.bind(CJCData);
  var e = CJCData.escapeHtml;
  var projects = [], articles = [], filter = "all", observer, archiveOpen = false;
  var loadState = { projects: "loading", articles: "loading" };
  var copy = {
    en: {
      nav: [["profile", "Subject"], ["training", "Training"], ["experience", "Field Work"], ["missions", "Missions"], ["reports", "Reports"], ["awards", "Awards"], ["contact", "Channel"]],
      classified: "IMPERIAL ARCHIVE / RESTRICTED ACCESS",
      archiveNo: "FILE · CJC / 2026 / 076",
      intro: "A software portfolio re-cut as a restrained cinematic intelligence archive: night rain, iron, cinnabar, and facts.",
      guardAlt: "Ming dynasty Jinyiwei imperial guards in brocade uniforms and armour",
      guardCaption: "Jiajing-era imperial guard detail",
      bladeLabel: "Xiuchun dao · command blade",
      bladeAlt: "Seventeenth-century Chinese saber and scabbard, used as a historical reference for a Xiuchun dao",
      bladeCaption: "17th-century Chinese saber / The Met Open Access",
      feiyuAlt: "Cropped detail of richly patterned Ming guard robes from the Jiajing-era painting",
      feiyuTitle: "Feiyu robe · textile study",
      feiyuNote: "Brocade study only; no specific official rank is asserted.",
      feiyuTags: ["Flying-fish motif", "Cloud & wave border", "Yesa layering", "Waist token"],
      credits: "Image credits",
      unseal: "Unseal archive", seal: "Seal archive", cv: "Retrieve résumé",
      profile: "Subject Profile", profileLead: "Identity, motive, and working method recorded without embellishment.",
      location: "Current station", status: "Status", active: "Active / Building",
      training: "Training Ledger", trainingLead: "Education, technical equipment, and six disciplines under active study.",
      gear: "Technical equipment", courses: "Training disciplines",
      mission: "Field Assignment", missionLead: "One professional deployment, documented by duty and result.",
      projects: "Mission Files", projectsLead: "Live project records, opened directly from the portfolio service.",
      reports: "Intelligence Reports", reportsLead: "Filtered technical writing and research notes from the live archive.",
      awards: "Commendation Register", awardsLead: "Certificates and milestones retained as verifiable evidence.",
      contact: "Secure Channel", contactLead: "Open a direct channel for software, agent systems, or collaboration.",
      inspect: "Inspect file", read: "Read report", fail: "Archive link unavailable. Retry shortly.", retry: "Retry link", noProjects: "No mission files have been authorized yet.", noArticles: "No intelligence reports have been filed yet.", menu: "Open archive index", closeMenu: "Close archive index",
      name: "Contact name", email: "Return address", message: "Message / intelligence", send: "Transmit", sending: "Encrypting and transmitting…", sent: "Transmission received.", skip: "Skip to content"
    },
    zh: {
      nav: [["profile", "人员卷宗"], ["training", "校阅录"], ["experience", "差遣"], ["missions", "案卷"], ["reports", "密报"], ["awards", "功册"], ["contact", "联络"]],
      classified: "御前案牍 / 限定查阅",
      archiveNo: "密档 · CJC / 2026 / 076",
      intro: "将软件作品集剪辑成一部克制的电影式密档：夜雨、冷铁、朱砂与确凿事实。",
      guardAlt: "身着锦衣与甲胄的明代锦衣卫人物画",
      guardCaption: "嘉靖朝锦衣卫仪仗人物",
      bladeLabel: "绣春刀 · 奉命之刃",
      bladeAlt: "十七世纪中国佩刀与刀鞘，作为绣春刀的历史视觉参考",
      bladeCaption: "十七世纪中国佩刀 / 大都会艺术博物馆开放资源",
      feiyuAlt: "从嘉靖朝锦衣卫人物画中裁取的明代锦纹袍服细节",
      feiyuTitle: "飞鱼服 · 织造细节档案",
      feiyuNote: "仅作锦纹与服饰结构研究，不据此标注具体官阶。",
      feiyuTags: ["飞鱼纹意象", "云气海水边饰", "曳撒层次", "腰牌语汇"],
      credits: "图像授权",
      unseal: "启封密档", seal: "封存密档", cv: "调取简历",
      profile: "人员卷宗", profileLead: "不加粉饰地记录身份、志向与工作方式。",
      location: "现驻之地", status: "在案状态", active: "在职 / 构建中",
      training: "校阅名录", trainingLead: "教育背景、技术器用与持续研习的六门专业训练。",
      gear: "技术器用", courses: "六门校阅",
      mission: "差遣实录", missionLead: "一段真实的专业任务，以职责与成果为凭。",
      projects: "行动案卷", projectsLead: "从作品服务实时调取并可直接查阅的项目记录。",
      reports: "缇骑密报", reportsLead: "来自实时档案、可按类别筛选的技术文章与研究札记。",
      awards: "勘合功册", awardsLead: "将证书与里程碑作为可核验的证据留档。",
      contact: "密线联络", contactLead: "就软件、智能体系统或未来合作开启一条直接通道。",
      inspect: "查阅案卷", read: "读取密报", fail: "档案线路暂不可用，请稍后重试。", retry: "重连线路", noProjects: "行动案卷尚未获准入档。", noArticles: "缇骑密报尚未录入。", menu: "展开密档目录", closeMenu: "收起密档目录",
      name: "联络人姓名", email: "回信地址", message: "来函 / 情报", send: "加密传递", sending: "正在加密传递……", sent: "传递已经收讫。", skip: "跳至正文"
    }
  };
  function L() { return copy[CJCData.lang()]; }
  function head(key, number) { var x = L(); return '<div class="section-head reveal"><div class="case-number">CASE_' + String(number).padStart(2, "0") + ' / BZF</div><div><h2>' + e(x[key]) + '</h2><p>' + e(x[key + "Lead"] || "") + '</p></div></div>'; }

  function hero() {
    var x = L();
  return '<section class="hero" id="top"><div class="hero-copy"><div class="classification">' + e(x.classified) + '</div><div><div class="eyebrow">' + e(x.archiveNo) + '</div><h1>' + e(t(P.name)) + '<span>' + e(t(P.role)) + '</span></h1><p class="hero-intro">' + e(x.intro) + ' ' + e(t(P.headline)) + '.</p><div class="hero-actions"><a class="action primary" href="' + e(t(P.cv)) + '" download><i class="fa fa-file-text-o" aria-hidden="true"></i>' + e(x.cv) + '</a><a class="action" href="' + e(P.contact.github) + '" target="_blank" rel="noopener"><i class="fa fa-github" aria-hidden="true"></i>GitHub</a></div></div><div class="hero-foot"><div><div class="eyebrow">' + e(x.status) + '</div><p>' + e(x.active) + '</p></div><div><div class="eyebrow">' + e(x.location) + '</div><p>' + e(t(P.location)) + '</p></div></div></div><div class="case-stage"><figure class="warrior-plate"><img src="/themes/76-jinyiwei/assets/jinyiwei-ming-dynasty.jpg" decoding="async" alt="' + e(x.guardAlt) + '"><figcaption><span>PERSONNEL / JIAJING</span><strong>' + e(x.guardCaption) + '</strong></figcaption></figure><figure class="feiyu-detail"><div class="feiyu-crop"><img src="/themes/76-jinyiwei/assets/jinyiwei-ming-dynasty.jpg" decoding="async" alt="' + e(x.feiyuAlt) + '"><span class="textile-reticle" aria-hidden="true"></span></div><figcaption><strong>' + e(x.feiyuTitle) + '</strong><small>' + e(x.feiyuNote) + '</small><span class="textile-tags">' + x.feiyuTags.map(function (tag) { return '<i>' + e(tag) + '</i>'; }).join("") + '</span></figcaption></figure><figure class="xiuchun-dao"><img src="/themes/76-jinyiwei/assets/chinese-saber-17c-met.jpg" decoding="async" alt="' + e(x.bladeAlt) + '"><figcaption><strong>' + e(x.bladeLabel) + '</strong><span>' + e(x.bladeCaption) + '</span></figcaption></figure><div class="case-stamp"><span>锦衣亲军都指挥使司</span><b>076</b></div><div class="seal-cover" aria-hidden="true"><span class="seal-corner seal-corner-a"></span><span class="seal-corner seal-corner-b"></span><span class="seal-file-no">IMPERIAL ARCHIVE · CJC / 076</span><strong class="seal-title">锦衣卫<br>御前密档</strong><span class="seal-rule"></span><span class="seal-subtitle">北镇抚司 · 限定查阅</span><span class="seal-cord"></span><span class="seal-wax"><i>封</i></span></div><button class="action primary unseal" type="button" data-unseal aria-pressed="false">' + e(x.unseal) + '</button></div></section>';
  }

  function profile() {
    var x = L(), photo = (P.photos && P.photos.city) || P.avatarAlt || P.avatar;
  return '<section class="section" id="profile"><div class="wrap">' + head("profile", 1) + '<div class="profile-grid reveal"><figure class="waist-token"><img src="' + e(photo) + '" loading="lazy" decoding="async" alt="' + e(t(P.name)) + ' in ' + e(t(P.location)) + '"><figcaption>ID / ' + e(t(P.name)) + ' · ' + e(t(P.role)) + '</figcaption></figure><div class="profile-copy"><div class="eyebrow">' + e(t(P.title)) + '</div><p>' + e(t(P.bio[0])) + '</p><p>' + e(t(P.bio[1])) + '</p><div class="profile-meta"><span>' + e(x.location) + ' · ' + e(t(P.location)) + '</span><span>' + e(P.contact.email) + '</span></div></div></div></div></section>';
  }

  function training() {
    var x = L();
    return '<section class="section" id="training"><div class="wrap">' + head("training", 2) + '<div class="ledger reveal">' + P.education.map(function (v) { return '<article class="ledger-card"><time>' + e(v.period) + '</time><h3>' + e(t(v.school)) + '</h3><p><strong>' + e(t(v.degree)) + '</strong><br>' + e(t(v.note)) + '</p></article>'; }).join("") + '</div><div class="gear reveal"><div class="gear-label"><div class="eyebrow">GEAR / STACK</div><h3>' + e(x.gear) + '</h3></div><div class="gear-list">' + P.skillTags.map(function (v) { return '<span>' + e(v) + '</span>'; }).join("") + '</div></div><div class="case-number" style="margin:40px 0 14px">' + e(x.courses) + '</div><div class="training reveal">' + P.courses.map(function (v) { return '<article class="training-card"><i class="fa ' + e(v.icon) + '" aria-hidden="true"></i><h3>' + e(t(v.title)) + '</h3><p>' + e(t(v.desc)) + '</p></article>'; }).join("") + '</div></div></section>';
  }

  function mission() {
    var v = P.experience[0];
    return '<section class="section mission" id="experience"><div class="wrap">' + head("mission", 3) + '<div class="mission-sheet reveal"><div class="mission-meta">' + e(v.period) + '<br>' + e(t(v.company)) + '</div><div class="mission-body"><h3>' + e(t(v.role)) + '</h3><p>' + e(t(v.summary)) + '</p><ul class="mission-list">' + v.bullets.map(function (b) { return '<li>' + e(t(b)) + '</li>'; }).join("") + '</ul></div></div></div></section>';
  }

  function projectSection() {
    var x = L();
    var body;
    if (loadState.projects === "loading") body = '<div class="archive-state is-loading" role="status"><span class="state-mark" aria-hidden="true"></span><p>' + e(t(P.ui.loading_projects)) + '</p></div>';
    else if (loadState.projects === "error") body = '<div class="archive-state is-error" role="alert"><p>' + e(x.fail) + '</p><button class="action" type="button" data-retry="projects">' + e(x.retry) + '</button></div>';
    else if (!projects.length) body = '<div class="archive-state is-empty"><span class="empty-stamp" aria-hidden="true">空卷</span><p>' + e(x.noProjects) + '</p></div>';
  else body = '<div class="file-grid reveal">' + projects.map(function (p, i) { var cover = p.cover_image || "/index_page/img/blogs/1.jpg"; return '<a class="case-file" href="' + e(p.detailHref) + '"><img loading="lazy" decoding="async" src="' + e(cover) + '" onerror="this.onerror=null;this.src=\'/index_page/img/blogs/1.jpg\'" alt="' + e(p.localTitle()) + '"><div class="file-copy"><div class="file-meta">MISSION_' + String(i + 1).padStart(2, "0") + ' · ' + e(p.dateText()) + '</div><h3>' + e(p.localTitle()) + '</h3><p>' + e(p.localSummary() || "") + '</p><span class="file-action">' + e(x.inspect) + ' →</span></div></a>'; }).join("") + '</div>';
    return '<section class="section" id="missions"><div class="wrap">' + head("projects", 4) + body + '</div></section>';
  }

  function reportSection() {
    var x = L(), list = CJCData.filterArticles(articles, filter), body;
    if (loadState.articles === "loading") body = '<div class="archive-state is-loading" role="status"><span class="state-mark" aria-hidden="true"></span><p>' + e(t(P.ui.loading_articles)) + '</p></div>';
    else if (loadState.articles === "error") body = '<div class="archive-state is-error" role="alert"><p>' + e(x.fail) + '</p><button class="action" type="button" data-retry="articles">' + e(x.retry) + '</button></div>';
    else if (!articles.length) body = '<div class="archive-state is-empty"><span class="empty-stamp" aria-hidden="true">空卷</span><p>' + e(x.noArticles) + '</p></div>';
    else if (!list.length) body = '<p class="loading">' + e(t(P.ui.no_articles)) + '</p>';
  else body = '<div class="file-grid reveal">' + list.map(function (a, i) { var cover = a.cover_image || "/index_page/img/blogs/1.jpg"; return '<a class="case-file" href="' + e(a.detailHref) + '"><img loading="lazy" decoding="async" src="' + e(cover) + '" onerror="this.onerror=null;this.src=\'/index_page/img/blogs/1.jpg\'" alt="' + e(a.localTitle()) + '"><div class="file-copy"><div class="file-meta">REPORT_' + String(i + 1).padStart(2, "0") + ' · ' + e(a.category || "INTEL") + ' · ' + e(a.dateText()) + '</div><h3>' + e(a.localTitle()) + '</h3><p>' + e(a.localSummary() || "") + '</p><span class="file-action">' + e(x.read) + ' →</span></div></a>'; }).join("") + '</div>';
    return '<section class="section" id="reports"><div class="wrap">' + head("reports", 5) + '<div class="filters" aria-label="Report categories">' + P.articleFilters.map(function (f) { return '<button type="button" data-filter="' + e(f.key) + '" aria-pressed="' + String(filter === f.key) + '" class="' + (filter === f.key ? "active" : "") + '">' + e(t(f.label)) + '</button>'; }).join("") + '</div>' + body + '</div></section>';
  }

  function awards() {
  return '<section class="section" id="awards"><div class="wrap">' + head("awards", 6) + '<div class="commendations reveal">' + P.certificates.map(function (v) { return '<article class="commendation"><img loading="lazy" decoding="async" src="' + e(v.image) + '" alt="' + e(t(v.title)) + '"><div><div class="file-meta">' + e(t(v.tag)) + ' · ' + e(t(v.date)) + '</div><h3>' + e(t(v.title)) + '</h3><p>' + e(t(v.desc)) + '</p></div></article>'; }).join("") + '</div></div></section>';
  }

  function contact() {
    var x = L();
    return '<section class="section contact-section" id="contact"><div class="wrap">' + head("contact", 7) + '<div class="contact-grid reveal"><div class="secure-channels"><a href="mailto:' + e(P.contact.email) + '"><span>Email</span><span>' + e(P.contact.email) + '</span></a><a href="' + e(P.contact.phoneHref) + '"><span>Phone</span><span>' + e(P.contact.phone) + '</span></a><a href="' + e(P.contact.github) + '" target="_blank" rel="noopener"><span>GitHub</span><span>@' + e(P.contact.githubUser) + '</span></a><a href="' + e(P.contact.wechatQrPage) + '"><span>WeChat</span><span>QR</span></a></div><form class="archive-form" id="contact-form"><input type="text" name="website" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px" aria-hidden="true"><label for="name">' + e(x.name) + '</label><input id="name" name="name" autocomplete="name" required><label for="email">' + e(x.email) + '</label><input id="email" type="email" name="email" autocomplete="email" required><label for="message">' + e(x.message) + '</label><textarea id="message" name="message" required></textarea><button class="action primary" type="submit">' + e(x.send) + '</button><p class="status" id="status" role="status" aria-live="polite"></p></form></div></div></section>';
  }

  function render() {
    var x = L();
    document.title = "Jinyiwei Archive · " + t(P.name);
    document.querySelector(".skip").textContent = x.skip;
    document.getElementById("brand").textContent = P.brand;
    document.getElementById("nav").innerHTML = x.nav.map(function (v) { return '<a href="#' + e(v[0]) + '">' + e(v[1]) + '</a>'; }).join("");
    var navToggleLabel = document.querySelector(".nav-toggle-label");
    var navToggle = document.getElementById("nav-toggle");
    if (navToggleLabel) navToggleLabel.textContent = navToggle && navToggle.getAttribute("aria-expanded") === "true" ? x.closeMenu : x.menu;
    document.getElementById("main").innerHTML = hero() + profile() + training() + mission() + projectSection() + reportSection() + awards() + contact();
    var heroNode = document.querySelector(".hero"), unsealNode = document.querySelector("[data-unseal]");
    if (heroNode) heroNode.classList.toggle("archive-open", archiveOpen);
    if (unsealNode) { unsealNode.setAttribute("aria-pressed", String(archiveOpen)); unsealNode.textContent = archiveOpen ? x.seal : x.unseal; }
    document.getElementById("footer-brand").textContent = P.brand + " · ARCHIVE 76";
    document.getElementById("footer-note").textContent = t(P.ui.footer_desc);
    document.getElementById("footer-links").innerHTML = '<a href="' + e(P.contact.github) + '">GitHub</a><a href="mailto:' + e(P.contact.email) + '">Email</a><a href="/themes/76-jinyiwei/ASSET_LICENSE.md">' + e(x.credits) + '</a><a href="/admin.html">' + e(t(P.ui.admin_panel)) + '</a><a href="' + e(P.icpUrl) + '">' + e(P.icp) + '</a>';
    wire(); observe();
    if (window.CJCReactBits) CJCReactBits.applyThemePreset(window.THEME_ID, document.getElementById("main"));
  }

  function wire() {
    var navToggle = document.getElementById("nav-toggle"), nav = document.getElementById("nav");
    if (navToggle && nav) {
      navToggle.onclick = function () { var open = navToggle.getAttribute("aria-expanded") !== "true"; navToggle.setAttribute("aria-expanded", String(open)); nav.classList.toggle("is-open", open); navToggle.querySelector(".nav-toggle-label").textContent = open ? L().closeMenu : L().menu; };
      nav.querySelectorAll("a").forEach(function (link) { link.addEventListener("click", function () { navToggle.setAttribute("aria-expanded", "false"); nav.classList.remove("is-open"); navToggle.querySelector(".nav-toggle-label").textContent = L().menu; }); });
    }
    var unseal = document.querySelector("[data-unseal]");
    if (unseal) unseal.addEventListener("click", function () { var heroNode = document.querySelector(".hero"); archiveOpen = !archiveOpen; heroNode.classList.toggle("archive-open", archiveOpen); unseal.setAttribute("aria-pressed", String(archiveOpen)); unseal.textContent = archiveOpen ? L().seal : L().unseal; });
    document.querySelectorAll("[data-filter]").forEach(function (button) { button.addEventListener("click", function () { var nextFilter = button.dataset.filter; filter = nextFilter; render(); var restored = Array.from(document.querySelectorAll("[data-filter]")).find(function (node) { return node.dataset.filter === nextFilter; }); if (restored) restored.focus({ preventScroll: true }); }); });
    document.querySelectorAll("[data-retry]").forEach(function (button) { button.addEventListener("click", function () { loadContent(button.dataset.retry); }); });
    var form = document.getElementById("contact-form");
    if (form) form.addEventListener("submit", async function (event) { event.preventDefault(); var status = document.getElementById("status"), button = form.querySelector("button[type=submit]"); button.disabled = true; status.textContent = L().sending; try { var result = await CJCData.sendContact({ name: form.name.value, email: form.email.value, message: form.message.value, website: form.website.value }); status.textContent = result.message || L().sent; form.reset(); } catch (error) { status.textContent = error.message || L().fail; } finally { button.disabled = false; } });
  }
  function loadContent(kind) { loadState[kind] = "loading"; render(); var request = kind === "projects" ? CJCData.fetchProjects() : CJCData.fetchArticles(); return request.then(function (items) { if (kind === "projects") projects = items || []; else articles = items || []; loadState[kind] = "ready"; render(); }).catch(function () { loadState[kind] = "error"; render(); }); }
  function observe() { if (matchMedia("(prefers-reduced-motion: reduce)").matches) { document.querySelectorAll(".reveal").forEach(function (n) { n.classList.add("in"); }); return; } if (observer) observer.disconnect(); observer = new IntersectionObserver(function (entries) { entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.classList.add("in"); observer.unobserve(entry.target); } }); }, { threshold: .1 }); document.querySelectorAll(".reveal").forEach(function (n) { observer.observe(n); }); }
  document.addEventListener("DOMContentLoaded", async function () { CJCData.setTheme(window.THEME_ID); render(); CJCData.mountSwitcher({ accent: "#a91f24" }); CJCData.onLang(render); await Promise.allSettled([loadContent("projects"), loadContent("articles")]); });
})();
