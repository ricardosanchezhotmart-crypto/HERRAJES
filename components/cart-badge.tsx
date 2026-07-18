"use client";

import * as React from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cart";
import { useMounted } from "@/lib/use-mounted";
import { cn } from "@/lib/utils";

/**
 * Acceso al pedido en el header. CTA de conversión: pill con etiqueta y
 * contador; cuando hay items toma el color primario. Al agregar productos hace
 * un breve "bump" para dar feedback visible de que el pedido se actualizó.
 */
export function CartBadge() {
  const mounted = useMounted();
  const units = useCart((s) => s.totalUnits());
  const hasItems = mounted && units > 0;

  const [bump, setBump] = React.useState(false);
  const prev = React.useRef(units);
  React.useEffect(() => {
    if (units > prev.current) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 350);
      prev.current = units;
      return () => clearTimeout(t);
    }
    prev.current = units;
  }, [units]);

  return (
    <Link
      href="/pedido"
      aria-label={hasItems ? `Ver pedido (${units} unidades)` : "Ver pedido"}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-medium transition-[background,color,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:h-10 sm:px-3.5",
        hasItems
          ? "bg-primary text-primary-foreground hover:opacity-90"
          : "border border-border hover:bg-muted",
        bump && "scale-110"
      )}
    >
      <ShoppingBag className="h-4 w-4 shrink-0" />
      <span className="hidden lg:inline">Pedido</span>
      {hasItems && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white/25 px-1.5 text-[11px] font-semibold tabular-nums">
          {units}
        </span>
      )}
    </Link>
  );
}
