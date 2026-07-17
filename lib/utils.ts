import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formatea un precio en pesos colombianos (COP), sin decimales. */
export function formatCOP(value: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

/** Precio mínimo entre las variantes de un producto (para "desde $…"). */
export function minPrice(prices: (number | undefined)[]): number | undefined {
  const nums = prices.filter((p): p is number => typeof p === "number");
  return nums.length ? Math.min(...nums) : undefined;
}

/** Genera un slug URL-safe a partir de un texto (acentos incluidos). */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/['"”’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

/** Tokens de búsqueda a partir de campos clave del producto. */
export function buildSearchTokens(parts: (string | undefined)[]): string[] {
  const text = parts.filter(Boolean).join(" ").toLowerCase();
  return Array.from(new Set(text.split(/[^a-z0-9]+/).filter((t) => t.length > 1)));
}
