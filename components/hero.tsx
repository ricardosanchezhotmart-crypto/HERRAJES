"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useSearchStore } from "@/store/search";
import { ProductImage } from "@/components/product-image";

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
    <section className="py-20 sm:py-28">
      <div className="container flex flex-col items-center gap-10 text-center">
        <div className="flex flex-col items-center gap-5">
          <motion.h1
            custom={0}
            variants={fade}
            initial="hidden"
            animate="show"
            className="max-w-2xl text-balance text-5xl font-semibold tracking-tight sm:text-6xl lg:text-[68px] lg:leading-[1.05]"
          >
            Encuentra el herraje correcto.
          </motion.h1>
          <motion.p
            custom={1}
            variants={fade}
            initial="hidden"
            animate="show"
            className="max-w-md text-balance text-lg text-muted-foreground sm:text-xl"
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
          className="group flex h-16 w-full max-w-xl items-center gap-3 rounded-2xl border border-border bg-card px-6 text-left shadow-subtle transition hover:border-foreground/20"
        >
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <span className="flex-1 text-base text-muted-foreground group-hover:text-foreground sm:text-lg">
            Buscar herrajes…
          </span>
          <kbd className="hidden rounded-md border border-border bg-muted px-2 py-1 text-xs text-muted-foreground sm:inline">
            ⌘K
          </kbd>
        </motion.button>

        <motion.div
          custom={3}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-6 aspect-[16/9] w-full max-w-4xl overflow-hidden rounded-2xl border border-border"
        >
          <ProductImage
            src="/products/spar_rieles_accesorio-bajo-fregadero.jpg"
            alt="Herraje instalado en un mueble de baño"
            label="Herrajes"
          />
        </motion.div>
      </div>
    </section>
  );
}
