import Link from "next/link";
import Image from "next/image";
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
  // Categorías con productos primero; las "Próximamente" al final (menos scroll
  // en móvil para llegar al contenido navegable), conservando el orden interno.
  const orderedCategories = [
    ...categories.filter((c) => !c.comingSoon),
    ...categories.filter((c) => c.comingSoon),
  ];
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
        <CategoryGrid categories={orderedCategories} products={products} />
      </section>

      {/* Banda de sección: herraje en contexto real */}
      <section className="container">
        <div className="relative aspect-[16/10] overflow-hidden rounded-3xl sm:aspect-[21/9]">
          <Image
            src="/hero-cocina.jpg"
            alt="Cajón de cocina con rieles y cubertero instalados"
            fill
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center gap-3 p-8 sm:p-14 lg:p-20">
            <h2 className="max-w-lg text-balance text-2xl font-semibold text-white sm:text-4xl lg:text-5xl lg:leading-[1.1]">
              Herrajes que se sienten en cada detalle
            </h2>
            <p className="max-w-md text-balance text-sm text-white/85 sm:text-lg">
              Rieles, cajones y accesorios para muebles con acabados profesionales.
            </p>
            <Link
              href="#categorias"
              className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Explorar catálogo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
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
