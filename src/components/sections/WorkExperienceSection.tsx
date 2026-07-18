import { BriefcaseIcon } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import { WorkExperience, type ExperienceItemType } from "@/components/work-experience";

const WORK_EXPERIENCE: ExperienceItemType[] = [
  {
    id: "basenine",
    companyName: "BASENINE",
    companyLogo: "/images/icon-basenine.jpeg",
    companyWebsite: "#",
    positions: [
      {
        id: "1",
        title: "Product Designer Intern",
        employmentPeriod: { start: "02.2026" },
        employmentType: "Intern",
        icon: <BriefcaseIcon />,
        description:
          "- Designed and developed end-to-end web experiences for client products including Kodex and Uniqkey.\n" +
          "- Translated high-fidelity Figma designs into pixel-perfect, responsive interfaces using React, Next.js, TypeScript, and Tailwind CSS.\n" +
          "- Built reusable UI components and contributed to scalable design systems for faster product development.\n" +
          "- Implemented smooth interactions, micro-animations, and polished user experiences using GSAP and modern CSS.\n" +
          "- Collaborated with founders, product managers, designers, and engineers to take products from concept to production.\n" +
          "- Worked on internal tools and workflow improvements to streamline design-to-development handoff and increase team efficiency.",
        skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Figma", "GSAP", "Framer Motion"],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: true,
  },
];

export default function WorkExperienceSection() {
  return (
    <section
      id="experience"
      className="mx-auto w-full max-w-[680px] py-12 sm:py-20"
    >
      <SectionHeading>/Experience</SectionHeading>

      <FadeIn className="mt-6">
        <WorkExperience experiences={WORK_EXPERIENCE} className="w-full sm:px-6" />
      </FadeIn>
    </section>
  );
}
