import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tech — Développement Web & Applications | HAM Global Words",
  description:
    "Développement web, audit de code et formation en programmation par HAM Global Words. Plateformes pensées pour les usages ouest-africains.",
};

const services = [
  {
    slug: "webdev",
    name: "Développement Web & Applications",
    desc: "Plateformes complètes, du backend à la PWA, pensées pour des connexions et des usages ouest-africains.",
    icon: "💻",
  },
  {
    slug: "codefix",
    name: "Audit & Optimisation de Code",
    desc: "Revue de code, correction de bugs critiques et optimisation de performance sur des projets existants.",
    icon: "🧩",
  },
  {
    slug: "formation",
    name: "Formation & Accompagnement",
    desc: "Montée en compétence technique pour équipes et institutions, construite sur des cas réels du secteur.",
    icon: "🎓",
  },
  {
    slug: "cours-html-starter",
    name: "Cours HTML — Programme Starter Tech",
    desc: "Cours complet pour débutants souhaitant créer leurs propres solutions numériques, du zéro au déploiement.",
    icon: "📘",
  },
];

const stack = [
  "React / Next.js",
  "Node.js / Express",
  "TypeScript",
  "PostgreSQL",
  "Tailwind CSS",
  "PM2 / Nginx",
];

export default function TechPage() {
  return (
    <>
      <section className="relative px-6 pt-16 pb-14 overflow-hidden border-b border-harmattan/10">
        <Image
          src="/logo-mark.png"
          alt=""
          aria-hidden="true"
          width={1000}
          height={1000}
          className="pointer-events-none select-none absolute right-0 top-0 w-[70vw] max-w-none opacity-[0.04] -translate-y-1/4 translate-x-1/4"
        />
        <div className="relative z-10 max-w-3xl">
          <span className="animate-fade-up font-mono text-xs tracking-[0.2em] uppercase text-acacia">
            Univers Tech
          </span>
          <h1
            className="animate-fade-up mt-4 font-display text-4xl sm:text-5xl leading-[1.1]"
            style={{ animationDelay: "0.1s" }}
          >
            Développement web{" "}
            <em className="italic text-acacia">& applications</em>
          </h1>
          <p
            className="animate-fade-up mt-5 max-w-xl text-harmattan/70 text-base sm:text-lg"
            style={{ animationDelay: "0.2s" }}
          >
            Conception de plateformes, audit de code et formation en
            programmation — avec la même exigence de précision que nos
            services linguistiques.
          </p>
          <a
            href="/#contact"
            className="animate-fade-up mt-8 inline-block rounded-full bg-acacia px-6 py-3 text-sm font-medium text-harmattan transition-colors hover:bg-acacia/85"
            style={{ animationDelay: "0.3s" }}
          >
            Demander un devis
          </a>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-2xl text-acacia mb-10">
            Nos services
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/tech/${s.slug}`}
                className="rounded-2xl border border-harmattan/10 bg-surface p-6 transition-colors hover:border-acacia/40 block"
              >
                <span className="text-2xl">{s.icon}</span>
                <h3 className="mt-3 font-medium text-harmattan">{s.name}</h3>
                <p className="mt-2 text-sm text-harmattan/60">{s.desc}</p>
                <span className="mt-4 inline-block text-xs font-mono uppercase tracking-wide text-acacia">
                  En savoir plus →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-harmattan/10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl text-acacia">
            Stack technique
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-acacia/30 px-4 py-1.5 text-sm text-harmattan/80 font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-harmattan/10 text-center">
        <p className="mx-auto max-w-lg font-display italic text-xl sm:text-2xl text-harmattan/85">
          &laquo; Traduire le sens, écrire le code — la même rigueur, deux
          langages différents. &raquo;
        </p>
        <a
          href="/#contact"
          className="mt-8 inline-block rounded-full bg-amber px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-amber/85"
        >
          Démarrer une collaboration
        </a>
      </section>
    </>
  );
}
