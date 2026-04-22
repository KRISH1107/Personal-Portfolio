export type Project = {
  slug: string;
  title: string;
  blurb: string;
  longDescription?: string;
  tags: string[];
  github?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    slug: "nba-predict",
    title: "NBA Predict",
    blurb:
      "Predictive analytics for NBA games — win probabilities and player projections, powered by XGBoost served through a FastAPI backend with a Next.js frontend.",
    tags: ["Next.js", "FastAPI", "PostgreSQL", "XGBoost"],
    github: "https://github.com/KRISH1107/nba-predict",
  },
  {
    slug: "receipt-splitter",
    title: "Receipt Splitter",
    blurb:
      "A bill-splitting app backed by a TypeScript Express API with multer file uploads for scanned receipts and a clean routes/controllers/models structure.",
    tags: ["TypeScript", "Express", "Node"],
    github: "https://github.com/KRISH1107/receipt-splitting",
  },
  {
    slug: "basketball-form-analyzer",
    title: "Basketball Form Analyzer",
    blurb:
      "Real-time computer vision that analyzes basketball shooting form using MediaPipe Pose on a live webcam feed.",
    tags: ["Python", "OpenCV", "MediaPipe"],
    github: "https://github.com/KRISH1107/computer-vision-basketball",
  },
  {
    slug: "portfolio",
    title: "This Portfolio",
    blurb:
      "The site you're reading right now. Built step-by-step while learning Next.js",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/KRISH1107/Personal-Portfolio",
    demo: "https://<your-domain>",
  },
];
