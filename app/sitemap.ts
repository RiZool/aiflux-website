import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/case-studies";

const BASE_URL = "https://aiflux.hu";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const caseStudyUrls: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${BASE_URL}/referenciak/${cs.slug}`,
    lastModified: new Date(cs.published),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/folyamatok`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/referenciak`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/foglalas`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...caseStudyUrls,
  ];
}
