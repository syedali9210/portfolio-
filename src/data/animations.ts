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
  // Short, funny, single-line card-grid blurb.
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
    blurb: "A pixel pet forever pacing an isometric maze.",
  },
  {
    id: "hello",
    name: "Hello",
    Demo: PetBuddyGreeting,
    blurb: "A tiny mascot way too hyped to see you.",
  },
  {
    id: "tab-hop",
    name: "Tab Hop",
    Demo: TabHopDemo,
    blurb: "The mascot literally yeets itself between tabs.",
  },
  {
    id: "notch-card",
    name: "Info Notch Card",
    Demo: NotchCardDemo,
    blurb: "A MacBook notch moonlighting as a business card.",
  },
  {
    id: "scratch-card",
    name: "Scratch Card",
    Demo: ScratchCardDemo,
    blurb: "Scratch here. Yes, with your actual cursor.",
  },
  {
    id: "nav-scrubber",
    name: "Nav Scrubber",
    Demo: ScrubberCallout,
    blurb: "The nav you're dragging right now. Meta, huh?",
  },
];
