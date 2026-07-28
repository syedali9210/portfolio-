"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

// House ease [0.22,1,0.36,1] (same curve as FadeIn/SmoothScroll) applied to
// a horizontal slide instead of a fade — the incoming page slides in from
// the right while the outgoing one slides out to the left, so route changes
// read as lateral navigation rather than Next's default instant cut.
// Keyed on pathname only (not the full URL), so in-page hash navigation
// (/#projects, /#about-me) never retriggers it — only real route changes do.
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // The new page can be much shorter than whatever you were scrolled to on
  // the old one — mounting it without resetting scroll leaves the viewport
  // parked past all of its content. Reset synchronously, before paint, on
  // every pathname change rather than off AnimatePresence's onExitComplete:
  // with mode="wait" that fired at the instant the old tree had fully
  // unmounted and the new one hadn't mounted yet, i.e. while the screen had
  // nothing in it but the near-black page background — worse, that gap could
  // stretch for a while when the incoming page (Home) does heavy synchronous
  // mount work, which read as the whole screen going black. popLayout below
  // keeps the outgoing page mounted (absolutely positioned) while the new
  // one mounts immediately, so there's never an empty-DOM moment.
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: 32 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -32 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        // pt-16 makes room for Nav's fixed header, which no longer reserves
        // space in flow now that it's portaled out to #nav-root.
        className="flex flex-1 flex-col pt-16"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
