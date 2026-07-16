"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cart";
import { useMounted } from "@/lib/use-mounted";

export function CartBadge() {
  const mounted = useMounted();
  const units = useCart((s) => s.totalUnits());
  return (
    <Link
      href="/pedido"
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:h-10 sm:w-10"
      aria-label="Ver pedido"
    >
      <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
      {mounted && units > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
          {units}
        </span>
      )}
    </Link>
  );
}
