import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion | HAM Global Words",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
