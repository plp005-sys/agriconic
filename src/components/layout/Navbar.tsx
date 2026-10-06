import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { siteConfig } from "../../config/site";
import { buildWhatsAppLink, generalEnquiryMessage } from "../../lib/whatsapp";
import { useQuote } from "../../context/QuoteContext";
import { useCompare } from "../../context/CompareContext";

const navLinks = [
  { label: "Equipment", to: "/equipment" },
  { label: "Irrigation", to: "/equipment/irrigation-systems" },
  { label: "Solutions", to: "/solutions" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { openQuote } = useQuote();
  const { slugs } = useCompare();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/equipment?q=${encodeURIComponent(query.trim())}`);
    setMobileOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-ivory-50/90 shadow-sm backdrop-blur-md" : "bg-ivory-50/60 backdrop-blur-sm"
      }`}
    >
      <Container>
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`}>
          <Link to="/" className="font-display text-xl font-semibold tracking-tight text-ink-900 sm:text-2xl">
            AGRICONIC
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-moss-700 ${
                    isActive ? "text-moss-700" : "text-ink-800"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            {slugs.length > 0 && (
              <Link
                to="/compare"
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/15 text-ink-800 hover:border-ink-900"
                aria-label={`Compare ${slugs.length} products`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 3v18M15 3v18M4 8h5M15 8h5M4 16h5M15 16h5" />
                </svg>
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-moss-600 text-[10px] font-semibold text-ivory-50">
                  {slugs.length}
                </span>
              </Link>
            )}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search equipment…"
                aria-label="Search equipment"
                className="w-48 rounded-full border border-ink-900/15 bg-ivory-50 py-2 pl-4 pr-9 text-sm text-ink-900 placeholder:text-ink-700/50 focus:w-64 focus:border-moss-600 focus:outline-none transition-all duration-300"
              />
              <button type="submit" aria-label="Search" className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-700">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </button>
            </form>
            <Button
              as="a"
              href={buildWhatsAppLink(generalEnquiryMessage())}
              target="_blank"
              rel="noreferrer"
              variant="whatsapp"
              size="sm"
            >
              WhatsApp Sales
            </Button>
            <Button variant="outline" size="sm" onClick={() => openQuote(null)}>
              Request a Quote
            </Button>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/15 lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </Container>

      {mobileOpen && (
        <div className="border-t border-ink-900/10 bg-ivory-50 lg:hidden">
          <Container className="flex flex-col gap-6 py-6">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search equipment…"
                aria-label="Search equipment"
                className="w-full rounded-full border border-ink-900/15 bg-ivory-50 py-3 pl-5 pr-10 text-base"
              />
              <button type="submit" aria-label="Search" className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-700">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </button>
            </form>
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-3 text-lg font-medium text-ink-900 hover:bg-ink-900/5"
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
            <div className="flex flex-col gap-3">
              <Button
                as="a"
                href={buildWhatsAppLink(generalEnquiryMessage())}
                target="_blank"
                rel="noreferrer"
                variant="whatsapp"
                size="md"
              >
                WhatsApp Sales
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  openQuote(null);
                  setMobileOpen(false);
                }}
              >
                Request a Quote
              </Button>
              <a href={`tel:${siteConfig.phone}`} className="text-center text-sm text-ink-700 underline">
                Or call {siteConfig.phoneDisplay}
              </a>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
