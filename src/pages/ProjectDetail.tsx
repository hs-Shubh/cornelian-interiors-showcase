import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import type { Project } from "@/types/project";
import {
  ParallaxImage,
  Parallax,
  Reveal,
  AngleCrossfade,
} from "@/components/Parallax";
import { ScrollSequence } from "@/components/ScrollSequence";
import { SeoHead } from "@/components/SeoHead";
import { ProjectMediaSections, ProjectNav } from "@/components/project/ProjectSections";

const nonEmpty = (v?: string): v is string => Boolean(v && v.trim());

/* ── Not found ────────────────────────────────────────────────────── */

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="luxury-container text-center">
        <p className="luxury-label text-accent mb-4">404</p>
        <h1 className="luxury-heading-md text-cream mb-6">Project Not Found</h1>
        <p className="luxury-body mb-8">
          The project you're looking for doesn't exist or has moved.
        </p>
        <Link
          to="/projects"
          className="group inline-flex items-center gap-2 font-body text-sm uppercase tracking-[0.12em] text-accent hover:text-cornelian-glow transition-colors"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back to Projects
        </Link>
      </div>
    </div>
  );
}

/* ── Hero meta bar ────────────────────────────────────────────────── */

function metaFacts(project: Project): string[] {
  const facts: string[] = [];
  if (nonEmpty(project.client)) facts.push(project.client!);
  if (nonEmpty(project.city ?? project.location)) facts.push((project.city ?? project.location)!);
  if (nonEmpty(project.size)) facts.push(project.size!);
  if (nonEmpty(project.year)) facts.push(project.year!);
  const scope = (project.scopeOfWork ?? []).filter(nonEmpty);
  if (scope.length > 0) facts.push(scope.join(" · "));
  return facts;
}

/* ── Numbered chapters from project.images ────────────────────────── */

function Chapters({ project }: { project: Project }) {
  const images = project.images.filter((i) => nonEmpty(i.src));
  if (images.length === 0) return null;
  return (
    <section className="luxury-section bg-background overflow-hidden" aria-label="Chapters">
      <div className="space-y-24 md:space-y-36">
        {images.map((image, i) => {
          const reversed = i % 2 === 1;
          const next = images[i + 1];
          return (
            <div key={`${image.src}-${i}`} className="luxury-container">
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                <div className={cn("lg:col-span-7", reversed && "lg:order-2")}>
                  {reversed ? (
                    <AngleCrossfade
                      a={image.src}
                      b={next?.src}
                      alt={image.caption ?? `${project.name} — view ${i + 1}`}
                      className="aspect-[4/3] rounded-sm shadow-2xl ring-1 ring-white/5"
                    />
                  ) : (
                    <ParallaxImage
                      src={image.src}
                      alt={image.caption ?? `${project.name} — view ${i + 1}`}
                      className="aspect-[4/3] rounded-sm shadow-2xl ring-1 ring-white/5"
                      strength={6}
                    />
                  )}
                </div>
                <Parallax offset={36} className={cn("lg:col-span-5", reversed && "lg:order-1")}>
                  <span className="block font-heading text-6xl md:text-7xl text-accent/25 leading-none mb-4">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {nonEmpty(image.caption) && (
                    <h3 className="luxury-heading-md text-cream mb-4">{image.caption}</h3>
                  )}
                  <div className="luxury-divider" />
                </Parallax>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ── Flagship (immersive) layout ──────────────────────────────────── */

function FlagshipLayout({ project }: { project: Project }) {
  const heroSrc = project.thumbnail || project.images[0]?.src || "";
  const facts = metaFacts(project);
  const kicker = [project.category, project.city ?? project.location]
    .filter(nonEmpty)
    .join(" · ");

  return (
    <>
      {/* Full-screen hero */}
      <section className="relative min-h-screen flex items-end overflow-hidden bg-charcoal">
        <div className="absolute inset-0">
          <ParallaxImage
            src={heroSrc}
            alt={project.name}
            className="h-full w-full"
            strength={5}
            kenBurns
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/45 to-charcoal/30" />
        </div>
        <div className="relative z-10 w-full">
          <div className="luxury-container pb-10 md:pb-14">
            <Reveal className="max-w-3xl">
              {kicker && <p className="luxury-label text-accent mb-5">{kicker}</p>}
              <h1 className="luxury-heading-xl text-cream mb-6">{project.name}</h1>
              <p className="luxury-body text-cream/80 max-w-2xl">{project.description}</p>
            </Reveal>
          </div>
          {facts.length > 0 && (
            <div className="border-t border-hairline">
              <div className="luxury-container">
                <ul className="flex flex-wrap gap-x-10 gap-y-3 py-6">
                  {facts.map((f, i) => (
                    <li
                      key={`${f}-${i}`}
                      className="font-body text-xs uppercase tracking-[0.14em] text-cream/70"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Immersive walkthrough */}
      {project.walkthroughFrames && (
        <ScrollSequence
          base={project.walkthroughFrames.base}
          count={project.walkthroughFrames.count}
          alt={`${project.name} walkthrough`}
          className="bg-charcoal"
        >
          <div className="flex h-full items-start justify-center pt-24 md:pt-32">
            <div className="text-center">
              <p className="luxury-label text-cream/70 mb-3">Immersive</p>
              <p className="luxury-heading-md text-cream">Step Inside</p>
            </div>
          </div>
        </ScrollSequence>
      )}

      {/* Numbered chapters */}
      <Chapters project={project} />

      {/* Conditional fact / media sections */}
      <ProjectMediaSections project={project} />
    </>
  );
}

/* ── Standard layout ──────────────────────────────────────────────── */

function StandardGallery({ project }: { project: Project }) {
  const images = project.images.filter((i) => nonEmpty(i.src));
  if (images.length === 0) return null;
  return (
    <section className="luxury-section bg-background" aria-label="Gallery">
      <div className="luxury-container">
        <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
          {images.map((image, i) => {
            // First image spans full width as a lead shot.
            const lead = i === 0;
            return (
              <Reveal
                key={`${image.src}-${i}`}
                delay={(i % 2) * 0.08}
                className={cn(lead && "md:col-span-2")}
              >
                <figure className="group">
                  <ParallaxImage
                    src={image.src}
                    alt={image.caption ?? `${project.name} — view ${i + 1}`}
                    className={cn(
                      "rounded-sm ring-1 ring-white/5",
                      lead ? "aspect-[16/9]" : "aspect-[4/3]",
                    )}
                    strength={5}
                    imgClassName="transition-transform duration-700 group-hover:scale-[1.03]"
                    priority={lead}
                  />
                  {nonEmpty(image.caption) && (
                    <figcaption className="mt-4 luxury-label text-muted-foreground">
                      {image.caption}
                    </figcaption>
                  )}
                </figure>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StandardLayout({ project }: { project: Project }) {
  const kicker = [project.category, project.city ?? project.location]
    .filter(nonEmpty)
    .join(" · ");
  return (
    <>
      {/* Hero band */}
      <section className="pt-32 md:pt-40 pb-16 bg-secondary border-b border-hairline">
        <div className="luxury-container">
          <Reveal className="max-w-3xl">
            {kicker && <p className="luxury-label text-accent mb-5">{kicker}</p>}
            <h1 className="luxury-heading-lg text-cream mb-6">{project.name}</h1>
            <p className="luxury-body max-w-2xl">{project.description}</p>
          </Reveal>
        </div>
      </section>

      {/* Refined gallery */}
      <StandardGallery project={project} />

      {/* Conditional fact / media sections */}
      <ProjectMediaSections project={project} />
    </>
  );
}

/* ── Page ─────────────────────────────────────────────────────────── */

const ProjectDetail = () => {
  const { slug } = useParams();
  const projects = getAllProjects();
  const project = getProjectBySlug(slug ?? "");

  if (!project) return <NotFound />;

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const prevProject =
    projects.length > 1
      ? projects[(currentIndex - 1 + projects.length) % projects.length]
      : undefined;
  const nextProject =
    projects.length > 1
      ? projects[(currentIndex + 1) % projects.length]
      : undefined;

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.description,
    genre: project.category,
    locationCreated: project.city ?? project.location,
  };

  return (
    <>
      <SeoHead
        title={`${project.name} — Cornelian Executive Interiors`}
        description={project.description}
        ogImage={project.thumbnail}
        jsonLd={[projectSchema]}
      />
      {project.flagship ? (
        <FlagshipLayout project={project} />
      ) : (
        <StandardLayout project={project} />
      )}
      <ProjectNav prev={prevProject} next={nextProject} />
    </>
  );
};

export default ProjectDetail;
