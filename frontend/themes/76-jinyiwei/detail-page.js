(function () {
  "use strict";

  var kind = document.body.dataset.kind === "project" ? "project" : "article";
  var mount = document.getElementById("detail");
  var P = CJCData.profile;
  var focused = false;
  var copy = {
    en: {
      skip: "Skip to classified record",
      bureau: "Northern Bureau",
      profile: "Subject",
      training: "Training",
      experience: "Field Work",
      missions: "Mission Files",
      reports: "Reports",
      awards: "Awards",
      contact: "Secure Channel",
      themes: "Change theme",
      articleKicker: "INTELLIGENCE REPORT / FULL FILE",
      projectKicker: "MISSION DOSSIER / FULL FILE",
      articlePlace: "A technical report released from the restricted archive.",
      projectPlace: "An operational build opened as an evidence dossier.",
      articleBack: "Return to reports",
      projectBack: "Return to mission files",
      retry: "Reconnect archive",
      loading: "Decrypting and opening the classified file…",
      error: "Archive line interrupted. Reconnect to retrieve this file.",
      missing: "No file number was supplied. Return to the archive index.",
      empty: "No body evidence is attached to this file. Return to the index for another record.",
      evidenceLabel: "Historical evidence references",
      guardEvidence: "Personnel reference · Jiajing era",
      feiyuEvidence: "Feiyu robe · textile evidence",
      bladeEvidence: "Xiuchun dao · blade reference",
      guardAlt: "Ming dynasty Jinyiwei guards in brocade uniforms and armour",
      feiyuAlt: "Cropped detail of richly patterned Ming guard robes",
      bladeAlt: "Seventeenth-century Chinese saber and scabbard used as a Xiuchun dao reference",
      footer: "Night rain, cold iron, cinnabar, and verifiable work."
    },
    zh: {
      skip: "跳至密档正文",
      bureau: "北镇抚司",
      profile: "人员卷宗",
      training: "校阅录",
      experience: "差遣实录",
      missions: "行动案卷",
      reports: "缇骑密报",
      awards: "勘合功册",
      contact: "密线联络",
      themes: "切换主题",
      articleKicker: "缇骑密报 / 完整档案",
      projectKicker: "行动案卷 / 完整档案",
      articlePlace: "从限定档案中调出的技术密报。",
      projectPlace: "作为证据卷宗启封的一项真实构建。",
      articleBack: "返回缇骑密报",
      projectBack: "返回行动案卷",
      retry: "重连档案线路",
      loading: "正在解密并启封档案……",
      error: "档案线路中断，请重新连接后调取此卷。",
      missing: "未提供档案编号，请返回密档目录。",
      empty: "此卷未附正文证据，请返回目录查阅其他记录。",
      evidenceLabel: "历史物证参考",
      guardEvidence: "人员参考 · 嘉靖朝",
      feiyuEvidence: "飞鱼服 · 织造物证",
      bladeEvidence: "绣春刀 · 兵刃参考",
      guardAlt: "身着锦衣与甲胄的明代锦衣卫人物",
      feiyuAlt: "明代锦衣卫纹样袍服裁片细节",
      bladeAlt: "作为绣春刀视觉参考的十七世纪中国佩刀与刀鞘",
      footer: "夜雨、冷铁、朱砂，以及可核验的真实作品。"
    }
  };

  function L() { return copy[CJCData.lang()]; }
  function sectionHref() { return kind === "project" ? "./#missions" : "./#reports"; }

  function renderChrome() {
    var c = L();
    document.querySelectorAll("[data-detail-copy]").forEach(function (node) {
      node.textContent = c[node.dataset.detailCopy] || "";
    });
    document.querySelectorAll("[data-detail-alt]").forEach(function (node) {
      node.alt = c[node.dataset.detailAlt] || "";
    });
    var brand = document.getElementById("detail-brand");
    if (brand) brand.textContent = P.brand + " · " + c.bureau;
    var evidence = document.querySelector(".detail-evidence");
    if (evidence) evidence.setAttribute("aria-label", c.evidenceLabel);
    var email = document.getElementById("detail-email");
    var phone = document.getElementById("detail-phone");
    var github = document.getElementById("detail-github");
    var wechat = document.getElementById("detail-wechat");
    if (email) { email.href = "mailto:" + P.contact.email; email.textContent = "Email · " + P.contact.email; }
    if (phone) { phone.href = P.contact.phoneHref; phone.textContent = "Phone · " + P.contact.phone; }
    if (github) { github.href = P.contact.github; github.textContent = "GitHub · @" + P.contact.githubUser; }
    if (wechat) { wechat.href = P.contact.wechatQrPage; wechat.textContent = "WeChat · QR"; }
    document.getElementById("detail-kicker").textContent = kind === "project" ? c.projectKicker : c.articleKicker;
    document.getElementById("detail-place").textContent = kind === "project" ? c.projectPlace : c.articlePlace;
    var back = mount.querySelector(".cjc-d-back");
    if (back) {
      var backText = kind === "project" ? c.projectBack : c.articleBack;
      if (back.getAttribute("href") !== sectionHref()) back.setAttribute("href", sectionHref());
      if (back.textContent !== backText) back.textContent = backText;
    }
    var retry = mount.querySelector(".cjc-d-retry");
    if (retry && retry.textContent !== c.retry) retry.textContent = c.retry;
    var loading = mount.querySelector(".cjc-d-loading");
    if (loading && loading.textContent !== c.loading) loading.textContent = c.loading;
    var error = mount.querySelector(".cjc-d-error");
    if (error) {
      var stateText = CJCData.queryId() ? c.error : c.missing;
      var textNode = Array.from(error.childNodes).find(function (node) { return node.nodeType === Node.TEXT_NODE; });
      if (textNode && textNode.nodeValue.trim() !== stateText) textNode.nodeValue = stateText + " ";
    }
    var empty = mount.querySelector(".cjc-d-body p:only-child");
    if (empty && !empty.textContent.trim() && !empty.querySelector("img,video,iframe")) {
      empty.textContent = c.empty;
      empty.closest(".cjc-d-body").classList.add("is-empty");
    }
  }

  function enhanceDetail() {
    var loading = mount.querySelector(".cjc-d-loading");
    var error = mount.querySelector(".cjc-d-error");
    mount.setAttribute("aria-busy", loading ? "true" : "false");
    if (loading) { loading.setAttribute("role", "status"); loading.setAttribute("aria-live", "polite"); }
    if (error) {
      error.setAttribute("role", "alert");
      if (CJCData.queryId() && !error.querySelector(".cjc-d-retry")) {
        var retry = document.createElement("button");
        retry.type = "button";
        retry.className = "cjc-d-retry";
        retry.textContent = L().retry;
        retry.addEventListener("click", function () { window.location.reload(); });
        error.appendChild(retry);
      }
    }
    var title = mount.querySelector(".cjc-d-title");
    if (title && !focused) { title.tabIndex = -1; title.focus({ preventScroll: true }); focused = true; }
    var image = mount.querySelector(".cjc-d-cover img");
    if (image) { image.decoding = "async"; image.loading = "lazy"; }
    var readFull = mount.querySelector(".cjc-d-readfull");
    if (readFull) readFull.remove();
    renderChrome();
  }

  document.addEventListener("error", function (event) {
    if (event.target instanceof HTMLImageElement && event.target.closest(".cjc-d-cover")) event.target.closest(".cjc-d-cover").hidden = true;
  }, true);

  document.addEventListener("DOMContentLoaded", function () {
    var paramLang = new URLSearchParams(window.location.search).get("lang");
    if (paramLang === "en" || paramLang === "zh") CJCData.setLang(paramLang);
    CJCData.setTheme(window.THEME_ID);
    renderChrome();
    new MutationObserver(enhanceDetail).observe(mount, { childList: true, subtree: true });
    CJCData.mountDetail({ kind: kind, mount: mount, accent: "#a91f24", backHref: sectionHref() });
    CJCData.onLang(renderChrome);
    enhanceDetail();
  });
})();
