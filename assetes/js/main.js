// ============================
// 🌍 HAM GLOBAL WORDS - MAIN JS (Modular, resilient + lazy loads)
// ============================

(async () => {
  // run after DOM ready
  if (document.readyState === 'loading') {
    await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve, { once: true }));
  }

  console.log("%cBienvenue sur HAM Global Words 🌍", "color:#f4c842;font-size:16px;font-weight:bold;");

  // Helper to import a module and call a named initializer safely
  const safeInit = async (path, fnName, { args = [], optional = false } = {}) => {
    try {
      const mod = await import(path);
      const fn = mod[fnName];
      if (typeof fn === 'function') {
        return await fn(...args);
      } else if (!optional) {
        throw new Error(`${fnName} is not exported from ${path}`);
      }
    } catch (err) {
      console.error(`Module init failed (${path} -> ${fnName}):`, err);
      // swallow to allow other modules to continue
    }
  };

  // Lightweight synchronous-ish modules (still dynamic but awaited first to avoid FOUC)
  await Promise.allSettled([
    safeInit('./utils/injectStyles.js', 'injectStyles', { optional: true }),
    safeInit('./modules/year.js', 'setYear', { optional: true }),
    safeInit('./modules/darkMode.js', 'initDarkMode', { optional: true }),
  ]);

  // Register service worker only if supported and secure context
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    // non-blocking: register but don't await blocking failures for other features
    safeInit('./modules/serviceWorker.js', 'registerServiceWorker', { optional: true });
  } else {
    console.info('Service Worker not registered: unsupported or insecure context.');
  }

  // Launch remaining features concurrently (non-blocking)
  const features = [
    safeInit('./modules/scrollAnimations.js', 'initScrollAnimations', { optional: true }),
    safeInit('./modules/readmeLoader.js', 'loadReadme', { optional: true }),
    safeInit('./modules/modal.js', 'initServiceModal', { optional: true }),
    safeInit('./modules/cookies.js', 'initCookies', { optional: true }),
    safeInit('./modules/quickContact.js', 'initQuickContact', { optional: true }),
    safeInit('./modules/smoothScroll.js', 'initSmoothScroll', { optional: true }),
    safeInit('./modules/desertEffects.js', 'initDesertEffects', { optional: true }),
    // PWA install may rely on a BeforeInstallPrompt event; initialize if feature exists
    (async () => {
      if ('onbeforeinstallprompt' in window || window.BeforeInstallPromptEvent) {
        await safeInit('./modules/pwaInstall.js', 'initPWAInstall', { optional: true });
      } else {
        // still try to init optionally — module might do its own checks
        await safeInit('./modules/pwaInstall.js', 'initPWAInstall', { optional: true });
      }
    })(),
  ];

  const results = await Promise.allSettled(features);
  const failures = results
    .map((r, i) => ({ r, i }))
    .filter(x => x.r.status === 'rejected' || (x.r.status === 'fulfilled' && x.r.value instanceof Error));

  if (failures.length > 0) {
    console.warn(`Some feature initializers failed (${failures.length}). Check console for details.`);
  } else {
    console.log('All features initialized (or gracefully skipped).');
  }
})();
