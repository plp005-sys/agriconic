import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { Product } from "../types/catalog";

interface QuoteContextValue {
  isOpen: boolean;
  product: Product | null;
  openQuote: (product?: Product | null) => void;
  closeQuote: () => void;
}

const QuoteContext = createContext<QuoteContextValue | undefined>(undefined);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  const openQuote = useCallback((p?: Product | null) => {
    setProduct(p ?? null);
    setIsOpen(true);
  }, []);

  const closeQuote = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({ isOpen, product, openQuote, closeQuote }),
    [isOpen, product, openQuote, closeQuote]
  );

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote must be used within a QuoteProvider");
  return ctx;
}
