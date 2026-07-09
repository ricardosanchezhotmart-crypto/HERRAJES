/** Repositorio basado en los datos seed (modo desarrollo / sin Firebase). */
import { SEED_RAW } from "@/data/seed";
import { normalize } from "@/importers/shared/normalizer";
import { SEED_BRANDS } from "@/lib/constants";
import type { Brand } from "@/types";
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

const dataset: Dataset = {
  brands,
  categories: n.categories,
  subcategories: n.subcategories,
  products: n.products,
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
