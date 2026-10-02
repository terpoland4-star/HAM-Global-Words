import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";

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

      <NavLinks />
    </header>
  );
}
