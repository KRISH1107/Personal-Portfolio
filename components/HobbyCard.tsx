import Link from "next/link";
import type { Hobby } from "@/lib/hobbies";

type HobbyCardProps = {
  hobby: Hobby;
};

export default function HobbyCard({ hobby }: HobbyCardProps) {
  const content = (
    <>
      <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        {hobby.title}
      </h3>
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {hobby.blurb}
      </p>
      {hobby.href ? (
        <span className="mt-auto text-sm font-medium text-zinc-700 dark:text-zinc-300">
          View map →
        </span>
      ) : null}
    </>
  );

  if (hobby.href) {
    return (
      <article className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-6 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700">
        <Link
          href={hobby.href}
          className="flex flex-1 flex-col gap-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-500"
        >
          {content}
        </Link>
      </article>
    );
  }

  return (
    <article className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      {content}
    </article>
  );
}
