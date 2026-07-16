import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PackageOpen, MessageCircle } from "lucide-react";
import { getCategory, getProducts, getSubcategories } from "@/lib/catalog";
import { ACTIVE_BRAND_SLUG, whatsappLink } from "@/lib/constants";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const cat = await getCategory(ACTIVE_BRAND_SLUG, params.category);
  return { title: cat ? cat.name : "Categoría" };
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const category = await getCategory(ACTIVE_BRAND_SLUG, params.category);
  if (!category) notFound();

  const products = await getProducts({
    brandSlug: ACTIVE_BRAND_SLUG,
    categorySlug: category.slug,
  });
  const subcategories = await getSubcategories(category.id);

  const groups =
    subcategories.length > 0
      ? subcategories.map((sub) => ({
          title: sub.name,
          items: products.filter((p) => p.subcategoryId === sub.id),
        }))
      : [{ title: "", items: products }];

  // Productos sin subcategoría cuando existen subcategorías
  if (subcategories.length > 0) {
    const orphan = products.filter((p) => !p.subcategoryId);
    if (orphan.length) groups.push({ title: "Otros", items: orphan });
  }

  return (
    <main className="container py-12 sm:py-16">
      <nav className="mb-8 text-sm text-muted-foreground">
        <Link href="/" className="transition hover:text-foreground">
          Inicio
        </Link>
        <span className="px-2">/</span>
        <span className="text-foreground">{category.name}</span>
      </nav>

      <header className="mb-16">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{category.name}</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          {products.length > 0
            ? `${products.length} ${products.length === 1 ? "producto" : "productos"}`
            : "Categoría en preparación"}
        </p>
      </header>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-border py-20 text-center">
          <PackageOpen className="h-10 w-10 text-muted-foreground" />
          <div>
            <p className="text-lg font-medium">Próximamente</p>
            <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
              Estamos incorporando los productos de {category.name.toLowerCase()}. Si buscas algo
              puntual, escríbenos y con gusto te ayudamos.
            </p>
          </div>
          <a
            href={whatsappLink(`Hola 👋 Estoy buscando ${category.name.toLowerCase()}. ¿Tienen disponibilidad?`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="whatsapp">
              <MessageCircle className="h-4 w-4" /> Consultar por WhatsApp
            </Button>
          </a>
        </div>
      ) : (
      <div className="space-y-16">
        {groups
          .filter((g) => g.items.length > 0)
          .map((group) => (
            <section key={group.title || "all"}>
              {group.title && (
                <h2 className="mb-5 text-sm font-medium uppercase tracking-wide text-muted-foreground">
                  {group.title}
                </h2>
              )}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {group.items.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          ))}
      </div>
      )}
    </main>
  );
}
