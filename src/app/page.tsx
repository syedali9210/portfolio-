import Nav from "@/components/Nav";
import MobileNav from "@/components/MobileNav";
import MobileAnimationsSwitch from "@/components/MobileAnimationsSwitch";
import Scrubber from "@/components/Scrubber";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import WorkExperienceSection from "@/components/sections/WorkExperienceSection";
import AboutMe from "@/components/sections/AboutMe";
import MySpace from "@/components/sections/MySpace";
import Contact from "@/components/sections/Contact";

const HOME_ITEMS = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "about-me", label: "About me" },
  { id: "my-space", label: "My Space" },
  { id: "contact", label: "Contact" },
];

export default function Home() {
  return (
    <>
      <Nav />
      <MobileNav />
      <MobileAnimationsSwitch />
      <Scrubber items={HOME_ITEMS} />
      <main className="flex flex-1 flex-col">
        <Hero />
        <Projects />
        <WorkExperienceSection />
        <AboutMe />
        <MySpace />
      </main>
      <Contact />
    </>
  );
}
