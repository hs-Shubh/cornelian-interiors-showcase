import { Link } from "react-router-dom";
import {
  Palette,
  Hammer,
  RefreshCw,
  Sofa,
  Grid3X3,
  Smartphone,
  Wind,
  Lightbulb,
  Droplets,
  Flower2,
  PanelTop,
  Lamp,
} from "lucide-react";
import { services } from "@/data/content";
import servicesBg from "@/assets/services-bg.jpg";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Palette,
  Hammer,
  RefreshCw,
  Sofa,
  Grid3X3,
  Smartphone,
  Wind,
  Lightbulb,
  Droplets,
  Flower2,
  PanelTop,
  Lamp,
};

const Services = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0">
          <img src={servicesBg} alt="Services" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-charcoal/70" />
        </div>
        <div className="relative z-10 luxury-container">
          <p className="luxury-label text-cream/70 mb-4 opacity-0 animate-fade-up">What We Offer</p>
          <h1 className="luxury-heading-xl text-cream mb-6 opacity-0 animate-fade-up animation-delay-100">
            Our Services
          </h1>
          <div className="luxury-divider bg-champagne opacity-0 animate-fade-up animation-delay-200" />
          <p className="luxury-body text-cream/80 max-w-2xl mt-8 opacity-0 animate-fade-up animation-delay-300">
            From concept to completion, we provide comprehensive interior design and build services 
            that transform your vision into reality. Every detail matters, every space tells a story.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="luxury-section bg-background">
        <div className="luxury-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon];
              return (
                <div
                  key={service.id}
                  className="group p-8 md:p-10 border border-border hover:border-accent/50 bg-card transition-all duration-500 hover:shadow-lg"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {IconComponent && (
                    <IconComponent className="w-8 h-8 text-accent mb-6 group-hover:scale-110 transition-transform duration-300" />
                  )}
                  <h3 className="font-heading text-xl md:text-2xl mb-4 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="luxury-body-sm">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="luxury-section bg-secondary">
        <div className="luxury-container">
          <div className="text-center mb-16">
            <p className="luxury-label mb-4">How We Work</p>
            <h2 className="luxury-heading-lg mb-6">Our Process</h2>
            <div className="luxury-divider mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Designing", desc: "Understanding your vision and creating comprehensive design concepts." },
              { step: "02", title: "Material Selection", desc: "Curating premium materials that align with your aesthetic and budget." },
              { step: "03", title: "Execution", desc: "Expert craftsmanship bringing designs to life with precision." },
              { step: "04", title: "Handover", desc: "Seamless delivery and post-handover support for lasting satisfaction." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <span className="block font-heading text-5xl text-accent/30 mb-4">
                  {item.step}
                </span>
                <h3 className="font-heading text-xl mb-3">{item.title}</h3>
                <p className="luxury-body-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-charcoal text-cream">
        <div className="luxury-container text-center">
          <h2 className="luxury-heading-md mb-6">Let's Discuss Your Project</h2>
          <p className="luxury-body text-cream/70 max-w-xl mx-auto mb-8">
            Every great space begins with a conversation. Reach out to explore how we can 
            bring your vision to life.
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

export default Services;
