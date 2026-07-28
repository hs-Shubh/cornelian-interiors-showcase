import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollSequenceProps {
  /** Directory of frames under /public, e.g. "/showcase-frames/foyer". */
  base: string;
  /** Number of frames (frame_0001..frame_000N). */
  count: number;
  /** Filename zero-pad width. */
  pad?: number;
  ext?: string;
  /** Scroll travel that scrubs the full sequence, in vh. */
  heightVh?: number;
  alt: string;
  className?: string;
  /** Overlay content, absolutely centered over the canvas. */
  children?: ReactNode;
}

const frameUrl = (base: string, i: number, pad: number, ext: string) =>
  `${base}/frame_${String(i).padStart(pad, "0")}.${ext}`;

/** Draw an image to fill the canvas (object-fit: cover). */
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number
) {
  const ir = img.width / img.height;
  const cr = cw / ch;
  let dw = cw;
  let dh = ch;
  if (ir > cr) {
    dh = ch;
    dw = ch * ir;
  } else {
    dw = cw;
    dh = cw / ir;
  }
  const dx = (cw - dw) / 2;
  const dy = (ch - dh) / 2;
  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(img, dx, dy, dw, dh);
}

/**
 * Apple-style scroll-scrubbed image sequence. Pins a full-screen canvas and
 * paints the frame that corresponds to scroll progress. Under reduced motion
 * it renders a single static frame instead of preloading the whole set.
 *
 * Drop-in for a true 3D camera fly-through: point `base`/`count` at the
 * exported frames and it just works.
 */
export function ScrollSequence({
  base,
  count,
  pad = 4,
  ext = "jpg",
  heightVh = 300,
  alt,
  className,
  children,
}: ScrollSequenceProps) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrame = useRef(-1);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Preload frames + wire canvas sizing. Skipped under reduced motion.
  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let disposed = false;
    let loaded = 0;
    const images: HTMLImageElement[] = new Array(count);

    const render = (index: number) => {
      const img = images[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      if (currentFrame.current === index) return;
      currentFrame.current = index;
      drawCover(ctx, img, canvas.width, canvas.height);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      const frame = currentFrame.current < 0 ? 0 : currentFrame.current;
      currentFrame.current = -1;
      render(frame);
    };

    for (let i = 0; i < count; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = frameUrl(base, i + 1, pad, ext);
      img.onload = () => {
        if (disposed) return;
        loaded += 1;
        setProgress(loaded / count);
        if (i === 0) {
          resize();
          setReady(true);
        }
        if (loaded === count) setReady(true);
      };
      images[i] = img;
    }
    imagesRef.current = images;

    window.addEventListener("resize", resize);
    return () => {
      disposed = true;
      window.removeEventListener("resize", resize);
    };
  }, [base, count, pad, ext, reduce]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (reduce) return;
    const images = imagesRef.current;
    const canvas = canvasRef.current;
    if (!images.length || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const index = Math.min(count - 1, Math.max(0, Math.round(p * (count - 1))));
    const img = images[index];
    if (img && img.complete && img.naturalWidth > 0) {
      if (currentFrame.current !== index) {
        currentFrame.current = index;
        drawCover(ctx, img, canvas.width, canvas.height);
      }
    }
  });

  if (reduce) {
    return (
      <section className={cn("relative h-screen overflow-hidden", className)}>
        <img
          src={frameUrl(base, 1, pad, ext)}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {children && <div className="relative z-10 h-full">{children}</div>}
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      style={{ height: `${heightVh}vh` }}
      className={cn("relative", className)}
      aria-label={alt}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="block h-full w-full" />
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center bg-charcoal">
            <div className="text-center">
              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-cream/40 border-t-cream" />
              <p className="font-body text-xs uppercase tracking-[0.2em] text-cream/60">
                Preparing walkthrough {Math.round(progress * 100)}%
              </p>
            </div>
          </div>
        )}
        {children && <div className="absolute inset-0 z-10">{children}</div>}
      </div>
    </section>
  );
}
