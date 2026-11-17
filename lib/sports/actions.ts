"use server";

import { revalidatePath } from "next/cache";
import {
  clearAdminSession,
  createAdminSession,
  isAdminAuthenticated,
  verifyAdminPassword,
} from "@/lib/sports/auth";
import { getLeagueTeams } from "@/lib/sports/teams";
import { readSportsStore, writeSportsStore } from "@/lib/sports/store";
import type { LeagueId } from "@/lib/sports/types";

export type ActionResult =
  | { ok: true; message?: string }
  | { ok: false; error: string };

export async function loginSportsAdmin(password: string): Promise<ActionResult> {
  if (!verifyAdminPassword(password)) {
    return { ok: false, error: "Incorrect password." };
  }
  await createAdminSession();
  return { ok: true };
}

export async function logoutSportsAdmin(): Promise<ActionResult> {
  await clearAdminSession();
  return { ok: true };
}

function assertCompleteRanking(league: LeagueId, rankings: string[]): string | null {
  const roster = getLeagueTeams(league).map((team) => team.id);
  if (rankings.length !== roster.length) {
    return `Expected ${roster.length} teams, got ${rankings.length}.`;
  }
  const set = new Set(rankings);
  if (set.size !== rankings.length) {
    return "Duplicate teams in rankings.";
  }
  for (const id of roster) {
    if (!set.has(id)) return `Missing team: ${id}`;
  }
  return null;
}

export async function saveSportsDraft(input: {
  league: LeagueId;
  week: number;
  label: string;
  rankings: string[];
}): Promise<ActionResult> {
  if (!(await isAdminAuthenticated())) {
    return { ok: false, error: "Unauthorized." };
  }

  const validation = assertCompleteRanking(input.league, input.rankings);
  if (validation) return { ok: false, error: validation };

  const store = await readSportsStore();
  store.leagues[input.league].draft = {
    week: input.week,
    label: input.label,
    rankings: input.rankings,
    updatedAt: new Date().toISOString(),
  };

  try {
    await writeSportsStore(store);
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Save failed." };
  }

  revalidatePath("/hobbies");
  revalidatePath("/hobbies/sports/admin");
  return { ok: true, message: "Draft saved." };
}

export async function publishSportsWeek(input: {
  league: LeagueId;
  week: number;
  label: string;
  rankings: string[];
  notes?: string;
}): Promise<ActionResult> {
  if (!(await isAdminAuthenticated())) {
    return { ok: false, error: "Unauthorized." };
  }

  const validation = assertCompleteRanking(input.league, input.rankings);
  if (validation) return { ok: false, error: validation };
  if (input.week < 1) return { ok: false, error: "Week must be >= 1." };

  const store = await readSportsStore();
  const season = store.leagues[input.league];
  const existingIndex = season.weeks.findIndex((week) => week.week === input.week);
  const snapshot = {
    week: input.week,
    label: input.label.trim() || `Week ${input.week}`,
    publishedAt: new Date().toISOString(),
    rankings: input.rankings,
    notes: input.notes?.trim() || undefined,
  };

  if (existingIndex >= 0) {
    season.weeks[existingIndex] = snapshot;
  } else {
    season.weeks.push(snapshot);
    season.weeks.sort((a, b) => a.week - b.week);
  }

  season.draft = undefined;

  try {
    await writeSportsStore(store);
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Publish failed." };
  }

  revalidatePath("/hobbies");
  revalidatePath("/hobbies/sports/admin");
  return { ok: true, message: `Published ${snapshot.label}.` };
}
