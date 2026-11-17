import { getTeamMap } from "@/lib/sports/teams";
import type {
  LeagueId,
  MovementKind,
  RankedRow,
  TeamWeekPoint,
  WeekSnapshot,
} from "@/lib/sports/types";

function rankIndexMap(rankings: string[]): Map<string, number> {
  const map = new Map<string, number>();
  rankings.forEach((teamId, index) => {
    map.set(teamId, index + 1);
  });
  return map;
}

export function buildRankedRows(
  league: LeagueId,
  current: WeekSnapshot,
  previous: WeekSnapshot | null,
): RankedRow[] {
  const teams = getTeamMap(league);
  const prevRanks = previous ? rankIndexMap(previous.rankings) : null;

  return current.rankings.map((teamId, index) => {
    const rank = index + 1;
    const team = teams.get(teamId);
    if (!team) {
      throw new Error(`Unknown ${league} team id: ${teamId}`);
    }

    const previousRank = prevRanks?.get(teamId) ?? null;
    let movement: MovementKind = "new";
    let delta = 0;

    if (previousRank == null) {
      movement = previous ? "new" : "same";
      delta = 0;
    } else if (previousRank === rank) {
      movement = "same";
      delta = 0;
    } else if (previousRank > rank) {
      movement = "up";
      delta = previousRank - rank;
    } else {
      movement = "down";
      delta = rank - previousRank;
    }

    return { teamId, team, rank, previousRank, movement, delta };
  });
}

export function getBiggestRisers(rows: RankedRow[], limit = 5): RankedRow[] {
  return rows
    .filter((row) => row.movement === "up")
    .sort((a, b) => b.delta - a.delta || a.rank - b.rank)
    .slice(0, limit);
}

export function getBiggestFallers(rows: RankedRow[], limit = 5): RankedRow[] {
  return rows
    .filter((row) => row.movement === "down")
    .sort((a, b) => b.delta - a.delta || a.rank - b.rank)
    .slice(0, limit);
}

export function getUnchanged(rows: RankedRow[]): RankedRow[] {
  return rows.filter((row) => row.movement === "same");
}

export function getSeasonMovers(
  league: LeagueId,
  weeks: WeekSnapshot[],
  limit = 5,
): Array<{ teamId: string; name: string; netChange: number; best: number; worst: number }> {
  const teams = getTeamMap(league);
  const sorted = [...weeks].sort((a, b) => a.week - b.week);
  if (sorted.length < 2) return [];

  const first = rankIndexMap(sorted[0].rankings);
  const last = rankIndexMap(sorted.at(-1)!.rankings);
  const bestWorst = new Map<string, { best: number; worst: number }>();

  for (const week of sorted) {
    week.rankings.forEach((teamId, index) => {
      const rank = index + 1;
      const current = bestWorst.get(teamId) ?? { best: rank, worst: rank };
      bestWorst.set(teamId, {
        best: Math.min(current.best, rank),
        worst: Math.max(current.worst, rank),
      });
    });
  }

  const movers = [...last.entries()].map(([teamId, currentRank]) => {
    const start = first.get(teamId) ?? currentRank;
    const span = bestWorst.get(teamId) ?? { best: currentRank, worst: currentRank };
    return {
      teamId,
      name: teams.get(teamId)?.name ?? teamId,
      netChange: start - currentRank,
      best: span.best,
      worst: span.worst,
    };
  });

  return movers
    .sort(
      (a, b) =>
        Math.abs(b.netChange) - Math.abs(a.netChange) ||
        Math.abs(b.worst - b.best) - Math.abs(a.worst - a.best),
    )
    .slice(0, limit);
}

export function getTeamHistory(
  teamId: string,
  weeks: WeekSnapshot[],
): TeamWeekPoint[] {
  const sorted = [...weeks].sort((a, b) => a.week - b.week);
  return sorted.map((week) => {
    const index = week.rankings.indexOf(teamId);
    return {
      week: week.week,
      label: week.label,
      rank: index === -1 ? null : index + 1,
    };
  });
}
