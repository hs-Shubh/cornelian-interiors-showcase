import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { fetchBlogPostBySlug } from "@/lib/api/blog";
import { SeoHead } from "@/components/SeoHead";
import { SITE_URL, SEO_DEFAULTS } from "@/config/seo";

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: () => fetchBlogPostBySlug(slug ?? ""),
    enabled: Boolean(slug),
  });

  if (!slug) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <Link to="/blog" className="text-accent hover:underline">← Back to Blog</Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 luxury-container">
        <div className="animate-pulse max-w-3xl mx-auto">
          <div className="h-10 bg-muted w-48 mb-8" />
          <div className="h-12 bg-muted w-full mb-4" />
          <div className="h-4 bg-muted w-2/3 mb-8" />
          <div className="h-64 bg-muted w-full" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24">
        <h1 className="luxury-heading-lg mb-4">Post not found</h1>
        <Link to="/blog" className="inline-flex items-center gap-2 text-accent hover:underline">
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.seo_title ?? post.title,
    description: post.seo_description ?? post.excerpt ?? SEO_DEFAULTS.description,
    image: post.cover_image ?? SEO_DEFAULTS.ogImage,
    datePublished: post.published_at ?? post.created_at,
    dateModified: post.updated_at,
    author: { "@type": "Organization", name: SEO_DEFAULTS.siteName },
    publisher: { "@type": "Organization", name: SEO_DEFAULTS.siteName, logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.jpg` } },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
  };

  return (
    <>
      <SeoHead
        title={post.seo_title ?? post.title}
        description={post.seo_description ?? post.excerpt ?? undefined}
        canonical={`${SITE_URL}/blog/${post.slug}`}
        ogImage={post.cover_image ?? undefined}
        jsonLd={jsonLd}
      />
      <article>
        <header className="pt-32 pb-12 bg-secondary">
          <div className="luxury-container">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 font-body text-sm tracking-[0.1em] uppercase"
            >
              <ArrowLeft size={16} />
              Blog
            </Link>
            <h1 className="luxury-heading-xl mb-4">{post.title}</h1>
            {post.published_at && (
              <time dateTime={post.published_at} className="luxury-label">
                {new Date(post.published_at).toLocaleDateString("en-IN", { dateStyle: "long" })}
              </time>
            )}
          </div>
        </header>
        {post.cover_image && (
          <div className="luxury-container py-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden"
            >
              <img
                src={post.cover_image}
                alt=""
                className="w-full aspect-[21/9] object-cover"
                loading="eager"
              />
            </motion.div>
          </div>
        )}
        <div className="luxury-section bg-background">
          <div className="luxury-container max-w-3xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="prose prose-lg prose-neutral max-w-none font-body text-foreground/90"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogDetail;
