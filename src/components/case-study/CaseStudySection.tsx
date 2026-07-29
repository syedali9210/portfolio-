export default function CaseStudySection({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  // No card/background — sections sit flush on the page. The divider that
  // separates them lives on the FadeIn wrapper in CaseStudyTemplate instead
  // of here: each section has its own FadeIn, so `last:` on this element
  // would only ever see an only-child and never actually match the true
  // last section.
  return (
    <div id={id} className={className}>
      {children}
    </div>
  );
}
