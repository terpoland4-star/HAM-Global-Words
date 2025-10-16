// ==========================
// MODALE DYNAMIQUE – SERVICES
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".service-btn");
  const modal = document.getElementById("serviceModal");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const closeModalBtn = document.querySelector(".close-modal");
  const serviceContents = document.querySelectorAll(".service-content [data-service]");

  if (!buttons.length || !modal) return;

  // Quand on clique sur un bouton
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const serviceType = btn.getAttribute("data-service");
      const serviceData = Array.from(serviceContents).find(
        (el) => el.getAttribute("data-service") === serviceType
      );

      // Définir le titre
      modalTitle.textContent = btn.textContent.trim();

      // Charger le contenu
      if (serviceData) {
        modalDesc.innerHTML = serviceData.innerHTML;
      } else {
        modalDesc.textContent = "Détails du service indisponibles.";
      }

      // Afficher la modale
      modal.style.display = "block";
      document.body.style.overflow = "hidden"; // empêche le scroll arrière-plan
    });
  });

  // Fermer la modale
  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  // Fermer la modale en cliquant à l’extérieur
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Fermer avec la touche Échap
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "block") {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
});
