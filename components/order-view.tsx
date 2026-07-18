"use client";

import * as React from "react";
import Link from "next/link";
import { Check, Minus, MessageCircle, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/store/cart";
import { useMounted } from "@/lib/use-mounted";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProductImage } from "@/components/product-image";
import { buildWhatsappQuote, type QuoteCustomer } from "@/lib/quote";
import { saveQuote } from "@/lib/quotes";
import { whatsappLink } from "@/lib/constants";

export function OrderView() {
  const mounted = useMounted();
  const { items, setQty, remove, clear } = useCart();
  const [c, setC] = React.useState<QuoteCustomer>({});
  const [sent, setSent] = React.useState(false);

  const set = (k: keyof QuoteCustomer) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setC((prev) => ({ ...prev, [k]: e.target.value }));

  if (!mounted) return <div className="h-40" />;

  if (items.length === 0 && !sent) {
    return (
      <Card className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        <p className="text-lg font-medium">Tu pedido está vacío</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Agrega productos desde el catálogo para armar tu pedido.
        </p>
        <Link href="/#categorias">
          <Button>Explorar catálogo</Button>
        </Link>
      </Card>
    );
  }

  const wa = whatsappLink(buildWhatsappQuote(items, c));

  const onWhatsapp = () => {
    void saveQuote({ customer: c, items, channel: "whatsapp" });
    setSent(true);
  };

  if (sent) {
    return (
      <Card className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/15 text-green-600">
          <Check className="h-6 w-6" />
        </div>
        <div>
          <p className="text-lg font-medium">¡Pedido enviado por WhatsApp!</p>
          <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
            Se abrió WhatsApp con tu pedido. El equipo comercial te contactará.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setSent(false)}>
            Volver al pedido
          </Button>
          <Button
            onClick={() => {
              clear();
              setSent(false);
              setC({});
            }}
          >
            Nuevo pedido
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-3 lg:col-span-2">
        {items.map((item) => (
          <Card key={item.sku} className="flex gap-4 p-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-white">
              <ProductImage src={item.imageUrl} alt={item.name} label={item.name} className="object-contain" sizes="80px" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-base font-medium leading-snug">{item.name}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">Ref. {item.sku}</p>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-1 rounded-full border border-border p-1">
                  <button
                    onClick={() => setQty(item.sku, item.qty - 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={`Restar cantidad de ${item.name}`}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center text-base font-medium tabular-nums">{item.qty}</span>
                  <button
                    onClick={() => setQty(item.sku, item.qty + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={`Sumar cantidad de ${item.name}`}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={() => remove(item.sku)}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={`Eliminar ${item.name} del pedido`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Card>
        ))}
        <button
          onClick={clear}
          className="rounded text-sm text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Vaciar pedido
        </button>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24 space-y-4 p-6">
          <div>
            <p className="text-sm text-muted-foreground">Total de referencias</p>
            <p className="text-3xl font-semibold tracking-tight tabular-nums">{items.length}</p>
          </div>

          <div className="space-y-2">
            <Field label="Nombre" value={c.name} onChange={set("name")} placeholder="Tu nombre" />
            <Field label="Empresa" value={c.company} onChange={set("company")} placeholder="Opcional" />
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">Notas</label>
              <textarea
                value={c.notes ?? ""}
                onChange={set("notes")}
                rows={2}
                placeholder="Detalles, medidas, obra…"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <a href={wa} target="_blank" rel="noopener noreferrer" className="block" onClick={onWhatsapp}>
            <Button variant="whatsapp" size="lg" className="w-full">
              <MessageCircle className="h-4 w-4" /> Enviar pedido por WhatsApp
            </Button>
          </a>
          <p className="text-center text-xs text-muted-foreground">
            No se realizan pagos en línea. Solo solicitud de cotización.
          </p>
        </Card>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-muted-foreground">{label}</label>
      <input
        type={type}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
