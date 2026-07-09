/**
 * API pública del catálogo. Selecciona automáticamente la fuente de datos:
 *  - Firestore, si hay credenciales (`isFirebaseConfigured`)
 *  - datos seed, en caso contrario (desarrollo local sin backend)
 *
 * La UI importa siempre desde aquí, así que cambiar de fuente NO requiere
 * tocar ningún componente ni página.
 */
import { isFirebaseConfigured } from "@/lib/firebase";
import { seedRepo, seedDataset } from "@/lib/repos/seed-repo";
import { firestoreRepo } from "@/lib/repos/firestore-repo";
import type { CatalogRepo } from "@/lib/repos/types";
import type { Product } from "@/types";

const repo: CatalogRepo = isFirebaseConfigured ? firestoreRepo : seedRepo;

export const getBrands = () => repo.getBrands();
export const getBrand = (slug: string) => repo.getBrand(slug);
export const getCategories = (brandSlug?: string) => repo.getCategories(brandSlug);
export const getCategory = (brandSlug: string, categorySlug: string) =>
  repo.getCategory(brandSlug, categorySlug);
export const getSubcategories = (categoryId: string) => repo.getSubcategories(categoryId);
export const getProducts = (filter?: Parameters<CatalogRepo["getProducts"]>[0]) =>
  repo.getProducts(filter);
export const getProduct = (id: string) => repo.getProduct(id);
export const getRelated = (product: Product, limit?: number) => repo.getRelated(product, limit);
export const searchProducts = (query: string, limit?: number) =>
  repo.searchProducts(query, limit);
export const getAllProductIds = () => repo.getAllProductIds();

/** Solo para generación estática de rutas en build (usa seed como base). */
export function getAllProductsSync(): Product[] {
  return seedDataset.products;
}
