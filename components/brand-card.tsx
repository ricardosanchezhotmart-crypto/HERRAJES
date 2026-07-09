"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Brand } from "@/types";

export function BrandCard({ brand, index = 0 }: { brand: Brand; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/marca/${brand.slug}`}
        className="group relative flex h-64 flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent to-muted/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="flex items-start justify-between">
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Marca
          </span>
          <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
        <div>
          <h3 className="text-4xl font-semibold tracking-tight">{brand.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">Ver catálogo completo</p>
        </div>
      </Link>
    </motion.div>
  );
}
