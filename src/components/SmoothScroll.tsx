"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { cubicBezier } from "@/lib/bezier";

// Same curve used across the site's own motion (Framer Motion transitions,
// e.g. Projects/YappingAccordion), so the scroll feel matches everything else.
const SCROLL_EASE = cubicBezier(0.22, 1, 0.36, 1);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      // `<html>` is pinned to 100% viewport height (see layout.tsx), so its
      // box never resizes as content grows — Lenis's default ResizeObserver
      // target would never fire and the scroll limit would go stale, capping
      // scroll short of the real bottom. `<body>` actually grows with content.
      content: document.body,
      duration: 1.1,
      easing: SCROLL_EASE,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
