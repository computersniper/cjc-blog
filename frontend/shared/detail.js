/* =============================================================================
 *  CJCData.mountDetail — shared ARTICLE/PROJECT detail renderer
 * -----------------------------------------------------------------------------
 *  Each theme's article.html / project.html includes this after profile.js +
 *  site-data.js, styles the emitted `.cjc-d-*` classes to match the theme, and
 *  calls:
 *      CJCData.mountDetail({ kind:'article'|'project', mount:'#detail',
 *                            accent:'#hex', backHref:'./' });
 *
 *  It reads ?id= from the URL, fetches the single item, and renders (bilingual,
 *  re-rendering on language change):
 *    <article class="cjc-d-wrap">
 *      <div class="cjc-d-meta"><span class="cjc-d-cat">…</span>
 *           [<span class="cjc-d-tech">…</span>] <span class="cjc-d-date">…</span></div>
 *      <h1 class="cjc-d-title">…</h1>
 *      <div class="cjc-d-cover"><img …></div>
 *      <div class="cjc-d-body">…rich HTML content or summary fallback…</div>
 *      <div class="cjc-d-nav"><a class="cjc-d-back" href=backHref>← Home</a></div>
 *    </article>
 *
 *  STYLING NOTE for themes: `.cjc-d-body` holds RAW author HTML (a project's
 *  resume-style block, an article's body) that carries its own light-background
 *  styling — give `.cjc-d-body` a readable light "document" surface (e.g.
 *  background:#fff; color:#1a1a1a) so injected content is always legible, even on
 *  dark themes. Style the chrome (meta, title, cover, back, error) however you like.
 * ========================================================================== */
(function () {
  "use strict";
  var C = window.CJCData;
  if (!C) return;

  var STR = {
    loading: { en: "Loading…", zh: "加载中…" },
    idMissing: { en: "No id provided.", zh: "缺少内容 id。" },
    failed: { en: "Failed to load. Is the backend running?", zh: "加载失败，后端是否在运行？" },
    backHome: { en: "← Home", zh: "← 返回主页" },
  };

  function pick(o) { return o[C.lang()] || o.en; }
  function esc(s) { return C.escapeHtml(s); }

  // Make relative asset URLs inside injected content resolve from the site root
  // (detail pages live at /themes/<id>/, so bare "blog/x.png" would 404).
  function absolutizeContent(container, sourceUrl) {
    var base;
    try { base = new URL(sourceUrl || "/", window.location.origin); }
    catch (e) { base = new URL("/", window.location.origin); }
    container.querySelectorAll("img[src], a[href], source[src], video[src]").forEach(function (node) {
      var attr = node.hasAttribute("src") ? "src" : "href";
      var v = node.getAttribute(attr) || "";
      if (!v) return;
      if (/^(https?:)?\/\//i.test(v) || v.charAt(0) === "/" || v.indexOf("data:") === 0 ||
          v.charAt(0) === "#" || v.indexOf("mailto:") === 0 || v.indexOf("tel:") === 0) return;
      try {
        var resolved = new URL(v, base);
        node.setAttribute(attr, resolved.origin === window.location.origin
          ? resolved.pathname + resolved.search + resolved.hash
          : resolved.href);
      } catch (e) {
        node.setAttribute(attr, "/" + v.replace(/^\.?\/*/, ""));
      }
    });
    container.querySelectorAll("img").forEach(function (image) {
      image.loading = "lazy";
      image.decoding = "async";
    });
    container.querySelectorAll("iframe").forEach(function (frame) { frame.loading = "lazy"; });
  }

  function mountDetail(opts) {
    opts = opts || {};
    var kind = opts.kind === "project" ? "project" : "article";
    var mount = typeof opts.mount === "string" ? document.querySelector(opts.mount) : opts.mount;
    if (!mount) return;
    var accent = opts.accent || "#5b6cff";
    var backHref = opts.backHref || "./";
    var id = C.queryId();
    var item = null;

    function render() {
      if (!item) return;
      var lang = C.lang();
      var title = lang === "zh" && item.title_zh ? item.title_zh : item.title;
      var summary = lang === "zh" && item.summary_zh ? item.summary_zh : item.summary;
      var content = lang === "zh" && item.content_zh ? item.content_zh : item.content;
      var date = item.dateText ? item.dateText() : "";

      var meta = '<span class="cjc-d-cat">' + esc(item.category || "") + "</span>";
      if (kind === "project" && item.tech_stack)
        meta += '<span class="cjc-d-tech">' + esc(item.tech_stack) + "</span>";
      if (date) meta += '<span class="cjc-d-date">' + esc(date) + "</span>";

      var body;
      if (content && String(content).trim()) {
        body = '<div class="cjc-d-body"></div>'; // filled after (raw HTML)
      } else {
        // Stay inside the active theme even when an old record only has a
        // summary. CJCData.fetchArticle hydrates legacy bodies when possible.
        body = '<div class="cjc-d-body"><p>' + esc(summary || "") + "</p></div>";
      }

      var cover = item.cover_image
        ? '<div class="cjc-d-cover"><img src="' + esc(item.cover_image) +
          '" alt="' + esc(title) + '" decoding="async" fetchpriority="high" onerror="this.style.display=\'none\'"></div>'
        : "";

      mount.innerHTML =
        '<article class="cjc-d-wrap">' +
        '<div class="cjc-d-meta">' + meta + "</div>" +
        '<h1 class="cjc-d-title">' + esc(title) + "</h1>" +
        cover + body +
        '<div class="cjc-d-nav"><a class="cjc-d-back" href="' + esc(backHref) + '">' +
        esc(pick(STR.backHome)) + "</a></div>" +
        "</article>";

      // Inject raw HTML content (not escaped) and fix relative asset URLs.
      if (content && String(content).trim()) {
        var bodyEl = mount.querySelector(".cjc-d-body");
        if (bodyEl) {
          bodyEl.innerHTML = content;
          absolutizeContent(bodyEl, item.contentBaseUrl || item.readUrl || "/");
        }
      }
      document.title = title + " · " + C.t(C.profile.name);
    }

    function fail(msg) {
      mount.innerHTML =
        '<div class="cjc-d-error">' + esc(msg) +
        ' <a class="cjc-d-back" href="' + esc(backHref) + '">' + esc(pick(STR.backHome)) + "</a></div>";
    }

    mount.innerHTML = '<div class="cjc-d-loading">' + esc(pick(STR.loading)) + "</div>";
    if (!id) {
      fail(pick(STR.idMissing));
    } else {
      (kind === "project" ? C.fetchProject : C.fetchArticle)(id)
        .then(function (it) { item = it; render(); })
        .catch(function () { fail(pick(STR.failed)); });
    }
    C.onLang(function () { if (item) render(); });
    if (C.mountSwitcher) C.mountSwitcher({ accent: accent });
  }

  C.mountDetail = mountDetail;
})();
