// ==========================
// MODALE DES SERVICES
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("serviceModal");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const closeModalBtn = document.querySelector(".close-modal");
  const serviceButtons = document.querySelectorAll(".service-btn");
  const serviceContentBlocks = document.querySelectorAll(".service-content [data-service]");

  // Fonction pour ouvrir la modale
  const openModal = (serviceKey) => {
    const serviceData = Array.from(serviceContentBlocks).find(
      (block) => block.getAttribute("data-service") === serviceKey
    );

    if (serviceData) {
      // Remplir les contenus
      const titleMap = {
        translation: "🌐 Traduction multilingue",
        interpretation: "🎙️ Interprétation",
        annotation: "🧠 Annotation linguistique & IA",
        transcription: "📜 Transcription & adaptation",
        mediation: "🌱 Médiation culturelle",
      };

      modalTitle.textContent = titleMap[serviceKey] || "Service linguistique";
      modalDesc.innerHTML = serviceData.innerHTML;

      // Afficher la modale
      modal.style.display = "block";
      document.body.style.overflow = "hidden";
    }
  };

  // Fonction pour fermer la modale
  const closeModal = () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  };

  // Clic sur bouton service
  serviceButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const serviceKey = btn.getAttribute("data-service");
      openModal(serviceKey);
    });
  });

  // Clic sur bouton "×"
  closeModalBtn.addEventListener("click", closeModal);

  // Clic à l’extérieur pour fermer
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Fermeture avec la touche Échap
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "block") {
      closeModal();
    }
  });
});
