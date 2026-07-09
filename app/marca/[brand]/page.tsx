import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, PackageOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { getBrand, getCategories, getProducts } from "@/lib/catalog";

export async function generateMetadata({
  params,
}: {
  params: { brand: string };
}): Promise<Metadata> {
  const brand = await getBrand(params.brand);
  return { title: brand ? `Catálogo ${brand.name}` : "Marca" };
}

export default async function BrandPage({ params }: { params: { brand: string } }) {
  const brand = await getBrand(params.brand);
  if (!brand) notFound();

  const categories = await getCategories(brand.slug);
  const products = await getProducts({ brandSlug: brand.slug });

  return (
    <main className="container py-12">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="transition hover:text-foreground">
          Inicio
        </Link>
        <span className="px-2">/</span>
        <span className="text-foreground">{brand.name}</span>
      </nav>

      <header className="mb-10">
        <h1 className="text-4xl font-semibold tracking-tight">{brand.name}</h1>
        <p className="mt-2 text-muted-foreground">
          {categories.length > 0
            ? `${categories.length} categorías · ${products.length} productos`
            : "Catálogo en preparación."}
        </p>
      </header>

      {categories.length === 0 ? (
        <Card className="flex flex-col items-center justify-center gap-3 py-20 text-center">
          <PackageOpen className="h-10 w-10 text-muted-foreground" />
          <p className="text-lg font-medium">Catálogo próximamente</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Estamos incorporando el catálogo de {brand.name}. Muy pronto podrás explorarlo aquí.
          </p>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const count = products.filter((p) => p.categoryId === cat.id).length;
            return (
              <Link key={cat.id} href={`/categoria/${brand.slug}/${cat.slug}`} className="group">
                <Card className="flex h-40 flex-col justify-between p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex items-start justify-between">
                    <h2 className="text-xl font-semibold tracking-tight">{cat.name}</h2>
                    <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <p className="text-sm text-muted-foreground">{count} productos</p>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
