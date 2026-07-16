import Link from "next/link";
import { ArrowRight, PackageOpen } from "lucide-react";
import type { Category, Product } from "@/types";
import { Card } from "@/components/ui/card";

export function CategoryGrid({
  categories,
  products,
}: {
  categories: Category[];
  products: Product[];
}) {
  if (categories.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center gap-3 py-20 text-center">
        <PackageOpen className="h-10 w-10 text-muted-foreground" />
        <p className="text-lg font-medium">Catálogo próximamente</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Estamos incorporando el catálogo. Muy pronto podrás explorarlo aquí.
        </p>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((cat) => {
        const count = products.filter((p) => p.categoryId === cat.id).length;
        return (
          <Link key={cat.id} href={`/categoria/${cat.slug}`} className="group">
            <Card className="flex h-40 flex-col justify-between p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-semibold tracking-tight">{cat.name}</h3>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </div>
              <p className="text-sm text-muted-foreground">{count} productos</p>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
