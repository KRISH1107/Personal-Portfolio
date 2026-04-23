import { socials } from "@/lib/socials";

export default function Contact() {
  return (
    <section className="mt-20 rounded-2xl border border-zinc-200 bg-zinc-50 px-6 py-12 dark:border-zinc-800 dark:bg-zinc-900/50 sm:px-10 sm:py-14">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
          Get in touch
        </h2>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          Working on something interesting, or just want to say hi? The inbox is open.
        </p>

        <ul className="mt-4 flex w-full flex-col gap-2 text-sm sm:mt-6">
          {socials.map((social) => {
            const isExternal = social.href.startsWith("http");
            return (
              <li key={social.href}>
                <a
                  href={social.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-4 py-3 font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-zinc-50"
                >
                  <span>{social.label}</span>
                  <span className="text-zinc-500 dark:text-zinc-500">{social.handle}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
