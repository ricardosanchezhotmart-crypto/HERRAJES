/**
 * Inicialización lazy y tolerante de Firebase.
 * Si aún no hay credenciales en el entorno, la app arranca igual
 * (el catálogo puede servirse desde datos locales / seed durante desarrollo).
 */
import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Boolean(config.apiKey && config.projectId);

let app: FirebaseApp | undefined;

export function getFirebaseApp(): FirebaseApp | undefined {
  if (!isFirebaseConfigured) return undefined;
  if (!app) app = getApps()[0] ?? initializeApp(config);
  return app;
}

export function getDb(): Firestore | undefined {
  const a = getFirebaseApp();
  return a ? getFirestore(a) : undefined;
}

export function getAuthClient(): Auth | undefined {
  const a = getFirebaseApp();
  return a ? getAuth(a) : undefined;
}

export function getStorageClient(): FirebaseStorage | undefined {
  const a = getFirebaseApp();
  return a ? getStorage(a) : undefined;
}
