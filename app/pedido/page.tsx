import type { Metadata } from "next";
import { OrderView } from "@/components/order-view";

export const metadata: Metadata = { title: "Mi pedido" };

export default function OrderPage() {
  return (
    <main className="container max-w-4xl py-12">
      <h1 className="mb-2 text-4xl font-semibold tracking-tight">Mi pedido</h1>
      <p className="mb-8 text-muted-foreground">
        Revisa tus productos y envía tu solicitud de cotización.
      </p>
      <OrderView />
    </main>
  );
}
