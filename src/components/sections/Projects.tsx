"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import { projects } from "@/data/projects";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Projects() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const activeProject = projects.find((p) => p.slug === activeSlug) ?? null;

  return (
    <section
      id="projects"
      className="screen-line-top screen-line-bottom mx-auto w-full max-w-[680px] py-12 sm:py-20"
    >
      <SectionHeading>/Projects</SectionHeading>

      <FadeIn className="mt-6 overflow-hidden px-4 sm:px-6">
        <AnimatePresence mode="wait" initial={false}>
          {activeProject ? (
            <motion.div
              key={activeProject.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="flex flex-col gap-6"
            >
              <button
                type="button"
                onClick={() => setActiveSlug(null)}
                className="flex w-fit items-center gap-2 text-xl font-medium text-foreground transition-opacity hover:opacity-70"
              >
                {activeProject.title}
                <span className="text-muted-foreground">&mdash;</span>
              </button>

              {activeProject.image && (
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#1f1f1f]">
                  <Image
                    src={activeProject.image}
                    alt={`${activeProject.title} screenshot`}
                    fill
                    sizes="(min-width: 640px) 680px, 100vw"
                    className="object-cover object-top"
                  />
                </div>
              )}

              <div className="flex flex-col gap-2">
                <p className="text-base font-medium text-foreground">{activeProject.tag}</p>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {activeProject.description}
                </p>
              </div>

              {activeProject.caseStudy && (
                <Link
                  href={`/projects/${activeProject.slug}`}
                  className="w-fit rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-80"
                >
                  View Case Study
                </Link>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="flex flex-col"
            >
              {projects.map((project) => (
                <button
                  key={project.slug}
                  type="button"
                  onClick={() => setActiveSlug(project.slug)}
                  className="group flex w-full items-baseline justify-between gap-4 py-3 text-left"
                >
                  <span className="text-lg text-muted-foreground transition-colors group-hover:font-medium group-hover:text-foreground">
                    {project.title}
                  </span>
                  <span className="shrink-0 text-sm text-muted-foreground">{project.meta}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </FadeIn>
    </section>
  );
}
