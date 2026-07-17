"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunMediumIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useClickSound } from "@/hooks/use-click-sound";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ThemeSwitcherProps {
  className?: string;
}

/**
 * Icon button that flips light/dark with a click sound and a view
 * transition (crossfade) where supported.
 */
export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [click] = useClickSound();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const switchTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const handleClick = () => {
    click();
    if (!document.startViewTransition) switchTheme();
    else document.startViewTransition(switchTheme);
  };

  return (
    <Button
      variant="secondary"
      size="icon"
      aria-label="Toggle theme"
      onClick={handleClick}
      className={cn("size-6 rounded-md", className)}
    >
      {mounted ? (
        <>
          <MoonIcon className="hidden [html.dark_&]:block" />
          <SunMediumIcon className="hidden [html.light_&]:block" />
        </>
      ) : (
        <span className="size-4" />
      )}
    </Button>
  );
}
