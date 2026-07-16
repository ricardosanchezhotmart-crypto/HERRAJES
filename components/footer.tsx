import Link from "next/link";
import { SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 text-sm text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} Distribuidora de herrajes. Todos los derechos reservados.</p>
        <div className="flex items-center gap-5">
          <Link href="/#categorias" className="rounded transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Categorías
          </Link>
          <Link href="/contacto" className="rounded transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Contacto
          </Link>
          <a href={`mailto:${SITE.email}`} className="rounded transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            {SITE.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
