"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { QuoteItem } from "@/types";

interface CartState {
  items: QuoteItem[];
  add: (item: Omit<QuoteItem, "qty">, qty?: number) => void;
  setQty: (sku: string, qty: number) => void;
  remove: (sku: string) => void;
  clear: () => void;
  totalUnits: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item, qty = 1) =>
        set((s) => {
          const existing = s.items.find((i) => i.sku === item.sku);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.sku === item.sku ? { ...i, qty: i.qty + qty } : i
              ),
            };
          }
          return { items: [...s.items, { ...item, qty }] };
        }),
      setQty: (sku, qty) =>
        set((s) => ({
          items: s.items
            .map((i) => (i.sku === sku ? { ...i, qty: Math.max(0, qty) } : i))
            .filter((i) => i.qty > 0),
        })),
      remove: (sku) => set((s) => ({ items: s.items.filter((i) => i.sku !== sku) })),
      clear: () => set({ items: [] }),
      totalUnits: () => get().items.reduce((n, i) => n + i.qty, 0),
    }),
    { name: "herrajes-cart" }
  )
);
