/**
 * Mapeo de columnas del CSV de SPAR.
 *
 * Estos son los nombres de columna esperados en el archivo maestro. Si SPAR
 * (o un nuevo proveedor) entrega un CSV con otros encabezados, basta con ajustar
 * este objeto — el resto del importador no cambia.
 */
import type { CsvMapping } from "../shared/csv-import";

export const SPAR_CSV_MAPPING: CsvMapping = {
  marca: "marca",
  categoria: "categoria",
  subcategoria: "subcategoria",
  linea: "linea",
  producto: "producto",
  descripcion: "descripcion",
  aplicaciones: "aplicaciones",
  caracteristicas: "caracteristicas",
  specs: "specs",
  sku: "sku",
  variante: "variante",
  atributos: "atributos",
  imagenes: "imagenes",
};

/** Encabezados del CSV en el orden recomendado para la plantilla. */
export const CSV_TEMPLATE_HEADERS = [
  "marca",
  "categoria",
  "subcategoria",
  "linea",
  "producto",
  "descripcion",
  "aplicaciones",
  "caracteristicas",
  "specs",
  "sku",
  "variante",
  "atributos",
  "imagenes",
];
