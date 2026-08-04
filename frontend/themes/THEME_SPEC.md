# CJC Theme Build Spec (contract for every homepage style)

You are building **one self-contained themed homepage** for Cai Jiechao's personal
site. All 20 themes share ONE data source and ONE integration contract described
here. Read this fully before writing code.

## Golden rules
1. **Content comes ONLY from the shared data layer** — never hardcode personal
   text (name, bio, courses, jobs, certificates…). Read it from `CJCData` /
   `window.CJC_PROFILE`. This is what makes "edit once, all themes update" work.
2. **Design must be genuinely distinct** — a real, opinionated visual language
   for your assigned style. NOT a reskin of the classic site or of another theme.
   Different layout, typography, color system, motion, and section treatment.
3. **Bilingual (EN/ZH)** — every piece of text must switch when the language
   toggles. Use `CJCData.t()` and re-render on `CJCData.onLang()`.
4. **Self-contained folder** — everything for your theme lives in
   `/themes/<id>/`. You may inline CSS/JS in `index.html` or add `style.css` /
   `theme.js` in the same folder. Do NOT edit any file outside your folder
   (not `/shared/*`, not `registry.js`, not other themes).
5. **Responsive** — must look great from 360px mobile to wide desktop. No
   horizontal body scroll. Wide content scrolls inside its own container.

## Files you create
```
/themes/<id>/index.html      (required)
/themes/<id>/style.css       (optional)
/themes/<id>/theme.js        (optional)
```
`<id>` is your assigned folder name, e.g. `03-glass`.

## Required <head> / script wiring
Fonts/icons may come from the CDNs already allowed by the site CSP:
`fonts.googleapis.com`, `fonts.gstatic.com`, `cdnjs.cloudflare.com`,
`cdn.jsdelivr.net`, `unpkg.com`, `use.fontawesome.com`,
`stackpath.bootstrapcdn.com`. (Google Fonts + Font Awesome both work.)

Load the shared layer BEFORE your own script:
```html
<script>window.THEME_ID = "03-glass";</script>
<script src="/shared/profile.js"></script>
<script src="/shared/site-data.js"></script>
<!-- your inline script or -->
<script src="/themes/03-glass/theme.js" defer></script>
```

## On load, your script MUST
```js
document.addEventListener("DOMContentLoaded", async () => {
  CJCData.setTheme(window.THEME_ID);      // adopt = "set as my homepage"
  renderAll();                             // build every section from CJCData
  CJCData.mountSwitcher({ accent: "#7c5cff" }); // top-right Switch-Theme + 中文/EN
  CJCData.onLang(renderAll);               // re-render text on language switch
  try {
    const articles = await CJCData.fetchArticles();
    const projects = await CJCData.fetchProjects();
    renderArticles(articles); renderProjects(projects);
    CJCData.onLang(() => { renderArticles(articles); renderProjects(projects); });
  } catch (e) { /* show a graceful 'backend offline' note in those sections */ }
});
```
`mountSwitcher` injects a fixed top-right cluster (language toggle + "Switch
Theme" button that links to `/themes.html`). Keep your own header clear of the
top-right ~180px on desktop so it doesn't overlap, or design around it.

## Data API (everything you need)
`CJCData.profile` (alias `window.CJC_PROFILE`) has these fields. Bilingual
fields are `{en, zh}` — always render them through `CJCData.t(field)`.

| Field | Shape | Notes |
|---|---|---|
| `brand` | string | "CaiJiechao" logo text |
| `name` | {en,zh} | Cai Jiechao / 蔡杰超 |
| `greeting` | {en,zh} | "Hi, my name is" |
| `headline` | {en,zh} | hero tagline |
| `role` | {en,zh} | "Software Developer" |
| `title` | {en,zh} | "A CS student based in Guangzhou…" |
| `location` | {en,zh} | Guangzhou, China |
| `avatar`,`avatarAlt`,`hero` | string | root-absolute image paths |
| `bio` | [{en,zh}, {en,zh}] | two paragraphs |
| `cv` | {en,zh} | PDF paths (pick by lang for the download link) |
| `contact` | object | `email, phone, phoneHref, github, githubUser, wechatQrImage, wechatQrPage, emailTo` |
| `education` | [{school,degree,period,note}] | school/degree/note are {en,zh}; period is a string |
| `skills` | [string×6] | grouped tech lines |
| `skillTags` | [string] | individual tags for chips/tag-clouds |
| `courses` | [{icon,title,desc}] | icon = FontAwesome 4 class (e.g. "fa-sitemap"); title/desc {en,zh} |
| `experience` | [{company,role,period,summary,bullets[]}] | company/role/summary {en,zh}; bullets are [{en,zh}] |
| `certificates` | [{image,date,tag,title,desc}] | image path; date/tag/title/desc {en,zh} |
| `articleFilters` | [{key,label}] | label {en,zh}; key matches article.category (or "all") |
| `ui` | object of {en,zh} | reusable strings: section titles, buttons, placeholders (see profile.js `ui`) |
| `footerNote`→`ui.footer_desc` | {en,zh} | footer credit |
| `icp`,`icpUrl` | string | Chinese ICP record (put in footer) |

Helpers:
- `CJCData.t(field)` → localized string.
- `CJCData.lang()` → "en"|"zh"; `CJCData.setLang(l)`, `CJCData.toggleLang()`.
- `CJCData.escapeHtml(s)` when injecting API strings into innerHTML.
- `CJCData.formatDate(iso, opts)`.

### Dynamic articles & projects (from backend, already localized)
```js
const articles = await CJCData.fetchArticles();
// each: a.id, a.category, a.cover_image, a.created_at,
//       a.localTitle(), a.localSummary(), a.href, a.dateText()
const projects = await CJCData.fetchProjects();
// each: p.id, p.tech_stack, p.created_at,
//       p.localTitle(), p.localSummary(), p.href, p.dateText()
CJCData.filterArticles(articles, filterKey); // apply a category filter
```
- Article cover fallback: `onerror="this.src='/index_page/img/blogs/1.jpg'"`.
- Article link → `a.href` (a real read URL or `/read.html?id=…`).
- Project click → `p.href` (`/project.html?id=…`).
- If the fetch fails, show a small "内容加载失败 / Failed to load" note in that
  section — do not blank the page.

### Contact form
Use the shared sender:
```js
await CJCData.sendContact({ name, email, message, website: "" });
```
(`website` is a honeypot — keep an empty hidden field named `website`.)

## Sections your homepage should present (adapt layout to your style)
Include all of this content, arranged however your aesthetic dictates:
1. **Hero** — greeting + name + headline + role/title + CV download button
   (link `CJCData.t(profile.cv)`), link to GitHub.
2. **About** — the two `bio` paragraphs + portrait (`avatar`) + `location`.
3. **Education** — the 2 entries.
4. **Skills / Tech stack** — from `skills` or `skillTags`.
5. **Core Courses** — the 6 courses (icon + title + desc).
6. **Experience / Internship** — the Xnew entry (role, period, summary, 4 bullets).
7. **Projects** — dynamic, from `fetchProjects()` (title, date, tech_stack, summary, link).
8. **Articles** — dynamic, from `fetchArticles()`, with the category filters.
9. **Certificates** — the 2 entries (image + title + desc + date/tag).
10. **Contact** — working form via `CJCData.sendContact`, plus email/phone/GitHub/WeChat.
11. **Footer** — brand, social links, `ui.footer_desc`, ICP line linking `icpUrl`,
    and a link to `/admin.html` (Admin Panel) is nice-to-have.

You may reorder/merge sections to fit the concept (e.g. terminal theme = one
scrolling console; bento theme = a grid of tiles) — but no required content
should be dropped.

## Quality bar
- Distinct typography (load fitting Google Fonts), a coherent color system, and
  at least one signature interaction/motion detail true to the style.
- Accessible contrast; visible focus states; `alt` text on images.
- Respect `prefers-reduced-motion` for heavy animation.
- No console errors. No layout shift that breaks on mobile.
- Keep it performant (no multi-MB assets; reuse the site's existing images).

## Verify before you finish
Vite serves the site at `http://127.0.0.1:6006`. Your page is at
`http://127.0.0.1:6006/themes/<id>/`. Confirm:
- Page renders with real profile text (not placeholders).
- Articles & projects load (backend is running on :8000 via `/api`).
- Language toggle flips ALL text.
- The top-right Switch-Theme button appears and links to the gallery.
- Looks right at 375px and 1440px widths.
Report the file(s) you created and anything notable.
