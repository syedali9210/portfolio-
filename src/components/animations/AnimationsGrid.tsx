"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ANIMATIONS, byNewest, isNew, type AnimationEntry } from "@/data/animations";

// Each preview renders the real Demo component, scaled down and inert —
// same "live, interactive" components the full page uses, just muted here
// since a grid of cards isn't the place to actually drive them.
function AnimationCard({ entry }: { entry: AnimationEntry }) {
  const { Demo } = entry;
  // Six of these mount at once, each doing its own real setup work (SVG
  // construction, canvas painting, a custom-element upgrade) — landing on
  // this page via the route crossfade, that work competed with the
  // transition's first paint and stalled it into a blank flash. Deferring
  // the actual Demo mount by a frame lets the transition paint first.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <Link
      href={`/animations/${entry.id}`}
      className="group flex flex-col gap-3 rounded-2xl bg-card p-3 shadow-[var(--shadow-3)] transition-transform duration-300 hover:-translate-y-0.5"
    >
      {isNew(entry) && (
        <span className="w-fit rounded-md bg-secondary px-2 py-1 text-[11px] font-medium text-muted-foreground">
          New
        </span>
      )}

      <div className="relative flex h-[180px] w-full items-center justify-center overflow-hidden rounded-xl bg-muted">
        {/* Fixed width so each Demo lays out at the comfortable size it was
            built for (no cramped text-wrap), then scaled down as a whole to
            fit the card — shrinking a finished layout instead of forcing a
            narrow one. */}
        <div inert className="pointer-events-none flex w-[420px] shrink-0 origin-center scale-[0.6] items-center justify-center">
          {ready && <Demo />}
        </div>
      </div>

      <div className="px-1 pb-1">
        <p className="text-base font-medium text-foreground">{entry.name}</p>
        <p className="mt-1 truncate text-sm text-muted-foreground">{entry.blurb}</p>
      </div>
    </Link>
  );
}

export default function AnimationsGrid() {
  const sorted = [...ANIMATIONS].sort(byNewest);

  return (
    <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {sorted.map((entry) => (
        <AnimationCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
}
