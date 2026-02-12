import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
};

const pageTransition = { duration: 0.35, ease: [0.16, 1, 0.3, 1] };

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const motionSection = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
};

export const motionStagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
};

export const motionImageReveal = {
  initial: { opacity: 0, scale: 1.03 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "0px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};
