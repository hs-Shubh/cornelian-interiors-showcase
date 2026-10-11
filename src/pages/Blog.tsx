import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import {
  getAllPosts,
  getCategoryBySlug,
  getAuthorBySlug,
  categories,
  paginate,
} from "@/data/blog";
import { buildBlogIndexGraph, blogUrl } from "@/lib/blog/schema";
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

const Blog = () => {
  const { page: pageParam } = useParams<{ page: string }>();
  const page = pageParam ? Number(pageParam) : 1;

  if (pageParam && (!Number.isInteger(page) || page < 1)) {
    return <Navigate to="/blog" replace />;
  }

  const all = getAllPosts();
  const paged = paginate(all, page);

  // page number beyond range, or /blog/page/1 (should canonicalise to /blog)
  if (pageParam && (page > paged.totalPages || page === 1)) {
    return <Navigate to="/blog" replace />;
  }

  const canonical = paged.page > 1 ? `${blogUrl}/page/${paged.page}` : blogUrl;
  const prevUrl =
    paged.page > 1 ? (paged.page === 2 ? blogUrl : `${blogUrl}/page/${paged.page - 1}`) : undefined;
  const nextUrl = paged.page < paged.totalPages ? `${blogUrl}/page/${paged.page + 1}` : undefined;

  return (
    <>
      <SeoHead
        title="Interior Design Insights — Noida & NCR | Cornelian"
        description="Specification-first interior design guides for Noida & NCR — water, power, air, materials, process and bespoke art. Written from real site experience."
        canonical={canonical}
        prevUrl={prevUrl}
        nextUrl={nextUrl}
        jsonLd={buildBlogIndexGraph(paged.items, paged.page)}
      />

      <section className="pt-32 pb-12 bg-secondary" aria-labelledby="blog-heading">
        <div className="luxury-container">
          <p className="luxury-label mb-4">Insights</p>
          <h1 id="blog-heading" className="luxury-heading-xl mb-6">
            Interior Design Insights — Noida &amp; NCR
          </h1>
          <div className="luxury-divider mb-8" />
          <p className="luxury-body max-w-2xl">
            Specification-first guides written from real site experience in Noida and Greater Noida —
            the water, power, air and society conditions that decide how an interior actually ages,
            plus the materials, process and bespoke art behind a lasting home.
          </p>
        </div>
      </section>

      {/* Category filter row */}
      <section className="bg-background border-b border-hairline sticky top-0 z-20" aria-label="Browse by category">
        <div className="luxury-container py-4 flex flex-wrap gap-2">
          <Link
            to="/blog"
            className="px-4 py-1.5 text-sm font-body tracking-wide rounded-full bg-charcoal text-cream"
          >
            All
          </Link>
          {categories.map((c) => (
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

      <section className="luxury-section bg-background">
        <div className="luxury-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {paged.items.map((post, i) => {
              const category = getCategoryBySlug(post.categorySlug);
              const author = getAuthorBySlug(post.authorSlug);
              return (
                <motion.article
                  key={post.slug}
                  {...motionStagger}
                  transition={{ ...motionStagger.transition, delay: i * 0.06 }}
                >
                  <Link to={`/blog/${post.slug}`} className="group block">
                    <div className="luxury-image-hover mb-5 overflow-hidden">
                      <LazyImage
                        src={post.hero.src}
                        alt={post.hero.alt}
                        className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    {category && <span className="luxury-label block mb-2">{category.name}</span>}
                    <h2 className="luxury-heading-sm mb-2 group-hover:text-accent transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="luxury-body-sm line-clamp-2 mb-3">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {author && <span>{author.name}</span>}
                      <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={12} aria-hidden /> {post.readingTimeMin} min
                      </span>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>

          {/* Pagination */}
          {paged.totalPages > 1 && (
            <nav aria-label="Pagination" className="mt-16 flex items-center justify-center gap-4">
              {prevUrl && (
                <Link to={prevUrl === blogUrl ? "/blog" : `/blog/page/${paged.page - 1}`} className="text-accent inline-flex items-center gap-2 hover:gap-3 transition-all">
                  <ArrowRight size={16} className="rotate-180" /> Newer
                </Link>
              )}
              <span className="text-sm text-muted-foreground">
                Page {paged.page} of {paged.totalPages}
              </span>
              {nextUrl && (
                <Link to={`/blog/page/${paged.page + 1}`} className="text-accent inline-flex items-center gap-2 hover:gap-3 transition-all">
                  Older <ArrowRight size={16} />
                </Link>
              )}
            </nav>
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;
