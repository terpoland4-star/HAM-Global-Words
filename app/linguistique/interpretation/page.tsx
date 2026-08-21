import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Interprétation de Conférence & Terrain | HAM Global Words",
  description:
    "Interprétation stratégique pour réunions, négociations et missions humanitaires. Expérience ONU, IOM, Takuba.",
};

export default function InterpretationPage() {
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
          🎙️ Interprétation de{" "}
          <em className="italic text-indigo">Conférence & Terrain</em>
        </h1>
        <p className="mt-5 max-w-2xl text-harmattan/70 text-base sm:text-lg">
          Présence en réunion, négociation ou mission humanitaire — pour que
          la barrière de langue ne coûte jamais une décision. Expérience de
          terrain avec des institutions internationales (ONU, IOM, Takuba).
        </p>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl space-y-10">
          <div>
            <h2 className="font-display text-xl text-indigo">Contextes</h2>
            <ul className="mt-4 space-y-3 text-harmattan/70">
              <li>• Missions humanitaires et institutionnelles</li>
              <li>• Négociations commerciales et diplomatiques</li>
              <li>• Conférences, ateliers et formations multilingues</li>
              <li>• Accompagnement de délégations sur le terrain</li>
            </ul>
          </div>
          <div>
            <h2 className="font-display text-xl text-indigo">Modes</h2>
            <p className="mt-4 text-harmattan/70">
              Interprétation consécutive ou simultanée, en présentiel ou à
              distance (voir aussi RSI/VRI), adaptée au format et au budget
              de votre mission.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-harmattan/10 text-center">
        <a
          href="/#contact"
          className="inline-block rounded-full bg-indigo px-6 py-3 text-sm font-medium text-harmattan transition-colors hover:bg-indigo/85"
        >
          Réserver un interprète
        </a>
      </section>
    </>
  );
}
