"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cart";
import { useMounted } from "@/lib/use-mounted";
import { cn } from "@/lib/utils";

/**
 * Acceso al pedido en el header. Es el CTA de conversión de la plataforma,
 * así que no se esconde como un icono más: pill con etiqueta y contador,
 * y cuando hay items toma el color primario para mantener el pedido a la
 * vista mientras el cliente sigue navegando.
 */
export function CartBadge() {
  const mounted = useMounted();
  const units = useCart((s) => s.totalUnits());
  const hasItems = mounted && units > 0;

  return (
    <Link
      href="/pedido"
      aria-label={hasItems ? `Ver pedido (${units} unidades)` : "Ver pedido"}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:h-10 sm:px-3.5",
        hasItems
          ? "bg-primary text-primary-foreground hover:opacity-90"
          : "border border-border hover:bg-muted"
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
