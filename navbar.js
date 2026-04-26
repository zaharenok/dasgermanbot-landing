(function() {
  // Detect page type from URL
  var path = window.location.pathname;
  var isBlog = path.indexOf('/blog/') !== -1;
  var isMain = !isBlog && (path === '/' || path.endsWith('index.html') || path.endsWith('/'));
  var rootPath = isBlog ? '../' : './';
  var blogPath = isBlog ? './' : 'blog/';

  // Detect current language
  var supported = ['en', 'uk', 'ru', 'sk'];
  function detectLang() {
    var browserLangs = navigator.languages || [navigator.language || navigator.userLanguage || 'en'];
    for (var i = 0; i < browserLangs.length; i++) {
      var code = browserLangs[i].toLowerCase().substring(0, 2);
      if (supported.indexOf(code) !== -1) return code;
    }
    return 'en';
  }
  var currentLang = localStorage.getItem('lang') || detectLang();
  var langLabels = { en: 'EN', uk: 'UA', ru: 'RU', sk: 'SK' };

  // Translation strings for navbar
  var navTexts = {
    en: { logo: 'Das German Bot', nav_home: 'Home', nav_blog: 'Blog', nav_cta: 'Open in Telegram' },
    uk: { logo: 'Das German Bot', nav_home: 'Головна', nav_blog: 'Блог', nav_cta: 'Відкрити в Telegram' },
    ru: { logo: 'Das German Bot', nav_home: 'Главная', nav_blog: 'Блог', nav_cta: 'Открыть в Telegram' },
    sk: { logo: 'Das German Bot', nav_home: 'Domov', nav_blog: 'Blog', nav_cta: 'Otvoriť v Telegram' }
  };

  // Build navbar HTML
  var navLinks = '';
  if (isBlog) {
    navLinks = '<div class="navbar__nav">' +
      '<a href="' + rootPath + 'index.html" data-nav="nav_home">' + navTexts[currentLang].nav_home + '</a>' +
      '<a href="' + blogPath + 'index.html" class="active" data-nav="nav_blog">' + navTexts[currentLang].nav_blog + '</a>' +
    '</div>';
  } else {
    navLinks = '<a href="' + blogPath + 'index.html" class="navbar__blog-badge">' +
      '<span class="navbar__blog-dot"></span>' +
      '<span data-nav="nav_blog">' + navTexts[currentLang].nav_blog + '</span>' +
    '</a>';
  }

  var html = '<nav class="navbar"><div class="container">' +
    '<a href="' + rootPath + (isMain ? '' : 'index.html') + '" class="navbar__logo">' +
      '<div class="navbar__logo-icon">🥨</div>' +
      '<span data-nav="logo">' + navTexts[currentLang].logo + '</span>' +
    '</a>' +
    '<div class="navbar__actions">' +
      navLinks +
      '<div class="lang-dropdown">' +
        '<button class="lang-dropdown__toggle" id="lang-dropdown-toggle">' +
          '<span id="lang-dropdown-label">' + (langLabels[currentLang] || 'EN') + '</span>' +
        '</button>' +
        '<div class="lang-dropdown__menu" id="lang-dropdown-menu">' +
          '<button data-lang="en">English</button>' +
          '<button data-lang="uk">Українська</button>' +
          '<button data-lang="ru">Русский</button>' +
          '<button data-lang="sk">Slovenčina</button>' +
        '</div>' +
      '</div>' +
      '<a href="https://t.me/dasgermanbot" class="btn-primary" id="nav-cta">' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>' +
        '<span data-nav="nav_cta">' + navTexts[currentLang].nav_cta + '</span>' +
      '</a>' +
    '</div>' +
  '</div></nav>';

  var css = '<style>' +
    '.navbar{position:fixed;top:0;left:0;right:0;z-index:100;background:transparent;border-bottom:1px solid transparent;transition:background .3s ease,border-color .3s ease,backdrop-filter .3s ease}' +
    '.navbar--scrolled{background:rgba(7,6,18,.85);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom-color:rgba(255,255,255,.08)}' +
    '.navbar .container{display:flex;align-items:center;justify-content:space-between;height:72px}' +
    '.navbar__logo{display:flex;align-items:center;gap:12px;font-weight:800;font-size:20px;color:#fff;letter-spacing:-.02em}' +
    '.navbar__logo-icon{font-size:24px;line-height:1}' +
    '.navbar__actions{display:flex;align-items:center;gap:16px}' +
    '.navbar__nav{display:flex;gap:32px}' +
    '.navbar__nav a{font-size:15px;font-weight:600;color:rgba(255,255,255,.6);transition:color .2s ease}' +
    '.navbar__nav a:hover,.navbar__nav a.active{color:#fff}' +
    '.navbar__blog-badge{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;background:rgba(66,113,254,.15);border:1px solid rgba(66,113,254,.3);border-radius:100px;font-size:13px;font-weight:700;color:#fff;transition:all .2s ease}' +
    '.navbar__blog-badge:hover{background:rgba(66,113,254,.25);border-color:rgba(66,113,254,.5);transform:translateY(-1px)}' +
    '.navbar__blog-dot{width:6px;height:6px;background:#FA6254;border-radius:50%;animation:navPulse 2s ease-in-out infinite}' +
    '@keyframes navPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.2)}}' +
    '.btn-primary{display:inline-flex;align-items:center;gap:8px;padding:12px 24px;background:#4271FE;color:#fff;border-radius:100px;font-size:15px;font-weight:700;transition:all .2s ease}' +
    '.btn-primary:hover{transform:translateY(-2px);box-shadow:0 4px 16px rgba(66,113,254,.4);background:#5a85FF}' +
    '.lang-dropdown{display:inline-flex;position:relative}' +
    '.lang-dropdown__toggle{display:flex;align-items:center;gap:4px;padding:6px 14px;background:rgba(255,255,255,.08);border-radius:100px;font-size:13px;font-weight:700;color:#fff;cursor:pointer;border:none}' +
    '.lang-dropdown__toggle::after{content:"\\25BE";font-size:10px;margin-left:2px}' +
    '.lang-dropdown__menu{display:none;position:absolute;top:100%;right:0;margin-top:6px;background:rgba(12,13,32,.95);border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:6px;z-index:200;min-width:120px}' +
    '.lang-dropdown__menu.open{display:block}' +
    '.lang-dropdown__menu button{display:block;width:100%;padding:8px 14px;border-radius:8px;font-size:13px;font-weight:700;color:rgba(255,255,255,.5);background:transparent;text-align:left;cursor:pointer;border:none;font-family:inherit}' +
    '.lang-dropdown__menu button.active,.lang-dropdown__menu button:hover{background:rgba(255,255,255,.15);color:#fff}' +
    '@media(max-width:768px){' +
      '.navbar{background:rgba(7,6,18,.95);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom-color:rgba(255,255,255,.08)}' +
      '.navbar .container{flex-wrap:wrap;height:auto;padding:12px 24px}' +
      '.navbar__logo{font-size:18px;order:1}' +
      '.navbar__nav{display:none}' +
      '.navbar__actions{order:2;width:100%;display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:12px}' +
      '.navbar__blog-badge{font-size:12px;padding:5px 10px}' +
      '.btn-primary{padding:10px 20px;font-size:14px;min-width:160px;justify-content:center}' +
    '}' +
  '</style>';

  // Inject into page
  var root = document.getElementById('navbar-root');
  if (!root) return;
  root.innerHTML = css + html;

  // Dropdown logic
  var toggle = document.getElementById('lang-dropdown-toggle');
  var menu = document.getElementById('lang-dropdown-menu');
  var label = document.getElementById('lang-dropdown-label');

  if (toggle) {
    toggle.addEventListener('click', function(e) {
      e.stopPropagation();
      menu.classList.toggle('open');
    });
    document.addEventListener('click', function() { menu.classList.remove('open'); });
  }

  // Expose setNavbarLang globally so page scripts can update it
  window.setNavbarLang = function(lang) {
    currentLang = lang;
    if (label) label.textContent = langLabels[lang] || lang.toUpperCase();
    var t = navTexts[lang] || navTexts.en;
    document.querySelectorAll('[data-nav]').forEach(function(el) {
      var key = el.getAttribute('data-nav');
      if (t[key]) el.textContent = t[key];
    });
    document.querySelectorAll('.lang-dropdown__menu button').forEach(function(btn) {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    if (menu) menu.classList.remove('open');
  };

  // Set initial active state
  document.querySelectorAll('.lang-dropdown__menu button').forEach(function(btn) {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
  document.querySelectorAll('.lang-dropdown__menu button').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var lang = btn.dataset.lang;
      window.setNavbarLang(lang);
      // Also call page-level setLanguage if available
      if (typeof window.setLanguage === 'function') window.setLanguage(lang);
    });
  });

  // Scroll effect
  var navbar = document.querySelector('.navbar');
  function onScroll() {
    if (window.scrollY > 80) navbar.classList.add('navbar--scrolled');
    else navbar.classList.remove('navbar--scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
