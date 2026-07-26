"use client";

import { useState, type ReactNode } from "react";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

// Forces a clean remount of the demo on click (key bump on the wrapper)
// instead of a bespoke reset API per demo — these range from a canvas
// scratch surface to a rAF-driven SVG walk cycle to a registered custom
// element, so "unmount and mount fresh" is the one restart mechanism that
// works identically across all of them.
export default function AnimationStage({
  children,
  fullscreen = false,
}: {
  children: ReactNode;
  fullscreen?: boolean;
}) {
  const [resetKey, setResetKey] = useState(0);

  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden",
        fullscreen
          ? "h-full bg-background"
          : "rounded-2xl bg-card p-6 shadow-[var(--shadow-3)] sm:p-10"
      )}
    >
      <button
        type="button"
        onClick={() => setResetKey((k) => k + 1)}
        aria-label="Restart animation"
        title="Restart animation"
        className={cn(
          "absolute flex shrink-0 items-center justify-center text-muted-foreground shadow-[var(--shadow-2)] transition-colors hover:bg-muted hover:text-foreground",
          fullscreen
            ? // Beside AnimationsChrome's hide-nav toggle — top-right on
              // mobile (AnimationsMobileNav owns the bottom row there),
              // bottom-right from sm up (AnimationsSwitch owns top-right
              // at that size, AnimationsMobileNav is gone). z-50 (not the
              // z-10 the card variant uses) so it sits above
              // ViewportEdgeBlur's fixed blur bands (z-30) instead of
              // rendering underneath/blurred by them.
              "top-4 right-16 z-50 size-9 rounded-full bg-card/80 backdrop-blur sm:top-auto sm:right-20 sm:bottom-6"
            : "top-3 right-3 z-10 size-7 rounded-md bg-card"
        )}
      >
        <RotateCcw className={fullscreen ? "size-4" : "size-3.5"} />
      </button>
      <div key={resetKey} className="contents">
        {children}
      </div>
    </div>
  );
}
