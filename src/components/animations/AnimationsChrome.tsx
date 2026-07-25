"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Nav from "@/components/Nav";
import AnimationsSwitch from "@/components/AnimationsSwitch";
import AnimationsNavRail from "@/components/AnimationsNavRail";
import AnimationsMobileNav from "@/components/AnimationsMobileNav";
import Contact from "@/components/sections/Contact";

// /animations/[slug] pages render their Demo fullscreen — the one place on
// the site where the persistent chrome (Nav, the nav rail/mobile scrubber,
// Contact) sits on top of the thing you actually came to look at, so it's
// the only route that gets a toggle to hide it entirely. The toggle button
// itself always stays mounted regardless of its own state, otherwise
// hiding the chrome would strand you with no way to bring it back.
export default function AnimationsChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDemoPage = /^\/animations\/[^/]+$/.test(pathname ?? "");
  const [chromeHidden, setChromeHidden] = useState(false);
  const showChrome = !isDemoPage || !chromeHidden;

  return (
    <>
      {showChrome && (
        <>
          <Nav />
          <AnimationsSwitch />
          <AnimationsNavRail />
          <AnimationsMobileNav />
        </>
      )}

      <main className={isDemoPage ? "flex flex-1 flex-col" : "flex flex-1 flex-col pb-24 sm:pb-0"}>
        {children}
      </main>

      {showChrome && !isDemoPage && <Contact />}

      {isDemoPage && (
        <button
          type="button"
          onClick={() => setChromeHidden((hidden) => !hidden)}
          aria-label={chromeHidden ? "Show navigation" : "Hide navigation"}
          title={chromeHidden ? "Show navigation" : "Hide navigation"}
          // Top-right on mobile (AnimationsMobileNav owns the bottom row
          // there), bottom-right from sm up (AnimationsSwitch owns
          // top-right at that size instead).
          className="fixed top-4 right-4 z-50 flex size-9 items-center justify-center rounded-full bg-card/80 text-foreground shadow-[var(--shadow-2)] backdrop-blur transition-colors hover:bg-muted sm:top-auto sm:right-6 sm:bottom-6"
        >
          {chromeHidden ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
        </button>
      )}
    </>
  );
}
