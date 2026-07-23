import Nav from "@/components/Nav";
import AnimationsSwitch from "@/components/AnimationsSwitch";
import AnimationsNavRail from "@/components/AnimationsNavRail";
import AnimationsMobileNav from "@/components/AnimationsMobileNav";
import Contact from "@/components/sections/Contact";

export default function AnimationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <AnimationsSwitch />
      <AnimationsNavRail />
      <AnimationsMobileNav />
      <main className="flex flex-1 flex-col pb-24 sm:pb-0">{children}</main>
      <Contact />
    </>
  );
}
