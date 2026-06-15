import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Public, indexable routes. /work/sample-case is intentionally excluded while it
// holds placeholder content, as are /api/* and the legal pages' noindex peers.
const routes = [
  "",
  "/services",
  "/services/lead-generation",
  "/services/websites",
  "/services/ai-agents",
  "/services/automation",
  "/services/ecommerce",
  "/services/custom-systems",
  "/work",
  "/about",
  "/pricing",
  "/programs",
  "/programs/private-team-training",
  "/programs/ai-operator-certification",
  "/programs/workforce-transformation",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((path) => ({
    url: `${site.domain}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
