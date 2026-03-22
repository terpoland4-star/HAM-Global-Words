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
// Section Fade-in on Scroll
// ========================================
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => {
  section.style.animationPlayState = 'paused';
  observer.observe(section);
});

// ========================================
// Modal for Service Details
// ========================================
const modal = document.getElementById('serviceModal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const closeModal = modal.querySelector('.close-modal');
const serviceBtns = document.querySelectorAll('.service-btn');
const serviceContents = document.querySelectorAll('.service-content > div');

// Fonction pour ouvrir modale
serviceBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const serviceKey = btn.dataset.service;
    const contentDiv = Array.from(serviceContents).find(div => div.dataset.service === serviceKey);
    if (contentDiv) {
      modalTitle.textContent = btn.textContent;
      modalDesc.innerHTML = contentDiv.innerHTML;
      modal.style.display = 'flex';
      modal.setAttribute('aria-hidden', 'false');
    }
  });
});

// Fermer modale
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
});

// Fermer modale en cliquant en dehors
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  }
});

// Optionnel : fermer avec ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'flex') {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  }
});

// ========================================
// Contact Form → Gmail
// ========================================
const form = document.getElementById('contactForm');

if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = form.name.value;
    const email = form.email.value;
    const service = form.service.value;
    const message = form.message.value;

    const subject = `Demande de service - ${service}`;
    const body = `
Nom: ${name}
Email: ${email}
Service: ${service}

Message:
${message}
    `;

    window.location.href = `mailto:hamadineagmoctar@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
