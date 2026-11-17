import type { MovementKind } from "@/lib/sports/types";

type MovementBadgeProps = {
  movement: MovementKind;
  delta: number;
};

export default function MovementBadge({ movement, delta }: MovementBadgeProps) {
  if (movement === "new") {
    return (
      <span className="inline-flex min-w-[3.25rem] items-center justify-center rounded-full bg-sky-100 px-2 py-0.5 text-xs font-semibold tracking-wide text-sky-800 dark:bg-sky-950 dark:text-sky-300">
        NEW
      </span>
    );
  }

  if (movement === "up") {
    return (
      <span className="inline-flex min-w-[3.25rem] items-center justify-center gap-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
        <span aria-hidden="true">↑</span>
        {delta}
      </span>
    );
  }

  if (movement === "down") {
    return (
      <span className="inline-flex min-w-[3.25rem] items-center justify-center gap-1 text-sm font-semibold text-rose-600 dark:text-rose-400">
        <span aria-hidden="true">↓</span>
        {delta}
      </span>
    );
  }

  return (
    <span className="inline-flex min-w-[3.25rem] items-center justify-center text-sm font-medium text-zinc-400 dark:text-zinc-500">
      —
    </span>
  );
}
