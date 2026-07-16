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
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-xs text-primary-foreground">
            H
          </span>
          <span className="hidden sm:inline">Herrajes</span>
        </Link>

        <button
          onClick={() => setSearchOpen(true)}
          className="hidden h-10 flex-1 max-w-md items-center gap-2 rounded-full border border-border bg-muted/40 px-4 text-sm text-muted-foreground transition hover:border-foreground/20 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:flex"
          aria-label="Buscar"
        >
          <Search className="h-4 w-4" />
          <span className="flex-1 text-left">Buscar herrajes…</span>
          <kbd className="rounded border border-border bg-background px-1.5 text-[10px]">⌘K</kbd>
        </button>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setSearchOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:hidden"
            aria-label="Buscar"
          >
            <Search className="h-5 w-5" />
          </button>

          <Link
            href="/#categorias"
            className="hidden rounded-full px-3 py-2 text-sm transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:inline-block"
          >
            Categorías
          </Link>

          <a href={whatsappLink("Hola, quiero información de sus herrajes.")} target="_blank" rel="noopener noreferrer">
            <Button variant="whatsapp" size="icon" aria-label="WhatsApp">
              <MessageCircle className="h-5 w-5" />
            </Button>
          </a>

          <ThemeToggle />
          <CartBadge />
        </div>
      </div>
    </header>
  );
}
