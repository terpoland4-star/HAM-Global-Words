// === Carrousel Témoignages ===
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  if (!slides.length) return;

  let index = 0;

  const showSlide = (i) => {
    slides.forEach((s, n) => s.classList.toggle("active", n === i));
  };

  document.getElementById("prev")?.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  });

  document.getElementById("next")?.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    showSlide(index);
  });

  setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
  }, 6000);
});
