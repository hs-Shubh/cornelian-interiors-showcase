import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { brandWords, brandAttributes, stats } from "@/data/content";
import aboutBg from "@/assets/about-bg.jpg";
import heroBg from "@/assets/hero-bg.jpg";

const About = () => {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-secondary">
        <div className="luxury-container">
          <p className="luxury-label mb-4 opacity-0 animate-fade-up">Our Story</p>
          <h1 className="luxury-heading-xl mb-6 opacity-0 animate-fade-up animation-delay-100">
            About Cornelian
          </h1>
          <div className="luxury-divider opacity-0 animate-fade-up animation-delay-200" />
        </div>
      </section>

      {/* Story */}
      <section className="luxury-section bg-background">
        <div className="luxury-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <p className="luxury-label mb-4">Founded 2020</p>
              <h2 className="luxury-heading-lg mb-6">
                Where Classical Beauty<br />Meets Modern Living
              </h2>
              <div className="luxury-divider mb-8" />
              <div className="space-y-6">
                <p className="luxury-body">
                  Cornelian Executive Interiors emerged from a profound passion for blending 
                  classical beauty with contemporary design. Inspired by rich, intricate family values, 
                  our founders sought to create an interior design and build agency that honours 
                  <span className="text-foreground font-medium"> Trust, Transparency, Quality of work, 
                  and Value for money</span>, while embracing the needs of modern living.
                </p>
                <p className="luxury-body">
                  Located in the heart of Noida, NCR, we quickly gained a reputation for our ability 
                  to transform spaces into timeless masterpieces, providing quality construction with 
                  original materials and exceptional value for every project we undertake.
                </p>
                <p className="luxury-body">
                  Over the years, the company has grown, taking on a diverse range of projects from 
                  luxurious residences to sophisticated commercial spaces, each infused with a touch 
                  of historical elegance and modern functionality.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2 luxury-image-hover">
              <img
                src={aboutBg}
                alt="Cornelian Interiors"
                className="w-full aspect-[3/4] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="luxury-section bg-secondary">
        <div className="luxury-container">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <p className="luxury-label mb-4">Our Vision</p>
              <h3 className="luxury-heading-md mb-6">Design Excellence</h3>
              <div className="luxury-divider mb-6" />
              <p className="luxury-body">
                To be a leading name in interior design & build, known for our exceptional attention 
                to detail, creativity, and ability to turn any space into a sophisticated sanctuary 
                that stands the test of time.
              </p>
            </div>
            <div>
              <p className="luxury-label mb-4">Our Mission</p>
              <h3 className="luxury-heading-md mb-6">Timeless Artistry</h3>
              <div className="luxury-divider mb-6" />
              <p className="luxury-body">
                We transform spaces into timeless works of art. Our mission is to blend classical 
                elegance with modern functionality, creating environments that are not just lived in, 
                but cherished. Each project is a journey, from initial inspiration to final realization, 
                with focus on meticulous craftsmanship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="relative py-32">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Philosophy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-charcoal/80" />
        </div>
        <div className="relative z-10 luxury-container text-center">
          <p className="luxury-label text-cream/70 mb-4">Brand Philosophy</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-cream leading-relaxed max-w-4xl mx-auto">
            "At Cornelian, we believe in the power of design to transform lives. Our philosophy is 
            rooted in the rich history of art, seamlessly blended with contemporary elements."
          </h2>
        </div>
      </section>

      {/* Brand Words & Attributes */}
      <section className="luxury-section bg-background">
        <div className="luxury-container">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <p className="luxury-label mb-4">Brand Words</p>
              <h3 className="luxury-heading-md mb-8">What Defines Us</h3>
              <div className="flex flex-wrap gap-4">
                {brandWords.map((word) => (
                  <span
                    key={word}
                    className="px-5 py-2 border border-border font-heading text-lg italic hover:border-accent hover:text-accent transition-colors"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="luxury-label mb-4">Brand Attributes</p>
              <h3 className="luxury-heading-md mb-8">Our Character</h3>
              <div className="flex flex-wrap gap-4">
                {brandAttributes.map((attr) => (
                  <span
                    key={attr}
                    className="px-5 py-2 bg-secondary font-body text-sm tracking-wide hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    {attr}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-charcoal text-cream">
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

      {/* CTA */}
      <section className="luxury-section bg-background">
        <div className="luxury-container text-center">
          <h2 className="luxury-heading-lg mb-6">
            Let's Create Something<br />Extraordinary Together
          </h2>
          <p className="luxury-body max-w-2xl mx-auto mb-10">
            We create spaces that not only look beautiful but also serve the practical needs of 
            modern life. Ready to begin your journey with us?
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

export default About;
