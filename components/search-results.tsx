"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import type { Brand, Category, Product } from "@/types";
import { getBrands, getCategories, searchProducts } from "@/lib/catalog";
import { addRecentSearch } from "@/lib/recent-searches";
import { ProductCard } from "@/components/product-card";
import { cn } from "@/lib/utils";

export function SearchResults() {
  const router = useRouter();
  const params = useSearchParams();
  const initial = params.get("q") ?? "";

  const [query, setQuery] = React.useState(initial);
  const [results, setResults] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [brands, setBrands] = React.useState<Brand[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [brandFilter, setBrandFilter] = React.useState<string | null>(null);
  const [catFilter, setCatFilter] = React.useState<string | null>(null);

  React.useEffect(() => {
    getBrands().then(setBrands);
    getCategories().then(setCategories);
  }, []);

  // Ejecuta la búsqueda cuando cambia el término (con debounce ligero).
  React.useEffect(() => {
    let active = true;
    setLoading(true);
    const id = setTimeout(() => {
      searchProducts(query, 200).then((r) => {
        if (!active) return;
        setResults(r);
        setLoading(false);
        if (query.trim().length >= 2) addRecentSearch(query.trim());
      });
    }, 180);
    return () => {
      active = false;
      clearTimeout(id);
    };
  }, [query]);

  // Refleja el término en la URL sin recargar.
  React.useEffect(() => {
    const t = setTimeout(() => {
      const q = query.trim();
      router.replace(q ? `/buscar?q=${encodeURIComponent(q)}` : "/buscar", { scroll: false });
    }, 300);
    return () => clearTimeout(t);
  }, [query, router]);

  const brandName = (slug: string) => brands.find((b) => b.slug === slug)?.name ?? slug;
  const catName = (id: string) => categories.find((c) => c.id === id)?.name ?? id;

  // Facetas a partir de los resultados actuales.
  const brandFacets = React.useMemo(() => {
    const m = new Map<string, number>();
    results.forEach((p) => m.set(p.brandId, (m.get(p.brandId) ?? 0) + 1));
    return [...m.entries()];
  }, [results]);
  const catFacets = React.useMemo(() => {
    const src = brandFilter ? results.filter((p) => p.brandId === brandFilter) : results;
    const m = new Map<string, number>();
    src.forEach((p) => m.set(p.categoryId, (m.get(p.categoryId) ?? 0) + 1));
    return [...m.entries()];
  }, [results, brandFilter]);

  const filtered = results.filter(
    (p) => (!brandFilter || p.brandId === brandFilter) && (!catFilter || p.categoryId === catFilter)
  );

  return (
    <div>
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          autoFocus
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setBrandFilter(null);
            setCatFilter(null);
          }}
          placeholder="Buscar por código, nombre, marca o descripción…"
          className="h-14 w-full rounded-2xl border border-border bg-card pl-12 pr-4 text-base outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {query.trim() && (
        <p className="mt-4 text-sm text-muted-foreground">
          {loading ? "Buscando…" : `${filtered.length} resultado${filtered.length === 1 ? "" : "s"} para “${query.trim()}”`}
        </p>
      )}

      {results.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {brandFacets.length > 1 &&
            brandFacets.map(([slug, n]) => (
              <FilterChip
                key={slug}
                active={brandFilter === slug}
                onClick={() => setBrandFilter(brandFilter === slug ? null : slug)}
              >
                {brandName(slug)} <span className="opacity-60">{n}</span>
              </FilterChip>
            ))}
          {catFacets.length > 1 &&
            catFacets.map(([id, n]) => (
              <FilterChip
                key={id}
                active={catFilter === id}
                onClick={() => setCatFilter(catFilter === id ? null : id)}
              >
                {catName(id)} <span className="opacity-60">{n}</span>
              </FilterChip>
            ))}
          {(brandFilter || catFilter) && (
            <button
              onClick={() => {
                setBrandFilter(null);
                setCatFilter(null);
              }}
              className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm text-muted-foreground transition hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" /> Limpiar
            </button>
          )}
        </div>
      )}

      <div className="mt-8">
        {!query.trim() ? (
          <p className="text-muted-foreground">Escribe para buscar en el catálogo.</p>
        ) : !loading && filtered.length === 0 ? (
          <div className="rounded-2xl border border-border py-16 text-center">
            <p className="text-lg font-medium">Sin resultados</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Prueba con otro término o revisa el código.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-sm transition",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background hover:bg-muted"
      )}
    >
      {children}
    </button>
  );
}
