import { notFound } from "next/navigation";
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

  return <AnimationSection entry={entry} />;
}
