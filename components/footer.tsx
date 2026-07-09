import Link from "next/link";
import { SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 text-sm text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} Distribuidora de herrajes. Todos los derechos reservados.</p>
        <div className="flex items-center gap-5">
          <Link href="/marca/spar" className="transition hover:text-foreground">
            SPAR
          </Link>
          <Link href="/marca/bonuit" className="transition hover:text-foreground">
            BONUIT
          </Link>
          <Link href="/contacto" className="transition hover:text-foreground">
            Contacto
          </Link>
          <a href={`mailto:${SITE.email}`} className="transition hover:text-foreground">
            {SITE.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
