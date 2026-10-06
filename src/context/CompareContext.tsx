import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

const STORAGE_KEY = "agriconic-compare";
const MAX_COMPARE = 4;

interface CompareContextValue {
  slugs: string[];
  toggle: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
  isComparing: (slug: string) => boolean;
  isFull: boolean;
}

const CompareContext = createContext<CompareContextValue | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
    } catch {
      // localStorage unavailable (private browsing, etc.) — fail silently.
    }
  }, [slugs]);

  const toggle = useCallback((slug: string) => {
    setSlugs((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, slug];
    });
  }, []);

  const remove = useCallback((slug: string) => {
    setSlugs((prev) => prev.filter((s) => s !== slug));
  }, []);

  const clear = useCallback(() => setSlugs([]), []);

  const value = useMemo(
    () => ({
      slugs,
      toggle,
      remove,
      clear,
      isComparing: (slug: string) => slugs.includes(slug),
      isFull: slugs.length >= MAX_COMPARE,
    }),
    [slugs, toggle, remove, clear]
  );

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within a CompareProvider");
  return ctx;
}
