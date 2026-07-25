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
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Animations that nerd-sniped me until I rebuilt them, fueled by way too much cold coffee.
          Poke around, it&apos;s all real.
        </p>
        <div className="mt-8">
          <PetBuddyGreeting text="Hii! 👋" size={130} />
        </div>
      </section>

      <AnimationsGrid />
    </div>
  );
}
