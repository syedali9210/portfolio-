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
