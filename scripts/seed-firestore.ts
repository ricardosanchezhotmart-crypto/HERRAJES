/**
 * Carga el catálogo (por ahora los datos seed derivados del catálogo SPAR) a
 * Firestore usando firebase-admin.
 *
 * Requisitos:
 *   - Una cuenta de servicio de Firebase. Exporta la ruta del JSON:
 *       export GOOGLE_APPLICATION_CREDENTIALS=./serviceAccount.json
 *     o su contenido en la variable FIREBASE_SERVICE_ACCOUNT.
 *
 * Uso:
 *   npx tsx scripts/seed-firestore.ts
 *
 * En la Fase 5 este script se conecta al importador real (adapter por marca)
 * en lugar de los datos seed.
 */
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { SEED_RAW } from "../data/seed";
import { normalize } from "../importers/shared/normalizer";
import { SEED_BRANDS } from "../lib/constants";

function initAdmin() {
  if (getApps().length) return;
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (raw) {
    initializeApp({ credential: cert(JSON.parse(raw)) });
  } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    initializeApp(); // usa GOOGLE_APPLICATION_CREDENTIALS automáticamente
  } else {
    throw new Error(
      "Falta la cuenta de servicio. Define GOOGLE_APPLICATION_CREDENTIALS o FIREBASE_SERVICE_ACCOUNT."
    );
  }
}

async function main() {
  initAdmin();
  const db = getFirestore();
  const { categories, subcategories, products } = normalize(SEED_RAW);
  const brands = SEED_BRANDS.map((b, i) => ({ id: b.id, name: b.name, slug: b.slug, order: i + 1 }));

  const writeAll = async (coll: string, docs: { id: string }[]) => {
    // Firestore permite hasta 500 operaciones por batch.
    for (let i = 0; i < docs.length; i += 400) {
      const batch = db.batch();
      for (const d of docs.slice(i, i + 400)) {
        const { id, ...rest } = d;
        batch.set(db.collection(coll).doc(id), rest, { merge: true });
      }
      await batch.commit();
    }
    console.log(`✓ ${coll}: ${docs.length}`);
  };

  await writeAll("brands", brands);
  await writeAll("categories", categories);
  await writeAll("subcategories", subcategories);
  await writeAll("products", products);

  await db.collection("imports").add({
    brand: "spar",
    source: "seed (catálogo SPAR pp. 167–233)",
    version: new Date().toISOString(),
    stats: {
      categories: categories.length,
      products: products.length,
      variants: products.reduce((n, p) => n + (p.variants?.length ?? 0), 0),
    },
    createdAt: new Date(),
  });

  console.log("Catálogo cargado a Firestore.");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
