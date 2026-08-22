/**
 * Visited-country data for the Travel hobby map.
 *
 * `code` must be an ISO 3166-1 alpha-2 country code (lowercase), matching
 * the location ids in `@svg-maps/world` (e.g. "us", "ae", "th").
 *
 * Photos are public paths under /public — for example:
 *   photos: [{ src: "/images/travel/us/nyc.jpg", alt: "New York skyline" }]
 * corresponds to the file at public/images/travel/us/nyc.jpg
 */

export type TravelPhoto = {
  /** Public path, e.g. "/images/travel/us/nyc.jpg" */
  src: string;
  /** Short accessible description of the photo */
  alt: string;
};

export type VisitedCountry = {
  /** Display name shown in the detail panel */
  name: string;
  /** ISO 3166-1 alpha-2, lowercase — used to match map regions */
  code: string;
  /** Short memory / trip description (optional) */
  description?: string;
  /** Human-readable travel dates (optional), e.g. "Summer 2023" */
  dates?: string;
  /** Extra notes shown below the description (optional) */
  notes?: string;
  /** Local public image paths (optional). Empty → placeholder UI. */
  photos?: TravelPhoto[];
};

export const visitedCountries: VisitedCountry[] = [
  { name: "United States", code: "us", photos: [] },
  { name: "Canada", code: "ca", photos: [] },
  { name: "France", code: "fr", photos: [] },
  { name: "Spain", code: "es", photos: [] },
  { name: "Portugal", code: "pt", photos: [] },
  { name: "India", code: "in", photos: [] },
  { name: "United Arab Emirates", code: "ae", photos: [] },
  { name: "Thailand", code: "th", photos: [] },
  { name: "Iceland", code: "is", photos: [] },
  { name: "Mexico", code: "mx", photos: [] },
  { name: "Belgium", code: "be", photos: [] },
  { name: "Oman", code: "om", photos: [] },
  { name: "Turkey", code: "tr", photos: [] },
  { name: "Aruba", code: "aw", photos: [] },
  { name: "Bahamas", code: "bs", photos: [] },
];

/** Lowercase ISO alpha-2 → country entry */
export const visitedByCode: ReadonlyMap<string, VisitedCountry> = new Map(
  visitedCountries.map((country) => [country.code.toLowerCase(), country]),
);

export function isVisited(code: string): boolean {
  return visitedByCode.has(code.toLowerCase());
}

export function getVisitedCountry(code: string): VisitedCountry | undefined {
  return visitedByCode.get(code.toLowerCase());
}

export const visitedCountryCount = visitedCountries.length;
