import { Container } from "../components/ui/Container";
import { Breadcrumbs } from "../components/ui/Breadcrumbs";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Button } from "../components/ui/Button";
import { useQuote } from "../context/QuoteContext";

const pillars = [
  { title: "Agricultural expertise", detail: "We work with farmers, contractors and estates across a range of operation sizes, and bring that context into every equipment conversation." },
  { title: "Irrigation knowledge", detail: "Matching pump curves, pipe sizing and sprinkler spacing is where most irrigation projects succeed or fail. It's where we focus." },
  { title: "Product quality", detail: "We select equipment for durability under real field conditions, not just specification sheets." },
  { title: "Technical support", detail: "Our team is available to talk through flow rate, head and pressure requirements before you buy." },
  { title: "Sales expertise", detail: "Straightforward guidance — we'll tell you what fits your operation, not just what's in stock." },
  { title: "After-sales support", detail: "The relationship continues after the sale, as your system runs through the season." },
];

export default function About() {
  const { openQuote } = useQuote();
  return (
    <div className="bg-ivory-50">
      <div className="border-b border-ink-900/10 bg-ivory-100">
        <Container className="py-14 sm:py-20">
          <Breadcrumbs items={[{ label: "About" }]} />
          <SectionHeading
            className="mt-6"
            eyebrow="About Agriconic"
            title="An equipment partner for modern agriculture."
            description="Agriconic supplies pumps, pipes, fittings, sprinklers, irrigation systems and supporting agricultural equipment to farmers, commercial growers, contractors, estates and landscapers."
          />
        </Container>
      </div>

      <Container className="py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl text-ink-900 sm:text-3xl">How we work</h2>
            <p className="mt-5 text-base leading-relaxed text-ink-700">
              Choosing agricultural equipment shouldn't require guesswork. We help customers understand
              what a piece of equipment actually does, how it performs, and whether it fits their land,
              crop and water source — before they commit to a purchase.
            </p>
            <p className="mt-5 text-base leading-relaxed text-ink-700">
              That starts online: browsing the catalogue, comparing specifications, and reaching out with
              questions. It continues in the showroom, where our team can finalise sizing and answer
              questions in person.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={() => openQuote(null)}>Request a Quote</Button>
              <Button as="link" to="/contact" variant="outline">
                Contact the Team
              </Button>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl">
            <img
              src="/images/story/expertise.jpg"
              alt="Technician adjusting a valve on an irrigation pump installation"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-24">
          <h2 className="font-display text-2xl text-ink-900 sm:text-3xl">What we bring to every enquiry</h2>
          <dl className="mt-10 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title} className="border-t border-ink-900/10 pt-5">
                <dt className="font-display text-lg text-ink-900">{p.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink-700">{p.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </div>
  );
}
