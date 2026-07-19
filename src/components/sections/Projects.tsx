"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import { spring } from "@/lib/springs";
import { projects } from "@/data/projects";

const EASE = [0.22, 1, 0.36, 1] as const;
const LAYOUT_TRANSITION = { duration: 0.45, ease: EASE };

// Desktop-only: a "Coming soon" pill that tracks the cursor while hovering
// the blurred hero image, instead of a fixed centered overlay.
function ComingSoonCursorTag() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  return (
    <div
      className="absolute inset-0 z-10 hidden sm:block"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <motion.div
        className="pointer-events-none absolute z-10 flex items-center gap-1.5 rounded-full bg-background px-3 py-1.5 text-sm font-medium whitespace-nowrap text-foreground shadow-lg"
        animate={{ left: pos.x, top: pos.y, opacity: hovering ? 1 : 0 }}
        transition={spring.fast}
        style={{ x: "-50%", y: "-140%" }}
      >
        <Lock className="size-3.5" />
        Coming soon
      </motion.div>
    </div>
  );
}

export default function Projects() {
  // One project is always morphed into the detail view; clicking a
  // different title morphs that one and rests the previously-active one.
  // Every title stays lined up and visible regardless of which is active.
  const [activeSlug, setActiveSlug] = useState<string>(projects[0].slug);

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

            return (
              <motion.div key={project.slug} layout transition={LAYOUT_TRANSITION}>
                {isActive ? (
                  <motion.div layout="position" transition={LAYOUT_TRANSITION} className="flex flex-col gap-6 py-3">
                    <motion.p layout="position" transition={LAYOUT_TRANSITION} className="w-fit text-xl font-medium text-foreground">
                      {project.title}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: EASE, delay: 0.15 }}
                      className="flex flex-col gap-6"
                    >
                      {project.image && (
                        <div className="group/hero relative aspect-video w-full overflow-hidden rounded-xl bg-[#1f1f1f]">
                          <Image
                            src={project.image}
                            alt={`${project.title} screenshot`}
                            fill
                            sizes="(min-width: 640px) 680px, 100vw"
                            className={cn(
                              "object-cover object-top",
                              project.comingSoon && "object-contain p-8 blur-md"
                            )}
                          />
                          {project.comingSoon && <ComingSoonCursorTag />}
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

                      {project.comingSoon && (
                        <span className="flex w-fit items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background sm:hidden">
                          <Lock className="size-3.5" />
                          Coming soon
                        </span>
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
