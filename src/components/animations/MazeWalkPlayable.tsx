import PetBuddyPathHero from "@/components/PetBuddyPathHero";

// The card-grid preview uses the plain ambient PetBuddyPathHero (via
// AnimationEntry.Demo) — this interactive variant is only for the full
// /animations/maze-walk page, where arrow keys/the on-screen d-pad actually
// make sense to show and use.
export default function MazeWalkPlayable() {
  return <PetBuddyPathHero interactive />;
}
