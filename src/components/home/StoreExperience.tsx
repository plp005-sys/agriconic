import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { siteConfig } from "../../config/site";
import { buildWhatsAppLink, generalEnquiryMessage } from "../../lib/whatsapp";
import { useQuote } from "../../context/QuoteContext";

const steps = [
  { title: "Browse online", detail: "Explore categories, solutions and specifications from anywhere." },
  { title: "Identify suitable equipment", detail: "Use specifications and application tags to narrow your options." },
  { title: "Contact sales", detail: "Ask questions directly over WhatsApp, phone or email." },
  { title: "Request a quotation", detail: "Submit your requirements and get pricing before you travel." },
  { title: "Visit the store prepared", detail: "Arrive knowing exactly what you need, ready to finalise your order." },
];

export function StoreExperience() {
  const { openQuote } = useQuote();
  return (
    <section className="bg-ivory-100 py-24 sm:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div>
            <SectionHeading
              eyebrow="The Store Experience"
              title="Know what you need before you arrive."
              description="Our showroom carries the full range, but your time is valuable. Do the groundwork online, then come in ready to collect or finalise your order."
            />
            <ol className="mt-10 space-y-6">
              {steps.map((step, i) => (
                <li key={step.title} className="flex gap-5">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-ink-900/15 font-mono text-sm text-ink-900">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg text-ink-900">{step.title}</h3>
                    <p className="mt-1 text-sm text-ink-700">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="overflow-hidden rounded-3xl bg-ink-900 text-ivory-50">
            <img
              src="/images/store/showroom.jpg"
              alt="Interior of the Agriconic equipment showroom with pumps and pipes on display"
              loading="lazy"
              className="h-64 w-full object-cover"
            />
            <div className="p-8">
              <h3 className="font-display text-2xl">Visit the Showroom</h3>
              <dl className="mt-6 space-y-4 text-sm">
                <div>
                  <dt className="text-ivory-200/60">Address</dt>
                  <dd className="mt-1">
                    {siteConfig.address.line1}, {siteConfig.address.line2}
                    <br />
                    {siteConfig.address.city}, {siteConfig.address.country}
                  </dd>
                </div>
                <div>
                  <dt className="text-ivory-200/60">Opening hours</dt>
                  <dd className="mt-1 space-y-1">
                    {siteConfig.hours.map((h) => (
                      <div key={h.days} className="flex justify-between gap-4">
                        <span>{h.days}</span>
                        <span className="text-ivory-200/80">{h.time}</span>
                      </div>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="text-ivory-200/60">Phone</dt>
                  <dd className="mt-1">
                    <a href={`tel:${siteConfig.phone}`} className="hover:text-moss-300">
                      {siteConfig.phoneDisplay}
                    </a>
                  </dd>
                </div>
              </dl>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button as="a" href={siteConfig.mapsUrl} target="_blank" rel="noreferrer" variant="light" size="sm">
                  Get Directions
                </Button>
                <Button
                  as="a"
                  href={buildWhatsAppLink(generalEnquiryMessage())}
                  target="_blank"
                  rel="noreferrer"
                  variant="whatsapp"
                  size="sm"
                >
                  WhatsApp
                </Button>
                <Button variant="outlineLight" size="sm" onClick={() => openQuote(null)}>
                  Request a Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
