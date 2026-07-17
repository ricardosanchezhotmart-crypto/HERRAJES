/**
 * Datos seed derivados del catálogo real SPAR (Fase 1, pp. 167–233).
 * Se emiten como RawProduct[] y se pasan por el normalizador compartido,
 * de modo que la UI consume exactamente la misma forma que producirá Firestore.
 */
import type { RawProduct } from "@/importers/shared/normalizer";

export const SEED_RAW: RawProduct[] = [
  /* ================= BISAGRAS — PARA PUERTAS DE PASO ================= */
  {
    brandSlug: "spar",
    category: "Bisagras",
    subcategory: "Para puertas de paso",
    line: "Omega",
    name: 'Bisagra Mini Omega 2"',
    description:
      "Fabricada con chapa de acero laminada en frío calibre 18. Con recubrimiento de Zinc Iris.",
    applications:
      "Especial para puertas pequeñas media altura, recepciones o mostradores y mobiliario en general.",
    features: [
      "Ángulo máximo de apertura de 180°",
      "Soporta puertas con peso hasta de 15 Kg",
      "Peso por par: 26 g",
      "Unidad de empaque: Pares",
    ],
    specs: [{ key: "Capacidad de peso", value: "15 Kg" }],
    catalogPage: 168,
    variants: [
      { sku: "10003934", description: "BISAGRA MINI OMEGA 2'' MUEBLE BO-10" },
    ],
  },
  {
    brandSlug: "spar",
    category: "Bisagras",
    subcategory: "Para puertas de paso",
    line: "Omega",
    name: "Bisagra Omeguita 3 1/2\"",
    description:
      "Fabricada en chapa de acero laminada en frío calibre 16. Recubrimiento electrolítico de Zinc Iris (protege de la corrosión).",
    applications:
      "Especial para puertas de paso a media altura, recepciones o mostradores y mobiliario.",
    features: [
      "Ángulo máximo de apertura de 180°",
      "Soporta puertas con peso hasta de 40 Kg",
      "Peso por par: 80 g",
    ],
    specs: [{ key: "Capacidad de peso", value: "40 Kg" }],
    catalogPage: 168,
    variants: [
      { sku: "10003935", description: "BISAGRA OMEGUITA 3 1/2\" MUEBLE BO-16" },
    ],
  },
  {
    brandSlug: "spar",
    category: "Bisagras",
    subcategory: "Para puertas de paso",
    line: "Omega",
    name: 'Bisagra Omega 3"',
    description:
      "Fabricada en chapa de acero laminada en frío calibre 14. Recubrimiento electrolítico de Zinc Iris (protege de la corrosión).",
    applications: "Puede utilizarse en puertas de comunicación o puertas de paso piso–techo.",
    features: [
      "Ángulo máximo de apertura de 180°",
      "Soporta puertas con peso hasta de 50 Kg",
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
    category: "Bisagras",
    subcategory: "Para puertas de paso",
    line: "Super Omega",
    name: "Bisagra Super Omega 3 1/2\"",
    description:
      "Fabricada en chapa de acero laminada en frío calibre 14. Recubrimiento electrolítico de Zinc Iris.",
    applications: "Puede utilizarse en puertas de comunicación.",
    features: [
      "Ángulo máximo de apertura de 180°",
      "Soporta puertas con peso hasta de 65 Kg",
      "Peso por par: 172 g",
      "Unidad de empaque: 2 pares",
    ],
    specs: [{ key: "Capacidad de peso", value: "65 Kg" }],
    catalogPage: 169,
    variants: [
      { sku: "10003940", description: "BISAGRA SUPER OMEGA 3 1/2\" PUERTAS DE PASO 92/Z" },
      { sku: "10028118", description: "BISAGRA SUPER OMEGA PUERTAS DE PASO ALUMINIO BO-93", attributes: { material: "Aluminio" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Bisagras",
    subcategory: "Para puertas de paso",
    name: "Pivote para puerta de paso",
    description: "En acero con acabado galvanizado y buje en nylon.",
    applications: "Ideal para puertas de paso.",
    features: [
      "Soporta puertas con peso hasta de 80 Kg",
      "Unidad de empaque: Pivote superior e inferior + platina + buje",
    ],
    specs: [{ key: "Capacidad de peso", value: "80 Kg" }],
    catalogPage: 169,
    variants: [
      { sku: "10004065", description: "PIVOTE PUERTA 60MM BUJE 50MM PUERTAS DE PASO PIV50" },
    ],
  },

  /* ================= BISAGRAS — PARA MUEBLE ================= */
  {
    brandSlug: "spar",
    category: "Bisagras",
    subcategory: "Para mueble",
    line: "Torino",
    name: "Bisagra Torino parche y semiparche",
    description: "Fabricada con chapa de acero niquelado. Cazoleta de 35 mm.",
    features: [
      "Ángulo máximo de apertura de 110°",
      "Montaje para puerta de 14 mm - 26 mm",
      "Calibre: 0.6 / 0.9 / 0.9",
    ],
    specs: [
      { key: "Capacidad de peso", value: "5 Kg" },
      { key: "Resistencia a la corrosión", value: "24 hr" },
      { key: "Ciclos de vida", value: "30.000" },
    ],
    catalogPage: 172,
    variants: [
      { sku: "10025237", description: "Bisagra Torino Parche 35MM-110° C/T 4800 4H", attributes: { tipo: "Parche", tornillos: "Con tornillos" } },
      { sku: "10025238", description: "Bisagra Torino Semiparche 35MM-110° C/T 48084 4H", attributes: { tipo: "Semiparche", tornillos: "Con tornillos" } },
      { sku: "10029449", description: "Bisagra Torino Parche 35MM-110° S/T 4800 4H", attributes: { tipo: "Parche", tornillos: "Sin tornillos" } },
      { sku: "10029450", description: "Bisagra Torino Semiparche 35MM-110° S/T 48084 4H", attributes: { tipo: "Semiparche", tornillos: "Sin tornillos" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Bisagras",
    subcategory: "Para mueble",
    name: "Bisagra 3D niquelada negro",
    description:
      "Función de cierre suave bidireccional; ajuste flexible de cobertura 13–21 mm e instalación con clip.",
    features: [
      "Cierre suave y silencioso",
      "Ángulo de apertura de 15° activa el cierre suave (anti-pellizco)",
      "Rango de ajuste trasero 37 -2/+2,5 mm",
    ],
    specs: [
      { key: "Capacidad de peso", value: "5,5 Kg" },
      { key: "Resistencia a la corrosión", value: "72 hr" },
      { key: "Ciclos de vida", value: "50.000" },
    ],
    catalogPage: 172,
    variants: [
      { sku: "10030063", description: "Bisagra 3D Acero Q195 Niquelado Negro", attributes: { acabado: "Niquelado negro" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Bisagras",
    subcategory: "Para mueble",
    line: "Torino",
    name: "Bisagra Torino 165° sin tornillos",
    description: "Fabricada en acero niquelado. Diámetro de cazoleta de 35 mm.",
    applications: "Ideal para puertas de despensa o muebles esquineros.",
    features: [
      "Ángulo máximo de apertura de 165°",
      "Montaje para puerta de 14 mm - 22 mm",
      "Calibre: 0.8 / 1.8 / 1.0",
    ],
    specs: [
      { key: "Capacidad de peso", value: "5 Kg" },
      { key: "Resistencia a la corrosión", value: "24 hr" },
    ],
    catalogPage: 173,
    variants: [
      { sku: "10009361", description: "BISAGRA TORINO 165° PARCHE S/T", attributes: { tipo: "Parche" } },
      { sku: "10009362", description: "BISAGRA TORINO 165° SEMIPARCHE S/T", attributes: { tipo: "Semiparche" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Bisagras",
    subcategory: "Para mueble",
    line: "Mignon",
    name: "Bisagra Spar Mignon",
    description: "Recomendada para muebles metálicos; no requiere perforación de cazoleta.",
    features: ["Ángulo máximo de apertura de 90°", "Montaje para puerta de 18 mm", "Calibre: 1.2"],
    specs: [
      { key: "Capacidad de peso", value: "5 Kg" },
      { key: "Resistencia a la corrosión", value: "24 hr" },
    ],
    catalogPage: 173,
    variants: [{ sku: "10009338", description: "BISAGRA SPAR MIGNON SPAR BM001 S/T" }],
  },
  {
    brandSlug: "spar",
    category: "Bisagras",
    subcategory: "Para mueble",
    line: "Slow Motion",
    name: "Bisagra Spar cierre lento (Slow Motion) clip-on 4 perforaciones",
    description: "Sistema de montaje clip-on. Fabricada en acero niquelado. Cazoleta de 35 mm.",
    features: [
      "Ángulo máximo de apertura de 110°",
      "Montaje para puerta de 14 mm - 26 mm",
      "Sistema de montaje clip-on",
      "Calibre: 0.7 / 1.0 / 1.0",
    ],
    specs: [
      { key: "Capacidad de peso", value: "5 Kg" },
      { key: "Resistencia a la corrosión", value: "24 hr" },
      { key: "Ciclos de vida", value: "50.000" },
    ],
    catalogPage: 174,
    variants: [
      { sku: "10023059", description: "BISAGRA SPAR SLOW MOTION CLIP-ON 35MM SEMIPARCHE C/T 4H", attributes: { tipo: "Semiparche" } },
      { sku: "10023058", description: "BISAGRA SPAR SLOW MOTION CLIP-ON 35MM PARCHE C/T 4H", attributes: { tipo: "Parche" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Bisagras",
    subcategory: "Para mueble",
    name: "Bisagra alta resistencia a la corrosión 72 horas",
    description:
      "Doble recubrimiento de zinc. Ideal para ambientes húmedos (cocinas, baños) y ciudades con alta salinidad.",
    features: [
      "Ángulo máximo de apertura de 110°",
      "Cazoleta de 35 mm",
      "Mayor estabilidad por calibres más gruesos",
    ],
    specs: [
      { key: "Capacidad de peso", value: "5 Kg" },
      { key: "Resistencia a la corrosión", value: "72 hr" },
      { key: "Ciclos de vida", value: "50.000" },
    ],
    catalogPage: 175,
    variants: [
      { sku: "10030062", description: "BISAGRA SPAR 35MM ALTA RESISTENCIA 72H PARCHE 4700 S/T" },
    ],
  },

  /* ================= RIELES / CAJONES ================= */
  {
    brandSlug: "spar",
    category: "Rieles",
    line: "Kit Cajón SPAR",
    name: "Kit Cajón Spar Básico H 90mm 40 Kg-50cm",
    description:
      "Cajón con lata deslizante silenciosa de extracción completa, soporta hasta 40 kg. Ajuste automático de errores e instalación clip rápida.",
    features: [
      "Acabado: acero con pintura electrostática",
      "Altura de 90 mm",
      "Riel cierre suave sincronizado",
      "Contiene contenedores frontales y tapas decorativas",
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
  {
    brandSlug: "spar",
    category: "Rieles",
    line: "Kit Cajón SPAR",
    name: "Kit Cajón Spar Básico H 175mm",
    description:
      "Cajón de extracción completa con lata deslizante silenciosa, soporta hasta 40 kg y ajuste automático de errores.",
    features: [
      "Acabado: acero con pintura electrostática",
      "Altura de 175 mm",
      "Riel cierre suave sincronizado",
    ],
    specs: [{ key: "Capacidad de peso", value: "40 Kg" }],
    catalogPage: 185,
    variants: [
      { sku: "10029441", description: "KIT CAJÓN SPAR BÁSICO H 175MM BLANCO", attributes: { acabado: "Blanco" } },
      { sku: "10029440", description: "KIT CAJÓN SPAR BÁSICO H 175MM GRAFITO", attributes: { acabado: "Grafito" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Rieles",
    line: "Kit Cajón SPAR",
    name: "Kit Cajón Spar Cacerolero H128mm para vidrio",
    description:
      "Diseño con ancho ajustable, lata deslizante silenciadora oculta de extracción completa hasta 40 kg. Compatible con sistema de luz LED.",
    features: [
      "Altura de 128 mm",
      "Riel cierre suave sincronizado",
      "Fácil montaje de luz LED",
    ],
    specs: [{ key: "Capacidad de peso", value: "40 Kg" }],
    catalogPage: 186,
    variants: [
      { sku: "10029442", description: "KIT CAJÓN SPAR CACEROLERO H128MM VIDRIO BLANCO", attributes: { acabado: "Blanco" } },
      { sku: "10029443", description: "KIT CAJÓN SPAR CACEROLERO H128MM VIDRIO GRAFITO", attributes: { acabado: "Grafito" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Rieles",
    line: "Kit Cajón SPAR",
    name: "Galería rectangular Kit Cajón 50 cm",
    description:
      "Accesorio complementario para lograr diferentes alturas en los kits cajón SPAR. Material acero y plástico con pintura electrostática.",
    features: ["Medida: 50 cm", "Fácil instalación"],
    catalogPage: 187,
    variants: [
      { sku: "10029444", description: "GALERÍA RECTANGULAR KIT CAJÓN 50 CM BLANCO SEMIMATE", attributes: { acabado: "Blanco semimate" } },
      { sku: "10029445", description: "GALERÍA RECTANGULAR KIT CAJÓN 50 CM GRAFITO/ANTRACITA", attributes: { acabado: "Grafito/Antracita" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Rieles",
    name: "Accesorio bajo fregadero",
    description:
      "Accesorio plástico bajo fregadero ideal para realizar cajones bajo pocetas. Para melaminas de 15 mm.",
    features: ["Medidas: L175 x W120 x H90", "Fácil instalación"],
    catalogPage: 187,
    variants: [
      { sku: "10029446", description: "ACCESORIO BAJO FREGADERO BLANCO", attributes: { acabado: "Blanco" } },
      { sku: "10029447", description: "ACCESORIO BAJO FREGADERO GRAFITO", attributes: { acabado: "Grafito" } },
    ],
  },

  /* ================= BRAZOS ELEVABLES ================= */
  {
    brandSlug: "spar",
    category: "Brazos elevables",
    line: "Kinvaro",
    name: "Brazo elevable paralelo Kinvaro L-80",
    description:
      "Apertura paralela vertical que optimiza el espacio superior. Ideal para gabinetes con varias funciones. Cierre lento y graduación de altura 3D.",
    features: [
      "La puerta se mantiene segura en cualquier posición",
      "Fuerza del muelle regulable",
      "Ancho de puerta entre 45–120 cm",
      "Altura desde 41 cm hasta 60 cm",
    ],
    specs: [{ key: "Ajuste", value: "3D" }],
    catalogPage: 191,
    variants: [
      { sku: "10009305", description: "BRAZO ELEVABLE PARALELO KINVARO L-80 MUELLE B/A", attributes: { muelle: "B / A" } },
      { sku: "10009302", description: "BRAZO ELEVABLE PARALELO KINVARO L-80 MUELLE C", attributes: { muelle: "C" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Brazos elevables",
    line: "Kinvaro",
    name: "Brazo elevable Kinvaro S-35",
    description:
      "Sistema de apertura oscilante superior, ideal para recintos piso-techo. Silencioso, con cierre suave y apertura regulable.",
    features: [
      "Se mantiene segura a partir de 45° de apertura",
      "Graduación en 3D",
      "Ancho de puerta entre 45–120 cm",
      "Altura desde 42 cm hasta 75 cm",
    ],
    specs: [{ key: "Ajuste", value: "3D" }],
    catalogPage: 192,
    variants: [
      { sku: "10009303", description: "BRAZO ELEVABLE KINVARO S-35 MUELLE B", attributes: { muelle: "B" } },
      { sku: "10009304", description: "BRAZO ELEVABLE KINVARO S-35 MUELLE C", attributes: { muelle: "C" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Brazos elevables",
    line: "SPAR Eco",
    name: "Brazo Spar abatible 110° Eco cierre lento",
    description:
      "Brazo para gabinetes con apertura silenciosa y cierre lento. Material acero y plástico, acabado gris plata, con freno estacional.",
    features: [
      "Para gabinetes de 90 cm de ancho",
      "Espesor de puerta 16–22 mm",
      "Ajuste de instalación 3D (2 mm en 3 sentidos)",
    ],
    specs: [
      { key: "Capacidad de peso", value: "2-5 Kg" },
      { key: "Ángulo de apertura", value: "110°" },
    ],
    catalogPage: 193,
    variants: [{ sku: "10022481", description: "BRAZO SPAR ABATIBLE 110° ECO" }],
  },
  {
    brandSlug: "spar",
    category: "Brazos elevables",
    line: "SPAR Eco",
    name: "Brazo Spar plegable Eco cierre lento",
    description:
      "Para adicionar movimiento a puertas horizontales y plegarlas. Sistema de cierre lento, acabado gris plata.",
    features: ["Material: acero y plástico", "Movimiento continuo", "Fácil instalación"],
    catalogPage: 193,
    variants: [
      { sku: "10025197", description: "BRAZO SPAR PLEGABLE ECO 600–650 mm (5.4–7 Kg)", attributes: { altura: "600–650 mm" } },
      { sku: "10022480", description: "BRAZO SPAR PLEGABLE ECO 700–850 mm (7.1–8 Kg)", attributes: { altura: "700–850 mm" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Brazos elevables",
    name: "Brazo neumático Spar",
    description:
      "Brazo elevable para gabinetes altos con apertura perpendicular al mueble y cierre normal. Acabado gris plata.",
    features: ["Movimiento suave por gas interior en el pistón"],
    specs: [{ key: "Capacidad de peso", value: "5-10 Kg" }],
    catalogPage: 194,
    variants: [
      { sku: "10020764", description: "BRAZO NEUMÁTICO SPAR 60 N (5–6 Kg)", attributes: { fuerza: "60 N" } },
      { sku: "10009368", description: "BRAZO NEUMÁTICO SPAR 80 N (6.5–8 Kg)", attributes: { fuerza: "80 N" } },
      { sku: "10009367", description: "BRAZO NEUMÁTICO SPAR 100 N (8.5–10 Kg)", attributes: { fuerza: "100 N" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Brazos elevables",
    name: "Brazo neumático Spar cierre lento",
    description:
      "Brazo elevable para gabinetes altos con apertura perpendicular y amortiguación de cierre lento. Acabado gris plata.",
    specs: [{ key: "Capacidad de peso", value: "5-10 Kg" }],
    catalogPage: 194,
    variants: [
      { sku: "10022482", description: "BRAZO NEUMÁTICO SPAR CIERRE LENTO 60 N", attributes: { fuerza: "60 N" } },
      { sku: "10022483", description: "BRAZO NEUMÁTICO SPAR CIERRE LENTO 80 N", attributes: { fuerza: "80 N" } },
      { sku: "10022484", description: "BRAZO NEUMÁTICO SPAR CIERRE LENTO 100 N", attributes: { fuerza: "100 N" } },
    ],
  },

  /* ================= SISTEMAS PARA CLOSET ================= */
  {
    brandSlug: "spar",
    category: "Sistemas para closet",
    line: "Venetto",
    name: "Sistema corredizo colgante SD Closet Venetto simple",
    description: "Sistema corredizo colgante para 2 puertas, dentro del vano. Utiliza riel U20.",
    features: ["Cantidad de puertas: 2", "Espesor de puerta: 15–30 mm", "Suavidad de rodadura"],
    specs: [{ key: "Capacidad de peso", value: "30 Kg" }],
    applications: "Ideal para puertas de closet.",
    catalogPage: 212,
    variants: [{ sku: "10022068", description: "SISTEMA CORREDIZO COLGANTE SD CLOSET VENETTO 002050" }],
  },
  {
    brandSlug: "spar",
    category: "Sistemas para closet",
    line: "Venetto",
    name: "Riel en U-20",
    description:
      "Geometría del riel y alineamiento de guía al piso para mayor seguridad de sujeción. Guía al piso ajustable.",
    catalogPage: 212,
    variants: [
      { sku: "10022064", description: "RIEL EN U-20 X 2MTS ALUMINIO VENETTO 005264", attributes: { longitud: "2 m" } },
      { sku: "10022065", description: "RIEL EN U-20 X 3MTS ALUMINIO VENETTO 005265", attributes: { longitud: "3 m" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Sistemas para closet",
    line: "Venetto",
    name: "Sistema corredizo para madera SD 80 con freno",
    description:
      "Sistema corredizo para 1 puerta, fuera y dentro del vano. Utiliza riel U100. Con freno.",
    features: ["Cantidad de puertas: 1", "Espesor de puerta: 30 mm"],
    applications: "Ideal para puertas de paso y puertas embutidas.",
    specs: [{ key: "Capacidad de peso", value: "80 Kg" }],
    catalogPage: 213,
    variants: [{ sku: "10022071", description: "SISTEMA CORREDIZO SD 80 CON FRENO VENETTO 002053" }],
  },
  {
    brandSlug: "spar",
    category: "Sistemas para closet",
    name: "Riel en U-100",
    description:
      "Placa de montaje que permite insertar el perno de manera frontal; se puede apernar o soldar. Guía al piso.",
    catalogPage: 213,
    variants: [
      { sku: "10022066", description: "RIEL EN U-100 X 2MTS ALUMINIO VENETTO 007758", attributes: { longitud: "2 m", material: "Aluminio" } },
      { sku: "10004032", description: "RIEL EN U-100 X 2MTS GALVANIZADO DUCASSE 10100608301", attributes: { longitud: "2 m", material: "Galvanizado" } },
      { sku: "10022067", description: "RIEL EN U-100 X 3MTS ALUMINIO VENETTO 008039", attributes: { longitud: "3 m", material: "Aluminio" } },
      { sku: "10004033", description: "RIEL EN U-100 X 3MTS GALVANIZADO DUCASSE 10100608302", attributes: { longitud: "3 m", material: "Galvanizado" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Sistemas para closet",
    line: "Venetto",
    name: "Sistema corredizo para madera SD 25",
    description:
      "No requiere riel metálico; se maquina ranura en base y techo del mueble. Para 2 puertas dentro del vano.",
    features: ["Cantidad de puertas: 2", "Espesor de puerta: 15 mm"],
    applications: "Ideal para muebles de cocina y oficina.",
    specs: [{ key: "Capacidad de peso", value: "25 Kg" }],
    catalogPage: 214,
    variants: [{ sku: "10022072", description: "SISTEMA CORREDIZO PARA MUEBLES SD 25 VENETTO 002054" }],
  },
  {
    brandSlug: "spar",
    category: "Sistemas para closet",
    line: "Venetto",
    name: "Sistema corredizo para mueble SD 50",
    description: "Sistema corredizo de closet que se puede instalar con carga al piso. Para 2 puertas.",
    features: ["Cantidad de puertas: 2", "Espesor de puerta: 15–30 mm"],
    specs: [{ key: "Capacidad de peso", value: "50 Kg" }],
    catalogPage: 215,
    variants: [{ sku: "10023118", description: "SISTEMA CORREDIZO PARA MUEBLE SD 50 VENETTO 2895" }],
  },
  {
    brandSlug: "spar",
    category: "Sistemas para closet",
    name: "Tubo ovalado para closet cromado y soporte",
    description:
      "Tubo cromado de 3 m para colgar ropa en closet, con soporte para anclar a pared.",
    catalogPage: 214,
    variants: [
      { sku: "10009769", description: "TUBO OVALADO PARA CLOSET CROMADO SPAR", attributes: { tipo: "Tubo" } },
      { sku: "10009768", description: "SOPORTE PARA TUBO OVALADO DE CLOSET SPAR", attributes: { tipo: "Soporte" } },
    ],
  },

  /* ================= ACCESORIOS PARA COCINA ================= */
  {
    brandSlug: "spar",
    category: "Accesorios para cocina",
    name: "Vajillero Spar en acero inoxidable",
    description:
      "Bandeja en acero inoxidable, plegable y graduable 2 mm al ancho del mueble. Fácil limpieza.",
    features: ["Plegable", "Incluye platero, portavasos y bandeja"],
    catalogPage: 226,
    variants: [
      { sku: "10009430", description: "VAJILLERO SPAR INOX MÓDULO 60 CM", attributes: { modulo: "60 cm" } },
      { sku: "10009431", description: "VAJILLERO SPAR INOX MÓDULO 70 CM", attributes: { modulo: "70 cm" } },
      { sku: "10009432", description: "VAJILLERO SPAR INOX MÓDULO 80 CM", attributes: { modulo: "80 cm" } },
      { sku: "10009433", description: "VAJILLERO SPAR INOX MÓDULO 90 CM", attributes: { modulo: "90 cm" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Accesorios para cocina",
    name: "Cubiertero Spar en acero inoxidable",
    description:
      "Cubiertero modular para organizar utensilios; protege los muebles de la humedad. Bandejas intercambiables.",
    features: ["Modular", "Bandejas intercambiables"],
    catalogPage: 226,
    variants: [
      { sku: "10009416", description: "CUBIERTERO SPAR INOX 4 ESPACIOS", attributes: { espacios: "4" } },
      { sku: "10009415", description: "CUBIERTERO SPAR INOX 6 ESPACIOS", attributes: { espacios: "6" } },
      { sku: "10009417", description: "CUBIERTERO SPAR INOX 8 ESPACIOS", attributes: { espacios: "8" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Accesorios para cocina",
    name: "Cubiertero plástico",
    description: "Cubiertero monoconcha para organizar utensilios; pestaña de 2 cm ajustable al cajón.",
    catalogPage: 227,
    variants: [
      { sku: "10009410", description: "CUBIERTERO PLÁSTICO 3 ESPACIOS P48xA38xH5cm", attributes: { espacios: "3" } },
      { sku: "10009411", description: "CUBIERTERO PLÁSTICO 3 ESPACIOS P48xA43xH5cm", attributes: { espacios: "3" } },
      { sku: "10009412", description: "CUBIERTERO PLÁSTICO 4 ESPACIOS P48xA53xH5cm", attributes: { espacios: "4" } },
      { sku: "10009414", description: "CUBIERTERO PLÁSTICO 6 ESPACIOS P48xA73xH5cm", attributes: { espacios: "6" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Accesorios para cocina",
    name: "Esquina mágica Spar gris grafito cierre lento",
    description:
      "Accesorio para aprovechar esquinas de difícil almacenamiento, base en melamina de fácil limpieza. Cierre lento antideslizante.",
    features: ["Gran accesibilidad", "Optimiza el espacio reducido", "Espacio de salida 450–500 mm"],
    catalogPage: 228,
    variants: [
      { sku: "10030064-D", description: "ESQUINA MÁGICA SPAR GRIS GRAFITO / DERECHA", attributes: { orientacion: "Derecha" } },
      { sku: "10030064-I", description: "ESQUINA MÁGICA SPAR GRIS GRAFITO / IZQUIERDA", attributes: { orientacion: "Izquierda" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Accesorios para cocina",
    name: "Botellero 2 niveles Spar cierre lento",
    description:
      "Accesorio para organizar especias, botellas y condimentos. Fácil limpieza y sistema de cierre lento.",
    features: ["Sistema cierre lento", "Incluye 1 par de rieles y estructura con dos canastillas"],
    catalogPage: 228,
    variants: [
      { sku: "10030066", description: "BOTELLERO 2 NIVELES SPAR CIERRE LENTO MOD 15CM GRAFITO", attributes: { acabado: "Grafito", modulo: "15 cm" } },
      { sku: "10009460", description: "BOTELLERO 2 NIVELES SPAR CIERRE LENTO CROMADO MOD 150MM", attributes: { acabado: "Cromado", modulo: "15 cm" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Accesorios para cocina",
    name: "Despensa abatible grafito melamina gris",
    description:
      "Despensa abatible con base en melamina color grafito. Riel de extracción para movimiento y funcionalidad.",
    features: [
      "Estructura acero pintura electrostática",
      "6 canastillas interiores + 6 para puerta + brazos",
      "No incluye bisagras (sugerida clip-on cierre lento 10009346)",
    ],
    specs: [{ key: "Módulo", value: "45 cm" }],
    catalogPage: 229,
    variants: [
      { sku: "10030065", description: "DESPENSA ABATIBLE GRAFITO 45CM P514 x A450 x H1820 mm" },
    ],
  },
  {
    brandSlug: "spar",
    category: "Accesorios para cocina",
    name: "Esquina mágica cromada cierre lento",
    description: "Accesorio cromado para aprovechar esquinas de difícil almacenamiento. Espacio de puerta 450 mm mínimo.",
    features: ["Gran accesibilidad", "Estructura acero redondo cromado"],
    catalogPage: 230,
    variants: [
      { sku: "10009457", description: "ESQUINA MÁGICA CROMADA CIERRE LENTO IZQUIERDA", attributes: { orientacion: "Izquierda" } },
      { sku: "10009458", description: "ESQUINA MÁGICA CROMADA CIERRE LENTO DERECHA", attributes: { orientacion: "Derecha" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Accesorios para cocina",
    name: "Canastillas cromadas Spar",
    description:
      "Canastilla cromada ideal para organizar alimentos y mantenerlos frescos con ventilación. Cierre normal y cierre lento.",
    features: ["Estructura metálica cromada", "Fácil limpieza"],
    catalogPage: 230,
    variants: [
      { sku: "10009451", description: "CANASTILLA CROMADA CIERRE NORMAL 400 mm", attributes: { cierre: "Normal", modulo: "400 mm" } },
      { sku: "10009448", description: "CANASTILLA CROMADA CIERRE NORMAL 450 mm", attributes: { cierre: "Normal", modulo: "450 mm" } },
      { sku: "10009449", description: "CANASTILLA CROMADA CIERRE NORMAL 500 mm", attributes: { cierre: "Normal", modulo: "500 mm" } },
      { sku: "10009450", description: "CANASTILLA CROMADA CIERRE NORMAL 600 mm", attributes: { cierre: "Normal", modulo: "600 mm" } },
      { sku: "10025198", description: "CANASTILLA CROMADA CIERRE LENTO 400 mm", attributes: { cierre: "Lento", modulo: "400 mm" } },
      { sku: "10025199", description: "CANASTILLA CROMADA CIERRE LENTO 450 mm", attributes: { cierre: "Lento", modulo: "450 mm" } },
      { sku: "10025200", description: "CANASTILLA CROMADA CIERRE LENTO 500 mm", attributes: { cierre: "Lento", modulo: "500 mm" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Accesorios para cocina",
    name: "Despensa deslizante frontal 5C cierre lento",
    description:
      "Despensa deslizante frontal cromada con riel de extracción frontal. Fondo de acero redondo cromado.",
    features: ["5 canastas interiores", "Guías de desplazamiento + riel superior e inferior"],
    specs: [{ key: "Módulo", value: "400 mm" }],
    catalogPage: 231,
    variants: [
      { sku: "10022802", description: "DESPENSA DESLIZANTE FRONTAL 5C ACERO CROMADA 400mm" },
    ],
  },
  {
    brandSlug: "spar",
    category: "Accesorios para cocina",
    name: "Caneca de reciclaje Spar",
    description:
      "Control de olores, fácil manipulación y gran capacidad. Riel lateral cierre lento, cubetas extraíbles con manija en PVC y tapa antiolores.",
    features: ["Material: PVC", "Riel lateral cierre lento", "Fácil instalación"],
    catalogPage: 232,
    variants: [
      { sku: "10009423", description: "CANECA DE RECICLAJE SPAR CIERRE LENTO MOD 400mm (2 cubetas)", attributes: { divisiones: "2" } },
      { sku: "10029476", description: "CANECA DE RECICLAJE SPAR CIERRE LENTO 40CM 3 DIVISIONES (1x20L + 2x10L)", attributes: { divisiones: "3" } },
    ],
  },

  /* ================= MANIJAS ================= */
  {
    brandSlug: "spar",
    category: "Manijas",
    name: "Manija Steel Light Liviana",
    specs: [{ key: "Material", value: "Acero" }, { key: "Acabado", value: "Acero satinado" }],
    catalogPage: 33,
    variants: [
      { sku: "10009577", description: "Manija Steel Light Liviana 96 mm", attributes: { medida: "96 mm" } },
      { sku: "10009579", description: "Manija Steel Light Liviana 128 mm", attributes: { medida: "128 mm" } },
      { sku: "10009581", description: "Manija Steel Light Liviana 160 mm", attributes: { medida: "160 mm" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Manijas",
    name: "Manija Steel Light Línea Pesada",
    specs: [{ key: "Material", value: "Acero" }, { key: "Acabado", value: "Acero satinado" }],
    catalogPage: 33,
    variants: [
      { sku: "10009576", description: "Manija Steel Light Línea Pesada 96 mm", attributes: { medida: "96 mm" } },
      { sku: "10009578", description: "Manija Steel Light Línea Pesada 128 mm", attributes: { medida: "128 mm" } },
      { sku: "10009582", description: "Manija Steel Light Línea Pesada 192 mm", attributes: { medida: "192 mm" } },
      { sku: "10009583", description: "Manija Steel Light Línea Pesada 256 mm", attributes: { medida: "256 mm" } },
      { sku: "10009584", description: "Manija Steel Light Línea Pesada 320 mm", attributes: { medida: "320 mm" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Manijas",
    name: "Manija Fit Line Aluminium Serie 34",
    specs: [{ key: "Material", value: "Aluminio" }, { key: "Acabado", value: "Anodizado" }],
    catalogPage: 34,
    variants: [
      { sku: "10009605", description: "Manija Fit Line Aluminium Serie 34 32 mm", attributes: { medida: "32 mm" } },
      { sku: "10009898", description: "Manija Fit Line Aluminium Serie 34 64 mm", attributes: { medida: "64 mm" } },
      { sku: "10009476", description: "Manija Fit Line Aluminium Serie 34 96 mm", attributes: { medida: "96 mm" } },
      { sku: "10009477", description: "Manija Fit Line Aluminium Serie 34 128 mm", attributes: { medida: "128 mm" } },
      { sku: "10009606", description: "Manija Fit Line Aluminium Serie 34 160 mm", attributes: { medida: "160 mm" } },
      { sku: "10009607", description: "Manija Fit Line Aluminium Serie 34 240 mm", attributes: { medida: "240 mm" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Manijas",
    name: "Manija Arco Satinada",
    specs: [{ key: "Material", value: "Zinc" }, { key: "Acabado", value: "Satinado" }],
    catalogPage: 34,
    variants: [
      { sku: "10009565", description: "Manija Arco Satinada 64 mm", attributes: { medida: "64 mm" } },
      { sku: "10009566", description: "Manija Arco Satinada 96 mm", attributes: { medida: "96 mm" } },
      { sku: "10009567", description: "Manija Arco Satinada 128 mm", attributes: { medida: "128 mm" } },
      { sku: "10009569", description: "Manija Arco Satinada 160 mm", attributes: { medida: "160 mm" } },
      { sku: "10009568", description: "Manija Arco Satinada 224 mm", attributes: { medida: "224 mm" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Manijas",
    name: "Manija Cubik",
    specs: [{ key: "Material", value: "Aluminio" }, { key: "Acabado", value: "Satinado" }],
    catalogPage: 35,
    variants: [
      { sku: "10009484", description: "Manija Cubik 128 mm", attributes: { medida: "128 mm" } },
      { sku: "10009485", description: "Manija Cubik 160 mm", attributes: { medida: "160 mm" } },
      { sku: "10009486", description: "Manija Cubik 256 mm", attributes: { medida: "256 mm" } },
      { sku: "10009487", description: "Manija Cubik 320 mm", attributes: { medida: "320 mm" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Manijas",
    name: "Manija Fit Line Serie 900",
    specs: [{ key: "Material", value: "Aluminio" }, { key: "Acabado", value: "Satinado" }],
    catalogPage: 35,
    variants: [
      { sku: "10009554", description: "Manija Fit Line Serie 900 96 mm", attributes: { medida: "96 mm" } },
      { sku: "10009555", description: "Manija Fit Line Serie 900 128 mm", attributes: { medida: "128 mm" } },
      { sku: "10009556", description: "Manija Fit Line Serie 900 160 mm", attributes: { medida: "160 mm" } },
      { sku: "10009558", description: "Manija Fit Line Serie 900 320 mm", attributes: { medida: "320 mm" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Manijas",
    name: "Manija Embebida Bellfort SPAR",
    specs: [{ key: "Material", value: "Acero" }, { key: "Acabado", value: "Satinado" }],
    catalogPage: 36,
    variants: [
      { sku: "10022490", description: "Manija Embebida Bellfort SPAR 12 mm", attributes: { medida: "12 mm" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Manijas",
    name: "Manija Striped",
    specs: [{ key: "Material", value: "Aluminio" }, { key: "Acabado", value: "Negro" }],
    catalogPage: 36,
    variants: [
      { sku: "10009480", description: "Manija Striped 96 mm", attributes: { medida: "96 mm" } },
      { sku: "10009481", description: "Manija Striped 128 mm", attributes: { medida: "128 mm" } },
      { sku: "10009482", description: "Manija Striped 160 mm", attributes: { medida: "160 mm" } },
      { sku: "10009483", description: "Manija Striped 256 mm", attributes: { medida: "256 mm" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Manijas",
    name: "Manija Fit Line Cromada",
    specs: [{ key: "Material", value: "Aluminio" }, { key: "Acabado", value: "Cromada" }],
    catalogPage: 37,
    variants: [
      { sku: "10009559", description: "Manija Fit Line Cromada 96 mm", attributes: { medida: "96 mm" } },
      { sku: "10009560", description: "Manija Fit Line Cromada 128 mm", attributes: { medida: "128 mm" } },
      { sku: "10009561", description: "Manija Fit Line Cromada 160 mm", attributes: { medida: "160 mm" } },
      { sku: "10009562", description: "Manija Fit Line Cromada 256 mm", attributes: { medida: "256 mm" } },
      { sku: "10009563", description: "Manija Fit Line Cromada 320 mm", attributes: { medida: "320 mm" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Manijas",
    name: "Manija Pont",
    specs: [{ key: "Material", value: "Aluminio" }, { key: "Acabado", value: "Satinado" }],
    catalogPage: 37,
    variants: [
      { sku: "10009509", description: "Manija Pont 128 mm", attributes: { medida: "128 mm" } },
      { sku: "10009510", description: "Manija Pont 160 mm", attributes: { medida: "160 mm" } },
      { sku: "10009511", description: "Manija Pont 256 mm", attributes: { medida: "256 mm" } },
      { sku: "10009512", description: "Manija Pont 320 mm", attributes: { medida: "320 mm" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Manijas",
    name: "Manija Convex",
    specs: [{ key: "Material", value: "Aluminio" }, { key: "Acabado", value: "Satinado" }],
    catalogPage: 38,
    variants: [
      { sku: "10009840", description: "Manija Convex 96 mm", attributes: { medida: "96 mm" } },
      { sku: "10009841", description: "Manija Convex 128 mm", attributes: { medida: "128 mm" } },
      { sku: "10009842", description: "Manija Convex 256 mm", attributes: { medida: "256 mm" } },
      { sku: "10009843", description: "Manija Convex 320 mm", attributes: { medida: "320 mm" } },
      { sku: "10009844", description: "Manija Convex 544 mm", attributes: { medida: "544 mm" } },
      { sku: "10009845", description: "Manija Convex 608 mm", attributes: { medida: "608 mm" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Manijas",
    name: "Manija Ben",
    specs: [{ key: "Material", value: "Aluminio" }, { key: "Acabado", value: "Satinado" }],
    catalogPage: 38,
    variants: [
      { sku: "10009502", description: "Manija Ben 96 mm", attributes: { medida: "96 mm" } },
      { sku: "10009503", description: "Manija Ben 128 mm", attributes: { medida: "128 mm" } },
      { sku: "10009504", description: "Manija Ben 160 mm", attributes: { medida: "160 mm" } },
      { sku: "10009505", description: "Manija Ben 256 mm", attributes: { medida: "256 mm" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Manijas",
    name: "Manija Piazza",
    specs: [{ key: "Material", value: "Aluminio" }, { key: "Acabado", value: "Satinado" }],
    catalogPage: 39,
    variants: [
      { sku: "10009492", description: "Manija Piazza 96 mm", attributes: { medida: "96 mm" } },
      { sku: "10009493", description: "Manija Piazza 128 mm", attributes: { medida: "128 mm" } },
      { sku: "10009494", description: "Manija Piazza 160 mm", attributes: { medida: "160 mm" } },
      { sku: "10009495", description: "Manija Piazza 256 mm", attributes: { medida: "256 mm" } },
      { sku: "10009496", description: "Manija Piazza 320 mm", attributes: { medida: "320 mm" } },
      { sku: "10009497", description: "Manija Piazza 416 mm", attributes: { medida: "416 mm" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Manijas",
    name: "Manija Mediteráneo Serie 792",
    specs: [{ key: "Material", value: "Aluminio" }, { key: "Acabado", value: "Anodizado y puntas cromadas" }],
    catalogPage: 39,
    variants: [
      { sku: "10009525", description: "Manija Mediteráneo Serie 792 128 mm", attributes: { medida: "128 mm" } },
      { sku: "10009526", description: "Manija Mediteráneo Serie 792 160 mm", attributes: { medida: "160 mm" } },
      { sku: "10009527", description: "Manija Mediteráneo Serie 792 256 mm", attributes: { medida: "256 mm" } },
      { sku: "10009528", description: "Manija Mediteráneo Serie 792 320 mm", attributes: { medida: "320 mm" } },
      { sku: "10009529", description: "Manija Mediteráneo Serie 792 448 mm", attributes: { medida: "448 mm" } },
      { sku: "10009530", description: "Manija Mediteráneo Serie 792 544 mm", attributes: { medida: "544 mm" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Manijas",
    name: "Manija Coral Para Empotrar",
    specs: [{ key: "Material", value: "Aluminio" }, { key: "Acabado", value: "Anodizado" }],
    catalogPage: 40,
    variants: [
      { sku: "10009587", description: "Manija Coral Para Empotrar 96 mm", attributes: { medida: "96 mm" } },
      { sku: "10009588", description: "Manija Coral Para Empotrar 128 mm", attributes: { medida: "128 mm" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Manijas",
    name: "Manija Lite",
    specs: [{ key: "Material", value: "Aluminio" }, { key: "Acabado", value: "Satinado" }],
    catalogPage: 40,
    variants: [
      { sku: "10009498", description: "Manija Lite 128 mm", attributes: { medida: "128 mm" } },
      { sku: "10009500", description: "Manija Lite 192 mm", attributes: { medida: "192 mm" } },
      { sku: "10009501", description: "Manija Lite 256 mm", attributes: { medida: "256 mm" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Manijas",
    name: "Manija Dome",
    specs: [{ key: "Material", value: "Aluminio" }, { key: "Acabado", value: "Anodizado" }],
    catalogPage: 41,
    variants: [
      { sku: "19575", description: "Manija Dome 192 mm", attributes: { medida: "192 mm" } },
      { sku: "19572", description: "Manija Dome 96 mm", attributes: { medida: "96 mm" } },
      { sku: "19573", description: "Manija Dome 128 mm", attributes: { medida: "128 mm" } },
      { sku: "19574", description: "Manija Dome 160 mm", attributes: { medida: "160 mm" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Manijas",
    name: "Manija Media Luna",
    specs: [{ key: "Material", value: "Aluminio" }, { key: "Acabado", value: "Satinado" }],
    catalogPage: 41,
    variants: [
      { sku: "10009608", description: "Manija Media Luna 90 mm", attributes: { medida: "90 mm" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Manijas",
    name: "Manija New York",
    specs: [{ key: "Material", value: "Aluminio" }, { key: "Acabado", value: "Satinado" }],
    catalogPage: 42,
    variants: [
      { sku: "10009522", description: "Manija New York 160 mm", attributes: { medida: "160 mm" } },
      { sku: "10009523", description: "Manija New York 256 mm", attributes: { medida: "256 mm" } },
      { sku: "10009524", description: "Manija New York 320 mm", attributes: { medida: "320 mm" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Manijas",
    name: "Manija Extender Serie 76",
    specs: [{ key: "Material", value: "Aluminio" }, { key: "Acabado", value: "Satinado" }],
    catalogPage: 42,
    variants: [
      { sku: "10009518", description: "Manija Extender Serie 76 128 mm", attributes: { medida: "128 mm" } },
      { sku: "10009519", description: "Manija Extender Serie 76 160 mm", attributes: { medida: "160 mm" } },
      { sku: "10009520", description: "Manija Extender Serie 76 256 mm", attributes: { medida: "256 mm" } },
      { sku: "10009521", description: "Manija Extender Serie 76 320 mm", attributes: { medida: "320 mm" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Manijas",
    name: "Manija Doppia",
    specs: [{ key: "Material", value: "Aluminio" }, { key: "Acabado", value: "Satinado" }],
    catalogPage: 42,
    variants: [
      { sku: "10009534", description: "Manija Doppia 128 mm", attributes: { medida: "128 mm" } },
      { sku: "10009536", description: "Manija Doppia 160 mm", attributes: { medida: "160 mm" } },
      { sku: "10009537", description: "Manija Doppia 256 mm", attributes: { medida: "256 mm" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Manijas",
    name: "Manija Oval Line",
    specs: [{ key: "Material", value: "Aluminio" }, { key: "Acabado", value: "Satinado" }],
    catalogPage: 43,
    variants: [
      { sku: "10009547", description: "Manija Oval Line 96 mm", attributes: { medida: "96 mm" } },
      { sku: "10009548", description: "Manija Oval Line 128 mm", attributes: { medida: "128 mm" } },
      { sku: "10009549", description: "Manija Oval Line 160 mm", attributes: { medida: "160 mm" } },
      { sku: "10009550", description: "Manija Oval Line 192 mm", attributes: { medida: "192 mm" } },
      { sku: "10009551", description: "Manija Oval Line 256 mm", attributes: { medida: "256 mm" } },
      { sku: "10009552", description: "Manija Oval Line 320 mm", attributes: { medida: "320 mm" } },
      { sku: "10009553", description: "Manija Oval Line 608 mm", attributes: { medida: "608 mm" } },
    ],
  },
  {
    brandSlug: "spar",
    category: "Manijas",
    name: "Botón Tiradera Esparta",
    specs: [{ key: "Material", value: "Zamac" }, { key: "Acabado", value: "Satinado" }],
    catalogPage: 43,
    variants: [
      { sku: "10009609", description: "Botón Tiradera Esparta" },
    ],
  },
];
