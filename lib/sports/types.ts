export type LeagueId = "nfl" | "nba";

export type SportsTeam = {
  id: string;
  name: string;
  abbr: string;
  conference?: string;
  division?: string;
};

export type RankingEntry = {
  /** Team id from the league roster */
  teamId: string;
  rank: number;
};

export type WeekSnapshot = {
  /** 1-based week number within the season */
  week: number;
  /** Display label, e.g. "Week 4" or "Preseason" */
  label: string;
  /** ISO date string when published */
  publishedAt: string;
  /** Teams in rank order (index 0 = #1) */
  rankings: string[];
  /** Optional editor notes for the week */
  notes?: string;
};

export type SeasonStore = {
  season: string;
  label: string;
  weeks: WeekSnapshot[];
  /** Unpublished draft (not shown publicly) */
  draft?: {
    week: number;
    label: string;
    rankings: string[];
    updatedAt: string;
  };
};

export type SportsStore = {
  version: 1;
  leagues: Record<LeagueId, SeasonStore>;
};

export type MovementKind = "up" | "down" | "same" | "new";

export type RankedRow = {
  teamId: string;
  team: SportsTeam;
  rank: number;
  previousRank: number | null;
  movement: MovementKind;
  delta: number;
};

export type TeamWeekPoint = {
  week: number;
  label: string;
  rank: number | null;
};
