import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ImageIcon, Ruler, Frame } from "lucide-react";
import { SeoHead } from "@/components/SeoHead";
import { LeadInquiryForm } from "@/components/LeadInquiryForm";
import { motionSection, motionStagger } from "@/components/PageTransition";

const Chiitra = () => {
  return (
    <>
      <SeoHead />
      <section className="pt-32 pb-16 bg-secondary" aria-labelledby="chiitra-heading">
        <div className="luxury-container">
          <p className="luxury-label mb-4">CHIITRA by Cornelian</p>
          <h1 id="chiitra-heading" className="luxury-heading-xl mb-6">
            Bespoke Wall Art & Wall Painting
          </h1>
          <p className="luxury-body max-w-2xl mb-8">
            Customizable luxury wall art and wall painting. Share your reference, choose size and frame style. CHIITRA brings art to your walls — crafted with the same care as our interiors.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 font-body text-sm tracking-[0.1em] uppercase text-accent hover:underline"
          >
            Get Free Consultation
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="luxury-section bg-background">
        <div className="luxury-container">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
            <div>
              <motion.h2 className="luxury-heading-lg mb-8" {...motionSection}>
                How it works
              </motion.h2>
              <ul className="space-y-8">
                {[
                  {
                    icon: ImageIcon,
                    title: "Upload your reference",
                    text: "Share the artwork or style you want. We'll recreate or adapt it for you.",
                  },
                  {
                    icon: Ruler,
                    title: "Choose size",
                    text: "Tell us the dimensions that fit your wall and space.",
                  },
                  {
                    icon: Frame,
                    title: "Frame & style",
                    text: "Select frame style or go frameless. We'll suggest the best finish.",
                  },
                ].map((item, i) => (
                  <motion.li
                    key={item.title}
                    className="flex gap-6"
                    {...motionStagger}
                    transition={{ delay: i * 0.08 }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-accent" aria-hidden />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl mb-2">{item.title}</h3>
                      <p className="luxury-body-sm">{item.text}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="bg-secondary p-8 md:p-12">
              <h3 className="luxury-heading-md mb-6">Request a quote</h3>
              <LeadInquiryForm
                variant="chiitra"
                productType="chiitra"
                inquiryType="wall_art"
                source="chiitra"
                pagePath="/chiitra"
                showArtworkSizeFrame
                showReferenceImages
                submitButtonLabel="Submit inquiry"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-charcoal text-cream">
        <div className="luxury-container text-center">
          <h2 className="luxury-heading-md mb-4">Bring art to your walls</h2>
          <p className="luxury-body text-cream/80 max-w-xl mx-auto mb-8">
            Submit the form above or contact us for a consultation. We'll help you choose size, style and placement.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-cream text-charcoal px-8 py-4 font-body text-sm tracking-[0.1em] uppercase hover:bg-champagne hover:text-cream transition-colors"
          >
            Get Free Consultation
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Chiitra;
