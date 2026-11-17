export type Hobby = {
  slug: string;
  title: string;
  blurb: string;
  /** Optional in-page or route href */
  href?: string;
};

export const hobbies: Hobby[] = [
  {
    slug: "travel",
    title: "Travel",
    blurb:
      "Collecting stamps in the passport and stories along the way. Explore the places I've been on the map.",
    href: "/hobbies",
  },
  {
    slug: "sports",
    title: "Sports",
    blurb:
      "Weekly NFL and NBA power rankings — full history, movers, and team trends.",
    href: "/hobbies/sports",
  },
];
