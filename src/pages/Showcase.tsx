import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
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

const Showcase = () => {
  return (
    <>
      <SeoHead
        title="3D Walkthrough | Cornelian Executive Interiors"
        description="A room-by-room 3D walkthrough of a signature Cornelian residence — foyer, living, dining and bedrooms rendered in meticulous detail."
        canonical={`${SITE_URL}/showcase`}
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
              <div className="bg-background py-14 md:py-20">
                <div className="luxury-container">
                  <Reveal>
                    <div className="flex items-center gap-6">
                      <span className="font-heading text-5xl md:text-7xl text-accent/30">
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
                <Parallax offset={48} className="max-w-xl">
                  <p className="luxury-label text-cream/70 mb-3">{scene.room}</p>
                  <h3 className="luxury-heading-lg text-cream mb-5">{scene.title}</h3>
                  <p className="luxury-body text-cream/85">{scene.blurb}</p>
                </Parallax>
              </div>
            </section>
          </div>
        );
      })}

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
    </>
  );
};

export default Showcase;
