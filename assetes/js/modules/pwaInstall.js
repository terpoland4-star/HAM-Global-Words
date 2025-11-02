export function initPWAInstall() {
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

    banner.querySelector("#installBtn").addEventListener("click", async () => {
      banner.remove();
      deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      console.log("Résultat installation :", result.outcome);
      deferredPrompt = null;
    });
  });
}
