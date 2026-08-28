import { Quote as QuoteMark } from "lucide-react";
import { Reveal } from "@/components/Parallax";
import { cn } from "@/lib/utils";

interface QuoteProps {
  quote: string;
  author?: string;
  /** "plain" sits over the page background; "cream" is a warm cream band. */
  variant?: "plain" | "cream";
  className?: string;
}

/**
 * Premium pull-quote band in the Fraunces display face. Colour is inherited so
 * it reads correctly on both the dark background and the cream panel variant.
 */
export function Quote({ quote, author, variant = "plain", className }: QuoteProps) {
  return (
    <section
      className={cn(
        "py-20 md:py-28 overflow-hidden",
        variant === "cream" && "section-cream",
        className
      )}
    >
      <div className="luxury-container">
        <Reveal className="mx-auto max-w-4xl text-center">
          <QuoteMark
            className="mx-auto mb-6 text-accent"
            size={34}
            strokeWidth={1.25}
            aria-hidden
          />
          <blockquote className="font-display italic font-light leading-[1.12] text-[clamp(1.6rem,4vw,3rem)] text-balance">
            {quote}
          </blockquote>
          {author && (
            <figcaption className="mt-8 font-body text-xs md:text-sm uppercase tracking-[0.2em] opacity-70">
              <span className="text-accent">—</span> {author}
            </figcaption>
          )}
        </Reveal>
      </div>
    </section>
  );
}
