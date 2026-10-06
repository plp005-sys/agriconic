import { Link } from "react-router-dom";
import { Container } from "../components/ui/Container";
import { Breadcrumbs } from "../components/ui/Breadcrumbs";
import { SectionHeading } from "../components/ui/SectionHeading";
import { getSolutions } from "../lib/catalog";

export default function Solutions() {
  const solutions = getSolutions();
  return (
    <div className="bg-ivory-50">
      <div className="border-b border-ink-900/10 bg-ivory-100">
        <Container className="py-14 sm:py-20">
          <Breadcrumbs items={[{ label: "Solutions" }]} />
          <SectionHeading
            className="mt-6"
            eyebrow="Agricultural Solutions"
            title="Equipment organised around what you're trying to do."
            description="Each solution brings together the pumps, pipes, fittings and application equipment relevant to a real farming need."
          />
        </Container>
      </div>

      <Container className="py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {solutions.map((solution) => (
            <Link
              key={solution.id}
              to={`/solutions/${solution.slug}`}
              className="group relative flex h-80 flex-col justify-end overflow-hidden rounded-3xl"
            >
              <img
                src={solution.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/30 to-transparent" />
              <div className="relative z-10 p-8">
                <h2 className="font-display text-2xl text-ivory-50">{solution.title}</h2>
                <p className="mt-2 max-w-sm text-sm text-ivory-200/80">{solution.summary}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ivory-50">
                  Explore
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
