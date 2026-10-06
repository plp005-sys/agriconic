/**
 * Shared catalogue types.
 *
 * These describe the shape of data consumed by the UI. The UI only ever
 * talks to the data-access layer (`src/lib/catalog.ts`) through these
 * types — it never cares whether the data originated from a local JSON
 * file or, later, a remote API.
 */

export interface Specification {
  label: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  detail?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string; // category slug
  subcategory: string;
  description: string;
  shortDescription: string;
  application: string[];
  featured: boolean;
  images: string[];
  specifications: Specification[];
  variants: ProductVariant[];
  tags: string[];
  relatedProducts: string[]; // product slugs
  brand?: string;
  downloads?: { label: string; href: string }[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  image: string;
  icon: string;
}

export interface Solution {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  categories: string[]; // category slugs relevant to this solution
  tags: string[]; // matched against product tags/application for recommendations
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  description: string;
}
