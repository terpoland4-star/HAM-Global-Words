// ============================
// 💬 MODALE DES SERVICES (HAM Global Words)
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("serviceModal");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const closeModalBtn = document.querySelector(".close-modal");
  const serviceButtons = document.querySelectorAll(".service-btn, .card, .service-link");
  const serviceContentBlocks = document.querySelectorAll(".service-content [data-service]");

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
    document.body.classList.add("no-scroll");

    const content = modal.querySelector(".modal-content");
    if (content) content.classList.add("fade-in");

    // Focus accessibilité
    closeModalBtn?.focus();
  };

  // ============================
  // 🔹 FERMETURE DE LA MODALE
  // ============================
  const closeModal = () => {
    const content = modal.querySelector(".modal-content");
    if (content) content.classList.remove("fade-in");

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  };

  // ============================
  // 🔸 ÉVÉNEMENTS UTILISATEUR
  // ============================

  serviceButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const serviceKey = btn.dataset.service;
      if (!serviceKey) return; // Laisse le lien agir normalement si pas de dataset
      e.preventDefault();

      const onIndex = document.querySelector(".services-preview");
      if (onIndex) {
        openModal(serviceKey);
      } else {
        // Redirection propre SEO-friendly
        window.location.href = `services.html?service=${encodeURIComponent(serviceKey)}`;
      }
    });
  });

  // Bouton de fermeture
  closeModalBtn?.addEventListener("click", closeModal);

  // Fermeture au clic à l’extérieur du contenu
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Fermeture via la touche Échap
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  // ============================
  // 🎯 OUVERTURE AUTO VIA PARAMÈTRE D'URL
  // ============================
  const params = new URLSearchParams(window.location.search);
  const service = params.get("service");

  if (service) openModal(service);
});
