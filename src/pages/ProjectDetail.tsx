import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects } from "@/data/content";

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="luxury-heading-lg mb-4">Project Not Found</h1>
          <Link to="/projects" className="luxury-body hover:text-accent transition-colors">
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-secondary">
        <div className="luxury-container">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            <span className="font-body text-sm tracking-[0.1em] uppercase">Back to Projects</span>
          </Link>
          <p className="luxury-label mb-4">{project.category}</p>
          <h1 className="luxury-heading-xl mb-4">{project.name}</h1>
          <p className="luxury-body max-w-2xl">{project.location}</p>
        </div>
      </section>

      {/* Main Image */}
      <section className="bg-background">
        <div className="luxury-container py-8">
          <img
            src={project.thumbnail}
            alt={project.name}
            className="w-full aspect-[21/9] object-cover"
          />
        </div>
      </section>

      {/* Description */}
      <section className="py-16 bg-background">
        <div className="luxury-container">
          <div className="max-w-3xl">
            <p className="font-heading text-2xl md:text-3xl leading-relaxed text-foreground/90">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-20 bg-background">
        <div className="luxury-container">
          <div className="grid md:grid-cols-2 gap-8">
            {project.images.map((image, index) => (
              <div key={index} className="group">
                <div className="luxury-image-hover mb-4">
                  <img
                    src={image.src}
                    alt={image.caption}
                    className="w-full aspect-[4/3] object-cover"
                  />
                </div>
                <p className="font-heading text-lg text-muted-foreground italic">
                  {image.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="border-t border-border">
        <div className="luxury-container">
          <div className="grid md:grid-cols-2">
            <Link
              to={`/projects/${prevProject.slug}`}
              className="group py-12 pr-8 border-r border-border hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <ArrowLeft size={20} className="text-muted-foreground group-hover:text-accent transition-colors" />
                <span className="luxury-label">Previous Project</span>
              </div>
              <h3 className="font-heading text-xl md:text-2xl group-hover:text-accent transition-colors">
                {prevProject.name}
              </h3>
            </Link>
            <Link
              to={`/projects/${nextProject.slug}`}
              className="group py-12 pl-8 text-right hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center justify-end gap-4 mb-4">
                <span className="luxury-label">Next Project</span>
                <ArrowRight size={20} className="text-muted-foreground group-hover:text-accent transition-colors" />
              </div>
              <h3 className="font-heading text-xl md:text-2xl group-hover:text-accent transition-colors">
                {nextProject.name}
              </h3>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectDetail;
