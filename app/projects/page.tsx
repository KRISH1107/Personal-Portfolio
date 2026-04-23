import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A selection of projects I've built — web apps, ML experiments, and computer vision tools.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects",
    description:
      "A selection of projects I've built — web apps, ML experiments, and computer vision tools.",
    url: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-20">
      <header className="mb-12 flex flex-col gap-3">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          Projects
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          A few things I&apos;ve built while learning, exploring, and sometimes breaking stuff.
        </p>
      </header>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </main>
  );
}
