import { cn } from "@/lib/utils";

/**
 * Imagen de producto. Cuando aún no hay foto real (catálogo por importar),
 * renderiza un placeholder elegante generado por CSS — sin peticiones externas.
 */
export function ProductImage({
  src,
  alt,
  label,
  className,
}: {
  src?: string;
  alt: string;
  label?: string;
  className?: string;
}) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={cn("h-full w-full object-cover", className)}
      />
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
