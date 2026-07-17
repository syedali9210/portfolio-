"use client";

import { Children, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

interface TextFlipProps {
  children: React.ReactNode;
  /** Whether the flip loop should run. */
  play?: boolean;
  /** Time each word stays visible, in ms. */
  interval?: number;
  className?: string;
}

/**
 * Cycles through its children with a vertical flip. Render one span per
 * word; pair with an invisible placeholder of the longest word in a grid
 * cell to reserve layout space.
 */
export function TextFlip({ children, play = true, interval = 2600, className }: TextFlipProps) {
  const words = Children.toArray(children);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!play || words.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [play, interval, words.length]);

  return (
    <span className={cn("relative inline-grid overflow-hidden", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={index}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="col-start-1 row-start-1 whitespace-nowrap"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
