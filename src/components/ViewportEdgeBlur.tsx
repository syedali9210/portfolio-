/**
 * Fixed, non-interactive blur bands pinned to the top and bottom of the
 * viewport. Content scrolling underneath fades into a soft blur near each
 * edge instead of cutting off hard — the mask gradient tapers the blur's
 * own opacity, not just its content, so it reads as a graduated scrim
 * rather than a sharp glass panel.
 */
export default function ViewportEdgeBlur() {
  const maskTop = "linear-gradient(to bottom, black, black 30%, transparent)";
  const maskBottom = "linear-gradient(to top, black, black 30%, transparent)";

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-30 h-20 sm:h-28"
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          maskImage: maskTop,
          WebkitMaskImage: maskTop,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 bottom-0 z-30 h-20 sm:h-28"
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          maskImage: maskBottom,
          WebkitMaskImage: maskBottom,
        }}
      />
    </>
  );
}
