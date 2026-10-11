import type { BlogPost } from "./types";
import { hardWaterNoidaInteriors } from "./posts/hard-water-noida-interiors";
import { noidaDustAirQualityInteriors } from "./posts/noida-dust-air-quality-interiors";

export * from "./types";
export { categories, getCategoryBySlug } from "./categories";
export { authors, getAuthorBySlug, FOUNDER } from "./author";

/** Published posts, newest first. Only complete, marker-free articles ship. */
export const posts: BlogPost[] = [
  hardWaterNoidaInteriors,
  noidaDustAirQualityInteriors,
].sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));

export const POSTS_PER_PAGE = 12;

export function getAllPosts(): BlogPost[] {
  return posts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getPostsByCategory(categorySlug: string): BlogPost[] {
  return posts.filter((p) => p.categorySlug === categorySlug);
}

export function getPostsByAuthor(authorSlug: string): BlogPost[] {
  return posts.filter((p) => p.authorSlug === authorSlug);
}

export function getRelatedPosts(post: BlogPost): BlogPost[] {
  const bySlug = post.related
    .map((s) => getPostBySlug(s))
    .filter((p): p is BlogPost => Boolean(p));
  if (bySlug.length >= 3) return bySlug.slice(0, 3);
  // top up with same-category, then any, excluding self and already-included
  const seen = new Set([post.slug, ...bySlug.map((p) => p.slug)]);
  const fill = [
    ...getPostsByCategory(post.categorySlug),
    ...posts,
  ].filter((p) => !seen.has(p.slug));
  return [...bySlug, ...fill].slice(0, 3);
}

export interface Paged<T> {
  items: T[];
  page: number;
  totalPages: number;
  total: number;
}

export function paginate<T>(items: T[], page: number, perPage = POSTS_PER_PAGE): Paged<T> {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * perPage;
  return {
    items: items.slice(start, start + perPage),
    page: current,
    totalPages,
    total,
  };
}
