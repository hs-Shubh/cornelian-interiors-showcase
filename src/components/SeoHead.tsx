import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getSeoForPath, SITE_URL, SEO_DEFAULTS } from "@/config/seo";

interface SeoHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
  jsonLd?: object | object[];
  prevUrl?: string;
  nextUrl?: string;
}

export function SeoHead({
  title,
  description,
  canonical,
  ogImage,
  noindex,
  jsonLd,
  prevUrl,
  nextUrl,
}: SeoHeadProps) {
  const location = useLocation();
  const pathSeo = getSeoForPath(location.pathname);
  const finalTitle = title ?? pathSeo.title;
  const finalDescription = description ?? pathSeo.description;
  const canonicalUrl = canonical ?? `${SITE_URL}${location.pathname.replace(/\/$/, "") || ""}`;
  const image = ogImage ?? SEO_DEFAULTS.ogImage;

  useEffect(() => {
    document.title = finalTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", finalDescription);
  }, [finalTitle, finalDescription]);

  useEffect(() => {
    const linkCanonical = document.querySelector('link[rel="canonical"]');
    if (linkCanonical) linkCanonical.setAttribute("href", canonicalUrl);
  }, [canonicalUrl]);

  useEffect(() => {
    let robots = document.querySelector('meta[name="robots"]');
    if (noindex) {
      if (!robots) {
        robots = document.createElement("meta");
        robots.setAttribute("name", "robots");
        document.head.appendChild(robots);
      }
      robots.setAttribute("content", "noindex,nofollow");
    } else if (robots) {
      robots.remove();
    }
  }, [noindex]);

  useEffect(() => {
    const set = (rel: "prev" | "next", href?: string) => {
      let link = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (href) {
        if (!link) {
          link = document.createElement("link");
          link.setAttribute("rel", rel);
          document.head.appendChild(link);
        }
        link.setAttribute("href", href);
      } else if (link) {
        link.remove();
      }
    };
    set("prev", prevUrl);
    set("next", nextUrl);
    return () => {
      set("prev", undefined);
      set("next", undefined);
    };
  }, [prevUrl, nextUrl]);

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(Array.isArray(jsonLd) ? jsonLd : jsonLd),
          }}
        />
      )}
    </>
  );
}
