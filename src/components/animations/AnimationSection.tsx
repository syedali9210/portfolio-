import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { AnimationEntry } from "@/data/animations";
import AnimationStage from "./AnimationStage";

export default function AnimationSection({ entry }: { entry: AnimationEntry }) {
  const Demo = entry.FullDemo ?? entry.Demo;

  return (
    <div className="fixed inset-0 flex flex-col">
      {/* Always available regardless of AnimationsChrome's hide-nav toggle
          — without this, hiding the chrome would strand you on a fullscreen
          demo with no way back to the animations grid. */}
      <div className="absolute top-20 left-4 z-10 flex flex-col items-start gap-1.5 sm:top-24 sm:left-6">
        <Link
          href="/animations"
          className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Home
        </Link>
        <p className="pointer-events-none text-sm font-medium text-muted-foreground">/{entry.name}</p>
      </div>
      <AnimationStage fullscreen>
        <Demo />
      </AnimationStage>
    </div>
  );
}
