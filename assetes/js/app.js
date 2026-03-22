// ========================================
// SAFE INIT
// ========================================
document.addEventListener("DOMContentLoaded", () => {

  // ========================================
  // Dark / Light Mode
  // ========================================
  const themeToggle = document.getElementById('themeToggle');

  if (themeToggle) {
    const body = document.body;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
      body.classList.add('light-mode');
      themeToggle.textContent = '🌙';
    } else {
      themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
      body.classList.toggle('light-mode');
      const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
      localStorage.setItem('theme', currentTheme);
      themeToggle.textContent = currentTheme === 'light' ? '🌙' : '☀️';
    });
  }

  // ========================================
  // Footer Year
  // ========================================
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ========================================
  // Smooth Scroll (ONLY anchors)
  // ========================================
  document.querySelectorAll('.main-nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ========================================
  // Fade-in Sections
  // ========================================
  const sections = document.querySelectorAll('section');

  if (sections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));
  }

  // ========================================
  // Modal Services
  // ========================================
  const modal = document.getElementById('serviceModal');

  if (modal) {
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const closeBtn = modal.querySelector('.close-modal');
    const buttons = document.querySelectorAll('.service-btn');
    const contents = document.querySelectorAll('.service-content > div');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.service;

        const content = Array.from(contents).find(c => c.dataset.service === key);

        if (content && modalTitle && modalDesc) {
          modalTitle.textContent = btn.textContent;
          modalDesc.innerHTML = content.innerHTML;
          modal.style.display = 'flex';
        }
      });
    });

    // Close modal
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }

    // Click outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });

    // ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        modal.style.display = 'none';
      }
    });
  }

  // ========================================
  // Contact Form
  // ========================================
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const subject = `Demande - ${contactForm.service.value}`;
      const body = `
Nom: ${contactForm.name.value}
Email: ${contactForm.email.value}
Service: ${contactForm.service.value}

Message:
${contactForm.message.value}
      `;

      window.location.href = `mailto:hamadineagmoctar@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  // ========================================
  // Formation Form
  // ========================================
  const formationForm = document.getElementById('formationForm');

  if (formationForm) {
    formationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const subject = `Inscription Formation - ${formationForm.plan.value}`;
      const body = `
Nom: ${formationForm.name.value}
Email: ${formationForm.email.value}
Formule: ${formationForm.plan.value}

Objectif:
${formationForm.message.value}
      `;

      window.location.href = `mailto:hamadineagmoctar@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

});
