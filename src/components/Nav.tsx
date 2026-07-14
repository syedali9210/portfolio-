"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Projects", href: "#projects" },
  { label: "My Space", href: "#my-space" },
  { label: "About me", href: "#about-me" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [time, setTime] = useState<string | null>(null);
  const [active, setActive] = useState("#projects");

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

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.querySelector(item.href)).filter(
      (el): el is Element => !!el
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          setActive(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1040px] items-center justify-between border-x border-border px-5 py-3">
        <a href="#home" className="text-base text-muted-foreground">
          Syed.Ali
        </a>

        <nav className="flex items-center gap-2 rounded-full p-1">
          <div className="flex items-center gap-6 sm:gap-10">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-full px-2 py-1 text-sm font-medium tracking-tight transition-colors",
                  active === item.href
                    ? "text-[#d6d6d6]"
                    : "text-muted-foreground hover:text-[#d6d6d6]"
                )}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        <span className="hidden text-base text-muted-foreground tabular-nums sm:inline">
          {time ?? " "}
        </span>
      </div>

      <div className="pointer-events-none fixed left-8 top-1/2 hidden -translate-y-1/2 opacity-40 lg:block">
        <Image src="/images/menu-icon.svg" alt="" width={28} height={30} />
      </div>
    </header>
  );
}
