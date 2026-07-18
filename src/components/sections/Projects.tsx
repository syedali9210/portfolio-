"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import { projects } from "@/data/projects";

const EASE = [0.22, 1, 0.36, 1] as const;
const LAYOUT_TRANSITION = { duration: 0.45, ease: EASE };

export default function Projects() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  return (
    <section
      id="projects"
      className="screen-line-top screen-line-bottom mx-auto w-full max-w-[680px] py-12 sm:py-20"
    >
      <SectionHeading>/Projects</SectionHeading>

      <FadeIn className="mt-6 px-4 sm:px-6">
        <div className="flex flex-col">
          {projects.map((project) => {
            const isActive = activeSlug === project.slug;
            const isCollapsed = activeSlug !== null && !isActive;

            return (
              <motion.div
                key={project.slug}
                layout
                transition={LAYOUT_TRANSITION}
                className={cn(
                  "overflow-hidden",
                  isCollapsed && "pointer-events-none h-0 opacity-0"
                )}
              >
                {isActive ? (
                  <motion.div layout="position" transition={LAYOUT_TRANSITION} className="flex flex-col gap-6 py-3">
                    <button
                      type="button"
                      onClick={() => setActiveSlug(null)}
                      className="flex w-fit items-center gap-2 text-xl font-medium text-foreground transition-opacity hover:opacity-70"
                    >
                      <motion.span layout="position" transition={LAYOUT_TRANSITION}>
                        {project.title}
                      </motion.span>
                      <span className="text-muted-foreground">&mdash;</span>
                    </button>

                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: EASE, delay: 0.15 }}
                      className="flex flex-col gap-6"
                    >
                      {project.image && (
                        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#1f1f1f]">
                          <Image
                            src={project.image}
                            alt={`${project.title} screenshot`}
                            fill
                            sizes="(min-width: 640px) 680px, 100vw"
                            className="object-cover object-top"
                          />
                        </div>
                      )}

                      <div className="flex flex-col gap-2">
                        <p className="text-base font-medium text-foreground">{project.tag}</p>
                        <p className="text-base leading-relaxed text-muted-foreground">
                          {project.description}
                        </p>
                      </div>

                      {project.caseStudy && (
                        <Link
                          href={`/projects/${project.slug}`}
                          className="w-fit rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-80"
                        >
                          View Case Study
                        </Link>
                      )}
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.button
                    layout="position"
                    transition={LAYOUT_TRANSITION}
                    type="button"
                    onClick={() => setActiveSlug(project.slug)}
                    className="group flex w-full items-baseline justify-between gap-4 py-3 text-left"
                  >
                    <motion.span
                      layout="position"
                      transition={LAYOUT_TRANSITION}
                      className="text-lg text-muted-foreground transition-colors group-hover:font-medium group-hover:text-foreground"
                    >
                      {project.title}
                    </motion.span>
                    <span className="shrink-0 text-sm text-muted-foreground">{project.meta}</span>
                  </motion.button>
                )}
              </motion.div>
            );
          })}
        </div>
      </FadeIn>
    </section>
  );
}
