import Image from "next/image";

const linguistique = [
  {
    name: "Traduction Professionnelle",
    desc: "Documents juridiques, techniques et commerciaux, du français vers l'anglais et le haoussa, sans perte de nuance.",
  },
  {
    name: "Interprétation Stratégique",
    desc: "Présence en réunion, négociation ou terrain, pour que la barrière de langue ne coûte jamais une décision.",
  },
  {
    name: "Formation & Accompagnement",
    desc: "Montée en compétence linguistique pour équipes et institutions, construite sur des cas réels du secteur.",
  },
];

const tech = [
  {
    name: "Annotation IA & NLP",
    desc: "Jeux de données annotés pour l'entraînement de modèles, avec un œil linguistique que peu d'annotateurs ont.",
  },
  {
    name: "Développement Web & Apps",
    desc: "Plateformes complètes, du backend à la PWA, pensées pour des connexions et des usages ouest-africains.",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative flex flex-col items-center px-6 pt-20 pb-16 text-center overflow-hidden">
        <Image
          src="/logo-mark.png"
          alt=""
          aria-hidden="true"
          width={1200}
          height={1200}
          className="pointer-events-none select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] max-w-none opacity-[0.05]"
        />

        <div className="relative z-10 flex flex-col items-center">
          <span
            className="animate-fade-up font-mono text-xs tracking-[0.2em] uppercase text-amber"
            style={{ animationDelay: "0.05s" }}
          >
            Niamey, Niger — studio indépendant
          </span>

          <h1
            className="animate-fade-up mt-6 max-w-2xl font-display text-4xl sm:text-5xl leading-[1.1]"
            style={{ animationDelay: "0.15s" }}
          >
            Deux univers. <em className="italic text-indigo">Un seul</em>{" "}
            artisan.
          </h1>

          <p
            className="animate-fade-up mt-5 max-w-md text-harmattan/70 text-base sm:text-lg"
            style={{ animationDelay: "0.28s" }}
          >
            Hamadine AG Moctar traduit le sens et écrit le code — avec la même
            exigence de précision, pour des clients qui ne veulent choisir ni
            l&apos;un ni l&apos;autre.
          </p>

          <div
            className="animate-fade-up mt-9 flex flex-col sm:flex-row gap-3"
            style={{ animationDelay: "0.4s" }}
          >
            <a
              href="/linguistique"
              className="rounded-full bg-indigo px-6 py-3 text-sm font-medium text-harmattan transition-colors hover:bg-indigo/85"
            >
              Explorer l&apos;univers Linguistique
            </a>
            <a
              href="/tech"
              className="rounded-full border border-acacia/50 px-6 py-3 text-sm font-medium text-acacia transition-colors hover:bg-acacia/10"
            >
              Explorer l&apos;univers Tech
            </a>
          </div>

          <div
            className="animate-fade-up mt-14 w-56 sm:w-72"
            style={{ animationDelay: "0.55s" }}
          >
            <Image
              src="/logo-mark.png"
              alt="Deux orbites, linguistique et tech, croisées autour de HAM Global Words"
              width={603}
              height={603}
              className="w-full h-auto animate-spin-slow"
              priority
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-harmattan/10">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl text-indigo">Linguistique</h2>
            <ul className="mt-6 space-y-6">
              {linguistique.map((s) => (
                <li key={s.name} className="border-l-2 border-indigo/30 pl-4">
                  <p className="font-medium">{s.name}</p>
                  <p className="mt-1 text-sm text-harmattan/60">{s.desc}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl text-acacia">Tech</h2>
            <ul className="mt-6 space-y-6">
              {tech.map((s) => (
                <li key={s.name} className="border-l-2 border-acacia/30 pl-4">
                  <p className="font-medium">{s.name}</p>
                  <p className="mt-1 text-sm text-harmattan/60">{s.desc}</p>
                </li>
              ))}
            </ul>
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
