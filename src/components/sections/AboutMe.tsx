"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import StickerDrag from "@/components/sticker-drag";
import { Tabs, TabsList, TabItem } from "@/components/ui/tabs";

// Photos that live in the drag-and-play frame.
const STICKER_TABS = [
  {
    value: "cats",
    label: "Cats",
    image: "/images/about/about-cats.jpg",
    rotation: -6,
    content:
      "Certified cat guy. Every street cat near me knows they're getting head scratches, no debate.",
  },
  {
    value: "chill",
    label: "Chill",
    image: "/images/about/about-chill.jpg",
    rotation: 4,
    content:
      "Corner seat, laptop open, iced coffee in hand. Allegedly working, mostly just vibing.",
  },
  {
    value: "music",
    label: "Music",
    image: "/images/about/about-music.jpg",
    rotation: -3,
    content:
      "Earphones in, world muted. Every project's basically got its own soundtrack.",
  },
  {
    value: "wild",
    label: "Me in wild",
    image: "/images/about/about-wild.jpg",
    rotation: 7,
    content:
      "Rare sighting of me outside my desk setup. Caught in a mirror, obviously.",
  },
];

// Photos are portrait shots (440x586 source) — keep the ratio at sticker size.
const PHOTO_W = 122;
const PHOTO_H = 162;

// Spotlight size, same ratio. Sized so photo + caption clear the frame's
// 320px min-height on mobile.
const SPOT_W = 150;
const SPOT_H = 200;

export default function AboutMe() {
  const [activeTab, setActiveTab] = useState(STICKER_TABS[0].value);
  const [spotlight, setSpotlight] = useState<string | null>(null);
  const mounted = useRef(false);

  // Where the spotlit photo starts from: the offset between its sticker's
  // resting slot and the centred spot it lands in. Measured, because the
  // landing spot is whatever the centred column works out to.
  const slotRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const landingRef = useRef<HTMLDivElement>(null);
  // Tagged with the tab it was measured for — `initial` is captured at mount,
  // so switching tabs must not let the photo start from the old tab's slot.
  const [flyFrom, setFlyFrom] = useState<{ value: string; x: number; y: number } | null>(null);

  useEffect(() => {
    mounted.current = true;
  }, []);

  useLayoutEffect(() => {
    if (!spotlight) {
      setFlyFrom(null);
      return;
    }
    const slot = slotRefs.current[spotlight];
    const landing = landingRef.current;
    if (!slot || !landing) return;
    const from = slot.getBoundingClientRect();
    const to = landing.getBoundingClientRect();
    setFlyFrom({
      value: spotlight,
      x: from.left + from.width / 2 - (to.left + to.width / 2),
      y: from.top + from.height / 2 - (to.top + to.height / 2),
    });
  }, [spotlight]);

  // Escape closes the sticker spotlight.
  useEffect(() => {
    if (!spotlight) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSpotlight(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [spotlight]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Switching tabs raises the associated sticker above a site-wide blur.
    if (mounted.current) setSpotlight(value);
  };

  const spotlightTab = STICKER_TABS.find((t) => t.value === spotlight);

  return (
    <section
      id="about-me"
      className="screen-line-top screen-line-bottom mx-auto w-full max-w-[680px] py-12 sm:py-20"
    >
      <SectionHeading>/About me</SectionHeading>

      <FadeIn className="screen-line-top screen-line-bottom mt-6 px-4 py-6 sm:px-6">
        <p className="text-base leading-relaxed text-muted-foreground">
          Engineering student who somehow landed in design, lol. Product designer, UI/UX guy,
          design engineer, whatever you wanna call me, i&apos;ll answer to it.
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Honestly i just like taking an idea and actually shipping it, something people can use
          for real. Watching a random 2am thought turn into an actual product hits different, way
          more than it should.
        </p>
      </FadeIn>

      <FadeIn delay={0.05} className="mt-6 px-4 sm:px-6">
        <Tabs value={activeTab} onValueChange={(v) => handleTabChange(v as string)}>
          <div className="screen-line-bottom pb-4">
            <TabsList className="flex-wrap">
              {STICKER_TABS.map((tab) => (
                <TabItem key={tab.value} value={tab.value} label={tab.label} />
              ))}
            </TabsList>
          </div>
        </Tabs>
      </FadeIn>

      {/* Drag and play frame */}
      <FadeIn delay={0.1} className="mt-6 px-4 sm:px-6">
        <div className="relative min-h-[320px] overflow-visible rounded-xl bg-secondary p-6 sm:min-h-[420px] sm:p-10 dark:bg-card">
          <span className="pointer-events-none absolute left-4 top-3 text-base text-muted-foreground">
            *drag and play
          </span>

          <div className="mt-6 flex h-full flex-wrap items-center justify-around gap-6">
            {STICKER_TABS.map((tab) => (
              <div
                key={tab.value}
                ref={(el) => {
                  slotRefs.current[tab.value] = el;
                }}
                // Hidden while spotlit so the photo reads as having lifted out
                // of this slot rather than being cloned.
                style={{
                  rotate: `${tab.rotation}deg`,
                  visibility: spotlight === tab.value ? "hidden" : "visible",
                }}
              >
                <StickerDrag image={tab.image} imageWidth={PHOTO_W} imageHeight={PHOTO_H} />
              </div>
            ))}
          </div>

          {/* Spotlight stays inside the frame: blurs the stickers behind it and
              grows the picked photo up out of its sticker size/rotation.
              z sits above the drag z-index counter (starts at 1000). */}
          <AnimatePresence>
            {spotlightTab && (
              <motion.div
                key={spotlightTab.value}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 z-[2000] flex flex-col items-center justify-center gap-4 rounded-xl bg-secondary/50 px-6 text-center backdrop-blur-md sm:px-10 dark:bg-card/50"
                onClick={() => setSpotlight(null)}
              >
                {/* Reserves the landing box so it can be measured on the first
                    layout pass; the photo drops in on the second. */}
                <div ref={landingRef} style={{ width: SPOT_W, height: SPOT_H }}>
                  {flyFrom?.value === spotlightTab.value && (
                    <motion.div
                      initial={{
                        x: flyFrom.x,
                        y: flyFrom.y,
                        scale: PHOTO_W / SPOT_W,
                        rotate: spotlightTab.rotation,
                      }}
                      animate={{ x: 0, y: 0, scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 220, damping: 24 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <StickerDrag
                        image={spotlightTab.image}
                        imageWidth={SPOT_W}
                        imageHeight={SPOT_H}
                        peeled
                      />
                    </motion.div>
                  )}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <p className="text-xl font-medium text-foreground">{spotlightTab.label}</p>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                    {spotlightTab.content}
                  </p>
                </motion.div>

                <button
                  type="button"
                  onClick={() => setSpotlight(null)}
                  aria-label="Close"
                  className="absolute right-3 top-3 rounded-lg px-2 py-1 text-base text-muted-foreground transition-colors hover:text-foreground"
                >
                  ✕
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </FadeIn>
    </section>
  );
}
