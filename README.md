# Herrajes SPAR · BONUIT

Plataforma profesional para una distribuidora de herrajes para muebles.
No es un ecommerce: ayuda a carpinteros, fabricantes, diseñadores y asesores a
**encontrar el herraje adecuado** y **solicitar una cotización o pedido**
(por WhatsApp, PDF o correo — sin pagos en línea).

Inspiración de diseño: Apple · Vercel · Linear · Stripe.

## Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **TailwindCSS** + **shadcn/ui** + **Framer Motion**
- **Firebase** (Auth, Firestore, Storage)
- **Zustand** (estado del pedido)
- Despliegue: **Vercel**

## Puesta en marcha

```bash
cd herrajes
npm install
cp .env.example .env.local   # rellenar credenciales de Firebase (opcional en dev)
npm run dev
```

La app arranca aunque Firebase no esté configurado (modo desarrollo con datos seed).

## Estructura

```
app/           Rutas (Home, marca, categoría, producto, pedido, admin, api)
components/     UI (shadcn) y componentes de dominio
lib/           firebase, utils, constantes, repos de Firestore
importers/      Adapter por marca (spar/, bonuit/) + normalizador compartido
store/          Estado del pedido (Zustand)
types/          Modelo de datos unificado
scripts/        Importación de catálogos
```

## Modelo de datos

`Brand → Category → Subcategory (opc.) → Product → Variant (SKU/Referencia)`

Especificaciones flexibles clave/valor para absorber marcas con estructuras
distintas. Ver `types/index.ts`.

## Fases

1. ✅ Análisis de catálogos y arquitectura
2. ✅ Estructura del proyecto
3. ⬜ Interfaz (Home, catálogo, buscador, producto, pedido)
4. ⬜ Firebase (reglas, repos, auth admin)
5. ⬜ Importación automática de catálogos
6. ⬜ Buscador
7. ⬜ Sistema de pedidos
