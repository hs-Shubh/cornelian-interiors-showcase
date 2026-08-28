import type { ReactNode } from "react";
import { Reveal } from "@/components/Parallax";
import { FlowingBackground } from "@/components/FlowingBackground";
import { cn } from "@/lib/utils";

interface FeatureBandProps {
  eyebrow: string;
  title: string;
  /** Optional accent continuation rendered in italic cornelian after an em dash. */
  accent?: string;
  text: string;
  variant?: "dark" | "cream";
  /** CTA element(s). */
  children?: ReactNode;
}

/**
 * Full-width, card-less feature section: centered eyebrow + large heading +
 * text + CTA. Alternates dark (with flowing warm light) and cream panels to
 * create the brand's orange-and-cream rhythm.
 */
export function FeatureBand({ eyebrow, title, accent, text, variant = "dark", children }: FeatureBandProps) {
  const cream = variant === "cream";
  return (
    <section className={cn("relative luxury-section overflow-hidden", cream ? "section-cream" : "bg-charcoal")}>
      {!cream && <FlowingBackground />}
      <div className="relative z-10 luxury-container text-center">
        <Reveal className="max-w-3xl mx-auto">
          <p className="luxury-label text-accent mb-5">{eyebrow}</p>
          <h2 className={cn("luxury-heading-lg mb-6", cream ? "text-charcoal" : "text-cream")}>
            {title}
            {accent && (
              <>
                {" — "}
                <span className="text-accent italic">{accent}</span>
              </>
            )}
          </h2>
          <p className="luxury-body mb-10 mx-auto max-w-xl">{text}</p>
          {children}
        </Reveal>
      </div>
    </section>
  );
}
