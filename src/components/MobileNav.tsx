"use client";

import ScrubberTabBar from "@/components/ScrubberTabBar";
import PageSwitchTab from "@/components/PageSwitchTab";
import { useActiveSection } from "@/hooks/use-active-section";
import { NAV_ITEMS } from "@/components/Nav";

export default function MobileNav() {
  const activeId = useActiveSection(NAV_ITEMS.map((item) => item.id)) ?? NAV_ITEMS[0].id;

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex items-center justify-center gap-3 px-4 sm:hidden">
      <ScrubberTabBar
        items={NAV_ITEMS.map((item) => ({ key: item.id, label: item.label }))}
        activeKey={activeId}
        onSelect={(id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
        gapClassName="gap-8"
        aria-label="Section navigation"
      />
      <PageSwitchTab />
    </div>
  );
}
