import { useEffect, useRef, useState } from "react";
import { useQuote } from "../../context/QuoteContext";
import { submitQuoteRequest } from "../../lib/quote";
import { buildWhatsAppLink, productEnquiryMessage } from "../../lib/whatsapp";
import { Button } from "../ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

const emptyForm = {
  name: "",
  company: "",
  phone: "",
  email: "",
  quantity: "1",
  location: "",
  application: "",
  requirements: "",
};

export function QuoteModal() {
  const { isOpen, product, closeQuote } = useQuote();
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setForm(emptyForm);
      setStatus("idle");
      setErrors({});
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, product]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeQuote();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeQuote]);

  if (!isOpen) return null;

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.phone.trim() && !form.email.trim()) {
      next.phone = "Provide a phone number or email so we can reach you.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    const result = await submitQuoteRequest({
      productName: product?.name,
      productSlug: product?.slug,
      ...form,
    });
    setStatus(result.success ? "success" : "error");
  };

  const whatsappHref = buildWhatsAppLink(
    productEnquiryMessage({
      productName: product?.name ?? "your agricultural equipment range",
      reference: product?.id,
      quantity: form.quantity,
    })
  );

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink-950/60 backdrop-blur-sm sm:items-center sm:p-6"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) closeQuote();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-modal-title"
        className="max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-ivory-50 p-6 shadow-elevated animate-[slideUp_0.35s_ease-out] sm:max-w-lg sm:rounded-3xl sm:p-10"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-moss-600">Request a Quote</p>
            <h2 id="quote-modal-title" className="mt-2 font-display text-2xl text-ink-900 sm:text-3xl">
              {product ? product.name : "Tell us what you need"}
            </h2>
            {product && <p className="mt-1 text-sm text-ink-700">{product.subcategory}</p>}
          </div>
          <button
            onClick={closeQuote}
            aria-label="Close quote form"
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-ink-900/15 text-ink-700 hover:bg-ink-900/5"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        {status === "success" ? (
          <div className="mt-8 rounded-2xl bg-moss-700/10 p-6 text-center">
            <p className="font-display text-xl text-ink-900">Thank you.</p>
            <p className="mt-2 text-sm text-ink-700">
              We've prepared your enquiry. If your email client didn't open automatically, reach us directly on
              WhatsApp or by phone.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button as="a" href={whatsappHref} target="_blank" rel="noreferrer" variant="whatsapp">
                Continue on WhatsApp
              </Button>
              <Button variant="outline" onClick={closeQuote}>
                Close
              </Button>
            </div>
          </div>
        ) : (
          <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
            {product && (
              <div className="rounded-2xl bg-ink-900/5 px-4 py-3 text-sm text-ink-800">
                <span className="font-medium">Product:</span> {product.name}
              </div>
            )}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Full name" required error={errors.name}>
                <input
                  className={inputClass}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </Field>
              <Field label="Company / Farm">
                <input
                  className={inputClass}
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                />
              </Field>
              <Field label="Phone" error={errors.phone}>
                <input
                  className={inputClass}
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </Field>
              <Field label="Email">
                <input
                  className={inputClass}
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </Field>
              <Field label="Quantity">
                <input
                  className={inputClass}
                  value={form.quantity}
                  onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                />
              </Field>
              <Field label="Location">
                <input
                  className={inputClass}
                  placeholder="Town / County"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                />
              </Field>
            </div>

            <Field label="Intended application">
              <input
                className={inputClass}
                placeholder="e.g. Borehole supply, field irrigation…"
                value={form.application}
                onChange={(e) => setForm({ ...form, application: e.target.value })}
              />
            </Field>

            <Field label="Additional requirements">
              <textarea
                className={inputClass}
                rows={3}
                value={form.requirements}
                onChange={(e) => setForm({ ...form, requirements: e.target.value })}
              />
            </Field>

            {status === "error" && (
              <p className="text-sm text-rust-600">
                We couldn't open your email client automatically. Please use WhatsApp or call us directly.
              </p>
            )}

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Button type="submit" className="flex-1" disabled={status === "submitting"}>
                {status === "submitting" ? "Preparing…" : "Request Quote"}
              </Button>
              <Button as="a" href={whatsappHref} target="_blank" rel="noreferrer" variant="whatsapp" className="flex-1">
                Ask on WhatsApp
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-ink-900/15 bg-ivory-50 px-4 py-3 text-sm text-ink-900 placeholder:text-ink-700/40 focus:border-moss-600 focus:outline-none";

function Field({
  label,
  children,
  required,
  error,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  error?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-ink-800">
        {label} {required && <span className="text-moss-600">*</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-rust-600">{error}</span>}
    </label>
  );
}
