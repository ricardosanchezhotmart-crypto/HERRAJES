/**
 * Autenticación del administrador (Firebase Auth, email + contraseña).
 * El panel administrativo usa estos helpers para proteger el acceso.
 */
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  type User,
} from "firebase/auth";
import { getAuthClient, isFirebaseConfigured } from "@/lib/firebase";

export { isFirebaseConfigured };

export async function signIn(email: string, password: string): Promise<User> {
  const auth = getAuthClient();
  if (!auth) throw new Error("Firebase Auth no está configurado. Añade tu .env.local.");
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function signOut(): Promise<void> {
  const auth = getAuthClient();
  if (auth) await fbSignOut(auth);
}

/** Suscribe a cambios de sesión. Devuelve la función para cancelar la suscripción. */
export function onAuthChange(cb: (user: User | null) => void): () => void {
  const auth = getAuthClient();
  if (!auth) {
    cb(null);
    return () => {};
  }
  return onAuthStateChanged(auth, cb);
}
