"use client";

import { useLayoutEffect } from "react";
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
