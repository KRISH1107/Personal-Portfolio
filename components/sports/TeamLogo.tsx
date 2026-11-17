"use client";

import Image from "next/image";
import { useState } from "react";
import { getTeamLogoUrl } from "@/lib/sports/teams";
import type { LeagueId } from "@/lib/sports/types";

type TeamLogoProps = {
  league: LeagueId;
  abbr: string;
  name: string;
  size?: number;
};

export default function TeamLogo({
  league,
  abbr,
  name,
  size = 28,
}: TeamLogoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className="inline-flex items-center justify-center rounded-full bg-zinc-200 text-[10px] font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
        style={{ width: size, height: size }}
        aria-hidden="true"
      >
        {abbr.slice(0, 3)}
      </span>
    );
  }

  return (
    <Image
      src={getTeamLogoUrl(league, abbr)}
      alt={`${name} logo`}
      width={size}
      height={size}
      className="object-contain"
      unoptimized
      onError={() => setFailed(true)}
    />
  );
}
