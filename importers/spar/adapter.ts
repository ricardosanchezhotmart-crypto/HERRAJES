/**
 * Adapter SPAR — esqueleto (Fase 2).
 *
 * La implementación real del parseo del catálogo SPAR (PDF/Excel) se realiza en
 * la Fase 5. Aquí queda la interfaz y una muestra derivada del análisis de la
 * Fase 1 (pp. 167–233), para validar el flujo de normalización end-to-end.
 */
import type { BrandAdapter, RawProduct } from "../shared/normalizer";

export const sparAdapter: BrandAdapter = {
  brandSlug: "spar",
  async parse(): Promise<RawProduct[]> {
    // Fase 5: leer el catálogo real y mapear a RawProduct[].
    return SPAR_SAMPLE;
  },
};

/** Muestra tomada del catálogo real (Fase 1) para pruebas de importación. */
export const SPAR_SAMPLE: RawProduct[] = [
  {
    brandSlug: "spar",
    category: "Bisagras",
    subcategory: "Para puertas de paso",
    line: "Omega",
    name: 'Bisagra Omega 3"',
    description:
      "Fabricada en chapa de acero laminada en frío calibre 14. Con recubrimiento electrolítico de Zinc Iris (protege de la corrosión).",
    applications: "Puede utilizarse en puertas de comunicación o puertas de paso piso–techo.",
    features: [
      "Permite un ángulo máximo de apertura de 180°",
      "Diseñada para soportar puertas con peso hasta de 50 Kg",
      "Peso por par: 150 g",
      "Unidad de empaque: Pares",
    ],
    specs: [{ key: "Capacidad de peso", value: "50 Kg" }],
    catalogPage: 169,
    variants: [
      { sku: "10003937", description: "BISAGRA OMEGA 3'' PUERTAS DE PASO NIQUELADA BO-90 NI", attributes: { acabado: "Niquelado" } },
      { sku: "10003938", description: "BISAGRA OMEGA 3'' PUERTAS DE PASO PLATEADA BO-90Z", attributes: { acabado: "Plateado" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Rieles",
    line: "Kit Cajón SPAR",
    name: "Kit Cajón Spar Básico H 90mm 40 Kg-50cm",
    description:
      "Cajón con lata deslizante silenciosa de extracción completa, soporta hasta 40 kg. Sistema de ajuste automático de errores e instalación clip rápida.",
    features: [
      "Acabado: acero con pintura electrostática",
      "Altura de 90 mm",
      "Riel cierre suave sincronizado",
      "Costados en acero",
    ],
    specs: [
      { key: "Capacidad de peso", value: "40 Kg" },
      { key: "Ciclos de vida", value: "100.000" },
    ],
    catalogPage: 184,
    variants: [
      { sku: "10029438", description: "KIT CAJÓN SPAR BÁSICO H 90MM 40 KG-50CM BLANCO", attributes: { acabado: "Blanco" } },
      { sku: "10029439", description: "KIT CAJÓN SPAR BÁSICO H 90MM 40 KG-50CM GRAFITO", attributes: { acabado: "Grafito" } },
    ],
  },
];
