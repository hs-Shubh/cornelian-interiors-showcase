import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Ruler, ImageIcon, Palette, FileText } from "lucide-react";
import { SeoHead } from "@/components/SeoHead";
import { LeadInquiryForm } from "@/components/LeadInquiryForm";
import { motionSection, motionStagger } from "@/components/PageTransition";

const CustomFurniture = () => {
  return (
    <>
      <SeoHead />
      <section className="pt-32 pb-16 bg-secondary" aria-labelledby="custom-furniture-heading">
        <div className="luxury-container">
          <p className="luxury-label mb-4">Custom Furniture</p>
          <h1 id="custom-furniture-heading" className="luxury-heading-xl mb-6">
            Console & Modular Cabinets
          </h1>
          <p className="luxury-body max-w-2xl mb-8">
            Bespoke furniture made to your dimensions and style. Upload inspiration, share dimensions, choose material and finish. We design and deliver directly — no middlemen.
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
                    title: "Upload inspiration",
                    text: "Share reference images so we understand your style and preferences.",
                  },
                  {
                    icon: Ruler,
                    title: "Share dimensions",
                    text: "Tell us width, height and depth. We'll confirm feasibility and quote.",
                  },
                  {
                    icon: Palette,
                    title: "Choose finish",
                    text: "Material and finish options are discussed with our team.",
                  },
                  {
                    icon: FileText,
                    title: "We design & deliver",
                    text: "From design to delivery at your doorstep — direct, no third party.",
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
                variant="custom_furniture"
                productType="custom_furniture"
                inquiryType="furniture"
                source="custom_furniture"
                pagePath="/custom-furniture"
                showDimensions
                showMaterialFinish
                showReferenceImages
                submitButtonLabel="Submit inquiry"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-charcoal text-cream">
        <div className="luxury-container text-center">
          <h2 className="luxury-heading-md mb-4">Ready to start?</h2>
          <p className="luxury-body text-cream/80 max-w-xl mx-auto mb-8">
            Fill the form above or reach out for a free consultation. We'll guide you through dimensions, materials and delivery.
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

export default CustomFurniture;
