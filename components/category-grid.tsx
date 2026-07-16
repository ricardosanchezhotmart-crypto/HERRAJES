import Link from "next/link";
import { ArrowRight, PackageOpen } from "lucide-react";
import type { Category, Product } from "@/types";
import { Card } from "@/components/ui/card";
import { ProductImage } from "@/components/product-image";

/** Descripción corta por categoría (copy de presentación, no vive en los datos). */
const TAGLINES: Record<string, string> = {
  bisagras: "Para puertas abatibles.",
  rieles: "Para cajones y correderas.",
  "brazos-elevables": "Para puertas plegables y abatibles hacia arriba.",
  "sistemas-para-closet": "Para puertas corredizas y organización de closet.",
  "accesorios-para-cocina": "Organización y aprovechamiento del espacio.",
};

/**
 * Portada preferida por categoría: el producto cuya fotografía muestra mejor
 * el herraje en contexto (instalado), en vez de la primera imagen disponible.
 */
const COVER_OVERRIDES: Record<string, string> = {
  rieles: "spar_rieles_kit-cajon-spar-cacerolero-h128mm-para-vidrio",
  "brazos-elevables": "spar_brazos-elevables_brazo-neumatico-spar",
};

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
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((cat) => {
        const overrideId = COVER_OVERRIDES[cat.slug];
        const cover =
          (overrideId && products.find((p) => p.id === overrideId)) ||
          products.find((p) => p.categoryId === cat.id && p.images?.[0]);
        return (
          <Link
            key={cat.id}
            href={`/categoria/${cat.slug}`}
            className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Card className="hover-lift overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden border-b border-border">
                <ProductImage
                  src={cover?.images?.[0]}
                  alt={cat.name}
                  label={cat.name}
                  className="transition-transform duration-200 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex items-start justify-between gap-3 p-6">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{cat.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {TAGLINES[cat.slug] ?? "Explora esta categoría."}
                  </p>
                </div>
                <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
