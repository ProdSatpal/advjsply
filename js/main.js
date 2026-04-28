
// Main Application Logic

// --- HTML Components ---
const NAV_LINKS = [
  { key: 'home', path: '/' },
  { key: 'services', path: '/services.html' },
  { key: 'legalNotice', path: '/legal-notices.html' },
  { key: 'blogs', path: '/blogs.html' },
  { key: 'aboutMe', path: '/about.html' },
  { key: 'contact', path: '/contact.html' }
];

const WHATSAPP_URL = "https://wa.me/918857972717?text=I%20need%20your%20legal%20assistance%20on%20below%20matter%0A";

function getNavbarHTML(activePath, t) {
  const linksHTML = NAV_LINKS.map(link => {
    // Simple active check. Handle root / and index.html
    const isActive = !link.external && ((activePath === link.path) ||
      (activePath.endsWith('index.html') && link.path === '/') ||
      (activePath === '/' && link.path === '/'));

    const activeClass = isActive ? 'nav-link-active font-semibold' : 'nav-link-idle';
    const targetAttr = link.external ? 'target="_blank" rel="noopener noreferrer"' : '';

    return `
            <li>
                <a href="${link.path}" ${targetAttr}
                   class="px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover:text-gold ${activeClass}"
                   data-i18n="${link.key}">
                   ${t[link.key]}
                </a>
            </li>
        `;
  }).join('');

  const mobileLinksHTML = NAV_LINKS.map(link => {
    const isActive = !link.external && ((activePath === link.path) ||
      (activePath.endsWith('index.html') && link.path === '/') ||
      (activePath === '/' && link.path === '/'));
    const activeClass = isActive ? 'text-gold font-semibold underline underline-offset-4' : 'text-navy';
    const targetAttr = link.external ? 'target="_blank" rel="noopener noreferrer"' : '';
    return `
            <li>
                <a href="${link.path}" ${targetAttr}
                   class="block px-4 py-2 text-base font-medium transition-colors hover:bg-light-gray ${activeClass}"
                   data-i18n="${link.key}">
                   ${t[link.key]}
                </a>
            </li>
        `;
  }).join('');

  return `
    <nav id="main-nav" class="fixed w-full z-50 transition-all duration-300 bg-transparent py-4">
      <div class="container mx-auto px-6 md:px-8">
        <div class="flex items-center justify-between">
          <a href="/" class="flex items-center gap-2">
            <img src="${window.location.pathname.includes('/blogs/') ? '../' : ''}assets/images/logo.png" 
                 alt="Advocate Logo" class="h-10 w-10"/>
            <div class="py-0">
              <span class="text-2xl font-serif font-bold nav-logo-text">Jasvinder Singh Ply</span>
              <div class="text-sm font-medium nav-logo-sub uppercase tracking-wider" data-i18n="advocate">${t.advocate}</div>
            </div>
          </a>

          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center space-x-1">
            <ul class="flex space-x-2">
                ${linksHTML}
            </ul>
            
            <!-- Language Dropdown -->
            <div class="relative ml-4 mr-2">
              <button id="lang-menu-btn" class="p-2 rounded-md hover:bg-white/10 transition-colors nav-link-idle flex items-center gap-1 border border-white/10">
                <i data-lucide="languages" class="h-5 w-5"></i>
                <i data-lucide="chevron-down" class="h-4 w-4"></i>
              </button>
              <div id="lang-dropdown" class="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-100 py-1 hidden z-[60]">
                <button onclick="changeLanguage('en')" class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-gray-50 flex items-center justify-between ${getCurrentLang() === 'en' ? 'bg-gray-50 font-bold' : ''}">
                  English ${getCurrentLang() === 'en' ? '<i data-lucide="check" class="h-3 w-3 text-gold"></i>' : ''}
                </button>
                <button onclick="changeLanguage('hi')" class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-gray-50 flex items-center justify-between ${getCurrentLang() === 'hi' ? 'bg-gray-50 font-bold' : ''}">
                  हिन्दी ${getCurrentLang() === 'hi' ? '<i data-lucide="check" class="h-3 w-3 text-gold"></i>' : ''}
                </button>
                <button onclick="changeLanguage('mr')" class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-gray-50 flex items-center justify-between ${getCurrentLang() === 'mr' ? 'bg-gray-50 font-bold' : ''}">
                  मराठी ${getCurrentLang() === 'mr' ? '<i data-lucide="check" class="h-3 w-3 text-gold"></i>' : ''}
                </button>
              </div>
            </div>

            <a href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer"
               data-i18n-title="consultationDisclaimer"
               class="bg-gold hover:bg-gold-dark text-navy px-4 py-2 rounded-md flex items-center transition-all shadow-lg font-bold">
                <i data-lucide="message-square" class="mr-2 h-4 w-4"></i>
                <span data-i18n="bookAppointment">${t.bookAppointment}</span>
            </a>
          </div>

          <!-- Mobile Menu Button -->
          <div class="md:hidden flex items-center space-x-2">
             <div class="flex items-center gap-1 mr-2">
                <button onclick="changeLanguage('en')" class="text-xs px-1 nav-mobile-lang-btn ${getCurrentLang() === 'en' ? 'font-bold' : ''}">EN</button>
                <button onclick="changeLanguage('hi')" class="text-xs px-1 nav-mobile-lang-btn ${getCurrentLang() === 'hi' ? 'font-bold' : ''}">HI</button>
                <button onclick="changeLanguage('mr')" class="text-xs px-1 nav-mobile-lang-btn ${getCurrentLang() === 'mr' ? 'font-bold' : ''}">MR</button>
            </div>
            <button id="mobile-menu-btn" class="border border-white/20 text-white p-2 rounded-md hover:bg-white/10 nav-mobile-btn">
              <i data-lucide="menu" class="h-6 w-6"></i>
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden md:hidden mt-3 animate-fade-in">
            <ul class="bg-white rounded-lg shadow-lg py-2">
                ${mobileLinksHTML}
              <li class="mt-2 px-4 py-2">
                <a href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer"
                   data-i18n-title="consultationDisclaimer"
                   class="w-full bg-gold hover:bg-gold-dark text-navy py-2 rounded-md flex items-center justify-center font-bold">
                    <i data-lucide="message-square" class="mr-2 h-4 w-4"></i>
                    <span data-i18n="bookAppointment">${t.bookAppointment}</span>
                </a>
              </li>
            </ul>
        </div>
      </div>
    </nav>
    <a href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer"
       class="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform bounce-animation"
       aria-label="Chat on WhatsApp">
        <i data-lucide="message-circle" class="h-8 w-8"></i>
    </a>
    `;
}

function getFooterHTML(t) {
  const year = new Date().getFullYear();
  return `
    <section class="py-8 bg-gray-50 border-t border-gray-100">
      <div class="container mx-auto px-6">
        <div class="max-w-4xl mx-auto text-center">
          <p class="text-sm text-gray-500 leading-relaxed italic" data-i18n="bottomDisclaimer">
            ${t.bottomDisclaimer}
          </p>
        </div>
      </div>
    </section>
    <footer class="bg-navy text-white pt-12 pb-6">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Contact Info -->
          <div>
            <h3 class="text-xl font-serif mb-4 text-gold" data-i18n="contactUs">${t.contactUs}</h3>
            <ul class="space-y-3">
              <li class="flex items-start">
                <i data-lucide="phone" class="mr-2 mt-1 text-gold h-4 w-4"></i>
                <a href="tel:+918857972717" class="hover:text-gold transition-colors">+91 8857972717</a>
              </li>
              <li class="flex items-start">
                <i data-lucide="mail" class="mr-2 mt-1 text-gold h-4 w-4"></i>
                <a href="mailto:adv.jsply@gmail.com" class="hover:text-gold transition-colors">adv.jsply@gmail.com</a>
              </li>
              <li class="flex items-start">
                <i data-lucide="map-pin" class="mr-2 mt-1 text-gold h-4 w-4"></i>
                <span><span data-i18n="address">${t.address}</span>: <span data-i18n="visitOffice">${t.visitOffice}</span></span>
              </li>
            </ul>
          </div>
           <!-- Quick Links -->
          <div>
            <h3 class="text-xl font-serif mb-4 text-gold" data-i18n="quickLinks">${t.quickLinks}</h3>
            <ul class="space-y-2">
                <li><a href="/" class="hover:text-gold" data-i18n="home">${t.home}</a></li>
                <li><a href="/services.html" class="hover:text-gold" data-i18n="services">${t.services}</a></li>
                <li><a href="/blogs.html" class="hover:text-gold" data-i18n="blogs">${t.blogs}</a></li>
                <li><a href="/notice.html" class="hover:text-gold" data-i18n="legalNotice">${t.legalNotice}</a></li>
                <li><a href="/about.html" class="hover:text-gold" data-i18n="aboutMe">${t.aboutMe}</a></li>
                <li><a href="/contact.html" class="hover:text-gold" data-i18n="contact">${t.contact}</a></li>
            </ul>
          </div>
           <!-- Practice Areas -->
          <div>
             <h3 class="text-xl font-serif mb-4 text-gold" data-i18n="practiceAreas">${t.practiceAreas}</h3>
             <ul class="space-y-2">
                <li><a href="/divorce-lawyer-nagpur.html" class="hover:text-gold" data-i18n="divorce">${t.divorce}</a></li>
                <li><a href="/mutual-divorce-lawyer-nagpur.html" class="hover:text-gold" data-i18n="mutualDivorce">${t.mutualDivorce}</a></li>
                <li><a href="/domestic-violence-lawyer-nagpur.html" class="hover:text-gold" data-i18n="domesticViolence">${t.domesticViolence}</a></li>
                <li><a href="/marriage-registration-lawyer-nagpur.html" class="hover:text-gold" data-i18n="registerMarriage">${t.registerMarriage}</a></li>
                <li><a href="/partnership-deeds-nagpur.html" class="hover:text-gold">Partnership Deeds</a></li>
                <li><a href="/property-disputes-nagpur.html" class="hover:text-gold">Property Disputes</a></li>
                <li><a href="/property-registry-nagpur.html" class="hover:text-gold">Property Registry</a></li>
                <li><a href="/will-writing-nagpur.html" class="hover:text-gold">Will Writing</a></li>
                <li><a href="/legal-agreements-nagpur.html" class="hover:text-gold">Legal Agreements</a></li>
                <li><a href="/legal-notice-service-nagpur.html" class="hover:text-gold">Legal Notice Service</a></li>
             </ul>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-6 text-center md:text-left">
            <p class="text-sm text-gray-300">
              &copy; ${year} <span data-i18n="advocate">${t.advocate}</span> Jasvinder Singh Ply. <span data-i18n="allRightsReserved">${t.allRightsReserved}</span>
            </p>
        </div>
      </div>
    </footer>
    `;
}

// --- App State ---

function getCurrentLang() {
  return localStorage.getItem('language') || 'en';
}

function t_data() {
  return translations[getCurrentLang()] || translations['en'];
}

function changeLanguage(lang) {
  localStorage.setItem('language', lang);
  // Reload components to update active state/text
  renderComponents();
  // Update all data-i18n elements in the page content
  updatePageTranslations();
  
  // Update specialty pages that use local setPageLang
  if (typeof window.setPageLang === 'function') {
    window.setPageLang(lang);
  }
  // Update blog pages that use local setBlogLang
  if (typeof window.setBlogLang === 'function') {
    window.setBlogLang(lang);
  }
}

function updatePageTranslations() {
  const t = t_data();
  const lang = getCurrentLang();
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      if (el.tagName === 'TITLE') {
        document.title = t[key];
      } else if (el.tagName === 'META') {
        el.setAttribute('content', t[key]);
      } else {
        el.textContent = t[key];
      }
    }
  });

  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (t[key]) {
      el.setAttribute('title', t[key]);
    }
  });
}

function renderComponents() {
  const t = t_data();
  const activePath = window.location.pathname;

  // Navbar
  const navContainer = document.getElementById('navbar-container');
  if (navContainer) {
    navContainer.innerHTML = getNavbarHTML(activePath, t);
    initMobileMenu();
    initLangDropdown();
    initScroll();
  }

  // Footer
  const footerContainer = document.getElementById('footer-container');
  if (footerContainer) {
    footerContainer.innerHTML = getFooterHTML(t);
  }

  // Re-initialize icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (btn && menu) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('hidden');
    });
  }
}

function initLangDropdown() {
  const btn = document.getElementById('lang-menu-btn');
  const dropdown = document.getElementById('lang-dropdown');
  if (btn && dropdown) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('hidden');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
      dropdown.classList.add('hidden');
    });
  }
}

function initScroll() {
  const nav = document.getElementById('main-nav');
  if (nav) {
    const handleScroll = () => {
      const hasHero = !!document.querySelector('.premium-gradient');
      if (window.scrollY > 20 || !hasHero) {
        nav.classList.add('bg-white', 'shadow-md', 'py-2');
        nav.classList.remove('bg-transparent', 'py-4');
      } else {
        nav.classList.remove('bg-white', 'shadow-md', 'py-2');
        nav.classList.add('bg-transparent', 'py-4');
      }
    };
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
  }
}

function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animated-element').forEach(el => {
    observer.observe(el);
  });

  // Simple Parallax for Hero Image
  window.addEventListener('scroll', () => {
    const photo = document.querySelector('.parallax-img');
    if (photo) {
      const scrolled = window.scrollY;
      const rate = scrolled * 0.05;
      photo.style.transform = `translateY(${rate}px) scale(1.1)`;
    }
  });
}

// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
  renderComponents();
  updatePageTranslations(); // For body content
  initAnimations();

  // Initialize icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

// Expose to window for inline onclicks
window.changeLanguage = changeLanguage;
window.getCurrentLang = getCurrentLang;
