/**
 * Catalogue data-access layer.
 *
 * Every UI component reads catalogue data through the functions below
 * instead of importing the JSON files directly. Today they read from the
 * local dataset in `src/data`. Later, each function can be rewired to call
 * a REST API, Supabase, a headless CMS or an ERP — without touching a
 * single component that consumes it.
 */
import productsData from "../data/products.json";
import categoriesData from "../data/categories.json";
import solutionsData from "../data/solutions.json";
import brandsData from "../data/brands.json";
import discoveryData from "../data/discovery.json";
import type { Product, Category, Solution, Brand } from "../types/catalog";

const products = productsData as Product[];
const categories = categoriesData as Category[];
const solutions = solutionsData as Solution[];
const brands = brandsData as Brand[];

export interface DiscoveryOption {
  id: string;
  label: string;
  description: string;
  tags: string[];
  categoryHint?: string;
}
const discoveryOptions = discoveryData as DiscoveryOption[];

// Simulate async boundaries so this layer can be swapped for real network
// calls later without changing calling code or component structure.
const resolve = <T,>(value: T): Promise<T> => Promise.resolve(value);

export function getCategories(): Category[] {
  return categories;
}

export async function getCategoriesAsync(): Promise<Category[]> {
  return resolve(categories);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProducts(): Product[] {
  return products;
}

export async function getProductsAsync(): Promise<Product[]> {
  return resolve(products);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category === categorySlug);
}

export function getFeaturedProducts(limit?: number): Product[] {
  const featured = products.filter((p) => p.featured);
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const bySlug = product.relatedProducts
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p));

  if (bySlug.length >= limit) return bySlug.slice(0, limit);

  // Fall back to same-category products if explicit related list is short.
  const fallback = products.filter(
    (p) => p.category === product.category && p.slug !== product.slug && !bySlug.includes(p)
  );
  return [...bySlug, ...fallback].slice(0, limit);
}

export function getProductCountByCategory(categorySlug: string): number {
  return products.filter((p) => p.category === categorySlug).length;
}

export interface SearchFilters {
  query?: string;
  category?: string;
  application?: string;
  tag?: string;
  sort?: "relevance" | "name-asc" | "name-desc" | "category";
}

export function searchProducts(filters: SearchFilters = {}): Product[] {
  let result = [...products];
  const { query, category, application, tag, sort } = filters;

  if (category && category !== "all") {
    result = result.filter((p) => p.category === category);
  }

  if (application && application !== "all") {
    result = result.filter((p) =>
      p.application.some((a) => a.toLowerCase() === application.toLowerCase())
    );
  }

  if (tag) {
    result = result.filter((p) => p.tags.includes(tag));
  }

  if (query && query.trim().length > 0) {
    const q = query.trim().toLowerCase();
    result = result.filter((p) => {
      const haystack = [
        p.name,
        p.shortDescription,
        p.description,
        p.subcategory,
        p.category,
        ...p.application,
        ...p.tags,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }

  switch (sort) {
    case "name-asc":
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      result.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "category":
      result.sort((a, b) => a.category.localeCompare(b.category));
      break;
    default:
      break;
  }

  return result;
}

export function getAllApplications(): string[] {
  const set = new Set<string>();
  products.forEach((p) => p.application.forEach((a) => set.add(a)));
  return Array.from(set).sort();
}

export function getSolutions(): Solution[] {
  return solutions;
}

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}

export function getProductsForSolution(solution: Solution, limit?: number): Product[] {
  const matches = products.filter(
    (p) =>
      p.tags.some((tag) => solution.tags.includes(tag)) ||
      solution.categories.includes(p.category)
  );
  return typeof limit === "number" ? matches.slice(0, limit) : matches;
}

export function getBrands(): Brand[] {
  return brands;
}

export function getDiscoveryOptions(): DiscoveryOption[] {
  return discoveryOptions;
}

export function getProductsForDiscoveryOption(option: DiscoveryOption, limit = 8): Product[] {
  const scored = products
    .map((p) => {
      let score = p.tags.filter((t) => option.tags.includes(t)).length;
      if (option.categoryHint && p.category === option.categoryHint) score += 1;
      return { product: p, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.product);
}
