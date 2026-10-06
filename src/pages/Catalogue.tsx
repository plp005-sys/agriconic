import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { Container } from "../components/ui/Container";
import { ProductCard } from "../components/catalogue/ProductCard";
import { getAllApplications, getCategories, getCategoryBySlug, searchProducts } from "../lib/catalog";
import { Breadcrumbs } from "../components/ui/Breadcrumbs";

export default function Catalogue() {
  const { category: categoryParam } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const categories = getCategories();
  const applications = useMemo(() => getAllApplications(), []);

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [application, setApplication] = useState(searchParams.get("application") ?? "all");
  const [sort, setSort] = useState<"relevance" | "name-asc" | "name-desc">(
    (searchParams.get("sort") as "relevance" | "name-asc" | "name-desc") ?? "relevance"
  );
  const [view, setView] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const activeCategory = categoryParam ?? "all";
  const tag = searchParams.get("tag") ?? undefined;
  const categoryInfo = activeCategory !== "all" ? getCategoryBySlug(activeCategory) : undefined;

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  const results = useMemo(
    () =>
      searchProducts({
        query,
        category: activeCategory,
        application,
        tag,
        sort,
      }),
    [query, activeCategory, application, tag, sort]
  );

  const handleQueryChange = (value: string) => {
    setQuery(value);
    const next = new URLSearchParams(searchParams);
    if (value) next.set("q", value);
    else next.delete("q");
    setSearchParams(next, { replace: true });
  };

  return (
    <div className="bg-ivory-50">
      <div className="border-b border-ink-900/10 bg-ivory-100">
        <Container className="py-14 sm:py-20">
          <Breadcrumbs
            items={[
              { label: "Equipment", to: "/equipment" },
              ...(categoryInfo ? [{ label: categoryInfo.name }] : []),
            ]}
          />
          <h1 className="mt-6 font-display text-4xl text-ink-900 sm:text-5xl">
            {categoryInfo ? categoryInfo.name : "All Equipment"}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-ink-700 sm:text-lg">
            {categoryInfo ? categoryInfo.description : "Search and filter the full Agriconic catalogue to find equipment matched to your farm."}
          </p>
        </Container>
      </div>

      <Container className="py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* Filters - desktop */}
          <aside className="hidden lg:block">
            <FilterPanel
              categories={categories}
              applications={applications}
              activeCategory={activeCategory}
              application={application}
              setApplication={setApplication}
            />
          </aside>

          <div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-sm">
                <input
                  type="search"
                  value={query}
                  onChange={(e) => handleQueryChange(e.target.value)}
                  placeholder="Search by name, use or spec…"
                  aria-label="Search equipment"
                  className="w-full rounded-full border border-ink-900/15 bg-white px-5 py-3 text-sm focus:border-moss-600 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="rounded-full border border-ink-900/15 px-4 py-2.5 text-sm font-medium lg:hidden"
                >
                  Filters
                </button>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as typeof sort)}
                  aria-label="Sort products"
                  className="rounded-full border border-ink-900/15 bg-white px-4 py-2.5 text-sm focus:border-moss-600 focus:outline-none"
                >
                  <option value="relevance">Sort: Relevance</option>
                  <option value="name-asc">Name: A–Z</option>
                  <option value="name-desc">Name: Z–A</option>
                </select>
                <div className="hidden items-center gap-1 rounded-full border border-ink-900/15 p-1 sm:flex">
                  <button
                    aria-label="Grid view"
                    aria-pressed={view === "grid"}
                    onClick={() => setView("grid")}
                    className={`rounded-full p-2 ${view === "grid" ? "bg-ink-900 text-ivory-50" : "text-ink-700"}`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
                    </svg>
                  </button>
                  <button
                    aria-label="List view"
                    aria-pressed={view === "list"}
                    onClick={() => setView("list")}
                    className={`rounded-full p-2 ${view === "list" ? "bg-ink-900 text-ivory-50" : "text-ink-700"}`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <p className="mt-6 text-sm text-ink-700/70">
              {results.length} {results.length === 1 ? "result" : "results"}
            </p>

            {results.length === 0 ? (
              <EmptyState query={query} />
            ) : view === "grid" ? (
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="mt-2">
                {results.map((p) => (
                  <ProductCard key={p.id} product={p} view="list" />
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[70] flex items-end bg-ink-950/60 lg:hidden" onClick={() => setMobileFiltersOpen(false)}>
          <div
            className="max-h-[85vh] w-full overflow-y-auto rounded-t-3xl bg-ivory-50 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-xl">Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters" className="h-9 w-9 rounded-full border border-ink-900/15">
                ✕
              </button>
            </div>
            <FilterPanel
              categories={categories}
              applications={applications}
              activeCategory={activeCategory}
              application={application}
              setApplication={setApplication}
            />
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-8 w-full rounded-full bg-ink-900 py-3.5 text-sm font-medium text-ivory-50"
            >
              Show {results.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterPanel({
  categories,
  applications,
  activeCategory,
  application,
  setApplication,
}: {
  categories: ReturnType<typeof getCategories>;
  applications: string[];
  activeCategory: string;
  application: string;
  setApplication: (v: string) => void;
}) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-700/70">Category</h3>
        <ul className="space-y-1">
          <li>
            <Link
              to="/equipment"
              className={`block rounded-lg px-3 py-2 text-sm ${
                activeCategory === "all" ? "bg-ink-900 text-ivory-50" : "text-ink-800 hover:bg-ink-900/5"
              }`}
            >
              All Equipment
            </Link>
          </li>
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                to={`/equipment/${c.slug}`}
                className={`block rounded-lg px-3 py-2 text-sm ${
                  activeCategory === c.slug ? "bg-ink-900 text-ivory-50" : "text-ink-800 hover:bg-ink-900/5"
                }`}
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-700/70">Application</h3>
        <select
          value={application}
          onChange={(e) => setApplication(e.target.value)}
          className="w-full rounded-xl border border-ink-900/15 bg-white px-3 py-2.5 text-sm focus:border-moss-600 focus:outline-none"
        >
          <option value="all">All applications</option>
          {applications.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="mt-10 flex flex-col items-center rounded-3xl border border-dashed border-ink-900/15 px-6 py-20 text-center">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ink-700/40">
        <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
      </svg>
      <h3 className="mt-5 font-display text-xl text-ink-900">No equipment matched{query ? ` "${query}"` : " these filters"}</h3>
      <p className="mt-2 max-w-sm text-sm text-ink-700">
        Try a broader search term, clear a filter, or speak with our sales team — we can often source
        equipment not yet listed online.
      </p>
      <Link to="/contact" className="mt-6 text-sm font-medium text-moss-700 underline underline-offset-4">
        Contact Sales
      </Link>
    </div>
  );
}
