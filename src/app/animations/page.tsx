import PetBuddyGreeting from "@/components/PetBuddyGreeting";
import { ANIMATIONS } from "@/data/animations";

export const metadata = {
  title: "Animations — Syed Ali",
  description:
    "Animations I've rebuilt, recreated, or just couldn't stop thinking about until I tried making them myself — live, interactive, with the story behind each one.",
};

export default function AnimationsGreeting() {
  return (
    <div className="mx-auto w-full max-w-[680px] px-4 py-16 sm:px-6">
      <section>
        <p className="text-[24px] font-medium tracking-tight text-foreground">Welcome 👋</p>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          This is where I keep the animations I&apos;ve rebuilt, recreated, or just couldn&apos;t stop
          thinking about until I tried making them myself.
        </p>
        <div className="mt-8">
          <PetBuddyGreeting text="Hii! 👋" size={130} />
        </div>
      </section>

      <section className="mt-20">
        <p className="mb-6 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
          How it all started
        </p>
        <div className="space-y-4">
          <p className="text-base leading-relaxed text-muted-foreground">
            It started while I was building this portfolio — glued to my desk, earphones in, hunting
            for inspiration. Every time I found an animation I loved, admiring it wasn&apos;t enough; I
            had to know how it actually worked, so I&apos;d try to rebuild it myself from scratch.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            Somewhere in there I made a pixel pet buddy to keep me company on the site, kind of like
            Claude&apos;s own mascot, and once I had a handful of these little experiments built I
            realized the result wasn&apos;t really the interesting part — the process was. How I found
            each one, what broke, what I learned rebuilding it, where I want to take it next.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            So this is that place. Everything here is real, live, and interactive — pick one from the
            nav to see it in action and read the story behind it. New stuff shows up whenever I get
            nerd-sniped by something new.
          </p>
        </div>
      </section>

      <section className="mt-16">
        <p className="mb-4 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
          Start with
        </p>
        <div className="flex flex-col gap-1">
          {ANIMATIONS.map((entry) => (
            <a
              key={entry.id}
              href={`/animations/${entry.id}`}
              className="group flex items-center justify-between rounded-lg px-3 py-2.5 -mx-3 transition-colors hover:bg-muted"
            >
              <span className="text-base text-foreground">{entry.name}</span>
              <span className="text-muted-foreground transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
