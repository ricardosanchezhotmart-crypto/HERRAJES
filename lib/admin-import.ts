/**
 * Carga de un catálogo normalizado a Firestore desde el navegador (panel admin),
 * usando el SDK cliente con el admin autenticado. Escribe por lotes (máx. 500
 * operaciones por batch).
 */
import { collection, doc, serverTimestamp, writeBatch, addDoc } from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import type { NormalizedCatalog } from "@/importers/shared/normalizer";
import type { Brand } from "@/types";

async function writeCollection(coll: string, docs: { id: string }[]) {
  const db = getDb();
  if (!db) throw new Error("Firestore no está configurado.");
  for (let i = 0; i < docs.length; i += 400) {
    const batch = writeBatch(db);
    for (const d of docs.slice(i, i + 400)) {
      const { id, ...rest } = d;
      batch.set(doc(db, coll, id), rest, { merge: true });
    }
    await batch.commit();
  }
}

export async function pushCatalogClient(
  catalog: NormalizedCatalog,
  meta: { brand: string; source: string; brands?: Brand[] }
) {
  const db = getDb();
  if (!db) throw new Error("Firestore no está configurado.");
  if (meta.brands?.length) await writeCollection("brands", meta.brands);
  await writeCollection("categories", catalog.categories);
  await writeCollection("subcategories", catalog.subcategories);
  await writeCollection("products", catalog.products);
  await addDoc(collection(db, "imports"), {
    brand: meta.brand,
    source: meta.source,
    version: new Date().toISOString(),
    stats: {
      categories: catalog.categories.length,
      products: catalog.products.length,
      variants: catalog.products.reduce((n, p) => n + (p.variants?.length ?? 0), 0),
    },
    createdAt: serverTimestamp(),
  });
}
