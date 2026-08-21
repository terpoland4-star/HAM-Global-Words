import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Formation & Accompagnement | HAM Global Words",
  description:
    "Montée en compétence technique pour équipes et institutions, construite sur des cas réels du secteur.",
};

export default function FormationPage() {
  return (
    <>
      <section className="px-6 pt-16 pb-14 border-b border-harmattan/10">
        <Link
          href="/tech"
          className="font-mono text-xs uppercase tracking-wide text-acacia/70 hover:text-acacia"
        >
          ← Univers Tech
        </Link>
        <h1 className="mt-6 font-display text-4xl sm:text-5xl leading-[1.1]">
          🎓 Formation{" "}
          <em className="italic text-acacia">& Accompagnement</em>
        </h1>
        <p className="mt-5 max-w-2xl text-harmattan/70 text-base sm:text-lg">
          Montée en compétence technique pour équipes et institutions,
          construite sur des cas réels du secteur — pas des exercices
          génériques copiés d&apos;un manuel.
        </p>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl space-y-10">
          <div>
            <h2 className="font-display text-xl text-acacia">Formats</h2>
            <ul className="mt-4 space-y-3 text-harmattan/70">
              <li>• Ateliers pratiques en petit groupe</li>
              <li>• Accompagnement individuel sur un projet réel</li>
              <li>• Introduction au développement web pour débutants</li>
              <li>• Formation continue pour équipes techniques</li>
            </ul>
          </div>
          <div>
            <h2 className="font-display text-xl text-acacia">
              Pour débuter
            </h2>
            <p className="mt-4 text-harmattan/70">
              Le{" "}
              <Link
                href="/tech/cours-html-starter"
                className="text-acacia underline"
              >
                Programme Starter Tech
              </Link>{" "}
              est le point d&apos;entrée idéal pour créer ses premières
              pages web, du zéro au déploiement.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-harmattan/10 text-center">
        <a
          href="/#contact"
          className="inline-block rounded-full bg-acacia px-6 py-3 text-sm font-medium text-harmattan transition-colors hover:bg-acacia/85"
        >
          Organiser une formation
        </a>
      </section>
    </>
  );
}
