/**
 * Canonical project (portfolio) data model.
 *
 * This is the single source of truth for a project's shape across the app.
 * It is intentionally a superset of the original fields (name/slug/location/
 * category/description/thumbnail/images) so existing pages keep working, while
 * adding the richer fields the team will upload per project.
 *
 * The same shape is mirrored by the Supabase `projects` table
 * (see supabase/migrations/003_projects.sql) so content can move from static
 * data → CMS uploads without touching the UI.
 */

/** A gallery image with an optional caption. */
export interface ProjectImage {
  src: string;
  caption?: string;
}

/** A titled document image — floor plan or elevation drawing. */
export interface ProjectPlan {
  src: string;
  /** e.g. "Ground Floor", "North Elevation". */
  label?: string;
}

/** A project video — walkthrough, drone footage, or reel. */
export interface ProjectVideo {
  src: string;
  poster?: string;
  title?: string;
}

/** A brand or material used in the project. */
export interface ProjectBrand {
  name: string;
  /** e.g. "Modular Kitchen", "Sanitaryware", "Laminate", "Lighting". */
  category?: string;
  /** Optional brand logo URL. */
  logo?: string;
}

/** Optional scroll-scrubbed fly-through frame set (Apple-style walkthrough). */
export interface WalkthroughFrames {
  /** Public path holding frame_0001.jpg … e.g. "/showcase-frames/foyer". */
  base: string;
  count: number;
}

/** Secondary media buckets beyond the primary 3D `images` gallery. */
export interface ProjectMedia {
  /** Real finished / on-site construction photos. */
  sitePhotos?: ProjectImage[];
  floorPlans?: ProjectPlan[];
  elevations?: ProjectPlan[];
  videos?: ProjectVideo[];
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  /** The single immersive scroll-walkthrough project (others render standard). */
  flagship?: boolean;

  // ── Overview / facts ────────────────────────────────────────────────
  category: string; // Residential | Commercial | …
  client?: string;
  city?: string;
  location: string; // area / project address line
  size?: string; // e.g. "3,200 sq ft"
  budget?: string; // e.g. "₹45 Lakh" (optional — may be withheld)
  year?: string;
  scopeOfWork?: string[]; // Turnkey, Civil, Modular, Fit-out…
  description: string;

  // ── Brands / materials used ─────────────────────────────────────────
  brands?: ProjectBrand[];

  // ── Media ───────────────────────────────────────────────────────────
  thumbnail: string;
  /** Primary 3D render gallery. */
  images: ProjectImage[];
  media?: ProjectMedia;

  /** Optional immersive fly-through (flagship). */
  walkthroughFrames?: WalkthroughFrames;
}
