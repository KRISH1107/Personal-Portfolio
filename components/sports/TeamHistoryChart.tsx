"use client";

import type { TeamWeekPoint } from "@/lib/sports/types";

type TeamHistoryChartProps = {
  points: TeamWeekPoint[];
  teamName: string;
  maxRank: number;
};

export default function TeamHistoryChart({
  points,
  teamName,
  maxRank,
}: TeamHistoryChartProps) {
  const width = 560;
  const height = 220;
  const padX = 36;
  const padY = 24;
  const usable = points.filter((point) => point.rank != null);

  if (usable.length === 0) {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        No ranking history yet for {teamName}.
      </p>
    );
  }

  const xFor = (index: number) =>
    padX + (index / Math.max(points.length - 1, 1)) * (width - padX * 2);
  const yFor = (rank: number) =>
    padY + ((rank - 1) / Math.max(maxRank - 1, 1)) * (height - padY * 2);

  const path = usable
    .map((point, index) => {
      const x = xFor(points.findIndex((entry) => entry.week === point.week));
      const y = yFor(point.rank!);
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full min-w-[280px]"
        role="img"
        aria-label={`${teamName} ranking history chart`}
      >
        {[1, Math.ceil(maxRank / 2), maxRank].map((rank) => (
          <g key={rank}>
            <line
              x1={padX}
              x2={width - padX}
              y1={yFor(rank)}
              y2={yFor(rank)}
              className="stroke-zinc-200 dark:stroke-zinc-800"
              strokeWidth={1}
            />
            <text
              x={8}
              y={yFor(rank) + 4}
              className="fill-zinc-400 text-[10px] dark:fill-zinc-500"
            >
              #{rank}
            </text>
          </g>
        ))}

        <path
          d={path}
          fill="none"
          className="stroke-zinc-900 dark:stroke-zinc-100"
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {usable.map((point) => {
          const index = points.findIndex((entry) => entry.week === point.week);
          return (
            <circle
              key={point.week}
              cx={xFor(index)}
              cy={yFor(point.rank!)}
              r={4}
              className="fill-zinc-900 dark:fill-zinc-50"
            />
          );
        })}

        {points.map((point, index) => (
          <text
            key={point.week}
            x={xFor(index)}
            y={height - 6}
            textAnchor="middle"
            className="fill-zinc-500 text-[10px] dark:fill-zinc-400"
          >
            W{point.week}
          </text>
        ))}
      </svg>
    </div>
  );
}
