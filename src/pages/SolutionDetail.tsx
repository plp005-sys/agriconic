import { Navigate, useParams } from "react-router-dom";
import { Container } from "../components/ui/Container";
import { Breadcrumbs } from "../components/ui/Breadcrumbs";
import { Button } from "../components/ui/Button";
import { ProductCard } from "../components/catalogue/ProductCard";
import { getProductsForSolution, getSolutionBySlug } from "../lib/catalog";
import { useQuote } from "../context/QuoteContext";

export default function SolutionDetail() {
  const { slug } = useParams();
  const solution = slug ? getSolutionBySlug(slug) : undefined;
  const { openQuote } = useQuote();

  if (!solution) {
    return <Navigate to="/solutions" replace />;
  }

  const products = getProductsForSolution(solution);

  return (
    <div className="bg-ivory-50">
      <div className="relative flex min-h-[55vh] items-end overflow-hidden bg-ink-950 text-ivory-50">
        <img src={solution.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-transparent" />
        <Container className="relative z-10 pb-14 pt-32">
          <Breadcrumbs items={[{ label: "Solutions", to: "/solutions" }, { label: solution.title }]} />
          <h1 className="mt-6 max-w-2xl font-display text-4xl sm:text-5xl">{solution.title}</h1>
          <p className="mt-5 max-w-xl text-lg text-ivory-200/85">{solution.summary}</p>
        </Container>
      </div>

      <Container className="py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
          <div>
            <p className="text-base leading-relaxed text-ink-800">{solution.description}</p>
            <div className="mt-8 flex flex-col gap-3">
              <Button onClick={() => openQuote(null)}>Request a Quote</Button>
              <Button as="link" to="/contact" variant="outline">
                Talk to Sales
              </Button>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl text-ink-900">Relevant equipment</h2>
            {products.length > 0 ? (
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <p className="mt-6 text-sm text-ink-700">
                We're still curating this list. Contact our sales team for recommendations.
              </p>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
