/**
 * Manifiesto de imagenes/galerias de producto extraidas del catalogo SPAR.
 * Generado desde el PDF oficial (raster original cuando existe; recorte de
 * pagina solo como respaldo cuando el grafico es vectorial). Las fotos viven
 * en /public/products/<archivo>.jpg. Para reemplazar por fotos propias,
 * sustituye el archivo con el mismo nombre.
 */
import type { Product } from "@/types";

/** id de producto -> lista de archivos de imagen (galeria), en orden. */
export const PRODUCT_IMAGES: Record<string, string[]> = {
  "spar_accesorios-para-cocina_botellero-2-niveles-spar-cierre-lento": ["spar_accesorios-para-cocina_botellero-2-niveles-spar-cierre-lento.jpg", "spar_accesorios-para-cocina_botellero-2-niveles-spar-cierre-lento-2.jpg", "spar_accesorios-para-cocina_botellero-2-niveles-spar-cierre-lento-3.jpg"],
  "spar_accesorios-para-cocina_canastillas-cromadas-spar": ["spar_accesorios-para-cocina_canastillas-cromadas-spar.jpg"],
  "spar_accesorios-para-cocina_caneca-de-reciclaje-spar": ["spar_accesorios-para-cocina_caneca-de-reciclaje-spar.jpg", "spar_accesorios-para-cocina_caneca-de-reciclaje-spar-2.jpg", "spar_accesorios-para-cocina_caneca-de-reciclaje-spar-3.jpg", "spar_accesorios-para-cocina_caneca-de-reciclaje-spar-4.jpg"],
  "spar_accesorios-para-cocina_cubiertero-plastico": ["spar_accesorios-para-cocina_cubiertero-plastico.jpg", "spar_accesorios-para-cocina_cubiertero-plastico-2.jpg", "spar_accesorios-para-cocina_cubiertero-plastico-3.jpg", "spar_accesorios-para-cocina_cubiertero-plastico-4.jpg"],
  "spar_accesorios-para-cocina_cubiertero-spar-en-acero-inoxidable": ["spar_accesorios-para-cocina_cubiertero-spar-en-acero-inoxidable.jpg", "spar_accesorios-para-cocina_cubiertero-spar-en-acero-inoxidable-2.jpg", "spar_accesorios-para-cocina_cubiertero-spar-en-acero-inoxidable-3.jpg"],
  "spar_accesorios-para-cocina_despensa-abatible-grafito-melamina-gris": ["spar_accesorios-para-cocina_despensa-abatible-grafito-melamina-gris.jpg", "spar_accesorios-para-cocina_despensa-abatible-grafito-melamina-gris-2.jpg"],
  "spar_accesorios-para-cocina_despensa-deslizante-frontal-5c-cierre-lento": ["spar_accesorios-para-cocina_despensa-deslizante-frontal-5c-cierre-lento.jpg", "spar_accesorios-para-cocina_despensa-deslizante-frontal-5c-cierre-lento-2.jpg"],
  "spar_accesorios-para-cocina_esquina-magica-cromada-cierre-lento": ["spar_accesorios-para-cocina_esquina-magica-cromada-cierre-lento.jpg"],
  "spar_accesorios-para-cocina_esquina-magica-spar-gris-grafito-cierre-lento": ["spar_accesorios-para-cocina_esquina-magica-spar-gris-grafito-cierre-lento.jpg", "spar_accesorios-para-cocina_esquina-magica-spar-gris-grafito-cierre-lento-2.jpg"],
  "spar_accesorios-para-cocina_vajillero-spar-en-acero-inoxidable": ["spar_accesorios-para-cocina_vajillero-spar-en-acero-inoxidable.jpg", "spar_accesorios-para-cocina_vajillero-spar-en-acero-inoxidable-2.jpg", "spar_accesorios-para-cocina_vajillero-spar-en-acero-inoxidable-3.jpg", "spar_accesorios-para-cocina_vajillero-spar-en-acero-inoxidable-4.jpg"],
  "spar_bisagras_bisagra-3d-niquelada-negro": ["spar_bisagras_bisagra-3d-niquelada-negro.jpg", "spar_bisagras_bisagra-3d-niquelada-negro-2.jpg", "spar_bisagras_bisagra-3d-niquelada-negro-3.jpg"],
  "spar_bisagras_bisagra-alta-resistencia-a-la-corrosion-72-horas": ["spar_bisagras_bisagra-alta-resistencia-a-la-corrosion-72-horas.jpg"],
  "spar_bisagras_bisagra-mini-omega-2": ["spar_bisagras_bisagra-mini-omega-2.jpg"],
  "spar_bisagras_bisagra-omega-3": ["spar_bisagras_bisagra-omega-3.jpg"],
  "spar_bisagras_bisagra-omeguita-3-1-2": ["spar_bisagras_bisagra-omeguita-3-1-2.jpg"],
  "spar_bisagras_bisagra-spar-cierre-lento-slow-motion-clip-on-4-perforaciones": ["spar_bisagras_bisagra-spar-cierre-lento-slow-motion-clip-on-4-perforaciones.jpg", "spar_bisagras_bisagra-spar-cierre-lento-slow-motion-clip-on-4-perforaciones-2.jpg"],
  "spar_bisagras_bisagra-spar-mignon": ["spar_bisagras_bisagra-spar-mignon.jpg"],
  "spar_bisagras_bisagra-super-omega-3-1-2": ["spar_bisagras_bisagra-super-omega-3-1-2.jpg"],
  "spar_bisagras_bisagra-torino-165-sin-tornillos": ["spar_bisagras_bisagra-torino-165-sin-tornillos.jpg"],
  "spar_bisagras_bisagra-torino-parche-y-semiparche": ["spar_bisagras_bisagra-torino-parche-y-semiparche.jpg"],
  "spar_bisagras_pivote-para-puerta-de-paso": ["spar_bisagras_pivote-para-puerta-de-paso.jpg"],
  "spar_brazos-elevables_brazo-elevable-kinvaro-s-35": ["spar_brazos-elevables_brazo-elevable-kinvaro-s-35.jpg", "spar_brazos-elevables_brazo-elevable-kinvaro-s-35-2.jpg", "spar_brazos-elevables_brazo-elevable-kinvaro-s-35-3.jpg"],
  "spar_brazos-elevables_brazo-elevable-paralelo-kinvaro-l-80": ["spar_brazos-elevables_brazo-elevable-paralelo-kinvaro-l-80.jpg", "spar_brazos-elevables_brazo-elevable-paralelo-kinvaro-l-80-2.jpg", "spar_brazos-elevables_brazo-elevable-paralelo-kinvaro-l-80-3.jpg", "spar_brazos-elevables_brazo-elevable-paralelo-kinvaro-l-80-4.jpg"],
  "spar_brazos-elevables_brazo-neumatico-spar": ["spar_brazos-elevables_brazo-neumatico-spar.jpg"],
  "spar_brazos-elevables_brazo-neumatico-spar-cierre-lento": ["spar_brazos-elevables_brazo-neumatico-spar-cierre-lento.jpg"],
  "spar_brazos-elevables_brazo-spar-abatible-110-eco-cierre-lento": ["spar_brazos-elevables_brazo-spar-abatible-110-eco-cierre-lento.jpg"],
  "spar_brazos-elevables_brazo-spar-plegable-eco-cierre-lento": ["spar_brazos-elevables_brazo-spar-plegable-eco-cierre-lento.jpg"],
  "spar_rieles_accesorio-bajo-fregadero": ["spar_rieles_accesorio-bajo-fregadero.jpg", "spar_rieles_accesorio-bajo-fregadero-2.jpg"],
  "spar_rieles_galeria-rectangular-kit-cajon-50-cm": ["spar_rieles_galeria-rectangular-kit-cajon-50-cm.jpg", "spar_rieles_galeria-rectangular-kit-cajon-50-cm-2.jpg"],
  "spar_rieles_kit-cajon-spar-basico-h-175mm": ["spar_rieles_kit-cajon-spar-basico-h-175mm.jpg", "spar_rieles_kit-cajon-spar-basico-h-175mm-2.jpg", "spar_rieles_kit-cajon-spar-basico-h-175mm-3.jpg"],
  "spar_rieles_kit-cajon-spar-basico-h-90mm-40-kg-50cm": ["spar_rieles_kit-cajon-spar-basico-h-90mm-40-kg-50cm.jpg", "spar_rieles_kit-cajon-spar-basico-h-90mm-40-kg-50cm-2.jpg", "spar_rieles_kit-cajon-spar-basico-h-90mm-40-kg-50cm-3.jpg", "spar_rieles_kit-cajon-spar-basico-h-90mm-40-kg-50cm-4.jpg"],
  "spar_rieles_kit-cajon-spar-cacerolero-h128mm-para-vidrio": ["spar_rieles_kit-cajon-spar-cacerolero-h128mm-para-vidrio.jpg", "spar_rieles_kit-cajon-spar-cacerolero-h128mm-para-vidrio-2.jpg", "spar_rieles_kit-cajon-spar-cacerolero-h128mm-para-vidrio-3.jpg", "spar_rieles_kit-cajon-spar-cacerolero-h128mm-para-vidrio-4.jpg"],
  "spar_sistemas-para-closet_riel-en-u-100": ["spar_sistemas-para-closet_riel-en-u-100.jpg"],
  "spar_sistemas-para-closet_riel-en-u-20": ["spar_sistemas-para-closet_riel-en-u-20.jpg"],
  "spar_sistemas-para-closet_sistema-corredizo-colgante-sd-closet-venetto-simple": ["spar_sistemas-para-closet_sistema-corredizo-colgante-sd-closet-venetto-simple.jpg", "spar_sistemas-para-closet_sistema-corredizo-colgante-sd-closet-venetto-simple-2.jpg"],
  "spar_sistemas-para-closet_sistema-corredizo-para-madera-sd-25": ["spar_sistemas-para-closet_sistema-corredizo-para-madera-sd-25.jpg", "spar_sistemas-para-closet_sistema-corredizo-para-madera-sd-25-2.jpg", "spar_sistemas-para-closet_sistema-corredizo-para-madera-sd-25-3.jpg"],
  "spar_sistemas-para-closet_sistema-corredizo-para-madera-sd-80-con-freno": ["spar_sistemas-para-closet_sistema-corredizo-para-madera-sd-80-con-freno.jpg", "spar_sistemas-para-closet_sistema-corredizo-para-madera-sd-80-con-freno-2.jpg"],
  "spar_sistemas-para-closet_sistema-corredizo-para-mueble-sd-50": ["spar_sistemas-para-closet_sistema-corredizo-para-mueble-sd-50.jpg", "spar_sistemas-para-closet_sistema-corredizo-para-mueble-sd-50-2.jpg", "spar_sistemas-para-closet_sistema-corredizo-para-mueble-sd-50-3.jpg"],
  "spar_sistemas-para-closet_tubo-ovalado-para-closet-cromado-y-soporte": ["spar_sistemas-para-closet_tubo-ovalado-para-closet-cromado-y-soporte.jpg"],
  "spar_manijas_boton-tiradera-esparta": ["spar_manijas_boton-tiradera-esparta.jpg"],
  "spar_manijas_manija-arco-satinada": ["spar_manijas_manija-arco-satinada.jpg"],
  "spar_manijas_manija-ben": ["spar_manijas_manija-ben.jpg"],
  "spar_manijas_manija-convex": ["spar_manijas_manija-convex.jpg"],
  "spar_manijas_manija-coral-para-empotrar": ["spar_manijas_manija-coral-para-empotrar.jpg"],
  "spar_manijas_manija-cubik": ["spar_manijas_manija-cubik-2.jpg", "spar_manijas_manija-cubik.jpg"],
  "spar_manijas_manija-dome": ["spar_manijas_manija-dome.jpg"],
  "spar_manijas_manija-doppia": ["spar_manijas_manija-doppia.jpg"],
  "spar_manijas_manija-embebida-bellfort-spar": ["spar_manijas_manija-embebida-bellfort-spar.jpg"],
  "spar_manijas_manija-extender-serie-76": ["spar_manijas_manija-extender-serie-76.jpg"],
  "spar_manijas_manija-fit-line-aluminium-serie-34": ["spar_manijas_manija-fit-line-aluminium-serie-34.jpg"],
  "spar_manijas_manija-fit-line-cromada": ["spar_manijas_manija-fit-line-cromada.jpg"],
  "spar_manijas_manija-fit-line-serie-900": ["spar_manijas_manija-fit-line-serie-900.jpg"],
  "spar_manijas_manija-lite": ["spar_manijas_manija-lite.jpg"],
  "spar_manijas_manija-media-luna": ["spar_manijas_manija-media-luna.jpg"],
  "spar_manijas_manija-mediteraneo-serie-792": ["spar_manijas_manija-mediteraneo-serie-792.jpg"],
  "spar_manijas_manija-new-york": ["spar_manijas_manija-new-york.jpg"],
  "spar_manijas_manija-piazza": ["spar_manijas_manija-piazza.jpg"],
  "spar_manijas_manija-pont": ["spar_manijas_manija-pont.jpg"],
  "spar_manijas_manija-steel-light-linea-pesada": ["spar_manijas_manija-steel-light-linea-pesada.jpg"],
  "spar_manijas_manija-steel-light-liviana": ["spar_manijas_manija-steel-light-liviana.jpg", "spar_manijas_manija-steel-light-liviana-2.jpg"],
  "spar_manijas_manija-striped": ["spar_manijas_manija-striped.jpg"],
};

/** Adjunta la galeria de imagenes a los productos que tienen fotos en el catalogo. */
export function attachImages(products: Product[]): Product[] {
  return products.map((p) => {
    const files = PRODUCT_IMAGES[p.id];
    if (!files || (p.images && p.images.length)) return p;
    return { ...p, images: files.map((f) => `/products/${f}`) };
  });
}
