import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { useReveal } from "../../hooks/useReveal";

const audiences = [
  { label: "Smallholder farms", detail: "Compact, cost-effective equipment sized for small plots." },
  { label: "Commercial farms", detail: "Higher-capacity pumps and systems for sustained operation." },
  { label: "Greenhouses", detail: "Precise, low-flow water and nutrient application." },
  { label: "Estates", detail: "Reliable multi-zone irrigation across large grounds." },
  { label: "Agricultural contractors", detail: "Durable equipment specified for varied client sites." },
  { label: "Landscapers", detail: "Even coverage for lawns, amenity and ornamental areas." },
];

export function BuiltAroundFarm() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="relative overflow-hidden bg-ink-950 py-24 text-ivory-50 sm:py-32">
      <img
        src="/images/story/built-around-your-farm.jpg"
        alt="Wide view of a commercial farm field with an irrigation system running at sunrise"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/50" />
      <Container className="relative z-10">
        <div ref={ref} className="reveal grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <SectionHeading
            tone="light"
            eyebrow="Built Around Your Farm"
            title="Different farms. Different demands. The right equipment matters."
            description="From a quarter-acre vegetable plot to a multi-hectare commercial field, the right pump, pipe and sprinkler combination changes. We help you match equipment to your operation, not the other way around."
          />
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {audiences.map((a) => (
              <div key={a.label} className="border-l-2 border-moss-500/60 pl-5">
                <h3 className="font-display text-lg text-ivory-50">{a.label}</h3>
                <p className="mt-1.5 text-sm text-ivory-200/70">{a.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
