import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { useReveal } from "../../hooks/useReveal";

const pillars = [
  {
    title: "Agricultural expertise",
    detail: "Years spent helping farmers and contractors specify equipment for real field conditions.",
  },
  {
    title: "Irrigation knowledge",
    detail: "From single boreholes to multi-zone systems, we understand how water moves through a farm.",
  },
  {
    title: "Equipment selection",
    detail: "We help you compare flow rate, head and pressure so you choose equipment that actually fits.",
  },
  {
    title: "After-sales support",
    detail: "Support doesn't end at the sale — our team remains a point of contact as your system runs.",
  },
];

export function TrustSection() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="bg-ivory-50 py-24 sm:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <div ref={ref} className="reveal order-2 overflow-hidden rounded-3xl lg:order-1">
            <img
              src="/images/story/expertise.jpg"
              alt="Technician adjusting a valve on an irrigation pump installation"
              loading="lazy"
              className="h-[26rem] w-full object-cover sm:h-[32rem]"
            />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Why Agriconic"
              title="An equipment partner that understands agriculture."
              description="Agriconic exists to help you choose correctly the first time — equipment selected for the demands of modern agriculture, not just whatever is in stock."
            />
            <dl className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {pillars.map((p) => (
                <div key={p.title}>
                  <dt className="font-display text-lg text-ink-900">{p.title}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-ink-700">{p.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
