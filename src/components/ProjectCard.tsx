import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

function CardBody({ project }: { project: Project }) {
  return (
    <>
      <div className="relative h-[200px] w-full overflow-hidden rounded-xl bg-[#1f1f1f] sm:h-[300px] lg:h-[360px]">
        <div className="absolute left-1/2 top-1/2 h-[87%] w-[94%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-md border-[5px] border-[#f3f3f3]/90">
          {project.image ? (
            <Image src={project.image} alt={`${project.title} screenshot`} fill className="object-cover object-top" />
          ) : null}
        </div>
      </div>

      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-start sm:gap-[22px]">
        <div className="flex w-full flex-col text-muted-foreground sm:w-[278px] sm:shrink-0">
          <p className="text-lg font-medium">{project.title}</p>
          <p className="text-lg">{project.meta}</p>
        </div>
        <p className="text-[16px] text-muted-foreground/70">{project.description}</p>
      </div>
    </>
  );
}

export default function ProjectCard({
  project,
  linkable = true,
}: {
  project: Project;
  // The case-study page reuses this card as its own hero image, so linking
  // it to `/projects/${slug}` would point the card at the page it's
  // already on — a dead click styled like a live one.
  linkable?: boolean;
}) {
  const className = "flex w-full flex-col gap-6 px-4 py-6 sm:px-6";

  if (project.caseStudy && linkable) {
    return (
      <Link href={`/projects/${project.slug}`} className={`${className} transition-opacity hover:opacity-80`}>
        <CardBody project={project} />
      </Link>
    );
  }

  return (
    <div className={className}>
      <CardBody project={project} />
    </div>
  );
}
