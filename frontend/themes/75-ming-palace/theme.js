(function () {
  "use strict";

  var P = CJCData.profile;
  var t = CJCData.t.bind(CJCData);
  var esc = CJCData.escapeHtml;
  var projects = [];
  var articles = [];
  var filterKey = "all";
  var loadState = { projects: "loading", articles: "loading" };
  var observer;

  var copy = {
    en: {
      nav: [["about", "Audience Hall"], ["studies", "Royal Academy"], ["projects", "Works"], ["articles", "Memorials"], ["contact", "Correspondence"]],
      court: "The Vermilion Court · Portfolio No. 75",
      intro: "A contemporary body of work arranged along a ceremonial axis.",
      palaceAlt: "The Hall of Supreme Harmony beyond its marble terraces and central courtyard axis",
      folio: "Personal folio",
      folioNote: "A contemporary maker recorded at the edge of the court.",
      credits: "Image credits",
      palace: "Enter the court",
      close: "Close the gates",
      cv: "Read the résumé",
      about: "Audience Hall",
      aboutLead: "A formal introduction, composed with clarity and measure.",
      located: "Seat of practice",
      studies: "Royal Academy",
      studiesLead: "Education, disciplines, and the instruments of a modern craft.",
      education: "Scholarly registers",
      skills: "Cabinet of tools",
      courses: "Six fields of study",
      experience: "Edict of Practice",
      experienceLead: "Professional work recorded through responsibility and result.",
      projects: "Hall of Works",
      projectsLead: "Selected systems and products retrieved from the live archive.",
      articles: "Memorial Archive",
      articlesLead: "Technical observations, research notes, and considered arguments.",
      certificates: "Treasury of Merit",
      certificatesLead: "Milestones and honours preserved as verified records.",
      contact: "Hall of Correspondence",
      contactLead: "Open a considered exchange about software, agents, or future work.",
      open: "Inspect work",
      read: "Open memorial",
      fail: "The archive is temporarily unavailable. Please return shortly.",
      retry: "Retry archive",
      noProjects: "No works are recorded in this hall yet.",
      noArticles: "No memorials have been entered in the archive yet.",
      menu: "Open court directory",
      closeMenu: "Close court directory",
      name: "Your name",
      email: "Email address",
      message: "Your message",
      send: "Dispatch correspondence",
      sending: "Dispatching…",
      sent: "Your correspondence has been received.",
      skip: "Skip to content"
    },
    zh: {
      nav: [["about", "奉天殿"], ["studies", "文华阁"], ["projects", "造物"], ["articles", "奏议"], ["contact", "通函"]],
      court: "朱明宫阙 · 主题第七十五号",
      intro: "以宫廷中轴的庄重秩序，陈列一组属于当代的作品。",
      palaceAlt: "太和殿、汉白玉丹陛与宫廷中轴院落",
      folio: "人物册页",
      folioNote: "将当代创作者安置在宫廷空间边缘的一页官档。",
      credits: "图像授权",
      palace: "启门入朝",
      close: "阖门归序",
      cv: "阅览简历",
      about: "奉天殿",
      aboutLead: "以清晰、克制而郑重的方式，呈上一份自我陈述。",
      located: "常驻之地",
      studies: "文华阁",
      studiesLead: "求学经历、专业训练，以及构成现代技艺的器用。",
      education: "学籍册录",
      skills: "百工器库",
      courses: "六门专修",
      experience: "履职诰录",
      experienceLead: "以职责与成果，记录真实的专业实践。",
      projects: "造物之殿",
      projectsLead: "从实时作品档案中调取的系统与产品。",
      articles: "奏议文库",
      articlesLead: "技术观察、研究札记与经过推敲的观点。",
      certificates: "功册宝匣",
      certificatesLead: "将里程碑与荣誉作为可核验的记录妥善珍藏。",
      contact: "通函之殿",
      contactLead: "欢迎就软件、智能体或未来合作展开一场郑重交流。",
      open: "查阅作品",
      read: "展开奏议",
      fail: "档案暂时无法调取，请稍后再来。",
      retry: "重新调取",
      noProjects: "造物之殿尚未录入作品。",
      noArticles: "奏议文库尚未收录文章。",
      menu: "展开宫门导览",
      closeMenu: "收起宫门导览",
      name: "尊姓大名",
      email: "电子信函",
      message: "来函正文",
      send: "发出通函",
      sending: "正在递送……",
      sent: "来函已经收讫。",
      skip: "跳至正文"
    }
  };

  function L() { return copy[CJCData.lang()]; }
  function head(key, number) {
    var x = L();
    return '<div class="section-heading reveal"><div class="section-index">' + String(number).padStart(2, "0") + ' / 08 · MING</div><div><h2>' + esc(x[key]) + '</h2><p>' + esc(x[key + "Lead"] || "") + '</p></div></div>';
  }

  function hero() {
    var x = L();
    var photo = (P.photos && P.photos.campus) || P.avatar;
  return '<section class="hero" id="top"><div class="palace-scene"><img class="palace-photo" src="/themes/75-ming-palace/assets/hall-of-supreme-harmony-courtyard-source.jpg" alt="' + esc(x.palaceAlt) + '" fetchpriority="high" decoding="async"><div class="palace-vignette" aria-hidden="true"></div><div class="scene-eaves" aria-hidden="true"><i></i><i></i></div><div class="gate-frame" aria-hidden="true"><i></i><i></i></div><div class="axis-forecourt" aria-hidden="true"></div>' +
      '<div class="hero-panel"><div class="eyebrow">' + esc(x.court) + '</div><h1>' + esc(t(P.name)) + '</h1><p class="hero-role">' + esc(t(P.role)) + '</p><p>' + esc(t(P.greeting)) + ' · ' + esc(t(P.headline)) + '</p><p class="hero-intro">' + esc(x.intro) + '</p><div class="hero-actions"><button class="button primary" type="button" data-open-palace aria-pressed="false">' + esc(x.palace) + '</button><a class="button" href="' + esc(t(P.cv)) + '" download><i class="fa fa-file-text-o" aria-hidden="true"></i>' + esc(x.cv) + '</a><a class="button" href="' + esc(P.contact.github) + '" target="_blank" rel="noopener"><i class="fa fa-github" aria-hidden="true"></i>GitHub</a></div></div>' +
    '<aside class="identity-folio"><div class="folio-kicker">' + esc(x.folio) + ' · 075</div><img src="' + esc(photo) + '" alt="Portrait of ' + esc(t(P.name)) + '" decoding="async"><div><strong>' + esc(t(P.name)) + '</strong><span>' + esc(t(P.role)) + ' · ' + esc(t(P.location)) + '</span><p>' + esc(x.folioNote) + '</p></div></aside><div class="axis-caption"><span>午门</span><b>中轴 / CENTRAL AXIS</b><span>丹陛</span></div></div></section>';
  }

  function about() {
    var x = L();
    var photo = (P.photos && P.photos.city) || P.avatarAlt || P.avatar;
  return '<section class="content" id="about"><div class="frame">' + head("about", 1) + '<div class="about-grid reveal"><figure class="portrait-frame"><img src="' + esc(photo) + '" loading="lazy" decoding="async" alt="' + esc(t(P.name)) + ' in ' + esc(t(P.location)) + '"></figure><div class="bio-card"><div class="eyebrow">' + esc(t(P.role)) + '</div><p>' + esc(t(P.bio[0])) + '</p><p>' + esc(t(P.bio[1])) + '</p><div class="location"><i class="fa fa-map-marker" aria-hidden="true"></i>' + esc(x.located) + ' · ' + esc(t(P.location)) + '</div></div></div></div></section>';
  }

  function studies() {
    var x = L();
    var education = P.education.map(function (item) {
      return '<article class="education-card"><time>' + esc(item.period) + '</time><h3>' + esc(t(item.school)) + '</h3><p><strong>' + esc(t(item.degree)) + '</strong><br>' + esc(t(item.note)) + '</p></article>';
    }).join("");
    var skills = P.skillTags.map(function (item) { return '<span>' + esc(item) + '</span>'; }).join("");
    var courses = P.courses.map(function (item) {
      return '<article class="course"><i class="fa ' + esc(item.icon) + '" aria-hidden="true"></i><h3>' + esc(t(item.title)) + '</h3><p>' + esc(t(item.desc)) + '</p></article>';
    }).join("");
    return '<section class="content" id="studies"><div class="frame">' + head("studies", 2) + '<div class="section-index">' + esc(x.education) + '</div><div class="education-grid reveal">' + education + '</div><div class="skills-panel reveal"><div class="skills-title"><div class="eyebrow">' + esc(x.skills) + '</div><h3>' + esc(t(P.ui.core_tech)) + '</h3></div><div class="skill-cloud">' + skills + '</div></div><div class="section-index" style="margin:42px 0 14px">' + esc(x.courses) + '</div><div class="courses reveal">' + courses + '</div></div></section>';
  }

  function experience() {
    var item = P.experience[0];
    return '<section class="content experience"><div class="frame">' + head("experience", 3) + '<div class="experience-card reveal"><div class="experience-stamp">' + esc(item.period) + '<br>' + esc(t(item.company)) + '</div><div class="experience-body"><h3>' + esc(t(item.role)) + '</h3><p>' + esc(t(item.summary)) + '</p><ul class="decree-list">' + item.bullets.map(function (b) { return '<li>' + esc(t(b)) + '</li>'; }).join("") + '</ul></div></div></div></section>';
  }

  function projectSection() {
    var x = L();
    var body;
    if (loadState.projects === "loading") body = '<div class="archive-state is-loading" role="status"><span class="state-mark" aria-hidden="true"></span><p>' + esc(t(P.ui.loading_projects)) + '</p></div>';
    else if (loadState.projects === "error") body = '<div class="archive-state is-error" role="alert"><p>' + esc(x.fail) + '</p><button class="button" type="button" data-retry="projects">' + esc(x.retry) + '</button></div>';
    else if (!projects.length) body = '<div class="archive-state is-empty"><span class="empty-seal" aria-hidden="true">空</span><p>' + esc(x.noProjects) + '</p></div>';
    else body = '<div class="project-grid reveal">' + projects.map(function (p) {
      var cover = p.cover_image || "/index_page/img/blogs/1.jpg";
      return '<a class="project-card" href="' + esc(p.detailHref) + '"><img loading="lazy" decoding="async" src="' + esc(cover) + '" onerror="this.onerror=null;this.src=\'/index_page/img/blogs/1.jpg\'" alt="' + esc(p.localTitle()) + '"><div class="card-copy"><div class="card-meta">' + esc(p.dateText()) + ' · ' + esc(p.tech_stack || t(P.ui.tech_stack)) + '</div><h3>' + esc(p.localTitle()) + '</h3><p>' + esc(p.localSummary() || "") + '</p><span class="card-link">' + esc(x.open) + ' →</span></div></a>';
    }).join("") + '</div>';
    return '<section class="content" id="projects"><div class="frame">' + head("projects", 4) + body + '</div></section>';
  }

  function articleSection() {
    var x = L();
    var visible = CJCData.filterArticles(articles, filterKey);
    var body;
    if (loadState.articles === "loading") body = '<div class="archive-state is-loading" role="status"><span class="state-mark" aria-hidden="true"></span><p>' + esc(t(P.ui.loading_articles)) + '</p></div>';
    else if (loadState.articles === "error") body = '<div class="archive-state is-error" role="alert"><p>' + esc(x.fail) + '</p><button class="button" type="button" data-retry="articles">' + esc(x.retry) + '</button></div>';
    else if (!articles.length) body = '<div class="archive-state is-empty"><span class="empty-seal" aria-hidden="true">空</span><p>' + esc(x.noArticles) + '</p></div>';
    else if (!visible.length) body = '<p class="loading">' + esc(t(P.ui.no_articles)) + '</p>';
    else body = '<div class="article-grid reveal">' + visible.map(function (a) {
      var cover = a.cover_image || "/index_page/img/blogs/1.jpg";
      return '<a class="article-card" href="' + esc(a.detailHref) + '"><img loading="lazy" decoding="async" src="' + esc(cover) + '" onerror="this.onerror=null;this.src=\'/index_page/img/blogs/1.jpg\'" alt="' + esc(a.localTitle()) + '"><div class="card-copy"><div class="card-meta">' + esc(a.category || "ARCHIVE") + ' · ' + esc(a.dateText()) + '</div><h3>' + esc(a.localTitle()) + '</h3><p>' + esc(a.localSummary() || "") + '</p><span class="card-link">' + esc(x.read) + ' →</span></div></a>';
    }).join("") + '</div>';
    return '<section class="content" id="articles"><div class="frame">' + head("articles", 5) + '<div class="filters" aria-label="Article categories">' + P.articleFilters.map(function (f) { return '<button type="button" data-filter="' + esc(f.key) + '" aria-pressed="' + String(filterKey === f.key) + '" class="' + (filterKey === f.key ? "active" : "") + '">' + esc(t(f.label)) + '</button>'; }).join("") + '</div>' + body + '</div></section>';
  }

  function certificates() {
    return '<section class="content"><div class="frame">' + head("certificates", 6) + '<div class="certificate-grid reveal">' + P.certificates.map(function (item) {
    return '<article class="certificate-card"><img loading="lazy" decoding="async" src="' + esc(item.image) + '" alt="' + esc(t(item.title)) + '"><div><div class="card-meta">' + esc(t(item.tag)) + ' · ' + esc(t(item.date)) + '</div><h3>' + esc(t(item.title)) + '</h3><p>' + esc(t(item.desc)) + '</p></div></article>';
    }).join("") + '</div></div></section>';
  }

  function contact() {
    var x = L();
    return '<section class="content contact-section" id="contact"><div class="frame">' + head("contact", 7) + '<div class="contact-grid reveal"><div class="contact-links"><a href="mailto:' + esc(P.contact.email) + '"><span>Email</span><span>' + esc(P.contact.email) + '</span></a><a href="' + esc(P.contact.phoneHref) + '"><span>Phone</span><span>' + esc(P.contact.phone) + '</span></a><a href="' + esc(P.contact.github) + '" target="_blank" rel="noopener"><span>GitHub</span><span>@' + esc(P.contact.githubUser) + '</span></a><a href="' + esc(P.contact.wechatQrPage) + '"><span>WeChat</span><span>QR</span></a></div><form class="contact-form" id="contact-form"><input type="text" name="website" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px" aria-hidden="true"><label for="contact-name">' + esc(x.name) + '</label><input id="contact-name" name="name" autocomplete="name" required><label for="contact-email">' + esc(x.email) + '</label><input id="contact-email" type="email" name="email" autocomplete="email" required><label for="contact-message">' + esc(x.message) + '</label><textarea id="contact-message" name="message" required></textarea><button class="button primary" type="submit">' + esc(x.send) + '</button><p class="status" id="status" role="status" aria-live="polite"></p></form></div></div></section>';
  }

  function render() {
    var x = L();
    document.title = "Ming Palace · " + t(P.name);
    document.querySelector(".skip").textContent = x.skip;
    document.getElementById("brand").textContent = P.brand;
    document.getElementById("nav").innerHTML = x.nav.map(function (item) { return '<a href="#' + esc(item[0]) + '">' + esc(item[1]) + '</a>'; }).join("");
    var navToggleLabel = document.querySelector(".nav-toggle-label");
    if (navToggleLabel) navToggleLabel.textContent = x.menu;
    document.getElementById("main").innerHTML = hero() + about() + studies() + experience() + projectSection() + articleSection() + certificates() + contact();
    document.getElementById("footer-brand").textContent = P.brand + " · 75";
    document.getElementById("footer-note").textContent = t(P.ui.footer_desc);
    document.getElementById("footer-links").innerHTML = '<a href="' + esc(P.contact.github) + '">GitHub</a><a href="mailto:' + esc(P.contact.email) + '">Email</a><a href="/themes/75-ming-palace/ASSET_LICENSE.md">' + esc(x.credits) + '</a><a href="/admin.html">' + esc(t(P.ui.admin_panel)) + '</a><a href="' + esc(P.icpUrl) + '">' + esc(P.icp) + '</a>';
    wire();
    observe();
  }

  function wire() {
    var navToggle = document.getElementById("nav-toggle");
    var nav = document.getElementById("nav");
    if (navToggle && nav) {
      navToggle.onclick = function () {
        var open = navToggle.getAttribute("aria-expanded") !== "true";
        navToggle.setAttribute("aria-expanded", String(open));
        nav.classList.toggle("is-open", open);
        navToggle.querySelector(".nav-toggle-label").textContent = open ? L().closeMenu : L().menu;
      };
      nav.querySelectorAll("a").forEach(function (link) { link.addEventListener("click", function () { navToggle.setAttribute("aria-expanded", "false"); nav.classList.remove("is-open"); }); });
    }
    var gateButton = document.querySelector("[data-open-palace]");
    if (gateButton) gateButton.addEventListener("click", function () {
      var heroNode = document.querySelector(".hero");
      var open = !heroNode.classList.contains("is-open");
      heroNode.classList.toggle("is-open", open);
      gateButton.setAttribute("aria-pressed", String(open));
      gateButton.textContent = open ? L().close : L().palace;
    });
    document.querySelectorAll("[data-filter]").forEach(function (button) {
      button.addEventListener("click", function () { filterKey = button.dataset.filter; render(); });
    });
    document.querySelectorAll("[data-retry]").forEach(function (button) {
      button.addEventListener("click", function () { loadContent(button.dataset.retry); });
    });
    var form = document.getElementById("contact-form");
    if (form) form.addEventListener("submit", async function (event) {
      event.preventDefault();
      var status = document.getElementById("status");
      var button = form.querySelector("button[type=submit]");
      button.disabled = true;
      status.textContent = L().sending;
      try {
        var result = await CJCData.sendContact({ name: form.name.value, email: form.email.value, message: form.message.value, website: form.website.value });
        status.textContent = result.message || L().sent;
        form.reset();
      } catch (error) {
        status.textContent = error.message || L().fail;
      } finally { button.disabled = false; }
    });
  }

  function loadContent(kind) {
    loadState[kind] = "loading";
    render();
    var request = kind === "projects" ? CJCData.fetchProjects() : CJCData.fetchArticles();
    return request.then(function (items) {
      if (kind === "projects") projects = items || [];
      else articles = items || [];
      loadState[kind] = "ready";
      render();
    }).catch(function () {
      loadState[kind] = "error";
      render();
    });
  }

  function observe() {
    var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { document.querySelectorAll(".reveal").forEach(function (node) { node.classList.add("in"); }); return; }
    if (observer) observer.disconnect();
    observer = new IntersectionObserver(function (entries) { entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.classList.add("in"); observer.unobserve(entry.target); } }); }, { threshold: 0.1 });
    document.querySelectorAll(".reveal").forEach(function (node) { observer.observe(node); });
  }

  document.addEventListener("DOMContentLoaded", async function () {
    CJCData.setTheme(window.THEME_ID);
    render();
    CJCData.mountSwitcher({ accent: "#8f1719" });
    CJCData.onLang(render);
    await Promise.allSettled([loadContent("projects"), loadContent("articles")]);
  });
})();
