export default function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="screen-line-top screen-line-bottom flex items-center border-x-[0.5px] border-border px-2.5 py-1">
      <p className="text-2xl font-medium text-white">{children}</p>
    </div>
  );
}
