"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,hsl(var(--muted))_0%,transparent_70%)]" />
      <div className="container flex flex-col items-center gap-6 py-24 text-center sm:py-32">
        <motion.p
          custom={0}
          variants={fade}
          initial="hidden"
          animate="show"
          className="text-sm font-medium uppercase tracking-widest text-muted-foreground"
        >
          Distribuidora de herrajes para muebles
        </motion.p>
        <motion.h1
          custom={1}
          variants={fade}
          initial="hidden"
          animate="show"
          className="max-w-3xl text-balance text-5xl font-semibold tracking-tight sm:text-7xl"
        >
          El herraje adecuado, encontrado en segundos.
        </motion.h1>
        <motion.p
          custom={2}
          variants={fade}
          initial="hidden"
          animate="show"
          className="max-w-xl text-balance text-lg text-muted-foreground"
        >
          Catálogo profesional SPAR y BONUIT. Encuentra por código, arma tu pedido y
          solicita tu cotización sin fricción.
        </motion.p>
        <motion.div
          custom={3}
          variants={fade}
          initial="hidden"
          animate="show"
          className="flex flex-wrap items-center justify-center gap-3 pt-2"
        >
          <Link href="/marca/spar">
            <Button size="lg">
              Explorar catálogo <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/contacto">
            <Button size="lg" variant="outline">
              Contacto
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
