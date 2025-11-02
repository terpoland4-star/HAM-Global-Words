export function initDesertEffects() {
  const wind = document.createElement("div");
  wind.className = "desert-wind";
  document.body.appendChild(wind);

  const haze = document.createElement("div");
  haze.className = "desert-haze";
  document.body.appendChild(haze);

  const particleCount = window.innerWidth < 768 ? 30 : 60;
  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement("div");
    p.className = "sand-particle";
    Object.assign(p.style, {
      left: `${Math.random() * 100}vw`,
      top: `${Math.random() * 100}vh`,
      animationDelay: `${Math.random() * 30}s`,
      animationDuration: `${25 + Math.random() * 20}s`,
      opacity: `${0.4 + Math.random() * 0.6}`,
    });
    wind.appendChild(p);
  }
}
