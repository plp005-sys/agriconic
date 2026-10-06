import { useState } from "react";
import { Container } from "../components/ui/Container";
import { Breadcrumbs } from "../components/ui/Breadcrumbs";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Button } from "../components/ui/Button";
import { siteConfig } from "../config/site";
import { buildWhatsAppLink, generalEnquiryMessage } from "../lib/whatsapp";
import { submitQuoteRequest } from "../lib/quote";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    const result = await submitQuoteRequest({
      name: form.name,
      company: "",
      phone: form.phone,
      email: form.email,
      quantity: "",
      location: "",
      application: "",
      requirements: form.message,
    });
    setStatus(result.success ? "success" : "error");
  };

  return (
    <div className="bg-ivory-50">
      <div className="border-b border-ink-900/10 bg-ivory-100">
        <Container className="py-14 sm:py-20">
          <Breadcrumbs items={[{ label: "Contact" }]} />
          <SectionHeading
            className="mt-6"
            eyebrow="Contact"
            title="Talk to the Agriconic team."
            description="Have a question about a product, or need help sizing a system? Reach out directly — we respond fastest on WhatsApp."
          />
        </Container>
      </div>

      <Container className="py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="space-y-10">
            <ContactItem label="WhatsApp" value="Chat with sales now" href={buildWhatsAppLink(generalEnquiryMessage())} external />
            <ContactItem label="Phone" value={siteConfig.phoneDisplay} href={`tel:${siteConfig.phone}`} />
            <ContactItem label="Email" value={siteConfig.email} href={`mailto:${siteConfig.email}`} />
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-700/70">Showroom</h3>
              <p className="mt-2 text-base text-ink-900">
                {siteConfig.address.line1}
                <br />
                {siteConfig.address.line2}
                <br />
                {siteConfig.address.city}, {siteConfig.address.country}
              </p>
              <a href={siteConfig.mapsUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm font-medium text-moss-700 underline underline-offset-4">
                Get directions
              </a>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-700/70">Opening hours</h3>
              <dl className="mt-2 space-y-1 text-sm text-ink-800">
                {siteConfig.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-6">
                    <dt>{h.days}</dt>
                    <dd className="text-ink-700">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="rounded-3xl bg-ivory-100 p-8 sm:p-10">
            {status === "success" ? (
              <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                <h2 className="font-display text-2xl text-ink-900">Message prepared</h2>
                <p className="mt-3 max-w-sm text-sm text-ink-700">
                  If your email client didn't open automatically, reach us directly on WhatsApp or by phone.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="font-display text-2xl text-ink-900">Send a message</h2>
                <label className="block text-sm">
                  <span className="mb-1.5 block font-medium text-ink-800">Full name</span>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-ink-900/15 bg-white px-4 py-3 text-sm focus:border-moss-600 focus:outline-none"
                  />
                </label>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <label className="block text-sm">
                    <span className="mb-1.5 block font-medium text-ink-800">Phone</span>
                    <input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full rounded-xl border border-ink-900/15 bg-white px-4 py-3 text-sm focus:border-moss-600 focus:outline-none"
                    />
                  </label>
                  <label className="block text-sm">
                    <span className="mb-1.5 block font-medium text-ink-800">Email</span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-xl border border-ink-900/15 bg-white px-4 py-3 text-sm focus:border-moss-600 focus:outline-none"
                    />
                  </label>
                </div>
                <label className="block text-sm">
                  <span className="mb-1.5 block font-medium text-ink-800">Message</span>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-xl border border-ink-900/15 bg-white px-4 py-3 text-sm focus:border-moss-600 focus:outline-none"
                  />
                </label>
                <Button type="submit" className="w-full" disabled={status === "submitting"}>
                  {status === "submitting" ? "Preparing…" : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

function ContactItem({ label, value, href, external }: { label: string; value: string; href: string; external?: boolean }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-700/70">{label}</h3>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className="mt-2 inline-block font-display text-xl text-ink-900 hover:text-moss-700"
      >
        {value}
      </a>
    </div>
  );
}
