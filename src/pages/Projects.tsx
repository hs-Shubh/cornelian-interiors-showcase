import { Link } from "react-router-dom";
import { projects } from "@/data/content";

const Projects = () => {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-secondary">
        <div className="luxury-container">
          <p className="luxury-label mb-4 opacity-0 animate-fade-up">Portfolio</p>
          <h1 className="luxury-heading-xl mb-6 opacity-0 animate-fade-up animation-delay-100">
            Our Projects
          </h1>
          <div className="luxury-divider opacity-0 animate-fade-up animation-delay-200" />
          <p className="luxury-body max-w-2xl mt-8 opacity-0 animate-fade-up animation-delay-300">
            Each project is a testament to our commitment to excellence. Explore our portfolio 
            of luxurious residential and commercial spaces, each crafted with meticulous attention to detail.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="luxury-section bg-background">
        <div className="luxury-container">
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-16">
            {projects.map((project, index) => (
              <Link
                key={project.id}
                to={`/projects/${project.slug}`}
                className="group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="luxury-image-hover mb-6">
                  <img
                    src={project.thumbnail}
                    alt={project.name}
                    className="w-full aspect-[16/10] object-cover"
                  />
                </div>
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
            className="inline-flex items-center gap-3 bg-cream text-charcoal px-10 py-4 font-body text-sm tracking-[0.1em] uppercase hover:bg-champagne hover:text-cream transition-all duration-500"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
};

export default Projects;
