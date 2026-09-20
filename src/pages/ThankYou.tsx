import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import { SeoHead } from "@/components/SeoHead";
import { SITE_URL } from "@/config/seo";
import { trackLead, trackContact } from "@/lib/analytics";

const WHATSAPP =
  "https://wa.me/919720130734?text=" +
  encodeURIComponent("Hi Cornelian, I just enquired about an interior project.");

const ThankYou = () => {
  // Mark the ad/enquiry landing as a conversion (fires once on view).
  useEffect(() => {
    trackLead("ad_thankyou");
  }, []);

  return (
    <>
      <SeoHead
        title="Thank You | Cornelian Executive Interiors"
        description="Thank you for your enquiry. Our design team will contact you shortly."
        canonical={`${SITE_URL}/thank-you`}
        noindex
      />

      <section className="min-h-[80vh] flex items-center justify-center pt-32 pb-20 bg-background">
        <div className="luxury-container max-w-2xl text-center">
          <p className="luxury-label text-accent mb-4">Enquiry received</p>
          <h1 className="luxury-heading-lg mb-6">Thank you — we'll be in touch shortly.</h1>
          <p className="luxury-body text-muted-foreground mb-10">
            Your details are with our design team. We typically respond within one business day.
            Prefer to talk now?
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContact("whatsapp")}
              className="group inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 font-body text-xs tracking-[0.12em] uppercase transition-transform duration-300 hover:scale-[1.02]"
            >
              <MessageCircle size={16} /> Chat on WhatsApp
            </a>
            <a
              href="tel:+919720130734"
              onClick={() => trackContact("phone")}
              className="group inline-flex items-center gap-3 border border-charcoal text-charcoal px-8 py-4 font-body text-xs tracking-[0.12em] uppercase transition-colors hover:bg-charcoal hover:text-cream"
            >
              <Phone size={16} /> Call +91 97201 30734
            </a>
          </div>

          <div className="mt-12">
            <Link
              to="/showcase"
              className="group inline-flex items-center gap-2 font-body text-sm tracking-[0.1em] uppercase text-accent hover:underline"
            >
              Explore our work
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ThankYou;
