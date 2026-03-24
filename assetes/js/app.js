// ========================================
// SAFE INIT
// ========================================
document.addEventListener("DOMContentLoaded", () => {

  // ========================================
  // THEME (DARK / LIGHT)
  // ========================================
  const themeToggle = document.getElementById('themeToggle');

  if (themeToggle) {
    const body = document.body;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
      body.classList.add('light-mode');
      themeToggle.textContent = '🌙';
    } else {
      themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
      body.classList.toggle('light-mode');
      const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
      localStorage.setItem('theme', currentTheme);
      themeToggle.textContent = currentTheme === 'light' ? '🌙' : '☀️';
    });
  }

  // ========================================
  // 🌐 LANGUAGE SYSTEM (FULL POWER)
  // ========================================

  const translations = {
    fr: {
      title: "HAM Global Words",
      subtitle: "Des langues enracinées au Sahel, amplifiées au monde",
      nav_about: "À propos",
      nav_services: "Services",
      nav_digital: "Digital",
      nav_portfolio: "Projets",
      nav_booking: "Réserver",
      nav_contact: "Contact",
      cta_work: "📩 Travailler avec nous",

      services_title: "🛠️ Services linguistiques",
      digital_title: "💻 Solutions digitales",
      portfolio_title: "🚀 Projets réalisés",
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
      subtitle: "Languages rooted in the Sahel, amplified worldwide",
      nav_about: "About",
      nav_services: "Services",
      nav_digital: "Digital",
      nav_portfolio: "Projects",
      nav_booking: "Book",
      nav_contact: "Contact",
      cta_work: "📩 Work with us",

      services_title: "🛠️ Language Services",
      digital_title: "💻 Digital Solutions",
      portfolio_title: "🚀 Projects",
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
      subtitle: "لغات من الساحل إلى العالم",
      nav_about: "من نحن",
      nav_services: "الخدمات",
      nav_digital: "الحلول الرقمية",
      nav_portfolio: "المشاريع",
      nav_booking: "حجز",
      nav_contact: "اتصل",
      cta_work: "📩 العمل معنا",

      services_title: "🛠️ الخدمات اللغوية",
      digital_title: "💻 الحلول الرقمية",
      portfolio_title: "🚀 المشاريع",
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

  const savedLang = localStorage.getItem("lang") || "fr";

  if (langSwitcher) {
    langSwitcher.value = savedLang;

    langSwitcher.addEventListener("change", (e) => {
      const lang = e.target.value;
      localStorage.setItem("lang", lang);
      setLanguage(lang);
    });
  }

  setLanguage(savedLang);

  function setLanguage(lang) {
    const dict = translations[lang];

    // TEXT CONTENT
    document.querySelectorAll("[data-key]").forEach(el => {
      const key = el.dataset.key;
      if (dict[key]) el.textContent = dict[key];
    });

    // PLACEHOLDERS
    document.querySelectorAll("[data-placeholder]").forEach(el => {
      const key = el.dataset.placeholder;
      if (dict[key]) el.placeholder = dict[key];
    });

    // ATTRIBUTES (aria, title…)
    document.querySelectorAll("[data-attr]").forEach(el => {
      const attr = el.dataset.attr;
      const key = el.dataset.key;
      if (dict[key]) el.setAttribute(attr, dict[key]);
    });

    // RTL
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }

  // ========================================
  // YEAR
  // ========================================
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ========================================
  // SMOOTH SCROLL
  // ========================================
  document.querySelectorAll('.main-nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.getElementById(link.getAttribute('href').substring(1));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ========================================
  // FADE-IN
  // ========================================
  const sections = document.querySelectorAll('section');

  if (sections.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));
  }

  // ========================================
  // MODAL SERVICES
  // ========================================
  const modal = document.getElementById('serviceModal');

  if (modal) {
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const closeBtn = modal.querySelector('.close-modal');
    const buttons = document.querySelectorAll('.service-btn');
    const contents = document.querySelectorAll('.service-content > div');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.service;
        const content = Array.from(contents).find(c => c.dataset.service === key);

        if (content) {
          modalTitle.textContent = btn.textContent;
          modalDesc.innerHTML = content.innerHTML;
          modal.style.display = 'flex';
        }
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => modal.style.display = 'none');
    }

    modal.addEventListener('click', e => {
      if (e.target === modal) modal.style.display = 'none';
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') modal.style.display = 'none';
    });
  }

  // ========================================
  // CONTACT FORM
  // ========================================
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const subject = `Demande - ${contactForm.service.value}`;
      const body = `
Nom: ${contactForm.name.value}
Email: ${contactForm.email.value}
Service: ${contactForm.service.value}

Message:
${contactForm.message.value}
      `;

      window.location.href = `mailto:hamadineagmoctar@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  // ========================================
  // FORMATION FORM
  // ========================================
  const formationForm = document.getElementById('formationForm');

  if (formationForm) {
    formationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const subject = `Inscription Formation - ${formationForm.plan.value}`;
      const body = `
Nom: ${formationForm.name.value}
Email: ${formationForm.email.value}
Formule: ${formationForm.plan.value}

Objectif:
${formationForm.message.value}
      `;

      window.location.href = `mailto:hamadineagmoctar@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

});
