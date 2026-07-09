# Guía de despliegue — Herrajes SPAR · BONUIT

Esta guía lleva el proyecto de cero a producción en **Vercel + Firebase**.

## 0. Requisitos

- Node.js 20 (ver `.nvmrc`)
- Cuenta de GitHub, Vercel y Firebase

## 1. Firebase

1. Crea un proyecto en <https://console.firebase.google.com>.
2. Activa:
   - **Authentication** → método *Email/Password* (para el administrador).
   - **Firestore Database** (modo producción).
   - **Storage** (para imágenes/planos de producto).
3. En *Configuración del proyecto → Tus apps → Web*, copia las credenciales.
4. Crea el usuario administrador en **Authentication → Users → Add user**.

### Reglas de seguridad

Publica las reglas incluidas en el repo:

```bash
npm i -g firebase-tools
firebase login
firebase use <tu-project-id>
firebase deploy --only firestore:rules,storage
```

(Usa el `firebase.json`, `firestore.rules` y `storage.rules` de la raíz.)

## 2. Variables de entorno

Copia `.env.example` a `.env.local` y rellena:

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_WHATSAPP=57XXXXXXXXXX        # número real, formato internacional sin +
NEXT_PUBLIC_CONTACT_EMAIL=ventas@tudominio.com
```

## 3. Cargar el catálogo

Necesitas una cuenta de servicio (Firebase → Configuración → Cuentas de servicio → Generar clave):

```bash
export GOOGLE_APPLICATION_CREDENTIALS=./serviceAccount.json

# Opción A: cargar los datos de muestra (catálogo SPAR pp. 167–233)
npm run seed:firestore

# Opción B: importar tu CSV maestro real
npm run import:catalog -- --brand spar --source ./catalogo.csv --push
```

También puedes importar un CSV desde el **panel** (`/admin`) sin línea de comandos.

## 4. Desplegar en Vercel

1. Sube el repo a GitHub.
2. En <https://vercel.com> → *New Project* → importa el repo.
3. Framework: **Next.js** (autodetectado).
4. En *Environment Variables* pega las mismas de `.env.local`.
5. Deploy.

## 5. Verificación post-deploy

- [ ] Home carga con las dos marcas.
- [ ] Catálogo navega marca → categoría → producto.
- [ ] Buscador (⌘K y `/buscar`) devuelve resultados.
- [ ] Pedido: WhatsApp abre con el número real; PDF descarga; correo abre.
- [ ] `/admin` permite iniciar sesión y ver solicitudes.
- [ ] Una cotización enviada aparece en `/admin` y en Firestore (`quotes`).

## Scripts útiles

| Comando | Qué hace |
|---|---|
| `npm run dev` | Desarrollo local |
| `npm run build` | Build de producción |
| `npm run typecheck` | Chequeo de tipos |
| `npm run seed:firestore` | Carga catálogo de muestra a Firestore |
| `npm run import:catalog -- --brand spar --source f.csv [--push]` | Importa CSV |
