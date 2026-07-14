import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import AboutMe from "@/components/sections/AboutMe";
import MySpace from "@/components/sections/MySpace";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex flex-1 flex-col">
        <Hero />
        <Projects />
        <AboutMe />
        <MySpace />
      </main>
      <Contact />
    </>
  );
}
