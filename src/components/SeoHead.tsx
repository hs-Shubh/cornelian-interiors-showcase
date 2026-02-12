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
}

export function SeoHead({
  title,
  description,
  canonical,
  ogImage,
  noindex,
  jsonLd,
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
