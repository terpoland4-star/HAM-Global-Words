export function initCookies() {
  if (localStorage.getItem("cookiesAccepted")) return;

  const banner = document.createElement("div");
  banner.className = "cookie-banner show";
  banner.innerHTML = `
    🍪 Ce site utilise des cookies pour améliorer votre expérience.
    <button>Accepter</button>
  `;
  document.body.appendChild(banner);

  banner.querySelector("button").addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true");
    banner.remove();
  });
}
