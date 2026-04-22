import Link from "next/link";
import type { Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-6 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          <Link
            href={`/projects/${project.slug}`}
            className="transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            {project.title}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {project.blurb}
        </p>
      </div>
      <ul className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
          >
            {tag}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex gap-4 text-sm font-medium">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
          >
            GitHub →
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
          >
            Live demo →
          </a>
        )}
      </div>
    </article>
  );
}
