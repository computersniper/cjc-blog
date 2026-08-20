/* =============================================================================
 *  CJCData — UNIFIED DATA ACCESS LAYER
 * -----------------------------------------------------------------------------
 *  The single API every theme uses to read profile data, switch language,
 *  fetch dynamic articles/projects, and persist the selected theme.
 *
 *  Load order in a theme page:
 *      <script src="/shared/profile.js"></script>
 *      <script src="/shared/site-data.js"></script>
 *
 *  Then use:
 *      CJCData.profile                     -> the raw profile object
 *      CJCData.t(field)                    -> localized string ({en,zh} or str)
 *      CJCData.lang()                      -> "en" | "zh"
 *      CJCData.setLang("zh")               -> switch + persist + notify
 *      CJCData.onLang(fn)                  -> subscribe to language changes
 *      await CJCData.fetchArticles()       -> [ {..localized helpers..} ]
 *      await CJCData.fetchProjects()       -> [ {..} ]
 *      CJCData.getTheme() / setTheme(id)   -> persisted active theme id
 *      CJCData.mountSwitcher({...})        -> inject the floating theme switcher
 * ========================================================================== */
(function () {
  "use strict";

  var LANG_KEY = "lang";
  var THEME_KEY = "cjc_theme";
  var DEFAULT_THEME = "00-classic";

  // --- API base (matches the injected /api proxy, falls back to localhost) ----
  var API_BASE =
    window.CJC_BLOG_API_URL ||
    (window.location.protocol === "file:"
      ? "http://127.0.0.1:8000"
      : window.location.origin + "/api");

  var langListeners = [];
  var requestCache = Object.create(null);
  var SESSION_CACHE_PREFIX = "cjc:data:";
  var SESSION_CACHE_TTL = 5 * 60 * 1000;
  var themePathMatch = window.location.pathname.match(/^\/themes\/([^/]+)\//);

  // Keep contact journeys inside the active visual theme. Every themed page
  // exposes its own qr_code.html, while classic pages retain the classic route.
  if (themePathMatch && window.CJC_PROFILE && window.CJC_PROFILE.contact) {
    window.CJC_PROFILE.contact.wechatQrPage =
      "/themes/" + encodeURIComponent(themePathMatch[1]) + "/qr_code.html";
  }

  function lang() {
    return localStorage.getItem(LANG_KEY) || "en";
  }

  function setLang(next) {
    var value = next === "zh" ? "zh" : "en";
    localStorage.setItem(LANG_KEY, value);
    document.documentElement.setAttribute("lang", value === "zh" ? "zh-CN" : "en");
    langListeners.forEach(function (fn) {
      try { fn(value); } catch (e) { console.error(e); }
    });
    return value;
  }

  function toggleLang() {
    return setLang(lang() === "en" ? "zh" : "en");
  }

  function onLang(fn) {
    if (typeof fn === "function") langListeners.push(fn);
  }

  // --- Localized field picker -------------------------------------------------
  // Accepts a { en, zh } object or a plain string; returns the current language.
  function t(field, forceLang) {
    if (field == null) return "";
    if (typeof field === "string" || typeof field === "number") return String(field);
    var l = forceLang || lang();
    if (field[l] != null) return field[l];
    if (field.en != null) return field.en;
    if (field.zh != null) return field.zh;
    return "";
  }

  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // --- Dynamic content: articles & projects ----------------------------------
  // Each returned item is decorated with language-aware helpers so themes don't
  // have to reimplement the zh/en fallback logic:
  //   article.localTitle(), article.localSummary(), article.href, article.dateText()
  function decorateArticle(a) {
    a.localTitle = function () {
      return lang() === "zh" && a.title_zh ? a.title_zh : a.title;
    };
    a.localSummary = function () {
      return lang() === "zh" && a.summary_zh ? a.summary_zh : a.summary;
    };
    // Backend stores relative cover paths (e.g. "blog/x/cover.png"). Theme pages
    // live at /themes/<id>/, so relativity breaks -> normalize to root-absolute.
    a.cover_image = absUrl(a.cover_image);
    // External/static full article URL (a bespoke blog page), if any.
    a.readUrl =
      a.read_url && a.read_url.trim() !== "#" && a.read_url.trim() !== ""
        ? absUrl(a.read_url)
        : "";
    // Legacy long-form posts use assets relative to their original article
    // folder. Detail renderers use this base without coupling themes to it.
    a.contentBaseUrl = a.readUrl || "/";
    // Classic-compatible link (external page or the shared reader).
    a.href = a.readUrl || "/read.html?id=" + a.id;
    // Per-theme detail page (relative, resolves inside /themes/<id>/).
    a.detailHref = "article.html?id=" + a.id;
    a.dateText = function (opts) {
      return formatDate(a.created_at, opts || { month: "short", day: "numeric", year: "numeric" });
    };
    return a;
  }

  // Normalize a backend asset path to a root-absolute URL so it resolves from
  // any page depth. Leaves http(s), protocol-relative, data:, and "/..." intact.
  function absUrl(u) {
    if (!u) return u;
    var s = String(u).trim();
    if (/^(https?:)?\/\//i.test(s) || s.indexOf("data:") === 0 || s.charAt(0) === "/") return s;
    return "/" + s.replace(/^\.?\/*/, "");
  }

  function decorateProject(p) {
    p.localTitle = function () {
      return lang() === "zh" && p.title_zh ? p.title_zh : p.title;
    };
    p.localSummary = function () {
      return lang() === "zh" && p.summary_zh ? p.summary_zh : p.summary;
    };
    if (p.cover_image) p.cover_image = absUrl(p.cover_image);
    p.href = "/project.html?id=" + p.id;          // classic-compatible
    p.detailHref = "project.html?id=" + p.id;      // per-theme detail page
    p.dateText = function (opts) {
      return formatDate(p.created_at, opts || { month: "short", year: "numeric" });
    };
    return p;
  }

  function formatDate(value, opts) {
    if (!value) return "";
    try {
      var locale = lang() === "zh" ? "zh-CN" : "en-US";
      return new Date(value).toLocaleDateString(locale, opts);
    } catch (e) {
      return String(value);
    }
  }

  function readSessionCache(path) {
    // Only cache summary collections. Full article bodies can be large and are
    // fetched on demand by their themed detail page.
    if (!/\/$/.test(path)) return null;
    try {
      var raw = sessionStorage.getItem(SESSION_CACHE_PREFIX + path);
      if (!raw) return null;
      var saved = JSON.parse(raw);
      if (!saved || Date.now() - saved.at > SESSION_CACHE_TTL) return null;
      return saved.value;
    } catch (e) {
      return null;
    }
  }

  function writeSessionCache(path, value) {
    if (!/\/$/.test(path)) return;
    try {
      sessionStorage.setItem(
        SESSION_CACHE_PREFIX + path,
        JSON.stringify({ at: Date.now(), value: value })
      );
    } catch (e) {
      // Storage can be disabled or full; the in-memory cache still works.
    }
  }

  function fetchJSON(path) {
    if (requestCache[path]) return requestCache[path];
    var saved = readSessionCache(path);
    if (saved != null) return Promise.resolve(saved);

    requestCache[path] = fetch(API_BASE + path, {
      headers: { Accept: "application/json" },
      credentials: "same-origin",
    }).then(function (r) {
      if (!r.ok) throw new Error("Request failed: " + path + " (" + r.status + ")");
      return r.json();
    }).then(function (value) {
      writeSessionCache(path, value);
      return value;
    }).catch(function (error) {
      delete requestCache[path];
      throw error;
    });
    return requestCache[path];
  }

  function prepareLegacyContent(node, sourceUrl) {
    if (!node) return "";
    var copy = node.cloneNode(true);
    copy.querySelectorAll(
      "script,style,link,nav,header,footer,form,.back-button-container,[data-cjc-ui]"
    ).forEach(function (el) { el.remove(); });
    var hasPdf = false;
    copy.querySelectorAll(
      "img[src],source[src],video[src],iframe[src],embed[src],object[data],a[href]"
    ).forEach(function (el) {
      var attr = el.hasAttribute("src") ? "src" : (el.hasAttribute("href") ? "href" : "data");
      var value = el.getAttribute(attr);
      if (!value || value.charAt(0) === "#" || /^(data:|mailto:|tel:|javascript:)/i.test(value)) return;
      var resolvedValue = value;
      try {
        var resolved = new URL(value, sourceUrl);
        resolvedValue = resolved.origin === window.location.origin
          ? resolved.pathname + resolved.search + resolved.hash
          : resolved.href;
        el.setAttribute(attr, resolvedValue);
      } catch (e) {
        // Keep author content intact when a URL is malformed.
      }
      if (el.tagName === "IMG") {
        el.setAttribute("loading", "lazy");
        el.setAttribute("decoding", "async");
      }
      if (/\.pdf(?:$|[?#])/i.test(resolvedValue) && /^(IFRAME|EMBED|OBJECT)$/.test(el.tagName)) {
        hasPdf = true;
        el.classList.add("cjc-d-pdf");
        if (el.tagName === "IFRAME") el.setAttribute("loading", "lazy");
        if (!el.getAttribute("title")) {
          el.setAttribute("title", lang() === "zh" ? "嵌入式 PDF 文档" : "Embedded PDF document");
        }
        if (!el.nextElementSibling || !el.nextElementSibling.classList.contains("cjc-d-pdf-open")) {
          var openLink = copy.ownerDocument.createElement("a");
          openLink.className = "cjc-d-pdf-open";
          openLink.href = resolvedValue;
          openLink.target = "_blank";
          openLink.rel = "noopener";
          openLink.textContent = lang() === "zh" ? "在新窗口打开或下载 PDF" : "Open or download PDF";
          el.insertAdjacentElement("afterend", openLink);
        }
      }
    });
    if (hasPdf && !document.getElementById("cjc-content-embed-css")) {
      var stylesheet = document.createElement("link");
      stylesheet.id = "cjc-content-embed-css";
      stylesheet.rel = "stylesheet";
      stylesheet.href = "/shared/content-embed.css";
      document.head.appendChild(stylesheet);
    }
    return copy.innerHTML.trim();
  }

  function normalizeContentHtml(html, sourceUrl) {
    if (!html) return "";
    var holder = document.createElement("div");
    holder.innerHTML = String(html);
    return prepareLegacyContent(holder, new URL(sourceUrl || "/", window.location.origin).href);
  }

  // Compatibility bridge for older posts whose body still lives in a legacy
  // static page. The themed reader imports the body into its own shell instead
  // of navigating away. The deployment migration moves these bodies into the
  // API, so this path is only used while an older database is still online.
  function hydrateArticleContent(article) {
    // A number of migrated records contain only a short database excerpt while
    // their canonical static page still holds the complete article, media and
    // embedded PDF. Import that canonical body whenever it is available; the
    // existing API content remains the fallback if the legacy page cannot load.
    if (!article.readUrl) return Promise.resolve(article);

    var source;
    try { source = new URL(article.readUrl, window.location.origin); }
    catch (e) { return Promise.resolve(article); }
    if (source.origin !== window.location.origin) return Promise.resolve(article);

    return fetch(source.href, { credentials: "same-origin" }).then(function (r) {
      if (!r.ok) throw new Error("Legacy article unavailable");
      return r.text();
    }).then(function (html) {
      var doc = new DOMParser().parseFromString(html, "text/html");
      var en = doc.querySelector(".article-lang-en");
      var zh = doc.querySelector(".article-lang-zh");
      var fallback = doc.querySelector("article, main .container, main, .container");
      article.content = prepareLegacyContent(en || fallback, source.href) || article.content;
      article.content_zh = prepareLegacyContent(zh, source.href) || article.content_zh;
      return article;
    }).catch(function () {
      return article;
    });
  }

  function fetchArticles() {
    return fetchJSON("/articles/").then(function (list) {
      return (list || []).map(decorateArticle);
    });
  }

  function fetchProjects() {
    return fetchJSON("/projects/").then(function (list) {
      return (list || []).map(decorateProject);
    });
  }

  // Single-item fetchers for per-theme detail pages (article.html / project.html).
  function fetchArticle(id) {
    return fetchJSON("/articles/" + encodeURIComponent(id))
      .then(decorateArticle)
      .then(hydrateArticleContent);
  }
  function fetchProject(id) {
    return fetchJSON("/projects/" + encodeURIComponent(id)).then(decorateProject);
  }

  // Read ?id= (or ?slug=) from the current URL — used by detail pages.
  function queryId() {
    var m = new URLSearchParams(window.location.search);
    return m.get("id");
  }

  // Filter helper shared by all themes (mirrors the classic homepage rules).
  function filterArticles(list, key) {
    if (!key || key === "all") return list;
    var k = key.toLowerCase();
    return list.filter(function (a) {
      var c = (a.category || "").toLowerCase();
      if (c.indexOf(k) !== -1) return true;
      if (key === "Reinforcement Learning") {
        return c.indexOf("rl") !== -1 || c.indexOf("强化学习") !== -1 || c.indexOf("reinforcement") !== -1;
      }
      return false;
    });
  }

  // --- Contact form ----------------------------------------------------------
  function sendContact(payload) {
    return fetch(API_BASE + "/contact/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (data) {
        if (!r.ok) throw new Error(data.detail || "Failed to send message.");
        return data;
      });
    });
  }

  // --- Theme persistence ------------------------------------------------------
  function getTheme() {
    return localStorage.getItem(THEME_KEY) || DEFAULT_THEME;
  }

  function setTheme(id) {
    if (id) localStorage.setItem(THEME_KEY, id);
    return getTheme();
  }

  function themeUrl(id) {
    return id === DEFAULT_THEME ? "/" : "/themes/" + id + "/";
  }

  // --- Floating theme switcher (consistent across every theme) ----------------
  // Injects a small fixed control cluster in the top-right:
  //   [ 中文/EN ]  [ ⇄ Switch Theme ]
  // opts.lang:false hides the language toggle; opts.accent sets the accent color.
  function mountSwitcher(opts) {
    opts = opts || {};
    if (document.getElementById("cjc-switcher")) return;

    var accent = opts.accent || "#5b6cff";
    var showLang = opts.lang !== false;

    var wrap = document.createElement("div");
    wrap.id = "cjc-switcher";
    wrap.setAttribute("data-cjc-ui", "1");

    var css = document.createElement("style");
    css.textContent =
      "#cjc-switcher{position:fixed;top:16px;right:16px;z-index:99999;display:flex;gap:8px;" +
      "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;}" +
      "#cjc-switcher button{cursor:pointer;border:1px solid rgba(128,128,128,.35);" +
      "background:rgba(255,255,255,.72);color:#111;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);" +
      "border-radius:999px;padding:8px 14px;font-size:13px;font-weight:600;letter-spacing:.01em;" +
      "line-height:1;display:inline-flex;align-items:center;gap:6px;box-shadow:0 6px 20px rgba(0,0,0,.12);" +
      "transition:transform .15s ease, box-shadow .15s ease;}" +
      "#cjc-switcher button:hover{transform:translateY(-1px);box-shadow:0 10px 26px rgba(0,0,0,.18);}" +
      "#cjc-switcher .cjc-theme-btn{background:" + accent + ";color:#fff;border-color:transparent;}" +
      "@media (prefers-color-scheme: dark){#cjc-switcher button{background:rgba(20,20,24,.72);color:#eee;border-color:rgba(255,255,255,.16);}" +
      "#cjc-switcher .cjc-theme-btn{color:#fff;}}" +
      "@media (max-width:600px){#cjc-switcher{top:10px;right:10px;}#cjc-switcher button{padding:7px 11px;font-size:12px;}}";
    document.head.appendChild(css);

    if (showLang) {
      var langBtn = document.createElement("button");
      langBtn.className = "cjc-lang-btn";
      langBtn.type = "button";
      langBtn.textContent = lang() === "en" ? "中文" : "EN";
      langBtn.addEventListener("click", function () {
        var next = toggleLang();
        langBtn.textContent = next === "en" ? "中文" : "EN";
      });
      onLang(function (l) { langBtn.textContent = l === "en" ? "中文" : "EN"; });
      wrap.appendChild(langBtn);
    }

    var themeBtn = document.createElement("button");
    themeBtn.className = "cjc-theme-btn";
    themeBtn.type = "button";
    themeBtn.innerHTML =
      '<span aria-hidden="true" style="font-size:15px;line-height:1">✦</span><span>' +
      escapeHtml(t(CJCData.profile.ui.switch_theme)) +
      "</span>";
    themeBtn.addEventListener("click", function () {
      window.location.href = "/themes.html";
    });
    onLang(function () {
      themeBtn.querySelector("span:last-child").textContent = t(CJCData.profile.ui.switch_theme);
    });
    wrap.appendChild(themeBtn);

    document.body.appendChild(wrap);
  }

  // --- Public API -------------------------------------------------------------
  window.CJCData = {
    profile: window.CJC_PROFILE,
    apiBase: API_BASE,
    DEFAULT_THEME: DEFAULT_THEME,
    lang: lang,
    setLang: setLang,
    toggleLang: toggleLang,
    onLang: onLang,
    t: t,
    escapeHtml: escapeHtml,
    formatDate: formatDate,
    fetchArticles: fetchArticles,
    fetchProjects: fetchProjects,
    fetchArticle: fetchArticle,
    fetchProject: fetchProject,
    hydrateArticleContent: hydrateArticleContent,
    normalizeContentHtml: normalizeContentHtml,
    filterArticles: filterArticles,
    queryId: queryId,
    absUrl: absUrl,
    sendContact: sendContact,
    getTheme: getTheme,
    setTheme: setTheme,
    themeUrl: themeUrl,
    mountSwitcher: mountSwitcher,
  };

  // Keep <html lang> in sync on first load.
  document.documentElement.setAttribute("lang", lang() === "zh" ? "zh-CN" : "en");
})();
