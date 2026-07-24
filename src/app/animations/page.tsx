import PetBuddyGreeting from "@/components/PetBuddyGreeting";
import AnimationsGrid from "@/components/animations/AnimationsGrid";

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
          thinking about until I tried making them myself — starting back when I was glued to my desk
          building this very portfolio. Everything below is real, live, and interactive: pick one to
          see it in action.
        </p>
        <div className="mt-8">
          <PetBuddyGreeting text="Hii! 👋" size={130} />
        </div>
      </section>

      <AnimationsGrid />
    </div>
  );
}
