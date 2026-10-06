import { Link } from "react-router-dom";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { getSolutions } from "../../lib/catalog";
import { useReveal } from "../../hooks/useReveal";

function SolutionCard({ solution, index }: { solution: ReturnType<typeof getSolutions>[number]; index: number }) {
  const ref = useReveal<HTMLAnchorElement>();
  return (
    <Link
      ref={ref}
      to={`/solutions/${solution.slug}`}
      style={{ transitionDelay: `${(index % 3) * 90}ms` }}
      className="reveal group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-ink-900 p-8 text-ivory-50 transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="absolute inset-0 opacity-25 transition-opacity duration-500 group-hover:opacity-40">
        <img src={solution.image} alt="" className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/40" />
      <div className="relative z-10">
        <span className="font-mono text-xs text-moss-300">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="mt-4 font-display text-2xl leading-snug">{solution.title}</h3>
        <p className="mt-3 text-sm text-ivory-200/75">{solution.summary}</p>
      </div>
      <span className="relative z-10 mt-8 inline-flex items-center gap-2 text-sm font-medium text-ivory-50">
        Explore solution
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-1">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}

export function SolutionsSection() {
  const solutions = getSolutions();
  return (
    <section className="bg-ivory-50 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Agricultural Solutions"
          title="Organised around what you're growing and how."
          description="Every solution connects straight to the relevant equipment in the catalogue, so you're never guessing where to start."
          align="center"
        />
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution, i) => (
            <SolutionCard key={solution.id} solution={solution} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
