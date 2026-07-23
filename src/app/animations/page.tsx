import Nav from "@/components/Nav";
import MobileAnimationsSwitch from "@/components/MobileAnimationsSwitch";
import AnimationsMobileNav from "@/components/AnimationsMobileNav";
import Scrubber from "@/components/Scrubber";
import AnimationSection from "@/components/animations/AnimationSection";
import Contact from "@/components/sections/Contact";
import { ANIMATIONS } from "@/data/animations";

export const metadata = {
  title: "Animations — Syed Ali",
  description:
    "Animations I've rebuilt, recreated, or just couldn't stop thinking about until I tried making them myself — live, interactive, with the story behind each one.",
};

const SCRUBBER_ITEMS = ANIMATIONS.map((entry) => ({ id: entry.id, label: entry.name }));

export default function AnimationsPage() {
  return (
    <>
      <Nav />
      <MobileAnimationsSwitch />
      <Scrubber items={SCRUBBER_ITEMS} />
      <AnimationsMobileNav />
      <main className="flex flex-1 flex-col pb-24 sm:pb-0">
        <div className="mx-auto w-full max-w-[680px] px-4 pt-10 sm:px-6">
          <p className="text-xl font-medium text-foreground">Animations</p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Every one of these is live and real — the exact same component running elsewhere on this
            site, dropped in here on its own with the story behind how it got built.
          </p>
        </div>
        {ANIMATIONS.map((entry) => (
          <AnimationSection key={entry.id} entry={entry} />
        ))}
      </main>
      <Contact />
    </>
  );
}
