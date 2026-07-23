"use client";

import { Map, Hand, MousePointerClick, IdCard, Eye, SlidersVertical } from "lucide-react";
import { Tabs, TabsList, TabItem } from "@/components/ui/tabs";
import { Elevated } from "@/lib/elevated";
import { useActiveSection } from "@/hooks/use-active-section";
import { ANIMATIONS } from "@/data/animations";

const ICONS = {
  "maze-walk": Map,
  hello: Hand,
  "tab-hop": MousePointerClick,
  "notch-card": IdCard,
  "scratch-card": Eye,
  "nav-scrubber": SlidersVertical,
} as const;

// Mobile section nav for the /animations page — separate from the
// portfolio's own MobileNav (that one jumps between Projects/About
// me/etc., which don't exist on this page) and from
// MobileAnimationsSwitch (which flips between the portfolio and this
// showcase entirely, not between sections within it).
export default function AnimationsMobileNav() {
  const ids = ANIMATIONS.map((entry) => entry.id);
  const activeId = useActiveSection(ids);

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 sm:hidden">
      <Elevated offset={3} className="inline-flex rounded-3xl">
        <Tabs
          value={activeId}
          onValueChange={(id) => {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          <TabsList aria-label="Animation navigation" className="gap-1">
            {ANIMATIONS.map((entry) => (
              <TabItem
                key={entry.id}
                value={entry.id}
                label={entry.name}
                icon={ICONS[entry.id as keyof typeof ICONS]}
                iconOnly
                className="h-11 w-11"
              />
            ))}
          </TabsList>
        </Tabs>
      </Elevated>
    </div>
  );
}
