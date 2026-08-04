/* =============================================================================
 *  CJC PROFILE — SINGLE SOURCE OF TRUTH
 * -----------------------------------------------------------------------------
 *  Every themed homepage reads its personal-info content from THIS file.
 *  Edit here once and all 20+ themes update automatically.
 *
 *  Conventions:
 *   - Bilingual text is written as { en: "...", zh: "..." }.
 *     Use CJCData.t(field) in a theme to pick the right language.
 *   - Plain strings (that are language-neutral) are left as-is.
 *   - Asset paths are ROOT-ABSOLUTE (leading "/") so they resolve from any
 *     page depth (e.g. /themes/03-brutalist/index.html).
 *   - Articles & Projects are NOT here — they are dynamic, served by the
 *     backend API and fetched via CJCData.fetchArticles()/fetchProjects().
 * ========================================================================== */
window.CJC_PROFILE = {
  // --- Brand / site meta -----------------------------------------------------
  brand: "CaiJiechao",
  favicon: "/index_page/img/favicon.ico",
  icp: "粤ICP备2024277938号",
  icpUrl: "https://beian.miit.gov.cn/",

  // --- Identity --------------------------------------------------------------
  name: { en: "Cai Jiechao", zh: "蔡杰超" },
  greeting: { en: "Hi, my name is", zh: "你好，我是" },
  headline: { en: "I build things for the world", zh: "我为世界构建有趣的产品" },
  role: { en: "Software Developer", zh: "软件开发者" },
  title: {
    en: "A Computer Science Student based in Guangzhou, China",
    zh: "一名坐标广州的计算机科学专业学生",
  },
  location: { en: "Guangzhou, China", zh: "中国 · 广州" },

  // --- Portrait images (several angles available) ----------------------------
  avatar: "/index_page/img/me.jpg",
  avatarAlt: "/index_page/img/me.png",
  hero: "/index_page/img/hero.png",

  // --- Bio (two paragraphs) --------------------------------------------------
  bio: [
    {
      en: "I'm passionate about creating useful, unique, and elegant products. I keep my code clean, readable, modular, and well-refactored. Currently, I am deeply focused on Agent & LLM Engineering, exploring LLM capability boundaries, and constructing RAG knowledge bases.",
      zh: "我热衷于创造实用、独特和优雅的产品。我保持代码简洁、可读、模块化且重构良好。目前，我正深度专注于 Agent 与大语言模型（LLM）工程，探索大模型能力边界，并构建 RAG 知识库。",
    },
    {
      en: "Moreover, I am fluent in English (passed CET4 and CET6 exams, IELTS 6.5), which enables me to effectively communicate and collaborate with programmers globally.",
      zh: "此外，我英语流利（通过四六级，雅思 6.5 分），这使我能够有效地与全球程序员进行沟通和协作。",
    },
  ],

  // --- CV downloads ----------------------------------------------------------
  cv: {
    zh: "/contact/caijiechao-cv-chinese.pdf",
    en: "/contact/caijiechao-cv-english.pdf",
  },

  // --- Contact / social ------------------------------------------------------
  contact: {
    email: "contact@caijiechao.com",
    emailTo: "2651159710@qq.com",
    phone: "+86-13602705148",
    phoneHref: "tel:+8613602705148",
    github: "https://github.com/computersniper",
    githubUser: "computersniper",
    wechatQrImage: "/contact/we_chat_qr_code.jpg",
    wechatQrPage: "/index_page/qr_code.html",
  },

  // --- Education -------------------------------------------------------------
  education: [
    {
      school: { en: "The University of Hong Kong (HKU)", zh: "香港大学 (HKU)" },
      degree: { en: "MSc in Computer Science", zh: "计算机科学理学硕士" },
      period: "2026.9 – 2027.8",
      note: {
        en: "Expected · Focus: Large Models & NLP, Multi-Agent Systems",
        zh: "预期 · 方向：大模型与自然语言处理、多智能体系统",
      },
    },
    {
      school: {
        en: "BNU-HKBU UIC & University of Malaya (Exchange)",
        zh: "北京师范大学-香港浸会大学联合国际学院 & 马来亚大学 (交换)",
      },
      degree: { en: "BSc in Computer Science", zh: "计算机科学理学学士" },
      period: "2022.9 – 2026.6",
      note: {
        en: "Top 15%, Second-Class Scholarship",
        zh: "前 15%，二等奖学金",
      },
    },
  ],

  // --- Skills / tech stack (flat list, grouped 3+3 in the classic layout) -----
  skills: [
    "Python, Java, TS, Kotlin",
    "FastAPI, Next.js, SQLAlchemy",
    "Agent, RAG, Playwright",
    "Docker, Asyncio, PostgreSQL",
    "Data Structures & Networking",
    "Vibe-Coding, Cursor, Trae, Claude Code",
  ],
  // Individual tags — handy for chip/tag-cloud style themes.
  skillTags: [
    "Python", "Java", "TypeScript", "Kotlin",
    "FastAPI", "Next.js", "SQLAlchemy", "PostgreSQL",
    "Agent", "RAG", "LLM", "Playwright",
    "Docker", "Asyncio", "Linux",
    "Cursor", "Claude Code", "Vibe-Coding",
  ],

  // --- Core courses ----------------------------------------------------------
  courses: [
    {
      icon: "fa-sitemap",
      title: { en: "Deep Learning & Neural Networks", zh: "深度学习与神经网络" },
      desc: {
        en: "Studied advanced AI techniques including Deep Learning and Neural Networks architectures, building strong foundations for LLM engineering.",
        zh: "学习了包括深度学习和神经网络架构在内的高级人工智能技术，为大模型工程打下坚实基础。",
      },
    },
    {
      icon: "fa-language",
      title: { en: "Natural Language Processing", zh: "自然语言处理" },
      desc: {
        en: "Learned text processing, language modeling, and advanced NLP techniques, essential for understanding and developing modern AI Agent systems.",
        zh: "学习了文本处理、语言建模和高级自然语言处理技术，这对于理解和开发现代 AI 智能体系统至关重要。",
      },
    },
    {
      icon: "fa-cogs",
      title: { en: "Machine Learning", zh: "机器学习" },
      desc: {
        en: "Mastered core ML algorithms, data preprocessing, and model evaluation metrics, applying them to solve complex predictive and classification problems.",
        zh: "掌握了核心机器学习算法、数据预处理和模型评估指标，并将其应用于解决复杂的预测和分类问题。",
      },
    },
    {
      icon: "fa-code",
      title: { en: "Data Structure & Algorithm", zh: "数据结构与算法" },
      desc: {
        en: "Learned fundamental to complex data structures and algorithms, analyzing time and space complexity to write optimized, high-performance code.",
        zh: "学习了从基础到复杂的数据结构和算法，分析时间和空间复杂度以编写优化、高性能的代码。",
      },
    },
    {
      icon: "fa-linux",
      title: { en: "Operating System", zh: "操作系统" },
      desc: {
        en: "Deeply understood OS principles including process scheduling, memory management, file systems, and Linux system programming.",
        zh: "深入理解操作系统原理，包括进程调度、内存管理、文件系统和 Linux 系统编程。",
      },
    },
    {
      icon: "fa-wifi",
      title: { en: "Data Communications & Networking", zh: "数据通信与网络" },
      desc: {
        en: "Learned the principles of data communication, OSI reference model, TCP/IP protocols, and applied theory through socket programming projects.",
        zh: "学习了数据通信原理、OSI 参考模型、TCP/IP 协议，并通过 Socket 编程项目应用了这些理论。",
      },
    },
  ],

  // --- Internship / experience ----------------------------------------------
  experience: [
    {
      company: { en: "Xnew", zh: "Xnew" },
      role: { en: "AI Platform R&D Intern", zh: "AI 平台研发实习生" },
      period: "2026.01 – 2026.04",
      summary: {
        en: "Company Description: An educational content service provider that has long supplied Olympiad-level high-quality math question data to AI vendors such as Tencent, Alibaba, and Xiaohongshu.",
        zh: "公司简介：一家教育内容服务商，长期为腾讯、阿里、小红书等 AI 厂商提供奥数级别的优质数学题库数据。",
      },
      bullets: [
        {
          en: "Full-Stack Development: Responsible for frontend and backend architecture, core feature development, and testing.",
          zh: "全栈开发：负责前端和后端架构、核心功能开发及测试。",
        },
        {
          en: "Data Pipeline: Built data cleaning and intelligent annotation pipelines.",
          zh: "数据流：构建数据清洗和智能标注的数据管道。",
        },
        {
          en: "LLM Integration: Integrated Large Language Models (LLMs) for evaluating math question quality (originality, difficulty, rigor, etc.).",
          zh: "大模型集成：集成大语言模型（LLM）以评估数学题目质量（原创性、难度、严谨性等）。",
        },
        {
          en: "Gateway & Metrics: Deployed LiteLLM gateway, optimized calling performance, and implemented usage statistics with automated daily reports.",
          zh: "网关与监控：部署 LiteLLM 网关，优化调用性能，并实现自动化日报的使用统计。",
        },
      ],
    },
  ],

  // --- Certificates ----------------------------------------------------------
  certificates: [
    {
      image: "/certificate/2402369.jpg",
      date: { en: "Jun 27, 2024", zh: "2024年6月27日" },
      tag: { en: "Mathematical Modeling", zh: "数学建模" },
      title: {
        en: "Successful participation in 2024 MCM competition",
        zh: "成功参与 2024 MCM 竞赛",
      },
      desc: {
        en: "Our topic is: An Analytical Framework for Assessing “Momentum” in Sports: Leveraging Random Forest and Fourier Transform Analysis",
        zh: "我们的主题是：评估体育运动中“势头”的分析框架：利用随机森林和傅里叶变换分析",
      },
    },
    {
      image: "/certificate/ielts.png",
      date: { en: "Aug 19, 2024", zh: "2024年8月19日" },
      tag: { en: "English Proficiency", zh: "英语能力" },
      title: { en: "IELTS Test", zh: "雅思考试" },
      desc: {
        en: "IELTS Overall Band Score: 6.5 (Speaking: 7.5)",
        zh: "雅思总分：6.5 (口语：7.5)",
      },
    },
  ],

  // --- Article category filters (keys must match backend `category` text) -----
  articleFilters: [
    { key: "all", label: { en: "All", zh: "全部" } },
    { key: "Algorithm", label: { en: "Algorithm", zh: "算法" } },
    { key: "Software Engineering", label: { en: "Software Engineering", zh: "软件工程" } },
    { key: "Reinforcement Learning", label: { en: "Reinforcement Learning", zh: "强化学习" } },
    { key: "LLM", label: { en: "LLM", zh: "大模型" } },
    { key: "System Design", label: { en: "System Design", zh: "系统设计" } },
  ],

  // --- Reusable UI strings (section titles, buttons, labels) ------------------
  ui: {
    nav_home: { en: "Home", zh: "首页" },
    nav_about: { en: "About", zh: "关于我" },
    nav_courses: { en: "Courses", zh: "核心课程" },
    nav_article: { en: "Articles", zh: "文章博客" },
    nav_portfolio: { en: "Projects", zh: "项目经历" },
    nav_certificate: { en: "Certificates", zh: "荣誉证书" },
    nav_internship: { en: "Experience", zh: "实习经历" },
    nav_contact: { en: "Contact", zh: "联系我" },

    download_cv: { en: "Download CV", zh: "下载简历" },
    choose_lang: { en: "Choose language", zh: "选择语言" },
    about_me: { en: "About Me", zh: "关于我" },
    about_desc: { en: "Know more about me", zh: "了解更多关于我的信息" },
    education_bg: { en: "Education", zh: "教育背景" },
    core_tech: { en: "Core Tech Stack", zh: "核心技术栈" },
    core_courses: { en: "Core Courses", zh: "核心课程" },
    internship_exp: { en: "Experience", zh: "实习经历" },
    latest_projects: { en: "Latest Projects", zh: "最新项目" },
    latest_articles: { en: "Latest Articles", zh: "最新文章" },
    certificates: { en: "Certificates", zh: "荣誉证书" },
    tech_stack: { en: "Tech Stack", zh: "技术栈" },
    get_in_touch: { en: "Get In Touch", zh: "联系我" },
    read_more: { en: "Read More", zh: "阅读全文" },
    view_project: { en: "View Project", zh: "查看项目" },
    drop_msg: { en: "Drop Me a message", zh: "给我留言" },
    inbox_open: {
      en: "My inbox is always open, I'll try my best to get back to you!",
      zh: "我的收件箱随时为您敞开，我会尽快回复！",
    },
    msg_box_title: {
      en: "My inbox is always open. Whether you have a question or just want to say hi or want to hire me, I'll try my best to get back to you!",
      zh: "我的收件箱随时为您敞开。无论您有问题，还是只想打个招呼，或是想雇佣我，我都会尽力回复！",
    },
    name_placeholder: { en: "Name", zh: "名字" },
    email_placeholder: { en: "Email", zh: "邮箱" },
    msg_placeholder: { en: "Your Message", zh: "您的留言" },
    send: { en: "Send", zh: "发送" },
    sending: { en: "Sending...", zh: "发送中..." },
    loading_articles: { en: "Loading articles...", zh: "正在加载文章..." },
    loading_projects: { en: "Loading projects...", zh: "正在加载项目..." },
    no_articles: { en: "No articles found for this category.", zh: "此分类下没有文章。" },
    no_projects: { en: "No projects found.", zh: "没有找到项目。" },
    admin_panel: { en: "Admin Panel", zh: "后台管理" },
    footer_desc: { en: "Designed & Developed by Cai Jiechao.", zh: "由 蔡杰超 设计与开发。" },
    switch_theme: { en: "Switch Theme", zh: "切换主题" },
    back_to_gallery: { en: "Theme Gallery", zh: "主题画廊" },
  },
};
