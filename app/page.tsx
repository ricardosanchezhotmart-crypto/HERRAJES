import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { CategoryGrid } from "@/components/category-grid";
import { ProductCard } from "@/components/product-card";
import { getCategories, getProducts } from "@/lib/catalog";
import { ACTIVE_BRAND_SLUG } from "@/lib/constants";

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    getCategories(ACTIVE_BRAND_SLUG),
    getProducts({ brandSlug: ACTIVE_BRAND_SLUG }),
  ]);
  const featured = products.slice(0, 8);

  return (
    <main>
      <Hero />

      <section id="categorias" className="container scroll-mt-24 py-12 sm:py-20 lg:py-28">
        <div className="mb-8 sm:mb-12">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Categorías</h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Explora el catálogo por categoría y encuentra el herraje que necesitas.
          </p>
        </div>
        <CategoryGrid categories={categories} products={products} />
      </section>

      {featured.length > 0 && (
        <section className="container py-12 sm:py-20 lg:py-28">
          <div className="mb-8 flex items-end justify-between sm:mb-12">
            <div>
              <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Destacados</h2>
              <p className="mt-3 text-lg text-muted-foreground">Productos populares del catálogo.</p>
            </div>
            <Link
              href="#categorias"
              className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              Ver categorías <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
