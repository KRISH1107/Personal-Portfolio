import Image from "next/image";
import Contact from "@/components/Contact";

const skills = [
  "Python",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "FastAPI",
  "PostgreSQL",
  "OpenCV",
  "scikit-learn",
];

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-20">
      <header className="mb-10 flex flex-col gap-3">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          About
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          A bit about who I am and what I like building.
        </p>
      </header>

      <div className="mb-10 flex justify-center sm:justify-start">
        <Image
          src="/headshot.jpg"
          alt="Krish Patel"
          width={160}
          height={160}
          priority
          className="rounded-full border border-zinc-200 object-cover dark:border-zinc-800"
        />
      </div>

      <div className="flex flex-col gap-4 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          Hi — I&apos;m Krish. I enjoy playing basektball, hanging out with friends, and traveling to new places.
        </p>
        <p>
          I like building projects that start small, grow in unexpected directions, and
          teach me at least one thing I didn&apos;t know going in. This site is
          a small example: I picked up Next.js while building it.
        </p>
      </div>

      <h2 className="mt-16 mb-4 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        What I work with
      </h2>
      <ul className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <li
            key={skill}
            className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
          >
            {skill}
          </li>
        ))}
      </ul>

      <Contact />
    </main>
  );
}
