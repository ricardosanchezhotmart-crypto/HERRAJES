import type { QuoteItem } from "@/types";

/** Mensaje de cotización para WhatsApp. */
export function buildWhatsappQuote(items: QuoteItem[], customerName?: string): string {
  const lines = [
    "*Solicitud de cotización*",
    customerName ? `Cliente: ${customerName}` : "",
    "",
    ...items.map(
      (i, n) => `${n + 1}. ${i.name}\n   Ref: ${i.sku} · Cant: ${i.qty}`
    ),
    "",
    `Total de referencias: ${items.length}`,
  ];
  return lines.filter(Boolean).join("\n");
}

/** Genera un PDF de cotización con jsPDF (solo en cliente). */
export async function generateQuotePdf(items: QuoteItem[], customerName?: string) {
  const { default: jsPDF } = await import("jspdf");
  const autoTable = (await import("jspdf-autotable")).default;

  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Cotización", 14, 20);
  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text(new Date().toLocaleDateString("es-CO"), 14, 27);
  if (customerName) doc.text(`Cliente: ${customerName}`, 14, 33);

  autoTable(doc, {
    startY: customerName ? 40 : 34,
    head: [["#", "Referencia", "Producto", "Cant."]],
    body: items.map((i, n) => [String(n + 1), i.sku, i.name, String(i.qty)]),
    styles: { fontSize: 9, cellPadding: 3 },
    headStyles: { fillColor: [23, 23, 23] },
  });

  doc.save(`cotizacion-${Date.now()}.pdf`);
}
