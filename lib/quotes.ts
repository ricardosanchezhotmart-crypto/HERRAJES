/**
 * Persistencia de cotizaciones/pedidos. Cuando Firebase está configurado se
 * guardan en la colección `quotes` (cualquier visitante puede crear, solo el
 * admin puede leerlas — ver firestore.rules). Sin Firebase, es un no-op seguro.
 */
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import type { QuoteChannel, QuoteItem } from "@/types";

export interface QuoteInput {
  customer: {
    name?: string;
    company?: string;
    phone?: string;
    email?: string;
    notes?: string;
  };
  items: QuoteItem[];
  channel: QuoteChannel;
}

/** Registra la cotización. Devuelve el id creado o null si no hay backend. */
export async function saveQuote(input: QuoteInput): Promise<string | null> {
  const db = getDb();
  if (!db) return null;
  try {
    const ref = await addDoc(collection(db, "quotes"), {
      ...input,
      status: "nuevo",
      createdAt: serverTimestamp(),
    });
    return ref.id;
  } catch (e) {
    // No bloquear el flujo del usuario si falla el registro.
    console.error("No se pudo registrar la cotización:", e);
    return null;
  }
}
