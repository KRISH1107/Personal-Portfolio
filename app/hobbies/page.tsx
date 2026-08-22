import type { Metadata } from "next";
import HobbyCard from "@/components/HobbyCard";
import TravelMap from "@/components/TravelMap";
import { hobbies } from "@/lib/hobbies";

export const metadata: Metadata = {
  title: "Hobbies",
  description:
    "Things I enjoy outside of code — travel, basketball, photography, and more.",
  alternates: { canonical: "/hobbies" },
  openGraph: {
    title: "Hobbies",
    description:
      "Things I enjoy outside of code — travel, basketball, photography, and more.",
    url: "/hobbies",
  },
};

export default function HobbiesPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-20">
      <header className="mb-12 flex flex-col gap-3">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          Hobbies
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          A few things I care about when I&apos;m not shipping code.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2">
        {hobbies.map((hobby) => (
          <HobbyCard key={hobby.slug} hobby={hobby} />
        ))}
      </div>

      <section id="travel" className="mt-20 scroll-mt-24">
        <header className="mb-8 flex flex-col gap-3">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Travel
          </h2>
          <p className="max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
            Highlighted countries are places I&apos;ve visited. Click one to
            open trip notes and photos.
          </p>
        </header>
        <TravelMap />
      </section>
    </main>
  );
}
