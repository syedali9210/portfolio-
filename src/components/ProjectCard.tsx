import Image from "next/image";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="screen-line-top screen-line-bottom flex w-full flex-col gap-6 border-x-[0.5px] border-border px-4 py-5 sm:px-6 sm:py-[18px]">
      <div className={`relative h-[260px] w-full overflow-hidden rounded-xl bg-gradient-to-b sm:h-[380px] lg:h-[484px] ${project.gradient}`}>
        <div className="absolute left-1/2 top-1/2 h-[70%] w-[90%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-md border-[5px] border-[#f3f3f3]/90">
          {project.image ? (
            <Image src={project.image} alt={`${project.title} screenshot`} fill className="object-cover object-top" />
          ) : null}
        </div>
      </div>

      <div className="flex flex-col items-start gap-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex h-[30px] items-center rounded border-[0.5px] border-[#39393d] bg-[#27272a] px-4">
            <p className="text-base text-[#565656]">{project.title}</p>
          </div>
          <p className="text-base text-[#7a7a7a]">| {project.meta}</p>
        </div>

        <div className="flex items-center justify-center rounded border-[0.5px] border-[#39393d] bg-[#27272a] px-3 py-1.5">
          <p className="text-base text-[#565656]">{project.tag}</p>
        </div>

        <p className="text-base text-[#7a7a7a]">{project.description}</p>
      </div>
    </div>
  );
}
