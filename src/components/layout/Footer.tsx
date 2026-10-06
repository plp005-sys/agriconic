import { Link } from "react-router-dom";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { siteConfig } from "../../config/site";
import { getCategories } from "../../lib/catalog";
import { useQuote } from "../../context/QuoteContext";

export function Footer() {
  const categories = getCategories();
  const { openQuote } = useQuote();

  return (
    <footer className="bg-ink-950 text-ivory-200">
      <Container className="py-16 sm:py-24">
        <div className="flex flex-col gap-10 border-b border-ivory-50/10 pb-16 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-moss-300">
              Ready when you are
            </p>
            <h2 className="font-display text-3xl leading-tight tracking-tight text-ivory-50 sm:text-4xl">
              Let's find the right solution for your operation.
            </h2>
          </div>
          <div className="flex flex-shrink-0 flex-wrap gap-3">
            <Button variant="light" size="md" onClick={() => openQuote(null)}>
              Request a Quote
            </Button>
            <Button as="link" to="/contact" variant="outlineLight" size="md">
              Contact Sales
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 py-16 sm:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="font-display text-2xl font-semibold tracking-tight text-ivory-50">
              AGRICONIC
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory-200/70">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex gap-4 text-ivory-200/70">
              <a href={siteConfig.social.facebook} aria-label="Facebook" className="hover:text-ivory-50">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V5h-3c-2.8 0-5 2.2-5 5v2H7v4h2v7h4v-7h3l1-4h-4v-2c0-.6.4-1 1-1Z"/></svg>
              </a>
              <a href={siteConfig.social.instagram} aria-label="Instagram" className="hover:text-ivory-50">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>
              </a>
              <a href={siteConfig.social.linkedin} aria-label="LinkedIn" className="hover:text-ivory-50">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 8.5H4.07V20h2.87V8.5ZM5.5 7.2a1.66 1.66 0 1 0 0-3.33 1.66 1.66 0 0 0 0 3.33ZM20 20h-2.87v-5.75c0-1.37-.03-3.14-1.92-3.14-1.92 0-2.22 1.5-2.22 3.04V20H10.1V8.5h2.75v1.57h.04c.38-.73 1.33-1.5 2.73-1.5 2.92 0 3.46 1.92 3.46 4.42V20Z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-ivory-50">Equipment</h3>
            <ul className="space-y-3 text-sm text-ivory-200/70">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link to={`/equipment/${c.slug}`} className="hover:text-ivory-50">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-ivory-50">Company</h3>
            <ul className="space-y-3 text-sm text-ivory-200/70">
              <li><Link to="/solutions" className="hover:text-ivory-50">Solutions</Link></li>
              <li><Link to="/about" className="hover:text-ivory-50">About</Link></li>
              <li><Link to="/contact" className="hover:text-ivory-50">Contact</Link></li>
              <li><Link to="/equipment" className="hover:text-ivory-50">Request a Quote</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-ivory-50">Visit the Store</h3>
            <ul className="space-y-3 text-sm text-ivory-200/70">
              <li>{siteConfig.address.line1}</li>
              <li>{siteConfig.address.line2}</li>
              <li>{siteConfig.address.city}, {siteConfig.address.country}</li>
              <li><a href={`tel:${siteConfig.phone}`} className="hover:text-ivory-50">{siteConfig.phoneDisplay}</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-ivory-50/10 pt-8 text-xs text-ivory-200/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</p>
          <p className="max-w-xl">
            Product names, specifications and images shown are sample demonstration content and will be
            replaced with verified Agriconic catalogue data.
          </p>
        </div>
      </Container>
    </footer>
  );
}
