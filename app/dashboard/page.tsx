"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, clearAuth, getToken, setUser, type User } from "@/lib/api";

type Quote = {
  id: number;
  service: string;
  universe: string;
  status: string;
  createdAt: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setLocalUser] = useState<User | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }

    (async () => {
      try {
        const meRes = await apiFetch("/me");
        if (!meRes.ok) {
          clearAuth();
          router.push("/login");
          return;
        }
        const meData = await meRes.json();
        setUser(meData.user);
        setLocalUser(meData.user);

        const quotesRes = await apiFetch("/quotes/mine");
        if (quotesRes.ok) {
          const quotesData = await quotesRes.json();
          setQuotes(quotesData.quotes || []);
        }
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  function handleLogout() {
    clearAuth();
    router.push("/");
  }

  const statusLabels: Record<string, string> = {
    pending: "⏳ En attente",
    contacted: "📞 Contacté",
    sent: "✅ Envoyé",
    closed: "🔒 Clôturé",
  };

  if (loading) {
    return (
      <section className="px-6 py-24 text-center text-harmattan/60">
        Chargement…
      </section>
    );
  }

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl">
              👋 Bonjour, {user?.name}
            </h1>
            <p className="mt-1 text-sm text-harmattan/60">
              Voici vos demandes envoyées à HAM Global Words.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-full border border-red-400/40 px-5 py-2 text-sm text-red-400 transition-colors hover:bg-red-400/10"
          >
            🚪 Déconnexion
          </button>
        </div>

        <div className="mt-10 space-y-4">
          {quotes.length === 0 ? (
            <div className="rounded-2xl border border-harmattan/10 bg-surface p-8 text-center text-harmattan/60">
              Aucune demande envoyée pour le moment.
            </div>
          ) : (
            quotes.map((q) => (
              <div
                key={q.id}
                className="rounded-2xl border border-harmattan/10 bg-surface p-5 flex items-center justify-between flex-wrap gap-3"
              >
                <div>
                  <p className="font-medium">
                    {q.universe === "linguistique" ? "🌍" : "💻"} {q.service}
                  </p>
                  <p className="text-xs text-harmattan/50 font-mono mt-1">
                    {new Date(q.createdAt).toLocaleDateString("fr-FR")}
                  </p>
                </div>
                <span className="rounded-full bg-ink px-3 py-1 text-xs font-mono text-harmattan/70">
                  {statusLabels[q.status] || q.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
