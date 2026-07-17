"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CopyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  text: string;
}

export function CopyButton({
  text,
  className,
  variant = "secondary",
  size = "icon-sm",
  children,
  onClick,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable (permissions/insecure context) — do nothing.
    }
  };

  const Icon = copied ? CheckIcon : CopyIcon;

  return (
    <button
      type="button"
      aria-label={copied ? "Copied" : "Copy"}
      className={cn(buttonVariants({ variant, size }), className)}
      onClick={handleCopy}
      {...props}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "check" : "copy"}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          transition={{ duration: 0.12 }}
          className="inline-flex items-center"
        >
          <Icon className="size-3.5" />
        </motion.span>
      </AnimatePresence>
      {children}
    </button>
  );
}
