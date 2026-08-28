import { useRef, useLayoutEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface PinnedStatementProps {
  /** Large words revealed one-by-one as the section is scrubbed. */
  words: string[];
  /** Index of the word painted in the accent colour. */
  accentIndex?: number;
  kicker?: string;
  /** Interior images (one per word) that crossfade on the right as you scroll. */
  images?: string[];
}

/**
 * A full-viewport section that pins while scrolling: on the left each word of a
 * brand statement reveals in sequence, while on the right an interior image
 * crossfades to match the active word (GSAP ScrollTrigger scrub). Under reduced
 * motion it renders statically, fully visible, with the first image.
 */
export function PinnedStatement({ words, accentIndex, kicker, images = [] }: PinnedStatementProps) {
  const root = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useLayoutEffect(() => {
    if (reduce || !root.current) return;
    const ctx = gsap.context(() => {
      const wordEls = gsap.utils.toArray<HTMLElement>("[data-word]");
      const imgEls = gsap.utils.toArray<HTMLElement>("[data-qimg]");
      gsap.set(wordEls, { autoAlpha: 0.14, y: 10 });
      gsap.set(imgEls, { autoAlpha: 0, scale: 1.08 });
      if (imgEls[0]) gsap.set(imgEls[0], { autoAlpha: 1, scale: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=180%",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      wordEls.forEach((w, i) => {
        const at = i;
        tl.to(w, { autoAlpha: 1, y: 0, duration: 0.6, ease: "none" }, at);
        if (imgEls[i]) tl.to(imgEls[i], { autoAlpha: 1, scale: 1, duration: 0.6, ease: "none" }, at);
        if (i > 0 && imgEls[i - 1]) tl.to(imgEls[i - 1], { autoAlpha: 0, duration: 0.6, ease: "none" }, at);
      });
    }, root);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={root} className="bg-background hairline-t hairline-b overflow-hidden">
      <div className="luxury-container grid lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-screen py-16">
        <div>
          {kicker && <p className="luxury-label text-accent mb-8">{kicker}</p>}
          <div className="space-y-1 md:space-y-2">
            {words.map((word, i) => (
              <span
                key={`${word}-${i}`}
                data-word
                className={cn(
                  "block font-heading font-semibold leading-[0.95] tracking-tight",
                  "text-[13vw] sm:text-[10vw] lg:text-[6vw]",
                  i === accentIndex ? "text-accent italic" : "text-cream"
                )}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {images.length > 0 && (
          <div className="relative hidden lg:block aspect-[4/5] w-full overflow-hidden rounded-sm ring-1 ring-white/5">
            {images.map((src, i) => (
              <img
                key={src + i}
                data-qimg
                src={src}
                alt=""
                aria-hidden
                className="absolute inset-0 h-full w-full object-cover will-change-transform"
              />
            ))}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
          </div>
        )}
      </div>
    </section>
  );
}
