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
    },
    remove: (key) => {
      try { localStorage.removeItem(key); }
      catch {}
    }
  };

  // ========================================
  // LOADER (FIX)
  // ========================================
  const loader = document.getElementById("loader");

  if (loader) {
    window.addEventListener("load", () => {
      loader.style.opacity = "0";
      setTimeout(() => loader.style.display = "none", 400);
    });
  }

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
  // 🌐 TRANSLATIONS
  // ========================================
  const translations = {
    fr: {
      title: "HAM Global Words",
      subtitle: "Plateforme SaaS de traduction, IA linguistique et solutions africaines",
      nav_about: "À propos",
      nav_services: "Services",
      nav_portfolio: "Solutions",
      nav_contact: "Contact",
      form_name: "Votre nom",
      form_email: "Votre email",
      form_message: "Votre besoin...",
      send: "🚀 Envoyer"
    },
    en: {
      title: "HAM Global Words",
      subtitle: "SaaS platform for translation and linguistic AI",
      nav_about: "About",
      nav_services: "Services",
      nav_portfolio: "Solutions",
      nav_contact: "Contact",
      form_name: "Your name",
      form_email: "Your email",
      form_message: "Your need...",
      send: "🚀 Send"
    },
    ar: {
      title: "HAM Global Words",
      subtitle: "منصة SaaS للترجمة والذكاء اللغوي",
      nav_about: "من نحن",
      nav_services: "الخدمات",
      nav_portfolio: "الحلول",
      nav_contact: "اتصل",
      form_name: "اسمك",
      form_email: "بريدك",
      form_message: "طلبك",
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

    document.querySelectorAll("[data-key]").forEach(el => {
      const key = el.dataset.key;
      if (dict[key]) el.textContent = dict[key];
    });

    document.querySelectorAll("[data-placeholder]").forEach(el => {
      const key = el.dataset.placeholder;
      if (dict[key]) el.placeholder = dict[key];
    });

    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }

  // ========================================
  // YEAR
  // ========================================
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ========================================
  // SCROLL
  // ========================================
  document.querySelectorAll('.main-nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href').substring(1);
      const target = document.getElementById(id);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ========================================
  // ANIMATION
  // ========================================
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  });

  document.querySelectorAll('section').forEach(el => observer.observe(el));

  // ========================================
  // CONTACT FORM
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
Nom: ${data.name}
Email: ${data.email}
Service: ${data.service}

Message:
${data.message}
      `;

      console.log("Lead:", data);

      window.location.href =
        `mailto:hamadineagmoctar@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  // ========================================
  // AUTH SYSTEM
  // ========================================

  // REGISTER
  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const user = {
        name: registerForm.name.value,
        email: registerForm.email.value,
        password: registerForm.password.value
      };

      storage.set("user", JSON.stringify(user));

      alert("Compte créé !");
      window.location.href = "login.html";
    });
  }

  // LOGIN
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const savedUser = JSON.parse(storage.get("user", null));

      if (
        savedUser &&
        loginForm.email.value === savedUser.email &&
        loginForm.password.value === savedUser.password
      ) {
        storage.set("isLogged", "true");
        window.location.href = "dashboard.html";
      } else {
        alert("Identifiants incorrects");
      }
    });
  }

  // PROTECT DASHBOARD
  if (window.location.pathname.includes("dashboard.html")) {
    const isLogged = storage.get("isLogged", null);

    if (!isLogged) {
      window.location.href = "login.html";
    }
  }

  // LOGOUT
  window.logout = function () {
    storage.remove("isLogged");
    window.location.href = "index.html";
  };

});

// Toggle section CEO
const toggleBtn = document.getElementById("toggleCEO");
const ceoSection = document.getElementById("ceoSection");

if (toggleBtn && ceoSection) {
  toggleBtn.addEventListener("click", () => {
    const isVisible = ceoSection.style.display === "block";

    ceoSection.style.display = isVisible ? "none" : "block";

    // Scroll automatique
    if (!isVisible) {
      ceoSection.scrollIntoView({ behavior: "smooth" });
    }
  });
}
