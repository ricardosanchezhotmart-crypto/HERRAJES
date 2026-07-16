import type { Metadata } from "next";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SITE, whatsappLink } from "@/lib/constants";

export const metadata: Metadata = { title: "Contacto" };

export default function ContactPage() {
  return (
    <main className="container max-w-3xl py-16 sm:py-20">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Contacto</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        Escríbenos y con gusto te asesoramos para elegir el herraje adecuado.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <a href={whatsappLink("Hola, quiero información de sus herrajes.")} target="_blank" rel="noopener noreferrer">
          <Card className="hover-lift flex h-full flex-col gap-3 p-6">
            <MessageCircle className="h-6 w-6 text-[#25D366]" />
            <div>
              <p className="font-medium">WhatsApp</p>
              <p className="text-sm text-muted-foreground">Respuesta rápida a tus consultas</p>
            </div>
          </Card>
        </a>
        <a href={`mailto:${SITE.email}`}>
          <Card className="hover-lift flex h-full flex-col gap-3 p-6">
            <Mail className="h-6 w-6" />
            <div>
              <p className="font-medium">Correo</p>
              <p className="text-sm text-muted-foreground">{SITE.email}</p>
            </div>
          </Card>
        </a>
      </div>

      <Card className="mt-4 flex items-center gap-3 p-6 text-sm text-muted-foreground">
        <MapPin className="h-5 w-5 shrink-0" />
        Distribuidora de herrajes para muebles.
      </Card>

      <div className="mt-10 flex justify-center">
        <a href={whatsappLink("Hola, quiero información de sus herrajes.")} target="_blank" rel="noopener noreferrer">
          <Button size="lg" variant="whatsapp">
            <MessageCircle className="h-4 w-4" /> Escribir por WhatsApp
          </Button>
        </a>
      </div>
    </main>
  );
}
