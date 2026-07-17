"use client";

import Image from "next/image";
import { useState } from "react";
import FadeIn from "@/components/FadeIn";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/data/projects";
import CaseStudySection from "./CaseStudySection";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <p className="text-xl font-medium text-foreground">{children}</p>;
}

function Body({ children }: { children: React.ReactNode }) {
  return <p className="text-base leading-relaxed text-muted-foreground">{children}</p>;
}

function NoteCard({ title, points }: { title: string; points?: string[] }) {
  return (
    <div className="flex w-full flex-col gap-2 rounded-xl bg-secondary/40 p-5">
      <p className="text-base font-medium text-foreground">{title}</p>
      {points && (
        <ul className="list-disc space-y-1 pl-5 text-base text-muted-foreground">
          {points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FindingCard({ title, quotes }: { title: string; quotes: string[] }) {
  return (
    <div className="flex w-full flex-col gap-3 rounded-xl bg-secondary/40 p-5">
      <p className="text-base font-medium text-foreground">{title}</p>
      <ul className="list-disc space-y-1.5 pl-5 text-base text-muted-foreground">
        {quotes.map((quote) => (
          <li key={quote}>&ldquo;{quote}&rdquo;</li>
        ))}
      </ul>
    </div>
  );
}

function InsightAccordionItem({ title, description }: { title: string; description: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl bg-secondary/40">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <p className="text-base font-medium text-foreground">{title}</p>
        <span
          className="text-base text-foreground transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-4 text-base leading-relaxed text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
}

function SolutionRow({
  solution,
  index,
}: {
  solution: NonNullable<Project["caseStudy"]>["solutions"][number];
  index: number;
}) {
  const gridCols = solution.images.length >= 3 ? "sm:grid-cols-2" : "sm:grid-cols-1";
  return (
    <div className={`flex flex-col gap-6 py-8 ${index > 0 ? "mt-2" : ""}`}>
      <span className="w-fit rounded-full bg-secondary px-3 py-1 text-sm font-medium text-foreground">
        {solution.label}
      </span>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <p className="text-base font-medium text-foreground">{solution.leftTitle ?? "Problem"}</p>
          <Body>{solution.leftText}</Body>
        </div>
        <div className="flex flex-col gap-2 md:pl-6">
          <p className="text-base font-medium text-foreground">{solution.rightTitle ?? "Solution"}</p>
          <Body>{solution.rightText}</Body>
        </div>
      </div>

      <div className={`grid w-full grid-cols-1 gap-4 ${gridCols}`}>
        {solution.images.map((img) => (
          <div key={img.src} className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image src={img.src} alt={img.alt ?? ""} fill sizes="(min-width: 1024px) 800px, 100vw" className="object-cover" />
          </div>
        ))}
      </div>

      {solution.impactText && (
        <div className="flex flex-col gap-2">
          <p className="text-base font-medium text-foreground">{solution.impactTitle ?? "Impact"}</p>
          <Body>{solution.impactText}</Body>
        </div>
      )}
    </div>
  );
}

function OutcomeRow({ label, metric }: { label: string; metric: string }) {
  return (
    <div className="flex w-full items-center justify-between gap-4 rounded-xl bg-secondary/40 px-5 py-4">
      <p className="text-base font-medium text-foreground">{label}</p>
      <p className="text-base text-muted-foreground">{metric}</p>
    </div>
  );
}

export default function CaseStudyTemplate({ project }: { project: Project }) {
  const cs = project.caseStudy;
  if (!cs) return null;

  return (
    <main className="mx-auto w-full max-w-[680px] py-12 sm:py-20">
      <FadeIn className="px-4 sm:px-6">
        <ProjectCard project={project} linkable={false} />
      </FadeIn>

      <div className="mt-8 flex flex-col gap-8 px-4 sm:px-6">
        <FadeIn>
          <CaseStudySection id="overview" className="flex flex-col gap-4">
            <SectionTitle>Overview</SectionTitle>
            <div className="flex flex-col gap-3">
              {cs.overview.map((p, i) => (
                <Body key={i}>{p}</Body>
              ))}
            </div>
          </CaseStudySection>
        </FadeIn>

        <FadeIn delay={0.05}>
          <CaseStudySection id="challenge" className="flex flex-col gap-4">
            <SectionTitle>The Challenge</SectionTitle>
            <div className="flex flex-col gap-3">
              {cs.challenge.map((p, i) => (
                <Body key={i}>{p}</Body>
              ))}
            </div>
          </CaseStudySection>
        </FadeIn>

        <FadeIn delay={0.05}>
          <CaseStudySection id="research" className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <SectionTitle>{cs.researchTitle}</SectionTitle>
              <div className="flex flex-col gap-3">
                {cs.researchIntro.map((p, i) => (
                  <Body key={i}>{p}</Body>
                ))}
              </div>
            </div>
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
              {cs.researchNotes.map((note) => (
                <NoteCard key={note.title} {...note} />
              ))}
            </div>
          </CaseStudySection>
        </FadeIn>

        {cs.findings && cs.findingsTitle && (
          <FadeIn delay={0.05}>
            <CaseStudySection id="findings" className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <SectionTitle>{cs.findingsTitle}</SectionTitle>
                <div className="flex flex-col gap-3">
                  {cs.findingsIntro?.map((p, i) => (
                    <Body key={i}>{p}</Body>
                  ))}
                </div>
              </div>
              <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {cs.findings.map((finding) => (
                  <FindingCard key={finding.title} {...finding} />
                ))}
              </div>
            </CaseStudySection>
          </FadeIn>
        )}

        <FadeIn delay={0.05}>
          <CaseStudySection id="insights" className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <SectionTitle>{cs.insightsTitle}</SectionTitle>
              <div className="flex flex-col gap-3">
                {cs.insightsIntro.map((p, i) => (
                  <Body key={i}>{p}</Body>
                ))}
              </div>
            </div>
            <div className="flex w-full flex-col gap-3">
              {cs.insights.map((item) => (
                <InsightAccordionItem key={item.title} {...item} />
              ))}
            </div>
          </CaseStudySection>
        </FadeIn>

        <FadeIn delay={0.05}>
          <CaseStudySection id="solutions" className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <SectionTitle>{cs.solutionsTitle}</SectionTitle>
              <div className="flex flex-col gap-3">
                {cs.solutionsIntro.map((p, i) => (
                  <Body key={i}>{p}</Body>
                ))}
              </div>
            </div>
            <div className="flex w-full flex-col">
              {cs.solutions.map((solution, i) => (
                <SolutionRow key={solution.label} solution={solution} index={i} />
              ))}
            </div>
          </CaseStudySection>
        </FadeIn>

        <FadeIn delay={0.05}>
          <CaseStudySection id="outcomes" className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <SectionTitle>{cs.outcomesTitle}</SectionTitle>
              <div className="flex flex-col gap-3">
                {cs.outcomesIntro.map((p, i) => (
                  <Body key={i}>{p}</Body>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1 text-base text-muted-foreground italic">
              {cs.closingNote.map((line, i) => (
                <span key={i}>{line}</span>
              ))}
            </div>
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
              {cs.outcomes.map((outcome) => (
                <OutcomeRow key={outcome.label} {...outcome} />
              ))}
            </div>
          </CaseStudySection>
        </FadeIn>

        <FadeIn delay={0.05}>
          <CaseStudySection id="learned" className="flex flex-col gap-4">
            <SectionTitle>{cs.learnedTitle}</SectionTitle>
            <div className="flex flex-col gap-3">
              {cs.learned.map((p, i) => (
                <Body key={i}>{p}</Body>
              ))}
            </div>
          </CaseStudySection>
        </FadeIn>
      </div>
    </main>
  );
}
