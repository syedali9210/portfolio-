"use client";

import { useState } from "react";
import { Tabs, TabsList, TabItem, TabPanel } from "@/components/ui/tabs";

const TABS = [
  { value: "home", label: "Home" },
  { value: "projects", label: "Projects" },
  { value: "archive", label: "Archive" },
];

// The real design-system Tabs, with the pet-buddy mascot opted back in via
// TabsList's `petBuddy` prop — same component the live site uses everywhere
// else, just with the flag flipped on for this one demo.
export default function TabHopDemo() {
  const [value, setValue] = useState(TABS[0].value);

  return (
    <div className="flex min-h-[220px] w-full items-center justify-center">
      <Tabs value={value} onValueChange={(v) => setValue(v as string)}>
        <TabsList petBuddy>
          {TABS.map((tab) => (
            <TabItem key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </TabsList>
        {TABS.map((tab) => (
          <TabPanel key={tab.value} value={tab.value} className="sr-only">
            {tab.label}
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
}
