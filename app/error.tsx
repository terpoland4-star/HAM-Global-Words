"use client"; // Les error boundaries doivent etre des Client Components

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="font-display text-3xl">Une erreur est survenue</h1>
      <p className="mt-4 max-w-md text-harmattan/60">
        Un problème inattendu a empêché l&apos;affichage de cette page.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={() => retry()}
          className="rounded-full bg-amber px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-amber/85"
        >
          Réessayer
        </button>
        <Link
          href="/"
          className="rounded-full border border-harmattan/20 px-6 py-3 text-sm text-harmattan/80"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </section>
  );
}
