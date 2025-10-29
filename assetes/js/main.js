// ============================
// 🌍 HAM GLOBAL WORDS - MAIN JS (Sahel Night Pro Edition)
// ============================

(() => {
  "use strict";

  // ============================
  // 🔧 Service Worker (PWA)
  // ============================
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
      try {
        const reg = await navigator.serviceWorker.register("assetes/js/service-worker.js");
        console.log("✅ Service Worker enregistré :", reg.scope);
      } catch (err) {
        console.error("❌ Erreur Service Worker :", err);
      }
    });
  }

  // ============================
  // 🎉 Message de bienvenue console
  // ============================
  console.log(
    "%cBienvenue sur HAM Global Words 🌍",
    "color:#f4c842;font-size:16px;font-weight:bold;"
  );

  // ============================
  // 🌙 Mode sombre
  // ============================
  const initDarkMode = () => {
    const toggle = document.createElement("button");
    toggle.textContent = "🌓 Mode sombre";
    toggle.className = "dark-toggle";
    document.body.appendChild(toggle);

    const applyTheme = (theme) => {
      document.body.classList.toggle("dark-mode", theme === "dark");
      toggle.classList.toggle("active", theme === "dark");
      localStorage.setItem("theme", theme);
    };

    const current = localStorage.getItem("theme") || "light";
    applyTheme(current);

    toggle.addEventListener("click", () => {
      applyTheme(document.body.classList.contains("dark-mode") ? "light" : "dark");
    });
  };

  // ============================
  // 📅 Année dynamique
  // ============================
  const setYear = () => {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  };

  // ============================
  // 🪄 Animation au scroll
  // ============================
  const initScrollAnimations = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.target.classList.toggle("visible", e.isIntersecting));
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll("section, .cta").forEach((el) => {
      el.classList.add("hidden");
      observer.observe(el);
    });
  };

  // ============================
  // 📄 Charger README.md
  // ============================
  const loadReadme = async () => {
    const section = document.querySelector(".cta");
    if (!section) return;
    try {
      const res = await fetch("assetes/docs/README.md");
      const md = await res.text();
      const html = marked.parse(md);
      const wrapper = document.createElement("div");
      wrapper.className = "readme-preview";
      wrapper.innerHTML = html;
      section.appendChild(wrapper);
    } catch (err) {
      console.warn("Erreur lors du chargement du README.md :", err);
      section.insertAdjacentHTML("beforeend", "<p>📄 Contenu non disponible pour le moment.</p>");
    }
  };

  // ============================
  // 🍪 Bannière cookies
  // ============================
  const initCookies = () => {
    if (localStorage.getItem("cookiesAccepted")) return;

    const banner = document.createElement("div");
    banner.className = "cookie-banner show";
    banner.innerHTML = `
      🍪 Ce site utilise des cookies pour améliorer votre expérience.
      <button id="acceptCookies">Accepter</button>
    `;
    document.body.appendChild(banner);

    document.getElementById("acceptCookies")?.addEventListener("click", () => {
      localStorage.setItem("cookiesAccepted", "true");
      banner.remove();
    });
  };

  // ============================
  // 💌 Protection mailto
  // ============================
  const protectMailto = () => {
    document.querySelectorAll('a[href^="mailto:"]').forEach((link) =>
      link.addEventListener("click", (e) => {
        if (!confirm("Souhaitez-vous contacter HAM Global Words par e-mail ?")) {
          e.preventDefault();
        }
      })
    );
  };

  // ============================
  // 📞 Boutons flottants : E-mail & WhatsApp
  // ============================
  const initQuickContact = () => {
    const div = document.createElement("div");
    div.className = "quick-contact";
    div.innerHTML = `
      <a href="mailto:hamadineagmoctar@gmail.com?subject=Demande depuis le site&body=Bonjour Hamadine," target="_blank">📧 E-mail</a>
      <a href="https://wa.me/22786762903?text=Bonjour%20HAM%20Global%20Words," target="_blank">💬 WhatsApp</a>
    `;
    document.body.appendChild(div);
  };

  // ============================
  // 🌀 Scroll doux sur ancres
  // ============================
  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach((a) =>
      a.addEventListener("click", (e) => {
        const target = document.querySelector(a.getAttribute("href"));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      })
    );
  };

  // ============================
  // 🌬️ Effets “Vent du Désert”
  // ============================
  const initDesertEffects = () => {
    const wind = document.createElement("div");
    wind.className = "desert-wind";
    document.body.appendChild(wind);

    const haze = document.createElement("div");
    haze.className = "desert-haze";
    document.body.appendChild(haze);

    for (let i = 0; i < 60; i++) {
      const p = document.createElement("div");
      p.className = "sand-particle";
      Object.assign(p.style, {
        left: `${Math.random() * 100}vw`,
        top: `${Math.random() * 100}vh`,
        animationDelay: `${Math.random() * 30}s`,
        animationDuration: `${25 + Math.random() * 20}s`,
        opacity: `${0.4 + Math.random() * 0.6}`,
      });
      wind.appendChild(p);
    }
  };

  // ============================
  // 🧩 Installation PWA
  // ============================
  const initPWAInstall = () => {
    let deferredPrompt;
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;

      const banner = document.createElement("div");
      banner.className = "install-banner";
      banner.innerHTML = `
        <p>📲 Installez <strong>HAM Global Words</strong> sur votre appareil</p>
        <button id="installBtn">Installer</button>
      `;
      document.body.appendChild(banner);

      document.getElementById("installBtn").addEventListener("click", async () => {
        banner.remove();
        deferredPrompt.prompt();
        const result = await deferredPrompt.userChoice;
        console.log("Résultat installation :", result.outcome);
        deferredPrompt = null;
      });
    });
  };

  // ============================
  // 🖌️ Styles dynamiques
  // ============================
  const injectStyles = () => {
    const css = `
      .dark-toggle {
        position: fixed; top: 1rem; left: 1rem;
        background: #f4c842; color: #1d1f20;
        padding: 0.6rem 1rem; border: none; border-radius: 8px;
        font-weight: bold; cursor: pointer; z-index: 1000;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2); transition: all 0.3s ease;
      }
      .dark-toggle.active { background: #1d1f20; color: #f4c842; }
      .hidden { opacity: 0; transform: translateY(30px); transition: opacity 0.8s, transform 0.8s; }
      .visible { opacity: 1; transform: translateY(0); }
      .cookie-banner {
        position: fixed; bottom: 0; width: 100%; background: #222; color: #fff;
        text-align: center; padding: 1rem; z-index: 1000;
      }
      .quick-contact {
        position: fixed; bottom: 2rem; right: 2rem; display: flex; flex-direction: column; gap: 0.5rem; z-index: 1000;
      }
      .quick-contact a {
        background: #f4c842; color: #1d1f20; padding: 0.5rem 1rem;
        border-radius: 8px; text-decoration: none; font-weight: bold; text-align: center;
        transition: transform 0.2s ease;
      }
      .quick-contact a:hover { transform: scale(1.1); }
    `;
    const styleEl = document.createElement("style");
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
  };

  // ============================
  // 🚀 Initialisation globale
  // ============================
  document.addEventListener("DOMContentLoaded", () => {
    injectStyles();
    initDarkMode();
    setYear();
    initScrollAnimations();
    loadReadme();
    initCookies();
    protectMailto();
    initQuickContact();
    initSmoothScroll();
    initDesertEffects();
    initPWAInstall();
  });
})();
