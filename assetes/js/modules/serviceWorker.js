export async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", async () => {
    try {
      const reg = await navigator.serviceWorker.register("/assets/js/service-worker.js", { scope: "/" });
      console.log("✅ Service Worker enregistré :", reg.scope);
    } catch (err) {
      console.error("❌ Erreur Service Worker :", err);
    }
  });
}
