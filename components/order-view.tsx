"use client";

import * as React from "react";
import Link from "next/link";
import {
  Check,
  FileText,
  Mail,
  Minus,
  MessageCircle,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { useCart } from "@/store/cart";
import { useMounted } from "@/lib/use-mounted";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProductImage } from "@/components/product-image";
import { buildQuoteText, buildWhatsappQuote, generateQuotePdf, type QuoteCustomer } from "@/lib/quote";
import { saveQuote } from "@/lib/quotes";
import type { QuoteChannel } from "@/types";
import { SITE, whatsappLink } from "@/lib/constants";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function OrderView() {
  const mounted = useMounted();
  const { items, setQty, remove, clear } = useCart();
  const [c, setC] = React.useState<QuoteCustomer>({});
  const [emailError, setEmailError] = React.useState("");
  const [sent, setSent] = React.useState<QuoteChannel | null>(null);

  const set = (k: keyof QuoteCustomer) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setC((prev) => ({ ...prev, [k]: e.target.value }));

  if (!mounted) return <div className="h-40" />;

  if (items.length === 0 && !sent) {
    return (
      <Card className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        <p className="text-lg font-medium">Tu pedido está vacío</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Agrega productos desde el catálogo para solicitar tu cotización.
        </p>
        <Link href="/#categorias">
          <Button>Explorar catálogo</Button>
        </Link>
      </Card>
    );
  }

  const validateEmail = () => {
    if (c.email && !EMAIL_RE.test(c.email)) {
      setEmailError("Correo no válido.");
      return false;
    }
    setEmailError("");
    return true;
  };

  // Registra la cotización (si hay backend) al enviar por cualquier canal.
  const register = (channel: QuoteChannel) => {
    void saveQuote({ customer: c, items, channel });
    setSent(channel);
  };

  const onWhatsapp = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!validateEmail()) {
      e.preventDefault();
      return;
    }
    register("whatsapp");
  };
  const onEmail = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!validateEmail()) {
      e.preventDefault();
      return;
    }
    register("email");
  };
  const onPdf = () => {
    if (!validateEmail()) return;
    generateQuotePdf(items, c);
    register("pdf");
  };

  const wa = whatsappLink(buildWhatsappQuote(items, c));
  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(
    "Solicitud de cotización"
  )}&body=${encodeURIComponent(buildQuoteText(items, c))}`;

  const channelLabel: Record<QuoteChannel, string> = {
    whatsapp: "por WhatsApp",
    pdf: "en PDF",
    email: "por correo",
  };

  if (sent) {
    return (
      <Card className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/15 text-green-600">
          <Check className="h-6 w-6" />
        </div>
        <div>
          <p className="text-lg font-medium">¡Cotización lista {channelLabel[sent]}!</p>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            {sent === "pdf"
              ? "Descargamos tu PDF de cotización."
              : "Se abrió tu aplicación para enviar la solicitud."}{" "}
            Tu solicitud quedó registrada y el equipo comercial te contactará.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setSent(null)}>
            Volver al pedido
          </Button>
          <Button
            onClick={() => {
              clear();
              setSent(null);
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
              <span className="w-8 text-center text-sm font-medium tabular-nums">{item.qty}</span>
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
            <p className="text-3xl font-semibold tracking-tight tabular-nums">{items.length}</p>
          </div>

          <div className="space-y-2">
            <Field label="Nombre" value={c.name} onChange={set("name")} placeholder="Tu nombre" />
            <Field label="Empresa" value={c.company} onChange={set("company")} placeholder="Opcional" />
            <Field label="Teléfono" value={c.phone} onChange={set("phone")} placeholder="Opcional" type="tel" />
            <Field
              label="Correo"
              value={c.email}
              onChange={set("email")}
              placeholder="Opcional"
              type="email"
              error={emailError}
            />
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Notas</label>
              <textarea
                value={c.notes ?? ""}
                onChange={set("notes")}
                rows={2}
                placeholder="Detalles, medidas, obra…"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div className="space-y-2 pt-1">
            <a href={wa} target="_blank" rel="noopener noreferrer" className="block" onClick={onWhatsapp}>
              <Button variant="whatsapp" className="w-full">
                <MessageCircle className="h-4 w-4" /> Enviar por WhatsApp
              </Button>
            </a>
            <Button variant="outline" className="w-full" onClick={onPdf}>
              <FileText className="h-4 w-4" /> Descargar PDF
            </Button>
            <a href={mailto} className="block" onClick={onEmail}>
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

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
}: {
  label: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  error?: string;
}) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <input
        type={type}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
