# HAM Global Words

Site de HAM Global Words (Hamadine AG Moctar) : traduction professionnelle,
interprétation diplomatique et de terrain, annotation IA/NLP, développement web
et formation.

Next.js (App Router) · React 19 · Tailwind CSS v4 · pnpm 9

## Démarrer

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

## Scripts

| Commande         | Rôle                                              |
| ---------------- | ------------------------------------------------- |
| `pnpm dev`       | Serveur de développement                          |
| `pnpm build`     | Build de production                               |
| `pnpm start`     | Sert le build de production                       |
| `pnpm lint`      | ESLint                                            |
| `pnpm typecheck` | Génère les types Next.js puis lance `tsc`         |

La CI GitHub (`.github/workflows/ci.yml`) lance lint, typecheck, audit des
dépendances de production et build sur chaque pull request.

## Configuration

| Variable               | Défaut                               | Rôle                         |
| ---------------------- | ------------------------------------ | ---------------------------- |
| `NEXT_PUBLIC_API_BASE` | `https://hamadine.mooo.com/ham-api`  | URL de l'API (auth, devis)   |

Les en-têtes de sécurité (CSP, HSTS, X-Frame-Options…) sont définis dans
`next.config.ts`. L'origine de l'API y est ajoutée automatiquement à
`connect-src` : si l'API change de domaine, il suffit de modifier la variable.

## Structure

- `app/` : pages (App Router). `linguistique/` et `tech/` = les deux pôles ;
  `login`, `register`, `dashboard`, `admin` = espace client/admin (non indexé).
- `app/components/` : en-tête, navigation (menu mobile), formulaire de contact.
- `lib/api.ts` : client de l'API JWT. `lib/statuses.ts` : statuts de devis/projets.
