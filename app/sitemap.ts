import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/`, lastModified: now, priority: 1 },
    { url: `${siteConfig.url}/projects`, lastModified: now, priority: 0.9 },
    { url: `${siteConfig.url}/about`, lastModified: now, priority: 0.8 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteConfig.url}/projects/${project.slug}`,
    lastModified: now,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
