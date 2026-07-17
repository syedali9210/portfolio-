"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type ScrubberItem = {
  id: string;
  label: string;
};

const TICK_COUNT = 32;

export default function Scrubber({ items }: { items: ScrubberItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  useEffect(() => {
    if (!items.length) return;
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (draggingRef.current) return;
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

  const active = items[activeIndex];

  function indexFromClientY(clientY: number) {
    const track = trackRef.current;
    if (!track) return activeIndex;
    const rect = track.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));
    return Math.round(ratio * (items.length - 1));
  }

  function goToIndex(idx: number, behavior: ScrollBehavior) {
    setActiveIndex(idx);
    document.getElementById(items[idx].id)?.scrollIntoView({ behavior, block: "start" });
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    draggingRef.current = true;
    setIsDragging(true);
    try {
      trackRef.current?.setPointerCapture(e.pointerId);
    } catch {
      // Synthetic/unsupported pointer id — dragging still works via move events.
    }
    goToIndex(indexFromClientY(e.clientY), "smooth");
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    const idx = indexFromClientY(e.clientY);
    if (idx !== activeIndex) goToIndex(idx, "smooth");
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    draggingRef.current = false;
    setIsDragging(false);
    try {
      trackRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      // No-op if capture was never established.
    }
  }

  const playheadPercent = items.length > 1 ? (activeIndex / (items.length - 1)) * 100 : 0;
  const showLabel = isDragging || isHovering;

  return (
    <div className="fixed left-8 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
      <div className="relative">
        <div
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerEnter={() => setIsHovering(true)}
          onPointerLeave={() => setIsHovering(false)}
          role="slider"
          aria-orientation="vertical"
          aria-label="Section navigation"
          aria-valuemin={0}
          aria-valuemax={items.length - 1}
          aria-valuenow={activeIndex}
          aria-valuetext={active.label}
          tabIndex={0}
          onFocus={() => setIsHovering(true)}
          onBlur={() => setIsHovering(false)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") goToIndex(Math.min(items.length - 1, activeIndex + 1), "smooth");
            if (e.key === "ArrowUp") goToIndex(Math.max(0, activeIndex - 1), "smooth");
          }}
          className="relative flex h-64 w-8 cursor-pointer touch-none flex-col items-center rounded-full border border-border bg-card py-3 outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          {/* The tick strip is the positioning context so 0%/100% land on the
              first/last tick instead of overshooting into the pill's padding. */}
          <div className="relative flex h-full w-full flex-col items-center justify-between">
            {Array.from({ length: TICK_COUNT }).map((_, i) => (
              <span key={i} className="h-px w-3 shrink-0 bg-muted-foreground/30" />
            ))}
            {/* Playhead in the pet buddy's terracotta */}
            <div
              className="pointer-events-none absolute left-1/2 h-1 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#db744f] transition-[top] duration-300 ease-out"
              style={{ top: `${playheadPercent}%` }}
            />
          </div>
        </div>

        <div
          className={cn(
            "pointer-events-none absolute left-full ml-3 -translate-y-1/2 whitespace-nowrap rounded-lg border border-border bg-card px-3 py-1.5 font-mono text-[13px] text-muted-foreground shadow-lg transition-opacity duration-200",
            showLabel ? "opacity-100" : "opacity-0"
          )}
          style={{ top: `calc(12px + (100% - 24px) * ${playheadPercent / 100})` }}
        >
          {active.label}
        </div>
      </div>
    </div>
  );
}
