import type { AnimationEntry } from "@/data/animations";
import SectionHeading from "@/components/SectionHeading";
import FadeIn from "@/components/FadeIn";
import AnimationStage from "./AnimationStage";

const STORY_BEATS: { key: keyof AnimationEntry["story"]; label: string }[] = [
  { key: "started", label: "How it started" },
  { key: "built", label: "How I built it" },
  { key: "future", label: "What's next" },
];

export default function AnimationSection({ entry }: { entry: AnimationEntry }) {
  const { Demo } = entry;

  return (
    <section
      id={entry.id}
      className="screen-line-top screen-line-bottom mx-auto w-full max-w-[680px] py-12 sm:py-20"
    >
      <SectionHeading>/{entry.name}</SectionHeading>

      <FadeIn className="mt-6 px-4 sm:px-6">
        <AnimationStage>
          <Demo />
        </AnimationStage>

        <div className="mt-10 space-y-8">
          {STORY_BEATS.map((beat) => (
            <div key={beat.key}>
              <p className="mb-2 text-[11px] font-semibold tracking-wide text-foreground/50 uppercase">
                {beat.label}
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">{entry.story[beat.key]}</p>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
