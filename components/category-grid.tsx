import fs from "fs";
import path from "path";
import Link from "next/link";
import { ArrowRight, PackageOpen } from "lucide-react";
import type { Category, Product } from "@/types";
import { Card } from "@/components/ui/card";
import { ProductImage } from "@/components/product-image";

/**
 * Portadas de estilo de vida por categoría: DETECCIÓN AUTOMÁTICA.
 * Basta con subir una imagen a `public/categorias/<slug>.(jpg|jpeg|png|webp)`
 * — por ejemplo `public/categorias/rieles.jpg` — y en el próximo despliegue la
 * tarjeta de esa categoría la usará sola, sin tocar código. Tiene prioridad
 * sobre la foto de producto.
 */
function readCategoryCovers(): Record<string, string> {
  const dir = path.join(process.cwd(), "public", "categorias");
  const map: Record<string, string> = {};
  try {
    for (const file of fs.readdirSync(dir)) {
      const m = file.match(/^(.+)\.(jpe?g|png|webp)$/i);
      if (m) map[m[1].toLowerCase()] = `/categorias/${file}`;
    }
  } catch {
    /* la carpeta puede no existir aún */
  }
  return map;
}
const CATEGORY_COVERS = readCategoryCovers();

/**
 * Portada preferida por categoría (fallback): el producto cuya fotografía
 * muestra mejor el herraje en contexto, en vez de la primera imagen disponible.
 */
const COVER_OVERRIDES: Record<string, string> = {
  cajones: "spar_cajones_kit-cajon-spar-cacerolero-h128mm-para-vidrio",
  "brazos-elevables": "spar_brazos-elevables_brazo-neumatico-spar",
};

/**
 * Grid de categorías: todas las categorías se muestran con el mismo formato,
 * tamaño y distribución (2 columnas desde móvil, 3 en escritorio). Las que aún
 * no tienen productos llevan un placeholder con el sello "Próximamente" y
 * enlazan a su página, donde se ofrece consultar por WhatsApp.
 */
export function CategoryGrid({
  categories,
  products,
}: {
  categories: Category[];
  products: Product[];
}) {
  if (categories.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center gap-3 py-20 text-center">
        <PackageOpen className="h-10 w-10 text-muted-foreground" />
        <p className="text-lg font-medium">Catálogo próximamente</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Estamos incorporando el catálogo. Muy pronto podrás explorarlo aquí.
        </p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 lg:gap-6">
      {categories.map((cat) => {
        const customCover = CATEGORY_COVERS[cat.slug];
        const overrideId = COVER_OVERRIDES[cat.slug];
        const productCover =
          (overrideId && products.find((p) => p.id === overrideId)) ||
          products.find((p) => p.categoryId === cat.id && p.images?.[0]);
        const coverSrc = customCover ?? productCover?.images?.[0];
        return (
          <Link
            key={cat.id}
            href={`/categoria/${cat.slug}`}
            className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Card className="hover-lift h-full overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden border-b border-border">
                {cat.comingSoon ? (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-background">
                    <PackageOpen className="h-8 w-8 text-muted-foreground/40" />
                  </div>
                ) : (
                  <ProductImage
                    src={coverSrc}
                    alt={cat.name}
                    label={cat.name}
                    sizes="(min-width: 1024px) 400px, 50vw"
                    className="transition-transform duration-200 group-hover:scale-[1.03]"
                  />
                )}
                {cat.comingSoon && (
                  <span className="absolute right-2 top-2 rounded-full bg-foreground/85 px-2.5 py-1 text-[10px] font-medium text-background sm:text-[11px]">
                    Próximamente
                  </span>
                )}
              </div>
              <div className="flex items-start justify-between gap-2 p-3.5 sm:p-5">
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold leading-snug tracking-tight sm:text-lg lg:text-xl">
                    {cat.name}
                  </h3>
                  <p className="mt-1 hidden text-sm text-muted-foreground sm:line-clamp-2">
                    {cat.description ?? "Explora esta categoría."}
                  </p>
                </div>
                <ArrowRight className="mt-0.5 hidden h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 sm:block" />
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
