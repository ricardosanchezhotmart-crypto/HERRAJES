"use client";

import Link from "next/link";
import { MessageCircle, Search } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/constants";
import { useSearchStore } from "@/store/search";
import { CartBadge } from "@/components/cart-badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const setSearchOpen = useSearchStore((s) => s.setOpen);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-14 items-center justify-between gap-4 sm:h-16">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-[11px] text-primary-foreground sm:h-7 sm:w-7 sm:rounded-lg sm:text-xs">
            H
          </span>
          <span className="hidden sm:inline">Herrajes</span>
        </Link>

        <button
          onClick={() => setSearchOpen(true)}
          className="hidden h-9 flex-1 max-w-md items-center gap-2 rounded-full border border-border bg-muted/40 px-4 text-sm text-muted-foreground transition hover:border-foreground/20 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:flex"
          aria-label="Buscar"
        >
          <Search className="h-4 w-4" />
          <span className="flex-1 text-left">Buscar herrajes…</span>
          <kbd className="rounded border border-border bg-background px-1.5 text-[10px]">⌘K</kbd>
        </button>

        <div className="flex items-center gap-0.5 sm:gap-1">
          <button
            onClick={() => setSearchOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:hidden"
            aria-label="Buscar"
          >
            <Search className="h-4 w-4" />
          </button>

          <Link
            href="/#categorias"
            className="hidden rounded-full px-3 py-2 text-sm transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:inline-block"
          >
            Categorías
          </Link>

          <a href={whatsappLink("Hola, quiero información de sus herrajes.")} target="_blank" rel="noopener noreferrer">
            <Button variant="whatsapp" size="icon" className="h-9 w-9 sm:h-10 sm:w-10" aria-label="WhatsApp">
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </a>

          <ThemeToggle />
          <CartBadge />
        </div>
      </div>
    </header>
  );
}
