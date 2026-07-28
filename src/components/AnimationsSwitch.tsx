"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { Elevated } from "@/lib/elevated";
import LogoMarkIcon from "@/components/icons/LogoMarkIcon";

const OPTIONS = [
  { id: "portfolio", href: "/", label: "Portfolio" },
  { id: "animations", href: "/animations", label: "Animations" },
] as const;

/**
 * Desktop/tablet switch between the portfolio and the animations showcase —
 * fixed to the viewport's top-right corner, outside the centered content
 * column. Below `sm`, PageSwitchTab takes over instead: a single circular
 * tab that sits beside the bottom nav bar rather than floating up top.
 */
export default function AnimationsSwitch() {
  const pathname = usePathname();
  const activeId = pathname?.startsWith("/animations") ? "animations" : "portfolio";

  return (
    <div className="fixed top-3 right-4 z-50 hidden sm:block">
      <Elevated offset={2} className="flex items-center gap-0.5 rounded-full p-1">
        {OPTIONS.map((opt) => {
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
              {opt.id === "animations" ? (
                <LogoMarkIcon className="size-4" />
              ) : (
                <Briefcase size={16} strokeWidth={isActive ? 2 : 1.5} />
              )}
            </Link>
          );
        })}
      </Elevated>
    </div>
  );
}
