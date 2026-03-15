export const SITE_URL = import.meta.env.VITE_SITE_URL ?? (typeof window !== "undefined" ? window.location.origin : "https://cornelianinteriors.com");

export const SEO_DEFAULTS = {
  siteName: "Cornelian Executive Interiors",
  title: "Cornelian Executive Interiors | Timeless Spaces, Bespoke Furniture & Art",
  description: "Luxury interior design & build in Noida, NCR. Bespoke custom furniture, CHIITRA wall art. Timeless spaces, delivered.",
  keywords: "Interior designers in Noida, Modular kitchen Noida, Custom furniture NCR, Luxury interiors India, Interior design Noida, Custom cabinets Noida",
  ogImage: `${SITE_URL}/og-image.jpg`,
  twitterHandle: "@world_cornelian",
} as const;

export const ROUTE_SEO: Record<string, { title: string; description: string }> = {
  "/": {
    title: `${SEO_DEFAULTS.siteName} | Timeless Spaces, Bespoke Furniture & Art`,
    description: "Transform your space with Cornelian. Premium interior design, custom furniture & CHIITRA wall art in Noida, NCR. Get a free consultation.",
  },
  "/projects": {
    title: "Our Projects | Interior Design Portfolio | Cornelian Interiors Noida",
    description: "Explore our portfolio of luxury residential and commercial interiors in Noida and Greater Noida. Interior design projects by Cornelian Executive Interiors.",
  },
  "/services": {
    title: "Interior Design & Build Services | Noida | Cornelian Interiors",
    description: "Interior designing, construction, renovation, customized furniture, modular wardrobe & kitchen, home automation. Full-service interior design in Noida, NCR.",
  },
  "/about": {
    title: "About Us | Cornelian Executive Interiors | Noida",
    description: "Founded 2020 in Noida. Trust, transparency, quality. Luxury interior design & build. Classical beauty meets modern living.",
  },
  "/contact": {
    title: "Contact | Cornelian Executive Interiors | Noida",
    description: "Get in touch. D107 Sector 2 Noida. Phone, email, Instagram. Start your interior design project.",
  },
  "/blog": {
    title: "Blog | Interior Tips & Guides | Cornelian Interiors",
    description: "Interior design tips, modular kitchen guides, furniture buying advice. Expert content from Cornelian Executive Interiors.",
  },
  "/custom-order": {
    title: "Design Your Cabinet | Custom Furniture Order | Cornelian Interiors",
    description: "Hassle-free custom furniture. Console & modular cabinets. Your size, your style. Upload reference images. Doorstep delivery in NCR.",
  },
  "/custom-furniture": {
    title: "Custom Furniture | Console & Cabinet | Cornelian Executive Interiors",
    description: "Bespoke console and modular cabinets. Your size, your style. Upload inspiration, choose dimensions and finish. Direct delivery in NCR.",
  },
  "/chiitra": {
    title: "CHIITRA by Cornelian | Bespoke Wall Art & Wall Painting",
    description: "Customizable luxury wall art and wall painting. Upload reference, choose size and frame. CHIITRA by Cornelian Executive Interiors.",
  },
};

export function getSeoForPath(pathname: string): { title: string; description: string } {
  const normalized = pathname.replace(/\/$/, "") || "/";
  const exact = ROUTE_SEO[normalized];
  if (exact) return exact;
  if (normalized.startsWith("/projects/")) return ROUTE_SEO["/projects"];
  if (normalized.startsWith("/blog/")) return ROUTE_SEO["/blog"];
  if (normalized.startsWith("/custom-furniture")) return ROUTE_SEO["/custom-furniture"];
  if (normalized.startsWith("/chiitra")) return ROUTE_SEO["/chiitra"];
  return { title: SEO_DEFAULTS.title, description: SEO_DEFAULTS.description };
}
