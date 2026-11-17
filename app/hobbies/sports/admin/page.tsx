import type { Metadata } from "next";
import Link from "next/link";
import SportsAdmin from "@/components/sports/SportsAdmin";
import { isAdminAuthenticated } from "@/lib/sports/auth";
import { readSportsStore } from "@/lib/sports/store";

export const metadata: Metadata = {
  title: "Sports Rankings Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function SportsAdminPage() {
  const [store, authenticated] = await Promise.all([
    readSportsStore(),
    isAdminAuthenticated(),
  ]);

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-20">
      <div className="mb-8">
        <Link
          href="/hobbies/sports"
          className="text-sm font-medium text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
        >
          ← Back to rankings
        </Link>
      </div>
      <SportsAdmin store={store} authenticated={authenticated} />
    </main>
  );
}
