import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Interprétation à Distance (RSI/VRI) | HAM Global Words",
  description:
    "Interprétation simultanée ou consécutive à distance pour vos appels et visioconférences, à budget maîtrisé.",
};

export default function RemotePage() {
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
          📡 Interprétation à{" "}
          <em className="italic text-indigo">Distance</em> (RSI/VRI)
        </h1>
        <p className="mt-5 max-w-2xl text-harmattan/70 text-base sm:text-lg">
          Interprétation simultanée (RSI) ou par vidéo (VRI) pour vos
          appels, visioconférences et réunions à distance — sans les
          contraintes logistiques d&apos;un déplacement.
        </p>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl space-y-10">
          <div>
            <h2 className="font-display text-xl text-indigo">
              Cas d&apos;usage
            </h2>
            <ul className="mt-4 space-y-3 text-harmattan/70">
              <li>• Appels d&apos;affaires et négociations à distance</li>
              <li>• Webinaires et formations en ligne multilingues</li>
              <li>• Entretiens et consultations à distance</li>
              <li>• Réunions institutionnelles hybrides</li>
            </ul>
          </div>
          <div>
            <h2 className="font-display text-xl text-indigo">Avantages</h2>
            <p className="mt-4 text-harmattan/70">
              Un budget maîtrisé, une mise en place rapide (visioconférence
              standard, pas d&apos;équipement spécifique requis), et la même
              exigence de précision que pour l&apos;interprétation en
              présentiel.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-harmattan/10 text-center">
        <a
          href="/#contact"
          className="inline-block rounded-full bg-indigo px-6 py-3 text-sm font-medium text-harmattan transition-colors hover:bg-indigo/85"
        >
          Planifier une session à distance
        </a>
      </section>
    </>
  );
}
