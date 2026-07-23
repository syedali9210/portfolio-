import { ArrowLeft, ArrowDown } from "lucide-react";

// Not a boxed demo — the real nav is already on screen. Desktop gets the
// left-rail link list (AnimationsNavRail); mobile gets the drag-to-step
// scrubber strip (AnimationsMobileNav) at the bottom. This just points at
// whichever one is actually visible instead of duplicating either.
export default function ScrubberCallout() {
  return (
    <div className="flex min-h-[220px] w-full flex-col items-center justify-center gap-3 text-center">
      <ArrowLeft className="hidden size-6 text-muted-foreground lg:block" aria-hidden />
      <ArrowDown className="size-6 text-muted-foreground lg:hidden" aria-hidden />
      <p className="max-w-xs text-base text-muted-foreground">
        <span className="hidden lg:inline">This page&apos;s own left-rail nav</span>
        <span className="lg:hidden">
          This page&apos;s own bottom nav — press it, then hold and drag left or right
        </span>{" "}
        is the real thing.
      </p>
    </div>
  );
}
