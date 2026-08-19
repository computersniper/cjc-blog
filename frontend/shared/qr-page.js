(function () {
  "use strict";

  var C = window.CJCData;
  var P = window.CJC_PROFILE;
  if (!C || !P) return;

  var theme = document.body.dataset.theme || window.THEME_ID || "00-classic";
  var labels = {
    "01-swiss": { en: "SWISS CONTACT GRID / 01", zh: "瑞士联络网格 / 01" },
    "02-brutalist": { en: "BRUTAL SIGNAL / 02", zh: "粗野信号台 / 02" },
    "03-glass": { en: "LIQUID GLASS CHANNEL / 03", zh: "液态玻璃频道 / 03" },
    "04-terminal": { en: "wechat://connect --terminal", zh: "wechat://连接 --终端" },
    "05-editorial": { en: "PRIVATE CORRESPONDENCE / ISSUE 05", zh: "私人通信 / 第 05 期" },
    "06-cyberpunk": { en: "NEON HANDSHAKE / NODE 06", zh: "霓虹握手协议 / 节点 06" },
    "54-f1": { en: "PIT WALL COMMS / CAR 54", zh: "维修区通信 / 54 号赛车" },
    "57-cardrive": { en: "ROADLINK / CHANNEL 57", zh: "道路联络 / 频道 57" },
    "67-orange-editorial": { en: "SIGNAL ORANGE CORRESPONDENCE / 067", zh: "信号橙通信编辑部 / 067" },
    "73-cardrive-motion": { en: "MOTION LINK / CHANNEL 73", zh: "动态道路联络 / 频道 73" },
    "74-aviation-cockpit": { en: "BOARDING CHANNEL / GATE 74", zh: "登机通信频道 / 74 号登机口" },
    "75-ming-palace": { en: "VERMILION CORRESPONDENCE / 75", zh: "御前通函 / 卷七十五" },
    "76-jinyiwei": { en: "NORTHERN BUREAU SECURE LINK / 76", zh: "北镇抚司密联 / 案七十六" }
  };

  var copy = {
    en: {
      skip: "Skip to WeChat QR code",
      back: "Back to contact",
      home: "Theme home",
      themes: "All themes",
      switchLanguage: "切换到中文",
      eyebrow: "Direct channel",
      title: "Scan into my WeChat",
      lead: "Open WeChat, choose Scan, and point the camera at the code. The visual language stays with the theme you selected.",
      scan: "Scan with WeChat to start a conversation.",
      open: "Open QR image",
      copy: "Copy page link",
      copied: "Page link copied.",
      copyFailed: "Copy unavailable. Use the browser address bar.",
      email: "Email",
      phone: "Phone",
      secure: "Personal contact channel",
      footer: "Cai Jiechao · Software Developer · Guangzhou"
    },
    zh: {
      skip: "跳至微信二维码",
      back: "返回联系方式",
      home: "主题首页",
      themes: "全部主题",
      switchLanguage: "Switch to English",
      eyebrow: "直接联络频道",
      title: "扫码添加我的微信",
      lead: "打开微信并选择“扫一扫”，将相机对准二维码。整个联络页面会继续保持你当前选择的主题风格。",
      scan: "使用微信扫码，即可开始交流。",
      open: "打开二维码原图",
      copy: "复制页面链接",
      copied: "页面链接已复制。",
      copyFailed: "无法自动复制，请使用浏览器地址栏。",
      email: "邮箱",
      phone: "电话",
      secure: "个人联络频道",
      footer: "蔡杰超 · 软件开发者 · 广州"
    }
  };

  function text(key) { return (copy[C.lang()] || copy.en)[key] || ""; }
  function themeLabel() { return C.t(labels[theme] || labels["01-swiss"]); }

  function render() {
    var lang = C.lang();
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.title = text("title") + " · " + C.t(P.name);
    document.querySelectorAll("[data-copy]").forEach(function (node) {
      var value = text(node.dataset.copy);
      if (value) node.textContent = value;
    });
    document.querySelectorAll("[data-theme-label]").forEach(function (node) {
      node.textContent = themeLabel();
    });
    var langButton = document.getElementById("qr-lang");
    if (langButton) {
      langButton.textContent = lang === "zh" ? "EN" : "中文";
      langButton.setAttribute("aria-label", text("switchLanguage"));
    }
  }

  function copyPageLink() {
    var status = document.getElementById("qr-status");
    var value = window.location.href;
    var done = function (ok) {
      if (status) status.textContent = text(ok ? "copied" : "copyFailed");
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(value).then(function () { done(true); }, function () { done(false); });
      return;
    }
    var input = document.createElement("textarea");
    input.value = value;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    try { done(document.execCommand("copy")); } catch (error) { done(false); }
    input.remove();
  }

  document.addEventListener("DOMContentLoaded", function () {
    C.setTheme(theme);
    var qr = document.getElementById("wechat-qr");
    var open = document.getElementById("qr-open");
    var email = document.getElementById("qr-email");
    var phone = document.getElementById("qr-phone");
    if (qr) qr.src = P.contact.wechatQrImage;
    if (open) open.href = P.contact.wechatQrImage;
    if (email) { email.href = "mailto:" + P.contact.email; email.querySelector("b").textContent = P.contact.email; }
    if (phone) { phone.href = P.contact.phoneHref; phone.querySelector("b").textContent = P.contact.phone; }
    document.getElementById("qr-copy").addEventListener("click", copyPageLink);
    document.getElementById("qr-lang").addEventListener("click", function () { C.toggleLang(); });
    C.onLang(render);
    render();
  });
})();
