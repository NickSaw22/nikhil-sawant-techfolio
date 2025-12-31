import { Hero } from "../components/main/hero";
import { Skills } from "../components/main/skills";
import { About } from "../components/main/about";
import { Projects } from "../components/main/projects";
import { Products } from "../components/main/Products";
import { SourceCode } from "../components/main/source-code";
import { Experience } from "../components/main/experience";
import { Certifications } from "../components/main/certifications";
export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <About />
        <section id="skills"><Skills /></section>
        {/* <Projects /> */}
        <Experience />
        <Products />
        <Certifications />
        <SourceCode />
      </div>
    </main>
  );
}

