import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TABS = [
  {
    value: "about-me",
    label: "About me",
    content: "More about me, coming soon.",
  },
  {
    value: "experience",
    label: "Experience",
    content: "Experience timeline coming soon.",
  },
  {
    value: "side-quests",
    label: "Side quests",
    content: "A collection of side projects and experiments coming soon.",
  },
  {
    value: "inside-my-brain",
    label: "Inside my brain",
    content: "Notes, references and things rattling around in my head, coming soon.",
  },
];

export default function MySpace() {
  return (
    <section
      id="my-space"
      className="screen-line-top screen-line-bottom mx-auto w-full max-w-[1040px] border-x-[0.5px] border-border px-2 py-10 sm:px-4"
    >
      <SectionHeading>/My Space</SectionHeading>

      <FadeIn className="mt-10 px-2 sm:px-3">
        <p className="text-lg leading-relaxed text-[#7a7a7a] sm:text-xl">
          From developing my own portfolio to making my own pet buddy like Claude, this idea came to
          my mind while i was glued to my desk while making my portfolio with my earphones on.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-[#7a7a7a] sm:text-xl">
          There are some hidden animations of the pet buddy across my portfolio, which you can see
          while hovering over the elements.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-[#7a7a7a] sm:text-xl">
          I want to make my pet buddy a completely banger pet buddy. The upcoming version of it will
          have better interactions, animation, more texture and more feelings to it, stay tuned to
          see the Pet Buddy coming fully alive :)
        </p>
      </FadeIn>

      <FadeIn delay={0.1} className="mt-8 px-2 sm:px-3">
        <Tabs defaultValue="about-me">
          <TabsList className="h-auto w-fit gap-4 bg-transparent p-0">
            {TABS.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-xl bg-[rgba(84,84,84,0.1)] px-4 py-2 text-sm font-medium text-muted-foreground data-active:bg-[rgba(84,84,84,0.25)] data-active:text-[#fafafa]"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {TABS.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-6">
              <div className="flex min-h-[320px] w-full items-center justify-center rounded-xl bg-[#1f1f1f] p-10 text-center sm:min-h-[520px]">
                <p className="max-w-lg text-lg text-[#7a7a7a]">{tab.content}</p>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </FadeIn>
    </section>
  );
}
