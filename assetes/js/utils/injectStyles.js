export function injectStyles() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "/assets/css/dynamic.css";
  document.head.appendChild(link);
}
