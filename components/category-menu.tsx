"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { Category } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Menú desplegable "Herrajes ▾" del header. Navegación rápida por texto,
 * complementaria a las tarjetas con imagen de la home. Abre/cierra al hacer
 * clic o tocar (predecible en mouse y táctil), y cierra con clic afuera o Esc.
 * Las categorías sin productos aún se muestran en gris con la etiqueta "Pronto"
 * y no navegan.
 */
export function CategoryMenu({ categories }: { categories: Category[] }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Herrajes
        <ChevronDown
          className={cn("h-4 w-4 transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-50 mt-2 w-[min(92vw,34rem)] -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-elevate">
          <ul className="grid grid-cols-1 gap-0.5 sm:grid-cols-2">
            {categories.map((cat) =>
              cat.comingSoon ? (
                <li key={cat.id}>
                  <span className="flex cursor-default items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground/70">
                    {cat.name}
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                      Pronto
                    </span>
                  </span>
                </li>
              ) : (
                <li key={cat.id}>
                  <Link
                    href={`/categoria/${cat.slug}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {cat.name}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
