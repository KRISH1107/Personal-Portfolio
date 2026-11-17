"use client";

import { useMemo, useState } from "react";
import MovementBadge from "@/components/sports/MovementBadge";
import TeamHistoryChart from "@/components/sports/TeamHistoryChart";
import TeamLogo from "@/components/sports/TeamLogo";
import {
  buildRankedRows,
  getBiggestFallers,
  getBiggestRisers,
  getSeasonMovers,
  getTeamHistory,
  getUnchanged,
} from "@/lib/sports/rankings";
import type { LeagueId, SportsStore } from "@/lib/sports/types";

type SportsDashboardProps = {
  store: SportsStore;
};

export default function SportsDashboard({ store }: SportsDashboardProps) {
  const [league, setLeague] = useState<LeagueId>("nfl");
  const season = store.leagues[league];
  const weeks = useMemo(
    () => [...(season?.weeks ?? [])].sort((a, b) => a.week - b.week),
    [season],
  );
  const latestWeek = weeks.at(-1)?.week ?? 1;
  const [week, setWeek] = useState(latestWeek);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  // Keep week in range when switching leagues
  const activeWeekNumber = weeks.some((entry) => entry.week === week)
    ? week
    : latestWeek;

  const current = weeks.find((entry) => entry.week === activeWeekNumber) ?? null;
  const previous =
    weeks.filter((entry) => entry.week < activeWeekNumber).at(-1) ?? null;

  const rows = useMemo(() => {
    if (!current) return [];
    return buildRankedRows(league, current, previous);
  }, [league, current, previous]);

  const risers = getBiggestRisers(rows);
  const fallers = getBiggestFallers(rows);
  const unchanged = getUnchanged(rows);
  const seasonMovers = getSeasonMovers(league, weeks);
  const selectedHistory = selectedTeamId
    ? getTeamHistory(selectedTeamId, weeks)
    : [];
  const selectedName =
    rows.find((row) => row.teamId === selectedTeamId)?.team.name ??
    seasonMovers.find((row) => row.teamId === selectedTeamId)?.name ??
    "Team";

  if (!weeks.length || !current) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-16 text-center dark:border-zinc-700 dark:bg-zinc-900/40">
        <p className="text-base font-medium text-zinc-800 dark:text-zinc-100">
          No rankings published yet
        </p>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Check back soon — or publish the first week from the admin desk.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            {season.label}
          </p>
          <h3 className="mt-1 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {current.label}
          </h3>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Published{" "}
            {new Date(current.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {(["nfl", "nba"] as LeagueId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setLeague(id);
                setSelectedTeamId(null);
              }}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 ${
                league === id
                  ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
                  : "border border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300"
              }`}
            >
              {id.toUpperCase()}
            </button>
          ))}
          <label className="sr-only" htmlFor="week-select">
            Select week
          </label>
          <select
            id="week-select"
            value={activeWeekNumber}
            onChange={(event) => setWeek(Number(event.target.value))}
            className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-800 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
          >
            {weeks.map((entry) => (
              <option key={entry.week} value={entry.week}>
                {entry.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-zinc-50 text-xs uppercase tracking-wider text-zinc-500 dark:bg-zinc-900/60 dark:text-zinc-400">
              <tr>
                <th className="px-4 py-3 font-semibold">Rank</th>
                <th className="px-4 py-3 font-semibold">Team</th>
                <th className="px-4 py-3 font-semibold">Prev</th>
                <th className="px-4 py-3 font-semibold">Move</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const selected = selectedTeamId === row.teamId;
                return (
                  <tr
                    key={row.teamId}
                    className={`border-t border-zinc-100 transition-colors dark:border-zinc-900 ${
                      selected
                        ? "bg-zinc-100 dark:bg-zinc-900"
                        : "hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                    }`}
                  >
                    <td className="px-4 py-3 font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
                      {row.rank}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedTeamId((currentId) =>
                            currentId === row.teamId ? null : row.teamId,
                          )
                        }
                        className="flex items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
                      >
                        <TeamLogo
                          league={league}
                          abbr={row.team.abbr}
                          name={row.team.name}
                        />
                        <span className="font-medium text-zinc-900 dark:text-zinc-50">
                          <span className="sm:hidden">{row.team.abbr}</span>
                          <span className="hidden sm:inline">{row.team.name}</span>
                        </span>
                      </button>
                    </td>
                    <td className="px-4 py-3 tabular-nums text-zinc-500 dark:text-zinc-400">
                      {row.previousRank ?? "—"}
                    </td>
                    <td className="px-4 py-3">
                      <MovementBadge movement={row.movement} delta={row.delta} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2">
        <AnalyticsCard title="Biggest risers">
          {risers.length === 0 ? (
            <EmptyStat text="No risers this week." />
          ) : (
            <StatList
              league={league}
              rows={risers.map((row) => ({
                id: row.teamId,
                abbr: row.team.abbr,
                name: row.team.name,
                value: `↑ ${row.delta}`,
                tone: "up" as const,
              }))}
              onSelect={setSelectedTeamId}
            />
          )}
        </AnalyticsCard>
        <AnalyticsCard title="Biggest fallers">
          {fallers.length === 0 ? (
            <EmptyStat text="No fallers this week." />
          ) : (
            <StatList
              league={league}
              rows={fallers.map((row) => ({
                id: row.teamId,
                abbr: row.team.abbr,
                name: row.team.name,
                value: `↓ ${row.delta}`,
                tone: "down" as const,
              }))}
              onSelect={setSelectedTeamId}
            />
          )}
        </AnalyticsCard>
        <AnalyticsCard title="Holding steady">
          {unchanged.length === 0 ? (
            <EmptyStat text="Everyone moved this week." />
          ) : (
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {unchanged
                .slice(0, 8)
                .map((row) => row.team.abbr)
                .join(" · ")}
              {unchanged.length > 8 ? ` · +${unchanged.length - 8} more` : ""}
            </p>
          )}
        </AnalyticsCard>
        <AnalyticsCard title="Season movers">
          {seasonMovers.length === 0 ? (
            <EmptyStat text="Need at least two weeks." />
          ) : (
            <StatList
              league={league}
              rows={seasonMovers.map((row) => ({
                id: row.teamId,
                abbr:
                  rows.find((entry) => entry.teamId === row.teamId)?.team.abbr ??
                  row.teamId.toUpperCase(),
                name: row.name,
                value:
                  row.netChange === 0
                    ? "±0"
                    : row.netChange > 0
                      ? `↑ ${row.netChange}`
                      : `↓ ${Math.abs(row.netChange)}`,
                tone:
                  row.netChange > 0
                    ? ("up" as const)
                    : row.netChange < 0
                      ? ("down" as const)
                      : ("same" as const),
              }))}
              onSelect={setSelectedTeamId}
            />
          )}
        </AnalyticsCard>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950 sm:p-6">
        <div className="mb-4 flex flex-col gap-1">
          <h4 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Ranking history
          </h4>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {selectedTeamId
              ? `${selectedName} — click another team to compare`
              : "Click any team in the table to chart its week-by-week climb."}
          </p>
        </div>
        {selectedTeamId ? (
          <TeamHistoryChart
            points={selectedHistory}
            teamName={selectedName}
            maxRank={league === "nfl" ? 32 : 30}
          />
        ) : (
          <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-zinc-200 text-sm text-zinc-400 dark:border-zinc-800">
            Select a team to view history
          </div>
        )}
      </section>
    </div>
  );
}

function AnalyticsCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        {title}
      </h4>
      {children}
    </div>
  );
}

function EmptyStat({ text }: { text: string }) {
  return <p className="text-sm text-zinc-500 dark:text-zinc-400">{text}</p>;
}

function StatList({
  league,
  rows,
  onSelect,
}: {
  league: LeagueId;
  rows: Array<{
    id: string;
    abbr: string;
    name: string;
    value: string;
    tone: "up" | "down" | "same";
  }>;
  onSelect: (id: string) => void;
}) {
  return (
    <ul className="flex flex-col gap-2">
      {rows.map((row) => (
        <li key={row.id}>
          <button
            type="button"
            onClick={() => onSelect(row.id)}
            className="flex w-full items-center justify-between gap-3 rounded-lg px-1 py-1 text-left transition-colors hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:hover:bg-zinc-900"
          >
            <span className="flex items-center gap-2">
              <TeamLogo league={league} abbr={row.abbr} name={row.name} size={22} />
              <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                {row.name}
              </span>
            </span>
            <span
              className={`text-sm font-semibold ${
                row.tone === "up"
                  ? "text-emerald-600 dark:text-emerald-400"
                  : row.tone === "down"
                    ? "text-rose-600 dark:text-rose-400"
                    : "text-zinc-500"
              }`}
            >
              {row.value}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
