import { useEffect, useMemo, useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const POSTER = "/media/hero-poster.jpg";

/**
 * Full-bleed cinematic hero background using the room-walkthrough clip.
 * - Serves 480p on narrow screens / Save-Data; 720p (VP9 webm → H.264 mp4) elsewhere.
 * - Reduced motion → static poster, no video (per handoff).
 * - Muted + playsInline so iOS/Android autoplay isn't blocked.
 * Overlay content is passed as children; a bottom scrim keeps text legible.
 */
export function HeroWalkthrough({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  const lightweight = useMemo(() => {
    if (typeof window === "undefined") return false;
    const narrow = window.matchMedia("(max-width: 767px)").matches;
    let saveData = false;
    if ("connection" in navigator) {
      const conn = navigator.connection; // unknown after `in` narrowing
      if (conn && typeof conn === "object" && "saveData" in conn) {
        saveData = conn.saveData === true;
      }
    }
    return narrow || saveData;
  }, []);

  useEffect(() => {
    if (reduce) return;
    videoRef.current?.play().catch(() => {
      /* autoplay blocked → poster shows */
    });
  }, [reduce]);

  return (
    <section
      className={cn(
        "relative min-h-[100svh] flex flex-col justify-end overflow-hidden bg-[#0c0a09]",
        className
      )}
      aria-label="Hero"
    >
      {reduce ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${POSTER})` }}
          aria-hidden
        />
      ) : (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={POSTER}
          aria-hidden
          tabIndex={-1}
        >
          {lightweight ? (
            <source src="/media/hero-walkthrough-480p.mp4" type="video/mp4" />
          ) : (
            <>
              <source src="/media/hero-walkthrough-720p.webm" type="video/webm" />
              <source src="/media/hero-walkthrough-720p.mp4" type="video/mp4" />
            </>
          )}
        </video>
      )}

      {/* Scrim — keeps the headline legible over bright interiors */}
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(to top, rgba(12,10,9,.80) 0%, rgba(12,10,9,.34) 45%, rgba(12,10,9,.30) 100%)",
        }}
      />

      <div className="relative z-10">{children}</div>
    </section>
  );
}
