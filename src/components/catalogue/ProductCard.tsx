import { Link } from "react-router-dom";
import type { Product } from "../../types/catalog";
import { useQuote } from "../../context/QuoteContext";
import { useCompare } from "../../context/CompareContext";
import { getCategoryBySlug } from "../../lib/catalog";

export function ProductCard({ product, view = "grid" }: { product: Product; view?: "grid" | "list" }) {
  const { openQuote } = useQuote();
  const { toggle, isComparing, isFull } = useCompare();
  const comparing = isComparing(product.slug);
  const category = getCategoryBySlug(product.category);
  const keySpec = product.specifications[0];

  if (view === "list") {
    return (
      <div className="group flex flex-col gap-5 border-b border-ink-900/10 py-6 sm:flex-row sm:items-center">
        <Link
          to={`/equipment/${product.category}/${product.slug}`}
          className="relative h-48 w-full flex-shrink-0 overflow-hidden rounded-2xl bg-ink-900/5 sm:h-28 sm:w-36"
        >
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-moss-600">{category?.name}</p>
          <Link to={`/equipment/${product.category}/${product.slug}`}>
            <h3 className="mt-1 font-display text-xl text-ink-900 hover:text-moss-700">{product.name}</h3>
          </Link>
          <p className="mt-1 line-clamp-2 text-sm text-ink-700">{product.shortDescription}</p>
          {keySpec && (
            <p className="mt-2 font-mono text-xs text-ink-700/70">
              {keySpec.label}: {keySpec.value}
            </p>
          )}
        </div>
        <div className="flex flex-shrink-0 flex-wrap gap-2">
          <Link
            to={`/equipment/${product.category}/${product.slug}`}
            className="rounded-full border border-ink-900/15 px-5 py-2.5 text-sm font-medium text-ink-900 hover:border-ink-900"
          >
            View Details
          </Link>
          <button
            onClick={() => openQuote(product)}
            className="rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-ivory-50 hover:bg-moss-700"
          >
            Request Quote
          </button>
          <button
            onClick={() => toggle(product.slug)}
            aria-pressed={comparing}
            disabled={isFull && !comparing}
            className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
              comparing ? "border-moss-600 bg-moss-600 text-ivory-50" : "border-ink-900/15 text-ink-900 hover:border-ink-900"
            }`}
          >
            {comparing ? "Comparing" : "Compare"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white/60 ring-1 ring-ink-900/5 transition-shadow duration-300 hover:shadow-elevated">
      <Link to={`/equipment/${product.category}/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-ink-900/5">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {product.featured && (
          <span className="absolute left-4 top-4 rounded-full bg-ivory-50/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink-900">
            Featured
          </span>
        )}
      </Link>
      <button
        onClick={() => toggle(product.slug)}
        aria-pressed={comparing}
        disabled={isFull && !comparing}
        aria-label={comparing ? `Remove ${product.name} from comparison` : `Add ${product.name} to comparison`}
        className={`absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
          comparing ? "bg-moss-600 text-ivory-50" : "bg-ivory-50/90 text-ink-900 hover:bg-ivory-50"
        }`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {comparing ? <path d="M5 12l4 4 10-10" /> : <path d="M12 5v14M5 12h14" />}
        </svg>
      </button>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-moss-600">{category?.name}</p>
        <Link to={`/equipment/${product.category}/${product.slug}`}>
          <h3 className="mt-2 font-display text-lg leading-snug text-ink-900 transition-colors group-hover:text-moss-700">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-700">{product.shortDescription}</p>

        {keySpec && (
          <p className="mt-3 font-mono text-xs text-ink-700/70">
            {keySpec.label}: {keySpec.value}
          </p>
        )}
        <p className="mt-1 text-xs text-ink-700/60">{product.application[0]}</p>

        <div className="mt-5 flex gap-2">
          <Link
            to={`/equipment/${product.category}/${product.slug}`}
            className="flex-1 rounded-full border border-ink-900/15 px-4 py-2.5 text-center text-sm font-medium text-ink-900 transition-colors hover:border-ink-900"
          >
            View Details
          </Link>
          <button
            onClick={() => openQuote(product)}
            className="flex-1 rounded-full bg-ink-900 px-4 py-2.5 text-sm font-medium text-ivory-50 transition-colors hover:bg-moss-700"
          >
            Request Quote
          </button>
        </div>
      </div>
    </div>
  );
}
