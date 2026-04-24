import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTopArtists } from "@/lib/lastfm";

export const metadata: Metadata = {
  title: "Music",
  description:
    "What I have been listening to on Spotify (via Last.fm) — top artists this year and all time.",
  alternates: { canonical: "/music" },
  openGraph: {
    title: "Music",
    description:
      "What I have been listening to on Spotify (via Last.fm) — top artists this year and all time.",
    url: "/music",
  },
};

const LIMIT = 5;

function Initial({ name }: { name: string }) {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-200 text-sm font-semibold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
      {name.slice(0, 1).toUpperCase()}
    </div>
  );
}

export default async function MusicPage() {
  const spotifyProfileUrl = process.env.SPOTIFY_PROFILE_URL;

  const thisYear = await getTopArtists({ period: "12month", limit: LIMIT });
  const allTime = await getTopArtists({ period: "overall", limit: LIMIT });

  const showSetup = thisYear.ok === false && thisYear.reason === "missing_env";

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

      {showSetup ? (
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-zinc-200">
          <p className="font-semibold">Set up required</p>
          <p className="mt-2 text-zinc-700 dark:text-zinc-300">
            To show your top artists, add these environment variables (locally in{" "}
            <span className="font-mono">.env.local</span>, and in Vercel Project Settings):
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-zinc-700 dark:text-zinc-300">
            <li>
              <span className="font-mono">LASTFM_API_KEY</span> — from Last.fm API account
            </li>
            <li>
              <span className="font-mono">LASTFM_USERNAME</span> — your Last.fm username
            </li>
            <li className="text-zinc-600 dark:text-zinc-400">
              Optional: <span className="font-mono">SPOTIFY_PROFILE_URL</span> — your public Spotify
              profile URL
            </li>
          </ul>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            Also connect Spotify → Last.fm so new listening shows up in these lists.
          </p>
        </div>
      ) : null}

      <div className="mt-2 grid gap-8 md:grid-cols-2">
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Top {LIMIT} artists (this year)
          </h2>
          {thisYear.ok ? (
            <ol className="space-y-3">
              {thisYear.artists.map((artist, idx) => (
                <li
                  key={`${artist.name}-ty-${idx}`}
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
                        {Number(artist.playcount).toLocaleString()} scrobbles
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          ) : thisYear.reason === "missing_env" ? (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Configure Last.fm to populate this list.
            </p>
          ) : (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Couldn&apos;t load this year&apos;s list right now.{" "}
              {thisYear.reason === "api_error" && thisYear.message
                ? `Last.fm: ${thisYear.message}`
                : thisYear.reason === "http_error"
                  ? `HTTP ${thisYear.status}`
                  : "Please try again later."}
            </p>
          )}
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Top {LIMIT} artists (all time)
          </h2>
          {allTime.ok ? (
            <ol className="space-y-3">
              {allTime.artists.map((artist, idx) => (
                <li
                  key={`${artist.name}-at-${idx}`}
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
                        {Number(artist.playcount).toLocaleString()} scrobbles
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          ) : allTime.reason === "missing_env" ? (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Configure Last.fm to populate this list.
            </p>
          ) : (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Couldn&apos;t load the all-time list right now.{" "}
              {allTime.reason === "api_error" && allTime.message
                ? `Last.fm: ${allTime.message}`
                : allTime.reason === "http_error"
                  ? `HTTP ${allTime.status}`
                  : "Please try again later."}
            </p>
          )}
        </section>
      </div>

      <p className="mt-10 text-sm text-zinc-500 dark:text-zinc-400">
        Want the full Spotify “top artists” experience without a third party? That requires Spotify OAuth
        tokens and a backend — happy to do that as a follow-up. For a portfolio, Last.fm is usually the
        pragmatic path.
        {" "}
        <Link href="/" className="font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300">
          Back home
        </Link>
      </p>
    </main>
  );
}
