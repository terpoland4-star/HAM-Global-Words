export function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
  );

  document.querySelectorAll("section, .cta").forEach((el) => {
    el.classList.add("hidden");
    observer.observe(el);
  });
}
