"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import StickerDrag from "@/components/sticker-drag";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Photo prints (white-bordered, 488x635) that live in the drag-and-play frame.
const STICKER_TABS = [
  {
    value: "cats",
    label: "Cats",
    image: "/images/about/about-cats.jpg",
    rotation: -6,
    content:
      "Certified cat person. Every street cat in the neighborhood gets head scratches on sight.",
  },
  {
    value: "chill",
    label: "Chill",
    image: "/images/about/about-chill.jpg",
    rotation: 4,
    content:
      "A corner seat, the laptop, an iced coffee — allegedly work, mostly vibes.",
  },
  {
    value: "music",
    label: "Music",
    image: "/images/about/about-music.jpg",
    rotation: -3,
    content:
      "Earphones on, world off. Every project has its own playlist.",
  },
  {
    value: "wild",
    label: "Me in wild",
    image: "/images/about/about-wild.jpg",
    rotation: 7,
    content:
      "Rare footage of me outside the desk setup. Spotted in a mirror, as usual.",
  },
];

// Photos are portrait prints (488x635 source) — keep the ratio at sticker size.
const PHOTO_W = 122;
const PHOTO_H = 159;

// Timeline measured from the reference clip (motiscope): content appears,
// the glow blooms with ease-out cubic-bezier(0,0,.58,1) peaking ~0.8s in,
// breathes for a beat, then items land with a ~96ms stagger.
const GLOW_EASE: [number, number, number, number] = [0, 0, 0.58, 1];
const FALL_AT_MS = 1900;
const STAGGER_S = 0.096;

export default function AboutMe() {
  const [activeTab, setActiveTab] = useState(STICKER_TABS[0].value);
  const [spotlight, setSpotlight] = useState<string | null>(null);
  const mounted = useRef(false);

  // "hidden" → (frame scrolls into view) "loading" (photos hover with the
  // glow) → "landed" (photos fall into the frame and become draggable).
  const frameRef = useRef<HTMLDivElement>(null);
  const frameInView = useInView(frameRef, { once: true, margin: "-20% 0px" });
  const reducedMotion = useReducedMotion();
  const [fallen, setFallen] = useState(false);

  useEffect(() => {
    if (!frameInView || fallen) return;
    const t = setTimeout(() => setFallen(true), FALL_AT_MS);
    return () => clearTimeout(t);
  }, [frameInView, fallen]);

  const phase: "hidden" | "loading" | "landed" = !frameInView
    ? "hidden"
    : fallen || reducedMotion
      ? "landed"
      : "loading";

  useEffect(() => {
    mounted.current = true;
  }, []);

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
          An engineering student that somehow ended up in design. A product designer, UI/UX
          designer, a design engineer... call me whatever you want.
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          At the end of the day, I just like bringing ideas to life and shipping things that people
          can actually use. Turns out watching something go from a random thought to a real product
          is way more fun than it should be.
        </p>
      </FadeIn>

      <FadeIn delay={0.05} className="mt-6 px-4 sm:px-6">
        <Tabs value={activeTab} onValueChange={(v) => handleTabChange(v as string)}>
          <div className="screen-line-bottom pb-4">
            <TabsList className="h-auto w-fit flex-wrap gap-4 bg-transparent p-0">
              {STICKER_TABS.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-xl bg-secondary px-4 py-2 text-base font-medium text-muted-foreground data-active:bg-foreground data-active:text-background"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </Tabs>
      </FadeIn>

      {/* Drag and play frame */}
      <FadeIn delay={0.1} className="mt-6 px-4 sm:px-6">
        <div
          ref={frameRef}
          className="relative min-h-[320px] overflow-visible rounded-xl bg-card p-6 sm:min-h-[420px] sm:p-10"
        >
          <span className="pointer-events-none absolute left-4 top-3 text-base text-muted-foreground">
            *drag and play
          </span>

          <div className="mt-6 flex h-full flex-wrap items-center justify-around gap-6">
            {STICKER_TABS.map((tab, i) => (
              <motion.div
                key={tab.value}
                initial={{ y: -170, opacity: 0 }}
                animate={
                  phase === "hidden"
                    ? { y: -170, opacity: 0 }
                    : phase === "loading"
                      ? { y: -170, opacity: 1 }
                      : { y: 0, opacity: 1 }
                }
                transition={
                  phase === "landed"
                    ? {
                        y: { type: "spring", stiffness: 320, damping: 17, delay: i * STAGGER_S },
                        opacity: { duration: 0.2 },
                      }
                    : { duration: 0.35, ease: GLOW_EASE, delay: i * 0.05 }
                }
                className="relative"
              >
                {/* Apple Intelligence-style loading glow, blooms while the
                    photo "loads" and fades as it falls into the frame */}
                <motion.div
                  aria-hidden
                  initial={{ opacity: 0 }}
                  animate={{ opacity: phase === "loading" ? 1 : 0 }}
                  transition={
                    phase === "loading"
                      ? { duration: 0.4, ease: GLOW_EASE, delay: 0.55 + i * 0.05 }
                      : { duration: 0.45, ease: "easeOut", delay: i * STAGGER_S }
                  }
                  className="photo-glow pointer-events-none absolute -inset-2 rounded-2xl"
                />
                <div
                  className={cn(
                    "transition-[filter,transform] duration-300",
                    activeTab === tab.value ? "grayscale-0" : "grayscale hover:grayscale-0"
                  )}
                  style={{ rotate: `${tab.rotation}deg` }}
                >
                  <StickerDrag image={tab.image} imageWidth={PHOTO_W} imageHeight={PHOTO_H} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Site-wide blur with the selected sticker raised above it */}
      <AnimatePresence>
        {spotlightTab && (
          <motion.div
            key={spotlightTab.value}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[3000] flex items-center justify-center bg-background/40 backdrop-blur-lg"
            onClick={() => setSpotlight(null)}
          >
            <motion.div
              initial={{ y: 80, scale: 0.7 }}
              animate={{ y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="flex max-w-sm flex-col items-center gap-6 px-6 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ rotate: `${spotlightTab.rotation}deg` }}>
                <Image
                  src={spotlightTab.image}
                  alt={spotlightTab.label}
                  width={220}
                  height={286}
                  className="drop-shadow-[0px_13px_14px_rgba(0,0,0,0.3)]"
                />
              </div>
              <div>
                <p className="text-xl font-medium text-foreground">{spotlightTab.label}</p>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                  {spotlightTab.content}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSpotlight(null)}
                className="rounded-xl bg-secondary px-4 py-2 text-base text-foreground transition-colors hover:bg-secondary/70"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
