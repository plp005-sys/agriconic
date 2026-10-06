import { Link } from "react-router-dom";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { getCategories, getProductCountByCategory } from "../../lib/catalog";
import { useReveal } from "../../hooks/useReveal";

function CategoryCard({ category, index }: { category: ReturnType<typeof getCategories>[number]; index: number }) {
  const ref = useReveal<HTMLAnchorElement>();
  const count = getProductCountByCategory(category.slug);
  return (
    <Link
      ref={ref}
      to={`/equipment/${category.slug}`}
      style={{ transitionDelay: `${(index % 3) * 90}ms` }}
      className={`reveal group relative flex h-[22rem] flex-col justify-end overflow-hidden rounded-3xl ${
        index === 0 ? "sm:col-span-2 sm:h-[28rem]" : ""
      }`}
    >
      <img
        src={category.image}
        alt={category.name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/30 to-transparent transition-opacity duration-300 group-hover:from-ink-950/95" />
      <div className="relative z-10 flex items-end justify-between gap-4 p-7">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-moss-300">
            {count} {count === 1 ? "product" : "products"}
          </span>
          <h3 className="mt-2 font-display text-2xl text-ivory-50 sm:text-3xl">{category.name}</h3>
          <p className="mt-2 max-w-sm text-sm text-ivory-200/80">{category.shortDescription}</p>
        </div>
        <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-ivory-50 text-ink-900 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17 17 7M9 7h8v8" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export function CategoryGrid() {
  const categories = getCategories();
  return (
    <section className="bg-ivory-50 py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="The Range"
            title="Equipment organised the way you work."
            description="Six core categories cover everything from lifting water to applying it precisely across your land."
          />
          <Link to="/equipment" className="text-sm font-medium text-ink-900 underline underline-offset-4 hover:text-moss-700">
            View full catalogue
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, i) => (
            <CategoryCard key={category.id} category={category} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
