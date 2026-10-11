/**
 * Static, build-time blog content model.
 *
 * The blog is intentionally data-driven and shipped in the bundle (not fetched
 * at runtime from Supabase) so the content is crawlable and prerender-ready.
 * Each published post is a fully-written article — no placeholders, no
 * [VERIFY]/[FOUNDER INPUT] markers remain in anything exported from here.
 *
 * Inline text in `p`, list items, table cells, callouts, FAQ answers etc.
 * supports a tiny markdown subset rendered by <RichText>:
 *   **bold**            -> <strong>
 *   [label](/internal)  -> internal <Link> (starts with "/")
 *   [label](https://…)  -> external <a target="_blank" rel="noopener">
 */

export type ContentBlock =
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; id?: string; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; caption?: string; headers: string[]; rows: string[][] }
  | { type: "callout"; title?: string; body: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "image"; src: string; alt: string; width: number; height: number; caption?: string };

export interface Faq {
  q: string;
  a: string;
}

export interface HowToStep {
  name: string;
  text: string;
}

export interface HowTo {
  name: string;
  steps: HowToStep[];
}

export interface Source {
  label: string;
  url: string;
}

export interface BlogAuthor {
  slug: string;
  name: string;
  title: string;
  /** one-line bio shown in the inline author block */
  bioShort: string;
  /** expanded bio shown in the author card at the foot of a post */
  bioLong: string;
  /** path under /public, or null to render an initials monogram */
  headshot: string | null;
  /** canonical profile page (used as Person @id anchor target) */
  url: string;
  sameAs?: string[];
  knowsAbout: string[];
}

export interface BlogCategory {
  slug: string;
  name: string;
  /** SEO <title> for the hub page */
  hubTitle: string;
  /** meta description for the hub page */
  hubDescription: string;
  /** visible H1 */
  h1: string;
  /** 400+ words of original pillar-intro copy, as paragraphs */
  intro: string[];
  /** "What this section covers" bullets */
  covers: string[];
  /** slug of the cornerstone post to feature as "Start here" */
  cornerstoneSlug?: string;
  faqs: Faq[];
}

export interface BlogPost {
  slug: string;
  /** visible H1 — primary keyword, 50–65 chars */
  title: string;
  /** <title> tag, ≤60 chars, keyword front-loaded */
  seoTitle: string;
  /** meta description, 150–160 chars, ends with a CTA */
  metaDescription: string;
  categorySlug: string;
  authorSlug: string;
  datePublished: string; // YYYY-MM-DD
  dateModified: string; // YYYY-MM-DD
  readingTimeMin: number;
  hero: { src: string; alt: string; width: number; height: number };
  /** ~20-word card excerpt */
  excerpt: string;
  keywords: string[];
  wordCount: number;
  /** 3–5 TL;DR bullets */
  tldr: string[];
  /** direct answer to the H1, ≤60 words, rendered bold */
  directAnswer: string;
  body: ContentBlock[];
  /** 4–6 self-contained Q&As */
  faqs: Faq[];
  /** only on genuine step-by-step posts (adds HowTo schema) */
  howTo?: HowTo;
  /** 80–120 word closing synthesis */
  whatThisMeans: string;
  /** slugs of related published posts (3 ideal) */
  related: string[];
  sources: Source[];
}
