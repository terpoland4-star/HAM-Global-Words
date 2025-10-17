// ============================
// 📦 Service Worker - Cache PWA
// ============================

const CACHE_NAME = "ham-global-words-v1";
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./services.html",
  "./assetes/css/style.css",
  "./assetes/js/main.js",
  "./assetes/img/logoHAM.png",
  "./assetes/img/HAM.png",
  "./assetes/img/linkedin.png",
  "./assetes/img/whatsapp.png"
];

// 🧭 Installation : mise en cache initiale
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("📦 Mise en cache initiale...");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// ♻️ Activation : suppression anciens caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => key !== CACHE_NAME && caches.delete(key)))
    )
  );
  self.clients.claim();
});

// 🌐 Fetch : servir depuis le cache si offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() =>
          caches.match("./index.html")
        )
      );
    })
  );
});
