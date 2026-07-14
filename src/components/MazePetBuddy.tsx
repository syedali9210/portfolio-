"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(MotionPathPlugin);
}

// The single unbranched "outer edge" traversal through the actual maze
// artwork's vertices (hero-banner-graphic.svg's isometric Union path) —
// lower-left to upper-right, so the buddy walks the real drawn path
// instead of an invented one.
const PATH_POINTS: [number, number][] = [
  [212, 228],
  [360, 143],
  [508, 228],
  [574, 190],
  [470, 130],
  [508, 108],
  [647, 28],
  [685, 50],
  [787, 108],
  [872, 59],
  [910, 81],
];
const PATH_D = `M${PATH_POINTS.map(([x, y]) => `${x},${y}`).join(" L")}`;

const SCALE_START = 1.3;
const SCALE_END = 0.55;

export default function MazePetBuddy() {
  const petRef = useRef<SVGGElement>(null);
  const legsRef = useRef<SVGGElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const pet = petRef.current;
    const legs = legsRef.current;
    if (!pet || !legs) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.set(pet, { xPercent: -50, yPercent: -100, transformOrigin: "50% 100%" });

    const walkCycle = gsap.to(legs, {
      rotate: 14,
      duration: 0.14,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      transformOrigin: "50% 0%",
      paused: true,
    });

    const tl = gsap.timeline({ paused: reduce, repeat: -1, repeatDelay: 1.4 });
    tl.set(pet, { scale: SCALE_START }, 0).to(
      pet,
      {
        motionPath: {
          path: PATH_D,
          alignOrigin: [0.5, 1],
        },
        scale: SCALE_END,
        duration: 6.5,
        ease: "none",
        onStart: () => walkCycle.play(),
        onComplete: () => walkCycle.pause(),
      },
      0
    );

    tlRef.current = tl;

    if (reduce) {
      gsap.set(pet, { scale: SCALE_START });
      tl.progress(0).pause();
    }

    return () => {
      tl.kill();
      walkCycle.kill();
    };
  }, []);

  const restart = () => {
    tlRef.current?.restart();
  };

  return (
    <div className="relative mx-auto hidden h-[280px] w-full max-w-[1040px] cursor-pointer overflow-hidden border-x-[0.5px] border-border sm:block sm:h-[340px] lg:h-[434px]">
      <Image
        src="/images/hero-banner-graphic.svg"
        alt=""
        fill
        className="pointer-events-none select-none object-cover"
        priority
      />

      <svg
        viewBox="0 0 1040 434"
        preserveAspectRatio="none"
        className="absolute inset-0 size-full"
        onClick={restart}
        role="button"
        aria-label="Restart the pet buddy's walk"
      >
        {/* the motion path itself is not drawn — the buddy walks along the
            artwork's own line, nothing extra painted on top of it */}
        <g ref={petRef}>
          <g
            filter="url(#petOutline)"
            transform="scale(0.16)"
            style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
          >
            <g fill="#db744f">
              <rect x="56" y="0" width="150" height="112" />
              <rect x="56" y="0" width="150" height="9" fill="#ec9a78" />
              <rect x="56" y="9" width="9" height="94" fill="#ec9a78" />
              <rect x="197" y="0" width="9" height="103" fill="#b95a3c" />
              <rect x="56" y="103" width="150" height="9" fill="#b95a3c" />
              <rect x="28" y="37" width="28" height="38" />
              <rect x="206" y="37" width="28" height="38" />
            </g>
            <g ref={legsRef} fill="#b95a3c">
              <rect x="70" y="112" width="19" height="44" fill="#8f4530" />
              <rect x="150" y="112" width="19" height="44" fill="#8f4530" />
              <rect x="93" y="112" width="19" height="30" />
              <rect x="188" y="112" width="19" height="30" />
            </g>
            <g fill="#141414">
              <rect x="75" y="19" width="19" height="19" />
              <rect x="169" y="19" width="19" height="19" />
              <rect x="78" y="22" width="5" height="5" fill="#fff" />
              <rect x="172" y="22" width="5" height="5" fill="#fff" />
            </g>
          </g>
        </g>

        <defs>
          <filter id="petOutline" x="-25%" y="-25%" width="150%" height="150%">
            <feMorphology in="SourceAlpha" operator="dilate" radius="3.4" result="d" />
            <feFlood floodColor="#8f4530" />
            <feComposite in2="d" operator="in" result="o" />
            <feMerge>
              <feMergeNode in="o" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
}
