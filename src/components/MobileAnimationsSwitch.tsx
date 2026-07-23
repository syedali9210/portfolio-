"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Elevated } from "@/lib/elevated";

const OPTIONS = [
  { id: "portfolio", href: "/", label: "Portfolio", icon: Briefcase },
  { id: "animations", href: "/animations", label: "Animations", icon: Sparkles },
] as const;

/**
 * Mobile-only switch between the portfolio and the animations showcase —
 * deliberately a separate fixed control from both Nav's header (which
 * collapses to just the wordmark below `sm`) and MobileNav's bottom section
 * bar (which is for jumping between sections within whichever view is
 * active, not for switching views).
 */
export default function MobileAnimationsSwitch() {
  const pathname = usePathname();
  const activeId = pathname?.startsWith("/animations") ? "animations" : "portfolio";

  return (
    <div className="fixed top-3 right-4 z-50 sm:hidden">
      <Elevated offset={2} className="flex items-center gap-0.5 rounded-full p-1">
        {OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const isActive = activeId === opt.id;
          return (
            <Link
              key={opt.id}
              href={opt.href}
              aria-label={opt.label}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex size-8 items-center justify-center rounded-full transition-colors",
                isActive ? "bg-muted text-foreground" : "text-muted-foreground"
              )}
            >
              <Icon size={16} strokeWidth={isActive ? 2 : 1.5} />
            </Link>
          );
        })}
      </Elevated>
    </div>
  );
}
