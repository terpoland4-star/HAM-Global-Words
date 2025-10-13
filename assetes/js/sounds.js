// assetes/js/sounds.js
document.addEventListener("DOMContentLoaded", () => {
  const hoverSound = new Audio("assetes/sounds/hover.mp3");
  const clickSound = new Audio("assetes/sounds/click.mp3");

  hoverSound.volume = 0.2;
  clickSound.volume = 0.25;

  document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("mouseenter", () => {
      hoverSound.currentTime = 0;
      hoverSound.play();
    });
    el.addEventListener("click", () => {
      clickSound.currentTime = 0;
      clickSound.play();
    });
  });
});
