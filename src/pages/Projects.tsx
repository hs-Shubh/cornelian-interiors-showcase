import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  getFlagshipProject,
  getStandardProjects,
} from "@/lib/projects";
import {
  ParallaxImage,
  Reveal,
  HorizontalGallery,
} from "@/components/Parallax";
import { scenes, img } from "@/lib/showcase";
import { SeoHead } from "@/components/SeoHead";

const Projects = () => {
  const flagship = getFlagshipProject();
  const standard = getStandardProjects();

  return (
    <>
      <SeoHead />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative h-[72vh] min-h-[540px] flex items-end overflow-hidden bg-charcoal">
        <div className="absolute inset-0">
          <ParallaxImage
            src={img("9b20e54e-c41e-425d-bd96-d9d95cea0911")}
            alt="Cornelian Executive Interiors portfolio"
            className="h-full w-full"
            strength={6}
            kenBurns
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/45 to-charcoal/30" />
        </div>
        <div className="relative z-10 luxury-container pb-16 md:pb-24">
          <Reveal className="max-w-3xl">
            <p className="luxury-label text-accent mb-5">Portfolio</p>
            <h1 className="luxury-heading-xl text-cream mb-6">Our Projects</h1>
            <p className="luxury-body text-cream/80 max-w-2xl">
              Each project is a testament to our commitment to excellence — luxurious
              residential and commercial spaces, crafted with meticulous attention to detail.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Flagship feature band ────────────────────────────── */}
      {flagship && (
        <section className="relative" aria-label="Featured immersive project">
          <Link
            to={`/projects/${flagship.slug}`}
            className="group relative block h-[88vh] min-h-[560px] overflow-hidden"
          >
            <ParallaxImage
              src={flagship.thumbnail}
              alt={flagship.name}
              className="h-full w-full"
              strength={6}
              imgClassName="transition-transform duration-[1400ms] ease-luxury group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/20" />
            <div className="absolute inset-x-0 bottom-0">
              <div className="luxury-container pb-14 md:pb-20">
                <Reveal className="max-w-2xl">
                  <span className="inline-flex items-center gap-2 border border-accent/60 px-4 py-2 luxury-label text-accent mb-6">
                    Immersive Walkthrough
                  </span>
                  <h2 className="luxury-heading-lg text-cream mb-4">{flagship.name}</h2>
                  <p className="luxury-body text-cream/75 max-w-xl mb-6">
                    {[flagship.category, flagship.city ?? flagship.location]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  <span className="group/cta inline-flex items-center gap-3 font-body text-sm uppercase tracking-[0.12em] text-cream">
                    Explore Project
                    <ArrowUpRight
                      size={16}
                      className="text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </Reveal>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ── Standard projects grid ───────────────────────────── */}
      {standard.length > 0 && (
        <section className="luxury-section bg-background overflow-hidden" aria-labelledby="projects-heading">
          <div className="luxury-container">
            <Reveal className="mb-12 md:mb-16">
              <p className="luxury-label text-accent mb-4">Selected Work</p>
              <h2 id="projects-heading" className="luxury-heading-md text-cream">
                The Portfolio
              </h2>
            </Reveal>
            <div className="grid gap-px sm:grid-cols-2 bg-hairline border border-hairline">
              {standard.map((project, index) => (
                <Reveal key={project.id} delay={(index % 2) * 0.08}>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="group relative block h-full overflow-hidden bg-background"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={project.thumbnail}
                        alt={project.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-luxury group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
                      <div>
                        <p className="luxury-label text-cream/70 mb-2">{project.category}</p>
                        <h3 className="font-heading text-2xl md:text-3xl text-cream transition-colors group-hover:text-accent">
                          {project.name}
                        </h3>
                        <p className="luxury-body-sm text-cream/70 mt-1">{project.location}</p>
                      </div>
                      <span className="font-heading text-4xl text-cream/25 transition-colors group-hover:text-accent/70">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Rendered interiors (horizontal walkthrough) ──────── */}
      <section className="bg-charcoal text-cream py-20 md:py-28" aria-labelledby="gallery-heading">
        <div className="luxury-container">
          <Reveal className="max-w-2xl">
            <p className="luxury-label text-accent mb-4">Rendered Interiors</p>
            <h2 id="gallery-heading" className="luxury-heading-md text-cream mb-6">
              Room by Room
            </h2>
            <p className="luxury-body text-cream/70">
              Scroll through a curated set of our 3D interior views — drag or keep scrolling
              to move across the collection.
            </p>
          </Reveal>
        </div>

        <HorizontalGallery className="mt-10 pb-4">
          {scenes.map((scene) => (
            <article
              key={scene.id}
              className="group relative w-[78vw] shrink-0 overflow-hidden rounded-sm sm:w-[52vw] lg:w-[36vw] aspect-[4/3]"
            >
              <img
                src={img(scene.images[0])}
                alt={`${scene.title} — Cornelian Executive Interiors`}
                className="h-full w-full object-cover transition-transform [transition-duration:1200ms] ease-luxury group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="luxury-label text-cream/70 mb-2">{scene.room}</p>
                <h3 className="font-heading text-2xl md:text-3xl text-cream">{scene.title}</h3>
              </div>
            </article>
          ))}
        </HorizontalGallery>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="luxury-section bg-background">
        <div className="luxury-container text-center">
          <Reveal className="max-w-2xl mx-auto">
            <p className="luxury-label text-accent mb-4">Let's Begin</p>
            <h2 className="luxury-heading-md text-cream mb-6">Have a Project in Mind?</h2>
            <p className="luxury-body mb-10">
              We would love to hear about your vision. Let's create something extraordinary
              together.
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 bg-accent text-accent-foreground px-10 py-4 font-body text-sm uppercase tracking-[0.12em] hover:bg-cornelian-glow transition-all duration-500"
            >
              Get in Touch
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default Projects;
