"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { scrollToSection } from "@/lib/smooth-scroll";

const ACCENT = "#db744f";
const SPRING = { type: "spring" as const, bounce: 0.25, duration: 0.35 };

export type ScrubberItem = {
  id: string;
  label: string;
};

// Hoisted to module scope on purpose: a fresh function identity per render
// would remount every row instead of updating it in place, so `animate`
// would restart from its initial value each time (see AnimationsNavRail's
// `Row` for the fuller version of this note).
function Row({
  item,
  isHighlighted,
  onSelect,
  onHoverStart,
  onHoverEnd,
}: {
  item: ScrubberItem;
  isHighlighted: boolean;
  onSelect: (id: string) => void;
  onHoverStart: (id: string) => void;
  onHoverEnd: () => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item.id)}
      onMouseEnter={() => onHoverStart(item.id)}
      onMouseLeave={onHoverEnd}
      className="flex items-center gap-2 py-0.5 text-left outline-none focus-visible:opacity-70"
    >
      <motion.span
        animate={{ width: isHighlighted ? 22 : 10, backgroundColor: isHighlighted ? ACCENT : "var(--color-foreground)" }}
        transition={SPRING}
        className="h-px shrink-0 rounded-full"
      />
      <motion.span
        animate={{ x: isHighlighted ? 4 : 0, color: isHighlighted ? ACCENT : "var(--color-muted-foreground)" }}
        transition={SPRING}
        className="text-[13px] whitespace-nowrap"
      >
        {item.label}
      </motion.span>
    </button>
  );
}

// Same visual language as AnimationsNavRail (line+label rows, terracotta
// highlight) — but driven by scroll position within a single page
// (IntersectionObserver over same-page sections) instead of the current
// route, since these items are anchors, not pages.
export default function Scrubber({ items }: { items: ScrubberItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    if (!items.length) return;
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          const idx = items.findIndex((item) => item.id === visible[0].target.id);
          if (idx !== -1) setActiveIndex(idx);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.map((item) => item.id).join("|")]);

  if (!items.length) return null;

  const activeKey = items[activeIndex].id;
  const highlightKey = hovered ?? activeKey;

  function handleSelect(id: string) {
    scrollToSection(id);
  }

  return (
    <nav aria-label="Section navigation" className="fixed left-8 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
      <div className="flex flex-col gap-1">
        {items.map((item) => (
          <Row
            key={item.id}
            item={item}
            isHighlighted={item.id === highlightKey}
            onSelect={handleSelect}
            onHoverStart={setHovered}
            onHoverEnd={() => setHovered(null)}
          />
        ))}
      </div>
    </nav>
  );
}
