import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Parallax";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type {
  Project,
  ProjectBrand,
  ProjectImage,
  ProjectPlan,
  ProjectVideo,
} from "@/types/project";

/* ------------------------------------------------------------------ *
 * Shared project sections.
 *
 * Every section renders ONLY when its underlying data is present and
 * non-empty. With today's mostly-empty data most of these return null,
 * so the page never shows an empty heading or placeholder.
 * ------------------------------------------------------------------ */

const nonEmpty = (v?: string): v is string => Boolean(v && v.trim());

/** Small kicker + heading used across sections. */
export function SectionHeader({
  kicker,
  title,
  className,
}: {
  kicker?: string;
  title: string;
  className?: string;
}) {
  return (
    <Reveal className={cn("mb-10 md:mb-14", className)}>
      {kicker && <p className="luxury-label text-accent mb-4">{kicker}</p>}
      <h2 className="luxury-heading-md text-cream">{title}</h2>
    </Reveal>
  );
}

/* ── Overview ─────────────────────────────────────────────────────── */

export function ProjectOverview({ project }: { project: Project }) {
  const facts: { label: string; value: string }[] = [
    { label: "Client", value: project.client ?? "" },
    { label: "Category", value: project.category },
    { label: "Location", value: project.city ?? project.location },
    { label: "Size", value: project.size ?? "" },
    { label: "Budget", value: project.budget ?? "" },
    { label: "Year", value: project.year ?? "" },
  ].filter((f) => nonEmpty(f.value));

  const scope = (project.scopeOfWork ?? []).filter(nonEmpty);

  // Overview always has at least category + location, so it always renders —
  // but individual rows/chips still guard themselves.
  if (facts.length === 0 && scope.length === 0) return null;

  return (
    <section className="luxury-section bg-background" aria-labelledby="overview-heading">
      <div className="luxury-container">
        <SectionHeader kicker="The Brief" title="Overview" />
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="luxury-body max-w-2xl">{project.description}</p>
            {scope.length > 0 && (
              <div className="mt-10">
                <p className="luxury-label text-muted-foreground mb-4">Scope of Work</p>
                <div className="flex flex-wrap gap-3">
                  {scope.map((s) => (
                    <span
                      key={s}
                      className="border border-hairline bg-card px-4 py-2 font-body text-xs uppercase tracking-[0.12em] text-cream/80"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          {facts.length > 0 && (
            <div className="lg:col-span-5">
              <dl className="border-t border-hairline">
                {facts.map((f) => (
                  <div
                    key={f.label}
                    className="flex items-baseline justify-between gap-6 border-b border-hairline py-4"
                  >
                    <dt className="luxury-label text-muted-foreground">{f.label}</dt>
                    <dd className="font-heading text-lg text-cream text-right">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Brands & Materials ───────────────────────────────────────────── */

export function ProjectBrands({ brands }: { brands?: ProjectBrand[] }) {
  const list = (brands ?? []).filter((b) => nonEmpty(b.name));
  if (list.length === 0) return null;

  const grouped = list.some((b) => nonEmpty(b.category));
  const groups = new Map<string, ProjectBrand[]>();
  if (grouped) {
    for (const b of list) {
      const key = nonEmpty(b.category) ? b.category! : "Other";
      const arr = groups.get(key) ?? [];
      arr.push(b);
      groups.set(key, arr);
    }
  }

  return (
    <section className="luxury-section bg-secondary" aria-labelledby="brands-heading">
      <div className="luxury-container">
        <SectionHeader kicker="Specified" title="Brands & Materials" />
        {grouped ? (
          <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {[...groups.entries()].map(([category, items]) => (
              <div key={category} className="border-t border-hairline pt-5">
                <p className="luxury-label text-accent mb-4">{category}</p>
                <ul className="space-y-2">
                  {items.map((b) => (
                    <li key={b.name} className="font-heading text-lg text-cream">
                      {b.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-x-12 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((b) => (
              <div key={b.name} className="border-b border-hairline py-3 font-heading text-lg text-cream">
                {b.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Plans (floor plans / elevations) ─────────────────────────────── */

function ZoomablePlan({ plan, alt }: { plan: ProjectPlan; alt: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group relative block w-full overflow-hidden border border-hairline bg-card text-left"
        >
          <img
            src={plan.src}
            alt={plan.label ? `${alt} — ${plan.label}` : alt}
            loading="lazy"
            className="w-full object-contain"
          />
          <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center bg-charcoal/70 text-cream/80 opacity-0 transition-opacity group-hover:opacity-100">
            <ZoomIn size={16} />
          </span>
          {nonEmpty(plan.label) && (
            <span className="block border-t border-hairline px-4 py-3 luxury-label text-muted-foreground">
              {plan.label}
            </span>
          )}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl border-hairline bg-background p-2">
        <img
          src={plan.src}
          alt={plan.label ? `${alt} — ${plan.label}` : alt}
          className="max-h-[85vh] w-full object-contain"
        />
      </DialogContent>
    </Dialog>
  );
}

export function ProjectPlans({
  plans,
  kicker,
  title,
  alt,
}: {
  plans?: ProjectPlan[];
  kicker: string;
  title: string;
  alt: string;
}) {
  const list = (plans ?? []).filter((p) => nonEmpty(p.src));
  if (list.length === 0) return null;

  return (
    <section className="luxury-section bg-background" aria-label={title}>
      <div className="luxury-container">
        <SectionHeader kicker={kicker} title={title} />
        <div className="grid gap-6 md:grid-cols-2">
          {list.map((p, i) => (
            <Reveal key={`${p.src}-${i}`} delay={(i % 2) * 0.08}>
              <ZoomablePlan plan={p} alt={alt} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Site Photos ──────────────────────────────────────────────────── */

export function ProjectSitePhotos({ photos }: { photos?: ProjectImage[] }) {
  const list = (photos ?? []).filter((p) => nonEmpty(p.src));
  if (list.length === 0) return null;

  return (
    <section className="luxury-section bg-secondary" aria-label="Site photos">
      <div className="luxury-container">
        <SectionHeader kicker="On Site" title="Site Photography" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <Reveal key={`${p.src}-${i}`} delay={(i % 3) * 0.06}>
              <figure className="group overflow-hidden border border-hairline bg-card">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={p.src}
                    alt={p.caption ?? "Site photograph"}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                {nonEmpty(p.caption) && (
                  <figcaption className="border-t border-hairline px-4 py-3 luxury-body-sm text-muted-foreground">
                    {p.caption}
                  </figcaption>
                )}
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Videos ───────────────────────────────────────────────────────── */

export function ProjectVideos({ videos }: { videos?: ProjectVideo[] }) {
  const list = (videos ?? []).filter((v) => nonEmpty(v.src));
  if (list.length === 0) return null;

  return (
    <section className="luxury-section bg-background" aria-label="Videos">
      <div className="luxury-container">
        <SectionHeader kicker="Motion" title="Walkthrough Films" />
        <div className="grid gap-8 lg:grid-cols-2">
          {list.map((v, i) => (
            <Reveal key={`${v.src}-${i}`} delay={(i % 2) * 0.08}>
              <figure className="border border-hairline bg-card">
                <video
                  controls
                  preload="metadata"
                  poster={v.poster}
                  className="w-full bg-charcoal"
                >
                  <source src={v.src} />
                </video>
                {nonEmpty(v.title) && (
                  <figcaption className="border-t border-hairline px-4 py-3 luxury-body-sm text-muted-foreground">
                    {v.title}
                  </figcaption>
                )}
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Prev / Next navigation ───────────────────────────────────────── */

export function ProjectNav({
  prev,
  next,
}: {
  prev?: Project;
  next?: Project;
}) {
  if (!prev && !next) return null;
  return (
    <nav
      className="border-t border-hairline bg-background"
      aria-label="Project navigation"
    >
      <div className="luxury-container grid gap-px sm:grid-cols-2">
        {prev ? (
          <Link
            to={`/projects/${prev.slug}`}
            className="group flex flex-col gap-2 py-10 pr-6 sm:border-r sm:border-hairline"
          >
            <span className="inline-flex items-center gap-2 luxury-label text-muted-foreground group-hover:text-accent transition-colors">
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
              Previous
            </span>
            <span className="font-heading text-2xl text-cream group-hover:text-accent transition-colors">
              {prev.name}
            </span>
          </Link>
        ) : (
          <span aria-hidden />
        )}
        {next ? (
          <Link
            to={`/projects/${next.slug}`}
            className="group flex flex-col items-end gap-2 py-10 sm:pl-6 text-right"
          >
            <span className="inline-flex items-center gap-2 luxury-label text-muted-foreground group-hover:text-accent transition-colors">
              Next
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </span>
            <span className="font-heading text-2xl text-cream group-hover:text-accent transition-colors">
              {next.name}
            </span>
          </Link>
        ) : (
          <span aria-hidden />
        )}
      </div>
    </nav>
  );
}

/* ── Bundle: all conditional fact/media sections in order ─────────── */

export function ProjectMediaSections({
  project,
  children,
}: {
  project: Project;
  children?: ReactNode;
}) {
  const media = project.media ?? {};
  return (
    <>
      <ProjectOverview project={project} />
      {children}
      <ProjectBrands brands={project.brands} />
      <ProjectPlans
        plans={media.floorPlans}
        kicker="Layout"
        title="Floor Plans"
        alt={`${project.name} floor plan`}
      />
      <ProjectPlans
        plans={media.elevations}
        kicker="Detail"
        title="Elevations"
        alt={`${project.name} elevation`}
      />
      <ProjectSitePhotos photos={media.sitePhotos} />
      <ProjectVideos videos={media.videos} />
    </>
  );
}
