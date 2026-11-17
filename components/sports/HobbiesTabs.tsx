"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/hobbies", label: "Travel", match: (path: string) => path === "/hobbies" },
  {
    href: "/hobbies/sports",
    label: "Sports",
    match: (path: string) => path.startsWith("/hobbies/sports"),
  },
];

export default function HobbiesTabs() {
  const pathname = usePathname();

  return (
    <div
      className="mb-10 flex gap-2 border-b border-zinc-200 pb-1 dark:border-zinc-800"
      role="tablist"
      aria-label="Hobbies sections"
    >
      {tabs.map((tab) => {
        const active = tab.match(pathname);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            role="tab"
            aria-selected={active}
            className={`rounded-t-lg px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 ${
              active
                ? "border-b-2 border-zinc-900 text-zinc-900 dark:border-zinc-100 dark:text-zinc-50"
                : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
