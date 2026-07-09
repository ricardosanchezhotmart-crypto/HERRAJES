"use client";

import * as React from "react";
import Link from "next/link";
import { MessageCircle, Search } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/constants";
import { SearchCommand } from "@/components/search-command";
import { CartBadge } from "@/components/cart-badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [searchOpen, setSearchOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-xs text-primary-foreground">
            H
          </span>
          <span className="hidden sm:inline">Herrajes</span>
        </Link>

        <nav className="hidden items-center gap-1 text-sm md:flex">
          <Link href="/marca/spar" className="rounded-full px-3 py-2 transition hover:bg-muted">
            SPAR
          </Link>
          <Link href="/marca/bonuit" className="rounded-full px-3 py-2 transition hover:bg-muted">
            BONUIT
          </Link>
          <Link href="/contacto" className="rounded-full px-3 py-2 transition hover:bg-muted">
            Contacto
          </Link>
        </nav>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setSearchOpen(true)}
            className="flex h-10 items-center gap-2 rounded-full border border-border bg-muted/40 px-3 text-sm text-muted-foreground transition hover:bg-muted"
            aria-label="Buscar"
          >
            <Search className="h-4 w-4" />
            <span className="hidden lg:inline">Buscar…</span>
            <kbd className="hidden rounded border border-border bg-background px-1.5 text-[10px] lg:inline">
              ⌘K
            </kbd>
          </button>

          <a href={whatsappLink("Hola, quiero información de sus herrajes.")} target="_blank" rel="noopener noreferrer">
            <Button variant="whatsapp" size="icon" aria-label="WhatsApp">
              <MessageCircle className="h-5 w-5" />
            </Button>
          </a>

          <ThemeToggle />
          <CartBadge />
        </div>
      </div>

      <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
