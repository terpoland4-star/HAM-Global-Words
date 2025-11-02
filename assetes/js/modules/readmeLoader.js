export async function loadReadme() {
  const section = document.querySelector(".cta");
  if (!section) return;

  try {
    const res = await fetch("assetes/docs/README.md");
    const md = await res.text();

    let markedLib;
    if (typeof marked !== "undefined") {
      markedLib = marked;
    } else {
      markedLib = await import("https://cdn.jsdelivr.net/npm/marked/marked.min.js");
    }

    const html = markedLib.parse(md);
    const wrapper = document.createElement("div");
    wrapper.className = "readme-preview";
    wrapper.innerHTML = html;
    section.appendChild(wrapper);
  } catch (err) {
    console.warn("⚠️ Erreur lors du chargement du README.md :", err);
    section.insertAdjacentHTML("beforeend", "<p>📄 Contenu non disponible pour le moment.</p>");
  }
}
