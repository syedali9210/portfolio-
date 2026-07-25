import type { ComponentType } from "react";
import PetBuddyPathHero from "@/components/PetBuddyPathHero";
import PetBuddyGreeting from "@/components/PetBuddyGreeting";
import TabHopDemo from "@/components/animations/TabHopDemo";
import NotchCardDemo from "@/components/animations/NotchCardDemo";
import ScratchCardDemo from "@/components/animations/ScratchCardDemo";
import ScrubberCallout from "@/components/animations/ScrubberCallout";
import MazeWalkPlayable from "@/components/animations/MazeWalkPlayable";

export interface AnimationEntry {
  id: string;
  name: string;
  // Used for the card-grid preview thumbnail (and the full page, if
  // FullDemo isn't set).
  Demo: ComponentType;
  // Optional full-page-only override — e.g. an interactive variant that
  // wouldn't make sense shrunk down inside a grid card.
  FullDemo?: ComponentType;
  // One-line card-grid description.
  blurb: string;
}

// Every Demo here is a real, live component this site already ships
// elsewhere (Hero's maze, My Space's greeting/archive, the design system's
// Tabs) — these are thin display wrappers around them, not reimplementations.
export const ANIMATIONS: AnimationEntry[] = [
  {
    id: "maze-walk",
    name: "Maze Walk",
    Demo: PetBuddyPathHero,
    FullDemo: MazeWalkPlayable,
    blurb:
      "An isometric maze walkway where a pixel pet paces the centerline, chased by a cursor-following spotlight.",
  },
  {
    id: "hello",
    name: "Hello",
    Demo: PetBuddyGreeting,
    blurb:
      "The same pixel pet, idling by a sign — a native web component that tracks your cursor and reaches out to it.",
  },
  {
    id: "tab-hop",
    name: "Tab Hop",
    Demo: TabHopDemo,
    blurb:
      "A tab switcher where the mascot physically leaps to whichever tab you pick, squash and stretch included.",
  },
  {
    id: "notch-card",
    name: "Info Notch Card",
    Demo: NotchCardDemo,
    blurb:
      "A MacBook-notch-styled info card that grows on hover to reveal contact links and an availability badge.",
  },
  {
    id: "scratch-card",
    name: "Scratch Card",
    Demo: ScratchCardDemo,
    blurb:
      "Scratch a foil surface off with a real canvas brush to reveal whatever's hiding underneath.",
  },
  {
    id: "nav-scrubber",
    name: "Nav Scrubber",
    Demo: ScrubberCallout,
    blurb:
      "The drag-to-step scrubber powering this very page's own navigation, with a haptic buzz per step.",
  },
];
