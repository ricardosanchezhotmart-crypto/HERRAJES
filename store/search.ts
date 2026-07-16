"use client";

import { create } from "zustand";

interface SearchState {
  open: boolean;
  setOpen: (v: boolean) => void;
  toggle: () => void;
}

/** Estado global del buscador (Cmd+K), compartido entre el Hero y la navbar. */
export const useSearchStore = create<SearchState>((set, get) => ({
  open: false,
  setOpen: (v) => set({ open: v }),
  toggle: () => set({ open: !get().open }),
}));
