import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/constants";

/** Botón flotante de WhatsApp, siempre visible, para contacto directo. */
export function WhatsappFab() {
  return (
    <a
      href={whatsappLink("Hola 👋 Quiero información de sus herrajes.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#16A34A] text-white shadow-elevate transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:h-16 sm:w-16"
    >
      <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8" />
    </a>
  );
}
