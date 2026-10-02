import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-mono text-xs tracking-[0.2em] uppercase text-amber">
        Erreur 404
      </p>
      <h1 className="mt-4 font-display text-4xl">Page introuvable</h1>
      <p className="mt-4 max-w-md text-harmattan/60">
        La page que vous cherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-amber px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-amber/85"
      >
        Retour à l&apos;accueil
      </Link>
    </section>
  );
}
