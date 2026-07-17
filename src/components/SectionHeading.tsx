export default function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="screen-line-top screen-line-bottom flex w-full items-center px-4 py-2 sm:px-6">
      <p className="text-xl font-medium text-foreground">{children}</p>
    </div>
  );
}
