import type { Project } from "@/types/project";

// Existing project renders
import parxLaureate1 from "@/assets/projects/parx-laureate-1.jpg";
import parxLaureate2 from "@/assets/projects/parx-laureate-2.jpg";
import parxLaureate3 from "@/assets/projects/parx-laureate-3.jpg";
import mezzaria1_1 from "@/assets/projects/mezzaria1-1.jpg";
import mezzaria1_2 from "@/assets/projects/mezzaria1-2.jpg";
import mezzaria1_3 from "@/assets/projects/mezzaria1-3.jpg";
import mezzaria2_1 from "@/assets/projects/mezzaria2-1.jpg";
import mezzaria2_2 from "@/assets/projects/mezzaria2-2.jpg";
import mezzaria2_3 from "@/assets/projects/mezzaria2-3.jpg";

/**
 * Project portfolio data.
 *
 * NOTE ON MISSING FIELDS: client, size, budget, year, scopeOfWork, brands,
 * site photos, floor plans, elevations and videos are intentionally left
 * empty/undefined here — they await the real per-project content the team
 * will upload (via the Supabase `projects` table / storage buckets defined in
 * supabase/migrations/003_projects.sql). Nothing below is fabricated.
 *
 * `flagship: true` marks the project that gets the immersive scroll
 * walkthrough; all others render as standard image galleries. The flagship
 * assignment below is a placeholder — move it to the intended hero project.
 */
export const projects: Project[] = [
  {
    id: "1",
    slug: "parx-laureate",
    name: "Parx Laureate",
    flagship: true, // TODO: confirm which project is the immersive flagship
    category: "Residential",
    city: "Noida",
    location: "Noida",
    description:
      "A masterpiece of contemporary elegance, Parx Laureate showcases our signature blend of classical beauty with modern functionality. Every corner speaks of refined taste and meticulous craftsmanship.",
    thumbnail: parxLaureate1,
    images: [
      { src: parxLaureate1, caption: "Living Room" },
      { src: parxLaureate2, caption: "Living Room" },
      { src: parxLaureate3, caption: "Master Bedroom" },
    ],
    // Reuses the existing demo fly-through until per-project frames are exported.
    walkthroughFrames: { base: "/showcase-frames/foyer", count: 120 },
    // Awaiting upload:
    scopeOfWork: [],
    brands: [],
    media: { sitePhotos: [], floorPlans: [], elevations: [], videos: [] },
  },
  {
    id: "2",
    slug: "mahagun-mezzaria-1",
    name: "Mahagun Mezzaria I",
    category: "Residential",
    city: "Greater Noida",
    location: "Greater Noida",
    description:
      "An exquisite residence that embodies sophistication at every turn. Rich textures, thoughtful lighting, and bespoke furniture come together in perfect harmony.",
    thumbnail: mezzaria1_1,
    images: [
      { src: mezzaria1_1, caption: "Living Room" },
      { src: mezzaria1_2, caption: "Lounge" },
      { src: mezzaria1_3, caption: "Master Bedroom" },
    ],
    scopeOfWork: [],
    brands: [],
    media: { sitePhotos: [], floorPlans: [], elevations: [], videos: [] },
  },
  {
    id: "3",
    slug: "mahagun-mezzaria-2",
    name: "Mahagun Mezzaria II",
    category: "Residential",
    city: "Greater Noida",
    location: "Greater Noida",
    description:
      "Where traditional meets modern in perfect equilibrium. This residence features an elegant interplay of light, space, and luxurious materials.",
    thumbnail: mezzaria2_1,
    images: [
      { src: mezzaria2_1, caption: "Living Room" },
      { src: mezzaria2_2, caption: "Lounge" },
      { src: mezzaria2_3, caption: "Master Bedroom" },
    ],
    scopeOfWork: [],
    brands: [],
    media: { sitePhotos: [], floorPlans: [], elevations: [], videos: [] },
  },
];
