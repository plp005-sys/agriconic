import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { getDiscoveryOptions, getProductsForDiscoveryOption } from "../../lib/catalog";
import { ProductCard } from "../catalogue/ProductCard";

export function DiscoveryFinder() {
  const options = getDiscoveryOptions();
  const [activeId, setActiveId] = useState(options[0].id);

  const activeOption = useMemo(() => options.find((o) => o.id === activeId) ?? options[0], [activeId, options]);
  const results = useMemo(() => getProductsForDiscoveryOption(activeOption, 4), [activeOption]);

  return (
    <section className="bg-ink-900 py-24 text-ivory-50 sm:py-32">
      <Container>
        <SectionHeading
          tone="light"
          eyebrow="Find the right equipment"
          title="What are you trying to achieve?"
          description="Start with your goal, not a product name. We'll point you to equipment from the catalogue that fits."
        />

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div className="flex flex-wrap gap-3 lg:flex-col lg:flex-nowrap">
            {options.map((option) => {
              const active = option.id === activeId;
              return (
                <button
                  key={option.id}
                  onClick={() => setActiveId(option.id)}
                  aria-pressed={active}
                  className={`group flex w-full items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left transition-colors duration-300 ${
                    active
                      ? "border-moss-400 bg-moss-700/30"
                      : "border-ivory-50/10 hover:border-ivory-50/30"
                  }`}
                >
                  <span>
                    <span className="block font-display text-base sm:text-lg">{option.label}</span>
                    <span className="mt-1 block text-xs text-ivory-200/60 sm:text-sm">{option.description}</span>
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`flex-shrink-0 transition-transform duration-300 ${active ? "rotate-90 text-moss-300" : "text-ivory-50/40"}`}
                  >
                    <path d="m9 6 6 6-6 6" />
                  </svg>
                </button>
              );
            })}
          </div>

          <div>
            {results.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {results.map((product) => (
                  <div key={product.id} className="rounded-3xl bg-ivory-50 p-1">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-full min-h-[16rem] flex-col items-center justify-center rounded-3xl border border-dashed border-ivory-50/20 p-10 text-center">
                <p className="text-ivory-200/70">
                  We don't have a direct match yet — our team can still help you find the right fit.
                </p>
              </div>
            )}
            <Link
              to={`/equipment?tag=${encodeURIComponent(activeOption.tags[0] ?? "")}`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-moss-300 hover:text-moss-200"
            >
              See all matching equipment
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
