/**
 * Conversión de filas CSV a RawProduct[] mediante un MAPEO de columnas.
 *
 * Cada marca declara qué columna de SU archivo corresponde a cada campo lógico.
 * Si el proveedor cambia los nombres de columna, solo se edita el mapeo — el
 * resto del pipeline (normalizador → Firestore → UI) no se toca.
 *
 * Convenciones de contenido dentro de una celda:
 *   - Varias características:   separadas por "|"   (ej. "Cierre lento|Clip-on")
 *   - Specs:                   "clave=valor|clave=valor"
 *   - Atributos de variante:   "clave=valor|clave=valor"
 *   - Varias imágenes:         "url|url"
 *
 * Agrupación: las filas con el mismo (marca + categoría + producto) forman UN
 * producto con N variantes (una variante por fila). Los campos de nivel producto
 * se toman de la primera fila del grupo.
 */
import type { RawProduct, RawVariant } from "./normalizer";

/** Mapeo campo lógico → nombre de columna en el CSV de la marca. */
export interface CsvMapping {
  marca: string;
  categoria: string;
  subcategoria?: string;
  linea?: string;
  producto: string;
  descripcion?: string;
  aplicaciones?: string;
  caracteristicas?: string;
  specs?: string;
  sku: string;
  variante?: string;
  atributos?: string;
  imagenes?: string;
}

const splitList = (v?: string) =>
  (v ?? "").split("|").map((s) => s.trim()).filter(Boolean);

function parsePairs(v?: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const part of splitList(v)) {
    const idx = part.indexOf("=");
    if (idx > 0) out[part.slice(0, idx).trim()] = part.slice(idx + 1).trim();
  }
  return out;
}

export interface CsvImportResult {
  products: RawProduct[];
  warnings: string[];
}

export function csvToRawProducts(
  rows: Record<string, string>[],
  map: CsvMapping,
  brandFallbackSlug?: string
): CsvImportResult {
  const warnings: string[] = [];
  const get = (row: Record<string, string>, col?: string) => (col ? (row[col] ?? "").trim() : "");
  const byKey = new Map<string, RawProduct>();

  rows.forEach((row, i) => {
    const line = i + 2; // +1 header, +1 base-1
    const brandSlug =
      (get(row, map.marca) || brandFallbackSlug || "").toLowerCase().replace(/\s+/g, "-");
    const category = get(row, map.categoria);
    const name = get(row, map.producto);
    const sku = get(row, map.sku);

    if (!brandSlug || !category || !name || !sku) {
      warnings.push(`Fila ${line}: faltan campos obligatorios (marca/categoría/producto/sku). Omitida.`);
      return;
    }

    const key = `${brandSlug}|${category}|${name}`.toLowerCase();
    let prod = byKey.get(key);
    if (!prod) {
      prod = {
        brandSlug,
        category,
        subcategory: get(row, map.subcategoria) || undefined,
        line: get(row, map.linea) || undefined,
        name,
        description: get(row, map.descripcion) || undefined,
        applications: get(row, map.aplicaciones) || undefined,
        features: splitList(get(row, map.caracteristicas)),
        specs: Object.entries(parsePairs(get(row, map.specs))).map(([k, v]) => ({ key: k, value: v })),
        images: splitList(get(row, map.imagenes)),
        variants: [],
      };
      byKey.set(key, prod);
    }

    if (prod.variants.some((v) => v.sku === sku)) {
      warnings.push(`Fila ${line}: SKU duplicado ${sku}. Omitido.`);
      return;
    }
    const variant: RawVariant = {
      sku,
      description: get(row, map.variante) || name,
      attributes: (() => {
        const a = parsePairs(get(row, map.atributos));
        return Object.keys(a).length ? a : undefined;
      })(),
    };
    prod.variants.push(variant);
  });

  return { products: [...byKey.values()], warnings };
}
