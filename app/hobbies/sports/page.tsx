import type { Metadata } from "next";
import Link from "next/link";
import HobbiesTabs from "@/components/sports/HobbiesTabs";
import SportsDashboard from "@/components/sports/SportsDashboard";
import { readSportsStore } from "@/lib/sports/store";

export const metadata: Metadata = {
  title: "Sports Power Rankings",
  description:
    "Krish Patel's weekly NFL and NBA power rankings — historical editions, movers, and team trends.",
  alternates: { canonical: "/hobbies/sports" },
};

export const dynamic = "force-dynamic";

export default async function SportsPage() {
  const store = await readSportsStore();

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-20">
      <header className="mb-8 flex flex-col gap-3">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          Hobbies
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          Personal NFL &amp; NBA power rankings — updated weekly, with full
          history.
        </p>
      </header>

      <HobbiesTabs />

      <section className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Power Rankings
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Opinions only — not betting advice.
          </p>
        </div>
        <Link
          href="/hobbies/sports/admin"
          className="text-sm font-medium text-zinc-500 underline-offset-4 hover:text-zinc-800 hover:underline dark:hover:text-zinc-200"
        >
          Admin desk →
        </Link>
      </section>

      <SportsDashboard store={store} />
    </main>
  );
}
