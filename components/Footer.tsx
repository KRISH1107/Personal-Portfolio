const socials = [
  { label: "GitHub", href: "https://github.com/KRISH1107" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/krish-patel" },
  { label: "Email", href: "mailto:krish.patel.1107@gmail.com" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          © {new Date().getFullYear()} Krish Patel
        </p>
        <ul className="flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          {socials.map((social) => {
            const isExternal = social.href.startsWith("http");
            return (
              <li key={social.href}>
                <a
                  href={social.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
                >
                  {social.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
