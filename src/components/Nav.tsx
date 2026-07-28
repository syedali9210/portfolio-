"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useIsPresent } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/use-active-section";
import { scrollToSection } from "@/lib/smooth-scroll";

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

  // The standard portal handshake: the target node can't be read during
  // render (it doesn't exist server-side), so it's resolved once after mount
  // and the first client render falls back to rendering inline. That single
  // extra render is inherent to portalling, not an accidental cascade.
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- portal target must be read post-mount; see above
    setPortalTarget(document.getElementById("nav-root"));
  }, []);

  // Portaling escapes PageTransition's animated wrapper (see above), which
  // also means this stops inheriting that wrapper's exit opacity/position —
  // without this, a page mid-exit would render its own full-opacity header
  // stacked on top of the incoming page's. useIsPresent reflects the
  // ancestor AnimatePresence's state via React context (unaffected by where
  // the DOM node ends up), so the outgoing page's nav can just disappear
  // immediately instead of needing to fade or wait for unmount.
  const isPresent = useIsPresent();
  if (!isPresent) return null;

  const header = (
    <header className="fixed inset-x-0 top-0 z-50 w-full">
      <div className="mx-auto flex w-full max-w-[680px] items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/#home" className="text-base text-muted-foreground">
          Syed.Ali
        </Link>

        {showSectionNav && (
          <nav className="hidden items-center gap-2 rounded-full bg-muted px-1.5 py-1 sm:flex">
            <div className="flex items-center gap-6 sm:gap-10">
              {NAV_ITEMS.map((item) => (
                // Link, not a bare <a>: these point at "/#section", so from a
                // sub-page like /projects/[slug] a plain anchor made the
                // browser do a full document load just to get back Home.
                // Cross-route clicks now navigate client-side and land on the
                // section via PageTransition's hash restore; same-page clicks
                // are handled below, since the pathname doesn't change and
                // that effect would never fire.
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    if (pathname !== "/") return;
                    e.preventDefault();
                    scrollToSection(item.id);
                    window.history.replaceState(null, "", item.href);
                  }}
                  className={cn(
                    "flex items-center rounded-full px-2 py-1 text-base font-medium tracking-tight transition-colors",
                    activeId === item.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
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

  return portalTarget ? createPortal(header, portalTarget) : header;
}
