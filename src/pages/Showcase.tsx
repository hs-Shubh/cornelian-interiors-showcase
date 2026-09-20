import { useEffect, useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Camera,
  MapPin,
  Layers,
} from "lucide-react";
import {
  ParallaxImage,
  Parallax,
  Reveal,
  AngleCrossfade,
} from "@/components/Parallax";
import { scenes, img } from "@/lib/showcase";
import { SeoHead } from "@/components/SeoHead";
import { SITE_URL } from "@/config/seo";
import { ScrollSequence } from "@/components/ScrollSequence";
import { trackViewContent } from "@/lib/analytics";
import { Quote } from "@/components/Quote";
import { quoteByIndex } from "@/data/quotes";
import { getFlagshipProject, getAllProjects } from "@/lib/projects";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const Showcase = () => {
  const root = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const flagship = getFlagshipProject();

  useEffect(() => {
    trackViewContent("3D Showcase");
  }, []);
  const quote = quoteByIndex(4);

  // Real photographed project shots — surfaced alongside the 3D renders for
  // variety. Flatten every project's gallery (not just thumbnails, which repeat
  // images[0]) and de-dup by src so no photo appears twice.
  const projectShots = (() => {
    const seen = new Set<string>();
    const out: {
      src: string;
      caption?: string;
      name: string;
      slug: string;
      place: string;
    }[] = [];
    for (const p of getAllProjects()) {
      const place = p.city ?? p.location;
      for (const image of p.images) {
        if (seen.has(image.src)) continue;
        seen.add(image.src);
        out.push({
          src: image.src,
          caption: image.caption,
          name: p.name,
          slug: p.slug,
          place,
        });
      }
    }
    return out;
  })();

  useLayoutEffect(() => {
    if (reduce || !root.current) return;
    const ctx = gsap.context(() => {
      // Room-chapter copy — scrubbed slide-up reveal as each panel enters.
      gsap.utils.toArray<HTMLElement>("[data-chapter-copy]").forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 64,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            end: "top 45%",
            scrub: 0.6,
          },
        });
      });

      // Big chapter numbers — a subtle editorial horizontal drift.
      gsap.utils.toArray<HTMLElement>("[data-chapter-num]").forEach((el) => {
        gsap.fromTo(
          el,
          { xPercent: -12 },
          {
            xPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      });

      // Selected-projects grid — staggered reveal in batches on enter.
      const tiles = gsap.utils.toArray<HTMLElement>("[data-proj-tile]");
      if (tiles.length) {
        gsap.set(tiles, { autoAlpha: 0, y: 48 });
        ScrollTrigger.batch(tiles, {
          start: "top 90%",
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.12,
              overwrite: true,
            }),
        });
      }
    }, root);
    return () => ctx.revert();
  }, [reduce]);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: "Signature Cornelian Residence — 3D Walkthrough",
      about: "A room-by-room 3D interior walkthrough of a signature residence by Cornelian Executive Interiors.",
      creator: {
        "@type": "Organization",
        name: "Cornelian Executive Interiors",
        url: SITE_URL,
      },
      url: `${SITE_URL}/showcase`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "3D Walkthrough", item: `${SITE_URL}/showcase` },
      ],
    },
  ];
  return (
    <div ref={root}>
      <SeoHead
        title="3D Walkthrough | Cornelian Executive Interiors"
        description="A room-by-room 3D walkthrough of a signature Cornelian residence — foyer, living, dining and bedrooms rendered in meticulous detail."
        canonical={`${SITE_URL}/showcase`}
        jsonLd={jsonLd}
      />

      {/* Intro */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ParallaxImage
            src={img("cd2b4dce-5c3c-4332-85df-30cdb2228c7e")}
            alt="Signature Cornelian residence — grand foyer"
            className="h-full w-full"
            strength={5}
            kenBurns
            priority
          />
          <div className="absolute inset-0 bg-charcoal/55" />
        </div>
        <div className="relative z-10 text-center luxury-container">
          <Reveal className="max-w-3xl mx-auto">
            <p className="luxury-label text-cream/70 mb-6">A 3D Walkthrough</p>
            <h1 className="luxury-heading-xl text-cream mb-8">
              Inside a Signature
              <br />
              Cornelian Residence
            </h1>
            <p className="luxury-body text-cream/80 max-w-2xl mx-auto">
              Move through the home the way we design it — room by room, surface by
              surface. Keep scrolling to begin the tour.
            </p>
          </Reveal>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/60 animate-bounce">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* Scroll-scrubbed fly-through (Path A). Swap base/count for true
          3D camera fly-through frames when available. */}
      <ScrollSequence
        base="/showcase-frames/foyer"
        count={120}
        heightVh={320}
        alt="Fly-through of the grand foyer"
      >
        <div className="relative flex h-full items-end justify-center">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-charcoal/80 to-transparent" />
          <div className="relative z-10 text-center px-6 pb-16">
            <p className="luxury-label text-cream/70 mb-3">Scroll to explore</p>
            <h2 className="luxury-heading-lg text-cream drop-shadow-lg">
              Step Into the Foyer
            </h2>
          </div>
        </div>
      </ScrollSequence>

      {/* Scene chapters */}
      {scenes.map((scene, i) => {
        const prevRoom = i > 0 ? scenes[i - 1].room : null;
        const showRoomHeading = scene.room !== prevRoom;
        return (
          <div key={scene.id}>
            {showRoomHeading && (
              <div className="bg-background py-14 md:py-20 overflow-hidden">
                <div className="luxury-container">
                  <Reveal>
                    <div className="flex items-center gap-6">
                      <span
                        data-chapter-num
                        className="font-heading text-5xl md:text-7xl text-accent/30 will-change-transform"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="luxury-label mb-1">Chapter</p>
                        <h2 className="luxury-heading-lg">{scene.room} Spaces</h2>
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            )}

            <section className="relative h-[92vh] min-h-[560px] overflow-hidden">
              <AngleCrossfade
                a={img(scene.images[0])}
                b={scene.images[1] ? img(scene.images[1]) : undefined}
                alt={`${scene.title} — Cornelian Executive Interiors`}
                className="absolute inset-0 h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-charcoal/30" />
              <div className="relative z-10 h-full luxury-container flex items-end pb-14 md:pb-20">
                <div data-chapter-copy className="max-w-xl will-change-transform">
                  <Parallax offset={40}>
                    <p className="luxury-label text-cream/70 mb-3">{scene.room}</p>
                    <h3 className="luxury-heading-lg text-cream mb-4">{scene.title}</h3>
                    <div className="flex items-center gap-4 mb-5 text-cream/65">
                      <span className="inline-flex items-center gap-2 luxury-label text-cream/65">
                        <Camera size={14} strokeWidth={1.5} aria-hidden />
                        {scene.images.length} {scene.images.length === 1 ? "Angle" : "Angles"}
                      </span>
                      <span className="h-3 w-px bg-cream/25" aria-hidden />
                      <span className="inline-flex items-center gap-2 luxury-label text-cream/65">
                        <Layers size={14} strokeWidth={1.5} aria-hidden />
                        {scene.room}
                      </span>
                    </div>
                    <p className="luxury-body text-cream/85">{scene.blurb}</p>
                  </Parallax>
                </div>
              </div>
            </section>
          </div>
        );
      })}

      {/* Interior quote */}
      <Quote quote={quote.quote} author={quote.author} variant="cream" />

      {/* Flagship project summary */}
      {flagship && (
        <section className="luxury-section bg-background">
          <div className="luxury-container">
            <Reveal>
              <div className="mx-auto max-w-3xl border border-hairline bg-card p-8 md:p-12 text-center">
                <p className="luxury-label text-accent mb-4">Featured Project</p>
                <h2 className="luxury-heading-lg mb-6">{flagship.name}</h2>
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-8 text-muted-foreground">
                  <span className="inline-flex items-center gap-2 luxury-label">
                    <Layers size={14} strokeWidth={1.5} aria-hidden />
                    {flagship.category}
                  </span>
                  <span className="hidden sm:inline-block h-3 w-px bg-hairline" aria-hidden />
                  <span className="inline-flex items-center gap-2 luxury-label">
                    <MapPin size={14} strokeWidth={1.5} aria-hidden />
                    {flagship.city ?? flagship.location}
                  </span>
                </div>
                <p className="luxury-body text-muted-foreground mb-10">{flagship.description}</p>
                <Link
                  to={`/projects/${flagship.slug}`}
                  className="group inline-flex items-center gap-3 border border-hairline px-10 py-4 font-body text-sm tracking-[0.1em] uppercase hover:bg-accent hover:text-cream hover:border-accent transition-all duration-500"
                >
                  View full project
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Selected projects — real photographed homes, varied imagery */}
      {projectShots.length > 0 && (
        <section className="luxury-section bg-secondary hairline-t hairline-b">
          <div className="luxury-container">
            <Reveal>
              <div className="mb-12 md:mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="luxury-label text-accent mb-3">Beyond the Render</p>
                  <h2 className="luxury-heading-lg">Selected Projects</h2>
                </div>
                <p className="luxury-body text-muted-foreground max-w-md">
                  Homes we designed and delivered — a closer look at the materials,
                  light and detail as they live in real spaces.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
              {projectShots.map((shot, i) => (
                <Link
                  key={`${shot.slug}-${i}`}
                  to={`/projects/${shot.slug}`}
                  data-proj-tile
                  aria-label={`${shot.name} — view project`}
                  className="group relative aspect-[4/5] overflow-hidden bg-card"
                >
                  <img
                    src={shot.src}
                    alt={`${shot.name}${shot.caption ? ` — ${shot.caption}` : ""}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out will-change-transform group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/10 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-95" />
                  <span className="absolute right-4 top-4 text-cream/0 transition-colors duration-500 group-hover:text-cream">
                    <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden />
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                    <p className="luxury-label text-cream/60 mb-1">{shot.place}</p>
                    <p className="font-heading text-lg md:text-xl leading-tight text-cream">
                      {shot.name}
                    </p>
                    {shot.caption && (
                      <p className="luxury-label mt-1 text-cream/55">{shot.caption}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="luxury-section bg-charcoal text-cream">
        <div className="luxury-container text-center">
          <Reveal className="max-w-2xl mx-auto">
            <p className="luxury-label text-cream/60 mb-4">Your Home, Next</p>
            <h2 className="luxury-heading-lg text-cream mb-6">
              Let's Design Your Walkthrough
            </h2>
            <p className="luxury-body text-cream/75 mb-10">
              Every space here began as a conversation. Tell us about yours and we'll render
              it into reality.
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 bg-cream text-charcoal px-10 py-4 font-body text-sm tracking-[0.1em] uppercase hover:bg-champagne hover:text-cream transition-all duration-500"
            >
              Start Your Project
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Showcase;
