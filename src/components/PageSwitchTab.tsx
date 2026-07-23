"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, Sparkles } from "lucide-react";
import { Elevated } from "@/lib/elevated";

/**
 * Mobile/tablet-only switch between the portfolio and the animations
 * showcase — a single circular tab that sits beside whichever bottom nav bar
 * is on screen (MobileNav on the portfolio, AnimationsMobileNav under
 * /animations), rather than floating separately at the top-right corner
 * (that's the desktop treatment — see AnimationsSwitch).
 *
 * Shows one icon at a time: the *destination*, not the current page — on
 * the portfolio it shows Sparkles (tap to go to Animations); once there, it
 * shows Briefcase (tap to come back). The icon flips the moment you land on
 * the other side, so it's always inviting you toward the other place.
 */
export default function PageSwitchTab() {
  const pathname = usePathname();
  const onAnimations = pathname?.startsWith("/animations") ?? false;
  const Icon = onAnimations ? Briefcase : Sparkles;
  const href = onAnimations ? "/" : "/animations";
  const label = onAnimations ? "Switch to portfolio" : "Switch to animations";

  return (
    <Elevated offset={3} className="rounded-full">
      <Link
        href={href}
        aria-label={label}
        title={label}
        className="flex size-11 items-center justify-center rounded-full text-foreground"
      >
        <Icon size={18} strokeWidth={1.75} />
      </Link>
    </Elevated>
  );
}
