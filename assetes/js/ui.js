// ==========================
// CHARGER README.md DANS .cta
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const contactSection = document.querySelector(".cta");

  // Supprimer lien mailto s'il existe
  const mailtoLink = contactSection?.querySelector('a[href^="mailto:"]');
  if (mailtoLink) mailtoLink.remove();

  if (contactSection) {
    fetch("assets/docs/README.md")
      .then((res) => res.text())
      .then((md) => {
        const html = marked.parse(md); // Convertir Markdown en HTML
        const readmeContainer = document.createElement("div");
        readmeContainer.innerHTML = html;
        readmeContainer.classList.add("readme-preview");
        contactSection.appendChild(readmeContainer);
      })
      .catch((err) => {
        contactSection.innerHTML += "<p>Impossible de charger le fichier README.md.</p>";
        console.error("Erreur README:", err);
      });
  }

  // Adresse mail conservée pour usage interne
  const internalMail = "hamadineagmoctar@gmail.com";
});


  // ==========================
  // BANNIÈRE COOKIES
  // ==========================
  const cookieBanner = document.createElement("div");
  cookieBanner.className = "cookie-banner";
  cookieBanner.innerHTML = `
    Ce site utilise des cookies pour améliorer votre expérience.
    <button id="accept-cookies" style="margin-left:1rem;padding:0.3rem 0.6rem;">Accepter</button>
  `;
  document.body.appendChild(cookieBanner);

  if (!localStorage.getItem("cookiesAccepted")) {
    cookieBanner.classList.add("show");
  }

  document.getElementById("accept-cookies")?.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true");
    cookieBanner.classList.remove("show");
  });

  // ==========================
  // MAILTO PROTECTION
  // ==========================
  const contactLink = document.querySelector('a[href^="mailto:"]');
  if (contactLink) {
    contactLink.addEventListener("click", function (e) {
      const confirmSend = confirm("Souhaitez-vous contacter HAM Global Words par e-mail ?");
      if (!confirmSend) e.preventDefault();
    });
  }

  // ==========================
  // BOUTONS FLOTTANTS : EMAIL + WHATSAPP
  // ==========================
  const quickContact = document.createElement("div");
  quickContact.className = "quick-contact";
  quickContact.innerHTML = `
    <a href="mailto:hamadineagmoctar@gmail.com?subject=Demande depuis le site&body=Bonjour Hamadine," target="_blank">📧 E-mail</a>
    <a href="https://wa.me/22786762903?text=Bonjour%20HAM%20Global%20Words," target="_blank">💬 WhatsApp</a>
  `;
  document.body.appendChild(quickContact);

  const style = document.createElement("style");
  style.textContent = `
    .quick-contact {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      z-index: 1000;
    }
    .quick-contact a {
      background: #f4c842;
      color: #1d1f20;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      text-decoration: none;
      font-weight: bold;
      text-align: center;
      transition: transform 0.2s;
    }
    .quick-contact a:hover {
      transform: scale(1.1);
    }
  `;
  document.head.appendChild(style);

  // ==========================
  // SCROLL DOUX SUR ANCRES
  // ==========================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
