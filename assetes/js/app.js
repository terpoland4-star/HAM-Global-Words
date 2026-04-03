// ========================================
// HAM Global Words - Application principale
// Version finale avec traductions complètes
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
      // Général
      title: "HAM Global Words",
      subtitle: "L'excellence linguistique au service de l'innovation africaine",
      loader_tagline: "Pont entre les langues, connecteur de futurs",
      
      // Navigation
      nav_expertise: "Expertise",
      nav_services: "Services",
      nav_portfolio: "Solutions",
      nav_contact: "Contact",
      
      // Hero
      hero_title: "Langues • Intelligence Artificielle • Solutions digitales",
      hero_desc: "Nous accompagnons ONG, institutions internationales et entreprises dans leurs opérations linguistiques, la structuration de données multilingues et le déploiement de solutions digitales adaptées aux réalités africaines.",
      hero_stats: "📊 +500 projets linguistiques réalisés | 🌍 15+ langues africaines | 🤝 98% de satisfaction client",
      
      // Boutons
      btn_devis: "🚀 Devis gratuit sous 24h",
      btn_services: "📦 Explorer nos services",
      btn_client: "🔐 Espace client sécurisé",
      
      // CEO
      ceo_toggle: "👤 Fondateur",
      ceo_title: "👤 Le fondateur",
      ceo_title_role: "Fondateur & CEO – HAM Global Words",
      ceo_bio1: "Expert en opérations linguistiques, intelligence artificielle et gestion de projets multiculturels en Afrique.",
      ceo_bio2: "Fort d'une expérience terrain avec les ONG, institutions internationales et projets tech, je combine rigueur analytique et innovation digitale.",
      ceo_expertise_title: "🌍 Domaines d'expertise",
      ceo_exp1: "Annotation linguistique & IA",
      ceo_exp2: "Interprétation terrain & médiation",
      ceo_exp3: "Gestion de projets multilingues",
      ceo_exp4: "Solutions digitales pour l'Afrique",
      ceo_vision_title: "🚀 Vision",
      ceo_vision_text: "Intégrer les langues africaines dans les technologies modernes et rendre les solutions digitales accessibles aux réalités locales.",
      
      // Expertise
      expertise_title: "🎯 Notre expertise",
      expertise_desc: "HAM Global Words fusionne linguistique de terrain, gestion opérationnelle et technologies IA avancées pour délivrer des solutions fiables, éthiques et adaptées aux environnements complexes. Notre force : l'expérience terrain couplée à l'innovation digitale.",
      exp_ia_desc: "Structuration, annotation et validation de données multilingues pour modèles NLP, reconnaissance vocale et systèmes d'IA. Qualité garantie par des linguistes experts.",
      exp_interp_desc: "Communication stratégique entre acteurs internationaux et communautés locales dans des contextes humanitaires, médicaux et institutionnels sensibles.",
      exp_ops_desc: "Pilotage de projets linguistiques complexes, contrôle qualité, conformité RGPD et optimisation des performances pour des livraisons impeccables.",
      exp_lang_desc: "Expertise native en langues africaines (Tamasheq, Hausa, Songhay, Zarma, Peulh, Arabe, Français, Anglais) avec adaptation culturelle et précision contextuelle.",
      
      // Services
      services_title: "🛠️ Nos services linguistiques & digitaux",
      services_desc: "Une couverture complète de la chaîne linguistique, de la traduction classique à l'intelligence artificielle, avec une approche orientée résultats et satisfaction client.",
      
      // Portfolio
      portfolio_title: "🚀 Solutions & produits innovants",
      portfolio_desc: "Des solutions concrètes, testées sur le terrain, conçues pour répondre aux besoins des ONG, entreprises et projets technologiques opérant en Afrique et à l'international.",
      portfolio_dict_desc: "Application linguistique multilingue offline dédiée à la valorisation, préservation et structuration des langues africaines menacées.",
      portfolio_ai_desc: "Création, annotation et validation de données linguistiques pour projets d'IA et technologies vocales. Rejoignez notre programme de collecte rémunérée (10 USDC/heure).",
      portfolio_saas_desc: "Développement de dashboards clients, systèmes d'upload sécurisé, automatisation des flux et gestion complète de projets linguistiques.",
      portfolio_sector_desc: "Outils spécialisés pour la santé, l'humanitaire et l'éducation, intégrant langues locales et accessibilité terrain (offline first).",
      
      // Contact
      contact_title: "📤 Envoyez votre demande ou fichier",
      form_name: "Votre nom complet",
      form_email: "Votre email professionnel",
      form_service: "Sélectionnez un service",
      form_message: "Décrivez votre projet, vos besoins et vos contraintes...",
      form_send: "🚀 Envoyer la demande",
      
      // Footer
      footer_text: "Linguistique, IA & Innovation pour l'Afrique",
      about_btn: "🌍 Qui sommes-nous ?"
    },
    
    en: {
      // General
      title: "HAM Global Words",
      subtitle: "Linguistic excellence serving African innovation",
      loader_tagline: "Bridging languages, connecting futures",
      
      // Navigation
      nav_expertise: "Expertise",
      nav_services: "Services",
      nav_portfolio: "Solutions",
      nav_contact: "Contact",
      
      // Hero
      hero_title: "Languages • Artificial Intelligence • Digital Solutions",
      hero_desc: "We support NGOs, international institutions and businesses in their linguistic operations, multilingual data structuring, and deployment of digital solutions adapted to African realities.",
      hero_stats: "📊 +500 linguistic projects completed | 🌍 15+ African languages | 🤝 98% client satisfaction",
      
      // Buttons
      btn_devis: "🚀 Free quote within 24h",
      btn_services: "📦 Explore our services",
      btn_client: "🔐 Secure client area",
      
      // CEO
      ceo_toggle: "👤 Founder",
      ceo_title: "👤 The founder",
      ceo_title_role: "Founder & CEO – HAM Global Words",
      ceo_bio1: "Expert in linguistic operations, artificial intelligence and multicultural project management in Africa.",
      ceo_bio2: "With field experience alongside NGOs, international institutions and tech projects, I combine analytical rigor and digital innovation.",
      ceo_expertise_title: "🌍 Areas of expertise",
      ceo_exp1: "Linguistic annotation & AI",
      ceo_exp2: "Field interpretation & mediation",
      ceo_exp3: "Multilingual project management",
      ceo_exp4: "Digital solutions for Africa",
      ceo_vision_title: "🚀 Vision",
      ceo_vision_text: "Integrate African languages into modern technologies and make digital solutions accessible to local realities.",
      
      // Expertise
      expertise_title: "🎯 Our expertise",
      expertise_desc: "HAM Global Words combines field linguistics, operational management and advanced AI technologies to deliver reliable, ethical solutions adapted to complex environments. Our strength: field experience coupled with digital innovation.",
      exp_ia_desc: "Structuring, annotation and validation of multilingual data for NLP models, speech recognition and AI systems. Quality guaranteed by expert linguists.",
      exp_interp_desc: "Strategic communication between international actors and local communities in sensitive humanitarian, medical and institutional contexts.",
      exp_ops_desc: "Management of complex linguistic projects, quality control, GDPR compliance and performance optimization for flawless deliveries.",
      exp_lang_desc: "Native expertise in African languages (Tamasheq, Hausa, Songhay, Zarma, Fulani, Arabic, French, English) with cultural adaptation and contextual precision.",
      
      // Services
      services_title: "🛠️ Our linguistic & digital services",
      services_desc: "Complete coverage of the linguistic chain, from traditional translation to artificial intelligence, with a results-oriented and customer satisfaction approach.",
      
      // Portfolio
      portfolio_title: "🚀 Innovative solutions & products",
      portfolio_desc: "Concrete, field-tested solutions designed to meet the needs of NGOs, businesses and technology projects operating in Africa and internationally.",
      portfolio_dict_desc: "Offline multilingual linguistic application dedicated to the valorization, preservation and structuring of endangered African languages.",
      portfolio_ai_desc: "Creation, annotation and validation of linguistic data for AI projects and voice technologies. Join our paid collection program (10 USDC/hour).",
      portfolio_saas_desc: "Development of client dashboards, secure upload systems, workflow automation and complete management of linguistic projects.",
      portfolio_sector_desc: "Specialized tools for health, humanitarian and education, integrating local languages and field accessibility (offline first).",
      
      // Contact
      contact_title: "📤 Send your request or file",
      form_name: "Your full name",
      form_email: "Your professional email",
      form_service: "Select a service",
      form_message: "Describe your project, needs and constraints...",
      form_send: "🚀 Submit request",
      
      // Footer
      footer_text: "Linguistics, AI & Innovation for Africa",
      about_btn: "🌍 About us?"
    },
    
ar: {
  // General
  title: "HAM Global Words",
  subtitle: "التميز اللغوي في خدمة الابتكار الأفريقي",
  loader_tagline: "جسر اللغات، ربط المستقبل",
  
  // Navigation
  nav_expertise: "الخبرات",
  nav_services: "الخدمات",
  nav_portfolio: "الحلول",
  nav_contact: "اتصل بنا",
  
  // Hero
  hero_title: "اللغات • الذكاء الاصطناعي • الحلول الرقمية",
  hero_desc: "نرافق المنظمات غير الحكومية والمؤسسات الدولية والشركات في عملياتها اللغوية، وهيكلة البيانات متعددة اللغات، ونشر الحلول الرقمية المتكيفة مع الواقع الأفريقي.",
  hero_stats: "📊 +500 مشروع لغوي مكتمل | 🌍 15+ لغة أفريقية | 🤝 98% رضا العملاء",
  
  // Buttons
  btn_devis: "🚀 عرض سعر مجاني خلال 24 ساعة",
  btn_services: "📦 استكشف خدماتنا",
  btn_client: "🔐 منطقة العملاء الآمنة",
  
  // CEO
  ceo_toggle: "👤 المؤسس",
  ceo_title: "👤 المؤسس",
  ceo_title_role: "المؤسس والرئيس التنفيذي – HAM Global Words",
  ceo_bio1: "خبير في العمليات اللغوية والذكاء الاصطناعي وإدارة المشاريع متعددة الثقافات في أفريقيا.",
  ceo_bio2: "بفضل الخبرة الميدانية مع المنظمات غير الحكومية والمؤسسات الدولية والمشاريع التقنية، أجمع بين الدقة التحليلية والابتكار الرقمي.",
  ceo_expertise_title: "🌍 مجالات الخبرة",
  ceo_exp1: "الوسم اللغوي والذكاء الاصطناعي",
  ceo_exp2: "الترجمة الفورية الميدانية والوساطة",
  ceo_exp3: "إدارة المشاريع متعددة اللغات",
  ceo_exp4: "الحلول الرقمية لأفريقيا",
  ceo_vision_title: "🚀 الرؤية",
  ceo_vision_text: "دمج اللغات الأفريقية في التقنيات الحديثة وجعل الحلول الرقمية في متناول الواقع المحلي.",
  
  // Expertise
  expertise_title: "🎯 خبراتنا",
  expertise_desc: "تجمع HAM Global Words بين الخبرة اللغوية الميدانية والإدارة التشغيلية وتقنيات الذكاء الاصطناعي المتقدمة لتقديم حلول موثوقة وأخلاقية تتكيف مع البيئات المعقدة.",
  exp_ia_desc: "هيكلة ووسم والتحقق من صحة البيانات متعددة اللغات لنماذج معالجة اللغة الطبيعية والتعرف على الصوت وأنظمة الذكاء الاصطناعي.",
  exp_interp_desc: "التواصل الاستراتيجي بين الفاعلين الدوليين والمجتمعات المحلية في السياقات الإنسانية والطبية والمؤسسية الحساسة.",
  exp_ops_desc: "إدارة المشاريع اللغوية المعقدة ومراقبة الجودة والامتثال للقانون العام لحماية البيانات وتحسين الأداء.",
  exp_lang_desc: "خبرة أصلية في اللغات الأفريقية (طماشق، الهوسا، السونغاي، الزرما، الفولانية، العربية، الفرنسية، الإنجليزية) مع التكيف الثقافي والدقة السياقية.",
  
  // Services
  services_title: "🛠️ خدماتنا اللغوية والرقمية",
  services_desc: "تغطية كاملة للسلسلة اللغوية، من الترجمة التقليدية إلى الذكاء الاصطناعي، مع نهج موجه نحو النتائج ورضا العملاء.",
  
  // Portfolio
  portfolio_title: "🚀 حلول ومنتجات مبتكرة",
  portfolio_desc: "حلول ملموسة، تم اختبارها ميدانياً، مصممة لتلبية احتياجات المنظمات غير الحكومية والشركات والمشاريع التقنية العاملة في أفريقيا وعلى المستوى الدولي.",
  portfolio_dict_desc: "تطبيق لغوي متعدد اللغات يعمل دون اتصال بالإنترنت مخصص لتثمين والحفاظ وهيكلة اللغات الأفريقية المهددة بالانقراض.",
  portfolio_ai_desc: "إنشاء ووسم والتحقق من صحة البيانات اللغوية لمشاريع الذكاء الاصطناعي وتقنيات الصوت. انضم إلى برنامج جمعنا المدفوع (10 USDC/ساعة).",
  portfolio_saas_desc: "تطوير لوحات تحكم العملاء وأنظمة الرفع الآمن وأتمتة سير العمل والإدارة الكاملة للمشاريع اللغوية.",
  portfolio_sector_desc: "أدوات متخصصة للصحة والعمل الإنساني والتعليم، تدمج اللغات المحلية وإمكانية الوصول الميداني (دون اتصال أولاً).",
  
  // Contact
  contact_title: "📤 أرسل طلبك أو ملفك",
  form_name: "الاسم الكامل",
  form_email: "البريد الإلكتروني المهني",
  form_service: "اختر خدمة",
  form_message: "صِف مشروعك واحتياجاتك وقيودك...",
  form_send: "🚀 إرسال الطلب",
  
  // Footer
  footer_text: "اللغويات والذكاء الاصطناعي والابتكار لأفريقيا",
  about_btn: "🌍 من نحن؟"
}
  // ========================================
  // DOM READY
  // ========================================
  document.addEventListener("DOMContentLoaded", () => {

    // ========================================
    // LOADER (amélioré)
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
    // THEME SYSTEM (amélioré)
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
      
      // Mise à jour des éléments avec data-key
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
      
      // Mise à jour des attributs placeholder spécifiques
      document.querySelectorAll("[data-placeholder]").forEach(el => {
        const key = el.dataset.placeholder;
        if (dict[key]) el.placeholder = dict[key];
      });
      
      // Mise à jour du loader tagline
      const loaderTagline = document.querySelector('#loader p');
      if (loaderTagline && dict.loader_tagline) {
        loaderTagline.textContent = dict.loader_tagline;
      }
      
      // Direction RTL pour l'arabe
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lang;
      
      // Mise à jour du sélecteur
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

    // Application initiale de la langue
    applyLanguage(currentLang);

    // ========================================
    // ANNÉE DYNAMIQUE
    // ========================================
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ========================================
    // SMOOTH SCROLL (amélioré)
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
    // INTERSECTION OBSERVER (animations)
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
    // FORMULAIRE DE CONTACT (amélioré)
    // ========================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      // Validation taille fichier
      const fileInput = contactForm.querySelector('input[type="file"]');
      if (fileInput) {
        fileInput.addEventListener('change', () => {
          const file = fileInput.files[0];
          if (file && file.size > 5 * 1024 * 1024) {
            alert('Le fichier ne doit pas dépasser 5 Mo.');
            fileInput.value = '';
          }
        });
      }
      
      contactForm.addEventListener('submit', (e) => {
        const name = contactForm.querySelector('[name="name"]')?.value.trim();
        const email = contactForm.querySelector('[name="email"]')?.value.trim();
        const message = contactForm.querySelector('[name="message"]')?.value.trim();
        
        if (!name || !email || !message) {
          e.preventDefault();
          const errorMsg = currentLang === 'fr' ? 'Veuillez remplir tous les champs obligatoires (nom, email, message).' :
                           currentLang === 'en' ? 'Please fill in all required fields (name, email, message).' :
                           'الرجاء ملء جميع الحقول المطلوبة (الاسم، البريد الإلكتروني، الرسالة).';
          alert(errorMsg);
          return false;
        }
        
        if (!email.includes('@') || !email.includes('.')) {
          e.preventDefault();
          const errorMsg = currentLang === 'fr' ? 'Veuillez entrer un email valide.' :
                           currentLang === 'en' ? 'Please enter a valid email.' :
                           'الرجاء إدخال بريد إلكتروني صالح.';
          alert(errorMsg);
          return false;
        }
        
        // Indicateur de chargement
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          const loadingText = currentLang === 'fr' ? '⏳ Envoi en cours...' :
                              currentLang === 'en' ? '⏳ Sending...' :
                              '⏳ جاري الإرسال...';
          submitBtn.textContent = loadingText;
          setTimeout(() => {
            submitBtn.disabled = false;
            const sendText = translations[currentLang]?.form_send || '🚀 Envoyer';
            submitBtn.textContent = sendText;
          }, 5000);
        }
        
        return true;
      });
    }

    // ========================================
    // TOGGLE CEO (amélioré)
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
    // AUTHENTIFICATION (prototype uniquement)
    // ========================================
    if (window.location.pathname.includes('login.html') || 
        window.location.pathname.includes('register.html') ||
        window.location.pathname.includes('dashboard.html')) {
      console.warn('⚠️ L\'authentification utilise localStorage (non sécurisé). Pour la production, utilisez un backend.');
    }
    
    // REGISTER
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
        
        const user = { name, email, password };
        storage.setJSON("user", user);
        
        alert("Compte créé avec succès ! Vous pouvez vous connecter.");
        window.location.href = "login.html";
      });
    }
    
    // LOGIN
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
    
    // PROTECT DASHBOARD
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
    
    // LOGOUT
    window.logout = function() {
      storage.remove("isLogged");
      storage.remove("loggedUserEmail");
      window.location.href = "index.html";
    };
    
    // ========================================
    // GESTION DES ERREURS GLOBALES
    // ========================================
    window.addEventListener('error', (e) => {
      console.error('Global error:', e.error);
    });
    
  }); // Fin DOMContentLoaded
})(); // Fin IIFE
