import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import Header from "./components/Header";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "HAM Global Words — Traduction, interprétation & développement web",
  description:
    "Studio linguistique et technique basé au Niger. Traduction professionnelle, interprétation diplomatique et de terrain, annotation IA/NLP et développement web & applications.",
  icons: { apple: "/icon-192.png" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "HAM Global Words",
    title: "HAM Global Words — Traduction, interprétation & développement web",
    description:
      "Traduction professionnelle, interprétation diplomatique et de terrain, annotation IA/NLP et développement web & applications.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-harmattan font-body">
        <Header />
        {children}
      </body>
    </html>
  );
}
