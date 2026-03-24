// ========================================
// INIT
// ========================================
document.addEventListener("DOMContentLoaded", () => {

  // ========================================
  // STORAGE SAFE
  // ========================================
  const storage = {
    get: (key, fallback) => {
      try { return localStorage.getItem(key) || fallback; }
      catch { return fallback; }
    },
    set: (key, value) => {
      try { localStorage.setItem(key, value); }
      catch {}
    }
  };

  // ========================================
  // THEME SYSTEM
  // ========================================
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  const initTheme = () => {
    const savedTheme = storage.get('theme', 'dark');

    if (savedTheme === 'light') {
      body.classList.add('light-mode');
      if (themeToggle) themeToggle.textContent = '🌙';
    } else {
      if (themeToggle) themeToggle.textContent = '☀️';
    }
  };

  if (themeToggle) {
    initTheme();

    themeToggle.addEventListener('click', () => {
      body.classList.toggle('light-mode');

      const current = body.classList.contains('light-mode') ? 'light' : 'dark';
      storage.set('theme', current);

      themeToggle.textContent = current === 'light' ? '🌙' : '☀️';
    });
  }

  // ========================================
  // 🌐 TRANSLATIONS (EXTENDED SaaS VERSION)
  // ========================================
  const translations = {
    fr: {
      title: "HAM Global Words",
      subtitle: "Plateforme SaaS de traduction, IA linguistique et solutions africaines",
      nav_about: "À propos",
      nav_services: "Services",
      nav_portfolio: "Solutions",
      nav_booking: "Réserver",
      nav_contact: "Contact",

      services_title: "🛠️ Services linguistiques",
      portfolio_title: "🚀 Produits & solutions",
      booking_title: "📅 Réserver une session",
      contact_title: "📞 Demande de service",

      form_name: "Votre nom",
      form_email: "Votre email",
      form_message: "Votre besoin...",
      form_select: "Choisissez un service",

      send: "🚀 Envoyer"
    },

    en: {
      title: "HAM Global Words",
      subtitle: "SaaS platform for translation, linguistic AI and African language solutions",
      nav_about: "About",
      nav_services: "Services",
      nav_portfolio: "Solutions",
      nav_booking: "Book",
      nav_contact: "Contact",

      services_title: "🛠️ Language Services",
      portfolio_title: "🚀 Products & Solutions",
      booking_title: "📅 Book a session",
      contact_title: "📞 Service Request",

      form_name: "Your name",
      form_email: "Your email",
      form_message: "Your need...",
      form_select: "Choose a service",

      send: "🚀 Send"
    },

    ar: {
      title: "HAM Global Words",
      subtitle: "منصة SaaS للترجمة والذكاء اللغوي والحلول الإفريقية",
      nav_about: "من نحن",
      nav_services: "الخدمات",
      nav_portfolio: "الحلول",
      nav_booking: "حجز",
      nav_contact: "اتصل",

      services_title: "🛠️ الخدمات اللغوية",
      portfolio_title: "🚀 المنتجات والحلول",
      booking_title: "📅 حجز جلسة",
      contact_title: "📞 طلب خدمة",

      form_name: "اسمك",
      form_email: "بريدك الإلكتروني",
      form_message: "طلبك...",
      form_select: "اختر خدمة",

      send: "🚀 إرسال"
    }
  };

  const langSwitcher = document.getElementById("langSwitcher");
  const currentLang = storage.get("lang", "fr");

  if (langSwitcher) {
    langSwitcher.value = currentLang;

    langSwitcher.addEventListener("change", (e) => {
      const lang = e.target.value;
      storage.set("lang", lang);
      applyLanguage(lang);
    });
  }

  applyLanguage(currentLang);

  function applyLanguage(lang) {
    const dict = translations[lang] || translations.fr;

    // TEXT
    document.querySelectorAll("[data-key]").forEach(el => {
      const key = el.dataset.key;
      if (dict[key]) el.textContent = dict[key];
    });

    // PLACEHOLDER
    document.querySelectorAll("[data-placeholder]").forEach(el => {
      const key = el.dataset.placeholder;
      if (dict[key]) el.placeholder = dict[key];
    });

    // RTL SUPPORT
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }

  // ========================================
  // YEAR AUTO
  // ========================================
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ========================================
  // SMOOTH SCROLL (SAFE)
  // ========================================
  document.querySelectorAll('.main-nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href').substring(1);
      const target = document.getElementById(id);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ========================================
  // INTERSECTION (ANIMATION)
  // ========================================
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('section').forEach(el => observer.observe(el));

  // ========================================
  // CONTACT FORM (UPGRADED)
  // ========================================
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const data = {
        name: contactForm.name.value.trim(),
        email: contactForm.email.value.trim(),
        service: contactForm.service.value,
        message: contactForm.message.value.trim()
      };

      if (!data.name || !data.email || !data.message) {
        alert("Veuillez remplir tous les champs.");
        return;
      }

      const subject = `[HAM Global Words] ${data.service}`;
      const body = `
Name: ${data.name}
Email: ${data.email}
Service: ${data.service}

Message:
${data.message}
      `;

      // SaaS-ready tracking (future analytics hook)
      console.log("Lead captured:", data);

      window.location.href =
        `mailto:hamadineagmoctar@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

});
