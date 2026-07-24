import Link from "next/link";
import { ANIMATIONS, type AnimationEntry } from "@/data/animations";

// Each preview renders the real Demo component, scaled down and inert —
// same "live, interactive" components the full page uses, just muted here
// since a grid of cards isn't the place to actually drive them.
function AnimationCard({ entry }: { entry: AnimationEntry }) {
  const { Demo } = entry;

  return (
    <Link
      href={`/animations/${entry.id}`}
      className="group flex flex-col gap-3 rounded-2xl bg-card p-3 shadow-[var(--shadow-3)] transition-transform duration-300 hover:-translate-y-0.5"
    >
      <span className="w-fit rounded-md bg-secondary px-2 py-1 text-[11px] font-medium text-muted-foreground">
        New
      </span>

      <div className="relative flex h-[180px] w-full items-center justify-center overflow-hidden rounded-xl bg-muted">
        {/* Fixed width so each Demo lays out at the comfortable size it was
            built for (no cramped text-wrap), then scaled down as a whole to
            fit the card — shrinking a finished layout instead of forcing a
            narrow one. */}
        <div inert className="pointer-events-none flex w-[420px] shrink-0 origin-center scale-[0.6] items-center justify-center">
          <Demo />
        </div>
      </div>

      <div className="px-1 pb-1">
        <p className="text-base font-medium text-foreground">{entry.name}</p>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{entry.blurb}</p>
      </div>
    </Link>
  );
}

export default function AnimationsGrid() {
  return (
    <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {ANIMATIONS.map((entry) => (
        <AnimationCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
}
