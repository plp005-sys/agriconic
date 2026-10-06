import { Hero } from "../components/home/Hero";
import { CategoryGrid } from "../components/home/CategoryGrid";
import { DiscoveryFinder } from "../components/home/DiscoveryFinder";
import { FeaturedProducts } from "../components/home/FeaturedProducts";
import { SolutionsSection } from "../components/home/SolutionsSection";
import { BuiltAroundFarm } from "../components/home/BuiltAroundFarm";
import { TrustSection } from "../components/home/TrustSection";
import { StoreExperience } from "../components/home/StoreExperience";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <DiscoveryFinder />
      <FeaturedProducts />
      <SolutionsSection />
      <BuiltAroundFarm />
      <TrustSection />
      <StoreExperience />
    </>
  );
}
