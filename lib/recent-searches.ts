"use client";

const KEY = "herrajes-recent-searches";
const MAX = 6;

export function getRecentSearches(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function addRecentSearch(term: string): void {
  const t = term.trim();
  if (t.length < 2) return;
  const list = [t, ...getRecentSearches().filter((x) => x.toLowerCase() !== t.toLowerCase())].slice(0, MAX);
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function clearRecentSearches(): void {
  localStorage.removeItem(KEY);
}
