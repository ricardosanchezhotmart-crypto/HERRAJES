import Link from "next/link";
import type { Product } from "@/types";
import { Card } from "@/components/ui/card";
import { ProductImage } from "@/components/product-image";

export function ProductCard({ product }: { product: Product }) {
  const skuCount = product.variants?.length ?? 0;
  const firstSpec = product.specs?.[0];
  return (
    <Link href={`/producto/${product.id}`} className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="aspect-[4/3] overflow-hidden border-b border-border">
          <ProductImage
            src={product.images?.[0]}
            alt={product.name}
            label={product.name}
            className="transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="space-y-2 p-4">
          {product.line && (
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {product.line}
            </span>
          )}
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug">{product.name}</h3>
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-muted-foreground">
            {firstSpec && (
              <span className="rounded-full bg-muted px-2 py-0.5">{firstSpec.value}</span>
            )}
            {skuCount > 0 && (
              <span>
                {skuCount} {skuCount === 1 ? "referencia" : "referencias"}
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
