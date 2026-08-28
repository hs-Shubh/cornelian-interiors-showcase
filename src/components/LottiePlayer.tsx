import Lottie from "lottie-react";
import { useReducedMotion } from "framer-motion";

interface LottiePlayerProps {
  animationData: unknown;
  className?: string;
  loop?: boolean;
}

/**
 * Lottie wrapper that honours prefers-reduced-motion — it freezes on the first
 * frame (no autoplay/loop) when the user opts out of motion.
 */
export function LottiePlayer({ animationData, className, loop = true }: LottiePlayerProps) {
  const reduce = useReducedMotion();
  return (
    <Lottie
      animationData={animationData}
      loop={loop && !reduce}
      autoplay={!reduce}
      className={className}
    />
  );
}
