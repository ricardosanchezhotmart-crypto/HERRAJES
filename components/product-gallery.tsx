"use client";

import * as React from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ProductImage } from "@/components/product-image";
import { cn } from "@/lib/utils";

/** Foto principal + miniaturas con zoom en modal, para la ficha de producto. */
export function ProductGallery({ images, name }: { images?: string[]; name: string }) {
  const gallery = images && images.length > 0 ? images : undefined;
  const [active, setActive] = React.useState(0);
  const [zoomOpen, setZoomOpen] = React.useState(false);
  const current = gallery?.[active];

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      <Card className="group relative aspect-[4/3] overflow-hidden">
        <button
          type="button"
          onClick={() => gallery && setZoomOpen(true)}
          disabled={!gallery}
          aria-label={`Ampliar imagen de ${name}`}
          className="block h-full w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset disabled:cursor-default"
        >
          <ProductImage src={current} alt={name} label={name} priority sizes="(min-width: 1024px) 768px, 100vw" />
        </button>
        {gallery && (
          <span className="pointer-events-none absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-transform duration-200 group-hover:scale-110">
            <ZoomIn className="h-4 w-4" />
          </span>
        )}
      </Card>

      {gallery && gallery.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {gallery.slice(0, 4).map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ver imagen ${i + 1} de ${name}`}
              aria-current={active === i}
              className={cn(
                "overflow-hidden rounded-xl border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active === i ? "border-primary" : "border-border opacity-70 hover:opacity-100"
              )}
            >
              <Card className="aspect-square overflow-hidden border-0">
                <ProductImage src={src} alt={`${name} ${i + 1}`} label={name} sizes="120px" />
              </Card>
            </button>
          ))}
        </div>
      )}

      <Dialog open={zoomOpen} onOpenChange={setZoomOpen}>
        <DialogContent className="top-1/2 max-w-4xl -translate-y-1/2 border-none bg-black/95 p-2 text-white shadow-2xl sm:p-4">
          <DialogTitle className="sr-only">{name}</DialogTitle>
          {current && (
            <div className="relative aspect-[4/3] w-full">
              <Image src={current} alt={name} fill sizes="90vw" className="rounded-xl object-contain" />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
