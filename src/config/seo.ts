export const SITE_URL = import.meta.env.VITE_SITE_URL ?? (typeof window !== "undefined" ? window.location.origin : "https://cornelianinteriors.com");

export const SEO_DEFAULTS = {
  siteName: "Cornelian Executive Interiors",
  title: "Cornelian Executive Interiors | Interior Designers in Noida | Custom Furniture NCR",
  description: "Luxury interior design & build in Noida, NCR. Custom furniture, modular kitchen, interior construction. Interior designers in Noida. Crafting timeless spaces with modern grace.",
  keywords: "Interior designers in Noida, Modular kitchen Noida, Custom furniture NCR, Luxury interiors India, Interior design Noida, Custom cabinets Noida",
  ogImage: `${SITE_URL}/og-image.jpg`,
  twitterHandle: "@world_cornelian",
} as const;

export const ROUTE_SEO: Record<string, { title: string; description: string }> = {
  "/": {
    title: `${SEO_DEFAULTS.siteName} | Interior Designers in Noida | Crafting Timeless Spaces`,
    description: "Transform your space with Cornelian Executive Interiors. Premium interior design, custom furniture & modular solutions in Noida, NCR. No middlemen — your size, your style, delivered.",
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
};

export function getSeoForPath(pathname: string): { title: string; description: string } {
  const normalized = pathname.replace(/\/$/, "") || "/";
  const exact = ROUTE_SEO[normalized];
  if (exact) return exact;
  if (normalized.startsWith("/projects/")) return ROUTE_SEO["/projects"];
  if (normalized.startsWith("/blog/")) return ROUTE_SEO["/blog"];
  return { title: SEO_DEFAULTS.title, description: SEO_DEFAULTS.description };
}
