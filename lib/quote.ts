import type { QuoteItem } from "@/types";

export interface QuoteCustomer {
  name?: string;
  company?: string;
  phone?: string;
  email?: string;
  notes?: string;
}

function customerLines(c: QuoteCustomer): string[] {
  const l: string[] = [];
  if (c.name) l.push(`Cliente: ${c.name}`);
  if (c.company) l.push(`Empresa: ${c.company}`);
  if (c.phone) l.push(`Teléfono: ${c.phone}`);
  if (c.email) l.push(`Correo: ${c.email}`);
  return l;
}

/** Texto plano de la cotización (para correo). */
export function buildQuoteText(items: QuoteItem[], c: QuoteCustomer = {}): string {
  return [
    "Solicitud de cotización",
    ...customerLines(c),
    "",
    ...items.map((i, n) => `${n + 1}. ${i.name}\n   Ref: ${i.sku} · Cant: ${i.qty}`),
    "",
    `Total de referencias: ${items.length}`,
    c.notes ? `\nNotas: ${c.notes}` : "",
  ]
    .filter((l) => l !== undefined)
    .join("\n");
}

/** Mensaje para WhatsApp (con formato en negrita). */
export function buildWhatsappQuote(items: QuoteItem[], c: QuoteCustomer = {}): string {
  return [
    "*Solicitud de cotización*",
    ...customerLines(c),
    "",
    ...items.map((i, n) => `${n + 1}. ${i.name}\n   Ref: ${i.sku} · Cant: ${i.qty}`),
    "",
    `Total de referencias: ${items.length}`,
    c.notes ? `\nNotas: ${c.notes}` : "",
  ].join("\n");
}

/** Genera un PDF de cotización con jsPDF (solo en cliente). */
export async function generateQuotePdf(items: QuoteItem[], c: QuoteCustomer = {}) {
  const { default: jsPDF } = await import("jspdf");
  const autoTable = (await import("jspdf-autotable")).default;

  const doc = new jsPDF();
  const marginX = 14;

  doc.setFontSize(20);
  doc.setTextColor(20);
  doc.text("Cotización", marginX, 20);

  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text(`Fecha: ${new Date().toLocaleDateString("es-CO")}`, marginX, 27);

  let y = 35;
  doc.setTextColor(40);
  for (const line of customerLines(c)) {
    doc.text(line, marginX, y);
    y += 5;
  }

  autoTable(doc, {
    startY: y + 3,
    head: [["#", "Referencia", "Producto", "Cant."]],
    body: items.map((i, n) => [String(n + 1), i.sku, i.name, String(i.qty)]),
    styles: { fontSize: 9, cellPadding: 3 },
    headStyles: { fillColor: [23, 23, 23] },
    columnStyles: { 0: { cellWidth: 12 }, 1: { cellWidth: 30 }, 3: { cellWidth: 16 } },
  });

  // @ts-expect-error lastAutoTable lo agrega el plugin autotable en runtime
  let endY = (doc.lastAutoTable?.finalY ?? y + 20) as number;
  doc.setFontSize(10);
  doc.setTextColor(40);
  doc.text(`Total de referencias: ${items.length}`, marginX, endY + 10);

  if (c.notes) {
    doc.setTextColor(90);
    doc.text(doc.splitTextToSize(`Notas: ${c.notes}`, 180), marginX, endY + 18);
  }

  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text(
    "Esta cotización no incluye precios ni constituye una factura. Solicitud sujeta a confirmación.",
    marginX,
    285
  );

  doc.save(`cotizacion-${Date.now()}.pdf`);
}
