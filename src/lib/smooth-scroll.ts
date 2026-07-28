import type Lenis from "lenis";

// The header is fixed and overlays the top of the viewport (Nav portals into
// #nav-root; PageTransition reserves the space with pt-16), so a section
// scrolled flush to y=0 would sit underneath it. Everything that jumps to a
// section backs off by roughly the header's height.
const NAV_OFFSET = 72;

let lenis: Lenis | null = null;

/** Called by SmoothScroll as it creates/tears down the instance. */
export function registerLenis(instance: Lenis | null) {
  lenis = instance;
}

/**
 * Jump to a same-page section by element or id.
 *
 * Native `scrollIntoView({ behavior: "smooth" })` silently does nothing while
 * Lenis is running: Lenis drives window scroll from its own rAF loop, so it
 * overwrites the browser's in-progress smooth scroll every frame and the page
 * never leaves where Lenis thinks it should be. (Instant native scrolls appear
 * to work only because Lenis re-syncs from the resulting scroll event — which
 * is why this bug looked like "some jumps work, the smooth ones don't".)
 *
 * So: route through Lenis whenever it's active, and fall back to the native
 * path when it isn't — reduced-motion users, where SmoothScroll never builds
 * an instance, and the first layout effect of a cold load, which runs before
 * SmoothScroll's own effect has constructed one.
 */
export function scrollToSection(target: Element | string, { immediate = false } = {}) {
  const el = typeof target === "string" ? document.getElementById(target) : target;
  if (!el) return;

  // Resolve to an absolute document offset here rather than handing Lenis the
  // element. Lenis measures an element target against its *own* internal
  // scroll, which can be a frame stale or out of sync with the real one right
  // after a route change — that desync silently doubled the offset (landing at
  // 2 x the section's position). `rect.top + scrollY` is self-consistent no
  // matter what either scroll value is mid-flight, so the number is exact.
  const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET);

  if (lenis) {
    lenis.scrollTo(top, { immediate });
    return;
  }
  window.scrollTo({ top, behavior: immediate ? "auto" : "smooth" });
}

/** Same Lenis-vs-native reasoning as above, for the top of a fresh route. */
export function scrollToTop({ immediate = true } = {}) {
  if (lenis) {
    lenis.scrollTo(0, { immediate });
    return;
  }
  window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
}
