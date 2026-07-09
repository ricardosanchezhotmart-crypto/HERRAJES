/**
 * Capa de acceso al catálogo.
 *
 * Hoy lee de los datos seed normalizados (Fase 3). En la Fase 4 se sustituye
 * el cuerpo de estas funciones por consultas a Firestore SIN cambiar su firma,
 * de modo que la UI no se entera del cambio.
 */
import type { Brand, Category, Product, Subcategory } from "@/types";
import { SEED_RAW } from "@/data/seed";
import { normalize } from "@/importers/shared/normalizer";
import { SEED_BRANDS } from "@/lib/constants";

const normalized = normalize(SEED_RAW);

const BRANDS: Brand[] = SEED_BRANDS.map((b, i) => ({
  id: b.id,
  name: b.name,
  slug: b.slug,
  order: i + 1,
}));

export async function getBrands(): Promise<Brand[]> {
  return BRANDS;
}

export async function getBrand(slug: string): Promise<Brand | undefined> {
  return BRANDS.find((b) => b.slug === slug);
}

export async function getCategories(brandSlug?: string): Promise<Category[]> {
  const cats = normalized.categories;
  if (!brandSlug) return cats;
  return cats.filter((c) => c.brandId === brandSlug);
}

export async function getCategory(
  brandSlug: string,
  categorySlug: string
): Promise<Category | undefined> {
  return normalized.categories.find(
    (c) => c.brandId === brandSlug && c.slug === categorySlug
  );
}

export async function getSubcategories(categoryId: string): Promise<Subcategory[]> {
  return normalized.subcategories.filter((s) => s.categoryId === categoryId);
}

export async function getProducts(filter?: {
  brandSlug?: string;
  categorySlug?: string;
  subcategorySlug?: string;
}): Promise<Product[]> {
  let items = normalized.products;
  if (filter?.brandSlug) items = items.filter((p) => p.brandId === filter.brandSlug);
  if (filter?.categorySlug) {
    const cat = normalized.categories.find(
      (c) => c.brandId === filter.brandSlug && c.slug === filter.categorySlug
    );
    items = cat ? items.filter((p) => p.categoryId === cat.id) : [];
  }
  if (filter?.subcategorySlug) {
    const sub = normalized.subcategories.find((s) => s.slug === filter.subcategorySlug);
    items = sub ? items.filter((p) => p.subcategoryId === sub.id) : [];
  }
  return items;
}

export async function getProduct(id: string): Promise<Product | undefined> {
  return normalized.products.find((p) => p.id === id);
}

export async function getRelated(product: Product, limit = 4): Promise<Product[]> {
  return normalized.products
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, limit);
}

/** Búsqueda instantánea por código, nombre, marca, línea y descripción. */
export async function searchProducts(query: string, limit = 20): Promise<Product[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);
  return normalized.products
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

export function getAllProductsSync(): Product[] {
  return normalized.products;
}
