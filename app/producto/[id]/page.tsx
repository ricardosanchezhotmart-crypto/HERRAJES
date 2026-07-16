import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllProductIds, getCategories, getProduct, getRelated } from "@/lib/catalog";
import { ACTIVE_BRAND_SLUG } from "@/lib/constants";
import { ProductImage } from "@/components/product-image";
import { ProductActions } from "@/components/product-actions";
import { ProductCard } from "@/components/product-card";
import { Card } from "@/components/ui/card";

export const revalidate = 60;

export async function generateStaticParams() {
  const ids = await getAllProductIds();
  return ids.map((id) => ({ id }));
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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
      {children}
    </p>
  );
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  if (!product) notFound();

  const categories = await getCategories(ACTIVE_BRAND_SLUG);
  const category = categories.find((c) => c.id === product.categoryId);
  const related = await getRelated(product);
  const code = product.variants?.[0]?.sku;
  const hasDimensions = (product.dimensions && product.dimensions.length > 0) || product.dimensionImageUrl;

  return (
    <main className="container py-12 sm:py-16">
      <nav className="mb-8 text-sm text-muted-foreground">
        <Link href="/" className="transition hover:text-foreground">
          Inicio
        </Link>
        {category && (
          <>
            <span className="px-2">/</span>
            <Link href={`/categoria/${category.slug}`} className="transition hover:text-foreground">
              {category.name}
            </Link>
          </>
        )}
        <span className="px-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      {/* 1. Fotografías grandes */}
      <div className="mx-auto max-w-3xl space-y-3">
        <Card className="aspect-[4/3] overflow-hidden">
          <ProductImage src={product.images?.[0]} alt={product.name} label={product.name} />
        </Card>
        {product.images && product.images.length > 1 && (
          <div className="grid grid-cols-4 gap-3">
            {product.images.slice(1, 5).map((src, i) => (
              <Card key={i} className="aspect-square overflow-hidden opacity-80">
                <ProductImage src={src} alt={`${product.name} ${i + 1}`} label={product.name} />
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="mx-auto mt-20 max-w-2xl space-y-16 sm:mt-24 sm:space-y-20">
        {/* 2-3. Nombre + código */}
        <div>
          {product.line && (
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {product.line}
            </p>
          )}
          <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">{product.name}</h1>
          {code && <p className="mt-3 font-mono text-sm text-muted-foreground">Código {code}</p>}
          {product.description && (
            <p className="mt-5 text-lg text-muted-foreground">{product.description}</p>
          )}
        </div>

        {/* 4. Características principales */}
        {product.features && product.features.length > 0 && (
          <div>
            <SectionLabel>Características principales</SectionLabel>
            <ul className="mt-4 space-y-2.5">
              {product.features.map((f, i) => (
                <li key={i} className="flex gap-2.5 text-base text-foreground">
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 5. Aplicaciones */}
        {product.applications && (
          <div>
            <SectionLabel>Aplicaciones</SectionLabel>
            <p className="mt-4 text-base text-foreground">{product.applications}</p>
          </div>
        )}

        {/* 6. Especificaciones */}
        {product.specs && product.specs.length > 0 && (
          <div>
            <SectionLabel>Especificaciones</SectionLabel>
            <dl className="mt-4 divide-y divide-border">
              {product.specs.map((s) => (
                <div key={s.key} className="flex items-center justify-between py-3 text-sm">
                  <dt className="text-muted-foreground">{s.key}</dt>
                  <dd className="font-medium">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {/* 7. Medidas */}
        {hasDimensions && (
          <div>
            <SectionLabel>Medidas</SectionLabel>
            {product.dimensionImageUrl && (
              <Card className="mt-4 aspect-video overflow-hidden">
                <ProductImage src={product.dimensionImageUrl} alt={`Medidas de ${product.name}`} label="Medidas" />
              </Card>
            )}
            {product.dimensions && product.dimensions.length > 0 && (
              <dl className="mt-4 divide-y divide-border">
                {product.dimensions.map((d, i) => (
                  <div key={i} className="flex items-center justify-between py-3 text-sm">
                    {d.label && <dt className="text-muted-foreground">{d.label}</dt>}
                    <dd className="font-medium">{d.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        )}
      </div>

      {/* 8. Productos compatibles */}
      {related.length > 0 && (
        <section className="mx-auto mt-20 max-w-5xl sm:mt-24">
          <SectionLabel>Productos compatibles</SectionLabel>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Agregar al pedido / Solicitar cotización / WhatsApp */}
      <div className="mx-auto mt-20 max-w-2xl border-t border-border pt-12 sm:mt-24">
        <ProductActions product={product} />
      </div>
    </main>
  );
}
