// ============================
// 💬 MODALE DES SERVICES — Version Avancée
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("serviceModal");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const closeModalBtn = document.querySelector(".close-modal");
  const serviceButtons = document.querySelectorAll(".service-link, .service-btn, .card");
  const serviceContentBlocks = document.querySelectorAll(".service-content [data-service]");
  const body = document.body;

  if (!modal || !modalTitle || !modalDesc) return;

  // ----------------------------
  // 📚 Dictionnaire des titres
  // ----------------------------
  const titleMap = {
    translation: "🌐 Traduction multilingue",
    interpretation: "🎙️ Interprétation simultanée & consécutive",
    annotation: "🧠 Annotation linguistique & Intelligence Artificielle",
    transcription: "📜 Transcription & adaptation",
    mediation: "🌱 Médiation culturelle & éducation linguistique",
  };

  // ----------------------------
  // ✨ Gestion du flou d’arrière-plan
  // ----------------------------
  const toggleBlur = (state) => {
    const main = document.querySelector("main");
    if (!main) return;
    if (state) {
      main.style.filter = "blur(4px)";
      main.style.transition = "filter 0.3s ease";
    } else {
      main.style.filter = "none";
    }
  };

  // ============================
  // 🔹 OUVERTURE DE LA MODALE
  // ============================
  const openModal = (serviceKey) => {
    const serviceData = [...serviceContentBlocks].find(
      (block) => block.dataset.service === serviceKey
    );
    if (!serviceData) return;

    modalTitle.textContent = titleMap[serviceKey] || "Service linguistique";
    modalDesc.innerHTML = serviceData.innerHTML;

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    body.classList.add("no-scroll");
    toggleBlur(true);

    const content = modal.querySelector(".modal-content");
    if (content) {
      content.classList.add("fade-in");
      content.focus();
    }

    // Accessibilité : focus initial
    closeModalBtn?.focus();

    // Empêche la fermeture accidentelle pendant l’animation
    setTimeout(() => (modal.dataset.ready = "true"), 200);
  };

  // ============================
  // 🔹 FERMETURE DE LA MODALE
  // ============================
  const closeModal = () => {
    if (modal.dataset.ready !== "true") return; // évite les clics précoces

    const content = modal.querySelector(".modal-content");
    if (content) content.classList.remove("fade-in");

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    body.classList.remove("no-scroll");
    toggleBlur(false);

    modal.dataset.ready = "false";
  };

  // ============================
  // 🔸 GESTION DU FOCUS CLAVIER
  // ============================
  modal.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      const focusable = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const focusableArray = Array.from(focusable);
      const first = focusableArray[0];
      const last = focusableArray[focusableArray.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });

  // ============================
  // 🔸 ÉVÉNEMENTS UTILISATEUR
  // ============================

  serviceButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const serviceKey = btn.dataset.service;
      if (!serviceKey) return;

      const onIndex = document.querySelector(".services-preview");
      if (onIndex) {
        openModal(serviceKey);
      } else {
        window.location.href = `services.html?service=${encodeURIComponent(serviceKey)}`;
      }
    });
  });

  closeModalBtn?.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) closeModal();
  });

  // ============================
  // 🎯 OUVERTURE AUTO VIA PARAMÈTRE
  // ============================
  const params = new URLSearchParams(window.location.search);
  const service = params.get("service");

  if (service) {
    const targetBlock = document.querySelector(`.service-content [data-service="${service}"]`);
    if (targetBlock) {
      openModal(service);
    }
  }
});
