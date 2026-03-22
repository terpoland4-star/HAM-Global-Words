// ========================================
// Dark/Light Mode Toggle
// ========================================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  body.classList.toggle('light-mode', savedTheme === 'light');
  themeToggle.textContent = savedTheme === 'light' ? '🌙' : '☀️';
}
themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
  localStorage.setItem('theme', currentTheme);
  themeToggle.textContent = currentTheme === 'light' ? '🌙' : '☀️';
});

// ========================================
// Dynamic Year in Footer
// ========================================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ========================================
// Smooth Scroll
// ========================================
document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.getElementById(link.getAttribute('href').slice(1));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ========================================
// Section Fade-in on Scroll
// ========================================
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.style.animationPlayState = 'running';
  });
}, { threshold: 0.1 });
sections.forEach(section => {
  section.style.animationPlayState = 'paused';
  observer.observe(section);
});

// ========================================
// Modale Services Premium
// ========================================
const serviceButtons = document.querySelectorAll('.service-btn');
const modal = document.getElementById('serviceModal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const closeModal = modal.querySelector('.close-modal');

serviceButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.service;
    const contentDiv = document.querySelector(`.service-content [data-service="${key}"]`);
    if (!contentDiv) return;

    modalTitle.textContent = btn.textContent;
    modalDesc.innerHTML = contentDiv.innerHTML;

    // Si c'est le service remote live, ajouter un bouton interactif
    if (key === 'remote') {
      const scheduleBtn = document.createElement('a');
      scheduleBtn.href = "https://calendly.com/hamglobalwords/remote-session"; // lien à adapter
      scheduleBtn.textContent = "📅 Planifier votre session";
      scheduleBtn.target = "_blank";
      scheduleBtn.rel = "noopener noreferrer";
      scheduleBtn.className = "schedule-btn";
      modalDesc.appendChild(scheduleBtn);
    }

    // Animation d'apparition des contenus
    modalDesc.querySelectorAll('p, ul, div').forEach((el, i) => {
      el.style.opacity = 0;
      el.style.transform = "translateY(20px)";
      setTimeout(() => {
        el.style.transition = "all 0.4s ease";
        el.style.opacity = 1;
        el.style.transform = "translateY(0)";
      }, i * 100);
    });

    modal.style.display = "flex";
    modal.setAttribute('aria-hidden', 'false');
  });
});

// Fermer modale
closeModal.addEventListener('click', () => {
  modal.style.display = "none";
  modal.setAttribute('aria-hidden', 'true');
});
window.addEventListener('click', e => {
  if (e.target === modal) {
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
  }
});

// ========================================
// Styles pour bouton remote live et animation
// ========================================
const style = document.createElement('style');
style.innerHTML = `
.schedule-btn {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.8rem 1.2rem;
  background-color: #ff6f61;
  color: #fff;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}
.schedule-btn:hover {
  background-color: #e85c50;
  transform: scale(1.05);
}
@media (max-width: 768px) {
  .modal-content { width: 90%; padding: 1rem; }
}
`;
document.head.appendChild(style);
