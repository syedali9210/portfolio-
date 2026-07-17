import { BriefcaseIcon } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import { WorkExperience, type ExperienceItemType } from "@/components/work-experience";

// Company/role/dates are real; description + skills are still placeholder — swap those in too.
const WORK_EXPERIENCE: ExperienceItemType[] = [
  {
    id: "basenine",
    companyName: "BASENINE",
    companyLogo: "/images/dock-icon-16.png",
    companyWebsite: "#",
    positions: [
      {
        id: "1",
        title: "Product Designer Intern",
        employmentPeriod: { start: "02.2026" },
        employmentType: "Intern",
        icon: <BriefcaseIcon />,
        description: "- Swap this placeholder for your real work experience.\n- Add bullet points and [links](#) describing what you shipped.",
        skills: ["Skill one", "Skill two"],
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
