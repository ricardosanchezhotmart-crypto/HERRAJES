/**
 * Normalizador compartido: convierte la salida de cualquier adapter de marca
 * en la forma canónica del modelo de datos (types/index.ts).
 *
 * Cada marca (SPAR, BONUIT) implementa un `BrandAdapter` que sabe leer SU
 * catálogo (PDF/Excel/CSV) y emitir `RawProduct[]`. El normalizador se encarga
 * de slugs, tokens de búsqueda e IDs, de forma idéntica para todas las marcas.
 * Así, si un proveedor cambia la estructura, solo se toca su adapter.
 */
import type { Category, Product, Subcategory, Variant } from "@/types";
import { slugify, buildSearchTokens } from "@/lib/utils";

export interface RawVariant {
  sku: string;
  description: string;
  attributes?: Record<string, string>;
  /** Precio de lista en COP (opcional; puede no estar disponible aún). */
  price?: number;
}

export interface RawProduct {
  brandSlug: string;
  category: string;
  subcategory?: string;
  line?: string;
  name: string;
  description?: string;
  applications?: string;
  features?: string[];
  specs?: { key: string; value: string }[];
  dimensions?: { label?: string; value: string }[];
  images?: string[];
  components?: { name: string; qty?: number }[];
  variants: RawVariant[];
  catalogPage?: number;
}

export interface NormalizedCatalog {
  categories: Category[];
  subcategories: Subcategory[];
  products: Product[];
}

export interface BrandAdapter {
  brandSlug: string;
  /** Lee el catálogo fuente y emite productos crudos. */
  parse(source: string | Buffer): Promise<RawProduct[]>;
}

export function normalize(raw: RawProduct[]): NormalizedCatalog {
  const categories = new Map<string, Category>();
  const subcategories = new Map<string, Subcategory>();
  const products: Product[] = [];

  for (const r of raw) {
    const brandId = r.brandSlug;
    const catSlug = slugify(r.category);
    const categoryId = `${brandId}_${catSlug}`;
    if (!categories.has(categoryId)) {
      categories.set(categoryId, {
        id: categoryId,
        brandId,
        name: r.category,
        slug: catSlug,
        order: categories.size + 1,
      });
    }

    let subcategoryId: string | undefined;
    if (r.subcategory) {
      const subSlug = slugify(r.subcategory);
      subcategoryId = `${categoryId}_${subSlug}`;
      if (!subcategories.has(subcategoryId)) {
        subcategories.set(subcategoryId, {
          id: subcategoryId,
          categoryId,
          name: r.subcategory,
          slug: subSlug,
          order: subcategories.size + 1,
        });
      }
    }

    const nameSlug = slugify(r.name);
    const productId = `${categoryId}_${nameSlug}`;
    const variants: Variant[] = r.variants.map((v) => ({
      sku: v.sku,
      description: v.description,
      attributes: v.attributes,
      price: v.price,
      active: true,
    }));

    products.push({
      id: productId,
      brandId,
      categoryId,
      subcategoryId,
      line: r.line,
      name: r.name,
      slug: nameSlug,
      description: r.description,
      applications: r.applications,
      features: r.features,
      specs: r.specs,
      dimensions: r.dimensions,
      images: r.images,
      components: r.components,
      variants,
      catalogPage: r.catalogPage,
      search: buildSearchTokens([
        r.name,
        r.brandSlug,
        r.line,
        r.category,
        r.subcategory,
        r.description,
        ...variants.map((v) => v.sku),
        ...variants.map((v) => v.description),
      ]),
    });
  }

  return {
    categories: [...categories.values()],
    subcategories: [...subcategories.values()],
    products,
  };
}
