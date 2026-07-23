"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

// Same fade+rise recipe FadeIn uses for content appearing on scroll
// (opacity+y, house ease [0.22,1,0.36,1]) — reused here as a route-change
// crossfade so navigating between pages reads with the same motion language
// as everything else on the site, instead of Next's default instant cut.
// Keyed on pathname only (not the full URL), so in-page hash navigation
// (/#projects, /#about-me) never retriggers it — only real route changes do.
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-1 flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
