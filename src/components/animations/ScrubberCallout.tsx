import { ArrowLeft, ArrowDown } from "lucide-react";

// Not a second scrubber — the real one (this page's own left-rail nav on
// desktop, bottom bar on mobile) already is the demo. This just points at it
// instead of duplicating it.
export default function ScrubberCallout() {
  return (
    <div className="flex min-h-[220px] w-full flex-col items-center justify-center gap-3 text-center">
      <ArrowLeft className="hidden size-6 text-muted-foreground lg:block" aria-hidden />
      <ArrowDown className="size-6 text-muted-foreground lg:hidden" aria-hidden />
      <p className="max-w-xs text-base text-muted-foreground">
        <span className="hidden lg:inline">This page&apos;s own left-rail scrubber</span>
        <span className="lg:hidden">This page&apos;s own bottom nav bar</span> is the real thing — drag it,
        click it, or use the arrow keys to jump between these sections.
      </p>
    </div>
  );
}
