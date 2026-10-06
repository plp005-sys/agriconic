import { Link } from "react-router-dom";
import { Container } from "../components/ui/Container";
import { Breadcrumbs } from "../components/ui/Breadcrumbs";
import { Button } from "../components/ui/Button";
import { useCompare } from "../context/CompareContext";
import { getProductBySlug } from "../lib/catalog";
import { useQuote } from "../context/QuoteContext";

export default function Compare() {
  const { slugs, remove, clear } = useCompare();
  const { openQuote } = useQuote();
  const products = slugs.map((s) => getProductBySlug(s)).filter((p): p is NonNullable<typeof p> => Boolean(p));

  const specLabels = Array.from(new Set(products.flatMap((p) => p.specifications.map((s) => s.label))));

  return (
    <div className="bg-ivory-50 py-16 sm:py-24">
      <Container>
        <Breadcrumbs items={[{ label: "Compare" }]} />
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="font-display text-4xl text-ink-900 sm:text-5xl">Compare Equipment</h1>
          {products.length > 0 && (
            <button onClick={clear} className="text-sm font-medium text-ink-700 underline underline-offset-4">
              Clear all
            </button>
          )}
        </div>

        {products.length === 0 ? (
          <div className="mt-14 flex flex-col items-center rounded-3xl border border-dashed border-ink-900/15 px-6 py-20 text-center">
            <h2 className="font-display text-xl text-ink-900">Nothing to compare yet</h2>
            <p className="mt-2 max-w-sm text-sm text-ink-700">
              Browse the catalogue and select the compare icon on any product to add it here — up to four at a time.
            </p>
            <Link to="/equipment" className="mt-6 rounded-full bg-ink-900 px-6 py-3 text-sm font-medium text-ivory-50">
              Browse Equipment
            </Link>
          </div>
        ) : (
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr>
                  <th className="w-48 text-left"></th>
                  {products.map((p) => (
                    <th key={p.id} className="min-w-[220px] px-4 pb-6 text-left align-top">
                      <div className="overflow-hidden rounded-2xl bg-ink-900/5">
                        <img src={p.images[0]} alt={p.name} className="h-36 w-full object-cover" />
                      </div>
                      <Link to={`/equipment/${p.category}/${p.slug}`} className="mt-3 block font-display text-lg text-ink-900 hover:text-moss-700">
                        {p.name}
                      </Link>
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" onClick={() => openQuote(p)}>
                          Quote
                        </Button>
                        <button
                          onClick={() => remove(p.slug)}
                          className="rounded-full border border-ink-900/15 px-4 py-2 text-xs font-medium text-ink-700 hover:border-ink-900"
                        >
                          Remove
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {specLabels.map((label) => (
                  <tr key={label} className="border-t border-ink-900/10">
                    <td className="py-4 pr-4 text-sm font-medium text-ink-900">{label}</td>
                    {products.map((p) => {
                      const spec = p.specifications.find((s) => s.label === label);
                      return (
                        <td key={p.id} className="px-4 py-4 font-mono text-sm text-ink-700">
                          {spec ? spec.value : "—"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Container>
    </div>
  );
}
