"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch, setToken, setUser } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    if (password.length < 8) {
      setError("Le mot de passe doit faire au moins 8 caractères.");
      return;
    }

    setLoading(true);

    try {
      const response = await apiFetch("/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erreur lors de la création du compte.");
        setLoading(false);
        return;
      }

      setToken(data.token);
      setUser(data.user);
      router.push("/dashboard");
    } catch {
      setError("Impossible de contacter le serveur. Réessayez.");
      setLoading(false);
    }
  }

  return (
    <section className="flex min-h-[80vh] items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-harmattan/10 bg-surface p-8">
        <h1 className="font-display text-2xl">✨ Créer un compte</h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Votre nom complet"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-harmattan/20 bg-ink px-4 py-2.5 text-harmattan placeholder:text-harmattan/40 focus:border-indigo focus:outline-none"
          />
          <input
            type="email"
            placeholder="Votre email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-harmattan/20 bg-ink px-4 py-2.5 text-harmattan placeholder:text-harmattan/40 focus:border-indigo focus:outline-none"
          />
          <input
            type="password"
            placeholder="Mot de passe (8 caractères min.)"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-harmattan/20 bg-ink px-4 py-2.5 text-harmattan placeholder:text-harmattan/40 focus:border-indigo focus:outline-none"
          />
          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-lg border border-harmattan/20 bg-ink px-4 py-2.5 text-harmattan placeholder:text-harmattan/40 focus:border-indigo focus:outline-none"
          />

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-indigo px-6 py-2.5 text-sm font-medium text-harmattan transition-colors hover:bg-indigo/85 disabled:opacity-50"
          >
            {loading ? "Création..." : "Créer mon compte"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-harmattan/60">
          <p>
            Déjà un compte ?{" "}
            <Link href="/login" className="text-indigo underline">
              Se connecter
            </Link>
          </p>
          <Link href="/" className="mt-3 inline-block text-harmattan/50">
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </section>
  );
}
