// ==========================
// MESSAGE DE BIENVENUE
// ==========================
console.log(
  "%cBienvenue sur le site de HAM Global Words ! 🌍",
  "color:#f4c842;font-size:16px;font-weight:bold;"
);

// ==========================
// MODE SOMBRE
// ==========================
const darkModeToggle = document.createElement("button");
darkModeToggle.textContent = "🌓";
darkModeToggle.setAttribute("title", "Basculer en mode sombre/clair");
darkModeToggle.classList.add("dark-toggle");
document.body.appendChild(darkModeToggle);

const applyTheme = (theme) => {
  document.body.classList.toggle("dark-mode", theme === "dark");
  localStorage.setItem("theme", theme);
  darkModeToggle.textContent = theme === "dark" ? "🌞" : "🌓";
};

// Restauration du thème précédent
const storedTheme = localStorage.getItem("theme");
applyTheme(storedTheme || "light");

// Toggle sur clic
darkModeToggle.addEventListener("click", () => {
  const newTheme = document.body.classList.contains("dark-mode") ? "light" : "dark";
  applyTheme(newTheme);
});

// ==========================
// ANNÉE DYNAMIQUE
// ==========================
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// ==========================
// ANIMATION APPARITION SECTIONS
// ==========================
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 }
);
sections.forEach((section) => observer.observe(section));

// ==========================
// BANNIÈRE COOKIES
// ==========================
function showCookieBanner() {
  if (!localStorage.getItem("cookiesAccepted")) {
    const banner = document.createElement("div");
    banner.className = "cookie-banner show";
    banner.innerHTML = `
      🍪 Ce site utilise des cookies pour améliorer votre expérience.
      <button id="acceptCookies" style="margin-left:1rem; padding:0.5rem 1rem; border:none; border-radius:5px; background:#f4c842; color:#1d1f20; cursor:pointer;">
        OK
      </button>
    `;
    document.body.appendChild(banner);

    document.getElementById("acceptCookies").onclick = () => {
      localStorage.setItem("cookiesAccepted", "true");
      banner.remove();
    };
  }
}
window.addEventListener("load", showCookieBanner);

// ==========================
// STYLE DU BOUTON DARK MODE
// ==========================
const style = document.createElement("style");
style.innerHTML = `
  .dark-toggle {
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 2000;
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
  }
  .dark-toggle:hover {
    transform: scale(1.1);
    background: var(--accent-hover);
  }
  section {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  section.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);
