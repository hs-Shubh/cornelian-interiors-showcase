import { useState } from "react";
import { motion } from "framer-motion";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  priority?: boolean;
}

export function LazyImage({ src, alt, className = "", aspectRatio, priority }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <span className="block overflow-hidden">
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={className}
        initial={priority ? false : { opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0.7 }}
        onLoad={() => setLoaded(true)}
        transition={{ duration: 0.4 }}
        style={aspectRatio ? { aspectRatio } : undefined}
      />
    </span>
  );
}
