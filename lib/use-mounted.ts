"use client";

import { useEffect, useState } from "react";

/** Evita mismatches de hidratación para valores solo disponibles en cliente. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
