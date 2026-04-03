// ========================================
// HAM Global Words - Application principale
// Version finale corrigée - mailto + WhatsApp
// ========================================

(function() {
  'use strict';

  // ========================================
  // STORAGE (sécurisé)
  // ========================================
  const storage = {
    get: (key, fallback = null) => {
      try {
        const value = localStorage.getItem(key);
        return value !== null ? value : fallback;
      } catch {
        return fallback;
      }
    },
    set: (key, value) => {
      try {
        localStorage.setItem(key, value);
        return true;
      } catch {
        return false;
      }
    },
    remove: (key) => {
      try {
        localStorage.removeItem(key);
        return true;
      } catch {
        return false;
      }
    },
    getJSON: (key, fallback = null) => {
      try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : fallback;
      } catch {
        return fallback;
      }
    },
    setJSON: (key, value) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch {
        return false;
      }
    }
  };

  // ========================================
  // TRADUCTIONS COMPLÈTES (3 langues)
  // ========================================
  const translations = {
fr: {
  title: "HAM Global Words",
  dev_badge: "EN EXPANSION",
  dev_message: "Plateforme opérationnelle — Nouvelles fonctionnalités et services linguistiques à venir",
  subtitle: "L'excellence linguistique au service de l'innovation africaine",
  loader_tagline: "Pont entre les langues, connecteur de futurs",
  nav_expertise: "Expertise",
  nav_services: "Services",
  nav_portfolio: "Solutions",
  nav_contact: "Contact",
  hero_title: "Langues • Intelligence Artificielle • Solutions digitales",
  hero_desc: "Nous accompagnons ONG, institutions internationales et entreprises dans leurs opérations linguistiques.",
  hero_stats: "📊 +500 projets | 🌍 15+ langues | 🤝 98% satisfaction",
  btn_devis: "🚀 Devis gratuit sous 24h",
  btn_services: "📦 Explorer nos services",
  btn_client: "🔐 Espace client",
  ceo_toggle: "👤 Fondateur",
  ceo_title: "👤 Le fondateur",
  ceo_title_role: "Fondateur & CEO – HAM Global Words",
  ceo_bio1: "Expert en opérations linguistiques et intelligence artificielle.",
  ceo_bio2: "Expérience terrain avec ONG et institutions internationales.",
  ceo_expertise_title: "🌍 Domaines d'expertise",
  ceo_exp1: "Annotation linguistique & IA",
  ceo_exp2: "Interprétation terrain",
  ceo_exp3: "Gestion de projets multilingues",
  ceo_exp4: "Solutions digitales pour l'Afrique",
  ceo_vision_title: "🚀 Vision",
  ceo_vision_text: "Intégrer les langues africaines dans les technologies modernes.",
  expertise_title: "🎯 Notre expertise",
  expertise_desc: "HAM Global Words fusionne linguistique, IA et innovation digitale.",
  exp_ia_desc: "Structuration et annotation de données multilingues pour l'IA.",
  exp_interp_desc: "Communication stratégique en contextes sensibles.",
  exp_ops_desc: "Pilotage de projets linguistiques complexes.",
  exp_lang_desc: "Expertise native en langues africaines.",
  services_title: "🛠️ Nos services",
  services_desc: "Couverture complète de la chaîne linguistique.",
  portfolio_title: "🚀 Solutions innovantes",
  portfolio_desc: "Des solutions concrètes testées sur le terrain.",
  portfolio_dict_desc: "Dictionnaire multilingue offline.",
  portfolio_ai_desc: "Création de datasets IA.",
  portfolio_saas_desc: "Plateformes SaaS sur mesure.",
  portfolio_sector_desc: "Outils santé, humanitaire, éducation.",
  contact_title: "📤 Envoyez votre demande",
  form_name: "Votre nom complet",
  form_email: "Votre email professionnel",
  form_service: "Sélectionnez un service",
  form_message: "Décrivez votre projet...",
  form_send: "🚀 Envoyer",
  footer_text: "Linguistique, IA & Innovation pour l'Afrique",
  about_btn: "🌍 Qui sommes-nous ?",
  file_info: "📎 Fichiers acceptés : PDF, DOCX, TXT (max 5 Mo)",
  file_heavy: "📁 Fichier plus lourd ? → Transfert WhatsApp",
  whatsapp_btn: "📱 Envoyer un fichier sur WhatsApp"
},
    en: {
      title: "HAM Global Words",
dev_badge: "EXPANDING", 
dev_message: "Platform operational — New features and linguistic services coming soon",
      subtitle: "Linguistic excellence serving African innovation",
      loader_tagline: "Bridging languages, connecting futures",
      nav_expertise: "Expertise",
      nav_services: "Services",
      nav_portfolio: "Solutions",
      nav_contact: "Contact",
      hero_title: "Languages • AI • Digital Solutions",
      hero_desc: "We support NGOs, institutions and businesses in linguistic operations.",
      hero_stats: "📊 +500 projects | 🌍 15+ languages | 🤝 98% satisfaction",
      btn_devis: "🚀 Free quote within 24h",
      btn_services: "📦 Explore our services",
      btn_client: "🔐 Client area",
      ceo_toggle: "👤 Founder",
      ceo_title: "👤 The founder",
      ceo_title_role: "Founder & CEO – HAM Global Words",
      ceo_bio1: "Expert in linguistic operations and AI.",
      ceo_bio2: "Field experience with NGOs and institutions.",
      ceo_expertise_title: "🌍 Areas of expertise",
      ceo_exp1: "Linguistic annotation & AI",
      ceo_exp2: "Field interpretation",
      ceo_exp3: "Multilingual project management",
      ceo_exp4: "Digital solutions for Africa",
      ceo_vision_title: "🚀 Vision",
      ceo_vision_text: "Integrate African languages into modern tech.",
      expertise_title: "🎯 Our expertise",
      expertise_desc: "Combining linguistics, AI and digital innovation.",
      exp_ia_desc: "Multilingual data annotation for AI.",
      exp_interp_desc: "Strategic communication in sensitive contexts.",
      exp_ops_desc: "Complex linguistic project management.",
      exp_lang_desc: "Native expertise in African languages.",
      services_title: "🛠️ Our services",
      services_desc: "Complete linguistic chain coverage.",
      portfolio_title: "🚀 Innovative solutions",
      portfolio_desc: "Field-tested concrete solutions.",
      portfolio_dict_desc: "Offline multilingual dictionary.",
      portfolio_ai_desc: "AI dataset creation.",
      portfolio_saas_desc: "Custom SaaS platforms.",
      portfolio_sector_desc: "Health, humanitarian, education tools.",
      contact_title: "📤 Send your request",
      form_name: "Your full name",
      form_email: "Your professional email",
      form_service: "Select a service",
      form_message: "Describe your project...",
      form_send: "🚀 Send",
      footer_text: "Linguistics, AI & Innovation for Africa",
      about_btn: "🌍 About us?",
      file_info: "📎 Accepted files: PDF, DOCX, TXT (max 5 MB)",
      file_heavy: "📁 Larger file? → WhatsApp transfer",
      whatsapp_btn: "📱 Send a file via WhatsApp"
    },
    
    ar: {
      title: "HAM Global Words",
dev_message: "المنصة تعمل — ميزات وخدمات لغوية جديدة قريباً",
dev_badge: "قيد التوسع", 
      subtitle: "التميز اللغوي لخدمة الابتكار في أفريقيا",
      loader_tagline: "جسر اللغات، ربط المستقبل",
      nav_expertise: "خبراتنا",
      nav_services: "خدماتنا",
      nav_portfolio: "حلولنا",
      nav_contact: "اتصل بنا",
      hero_title: "اللغات • الذكاء الاصطناعي • الحلول الرقمية",
      hero_desc: "نرافق المؤسسات في عملياتها اللغوية.",
      hero_stats: "📊 +500 مشروع | 🌍 15+ لغة | 🤝 98% رضا",
      btn_devis: "🚀 عرض سعر مجاني",
      btn_services: "📦 خدماتنا",
      btn_client: "🔐 منطقة العملاء",
      ceo_toggle: "👤 المؤسس",
      ceo_title: "👤 المؤسس",
      ceo_title_role: "المؤسس والرئيس التنفيذي",
      ceo_bio1: "خبير في العمليات اللغوية والذكاء الاصطناعي.",
      ceo_bio2: "خبرة ميدانية مع المنظمات الدولية.",
      ceo_expertise_title: "🌍 مجالات الخبرة",
      ceo_exp1: "الوسم اللغوي والذكاء الاصطناعي",
      ceo_exp2: "الترجمة الفورية الميدانية",
      ceo_exp3: "إدارة المشاريع متعددة اللغات",
      ceo_exp4: "الحلول الرقمية لأفريقيا",
      ceo_vision_title: "🚀 الرؤية",
      ceo_vision_text: "دمج اللغات الأفريقية في التقنيات الحديثة.",
      expertise_title: "🎯 خبراتنا",
      expertise_desc: "نحن نقدم حلولاً لغوية ورقمية متكاملة.",
      exp_ia_desc: "هيكلة البيانات للذكاء الاصطناعي.",
      exp_interp_desc: "تواصل استراتيجي في السياقات الحساسة.",
      exp_ops_desc: "إدارة المشاريع اللغوية.",
      exp_lang_desc: "خبرة في اللغات الأفريقية.",
      services_title: "🛠️ خدماتنا",
      services_desc: "تغطية كاملة للسلسلة اللغوية.",
      portfolio_title: "🚀 حلولنا",
      portfolio_desc: "حلول ملموسة تم اختبارها.",
      portfolio_dict_desc: "قاموس لغوي متعدد اللغات.",
      portfolio_ai_desc: "بيانات للذكاء الاصطناعي.",
      portfolio_saas_desc: "منصات SaaS مخصصة.",
      portfolio_sector_desc: "أدوات للصحة والتعليم.",
      contact_title: "📤 أرسل طلبك",
      form_name: "الاسم الكامل",
      form_email: "البريد الإلكتروني",
      form_service: "اختر خدمة",
      form_message: "صِف مشروعك...",
      form_send: "🚀 إرسال",
      footer_text: "اللغويات والذكاء الاصطناعي لأفريقيا",
      about_btn: "🌍 من نحن؟",
      file_info: "📎 الملفات المقبولة: PDF، DOCX، TXT (حد أقصى 5 ميغابايت)",
      file_heavy: "📁 ملف أكبر؟ → إرسال عبر واتساب",
      whatsapp_btn: "📱 إرسال ملف عبر واتساب"
    }
  };  // <--- Accolade fermante de translations

  // ========================================
  // DOM READY
  // ========================================
  document.addEventListener("DOMContentLoaded", () => {

    // ========================================
    // LOADER
    // ========================================
    const loader = document.getElementById("loader");
    if (loader) {
      loader.style.opacity = "1";
      
      const hideLoader = () => {
        loader.style.opacity = "0";
        setTimeout(() => {
          loader.style.display = "none";
          loader.setAttribute("aria-hidden", "true");
        }, 400);
      };

      if (document.readyState === "complete") {
        hideLoader();
      } else {
        window.addEventListener("load", hideLoader);
        setTimeout(hideLoader, 3000);
      }
    }

    // ========================================
    // THEME SYSTEM
    // ========================================
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    const setTheme = (theme) => {
      if (theme === 'light') {
        body.classList.add('light-mode');
        if (themeToggle) themeToggle.textContent = '🌙';
        themeToggle?.setAttribute('title', 'Passer au mode sombre');
      } else {
        body.classList.remove('light-mode');
        if (themeToggle) themeToggle.textContent = '☀️';
        themeToggle?.setAttribute('title', 'Passer au mode clair');
      }
    };

    const initTheme = () => {
      const savedTheme = storage.get('theme', 'dark');
      setTheme(savedTheme);
    };

    if (themeToggle) {
      initTheme();
      themeToggle.addEventListener('click', () => {
        const isLight = body.classList.contains('light-mode');
        const newTheme = isLight ? 'dark' : 'light';
        setTheme(newTheme);
        storage.set('theme', newTheme);
      });
    }

    // ========================================
    // FONCTION D'APPLICATION DES TRADUCTIONS
    // ========================================
    let currentLang = storage.get('lang', 'fr');

    function applyLanguage(lang) {
      const dict = translations[lang] || translations.fr;
      
      document.querySelectorAll("[data-key]").forEach(el => {
        const key = el.dataset.key;
        if (dict[key] !== undefined) {
          if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = dict[key];
          } else {
            el.textContent = dict[key];
          }
        }
      });
      
      document.querySelectorAll("[data-placeholder]").forEach(el => {
        const key = el.dataset.placeholder;
        if (dict[key]) el.placeholder = dict[key];
      });
      
      const loaderTagline = document.querySelector('#loader p');
      if (loaderTagline && dict.loader_tagline) {
        loaderTagline.textContent = dict.loader_tagline;
      }
      
      // Mise à jour des messages info
      const fileInfoEl = document.querySelector('.file-info');
      const fileHeavyEl = document.querySelector('.file-heavy');
      const whatsappBtnEl = document.querySelector('.whatsapp-btn-text');
      
      if (fileInfoEl && dict.file_info) fileInfoEl.textContent = dict.file_info;
      if (fileHeavyEl && dict.file_heavy) fileHeavyEl.textContent = dict.file_heavy;
      if (whatsappBtnEl && dict.whatsapp_btn) whatsappBtnEl.textContent = dict.whatsapp_btn;
      
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lang;
      
      const langSwitcher = document.getElementById("langSwitcher");
      if (langSwitcher && langSwitcher.value !== lang) {
        langSwitcher.value = lang;
      }
    }

    // ========================================
    // LANGUE SWITCHER
    // ========================================
    const langSwitcher = document.getElementById("langSwitcher");
    if (langSwitcher) {
      langSwitcher.value = currentLang;
      langSwitcher.addEventListener("change", (e) => {
        currentLang = e.target.value;
        storage.set("lang", currentLang);
        applyLanguage(currentLang);
      });
    }

    applyLanguage(currentLang);

    // ========================================
    // ANNÉE DYNAMIQUE
    // ========================================
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ========================================
    // SMOOTH SCROLL
    // ========================================
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(link => {
      link.addEventListener('click', (e) => {
        const hash = link.getAttribute('href');
        if (hash === '#') return;
        
        const targetId = hash.substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
          history.pushState(null, null, hash);
        }
      });
    });

    // ========================================
    // INTERSECTION OBSERVER
    // ========================================
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '50px' });

    document.querySelectorAll('section, .card').forEach(el => {
      observer.observe(el);
    });

    // ========================================
    // FORMULAIRE DE CONTACT (mailto + WhatsApp)
    // ========================================
    const contactForm = document.getElementById('contactForm');
    const WHATSAPP_NUMBER = "22786762903";
    const MAX_SIZE_MB = 5;
    
    if (contactForm) {
      
      // Validation de la taille du fichier à la sélection
      const fileInput = contactForm.querySelector('input[type="file"]');
      if (fileInput) {
        fileInput.addEventListener('change', () => {
          const file = fileInput.files[0];
          if (file && file.size > MAX_SIZE_MB * 1024 * 1024) {
            const sizeMB = (file.size / 1024 / 1024).toFixed(1);
            const msg = currentLang === 'fr' 
              ? `📁 Fichier de ${sizeMB} Mo détecté.\n\nIl dépasse la limite de ${MAX_SIZE_MB} Mo.\n\nIl sera envoyé via WhatsApp.`
              : currentLang === 'en'
              ? `📁 ${sizeMB} MB file detected.\n\nIt exceeds the ${MAX_SIZE_MB} MB limit.\n\nIt will be sent via WhatsApp.`
              : `📁 تم اكتشاف ملف بحجم ${sizeMB} ميغابايت.\n\nيتجاوز الحد الأقصى ${MAX_SIZE_MB} ميغابايت.\n\nسيتم إرساله عبر واتساب.`;
            alert(msg);
          }
        });
      }
      
      // Soumission du formulaire
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('[name="name"]')?.value.trim();
        const email = contactForm.querySelector('[name="email"]')?.value.trim();
        const service = contactForm.querySelector('[name="service"]')?.value;
        const message = contactForm.querySelector('[name="message"]')?.value.trim();
        const file = contactForm.querySelector('[name="file"]')?.files[0];
        
        // Validation
        if (!name || !email || !message) {
          const errorMsg = currentLang === 'fr' 
            ? 'Veuillez remplir tous les champs obligatoires.'
            : currentLang === 'en'
            ? 'Please fill in all required fields.'
            : 'الرجاء ملء جميع الحقول المطلوبة.';
          alert(errorMsg);
          return;
        }
        
        if (!email.includes('@')) {
          const errorMsg = currentLang === 'fr' 
            ? 'Email invalide.'
            : currentLang === 'en'
            ? 'Invalid email.'
            : 'بريد إلكتروني غير صالح.';
          alert(errorMsg);
          return;
        }
        
        // Construction de l'email
        let subject = `[HAM Global Words] Demande ${service} - ${name}`;
        let body = `Nom: ${name}\nEmail: ${email}\nService: ${service}\n\nMessage:\n${message}`;
        
        let useWhatsApp = false;
        
        if (file) {
          const fileSizeMB = file.size / 1024 / 1024;
          body += `\n\n📎 Fichier: ${file.name} (${fileSizeMB.toFixed(2)} Mo)`;
          
          if (fileSizeMB > MAX_SIZE_MB) {
            useWhatsApp = true;
            body += `\n\n📁 FICHIER LOURD - À envoyer via WhatsApp: https://wa.me/${WHATSAPP_NUMBER}`;
          } else {
            body += `\n\n⚠️ Pièce jointe non supportée par email.`;
            body += `\n➡️ Envoyez le fichier via WhatsApp: https://wa.me/${WHATSAPP_NUMBER}`;
          }
        }
        
        // Confirmation et envoi
        const confirmMsg = currentLang === 'fr'
          ? 'Envoyer votre demande par email ?'
          : currentLang === 'en'
          ? 'Send your request by email?'
          : 'إرسال طلبك عبر البريد الإلكتروني؟';
        
        if (confirm(confirmMsg)) {
          // Envoi email
          window.location.href = `mailto:hamadineagmoctar@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          
          // Proposition WhatsApp si fichier
          if (file) {
            setTimeout(() => {
              const whatsappMsg = currentLang === 'fr'
                ? `Souhaitez-vous envoyer le fichier "${file.name}" via WhatsApp ?`
                : currentLang === 'en'
                ? `Do you want to send the file "${file.name}" via WhatsApp?`
                : `هل تريد إرسال الملف "${file.name}" عبر واتساب؟`;
              
              if (confirm(whatsappMsg)) {
                const waText = `*Nouvelle demande HAM Global Words*\n\n👤 Nom: ${name}\n📧 Email: ${email}\n🛠️ Service: ${service}\n📝 Message: ${message}\n\n📎 Fichier: ${file.name} (${(file.size/1024/1024).toFixed(1)} Mo)`;
                window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`, '_blank');
              }
            }, 500);
          }
        }
      });
    }

    // ========================================
    // TOGGLE CEO
    // ========================================
    const toggleBtn = document.getElementById("toggleCEO");
    const ceoSection = document.getElementById("ceoSection");
    
    if (toggleBtn && ceoSection) {
      ceoSection.style.display = "none";
      
      toggleBtn.addEventListener("click", () => {
        const isHidden = ceoSection.style.display === "none";
        ceoSection.style.display = isHidden ? "block" : "none";
        
        if (isHidden) {
          setTimeout(() => {
            ceoSection.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }
      });
    }

    // ========================================
    // AUTHENTIFICATION
    // ========================================
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
      registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const name = registerForm.querySelector('[name="name"]')?.value.trim();
        const email = registerForm.querySelector('[name="email"]')?.value.trim();
        const password = registerForm.querySelector('[name="password"]')?.value;
        const confirmPassword = registerForm.querySelector('[name="confirm_password"]')?.value;
        
        if (!name || !email || !password) {
          alert("Veuillez remplir tous les champs.");
          return;
        }
        
        if (password !== confirmPassword) {
          alert("Les mots de passe ne correspondent pas.");
          return;
        }
        
        if (password.length < 6) {
          alert("Le mot de passe doit faire au moins 6 caractères.");
          return;
        }
        
        storage.setJSON("user", { name, email, password });
        alert("Compte créé avec succès !");
        window.location.href = "login.html";
      });
    }
    
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const email = loginForm.querySelector('[name="email"]')?.value.trim();
        const password = loginForm.querySelector('[name="password"]')?.value;
        const savedUser = storage.getJSON("user", null);
        
        if (savedUser && savedUser.email === email && savedUser.password === password) {
          storage.set("isLogged", "true");
          storage.set("loggedUserEmail", email);
          window.location.href = "dashboard.html";
        } else {
          alert("Email ou mot de passe incorrect.");
        }
      });
    }
    
    if (window.location.pathname.includes("dashboard.html")) {
      const isLogged = storage.get("isLogged", null);
      if (!isLogged) {
        window.location.href = "login.html";
      } else {
        const user = storage.getJSON("user", null);
        const userNameSpan = document.getElementById("userName");
        if (userNameSpan && user) {
          userNameSpan.textContent = user.name;
        }
      }
    }
    
    window.logout = function() {
      storage.remove("isLogged");
      storage.remove("loggedUserEmail");
      window.location.href = "index.html";
    };
    
    window.addEventListener('error', (e) => {
      console.error('Global error:', e.error);
    });
    
  });
})();
