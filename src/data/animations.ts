import type { ComponentType } from "react";
import PetBuddyPathHero from "@/components/PetBuddyPathHero";
import PetBuddyGreeting from "@/components/PetBuddyGreeting";
import TabHopDemo from "@/components/animations/TabHopDemo";
import NotchCardDemo from "@/components/animations/NotchCardDemo";
import ScratchCardDemo from "@/components/animations/ScratchCardDemo";
import ScrubberCallout from "@/components/animations/ScrubberCallout";
import MazeWalkPlayable from "@/components/animations/MazeWalkPlayable";
import ChatQuiz from "@/components/animations/chat-quiz/ChatQuiz";

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
  // Date this entry shipped, ISO (YYYY-MM-DD). Drives the grid's sort order
  // (newest first) and how long the "New" badge shows — see isNew() below.
  addedAt: string;
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
    addedAt: "2026-07-23",
  },
  {
    id: "hello",
    name: "Hello",
    Demo: PetBuddyGreeting,
    blurb: "A tiny mascot way too hyped to see you.",
    addedAt: "2026-07-23",
  },
  {
    id: "tab-hop",
    name: "Tab Hop",
    Demo: TabHopDemo,
    blurb: "The mascot literally yeets itself between tabs.",
    addedAt: "2026-07-23",
  },
  {
    id: "notch-card",
    name: "Info Notch Card",
    Demo: NotchCardDemo,
    blurb: "A MacBook notch moonlighting as a business card.",
    addedAt: "2026-07-23",
  },
  {
    id: "scratch-card",
    name: "Scratch Card",
    Demo: ScratchCardDemo,
    blurb: "Scratch here. Yes, with your actual cursor.",
    addedAt: "2026-07-23",
  },
  {
    id: "nav-scrubber",
    name: "Nav Scrubber",
    Demo: ScrubberCallout,
    blurb: "The nav you're dragging right now. Meta, huh?",
    addedAt: "2026-07-23",
  },
  {
    id: "chat-quiz",
    name: "Chat Quiz",
    Demo: ChatQuiz,
    blurb: "An AI composer that interviews you before it helps.",
    addedAt: "2026-08-03",
  },
];

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

/** Shown "New" for the first week after `addedAt`. */
export function isNew(entry: AnimationEntry): boolean {
  return Date.now() - new Date(entry.addedAt).getTime() < WEEK_MS;
}

/** Newest first — an entry keeps its spot once it ages out of "New". */
export function byNewest(a: AnimationEntry, b: AnimationEntry): number {
  return b.addedAt.localeCompare(a.addedAt);
}
