/**
 * Carga de un catálogo normalizado a Firestore con firebase-admin.
 * SOLO para uso en scripts (Node), nunca importar desde la app cliente.
 */
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import type { NormalizedCatalog } from "./normalizer";
import type { BrandSlug } from "@/types";

export function initAdmin() {
  if (getApps().length) return;
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (raw) initializeApp({ credential: cert(JSON.parse(raw)) });
  else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) initializeApp();
  else
    throw new Error(
      "Falta la cuenta de servicio. Define GOOGLE_APPLICATION_CREDENTIALS o FIREBASE_SERVICE_ACCOUNT."
    );
}

interface UploadMeta {
  brand: BrandSlug;
  source: string;
  extraBrands?: { id: string; name: string; slug: string; order: number }[];
}

export async function uploadCatalog(catalog: NormalizedCatalog, meta: UploadMeta) {
  initAdmin();
  const db = getFirestore();

  const writeAll = async (coll: string, docs: { id: string }[]) => {
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

  if (meta.extraBrands?.length) await writeAll("brands", meta.extraBrands);
  await writeAll("categories", catalog.categories);
  await writeAll("subcategories", catalog.subcategories);
  await writeAll("products", catalog.products);

  await db.collection("imports").add({
    brand: meta.brand,
    source: meta.source,
    version: new Date().toISOString(),
    stats: {
      categories: catalog.categories.length,
      products: catalog.products.length,
      variants: catalog.products.reduce((n, p) => n + (p.variants?.length ?? 0), 0),
    },
    createdAt: new Date(),
  });
  console.log("Importación registrada en 'imports'.");
}
