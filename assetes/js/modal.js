// ==========================
// MODALE DES SERVICES
// ==========================
const modal = document.getElementById("serviceModal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const closeModalBtn = document.querySelector(".close-modal");

const serviceButtons = document.querySelectorAll(".service-btn");
const serviceContents = document.querySelectorAll(".service-content > div");

serviceButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const serviceType = btn.getAttribute("data-service");
    const content = Array.from(serviceContents).find(
      (div) => div.getAttribute("data-service") === serviceType
    );

    if (content) {
      modalTitle.textContent = btn.textContent;
      modalDesc.textContent = content.textContent;
      modal.classList.add("show");
      document.body.style.overflow = "hidden"; // bloque scroll
    }
  });
});

const closeModal = () => {
  modal.classList.remove("show");
  document.body.style.overflow = "auto";
};

if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
window.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
