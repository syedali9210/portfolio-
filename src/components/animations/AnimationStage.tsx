"use client";

import { useState, type ReactNode } from "react";
import { RotateCcw } from "lucide-react";

// Forces a clean remount of the demo on click (key bump on the wrapper)
// instead of a bespoke reset API per demo — these range from a canvas
// scratch surface to a rAF-driven SVG walk cycle to a registered custom
// element, so "unmount and mount fresh" is the one restart mechanism that
// works identically across all of them.
export default function AnimationStage({ children }: { children: ReactNode }) {
  const [resetKey, setResetKey] = useState(0);

  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-card p-6 shadow-[var(--shadow-3)] sm:p-10">
      <button
        type="button"
        onClick={() => setResetKey((k) => k + 1)}
        aria-label="Restart animation"
        title="Restart animation"
        className="absolute top-3 right-3 z-10 flex size-7 shrink-0 items-center justify-center rounded-md bg-card text-muted-foreground shadow-[var(--shadow-2)] transition-colors hover:bg-muted hover:text-foreground"
      >
        <RotateCcw className="size-3.5" />
      </button>
      <div key={resetKey} className="contents">
        {children}
      </div>
    </div>
  );
}
