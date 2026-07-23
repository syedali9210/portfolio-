"use client";

import { usePathname, useRouter } from "next/navigation";
import ScrubberTabBar from "@/components/ScrubberTabBar";
import PageSwitchTab from "@/components/PageSwitchTab";
import { ANIMATIONS } from "@/data/animations";

const NAVIGABLE = [
  { key: "greeting", label: "Animations", href: "/animations" },
  ...ANIMATIONS.map((a) => ({ key: a.id, label: a.name, href: `/animations/${a.id}` })),
];

/**
 * Mobile/tablet section nav for the /animations pages — same ScrubberTabBar
 * mechanic as the portfolio's own MobileNav, just route-based instead of
 * scroll-based: onSelect pushes a route instead of scrolling to an id.
 *
 * Renders beside PageSwitchTab (the circular Portfolio/Animations toggle) in
 * the same fixed bottom row — that one flips between the portfolio and this
 * showcase entirely, not between entries within it. Separate from
 * AnimationsSwitch (the desktop-only equivalent of PageSwitchTab, fixed to
 * the top-right corner instead).
 */
export default function AnimationsMobileNav() {
  const pathname = usePathname();
  const router = useRouter();
  const activeKey = NAVIGABLE.find((r) => r.href === pathname)?.key ?? NAVIGABLE[0].key;

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex items-center justify-center gap-3 px-4 sm:hidden">
      <ScrubberTabBar
        items={NAVIGABLE.map(({ key, label }) => ({ key, label }))}
        activeKey={activeKey}
        onSelect={(key) => {
          const row = NAVIGABLE.find((r) => r.key === key);
          if (row) router.push(row.href);
        }}
        aria-label="Animation navigation"
      />
      <PageSwitchTab />
    </div>
  );
}
