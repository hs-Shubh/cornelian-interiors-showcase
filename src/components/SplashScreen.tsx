import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const SEEN_KEY = "cornelian_intro_seen";
const MAX_MS = 11000; // safety: never trap the user longer than the clip

type Phase = "show" | "fade" | "done";

/**
 * Cinematic logo intro shown once per browser session on first load.
 * Full-screen video overlay that fades out to reveal the homepage.
 * Skipped entirely under prefers-reduced-motion.
 */
export function SplashScreen() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<Phase>(() => {
    if (typeof window === "undefined") return "done";
    return window.sessionStorage.getItem(SEEN_KEY) ? "done" : "show";
  });

  const dismiss = useCallback(() => {
    try {
      window.sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* private mode */
    }
    setPhase((p) => (p === "done" ? p : "fade"));
    window.setTimeout(() => setPhase("done"), 700);
  }, []);

  // Reduced motion → don't play an intro at all.
  useEffect(() => {
    if (reduce && phase !== "done") dismiss();
  }, [reduce, phase, dismiss]);

  useEffect(() => {
    if (phase !== "show") return;
    document.body.style.overflow = "hidden";
    videoRef.current?.play().catch(() => {
      /* autoplay blocked → poster shows, timeout dismisses */
    });
    const t = window.setTimeout(dismiss, MAX_MS);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [phase, dismiss]);

  if (phase === "done") return null;

  return (
    <div
      role="dialog"
      aria-label="Cornelian intro"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0806] transition-opacity duration-700 ease-in-out ${
        phase === "fade" ? "opacity-0" : "opacity-100"
      }`}
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src="/intro/cornelian-intro.mp4"
        poster="/intro/cornelian-intro-poster.jpg"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={dismiss}
      />
      <button
        type="button"
        onClick={dismiss}
        className="absolute bottom-6 right-6 border border-cream/30 px-4 py-2 font-body text-xs uppercase tracking-[0.2em] text-cream/70 backdrop-blur-sm transition-colors hover:border-cream/60 hover:text-cream"
      >
        Skip intro
      </button>
    </div>
  );
}
