/**
 * Importa un catálogo desde un archivo CSV.
 *
 * Uso:
 *   npx tsx scripts/import-catalog.ts --brand spar --source ./catalogo.csv [--push] [--limit N]
 *
 * Sin --push solo muestra un resumen (dry-run). Con --push carga a Firestore
 * (requiere GOOGLE_APPLICATION_CREDENTIALS o FIREBASE_SERVICE_ACCOUNT).
 *
 * Para Excel: exporta la hoja a CSV (UTF-8) y usa este mismo comando.
 */
import { readFileSync } from "node:fs";
import { parseCsv } from "../importers/shared/csv";
import { csvToRawProducts, type CsvMapping } from "../importers/shared/csv-import";
import { normalize } from "../importers/shared/normalizer";
import { SPAR_CSV_MAPPING } from "../importers/spar/csv-adapter";
import { uploadCatalog } from "../importers/shared/upload";

const MAPPINGS: Record<string, CsvMapping> = {
  spar: SPAR_CSV_MAPPING,
  // bonuit: BONUIT_CSV_MAPPING (Fase futura)
};

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
}
const flag = (name: string) => process.argv.includes(`--${name}`);

async function main() {
  const brand = (arg("brand") || "spar").toLowerCase();
  const source = arg("source");
  const limit = arg("limit") ? Number(arg("limit")) : undefined;
  if (!source) throw new Error("Falta --source <ruta.csv>");
  const mapping = MAPPINGS[brand];
  if (!mapping) throw new Error(`No hay mapeo de columnas para la marca "${brand}".`);

  const text = readFileSync(source, "utf8");
  let rows = parseCsv(text);
  if (limit) rows = rows.slice(0, limit);

  const { products, warnings } = csvToRawProducts(rows, mapping, brand);
  const catalog = normalize(products);

  console.log(`\nMarca:         ${brand}`);
  console.log(`Fuente:        ${source}`);
  console.log(`Filas leídas:  ${rows.length}`);
  console.log(`Categorías:    ${catalog.categories.length}`);
  console.log(`Subcategorías: ${catalog.subcategories.length}`);
  console.log(`Productos:     ${catalog.products.length}`);
  console.log(`Variantes:     ${catalog.products.reduce((n, p) => n + (p.variants?.length ?? 0), 0)}`);
  if (warnings.length) {
    console.log(`\nAvisos (${warnings.length}):`);
    warnings.slice(0, 20).forEach((w) => console.log("  - " + w));
    if (warnings.length > 20) console.log(`  … y ${warnings.length - 20} más`);
  }

  if (flag("push")) {
    console.log("\nCargando a Firestore…");
    await uploadCatalog(catalog, { brand, source });
    console.log("Listo.");
  } else {
    console.log("\n(dry-run) Añade --push para cargar a Firestore.");
  }
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
