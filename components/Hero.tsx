type HeroProps = {
  name: string;
  tagline: string;
  blurb: string;
};

export default function Hero({ name, tagline, blurb }: HeroProps) {
  return (
    <section className="flex flex-col items-center justify-center gap-6 px-6 py-32 text-center sm:py-40">
      <p className="text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
        Hi, I&apos;m
      </p>
      <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-7xl">
        {name}
      </h1>
      <p className="text-xl font-medium text-zinc-700 dark:text-zinc-300 sm:text-2xl">
        {tagline}
      </p>
      <p className="max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
        {blurb}
      </p>
    </section>
  );
}
