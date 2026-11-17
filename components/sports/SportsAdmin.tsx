"use client";

import {
  useMemo,
  useState,
  useTransition,
  type FormEvent,
} from "react";
import {
  loginSportsAdmin,
  logoutSportsAdmin,
  publishSportsWeek,
  saveSportsDraft,
} from "@/lib/sports/actions";
import { getLeagueTeams } from "@/lib/sports/teams";
import type { LeagueId, SportsStore } from "@/lib/sports/types";
import TeamLogo from "@/components/sports/TeamLogo";

type SportsAdminProps = {
  store: SportsStore;
  authenticated: boolean;
};

export default function SportsAdmin({ store, authenticated }: SportsAdminProps) {
  const [authed, setAuthed] = useState(authenticated);
  const [password, setPassword] = useState("");
  const [league, setLeague] = useState<LeagueId>("nfl");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [query, setQuery] = useState("");
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const season = store.leagues[league];
  const latest = [...(season.weeks ?? [])].sort((a, b) => a.week - b.week).at(-1);
  const draft = season.draft;

  const [week, setWeek] = useState(draft?.week ?? (latest?.week ?? 0) + 1);
  const [label, setLabel] = useState(
    draft?.label ?? `Week ${(latest?.week ?? 0) + 1}`,
  );
  const [rankings, setRankings] = useState<string[]>(
    draft?.rankings ?? latest?.rankings ?? getLeagueTeams(league).map((t) => t.id),
  );

  const teamMap = useMemo(() => {
    return new Map(getLeagueTeams(league).map((team) => [team.id, team]));
  }, [league]);

  function switchLeague(next: LeagueId) {
    setLeague(next);
    setQuery("");
    const nextSeason = store.leagues[next];
    const nextLatest = [...(nextSeason.weeks ?? [])].sort((a, b) => a.week - b.week).at(-1);
    const nextDraft = nextSeason.draft;
    setWeek(nextDraft?.week ?? (nextLatest?.week ?? 0) + 1);
    setLabel(nextDraft?.label ?? `Week ${(nextLatest?.week ?? 0) + 1}`);
    setRankings(
      nextDraft?.rankings ??
        nextLatest?.rankings ??
        getLeagueTeams(next).map((t) => t.id),
    );
  }

  function moveItem(from: number, to: number) {
    setRankings((current) => {
      if (to < 0 || to >= current.length || from === to) return current;
      const next = [...current];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  }

  function onLogin(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    startTransition(async () => {
      const result = await loginSportsAdmin(password);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setAuthed(true);
      setPassword("");
      setMessage("Signed in.");
    });
  }

  if (!authed) {
    return (
      <form
        onSubmit={onLogin}
        className="mx-auto flex w-full max-w-md flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950"
      >
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Sports admin
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Sign in to draft and publish weekly power rankings. Visitors cannot
          access this desk.
        </p>
        <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
            autoComplete="current-password"
            required
          />
        </label>
        {error ? <p className="text-sm text-rose-600">{error}</p> : null}
        {message ? <p className="text-sm text-emerald-600">{message}</p> : null}
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    );
  }

  const filteredIndexes = rankings
    .map((id, index) => ({ id, index }))
    .filter(({ id }) => {
      if (!query.trim()) return true;
      const team = teamMap.get(id);
      const q = query.toLowerCase();
      return (
        team?.name.toLowerCase().includes(q) ||
        team?.abbr.toLowerCase().includes(q)
      );
    });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Ranking desk
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Drag to reorder · save drafts without touching published history ·
            publish to create a permanent weekly snapshot in{" "}
            <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-900">
              data/sports/store.json
            </code>
            .
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            startTransition(async () => {
              await logoutSportsAdmin();
              setAuthed(false);
            })
          }
          className="rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
        >
          Sign out
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {(["nfl", "nba"] as LeagueId[]).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => switchLeague(id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              league === id
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "border border-zinc-200 dark:border-zinc-700"
            }`}
          >
            {id.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-sm font-medium">
          Week number
          <input
            type="number"
            min={1}
            value={week}
            onChange={(event) => setWeek(Number(event.target.value))}
            className="rounded-lg border border-zinc-200 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium sm:col-span-2">
          Week label
          <input
            type="text"
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            className="rounded-lg border border-zinc-200 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1 text-sm font-medium">
        Search teams
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Chiefs, OKC, Lakers…"
          className="rounded-lg border border-zinc-200 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
        />
      </label>

      <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <ul className="divide-y divide-zinc-100 dark:divide-zinc-900">
          {filteredIndexes.map(({ id, index }) => {
            const team = teamMap.get(id);
            if (!team) return null;
            return (
              <li
                key={id}
                draggable={!query}
                onDragStart={() => setDragIndex(index)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => {
                  if (dragIndex == null) return;
                  moveItem(dragIndex, index);
                  setDragIndex(null);
                }}
                className="flex items-center gap-3 bg-white px-3 py-2 dark:bg-zinc-950"
              >
                <span className="w-8 text-sm font-semibold tabular-nums text-zinc-500">
                  {index + 1}
                </span>
                <TeamLogo league={league} abbr={team.abbr} name={team.name} />
                <span className="flex-1 text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  {team.name}
                </span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    aria-label={`Move ${team.name} up`}
                    onClick={() => moveItem(index, index - 1)}
                    className="rounded border border-zinc-200 px-2 py-1 text-xs dark:border-zinc-700"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    aria-label={`Move ${team.name} down`}
                    onClick={() => moveItem(index, index + 1)}
                    className="rounded border border-zinc-200 px-2 py-1 text-xs dark:border-zinc-700"
                  >
                    ↓
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              setError(null);
              const result = await saveSportsDraft({
                league,
                week,
                label,
                rankings,
              });
              if (!result.ok) setError(result.error);
              else setMessage(result.message ?? "Draft saved.");
            })
          }
          className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-semibold dark:border-zinc-700"
        >
          Save draft
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              setError(null);
              const result = await publishSportsWeek({
                league,
                week,
                label,
                rankings,
              });
              if (!result.ok) setError(result.error);
              else setMessage(result.message ?? "Published.");
            })
          }
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          Publish week
        </button>
      </div>

      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
      {message ? <p className="text-sm text-emerald-600">{message}</p> : null}

      <section className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">
          Preview top 10
        </h3>
        <ol className="flex flex-col gap-2">
          {rankings.slice(0, 10).map((id, index) => {
            const team = teamMap.get(id);
            if (!team) return null;
            return (
              <li key={id} className="flex items-center gap-3 text-sm">
                <span className="w-6 font-semibold tabular-nums">{index + 1}</span>
                <TeamLogo league={league} abbr={team.abbr} name={team.name} size={22} />
                <span>{team.name}</span>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
