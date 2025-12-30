import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://abhayaitsolutions.online";

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date("2025-12-14"),
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date("2025-12-14"),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date("2025-12-14"),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date("2025-12-30"),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/webservices`,
      lastModified: new Date("2025-12-14"),
      priority: 0.7,
    },
    // ONLY include blog if it has real content
    // {
    //   url: `${baseUrl}/blog`,
    //   lastModified: new Date("2025-12-14"),
    //   priority: 0.8,
    // },
  ];
}
