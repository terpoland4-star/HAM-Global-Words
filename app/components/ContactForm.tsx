"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";

const services = [
  { label: "🌐 Traduction Professionnelle & Assermentée", universe: "linguistique" },
  { label: "🎙️ Interprétation de Conférence & Terrain", universe: "linguistique" },
  { label: "🧠 Annotation de Données pour l'IA", universe: "linguistique" },
  { label: "📡 Interprétation à Distance (RSI/VRI)", universe: "linguistique" },
  { label: "💻 Développement Web & Applications", universe: "tech" },
  { label: "🧩 Audit & Optimisation de Code", universe: "tech" },
  { label: "🎓 Formation & Accompagnement", universe: "tech" },
  { label: "📘 Cours HTML — Programme Starter Tech", universe: "tech" },
];

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);

    const selected = services.find((s) => s.label === service);
    if (!selected) {
      setErrorMsg("Veuillez sélectionner un service.");
      return;
    }
    if (!name || !email || !message) {
      setErrorMsg("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    setStatus("loading");

    try {
      const response = await apiFetch("/quotes", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          phone: phone || undefined,
          universe: selected.universe,
          service: selected.label,
          message,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setErrorMsg(data.error || "Erreur lors de l'envoi de la demande.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setService("");
      setMessage("");
    } catch {
      setErrorMsg("Impossible de contacter le serveur. Réessayez.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-acacia/30 bg-surface p-8 text-center">
        <p className="text-2xl">✅</p>
        <p className="mt-3 text-harmattan/85">
          Votre demande a été envoyée avec succès ! Nous revenons vers vous
          rapidement.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm text-indigo underline"
        >
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-harmattan/10 bg-surface p-6 sm:p-8 space-y-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
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
          placeholder="Votre email professionnel"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-harmattan/20 bg-ink px-4 py-2.5 text-harmattan placeholder:text-harmattan/40 focus:border-indigo focus:outline-none"
        />
      </div>

      <input
        type="tel"
        placeholder="Téléphone (optionnel)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full rounded-lg border border-harmattan/20 bg-ink px-4 py-2.5 text-harmattan placeholder:text-harmattan/40 focus:border-indigo focus:outline-none"
      />

      <select
        required
        value={service}
        onChange={(e) => setService(e.target.value)}
        className="w-full rounded-lg border border-harmattan/20 bg-ink px-4 py-2.5 text-harmattan focus:border-indigo focus:outline-none"
      >
        <option value="">Sélectionnez un service</option>
        {services.map((s) => (
          <option key={s.label} value={s.label}>
            {s.label}
          </option>
        ))}
      </select>

      <textarea
        placeholder="Décrivez votre projet, vos objectifs et vos contraintes spécifiques..."
        required
        rows={5}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full rounded-lg border border-harmattan/20 bg-ink px-4 py-2.5 text-harmattan placeholder:text-harmattan/40 focus:border-indigo focus:outline-none resize-none"
      />

      {errorMsg && <p className="text-sm text-red-400">{errorMsg}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full sm:w-auto rounded-full bg-amber px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-amber/85 disabled:opacity-50"
      >
        {status === "loading" ? "Envoi..." : "🚀 Envoyer la demande"}
      </button>
    </form>
  );
}
