"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(MotionPathPlugin);
}

// Isometric staircase path — a simplified stand-in for the maze artwork,
// climbing left-to-right so the buddy visibly recedes into the distance.
const PATH_D =
  "M40,330 L160,390 L280,330 L400,390 L520,330 L640,270 L760,210 L880,150 L1000,90";

const SCALE_START = 1.15;
const SCALE_END = 0.55;

export default function MazePetBuddy() {
  const svgRef = useRef<SVGSVGElement>(null);
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

    const tl = gsap.timeline({ paused: reduce, repeat: -1, repeatDelay: 1.2 });
    tl.set(pet, { scale: SCALE_START }, 0).to(
      pet,
      {
        motionPath: {
          path: PATH_D,
          alignOrigin: [0.5, 1],
        },
        scale: SCALE_END,
        duration: 6,
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
      <svg
        ref={svgRef}
        viewBox="0 0 1040 434"
        preserveAspectRatio="none"
        className="size-full"
        onClick={restart}
        role="button"
        aria-label="Restart the pet buddy's walk"
      >
        {/* depth: a darker offset "riser" copy beneath the path, plus vertical
            connector ticks at each vertex, so the isometric line reads as a
            walkway with height rather than a flat stroke */}
        <path
          d={PATH_D}
          transform="translate(0,10)"
          fill="none"
          stroke="#000000"
          strokeOpacity="0.55"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {[
          [40, 330],
          [160, 390],
          [280, 330],
          [400, 390],
          [520, 330],
          [640, 270],
          [760, 210],
          [880, 150],
          [1000, 90],
        ].map(([x, y]) => (
          <line
            key={`${x}-${y}`}
            x1={x}
            y1={y}
            x2={x}
            y2={y + 10}
            stroke="#000000"
            strokeOpacity="0.4"
            strokeWidth="1.5"
          />
        ))}
        <path
          d={PATH_D}
          fill="none"
          stroke="#3e3e3e"
          strokeWidth="1.5"
          strokeDasharray="10 8"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

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
