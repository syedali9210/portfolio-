export default function CaseStudySection({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div id={id} className={`rounded-xl bg-muted p-6 sm:p-8 md:px-10 md:py-8 ${className}`}>{children}</div>
  );
}
