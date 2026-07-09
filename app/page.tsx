import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { BrandCard } from "@/components/brand-card";
import { ProductCard } from "@/components/product-card";
import { getBrands, getProducts } from "@/lib/catalog";

export default async function HomePage() {
  const brands = await getBrands();
  const products = await getProducts({ brandSlug: "spar" });
  const featured = products.slice(0, 8);

  return (
    <main>
      <Hero />

      <section className="container py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Nuestras marcas</h2>
            <p className="mt-1 text-muted-foreground">
              Selecciona una marca para explorar su catálogo.
            </p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {brands.map((brand, i) => (
            <BrandCard key={brand.id} brand={brand} index={i} />
          ))}
        </div>
      </section>

      <section className="container py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Destacados</h2>
            <p className="mt-1 text-muted-foreground">Algunos productos del catálogo SPAR.</p>
          </div>
          <Link
            href="/marca/spar"
            className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            Ver todo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
