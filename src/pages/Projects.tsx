import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/content";
import {
  ParallaxImage,
  Parallax,
  Reveal,
  HorizontalGallery,
} from "@/components/Parallax";
import { scenes, img } from "@/lib/showcase";

const Projects = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <ParallaxImage
            src={img("9b20e54e-c41e-425d-bd96-d9d95cea0911")}
            alt="Cornelian Executive Interiors portfolio"
            className="h-full w-full"
            strength={6}
            kenBurns
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/40 to-charcoal/30" />
        </div>
        <div className="relative z-10 luxury-container pb-16">
          <Reveal>
            <p className="luxury-label text-cream/70 mb-4">Portfolio</p>
            <h1 className="luxury-heading-xl text-cream mb-6">Our Projects</h1>
            <p className="luxury-body text-cream/80 max-w-2xl">
              Each project is a testament to our commitment to excellence — luxurious
              residential and commercial spaces, crafted with meticulous attention to detail.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Horizontal walkthrough gallery */}
      <section className="bg-charcoal text-cream pt-20" aria-labelledby="gallery-heading">
        <div className="luxury-container">
          <Reveal className="max-w-2xl">
            <p className="luxury-label text-cream/60 mb-4">Rendered Interiors</p>
            <h2 id="gallery-heading" className="luxury-heading-lg text-cream mb-6">
              Room by Room
            </h2>
            <p className="luxury-body text-cream/70">
              Scroll through a curated set of our 3D interior views — drag or keep scrolling
              to move across the collection.
            </p>
          </Reveal>
        </div>

        <HorizontalGallery className="mt-4 pb-8">
          {scenes.map((scene) => (
            <article
              key={scene.id}
              className="relative shrink-0 w-[78vw] sm:w-[52vw] lg:w-[36vw] aspect-[4/3] overflow-hidden rounded-sm group"
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

      {/* Projects Grid */}
      <section className="luxury-section bg-background overflow-hidden">
        <div className="luxury-container">
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-16 md:gap-y-24">
            {projects.map((project, index) => (
              <Reveal key={project.id} delay={(index % 2) * 0.1}>
                <Link to={`/projects/${project.slug}`} className="group block">
                  <ParallaxImage
                    src={project.thumbnail}
                    alt={project.name}
                    className="mb-6 aspect-[16/10] rounded-sm"
                    strength={5}
                    imgClassName="transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="luxury-label mb-2">{project.category}</p>
                      <h2 className="font-heading text-2xl md:text-3xl mb-2 group-hover:text-accent transition-colors">
                        {project.name}
                      </h2>
                      <p className="luxury-body-sm">{project.location}</p>
                    </div>
                    <span className="font-heading text-4xl text-muted-foreground/30 group-hover:text-accent/50 transition-colors">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-charcoal text-cream">
        <div className="luxury-container text-center">
          <h2 className="luxury-heading-md mb-6">Have a Project in Mind?</h2>
          <p className="luxury-body text-cream/70 max-w-xl mx-auto mb-8">
            We would love to hear about your vision. Let's create something extraordinary together.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 bg-cream text-charcoal px-10 py-4 font-body text-sm tracking-[0.1em] uppercase hover:bg-champagne hover:text-cream transition-all duration-500"
          >
            Get in Touch
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Projects;
