// script.js

// ✅ Message de bienvenue dans la console
console.log("Bienvenue sur le site de HAM Global Words !");

// ✅ Scrolling doux pour les ancres (si tu ajoutes des liens vers des sections)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// ✅ Message de contact (popup de confirmation avant d'envoyer un mail)
const contactLink = document.querySelector('a[href^="mailto:"]');
if (contactLink) {
  contactLink.addEventListener('click', function (e) {
    const confirmSend = confirm("Souhaitez-vous contacter HAM Global Words par e-mail ?");
    if (!confirmSend) e.preventDefault();
  });
}

// ✅ Ajout d’une date dynamique dans le footer (année automatique)
const footer = document.querySelector('footer');
if (footer) {
  const year = new Date().getFullYear();
  footer.innerHTML += ` | ${year}`;
}
