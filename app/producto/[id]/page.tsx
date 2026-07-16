import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllProductIds,
  getBrand,
  getCategories,
  getProduct,
  getRelated,
  getSubcategories,
} from "@/lib/catalog";
import { ACTIVE_BRAND_SLUG } from "@/lib/constants";
import { ProductImage } from "@/components/product-image";
import { ProductGallery } from "@/components/product-gallery";
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

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  if (!product) notFound();

  const categories = await getCategories(ACTIVE_BRAND_SLUG);
  const category = categories.find((c) => c.id === product.categoryId);
  const subcategories = category ? await getSubcategories(category.id) : [];
  const subcategory = subcategories.find((s) => s.id === product.subcategoryId);
  const brand = await getBrand(ACTIVE_BRAND_SLUG);
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

      {/* 1. Fotografías grandes, con zoom */}
      <ProductGallery images={product.images} name={product.name} />

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

        {/* 6. Ficha técnica: metadatos del catálogo + especificaciones extraídas.
            Cada campo se muestra solo si el dato existe realmente; nunca se
            inventa ni se deja vacío. */}
        <div>
          <SectionLabel>Ficha técnica</SectionLabel>
          <dl className="mt-4 divide-y divide-border">
            {brand && <SpecRow label="Marca" value={brand.name} />}
            {code && <SpecRow label="Código" value={code} />}
            {category && <SpecRow label="Categoría" value={category.name} />}
            {subcategory && <SpecRow label="Subcategoría" value={subcategory.name} />}
            {product.line && <SpecRow label="Línea" value={product.line} />}
            {product.specs?.map((s) => <SpecRow key={s.key} label={s.key} value={s.value} />)}
          </dl>
        </div>

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
