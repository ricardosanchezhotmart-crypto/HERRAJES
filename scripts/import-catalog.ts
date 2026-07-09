/**
 * Script de importación de catálogo (esqueleto Fase 2).
 * Uso (Fase 5): npm run import:catalog -- --brand spar --source ./catalogo.pdf
 *
 * Flujo: adapter de marca -> RawProduct[] -> normalize() -> Firestore.
 */
import { sparAdapter } from "../importers/spar/adapter";
import { normalize } from "../importers/shared/normalizer";

async function main() {
  const raw = await sparAdapter.parse("");
  const catalog = normalize(raw);
  console.log("Categorías:", catalog.categories.length);
  console.log("Subcategorías:", catalog.subcategories.length);
  console.log("Productos:", catalog.products.length);
  console.log(
    "Variantes:",
    catalog.products.reduce((n, p) => n + (p.variants?.length ?? 0), 0)
  );
  // Fase 5: escritura por lotes a Firestore + registro en `imports/`.
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
