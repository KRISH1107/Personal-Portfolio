import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero
        name="Krish Patel"
        tagline="Software engineer & builder"
        blurb="I build data-driven web apps, dabble in machine learning, and love turning messy ideas into polished products."
      />
      <section className="mx-auto w-full max-w-4xl px-6 pb-32">
        <h2 className="mb-8 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Selected projects
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}
