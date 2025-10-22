// ============================
// 💬 MODALE DES SERVICES (HAM Global Words)
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("serviceModal");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const closeModalBtn = document.querySelector(".close-modal");
  const serviceButtons = document.querySelectorAll(".service-btn, .card");
  const serviceContentBlocks = document.querySelectorAll(".service-content [data-service]");

  if (!modal || !modalTitle || !modalDesc) return;

  // Dictionnaire des titres
  const titleMap = {
    translation: "🌐 Traduction multilingue",
    interpretation: "🎙️ Interprétation",
    annotation: "🧠 Annotation linguistique & IA",
    transcription: "📜 Transcription & adaptation",
    mediation: "🌱 Médiation culturelle",
  };

  // ----------------------------
  // 🔹 OUVERTURE DE LA MODALE
  // ----------------------------
  const openModal = (serviceKey) => {
    const serviceData = Array.from(serviceContentBlocks).find(
      (block) => block.getAttribute("data-service") === serviceKey
    );

    if (serviceData) {
      modalTitle.textContent = titleMap[serviceKey] || "Service linguistique";
      modalDesc.innerHTML = serviceData.innerHTML;

      modal.classList.add("active");
      document.body.style.overflow = "hidden";
      modal.setAttribute("aria-hidden", "false");

      // Focus sur le bouton fermer pour accessibilité
      closeModalBtn.focus();
    }
  };

  // ----------------------------
  // 🔹 FERMETURE DE LA MODALE
  // ----------------------------
  const closeModal = () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "auto";
  };

  // ----------------------------
  // 🔸 ÉVÉNEMENTS UTILISATEUR
  // ----------------------------
  // Clic sur les boutons ou cartes
  serviceButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const serviceKey = btn.getAttribute("data-service");
      if (serviceKey) {
        // Si on est sur index.html, ouvrir la modale
        if (document.querySelector(".services-preview")) {
          openModal(serviceKey);
        } else {
          // Sinon, rediriger vers services.html avec le bon service
          window.location.href = `services.html?service=${serviceKey}`;
        }
      }
    });
  });

  // Clic sur le bouton "×"
  closeModalBtn?.addEventListener("click", closeModal);

  // Clic à l’extérieur du contenu
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Touche Échap
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  // ----------------------------
  // 🎯 OUVERTURE AUTO VIA PARAMÈTRE
  // ----------------------------
  const params = new URLSearchParams(window.location.search);
  const service = params.get("service");

  if (service) {
    const content = document.querySelector(`.service-content [data-service="${service}"]`);
    if (content) {
      modalTitle.textContent = titleMap[service] || "Service linguistique";
      modalDesc.innerHTML = content.innerHTML;
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }
});
