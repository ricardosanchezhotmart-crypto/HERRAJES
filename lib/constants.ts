/** Configuración global de la plataforma. */

export const SITE = {
  name: "Herrajes SPAR · BONUIT",
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
