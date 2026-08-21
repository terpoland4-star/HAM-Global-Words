import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "À propos — Hamadine AG Moctar | HAM Global Words",
  description:
    "Spécialiste linguistique et interprète multilingue, expérience UNHCR/IOM/Task Force TAKUBA, développeur de la plateforme Tadaksahak.",
};

const experience = [
  {
    period: "2025 — présent",
    org: "RWS",
    role: "Prestataire linguistique freelance",
    desc: "Annotation linguistique détaillée, étiquetage de données et assurance qualité pour projets IA. Validation linguistique anglais-arabe sous accords de confidentialité (NDA). Outils : Trados, SmartCAT, Workzone, SharePoint.",
  },
  {
    period: "2019 — 2024",
    org: "UNHCR / IOM / Task Force TAKUBA",
    role: "Interprète multilingue",
    desc: "Interprétation simultanée et consécutive en opérations humanitaires et de terrain. Protection des réfugiés, médiation médicale et missions à enjeux sensibles. Lettre de recommandation officielle de Task Force TAKUBA pour excellence en interprétation.",
  },
];

const languages = [
  { name: "Français", level: "Langue maternelle" },
  { name: "Tadaksahak", level: "Langue maternelle" },
  { name: "Anglais", level: "C1" },
  { name: "Arabe (MSA)", level: "C1" },
  { name: "Tamajaq", level: "" },
  { name: "Haoussa", level: "" },
  { name: "Zarma", level: "" },
  { name: "Songhaï", level: "" },
  { name: "Yoruba", level: "" },
  { name: "Fon", level: "" },
  { name: "Éwé", level: "" },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative px-6 pt-16 pb-14 overflow-hidden border-b border-harmattan/10">
        <Image
          src="/logo-mark.png"
          alt=""
          aria-hidden="true"
          width={900}
          height={900}
          className="pointer-events-none select-none absolute right-0 top-0 w-[60vw] max-w-none opacity-[0.04] -translate-y-1/4 translate-x-1/4"
        />
        <div className="relative z-10 max-w-3xl">
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-amber">
            À propos
          </span>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl leading-[1.1]">
            Hamadine AG Moctar
          </h1>
          <p className="mt-5 max-w-xl text-harmattan/70 text-base sm:text-lg">
            Spécialiste linguistique et interprète multilingue, spécialisé
            en traduction, annotation de données pour l&apos;IA et
            assurance qualité. Expérience de terrain auprès d&apos;opérations
            humanitaires à fort impact avec UNHCR et Task Force TAKUBA,
            validation confidentielle anglais-arabe reconnue officiellement
            pour son excellence en interprétation.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl text-amber mb-10">
            Parcours professionnel
          </h2>
          <div className="space-y-10">
            {experience.map((e) => (
              <div
                key={e.org}
                className="border-l-2 border-amber/30 pl-6"
              >
                <p className="font-mono text-xs uppercase tracking-wide text-amber/70">
                  {e.period}
                </p>
                <h3 className="mt-2 font-display text-xl">{e.org}</h3>
                <p className="mt-1 text-sm text-harmattan/60 italic">
                  {e.role}
                </p>
                <p className="mt-3 text-harmattan/70">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-harmattan/10">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl text-amber mb-6">
            Projets techniques
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href="/realisations"
              className="rounded-2xl border border-harmattan/10 bg-surface p-6 transition-colors hover:border-indigo/40"
            >
              <p className="font-medium text-indigo">
                📘 Dictionnaire Multilingue Tadaksahak
              </p>
              <p className="mt-2 text-sm text-harmattan/60">
                Développement d&apos;une PWA à accès hors-ligne pour la
                préservation et l&apos;apprentissage de la langue
                Tadaksahak.
              </p>
            </a>
            <a
              href="/realisations"
              className="rounded-2xl border border-harmattan/10 bg-surface p-6 transition-colors hover:border-acacia/40"
            >
              <p className="font-medium text-acacia">
                💻 Niger Laptops
              </p>
              <p className="mt-2 text-sm text-harmattan/60">
                Plateforme e-commerce complète en production, du frontend
                au backend, hébergement et maintenance inclus.
              </p>
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-harmattan/10">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl text-amber mb-6">
            Langues
          </h2>
          <div className="flex flex-wrap gap-3">
            {languages.map((l) => (
              <span
                key={l.name}
                className="rounded-full border border-amber/30 px-4 py-1.5 text-sm text-harmattan/80 font-mono"
              >
                {l.name}
                {l.level && (
                  <span className="text-harmattan/50"> — {l.level}</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-harmattan/10 text-center">
        <a
          href="/#contact"
          className="inline-block rounded-full bg-amber px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-amber/85"
        >
          Démarrer une collaboration
        </a>
      </section>
    </>
  );
}
