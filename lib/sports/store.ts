import { promises as fs } from "fs";
import path from "path";
import type { LeagueId, SportsStore, WeekSnapshot } from "@/lib/sports/types";

const STORE_PATH = path.join(process.cwd(), "data", "sports", "store.json");

export async function readSportsStore(): Promise<SportsStore> {
  const raw = await fs.readFile(STORE_PATH, "utf8");
  return JSON.parse(raw) as SportsStore;
}

export async function writeSportsStore(store: SportsStore): Promise<void> {
  const payload = `${JSON.stringify(store, null, 2)}\n`;
  try {
    await fs.writeFile(STORE_PATH, payload, "utf8");
  } catch (error) {
    const err = error as NodeJS.ErrnoException;
    if (err.code === "EROFS" || err.code === "EACCES") {
      throw new Error(
        "Filesystem is read-only (typical on Vercel). Publish locally or set up a writable store, then redeploy.",
      );
    }
    throw error;
  }
}

export function getLatestWeek(store: SportsStore, league: LeagueId): WeekSnapshot | null {
  const weeks = store.leagues[league]?.weeks ?? [];
  if (!weeks.length) return null;
  return [...weeks].sort((a, b) => a.week - b.week).at(-1) ?? null;
}

export function getWeek(
  store: SportsStore,
  league: LeagueId,
  week: number,
): WeekSnapshot | null {
  return store.leagues[league]?.weeks.find((entry) => entry.week === week) ?? null;
}

export function getPreviousWeek(
  store: SportsStore,
  league: LeagueId,
  week: number,
): WeekSnapshot | null {
  const weeks = [...(store.leagues[league]?.weeks ?? [])]
    .filter((entry) => entry.week < week)
    .sort((a, b) => a.week - b.week);
  return weeks.at(-1) ?? null;
}
