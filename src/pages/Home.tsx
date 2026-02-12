import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Ruler, ImageIcon, Truck } from "lucide-react";
import { projects, services, stats, brandAttributes } from "@/data/content";
import heroBg from "@/assets/hero-bg.jpg";
import aboutBg from "@/assets/about-bg.jpg";
import { motionSection, motionStagger, motionImageReveal } from "@/components/PageTransition";
import { LazyImage } from "@/components/LazyImage";
import { SeoHead } from "@/components/SeoHead";
import { SITE_URL, SEO_DEFAULTS } from "@/config/seo";

const heroStagger = {
  initial: { opacity: 0, y: 24 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

const Home = () => {
  const scrollToContent = () => {
    document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SEO_DEFAULTS.siteName,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.jpg`,
    description: SEO_DEFAULTS.description,
    address: { "@type": "PostalAddress", addressLocality: "Noida", addressRegion: "NCR" },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-97201-30734",
      email: "cornelianexecutiveinteriors@gmail.com",
      areaServed: "IN",
    },
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SEO_DEFAULTS.siteName,
    image: SEO_DEFAULTS.ogImage,
    url: SITE_URL,
    telephone: "+91-97201-30734",
    address: { "@type": "PostalAddress", streetAddress: "D107, Sector 2", addressLocality: "Noida", addressRegion: "NCR" },
  };

  return (
    <>
      <SeoHead jsonLd={[organizationSchema, localBusinessSchema]} />
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label="Hero">
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt="Luxury interior design by Cornelian Executive Interiors, Noida"
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-charcoal/50" />
        </div>
        <div className="relative z-10 luxury-container text-center">
          <div className="max-w-4xl mx-auto">
            <motion.p
              className="luxury-label text-cream/80 mb-6"
              custom={0}
              variants={heroStagger}
              initial="initial"
              animate="animate"
            >
              Cornelian Executive Interiors
            </motion.p>
            <motion.h1
              className="luxury-heading-xl text-cream mb-8"
              custom={1}
              variants={heroStagger}
              initial="initial"
              animate="animate"
            >
              Crafting Timeless Spaces
              <br />
              with Modern Grace
            </motion.h1>
            <motion.p
              className="luxury-body text-cream/80 max-w-2xl mx-auto mb-10"
              custom={2}
              variants={heroStagger}
              initial="initial"
              animate="animate"
            >
              We transform spaces into timeless works of art, blending classical elegance with modern functionality to create environments that are cherished for generations.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              custom={3}
              variants={heroStagger}
              initial="initial"
              animate="animate"
            >
              <Link
                to="/projects"
                className="group inline-flex items-center gap-3 bg-cream text-charcoal px-8 py-4 font-body text-sm tracking-[0.1em] uppercase hover:bg-champagne hover:text-cream transition-all duration-500"
              >
                View Projects
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 border border-cream/50 text-cream px-8 py-4 font-body text-sm tracking-[0.1em] uppercase hover:bg-cream/10 transition-all duration-500"
              >
                Get in Touch
              </Link>
            </motion.div>
          </div>
        </div>
        <button
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/60 hover:text-cream transition-colors animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown size={32} />
        </button>
      </section>

      {/* Custom Furniture CTA */}
      <section className="luxury-section bg-charcoal text-cream" aria-labelledby="custom-furniture-heading">
        <div className="luxury-container">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            {...motionSection}
          >
            <p className="luxury-label text-cream/60 mb-4">Custom Furniture</p>
            <h2 id="custom-furniture-heading" className="luxury-heading-lg text-cream mb-6">
              Hassle-Free Custom Furniture. No Middlemen.
            </h2>
            <p className="font-body text-lg text-cream/85 mb-4">
              Just Your Size, Your Style — Delivered to Your Doorstep.
            </p>
            <p className="luxury-body-sm text-cream/70 max-w-2xl mx-auto mb-8">
              Custom console cabinets and modular cabinets. Upload reference images, choose dimensions and finish. We deliver directly — no third party, no markup.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-10 text-cream/80">
              <span className="flex items-center gap-2 font-body text-sm">
                <Ruler size={18} className="text-champagne" aria-hidden /> Custom sizes
              </span>
              <span className="flex items-center gap-2 font-body text-sm">
                <ImageIcon size={18} className="text-champagne" aria-hidden /> Upload reference images
              </span>
              <span className="flex items-center gap-2 font-body text-sm">
                <Truck size={18} className="text-champagne" aria-hidden /> Doorstep delivery
              </span>
            </div>
            <Link
              to="/custom-order"
              className="group inline-flex items-center gap-3 bg-cream text-charcoal px-10 py-4 font-body text-sm tracking-[0.1em] uppercase hover:bg-champagne hover:text-cream transition-all duration-500"
            >
              Design Your Cabinet
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about-section" className="luxury-section bg-background" aria-labelledby="about-heading">
        <div className="luxury-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div className="luxury-image-hover overflow-hidden" {...motionImageReveal}>
              <LazyImage src={aboutBg} alt="About Cornelian Executive Interiors, Noida" className="w-full aspect-[4/3] object-cover" />
            </motion.div>
            <motion.div {...motionSection}>
              <p className="luxury-label mb-4">About Us</p>
              <h2 id="about-heading" className="luxury-heading-lg mb-6">
                Where Vision Meets
                <br />
                Craftsmanship
              </h2>
              <div className="luxury-divider mb-8" />
              <p className="luxury-body mb-6">
                Founded in 2020, Cornelian Executive Interiors emerged from a passion for blending classical beauty with contemporary design. Inspired by rich, intricate family values, we honour <strong className="text-foreground">Trust, Transparency, Quality of work, and Value for money</strong>.
              </p>
              <p className="luxury-body mb-8">
                Located in Noida, NCR, we have quickly gained a reputation for transforming spaces into timeless masterpieces, providing quality construction with original materials and exceptional value.
              </p>
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 text-foreground font-body text-sm tracking-[0.1em] uppercase hover:text-accent transition-colors"
              >
                Learn More
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Attributes */}
      <section className="py-16 bg-secondary" aria-label="Brand attributes">
        <div className="luxury-container">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {brandAttributes.map((attr, index) => (
              <motion.span
                key={attr}
                className="font-heading text-lg md:text-xl text-foreground/70 italic"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                {attr}
                {index < brandAttributes.length - 1 && <span className="ml-8 text-accent">·</span>}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="luxury-section bg-background" aria-labelledby="services-heading">
        <div className="luxury-container">
          <motion.div className="text-center mb-16" {...motionSection}>
            <p className="luxury-label mb-4">What We Offer</p>
            <h2 id="services-heading" className="luxury-heading-lg mb-6">Our Services</h2>
            <div className="luxury-divider mx-auto" />
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 6).map((service, i) => (
              <motion.div
                key={service.id}
                className="group p-8 border border-border hover:border-accent/50 transition-all duration-500 hover:shadow-lg"
                {...motionStagger}
                transition={{ ...motionStagger.transition, delay: i * 0.06 }}
              >
                <h3 className="luxury-heading-sm mb-4 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="luxury-body-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 text-foreground font-body text-sm tracking-[0.1em] uppercase hover:text-accent transition-colors"
            >
              View All Services
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-charcoal text-cream" aria-label="Company statistics">
        <div className="luxury-container">
          <div className="text-center mb-12">
            <p className="luxury-label text-cream/60 mb-4">Our Impact in Figures</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <span className="block font-heading text-4xl md:text-5xl lg:text-6xl mb-2 text-champagne">
                  {stat.value}
                </span>
                <span className="font-body text-sm tracking-[0.1em] uppercase text-cream/70">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="luxury-section bg-background" aria-labelledby="projects-heading">
        <div className="luxury-container">
          <motion.div className="text-center mb-16" {...motionSection}>
            <p className="luxury-label mb-4">Portfolio</p>
            <h2 id="projects-heading" className="luxury-heading-lg mb-6">Featured Projects</h2>
            <div className="luxury-divider mx-auto" />
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                {...motionStagger}
                transition={{ ...motionStagger.transition, delay: i * 0.08 }}
              >
                <Link to={`/projects/${project.slug}`} className="group block">
                  <div className="luxury-image-hover mb-6 overflow-hidden">
                    <LazyImage
                      src={project.thumbnail}
                      alt={`${project.name} - ${project.category} project in ${project.location}`}
                      className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <p className="luxury-label mb-2">{project.category}</p>
                  <h3 className="font-heading text-2xl mb-2 group-hover:text-accent transition-colors">
                    {project.name}
                  </h3>
                  <p className="luxury-body-sm">{project.location}</p>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 text-foreground font-body text-sm tracking-[0.1em] uppercase hover:text-accent transition-colors"
            >
              View All Projects
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="luxury-section bg-secondary" aria-labelledby="cta-heading">
        <div className="luxury-container text-center">
          <h2 id="cta-heading" className="luxury-heading-lg mb-6">
            Ready to Transform
            <br />
            Your Space?
          </h2>
          <p className="luxury-body max-w-2xl mx-auto mb-10">
            Let us bring your vision to life. Our team of expert designers and craftsmen are ready to create a space that reflects your unique style and exceeds your expectations.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 bg-charcoal text-cream px-10 py-4 font-body text-sm tracking-[0.1em] uppercase hover:bg-accent transition-all duration-500"
          >
            Start Your Project
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
