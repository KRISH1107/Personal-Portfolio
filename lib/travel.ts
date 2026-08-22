/**
 * Visited-country data for the Travel hobby map.
 *
 * `code` must be an ISO 3166-1 alpha-2 country code (lowercase), matching
 * the location ids in `@svg-maps/world` (e.g. "jp", "us", "gb").
 *
 * Photos are public paths under /public — for example:
 *   photos: ["/images/travel/jp/tokyo.jpg"]
 * corresponds to the file at public/images/travel/jp/tokyo.jpg
 */

export type TravelPhoto = {
  /** Public path, e.g. "/images/travel/jp/tokyo.jpg" */
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
  {
    name: "Japan",
    code: "jp",
    dates: "Spring 2024",
    description:
      "Cherry blossoms in Tokyo, quiet temples in Kyoto, and more ramen than anyone should reasonably eat.",
    notes: "Favorite stop: Fushimi Inari at sunrise.",
    photos: [
      {
        src: "/images/travel/jp/tokyo.jpg",
        alt: "Tokyo cityscape placeholder",
      },
      {
        src: "/images/travel/jp/kyoto.jpg",
        alt: "Kyoto streets placeholder",
      },
    ],
  },
  {
    name: "India",
    code: "in",
    dates: "Family visits · ongoing",
    description:
      "Home base for family — food, festivals, and long evenings that somehow always turn into more chai.",
    photos: [],
  },
  {
    name: "United States",
    code: "us",
    dates: "2019 — present",
    description:
      "Where I study and build. Coast-to-coast trips, late-night coding sessions, and too many airport layovers.",
    photos: [],
  },
  {
    name: "Canada",
    code: "ca",
    dates: "Summer 2023",
    description:
      "Cool air, good coffee, and a week of exploring Vancouver and the surrounding trails.",
    photos: [],
  },
  {
    name: "France",
    code: "fr",
    dates: "Summer 2022",
    description:
      "Long walks, museum days, and the kind of bakery run that ruins you for toast at home.",
    photos: [],
  },
  {
    name: "Italy",
    code: "it",
    dates: "Summer 2022",
    description:
      "Gelato as a food group. Rome, Florence, and a train ride I still think about.",
    photos: [],
  },
  {
    name: "Spain",
    code: "es",
    dates: "Summer 2022",
    description:
      "Late dinners, Gaudí everywhere you look, and evenings that refuse to end early.",
    photos: [],
  },
  {
    name: "United Kingdom",
    code: "gb",
    dates: "Fall 2023",
    description:
      "Rain, bookshops, and more museums than I had hours for.",
    photos: [],
  },
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
