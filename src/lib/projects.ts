import { projects } from "@/data/projects";
import type { Project } from "@/types/project";

/**
 * Project data-access layer — the single seam every page reads through.
 *
 * Today it returns static data from src/data/projects.ts. To move to the
 * Supabase-backed CMS later, swap these bodies for queries against the
 * `projects` table (see supabase/migrations/003_projects.sql) — ideally behind
 * React Query hooks — without changing any calling component's contract.
 */

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFlagshipProject(): Project | undefined {
  return projects.find((p) => p.flagship);
}

export function getStandardProjects(): Project[] {
  return projects.filter((p) => !p.flagship);
}
