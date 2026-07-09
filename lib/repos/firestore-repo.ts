/**
 * Repositorio basado en Firestore. Se activa automáticamente cuando hay
 * credenciales (ver lib/catalog.ts). Descarga el catálogo una vez y lo cachea
 * en memoria del proceso; la búsqueda, filtros y relacionados usan exactamente
 * la misma lógica pura que el seed-repo.
 *
 * El catálogo de una distribuidora es de tamaño moderado (miles de referencias
 * como máximo), por lo que cargarlo completo y filtrar en memoria es simple y
 * rápido. Si en el futuro crece mucho, se migra la búsqueda a Algolia/Typesense
 * sin tocar la UI (misma firma de funciones).
 */
import { collection, getDocs } from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import type { Brand, Category, Product, Subcategory } from "@/types";
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

// Cache por revalidación de proceso (60 s) para no golpear Firestore en cada request.
let cache: { data: Dataset; at: number } | null = null;
const TTL = 60_000;

async function load(): Promise<Dataset> {
  if (cache && Date.now() - cache.at < TTL) return cache.data;
  const db = getDb();
  if (!db) throw new Error("Firestore no está inicializado");

  const [brandsSnap, catsSnap, subsSnap, prodsSnap] = await Promise.all([
    getDocs(collection(db, "brands")),
    getDocs(collection(db, "categories")),
    getDocs(collection(db, "subcategories")),
    getDocs(collection(db, "products")),
  ]);

  const data: Dataset = {
    brands: brandsSnap.docs.map((d) => ({ id: d.id, ...d.data() }) as Brand),
    categories: catsSnap.docs.map((d) => ({ id: d.id, ...d.data() }) as Category),
    subcategories: subsSnap.docs.map((d) => ({ id: d.id, ...d.data() }) as Subcategory),
    products: prodsSnap.docs.map((d) => ({ id: d.id, ...d.data() }) as Product),
  };
  cache = { data, at: Date.now() };
  return data;
}

export const firestoreRepo: CatalogRepo = {
  async getBrands() {
    return queryBrands(await load());
  },
  async getBrand(slug) {
    return queryBrand(await load(), slug);
  },
  async getCategories(brandSlug) {
    return queryCategories(await load(), brandSlug);
  },
  async getCategory(brandSlug, categorySlug) {
    return queryCategory(await load(), brandSlug, categorySlug);
  },
  async getSubcategories(categoryId) {
    return querySubcategories(await load(), categoryId);
  },
  async getProducts(filter?: ProductFilter) {
    return queryProducts(await load(), filter);
  },
  async getProduct(id) {
    return queryProduct(await load(), id);
  },
  async getRelated(product, limit) {
    return queryRelated(await load(), product, limit);
  },
  async searchProducts(query, limit) {
    return querySearch(await load(), query, limit);
  },
  async getAllProductIds() {
    return (await load()).products.map((p) => p.id);
  },
};
