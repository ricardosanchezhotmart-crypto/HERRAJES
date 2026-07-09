"use client";

import * as React from "react";
import Link from "next/link";
import { FileText, Mail, Minus, MessageCircle, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/store/cart";
import { useMounted } from "@/lib/use-mounted";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProductImage } from "@/components/product-image";
import { buildWhatsappQuote, generateQuotePdf } from "@/lib/quote";
import { saveQuote } from "@/lib/quotes";
import type { QuoteChannel } from "@/types";
import { SITE, whatsappLink } from "@/lib/constants";

export function OrderView() {
  const mounted = useMounted();
  const { items, setQty, remove, clear } = useCart();
  const [name, setName] = React.useState("");

  if (!mounted) return <div className="h-40" />;

  if (items.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        <p className="text-lg font-medium">Tu pedido está vacío</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Agrega productos desde el catálogo para solicitar tu cotización.
        </p>
        <Link href="/marca/spar">
          <Button>Explorar catálogo</Button>
        </Link>
      </Card>
    );
  }

  const register = (channel: QuoteChannel) => {
    // Fire-and-forget: registra la cotización si hay backend, sin bloquear el envío.
    void saveQuote({ customer: { name: name || undefined }, items, channel });
  };

  const wa = whatsappLink(buildWhatsappQuote(items, name || undefined));
  const emailBody = encodeURIComponent(buildWhatsappQuote(items, name || undefined).replace(/\*/g, ""));
  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent("Solicitud de cotización")}&body=${emailBody}`;

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-3 lg:col-span-2">
        {items.map((item) => (
          <Card key={item.sku} className="flex items-center gap-4 p-4">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border">
              <ProductImage src={item.imageUrl} alt={item.name} label={item.name} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{item.name}</p>
              <p className="text-xs text-muted-foreground">Ref. {item.sku}</p>
            </div>
            <div className="flex items-center gap-1 rounded-full border border-border p-1">
              <button
                onClick={() => setQty(item.sku, item.qty - 1)}
                className="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-muted"
                aria-label="Restar"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-8 text-center text-sm font-medium">{item.qty}</span>
              <button
                onClick={() => setQty(item.sku, item.qty + 1)}
                className="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-muted"
                aria-label="Sumar"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <button
              onClick={() => remove(item.sku)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
              aria-label="Eliminar"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </Card>
        ))}
        <button
          onClick={clear}
          className="text-sm text-muted-foreground transition hover:text-foreground"
        >
          Vaciar pedido
        </button>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24 space-y-4 p-6">
          <div>
            <p className="text-sm text-muted-foreground">Total de referencias</p>
            <p className="text-3xl font-semibold tracking-tight">{items.length}</p>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Tu nombre (opcional)</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre o empresa"
              className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="space-y-2 pt-2">
            <a href={wa} target="_blank" rel="noopener noreferrer" className="block" onClick={() => register("whatsapp")}>
              <Button variant="whatsapp" className="w-full">
                <MessageCircle className="h-4 w-4" /> Enviar por WhatsApp
              </Button>
            </a>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                register("pdf");
                generateQuotePdf(items, name || undefined);
              }}
            >
              <FileText className="h-4 w-4" /> Descargar PDF
            </Button>
            <a href={mailto} className="block" onClick={() => register("email")}>
              <Button variant="outline" className="w-full">
                <Mail className="h-4 w-4" /> Enviar por correo
              </Button>
            </a>
          </div>
          <p className="text-center text-xs text-muted-foreground">
            No se realizan pagos en línea. Solo solicitud de cotización.
          </p>
        </Card>
      </div>
    </div>
  );
}
