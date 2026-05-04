import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTopArtists } from "@/lib/spotify";

export const metadata: Metadata = {
  title: "Music",
  description:
    "What I have been listening to on Spotify — recent and long-term top artists.",
  alternates: { canonical: "/music" },
  openGraph: {
    title: "Music",
    description:
      "What I have been listening to on Spotify — recent and long-term top artists.",
    url: "/music",
  },
};

const LIMIT = 5;
export const revalidate = 3600;

function Initial({ name }: { name: string }) {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-200 text-sm font-semibold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
      {name.slice(0, 1).toUpperCase()}
    </div>
  );
}

export default async function MusicPage() {
  const spotifyProfileUrl = process.env.SPOTIFY_PROFILE_URL;

  const recent = await getTopArtists({ timeRange: "medium_term", limit: LIMIT });
  const longTerm = await getTopArtists({ timeRange: "long_term", limit: LIMIT });

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-20">
      <header className="mb-10 flex flex-col gap-3">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          Music
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          What I listen to on Spotify:
        </p>
        {spotifyProfileUrl ? (
          <div>
            <a
              href={spotifyProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-[#001A57] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Open my Spotify
            </a>
          </div>
        ) : null}
      </header>

      <div className="mt-2 grid gap-8 md:grid-cols-2">
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Top {LIMIT} artists (recent)
          </h2>
          {recent.ok ? (
            <ol className="space-y-3">
              {recent.artists.map((artist, idx) => (
                <li
                  key={`${artist.name}-recent-${idx}`}
                  className="flex items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="w-5 shrink-0 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                      {idx + 1}
                    </span>
                    {artist.imageUrl ? (
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                        <Image
                          src={artist.imageUrl}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <Initial name={artist.name} />
                    )}
                    <div className="min-w-0">
                      <a
                        href={artist.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="truncate font-medium text-zinc-900 transition-colors hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-300"
                      >
                        {artist.name}
                      </a>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Popularity: {artist.popularity}/100
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          ) : recent.reason === "missing_env" ? (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Configure Spotify OAuth environment variables to populate this list.
            </p>
          ) : (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Couldn&apos;t load recent top artists right now.{" "}
              {"message" in recent && recent.message
                ? `Spotify: ${recent.message}`
                : "Please try again later."}
            </p>
          )}
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Top {LIMIT} artists (long term)
          </h2>
          {longTerm.ok ? (
            <ol className="space-y-3">
              {longTerm.artists.map((artist, idx) => (
                <li
                  key={`${artist.name}-long-term-${idx}`}
                  className="flex items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="w-5 shrink-0 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                      {idx + 1}
                    </span>
                    {artist.imageUrl ? (
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                        <Image
                          src={artist.imageUrl}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <Initial name={artist.name} />
                    )}
                    <div className="min-w-0">
                      <a
                        href={artist.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="truncate font-medium text-zinc-900 transition-colors hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-300"
                      >
                        {artist.name}
                      </a>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Popularity: {artist.popularity}/100
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          ) : longTerm.reason === "missing_env" ? (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Configure Spotify OAuth environment variables to populate this list.
            </p>
          ) : (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Couldn&apos;t load long-term top artists right now.{" "}
              {"message" in longTerm && longTerm.message
                ? `Spotify: ${longTerm.message}`
                : "Please try again later."}
            </p>
          )}
        </section>
      </div>

      <p className="mt-10 text-sm text-zinc-500 dark:text-zinc-400">
        Spotify top artists update from the API about once an hour.{" "}
        <Link
          href="/"
          className="font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
        >
          Back home
        </Link>
      </p>
    </main>
  );
}
