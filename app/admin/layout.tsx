import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel Admin | HAM Global Words",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
