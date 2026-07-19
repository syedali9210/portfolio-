"use client";

import { Layers, Rocket, User, Mail } from "lucide-react";
import { Tabs, TabsList, TabItem } from "@/components/ui/tabs";
import { Elevated } from "@/lib/elevated";
import { useActiveSection } from "@/hooks/use-active-section";
import { NAV_ITEMS } from "@/components/Nav";

const ICONS = {
  projects: Layers,
  "my-space": Rocket,
  "about-me": User,
  contact: Mail,
} as const;

export default function MobileNav() {
  const activeId = useActiveSection(NAV_ITEMS.map((item) => item.id));

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 sm:hidden">
      <Elevated offset={3} className="inline-flex rounded-3xl">
        <Tabs
          value={activeId}
          onValueChange={(id) => {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          <TabsList aria-label="Section navigation" className="gap-2">
            {NAV_ITEMS.map((item) => (
              <TabItem
                key={item.id}
                value={item.id}
                label={item.label}
                icon={ICONS[item.id as keyof typeof ICONS]}
                iconOnly
                className="h-11 w-11"
              />
            ))}
          </TabsList>
        </Tabs>
      </Elevated>
    </div>
  );
}
