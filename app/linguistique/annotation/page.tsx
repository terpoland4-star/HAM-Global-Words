import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Annotation de Données pour l'IA | HAM Global Words",
  description:
    "Annotation et entraînement IA multilingue pour les langues africaines. Jeux de données NLP de qualité, expertise linguistique terrain.",
};

export default function AnnotationPage() {
  return (
    <>
      <section className="px-6 pt-16 pb-14 border-b border-harmattan/10">
        <Link
          href="/linguistique"
          className="font-mono text-xs uppercase tracking-wide text-indigo/70 hover:text-indigo"
        >
          ← Univers Linguistique
        </Link>
        <h1 className="mt-6 font-display text-4xl sm:text-5xl leading-[1.1]">
          🧠 Annotation de Données{" "}
          <em className="italic text-indigo">pour l&apos;IA</em>
        </h1>
        <p className="mt-5 max-w-2xl text-harmattan/70 text-base sm:text-lg">
          Jeux de données annotés pour l&apos;entraînement de modèles NLP,
          avec un œil linguistique que peu d&apos;annotateurs possèdent —
          particulièrement pour les langues africaines sous-représentées.
        </p>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl space-y-10">
          <div>
            <h2 className="font-display text-xl text-indigo">
              Prestations
            </h2>
            <ul className="mt-4 space-y-3 text-harmattan/70">
              <li>• Annotation de corpus multilingues (NER, POS, sentiment)</li>
              <li>• Transcription et alignement audio/texte</li>
              <li>• Constitution de ressources pour langues rares (Tadaksahak)</li>
              <li>• Validation qualité de jeux de données existants</li>
            </ul>
          </div>
          <div>
            <h2 className="font-display text-xl text-indigo">
              Pourquoi ça compte
            </h2>
            <p className="mt-4 text-harmattan/70">
              La qualité d&apos;un modèle dépend de la qualité de ses
              données. Pour les langues africaines, un annotateur qui
              comprend à la fois la langue, la culture et les enjeux
              techniques du NLP fait toute la différence.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-harmattan/10 text-center">
        <a
          href="/#contact"
          className="inline-block rounded-full bg-indigo px-6 py-3 text-sm font-medium text-harmattan transition-colors hover:bg-indigo/85"
        >
          Discuter d&apos;un projet d&apos;annotation
        </a>
      </section>
    </>
  );
}
