// ==========================
// GESTION DES LANGUES
// ==========================

document.addEventListener("DOMContentLoaded", () => {
  const langSwitcher = document.createElement("div");
  langSwitcher.className = "lang-switcher";
  langSwitcher.innerHTML = `
    <button data-lang="fr">FR</button>
    <button data-lang="en">EN</button>
    <button data-lang="ar">AR</button>
  `;
  document.body.appendChild(langSwitcher);

  // Translations
  const translations = {
    fr: {
      pageTitle: "HAM Global Words – Services Linguistiques",
      headerTitle: "HAM Global Words",
      headerText: "Langues du Sahel, voix du monde",
      aboutTitle: "🌐 À propos",
      aboutText: "HAM Global Words est une entreprise spécialisée dans les services linguistiques multilingues à fort impact culturel et technologique. Fondée par Hamadine AG Moctar, elle s'engage à créer des ponts entre les langues africaines, l’intelligence artificielle, et les besoins du monde globalisé.",
      servicesTitle: "🛠️ Nos Services",
      service1: "Traduction & interprétation (FR, EN, AR, TAM, SONGHAÏ, TADAKSAHAK...)",
      service2: "Annotation de données pour IA multilingue",
      service3: "Transcription et adaptation audio/vidéo",
      service4: "Développement de dictionnaires & ressources linguistiques africaines",
      service5: "Médiation culturelle et projets humanitaires linguistiques",
      ctaTitle: "📩 Travaillons ensemble",
      ctaText: "Besoin d’un traducteur, interprète ou spécialiste des langues sahariennes pour un projet IA ou humanitaire ?",
      contactBtn: "Contactez-nous",
      footerText: "© 2025 HAM Global Words – Tous droits réservés | Site en construction"
    },
    en: {
      pageTitle: "HAM Global Words – Language Services",
      headerTitle: "HAM Global Words",
      headerText: "Languages of the Sahel, voice of the world",
      aboutTitle: "🌐 About",
      aboutText: "HAM Global Words is a company specializing in multilingual linguistic services with strong cultural and technological impact. Founded by Hamadine AG Moctar, it aims to bridge African languages, artificial intelligence, and global needs.",
      servicesTitle: "🛠️ Our Services",
      service1: "Translation & Interpretation (FR, EN, AR, TAM, SONGHAÏ, TADAKSAHAK...)",
      service2: "AI Data Annotation",
      service3: "Transcription & Audio/Video Adaptation",
      service4: "Development of African dictionaries & linguistic resources",
      service5: "Cultural mediation & humanitarian language projects",
      ctaTitle: "📩 Let's work together",
      ctaText: "Need a translator, interpreter, or Saharan language expert for an AI or humanitarian project?",
      contactBtn: "Contact us",
      footerText: "© 2025 HAM Global Words – All rights reserved | Site under construction"
    },
    ar: {
      pageTitle: "HAM Global Words – خدمات لغوية",
      headerTitle: "HAM Global Words",
      headerText: "لغات الساحل، صوت العالم",
      aboutTitle: "🌐 حول",
      aboutText: "HAM Global Words هي شركة متخصصة في الخدمات اللغوية متعددة اللغات ذات تأثير ثقافي وتقني قوي. أسسها حمادين AG Moctar وتهدف إلى بناء جسور بين اللغات الأفريقية والذكاء الاصطناعي واحتياجات العالم.",
      servicesTitle: "🛠️ خدماتنا",
      service1: "الترجمة والتفسير (FR, EN, AR, TAM, SONGHAÏ, TADAKSAHAK...)",
      service2: "تعليق بيانات الذكاء الاصطناعي",
      service3: "النسخ والتكييف السمعي/البصري",
      service4: "تطوير القواميس والموارد اللغوية الإفريقية",
      service5: "الوساطة الثقافية والمشاريع الإنسانية اللغوية",
      ctaTitle: "📩 لنعمل معًا",
      ctaText: "هل تحتاج إلى مترجم أو مفسر أو خبير في لغات الصحراء لمشروع ذكاء اصطناعي أو إنساني؟",
      contactBtn: "اتصل بنا",
      footerText: "© 2025 HAM Global Words – جميع الحقوق محفوظة | الموقع تحت الإنشاء"
    }
  };

  // Appliquer langue initiale (localStorage ou FR)
  const initialLang = localStorage.getItem("lang") || "fr";
  applyLang(initialLang);

  // Event listeners sur les boutons
  langSwitcher.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      localStorage.setItem("lang", lang);
      applyLang(lang);
    });
  });

  function applyLang(lang) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    // Mise à jour du <title>
    const titleKey = document.querySelector("title[data-i18n]");
    if (titleKey && translations[lang]["pageTitle"]) {
      titleKey.textContent = translations[lang]["pageTitle"];
    }
  }
});
