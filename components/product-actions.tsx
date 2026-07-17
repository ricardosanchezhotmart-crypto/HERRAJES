"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Check, Minus, MessageCircle, Plus, ShoppingBag } from "lucide-react";
import type { Product } from "@/types";
import { useCart } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/constants";
import { buildProductInquiryMessage } from "@/lib/quote";
import { cn, formatCOP } from "@/lib/utils";

export function ProductActions({ product }: { product: Product }) {
  const router = useRouter();
  const variants = product.variants ?? [];
  const [sku, setSku] = React.useState(variants[0]?.sku ?? "");
  const [qty, setQty] = React.useState(1);
  const [added, setAdded] = React.useState(false);
  const add = useCart((s) => s.add);

  const selected = variants.find((v) => v.sku === sku) ?? variants[0];

  const handleAdd = () => {
    if (!selected) return;
    add(
      {
        sku: selected.sku,
        productId: product.id,
        name: product.name,
        description: selected.description,
        imageUrl: product.images?.[0],
      },
      qty
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const waMessage = buildProductInquiryMessage({
    name: product.name,
    code: selected?.sku ?? "N/A",
    qty,
  });

  return (
    <div className="space-y-5">
      {typeof selected?.price === "number" ? (
        <p className="text-3xl font-semibold tracking-tight tabular-nums">
          {formatCOP(selected.price)}
        </p>
      ) : (
        <p className="text-sm text-muted-foreground">Precio a consultar por WhatsApp</p>
      )}

      {variants.length > 1 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Selecciona una referencia</p>
          <div className="flex flex-col gap-2">
            {variants.map((v) => (
              <button
                key={v.sku}
                onClick={() => setSku(v.sku)}
                aria-pressed={v.sku === sku}
                className={cn(
                  "flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  v.sku === sku
                    ? "border-primary bg-muted"
                    : "border-border hover:border-foreground/30"
                )}
              >
                <span className="min-w-0">
                  <span className="block truncate">{v.description}</span>
                  <span className="text-xs text-muted-foreground">Ref. {v.sku}</span>
                </span>
                <span className="flex shrink-0 items-center gap-2">
                  {typeof v.price === "number" && (
                    <span className="text-sm font-semibold tabular-nums">{formatCOP(v.price)}</span>
                  )}
                  {v.sku === sku && <Check className="h-4 w-4" />}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {variants.length === 1 && selected && (
        <p className="text-sm text-muted-foreground">
          Referencia <span className="font-medium text-foreground">{selected.sku}</span>
        </p>
      )}

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">Cantidad</span>
        <div className="flex items-center gap-1 rounded-full border border-border p-1">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Restar cantidad"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-8 text-center text-sm font-medium tabular-nums">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Sumar cantidad"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="lg" className="flex-1" onClick={handleAdd}>
          {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {added ? "Agregado" : "Agregar al pedido"}
        </Button>
        <Button size="lg" variant="outline" className="flex-1" onClick={() => { handleAdd(); router.push("/pedido"); }}>
          <ShoppingBag className="h-4 w-4" /> Solicitar cotización
        </Button>
      </div>

      <a href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer" className="block">
        <Button variant="whatsapp" size="lg" className="w-full">
          <MessageCircle className="h-4 w-4" /> Consultar por WhatsApp
        </Button>
      </a>
    </div>
  );
}
