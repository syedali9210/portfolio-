"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

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

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="screen-line-top screen-line-bottom flex w-full items-center justify-between px-3 py-1 text-left sm:px-4"
      >
        <p className="text-base text-[#7a7a7a]">*Yapping each aspect</p>
        <span
          className="text-[#7a7a7a] transition-transform duration-300"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          {">"}
        </span>
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
              <div key={item.n} className="screen-line-bottom flex gap-6 px-3 py-4 sm:gap-10 sm:px-4">
                <div className="flex shrink-0 items-center gap-2">
                  <Image src="/images/numbered-item-arrow.svg" alt="" width={21} height={12} />
                  <span className="text-base text-white">[{item.n}]</span>
                </div>
                <p className="text-base text-[#7a7a7a]">{item.text}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
