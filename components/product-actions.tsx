"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Check, MessageCircle, Plus, ShoppingBag } from "lucide-react";
import type { Product } from "@/types";
import { useCart } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { SITE, whatsappLink } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function ProductActions({ product }: { product: Product }) {
  const router = useRouter();
  const variants = product.variants ?? [];
  const [sku, setSku] = React.useState(variants[0]?.sku ?? "");
  const [added, setAdded] = React.useState(false);
  const add = useCart((s) => s.add);

  const selected = variants.find((v) => v.sku === sku) ?? variants[0];

  const handleAdd = () => {
    if (!selected) return;
    add({
      sku: selected.sku,
      productId: product.id,
      name: product.name,
      description: selected.description,
      imageUrl: product.images?.[0],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const waMessage = selected
    ? `Hola, me interesa este producto:\n*${product.name}*\nRef: ${selected.sku}\n${selected.description}`
    : `Hola, me interesa: ${product.name}`;

  return (
    <div className="space-y-5">
      {variants.length > 1 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Selecciona una referencia</p>
          <div className="flex flex-col gap-2">
            {variants.map((v) => (
              <button
                key={v.sku}
                onClick={() => setSku(v.sku)}
                className={cn(
                  "flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm transition",
                  v.sku === sku
                    ? "border-primary bg-muted"
                    : "border-border hover:border-foreground/30"
                )}
              >
                <span className="min-w-0">
                  <span className="block truncate">{v.description}</span>
                  <span className="text-xs text-muted-foreground">Ref. {v.sku}</span>
                </span>
                {v.sku === sku && <Check className="h-4 w-4 shrink-0" />}
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
