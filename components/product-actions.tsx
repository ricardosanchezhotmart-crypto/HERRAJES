"use client";

import * as React from "react";
import { Check, Minus, Plus } from "lucide-react";
import type { Product, Variant } from "@/types";
import { useCart } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { cn, formatCOP } from "@/lib/utils";

/** Etiqueta corta de una variante (medida/acabado) para mostrar junto al precio. */
function variantLabel(v: Variant): string {
  const attrs = v.attributes ? Object.values(v.attributes) : [];
  return attrs.length ? attrs.join(" · ") : v.description;
}

export function ProductActions({ product }: { product: Product }) {
  const variants = product.variants ?? [];
  const add = useCart((s) => s.add);
  const [added, setAdded] = React.useState(false);

  // Cantidad por referencia. Con varias variantes el usuario puede pedir varias
  // medidas a la vez (p. ej. 3 de 45 cm y 2 de 50 cm); con una sola, arranca en 1.
  const single = variants.length <= 1;
  const [qtys, setQtys] = React.useState<Record<string, number>>(() =>
    single && variants[0] ? { [variants[0].sku]: 1 } : {}
  );

  const setQty = (sku: string, q: number) =>
    setQtys((prev) => ({ ...prev, [sku]: Math.max(0, q) }));

  const selectedLines = variants
    .map((v) => ({ v, qty: qtys[v.sku] ?? 0 }))
    .filter((x) => x.qty > 0);
  const totalUnits = selectedLines.reduce((n, x) => n + x.qty, 0);
  const subtotal = selectedLines.reduce(
    (n, x) => n + (typeof x.v.price === "number" ? x.v.price * x.qty : 0),
    0
  );
  const anyPriced = selectedLines.some((x) => typeof x.v.price === "number");

  const addAll = () => {
    selectedLines.forEach(({ v, qty }) =>
      add(
        {
          sku: v.sku,
          productId: product.id,
          name: single ? product.name : `${product.name} — ${variantLabel(v)}`,
          description: v.description,
          imageUrl: product.images?.[0],
        },
        qty
      )
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="space-y-5">
      {single ? (
        <SinglePicker
          variant={variants[0]}
          qty={qtys[variants[0]?.sku] ?? 1}
          onQty={(q) => variants[0] && setQty(variants[0].sku, q)}
        />
      ) : (
        <div className="space-y-2">
          <p className="text-sm font-medium">Elige medidas y cantidades</p>
          <div className="flex flex-col gap-2">
            {variants.map((v) => {
              const q = qtys[v.sku] ?? 0;
              return (
                <div
                  key={v.sku}
                  className={cn(
                    "flex items-center justify-between gap-3 rounded-xl border px-4 py-2.5 transition",
                    q > 0 ? "border-primary bg-muted" : "border-border"
                  )}
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{variantLabel(v)}</p>
                    {typeof v.price === "number" && (
                      <p className="text-sm tabular-nums text-muted-foreground">{formatCOP(v.price)}</p>
                    )}
                  </div>
                  <div className="flex shrink-0 items-center gap-1 rounded-full border border-border bg-background p-1">
                    <button
                      onClick={() => setQty(v.sku, q - 1)}
                      disabled={q === 0}
                      className="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-30"
                      aria-label={`Restar ${variantLabel(v)}`}
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-7 text-center text-sm font-medium tabular-nums">{q}</span>
                    <button
                      onClick={() => setQty(v.sku, q + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      aria-label={`Sumar ${variantLabel(v)}`}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {totalUnits > 0 && (
            <div className="flex items-center justify-between pt-1 text-sm">
              <span className="text-muted-foreground">
                {totalUnits} {totalUnits === 1 ? "unidad" : "unidades"}
              </span>
              {anyPriced && <span className="text-lg font-semibold tabular-nums">{formatCOP(subtotal)}</span>}
            </div>
          )}
        </div>
      )}

      <Button size="lg" className="w-full" onClick={addAll} disabled={totalUnits === 0}>
        {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        {added ? "Agregado al pedido" : "Agregar al pedido"}
      </Button>
    </div>
  );
}

/** Producto de una sola referencia: precio + selector de cantidad clásico. */
function SinglePicker({
  variant,
  qty,
  onQty,
}: {
  variant?: Variant;
  qty: number;
  onQty: (q: number) => void;
}) {
  return (
    <div className="space-y-4">
      {typeof variant?.price === "number" ? (
        <p className="text-3xl font-semibold tracking-tight tabular-nums">{formatCOP(variant.price)}</p>
      ) : (
        <p className="text-sm text-muted-foreground">Precio a consultar por WhatsApp</p>
      )}
      {variant && (
        <p className="text-sm text-muted-foreground">
          Referencia <span className="font-medium text-foreground">{variant.sku}</span>
        </p>
      )}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">Cantidad</span>
        <div className="flex items-center gap-1 rounded-full border border-border p-1">
          <button
            onClick={() => onQty(Math.max(1, qty - 1))}
            className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Restar cantidad"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-8 text-center text-sm font-medium tabular-nums">{qty}</span>
          <button
            onClick={() => onQty(qty + 1)}
            className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Sumar cantidad"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
