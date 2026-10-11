import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { getAuthorBySlug, getPostsByAuthor, getCategoryBySlug } from "@/data/blog";
import { buildAuthorGraph, authorUrl } from "@/lib/blog/schema";
import { SeoHead } from "@/components/SeoHead";
import { LazyImage } from "@/components/LazyImage";
import { motionStagger } from "@/components/PageTransition";

function initials(name: string): string {
  return name.split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
}

function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const BlogAuthor = () => {
  const { slug } = useParams<{ slug: string }>();
  const author = slug ? getAuthorBySlug(slug) : undefined;

  if (!author) return <Navigate to="/blog" replace />;

  const posts = getPostsByAuthor(author.slug);

  return (
    <>
      <SeoHead
        title={`${author.name} — ${author.title} | Cornelian Interiors`}
        description={author.bioShort}
        canonical={authorUrl(author.slug)}
        jsonLd={buildAuthorGraph(author, posts)}
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
          <div className="flex items-start gap-5">
            {author.headshot ? (
              <img
                src={author.headshot}
                alt={`${author.name}, ${author.title} at Cornelian Executive Interiors`}
                width={88}
                height={88}
                className="rounded-full object-cover"
                style={{ width: 88, height: 88 }}
              />
            ) : (
              <span
                aria-hidden
                className="rounded-full bg-charcoal text-cream flex items-center justify-center font-heading"
                style={{ width: 88, height: 88, fontSize: 32 }}
              >
                {initials(author.name)}
              </span>
            )}
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight">{author.name}</h1>
              <p className="text-muted-foreground mt-1">{author.title}, Cornelian Executive Interiors</p>
            </div>
          </div>
        </div>
      </section>

      <section className="luxury-section bg-background">
        <div className="luxury-container max-w-3xl">
          <p className="luxury-body leading-relaxed mb-6">{author.bioLong}</p>

          <p className="luxury-label mb-3">Areas of expertise</p>
          <div className="flex flex-wrap gap-2 mb-12">
            {author.knowsAbout.map((k) => (
              <span key={k} className="px-3 py-1 text-sm bg-secondary rounded-full">{k}</span>
            ))}
          </div>

          <h2 className="font-heading text-2xl md:text-3xl font-semibold tracking-tight mb-6">
            Articles by {author.name.split(/\s+/)[0]}
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {posts.map((post, i) => {
              const category = getCategoryBySlug(post.categorySlug);
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
                    {category && <span className="luxury-label block mb-2">{category.name}</span>}
                    <h3 className="luxury-heading-sm mb-2 group-hover:text-accent transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
                      <span className="inline-flex items-center gap-1"><Clock size={12} aria-hidden /> {post.readingTimeMin} min</span>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>

          <div className="mt-12">
            <Link to="/blog" className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all font-body text-sm tracking-[0.1em] uppercase">
              All articles <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogAuthor;
