import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import type { Product } from "@/types";
import { Card } from "@/components/ui/card";
import { ProductImage } from "@/components/product-image";
import { whatsappLink } from "@/lib/constants";
import { buildProductInquiryMessage } from "@/lib/quote";
import { formatCOP, minPrice } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const code = product.variants?.[0]?.sku;
  const traits = (product.specs ?? []).slice(0, 2).map((s) => `${s.key} ${s.value}`);
  const waMessage = buildProductInquiryMessage({ name: product.name, code: code ?? "N/A" });
  const price = minPrice((product.variants ?? []).map((v) => v.price));
  const multiPriced = (product.variants ?? []).filter((v) => typeof v.price === "number").length > 1;

  return (
    <div className="group relative">
      <Link
        href={`/producto/${product.id}`}
        className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Card className="hover-lift h-full overflow-hidden">
          <div className="aspect-square overflow-hidden border-b border-border">
            <ProductImage
              src={product.images?.[0]}
              alt={product.name}
              label={product.name}
              className="transition-transform duration-200 group-hover:scale-[1.03]"
            />
          </div>
          <div className="space-y-2.5 p-5">
            {code && (
              <p className="font-mono text-xs tracking-tight text-muted-foreground">{code}</p>
            )}
            <h3 className="line-clamp-2 text-sm font-semibold leading-snug">{product.name}</h3>
            {traits.length > 0 && (
              <p className="line-clamp-1 text-xs text-muted-foreground">{traits.join(" · ")}</p>
            )}
            {typeof price === "number" && (
              <p className="pt-0.5 text-sm font-semibold text-foreground">
                {multiPriced && <span className="text-xs font-normal text-muted-foreground">Desde </span>}
                {formatCOP(price)}
              </p>
            )}
            <span className="inline-flex items-center gap-1 pt-1.5 text-xs font-medium text-primary">
              Ver detalles
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </Card>
      </Link>
      {/* Fuera del <Link>: un <a> anidado dentro de otro <a> es HTML inválido
          y el navegador lo reestructura al analizar el HTML, rompiendo la
          hidratación de React. */}
      <a
        href={whatsappLink(waMessage)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Consultar ${product.name} por WhatsApp`}
        className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#16A34A] shadow-subtle transition-transform duration-200 hover:scale-110 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <MessageCircle className="h-4 w-4" />
      </a>
    </div>
  );
}
