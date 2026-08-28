import {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  type ReactNode,
  type CSSProperties,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
} from "framer-motion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ *
 * ParallaxImage — an oversized image that drifts within a clipped
 * frame as the frame scrolls through the viewport. The workhorse of
 * the depth effect.
 * ------------------------------------------------------------------ */
export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  strength = 6,
  kenBurns = false,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  /** Drift range as a % of image height (each direction). */
  strength?: number;
  kenBurns?: boolean;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : [`${-strength}%`, `${strength}%`]
  );

  // Slack: image is taller than frame so it can drift without gaps.
  const slack = strength + 4;

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        style={{ y, top: `-${slack}%`, height: `${100 + slack * 2}%` }}
        className={cn(
          "absolute inset-x-0 w-full object-cover will-change-transform",
          kenBurns && "ken-burns",
          imgClassName
        )}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Parallax — moves arbitrary content vertically as it scrolls past.
 * Use for text/graphics layered over a background.
 * ------------------------------------------------------------------ */
export function Parallax({
  children,
  offset = 60,
  className,
  style,
}: {
  children: ReactNode;
  /** Pixel travel across the full scroll pass. */
  offset?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [offset, -offset]
  );
  return (
    <motion.div ref={ref} style={{ y, ...style }} className={className}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ *
 * Reveal — clip/slide reveal when scrolled into view.
 * ------------------------------------------------------------------ */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  // Safety net: never leave content stranded if the observer misfires.
  const [fallback, setFallback] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setFallback(true), 1200);
    return () => clearTimeout(t);
  }, []);
  const show = inView || fallback;
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, clipPath: "inset(0 0 100% 0)" }}
      animate={
        show
          ? reduce
            ? { opacity: 1 }
            : { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }
          : undefined
      }
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ *
 * AngleCrossfade — two near-identical camera angles of the same room.
 * As the block scrolls, the second angle fades in over the first,
 * reading as a subtle push-in / camera move. Falls back to the first
 * image under reduced motion.
 * ------------------------------------------------------------------ */
export function AngleCrossfade({
  a,
  b,
  alt,
  className,
}: {
  a: string;
  b?: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacityB = useTransform(scrollYProgress, [0.15, 0.55, 0.85], [0, 1, 1]);
  const scaleA = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const scaleB = useTransform(scrollYProgress, [0, 1], [1.12, 1.02]);

  if (reduce || !b) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <img src={a} alt={alt} className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.img
        src={a}
        alt={alt}
        style={{ scale: scaleA }}
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
      />
      <motion.img
        src={b}
        alt=""
        aria-hidden
        style={{ opacity: opacityB, scale: scaleB }}
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * HorizontalGallery — pins a horizontal track and translates it with
 * vertical scroll. Measures real content width so travel is exact.
 * Reduced motion → plain horizontal scroll container.
 * ------------------------------------------------------------------ */
export function HorizontalGallery({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    if (reduce) return;
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 300); // after images/layout settle
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, [reduce, children]);

  const { scrollYProgress } = useScroll({ target: sectionRef });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  if (reduce) {
    return (
      <div className={cn("overflow-x-auto", className)}>
        <div className="flex gap-6">{children}</div>
      </div>
    );
  }

  return (
    <section
      ref={sectionRef}
      style={{ height: `calc(${distance}px + 100vh)` }}
      className={cn("relative", className)}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex gap-6 px-6 will-change-transform">
          {children}
        </motion.div>
      </div>
    </section>
  );
}
