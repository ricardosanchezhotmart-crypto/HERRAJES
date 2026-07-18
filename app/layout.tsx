import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SITE, ACTIVE_BRAND_SLUG } from "@/lib/constants";
import { getCategories } from "@/lib/catalog";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SearchCommand } from "@/components/search-command";
import { WhatsappFab } from "@/components/whatsapp-fab";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://herrajes.example.com"),
  title: {
    default: `${SITE.name} — Herrajes para muebles`,
    template: `%s · ${SITE.shortName}`,
  },
  description: SITE.description,
  keywords: ["herrajes", "muebles", "bisagras", "rieles", "brazos elevables", "carpintería"],
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    type: "website",
    locale: "es_CO",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const categories = await getCategories(ACTIVE_BRAND_SLUG);
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.variable}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="flex min-h-screen flex-col">
            <Navbar categories={categories} />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
          <SearchCommand />
          <WhatsappFab />
        </ThemeProvider>
      </body>
    </html>
  );
}
