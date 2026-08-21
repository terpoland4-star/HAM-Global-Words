"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, clearAuth, getToken, type User } from "@/lib/api";

type Quote = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  universe: string;
  service: string;
  message?: string;
  status: string;
};

type Project = {
  id: number;
  title: string;
  universe: string;
  description?: string;
  amount?: number;
  status: string;
};

type Client = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
};

const QUOTE_STATUSES = [
  { value: "pending", label: "⏳ En attente" },
  { value: "contacted", label: "📞 Contacté" },
  { value: "sent", label: "✅ Envoyé" },
  { value: "closed", label: "🔒 Clôturé" },
];

const PROJECT_STATUSES = [
  { value: "pending", label: "⏳ En attente" },
  { value: "in_progress", label: "🚧 En cours" },
  { value: "completed", label: "✅ Terminé" },
  { value: "cancelled", label: "❌ Annulé" },
];

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [tab, setTab] = useState<"quotes" | "projects" | "clients">(
    "quotes"
  );
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [forbidden, setForbidden] = useState(false);

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
        if (meData.user.role !== "admin") {
          setForbidden(true);
          setLoading(false);
          return;
        }
        setUser(meData.user);

        const [quotesRes, projectsRes, clientsRes] = await Promise.all([
          apiFetch("/admin/quotes"),
          apiFetch("/admin/projects"),
          apiFetch("/admin/clients"),
        ]);
        if (quotesRes.ok) setQuotes((await quotesRes.json()).quotes || []);
        if (projectsRes.ok)
          setProjects((await projectsRes.json()).projects || []);
        if (clientsRes.ok) setClients((await clientsRes.json()).clients || []);
      } catch {
        // silencieux, l'UI affichera les etats vides
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  function handleLogout() {
    clearAuth();
    router.push("/");
  }

  async function updateQuoteStatus(id: number, status: string) {
    const res = await apiFetch(`/admin/quotes/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)));
    }
  }

  async function updateProjectStatus(id: number, status: string) {
    const res = await apiFetch(`/admin/projects/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status } : p))
      );
    }
  }

  if (loading) {
    return (
      <section className="px-6 py-24 text-center text-harmattan/60">
        Chargement…
      </section>
    );
  }

  if (forbidden) {
    return (
      <section className="px-6 py-24 text-center">
        <p className="text-harmattan/70">
          ⛔ Accès réservé aux administrateurs.
        </p>
      </section>
    );
  }

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl">🛠 Panel Admin</h1>
            <p className="mt-1 text-sm text-harmattan/60">
              Connecté en tant que {user?.name}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-full border border-red-400/40 px-5 py-2 text-sm text-red-400 transition-colors hover:bg-red-400/10"
          >
            🚪 Déconnexion
          </button>
        </div>

        <div className="mt-8 flex gap-2 flex-wrap">
          {(
            [
              { key: "quotes", label: "📩 Demandes de devis" },
              { key: "projects", label: "📂 Projets" },
              { key: "clients", label: "👤 Clients" },
            ] as const
          ).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`rounded-full px-4 py-2 text-sm font-mono transition-colors ${
                tab === t.key
                  ? "bg-amber text-ink"
                  : "bg-surface text-harmattan/70 hover:bg-surface/70"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "quotes" && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {quotes.length === 0 ? (
              <p className="text-harmattan/60">Aucune demande pour le moment.</p>
            ) : (
              quotes.map((q) => (
                <div
                  key={q.id}
                  className="rounded-2xl border border-harmattan/10 bg-surface p-5"
                >
                  <h3 className="font-medium">
                    {q.universe === "linguistique" ? "🌍" : "💻"} {q.service}
                  </h3>
                  <p className="mt-2 text-sm text-harmattan/70">
                    {q.name} — {q.email}
                  </p>
                  {q.phone && (
                    <p className="text-sm text-harmattan/70">{q.phone}</p>
                  )}
                  {q.message && (
                    <p className="mt-2 text-sm text-harmattan/60">
                      {q.message}
                    </p>
                  )}
                  <select
                    value={q.status}
                    onChange={(e) => updateQuoteStatus(q.id, e.target.value)}
                    className="mt-4 rounded-lg border border-harmattan/20 bg-ink px-3 py-1.5 text-sm text-harmattan"
                  >
                    {QUOTE_STATUSES.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "projects" && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {projects.length === 0 ? (
              <p className="text-harmattan/60">
                Aucun projet enregistré pour le moment.
              </p>
            ) : (
              projects.map((p) => (
                <div
                  key={p.id}
                  className="rounded-2xl border border-harmattan/10 bg-surface p-5"
                >
                  <h3 className="font-medium">
                    {p.universe === "linguistique" ? "🌍" : "💻"} {p.title}
                  </h3>
                  {p.description && (
                    <p className="mt-2 text-sm text-harmattan/60">
                      {p.description}
                    </p>
                  )}
                  {p.amount && (
                    <p className="mt-2 text-sm text-harmattan/70">
                      {p.amount} FCFA
                    </p>
                  )}
                  <select
                    value={p.status}
                    onChange={(e) => updateProjectStatus(p.id, e.target.value)}
                    className="mt-4 rounded-lg border border-harmattan/20 bg-ink px-3 py-1.5 text-sm text-harmattan"
                  >
                    {PROJECT_STATUSES.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "clients" && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {clients.length === 0 ? (
              <p className="text-harmattan/60">Aucun client inscrit pour le moment.</p>
            ) : (
              clients.map((c) => (
                <div
                  key={c.id}
                  className="rounded-2xl border border-harmattan/10 bg-surface p-5"
                >
                  <h3 className="font-medium">👤 {c.name}</h3>
                  <p className="mt-1 text-sm text-harmattan/70">{c.email}</p>
                  <p className="mt-1 text-xs text-harmattan/50 font-mono">
                    Inscrit le {new Date(c.createdAt).toLocaleDateString("fr-FR")}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}
