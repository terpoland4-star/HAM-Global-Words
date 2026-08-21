import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-sm bg-ink/70 border-b border-harmattan/10">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/logo-mark.png"
          alt="HAM Global Words"
          width={36}
          height={36}
          priority
        />
        <span className="font-display text-lg tracking-tight">
          HAM Global Words
        </span>
      </Link>

      <nav className="hidden sm:flex items-center gap-6 font-mono text-xs uppercase tracking-wide text-harmattan/70">
        <Link href="/linguistique" className="hover:text-indigo transition-colors">
          Linguistique
        </Link>
        <Link href="/tech" className="hover:text-acacia transition-colors">
          Tech
        </Link>
        <Link href="/realisations" className="hover:text-amber transition-colors">
          Réalisations
        </Link>
        <Link href="/login" className="hover:text-amber transition-colors">
          Connexion
        </Link>
      </nav>
    </header>
  );
}
