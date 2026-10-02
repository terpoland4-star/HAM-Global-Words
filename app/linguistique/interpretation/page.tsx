import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Interprétation Diplomatique & Terrain | HAM Global Words",
  description:
    "Interprétation pour séances diplomatiques, entretiens sensibles et missions de terrain. Expérience Opération Barkhane, Task Force Takuba, HCR, OIM et OCE.",
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
          🎙️ Interprétation{" "}
          <em className="italic text-indigo">Diplomatique & Terrain</em>
        </h1>
        <p className="mt-5 max-w-2xl text-harmattan/70 text-base sm:text-lg">
          Séances diplomatiques, entretiens sensibles, missions humanitaires
          et sécuritaires — pour que la barrière de langue ne coûte jamais
          une décision. Des années d&apos;expérience de terrain auprès de
          l&apos;Opération Barkhane, de la Task Force Takuba, du HCR, de
          l&apos;OIM et de l&apos;OCE.
        </p>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl space-y-10">
          <div>
            <h2 className="font-display text-xl text-indigo">Contextes</h2>
            <ul className="mt-4 space-y-3 text-harmattan/70">
              <li>• Séances et réunions diplomatiques</li>
              <li>
                • Appui linguistique en environnement militaire et
                sécuritaire (Opération Barkhane, Task Force Takuba), y
                compris des entretiens de contre-ingérence
              </li>
              <li>
                • Entretiens avec les réfugiés pour le HCR, l&apos;OIM et
                ses partenaires de l&apos;OCE (Orientation Canadienne à
                l&apos;Étranger)
              </li>
              <li>• Missions humanitaires et institutionnelles</li>
              <li>• Conférences, ateliers et accompagnement de délégations</li>
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
          <div>
            <h2 className="font-display text-xl text-indigo">
              Confidentialité & probité
            </h2>
            <p className="mt-4 text-harmattan/70">
              Les données personnelles et les informations reçues pendant
              une mission sont traitées avec probité et dans le strict
              respect des lois applicables en matière de protection des
              données et de confidentialité.
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
