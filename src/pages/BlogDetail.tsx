import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock, Phone, MessageCircle, CalendarDays } from "lucide-react";
import {
  getPostBySlug,
  getCategoryBySlug,
  getAuthorBySlug,
  getRelatedPosts,
} from "@/data/blog";
import { buildPostGraph, postUrl, categoryUrl, absolute } from "@/lib/blog/schema";
import { ContentBlocks } from "@/components/blog/ContentBlocks";
import { AuthorBlock, AuthorCard } from "@/components/blog/AuthorBlock";
import { RichText } from "@/components/blog/RichText";
import { SeoHead } from "@/components/SeoHead";

const PHONE = "+919720130734";

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 text-center px-6">
        <h1 className="font-heading text-2xl mb-4">Article not found</h1>
        <p className="luxury-body-sm mb-6 text-muted-foreground">
          This post may have moved. Browse the latest interior design insights instead.
        </p>
        <Link to="/blog" className="text-accent hover:underline inline-flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </div>
    );
  }

  const category = getCategoryBySlug(post.categorySlug)!;
  const author = getAuthorBySlug(post.authorSlug)!;
  const related = getRelatedPosts(post);
  const toc = post.body.filter(
    (b): b is Extract<typeof b, { type: "h2" }> => b.type === "h2",
  );
  const showToc = post.wordCount > 1200 && toc.length > 2;
  const jsonLd = buildPostGraph(post, category, author);

  return (
    <>
      <SeoHead
        title={post.seoTitle}
        description={post.metaDescription}
        canonical={postUrl(post.slug)}
        ogImage={absolute(post.hero.src)}
        jsonLd={jsonLd}
      />

      <article className="pt-28 pb-20">
        <div className="luxury-container max-w-3xl">
          {/* 1. Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 text-xs tracking-wide text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link to="/" className="hover:text-accent">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link to="/blog" className="hover:text-accent">Blog</Link></li>
              <li aria-hidden>/</li>
              <li>
                <Link to={`/blog/category/${category.slug}`} className="hover:text-accent">
                  {category.name}
                </Link>
              </li>
            </ol>
          </nav>

          {/* 5. category chip */}
          <Link
            to={`/blog/category/${category.slug}`}
            className="luxury-label inline-block mb-4 hover:text-accent transition-colors"
          >
            {category.name}
          </Link>

          {/* 2. H1 */}
          <h1 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          {/* 3. Author block + 4/5 meta */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mb-8 pb-8 border-b border-hairline">
            <AuthorBlock author={author} />
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={14} aria-hidden />
                <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
              </span>
              {post.dateModified !== post.datePublished && (
                <span className="inline-flex items-center gap-1.5">
                  Updated <time dateTime={post.dateModified}>{formatDate(post.dateModified)}</time>
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} aria-hidden /> {post.readingTimeMin} min read
              </span>
            </div>
          </div>
        </div>

        {/* 11. Hero image */}
        <div className="luxury-container max-w-4xl mb-10">
          <img
            src={post.hero.src}
            alt={post.hero.alt}
            width={post.hero.width}
            height={post.hero.height}
            // @ts-expect-error fetchpriority is a valid HTML attribute not yet in React types
            fetchpriority="high"
            className="w-full h-auto rounded"
          />
        </div>

        <div className="luxury-container max-w-3xl">
          {/* 6. TL;DR */}
          <section className="tldr mb-8 border border-hairline bg-secondary/50 p-6">
            <p className="luxury-label mb-3">In short</p>
            <ul className="list-disc pl-5 space-y-2 luxury-body-sm">
              {post.tldr.map((t, i) => (
                <li key={i}><RichText text={t} /></li>
              ))}
            </ul>
          </section>

          {/* 7. Direct answer */}
          <p className="text-lg md:text-xl font-heading leading-relaxed text-foreground mb-10">
            <RichText text={post.directAnswer} />
          </p>

          {/* 8. Table of contents */}
          {showToc && (
            <nav aria-label="Table of contents" className="mb-10 border-l-2 border-accent pl-5">
              <p className="luxury-label mb-3">On this page</p>
              <ul className="space-y-2">
                {toc.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="luxury-body-sm text-muted-foreground hover:text-accent transition-colors">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* 9–11. Body */}
          <div className="blog-body">
            <ContentBlocks blocks={post.body} />
          </div>

          {/* 12. FAQ */}
          <section aria-labelledby="faq-heading" className="mt-14">
            <h2 id="faq-heading" className="font-heading text-2xl md:text-3xl font-semibold tracking-tight mb-6">
              Frequently Asked Questions
            </h2>
            <dl className="space-y-6">
              {post.faqs.map((f, i) => (
                <div key={i} className="border-b border-hairline pb-6">
                  <dt className="font-heading text-lg font-semibold mb-2">{f.q}</dt>
                  <dd className="luxury-body leading-relaxed"><RichText text={f.a} /></dd>
                </div>
              ))}
            </dl>
          </section>

          {/* 13. What this means */}
          <section className="mt-14">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold tracking-tight mb-5">
              What This Means for Your Project
            </h2>
            <p className="luxury-body leading-relaxed"><RichText text={post.whatThisMeans} /></p>
          </section>

          {/* 14. CTA */}
          <section className="mt-12 bg-charcoal text-cream p-8 md:p-10 rounded">
            <h2 className="font-heading text-2xl font-semibold mb-3 text-cream">
              Planning an interior in Noida or NCR?
            </h2>
            <p className="text-cream/80 mb-6 max-w-xl">
              Get a free design consultation with Cornelian Executive Interiors — specification-first,
              turnkey, and built for Noida's real conditions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 font-body text-sm tracking-[0.1em] uppercase hover:bg-champagne transition-colors"
              >
                Free consultation <ArrowRight size={16} />
              </Link>
              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center gap-2 border border-cream/40 px-6 py-3 font-body text-sm tracking-[0.1em] uppercase hover:border-cream transition-colors"
              >
                <Phone size={16} /> Call
              </a>
              <a
                href={`https://wa.me/${PHONE.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-cream/40 px-6 py-3 font-body text-sm tracking-[0.1em] uppercase hover:border-cream transition-colors"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </section>

          {/* 15. Author card */}
          <AuthorCard author={author} />

          {/* 16. Related reading */}
          {related.length > 0 && (
            <section className="mt-12">
              <h2 className="font-heading text-2xl font-semibold tracking-tight mb-6">Related reading</h2>
              <ul className="space-y-4">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link to={`/blog/${r.slug}`} className="group flex items-start gap-3">
                      <ArrowRight size={18} className="mt-1 text-accent flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                      <span>
                        <span className="font-heading font-semibold group-hover:text-accent transition-colors">{r.title}</span>
                        <span className="block luxury-body-sm text-muted-foreground">{r.excerpt}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* 17. Sources */}
          {post.sources.length > 0 && (
            <section className="mt-12 pt-8 border-t border-hairline">
              <h2 className="luxury-label mb-4">Sources &amp; references</h2>
              <ul className="space-y-2 list-disc pl-5">
                {post.sources.map((s, i) => (
                  <li key={i}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="luxury-body-sm text-accent underline underline-offset-2 decoration-accent/40 hover:decoration-accent"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-12">
            <Link to="/blog" className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all font-body text-sm tracking-[0.1em] uppercase">
              <ArrowLeft size={16} /> All articles
            </Link>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogDetail;
