// ==========================
// MODALE SERVICE – services.html uniquement
// ==========================

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("serviceModal");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const closeModal = document.querySelector(".close-modal");
  const serviceButtons = document.querySelectorAll(".service-btn");

  if (!modal || !modalTitle || !modalDesc) return;

  // Affichage de la modale
  serviceButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const serviceKey = btn.getAttribute("data-service");
      const contentDiv = document.querySelector(`.service-content [data-service="${serviceKey}"]`);
      if (contentDiv) {
        modalTitle.textContent = btn.textContent;
        modalDesc.textContent = contentDiv.textContent;
        modal.style.display = "flex";
        modal.setAttribute("aria-hidden", "false");
      }
    });
  });

  // Fermeture de la modale
  closeModal?.addEventListener("click", () => {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  });

  // Fermer si clic à l'extérieur
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
    }
  });

  // ESC pour fermer
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") {
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
    }
  });
});
