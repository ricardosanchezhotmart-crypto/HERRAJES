"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useSearchStore } from "@/store/search";

const fade = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function Hero() {
  const setSearchOpen = useSearchStore((s) => s.setOpen);

  return (
    <section className="relative flex min-h-[400px] items-center overflow-hidden sm:min-h-[520px] lg:min-h-[640px]">
      <div className="absolute inset-0 -z-10">
        {/* La foto funciona como fondo inspirador: ligero desenfoque + un
            leve escalado (para que el blur no revele bordes) mantienen el foco
            en el título y el buscador. */}
        <Image
          src="/hero-cocina.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-105 object-cover blur-[3px]"
        />
        {/* Overlay oscuro (~55%) para máximo contraste y legibilidad,
            reforzado arriba y abajo con un degradado sutil. */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
      </div>

      <div className="container flex flex-col items-center gap-7 py-16 text-center sm:gap-9 sm:py-24 lg:py-28">
        <div className="flex flex-col items-center gap-4 sm:gap-5 [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]">
          <motion.h1
            custom={0}
            variants={fade}
            initial="hidden"
            animate="show"
            className="max-w-2xl text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl lg:text-[68px] lg:leading-[1.05]"
          >
            Encuentra el herraje correcto.
          </motion.h1>
          <motion.p
            custom={1}
            variants={fade}
            initial="hidden"
            animate="show"
            className="max-w-md text-balance text-base text-white/90 sm:text-lg lg:text-xl"
          >
            Busca por código, nombre, medida o descripción.
          </motion.p>
        </div>

        <motion.button
          custom={2}
          variants={fade}
          initial="hidden"
          animate="show"
          onClick={() => setSearchOpen(true)}
          aria-label="Abrir búsqueda de herrajes"
          className="group flex h-14 w-full max-w-xl items-center gap-3 rounded-2xl bg-white px-6 text-left shadow-2xl ring-1 ring-black/5 transition hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white dark:bg-card sm:h-16"
        >
          <Search className="h-5 w-5 shrink-0 text-primary" />
          <span className="flex-1 text-base text-muted-foreground group-hover:text-foreground sm:text-lg">
            Buscar herrajes…
          </span>
          <kbd className="hidden rounded-md border border-border bg-muted px-2 py-1 text-xs text-muted-foreground sm:inline">
            ⌘K
          </kbd>
        </motion.button>
      </div>
    </section>
  );
}
