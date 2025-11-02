export function initQuickContact() {
  const div = document.createElement("div");
  div.className = "quick-contact";
  div.innerHTML = `
    <a href="mailto:hamadineagmoctar@gmail.com?subject=Demande depuis le site&body=Bonjour Hamadine,"
       target="_blank" rel="noopener noreferrer">📧 E-mail</a>
    <a href="https://wa.me/22786762903?text=Bonjour%20HAM%20Global%20Words,"
       target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>
  `;
  document.body.appendChild(div);
}
