const translations = {
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_courses: "Courses",
    nav_internship: "Internship",
    nav_portfolio: "Portfolio",
    nav_article: "Article",
    nav_contact: "Contact",
    hi_name: "Hi, my name is",
    my_name: "Cai Jiechao",
    build_things: "I build things for the world",
    download_cv: "Download CV",
    choose_lang: "Choose language",
    
    about_me: "About Me",
    about_desc: "Know more about me",
    im_name: "I'm Cai Jiechao",
    im_title: "A Computer Science Student based in Guangzhou, China",
    im_desc1: "I'm passionate about creating useful, unique, and elegant products. I keep my code clean, readable, modular, and well-refactored. Currently, I am deeply focused on Agent & LLM Engineering, exploring LLM capability boundaries, and constructing RAG knowledge bases.",
    im_desc2: "Moreover, I am fluent in English (passed CET4 and CET6 exams, IELTS 6.5), which enables me to effectively communicate and collaborate with programmers globally.",
    edu_bg: "Education Background:",
    edu_hku: "The University of Hong Kong (HKU)",
    edu_hku_desc: "MSc in Computer Science (2026.9 - 2027.8 Expected) | Focus: Large Models & NLP, Multi-Agent Systems",
    edu_uic: "BNU-HKBU UIC & University of Malaya (Exchange)",
    edu_uic_desc: "BSc in Computer Science (2022.9 - 2026.6) | Top 15%, Second-Class Scholarship",
    core_tech: "Core Tech Stack:",
    
    core_courses: "Core Courses",
    dl_title: "Deep Learning & Neural Networks",
    dl_desc: "Studied advanced AI techniques including Deep Learning and Neural Networks architectures, building strong foundations for LLM engineering.",
    nlp_title: "Natural Language Processing",
    nlp_desc: "Learned text processing, language modeling, and advanced NLP techniques, essential for understanding and developing modern AI Agent systems.",
    ml_title: "Machine Learning",
    ml_desc: "Mastered core ML algorithms, data preprocessing, and model evaluation metrics, applying them to solve complex predictive and classification problems.",
    dsa_title: "Data Structure & Algorithm",
    dsa_desc: "Learned fundamental to complex data structures and algorithms, analyzing time and space complexity to write optimized, high-performance code.",
    os_title: "Operating System",
    os_desc: "Deeply understood OS principles including process scheduling, memory management, file systems, and Linux system programming.",
    net_title: "Data Communications & Networking",
    net_desc: "Learned the principles of data communication, OSI reference model, TCP/IP protocols, and applied theory through socket programming projects.",
    
    internship_exp: "Internship Experience",
    intern_title: "Xnew | AI Platform R&D Intern",
    intern_date: "2026.01 – 2026.04",
    intern_desc: "Company Description: An educational content service provider that has long supplied Olympiad-level high-quality math question data to AI vendors such as Tencent, Alibaba, and Xiaohongshu.",
    intern_bullet1: "Full-Stack Development: Responsible for frontend and backend architecture, core feature development, and testing.",
    intern_bullet2: "Data Pipeline: Built data cleaning and intelligent annotation pipelines.",
    intern_bullet3: "LLM Integration: Integrated Large Language Models (LLMs) for evaluating math question quality (originality, difficulty, rigor, etc.).",
    intern_bullet4: "Gateway & Metrics: Deployed LiteLLM gateway, optimized calling performance, and implemented usage statistics with automated daily reports.",
    
    latest_projects: "Latest Projects",
    tech_stack: "Tech Stack:",
    
    msg_box_title: "My inbox is always open. Whether you have a question or just want to say hi or want to hire me, I'll try my best to get back to you!",
    
    certificates: "Certificates",
    cert1_date: "Jun 27, 2024",
    cert1_tag: "Mathematical modeling",
    cert1_title: "Successful participation in 2024 MCM competition",
    cert1_desc: "Our topic is: An Analytical Framework for Assessing“ Momentum” in Sports: Leveraging Random Forest and Fourier Transform Analysis",
    cert2_date: "Aug 19, 2024",
    cert2_tag: "English Proficiency",
    cert2_title: "IELTS Test",
    cert2_desc: "IELTS Overall Band Score: 6.5 (Speaking: 7.5)",
    
    latest_articles: "Latest Articles",
    filter_all: "All",
    filter_algo: "Algorithm",
    filter_se: "Software Engineering",
    filter_rl: "Reinforcement Learning",
    no_articles: "No articles found for this category.",
    no_projects: "No projects found.",
    
    get_in_touch: "Get In Touch",
    read_more: "Read More",
    read_zh: "中文",
    lang_btn: "🇨🇳 中文",
    back_btn: "Back",
    loading_articles: "Loading articles...",
    loading_projects: "Loading projects...",
    drop_msg: "Drop Me message",
    inbox_open: "My inbox is always open I'll try my best to get back to you!",
    name_placeholder: "Name",
    email_placeholder: "Email",
    msg_placeholder: "Your Message",
    footer_desc: "Designed and Developed By Cai Jiechao.",
    admin_panel: "Admin Panel",
    switch_theme: "Themes"
  },
  zh: {
    nav_home: "首页",
    nav_about: "关于我",
    nav_courses: "核心课程",
    nav_internship: "实习经历",
    nav_portfolio: "项目经历",
    nav_article: "文章博客",
    nav_contact: "联系我",
    hi_name: "你好，我是",
    my_name: "蔡杰超",
    build_things: "我为世界构建有趣的产品",
    download_cv: "下载简历",
    choose_lang: "选择语言",
    
    about_me: "关于我",
    about_desc: "了解更多关于我的信息",
    im_name: "我是蔡杰超",
    im_title: "一名坐标广州的计算机科学专业学生",
    im_desc1: "我热衷于创造实用、独特和优雅的产品。我保持代码简洁、可读、模块化且重构良好。目前，我正深度专注于 Agent 与大语言模型（LLM）工程，探索大模型能力边界，并构建 RAG 知识库。",
    im_desc2: "此外，我英语流利（通过四六级，雅思 6.5 分），这使我能够有效地与全球程序员进行沟通和协作。",
    edu_bg: "教育背景:",
    edu_hku: "香港大学 (HKU)",
    edu_hku_desc: "计算机科学理学硕士 (2026.9 - 2027.8 预期) | 方向：大模型与自然语言处理、多智能体系统",
    edu_uic: "北京师范大学-香港浸会大学联合国际学院 & 马来亚大学 (交换)",
    edu_uic_desc: "计算机科学理学学士 (2022.9 - 2026.6) | 前 15%，二等奖学金",
    core_tech: "核心技术栈:",
    
    core_courses: "核心课程",
    dl_title: "深度学习与神经网络",
    dl_desc: "学习了包括深度学习和神经网络架构在内的高级人工智能技术，为大模型工程打下坚实基础。",
    nlp_title: "自然语言处理",
    nlp_desc: "学习了文本处理、语言建模和高级自然语言处理技术，这对于理解和开发现代 AI 智能体系统至关重要。",
    ml_title: "机器学习",
    ml_desc: "掌握了核心机器学习算法、数据预处理和模型评估指标，并将其应用于解决复杂的预测和分类问题。",
    dsa_title: "数据结构与算法",
    dsa_desc: "学习了从基础到复杂的数据结构和算法，分析时间和空间复杂度以编写优化、高性能的代码。",
    os_title: "操作系统",
    os_desc: "深入理解操作系统原理，包括进程调度、内存管理、文件系统和 Linux 系统编程。",
    net_title: "数据通信与网络",
    net_desc: "学习了数据通信原理、OSI 参考模型、TCP/IP 协议，并通过 Socket 编程项目应用了这些理论。",
    
    internship_exp: "实习经历",
    intern_title: "Xnew | AI 平台研发实习生",
    intern_date: "2026.01 – 2026.04",
    intern_desc: "公司简介：一家教育内容服务商，长期为腾讯、阿里、小红书等 AI 厂商提供奥数级别的优质数学题库数据。",
    intern_bullet1: "全栈开发：负责前端和后端架构、核心功能开发及测试。",
    intern_bullet2: "数据流：构建数据清洗和智能标注的数据管道。",
    intern_bullet3: "大模型集成：集成大语言模型（LLM）以评估数学题目质量（原创性、难度、严谨性等）。",
    intern_bullet4: "网关与监控：部署 LiteLLM 网关，优化调用性能，并实现自动化日报的使用统计。",
    
    latest_projects: "最新项目",
    tech_stack: "技术栈:",
    
    msg_box_title: "我的收件箱随时为您敞开。无论您有问题，还是只想打个招呼，或是想雇佣我，我都会尽力回复！",
    
    certificates: "荣誉证书",
    cert1_date: "2024年6月27日",
    cert1_tag: "数学建模",
    cert1_title: "成功参与 2024 MCM 竞赛",
    cert1_desc: "我们的主题是：评估体育运动中“势头”的分析框架：利用随机森林和傅里叶变换分析",
    cert2_date: "2024年8月19日",
    cert2_tag: "英语能力",
    cert2_title: "雅思考试",
    cert2_desc: "雅思总分：6.5 (口语：7.5)",
    
    latest_articles: "最新文章",
    filter_all: "全部",
    filter_algo: "算法",
    filter_se: "软件工程",
    filter_rl: "强化学习",
    no_articles: "此分类下没有文章。",
    no_projects: "没有找到项目。",
    
    get_in_touch: "联系我",
    read_more: "阅读全文",
    read_zh: "中文",
    lang_btn: "🇺🇸 EN",
    back_btn: "返回",
    loading_articles: "正在加载文章...",
    loading_projects: "正在加载项目...",
    drop_msg: "给我留言",
    inbox_open: "我的收件箱随时为您敞开，我会尽快回复！",
    name_placeholder: "名字",
    email_placeholder: "邮箱",
    msg_placeholder: "您的留言",
    footer_desc: "由 蔡杰超 设计与开发。",
    admin_panel: "后台管理",
    switch_theme: "切换主题"
  }
};

function setLanguage(lang) {
  localStorage.setItem('lang', lang);
  
  // Update data-i18n text content
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });
  
  const langBtn = document.getElementById('lang-toggle-btn');
  if (langBtn) {
    langBtn.textContent = translations[lang]['lang_btn'];
  }
  
  // Re-render dynamic articles/projects if their functions exist
  if (typeof renderArticles === 'function' && typeof currentCategory !== 'undefined') {
    renderArticles(currentCategory);
  }
  if (typeof fetchProjects === 'function' && document.getElementById('dynamic-projects')) {
    // A bit hacky but re-fetching to re-render with new language
    fetchProjects();
  }
  if (typeof loadArticle === 'function') {
    loadArticle();
  }
}

function toggleLanguage() {
  const currentLang = localStorage.getItem('lang') || 'en';
  const newLang = currentLang === 'en' ? 'zh' : 'en';
  setLanguage(newLang);
}

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('lang') || 'en';
  setLanguage(savedLang);
});
