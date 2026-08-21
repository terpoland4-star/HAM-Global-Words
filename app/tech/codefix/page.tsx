import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Audit & Optimisation de Code | HAM Global Words",
  description:
    "Revue de code, correction de bugs critiques et optimisation de performance sur des projets existants.",
};

export default function CodefixPage() {
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
          🧩 Audit & <em className="italic text-acacia">Optimisation</em> de
          Code
        </h1>
        <p className="mt-5 max-w-2xl text-harmattan/70 text-base sm:text-lg">
          Revue de code, correction de bugs critiques et optimisation de
          performance sur des projets existants — pour un code qui tient la
          route en production, pas seulement en démo.
        </p>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl space-y-10">
          <div>
            <h2 className="font-display text-xl text-acacia">
              Interventions
            </h2>
            <ul className="mt-4 space-y-3 text-harmattan/70">
              <li>• Audit de sécurité (clés exposées, failles d&apos;auth)</li>
              <li>• Optimisation de bundle et temps de chargement</li>
              <li>• Correction de bugs bloquants en production</li>
              <li>• Mise à niveau de dépendances et migration de stack</li>
            </ul>
          </div>
          <div>
            <h2 className="font-display text-xl text-acacia">Approche</h2>
            <p className="mt-4 text-harmattan/70">
              Diagnostic d&apos;abord, correction ensuite — chaque
              intervention est documentée pour que vous compreniez ce qui a
              changé et pourquoi, pas seulement livré un code qui
              &laquo; marche maintenant &raquo;.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-harmattan/10 text-center">
        <a
          href="/#contact"
          className="inline-block rounded-full bg-acacia px-6 py-3 text-sm font-medium text-harmattan transition-colors hover:bg-acacia/85"
        >
          Demander un audit de code
        </a>
      </section>
    </>
  );
}
