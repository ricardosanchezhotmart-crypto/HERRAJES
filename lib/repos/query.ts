/**
 * Lógica de consulta pura sobre un dataset del catálogo en memoria.
 * La comparten seed-repo y firestore-repo, de modo que el comportamiento
 * (filtros, búsqueda, relacionados) es idéntico sin importar la fuente.
 */
import type { Brand, Category, Product, Subcategory } from "@/types";

export interface Dataset {
  brands: Brand[];
  categories: Category[];
  subcategories: Subcategory[];
  products: Product[];
}

export interface ProductFilter {
  brandSlug?: string;
  categorySlug?: string;
  subcategorySlug?: string;
}

export function queryBrands(d: Dataset): Brand[] {
  return [...d.brands].sort((a, b) => a.order - b.order);
}

export function queryBrand(d: Dataset, slug: string): Brand | undefined {
  return d.brands.find((b) => b.slug === slug);
}

export function queryCategories(d: Dataset, brandSlug?: string): Category[] {
  const cats = brandSlug ? d.categories.filter((c) => c.brandId === brandSlug) : d.categories;
  return [...cats].sort((a, b) => a.order - b.order);
}

export function queryCategory(
  d: Dataset,
  brandSlug: string,
  categorySlug: string
): Category | undefined {
  return d.categories.find((c) => c.brandId === brandSlug && c.slug === categorySlug);
}

export function querySubcategories(d: Dataset, categoryId: string): Subcategory[] {
  return d.subcategories
    .filter((s) => s.categoryId === categoryId)
    .sort((a, b) => a.order - b.order);
}

export function queryProducts(d: Dataset, filter?: ProductFilter): Product[] {
  let items = d.products;
  if (filter?.brandSlug) items = items.filter((p) => p.brandId === filter.brandSlug);
  if (filter?.categorySlug) {
    const cat = d.categories.find(
      (c) => c.brandId === filter.brandSlug && c.slug === filter.categorySlug
    );
    items = cat ? items.filter((p) => p.categoryId === cat.id) : [];
  }
  if (filter?.subcategorySlug) {
    const sub = d.subcategories.find((s) => s.slug === filter.subcategorySlug);
    items = sub ? items.filter((p) => p.subcategoryId === sub.id) : [];
  }
  return items;
}

export function queryProduct(d: Dataset, id: string): Product | undefined {
  return d.products.find((p) => p.id === id);
}

export function queryRelated(d: Dataset, product: Product, limit = 4): Product[] {
  return d.products
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, limit);
}

export function querySearch(d: Dataset, query: string, limit = 20): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);
  return d.products
    .map((p) => {
      const hay = (p.search ?? []).join(" ");
      const skuHit = p.variants?.some((v) => v.sku.toLowerCase().includes(q));
      const score = terms.reduce((n, t) => n + (hay.includes(t) ? 1 : 0), 0) + (skuHit ? 5 : 0);
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}
