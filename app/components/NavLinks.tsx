"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { AUTH_EVENT, type User } from "@/lib/api";

const links = [
  { href: "/linguistique", label: "Linguistique", hover: "hover:text-indigo" },
  { href: "/tech", label: "Tech", hover: "hover:text-acacia" },
  { href: "/realisations", label: "Réalisations", hover: "hover:text-amber" },
  { href: "/about", label: "À propos", hover: "hover:text-amber" },
];

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(AUTH_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(AUTH_EVENT, callback);
  };
}

// Renvoie la chaine brute (stable entre deux appels) pour useSyncExternalStore.
function readStoredUser() {
  try {
    return localStorage.getItem("user");
  } catch {
    return null;
  }
}

function parseUser(raw: string | null): User | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export default function NavLinks() {
  const [open, setOpen] = useState(false);
  const rawUser = useSyncExternalStore(subscribe, readStoredUser, () => null);
  const user = parseUser(rawUser);

  const account = user
    ? {
        href: user.role === "admin" ? "/admin" : "/dashboard",
        label: "Mon espace",
      }
    : { href: "/login", label: "Connexion" };

  const allLinks = [
    ...links,
    { ...account, hover: "hover:text-amber" },
  ];

  return (
    <>
      <nav
        aria-label="Navigation principale"
        className="hidden sm:flex items-center gap-6 font-mono text-xs uppercase tracking-wide text-harmattan/70"
      >
        {allLinks.map((l) => (
          <Link key={l.href} href={l.href} className={`${l.hover} transition-colors`}>
            {l.label}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        className="sm:hidden flex h-10 w-10 items-center justify-center rounded-lg border border-harmattan/15 text-harmattan"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Navigation mobile"
          className="sm:hidden absolute left-0 right-0 top-full border-b border-harmattan/10 bg-ink px-6 py-4 shadow-lg shadow-black/40"
        >
          <ul className="flex flex-col gap-1 font-mono text-sm uppercase tracking-wide text-harmattan/80">
            {allLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block py-3 ${l.hover} transition-colors`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}
