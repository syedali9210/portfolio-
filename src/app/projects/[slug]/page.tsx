import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import Contact from "@/components/sections/Contact";
import CaseStudyTemplate from "@/components/case-study/CaseStudyTemplate";
import CaseStudyScrubber from "@/components/case-study/CaseStudyScrubber";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project || !project.caseStudy) {
    notFound();
  }

  return (
    <>
      <Nav />
      <CaseStudyScrubber caseStudy={project.caseStudy} />
      <div className="mx-auto w-full max-w-[680px] px-4 pt-6 sm:px-6">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 text-base text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to projects
        </Link>
      </div>
      <CaseStudyTemplate project={project} />
      <Contact />
    </>
  );
}
