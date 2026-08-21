import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Réalisations — HAM Global Words",
  description:
    "Projets achevés et en cours : Niger Laptops (plateforme e-commerce) et Tadaksahak Learning (dictionnaire et culture Idaksahak).",
};

const projects = [
  {
    name: "Niger Laptops",
    status: "En production",
    universe: "tech" as const,
    year: "2025 — présent",
    desc: "Plateforme e-commerce complète de vente de matériel informatique à Niamey. Frontend React 19 sur GitHub Pages, backend Express/SQLite sur VPS OVH, dashboard admin avec gestion de commandes, paiement et reçus PDF automatisés.",
    tags: ["React", "Node.js", "SQLite", "Drizzle ORM", "PM2", "Nginx"],
    link: "https://www.niger-laptops.com",
    linkLabel: "Voir le site",
  },
  {
    name: "Tadaksahak Learning",
    status: "En expansion",
    universe: "linguistique" as const,
    year: "2024 — présent",
    desc: "Plateforme multilingue dédiée à la langue et à la culture du peuple Idaksahak : dictionnaire, grammaire, contes, quiz, flashcards, ressources académiques et audio. Un projet de mémoire vivante autant que d'ingénierie linguistique.",
    tags: ["Dictionnaire", "Multilingue", "Accessibilité", "PWA"],
    link: "https://terpoland4-star.github.io/Dictionnaire-Tadaksahak/index.html",
    linkLabel: "Voir la plateforme",
  },
];

export default function RealisationsPage() {
  return (
    <>
      <section className="px-6 pt-16 pb-14 border-b border-harmattan/10">
        <div className="max-w-3xl">
          <span className="animate-fade-up font-mono text-xs tracking-[0.2em] uppercase text-amber">
            Portfolio
          </span>
          <h1
            className="animate-fade-up mt-4 font-display text-4xl sm:text-5xl leading-[1.1]"
            style={{ animationDelay: "0.1s" }}
          >
            Réalisations, <em className="italic text-amber">achevées</em> et
            en cours
          </h1>
          <p
            className="animate-fade-up mt-5 max-w-xl text-harmattan/70 text-base sm:text-lg"
            style={{ animationDelay: "0.2s" }}
          >
            Des projets construits et maintenus en autonomie, du cahier des
            charges au déploiement en production.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl space-y-8">
          {projects.map((p) => {
            const accent = p.universe === "tech" ? "acacia" : "indigo";
            return (
              <div
                key={p.name}
                className={`rounded-2xl border border-harmattan/10 bg-surface p-8 transition-colors hover:border-${accent}/40`}
              >
                <div className="flex flex-wrap items-center gap-3 justify-between">
                  <h2 className="font-display text-2xl">{p.name}</h2>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-mono uppercase tracking-wide ${
                      p.universe === "tech"
                        ? "border-acacia/40 text-acacia"
                        : "border-indigo/40 text-indigo"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
                <p className="mt-1 text-xs font-mono text-harmattan/50">
                  {p.year}
                </p>
                <p className="mt-4 text-harmattan/70">{p.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-ink px-3 py-1 text-xs font-mono text-harmattan/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 inline-block rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                    p.universe === "tech"
                      ? "bg-acacia text-harmattan hover:bg-acacia/85"
                      : "bg-indigo text-harmattan hover:bg-indigo/85"
                  }`}
                >
                  {p.linkLabel} ↗
                </a>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-6 py-16 border-t border-harmattan/10 text-center">
        <p className="mx-auto max-w-lg font-display italic text-xl sm:text-2xl text-harmattan/85">
          &laquo; Chaque projet est un pont — entre une langue et une autre,
          entre une idée et son code. &raquo;
        </p>
        <a
          href="/#contact"
          className="mt-8 inline-block rounded-full bg-amber px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-amber/85"
        >
          Démarrer une collaboration
        </a>
      </section>
    </>
  );
}
