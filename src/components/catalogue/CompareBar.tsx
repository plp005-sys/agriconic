import { Link } from "react-router-dom";
import { useCompare } from "../../context/CompareContext";
import { getProductBySlug } from "../../lib/catalog";

export function CompareBar() {
  const { slugs, remove, clear } = useCompare();
  if (slugs.length === 0) return null;

  const products = slugs.map((s) => getProductBySlug(s)).filter(Boolean);

  return (
    <div className="fixed inset-x-0 bottom-16 z-40 border-t border-ink-900/10 bg-ivory-50/95 backdrop-blur animate-[slideUp_0.3s_ease-out] sm:bottom-0">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-4 px-5 py-4 sm:px-8 lg:px-12">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-ink-900">Compare ({products.length}/4)</span>
          {products.map((p) =>
            p ? (
              <span key={p.slug} className="flex items-center gap-1.5 rounded-full bg-ink-900/5 py-1 pl-3 pr-1.5 text-xs text-ink-800">
                {p.name}
                <button
                  onClick={() => remove(p.slug)}
                  aria-label={`Remove ${p.name} from comparison`}
                  className="flex h-5 w-5 items-center justify-center rounded-full hover:bg-ink-900/10"
                >
                  ✕
                </button>
              </span>
            ) : null
          )}
        </div>
        <div className="flex flex-shrink-0 gap-3">
          <button onClick={clear} className="text-sm font-medium text-ink-700 underline underline-offset-4">
            Clear
          </button>
          <Link
            to="/compare"
            className="rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-ivory-50 hover:bg-moss-700"
          >
            Compare Now
          </Link>
        </div>
      </div>
    </div>
  );
}
