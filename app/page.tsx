import Link from "next/link";
import { SEED_BRANDS } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Home (esqueleto Fase 2). El diseño completo del Hero, buscador,
 * menú superior y animaciones se implementa en la Fase 3.
 */
export default function HomePage() {
  return (
    <main className="container flex min-h-screen flex-col items-center justify-center gap-16 py-24 text-center">
      <div className="max-w-2xl animate-fade-up space-y-6">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Distribuidora de herrajes
        </p>
        <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-6xl">
          El herraje adecuado, <br className="hidden sm:block" /> encontrado en segundos.
        </h1>
        <p className="text-lg text-muted-foreground">
          Catálogo profesional SPAR y BONUIT. Busca por código, arma tu pedido y
          solicita tu cotización.
        </p>
      </div>

      <section className="grid w-full max-w-3xl gap-6 sm:grid-cols-2">
        {SEED_BRANDS.map((brand) => (
          <Link key={brand.id} href={`/marca/${brand.slug}`}>
            <Card className="group h-48 transition-all hover:-translate-y-1 hover:shadow-xl">
              <CardContent className="flex h-full flex-col items-center justify-center gap-2">
                <span className="text-3xl font-semibold tracking-tight">{brand.name}</span>
                <span className="text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                  Ver catálogo →
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </main>
  );
}
