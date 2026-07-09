import type { Brand, Category, Product, Subcategory } from "@/types";
import type { ProductFilter } from "./query";

/** Contrato común de un repositorio de catálogo (seed o Firestore). */
export interface CatalogRepo {
  getBrands(): Promise<Brand[]>;
  getBrand(slug: string): Promise<Brand | undefined>;
  getCategories(brandSlug?: string): Promise<Category[]>;
  getCategory(brandSlug: string, categorySlug: string): Promise<Category | undefined>;
  getSubcategories(categoryId: string): Promise<Subcategory[]>;
  getProducts(filter?: ProductFilter): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getRelated(product: Product, limit?: number): Promise<Product[]>;
  searchProducts(query: string, limit?: number): Promise<Product[]>;
  getAllProductIds(): Promise<string[]>;
}

export type { ProductFilter };
