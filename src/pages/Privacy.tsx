import { Link } from "react-router-dom";
import { SeoHead } from "@/components/SeoHead";
import { SITE_URL } from "@/config/seo";

const EMAIL = "cornelianexecutiveinteriors@gmail.com";
const EFFECTIVE = "20 September 2026";

const Privacy = () => {
  return (
    <>
      <SeoHead
        title="Privacy Policy | Cornelian Executive Interiors"
        description="How Cornelian Executive Interiors collects, uses, stores and protects the information you share through our website, WhatsApp and Meta lead forms."
        canonical={`${SITE_URL}/privacy`}
      />

      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-background">
        <div className="luxury-container max-w-3xl">
          <p className="luxury-label text-accent mb-4">Legal</p>
          <h1 className="luxury-heading-lg mb-4">Privacy Policy</h1>
          <p className="luxury-body-sm text-muted-foreground mb-12">
            Effective date: {EFFECTIVE}
          </p>

          <div className="space-y-10 luxury-body text-foreground/90">
            <div>
              <p>
                This Privacy Policy explains how <strong>Cornelian Executive Interiors</strong>{" "}
                ("Cornelian", "we", "us") collects, uses and protects the personal information you
                provide when you contact us through this website, our WhatsApp channel, a phone call,
                or a Meta (Facebook / Instagram) lead advertisement. By submitting an enquiry you
                agree to the practices described below.
              </p>
            </div>

            <div>
              <h2 className="luxury-heading-sm mb-4">1. What Information We Collect</h2>
              <p className="mb-3">
                When you submit an enquiry through our website forms or a Meta lead form, we may
                collect:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your <strong>name</strong></li>
                <li>Your <strong>phone number</strong></li>
                <li>Your <strong>email address</strong></li>
                <li>Your <strong>property type</strong> (e.g. apartment, villa, office)</li>
                <li>Your <strong>budget range</strong></li>
                <li>Your <strong>city / location</strong></li>
                <li>Your project <strong>timeline</strong></li>
                <li>Any message, reference images or project details you choose to share</li>
              </ul>
              <p className="mt-3">
                We also collect limited technical and usage data (such as pages viewed and general
                location) through analytics cookies — see Section 5.
              </p>
            </div>

            <div>
              <h2 className="luxury-heading-sm mb-4">2. How We Use Your Information</h2>
              <p>
                We use the information solely to <strong>contact you about our interior design and
                build services</strong> — to understand your requirement, share proposals and
                estimates, schedule a consultation or site visit, and respond to your enquiry. We may
                also use it to send you relevant updates about your project. We do not use your
                information for any unrelated purpose.
              </p>
            </div>

            <div>
              <h2 className="luxury-heading-sm mb-4">3. How Long We Keep It</h2>
              <p>
                We retain your enquiry information for as long as necessary to respond to you and
                provide the services you requested, and for up to <strong>24 months</strong> after
                our last contact with you. After that period it is deleted or anonymised, unless we
                are required to keep it longer to comply with a legal or tax obligation.
              </p>
            </div>

            <div>
              <h2 className="luxury-heading-sm mb-4">4. We Do Not Sell Your Data</h2>
              <p>
                We <strong>never sell, rent or trade</strong> your personal information to third
                parties. We share it only with trusted service providers who help us operate — for
                example our secure database and hosting provider, and the messaging and advertising
                platforms (such as Meta and WhatsApp) through which you contacted us — and only to the
                extent needed to respond to you. These providers are bound to protect your data.
              </p>
            </div>

            <div>
              <h2 className="luxury-heading-sm mb-4">5. Cookies &amp; Analytics</h2>
              <p>
                This website uses Google Analytics 4 and the Meta Pixel to understand how visitors use
                the site and to measure the performance of our advertising. These tools may set
                cookies and collect anonymised usage data. You can disable cookies in your browser
                settings at any time.
              </p>
            </div>

            <div>
              <h2 className="luxury-heading-sm mb-4">6. Your Rights &amp; Data Removal</h2>
              <p>
                You may request access to, correction of, or deletion of the personal information we
                hold about you at any time. To make a request — including having your data removed
                from our records — email us at{" "}
                <a href={`mailto:${EMAIL}?subject=Data%20removal%20request`} className="text-accent underline">
                  {EMAIL}
                </a>{" "}
                and we will action it promptly.
              </p>
            </div>

            <div>
              <h2 className="luxury-heading-sm mb-4">7. Contact Us</h2>
              <p>
                For any question about this policy or your data, contact Cornelian Executive Interiors
                at{" "}
                <a href={`mailto:${EMAIL}`} className="text-accent underline">
                  {EMAIL}
                </a>{" "}
                or call{" "}
                <a href="tel:+919720130734" className="text-accent underline">
                  +91 97201 30734
                </a>
                .
              </p>
            </div>

            <div className="pt-6 border-t border-border">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 font-body text-sm tracking-[0.1em] uppercase text-accent hover:underline"
              >
                Back to Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Privacy;
