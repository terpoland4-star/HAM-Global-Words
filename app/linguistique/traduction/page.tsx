import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Traduction Professionnelle | HAM Global Words",
  description:
    "Traduction professionnelle de documents juridiques, techniques, institutionnels et commerciaux : français, anglais, arabe et langues du Sahel.",
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
          🌐 Traduction{" "}
          <em className="italic text-indigo">Professionnelle</em>
        </h1>
        <p className="mt-5 max-w-2xl text-harmattan/70 text-base sm:text-lg">
          Vos documents juridiques, techniques, institutionnels et
          commerciaux traduits avec la précision terminologique que
          requiert chaque contexte — entre le français, l&apos;anglais,
          l&apos;arabe, le haoussa et les langues du Sahel.
        </p>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl space-y-10">
          <div>
            <h2 className="font-display text-xl text-indigo">
              Ce que je traduis
            </h2>
            <ul className="mt-4 space-y-3 text-harmattan/70">
              <li>• Contrats, statuts d&apos;entreprise et documents juridiques</li>
              <li>• Rapports techniques et manuels d&apos;utilisation</li>
              <li>
                • Correspondance commerciale et documents institutionnels
              </li>
              <li>• Rapports de mission, comptes rendus et notes d&apos;entretien</li>
            </ul>
          </div>
          <div>
            <h2 className="font-display text-xl text-indigo">
              Méthode & garanties
            </h2>
            <p className="mt-4 text-harmattan/70">
              Chaque traduction passe par une relecture terminologique
              dédiée. Les délais sont convenus à l&apos;avance et respectés.
              Les documents confiés et les données personnelles qu&apos;ils
              contiennent sont traités avec probité, dans le respect des
              lois sur la protection des données et la confidentialité.
            </p>
            <p className="mt-4 text-sm text-harmattan/50">
              Traducteur professionnel, non assermenté : pour une démarche
              exigeant une traduction certifiée par un traducteur juré,
              merci de le préciser dans votre demande.
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
