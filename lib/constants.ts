/** Configuración global de la plataforma. */

export const SITE = {
  name: "Herrajes",
  shortName: "Herrajes",
  description:
    "Plataforma profesional de herrajes para muebles. Encuentra el herraje adecuado y solicita tu cotización.",
  // Número del vendedor (formato internacional sin +). Override con NEXT_PUBLIC_WHATSAPP.
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "573183484540",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "ventas@ejemplo.com",
} as const;

export function whatsappLink(message: string, phone: string = SITE.whatsapp) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/** Marcas iniciales (fallback si Firestore aún no está poblado). */
export const SEED_BRANDS = [
  { id: "spar", name: "SPAR", slug: "spar", order: 1 },
  { id: "bonuit", name: "BONUIT", slug: "bonuit", order: 2 },
] as const;

/**
 * Marca activa de cara al usuario. La plataforma soporta múltiples marcas a
 * nivel de datos (ver types/index.ts y lib/repos), pero hoy solo se navega y
 * muestra el catálogo de esta marca; el resto queda listo para el futuro sin
 * exponer selección de marca en la interfaz.
 */
export const ACTIVE_BRAND_SLUG = "spar";

/**
 * Taxonomía completa de herrajes (siguiendo el catálogo de Carpincentro).
 * Es la lista canónica y ORDENADA de categorías: las que ya tienen productos
 * cargados se muestran activas; las que aún no, se muestran como
 * "Próximamente". El `slug` debe coincidir con el que genera el normalizador
 * (`slugify`) a partir del nombre de categoría en los datos, para que las
 * categorías con productos queden correctamente enlazadas.
 */
export interface CategoryDef {
  slug: string;
  name: string;
  tagline: string;
}

export const CATEGORY_TAXONOMY: CategoryDef[] = [
  { slug: "rieles", name: "Rieles", tagline: "Para cajones y correderas." },
  { slug: "bisagras", name: "Bisagras", tagline: "Para puertas abatibles." },
  {
    slug: "accesorios-para-cocina",
    name: "Accesorios para cocina",
    tagline: "Organización y aprovechamiento del espacio.",
  },
  {
    slug: "perfileria-de-aluminio",
    name: "Perfilería de aluminio",
    tagline: "Perfiles y marcos en aluminio.",
  },
  { slug: "accesorios-varios", name: "Accesorios varios", tagline: "Complementos de ferretería." },
  { slug: "cajones", name: "Cajones", tagline: "Sistemas y kits de cajón." },
  { slug: "manijas", name: "Manijas", tagline: "Tiradores y manijas para muebles." },
  {
    slug: "brazos-elevables",
    name: "Brazos elevables",
    tagline: "Para puertas plegables y abatibles hacia arriba.",
  },
  { slug: "patas", name: "Patas", tagline: "Patas y niveladores para muebles." },
  {
    slug: "cerraduras-para-puertas",
    name: "Cerraduras para puertas",
    tagline: "Cerraduras y seguridad para puertas.",
  },
  {
    slug: "cerraduras-para-muebles",
    name: "Cerraduras para muebles",
    tagline: "Cerraduras para cajones y muebles.",
  },
  {
    slug: "sistemas-para-closet",
    name: "Sistemas para closet",
    tagline: "Para puertas corredizas y organización de closet.",
  },
  { slug: "tornillos", name: "Tornillos", tagline: "Tornillería y fijación." },
];
