import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SITE } from "@/lib/constants";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — Herrajes para muebles`,
    template: `%s · ${SITE.shortName}`,
  },
  description: SITE.description,
  keywords: ["herrajes", "muebles", "SPAR", "BONUIT", "bisagras", "rieles", "carpintería"],
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
