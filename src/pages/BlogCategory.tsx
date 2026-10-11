import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import {
  getCategoryBySlug,
  getPostsByCategory,
  getAuthorBySlug,
  categories,
} from "@/data/blog";
import { buildCategoryGraph, categoryUrl } from "@/lib/blog/schema";
import { SeoHead } from "@/components/SeoHead";
import { LazyImage } from "@/components/LazyImage";
import { motionStagger } from "@/components/PageTransition";

function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const BlogCategory = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? getCategoryBySlug(slug) : undefined;

  if (!category) return <Navigate to="/blog" replace />;

  const posts = getPostsByCategory(category.slug);
  const cornerstone = category.cornerstoneSlug
    ? posts.find((p) => p.slug === category.cornerstoneSlug)
    : undefined;

  return (
    <>
      <SeoHead
        title={category.hubTitle}
        description={category.hubDescription}
        canonical={categoryUrl(category.slug)}
        jsonLd={buildCategoryGraph(category, posts)}
      />

      <section className="pt-32 pb-12 bg-secondary">
        <div className="luxury-container max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs tracking-wide text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link to="/" className="hover:text-accent">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link to="/blog" className="hover:text-accent">Blog</Link></li>
            </ol>
          </nav>
          <p className="luxury-label mb-4">Category</p>
          <h1 className="luxury-heading-xl mb-6">{category.h1}</h1>
          <div className="luxury-divider" />
        </div>
      </section>

      <section className="luxury-section bg-background">
        <div className="luxury-container max-w-3xl">
          {/* Intro (pillar copy) */}
          <div className="blog-body">
            {category.intro.map((para, i) => (
              <p key={i} className="luxury-body mb-6 leading-relaxed">{para}</p>
            ))}
          </div>

          {/* What this section covers */}
          <h2 className="font-heading text-2xl md:text-3xl font-semibold tracking-tight mt-12 mb-5">
            What this section covers
          </h2>
          <ul className="list-disc pl-6 space-y-2 luxury-body mb-4">
            {category.covers.map((c, i) => <li key={i}>{c}</li>)}
          </ul>

          {/* Start here */}
          {cornerstone && (
            <>
              <h2 className="font-heading text-2xl md:text-3xl font-semibold tracking-tight mt-12 mb-5">
                Start here
              </h2>
              <Link
                to={`/blog/${cornerstone.slug}`}
                className="group block border border-hairline hover:border-accent transition-colors p-6"
              >
                <span className="font-heading text-xl font-semibold group-hover:text-accent transition-colors">
                  {cornerstone.title}
                </span>
                <span className="block luxury-body-sm text-muted-foreground mt-2">{cornerstone.excerpt}</span>
                <span className="inline-flex items-center gap-2 mt-3 text-accent text-sm group-hover:gap-3 transition-all">
                  Read the article <ArrowRight size={14} />
                </span>
              </Link>
            </>
          )}

          {/* All articles in this section */}
          <h2 className="font-heading text-2xl md:text-3xl font-semibold tracking-tight mt-12 mb-6">
            All articles in this section
          </h2>
          {posts.length === 0 ? (
            <p className="luxury-body text-muted-foreground">
              The first articles in this section are being published. In the meantime, browse{" "}
              <Link to="/blog" className="text-accent underline underline-offset-2">all insights</Link>.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-8">
              {posts.map((post, i) => {
                const author = getAuthorBySlug(post.authorSlug);
                return (
                  <motion.article key={post.slug} {...motionStagger} transition={{ ...motionStagger.transition, delay: i * 0.05 }}>
                    <Link to={`/blog/${post.slug}`} className="group block">
                      <div className="luxury-image-hover mb-4 overflow-hidden">
                        <LazyImage
                          src={post.hero.src}
                          alt={post.hero.alt}
                          className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <h3 className="luxury-heading-sm mb-2 group-hover:text-accent transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="luxury-body-sm line-clamp-2 mb-2">{post.excerpt}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        {author && <span>{author.name}</span>}
                        <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
                        <span className="inline-flex items-center gap-1"><Clock size={12} aria-hidden /> {post.readingTimeMin} min</span>
                      </div>
                    </Link>
                  </motion.article>
                );
              })}
            </div>
          )}

          {/* FAQ */}
          {category.faqs.length > 0 && (
            <section className="mt-14">
              <h2 className="font-heading text-2xl md:text-3xl font-semibold tracking-tight mb-6">
                Frequently asked questions
              </h2>
              <dl className="space-y-6">
                {category.faqs.map((f, i) => (
                  <div key={i} className="border-b border-hairline pb-6">
                    <dt className="font-heading text-lg font-semibold mb-2">{f.q}</dt>
                    <dd className="luxury-body leading-relaxed">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {/* Other categories */}
          <section className="mt-14 pt-8 border-t border-hairline">
            <p className="luxury-label mb-4">Other sections</p>
            <div className="flex flex-wrap gap-2">
              {categories.filter((c) => c.slug !== category.slug).map((c) => (
                <Link
                  key={c.slug}
                  to={`/blog/category/${c.slug}`}
                  className="px-4 py-1.5 text-sm font-body tracking-wide rounded-full border border-hairline hover:border-accent hover:text-accent transition-colors"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default BlogCategory;
