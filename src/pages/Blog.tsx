import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fetchBlogPosts } from "@/lib/api/blog";
import { SeoHead } from "@/components/SeoHead";
import { LazyImage } from "@/components/LazyImage";
import { motionSection, motionStagger } from "@/components/PageTransition";

const Blog = () => {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: fetchBlogPosts,
  });

  return (
    <>
      <SeoHead />
      <section className="pt-32 pb-20 bg-secondary" aria-labelledby="blog-heading">
        <div className="luxury-container">
          <p className="luxury-label mb-4">Blog</p>
          <h1 id="blog-heading" className="luxury-heading-xl mb-6">
            Interior Tips & Guides
          </h1>
          <div className="luxury-divider mb-8" />
          <p className="luxury-body max-w-2xl">
            Expert advice on interior design, modular kitchens, custom furniture, and more. Interior designers in Noida — insights from Cornelian Executive Interiors.
          </p>
        </div>
      </section>

      <section className="luxury-section bg-background">
        <div className="luxury-container">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="w-full aspect-[4/3] bg-muted rounded" />
                  <div className="h-4 bg-muted mt-4 w-2/3" />
                  <div className="h-3 bg-muted mt-2 w-full" />
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <motion.div
              className="text-center py-16 border border-border rounded-lg"
              {...motionSection}
            >
              <p className="luxury-body mb-4">No posts yet. Check back soon for interior design tips and guides.</p>
              <Link to="/" className="text-accent font-body text-sm tracking-[0.1em] uppercase hover:underline">
                Back to Home
              </Link>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <motion.article
                  key={post.id}
                  {...motionStagger}
                  transition={{ ...motionStagger.transition, delay: i * 0.06 }}
                >
                  <Link to={`/blog/${post.slug}`} className="group block">
                    <div className="luxury-image-hover mb-6 overflow-hidden">
                      {post.cover_image ? (
                        <LazyImage
                          src={post.cover_image}
                          alt=""
                          className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full aspect-[4/3] bg-muted" aria-hidden />
                      )}
                    </div>
                    <h2 className="luxury-heading-sm mb-2 group-hover:text-accent transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="luxury-body-sm line-clamp-2">{post.excerpt}</p>
                    )}
                    <span className="inline-flex items-center gap-2 mt-3 font-body text-xs tracking-[0.1em] uppercase text-accent group-hover:gap-3 transition-all">
                      Read more
                      <ArrowRight size={14} />
                    </span>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;
