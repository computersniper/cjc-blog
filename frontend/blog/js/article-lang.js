// Shared language support for blog article pages
// Requires i18n.js to be loaded first
function applyArticleLang(lang) {
  document.querySelectorAll('.article-lang-en').forEach(el => {
    el.style.display = lang === 'en' ? '' : 'none';
  });
  document.querySelectorAll('.article-lang-zh').forEach(el => {
    el.style.display = lang === 'zh' ? '' : 'none';
  });

  // Update back button text
  const backBtn = document.querySelector('.back-button');
  if (backBtn) {
    backBtn.textContent = lang === 'zh' ? '返回' : 'Back';
  }

  // Update lang toggle button
  const langBtn = document.getElementById('lang-toggle-btn');
  if (langBtn) {
    langBtn.textContent = lang === 'zh' ? '🇺🇸 EN' : '🇨🇳 中文';
  }

  // Update title
  const titleEn = document.querySelector('.article-title-en');
  const titleZh = document.querySelector('.article-title-zh');
  if (titleEn && titleZh) {
    titleEn.style.display = lang === 'en' ? '' : 'none';
    titleZh.style.display = lang === 'zh' ? '' : 'none';
  }
}

// Override setLanguage to also handle article-specific elements
const origSetLanguage = window.setLanguage;
window.setLanguage = function(lang) {
  if (origSetLanguage) origSetLanguage(lang);
  applyArticleLang(lang);
};

// Override toggleLanguage
const origToggleLanguage = window.toggleLanguage;
window.toggleLanguage = function() {
  const currentLang = localStorage.getItem('lang') || 'en';
  const newLang = currentLang === 'en' ? 'zh' : 'en';
  localStorage.setItem('lang', newLang);
  window.setLanguage(newLang);
};

document.addEventListener('DOMContentLoaded', function() {
  const lang = localStorage.getItem('lang') || 'en';
  applyArticleLang(lang);
});
