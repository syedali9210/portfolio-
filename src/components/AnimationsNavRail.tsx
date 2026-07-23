"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { ANIMATIONS } from "@/data/animations";

const ACCENT = "#db744f";
const SPRING = { type: "spring" as const, bounce: 0.25, duration: 0.35 };

interface NavRow {
  key: string;
  label: string;
  href: string;
}

const ROWS: NavRow[] = [
  { key: "greeting", label: "Animations", href: "/animations" },
  ...ANIMATIONS.map((a) => ({ key: a.id, label: a.name, href: `/animations/${a.id}` })),
];

// Hoisted to module scope on purpose: a fresh function identity per render
// would remount every row instead of updating it in place, so `animate`
// would restart from its initial value each time (see ScrubberNav's `Row`
// for the fuller version of this note).
function Row({ row, isHighlighted, onHoverStart, onHoverEnd }: {
  row: NavRow;
  isHighlighted: boolean;
  onHoverStart: (key: string) => void;
  onHoverEnd: () => void;
}) {
  return (
    <Link
      href={row.href}
      onMouseEnter={() => onHoverStart(row.key)}
      onMouseLeave={onHoverEnd}
      className="flex items-center gap-2 py-0.5 outline-none focus-visible:opacity-70"
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
        {row.label}
      </motion.span>
    </Link>
  );
}

// Desktop nav for the /animations pages. The portfolio's own Scrubber syncs
// to scroll position within a single page (IntersectionObserver over
// same-page sections) — that mechanism doesn't fit here, since each
// animation is now its own route. This is the route-based equivalent:
// same visual language (line+label pairs, terracotta highlight), driven by
// the current pathname instead of scroll position.
export default function AnimationsNavRail() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);

  const activeKey = ROWS.find((r) => r.href === pathname)?.key ?? ROWS[0].key;
  const highlightKey = hovered ?? activeKey;

  return (
    <nav className="fixed left-8 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
      <div className="flex flex-col gap-1">
        {ROWS.map((row) => (
          <Row
            key={row.key}
            row={row}
            isHighlighted={row.key === highlightKey}
            onHoverStart={setHovered}
            onHoverEnd={() => setHovered(null)}
          />
        ))}
      </div>
    </nav>
  );
}
