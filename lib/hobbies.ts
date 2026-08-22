export type Hobby = {
  slug: string;
  title: string;
  blurb: string;
  /** Optional in-page anchor (e.g. "#travel") */
  href?: string;
};

export const hobbies: Hobby[] = [
  {
    slug: "travel",
    title: "Travel",
    blurb:
      "Collecting stamps in the passport and stories along the way. Explore the places I've been on the map below.",
    href: "#travel",
  },
  {
    slug: "basketball",
    title: "Basketball",
    blurb:
      "Pickup games, form drills, and watching too much NBA. Still chasing a cleaner jumper.",
  },
  {
    slug: "photography",
    title: "Photography",
    blurb:
      "Casual shots from trips and everyday moments — more curiosity than gear obsession.",
  },
];
