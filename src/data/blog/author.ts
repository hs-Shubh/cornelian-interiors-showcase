import type { BlogAuthor } from "./types";

/**
 * The single author entity, reused across every post. Its Person schema is
 * emitted into each post's @graph with a stable @id of
 * `${SITE_URL}/about#founder`, so Google resolves one recognised author across
 * the whole blog — the core of the Authority (E-E-A-T) signal.
 *
 * FOUNDER INPUT (one-line edits, do not block publishing the infrastructure):
 *   - `name`   : confirm the founder's full legal name (first name "Vikas" is
 *                known from the firm's own outreach; surname to be confirmed).
 *   - `headshot`: drop a square headshot at /public/team/ and set the path
 *                 here; until then an initials monogram renders and the Person
 *                 schema omits `image` (never points at a missing file).
 *   - `bioLong`: confirm the delivered-project count / years if you want a
 *                specific figure — the current copy makes no unverified claim.
 */
export const FOUNDER: BlogAuthor = {
  slug: "vikas-cornelian",
  name: "Vikas",
  title: "Founder & Principal Designer",
  bioShort:
    "Founder and Principal Designer at Cornelian Executive Interiors, specialising in turnkey residential interiors across Noida and NCR.",
  bioLong:
    "Vikas is the Founder and Principal Designer at Cornelian Executive Interiors, a Noida-based interior design and build firm working across Delhi NCR since 2020. He leads the firm's turnkey practice — space planning, modular kitchens, bespoke joinery and the in-house CHIITRA wall-art studio — with a specification-first approach: naming the material grade, the hardware brand and the finish rather than selling a package. These articles draw on the firm's own site experience in Noida and Greater Noida apartments.",
  headshot: null,
  url: "/about",
  sameAs: [
    "https://www.instagram.com/world_cornelian",
  ],
  knowsAbout: [
    "Interior design",
    "Turnkey interiors",
    "Modular kitchen design",
    "Bespoke furniture",
    "Material specification",
    "Plywood and finishes",
    "Interior construction",
    "CHIITRA bespoke wall art",
  ],
};

export const authors: BlogAuthor[] = [FOUNDER];

export function getAuthorBySlug(slug: string): BlogAuthor | undefined {
  return authors.find((a) => a.slug === slug);
}
