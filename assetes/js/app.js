/* =====================================================
   HAM GLOBAL WORDS — APP.JS FINAL
   Services • Modale • Thème • UX
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     VARIABLES GLOBALES
  ========================= */
  const body = document.body;

  const modal = document.querySelector(".service-modal");
  const modalContent = document.querySelector(".modal-content");
  const modalTitle = modal?.querySelector("h2");
  const modalDesc = modal?.querySelector("p");
  const closeModalBtn = modal?.querySelector(".close-modal");

  const serviceButtons = document.querySelectorAll(".service-btn, .card");
  const serviceDataContainer = document.querySelector(".service-content");

  const themeToggle = document.getElementById("themeToggle");
  const yearSpan = document.getElementById("year");

  /* =========================
     ANNÉE AUTOMATIQUE
  ========================= */
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* =========================
     MODALE — OUVERTURE
  ========================= */
  function openModal(serviceKey) {
    if (!modal || !serviceDataContainer) return;

    const serviceBlock = serviceDataContainer.querySelector(
      `[data-service="${serviceKey}"]`
    );

    if (!serviceBlock) return;

    // Titre depuis le bouton
    const trigger = document.querySelector(
      `[data-service="${serviceKey}"]`
    );
    if (modalTitle && trigger) {
      modalTitle.textContent = trigger.textContent.trim();
    }

    // Contenu HTML
    if (modalDesc) {
      modalDesc.innerHTML = serviceBlock.innerHTML;
    }

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    body.classList.add("modal-open");
  }

  /* =========================
     MODALE — FERMETURE
  ========================= */
  function closeModal() {
    if (!modal) return;

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    body.classList.remove("modal-open");
  }

  /* =========================
     ÉCOUTEURS SERVICES
  ========================= */
  serviceButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const serviceKey = btn.dataset.service;
      if (serviceKey) {
        openModal(serviceKey);
      }
    });
  });

  /* =========================
     FERMETURE MODALE
  ========================= */
  closeModalBtn?.addEventListener("click", closeModal);

  modal?.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal?.classList.contains("open")) {
      closeModal();
    }
  });

  /* =========================
     THEME DARK / LIGHT
  ========================= */
  function applyTheme(theme) {
    if (theme === "light") {
      body.classList.remove("dark-mode");
    } else {
      body.classList.add("dark-mode");
    }
    localStorage.setItem("theme", theme);
  }

  const savedTheme = localStorage.getItem("theme") || "dark";
  applyTheme(savedTheme);

  themeToggle?.addEventListener("click", () => {
    const isDark = body.classList.contains("dark-mode");
    applyTheme(isDark ? "light" : "dark");
  });

});
