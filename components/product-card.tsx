import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types";
import { Card } from "@/components/ui/card";
import { ProductImage } from "@/components/product-image";

export function ProductCard({ product }: { product: Product }) {
  const code = product.variants?.[0]?.sku;
  const traits = (product.specs ?? []).slice(0, 2).map((s) => `${s.key} ${s.value}`);

  return (
    <Link href={`/producto/${product.id}`} className="group block">
      <Card className="hover-lift h-full overflow-hidden">
        <div className="aspect-[4/3] overflow-hidden border-b border-border">
          <ProductImage
            src={product.images?.[0]}
            alt={product.name}
            label={product.name}
            className="transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div className="space-y-2 p-4">
          {code && (
            <p className="font-mono text-xs tracking-tight text-muted-foreground">{code}</p>
          )}
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug">{product.name}</h3>
          {traits.length > 0 && (
            <p className="line-clamp-1 text-xs text-muted-foreground">{traits.join(" · ")}</p>
          )}
          <span className="inline-flex items-center gap-1 pt-1 text-xs font-medium text-primary">
            Ver detalles
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </Card>
    </Link>
  );
}
