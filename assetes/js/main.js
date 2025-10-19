// ============================
// 🌍 HAM GLOBAL WORDS - MAIN JS
// Thème Sahel Night Deluxe + Vent du Désert
// ============================

// ============================
// 🔧 Enregistrement du Service Worker (PWA)
// ============================
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("assetes/js/service-worker.js")
      .then((registration) => {
        console.log("✅ Service Worker enregistré :", registration.scope);
      })
      .catch((err) => {
        console.error("❌ Erreur Service Worker :", err);
      });
  });
}

// ============================
// 🎉 MESSAGE DE BIENVENUE
// ============================
console.log(
  "%cBienvenue sur le site de HAM Global Words 🌍",
  "color:#f4c842;font-size:16px;font-weight:bold;"
);

// ============================
// 🌙 MODE SOMBRE
// ============================
const darkModeToggle = document.createElement("button");
darkModeToggle.textContent = "🌓 Mode sombre";
darkModeToggle.classList.add("dark-toggle");
document.body.appendChild(darkModeToggle);

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  darkModeToggle.classList.add("active");
}

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  darkModeToggle.classList.toggle("active");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark-mode") ? "dark" : "light"
  );
});

// ============================
// 📅 ANNÉE DYNAMIQUE
// ============================
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// ============================
// 🪄 ANIMATION AU SCROLL
// ============================
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.2 }
);
document.querySelectorAll("section, .cta").forEach((el) => {
  el.classList.add("hidden");
  observer.observe(el);
});

// ============================
// 📄 CHARGER README.md DANS .cta (si présent)
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const contactSection = document.querySelector(".cta");
  if (!contactSection) return;

  fetch("assetes/docs/README.md")
    .then((res) => res.text())
    .then((md) => {
      const html = marked.parse(md);
      const readmeContainer = document.createElement("div");
      readmeContainer.innerHTML = html;
      readmeContainer.classList.add("readme-preview");
      contactSection.appendChild(readmeContainer);
    })
    .catch((err) => {
      contactSection.innerHTML += "<p>Impossible de charger le fichier README.md.</p>";
      console.error("Erreur README:", err);
    });
});

// ============================
// 🍪 BANNIÈRE COOKIES
// ============================
const cookieBanner = document.createElement("div");
cookieBanner.className = "cookie-banner";
cookieBanner.innerHTML = `
  🍪 Ce site utilise des cookies pour améliorer votre expérience.
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

// ============================
// 💌 MAILTO PROTECTION
// ============================
const contactLink = document.querySelector('a[href^="mailto:"]');
if (contactLink) {
  contactLink.addEventListener("click", function (e) {
    const confirmSend = confirm(
      "Souhaitez-vous contacter HAM Global Words par e-mail ?"
    );
    if (!confirmSend) e.preventDefault();
  });
}

// ============================
// 📞 BOUTONS FLOTTANTS : EMAIL + WHATSAPP
// ============================
const quickContact = document.createElement("div");
quickContact.className = "quick-contact";
quickContact.innerHTML = `
  <a href="mailto:hamadineagmoctar@gmail.com?subject=Demande depuis le site&body=Bonjour Hamadine," target="_blank">📧 E-mail</a>
  <a href="https://wa.me/22786762903?text=Bonjour%20HAM%20Global%20Words," target="_blank">💬 WhatsApp</a>
`;
document.body.appendChild(quickContact);

// ============================
// 🌀 SCROLL DOUX SUR ANCRES
// ============================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ============================
// 🌬️ VENT DU DÉSERT + NUIT ÉTOILÉE
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const windContainer = document.createElement("div");
  windContainer.className = "desert-wind";
  document.body.appendChild(windContainer);

  const haze = document.createElement("div");
  haze.className = "desert-haze";
  document.body.appendChild(haze);

  for (let i = 0; i < 60; i++) {
    const particle = document.createElement("div");
    particle.className = "sand-particle";
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    particle.style.animationDelay = `${Math.random() * 30}s`;
    particle.style.animationDuration = `${25 + Math.random() * 20}s`;
    particle.style.opacity = `${0.4 + Math.random() * 0.6}`;
    windContainer.appendChild(particle);
  }
});


// ============================
// 🧩 INSTALLATION PWA
// ============================
let deferredPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const installBanner = document.createElement("div");
  installBanner.className = "install-banner";
  installBanner.innerHTML = `
    <p>📲 Installez <strong>HAM Global Words</strong> sur votre appareil</p>
    <button id="installBtn">Installer</button>
  `;
  document.body.appendChild(installBanner);

  document.getElementById("installBtn").addEventListener("click", async () => {
    installBanner.remove();
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log("Résultat installation :", outcome);
    deferredPrompt = null;
  });
});

// ============================
// 🎨 STYLES DYNAMIQUES ADDITIONNELS
// ============================
const style = document.createElement("style");
style.textContent = `
  .dark-toggle, .sound-toggle {
    position: fixed;
    left: 1rem;
    z-index: 1000;
    padding: 0.6rem 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    background: #f4c842;
    color: #1d1f20;
    font-weight: bold;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
  }
  .dark-toggle { top: 1rem; }
  .sound-toggle { top: 4.2rem; }

  .dark-toggle:hover, .sound-toggle:hover {
    background: #d3ac2b;
    transform: translateY(-2px);
  }
  .dark-toggle.active {
    background: #1d1f20;
    color: #f4c842;
  }

  .hidden { opacity: 0; transform: translateY(30px); transition: opacity 0.8s ease, transform 0.8s ease; }
  .visible { opacity: 1; transform: translateY(0); }

  .cookie-banner {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #222;
    color: #fff;
    text-align: center;
    padding: 1rem;
    display: none;
    z-index: 1000;
  }
  .cookie-banner.show { display: block; }

  .quick-contact {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    z-index: 1000;
  }
  .quick-contact a {
    background: #f4c842;
    color: #1d1f20;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: bold;
    text-align: center;
    transition: transform 0.2s;
  }
  .quick-contact a:hover { transform: scale(1.1); }
`;
document.head.appendChild(style);
