import Nav from "@/components/Nav";
import MobileAnimationsSwitch from "@/components/MobileAnimationsSwitch";
import AnimationsNavRail from "@/components/AnimationsNavRail";
import AnimationsMobileNav from "@/components/AnimationsMobileNav";
import Contact from "@/components/sections/Contact";

export default function AnimationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <MobileAnimationsSwitch />
      <AnimationsNavRail />
      <AnimationsMobileNav />
      <main className="flex flex-1 flex-col pb-24 sm:pb-0">{children}</main>
      <Contact />
    </>
  );
}
