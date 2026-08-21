import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Linguistique — Traduction & Interprétation | HAM Global Words",
  description:
    "Traduction assermentée, interprétation stratégique et annotation IA multilingue. 15+ langues, expertise terrain ONU/IOM/Takuba.",
};

const services = [
  {
    slug: "traduction",
    name: "Traduction Professionnelle & Assermentée",
    desc: "Documents juridiques, techniques et commerciaux, du français vers l'anglais et le haoussa, sans perte de nuance ni de valeur légale.",
    icon: "🌐",
  },
  {
    slug: "interpretation",
    name: "Interprétation de Conférence & Terrain",
    desc: "Présence en réunion, négociation ou mission humanitaire — pour que la barrière de langue ne coûte jamais une décision.",
    icon: "🎙️",
  },
  {
    slug: "annotation",
    name: "Annotation de Données pour l'IA",
    desc: "Jeux de données annotés pour l'entraînement de modèles NLP, avec un œil linguistique que peu d'annotateurs possèdent.",
    icon: "🧠",
  },
  {
    slug: "remote",
    name: "Interprétation à Distance (RSI/VRI)",
    desc: "Interprétation simultanée ou consécutive à distance, pour vos appels, visioconférences et missions à budget maîtrisé.",
    icon: "📡",
  },
];

const languages = [
  "Français",
  "Anglais",
  "Arabe",
  "Haoussa",
  "Tamasheq",
  "Songhaï",
  "Tadaksahak",
  "Fulfulde",
  "Zarma",
];

export default function LinguistiquePage() {
  return (
    <>
      <section className="relative px-6 pt-16 pb-14 overflow-hidden border-b border-harmattan/10">
        <Image
          src="/logo-mark.png"
          alt=""
          aria-hidden="true"
          width={1000}
          height={1000}
          className="pointer-events-none select-none absolute right-0 top-0 w-[70vw] max-w-none opacity-[0.04] -translate-y-1/4 translate-x-1/4"
        />
        <div className="relative z-10 max-w-3xl">
          <span className="animate-fade-up font-mono text-xs tracking-[0.2em] uppercase text-indigo">
            Univers Linguistique
          </span>
          <h1
            className="animate-fade-up mt-4 font-display text-4xl sm:text-5xl leading-[1.1]"
            style={{ animationDelay: "0.1s" }}
          >
            Ingénierie linguistique{" "}
            <em className="italic text-indigo">d&apos;excellence</em>
          </h1>
          <p
            className="animate-fade-up mt-5 max-w-xl text-harmattan/70 text-base sm:text-lg"
            style={{ animationDelay: "0.2s" }}
          >
            Une expérience de terrain avec des institutions internationales
            (ONU, IOM, Takuba), combinée à une expertise pointue en
            technologies linguistiques et intelligence artificielle.
          </p>
          <a
            href="/#contact"
            className="animate-fade-up mt-8 inline-block rounded-full bg-indigo px-6 py-3 text-sm font-medium text-harmattan transition-colors hover:bg-indigo/85"
            style={{ animationDelay: "0.3s" }}
          >
            Demander un devis
          </a>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-2xl text-indigo mb-10">
            Nos services
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/linguistique/${s.slug}`}
                className="rounded-2xl border border-harmattan/10 bg-surface p-6 transition-colors hover:border-indigo/40 block"
              >
                <span className="text-2xl">{s.icon}</span>
                <h3 className="mt-3 font-medium text-harmattan">{s.name}</h3>
                <p className="mt-2 text-sm text-harmattan/60">{s.desc}</p>
                <span className="mt-4 inline-block text-xs font-mono uppercase tracking-wide text-indigo">
                  En savoir plus →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-harmattan/10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl text-indigo">
            15+ langues maîtrisées
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {languages.map((lang) => (
              <span
                key={lang}
                className="rounded-full border border-indigo/30 px-4 py-1.5 text-sm text-harmattan/80 font-mono"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-harmattan/10 text-center">
        <p className="mx-auto max-w-lg font-display italic text-xl sm:text-2xl text-harmattan/85">
          &laquo; Connecting voices across cultures. &raquo;
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
