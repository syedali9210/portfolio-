"use client";

import { useState } from "react";
import DynamicInfoCard from "@/components/DynamicInfoCard";
import FadeIn from "@/components/FadeIn";
import PetBuddyGreeting from "@/components/PetBuddyGreeting";
import ScratchCard from "@/components/ScratchCard";
import SectionHeading from "@/components/SectionHeading";
import { Tabs, TabsList, TabItem, TabPanel } from "@/components/ui/tabs";

const TABS = [
  { value: "blog-space", label: "Blog space" },
  { value: "archive", label: "Archive" },
];

export default function MySpace() {
  const [tab, setTab] = useState("blog-space");

  return (
    <section
      id="my-space"
      className="screen-line-top screen-line-bottom mx-auto w-full max-w-[680px] py-12 sm:py-20"
    >
      <SectionHeading>/My Space</SectionHeading>

      <FadeIn delay={0.1} className="mt-6 px-4 sm:px-6">
        <Tabs value={tab} onValueChange={(v) => setTab(v as string)}>
          <div className="screen-line-bottom pb-4">
            <TabsList>
              {TABS.map((t) => (
                <TabItem key={t.value} value={t.value} label={t.label} />
              ))}
            </TabsList>
          </div>

          <TabPanel value="blog-space" className="mt-6">
            <p className="text-base leading-relaxed text-muted-foreground">
              So building this portfolio, glued to my desk, earphones in, i randomly got the idea to
              make my own pet buddy, kinda like Claude&apos;s mascot but mine.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              There&apos;s hidden pet buddy animations scattered across the site too, hover over stuff
              and you might catch one.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Ngl i wanna make this pet buddy a certified banger. Next version&apos;s getting better
              interactions, more animation, more texture, more feelings, basically bringing it fully
              alive. Stay tuned :)
            </p>

            <div className="mt-8 flex w-full items-center justify-center rounded-xl bg-card p-6 sm:p-10">
              <PetBuddyGreeting text="Hii! 👋" size={140} />
            </div>
          </TabPanel>

          <TabPanel value="archive" className="mt-6">
            <p className="mb-8 text-base leading-relaxed text-muted-foreground">
              Welcome to my little experiment zone, anything and everything ends up here
              eventually :)
            </p>
            <div className="flex min-h-[320px] w-full flex-col items-center justify-center gap-6 rounded-xl p-6 text-center sm:min-h-[420px] sm:p-10">
              <div className="w-full max-w-[420px]">
                <ScratchCard
                  caption="Scratch to reveal"
                  reveal={
                    <div className="relative h-full w-full">
                      <div className="relative w-full origin-top scale-[0.85] pt-6">
                        <DynamicInfoCard variant="embedded" />
                      </div>
                    </div>
                  }
                />
              </div>
              <p className="max-w-lg text-base text-muted-foreground">
                *scratch the card to reveal it, then hover to watch it do its thing.
              </p>
            </div>
          </TabPanel>
        </Tabs>
      </FadeIn>
    </section>
  );
}
