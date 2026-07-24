import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = brand.siteUrl;

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date("2026-07-20"),
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date("2026-07-20"),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date("2026-07-20"),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/webservices`,
      lastModified: new Date("2026-07-20"),
      priority: 0.7,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date("2026-07-20"),
      priority: 0.7,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date("2026-07-20"),
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date("2026-07-20"),
      priority: 0.7,
    },
    // Pricing is disconnected from the site for now -- excluded from sitemap.
    // ONLY include blog if it has real content
    // {
    //   url: `${baseUrl}/blog`,
    //   lastModified: new Date("2025-12-14"),
    //   priority: 0.8,
    // },
  ];
}
