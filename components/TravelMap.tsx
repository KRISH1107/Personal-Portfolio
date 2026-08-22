"use client";

import { useCallback, useMemo, useState } from "react";
import world from "@svg-maps/world";
import CountryDetailModal from "@/components/CountryDetailModal";
import {
  getVisitedCountry,
  isVisited,
  visitedCountries,
  visitedCountryCount,
  type VisitedCountry,
} from "@/lib/travel";

function pathClassName({
  visited,
  isHovered,
  isSelected,
}: {
  visited: boolean;
  isHovered: boolean;
  isSelected: boolean;
}) {
  if (!visited) {
    return "fill-zinc-200 stroke-white dark:fill-zinc-800 dark:stroke-zinc-950";
  }

  if (isHovered || isSelected) {
    return "fill-zinc-950 stroke-white transition-[fill,stroke,filter] duration-150 dark:fill-zinc-50 dark:stroke-zinc-950";
  }

  return "fill-zinc-700 stroke-white transition-[fill,stroke,filter] duration-150 dark:fill-zinc-300 dark:stroke-zinc-950";
}

export default function TravelMap() {
  const [selected, setSelected] = useState<VisitedCountry | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const visitedIds = useMemo(() => {
    const set = new Set<string>();
    for (const location of world.locations) {
      if (isVisited(location.id)) {
        set.add(location.id);
      }
    }
    return set;
  }, []);

  const closeModal = useCallback(() => setSelected(null), []);

  const onActivate = useCallback((id: string) => {
    const country = getVisitedCountry(id);
    if (country) {
      setSelected(country);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {visitedCountryCount}
          </span>{" "}
          countries visited
        </p>
        <ul className="flex flex-wrap items-center gap-4 text-xs font-medium text-zinc-600 dark:text-zinc-400">
          <li className="flex items-center gap-2">
            <span
              className="inline-block h-3 w-3 rounded-sm bg-zinc-700 dark:bg-zinc-300"
              aria-hidden="true"
            />
            Visited
          </li>
          <li className="flex items-center gap-2">
            <span
              className="inline-block h-3 w-3 rounded-sm bg-zinc-200 dark:bg-zinc-800"
              aria-hidden="true"
            />
            Not visited
          </li>
        </ul>
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900/40 sm:p-5">
        <svg
          role="img"
          aria-label="World map of visited countries. Select a highlighted country for details."
          viewBox={world.viewBox}
          className="h-auto w-full touch-manipulation"
        >
          <title>World map of visited countries</title>
          {world.locations.map((location) => {
            const visited = visitedIds.has(location.id);
            const isHovered = hoveredId === location.id;
            const isSelected = selected?.code === location.id;

            return (
              <path
                key={location.id}
                d={location.path}
                data-code={location.id}
                tabIndex={visited ? 0 : undefined}
                role={visited ? "button" : undefined}
                aria-label={
                  visited
                    ? `${location.name}, visited. Open details.`
                    : undefined
                }
                aria-pressed={visited ? isSelected : undefined}
                className={`${pathClassName({
                  visited,
                  isHovered,
                  isSelected,
                })} ${
                  visited
                    ? "cursor-pointer outline-none focus-visible:stroke-[1.75] focus-visible:stroke-zinc-950 dark:focus-visible:stroke-white"
                    : "pointer-events-none sm:pointer-events-auto sm:cursor-default"
                }`}
                strokeWidth={isSelected ? 1.15 : 0.55}
                style={
                  visited && isHovered
                    ? { filter: "brightness(1.08)" }
                    : undefined
                }
                onMouseEnter={() => {
                  if (visited) setHoveredId(location.id);
                }}
                onMouseLeave={() => {
                  if (hoveredId === location.id) setHoveredId(null);
                }}
                onFocus={() => {
                  if (visited) setHoveredId(location.id);
                }}
                onBlur={() => {
                  if (hoveredId === location.id) setHoveredId(null);
                }}
                onClick={() => {
                  if (visited) onActivate(location.id);
                }}
                onKeyDown={(event) => {
                  if (!visited) return;
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onActivate(location.id);
                  }
                }}
              />
            );
          })}
        </svg>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Visited countries
        </h3>
        <ul className="flex flex-wrap gap-2">
          {visitedCountries.map((country) => {
            const isActive = selected?.code === country.code;
            return (
              <li key={country.code}>
                <button
                  type="button"
                  onClick={() => onActivate(country.code)}
                  aria-pressed={isActive}
                  className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-500 ${
                    isActive
                      ? "border-zinc-900 bg-zinc-900 text-zinc-50 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                      : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-zinc-50"
                  }`}
                >
                  {country.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {selected ? (
        <CountryDetailModal country={selected} onClose={closeModal} />
      ) : null}
    </div>
  );
}
