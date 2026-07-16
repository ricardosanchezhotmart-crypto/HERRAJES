"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Clock, Search, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { getCategories, searchProducts } from "@/lib/catalog";
import { addRecentSearch, getRecentSearches } from "@/lib/recent-searches";
import { Highlight } from "@/components/highlight";
import { ProductImage } from "@/components/product-image";
import { useSearchStore } from "@/store/search";
import { ACTIVE_BRAND_SLUG } from "@/lib/constants";
import type { Category, Product } from "@/types";

/** Modal de búsqueda tipo Spotlight. Su visibilidad vive en useSearchStore,
 * así que cualquier componente (navbar, hero) puede abrirlo con setOpen/toggle. */
export function SearchCommand() {
  const open = useSearchStore((s) => s.open);
  const onOpenChange = useSearchStore((s) => s.setOpen);
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<Product[]>([]);
  const [recent, setRecent] = React.useState<string[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);

  React.useEffect(() => {
    getCategories(ACTIVE_BRAND_SLUG).then(setCategories);
  }, []);

  React.useEffect(() => {
    if (open) setRecent(getRecentSearches());
  }, [open]);

  React.useEffect(() => {
    let active = true;
    searchProducts(query, 8).then((r) => active && setResults(r));
    return () => {
      active = false;
    };
  }, [query]);

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

  const close = () => {
    onOpenChange(false);
    setQuery("");
  };
  const goProduct = (id: string) => {
    if (query.trim()) addRecentSearch(query.trim());
    close();
    router.push(`/producto/${id}`);
  };
  const goAll = () => {
    const q = query.trim();
    if (q) addRecentSearch(q);
    close();
    router.push(q ? `/buscar?q=${encodeURIComponent(q)}` : "/buscar");
  };

  const q = query.trim();
  const catName = (id: string) => categories.find((c) => c.id === id)?.name;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent hideClose className="top-[12%] overflow-hidden p-0">
        <DialogTitle className="sr-only">Buscar productos</DialogTitle>
        <Command shouldFilter={false} className="w-full" loop>
          <div className="flex items-center gap-3 border-b border-border px-4">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <Command.Input
              autoFocus
              value={query}
              onValueChange={setQuery}
              placeholder="Buscar por código, nombre o descripción…"
              className="h-14 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <Command.List className="max-h-[60vh] overflow-y-auto p-2">
            {!q && recent.length > 0 && (
              <Command.Group heading="Búsquedas recientes" className="px-2 py-1 text-xs text-muted-foreground [&_[cmdk-group-heading]]:px-1 [&_[cmdk-group-heading]]:pb-1">
                {recent.map((term) => (
                  <Command.Item
                    key={term}
                    value={`recent-${term}`}
                    onSelect={() => setQuery(term)}
                    className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-foreground aria-selected:bg-muted"
                  >
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    {term}
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {!q && recent.length === 0 && (
              <div className="p-6 text-center text-sm text-muted-foreground">
                Escribe un código (ej. 10003937) o un nombre de producto.
              </div>
            )}

            {q && results.length === 0 && (
              <div className="p-6 text-center text-sm text-muted-foreground">
                Sin resultados para “{q}”.
              </div>
            )}

            {q && results.length > 0 && (
              <>
                {results.map((p) => (
                  <Command.Item
                    key={p.id}
                    value={p.id}
                    onSelect={() => goProduct(p.id)}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm aria-selected:bg-muted"
                  >
                    <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-border">
                      <ProductImage src={p.images?.[0]} alt="" label={p.name} sizes="44px" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">
                        <Highlight text={p.name} query={q} />
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {catName(p.categoryId) ? `${catName(p.categoryId)} · ` : ""}
                        <Highlight text={p.variants?.[0]?.sku ?? ""} query={q} />
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                      {p.variants?.length ?? 0} ref.
                    </span>
                  </Command.Item>
                ))}
                <Command.Item
                  value="__all__"
                  onSelect={goAll}
                  className="mt-1 flex cursor-pointer items-center gap-2 rounded-lg border-t border-border px-3 py-2.5 text-sm font-medium aria-selected:bg-muted"
                >
                  <ArrowRight className="h-4 w-4" /> Ver todos los resultados para “{q}”
                </Command.Item>
              </>
            )}
          </Command.List>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
