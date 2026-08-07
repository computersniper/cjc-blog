/* =============================================================================
 *  THEME REGISTRY
 * -----------------------------------------------------------------------------
 *  The catalogue of every homepage style. Read by:
 *    - /themes.html          (the gallery / picker)
 *    - the floating switcher  (labels)
 *  Each theme lives at /themes/<id>/index.html and reads its content from
 *  /shared/profile.js via CJCData. "00-classic" is the original homepage at "/".
 *
 *  Fields:
 *    id      unique slug + folder name
 *    name    display name {en, zh}
 *    blurb   one-line art-direction description {en, zh}
 *    accent  primary accent color (used for the gallery card + switcher)
 *    bg      gallery card background (CSS color/gradient) evoking the style
 *    fg      gallery card foreground/text color
 *    font    short typography note (shown as a chip)
 * ========================================================================== */
window.CJC_THEMES = [
  {
    id: "00-classic",
    name: { en: "Classic", zh: "经典版" },
    blurb: { en: "The original portfolio — clean navy & blue, the reference design.", zh: "最初的作品集 —— 干净的藏青与蓝，基准设计。" },
    accent: "#0056b3", bg: "linear-gradient(135deg,#01143e,#5f88e0)", fg: "#ffffff", font: "Poppins",
  },
  {
    id: "01-swiss",
    name: { en: "Swiss International", zh: "瑞士国际主义" },
    blurb: { en: "Strict grid, Helvetica, red accent, oversized numerals.", zh: "严格网格、Helvetica、红色强调、超大编号。" },
    accent: "#e2231a", bg: "#f4f4f2", fg: "#111111", font: "Helvetica / Inter",
  },
  {
    id: "02-brutalist",
    name: { en: "Neo-Brutalist", zh: "新粗野主义" },
    blurb: { en: "Thick black borders, hard offset shadows, raw blocks, mono.", zh: "粗黑边框、硬阴影、原始色块、等宽字体。" },
    accent: "#ffde00", bg: "#fffb00", fg: "#000000", font: "Space Mono",
  },
  {
    id: "03-glass",
    name: { en: "Glassmorphism", zh: "玻璃拟态" },
    blurb: { en: "Frosted panels floating over a vivid gradient, soft blur.", zh: "磨砂玻璃面板漂浮在鲜艳渐变之上，柔和模糊。" },
    accent: "#7c5cff", bg: "linear-gradient(135deg,#c471f5,#12c2e9)", fg: "#ffffff", font: "Inter",
  },
  {
    id: "04-terminal",
    name: { en: "Terminal", zh: "终端命令行" },
    blurb: { en: "Green-on-black CRT, blinking cursor, ASCII, prompt nav.", zh: "黑底绿字 CRT、闪烁光标、ASCII、命令行导航。" },
    accent: "#33ff66", bg: "#0a0e0a", fg: "#33ff66", font: "JetBrains Mono",
  },
  {
    id: "05-editorial",
    name: { en: "Editorial", zh: "杂志编辑" },
    blurb: { en: "Serif display, multi-column text, drop caps, refined print.", zh: "衬线大标题、多栏排版、首字下沉、精致印刷感。" },
    accent: "#b8433a", bg: "#f7f3ec", fg: "#1a1a1a", font: "Playfair Display",
  },
  {
    id: "06-cyberpunk",
    name: { en: "Cyberpunk Neon", zh: "赛博朋克霓虹" },
    blurb: { en: "Dark HUD, magenta & cyan glow, glitch, scanlines.", zh: "暗色 HUD、洋红与青色辉光、故障、扫描线。" },
    accent: "#ff2bd6", bg: "linear-gradient(160deg,#0d0221,#241734)", fg: "#00eaff", font: "Orbitron",
  },
  {
    id: "07-minimal",
    name: { en: "Minimal Mono", zh: "极简黑白" },
    blurb: { en: "Pure black & white, vast whitespace, quiet restraint.", zh: "纯粹黑白、大量留白、克制安静。" },
    accent: "#000000", bg: "#ffffff", fg: "#111111", font: "Inter Tight",
  },
  {
    id: "08-bento",
    name: { en: "Bento Grid", zh: "便当网格" },
    blurb: { en: "Modular rounded tiles of many sizes, keynote-style.", zh: "大小不一的圆角模块卡片，发布会风格。" },
    accent: "#0a84ff", bg: "linear-gradient(135deg,#eef2f7,#dfe7f0)", fg: "#0b1424", font: "SF Pro / Inter",
  },
  {
    id: "09-retro90s",
    name: { en: "Retro 90s Web", zh: "复古 90 年代" },
    blurb: { en: "Beveled boxes, tiled background, visitor-counter nostalgia.", zh: "斜角边框、平铺背景、访客计数器怀旧。" },
    accent: "#ff00ff", bg: "#008080", fg: "#ffff00", font: "Comic / System",
  },
  {
    id: "10-aero",
    name: { en: "Y2K Frutiger Aero", zh: "Y2K 千禧" },
    blurb: { en: "Glossy aqua glass buttons, skies & bubbles, hopeful gloss.", zh: "光泽水感玻璃按钮、天空与气泡、乐观光泽。" },
    accent: "#22b3ff", bg: "linear-gradient(135deg,#aee1ff,#c9f7d4)", fg: "#0a3a5a", font: "Segoe / Myriad",
  },
  {
    id: "11-vaporwave",
    name: { en: "Vaporwave", zh: "蒸汽波" },
    blurb: { en: "Sunset grid horizon, pink & purple, katakana, VHS haze.", zh: "落日网格地平线、粉紫、片假名、VHS 雾感。" },
    accent: "#ff71ce", bg: "linear-gradient(180deg,#2b1055,#7597de)", fg: "#01cdfe", font: "Retro Sans",
  },
  {
    id: "12-neumorphism",
    name: { en: "Neumorphism", zh: "新拟物" },
    blurb: { en: "Soft extruded shapes on one gray surface, gentle shadows.", zh: "单一灰面上的柔和挤出形体、轻微阴影。" },
    accent: "#6d5dfc", bg: "#e0e5ec", fg: "#4b5563", font: "Nunito",
  },
  {
    id: "13-newspaper",
    name: { en: "Newspaper", zh: "报纸印刷" },
    blurb: { en: "Broadsheet masthead, blackletter, columns, hairline rules.", zh: "大报报头、哥特体、分栏、细线分隔。" },
    accent: "#111111", bg: "#f5f2e9", fg: "#1a1a1a", font: "Old Standard / Georgia",
  },
  {
    id: "14-luxury",
    name: { en: "Dark Luxury", zh: "暗夜奢华" },
    blurb: { en: "Black & gold, serif display, generous premium spacing.", zh: "黑金配色、衬线大标题、奢华留白。" },
    accent: "#c8a24a", bg: "linear-gradient(135deg,#0c0c0c,#1c1a15)", fg: "#e9d9a8", font: "Cormorant" ,
  },
  {
    id: "15-artdeco",
    name: { en: "Art Deco", zh: "装饰艺术" },
    blurb: { en: "Geometric gold on emerald, symmetry, sunburst motifs.", zh: "翡翠底金色几何、对称、旭日纹样。" },
    accent: "#d4af37", bg: "linear-gradient(135deg,#0b3d2e,#125c46)", fg: "#f0e6c8", font: "Poiret One",
  },
  {
    id: "16-memphis",
    name: { en: "Memphis", zh: "孟菲斯" },
    blurb: { en: "Bold primaries, squiggles & confetti shapes, 80s postmodern.", zh: "大胆原色、波浪与碎屑形状、80 年代后现代。" },
    accent: "#ff4d6d", bg: "#fdf0d5", fg: "#1d1d1d", font: "Poppins / Fredoka",
  },
  {
    id: "17-organic",
    name: { en: "Organic Nature", zh: "自然有机" },
    blurb: { en: "Earthy greens & cream, soft blobs, calm hand-drawn feel.", zh: "大地绿与米色、柔软色块、平静手绘感。" },
    accent: "#6a8d4f", bg: "linear-gradient(135deg,#eef3e2,#d9e4c3)", fg: "#2f3a24", font: "Fraunces",
  },
  {
    id: "18-notion",
    name: { en: "Notion Docs", zh: "Notion 文档" },
    blurb: { en: "Sidebar, blocks, emoji, calm productivity aesthetic.", zh: "侧边栏、区块、Emoji、平静的效率美学。" },
    accent: "#2f6fed", bg: "#ffffff", fg: "#37352f", font: "Inter / System",
  },
  {
    id: "19-aurora",
    name: { en: "Aurora 3D", zh: "极光渐变" },
    blurb: { en: "Animated aurora background, floating glass, depth & motion.", zh: "流动极光背景、漂浮玻璃、纵深与动效。" },
    accent: "#8b5cf6", bg: "linear-gradient(135deg,#0f172a,#312e81,#0ea5e9)", fg: "#e2e8f0", font: "Space Grotesk",
  },
  {
    id: "20-comic",
    name: { en: "Comic / Manga", zh: "漫画风" },
    blurb: { en: "Halftone dots, speech bubbles, bold ink, black-white-red panels.", zh: "半调网点、对话气泡、粗墨线、黑白红分格。" },
    accent: "#e63946", bg: "#fffef7", fg: "#111111", font: "Bangers / Ink",
  },
  {
    id: "21-liquidglass",
    name: { en: "Liquid Glass", zh: "液态玻璃" },
    blurb: { en: "Apple-style refractive liquid glass — specular highlights & depth.", zh: "苹果风折射液态玻璃 —— 高光反射与纵深。" },
    accent: "#0a84ff", bg: "linear-gradient(135deg,#8ec5fc,#e0c3fc)", fg: "#0b1020", font: "SF Pro / Inter",
  },
  {
    id: "22-animated",
    name: { en: "Motion", zh: "动画风" },
    blurb: { en: "Motion-first — animated gradients, parallax, morphing, floaty entrances.", zh: "动效优先 —— 流动渐变、视差、变形、漂浮入场。" },
    accent: "#ff3d81", bg: "linear-gradient(135deg,#f857a6,#ff5858,#5b6cff)", fg: "#ffffff", font: "Clash / Sora",
  },
  {
    id: "23-pixel",
    name: { en: "Pixel Game", zh: "像素游戏" },
    blurb: { en: "8-bit RPG — pixel font, chunky UI, HP bars, PRESS START.", zh: "8 位 RPG —— 像素字体、方块 UI、血条、PRESS START。" },
    accent: "#ffcc00", bg: "#1a1c2c", fg: "#f4f4f4", font: "Press Start 2P",
  },
  {
    id: "24-render3d",
    name: { en: "3D Render", zh: "炫酷渲染" },
    blurb: { en: "Cinematic studio render — glossy chrome & glass materials, deep shadows.", zh: "影棚级渲染 —— 光泽铬金属与玻璃材质、深邃阴影。" },
    accent: "#00e0d6", bg: "linear-gradient(160deg,#0e1116,#1b2230)", fg: "#eef3f8", font: "Space Grotesk",
  },
  {
    id: "25-starry",
    name: { en: "Starry Sky", zh: "星空" },
    blurb: { en: "Cosmic night — twinkling starfield, nebula gradients, shooting stars.", zh: "宇宙之夜 —— 闪烁星野、星云渐变、流星。" },
    accent: "#8ab4ff", bg: "linear-gradient(180deg,#05061a,#0b1e4d)", fg: "#dfe7ff", font: "Sora",
  },
  {
    id: "26-astronaut",
    name: { en: "Astronaut", zh: "宇航员" },
    blurb: { en: "Mission control — space explorer, planets, HUD gauges, NASA vibe.", zh: "任务控制 —— 太空探索、星球、HUD 仪表、NASA 感。" },
    accent: "#ff7043", bg: "linear-gradient(160deg,#0a0f2c,#152046)", fg: "#e8ecff", font: "Orbitron / Inter",
  },
  {
    id: "27-deepsea",
    name: { en: "Deep Sea", zh: "深海" },
    blurb: { en: "Bioluminescent depths — rising bubbles, caustics, calm abyssal blue.", zh: "生物荧光深渊 —— 上升气泡、水光焦散、静谧深蓝。" },
    accent: "#25d0c0", bg: "linear-gradient(180deg,#021b2e,#053a4d)", fg: "#d6f4ff", font: "Nunito Sans",
  },
  {
    id: "28-apple",
    name: { en: "Apple", zh: "苹果风" },
    blurb: { en: "Keynote clean — huge headlines, vast whitespace, product-page polish.", zh: "发布会级简洁 —— 巨型标题、大量留白、产品页精致度。" },
    accent: "#0071e3", bg: "#fbfbfd", fg: "#1d1d1f", font: "SF Pro Display",
  },
  {
    id: "29-guofeng",
    name: { en: "Chinese Ink", zh: "中国古风" },
    blurb: { en: "Ink-wash & rice paper — red seals, vertical calligraphy, jade & cinnabar.", zh: "水墨宣纸 —— 朱红印章、竖排书法、青玉与朱砂。" },
    accent: "#a8322d", bg: "#efe7d6", fg: "#241d17", font: "Ma Shan Zheng / Noto Serif SC",
  },
  {
    id: "30-steampunk",
    name: { en: "Steampunk", zh: "蒸汽朋克" },
    blurb: { en: "Victorian brass & gears — copper, leather, aged paper, mechanical gauges.", zh: "维多利亚黄铜齿轮 —— 紫铜、皮革、旧纸、机械仪表。" },
    accent: "#c98a2b", bg: "linear-gradient(160deg,#2a1c10,#3d2b18)", fg: "#e8d5b0", font: "Cinzel / IM Fell",
  },
  {
    id: "31-cybercity",
    name: { en: "Cyber City", zh: "赛博都市" },
    blurb: { en: "Rain-slick neon streets, kanji signage, Blade-Runner reflections.", zh: "雨夜霓虹街、汉字招牌、银翼杀手式反射。" },
    accent: "#ff2e88", bg: "linear-gradient(180deg,#0b0518,#241246)", fg: "#7df9ff", font: "Rajdhani",
  },
  {
    id: "32-retrowave",
    name: { en: "70s Retro", zh: "复古港风" },
    blurb: { en: "Warm 70s analog — mustard & rust, grain, groovy rounded type.", zh: "温暖 70 年代模拟感 —— 姜黄与铁锈、颗粒、复古圆体。" },
    accent: "#e07a3f", bg: "linear-gradient(135deg,#f0d9a7,#e0a35e)", fg: "#3a2417", font: "Frankfurter / Poppins",
  },
  {
    id: "33-aiarena",
    name: { en: "AI Arena", zh: "AI 竞技场" },
    blurb: { en: "Esports leaderboard — versus panels, stat bars, glowing rank rings.", zh: "电竞排行榜 —— 对战面板、数据条、发光段位环。" },
    accent: "#22e0a1", bg: "linear-gradient(160deg,#0a0f1e,#141d3a)", fg: "#e6f0ff", font: "Chakra Petch",
  },
  {
    id: "34-stadium",
    name: { en: "Stadium", zh: "足球场" },
    blurb: { en: "Match-day pitch — grass stripes, floodlights, scoreboard graphics.", zh: "比赛日草皮 —— 草地条纹、泛光灯、记分牌图形。" },
    accent: "#2fbf4f", bg: "linear-gradient(160deg,#0c5a2a,#1a8f43)", fg: "#f2fff4", font: "Teko / Inter",
  },
  {
    id: "35-barca",
    name: { en: "Blaugrana", zh: "巴萨风" },
    blurb: { en: "Blue & garnet stripes, club crest motifs, Camp Nou gold.", zh: "蓝红条纹、俱乐部纹章元素、诺坎普金色。" },
    accent: "#a50044", bg: "linear-gradient(100deg,#004d98 0 50%,#a50044 50% 100%)", fg: "#ffed02", font: "Oswald",
  },
  {
    id: "36-vault",
    name: { en: "The Vault", zh: "金融保险柜" },
    blurb: { en: "Bank-vault fintech — brushed steel, gold bars, dial lock, secure luxe.", zh: "银行保险柜金融 —— 拉丝钢、金条、密码转盘、安全奢华。" },
    accent: "#d4af37", bg: "linear-gradient(160deg,#0e1116,#1a222c)", fg: "#e9edf2", font: "Saira / Inter",
  },
  {
    id: "37-win97",
    name: { en: "Windows 97", zh: "Win97" },
    blurb: { en: "Win9x desktop — teal wallpaper, beveled windows, Start menu, taskbar.", zh: "Win9x 桌面 —— 青绿壁纸、立体窗口、开始菜单、任务栏。" },
    accent: "#000080", bg: "#008080", fg: "#000000", font: "MS Sans Serif / Tahoma",
  },
  {
    id: "38-crt",
    name: { en: "CRT Monitor", zh: "老式显示器" },
    blurb: { en: "Vintage tube — heavy scanlines, screen curvature, phosphor glow, bezel.", zh: "复古显像管 —— 浓重扫描线、屏幕曲率、荧光辉光、外框。" },
    accent: "#ffb000", bg: "radial-gradient(120% 120% at 50% 50%,#1a1508,#0a0803)", fg: "#ffb000", font: "VT323 / IBM Plex Mono",
  },
  {
    id: "39-nokia",
    name: { en: "Nokia LCD", zh: "诺基亚绿屏" },
    blurb: { en: "Nokia 3310 monochrome LCD — pea-green screen, dot-matrix ink, phone chrome.", zh: "诺基亚 3310 单色 LCD —— 豆绿屏、点阵字、手机外壳。" },
    accent: "#3a3f30", bg: "#9ea888", fg: "#2f3323", font: "Pixelify Sans / VT323",
  },
  {
    id: "40-cockpit",
    name: { en: "Cockpit", zh: "驾驶舱" },
    blurb: { en: "Spacecraft flight deck — dense switch panels, gauges, MFD screens, indicator lights.", zh: "飞船驾驶舱 —— 密布开关面板、仪表、多功能屏、指示灯。" },
    accent: "#37e0c8", bg: "linear-gradient(160deg,#0b0f12,#181f27)", fg: "#cfe0ea", font: "Chakra Petch / IBM Plex Mono",
  },
  {
    id: "41-sniper",
    name: { en: "Sniper", zh: "狙击手" },
    blurb: { en: "Scope reticle HUD — mil-dot crosshair, range & windage, precision optics.", zh: "瞄准镜 HUD —— 密位十字线、测距与风偏、精密光学。" },
    accent: "#d13b3b", bg: "radial-gradient(circle at 50% 45%,#141a10,#05070a)", fg: "#c6d0b6", font: "Chakra Petch / Share Tech Mono",
  },
  {
    id: "42-military",
    name: { en: "Spec-Ops", zh: "特种部队" },
    blurb: { en: "Tactical field kit — stencil mil-spec type, olive camo, patches, coordinates.", zh: "战术野战风 —— 军用模板字、橄榄迷彩、臂章、坐标。" },
    accent: "#c1892f", bg: "linear-gradient(160deg,#20241a,#2e3423)", fg: "#e6e4d2", font: "Stardos Stencil / Oswald",
  },
  {
    id: "43-hacker",
    name: { en: "Hacker", zh: "黑客" },
    blurb: { en: "Matrix code-rain, green phosphor glow, hex dumps, ACCESS GRANTED.", zh: "矩阵代码雨、绿色辉光、十六进制、ACCESS GRANTED。" },
    accent: "#00ff41", bg: "#020a02", fg: "#7dffa1", font: "Share Tech Mono",
  },
  {
    id: "44-assassin",
    name: { en: "Assassin", zh: "刺客" },
    blurb: { en: "Hooded-creed dark elegance — crimson insignia, hidden-blade motif, stealth.", zh: "兜帽信条式暗黑优雅 —— 绯红徽记、袖剑元素、潜行。" },
    accent: "#b3122b", bg: "linear-gradient(160deg,#0b0b0d,#171215)", fg: "#e7e2dc", font: "Cinzel / Marcellus",
  },
  {
    id: "45-music",
    name: { en: "Music Player", zh: "音乐播放器" },
    blurb: { en: "Lo-fi player with generative BGM — the whole page pulses to the beat.", zh: "Lo-fi 播放器 + 生成式 BGM —— 整页随节拍跳动。" },
    accent: "#ff5e8a", bg: "linear-gradient(160deg,#1a1030,#2a1a4a)", fg: "#f0e9ff", font: "Sora / Space Grotesk",
  },
  {
    id: "46-glamour",
    name: { en: "Glamour", zh: "时尚大片" },
    blurb: { en: "Fashion-magazine glamour — art-deco pin-up illustration, editorial gloss.", zh: "时尚杂志大片 —— 装饰艺术复古插画、精致封面感。" },
    accent: "#ff4d7d", bg: "linear-gradient(160deg,#1a0e14,#2a1620)", fg: "#f6e7ec", font: "Playfair Display / Cormorant",
  },
  {
    id: "47-math",
    name: { en: "Mathematics", zh: "数学公式" },
    blurb: { en: "Chalkboard equations — real LaTeX formulas, proofs, graph paper.", zh: "黑板方程 —— 真实 LaTeX 公式、推导、坐标纸。" },
    accent: "#7fbfff", bg: "#12261f", fg: "#eef3ea", font: "KaTeX / Latin Modern",
  },
  {
    id: "48-spy",
    name: { en: "1940s Spy", zh: "谍战档案" },
    blurb: { en: "1940s KMT-era espionage dossier — aged files, red seals, typewriter, 绝密.", zh: "民国军统谍战档案 —— 泛黄卷宗、朱红印章、打字机、绝密。" },
    accent: "#a8322d", bg: "linear-gradient(160deg,#2a2419,#38301f)", fg: "#e7dcc2", font: "Special Elite / Noto Serif SC",
  },
  {
    id: "49-casino",
    name: { en: "Casino", zh: "娱乐城" },
    blurb: { en: "Macau neon casino — gaudy gold & red, flashing promo banners, chips, cards, slots.", zh: "澳门霓虹娱乐城 —— 浮夸金红、闪烁广告横幅、筹码、扑克、老虎机。" },
    accent: "#ffd23f", bg: "linear-gradient(160deg,#3a0b0b,#7a0f12)", fg: "#ffe9b0", font: "ZCOOL KuaiLe / Oswald",
  },
  {
    id: "50-detective",
    name: { en: "Detective", zh: "福尔摩斯" },
    blurb: { en: "Victorian sleuth — gaslit London fog, evidence board, magnifier, case files.", zh: "维多利亚神探 —— 煤气灯伦敦雾、线索板、放大镜、案件卷宗。" },
    accent: "#c19a4b", bg: "linear-gradient(160deg,#191b16,#24261d)", fg: "#e6e0cf", font: "Playfair Display / Special Elite",
  },
  {
    id: "51-mod",
    name: { en: "Mod", zh: "摩登风" },
    blurb: { en: "1960s mod op-art — bold geometric targets & stripes, black-white + hot pop.", zh: "60 年代摩登欧普 —— 大胆几何靶环与条纹、黑白 + 亮色。" },
    accent: "#ff5a00", bg: "#f4efe6", fg: "#141414", font: "Righteous / Poppins",
  },
  {
    id: "52-urbanchic",
    name: { en: "Urban Chic", zh: "都市丽人" },
    blurb: { en: "City-chic lifestyle — soft blush & rose-gold, skyline, boutique editorial.", zh: "都市时尚生活 —— 柔粉与玫瑰金、天际线、精品杂志感。" },
    accent: "#c98a7a", bg: "linear-gradient(160deg,#faf3ef,#f3e6e2)", fg: "#33292b", font: "Cormorant / Jost",
  },
  {
    id: "53-spiderman",
    name: { en: "Web-Slinger", zh: "蜘蛛侠" },
    blurb: { en: "Web-slinger hero — red & blue, spider-web overlay, comic energy, NYC swing.", zh: "网络英雄 —— 红蓝配色、蛛网纹理、漫画活力、纽约飞荡。" },
    accent: "#e21b2c", bg: "linear-gradient(160deg,#12224e,#3a0e16)", fg: "#f4f6ff", font: "Bangers / Poppins",
  },
  {
    id: "54-f1",
    name: { en: "Formula 1", zh: "F1 赛车" },
    blurb: { en: "Race-day telemetry — carbon fibre, speed lines, lap timing, DRS red.", zh: "比赛日遥测 —— 碳纤维、速度线、圈速计时、DRS 红。" },
    accent: "#e10600", bg: "linear-gradient(160deg,#0a0c0f,#171b22)", fg: "#f2f4f8", font: "Titillium Web / Oswald",
  },
  {
    id: "55-3d",
    name: { en: "3D Depth", zh: "3D 立体" },
    blurb: { en: "Isometric extruded blocks, parallax layers, bold dimensional type.", zh: "等距挤出方块、视差分层、粗体立体字。" },
    accent: "#6c5ce7", bg: "linear-gradient(160deg,#12131f,#20243a)", fg: "#eef0ff", font: "Space Grotesk",
  },
  {
    id: "56-potter",
    name: { en: "Wizardry", zh: "魔法学院" },
    blurb: { en: "Wizarding school — candlelit parchment, house crests, spells, golden magic.", zh: "魔法学院 —— 烛光羊皮纸、学院纹章、咒语、金色魔法。" },
    accent: "#c9a227", bg: "linear-gradient(160deg,#160f0a,#241a12)", fg: "#ecdcb8", font: "Cinzel / Cormorant",
  },
  {
    id: "57-cardrive",
    name: { en: "Rain Drive", zh: "雨中驾驶" },
    blurb: { en: "A cinematic rainy driver-seat portrait with a real dashboard, open road, and restrained editorial type.", zh: "真实仪表台与雨中公路构成电影感驾驶位静帧，并以克制的编辑排版承载作品内容。" },
    accent: "#d53b32", bg: "linear-gradient(160deg,#0b0d0f,#30363a)", fg: "#f1efe9", font: "Georgia / Arial",
  },
  {
    id: "58-realistic",
    name: { en: "Scenic", zh: "写实美景" },
    blurb: { en: "Cinematic landscapes — layered vistas cycling dawn to dusk to night.", zh: "电影级风景 —— 层叠远景在晨昏夜之间流转。" },
    accent: "#4aa3df", bg: "linear-gradient(180deg,#f7b26a,#3a6ea5)", fg: "#0e1a24", font: "Inter / Fraunces",
  },
  {
    id: "59-seasons",
    name: { en: "Four Seasons", zh: "四季" },
    blurb: { en: "Scroll spring→summer→autumn→winter — palette & scenery morph as you go.", zh: "滑动经历 春→夏→秋→冬 —— 配色与景致随之流转。" },
    accent: "#e88a3c", bg: "linear-gradient(180deg,#a8d672,#f2c14e,#d9642a,#cfe3ee)", fg: "#2a2418", font: "Fraunces / Nunito",
  },
  {
    id: "60-radio",
    name: { en: "Radio Waves", zh: "无线电台" },
    blurb: { en: "Walkie-talkie comms — tuning dial, waveform, static, over-and-out.", zh: "对讲机通讯 —— 调频转盘、波形、电流杂讯、通话完毕。" },
    accent: "#ffb43a", bg: "linear-gradient(160deg,#0c0f0c,#181d17)", fg: "#d7e2c9", font: "Share Tech Mono / Oswald",
  },
  {
    id: "61-chibi",
    name: { en: "Chibi", zh: "Q 版卡通" },
    blurb: { en: "Kawaii chibi — rounded pastel mascots, sparkles, sticker cuteness.", zh: "萌系 Q 版 —— 圆润粉彩吉祥物、闪光、贴纸可爱风。" },
    accent: "#ff86b3", bg: "linear-gradient(160deg,#fff2f7,#eaf4ff)", fg: "#4a3a44", font: "Baloo 2 / Fredoka",
  },
  {
    id: "62-lego",
    name: { en: "Bricks", zh: "乐高世界" },
    blurb: { en: "Plastic brick world — studs, primary colors, blocky minifig fun.", zh: "塑料积木世界 —— 凸点、三原色、方块小人乐趣。" },
    accent: "#e3000b", bg: "linear-gradient(160deg,#ffd200,#ff8a00)", fg: "#141414", font: "Fredoka / Poppins",
  },
  {
    id: "63-romantic",
    name: { en: "Romance", zh: "浪漫" },
    blurb: { en: "Love-letter romance — blush & rose gold, petals, elegant script.", zh: "情书般浪漫 —— 粉与玫瑰金、花瓣、优雅手写体。" },
    accent: "#e5698e", bg: "linear-gradient(160deg,#fbeef0,#f6e3ec)", fg: "#4a2b34", font: "Parisienne / Cormorant",
  },
  {
    id: "64-monet",
    name: { en: "Monet Garden", zh: "莫奈花园" },
    blurb: { en: "Impressionist Giverny — water lilies, soft brush-dab textures, pastel light.", zh: "印象派吉维尼 —— 睡莲、柔和笔触肌理、粉彩光影。" },
    accent: "#7aa6c2", bg: "linear-gradient(160deg,#dfeadb,#cfe0e8)", fg: "#33423f", font: "Cormorant / Fraunces",
  },
  {
    id: "65-castle",
    name: { en: "Castle", zh: "西式城堡" },
    blurb: { en: "Medieval stronghold — stone walls, heraldic banners, torchlight, royal gold.", zh: "中世纪城堡 —— 石墙、纹章旗帜、火炬、皇家金色。" },
    accent: "#c9a24a", bg: "linear-gradient(160deg,#20242b,#2c3138)", fg: "#e8e2d2", font: "Cinzel / MedievalSharp",
  },
  {
    id: "66-racer",
    name: { en: "Racer Brand", zh: "车手品牌" },
    blurb: { en: "Athlete personal brand — lime & charcoal, huge type, monogram, on/off-track.", zh: "运动员个人品牌 —— 荧光绿与炭黑、超大字体、字母徽标、赛道内外。" },
    accent: "#c8ff00", bg: "linear-gradient(160deg,#111111,#1d1d1d)", fg: "#f4f4f4", font: "Anton / Inter",
  },
  {
    id: "67-orange-editorial",
    name: { en: "Orange Editorial", zh: "橙色编辑部" },
    blurb: { en: "Cream-and-orange creative direction with blurred portraiture and monumental type.", zh: "奶油与亮橙交叠，模糊人像配合纪念碑式排版。" },
    accent: "#f05a28", bg: "linear-gradient(145deg,#f4ead8,#ef6a2c)", fg: "#1a1713", font: "Cormorant / Inter",
  },
  {
    id: "68-sanctuary",
    name: { en: "Sanctuary", zh: "静谧居所" },
    blurb: { en: "A cinematic interior sanctuary in hazy neutrals and chair-yellow light.", zh: "朦胧中性色与椅背黄光构成的电影感静谧空间。" },
    accent: "#d9b42c", bg: "linear-gradient(145deg,#d8d1c5,#a49783)", fg: "#29241d", font: "Italiana / Manrope",
  },
  {
    id: "69-violet-os",
    name: { en: "Violet OS", zh: "紫域系统" },
    blurb: { en: "An experimental violet operating system of grids, windows, and wireframe terrain.", zh: "由网格、浮窗与线框地形组成的实验性紫色操作系统。" },
    accent: "#7d5cff", bg: "linear-gradient(145deg,#8c6cff,#4c36a8)", fg: "#f7f4ff", font: "Space Grotesk / IBM Plex Mono",
  },
  {
    id: "70-warm-editorial",
    name: { en: "Warm Editorial", zh: "暖调手帐" },
    blurb: { en: "Rust, olive, and paper-white shape a tactile editorial planner.", zh: "锈橙、橄榄绿与纸白色构成有触感的编辑式手帐。" },
    accent: "#c95732", bg: "linear-gradient(145deg,#f1eadb,#c98b66)", fg: "#302a20", font: "Fraunces / Caveat",
  },
  {
    id: "71-generative-lab",
    name: { en: "Generative Lab", zh: "生成实验室" },
    blurb: { en: "A cobalt algorithm console with luminous forms, controls, and live technical data.", zh: "钴蓝算法控制台，发光形态、参数控件与实时技术数据并置。" },
    accent: "#135dff", bg: "linear-gradient(145deg,#07142e,#145bff)", fg: "#e9f2ff", font: "Sora / IBM Plex Mono",
  },
  {
    id: "72-paper-journal",
    name: { en: "Paper Journal", zh: "纸上日记" },
    blurb: { en: "A conversational hand-drawn journal on warm paper with imperfect ink marks.", zh: "温暖纸张、自然对话与不完美墨迹组成的手绘日记。" },
    accent: "#e95d3b", bg: "#efe2c9", fg: "#211c17", font: "Caveat / Patrick Hand",
  },
  {
    id: "73-cardrive-motion",
    name: { en: "Road in Motion", zh: "公路动态影像" },
    blurb: { en: "A cinematic first-person drive with real dashboard footage, restrained motion, and editorial portfolio layers.", zh: "真实驾驶位影像持续向前，以克制动态与暗色编辑排版呈现作品内容。" },
    accent: "#d9793f", bg: "linear-gradient(160deg,#11181d,#6e5038)", fg: "#f5efe6", font: "Georgia / Arial",
  },
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = window.CJC_THEMES;
}
