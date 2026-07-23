import type { ComponentType } from "react";
import PetBuddyPathHero from "@/components/PetBuddyPathHero";
import PetBuddyGreeting from "@/components/PetBuddyGreeting";
import TabHopDemo from "@/components/animations/TabHopDemo";
import NotchCardDemo from "@/components/animations/NotchCardDemo";
import ScratchCardDemo from "@/components/animations/ScratchCardDemo";
import ScrubberCallout from "@/components/animations/ScrubberCallout";

export interface AnimationStory {
  started: string;
  built: string;
  future: string;
}

export interface AnimationEntry {
  id: string;
  name: string;
  Demo: ComponentType;
  story: AnimationStory;
}

// Every Demo here is a real, live component this site already ships
// elsewhere (Hero's maze, My Space's greeting/archive, the design system's
// Tabs) — these are thin display wrappers around them, not reimplementations.
export const ANIMATIONS: AnimationEntry[] = [
  {
    id: "maze-walk",
    name: "Maze Walk",
    Demo: PetBuddyPathHero,
    story: {
      started:
        "I found a vanilla-JS reference for an isometric maze walkway and could not stop thinking about it — the pet walking back and forth along the centerline, pausing and bouncing at each end, a cursor-following spotlight revealing a glowing copy of the path edges wherever your mouse went. I liked it so much I decided to rebuild it pixel-for-pixel inside React instead of just admiring it from the sidelines.",
      built:
        "The hard part wasn't the walk cycle, it was keeping the geometry math identical to the original so the fidelity didn't drift — same polygon points, same isometric segments, same depth-based scaling so the buddy reads bigger the closer it gets to the bottom of the frame. I swapped `getElementById` and a global IIFE for refs and `requestAnimationFrame`, since that's how it has to work inside a component tree, but otherwise kept it a faithful port.",
      future:
        "I want to give the buddy more paths to choose from, maybe branch the maze and let it wander instead of just pacing back and forth. Day/night lighting on the walkway is on the list too.",
    },
  },
  {
    id: "hello",
    name: "Hello",
    Demo: PetBuddyGreeting,
    story: {
      started:
        "Same character and rig as the maze-walk hero, just idling next to a little sign instead of walking a path. I wanted a version of the buddy that felt less like a hero banner and more like a mascot that's just... there, hanging out, saying hi when you scroll past.",
      built:
        "It's registered as a real custom element (`<pet-buddy-greeting>`), not a React component, because the rig is a self-contained vanilla web component and `customElements.define` isn't something a React tree can do declaratively — so it gets loaded as a plain script and used like a native HTML tag. It's the friendly face of the whole My Space area.",
      future:
        "This is the idling foundation for a few planned pet buddy variants — better interactions, more texture, more expressions. I'd like it to notice the time of day, or greet you differently depending on which page brought you here.",
    },
  },
  {
    id: "tab-hop",
    name: "Tab Hop",
    Demo: TabHopDemo,
    story: {
      started:
        "Switching tabs with a plain sliding underline felt dead to me — I wanted the mascot to actually pick the tab instead of a second indicator quietly competing with the first one.",
      built:
        "It's a tiny version of the buddy that perches on top of whichever tab is active. On switch it leaps — crouch, arc through the air, squash and stretch on landing, with a little dust poof where it touches down. The whole thing is a handful of keyframed values (`y`, `rotate`, `scaleX`/`scaleY`) timed against a single 340ms hop, plus a direction flag so it leans into the jump the way something would if it were actually pushing off toward where it's going.",
      future:
        "I want it to remember which tab you visit most and get a little more excited hopping there, and I've been tempted to add a tiny landing sound. Long term, I'd like this same hop rig to work as a generic cursor-follower anywhere on the site, not just inside tabs.",
    },
  },
  {
    id: "notch-card",
    name: "Info Notch Card",
    Demo: NotchCardDemo,
    story: {
      started:
        "I wanted a persistent 'who is this' widget that didn't take up permanent space — something styled after a MacBook's screen notch, flush against the top, flat on top, rounded only on the bottom.",
      built:
        "Collapsed, it's just an avatar, name, and a live clock. Hover it (or tap it on mobile, since there's no hover there) and it grows downward to reveal social links and an availability badge. The trickiest bit was the 'ears' — the two curved pieces that carve the concave join between the flat top edge and the card's rounded bottom corners, the actual notch illusion. Each one is a clipped box holding an oversized, offset box-shadow copy of the card's own color, so only a quarter-circle sliver of it peeks through. It stays pure black regardless of site theme, because that's the real notch's actual color.",
      future:
        "I'd like the expanded state to show more — recent activity, maybe a status line I can update remotely without redeploying. A subtle idle animation while it's collapsed is on the list too.",
    },
  },
  {
    id: "scratch-card",
    name: "Scratch Card",
    Demo: ScratchCardDemo,
    story: {
      started:
        "I wanted to gate my portfolio's Archive tab behind a bit of friction instead of just showing everything immediately, and I'd been wanting an excuse to try the Framer University 'Image Scratch' technique for a while.",
      built:
        "It's a pixel-exact replica: a black card with a dotted foil surface that scratches off under a grungy brush to reveal whatever's hiding underneath — in this case, the hover-expand notch card above. The foil is a real overlay image painted onto a `<canvas>`, then erased along the pointer path using `destination-out` composite stamps of a custom brush texture, not a CSS mask trick. Coverage is tracked on a coarse 16×16 grid instead of reading canvas pixels every frame. Past ~70% coverage, the foil fades the rest of the way out on its own and hands control to whatever's underneath.",
      future:
        "I want to rotate what's hidden underneath periodically so revisiting the Archive tab is worth it, and maybe stack a few scratch cards side by side, each with a different reveal.",
    },
  },
  {
    id: "nav-scrubber",
    name: "Nav Scrubber",
    Demo: ScrubberCallout,
    story: {
      started:
        "A normal row of nav icons felt too static, and once these animations lived on their own pages instead of one long scroll, a plain tab bar felt like a step backward. I wanted moving between them to feel like scrubbing a timeline, not clicking a menu — and I wanted you to actually see the name of where you're going, not guess from an icon.",
      built:
        "On mobile it's a horizontally scrolling name strip: press it and it grows slightly, the 'picked up' cue, then hold and drag and it steps to the next or previous entry every 40px of travel, re-anchoring after each step so it never flip-flops near a boundary. Each step fires a short haptic buzz. Neighbors fade toward the pill's edges through a mask-image instead of just clipping, so it reads as one continuous scrub. Release and it navigates wherever you landed. Desktop gets a simpler cousin — a left-rail list of names, current page highlighted in terracotta, hover previewing the same treatment without disturbing the real selection.",
      future:
        "I want the drag threshold to ease slightly as you build up speed, like real scrubbing accelerates the faster you drag. A keyboard-driven fuzzy search so I can jump anywhere by typing is on the list too.",
    },
  },
];
