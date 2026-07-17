"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import type { ChevronsUpDownIconHandle } from "@/components/chevrons-up-down-icon";
import { ChevronsUpDownIcon } from "@/components/chevrons-up-down-icon";

const ITEMS = [
  {
    n: "01",
    text: "I never open Figma first. I start with the problem, sit with it, understand what the user is actually struggling with before a single screen exists. Design without that is just decoration.",
  },
  {
    n: "02",
    text: "once the problem is clear, I build flows and interfaces around one thing, clarity. Every screen gets stripped down until only what earns its place stays. If it does not help the user move forward, it gets cut, no matter how nice it looks.",
  },
];

export default function YappingAccordion() {
  const [open, setOpen] = useState(true);
  const chevronsRef = useRef<ChevronsUpDownIconHandle>(null);

  useEffect(() => {
    const controls = chevronsRef.current;
    if (!controls) return;

    if (open) {
      controls.startAnimation();
    } else {
      controls.stopAnimation();
    }
  }, [open]);

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="screen-line-top screen-line-bottom flex w-full items-center gap-2 px-4 py-2 text-left sm:px-6"
      >
        <p className="text-base text-muted-foreground">*Yapping each aspect</p>
        <ChevronsUpDownIcon
          ref={chevronsRef}
          duration={0.2}
          className="size-4 text-muted-foreground"
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            {ITEMS.map((item) => (
              <div key={item.n} className="screen-line-bottom flex gap-6 px-4 py-4 sm:gap-10 sm:px-6">
                <div className="flex shrink-0 items-center gap-2">
                  <Image src="/images/numbered-item-arrow.svg" alt="" width={21} height={12} />
                  <span className="text-base text-foreground">[{item.n}]</span>
                </div>
                <p className="text-base text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
