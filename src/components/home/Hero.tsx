import { Link } from "react-router-dom";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-ink-950 text-ivory-50">
      <img
        src="/images/hero/hero-irrigation.jpg"
        alt="Center-pivot irrigation system spraying water across a green agricultural field at golden hour"
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-ink-950/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950/70 via-transparent to-transparent" />

      <Container className="relative z-10 pb-20 pt-40 sm:pb-28">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-moss-300 reveal is-visible">
          Agricultural equipment &amp; irrigation
        </p>
        <h1 className="max-w-4xl font-display text-[clamp(2.5rem,6vw,5.25rem)] font-medium leading-[1.02] tracking-tight">
          Equipment that keeps agriculture moving.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ivory-200/90 sm:text-xl">
          Explore pumps, irrigation systems, pipes, fittings and agricultural equipment selected for the
          demands of modern farming.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button as="link" to="/equipment" size="lg">
            Explore Equipment
          </Button>
          <Button as="link" to="/contact" variant="outlineLight" size="lg">
            Talk to Sales
          </Button>
        </div>
      </Container>

      <Link
        to="/equipment"
        aria-hidden="true"
        className="absolute bottom-8 right-8 hidden h-16 w-16 animate-bounce items-center justify-center rounded-full border border-ivory-50/30 text-ivory-50 sm:flex"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 4v16M5 13l7 7 7-7" />
        </svg>
      </Link>
    </section>
  );
}
