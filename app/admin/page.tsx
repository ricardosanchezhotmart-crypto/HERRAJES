"use client";

import * as React from "react";
import { collection, getDocs, orderBy, query, updateDoc, doc } from "firebase/firestore";
import type { User } from "firebase/auth";
import { LogOut, Lock, RefreshCw } from "lucide-react";
import { getDb } from "@/lib/firebase";
import { isFirebaseConfigured, onAuthChange, signIn, signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useMounted } from "@/lib/use-mounted";

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
