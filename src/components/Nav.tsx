"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/use-active-section";

// Absolute ("/#hash") rather than bare ("#hash") so these still work when
// clicked from a sub-page like /projects/[slug] instead of silently
// rewriting the URL hash with nothing on the page to scroll to.
export const NAV_ITEMS = [
  { id: "projects", label: "Projects", href: "/#projects" },
  { id: "about-me", label: "About me", href: "/#about-me" },
  { id: "my-space", label: "My Space", href: "/#my-space" },
  { id: "contact", label: "Contact", href: "/#contact" },
];

export default function Nav() {
  const [time, setTime] = useState<string | null>(null);
  const activeId = useActiveSection(NAV_ITEMS.map((item) => item.id));
  // These are hash-links into Home's own sections — meaningless on the
  // Animations pages, which don't have a "Projects" or "Contact" section to
  // jump to.
  const pathname = usePathname();
  const showSectionNav = !pathname?.startsWith("/animations");

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    update();
    const id = setInterval(update, 1000 * 30);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto flex w-full max-w-[680px] items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/#home" className="text-base text-muted-foreground">
          Syed.Ali
        </Link>

        {showSectionNav && (
          <nav className="hidden items-center gap-2 rounded-full bg-muted p-1.5 sm:flex">
            <div className="flex items-center gap-6 sm:gap-10">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-full px-2 py-1 text-base font-medium tracking-tight transition-colors",
                    activeId === item.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        )}

        <span className="hidden text-base text-muted-foreground tabular-nums sm:inline">
          {time ?? " "}
        </span>
      </div>
    </header>
  );
}
