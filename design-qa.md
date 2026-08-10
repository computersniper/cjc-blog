# Theme Redesign QA

Date: 2026-08-07

## Scope

- 30 Steampunk: removed the unrelated stock-model background and restored Cai Jiechao as the hero subject.
- 67 Orange Editorial: cream/orange creative-studio composition with a blurred real portrait and monumental serif type.
- 68 Sanctuary: cinematic soft-focus personal interior with warm neutrals, amber chair geometry, and italic serif display.
- 69 Violet OS: violet technical operating system with blueprint grid, overlapping windows, and portrait viewport.
- 70 Warm Editorial: rust, olive, and paper-white field journal with rounded note cards and handwritten accents.
- 71 Generative Lab: cobalt algorithm console with an interactive canvas form, parameter controls, and technical toolbar.
- 72 Paper Journal: warm tactile paper, conversational prompt, imperfect ink typography, and consistent outline icons.

## Reference comparison

- Opened each of the six supplied screenshots beside its 1440 x 900 implementation capture.
- Preserved each reference's dominant composition, typography, palette, density, and visual hierarchy without copying its brand or text.
- Used authentic same-origin user photography where portraiture was appropriate; no generic stock person remains in the Steampunk hero.
- The Generative Lab's central visual is a live canvas system, and the Paper Journal uses a real local raster paper texture.

## Visual and interaction checks

- Parsed every inline script for themes 30 and 67-72 with Node `vm.Script`; all passed.
- Ran the Vite production build successfully.
- Loaded all six new themes in Chromium at 1440 x 900 and at a 375 px mobile viewport equivalent to the requested 390 x 844 check.
- Confirmed meaningful body content, expected sections, one contact form per theme, and no Vite error overlay.
- Confirmed `scrollWidth === clientWidth` for every new theme on mobile.
- Scrolled every new theme through its full document and confirmed every discovered image had `naturalWidth > 0`; no broken image remained.
- Confirmed English/Chinese re-rendering, article filter state, the global theme gallery/switcher, and the contact-form submit path using a local stub rather than sending a real message.
- Emulated `prefers-reduced-motion: reduce` for all six themes and confirmed the media query matched and no reveal content remained hidden.
- Confirmed focus styles, semantic labels, minimum-height form controls/buttons, local image fallbacks, and responsive stacking are present.

## Design assessment

- Each new theme has its own composition and interaction language, rather than being a color reskin.
- The visual systems remain recognizable against the supplied references while carrying real portfolio content and the shared `CJCData` contract.
- The revised Steampunk homepage visibly features Cai Jiechao and no longer references or ships the former stock engineering image.
- The Paper Journal texture was warm-tinted after visual comparison to retain the reference's cream paper character.

## Driver-view variants

- Rebuilt `57-cardrive` as **Rain Drive**, a static cinematic driver-seat composition using a real modern car interior and rainy road photograph.
- Added `73-cardrive-motion` as **Road in Motion**, an independent motion variant using a real first-person driving film.
- The motion asset is an 8.01-second, 854 x 480, H.264 MP4 with no audio track; it is 1.49 MB and uses a circular crossfade for a softened loop boundary.
- Added a visible pause/play control, static poster fallback, and no-video behavior for reduced-motion, Save-Data, and 2G connections.
- Removed every remaining game metaphor from both variants: no Canvas road, fake cockpit shell, SVG gauges, speed HUD, steering input, turbo, pedals, or driving easter eggs.
- Registered both variants distinctly in the theme gallery as `Rain Drive / 雨中驾驶` and `Road in Motion / 公路动态影像`.

## Driver-view verification

- Parsed inline scripts for both themes with Node `vm.Script`; all passed.
- Ran the Vite production build successfully.
- Visually checked both variants at 1440 x 900 and 390 x 844; both preserve the driver-eye composition and have no horizontal overflow.
- Loaded the local FastAPI data source and confirmed 5 project cards, 10 article cards, 6 filters, 19 images, and zero broken images after full-page scrolling.
- Confirmed EN/ZH rerendering, the LLM article filter, exact four-field contact payload with a local submit stub, and theme-gallery registration.
- Confirmed the motion video plays and loops while muted, pause state survives language rerendering, and reduced-motion mode leaves `currentSrc` empty while the poster remains visible.
- Confirmed real user photography remains in the profile section and all external driving media has visible author/license attribution.

## Cyberpunk and material-space rebuilds

- Rebuilt `06-cyberpunk` as **Signal Archive**, a near-black asymmetric editorial system with restrained cyan/magenta signals, local Orbitron/JetBrains Mono fonts, real photography, and content-first bento layouts.
- Rebuilt `24-render3d` as **Material Space**, a dark spatial gallery using chrome, acrylic, frosted surfaces, perspective flooring, and pointer-responsive studio lighting without a heavy WebGL dependency.
- Preserved the complete shared-data contract in both themes: bilingual navigation/content, profile, education, skills/courses, experience, dynamic projects, dynamic articles and six filters, certificates, four-field contact submission, footer, and theme switcher.
- Parsed all inline scripts, checked unique DOM IDs and required `CJCData` calls, ran `git diff --check`, and completed the Vite production build.
- Browser QA confirmed 5 projects, 10 articles, 6 filters, 2 certificates, an LLM filter result of 4 articles, exact contact payload keys, and successful English/Chinese rerendering in both themes.
- Full-page desktop and 390 x 844 mobile checks found no horizontal overflow and no broken images: 18 of 18 loaded in Cyberpunk and 19 of 19 loaded in Material Space.
- Under `prefers-reduced-motion: reduce`, all 19 Cyberpunk and 20 Material Space reveal groups remain visible; Material Space also activates its low-effects performance mode.

## Cyberpunk and material-space display repair

- Replaced Cyberpunk's empty location panel with a real local portrait, balanced the profile columns, and added Chinese-specific display typography so the biography no longer breaks into oversized one- or two-character lines.
- Tuned Material Space's Chinese headings and biography, reduced excessive fixed card heights, compacted its mobile course/project/article layouts, hid the colliding mobile text navigation, and added anchor clearance for the fixed header.
- Rechecked both languages at 1440 x 900, 1024 x 768, 390 x 844, and 844 x 390: 16 browser cases passed with no horizontal overflow, clipped content, JavaScript errors, hidden reduced-motion content, or broken images.
- Confirmed both themes still render 5 projects and 10 articles from the local API, and Material Space anchor navigation lands below its fixed header.

## Spectrum, aviation, Ming, and motorsport expansion

- Added a Spectrum Orbit mode beside the existing theme-card grid, with pointer, drag, wheel, touch, keyboard, and visible nearby-theme controls.
- Kept `57-cardrive` and `73-cardrive-motion` independently selectable as the still and looping driver-view variants.
- Added `74-aviation-cockpit` with a real licensed flight-deck photograph, dense illuminated instruments, a split-flap departures board, captain log, and boarding-pass project cards.
- Added `75-ming-palace` as a realistic axial Forbidden City courtyard composition with vermilion-and-gold court-document styling.
- Added `76-jinyiwei` with a Ming warrior painting, Feiyu robe textile study, cloud-and-sea border vocabulary, waist-token details, and a museum-sourced seventeenth-century saber as a restrained Xiuchun-dao reference.
- Added two locally stored, visibly attributed Formula One trackside photographs to theme 54.

## Expansion verification

- Parsed the new theme scripts and the inline gallery/F1 scripts, completed the Vite production build, and passed `git diff --check`.
- Browser-tested gallery selection, keyboard and wheel navigation, mobile overflow, Jinyiwei archive open/close, image loading, Chinese switching, and reduced-motion behavior.
- Confirmed the Jinyiwei wording consistently uses **Feiyu robe** and contains no incorrect "fishtail robe" terminology.
- Kept all reference and QA screenshots out of the production bundle; real shipped imagery is stored locally with asset-license documentation.

final result: passed

## Theme-local detail pages and Classic parity

Date: 2026-08-10

- Added independent project and article detail pages for `54-f1`, `74-aviation-cockpit`, `75-ming-palace`, and `76-jinyiwei`; every homepage card and aviation split-flap row now stays inside its selected theme.
- Preserved the four visual languages on full records: F1 telemetry, aviation flight deck, Ming court register, and Jinyiwei restricted archive.
- Kept the Classic site's portfolio coverage on each homepage: projects, filterable articles, certificates, CV, email, phone, GitHub, WeChat, contact form, bilingual content, and theme switching.
- Added theme-aware back links, URL language handling, loading/missing/error states, retry actions, accessible focus and live regions, rich-content overflow protection, 44 px controls, mobile navigation where required, and reduced-motion handling.
- Parsed 13 inline scripts and checked six changed JavaScript files with Node; the Vite production build and targeted `git diff --check` passed.
- Browser-tested all eight detail routes with valid project `3` and article `12` fixtures at 1440 x 900 and 375 x 812. Every route loaded its localized title, returned to the correct themed section, had zero horizontal overflow, zero broken images, and no browser errors.
- Browser-tested all four homepages at 375 x 812. Each exposed theme-local project/article links, CV, email, phone, GitHub, WeChat, and responsive content with zero horizontal overflow or broken images.
- Confirmed the shared language control re-rendered a loaded F1 article from English to Chinese, and confirmed the Ming/Jinyiwei mobile directories expanded with correct `aria-expanded` state.

final result: passed

## Aviation record and Jinyiwei completion pass

Date: 2026-08-10

- Rebuilt the aviation project/article detail chrome around a real Flight Record: cockpit backdrop, route clearance, dynamic record number, UTC/system/type/language instruments, route-plan barcode card, and profile-backed communication channels.
- Corrected aviation cover rendering from a distorted 1193 x 560 box to a bounded 16:10 crop, reduced the oversized record title, retained all nine detail navigation routes on mobile via an accessible horizontal rail, and localized the full status/ARIA layer.
- Completed the Jinyiwei information architecture with stable Field Work and Awards anchors, then extended both detail types with a three-part historical evidence strip for personnel, Feiyu robe textile, and Xiuchun-dao reference imagery.
- Replaced the implementation-facing Jinyiwei brand with CaiJiechao/Northern Bureau, added profile-backed Email, Phone, GitHub, and WeChat channels, synchronized the mobile menu label with `aria-expanded`, and restored focus after article filtering.
- Browser-tested both project and article pages at 1440 x 900 and 375 x 812 with English and Chinese content. All four routes had zero page overflow, zero broken images, visible data, complete contact channels, no console errors, and active reduced-motion handling.
- Verified aviation mobile navigation remains visible with nine links and a scrollable rail; the programmatically focused title retains a visible 2 px outline.
- Verified localized missing-id and failed-request states for both themes, including alert semantics and retry controls.
- Parsed six inline scripts, checked four JavaScript files, completed the Vite production build, and passed targeted `git diff --check`.

final result: passed

## Spectrum color affinity

Date: 2026-08-10

- Replaced gallery-order spectrum selection with a color-distance model based on each theme's registered accent palette.
- Mapped wheel angle to hue and radial distance to saturation: the inner edge favors neutral/soft themes while the outer edge favors vivid themes.
- Kept the card-grid editorial ordering independent from the spectrum ordering; previous/next, wheel, keyboard, and nearby swatches now traverse themes grouped by color similarity.
- Browser-tested five sampling points: red selected Swiss International (`#e2231a`), yellow-green selected Racer Brand (`#c8ff00`), cyan selected Cockpit (`#37e0c8`), violet selected Aurora 3D (`#8b5cf6`), and an inner neutral point selected Newspaper (`#111111`).
- Confirmed the red neighborhood contained only red-family accents, the current blue Classic selection showed blue-family nearby swatches, keyboard stepping remained functional, and mobile had zero horizontal overflow with 44 px visible swatches.
- Parsed the gallery inline script, completed the Vite production build, and passed targeted `git diff --check`.

final result: passed
