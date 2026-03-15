import { Mail, Phone, MapPin, Instagram } from "lucide-react";
import { SeoHead } from "@/components/SeoHead";
import { LeadInquiryForm } from "@/components/LeadInquiryForm";

const Contact = () => {
  return (
    <>
      <SeoHead />
      {/* Hero */}
      <section className="pt-32 pb-20 bg-secondary" aria-labelledby="contact-heading">
        <div className="luxury-container">
          <p className="luxury-label mb-4 opacity-0 animate-fade-up">Get in Touch</p>
          <h1 id="contact-heading" className="luxury-heading-xl mb-6 opacity-0 animate-fade-up animation-delay-100">
            Contact Us
          </h1>
          <div className="luxury-divider opacity-0 animate-fade-up animation-delay-200" />
          <p className="luxury-body max-w-2xl mt-8 opacity-0 animate-fade-up animation-delay-300">
            We would love to hear from you. Whether you have a project in mind or simply want 
            to learn more about our services, our team is here to help.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="luxury-section bg-background">
        <div className="luxury-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Info */}
            <div>
              <h2 className="luxury-heading-md mb-8">Let's Start a Conversation</h2>
              <p className="luxury-body mb-12">
                Every great space begins with a dialogue. Reach out to discuss your vision, 
                and let us show you how we can transform it into reality.
              </p>

              <div className="space-y-8">
                <a
                  href="tel:+919720130734"
                  className="flex items-center gap-5 group"
                >
                  <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center group-hover:bg-accent transition-colors">
                    <Phone className="w-5 h-5 text-foreground group-hover:text-accent-foreground transition-colors" />
                  </div>
                  <div>
                    <p className="luxury-label mb-1">Phone</p>
                    <p className="font-heading text-xl group-hover:text-accent transition-colors">
                      +91 97201 30734
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:cornelianexecutiveinteriors@gmail.com"
                  className="flex items-center gap-5 group"
                >
                  <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center group-hover:bg-accent transition-colors">
                    <Mail className="w-5 h-5 text-foreground group-hover:text-accent-foreground transition-colors" />
                  </div>
                  <div>
                    <p className="luxury-label mb-1">Email</p>
                    <p className="font-heading text-lg group-hover:text-accent transition-colors">
                      cornelianexecutiveinteriors@gmail.com
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <p className="luxury-label mb-1">Location</p>
                    <p className="font-heading text-xl">D107, Sector 2, Noida, NCR</p>
                  </div>
                </div>

                <a
                  href="https://instagram.com/world_cornelian"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-5 group"
                >
                  <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center group-hover:bg-accent transition-colors">
                    <Instagram className="w-5 h-5 text-foreground group-hover:text-accent-foreground transition-colors" />
                  </div>
                  <div>
                    <p className="luxury-label mb-1">Instagram</p>
                    <p className="font-heading text-xl group-hover:text-accent transition-colors">
                      @world_cornelian
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-secondary p-8 md:p-12">
              <h3 className="luxury-heading-md mb-8">Send us a Message</h3>
              <LeadInquiryForm
                variant="contact"
                source="contact"
                pagePath="/contact"
                submitButtonLabel="Send Message"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-charcoal text-cream">
        <div className="luxury-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {["Trust", "Transparency", "Quality", "Value"].map((value) => (
              <div key={value}>
                <span className="font-heading text-2xl md:text-3xl text-champagne">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
