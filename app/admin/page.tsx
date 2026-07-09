"use client";

import * as React from "react";
import { collection, getDocs, orderBy, query, updateDoc, doc } from "firebase/firestore";
import type { User } from "firebase/auth";
import { LogOut, Lock, RefreshCw, Upload } from "lucide-react";
import { getDb } from "@/lib/firebase";
import { isFirebaseConfigured, onAuthChange, signIn, signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useMounted } from "@/lib/use-mounted";
import { parseCsv } from "@/importers/shared/csv";
import { csvToRawProducts } from "@/importers/shared/csv-import";
import { normalize, type NormalizedCatalog } from "@/importers/shared/normalizer";
import { SPAR_CSV_MAPPING } from "@/importers/spar/csv-adapter";
import { pushCatalogClient } from "@/lib/admin-import";

interface QuoteRow {
  id: string;
  customer?: { name?: string };
  items?: { sku: string; name: string; qty: number }[];
  channel?: string;
  status?: string;
  createdAt?: { seconds: number };
}

export default function AdminPage() {
  const mounted = useMounted();
  const [user, setUser] = React.useState<User | null>(null);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => onAuthChange((u) => { setUser(u); setReady(true); }), []);

  if (!mounted) return <div className="container py-20" />;

  if (!isFirebaseConfigured) {
    return (
      <main className="container max-w-md py-24 text-center">
        <Lock className="mx-auto h-8 w-8 text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">Panel administrativo</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Configura Firebase (copia <code>.env.example</code> a <code>.env.local</code> con tus
          credenciales) para habilitar el acceso de administrador.
        </p>
      </main>
    );
  }

  if (!ready) return <main className="container py-24 text-center text-muted-foreground">Cargando…</main>;
  if (!user) return <LoginForm />;
  return <Dashboard user={user} />;
}

function LoginForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signIn(email, password);
    } catch {
      setError("Credenciales incorrectas. Verifica tu correo y contraseña.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container max-w-sm py-24">
      <div className="mb-6 text-center">
        <Lock className="mx-auto h-7 w-7 text-muted-foreground" />
        <h1 className="mt-3 text-2xl font-semibold tracking-tight">Acceso administrador</h1>
        <p className="mt-1 text-sm text-muted-foreground">Ingresa para gestionar la plataforma.</p>
      </div>
      <Card className="p-6">
        <form onSubmit={submit} className="space-y-3">
          <input
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@empresa.com"
            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <input
            type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button className="w-full" disabled={loading}>
            {loading ? "Ingresando…" : "Ingresar"}
          </Button>
        </form>
      </Card>
    </main>
  );
}

function ImportSection() {
  const [preview, setPreview] = React.useState<NormalizedCatalog | null>(null);
  const [warnings, setWarnings] = React.useState<string[]>([]);
  const [fileName, setFileName] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "pushing" | "done" | "error">("idle");
  const [msg, setMsg] = React.useState("");

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setStatus("idle");
    setMsg("");
    try {
      const text = await file.text();
      const rows = parseCsv(text);
      const { products, warnings } = csvToRawProducts(rows, SPAR_CSV_MAPPING, "spar");
      setPreview(normalize(products));
      setWarnings(warnings);
    } catch {
      setPreview(null);
      setMsg("No se pudo leer el archivo. Verifica que sea un CSV válido (UTF-8).");
      setStatus("error");
    }
  };

  const push = async () => {
    if (!preview) return;
    setStatus("pushing");
    setMsg("");
    try {
      await pushCatalogClient(preview, { brand: "spar", source: fileName || "csv" });
      setStatus("done");
      setMsg("Catálogo cargado a Firestore correctamente.");
    } catch (e) {
      setStatus("error");
      setMsg("Error al cargar: " + (e instanceof Error ? e.message : "desconocido"));
    }
  };

  const variants = preview?.products.reduce((n, p) => n + (p.variants?.length ?? 0), 0) ?? 0;

  return (
    <Card className="mb-10 p-6">
      <div className="flex items-center gap-2">
        <Upload className="h-5 w-5" />
        <h2 className="text-lg font-semibold tracking-tight">Importar catálogo (CSV)</h2>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Sube el archivo maestro en CSV (UTF-8). Se agrupan las filas por producto y se cargan
        productos, categorías y variantes a Firestore.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-2 text-sm transition hover:bg-muted">
          <Upload className="h-4 w-4" /> Elegir archivo CSV
          <input type="file" accept=".csv,text/csv" className="hidden" onChange={onFile} />
        </label>
        {fileName && <span className="text-sm text-muted-foreground">{fileName}</span>}
      </div>

      {preview && (
        <div className="mt-5 space-y-4">
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="rounded-full bg-muted px-3 py-1">{preview.categories.length} categorías</span>
            <span className="rounded-full bg-muted px-3 py-1">{preview.subcategories.length} subcategorías</span>
            <span className="rounded-full bg-muted px-3 py-1">{preview.products.length} productos</span>
            <span className="rounded-full bg-muted px-3 py-1">{variants} variantes</span>
          </div>
          {warnings.length > 0 && (
            <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-sm">
              <p className="font-medium">Avisos ({warnings.length})</p>
              <ul className="mt-1 list-disc pl-5 text-muted-foreground">
                {warnings.slice(0, 5).map((w, i) => <li key={i}>{w}</li>)}
                {warnings.length > 5 && <li>… y {warnings.length - 5} más</li>}
              </ul>
            </div>
          )}
          <Button onClick={push} disabled={status === "pushing"}>
            {status === "pushing" ? "Cargando…" : "Cargar a Firestore"}
          </Button>
        </div>
      )}
      {msg && (
        <p className={`mt-3 text-sm ${status === "error" ? "text-red-500" : "text-green-600"}`}>{msg}</p>
      )}
    </Card>
  );
}

function Dashboard({ user }: { user: User }) {
  const [quotes, setQuotes] = React.useState<QuoteRow[]>([]);
  const [loading, setLoading] = React.useState(true);

  const load = React.useCallback(async () => {
    const db = getDb();
    if (!db) return;
    setLoading(true);
    try {
      const snap = await getDocs(query(collection(db, "quotes"), orderBy("createdAt", "desc")));
      setQuotes(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as QuoteRow));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => { load(); }, [load]);

  const setStatus = async (id: string, status: string) => {
    const db = getDb();
    if (!db) return;
    await updateDoc(doc(db, "quotes", id), { status });
    setQuotes((qs) => qs.map((q) => (q.id === id ? { ...q, status } : q)));
  };

  return (
    <main className="container py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Panel administrativo</h1>
          <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={load}>
            <RefreshCw className="h-4 w-4" /> Actualizar
          </Button>
          <Button variant="outline" size="sm" onClick={() => signOut()}>
            <LogOut className="h-4 w-4" /> Salir
          </Button>
        </div>
      </div>

      <ImportSection />

      <h2 className="mb-4 text-lg font-semibold tracking-tight">Solicitudes de cotización</h2>
      {loading ? (
        <p className="text-sm text-muted-foreground">Cargando solicitudes…</p>
      ) : quotes.length === 0 ? (
        <Card className="p-10 text-center text-sm text-muted-foreground">
          Aún no hay solicitudes. Aparecerán aquí cuando un cliente envíe un pedido.
        </Card>
      ) : (
        <div className="space-y-3">
          {quotes.map((q) => (
            <Card key={q.id} className="p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium">{q.customer?.name || "Cliente sin nombre"}</p>
                  <p className="text-xs text-muted-foreground">
                    {q.items?.length ?? 0} referencias · vía {q.channel}
                    {q.createdAt ? ` · ${new Date(q.createdAt.seconds * 1000).toLocaleString("es-CO")}` : ""}
                  </p>
                </div>
                <select
                  value={q.status ?? "nuevo"}
                  onChange={(e) => setStatus(q.id, e.target.value)}
                  className="h-9 rounded-lg border border-border bg-background px-2 text-sm"
                >
                  <option value="nuevo">Nuevo</option>
                  <option value="en_proceso">En proceso</option>
                  <option value="cerrado">Cerrado</option>
                </select>
              </div>
              {q.items && q.items.length > 0 && (
                <ul className="mt-3 space-y-1 border-t border-border pt-3 text-sm text-muted-foreground">
                  {q.items.map((it) => (
                    <li key={it.sku} className="flex justify-between gap-3">
                      <span className="truncate">{it.name}</span>
                      <span className="shrink-0 font-mono text-xs">{it.sku} · x{it.qty}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
