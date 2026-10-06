import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Container } from "../components/ui/Container";
import { Breadcrumbs } from "../components/ui/Breadcrumbs";
import { Button } from "../components/ui/Button";
import { ProductGallery } from "../components/product/ProductGallery";
import { ProductCard } from "../components/catalogue/ProductCard";
import { getCategoryBySlug, getProductBySlug, getRelatedProducts } from "../lib/catalog";
import { useQuote } from "../context/QuoteContext";
import { buildWhatsAppLink, productEnquiryMessage } from "../lib/whatsapp";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = slug ? getProductBySlug(slug) : undefined;
  const { openQuote } = useQuote();
  const [quantity, setQuantity] = useState(1);
  const [activeVariant, setActiveVariant] = useState(0);
  const [tab, setTab] = useState<"overview" | "specs" | "details">("overview");

  if (!product) {
    return <Navigate to="/equipment" replace />;
  }

  const category = getCategoryBySlug(product.category);
  const related = getRelatedProducts(product, 4);
  const variant = product.variants[activeVariant];

  const whatsappHref = buildWhatsAppLink(
    productEnquiryMessage({
      productName: product.name,
      reference: product.id,
      quantity,
      note: variant ? `Variant: ${variant.name}` : undefined,
    })
  );

  return (
    <div className="bg-ivory-50 pb-24">
      <Container className="pt-10">
        <Breadcrumbs
          items={[
            { label: "Equipment", to: "/equipment" },
            ...(category ? [{ label: category.name, to: `/equipment/${category.slug}` }] : []),
            { label: product.name },
          ]}
        />
      </Container>

      <Container className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} name={product.name} />

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-moss-600">
            {category?.name} · {product.subcategory}
          </p>
          <h1 className="mt-3 font-display text-3xl leading-tight text-ink-900 sm:text-4xl">{product.name}</h1>
          <p className="mt-5 text-base leading-relaxed text-ink-700">{product.shortDescription}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {product.application.map((a) => (
              <span key={a} className="rounded-full bg-ink-900/5 px-3 py-1.5 text-xs font-medium text-ink-800">
                {a}
              </span>
            ))}
          </div>

          {product.variants.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-3 text-sm font-semibold text-ink-900">Variant</h3>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, i) => (
                  <button
                    key={v.id}
                    onClick={() => setActiveVariant(i)}
                    aria-pressed={activeVariant === i}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                      activeVariant === i
                        ? "border-ink-900 bg-ink-900 text-ivory-50"
                        : "border-ink-900/15 text-ink-800 hover:border-ink-900"
                    }`}
                  >
                    {v.name}
                  </button>
                ))}
              </div>
              {variant?.detail && <p className="mt-2 text-xs text-ink-700/70">{variant.detail}</p>}
            </div>
          )}

          <div className="mt-8 flex items-center gap-4">
            <label htmlFor="qty" className="text-sm font-medium text-ink-900">
              Quantity
            </label>
            <div className="flex items-center rounded-full border border-ink-900/15">
              <button
                type="button"
                aria-label="Decrease quantity"
                className="px-3 py-2 text-ink-700"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <input
                id="qty"
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                className="w-12 bg-transparent text-center text-sm focus:outline-none"
              />
              <button
                type="button"
                aria-label="Increase quantity"
                className="px-3 py-2 text-ink-700"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button onClick={() => openQuote(product)} size="lg" className="flex-1">
              Request Quote
            </Button>
            <Button as="a" href={whatsappHref} target="_blank" rel="noreferrer" variant="whatsapp" size="lg" className="flex-1">
              Ask About This Product
            </Button>
          </div>

          <p className="mt-4 text-xs text-ink-700/60">
            Pricing provided on request. Specifications shown are sample demonstration content.
          </p>
        </div>
      </Container>

      {/* Progressive disclosure: Overview -> Specs -> Details */}
      <Container className="mt-20">
        <div className="flex gap-2 border-b border-ink-900/10">
          {(
            [
              { id: "overview", label: "Overview" },
              { id: "specs", label: "Key Specifications" },
              { id: "details", label: "Technical Details" },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              aria-current={tab === t.id}
              className={`relative px-4 py-4 text-sm font-medium transition-colors sm:px-6 ${
                tab === t.id ? "text-ink-900" : "text-ink-700/60 hover:text-ink-900"
              }`}
            >
              {t.label}
              {tab === t.id && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-moss-600" />}
            </button>
          ))}
        </div>

        <div className="py-10">
          {tab === "overview" && (
            <div className="max-w-3xl space-y-6">
              <p className="text-base leading-relaxed text-ink-800">{product.description}</p>
              <div>
                <h3 className="font-display text-lg text-ink-900">Typical applications</h3>
                <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {product.application.map((a) => (
                    <li key={a} className="flex items-center gap-2 text-sm text-ink-700">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-moss-600">
                        <path d="M5 12l4 4 10-10" />
                      </svg>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {tab === "specs" && (
            <dl className="grid max-w-3xl grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
              {product.specifications.slice(0, 4).map((spec) => (
                <div key={spec.label} className="flex items-baseline justify-between border-b border-ink-900/10 pb-3">
                  <dt className="text-sm text-ink-700">{spec.label}</dt>
                  <dd className="font-mono text-sm text-ink-900">{spec.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {tab === "details" && (
            <div className="max-w-3xl">
              <dl className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
                {product.specifications.map((spec) => (
                  <div key={spec.label} className="flex items-baseline justify-between border-b border-ink-900/10 pb-3">
                    <dt className="text-sm text-ink-700">{spec.label}</dt>
                    <dd className="font-mono text-sm text-ink-900">{spec.value}</dd>
                  </div>
                ))}
              </dl>
              {product.downloads && product.downloads.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-display text-lg text-ink-900">Downloads</h3>
                  <ul className="mt-3 space-y-2">
                    {product.downloads.map((d) => (
                      <li key={d.href}>
                        <a href={d.href} className="text-sm font-medium text-moss-700 underline underline-offset-4">
                          {d.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </Container>

      {related.length > 0 && (
        <Container className="mt-10">
          <h2 className="font-display text-2xl text-ink-900 sm:text-3xl">You may also need</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Container>
      )}

      {/* Sticky mobile action bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex gap-3 border-t border-ink-900/10 bg-ivory-50/95 p-4 backdrop-blur sm:hidden">
        <Button onClick={() => openQuote(product)} className="flex-1" size="sm">
          Request Quote
        </Button>
        <Button as="a" href={whatsappHref} target="_blank" rel="noreferrer" variant="whatsapp" size="sm" className="flex-1">
          WhatsApp
        </Button>
      </div>
    </div>
  );
}
