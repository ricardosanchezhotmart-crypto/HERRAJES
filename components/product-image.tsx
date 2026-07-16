import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Imagen de producto. Cuando aún no hay foto real (catálogo por importar),
 * renderiza un placeholder elegante generado por CSS — sin peticiones externas.
 * Usa next/image (fill) para lazy loading, tamaños responsivos y optimización
 * automática; el contenedor que la envuelve solo necesita definir su tamaño
 * (por ejemplo con aspect-[4/3]).
 */
export function ProductImage({
  src,
  alt,
  label,
  className,
  sizes,
  priority,
}: {
  src?: string;
  alt: string;
  label?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      <div className="relative h-full w-full">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes={sizes ?? "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"}
          className={cn("object-cover", className)}
        />
      </div>
    );
  }
  const initials = (label ?? alt)
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-background",
        className
      )}
      aria-label={alt}
    >
      <span className="select-none text-2xl font-semibold tracking-tight text-muted-foreground/50">
        {initials}
      </span>
    </div>
  );
}
