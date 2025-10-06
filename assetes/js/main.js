// ==========================
// MESSAGE DE BIENVENUE
// ==========================
console.log(
  "%cBienvenue sur le site de HAM Global Words !",
  "color:#f4c842;font-size:16px;font-weight:bold;"
);

// ==========================
// MODE SOMBRE
// ==========================
const darkModeToggle = document.createElement("button");
darkModeToggle.textContent = "🌓 Mode sombre";
darkModeToggle.setAttribute("aria-label", "Activer ou désactiver le mode sombre");
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

// Appliquer le thème préféré s'il existe
const userTheme = localStorage.getItem("theme");
if (userTheme === "dark") {
  document.body.classList.add("dark-mode");
}

// Toggle thème + sauvegarde
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const newTheme = document.body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("theme", newTheme);
});

// ==========================
// ANNÉE DYNAMIQUE DANS FOOTER
// ==========================
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
