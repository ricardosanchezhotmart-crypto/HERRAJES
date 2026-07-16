/**
 * Carga el catálogo seed (derivado del catálogo SPAR) a Firestore con
 * firebase-admin. Útil para poblar un proyecto Firebase nuevo rápidamente.
 *
 * Requisitos: GOOGLE_APPLICATION_CREDENTIALS o FIREBASE_SERVICE_ACCOUNT.
 * Uso: npx tsx scripts/seed-firestore.ts
 *
 * Para importar desde un CSV real usa scripts/import-catalog.ts.
 */
import { SEED_RAW } from "../data/seed";
import { normalize } from "../importers/shared/normalizer";
import { attachImages } from "../data/product-images";
import { SEED_BRANDS } from "../lib/constants";
import { uploadCatalog } from "../importers/shared/upload";

async function main() {
  const catalog = normalize(SEED_RAW);
  catalog.products = attachImages(catalog.products);
  const brands = SEED_BRANDS.map((b, i) => ({ id: b.id, name: b.name, slug: b.slug, order: i + 1 }));
  await uploadCatalog(catalog, {
    brand: "spar",
    source: "seed (catálogo SPAR pp. 167–233)",
    extraBrands: brands,
  });
  console.log("Catálogo seed cargado a Firestore.");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
