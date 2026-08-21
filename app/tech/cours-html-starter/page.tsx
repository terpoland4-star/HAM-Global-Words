import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cours HTML — Programme Starter Tech | HAM Global Words",
  description:
    "Cours complet pour débutants souhaitant créer leurs propres solutions numériques, du zéro au déploiement.",
};

export default function CoursHtmlStarterPage() {
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
          📘 Cours HTML{" "}
          <em className="italic text-acacia">Programme Starter Tech</em>
        </h1>
        <p className="mt-5 max-w-2xl text-harmattan/70 text-base sm:text-lg">
          Un cours complet pour créer ses propres solutions numériques,
          pensé pour les débutants n&apos;ayant jamais écrit une ligne de
          code — du zéro au déploiement d&apos;une vraie page en ligne.
        </p>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl space-y-10">
          <div>
            <h2 className="font-display text-xl text-acacia">
              Au programme
            </h2>
            <ul className="mt-4 space-y-3 text-harmattan/70">
              <li>• Structure HTML et sémantique de base</li>
              <li>• Mise en forme avec CSS</li>
              <li>• Publier sa première page en ligne</li>
              <li>• Bonnes pratiques pour la suite (JavaScript, frameworks)</li>
            </ul>
          </div>
          <div>
            <h2 className="font-display text-xl text-acacia">
              Pour qui ?
            </h2>
            <p className="mt-4 text-harmattan/70">
              Étudiants, reconversions professionnelles, ou toute personne
              curieuse de comprendre comment un site web fonctionne
              vraiment, avant d&apos;aller plus loin.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-harmattan/10 text-center">
        <a
          href="/#contact"
          className="inline-block rounded-full bg-acacia px-6 py-3 text-sm font-medium text-harmattan transition-colors hover:bg-acacia/85"
        >
          S&apos;inscrire au programme
        </a>
      </section>
    </>
  );
}
