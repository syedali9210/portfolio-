"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const OPTIONS = [
  { id: "portfolio", label: "Portfolio", href: "/" },
  { id: "animations", label: "Animations", href: "/animations" },
] as const;

/**
 * Top-level switch between the portfolio and the animations showcase.
 * Desktop-only — lives in Nav's top-right corner, next to the clock.
 * Mobile gets its own separate control (MobileAnimationsSwitch), since
 * Nav's header collapses to just the wordmark below `sm`.
 */
export default function AnimationsSwitch({ className }: { className?: string }) {
  const pathname = usePathname();
  const activeId = pathname?.startsWith("/animations") ? "animations" : "portfolio";

  return (
    <div className={cn("flex items-center gap-0.5 rounded-full bg-muted p-1", className)}>
      {OPTIONS.map((opt) => (
        <Link
          key={opt.id}
          href={opt.href}
          className={cn(
            "rounded-full px-2.5 py-1 text-[13px] font-medium whitespace-nowrap transition-colors",
            activeId === opt.id
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {opt.label}
        </Link>
      ))}
    </div>
  );
}
