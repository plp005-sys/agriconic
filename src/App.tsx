import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { QuoteProvider } from "./context/QuoteContext";
import { CompareProvider } from "./context/CompareContext";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { WhatsAppFloat } from "./components/layout/WhatsAppFloat";
import { QuoteModal } from "./components/quote/QuoteModal";
import { CompareBar } from "./components/catalogue/CompareBar";
import Home from "./pages/Home";
import Catalogue from "./pages/Catalogue";
import ProductDetail from "./pages/ProductDetail";
import Solutions from "./pages/Solutions";
import SolutionDetail from "./pages/SolutionDetail";
import Compare from "./pages/Compare";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

function AppShell() {
  return (
    <div className="flex min-h-screen flex-col bg-ivory-50">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink-900 focus:px-5 focus:py-3 focus:text-ivory-50"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/equipment" element={<Catalogue />} />
          <Route path="/equipment/:category" element={<Catalogue />} />
          <Route path="/equipment/:category/:slug" element={<ProductDetail />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/solutions/:slug" element={<SolutionDetail />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFloat />
      <QuoteModal />
      <CompareBar />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <QuoteProvider>
        <CompareProvider>
          <ScrollToTop />
          <AppShell />
        </CompareProvider>
      </QuoteProvider>
    </HashRouter>
  );
}
