import { Hero } from "../components/main/hero";
import { Skills } from "../components/main/skills";
import { About } from "../components/main/about";
import { Products } from "../components/main/Products";
// import { Projects } from "../components/main/projects";
import { PROJECTS } from "../constants";
import { SourceCode } from "../components/main/source-code";
import { Experience } from "../components/main/experience";
import { Publications } from "../components/main/publications";
import { Contact } from "../components/main/contact";
export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <About />
        {/* <section id="skills"><Skills /></section> */}
        {/* <Projects /> */}
        <Experience />
        <Products
          items={PROJECTS.map((p) => ({
            title: p.title,
            description: p.description,
            live: Boolean(p.link),
            case: false,
            tags:
              p.title.includes("Next.js") || p.title.includes("Portfolio")
                ? ["Next.js", "Tailwind", "Framer Motion"]
                : p.title.includes("Interactive Cards")
                ? ["React", "Tailwind", "Framer Motion"]
                : p.title.includes("Space")
                ? ["Next.js", "Three.js", "React"]
                : ["React", "Tailwind"],
          }))}
        />
        {/* <Certifications /> */}
        <Publications />
        <Contact />
      </div>
    </main>
  );
}

