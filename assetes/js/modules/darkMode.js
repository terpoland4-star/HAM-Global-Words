export function initDarkMode() {
  const toggle = document.createElement("button");
  toggle.textContent = "🌓 Mode sombre";
  toggle.className = "dark-toggle";
  document.body.appendChild(toggle);

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const current = localStorage.getItem("theme") || (prefersDark ? "dark" : "light");

  const applyTheme = (theme) => {
    document.body.classList.toggle("dark-mode", theme === "dark");
    toggle.classList.toggle("active", theme === "dark");
    toggle.setAttribute("aria-pressed", theme === "dark");
    localStorage.setItem("theme", theme);
  };

  applyTheme(current);

  toggle.addEventListener("click", () => {
    applyTheme(document.body.classList.contains("dark-mode") ? "light" : "dark");
  });
}
