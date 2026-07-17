"use client";

import { useState } from "react";
import DynamicInfoCard from "@/components/DynamicInfoCard";
import FadeIn from "@/components/FadeIn";
import PetBuddyGreeting from "@/components/PetBuddyGreeting";
import ScratchCard from "@/components/ScratchCard";
import SectionHeading from "@/components/SectionHeading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
            <TabsList className="h-auto w-fit gap-4 bg-transparent p-0">
              {TABS.map((t) => (
                <TabsTrigger
                  key={t.value}
                  value={t.value}
                  className="rounded-xl bg-secondary px-4 py-2 text-base font-medium text-muted-foreground data-active:bg-foreground data-active:text-background"
                >
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="blog-space" className="mt-6">
            <p className="text-base leading-relaxed text-muted-foreground">
              From developing my own portfolio to making my own pet buddy like Claude, this idea came to
              my mind while i was glued to my desk while making my portfolio with my earphones on.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              There are some hidden animations of the pet buddy across my portfolio, which you can see
              while hovering over the elements.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              I want to make my pet buddy a completely banger pet buddy. The upcoming version of it will
              have better interactions, animation, more texture and more feelings to it, stay tuned to
              see the Pet Buddy coming fully alive :)
            </p>

            <div className="mt-8 flex w-full items-center justify-center rounded-xl bg-card p-6 sm:p-10">
              <PetBuddyGreeting text="Hii! 👋" size={140} />
            </div>
          </TabsContent>

          <TabsContent value="archive" className="mt-6">
            <p className="mb-8 text-base leading-relaxed text-muted-foreground">
              Welcome to the space where I keep on experimenting with things, anything and everything
              will be put up in this area :)
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
                *Scratch the card to reveal it, then hover to see it in action.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </FadeIn>
    </section>
  );
}
