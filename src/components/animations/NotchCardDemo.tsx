import DynamicInfoCard from "@/components/DynamicInfoCard";

// DynamicInfoCard's "embedded" variant is `absolute top-0`, flush against
// whatever positioned ancestor it's given — this just supplies a relative
// box with room below to expand into on hover.
export default function NotchCardDemo() {
  return (
    <div className="relative min-h-[220px] w-full">
      <DynamicInfoCard variant="embedded" />
    </div>
  );
}
