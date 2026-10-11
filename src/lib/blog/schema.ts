import { SITE_URL } from "@/config/seo";
import type { BlogAuthor, BlogCategory, BlogPost } from "@/data/blog/types";

const FOUNDER_ID = `${SITE_URL}/about#founder`;
const ORG_ID = `${SITE_URL}/#organization`;
const BLOG_ID = `${SITE_URL}/blog#blog`;

export const blogUrl = `${SITE_URL}/blog`;
export const postUrl = (slug: string) => `${SITE_URL}/blog/${slug}`;
export const categoryUrl = (slug: string) => `${SITE_URL}/blog/category/${slug}`;
export const authorUrl = (slug: string) => `${SITE_URL}/blog/author/${slug}`;
export const absolute = (path: string) => (path.startsWith("http") ? path : `${SITE_URL}${path}`);

/** Person node for the author, reused across posts via the stable @id. */
export function personNode(author: BlogAuthor): Record<string, unknown> {
  const node: Record<string, unknown> = {
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: author.name,
    jobTitle: author.title,
    description: author.bioShort,
    url: `${SITE_URL}${author.url}`,
    worksFor: { "@id": ORG_ID },
    knowsAbout: author.knowsAbout,
  };
  if (author.sameAs?.length) node.sameAs = author.sameAs;
  if (author.headshot) node.image = absolute(author.headshot);
  return node;
}

function breadcrumb(id: string, trail: { name: string; item: string }[]): Record<string, unknown> {
  return {
    "@type": "BreadcrumbList",
    "@id": id,
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: t.item,
    })),
  };
}

export function buildPostGraph(post: BlogPost, category: BlogCategory, author: BlogAuthor) {
  const url = postUrl(post.slug);
  const graph: Record<string, unknown>[] = [
    {
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      headline: post.title.slice(0, 110),
      description: post.metaDescription,
      image: {
        "@type": "ImageObject",
        url: absolute(post.hero.src),
        width: post.hero.width,
        height: post.hero.height,
      },
      author: { "@id": FOUNDER_ID },
      publisher: { "@id": ORG_ID },
      datePublished: post.datePublished,
      dateModified: post.dateModified,
      mainEntityOfPage: { "@id": url },
      articleSection: category.name,
      keywords: post.keywords.join(", "),
      wordCount: post.wordCount,
      inLanguage: "en-IN",
      isPartOf: { "@id": BLOG_ID },
      about: [
        { "@type": "Thing", name: category.name },
        { "@type": "Place", name: "Noida" },
      ],
      spatialCoverage: { "@type": "Place", name: "Noida, Uttar Pradesh, India" },
    },
    personNode(author),
    {
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: post.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    breadcrumb(`${url}#breadcrumb`, [
      { name: "Home", item: `${SITE_URL}/` },
      { name: "Blog", item: blogUrl },
      { name: category.name, item: categoryUrl(category.slug) },
      { name: post.title, item: url },
    ]),
  ];

  if (post.howTo) {
    graph.push({
      "@type": "HowTo",
      "@id": `${url}#howto`,
      name: post.howTo.name,
      step: post.howTo.steps.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.name,
        text: s.text,
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

export function buildCategoryGraph(category: BlogCategory, posts: BlogPost[]) {
  const url = categoryUrl(category.slug);
  const graph: Record<string, unknown>[] = [
    {
      "@type": "CollectionPage",
      "@id": `${url}#collection`,
      name: category.h1,
      description: category.hubDescription,
      url,
      isPartOf: { "@id": BLOG_ID },
      inLanguage: "en-IN",
      hasPart: posts.map((p) => ({ "@id": `${postUrl(p.slug)}#article` })),
    },
    breadcrumb(`${url}#breadcrumb`, [
      { name: "Home", item: `${SITE_URL}/` },
      { name: "Blog", item: blogUrl },
      { name: category.name, item: url },
    ]),
  ];
  if (category.faqs.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: category.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

export function buildBlogIndexGraph(pagePosts: BlogPost[], page: number) {
  const url = page > 1 ? `${blogUrl}/page/${page}` : blogUrl;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#collection`,
        name: "Interior Design Insights — Noida & NCR",
        url,
        isPartOf: { "@id": BLOG_ID },
        inLanguage: "en-IN",
      },
      {
        "@type": "ItemList",
        "@id": `${url}#itemlist`,
        itemListElement: pagePosts.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: postUrl(p.slug),
          name: p.title,
        })),
      },
      breadcrumb(`${url}#breadcrumb`, [
        { name: "Home", item: `${SITE_URL}/` },
        { name: "Blog", item: blogUrl },
      ]),
    ],
  };
}

export function buildAuthorGraph(author: BlogAuthor, posts: BlogPost[]) {
  const url = authorUrl(author.slug);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${url}#profile`,
        url,
        inLanguage: "en-IN",
        isPartOf: { "@id": BLOG_ID },
        mainEntity: { "@id": FOUNDER_ID },
        hasPart: posts.map((p) => ({ "@id": `${postUrl(p.slug)}#article` })),
      },
      personNode(author),
      breadcrumb(`${url}#breadcrumb`, [
        { name: "Home", item: `${SITE_URL}/` },
        { name: "Blog", item: blogUrl },
        { name: author.name, item: url },
      ]),
    ],
  };
}
