import type { CSSProperties } from "react";

/**
 * Subtle animated warm "light" blobs for dark sections. Drop inside a
 * position:relative section; sits above the section background but below its
 * content. Screen-blended so it gently lifts the dark tone. Reduced-motion
 * users get static blobs (animation disabled via CSS).
 */
export function FlowingBackground({ className = "" }: { className?: string }) {
  const base: CSSProperties = { mixBlendMode: "screen" };
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div
        className="flow-blob flow-blob-a"
        style={{
          ...base,
          top: "-12%",
          left: "-8%",
          width: "40vw",
          height: "40vw",
          background: "radial-gradient(circle, hsl(20 72% 52% / 0.45), transparent 70%)",
        }}
      />
      <div
        className="flow-blob flow-blob-b"
        style={{
          ...base,
          bottom: "-14%",
          right: "-6%",
          width: "44vw",
          height: "44vw",
          background: "radial-gradient(circle, hsl(28 58% 46% / 0.4), transparent 70%)",
        }}
      />
      <div
        className="flow-blob flow-blob-c"
        style={{
          ...base,
          top: "30%",
          left: "45%",
          width: "28vw",
          height: "28vw",
          background: "radial-gradient(circle, hsl(32 45% 40% / 0.3), transparent 70%)",
        }}
      />
    </div>
  );
}
