// ========================================
// Dark/Light Mode Toggle
// ========================================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Vérifier le thème sauvegardé
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  body.classList.toggle('light-mode', savedTheme === 'light');
  themeToggle.textContent = savedTheme === 'light' ? '🌙' : '☀️';
}

// Fonction toggle
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
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ========================================
// Smooth Scroll for Nav Links
// ========================================
const navLinks = document.querySelectorAll('.main-nav a');
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ========================================
// Section Fade-in on Scroll (Optional Enhancement)
// ========================================
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => {
  section.style.animationPlayState = 'paused';
  observer.observe(section);
});
