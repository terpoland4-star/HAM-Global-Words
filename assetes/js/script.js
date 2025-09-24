/* ============================
   MESSAGE DE BIENVENUE
============================ */
console.log("%cBienvenue sur le site de HAM Global Words !", "color:#f4c842;font-size:16px;font-weight:bold;");

/* ============================
   MODE SOMBRE
============================ */
const darkModeToggle = document.createElement("button");
darkModeToggle.textContent = "🌓 Mode sombre";
darkModeToggle.style.position = "fixed";
darkModeToggle.style.top = "1rem";
darkModeToggle.style.left = "1rem";
darkModeToggle.style.zIndex = "1000";
darkModeToggle.style.padding = "0.5rem 1rem";
darkModeToggle.style.border = "none";
darkModeToggle.style.borderRadius = "4px";
darkModeToggle.style.cursor = "pointer";
darkModeToggle.style.background = "#f4c842";
darkModeToggle.style.color = "#1d1f20";
document.body.appendChild(darkModeToggle);

// Détecter préférence système
if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.body.classList.add("dark-mode");
}

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

/* ============================
   FORMULAIRE DYNAMIQUE
============================ */
const contactSection = document.querySelector(".cta");
if (contactSection) {
    const form = document.createElement("form");
    form.innerHTML = `
      <input type="text" name="name" placeholder="Votre nom" required>
      <input type="email" name="email" placeholder="Votre email" required>
      <textarea name="message" placeholder="Votre message" required></textarea>
      <button type="submit">Envoyer</button>
      <p class="form-response" style="margin-top:1rem;color:green;display:none;"></p>
    `;
    contactSection.appendChild(form);

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        const response = form.querySelector(".form-response");
        response.textContent = "Merci ! Votre message a été envoyé.";
        response.style.display = "block";
        form.reset();
    });
}

/* ============================
   BANNIERE COOKIES
============================ */
const cookieBanner = document.createElement("div");
cookieBanner.className = "cookie-banner";
cookieBanner.innerHTML = `
  Ce site utilise des cookies pour améliorer votre expérience.
  <button id="accept-cookies" style="margin-left:1rem;padding:0.3rem 0.6rem;">Accepter</button>
`;
document.body.appendChild(cookieBanner);

if (!localStorage.getItem("cookiesAccepted")) {
    cookieBanner.classList.add("show");
}

document.getElementById("accept-cookies")?.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true");
    cookieBanner.classList.remove("show");
});

/* ============================
   SWITCHER LANGUE GLOBAL
============================ */
document.addEventListener("DOMContentLoaded", () => {
    const langSwitcher = document.createElement("div");
    langSwitcher.className = "lang-switcher";
    langSwitcher.innerHTML = `
      <button data-lang="fr">FR</button>
      <button data-lang="en">EN</button>
      <button data-lang="ar">AR</button>
    `;
    document.body.appendChild(langSwitcher);

    const translations = {
        fr: {
            aboutTitle: "🌐 À propos",
            aboutText: "HAM Global Words est une entreprise spécialisée dans les services linguistiques multilingues à fort impact culturel et technologique. Fondée par Hamadine AG Moctar, elle s'engage à créer des ponts entre les langues africaines, l’intelligence artificielle, et les besoins du monde globalisé.",
            servicesTitle: "🛠️ Nos Services",
            servicesText: "Traduction & interprétation (FR, EN, AR, TAM, SONGHAÏ, TADAKSAHAK...), Annotation IA, Transcription, Médiation culturelle",
            ctaTitle: "📩 Travaillons ensemble",
            ctaText: "Besoin d’un traducteur, interprète ou spécialiste des langues sahariennes pour un projet IA ou humanitaire ?",
            contactBtn: "Contactez-nous"
        },
        en: {
            aboutTitle: "🌐 About",
            aboutText: "HAM Global Words is a company specializing in multilingual linguistic services with strong cultural and technological impact. Founded by Hamadine AG Moctar, it aims to bridge African languages, artificial intelligence, and global needs.",
            servicesTitle: "🛠️ Our Services",
            servicesText: "Translation & Interpretation (FR, EN, AR, TAM, SONGHAÏ, TADAKSAHAK...), AI Annotation, Transcription, Cultural Mediation",
            ctaTitle: "📩 Let's work together",
            ctaText: "Need a translator, interpreter, or Saharan language expert for an AI or humanitarian project?",
            contactBtn: "Contact us"
        },
        ar: {
            aboutTitle: "🌐 حول",
            aboutText: "HAM Global Words هي شركة متخصصة في الخدمات اللغوية متعددة اللغات ذات تأثير ثقافي وتقني قوي. أسسها حمادين AG Moctar وتهدف إلى بناء جسور بين اللغات الأفريقية والذكاء الاصطناعي واحتياجات العالم.",
            servicesTitle: "🛠️ خدماتنا",
            servicesText: "الترجمة والتفسير (FR, EN, AR, TAM, SONGHAÏ, TADAKSAHAK...)، التعليقات للذكاء الاصطناعي، النسخ، الوساطة الثقافية",
            ctaTitle: "📩 لنعمل معًا",
            ctaText: "هل تحتاج إلى مترجم أو مفسر أو خبير في لغات الصحراء لمشروع ذكاء اصطناعي أو إنساني؟",
            contactBtn: "اتصل بنا"
        }
    };

    langSwitcher.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", () => {
            const lang = btn.getAttribute("data-lang");
            document.querySelectorAll("[data-i18n]").forEach(el => {
                const key = el.getAttribute("data-i18n");
                if (translations[lang][key]) {
                    el.textContent = translations[lang][key];
                }
            });
        });
    });
});


/* ============================
   SCROLLING DOUX POUR ANCRAGES
============================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/* ============================
   POPUP POUR MAILTO
============================ */
const contactLink = document.querySelector('a[href^="mailto:"]');
if (contactLink) {
    contactLink.addEventListener('click', function(e) {
        const confirmSend = confirm("Souhaitez-vous contacter HAM Global Words par e-mail ?");
        if (!confirmSend) e.preventDefault();
    });
}

/* ============================
   ANNEE DYNAMIQUE DANS FOOTER
============================ */
const footer = document.querySelector('footer');
if (footer) {
    const yearSpan = document.createElement('span');
    yearSpan.textContent = ` | ${new Date().getFullYear()}`;
    footer.appendChild(yearSpan);
}
