"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { searchProducts } from "@/lib/catalog";
import type { Product } from "@/types";

export function SearchCommand({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<Product[]>([]);

  React.useEffect(() => {
    let active = true;
    searchProducts(query).then((r) => active && setResults(r));
    return () => {
      active = false;
    };
  }, [query]);

  // Atajo de teclado ⌘K / Ctrl+K
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const go = (id: string) => {
    onOpenChange(false);
    setQuery("");
    router.push(`/producto/${id}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent hideClose className="top-[12%] overflow-hidden p-0">
        <DialogTitle className="sr-only">Buscar productos</DialogTitle>
        <Command shouldFilter={false} className="w-full">
          <div className="flex items-center gap-3 border-b border-border px-4">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <Command.Input
              autoFocus
              value={query}
              onValueChange={setQuery}
              placeholder="Buscar por código, nombre, marca o descripción…"
              className="h-14 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <Command.List className="max-h-[60vh] overflow-y-auto p-2">
            {query && results.length === 0 && (
              <div className="p-6 text-center text-sm text-muted-foreground">
                Sin resultados para “{query}”.
              </div>
            )}
            {!query && (
              <div className="p-6 text-center text-sm text-muted-foreground">
                Escribe un código (ej. 10003937) o un nombre de producto.
              </div>
            )}
            {results.map((p) => (
              <Command.Item
                key={p.id}
                value={p.id}
                onSelect={() => go(p.id)}
                className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm aria-selected:bg-muted"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">{p.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {p.line ? `${p.line} · ` : ""}
                    {p.variants?.[0]?.sku}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  {p.variants?.length ?? 0} ref.
                </span>
              </Command.Item>
            ))}
          </Command.List>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
