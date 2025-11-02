// ============================
// 🌍 HAM GLOBAL WORDS - MAIN JS (Modular Edition)
// ============================

import { registerServiceWorker } from './modules/serviceWorker.js';
import { initDarkMode } from './modules/darkMode.js';
import { setYear } from './modules/year.js';
import { initScrollAnimations } from './modules/scrollAnimations.js';
import { loadReadme } from './modules/readmeLoader.js';
import { initCookies } from './modules/cookies.js';
import { protectMailto } from './modules/mailProtection.js';
import { initQuickContact } from './modules/quickContact.js';
import { initSmoothScroll } from './modules/smoothScroll.js';
import { initDesertEffects } from './modules/desertEffects.js';
import { initPWAInstall } from './modules/pwaInstall.js';
import { injectStyles } from './utils/injectStyles.js';

document.addEventListener("DOMContentLoaded", () => {
  console.log("%cBienvenue sur HAM Global Words 🌍", "color:#f4c842;font-size:16px;font-weight:bold;");
  injectStyles();
  registerServiceWorker();
  initDarkMode();
  setYear();
  initScrollAnimations();
  loadReadme();
  initCookies();
  initQuickContact();
  initSmoothScroll();
  initDesertEffects();
  initPWAInstall();
});
