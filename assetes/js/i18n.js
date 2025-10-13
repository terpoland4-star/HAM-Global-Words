// ==========================
// INTERNATIONALISATION SIMPLE
// ==========================
const translations = {
  fr: {
    pageTitle: "HAM Global Words – Services Linguistiques",
    headerTitle: "HAM Global Words",
    headerText: "Langues du Sahel, voix du monde",
    aboutTitle: "🌐 À propos",
    ctaTitle: "📩 Travaillons ensemble",
    ctaText: "Besoin d’un traducteur ou interprète ? Contactez-nous.",
    contactBtn: "Contactez-nous",
    footerText: "© 2025 HAM Global Words – Tous droits réservés"
  },
  en: {
    pageTitle: "HAM Global Words – Language Services",
    headerTitle: "HAM Global Words",
    headerText: "Languages of the Sahel, voices of the world",
    aboutTitle: "🌐 About Us",
    ctaTitle: "📩 Let’s Work Together",
    ctaText: "Need a translator or interpreter? Contact us.",
    contactBtn: "Get in Touch",
    footerText: "© 2025 HAM Global Words – All rights reserved"
  }
};

// ==========================
// FONCTION DE CHANGEMENT
// ==========================
function switchLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  localStorage.setItem("lang", lang);
}

// ==========================
// INIT AUTO
// ==========================
const savedLang = localStorage.getItem("lang") || "fr";
switchLanguage(savedLang);

// ==========================
// BOUTON FLOTTANT
// ==========================
const langBtn = document.createElement("button");
langBtn.textContent = savedLang === "fr" ? "🇫🇷" : "🇬🇧";
langBtn.classList.add("lang-toggle");
document.body.appendChild(langBtn);

langBtn.addEventListener("click", () => {
  const newLang = langBtn.textContent === "🇫🇷" ? "en" : "fr";
  langBtn.textContent = newLang === "fr" ? "🇫🇷" : "🇬🇧";
  switchLanguage(newLang);
});

const langStyle = document.createElement("style");
langStyle.innerHTML = `
.lang-toggle {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  background: var(--accent-color);
  color: var(--header-bg);
  border: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  font-size: 1.4rem;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  transition: transform 0.2s, background 0.3s;
  z-index: 1000;
}
.lang-toggle:hover {
  transform: scale(1.1);
  background: var(--accent-hover);
}
`;
document.head.appendChild(langStyle);
