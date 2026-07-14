export type Project = {
  slug: string;
  title: string;
  meta: string;
  tag: string;
  description: string;
  gradient: string;
  image?: string;
};

export const projects: Project[] = [
  {
    slug: "airtribe",
    title: "Airtribe - AI Learning Experience",
    meta: "EduTech, 2025",
    tag: "Product Design",
    description: "Designed an AI experience for the users to ease their learning experience through out the site.",
    gradient: "from-[#123600] to-[#005266]",
    image: "/images/about-collage-frame7.png",
  },
  {
    slug: "kodex",
    title: "Kodex",
    meta: "BASENINE, 2026",
    tag: "Web Redesign",
    description: "Redesigning Kodex's digital experience for enterprise customers.",
    gradient: "from-[#7f5d83] to-[#7c7340]",
  },
  {
    slug: "uniqkey",
    title: "Uniqkey",
    meta: "BASENINE, 2026",
    tag: "Web Design",
    description: "Designing a landing page that turns security awareness into action.",
    gradient: "from-[#3a4855] to-[#545b3c]",
  },
];
