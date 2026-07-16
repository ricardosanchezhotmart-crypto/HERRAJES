import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategory, getProducts, getSubcategories } from "@/lib/catalog";
import { ACTIVE_BRAND_SLUG } from "@/lib/constants";
import { ProductCard } from "@/components/product-card";

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
    <main className="container py-12">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="transition hover:text-foreground">
          Inicio
        </Link>
        <span className="px-2">/</span>
        <span className="text-foreground">{category.name}</span>
      </nav>

      <header className="mb-10">
        <h1 className="text-4xl font-semibold tracking-tight">{category.name}</h1>
        <p className="mt-2 text-muted-foreground">{products.length} productos</p>
      </header>

      <div className="space-y-12">
        {groups
          .filter((g) => g.items.length > 0)
          .map((group) => (
            <section key={group.title || "all"}>
              {group.title && (
                <h2 className="mb-4 text-lg font-semibold tracking-tight text-muted-foreground">
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
    </main>
  );
}
