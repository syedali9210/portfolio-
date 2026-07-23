import { notFound } from "next/navigation";
import Link from "next/link";
import { ANIMATIONS } from "@/data/animations";
import AnimationSection from "@/components/animations/AnimationSection";

export function generateStaticParams() {
  return ANIMATIONS.map((entry) => ({ slug: entry.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = ANIMATIONS.find((a) => a.id === slug);
  return {
    title: entry ? `${entry.name} — Animations — Syed Ali` : "Animations — Syed Ali",
  };
}

export default async function AnimationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = ANIMATIONS.find((a) => a.id === slug);

  if (!entry) notFound();

  return (
    <>
      <div className="mx-auto w-full max-w-[680px] px-4 pt-6 sm:px-6">
        <Link
          href="/animations"
          className="inline-flex items-center gap-1.5 text-base text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to animations
        </Link>
      </div>
      <AnimationSection entry={entry} />
    </>
  );
}
