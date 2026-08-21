import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Développement Web & Applications | HAM Global Words",
  description:
    "Plateformes web complètes, du backend à la PWA, pensées pour des connexions et des usages ouest-africains.",
};

export default function WebdevPage() {
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
          💻 Développement Web{" "}
          <em className="italic text-acacia">& Applications</em>
        </h1>
        <p className="mt-5 max-w-2xl text-harmattan/70 text-base sm:text-lg">
          Plateformes complètes, du backend à la PWA, pensées pour des
          connexions et des usages ouest-africains. De l&apos;idée au
          déploiement en production, en autonomie complète.
        </p>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl space-y-10">
          <div>
            <h2 className="font-display text-xl text-acacia">
              Ce que je construis
            </h2>
            <ul className="mt-4 space-y-3 text-harmattan/70">
              <li>• Sites vitrines et plateformes e-commerce</li>
              <li>• Dashboards admin et back-offices sur mesure</li>
              <li>• APIs REST avec authentification sécurisée</li>
              <li>• Applications web progressives (PWA)</li>
            </ul>
          </div>
          <div>
            <h2 className="font-display text-xl text-acacia">
              Exemple concret
            </h2>
            <p className="mt-4 text-harmattan/70">
              <Link href="/realisations" className="text-acacia underline">
                Niger Laptops
              </Link>{" "}
              : plateforme e-commerce en production, du frontend React au
              dashboard admin, en passant par la gestion de commandes et les
              reçus PDF automatisés.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-harmattan/10 text-center">
        <a
          href="/#contact"
          className="inline-block rounded-full bg-acacia px-6 py-3 text-sm font-medium text-harmattan transition-colors hover:bg-acacia/85"
        >
          Discuter d&apos;un projet web
        </a>
      </section>
    </>
  );
}
