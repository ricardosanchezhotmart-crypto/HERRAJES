/** Repositorio basado en los datos seed (modo desarrollo / sin Firebase). */
import { SEED_RAW } from "@/data/seed";
import { normalize } from "@/importers/shared/normalizer";
import { attachImages } from "@/data/product-images";
import { SEED_BRANDS, CATEGORY_TAXONOMY, ACTIVE_BRAND_SLUG } from "@/lib/constants";
import type { Brand, Category } from "@/types";
import type { CatalogRepo, ProductFilter } from "./types";
import type { Dataset } from "./query";
import {
  queryBrand,
  queryBrands,
  queryCategories,
  queryCategory,
  queryProduct,
  queryProducts,
  queryRelated,
  querySearch,
  querySubcategories,
} from "./query";

const n = normalize(SEED_RAW);
const brands: Brand[] = SEED_BRANDS.map((b, i) => ({
  id: b.id,
  name: b.name,
  slug: b.slug,
  order: i + 1,
}));

/**
 * Categorías finales = taxonomía canónica (orden + nombres de Carpincentro)
 * fusionada con las categorías derivadas de los productos reales. Una categoría
 * de la taxonomía que tiene productos queda activa; la que no, se marca como
 * `comingSoon` ("Próximamente"), conservando su lugar en el orden.
 */
const derivedBySlug = new Map(n.categories.map((c) => [c.slug, c]));
const categories: Category[] = CATEGORY_TAXONOMY.map((def, i) => {
  const derived = derivedBySlug.get(def.slug);
  if (derived) {
    return { ...derived, name: def.name, description: def.tagline, order: i + 1 };
  }
  return {
    id: `${ACTIVE_BRAND_SLUG}_${def.slug}`,
    brandId: ACTIVE_BRAND_SLUG,
    name: def.name,
    slug: def.slug,
    description: def.tagline,
    order: i + 1,
    comingSoon: true,
  };
});

// Categorías con productos que no estén en la taxonomía (defensivo): se agregan al final.
const taxonomySlugs = new Set(CATEGORY_TAXONOMY.map((d) => d.slug));
n.categories
  .filter((c) => !taxonomySlugs.has(c.slug))
  .forEach((c, i) => categories.push({ ...c, order: CATEGORY_TAXONOMY.length + i + 1 }));

const dataset: Dataset = {
  brands,
  categories,
  subcategories: n.subcategories,
  products: attachImages(n.products),
};

export const seedDataset = dataset;

export const seedRepo: CatalogRepo = {
  async getBrands() {
    return queryBrands(dataset);
  },
  async getBrand(slug) {
    return queryBrand(dataset, slug);
  },
  async getCategories(brandSlug) {
    return queryCategories(dataset, brandSlug);
  },
  async getCategory(brandSlug, categorySlug) {
    return queryCategory(dataset, brandSlug, categorySlug);
  },
  async getSubcategories(categoryId) {
    return querySubcategories(dataset, categoryId);
  },
  async getProducts(filter?: ProductFilter) {
    return queryProducts(dataset, filter);
  },
  async getProduct(id) {
    return queryProduct(dataset, id);
  },
  async getRelated(product, limit) {
    return queryRelated(dataset, product, limit);
  },
  async searchProducts(query, limit) {
    return querySearch(dataset, query, limit);
  },
  async getAllProductIds() {
    return dataset.products.map((p) => p.id);
  },
};
