import { Link } from "react-router-dom";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { getFeaturedProducts } from "../../lib/catalog";
import { ProductCard } from "../catalogue/ProductCard";

export function FeaturedProducts() {
  const products = getFeaturedProducts(8);

  return (
    <section className="bg-ivory-100 py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Featured Equipment"
            title="Equipment our customers ask for most."
            description="A cross-section of the range — from borehole pumps to complete sprinkler systems."
          />
          <Link to="/equipment" className="text-sm font-medium text-ink-900 underline underline-offset-4 hover:text-moss-700">
            Browse all equipment
          </Link>
        </div>

        <div className="mt-14 -mx-5 flex gap-5 overflow-x-auto px-5 pb-4 scrollbar-thin sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="w-[78vw] flex-shrink-0 sm:w-auto">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
