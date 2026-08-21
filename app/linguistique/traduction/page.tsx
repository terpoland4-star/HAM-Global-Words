import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Traduction Professionnelle & Assermentée | HAM Global Words",
  description:
    "Traduction de documents juridiques, techniques et commerciaux, français-anglais-haoussa et langues du Sahel, avec valeur légale.",
};

export default function TraductionPage() {
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
          🌐 Traduction Professionnelle{" "}
          <em className="italic text-indigo">& Assermentée</em>
        </h1>
        <p className="mt-5 max-w-2xl text-harmattan/70 text-base sm:text-lg">
          Vos documents juridiques, techniques et commerciaux traduits avec
          la précision terminologique et la valeur légale que requiert
          chaque contexte — du français vers l&apos;anglais, l&apos;arabe,
          le haoussa et les langues du Sahel.
        </p>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl space-y-10">
          <div>
            <h2 className="font-display text-xl text-indigo">
              Ce que je traduis
            </h2>
            <ul className="mt-4 space-y-3 text-harmattan/70">
              <li>• Contrats, actes notariés, statuts d&apos;entreprise</li>
              <li>• Rapports techniques et manuels d&apos;utilisation</li>
              <li>
                • Correspondance commerciale et documents institutionnels
              </li>
              <li>• Certificats, diplômes et documents d&apos;état civil</li>
            </ul>
          </div>
          <div>
            <h2 className="font-display text-xl text-indigo">
              Méthode & garanties
            </h2>
            <p className="mt-4 text-harmattan/70">
              Chaque traduction passe par une relecture terminologique
              dédiée. Pour les documents à valeur légale, une attestation de
              conformité est fournie sur demande. Les délais sont convenus
              à l&apos;avance et respectés.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-harmattan/10 text-center">
        <a
          href="/#contact"
          className="inline-block rounded-full bg-indigo px-6 py-3 text-sm font-medium text-harmattan transition-colors hover:bg-indigo/85"
        >
          Demander un devis de traduction
        </a>
      </section>
    </>
  );
}
