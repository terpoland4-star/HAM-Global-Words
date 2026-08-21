"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch, setToken, setUser } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await apiFetch("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Email ou mot de passe incorrect.");
        setLoading(false);
        return;
      }

      setToken(data.token);
      setUser(data.user);
      router.push(data.user.role === "admin" ? "/admin" : "/dashboard");
    } catch {
      setError("Impossible de contacter le serveur. Réessayez.");
      setLoading(false);
    }
  }

  return (
    <section className="flex min-h-[80vh] items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-harmattan/10 bg-surface p-8">
        <h1 className="font-display text-2xl">🔐 Connexion</h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
            placeholder="Mot de passe"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-harmattan/20 bg-ink px-4 py-2.5 text-harmattan placeholder:text-harmattan/40 focus:border-indigo focus:outline-none"
          />

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-indigo px-6 py-2.5 text-sm font-medium text-harmattan transition-colors hover:bg-indigo/85 disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-harmattan/60">
          <p>
            Pas encore de compte ?{" "}
            <Link href="/register" className="text-indigo underline">
              Créer un compte
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
