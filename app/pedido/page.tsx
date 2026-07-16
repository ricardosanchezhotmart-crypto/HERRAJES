import type { Metadata } from "next";
import { OrderView } from "@/components/order-view";

export const metadata: Metadata = { title: "Mi pedido" };

export default function OrderPage() {
  return (
    <main className="container max-w-4xl py-12 sm:py-16">
      <h1 className="mb-3 text-4xl font-semibold tracking-tight sm:text-5xl">Mi pedido</h1>
      <p className="mb-10 text-lg text-muted-foreground">
        Revisa tus productos y envía tu solicitud de cotización.
      </p>
      <OrderView />
    </main>
  );
}
