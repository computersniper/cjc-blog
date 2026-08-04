# CJC Theme DETAIL-PAGE Build Spec (article.html + project.html)

Every theme needs two detail pages so that clicking an article/project on that
theme's homepage opens a page **in the same style**:

```
/themes/<id>/article.html     (renders one article by ?id=)
/themes/<id>/project.html     (renders one project by ?id=)
```

You do NOT write the fetch/render logic — a shared renderer does that. You write
a thin page shell + CSS that matches the theme's homepage.

## Reference (copy this pattern)
- `/themes/01-swiss/article.html` and `/themes/01-swiss/project.html` — complete working examples.

## Required page structure
```html
<!DOCTYPE html><html lang="en"><head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Article · Cai Jiechao</title>
  <link rel="icon" href="/index_page/img/favicon.ico">
  <!-- the theme's fonts (same Google Fonts as its index.html) -->
  <style> /* theme chrome + styling for the .cjc-d-* classes (see below) */ </style>
</head><body>
  <!-- a small themed top bar: brand/name linking to "./" (the theme home). Keep the
       top-right ~200px clear — the switcher auto-mounts there. -->
  <main><div id="detail"></div></main>
  <script>window.THEME_ID = "<id>";</script>
  <script src="/shared/profile.js"></script>
  <script src="/shared/site-data.js"></script>
  <script src="/shared/detail.js"></script>
  <script>
    document.addEventListener("DOMContentLoaded", function () {
      CJCData.setTheme(window.THEME_ID);
      CJCData.mountDetail({ kind: "article", mount: "#detail", accent: "<theme accent hex>", backHref: "./" });
    });
  </script>
</body></html>
```
project.html is identical except `kind: "project"` and the `<title>`.

## What the shared renderer emits (style these to match your theme)
Inside `#detail` it renders:
```
<article class="cjc-d-wrap">
  <div class="cjc-d-meta">
     <span class="cjc-d-cat">Category</span>
     <span class="cjc-d-tech">tech, stack</span>   (project.html only)
     <span class="cjc-d-date">Aug 2026</span>
  </div>
  <h1 class="cjc-d-title">Title…</h1>
  <div class="cjc-d-cover"><img …></div>
  <div class="cjc-d-body">…raw author HTML (the article/project body)…</div>
     — OR, for an article whose full text lives on a separate page —
  <div class="cjc-d-summary">…</div>
  <a class="cjc-d-readfull" href="…">Read full article ↗</a>
  <div class="cjc-d-nav"><a class="cjc-d-back" href="./">← Home</a></div>
</article>
```
Also style `.cjc-d-loading` and `.cjc-d-error` (shown while fetching / on failure).
The renderer handles: fetch by `?id=`, EN/ZH (title_zh/summary_zh/content_zh) with
live re-render on language toggle, the read-full fallback, relative-URL fixing in
injected content, mounting the top-right switcher, and error states. Don't reimplement any of it.

## HARD rules
- **`.cjc-d-body` MUST be a readable LIGHT "document" surface** (e.g. `background:#fff; color:#1a1a1a;` with comfortable padding/`line-height:1.7`, `overflow-wrap:break-word`, `img{max-width:100%}`, `pre{overflow-x:auto}`). The injected content is raw author HTML that assumes a light page — on dark themes it will be UNREADABLE unless the body is a light card. Style the surrounding chrome (meta/title/cover/back/topbar/background) fully in your theme; keep the body legible.
- Match the theme's homepage: same palette, fonts, accent, and general chrome vibe (a terminal theme → a terminal frame; a newspaper theme → newsprint; etc.). It should feel like the same site.
- Only create `/themes/<id>/article.html` and `/themes/<id>/project.html`. Do NOT touch index.html, shared/*, registry.js, or other themes.
- Responsive 360→1440 (no horizontal body scroll), accessible, no console errors, only CSP-allowed CDNs (Google Fonts, cdnjs Font Awesome, jsdelivr/unpkg).
- Keep it reasonably lightweight — it's a reading page; the star is the content.

## Verify
Dev server: `http://127.0.0.1:6006`.
- `http://127.0.0.1:6006/themes/<id>/project.html?id=1` → renders the project title + rich content on a readable surface.
- `http://127.0.0.1:6006/themes/<id>/article.html?id=1` → renders an article; `?id=12` → shows the "Read full ↗" button (that one's body text lives on a separate page).
- Toggle 中文 → title/content flip. No console errors. No horizontal scroll at 375px.
