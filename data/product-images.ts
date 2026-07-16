/**
 * Manifiesto de imagenes de producto extraidas del catalogo SPAR (referencia).
 * Generado desde el PDF oficial. Las fotos viven en /public/products/<id>.jpg.
 * Para reemplazar por fotos propias, sustituye el archivo con el mismo nombre.
 */
import type { Product } from "@/types";

export const PRODUCT_IMAGE_IDS = new Set<string>([
  "spar_accesorios-para-cocina_botellero-2-niveles-spar-cierre-lento",
  "spar_accesorios-para-cocina_canastillas-cromadas-spar",
  "spar_accesorios-para-cocina_caneca-de-reciclaje-spar",
  "spar_accesorios-para-cocina_cubiertero-plastico",
  "spar_accesorios-para-cocina_cubiertero-spar-en-acero-inoxidable",
  "spar_accesorios-para-cocina_despensa-abatible-grafito-melamina-gris",
  "spar_accesorios-para-cocina_despensa-deslizante-frontal-5c-cierre-lento",
  "spar_accesorios-para-cocina_esquina-magica-cromada-cierre-lento",
  "spar_accesorios-para-cocina_esquina-magica-spar-gris-grafito-cierre-lento",
  "spar_accesorios-para-cocina_vajillero-spar-en-acero-inoxidable",
  "spar_bisagras_bisagra-alta-resistencia-a-la-corrosion-72-horas",
  "spar_bisagras_bisagra-mini-omega-2",
  "spar_bisagras_bisagra-omega-3",
  "spar_bisagras_bisagra-omeguita-3-1-2",
  "spar_bisagras_bisagra-spar-cierre-lento-slow-motion-clip-on-4-perforaciones",
  "spar_bisagras_bisagra-spar-mignon",
  "spar_bisagras_bisagra-super-omega-3-1-2",
  "spar_bisagras_bisagra-torino-165-sin-tornillos",
  "spar_bisagras_pivote-para-puerta-de-paso",
  "spar_brazos-elevables_brazo-elevable-kinvaro-s-35",
  "spar_brazos-elevables_brazo-elevable-paralelo-kinvaro-l-80",
  "spar_brazos-elevables_brazo-neumatico-spar",
  "spar_brazos-elevables_brazo-neumatico-spar-cierre-lento",
  "spar_brazos-elevables_brazo-spar-abatible-110-eco-cierre-lento",
  "spar_brazos-elevables_brazo-spar-plegable-eco-cierre-lento",
  "spar_rieles_accesorio-bajo-fregadero",
  "spar_rieles_kit-cajon-spar-basico-h-175mm",
  "spar_rieles_kit-cajon-spar-basico-h-90mm-40-kg-50cm",
  "spar_rieles_kit-cajon-spar-cacerolero-h128mm-para-vidrio",
  "spar_sistemas-para-closet_riel-en-u-100",
  "spar_sistemas-para-closet_riel-en-u-20",
  "spar_sistemas-para-closet_sistema-corredizo-colgante-sd-closet-venetto-simple",
  "spar_sistemas-para-closet_sistema-corredizo-para-madera-sd-25",
  "spar_sistemas-para-closet_sistema-corredizo-para-madera-sd-80-con-freno",
  "spar_sistemas-para-closet_sistema-corredizo-para-mueble-sd-50",
  "spar_sistemas-para-closet_tubo-ovalado-para-closet-cromado-y-soporte",
]);

/** Adjunta la ruta de imagen a los productos que tienen foto en el catalogo. */
export function attachImages(products: Product[]): Product[] {
  return products.map((p) =>
    PRODUCT_IMAGE_IDS.has(p.id) && !(p.images && p.images.length)
      ? { ...p, images: [`/products/${p.id}.jpg`] }
      : p
  );
}
