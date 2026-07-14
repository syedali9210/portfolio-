import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";

const COLLAGE_OFFSETS = ["sm:translate-y-0", "sm:translate-y-10", "sm:-translate-y-4"];

export default function AboutMe() {
  return (
    <section id="about-me" className="mx-auto w-full max-w-[1040px] border-x border-border px-2 py-10 sm:px-4">
      <SectionHeading>/About me</SectionHeading>

      <FadeIn className="mt-10 border-y border-border px-2 py-6 sm:px-3">
        <p className="text-lg leading-relaxed text-[#7a7a7a] sm:text-xl">
          An engineering student that somehow ended up in design. A product designer, UI/UX
          designer, a design engineer... call me whatever you want.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-[#7a7a7a] sm:text-xl">
          At the end of the day, I just like bringing ideas to life and shipping things that people
          can actually use. Turns out watching something go from a random thought to a real product
          is way more fun than it should be.
        </p>
      </FadeIn>

      <FadeIn delay={0.1} className="mt-10 overflow-hidden rounded-xl bg-[#1f1f1f] p-6 sm:p-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {COLLAGE_OFFSETS.map((offset, i) => (
            <div key={i} className={`flex flex-col gap-3 ${offset}`}>
              <div className="aspect-square w-full rounded-md bg-[#878787]/20" />
              <div className="aspect-[255/103] w-full rounded-md bg-[#878787]/20" />
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
