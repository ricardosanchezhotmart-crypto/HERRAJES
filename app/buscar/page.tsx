import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchResults } from "@/components/search-results";

export const metadata: Metadata = { title: "Buscar" };

export default function SearchPage() {
  return (
    <main className="container py-12 sm:py-16">
      <h1 className="mb-8 text-4xl font-semibold tracking-tight sm:text-5xl">Buscar en el catálogo</h1>
      <Suspense fallback={<div className="h-14" />}>
        <SearchResults />
      </Suspense>
    </main>
  );
}
