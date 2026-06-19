import type { MetadataRoute } from "next";

const BASE_URL = "https://aiflux.hu";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

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
      url: `${BASE_URL}/foglalas`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
