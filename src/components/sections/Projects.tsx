import FadeIn from "@/components/FadeIn";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto w-full max-w-[1040px] border-x border-border px-2 py-10 sm:px-4">
      <SectionHeading>/Projects</SectionHeading>

      <div className="mt-10 flex flex-col gap-10 sm:gap-[52px]">
        {projects.map((project, i) => (
          <FadeIn key={project.slug} delay={i * 0.05}>
            <ProjectCard project={project} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
