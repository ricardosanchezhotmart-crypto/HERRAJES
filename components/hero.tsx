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
    <section className="relative flex min-h-[560px] items-center overflow-hidden sm:min-h-[640px]">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/products/spar_rieles_kit-cajon-spar-cacerolero-h128mm-para-vidrio.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/25" />
      </div>

      <div className="container flex flex-col items-center gap-8 py-24 text-center">
        <div className="flex flex-col items-center gap-5">
          <motion.h1
            custom={0}
            variants={fade}
            initial="hidden"
            animate="show"
            className="max-w-2xl text-balance text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-[68px] lg:leading-[1.05]"
          >
            Encuentra el herraje correcto.
          </motion.h1>
          <motion.p
            custom={1}
            variants={fade}
            initial="hidden"
            animate="show"
            className="max-w-md text-balance text-lg text-white/85 sm:text-xl"
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
          className="group flex h-16 w-full max-w-xl items-center gap-3 rounded-2xl border border-white/20 bg-white/95 px-6 text-left shadow-elevate backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white dark:bg-card/95 dark:hover:bg-card"
        >
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
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
