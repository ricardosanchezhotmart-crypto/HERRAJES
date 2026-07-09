import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllProductsSync, getBrand, getProduct, getRelated } from "@/lib/catalog";
import { ProductImage } from "@/components/product-image";
import { ProductActions } from "@/components/product-actions";
import { ProductCard } from "@/components/product-card";
import { Card } from "@/components/ui/card";

export function generateStaticParams() {
  return getAllProductsSync().map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = await getProduct(params.id);
  if (!product) return { title: "Producto" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  if (!product) notFound();

  const brand = await getBrand(product.brandId);
  const related = await getRelated(product);

  return (
    <main className="container py-12">
      <nav className="mb-8 text-sm text-muted-foreground">
        <Link href="/" className="transition hover:text-foreground">
          Inicio
        </Link>
        {brand && (
          <>
            <span className="px-2">/</span>
            <Link href={`/marca/${brand.slug}`} className="transition hover:text-foreground">
              {brand.name}
            </Link>
          </>
        )}
        <span className="px-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Galería */}
        <div className="space-y-4">
          <Card className="aspect-square overflow-hidden">
            <ProductImage src={product.images?.[0]} alt={product.name} label={product.name} />
          </Card>
          <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="aspect-square overflow-hidden opacity-70">
                <ProductImage src={product.images?.[i + 1]} alt={`${product.name} ${i + 1}`} label={product.name} />
              </Card>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            {product.line && (
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {brand?.name} · {product.line}
              </span>
            )}
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">{product.name}</h1>
            {product.description && (
              <p className="mt-3 text-muted-foreground">{product.description}</p>
            )}
          </div>

          {product.specs && product.specs.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.specs.map((s) => (
                <span
                  key={s.key}
                  className="rounded-full border border-border bg-muted/50 px-3 py-1 text-sm"
                >
                  <span className="text-muted-foreground">{s.key}:</span>{" "}
                  <span className="font-medium">{s.value}</span>
                </span>
              ))}
            </div>
          )}

          <ProductActions product={product} />

          {product.applications && (
            <div className="rounded-xl border border-border p-4">
              <p className="text-sm font-medium">Aplicaciones</p>
              <p className="mt-1 text-sm text-muted-foreground">{product.applications}</p>
            </div>
          )}

          {product.features && product.features.length > 0 && (
            <div>
              <p className="mb-2 text-sm font-medium">Características</p>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {product.features.map((f, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Referencias / variantes como tabla técnica */}
      {product.variants && product.variants.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-4 text-lg font-semibold tracking-tight">Referencias</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Referencia</th>
                  <th className="px-4 py-3 font-medium">Descripción</th>
                </tr>
              </thead>
              <tbody>
                {product.variants.map((v) => (
                  <tr key={v.sku} className="border-t border-border">
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs">{v.sku}</td>
                    <td className="px-4 py-3">{v.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Relacionados */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-lg font-semibold tracking-tight">Productos relacionados</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
