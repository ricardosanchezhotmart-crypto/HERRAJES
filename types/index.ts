/**
 * Modelo de datos unificado para el catálogo de herrajes (SPAR / BONUIT).
 * Diseñado para absorber estructuras heterogéneas entre marcas:
 *  - jerarquía de profundidad variable (categoría con o sin subcategoría)
 *  - especificaciones flexibles clave/valor (no columnas rígidas)
 *  - un producto = una ficha con N variantes vendibles (SKU con Referencia real)
 */

export type BrandSlug = "spar" | "bonuit" | (string & {});

export interface Brand {
  id: string;
  name: string;
  slug: BrandSlug;
  logoUrl?: string;
  description?: string;
  order: number;
}

export interface Category {
  id: string;
  brandId: string;
  name: string;
  slug: string;
  icon?: string;
  description?: string;
  order: number;
}

export interface Subcategory {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  order: number;
}

/** Especificación flexible: cubre peso, ángulo, ciclos, Newtons, etc. */
export interface Spec {
  key: string; // "Capacidad de peso", "Ángulo de apertura", "Ciclos de vida"
  value: string; // "50 Kg", "110°", "100.000"
  icon?: string; // nombre de icono opcional para specs destacadas
}

export interface Dimension {
  label?: string;
  value: string;
}

/** Pieza del despiece (componentes que incluye el producto). */
export interface Component {
  name: string;
  qty?: number;
  imageUrl?: string;
}

/** Variante vendible: aquí vive la Referencia real de 8 dígitos (SKU). */
export interface Variant {
  sku: string; // "10003937" — código de pedido/cotización
  description: string; // "BISAGRA OMEGA 3'' ... NIQUELADA BO-90 NI"
  attributes?: Record<string, string>; // { acabado: "Niquelado", tamaño: "60cm" }
  active: boolean;
}

export interface Product {
  id: string;
  brandId: string;
  categoryId: string;
  subcategoryId?: string;
  line?: string; // "Kinvaro", "Venetto", "Omega", "Torino"
  name: string;
  slug: string;
  description?: string;
  applications?: string;
  features?: string[];
  specs?: Spec[];
  dimensions?: Dimension[];
  dimensionImageUrl?: string;
  images?: string[]; // [principal, ...galería]
  components?: Component[];
  relatedIds?: string[];
  variants?: Variant[]; // embebidas para lectura rápida; también en subcolección
  /** Tokens de búsqueda pre-computados (código, nombre, marca, descripción). */
  search?: string[];
  catalogPage?: number; // trazabilidad con el PDF fuente
}

/* ---------- Pedido / Cotización ---------- */

export interface QuoteItem {
  sku: string;
  productId: string;
  name: string;
  description: string;
  qty: number;
  imageUrl?: string;
}

export type QuoteChannel = "whatsapp" | "email" | "pdf";
export type QuoteStatus = "nuevo" | "en_proceso" | "cerrado";

export interface Quote {
  id: string;
  customer: {
    name: string;
    company?: string;
    phone?: string;
    email?: string;
    notes?: string;
  };
  items: QuoteItem[];
  channel: QuoteChannel;
  status: QuoteStatus;
  createdAt: number;
}

/** Registro de importación de catálogo (trazabilidad / versionado). */
export interface ImportRecord {
  id: string;
  brand: BrandSlug;
  source: string; // nombre de archivo o URL del catálogo
  version: string;
  stats: { categories: number; products: number; variants: number };
  createdAt: number;
}
