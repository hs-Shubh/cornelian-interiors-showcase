import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Palette,
  Hammer,
  RefreshCw,
  Sofa,
  Grid3X3,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { services, stats } from "@/data/content";
import { sceneById, img } from "@/lib/showcase";
import { getFlagshipProject } from "@/lib/projects";
import { cn } from "@/lib/utils";
import {
  ParallaxImage,
  Parallax,
  Reveal,
  AngleCrossfade,
} from "@/components/Parallax";
import { LottiePlayer } from "@/components/LottiePlayer";
import { SeoHead } from "@/components/SeoHead";
import { SITE_URL, SEO_DEFAULTS } from "@/config/seo";
import scrollDown from "@/assets/lottie/scroll-down.json";
import { PinnedStatement } from "@/components/PinnedStatement";
import { Quote } from "@/components/Quote";
import { quoteByIndex } from "@/data/quotes";
import { FlowingBackground } from "@/components/FlowingBackground";
import { FeatureBand } from "@/components/FeatureBand";
import { DesignStudioCTA } from "@/components/DesignStudioCTA";

const heroStagger = {
  initial: { opacity: 0, y: 28 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 * i, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

const serviceIcons: Record<string, LucideIcon> = {
  Palette,
  Hammer,
  RefreshCw,
  Sofa,
  Grid3X3,
  Smartphone,
};

const marqueeWords = [
  "Turnkey Interiors",
  "Design",
  "Build",
  "Fit-Out",
  "Bespoke Furniture",
  "Modular Kitchens",
];

const chapters = ["grand-foyer", "family-living", "daughter-room"]
  .map((id) => sceneById(id))
  .filter((s): s is NonNullable<typeof s> => Boolean(s));

const Home = () => {
  const reduce = useReducedMotion();
  const flagship = getFlagshipProject();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SEO_DEFAULTS.siteName,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.jpg`,
    description: SEO_DEFAULTS.description,
    address: { "@type": "PostalAddress", addressLocality: "Faridabad", addressRegion: "Haryana" },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-97201-30734",
      email: "cornelianexecutiveinteriors@gmail.com",
      areaServed: "IN",
    },
  };

  return (
    <>
      <SeoHead jsonLd={[organizationSchema]} />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-charcoal" aria-label="Hero">
        <div className="absolute inset-0">
          <ParallaxImage
            src={img("235b0364-08c0-4dfa-888c-6fcf46d710b9")}
            alt="Luxury double-height foyer by Cornelian Executive Interiors"
            className="h-full w-full"
            strength={5}
            kenBurns
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/45 to-charcoal/60" />
          <FlowingBackground />
        </div>

        <div className="relative z-10 luxury-container pt-32 pb-10 md:pb-14">
          <motion.p
            className="luxury-label text-accent mb-6"
            custom={0}
            variants={heroStagger}
            initial="initial"
            animate="animate"
          >
            Cornelian Executive Interiors — Design &amp; Build
          </motion.p>
          <motion.h1
            className="luxury-heading-xl text-cream max-w-5xl"
            custom={1}
            variants={heroStagger}
            initial="initial"
            animate="animate"
          >
            Timeless spaces,
            <br />
            <span className="text-accent italic">crafted to live in.</span>
          </motion.h1>
          <motion.p
            className="luxury-body text-cream/75 max-w-xl mt-6"
            custom={2}
            variants={heroStagger}
            initial="initial"
            animate="animate"
          >
            A turnkey interior design &amp; build studio — we imagine, render and deliver
            complete residences where classical craft meets modern living.
          </motion.p>

          <motion.div
            className="mt-10 md:mt-14 pt-6 hairline-t flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            custom={3}
            variants={heroStagger}
            initial="initial"
            animate="animate"
          >
            <p className="luxury-label text-cream/55">
              Turnkey Interiors · Design · Build · Fit-Out — Faridabad
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 bg-accent text-accent-foreground px-7 py-3.5 font-body text-xs tracking-[0.14em] uppercase transition-colors duration-500 hover:bg-cornelian-glow"
              >
                Get Consultation
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/showcase"
                className="group inline-flex items-center gap-2 font-body text-xs tracking-[0.14em] uppercase text-cream/90 hover:text-accent transition-colors"
              >
                Enter the Walkthrough
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-6 right-6 w-8 opacity-60 [filter:invert(1)_sepia(1)_saturate(3)_hue-rotate(-10deg)]">
          <LottiePlayer animationData={scrollDown} />
        </div>
      </section>

      {/* ── Marquee ──────────────────────────────────────────── */}
      <section className="overflow-hidden border-y border-border bg-charcoal py-5" aria-hidden>
        <motion.div
          className="flex whitespace-nowrap"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 24, ease: "linear", repeat: Infinity }}
        >
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center shrink-0">
              {marqueeWords.map((w) => (
                <span
                  key={`${dup}-${w}`}
                  className="flex items-center gap-6 pr-6 font-heading text-2xl md:text-3xl text-cream/75"
                >
                  {w}
                  <span className="text-accent text-lg">◆</span>
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Featured offerings (card-less big bands) ─────────── */}
      <FeatureBand
        variant="dark"
        eyebrow="New · AI Design Studio"
        title="Visualize Your Room"
        accent="Free AI Preview"
        text="Tell us your room size and the style you love. Our AI renders a concept in seconds — then our designers make it real."
      >
        <DesignStudioCTA label="Try the Design Studio" />
      </FeatureBand>

      <FeatureBand
        variant="cream"
        eyebrow="CHIITRA by Cornelian"
        title="Bespoke Wall Art"
        accent="& Wall Painting"
        text="Customizable luxury wall art for your space. Share your reference, choose size and frame — crafted with the same care as our interiors."
      >
        <Link
          to="/chiitra"
          className="group inline-flex items-center gap-3 bg-accent text-accent-foreground px-10 py-4 font-body text-sm tracking-[0.12em] uppercase transition-colors duration-500 hover:bg-cornelian-glow"
        >
          Explore CHIITRA
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </FeatureBand>

      <FeatureBand
        variant="dark"
        eyebrow="By Cornelian"
        title="Consoles & Cabinets"
        text="Hassle-free custom furniture — no middlemen. Your size, your style, delivered to your doorstep. Upload references, choose dimensions and finish."
      >
        <Link
          to="/custom-furniture"
          className="group inline-flex items-center gap-3 bg-accent text-accent-foreground px-10 py-4 font-body text-sm tracking-[0.12em] uppercase transition-colors duration-500 hover:bg-cornelian-glow"
        >
          Design Your Cabinet
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </FeatureBand>

      {/* ── Pinned statement (GSAP scrub) ────────────────────── */}
      <PinnedStatement
        kicker="Our Craft"
        words={["Imagined.", "Rendered.", "Built.", "Delivered."]}
        accentIndex={1}
        images={[
          img("bf6e5e3a-78d9-4d30-8775-69e67ba4a491"),
          img("3d78bc72-c7a1-48e5-9d04-e1bcd428ea7e"),
          img("843ed2a2-6bb5-476a-9728-47b8b41e4d0d"),
          img("4961627d-aacf-423f-ac44-050345f65e6d"),
        ]}
      />

      {/* ── Numbered chapters (walkthrough teaser) ───────────── */}
      <section className="luxury-section bg-background overflow-hidden" aria-labelledby="chapters-heading">
        <div className="luxury-container">
          <Reveal className="max-w-2xl mb-16 md:mb-24">
            <p className="luxury-label text-accent mb-4">The Residence</p>
            <h2 id="chapters-heading" className="luxury-heading-lg text-cream mb-6">
              A Walkthrough in Three Dimensions
            </h2>
            <p className="luxury-body">
              Move through a signature home room by room — every finish, texture and fall of
              light rendered in meticulous 3D before a single wall is built.
            </p>
          </Reveal>
        </div>

        <div className="space-y-24 md:space-y-36">
          {chapters.map((scene, i) => {
            const reversed = i % 2 === 1;
            return (
              <div key={scene.id} className="luxury-container">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                  <div className={cn("lg:col-span-7", reversed && "lg:order-2")}>
                    <AngleCrossfade
                      a={img(scene.images[0])}
                      b={scene.images[1] ? img(scene.images[1]) : undefined}
                      alt={`${scene.title} — Cornelian Executive Interiors`}
                      className="aspect-[4/3] rounded-sm shadow-2xl ring-1 ring-white/5"
                    />
                  </div>
                  <Parallax offset={36} className={cn("lg:col-span-5", reversed && "lg:order-1")}>
                    <span className="block font-heading text-6xl md:text-7xl text-accent/25 leading-none mb-4">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="luxury-label text-accent mb-3">{scene.room}</p>
                    <h3 className="luxury-heading-md text-cream mb-5">{scene.title}</h3>
                    <p className="luxury-body-sm mb-8">{scene.blurb}</p>
                    <Link
                      to="/showcase"
                      className="group inline-flex items-center gap-2 font-body text-sm tracking-[0.1em] uppercase text-accent hover:text-cornelian-glow transition-colors"
                    >
                      Enter the walkthrough
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Parallax>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Quote (cream band) ───────────────────────────────── */}
      <Quote variant="cream" quote={quoteByIndex(0).quote} author={quoteByIndex(0).author} />

      {/* ── Flagship project spotlight ───────────────────────── */}
      {flagship && (
        <section className="relative h-[85vh] min-h-[560px] flex items-end overflow-hidden" aria-label="Featured project">
          <div className="absolute inset-0">
            <ParallaxImage
              src={flagship.thumbnail}
              alt={flagship.name}
              className="h-full w-full"
              strength={6}
              kenBurns
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/30" />
          </div>
          <div className="relative z-10 luxury-container pb-16 md:pb-24">
            <Reveal className="max-w-2xl">
              <p className="luxury-label text-accent mb-4">Featured Project</p>
              <h2 className="luxury-heading-lg text-cream mb-4">{flagship.name}</h2>
              <p className="luxury-body text-cream/80 mb-3">
                {[flagship.category, flagship.city ?? flagship.location].filter(Boolean).join(" · ")}
              </p>
              <p className="luxury-body-sm text-cream/70 max-w-xl mb-8">{flagship.description}</p>
              <Link
                to={`/projects/${flagship.slug}`}
                className="group inline-flex items-center gap-3 bg-cream text-charcoal px-8 py-4 font-body text-sm tracking-[0.12em] uppercase hover:bg-accent hover:text-accent-foreground transition-all duration-500"
              >
                Explore Project
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </Reveal>
          </div>
        </section>
      )}


      {/* ── Services ─────────────────────────────────────────── */}
      <section className="luxury-section bg-background" aria-labelledby="services-heading">
        <div className="luxury-container">
          <Reveal className="text-center mb-16">
            <p className="luxury-label text-accent mb-4">What We Offer</p>
            <h2 id="services-heading" className="luxury-heading-lg text-cream mb-6">Our Services</h2>
            <div className="luxury-divider mx-auto" />
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((service, i) => {
              const Icon = serviceIcons[service.icon] ?? Palette;
              return (
                <Reveal key={service.id} delay={(i % 3) * 0.08}>
                <div className="group h-full pt-6 hairline-t transition-colors duration-500">
                  <Icon className="text-accent mb-5" size={28} strokeWidth={1.5} />
                  <h3 className="luxury-heading-sm text-cream mb-3 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="luxury-body-sm">{service.description}</p>
                </div>
                </Reveal>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 text-cream font-body text-sm tracking-[0.1em] uppercase hover:text-accent transition-colors"
            >
              View All Services
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>



      {/* ── Stats ────────────────────────────────────────────── */}
      <section className="py-20 bg-charcoal border-t border-border" aria-label="Company statistics">
        <div className="luxury-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08} className="text-center">
                <div className="font-heading text-4xl md:text-6xl text-accent mb-2">{stat.value}</div>
                <div className="luxury-label text-cream/70">{stat.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section className="luxury-section bg-background">
        <div className="luxury-container text-center">
          <Reveal className="max-w-2xl mx-auto">
            <p className="luxury-label text-accent mb-4">Let's Begin</p>
            <h2 className="luxury-heading-lg text-cream mb-6">
              Ready to Design Your Space?
            </h2>
            <p className="luxury-body mb-10">
              Every space we build began as a conversation. Tell us about yours and we'll
              render it into reality.
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 bg-accent text-accent-foreground px-10 py-4 font-body text-sm tracking-[0.12em] uppercase hover:bg-cornelian-glow transition-all duration-500"
            >
              Start Your Project
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default Home;
